import { AuthenticationService } from './_service/authentication.service';
import { AuthGuard } from './_guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayersService } from './_service/players.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListPlayersComponent } from './list-players/list-players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { PlayerPictureComponent } from './player-picture/player-picture.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListPlayersComponent,
    PlayerDetailsComponent,
    NotFoundComponent,
    PlayerPictureComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxInfiniteScrollerModule
  ],
  providers: [PlayersService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
