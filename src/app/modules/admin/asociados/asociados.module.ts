import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsociadosComponent } from './asociados.component';
import { MatTableModule} from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { AsociadoComponent } from './asociado/asociado.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { AsociadoFormComponent } from './asociado-form/asociado-form.component';
import { AsociadoCuotasComponent } from './asociado-cuotas/asociado-cuotas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FuseAlertModule } from '@fuse/components/alert';
import { CuotaFormComponent } from './cuota-form/cuota-form.component';

const routes: Route[] = [
    {
        path     : '',
        component: AsociadosComponent
    },
    {
        path     : 'new',
        component: AsociadoComponent
    },
    {
        path     : 'edit/:id',
        component: AsociadoComponent
    }
];


@NgModule({
  declarations: [
    AsociadosComponent,
    AsociadoComponent,
    AsociadoFormComponent,
    AsociadoCuotasComponent,
    CuotaFormComponent
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
    AsociadosComponent
  ]
})
export class AsociadosModule { }
