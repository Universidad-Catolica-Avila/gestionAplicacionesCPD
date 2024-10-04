import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Asociado } from 'app/core/model/asociado.model';
import { Subject, takeUntil } from 'rxjs';
import { RemesasService } from '../remesas.service';

@Component({
  selector: 'app-remesa-form',
  templateUrl: './remesa-form.component.html',
  styleUrls: ['./remesa-form.component.scss']
})
export class RemesaFormComponent implements OnInit, OnDestroy {
    @Output() save: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    private _remesa: any = null;
    private id: number = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private remesasService: RemesasService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService
    ) { }

    @Input() set remesa(value: any){
        this._remesa = value;
        this.initForm(this._remesa);
    }

    ngOnInit(): void {

        this.route.params.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((params) => {
            this.id = params['id'];
         });



    }

    initForm(remesa: any = null): void {
        this.form = this.fb.group({
            fechaVencimientoRemesa:     [remesa && remesa.fechaVencimientoRemesa ? remesa.fechaVencimientoRemesa : new Date()],
            fechaPresentacionRemesa:    [remesa && remesa.fechaPresentacionRemesa ? remesa.fechaPresentacionRemesa : new Date()],
            presentador:                [remesa ? remesa.presentador : 'Asociación de Amigos de la UCAV', Validators.required],
            nifPresentador:             [remesa ? remesa.nifPresentador : 'G0514464', Validators.required],
            titulo:                     [remesa ? remesa.titulo : null, Validators.required],
            ordenante:                  [remesa ? remesa.ordenante : 'Asociación de Amigos de la UCAV', Validators.required],
            nifOrdenante:               [remesa ? remesa.nifOrdenante : 'G0514464', Validators.required],
            entidadPresentador:         [remesa ? remesa.entidadPresentador : null, Validators.required],
            oficinaPresentador:         [remesa ? remesa.oficinaOrdenante : null, Validators.required],
            entidadOrdenante:           [remesa ? remesa.entidadOrdenante : null, Validators.required],
            oficinaOrdenante:           [remesa ? remesa.oficinaOrdenante : null, Validators.required],
            remesaEmitida:              [remesa ? remesa.remesaEmitida : false],
            iban  :                     [remesa ? remesa.iban : null],
            idBancoPresentador:         [1],
            idBancoCoordenante:         [1]
        });
    }

    cancel(): void {
        this.router.navigate(['remesas']);
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
