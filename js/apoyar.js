/* Revela los datos de ofrenda solo cuando alguien los pide.
   Van en base64 (js/datos.js) por una razón concreta: una cuenta bancaria
   y una cédula en texto plano dentro del HTML las recogen los rastreadores
   automáticos que barren la web buscando justo eso. Codificadas, hay que
   ejecutar el JavaScript para verlas: cualquier persona puede, un robot de
   raspado corriente no. La dirección de su casa no está ni codificada. */

(function () {
  const boton = document.querySelector('[data-revelar]');
  const destino = document.getElementById('vias');
  if (!boton || !destino) return;

  function tarjeta(via) {
    const campos = via.campos.map(([que, valor]) => `
      <div class="campo">
        <p class="cifra">${valor}</p>
        <p class="que">${que}</p>
        <button class="copiar" type="button" data-copiar="${valor}">Copiar</button>
      </div>`).join('');

    return `
      <article class="via">
        <h3>${via.pais}</h3>
        <p class="banco">${via.banco}</p>
        <div class="campos">${campos}</div>
        <p class="titular">A nombre de ${via.titular}</p>
      </article>`;
  }

  boton.addEventListener('click', function () {
    const bytes = Uint8Array.from(atob(window.__APOYO), c => c.charCodeAt(0));
    const datos = JSON.parse(new TextDecoder().decode(bytes));
    destino.innerHTML = Object.values(datos).map(tarjeta).join('');
    destino.hidden = false;
    boton.hidden = true;
    // Al aparecer contenido nuevo, llevar el foco allí para que quien
    // navegue con teclado o lector de pantalla no se quede atrás.
    const primero = destino.querySelector('h3');
    primero.setAttribute('tabindex', '-1');
    primero.focus({ preventScroll: true });
  });

  // Un dígito mal copiado a mano manda el dinero a otra parte.
  destino.addEventListener('click', function (e) {
    const b = e.target.closest('[data-copiar]');
    if (!b) return;
    navigator.clipboard.writeText(b.dataset.copiar).then(function () {
      const antes = b.textContent;
      b.textContent = 'Copiado';
      b.classList.add('hecho');
      setTimeout(function () {
        b.textContent = antes;
        b.classList.remove('hecho');
      }, 1800);
    });
  });
})();
