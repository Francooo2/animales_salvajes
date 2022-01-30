import { Animal } from './Animal.js'

export class Lobo extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    aullar() {
        return this.sonido
    }
}