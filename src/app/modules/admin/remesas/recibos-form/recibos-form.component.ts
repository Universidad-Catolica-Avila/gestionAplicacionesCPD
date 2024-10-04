import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsociadosService } from '../../asociados/asociados.service';

@Component({
  selector: 'app-recibos-form',
  templateUrl: './recibos-form.component.html',
  styleUrls: ['./recibos-form.component.scss']
})
export class RecibosFormComponent implements OnInit {

    @Input() cuota: any = null;
    public form: FormGroup;
    public _cuota: any = null;
    public grupos = [];

    constructor(
        private fb: FormBuilder,
        private asociadosService: AsociadosService,
        public matDialogRef: MatDialogRef<RecibosFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        this.asociadosService.getGrupos().subscribe( (response) => {
            this.grupos = response;
        });

        this.initForm();

    }

    saveAndClose(): void {
        this.matDialogRef.close(this.form.value);
    }

    cancel(): void {
        this.matDialogRef.close();
    }

    initForm(): void {
        this.form = this.fb.group({
            grupo: [null],
        });
    }
}
