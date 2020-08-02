// core de angular que es un modulo del mismo
import { Component } from '@angular/core';

// con el @Component se le dan las caracteristicas de este componente
@Component({
    // se le indica el nombre de la etiqueta que se va a generar
    // a novel html que se va a estar utilizando
    selector: 'mi-componente',
    /* la template es el hjtml dentro del componente
     pero se puede separar con la templateUrl
     binding es UNION
     en este caso es binding por interpolacion, mostrar una propiedad
     en una vista
    Esta es una forma de hacer uso de template pero lo correcto es hacer uso de
    su propio archivo .html
    template: `
    <h1> {{title}} 2</h1>
    <h2> {{year}} 2</h2>
    <p> {{comentario}} 2</p>
    `,*/
    templateUrl: './mi-componente.component.html'

}) // no poner ; por que marca error

export class MiComponente {

    public title: string;
    public comentario: string;
    public year: number;
    public titulo: string;
    public mostrarPeliculas: boolean;

    constructor() {
        this.title = 'Hola mundo, este es mi primer componente';
        this.comentario = 'Este es mi primer componente';
        this.year = 2020;
        this.mostrarPeliculas = true;
        console.log('Mi componente cargado ' + this.title + this.comentario + this.year);
    }

    ocultarPeliculas() {
        this.mostrarPeliculas = true;
    }
}

// el componente debe ser cargado en el app.module para poder ser visualizado