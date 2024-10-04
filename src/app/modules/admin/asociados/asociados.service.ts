import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';
import { CommunicationService } from '../../../core/services/communication-service/communication.service';
import { Asociado } from 'app/core/model/asociado.model';

@Injectable({
    providedIn: 'root'
})
export class AsociadosService
{

    /**
     * Constructor
     */
    constructor(private communicationService: CommunicationService)
    {

    }


    getAsociados(): Observable<any> {
        return this.communicationService.apiGet('asociados', {});
    }

    getAsociado(id: number): Observable<any> {
        return this.communicationService.apiGet(`asociados/${id}`, {});
    }

    getEmptyAsociado():  Asociado {
        return {
            direccion: null,
            localidad: null,
            provincia: null,
            codigoPostal: null,
            cif: null,
            observaciones: null,
            telefono: null,
            email: null,
            codigoBanco: null,
            codigoSucursal: null,
            digitoControl: null,
            cuenta: null,
            descatalogado: false,
            fechaAlta:  null,
            iban: null,
            bic: {
                codigoBanco: null
            },
            pais: null,
            naturaleza: {
                id: 1
            },
            codigoTipoCliente: {
                id: 1
            },
            codigoTipoSociedad: {
                id: 0
            },
            nombrefiscal: null,
        };
    }

    saveAsociado(data: any): Observable<any> {
        return this.communicationService.apiPost('asociados', data);
    }

    updateAsociado(id: number, data: any): Observable<any> {
        return this.communicationService.apiPut(`asociados/${id}`, data);
    }

    deleteAsociado(id: number): Observable<any> {
        return this.communicationService.apiDelete(`asociados/${id}`, {});
    }

    getAsociadoCuotas(id: number): Observable<any> {
        return this.communicationService.apiGet(`cuota/asociado/${id}`, {});
    }

    getCuota(id: number): Observable<any> {
        return this.communicationService.apiGet(`cuota/${id}`, {});
    }

    createCuota(data: any): Observable<any> {
        return this.communicationService.apiPost('cuota', data);
    }

    updateCuota(data: any): Observable<any> {
        return this.communicationService.apiPut(`cuota/${data.id}`, data);
    }


    deleteCuota(id: number): Observable<any> {
        return this.communicationService.apiDelete(`cuota/${id}`, {});
    }

    getGrupos(): Observable<any> {
        return this.communicationService.apiGet('grupos', {});
    }

    getTiposAsociado(): Observable<any> {
        return this.communicationService.apiGet('asociadostipo', {});
    }

    getFormasJuridicas(): Observable<any> {
        return this.communicationService.apiGet('formas-juridicas', {});
    }

    getBICs(): Observable<any> {
        return this.communicationService.apiGet('asociadosbic', {});
    }


}
