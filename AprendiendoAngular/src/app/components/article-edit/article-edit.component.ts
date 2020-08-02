import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  // se usa la misma vista del article-new
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})

export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  afuConfig = {
    // multiples archivos permitidos? false= no
    multiple: false,
    // formatos permitidos
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      // url en donde se va subir la imagen
      url: Global.url + 'upload-image'
    },
    // formulario mas clasico 
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = "Editar Articulo";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.page_title = "Editar Articulo";
    this.getArticle();
    this.is_edit = true;
    this.url = Global.url;
  }

  onSubmit(): void {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
        } else {
          this.status == 'error';
          console.log('error');
        }
        // Alerta
        swal(
          'Articulo modificado',
          'El articulo se ha modificado correctamente',
          'success'
        );
        console.log(response);
        this._router.navigate(['/blog/articulo', this.article._id]);
      },
      error => {
        console.log(error);
        this.status = 'error';
        // Alerta
        swal(
          'Articulo no modificado',
          'El articulo se ha modificado correctamente',
          'error'
        );
      }
    );
  }

  imageUpload(data): void {
    alert(data.response);
    let image_data = JSON.parse(data.response);
    // utilizando el campo con el plñugin. subnir el archivo
    // recoger el nombre del archivo subido
    // adjuntarlo dentro del objeto del articulo , daurdandolo en la 
    // propiedad imagen y de esa manera se guarda la imagen como tal
    this.article = image_data.image;
  }

  getArticle(): void {
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
}
