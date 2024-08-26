import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(
    private commonHttpService: CommonHttpService
  ) {}

  formSearch = new FormControl(null);

  formGroup = new FormGroup({
    productId: new FormControl(null),
    nameProduct: new FormControl(null),
    description: new FormControl(null),
    amount: new FormControl(null),
    costPrice: new FormControl(null),
    salePrice: new FormControl(null),
    otherDetails: new FormControl(null),
  })

  craftperson: any[] = []
  materials: any[] = []
  products: any[] = []

  titleModalInsert = "Add Product"


  ngOnInit() {
    this.getCraftperson()
    this.getMaterials()
    this.getProducts()
  }

  getCraftperson() {
    this.commonHttpService.getCraftperson().subscribe({next: (res) => {
      this.craftperson = res
    }})
  }

  getMaterials() {
    this.commonHttpService.getMaterial().subscribe({next: (res) => {
      this.materials = res
    }})
  }

  findProducts() {
    this.commonHttpService.findProducts().subscribe({next: (res) => {

    }})
  }

  getProducts() {
    this.commonHttpService.getProducts(this.formSearch.value || "").subscribe({next: (res) => {
      console.log("res",res)
      this.products = res
    }})
  }

  deleteProductById(id: number) {
    this.commonHttpService.deleteProductById(id).subscribe({next: (res) => {
      this.getProducts()
    }})
  }

  onDelete(id: number) {
    this.deleteProductById(id)
  }

  public isShowModal = false;
  toggleLiveDemo() {
    this.isShowModal = !this.isShowModal;
  }

  openModalAddProduct() {
    this.titleModalInsert = "Add Product"
    this.formGroup.reset()
    this.isShowModal = true
  }

  handleLiveDemoChange(event: any) {
    this.isShowModal = event;
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  saveProduct() {
    console.log(this.formGroup.value)
    this.commonHttpService.saveProduct(this.formGroup.value).subscribe({next: (res) => {
      console.log(res)
      this.getProducts()
      this.isShowModal = false
    }, error: (err) => {
      this.isShowModal = false
    }})
  }

  onSearch() {
    console.log(this.formSearch.value)
    this.getProducts()
  }

  onEdit(product: any) {
    this.titleModalInsert = "Edit Product"
    this.formGroup.patchValue({...product })
    this.isShowModal = true
  }
}
