import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BorderDirective, AlignDirective, ColComponent, RowComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective, CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ContainerComponent, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component'
// import { CraftspersonComponent } from './views/artisanry/craftsperson/craftsperson.component';
export { AlertModalComponent } from '../components/alert-modal/alert-modal.component';


export const SHARED_DEPENDENCIES = [
  CommonModule,
  RouterLink,
  AppComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
  PaginationComponent,
  PageItemComponent,
  PageLinkDirective,
  ReactiveFormsModule,
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  IconDirective,
  CarouselComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselCaptionComponent,
  AlertModalComponent,
  ContainerComponent,
  ListGroupDirective,
  ListGroupItemDirective,
  FormsModule
];
