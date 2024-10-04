import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsociadosService } from './asociados.service';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Asociado } from 'app/core/model/asociado.model';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.component.html',
  styleUrls: ['./asociados.component.scss'],
})
export class AsociadosComponent implements OnInit {

    displayedColumns: string[] = [
        'nombre',
        'cif',
        'email',
        'telefono',
        'tipo',
        'acciones'];
    dataSource = new MatTableDataSource([]);
    asociados: Asociado[] = [];

    constructor(
        private asociadosService: AsociadosService,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    goToAsociado(id: number): void {
        this.router.navigate([`asociados/edit/${id}`]);
    }

    createAsociado(): void {
        this.router.navigate(['asociados/new']);
    }


    deleteAsociado(id: number): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Borrar Asociado',
            message: '¿Está seguro que quiere borrar el Asociado?',
            actions: {
                confirm: {
                    label: 'Borrar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if ( result === 'confirmed' )
            {
                this.asociadosService.deleteAsociado(id).subscribe(() => {
                    this.loadData();
                });
            }
        });
    }

    loadData(): void {
        this.asociadosService.getAsociados().subscribe((data) => {
            console.log(data);
            this.asociados = [...data];
        });
    }
}
