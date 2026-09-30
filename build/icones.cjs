// Gera os ícones do site a partir de build/icones.html: "RT" dourado sobre preto.
//   favicon.ico (16, 32 e 48 px, na raiz), img/favicon.png (96), img/favicon-192.png e img/apple-touch-icon.png (180).
// Tamanhos múltiplos de 48 px porque é o que o Google recomenda para mostrar o ícone ao lado do site na busca
// (em 30/09/2026 o site aparecia no Google com um globo genérico: o ícone tinha 64 px e não havia /favicon.ico).
// Precisa do puppeteer-core, do sharp e do Google Chrome. Rodar: node build/icones.cjs
const puppeteer = require("puppeteer-core");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const RAIZ = path.join(__dirname, "..");

// Cantos arredondados (o ícone antigo já era assim). No iPhone vai quadrado: o sistema arredonda sozinho.
async function icone(base, lado, arredondar) {
  let img = sharp(base).resize(lado, lado).ensureAlpha();
  if (arredondar) {
    const r = Math.round(lado * 0.22);
    const mascara = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}"><rect width="${lado}" height="${lado}" rx="${r}" fill="#fff"/></svg>`);
    img = img.composite([{ input: mascara, blend: "dest-in" }]);
  }
  return img.png().toBuffer();
}

// Arquivo .ico com várias imagens PNG dentro (formato aceito por todos os navegadores atuais).
function montarIco(pngs) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0);
  cabecalho.writeUInt16LE(1, 2);
  cabecalho.writeUInt16LE(pngs.length, 4);
  const entradas = [];
  let posicao = 6 + 16 * pngs.length;
  for (const { lado, dados } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(lado, 0);
    e.writeUInt8(lado, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(dados.length, 8);
    e.writeUInt32LE(posicao, 12);
    posicao += dados.length;
    entradas.push(e);
  }
  return Buffer.concat([cabecalho, ...entradas, ...pngs.map((p) => p.dados)]);
}

(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
  const p = await b.newPage();
  await p.setViewport({ width: 768, height: 768, deviceScaleFactor: 1 });
  await p.goto(require("url").pathToFileURL(path.join(__dirname, "icones.html")).href, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready);
  const base = await p.screenshot({ type: "png" });
  await b.close();

  fs.writeFileSync(path.join(RAIZ, "img", "favicon.png"), await icone(base, 96, true));
  fs.writeFileSync(path.join(RAIZ, "img", "favicon-192.png"), await icone(base, 192, true));
  fs.writeFileSync(path.join(RAIZ, "img", "apple-touch-icon.png"), await icone(base, 180, false));
  const ico = [];
  for (const lado of [16, 32, 48]) ico.push({ lado, dados: await icone(base, lado, true) });
  fs.writeFileSync(path.join(RAIZ, "favicon.ico"), montarIco(ico));
  console.log("ok");
})();
