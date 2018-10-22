import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { PlayerPictureComponent } from './player-picture/player-picture.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'playerpic/:id', component: PlayerPictureComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
