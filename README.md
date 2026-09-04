# Eliset Gómez Quintero

Página de presentación de **Eliset Gómez Quintero**, misionera venezolana que
trabaja en la traducción de la Biblia al idioma **kari'ña** y como consultora de
traducción en **warao**, a través de la organización CLAN.

Sitio estático, sin dependencias ni build: HTML, CSS y tres archivos de JavaScript.

## Estructura

```
index.html          la página entera
css/tokens.css      paleta y escalas — la paleta sale de la foto del atardecer
css/styles.css      la composición
js/datos.js         datos para ofrendar, codificados en base64
js/apoyar.js        los descodifica al pulsar el botón, y deja copiarlos
js/tema.js          conmutador claro / oscuro
img/                foto de portada, foto del equipo y los dos logos
```

## Por qué los datos bancarios van codificados

Una cuenta y una cédula en texto plano dentro del HTML las recoge cualquier
rastreador automático que barra la web buscando justo eso. En base64 hay que
ejecutar el JavaScript para leerlas: una persona puede, un robot de raspado
corriente no. No es cifrado y no pretende serlo — es quitar el cartel de la
puerta. La dirección residencial no está en el repositorio, ni codificada.

## Desarrollo

No hay que instalar nada. Abrir `index.html` en el navegador.

Cada push a `main` despliega a GitHub Pages mediante `.github/workflows/pages.yml`.
