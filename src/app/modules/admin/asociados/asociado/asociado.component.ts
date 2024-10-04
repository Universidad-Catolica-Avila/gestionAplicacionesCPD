import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Asociado } from 'app/core/model/asociado.model';
import { Subject, takeUntil } from 'rxjs';
import { AsociadosService } from '../asociados.service';

@Component({
  selector: 'app-asociado',
  templateUrl: './asociado.component.html',
  styleUrls: ['./asociado.component.scss']
})
export class AsociadoComponent implements OnInit, OnDestroy {

    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'info';
    id: number = null;
    asociado: Asociado = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService,
        private asociadoService: AsociadosService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.route.params.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this._fuseLoadingService.show();
                this.asociadoService.getAsociado(this.id).subscribe( (response: Asociado) => {
                    this.asociado = response;
                    this._fuseLoadingService.hide();
                });
            } else {
                    this.asociado = this.asociadoService.getEmptyAsociado();
            }
         });


        this.panels = [
            {
                id         : 'info',
                icon       : 'heroicons_outline:user-circle',
                title      : 'Información',
                description: 'Información general del asociado'
            },
            {
                id         : 'cuotas',
                icon       : 'heroicons_outline:currency-euro',
                title      : 'Cuotas',
                description: 'Gestión de las cuotas del asociado'
            }
        ];
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

    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

     getPanelInfo(id: string): any
     {
         return this.panels.find(panel => panel.id === id);
     }

     trackByFn(index: number, item: any): any
     {
         return item.id || index;
     }

     goToAsociados(): void {
        this.router.navigate(['asociados']);
     }

     saveAsociado(value: any): void {
        this._fuseLoadingService.show();
        if (this.id) {
            this.asociadoService.updateAsociado(this.id, value).subscribe( (response) => {
                this.snackBar.open('Asociado actualizado correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['asociados']);
                this._fuseLoadingService.hide();
            });
        } else {
            this.asociadoService.saveAsociado(value).subscribe( (response) => {
                this.snackBar.open('Asociado creado correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['asociados']);
                this._fuseLoadingService.hide();
            });
        }

    }
}
