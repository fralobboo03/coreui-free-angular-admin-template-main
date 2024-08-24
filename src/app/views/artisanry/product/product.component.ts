import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
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
    ModalBodyComponent,
    ModalFooterComponent,
    RowComponent,
    ReactiveFormsModule,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselIndicatorsComponent,
    CarouselCaptionComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  readonly slides: any[][] = [];
  readonly imageSrc: string[] = [
    'assets/images/angular.jpg',
    'assets/images/react.jpg',
    'assets/images/vue.jpg',
    'https://picsum.photos/id/1/800/400',
    'https://picsum.photos/id/1026/800/400',
    'https://picsum.photos/id/1031/800/400'
  ];

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.slides[0] = [
      {
        id: 0,
        src: this.domSanitizer.bypassSecurityTrustUrl(this.imageSrc[0]),
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: this.domSanitizer.bypassSecurityTrustUrl(this.imageSrc[1]),
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: this.domSanitizer.bypassSecurityTrustUrl(this.imageSrc[2]),
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];
  }

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

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
}
