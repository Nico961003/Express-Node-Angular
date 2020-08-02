import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AprendiendoAngular';
  public homeText = 'Bienvenido al curso de master en Frameworks de JS';

  constructor(public router: Router) {
    
  }
}
