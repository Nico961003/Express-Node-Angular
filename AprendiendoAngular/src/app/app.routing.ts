// importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// importar componentes a los cuales les quiero hacer una pagina exclusiva
// una seccion una pagina en concreto de mi sitio web
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { SigninComponent } from './components/signin/signin.component';

// array de rutas
// configuracion de todas las rutas que yo quiero crear
// importante dejar la ruta de error al ultimo para que no haya errores
const appRoutes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/crear', component: ArticleNewComponent },
    { path: 'blog/editar/:id', component: ArticleEditComponent },
    { path: 'formulario', component: FormularioComponent },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'blog/articulo/:id', component: ArticleComponent },
    { path: 'buscar/:search', component: SearchComponent },
    // de esta forma el parametro por url se vuelve opcional (paginas de pruebas)
    // puede o no puede llegar
    { path: 'pagina-de-pruebas', component: PaginaComponent },
    { path: 'pagina-de-pruebas/:nombre/:apellidos', component: PaginaComponent },
    { path: 'login', component: SigninComponent },
    { path: '**', component: ErrorComponent }
];

// exportar el modulo de rutas (se pueda usar en cualquier archivo)
export const appRoutingProviders: any[] = [];
// cargar toda la configuracion de rutas y hacer que existan y funcionen dentro
// del tema de routing de angular (se debe importar en app.module.ts)
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)