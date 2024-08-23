import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { CraftspersonComponent } from './views/artisanry/craftsperson/craftsperson.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    // CraftspersonComponent
  ],
  imports: [
    AppComponent,
    CommonModule,
    BrowserModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent
  ],
  providers: [],
  bootstrap: [
    // AppComponent
  ]
})
export class AppModule { }
