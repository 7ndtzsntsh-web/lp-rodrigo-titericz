# Site do Rodrigo Titericz — regras para o Claude

Site vendido pela Vanguard Web Studio a um cliente real: Rodrigo Titericz, advogado (OAB/SC 11.670), Florianópolis.
No ar em **https://titericz.com.br** (e em https://lp-rodrigo-titericz.vercel.app, que continua abrindo como reserva) (projeto Vercel `lp-rodrigo-titericz`, equipe `vanguard-web`;
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
  `rodrigo-retrato*.webp` (480, 640 e 819 px) de `rodrigo_1.png` (seção Sobre); `rodrigo_2.png` foi usada na prévia do WhatsApp;
  `og-capa.jpg` (prévia no WhatsApp, 1200x630) e os ícones com as fontes do próprio site.
- Nada de `loading="lazy"` dentro de bloco com `data-aos` (no Studio +Movimento, o conteúdo não apareceu no
  celular do dono).
- Estética: preto, dourado `#C5A059` (`brand-gold`), Playfair Display nos títulos e Outfit no texto. Elemento novo
  copia as classes de um equivalente que já existe.
- Animações: AOS (`js/aos.*.js`, `css/aos.*.css`) + `js/app.js` (menu do celular, números que contam, menu que
  escurece ao rolar). Se o AOS não carregar, o `app.js` põe `sem-animacao` e tudo aparece parado (nunca em branco).
  Quem pede menos animação no aparelho vê tudo parado.
  **Robôs de busca também veem tudo parado** (lista de nomes no começo do app.js: Googlebot, Google-InspectionTool, bingbot...).
  Motivo (29/09/2026): o robô do Google não rola a página, e 34 dos 40 blocos ficavam invisíveis para ele, com os números
  em 0. Não usar "bot" solto na lista: pega celular de verdade (o modelo CUBOT). O conteúdo é o mesmo; muda só a animação.
- Primeira tela com altura **min(95vh, 60rem)**, não só 95vh: o Google renderiza com uma tela altíssima, e com 95vh a seção
  virava 11.400 px com o título a 5.362 px do topo (a captura do Search Console mostrava só o menu). Não usar vh sem limite.
- Segurança: nota A+ 150/150 no MDN HTTP Observatory. Não pode cair. A CSP tem `connect-src 'self'` (e não 'none'):
  com 'none' o Lighthouse não conseguia ler o robots.txt e o llms.txt e acusava "robots.txt inválido" (SEO 92).
- Lighthouse (28/09/2026, depois dos ajustes): Acessibilidade, Práticas recomendadas, SEO e Navegação agêntica 100;
  Desempenho 97-100. `llms.txt` = resumo para assistentes de IA (precisa de links em Markdown).

## Conteúdo (fonte: documento do cliente "Rodrigo_Titericz_Conteudo_Site.docx", 28/09/2026)

- Todo o texto do site vem do documento, sem inventar. Em 28/09/2026 conferi linha por linha: as 61 linhas
  estão no site (as 7 áreas, os 8 cargos, formação, idiomas, experiência internacional, publicações,
  reconhecimento e contato).
- Pedidos do dono (28/09): no Sobre, "formado pela Univali em 1996" (o documento diz "(1996)"). Nos números da primeira
  tela a legenda vem EM CIMA do número, para ler como frase: "Formado pela Univali em / 1996" ("1996 formado pela Univali"
  ficava confuso). No cartão Telefone / WhatsApp, botão dourado "Falar no WhatsApp" igual aos outros (o verde "Chamar no
  WhatsApp" ele achou informal). Todos os botões de WhatsApp abrem com a mensagem pronta.
- E-mail: o dono disse que "não ia". O servidor do titericz.com funciona (Postfix e IMAP respondem em 170.84.17.242). O link
  mailto: só abre se o aparelho tiver programa de e-mail configurado (em muito computador não abre nada), e o teste vai
  para a caixa do Rodrigo, não do dono. Por isso: assunto "Contato pelo site" e botão "Copiar" ao lado de cada e-mail.
- **Mudanças pedidas pelo cliente depois do documento (28/09/2026, pelo WhatsApp) — valem mais que o documento:**
  área 05 "Direito Tributário e Administração Pública" trocada por **Direito Imobiliário** (processos administrativos, compra e
  venda, posse e propriedade, REURB, due diligence imobiliária); nova área 08 **Direito Aeronáutico** (responsabilidade civil,
  direitos do passageiro, drones/RPAS); são 8 áreas (o número da primeira tela e o llms.txt acompanham). Na trajetória, o último
  cargo ficou "Desde 1997 · Fibratur Turismo" (ele pediu para tirar o 2024 e o "Dom Bosco – Escola Inteligente").
- Advocacia tem regra de publicidade da OAB (Provimento 205/2021): texto informativo, **sem promessa de resultado**,
  sem preço e sem "captação" agressiva. Por isso "Experiência focada em resultados" virou "Uma trajetória de quase
  30 anos". Não acrescentar depoimento, número de causas ganhas nem frase de venda. "Especialista/especialidade" só com título
  de especialização: por isso o rótulo das áreas é "Atuação" e o título do contato é "Fale com Rodrigo Titericz".
- Contato: WhatsApp e telefone (48) 99180-1107 (`wa.me/5548991801107`); e-mails rodrigo@titericz.com e
  rodrigotitericz@gmail.com; Rua Adolfo Melo, 35, 12º andar, Florianópolis/SC (o documento não traz CEP).

## A confirmar com o cliente (não inventar)

- Mapa do Google embutido: não pus (o documento não pede); há o link "Ver no mapa".

## Domínio: titericz.com.br (no ar desde 29/09/2026)

- O dono tinha dito **titericz.com** (28/09), mas o cliente apontou para a Vercel o **titericz.com.br**, que também é dele.
  Por isso o site ficou no **.com.br**. Os dois usam o DNS da **GoDaddy**, em zonas separadas (mexer num não muda o outro):
  - **titericz.com.br**: registrado no registro.br desde 2009, vence 13/11/2027; DNS na GoDaddy (mns01/mns02.domaincontrol.com). Registros do site:
    `A @ 216.198.79.1`, `A @ 64.29.17.1` e `CNAME www ba220d5fe8ed608f.vercel-dns-017.com` (feitos pelo cliente em 29/09).
  - **titericz.com**: registrado em 2015, vence 27/11/2027; DNS em ns33/ns34.domaincontrol.com, **ainda no endereço antigo**
    (A 170.84.17.243, www -> sites.jspnet.com.br; zona sem mudança desde 2017). Se um dia o cliente puser ali os mesmos
    registros, o .com já está na Vercel e redireciona sozinho para o .com.br.
- **O e-mail do Rodrigo (rodrigo@titericz.com) mora na jspnet**, e os dois domínios têm MX (mx.petry.net.br,
  mail.jspnet.com.br), SPF e endereços mail/webmail/smtp/pop/imap/painel/ftp da jspnet. **Nunca mexer nesses registros nem
  trocar os nameservers** (a Vercel sugere os dela; trocar apagaria o e-mail). O e-mail no site continua @titericz.com.
- Na Vercel (projeto `lp-rodrigo-titericz`): titericz.com.br é o principal; www.titericz.com.br, titericz.com e
  www.titericz.com redirecionam (308) para ele. O endereço .vercel.app NÃO redireciona: fica de reserva. O canonical
  aponta para titericz.com.br, então o Google não conta o site duas vezes.
- **HSTS sem includeSubDomains e sem preload** (só `max-age`): os endereços da jspnet (webmail, painel) não têm certificado
  válido e ficariam inacessíveis para quem visitou o site. Por isso a nota no domínio é **A+ 145** (os +5 do vercel.app vêm
  de o vercel.app estar na lista de preload dos navegadores). Não pôr o domínio nessa lista.
- Conferir: `vercel domains verify titericz.com.br --scope vanguard-web`. Trocar de domínio de novo = trocar canonical,
  og:url, og:image, twitter:image, ld+json (e o hash na CSP), sitemap, robots e llms.txt, e publicar só depois do DNS.

## Google (Search Console)

- Site cadastrado no Google Search Console (29/09/2026) na conta Google do dono, propriedade
  https://titericz.com.br/. A verificação é a meta tag google-site-verification no head do index.html: **não remover**
  (senão o Google tira o acesso ao painel). Lá dá para ver se o site já aparece no Google, enviar o sitemap e pedir indexação.

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
