// Animações de entrada. Quem pediu menos animação no sistema vê tudo parado.
var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.AOS) {
  AOS.init({ once: true, offset: 60, duration: 800, easing: 'ease-out-cubic', disable: calmo });
} else {
  // O arquivo de animação não carregou: mostra tudo parado em vez de deixar a página em branco.
  document.documentElement.classList.add('sem-animacao');
}
if (calmo) document.documentElement.classList.add('sem-animacao');

// Menu do topo mais escuro depois de rolar a página.
var menu = document.querySelector('.menu-topo');
function aoRolar() {
  if (menu) menu.classList.toggle('rolou', window.scrollY > 40);
}
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// Menu do celular: abre e fecha no botão, e fecha ao escolher uma seção.
var botaoMenu = document.getElementById('botao-menu');
var menuCelular = document.getElementById('menu-celular');
function fecharMenu() {
  if (!menuCelular) return;
  menuCelular.classList.add('hidden');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu');
}
if (botaoMenu && menuCelular) {
  botaoMenu.addEventListener('click', function () {
    var abrir = menuCelular.classList.contains('hidden');
    menuCelular.classList.toggle('hidden', !abrir);
    botaoMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  });
  menuCelular.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', fecharMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharMenu();
  });
}

// Números que contam até o valor quando aparecem na tela. O número certo já está escrito no HTML:
// sem script (ou com menos animação), aparece direto o valor final.
var numeros = document.querySelectorAll('[data-contar]');
if (!calmo && 'IntersectionObserver' in window && numeros.length) {
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      observador.unobserve(entrada.target);
      var el = entrada.target;
      var fim = Number(el.getAttribute('data-contar'));
      var sufixo = el.getAttribute('data-sufixo') || '';
      var inicio = performance.now();
      var duracao = 1400;
      (function passo(agora) {
        var t = Math.min(1, (agora - inicio) / duracao);
        var suave = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(fim * suave) + sufixo;
        if (t < 1) requestAnimationFrame(passo);
      })(inicio);
    });
  }, { threshold: 0.6 });
  numeros.forEach(function (el) {
    el.textContent = '0' + (el.getAttribute('data-sufixo') || '');
    observador.observe(el);
  });
}

// Imagens não podem ser arrastadas. O CSS e o draggable="false" já resolvem na maioria dos
// navegadores; isto cobre os que ignoram os dois.
document.addEventListener('dragstart', function (e) {
  if (e.target && e.target.tagName === 'IMG') e.preventDefault();
});
