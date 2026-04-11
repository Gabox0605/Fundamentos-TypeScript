import { Negociacion } from "../models/negociacion.js";
import { Negociaciones } from '../models/negociaciones.js';
import { NegociacionesView } from "../views/negociaciones-view.js";
import { MensajeView } from "../views/mensaje-view.js";
import { DiasSemana } from "../enums/dias-semanas.js";
export class NegociacionController {
    constructor() {
        this.negociaciones = new Negociaciones();
        this.negociacionesView = new NegociacionesView('#negociacionesView', true);
        this.mensajeView = new MensajeView('#mensajeView');
        this.inputFecha = document.querySelector('#fecha');
        this.inputCantidad = document.querySelector('#cantidad');
        this.inputValor = document.querySelector('#valor');
        this.negociacionesView.update(this.negociaciones);
    }
    agrega() {
        const negociacion = Negociacion.crearNegociacion(this.inputFecha.value, this.inputCantidad.value, this.inputValor.value);
        if (!this.esDiaHabil(negociacion.fecha)) {
            this.mensajeView.update('Solo se pueden agregar negociaciones en días hábiles');
            return;
        }
        this.negociaciones.agrega(negociacion);
        this.actualizaView();
        this.limpiaFormulario();
    }
    esDiaHabil(fecha) {
        return fecha.getDay() > DiasSemana.DOMINGO && fecha.getDay() < DiasSemana.SABADO;
    }
    limpiaFormulario() {
        this.inputFecha.value = '';
        this.inputCantidad.value = '';
        this.inputValor.value = '';
        this.inputFecha.focus();
    }
    actualizaView() {
        this.negociacionesView.update(this.negociaciones);
        this.mensajeView.update('Negociación agregada con éxito');
    }
}
