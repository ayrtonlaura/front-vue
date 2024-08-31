export default [
  {
    target: '[data-step="1"]',
    content: `
      <b>Cajón de Búsqueda</b><br>
      Puede escribir una parte de la <u>descripción</u> del producto o el <u>código</u> para realizar la busqueda.<br>
      👉 Recuerde que debe escribir al menos 3 letras.`
  },
  {
    target: '[data-step="2"]',
    content: `
      <b>Opción: Todo</b><br>
      Si está seleccionada, se mostrarán todos los productos de las <u>lineas de productos</u> que se encuentren seleccionadas.<br>
      ⚠️ Esta opción puede causar demora.
    `
  },
  {
    target: '[data-step="3"]',
    content: `
      <b>Lineas de productos</b><br>
      Puede ser seleccionar una o varias linea de productos para la búsqueda del stock.
    `
  },
  {
    target: '[data-step="4"]',
    content: `
      <b>Opción: Mostrar tránsito</b><br>
      Si esta seleccionada, se realiza la consulta de las <u>guias de remisión</u> con destino a la agencia actual.<br>
      El resultado se muestra en la columna <b>Tránsito</b>, para más información puede hacer click en la cantidad.<br>
      ⚠️ Esta opción puede causar demora.
    `
  },
  {
    target: '[data-step="5"]',
    content: `
      <b>Opción: Mostrar con CEROS</b><br>
      Si esta seleccionada, se buscará tanto los productos con y sin stock.<br>
      ⚠️ Esta opción puede causar demora.
    `
  },
  {
    target: '[data-step="6"]',
    content: `
      <b>Botón: Buscar stock</b><br>
      Ejecuta la búsqueda de stock, con los parámetros establecidos, los resultados se mostrarán en la tabla inferior. 
    `
  },
  {
    target: '[data-step="8"]',
    content: `
      <b>Cajón de Fitrar resultados</b><br>
      Realiza el filtro de los resultados mostrados en pantalla
    `
  },
  {
    target: '[data-step="9"]',
    content: `
      <b>Boton: Descargar en Excel</b><br>
      Nos permite descargar en formato .xlsx (Excel), el resultado mostrado en pantalla.<br>
      👉 Se ha establecido el límite del stock, controlando el mínimo y máximo de las cantidades a exportar (Desarrollo Comercial)
    `
  }
]
