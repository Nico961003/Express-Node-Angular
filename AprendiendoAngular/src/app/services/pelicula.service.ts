/*

Un servicio dentro de angular es una clase que colecciona una serie de metodos
sirve principal para abstraer logica que estamos usando o para separar
ña funcionalidad que estamos haciendo en nuestros componentes

para iniciar los servicios se debe crear la carpeta services (todo minusculas)

*/


// importar el objeto injectable
// permite inyectar el servicio en un provider y asi siempre tenerlo disponible
import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService{


    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
        new Pelicula('spiderman 4', 2019, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg'),
        new Pelicula('Avenger', 2010, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg'),
        new Pelicula('Gangster americano', 2008, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg')
        ];
    }

    holaMundo(){
        return 'Hola mundo desde un servicio de angular';
    }

    getPeliculas(){
        return this.peliculas;
    }
}