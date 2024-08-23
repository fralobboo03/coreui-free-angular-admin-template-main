import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    TableDirective,
    TableColorDirective,
    TableActiveDirective,
    ButtonDirective,
    IconDirective ,
    PaginationComponent,
    PageItemComponent,
    PageLinkDirective,
    RouterLink,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,ModalFooterComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public visible = false;
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  openModalAddProduct() {
    this.visible = true
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
