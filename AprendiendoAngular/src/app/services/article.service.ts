import { Injectable } from '@angular/core';
// servicios http o su protocolo
// httpclient permite hacer peticiones ajax al backend
// httpHeaders permite mandar mas datos y manipular mas la info
import { HttpClient, HttpHeaders } from '@angular/common/http';
// los observables se usan para recoger los datos que devuelve el API
import { Observable } from 'rxjs';
// importando el modelo
import { Article } from '../models/article';
import { Global } from './global.service';

@Injectable()
export class ArticleService {

    public url: string;

    constructor(
        // hacer configuracion previas en app module
        // import { HttpClientModule } from '@angular/common/http';
        // y ademas agregarlo en los imports
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    pruebas() {
        return 'soy el servicio de articulos';
    }
    /* "Observable", que básicamente nos ahorra tener que hacer 
    consultas repetitivas de acceso a la fuente de información,
     aumentando el rendimiento de las aplicaciones
     
    getArticles(): Observable<any>{
        return this._http.get(this.url+'articles');*/

    // sacar el ultimo articulo
    // se hace uso de last igual que en el backend 
    getArticles(last: any = null): Observable<any> {

        var articles = 'articles';
        if (last != null) {
            articles = 'articles/true';
            console.log(articles);
        }

        return this._http.get(this.url + articles);
    }

    getArticle(articleId): Observable<any> {
        return this._http.get(this.url + 'article/' + articleId);
    }

    search(searchString): Observable<any> {
        // llamada ajax por metodo get
        return this._http.get(this.url + 'search/' + searchString);
    }

    create(article): Observable<any> {
        // cuando se mandan datos a la BD se deben enviar en String o numericos
        // en lugar de ser un objeto de java script se convierte a string
        // para poderlo enviar por una peticion http
        let params = JSON.stringify(article);
        // se puede configurar las cabeceras, passar autorizaciones, configurar cualquier cosa
        // el content-type va recibir un json, dependiendo del backend es la codificacion
        // que se le tenga que poner , en NodeJs se hace de esa manera
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/save', params, { headers: headers });
    }

    update(id, article): Observable<any> {
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'article/' + id, params, { headers: headers });
    }

    delete(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'article/' + id, { headers: headers });
    }
}

