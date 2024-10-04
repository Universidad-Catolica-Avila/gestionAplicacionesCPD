import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Asociado } from 'app/core/model/asociado.model';
import { Subject, takeUntil } from 'rxjs';
import { AsociadosService } from '../asociados.service';

@Component({
  selector: 'app-asociado-form',
  templateUrl: './asociado-form.component.html',
  styleUrls: ['./asociado-form.component.scss']
})
export class AsociadoFormComponent implements OnInit, OnDestroy {
    @Output() save: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    typesAsociados: any[] = [];
    formasJuridicas: any = [];
    bics: any = [];

    private _asociado: Asociado = null;
    private id: number = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private asociadoService: AsociadosService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService
    ) { }

    @Input() set asociado(value: Asociado){
        this._asociado = value;
        this.initForm(this._asociado);
    }

    ngOnInit(): void {

        this.asociadoService.getTiposAsociado().subscribe((response) => {
            this.typesAsociados = response;
        });

        this.asociadoService.getFormasJuridicas().subscribe((response) => {
            this.formasJuridicas = response;
        });

        this.asociadoService.getBICs().subscribe((response) => {
            this.bics = response;
        });


        this.route.params.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((params) => {
            this.id = params['id'];
         });



    }

    initForm(asociado: Asociado = null): void {
        this.form = this.fb.group({
            nombreFiscal:       [asociado ? asociado.nombrefiscal : null, Validators.required],
            codigoTipoCliente:  [asociado ? asociado.codigoTipoCliente.id : null, Validators.required],
            cif:                [asociado ? asociado.cif : null, Validators.required],
            observaciones:      [asociado ? asociado.observaciones : null],
            direccion :         [asociado ? asociado.direccion : null],
            codigoPostal :      [asociado ? asociado.codigoPostal : null],
            localidad :         [asociado ? asociado.localidad : null],
            provincia :         [asociado ? asociado.provincia : null],
            email   :           [asociado ? asociado.email : null, Validators.email],
            telefono   :        [asociado ? asociado.telefono : null],
            pais :              [asociado ? asociado.pais : null, Validators.required],
            codigoTipoSociedad: [asociado ? asociado.codigoTipoSociedad.id : null, Validators.required],
            fechaAlta:          [asociado && asociado.fechaAlta ? asociado.fechaAlta : new Date()],
            naturaleza   :      [asociado ? asociado.naturaleza.id : 1, Validators.required],
            codigoBanco  :      [asociado ? asociado.codigoBanco : null],
            codigoSucursal  :   [asociado ? asociado.codigoSucursal : null],
            digitoControl  :    [asociado ? asociado.digitoControl : null],
            cuenta  :           [asociado ? asociado.cuenta : null],
            bic  :              [asociado ? asociado.bic.codigoBanco : null, Validators.required],
            iban  :             [asociado ? asociado.iban : null],
            descatalogado:      [asociado ? asociado.descatalogado : false],
        });
    }

    cancel(): void {
        this.router.navigate(['asociados']);
    }

    saveForm(): void {
        this._fuseLoadingService.show();
        this.save.emit(this.form.value);
    }

    /**
     * On destroy
     */
     ngOnDestroy(): void
     {
         // Unsubscribe from all subscriptions
         this._unsubscribeAll.next(null);
         this._unsubscribeAll.complete();
     }
}
