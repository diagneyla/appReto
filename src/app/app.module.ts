import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout"
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TeamComponent } from './components/team/team.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FooterComponent } from './layout/footer/footer.component';
import { PowerstatsComponent } from './components/powerstats/powerstats.component';
import { MeterComponent } from './components/meter/meter.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    HighlightPipe,
    HeroeComponent,
    HeroesComponent,
    LayoutComponent,
    SidenavComponent,
    NavbarComponent,
    TeamComponent,
    HeroDetailsComponent,
    SnackbarComponent,
    HomeComponent,
    LoginComponent,
    VerifyEmailComponent,
    FooterComponent,
    PowerstatsComponent,
    MeterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
function firebaseConfig(firebaseConfig: any): any[] |
 import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}