import { Negociacion } from './negociacion.js';

/**
 * Esta clase funciona como una "lista" o colección de negociaciones.
 * Su objetivo es encapsular el array para que nadie pueda borrar datos por accidente.
 */
export class Negociaciones {
    // Lista privada de negociaciones
    private negociaciones: Negociacion[] = [];

    // Agrega una nueva negociación a la lista
    public agrega(negociacion : Negociacion) {
        this.negociaciones.push(negociacion);
    }

    // Retorna la lista como 'readonly' (solo lectura) para que no se pueda modificar desde fuera
    public lista() : readonly Negociacion[] {
        return this.negociaciones;
    }
}
