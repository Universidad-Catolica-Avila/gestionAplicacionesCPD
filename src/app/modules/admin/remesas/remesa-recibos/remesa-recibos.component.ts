import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { RemesasService } from '../remesas.service';
import { RecibosFormComponent } from '../recibos-form/recibos-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReciboFormComponent } from '../recibo-form/recibo-form.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-remesa-recibos',
  templateUrl: './remesa-recibos.component.html',
  styleUrls: ['./remesa-recibos.component.scss']
})
export class RemesaRecibosComponent implements OnInit {


    displayedColumns: string[] = [
        'devuelto',
        'nif',
        'asociado',
        'concepto',
        'iban',
        'ref',
        'cuota',
        'id',
        'orden',
        'acciones'
    ];

    recibos: any[] = [];


    public _remesa: any = null;

    constructor(
        private remesasService: RemesasService,
        private router: Router,
        private matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private snackBar: MatSnackBar
    ) { }

    @Input() set remesa(value: any){
        this._remesa = value;
        if (this._remesa.id) {
            this.getRecibos();
        }
    }

    ngOnInit(): void {
    }

    getRecibos(): void {
        this.remesasService.getRemesaRecibos(this._remesa.id).subscribe((response) => {
            this.recibos = [...response];
        });
    }

    generateRecibos(): void {

        const dialogRef = this.matDialog.open(RecibosFormComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.remesasService.generateRecibos(this._remesa.id, result.grupo).subscribe((response) => {
                    if (response > 0) {
                        this.snackBar.open(`Se han creado correctamente ${response} recibos`, 'Cerrar' , {
                            duration: 3000
                        });

                    } else {
                        this.snackBar.open('No se han generado recibos', 'Cerrar' , {
                            duration: 3000
                        });
                    }
                    this.getRecibos();
                }, (error) => {
                    this.snackBar.open('No se han generado recibos', 'Cerrar' , {
                        duration: 3000
                    });
                });
            }
        });

    }

    createRecibo(): void {
        const dialogRef = this.matDialog.open(RecibosFormComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const recibo = result;
                recibo.asociado = this._remesa.id;
                /*
                this.remesasService.createRecibo(recibo).subscribe( (response) => {
                    this.getRecibos();
                });*/
            }
        });
    }

    openRecibo(id: number): void {

        this.remesasService.getRecibo(id).subscribe((recibo)=> {
            const dialogRef = this.matDialog.open(ReciboFormComponent, {data: {recibo}});

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    const r = result;

                    this.remesasService.updateRecibo(r).subscribe( (response) => {
                        this.getRecibos();
                    });
                }
            });
        });
    }

    deleteRecibo(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Borrar Recibo',
            message: '¿Está seguro que quiere borrar el recibo?',
            actions: {
                confirm: {
                    label: 'Borrar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if ( result === 'confirmed' )
            {
                this.remesasService.deleteRecibo(id).subscribe(() => {
                    this.getRecibos();
                });
            }
        });
    }

    generateFicheroRemesa(): void {
        this.remesasService.emitirRemesa(this._remesa.id).subscribe((response) => {
            this._remesa.remesaEmitida = true;
            const filename = `${this._remesa.titulo}.xml`;
            const file = new Blob([response], {type: 'application/xml'});
            saveAs(file, filename);
        });

    }
}
