import { Negociacion } from "../models/negociacion.js";
import { Negociaciones } from '../models/negociaciones.js';
import { NegociacionesView } from "../views/negociaciones-view.js";
import { MensajeView } from "../views/mensaje-view.js";
import { DiasSemana } from "../enums/dias-semanas.js";

/**
 * NegociacionController actúa como el intermediario entre la página HTML y la lógica de negocio.
 * Se encarga de capturar los datos del formulario y actualizar la pantalla.
 */
export class NegociacionController {
    private inputFecha: HTMLInputElement;
    private inputCantidad: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociaciones = new Negociaciones();
    private negociacionesView = new NegociacionesView('#negociacionesView', true);
    private mensajeView = new MensajeView('#mensajeView');



    constructor() {
        // Capturamos los elementos del DOM (HTML) y les decimos a TypeScript qué tipo de elemento son (Casting)
        this.inputFecha = document.querySelector('#fecha') as HTMLInputElement;
        this.inputCantidad = document.querySelector('#cantidad') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        // Dibujamos la tabla inicial (vacía)
        this.negociacionesView.update(this.negociaciones);
    }

    /**
     * Método principal que se ejecuta al intentar guardar una negociación.
     */
    public agrega() : void {
        // Creamos el objeto Negociacion usando los datos de los inputs
        const negociacion =  Negociacion.crearNegociacion(this.inputFecha.value, this.inputCantidad.value, this.inputValor.value);
        if (!this.esDiaHabil(negociacion.fecha)) {
            this.mensajeView.update('Solo se pueden agregar negociaciones en días hábiles');
            return;
        }
        this.negociaciones.agrega(negociacion);
        this.actualizaView();
        this.limpiaFormulario();
                               
    }

   /**
    * Valida si una fecha cae en día de semana (Lunes a Viernes).
    */
   private esDiaHabil(fecha: Date) : boolean {
        return fecha.getDay() > DiasSemana.DOMINGO && fecha.getDay() < DiasSemana.SABADO;
    }

  

    /**
     * Limpia los campos del formulario y pone el foco en la fecha para agilizar la carga.
     */
    private limpiaFormulario() : void {
        this.inputFecha.value = '';
        this.inputCantidad.value = '';
        this.inputValor.value = '';
        this.inputFecha.focus();
    }

   /**
    * Actualiza los componentes visuales de la aplicación.
    */
   private actualizaView() : void {
        this.negociacionesView.update(this.negociaciones);
        this.mensajeView.update('Negociación agregada con éxito');  
    }
}