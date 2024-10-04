const tablero = document.querySelector("#tablero")
const jugadorDisplay = document.querySelector("#jugador")
const InfoDisplay = document.querySelector("#info-display")
const width = 8

const piezasIniciales = [
    torre, caballo, alfil, reina, rey, alfil, caballo, torre,
    peon, peon, peon, peon, peon, peon, peon, peon,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    peon, peon, peon, peon, peon, peon, peon, peon,
    torre, caballo, alfil, reina, rey, alfil, caballo, torre
]


function crearTablero() {
    piezasIniciales.forEach((piezaInicial, i) => {
        const cuadrado = document.createElement('div')
        cuadrado.classList.add('cuadrado')
        cuadrado.innerHTML = piezaInicial
        cuadrado.firstChild ?.setAttribute('draggable', true)
        cuadrado.setAttribute('cuadrado-id', i)
        const linea = Math.floor( (63 - i) / 8 ) + 1
        if (linea % 2 == 0) {
            cuadrado.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            cuadrado.classList.add(i % 2 === 0 ? "brown" : "beige")
        }
        if (i <= 15) {
            cuadrado.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48) {
            cuadrado.firstChild.firstChild.classList.add('white')
        }
        tablero.append(cuadrado)
    }) 
}
crearTablero()


const allCuadrados = document.querySelectorAll("#tablero .cuadrado")

allCuadrados.forEach(cuadrado => {
    cuadrado.addEventListener('dragstart', dragStart)
    cuadrado.addEventListener('dragover', dragOver)
    cuadrado.addEventListener('drop', dragDrop)
})

let posicionStartId
let draggedElement

function dragStart(e) {
    posicionStartId = e.target.parentNode.getAttribute('cuadrado-id')
    draggedElement = e.target
}   

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    // e.target.parentNode.append(draggedElement)
    e.target.append(draggedElement)
}