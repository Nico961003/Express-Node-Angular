import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public mostrarPeliculas: boolean;
  public peliculas: Pelicula[];
  public favorita: Pelicula;
  public fecha: any;

  // constructor tiene como tarea asignarle un valor a diferentes
  // propiedades, no se le debe meter lógica adentro , ni recoger
  // parametros de una url, ni hacer condiciones, ni llamar un metodo
  // eso es funcion del ngOnInit
  constructor(
    // el guion bajo esta destinado a los servicios
    // o a una propiedad vinculada a un servicio
    private _peliculaService: PeliculaService
  ) {
    this.titulo = 'Componente peliculas';
    console.log('CONSTRUCTOR LANZADO');
    this.mostrarPeliculas = true;
    this.fecha = new Date(2020, 8, 12);
    this.peliculas = [
      new Pelicula('spiderman 4', 2019, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg'),
      new Pelicula('Avenger', 2010, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg'),
      new Pelicula('Gangster americano', 2008, 'https://i.pinimg.com/originals/c8/7f/35/c87f35c5958c338ad593dad5cfc0729e.jpg')
      //  {year: 2010, title: 'Gangster americano', image: 'https://pics.filmaffinity.com/American_Gangster-362440268-large.jpg' },
    ];
  }

  // el onInit es un elemento de los ciclos de vida 
  // se ejecuta cuando se carga la directiva (etiqueta) del documento
  // es el primero que se ejecuta despues de lanzar el constructor
  ngOnInit(): void {
    console.log('Componente Iniciado');
    console.log(this.peliculas);
    this.peliculas = this._peliculaService.getPeliculas();
    // usando servicio
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck(): void {
    console.log('Do check lanzado');
  }

  cambiarTitulo() {
    this.titulo = 'El titulo cambio';
  }

  ngOnDestroy(): void {
    console.log('El componente se va a eliminar de la ejecucion instantanea');
  }

  ocultarPeliculas() {
    this.mostrarPeliculas = false;
  }

  mostrarFavorita(event) {
    this.favorita = event.pelicula;
  }

}
