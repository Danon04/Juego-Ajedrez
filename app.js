const tablero = document.querySelector("#tablero")
const jugadorDisplay = document.querySelector("#jugador")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let turnoJugador = 'negro'
jugadorDisplay.textContent = 'negro'

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
            cuadrado.classList.add(i % 2 === 0 ? "color1" : "color2")
        } else {
            cuadrado.classList.add(i % 2 === 0 ? "color2" : "color1")
        }
        if (i <= 15) {
            cuadrado.firstChild.firstChild.classList.add('negro')
        }
        if (i >= 48) {
            cuadrado.firstChild.firstChild.classList.add('blanco')
        }
        tablero.append(cuadrado)
    }) 
}
crearTablero()


const allCuadrados = document.querySelectorAll(".cuadrado")

allCuadrados.forEach(cuadrado => {
    cuadrado.addEventListener('dragstart', dragStart)
    cuadrado.addEventListener('dragover', dragOver)
    cuadrado.addEventListener('drop', dragDrop)
})

let posInicioId
let draggedElement

function dragStart(e) {
    posInicioId = e.target.parentNode.getAttribute('cuadrado-id')
    draggedElement = e.target
}   

function dragOver(e) {
    e.preventDefault()
}
function dragDrop(e) {
    e.stopPropagation()
    const turnoCorrecto = draggedElement.firstChild.classList.contains(turnoJugador)
    const tomada = e.target.classList.contains('pieza')
    const valido = revisarValidez(e.target)
    const turnoOponente = turnoJugador === 'blanco' ? 'negro' : 'blanco'
    const tomadaXoponente = e.target.firstChild?.classList.contains(turnoOponente)
    
    if (turnoCorrecto) {
        //se debe revisar esto primero
        if (tomadaXoponente && valido) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkGanador()
            cambiarJugador()
            return
        }
        //despues revisar esto
        if (tomada && !tomadaXoponente) {
            infoDisplay.textContent = "Haz un movimiento valido!!"
            setTimeout(() => infoDisplay.textContent = "", 2000)
            return
        }
        if (valido) {
            e.target.append(draggedElement)
            checkGanador()
            cambiarJugador()
            return
        }
    }
}

function revisarValidez(target) {
    const targetId = Number(target.getAttribute('cuadrado-id')) || Number(target.parentNode.getAttribute('cuadrado-id'))
    const inicioId = Number(posInicioId)
    const pieza = draggedElement.id
    console.log('targetId', targetId)
    console.log('inicioId', inicioId)
    console.log('pieza', pieza)

    switch(pieza) {
        case 'peon' :
            const lineaInicial = [8,9,10,11,12,13,14,15]
            if (
                lineaInicial.includes(inicioId) && inicioId + width *2 === targetId ||
                inicioId + width === targetId ||
                inicioId + width - 1 === targetId  && document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`) ||
                inicioId + width + 1 === targetId  && document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`)
                ) {
                return true
            }
            break;
        case 'caballo' :
            if (
                inicioId + (2 * width) - 1 === targetId ||
                inicioId + (2 * width) + 1 === targetId ||
                inicioId + width - 2 === targetId ||
                inicioId + width + 2 === targetId ||
                inicioId - width + 2 === targetId ||
                inicioId - width - 2 === targetId ||
                inicioId - (2 * width) - 1 === targetId ||
                inicioId - (2 * width) + 1 === targetId 
                ) {
                    return true
            }
            break;
        case 'alfil' :
            if (
                //izquierda
                inicioId + width + 1 === targetId ||
                inicioId + (width * 2) + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild ||
                inicioId + (width * 3) + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild ||
                inicioId + (width * 4) + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild ||
                inicioId + (width * 5) + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild ||
                inicioId + (width * 6) + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) + 5}"]`).firstChild ||
                inicioId + (width * 7) + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) + 5}"]`).firstChild && document.querySelector(`[cuadrado-id="${inicioId + (width * 6) + 6}"]`).firstChild ||
                //derecha
                inicioId + width - 1 === targetId ||
                inicioId + (width * 2) - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild ||
                inicioId + (width * 3) - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild ||
                inicioId + (width * 4) - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild ||
                inicioId + (width * 5) - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild ||
                inicioId + (width * 6) - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) - 5}"]`).firstChild ||
                inicioId + (width * 7) - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 6) - 6}"]`).firstChild ||
                //atras izquierda
                inicioId - width + 1 === targetId ||
                inicioId - (width * 2) + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild ||
                inicioId - (width * 3) + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild ||
                inicioId - (width * 4) + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild ||
                inicioId - (width * 5) + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild ||
                inicioId - (width * 6) + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) + 5}"]`).firstChild ||
                inicioId - (width * 7) + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) + 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 6) + 6}"]`).firstChild ||
                //atras derecha
                inicioId - width - 1 === targetId ||
                inicioId - (width * 2) - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild ||
                inicioId - (width * 3) - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild ||
                inicioId - (width * 4) - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild ||
                inicioId - (width * 5) - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild ||
                inicioId - (width * 6) - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) - 5}"]`).firstChild ||
                inicioId - (width * 7) - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 6) - 6}"]`).firstChild
                ) {
                    return true
            }
            break;
        case 'torre' :
            if (
                inicioId + width === targetId ||
                inicioId + width * 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild ||
                inicioId + width * 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild ||
                inicioId + width * 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild ||
                inicioId + width * 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild ||
                inicioId + width * 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + width * 5}"]`).firstChild ||
                inicioId + width * 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + width * 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 6}"]`).firstChild ||
                //adelante
                inicioId - width === targetId ||
                inicioId - width * 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild ||
                inicioId - width * 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild ||
                inicioId - width * 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild ||
                inicioId - width * 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild ||
                inicioId - width * 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - width * 5}"]`).firstChild ||
                inicioId - width * 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - width * 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 6}"]`).firstChild ||
                //izquierda
                inicioId + 1 === targetId ||
                inicioId + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild ||
                inicioId + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild ||
                inicioId + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild ||
                inicioId + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild ||
                inicioId + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + 5}"]`).firstChild ||
                inicioId + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 6}"]`).firstChild ||
                //derecha
                inicioId - 1 === targetId ||
                inicioId - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild ||
                inicioId - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild ||
                inicioId - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild ||
                inicioId - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild ||
                inicioId - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - 5}"]`).firstChild ||
                inicioId - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 6}"]`).firstChild
                ) {
                    return true
            }
            break;
        case 'reina' :
            if (
                inicioId + width + 1 === targetId || 
                inicioId + (width * 2) + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild ||
                inicioId + (width * 3) + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild ||
                inicioId + (width * 4) + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild ||
                inicioId + (width * 5) + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild ||
                inicioId + (width * 6) + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) + 5}"]`).firstChild ||
                inicioId + (width * 7) + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) + 5}"]`).firstChild && document.querySelector(`[cuadrado-id="${inicioId + (width * 6) + 6}"]`).firstChild ||
                //derecha
                inicioId + width - 1 === targetId ||
                inicioId + (width * 2) - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild ||
                inicioId + (width * 3) - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild ||
                inicioId + (width * 4) - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild ||
                inicioId + (width * 5) - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild ||
                inicioId + (width * 6) - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) - 5}"]`).firstChild ||
                inicioId + (width * 7) - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 5) - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + (width * 6) - 6}"]`).firstChild ||
                //atras izquierda
                inicioId - width + 1 === targetId ||
                inicioId - (width * 2) + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild ||
                inicioId - (width * 3) + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild ||
                inicioId - (width * 4) + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild ||
                inicioId - (width * 5) + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild ||
                inicioId - (width * 6) + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) + 5}"]`).firstChild ||
                inicioId - (width * 7) + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) + 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) + 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) + 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 6) + 6}"]`).firstChild ||
                //atras derecha
                inicioId - width - 1 === targetId ||
                inicioId - (width * 2) - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild ||
                inicioId - (width * 3) - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild ||
                inicioId - (width * 4) - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild ||
                inicioId - (width * 5) - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild ||
                inicioId - (width * 6) - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) - 5}"]`).firstChild ||
                inicioId - (width * 7) - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 2) - 2}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - (width * 3) - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 4) - 4}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 5) - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - (width * 6) - 6}"]`).firstChild ||
                // --
                inicioId + width === targetId ||
                inicioId + width * 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild ||
                inicioId + width * 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild ||
                inicioId + width * 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild ||
                inicioId + width * 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild ||
                inicioId + width * 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + width * 5}"]`).firstChild ||
                inicioId + width * 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + width * 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + width * 6}"]`).firstChild ||
                //adelante
                inicioId - width === targetId ||
                inicioId - width * 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild ||
                inicioId - width * 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild ||
                inicioId - width * 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild ||
                inicioId - width * 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild ||
                inicioId - width * 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - width * 5}"]`).firstChild ||
                inicioId - width * 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - width}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - width * 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - width * 6}"]`).firstChild ||
                //izquierda
                inicioId + 1 === targetId ||
                inicioId + 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild ||
                inicioId + 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild ||
                inicioId + 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild ||
                inicioId + 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild ||
                inicioId + 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + 5}"]`).firstChild ||
                inicioId + 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId + 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId + 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId + 6}"]`).firstChild ||
                //derecha
                inicioId - 1 === targetId ||
                inicioId - 2 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild ||
                inicioId - 3 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild ||
                inicioId - 4 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild ||
                inicioId - 5 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild ||
                inicioId - 6 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - 5}"]`).firstChild ||
                inicioId - 7 === targetId && !document.querySelector(`[cuadrado-id="${inicioId - 1}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 2}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 3}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 4}"]`).firstChild  && !document.querySelector(`[cuadrado-id="${inicioId - 5}"]`).firstChild && !document.querySelector(`[cuadrado-id="${inicioId - 6}"]`).firstChild
                ) {
                    return true
            }
            break;
        case 'rey' :
            if(
                inicioId + 1 === targetId ||
                inicioId - 1 === targetId ||
                inicioId + width === targetId ||
                inicioId - width === targetId ||
                inicioId + width + 1 === targetId ||
                inicioId + width - 1 === targetId ||
                inicioId - width + 1 === targetId ||
                inicioId - width - 1 === targetId
                ){
                    return true
            }
    }
}

function cambiarJugador() {
    if (turnoJugador === "negro"){
        invertirIds()
        turnoJugador = "blanco"
        jugadorDisplay.textContent = "blanco"
    } else {
        revertirIds()
        turnoJugador = "negro"
        jugadorDisplay.textContent = "negro"
    }
}

function invertirIds() {
    const allCuadrados = document.querySelectorAll(".cuadrado")
    allCuadrados.forEach((cuadrado, i) => 
        cuadrado.setAttribute('cuadrado-id', (width * width - 1) - i))
}

function revertirIds() {
    const allCuadrados = document.querySelectorAll(".cuadrado")
    allCuadrados.forEach((cuadrado, i) => cuadrado.setAttribute('cuadrado-id', i))
}

function checkGanador() {
    const reyes = Array.from(document.querySelectorAll('#rey'))
    console.log(reyes)
    if (!reyes.some(rey => rey.firstChild.classList.contains('blanco'))) {
        infoDisplay.innerHTML = "Victoria piezas Negras!"
        const allCuadrados = document.querySelectoAll('.cuadrado')
        allCuadrados.forEach(cuadrado => cuadrado.firstChild.setAttribute('draggable', false))
    }
    if (!reyes.some(rey => rey.firstChild.classList.contains('negro'))) {
        infoDisplay.innerHTML = "Victoria piezas Blancas!"
        const allCuadrados = document.querySelectoAll('.cuadrado')
        allCuadrados.forEach(cuadrado => cuadrado.firstChild.setAttribute('draggable', false))
    }
}