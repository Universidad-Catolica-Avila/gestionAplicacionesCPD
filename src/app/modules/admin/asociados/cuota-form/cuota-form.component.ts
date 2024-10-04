import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cuota-form',
  templateUrl: './cuota-form.component.html',
  styleUrls: ['./cuota-form.component.scss']
})
export class CuotaFormComponent implements OnInit {

    @Input() cuota: any = null;
    public form: FormGroup;
    public _cuota: any = null;

    constructor(
        private fb: FormBuilder,
        public matDialogRef: MatDialogRef<CuotaFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    /*
    @Input() set cuota(value: any) {
        this._cuota = value;
        this.initForm(this._cuota);
    }*/

    ngOnInit(): void {
        if (this.data && this.data.cuota) {
            this.initForm(this.data.cuota);
        } else {
            this.initForm();
        }

    }

    saveAndClose(): void {
        this.matDialogRef.close(this.form.value);
    }

    cancel(): void {
        this.matDialogRef.close();
    }

    initForm(cuota: any = null): void {
        this.form = this.fb.group({
            id:                 [cuota ? cuota.id : null],
            conceptoFactura:    [cuota ? cuota.conceptoFactura : null, Validators.required],
            importeConcepto:    [cuota ? cuota.importeConcepto : null, Validators.required],
            orden:              [cuota ? cuota.orden : null, Validators.required],
            grupo:              [cuota ? cuota.grupo.id : null, Validators.required],
            estado:             [cuota ? cuota.estado.id : 1],
            formasPago:         [cuota ? cuota.formasPago.id : null, Validators.required],
            referenciaMandato:  [cuota ? cuota.referenciaMandato : null],
            fechaFirmaMandato:  [cuota ? cuota.fechaFirmaMandato : null],
            pagoPeriodico:      [cuota ? cuota.pagoPeriodico : true],
            iban:               [cuota ? cuota.iban : null]
        });
    }
}
