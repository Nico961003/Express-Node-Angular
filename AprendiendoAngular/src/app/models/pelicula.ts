
// un modelo es una clase que representa a un tipo de 
// objeto que va  a haber dentro de una aplicación
export class Pelicula {
    /*
    tipo de variable 
    Publica - usar donde sea
    protected - uso en la misma clase o en las heredadas
    privada - solo en la clase definida
    
    public title: string;
    public year: number;
    public image: string;

    constructor(title, year, image){
        this.title = title;
        this.year = year;
        this.image = image;
    }

    */

    // Se evita escribir lo anteriosmente comentado con lo siguiente:

    public constructor(
        public title: string,
        public year: number,
        public image: string
    ) { }
}