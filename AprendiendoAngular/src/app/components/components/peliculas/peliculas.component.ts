import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public mostrarPeliculas: boolean;

  // constructor tiene como tarea asignarle un valor a diferentes
  // propiedades, no se le debe meter lógica adentro , ni recoger
  // parametros de una url, ni hacer condiciones, ni llamar un metodo
  // eso es funcion del ngOnInit
  constructor() {
    this.titulo = 'Componente peliculas';
    console.log('CONSTRUCTOR LANZADO');
    this.mostrarPeliculas = true;
  }

  // el onInit es un elemento de los ciclos de vida 
  // se ejecuta cuando se carga la directiva (etiqueta) del documento
  // es el primero que se ejecuta despues de lanzar el constructor
  ngOnInit(): void {
    console.log('Componente Iniciado');
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

}
