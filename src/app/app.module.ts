import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { DatePipe } from '@angular/common';
import { AuthGaurdService } from './auth/auth-gaurd.service';
import { AuthServiceService } from './auth/auth-service.service';
import { IonicStorageModule } from '@ionic/storage-angular'; 
import { provideHttpClient  } from '@angular/common/http';
import { ShareModuleModule } from './shareModule/share-module.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule ,ShareModuleModule ,IonicModule.forRoot(),AppRoutingModule, IonicStorageModule.forRoot() ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe, AuthServiceService, AuthGaurdService,provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
