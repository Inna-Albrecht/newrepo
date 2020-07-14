import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FondoComponent } from './componentes/fondo/fondo.component';
import { CalendarModule, DatePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { PublicacionesComponent } from './componentes/publicaciones/publicaciones.component';
import { AvatarComponent } from './componentes/avatar/avatar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { BloqueadosComponent } from './componentes/bloqueados/bloqueados.component';
import { SettingComponent } from './componentes/setting/setting.component';
import { InfoPageComponent } from './componentes/info-page/info-page.component';
import { PublicarComponent } from './componentes/publicar/publicar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadosComponent } from './componentes/estados/estados.component';
import {MatInputModule} from '@angular/material/input';


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBsIGsCjQ3pnhmmbpUMQNwfIfenFJ-l230",
    authDomain: "iwhiffi-a1ad7.firebaseapp.com",
    databaseURL: "https://iwhiffi-a1ad7.firebaseio.com",
    projectId: "iwhiffi-a1ad7",
    storageBucket: "iwhiffi-a1ad7.appspot.com",
    messagingSenderId: "851869346723",
    appId: "1:851869346723:web:b702062bb533cd182ac816",
    measurementId: "G-9WKNY1YV93"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FondoComponent,
    PublicacionesComponent,
    AvatarComponent,
    ProfileComponent,
    GaleriaComponent,
    EditarPerfilComponent,
    BloqueadosComponent,
    SettingComponent,
    InfoPageComponent,
    PublicarComponent,
    EstadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    DatePickerModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
