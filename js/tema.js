/* Conmutador claro/oscuro. Sin elección guardada manda el sistema;
   en cuanto alguien pulsa, su decisión gana y se recuerda. */
(function () {
  const raiz = document.documentElement;
  const guardado = localStorage.getItem('tema');
  if (guardado) raiz.dataset.theme = guardado;

  const boton = document.querySelector('[data-tema]');
  if (!boton) return;

  function actual() {
    if (raiz.dataset.theme) return raiz.dataset.theme;
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function pintar() {
    const t = actual();
    boton.textContent = t === 'dark' ? 'Claro' : 'Oscuro';
    boton.setAttribute('aria-label', 'Cambiar a tema ' + (t === 'dark' ? 'claro' : 'oscuro'));
  }
  boton.addEventListener('click', function () {
    const nuevo = actual() === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = nuevo;
    localStorage.setItem('tema', nuevo);
    pintar();
  });
  pintar();
})();
