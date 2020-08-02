import { Component, OnInit } from '@angular/core';
// para obtener parametros por la url
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

public nombre:string;
public apellidos:string;

  constructor(
    // dos objetos de router para poder usar todas sus librerias 
    // con activated puede sacar los parametros de la url
    private _route: ActivatedRoute,
    // y con router se puede redireccionar a otras paginas
    private _router: Router
  ) { }

  ngOnInit(): void {
    // recoger los parametros de la url
    // un observable: mira o espera la respuesta de un servicio
    // subscribe va a recibir un objeto
    this._route.params.subscribe((params : Params) => {
      this.nombre = params.nombre;
      this.apellidos = params.apellidos;
    });
  }

  redireccion(){
    // redireccion sencilla
    // this._router.navigate(['/formulario']);
    // redireccion con parametros
    this._router.navigate(['/pagina-de-pruebas', 'Genaro', 'rodz']);
  }

}
