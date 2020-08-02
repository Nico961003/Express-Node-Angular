import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
/** LOS FORMULARIOS SIEMPRE DEBEN SER DECLARADOS EN APP MODULE
 * O EL MODULO PRINCIPAL PARA QUE FUNCIONEN!
 * 
*/
export class FormularioComponent implements OnInit {
  public user: any;
  public campo: string;
  public campo2: string;
  constructor() {
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    }
  };

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.user);
    alert('datos enviados');
  }

  hasDadoClick(): void {
    alert('has dado clic');
  }

  hasSalido(): void {
    alert('has salido!');
  }

  hasPulsado(): void {
    alert('has pulsado enter');
  }
}
