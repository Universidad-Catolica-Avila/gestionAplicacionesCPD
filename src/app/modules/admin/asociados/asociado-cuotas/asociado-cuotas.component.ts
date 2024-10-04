import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Asociado } from 'app/core/model/asociado.model';
import { AsociadosService } from '../asociados.service';
import { CuotaFormComponent } from '../cuota-form/cuota-form.component';

@Component({
  selector: 'app-asociado-cuotas',
  templateUrl: './asociado-cuotas.component.html',
  styleUrls: ['./asociado-cuotas.component.scss']
})
export class AsociadoCuotasComponent implements OnInit {


    displayedColumns: string[] = [
        'concepto',
        'importe',
        'fechaBaja',
        'estado',
        'grupo',
        'formaPago',
        'referenciaMandato',
        'referenciaMandato',
        'pagoPeriodico',
        'orden',
        'acciones'
    ];

    cuotas: any[] = [];


    public _asociado: Asociado = null;

    constructor(
        private asociadosService: AsociadosService,
        private router: Router,
        private matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    @Input() set asociado(value: Asociado){
        this._asociado = value;
        if (this._asociado.id) {
            this.getCuotas();
        }
    }

    ngOnInit(): void {
    }

    getCuotas(): void {
        this.asociadosService.getAsociadoCuotas(this._asociado.id).subscribe((response) => {
            this.cuotas = response;
        });
    }

    createCuota(): void {
        const dialogRef = this.matDialog.open(CuotaFormComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result);
                const cuota = result;
                cuota.asociado = this._asociado.id;
                this.asociadosService.createCuota(cuota).subscribe( (response) => {
                    this.getCuotas();
                });
            }
        });
    }

    openCuota(id: number): void {
        this.asociadosService.getCuota(id).subscribe((cuota)=> {
            console.log(cuota);
            const dialogRef = this.matDialog.open(CuotaFormComponent, {data: {cuota}});

            dialogRef.afterClosed().subscribe((result) => {
                console.log('viene de guardar', result);
                if (result) {
                    const c = result;
                    c.asociado = this._asociado.id;
                    this.asociadosService.updateCuota(c).subscribe( (response) => {
                        this.getCuotas();
                    });
                }
            });
        });

    }

    deleteCuota(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Borrar Cuota',
            message: '¿Está seguro que quiere borrar la cuota?',
            actions: {
                confirm: {
                    label: 'Borrar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if ( result === 'confirmed' )
            {
                this.asociadosService.deleteCuota(id).subscribe(() => {
                    this.getCuotas();
                });
            }
        });
    }
}
