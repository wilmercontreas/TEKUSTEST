import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsubsComponent } from './pages/addsubs/addsubs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditsubsComponent } from './pages/editsubs/editsubs.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'edit/:id', component: EditsubsComponent },
      { path: 'add', component: AddsubsComponent },
      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
