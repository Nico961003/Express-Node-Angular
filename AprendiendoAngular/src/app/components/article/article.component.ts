import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    // recoger dato por la url
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          this._router.navigate(['/home']);
        }
      )
    })

  }

  delete(id) {

    swal({
      title: "¿Seguro de que deseas realizar esta acción?",
      text: "Una vez borrado el articulo, no podras recuperarlo",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {


        this._articleService.delete(id).subscribe(
          response => {
            swal("El articulo ha sido borrado", {
              icon: "success",
            });
            console.log(response);
            console.log('reponse');
            this._router.navigate(['/blog']);        
          },
          error => {
            console.log(error);
            console.log('error');
            this._router.navigate(['/blog']);   
          }
        );
       
      } else {
        swal("ok, Proceso cancelado");
      }
    });
  }

}
