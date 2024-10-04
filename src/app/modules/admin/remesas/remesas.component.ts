import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Asociado } from 'app/core/model/asociado.model';
import { RemesasService } from './remesas.service';

@Component({
  selector: 'app-remesas',
  templateUrl: './remesas.component.html',
  styleUrls: ['./remesas.component.scss'],
})
export class RemesasComponent implements OnInit {

    displayedColumns: string[] = [
        'id',
        'titulo',
        'fechaPresentacion',
        'fechaVencimiento',
        'emitida',
        'acciones'];
    dataSource = new MatTableDataSource([]);
    remesas: any[] = [];

    constructor(
        private remesasService: RemesasService,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    goToRemesa(id: number): void {
        this.router.navigate([`remesas/edit/${id}`]);
    }

    createRemesa(): void {
        this.router.navigate(['remesas/new']);
    }


    deleteRemesa(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Borrar Remesa',
            message: '¿Está seguro que quiere borrar la Remesa?',
            actions: {
                confirm: {
                    label: 'Borrar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if ( result === 'confirmed' )
            {
                this.remesasService.deleteRemesa(id).subscribe(() => {
                    this.loadData();
                });
            }
        });
    }

    loadData(): void {
        this.remesasService.getRemesas().subscribe((data) => {
            console.log(data);
            this.remesas = [...data];
        });
    }

    updateRemesaEmitida(remesa: any): void {
        this.remesasService.updateRemesaEmitida(remesa.id, !remesa.remesaEmitida).subscribe( (response) => {
            this.loadData();
        });
    }

    duplicateRemesa(id: number): void {
        this.remesasService.duplicateRemesa(id).subscribe( (response) => {
            this.loadData();
        });
    }
}
