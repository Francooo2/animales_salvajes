import { Animal } from './Animal.js'

export class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    grunir() {
        return this.sonido
    }
}