import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { Asociado } from 'app/core/model/asociado.model';
import { Subject, takeUntil } from 'rxjs';
import { RemesasService } from '../remesas.service';

@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styleUrls: ['./remesa.component.scss']
})
export class RemesaComponent implements OnInit, OnDestroy {

    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'info';
    id: number = null;
    remesa: any = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private route: ActivatedRoute,
        private _fuseLoadingService: FuseLoadingService,
        private remesasService: RemesasService,
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
                this.remesasService.getRemesa(this.id).subscribe( (response: any) => {
                    this.remesa = response;
                    this._fuseLoadingService.hide();
                });
            } else {
                    this.remesa = this.remesasService.getEmptyRemesa();
            }
         });


        this.panels = [
            {
                id         : 'info',
                icon       : 'heroicons_outline:document',
                title      : 'Información',
                description: 'Información Remesa'
            },
            {
                id         : 'recibos',
                icon       : 'heroicons_outline:document-duplicate',
                title      : 'Recibos',
                description: 'Gestión recibos remesa'
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

     goToRemesas(): void {
        this.router.navigate(['remesas']);
     }

     saveRemesa(value: any): void {
        this._fuseLoadingService.show();
        if (this.id) {
            this.remesasService.updateRemesa(this.id, value).subscribe( (response) => {
                this.snackBar.open('Remesa actualizada correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['remesas']);
                this._fuseLoadingService.hide();
            });
        } else {
            this.remesasService.saveRemesa(value).subscribe( (response) => {
                this.snackBar.open('Remesa creada correctamente', 'Cerrar' , {
                    duration: 3000
                });
                this.router.navigate(['remesas']);
                this._fuseLoadingService.hide();
            });
        }

    }
}
