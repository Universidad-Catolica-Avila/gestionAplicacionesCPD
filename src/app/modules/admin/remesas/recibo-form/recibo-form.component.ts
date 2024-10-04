import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recibo-form',
  templateUrl: './recibo-form.component.html',
  styleUrls: ['./recibo-form.component.scss']
})
export class ReciboFormComponent implements OnInit, OnDestroy {
    @Input() recibo: any = null;
    @Output() save: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    private id: number = null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private fb: FormBuilder,
        private _fuseLoadingService: FuseLoadingService,
        public matDialogRef: MatDialogRef<ReciboFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


    ngOnInit(): void {
        if (this.data && this.data.recibo) {
            this.initForm(this.data.recibo);
        } else {
            this.initForm();
        }

    }

    initForm(recibo: any = null): void {
        this.form = this.fb.group({
            devuelto:                   [recibo ? recibo.devuelto : false],
            motivoDevolucion:           [recibo ? recibo.motivoDevolucion : null],
            gastosDevolucion:           [recibo ? recibo.gastosDevolucion : null],
            idConectaReciboDevuelto:    [recibo ? recibo.idConectaReciboDevuelto : null],
        });
    }

    saveAndClose(): void {
        this.recibo = {...this.data.recibo, ...this.form.value};
        this.matDialogRef.close(this.recibo);
    }

    cancel(): void {
        this.matDialogRef.close();
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
