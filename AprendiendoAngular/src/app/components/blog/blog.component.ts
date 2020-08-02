import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Global } from '../../services/global.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public articles: Article[];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.url = Global.url;
   }

  ngOnInit(): void {
    console.log(this._articleService.pruebas());
    // observable tiene un metodo que se llama subscribe que permite recoger 
    // los datos que devulve la peticion http
    // dos funciones de callback
    // PETICION AJAX
    /* AJAX, acrónimo de Asynchronous JavaScript And XML, 
    es una técnica de desarrollo web para crear aplicaciones
    interactivas o RIA. Estas aplicaciones se ejecutan en el cliente, 
    es decir, en el navegador de los usuarios mientras se mantiene 
    la comunicación asíncrona con el servidor en segundo plano.*/
    this._articleService.getArticles().subscribe(
      response => {
        if (response.articles) {
          this.articles = response.articles;
        } else{

        }
      },
      error => {
        console.log(error);
      }
    );
  }



}
