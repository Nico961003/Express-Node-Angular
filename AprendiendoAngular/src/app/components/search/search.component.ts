import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public articles: Article[];
  public search: string;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // recoger parametro de la url
    this._route.params.subscribe(params => {
      var search = params['search'];
      this.search = search;
      // pasando la ruta a la API
      this._articleService.search(search).subscribe(
        response => {
          if (response.articles) {
            this.articles = response.articles;
          } else {
            this.articles = [];
          }
          // console.log(this.articles);
        },
        error => {
          console.log(error);
          this.articles = [];
        }
      )
      // alert(search);
    })
  }

}
