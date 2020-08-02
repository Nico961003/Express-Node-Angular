import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit: boolean;
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
    this.page_title = "Crear Articulo";
    this.is_edit = false;
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this._articleService.create(this.article).subscribe(
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
          'Articulo creado',
          'El articulo se ha creado correctamente',
          'success'
        );
        console.log(response);
        this._router.navigate(['/blog']);
      },
      error => {
        console.log(error);
        this.status = 'error';
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
}
