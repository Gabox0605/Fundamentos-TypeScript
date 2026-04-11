/**
 * Representa una única negociación en el sistema.
 * Esta clase define la estructura de los datos que manejamos.
 */
export class Negociacion {
    
    /**
     * El constructor inicializa las propiedades de la clase.
     * Al usar 'private' o 'public readonly' en el constructor, TypeScript crea las variables automáticamente.
     */
    constructor(private _fecha: Date,
        public readonly cantidad: number,
        public readonly valor: number) {}

    // Getter para obtener la fecha. Usamos 'new Date' para evitar que modifiquen la fecha original (programación defensiva)
    get fecha(): Date {
        const nuevaFecha = new Date(this._fecha.getTime());
        return nuevaFecha;
    }

    // Calcula el total multiplicando cantidad por valor
    get total() : number {
        return this.cantidad * this.valor;
    }

    // Método estático: Permite crear una Negociación a partir de strings (útil para datos que vienen de formularios HTML)
    public static crearNegociacion(fechaString : string, cantidadString : string, valorString : string): Negociacion {
        const regexp = /-/g;
        const fecha = fechaString.replace(regexp,',');
        const cantidad = parseInt(cantidadString);
        const valor = parseFloat(valorString);
        return new Negociacion(
            new Date(fecha),
            cantidad,
            valor
        );
    }
}     
