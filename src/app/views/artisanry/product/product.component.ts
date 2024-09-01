import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CarouselCaptionComponent, CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { firstValueFrom } from 'rxjs';
import { CraftspersonDetail, CraftspersonModel, MaterialDetail, MaterialModel, Product, ProductImage } from 'src/app/model/common.model';
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
    private domSanitizer: DomSanitizer
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

  craftperson: CraftspersonModel[] = []
  materials: MaterialModel[] = []
  products: any[] = []
  fileList: File[] = []
  imageList:ProductImage[] = []
  imageEditId: number | null = null;
  imageType: "ADD" | "EDIT" = "ADD"
  imageModalList: any[] = []
  imageOne!: ProductImage;

  craftspersonList:CraftspersonDetail[] = []
  materialList: MaterialDetail[] = []

  titleModalInsert = "Add Product"
  public isShowModalImage = false;
  public isShowImage = false;
  public isShowImageOne = false;
  public isShowCraftspersonDetail = false;
  public isShowMaterialDetail = false;

  craftspersonForm = new FormControl(null)
  materialForm = new FormControl(null)

  ngOnInit() {
    this.getCraftperson()
    this.getMaterials()
    this.getProducts()
  }

  async onFilesSelected(event: any): Promise<void> {
    try {
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
        if (this.imageEditId == 0) {
          this.commonHttpService.productImagesUpdateFileByProductId(this.formGroup.controls.productId.value || 0 ,formData).subscribe({next: (res) => {
            this.commonHttpService.getProductById(this.formGroup.controls.productId.value || 0).subscribe({next: (res : any) => {
              this.imageList = res.image
              this.getProducts()
            }})
          }})
        } else {
          this.commonHttpService.productImagesUpdateFileById(this.imageEditId || 0,formData).subscribe({next: (res) => {
            console.log("productImagesUpdateFileById",res)
            this.commonHttpService.getProductById(this.formGroup.controls.productId.value || 0).subscribe({next: (res : any) => {
              this.imageList = res.image
              this.getProducts()
            }})
          }, error: (err) => {}})
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  onUpload(fileUpdate: any): void {
    this.imageEditId = 0
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
    this.craftspersonList = []
    this.materialList = []
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

  toggleImageModal() {
    this.isShowImage = !this.isShowImage;
  }

  handleImageModalChange(event: any) {
    this.isShowImage = event;
  }

  toggleImageOneModal() {
    this.isShowImageOne = !this.isShowImageOne;
  }

  handleImageOneModalChange(event: any) {
    this.isShowImageOne = event;
  }

  toggleCraftspersonDetailModal() {
    this.isShowCraftspersonDetail = !this.isShowCraftspersonDetail;
  }

  handleCraftspersonDetailodalChange(event: any) {
    this.isShowCraftspersonDetail = event;
  }

  toggleMaterialDetailModal() {
    this.isShowMaterialDetail = !this.isShowMaterialDetail;
  }

  handleMaterialDetailModalChange(event: any) {
    this.isShowMaterialDetail = event;
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

    formData.append('craftspersonList', JSON.stringify(this.craftspersonList));
    formData.append('materialList', JSON.stringify(this.materialList));

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
    console.log("product.craftspersonDetail",product.craftspersonDetail)
    console.log("product.materialDetail",product.materialDetail)
    this.craftspersonList = product.craftspersonDetail || []
    this.materialList = product.materialDetail || []
  }

  getDate() {
    return new Date().getTime()
  }

  showModalImage(images: ProductImage[]) {
    console.log("image",images)
    this.imageModalList = images
    this.isShowImage = true


  }

  onImageOne(image: ProductImage) {
    this.imageOne = image
    this.isShowImageOne = true
  }

  addCraftspersonDetail() {
    this.isShowCraftspersonDetail = true
    this.getCraftperson()
  }

  addMaterialDetail() {
    this.isShowMaterialDetail = true
    this.getMaterials()
  }

  saveCraftspersonDetail() {
    const craftsperson = this.craftperson.filter(craf => craf.craftspersonId == this.craftspersonForm.value)[0]
    this.craftspersonList.push({
      craftspersonDetailId: 0,
      craftsperson: craftsperson,
    })
    this.isShowCraftspersonDetail = false
  }

  saveMaterialDetail() {
    const material = this.materials.filter(mater => mater.materialId == this.materialForm.value)[0]
    this.materialList.push({
      materialDetailId: 0,
      material: material
    })
    this.isShowMaterialDetail = false
  }

}
