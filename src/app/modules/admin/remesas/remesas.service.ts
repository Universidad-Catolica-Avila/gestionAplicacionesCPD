import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';
import { CommunicationService } from '../../../core/services/communication-service/communication.service';
import { Asociado } from 'app/core/model/asociado.model';

@Injectable({
    providedIn: 'root'
})
export class RemesasService
{

    /**
     * Constructor
     */
    constructor(private communicationService: CommunicationService)
    {

    }


    getRemesas(): Observable<any> {
        return this.communicationService.apiGet('remesa', {});
    }

    getRemesa(id: number): Observable<any> {
        return this.communicationService.apiGet(`remesa/${id}`, {});
    }

    getEmptyRemesa():  any {
        return {
            fechaVencimientoRemesa:      new Date(),
            fechaPresentacionRemesa:     new Date(),
            presentador:                'Asociación de Amigos de la UCAV',
            nifPresentador:             'G0514464',
            titulo:                     null,
            ordenante:                  'Asociación de Amigos de la UCAV',
            nifOrdenante:               'G0514464',
            entidadPresentador:         '0049',
            oficinaPresentador:         '4630',
            entidadOrdenante:           '0049',
            oficinaOrdenante:           '4630',
            remesaEmitida:              false,
            iban  :                     'ES6400494630142617509823',
            idBancoPresentador:         'A6509F56-90DE-4FF8-885B-79EAE9B3ADD2',
            idBancoCoordenante:         'A6509F56-90DE-4FF8-885B-79EAE9B3ADD2'
        };
    }

    saveRemesa(data: any): Observable<any> {
        return this.communicationService.apiPost('remesa', data);
    }

    updateRemesa(id: number, data: any): Observable<any> {
        return this.communicationService.apiPut(`remesa/${id}`, data);
    }

    duplicateRemesa(id: number): Observable<any> {
        return this.communicationService.apiPost(`remesa/duplicate/${id}`, {});
    }

    deleteRemesa(id: number): Observable<any> {
        return this.communicationService.apiDelete(`remesa/${id}`, {});
    }

    updateRemesaEmitida(id: number, emitida: boolean): Observable<any> {
        return this.communicationService.apiPut(`remesa/emitida/${id}`, emitida);
    }

    getRemesaRecibos(id: number): Observable<any> {
        return this.communicationService.apiGet(`remesa/recibos/${id}`, {});
    }

    getRecibo(id: number): Observable<any> {
        return this.communicationService.apiGet(`remesa/recibo/${id}`, {});
    }

    updateRecibo(data: any): Observable<any> {
        return this.communicationService.apiPut(`remesa/recibo/${data.id}`, data);
    }

    deleteRecibo(id: number): Observable<any> {
        return this.communicationService.apiDelete(`remesa/recibo/${id}`, {});
    }

    generateRecibos(id: number, group: number): Observable<any> {
        return this.communicationService.apiPost(`remesa/generate-remesa/${id}/${group}`, {});
    }

    emitirRemesa(id: number): Observable<any> {
        return this.communicationService.apiGet(`remesa/emitir-remesa/${id}`, {}, 'text');
    }
}
