import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule, 
      BsDatepickerModule
    ), 
    provideRouter(routes),
  ]
}).catch(err => console.error(err));
