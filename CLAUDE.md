# Site do Rodrigo Titericz — regras para o Claude

Site vendido pela Vanguard Web Studio a um cliente real: Rodrigo Titericz, advogado (OAB/SC 11.670), Florianópolis.
No ar em https://lp-rodrigo-titericz.vercel.app (projeto Vercel `lp-rodrigo-titericz`, equipe `vanguard-web`;
push na `main` publica sozinho). Dado errado ou site quebrado expõe o dono na frente do cliente.

## Como trabalhar

- Autorizado a alterar e publicar sem pedir, **desde que**: revise e teste tudo antes; trabalhe em
  branch + Pull Request (o merge na `main` é a publicação); anote qual versão estava no ar antes;
  se algo quebrar, reverta na hora e conte com franqueza o que aconteceu.
- Consertar o que foi pedido. Conteúdo ou visual novo que ninguém pediu: sugerir primeiro.
- Nunca digitar senha, chave de API ou token. Quem põe é o dono.
- Responder em português do Brasil, simples e direto. O dono costuma ler pelo celular.

## Limite de publicações da Vercel

- O plano gratuito aceita **100 publicações por dia para a equipe inteira** (todos os sites juntos).
  Cada commit enviado ao GitHub vira uma publicação (branch = prévia, `main` = produção).
- Este site foi criado **um arquivo por commit** (10 commits "init: upload ..."): cada um gastou uma publicação.
  **Sempre juntar as mudanças num commit só.** Nunca subir arquivo por arquivo pela API do GitHub.
- Se o check da Vercel no GitHub disser "Deployment rate limited", nada foi publicado: esperar liberar e
  publicar de novo.

## Comandos (obrigatório)

```bash
npm install     # uma vez
npm run build   # compila o CSS, põe código de versão no nome dos arquivos e roda as verificações
npm run dev     # servidor local (http://localhost:4321) com os mesmos cabeçalhos de segurança da Vercel
npm run security:scan   # Observatório da MDN contra o servidor local (com o dev rodando)
```

Não publicar se `npm run build` falhar.

## Regras do código

- Nunca editar `css/style.*.css` direto: mexer em `build/input.css` e rodar o build.
- Nunca `style="..."` nem `<script>` escrito dentro do HTML, e nunca CDN (nem Google Fonts). A segurança
  do site (CSP) bloqueia isso **em silêncio**: o visual quebra sem erro aparente.
- Se mudar o bloco `ld+json` do `index.html`, o hash dele na CSP do `vercel.json` muda junto
  (o `npm run build` avisa qual é).
- Imagens: WebP, com `width`/`height` e `draggable="false"`; nenhuma imagem pode ser arrastada.
  Originais em `build/originais/` (não vão para o site, ver `.vercelignore`). Feitas com `sharp` (qualidade 80-82):
  `rodrigo-retrato*.webp` de `rodrigo_1.png` (seção Sobre); `rodrigo_2.png` foi usada na prévia do WhatsApp;
  `og-capa.jpg` (prévia no WhatsApp, 1200x630) e os ícones com as fontes do próprio site.
- Nada de `loading="lazy"` dentro de bloco com `data-aos` (no Studio +Movimento, o conteúdo não apareceu no
  celular do dono).
- Estética: preto, dourado `#C5A059` (`brand-gold`), Playfair Display nos títulos e Outfit no texto. Elemento novo
  copia as classes de um equivalente que já existe.
- Animações: AOS (`js/aos.*.js`, `css/aos.*.css`) + `js/app.js` (menu do celular, números que contam, menu que
  escurece ao rolar). Se o AOS não carregar, o `app.js` põe `sem-animacao` e tudo aparece parado (nunca em branco).
  Quem pede menos animação no aparelho vê tudo parado.
- Segurança: nota A+ 150/150 no MDN HTTP Observatory. Não pode cair.

## Conteúdo (fonte: documento do cliente "Rodrigo_Titericz_Conteudo_Site.docx", 28/09/2026)

- Todo o texto do site vem do documento, sem inventar. Em 28/09/2026 conferi linha por linha: as 61 linhas
  estão no site (as 7 áreas, os 8 cargos, formação, idiomas, experiência internacional, publicações,
  reconhecimento e contato).
- Advocacia tem regra de publicidade da OAB (Provimento 205/2021): texto informativo, **sem promessa de resultado**,
  sem preço e sem "captação" agressiva. Por isso "Experiência focada em resultados" virou "Uma trajetória de quase
  30 anos". Não acrescentar depoimento, número de causas ganhas nem frase de venda.
- Contato: WhatsApp e telefone (48) 99180-1107 (`wa.me/5548991801107`); e-mails rodrigo@titericz.com e
  rodrigotitericz@gmail.com; Rua Adolfo Melo, 35, 12º andar, Florianópolis/SC (o documento não traz CEP).

## A confirmar com o cliente (não inventar)

- Domínio: o site antigo apontava para rodrigotitericz.com.br, que **não existe**. O cliente já tem
  **titericz.com** (é o do e-mail; hoje o endereço mostra outro serviço, da jspnet). Se o site for para um
  domínio próprio, trocar canonical, og:url, og:image, twitter:image, ld+json (e o hash na CSP), sitemap e robots.
- Mapa do Google embutido: não pus (o documento não pede); há o link "Ver no mapa".

## Armadilhas que já aconteceram (aqui ou nos sites com a mesma base: Studio +Movimento e Rafael Mansur)

1. `js/aos.js` e `css/aos.css` eram uma página de "Redirecting" baixada por engano: as animações nunca
   funcionaram e o console dava erro ("AOS is not defined"). Aconteceu aqui e no Studio +Movimento.
2. Script que sobe arquivo por arquivo: estoura o limite diário da Vercel.
3. Arquivo com quebra de linha CRLF muda o selo de integridade (SRI): o navegador bloqueia o script e a
   página fica **em branco**. O `.gitattributes` força LF e o `npm run build` confere.
4. Com script `build` no `package.json`, a Vercel exige `"outputDirectory": "."` no `vercel.json`.
5. `curl` repetido no domínio dispara o anti-robô da Vercel (erro 403). Não é o site caindo.

## Sessão na nuvem (aberta pelo celular, com o PC do dono desligado)

- Dá para: editar, rodar `npm run build`, abrir o PR, esperar o check da Vercel no PR e mesclar.
  Se não conseguir mesclar, peça ao dono para tocar em "Merge" no PR (dá pelo app do GitHub).
- Se não der para conferir o site no ar, diga isso claramente em vez de supor que funcionou.
- O que não der para fazer ou conferir na nuvem: deixe anotado no GitHub (issue, ou PR em rascunho)
  com título começando por **"Fazer no PC:"**, para não se perder.
