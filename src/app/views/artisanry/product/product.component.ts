import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Product, ProductImage } from 'src/app/model/common.model';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(
    private commonHttpService: CommonHttpService,
  ) {}

  @ViewChildren('imgProduct') imgProducts: QueryList<HTMLImageElement> | undefined;

  pathImage = environment.urlService

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
  fileList: File[] = []
  imageList:ProductImage[] = []
  imageEditId: number | null = null;
  imageType: "ADD" | "EDIT" = "ADD"


  titleModalInsert = "Add Product"
  public isShowModalImage = false;

  ngOnInit() {
    this.getCraftperson()
    this.getMaterials()
    this.getProducts()
  }

  async onFilesSelected(event: any): Promise<void> {
    // this.selectedFiles = Array.from(event.target.files);
    console.log("onFilesSelected",event)
    const buffer = await event.target.files[0].arrayBuffer();
    const blob = new Blob([buffer], { type: event.target.files[0].type });
    const url = URL.createObjectURL(blob);
    if (this.imageType == "ADD") {
      this.fileList.push(event.target.files[0])
      this.imageList.push({
        imageId: 0,
        image: url,
        detailImage: '123',
        otherDetails: '123',
        file: event.target.files[0]
      })
    } else if (this.imageType == "EDIT") {
      const formData = new FormData()
      formData.append("file", event.target.files[0])
      this.commonHttpService.productImagesUpdateFileById(this.imageEditId || 0,formData).subscribe({next: (res) => {
        console.log("productImagesUpdateFileById",res)
        this.commonHttpService.getProductById(this.formGroup.controls.productId.value || 0).subscribe({next: (res : any) => {
          this.imageList = res.image
          console.log(this.imageList)
          console.log("this.imgProducts",this.imgProducts)
        }})
      }, error: (err) => {}})
    }
  }

  onUpload(fileUpdate: any): void {
    fileUpdate.click()
  }

  onEditImage(image: ProductImage, fileUpdate: any) {
    this.imageEditId = image.imageId
    fileUpdate.click()
  }

  onDeleteImage(image: ProductImage, index: number) {
    if (image.imageId != 0) {

    } else {
      this.imageList = this.imageList.filter((image, i) => i != index)
    }
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
    this.imageType = "ADD"
    this.formGroup.reset()
    this.imageList = []
    this.isShowModal = true
  }

  handleLiveDemoChange(event: any) {
    this.isShowModal = event;
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  onShowModalImage(product: any) {
    this.isShowModalImage = true
  }

  toggleImage() {
    this.isShowModalImage = !this.isShowModalImage;
  }

  handleImageChange(event: any) {
    this.isShowModalImage = event;
  }

  saveProduct() {
    console.log(this.formGroup.value)
    const formData = new FormData()
    formData.append("productRequest",JSON.stringify(this.formGroup.value))
    if (this.fileList.length != 0) {
      for(let file of this.fileList) {
        formData.append('files',file)
      }
    } else {
      formData.append('files', new Blob([]));
    }

    this.commonHttpService.saveProduct(formData).subscribe({next: (res) => {
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
    this.imageType = "EDIT"
    this.formGroup.patchValue({...product })
    this.isShowModal = true
    this.imageList = product.image
  }

  getDate() {
    return new Date().getTime()
  }
}
