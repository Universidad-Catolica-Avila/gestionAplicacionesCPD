import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FuseAlertModule } from '@fuse/components/alert';
import { RemesasComponent } from './remesas.component';
import { RemesaComponent } from './remesa/remesa.component';
import { RemesaFormComponent } from './remesa-form/remesa-form.component';
import { RemesaRecibosComponent } from './remesa-recibos/remesa-recibos.component';
import { RecibosFormComponent } from './recibos-form/recibos-form.component';
import { ReciboFormComponent } from './recibo-form/recibo-form.component';

const routes: Route[] = [
    {
        path     : '',
        component: RemesasComponent
    },
    {
        path     : 'new',
        component: RemesaComponent
    },
    {
        path     : 'edit/:id',
        component: RemesaComponent
    }
];


@NgModule({
  declarations: [
    RemesasComponent,
    RemesaComponent,
    RemesaFormComponent,
    RemesaRecibosComponent,
    RecibosFormComponent,
    ReciboFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    ReactiveFormsModule,
    FuseAlertModule
  ],
  exports: [
    RemesasComponent,
    RemesaComponent,
    RemesaFormComponent,
    ReciboFormComponent
  ]
})
export class RemesasModule { }
