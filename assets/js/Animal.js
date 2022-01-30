export class Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        this.nombre      = nombre
        this.edad        = edad
        this.img         = img
        this.comentarios = comentarios
        this.sonido      = sonido
    }

    getNombre() {
        return this.nombre
    }

    getEdad() {
        return this.edad
    }

    getImg() {
        return this.img
    }

    getComentarios() {
        return this.comentarios
    }

    getSonido() {
        return this.sonido
    }

    setNombre(nombre) {
        this.nombre = nombre
    }

    setEdad(edad) {
        this.edad = edad
    }

    setImg(img) {
        this.img = img
    }

    setComentarios(comentarios) {
        this.comentarios = comentarios
    }

    setSonido(sonido) {
        this.sonido = sonido
    }
}