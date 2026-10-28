urlAPI = 'https://dummyjson.com'

productos = []

function extraerProductos() {

    let endPoint = urlAPI + '/products'

    console.info(endPoint)

    fetch(endPoint)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            productos = respuestaJSON.products
            mostrarProductos(productos)
        })
        .catch(error => console.error(error))

}

function mostrarProductos(listaProductos) {

    let divPadre = document.getElementById('gridProductos')
    divPadre.innerHTML = ''

    listaProductos.forEach(producto => {

        let divProducto = crearDivProducto(producto)
        adicionarElementoAContenedor(divProducto, divPadre)

    })
}

function crearDivProducto(producto) {

    let div = crearElemento('div')
    div.classList.add('tarjetaProducto')

    let imagenProducto = crearImagen(producto.thumbnail, producto.title)
    imagenProducto.addEventListener('click', function () {

        irADetalleProducto(producto.id)

    })
    imagenProducto.classList.add('imagenProducto', 'puntero')
    adicionarElementoAContenedor(imagenProducto, div)

    let divCuerpo = crearElemento('div')
    divCuerpo.classList.add('cuerpoProducto')
    adicionarElementoAContenedor(divCuerpo, div)

    let pCategoria = crearNodoConTexto('p', producto.category)
    pCategoria.classList.add('categoriaProducto')
    adicionarElementoAContenedor(pCategoria, divCuerpo)

    let hNombre = crearNodoConTexto('h3', producto.title)
    hNombre.classList.add('nombreProducto')
    adicionarElementoAContenedor(hNombre, divCuerpo)

    let divFilaPrecio = crearElemento('div')
    divFilaPrecio.classList.add('filaPrecio')
    adicionarElementoAContenedor(divFilaPrecio, divCuerpo)

    let pPrecio = crearNodoConTexto('p', '$' + producto.price)
    pPrecio.classList.add('precioProducto')
    adicionarElementoAContenedor(pPrecio, divFilaPrecio)

    let pCalificacion = crearNodoConTexto('p', '★ ' + producto.rating)
    pCalificacion.classList.add('calificacionProducto')
    adicionarElementoAContenedor(pCalificacion, divFilaPrecio)

    let pStock = crearNodoConTexto('p', 'Stock: ' + producto.stock)
    pStock.classList.add('stockProducto')
    adicionarElementoAContenedor(pStock, divCuerpo)

    let botonVer = crearNodoConTexto('button', 'Ver producto')
    botonVer.classList.add('botonProducto', 'puntero')
    botonVer.addEventListener('click', function () {

        irADetalleProducto(producto.id)

    })
    adicionarElementoAContenedor(botonVer, divCuerpo)

    return div
}

function irADetalleProducto(idProducto) {

    window.location.href = 'html/producto.html?id=' + idProducto

}

function extraerDatosProducto(idProducto) {

    let endPoint = urlAPI + '/products/' + idProducto

    console.info(endPoint)

    fetch(endPoint)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            mostrarDatosProducto(respuestaJSON)
        })
        .catch(error => console.error(error))

}

function mostrarDatosProducto(producto) {

    let divPadre = document.getElementById('tarjetaDetalle')

    let imagenProducto = crearImagen(producto.thumbnail, producto.title)
    imagenProducto.classList.add('imagenDetalle')
    adicionarElementoAContenedor(imagenProducto, divPadre)

    let divInfo = crearElemento('div')
    divInfo.classList.add('infoDetalle')
    adicionarElementoAContenedor(divInfo, divPadre)

    let pCategoria = crearNodoConTexto('p', producto.category)
    pCategoria.classList.add('categoriaDetalle')
    adicionarElementoAContenedor(pCategoria, divInfo)

    let hNombre = crearNodoConTexto('h2', producto.title)
    hNombre.classList.add('tituloDetalle')
    adicionarElementoAContenedor(hNombre, divInfo)

    let pPrecio = crearNodoConTexto('p', '$' + producto.price)
    pPrecio.classList.add('precioDetalle')
    adicionarElementoAContenedor(pPrecio, divInfo)

    let pDescripcion = crearNodoConTexto('p', producto.description)
    pDescripcion.classList.add('descripcionDetalle')
    adicionarElementoAContenedor(pDescripcion, divInfo)

    let divDatos = crearElemento('div')
    divDatos.classList.add('gridDatos')
    adicionarElementoAContenedor(divDatos, divInfo)

    let marca = producto.brand
    if (!marca) {
        marca = 'Sin marca'
    }

    let datos = [
        { etiqueta: 'Calificación', valor: '★ ' + producto.rating },
        { etiqueta: 'Stock', valor: producto.stock },
        { etiqueta: 'Marca', valor: marca },
        { etiqueta: 'Descuento', valor: producto.discountPercentage + '%' }
    ]

    datos.forEach(dato => {

        let divDato = crearElemento('div')
        divDato.classList.add('datoDetalle')

        let pEtiqueta = crearNodoConTexto('p', dato.etiqueta)
        pEtiqueta.classList.add('etiquetaDato')
        adicionarElementoAContenedor(pEtiqueta, divDato)

        let pValor = crearNodoConTexto('p', dato.valor)
        pValor.classList.add('valorDato')
        adicionarElementoAContenedor(pValor, divDato)

        adicionarElementoAContenedor(divDato, divDatos)

    })
}