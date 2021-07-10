import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SelecaoComponent } from './selecao/selecao.component';

const routes: Routes = [
  { path: "", redirectTo: "pagina-inicial", pathMatch: "full" },
  { path: "pagina-inicial", component: HomeComponent },
  { path: "selecao", component: SelecaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
