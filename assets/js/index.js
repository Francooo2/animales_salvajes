import { Leon } from './Leon.js'
import { Lobo } from './Lobo.js'
import { Oso } from './Oso.js'
import { Serpiente } from './Serpiente.js'
import { Aguila } from './Aguila.js'

const resources = (() => {

    let elements = []
    const selectAnimal = document.getElementById('animal')
    const selectAnios = document.getElementById('edad')
    const commentary = document.getElementById('comentarios')
    const btnRegister = document.getElementById('btnRegistrar')
    const container   = document.getElementById('Animales')
    const preview   = document.getElementById('preview')

    const loadData = async (resource) => {
        const response = await fetch(resource)
        const animals = await response.json()
        return animals
    }

    return {

        elementsDOM: () => {
            elements.push(selectAnimal)
            elements.push(selectAnios)
            elements.push(commentary)
            elements.push(btnRegister)
            elements.push(container)
            elements.push(preview)
            return elements
        },

        resourceAnimals: async () => {
            try {
                let animals = await loadData('../animales.json')
                return animals
            } catch (e) {
                alert('En este momento no es posible cargar un recurso necesario.')
            }
        }
    }

})()


const getAndAddImage = (object) => {
    const image = document.createElement('img')
    const elements = resources.elementsDOM()
    elements[0].addEventListener('change', () => {
        image.setAttribute('src', "assets/imgs/" + object.animales[elements[0].selectedIndex - 1].imagen)
        image.classList.add('w-100', 'h-100')
        elements[5].appendChild(image)
    })
}

const createInstance = (object) => {

    const elements = resources.elementsDOM()


    if (elements[0].selectedIndex === 0 || elements[1].selectedIndex === 0 || elements[2].value === '') {
        alert('Favor llenar todos los campos solicitados.')
        return
    }

    const nameClass = [Leon, Lobo, Oso, Serpiente, Aguila]

    const animalInstance = new nameClass[elements[0].selectedIndex - 1](object.animales[elements[0].selectedIndex - 1].name, elements[1].value, object.animales[elements[0].selectedIndex - 1].imagen, elements[2].value, object.animales[elements[0].selectedIndex - 1].sonido)

    return animalInstance

}

let animalObject = await resources.resourceAnimals()

getAndAddImage(animalObject)

resources.elementsDOM()[3].addEventListener('click', () => {

    let animalInstance = createInstance(animalObject)

    let card = document.createElement('div')
    card.classList.add('card', 'w-25', 'mx-2')
    const newImage = document.createElement('img')
    const newBtn = document.createElement('button')
    newImage.setAttribute('src', "assets/imgs/" + animalInstance.getImg())
    newImage.setAttribute('data-toggle', "modal")
    newImage.setAttribute('data-target', "#exampleModal")
    newImage.setAttribute('role', "button")
    newImage.classList.add('show')
    newImage.style.height = '180px'
    const rangeAges = document.createElement('p')
    rangeAges.textContent = animalInstance.getEdad()
    rangeAges.classList.add('d-none')
    rangeAges.classList.add('mt-3')
    const animalCommentsTitle = document.createElement('p')
    animalCommentsTitle.textContent = 'Comentarios'
    animalCommentsTitle.classList.add('d-none', 'border-bottom', 'border-light')
    const animalComments = document.createElement('p')
    animalComments.textContent = animalInstance.getComentarios()
    animalComments.classList.add('d-none')
    newBtn.setAttribute('type', "button")
    newBtn.style.backgroundImage = "url('assets/imgs/audio.svg')"
    newBtn.style.backgroundSize = "contain"
    newBtn.style.backgroundRepeat = "no-repeat"
    newBtn.style.backgroundPosition = "top"
    newBtn.style.padding = "1em"
    newBtn.classList.add('btn', 'btn-secondary', animalInstance.getNombre())

    card.appendChild(newImage)
    card.appendChild(rangeAges)
    card.appendChild(animalCommentsTitle)
    card.appendChild(animalComments)
    card.appendChild(newBtn)
    resources.elementsDOM()[4].appendChild(card)

    resources.elementsDOM()[0].selectedIndex = 0
    resources.elementsDOM()[1].selectedIndex = 0
    resources.elementsDOM()[2].value   = ''
    resources.elementsDOM()[5].innerHTML     = ''

})

resources.elementsDOM()[4].addEventListener("click", (e) => {

    const typeAnimals = ['Leon', 'Lobo', 'Oso', 'Serpiente', 'Aguila']

    if (typeAnimals.includes(e.target.classList[2])) {
        let etiquetaAudio = document.createElement("audio")
        etiquetaAudio.setAttribute("src", "assets/sounds/" + animalObject.animales[typeAnimals.indexOf(e.target.classList[2])].sonido)
        etiquetaAudio.play()
    }

})

resources.elementsDOM()[4].addEventListener('click', (e) => {

    const windowModal = document.getElementsByClassName('modal-body')

    if (e.target.classList[0] === 'show') {
        const original = e.target.parentElement
        const clon = original.cloneNode(true)
        clon.classList.remove('w-25')
        windowModal[0].innerHTML = ''
        windowModal[0].appendChild(clon)
        const nodeList = windowModal[0].firstChild.childNodes
        windowModal[0].firstChild.classList.add('bg-dark', 'border-0', 'text-center')
        nodeList[0].style.height = '150%'
        nodeList[0].style.width = '100%'
        nodeList[1].classList.remove('d-none')
        nodeList[2].classList.remove('d-none')
        nodeList[3].classList.remove('d-none')
        nodeList[1].classList.add('text-light')
        nodeList[2].classList.add('text-light')
        nodeList[3].classList.add('text-light')
        nodeList[4].classList.add('d-none')
    }

})