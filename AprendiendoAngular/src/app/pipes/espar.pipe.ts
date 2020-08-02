// una pipe es como un helper para una vista
// resuelven pequeñas funcionalidades dentro de la vista
// esat pipe comprobara si el numero es par o impar
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'esPar'
})

// se debe declarar en app module ts para decvlararlo de forma global
export class EsParPipe implements PipeTransform {
    transform(value: any) {
        var espar = 'no es un número par';
        if (value % 2 == 0) {
            espar = 'si es un número par';
        }

        return 'El año es ' + value + ' y ' + espar;
    }
}