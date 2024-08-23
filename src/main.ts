/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module'
import { appConfig } from './app/app.config';

// bootstrapApplication(AppModule, appConfig)
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

