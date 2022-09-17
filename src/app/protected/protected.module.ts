import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddsubsComponent } from './pages/addsubs/addsubs.component';
import { EditsubsComponent } from './pages/editsubs/editsubs.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    AddsubsComponent,
    EditsubsComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProtectedModule { }
