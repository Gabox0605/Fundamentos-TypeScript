import { Negociacion } from "../models/negociacion.js";
import { Negociaciones } from '../models/negociaciones.js';
import { NegociacionesView } from "../views/negociaciones-view.js";
import { MensajeView } from "../views/mensaje-view.js";
import { DiasSemana } from "../enums/dias-semanas.js";

export class NegociacionController {
    private inputFecha: HTMLInputElement;
    private inputCantidad: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociaciones = new Negociaciones();
    private negociacionesView = new NegociacionesView('#negociacionesView');
    private mensajeView = new MensajeView('#mensajeView');



    constructor() {
        this.inputFecha = document.querySelector('#fecha') as HTMLInputElement;
        this.inputCantidad = document.querySelector('#cantidad') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacionesView.update(this.negociaciones);
    }

    public agrega() : void {
        const negociacion = this.crearNegociacion();
        if (!this.esDiaHabil(negociacion.fecha)) {
            this.mensajeView.update('Solo se pueden agregar negociaciones en días hábiles');
            return;
        }
        this.negociaciones.agrega(negociacion);
        this.actualizaView();
        this.limpiaFormulario();
                               
    }

   private esDiaHabil(fecha: Date) : boolean {
        return fecha.getDay() > DiasSemana.DOMINGO && fecha.getDay() < DiasSemana.SABADO;
    }

    private crearNegociacion() : Negociacion {
        const regexp = /-/g;
        const fecha = this.inputFecha.value.replace(regexp,',');
        const cantidad = parseInt(this.inputCantidad.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacion(
            new Date(fecha),
            cantidad,
            valor
        );
    }

    
    private limpiaFormulario() : void {
        this.inputFecha.value = '';
        this.inputCantidad.value = '';
        this.inputValor.value = '';
        this.inputFecha.focus();
    }

   private actualizaView() : void {
        this.negociacionesView.update(this.negociaciones);
        this.mensajeView.update('Negociación agregada con éxito');  
    }
}