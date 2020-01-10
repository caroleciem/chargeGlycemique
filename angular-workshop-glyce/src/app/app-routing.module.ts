import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ AlimentListComponent} from './aliment-list/aliment-list.component';
import{ CalculateurComponent} from './calculateur/calculateur.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([   { path: '', component: AlimentListComponent },
  { path: 'calculateur', component: CalculateurComponent },])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
