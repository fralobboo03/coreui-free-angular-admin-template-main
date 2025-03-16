import { Component, ViewChild } from '@angular/core';
import { BorderDirective, AlignDirective, ColComponent, RowComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CraftspersonModel, CriteriaRequest, Pagination } from '../../../model/common.model'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import { CommonHttpService } from '../../../service/common-http.service'
import { AppModule } from 'src/app/app.module';
import { SHARED_DEPENDENCIES } from '../../../shared-dependencies'
import { AlertModalComponent } from '@docs-components/alert-modal/alert-modal.component';
import { PaginationManageComponent } from 'src/app/component/pagination-manage/pagination-manage.component';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-craftsperson',
  standalone: true,
  imports: [SHARED_DEPENDENCIES ,PaginationManageComponent],
  templateUrl: './craftsperson.component.html',
  styleUrl: './craftsperson.component.scss'
})
export class CraftspersonComponent {

  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;
  craftspersonModel: CraftspersonModel[] = [];

  searchForm: FormGroup = this.fb.group({
    craftsperson_name: ['']
  });

  formSearch = new FormControl(null);
  
  craftspersonForm = new FormGroup({
    craftspersonId: new FormControl<number | null>(null),
    craftspersonName: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    contact: new FormControl<string | null>(null),
    history: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
  });

  fileUpdate: File | null = null

  criteriaReq: CriteriaRequest = {
    craftspersonName: '',
    nameprodcut: ''
  };

  visible = false;
  isInsert = true;
  alertModalvisible = false;
  alertMessage: string = '';
  messageConfrim: string = '';
  isShowModalConfrim: boolean = false;
  deleteId: any = null

  pagination: Pagination = {
    page: 1,
    size: 10,
    totalPage: 0
  }
  isLogin: Boolean = false;
  imgUrlInit:string = 'assets/images/image-placeholder.svg'
  imgUrl:string = this.imgUrlInit
  pathImage = environment.urlService

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.initCraftperson();
    const token = localStorage.getItem("accessToken")
    if (token != null) {
      this.isLogin = true
    }
  }

  initCraftperson(){
    this.commonHttpService.getCraftpersonPagination(this.formSearch.value || "", this.pagination.page, this.pagination.size).subscribe(res => {
      this.craftspersonModel = res.data;
      this.pagination.totalPage = res.totalPage
    })
  }

  search() {
    this.initCraftperson()
  }

  onEdit(id: any){
    this.isInsert = false;
    this.visible = !this.visible;
    const selected_craftpersonModel = this.craftspersonModel.find(item => item.craftspersonId == id);
    if(selected_craftpersonModel){
      this.craftspersonForm.patchValue({
        craftspersonId: selected_craftpersonModel.craftspersonId,
        craftspersonName: selected_craftpersonModel.craftspersonName,
        address: selected_craftpersonModel.address,
        contact: selected_craftpersonModel.contact,
        history: selected_craftpersonModel.history,
        description: selected_craftpersonModel.description,
        email: selected_craftpersonModel.email
      });
      this.imgUrl =  this.pathImage +"/"+ (selected_craftpersonModel.image ?? "")
    }
  }

  onDelete(id: any){
    this.deleteId = id
    const CraftName = this.craftspersonModel.find(item => item.craftspersonId == this.deleteId)
    this.messageConfrim = `ต้องการลบ ${CraftName?.craftspersonName} ใช่ไหม`
    this.isShowModalConfrim = true
  }

  deleteById() {
    if(this.deleteId != null){
      const CraftName = this.craftspersonModel.find(item => item.craftspersonId == this.deleteId)
      this.commonHttpService.deleteCraftsperson(this.deleteId).subscribe(res => {
        // console.log("delete res", res);
        this.showSuccessMessage('ลบข้อมูลช่าง: ' + CraftName?.craftspersonName + ' สำเร็จ');
        this.initCraftperson()
      }, error => {
      })
    }
  }

  onSaveCraftsperson(){
    const formCtl = this.craftspersonForm.value;
    const updatedCraftspersonReq: CraftspersonModel = {
      craftspersonId: formCtl.craftspersonId ?? null, // ตั้งค่าเริ่มต้นถ้าเป็น null
      craftspersonName: formCtl.craftspersonName ?? '',
      address: formCtl.address ?? '',
      contact: formCtl.contact ?? '',
      history: formCtl.history ?? '',
      description: formCtl.description ?? '',
      email: formCtl.email ?? ''
    };

    if(this.isInsert){
      //insert
      console.log("insert", updatedCraftspersonReq)
      this.commonHttpService.createCraftsperson(updatedCraftspersonReq).subscribe(async (res: CraftspersonModel) => {
        // console.log("insert res", res)
        const formData: FormData = new FormData();
        let id: string = (res.craftspersonId) ? res.craftspersonId?.toString() : ""
        formData.append("id", id);
        if (this.fileUpdate) {
          formData.append("file", this.fileUpdate);
        }
        const resup = await firstValueFrom(this.commonHttpService.craftspersonUpdateImage(formData))
        this.showSuccessMessage('บันทึกข้อมูลช่างสำเร็จ');
        this.beforeSaveSuccess();
      })

    }else{
      //update
      console.log("update", updatedCraftspersonReq)
      if(formCtl.craftspersonId != null){
        this.commonHttpService.updateCraftsperson(formCtl.craftspersonId, updatedCraftspersonReq).subscribe(async res => {
          // console.log("insert res", res)
          const formData: FormData = new FormData();
          let id: string = (res.craftspersonId) ? res.craftspersonId?.toString() : ""
          formData.append("id", id);
          if (this.fileUpdate) {
            formData.append("file", this.fileUpdate);
          }
          const resup = await firstValueFrom(this.commonHttpService.craftspersonUpdateImage(formData))
          this.showSuccessMessage('แก้ไขข้อมูลช่างสำเร็จ');
          this.beforeSaveSuccess();
        })
      }
    }
  }

  beforeSaveSuccess(){
    this.toggleLiveDemo();
    this.craftspersonForm.reset();
    this.initCraftperson()
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  openModalAddProduct() {
    this.isInsert = true;
    this.craftspersonForm.reset();
    this.visible = true
    this.imgUrl = this.imgUrlInit
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  async showSuccessMessage(message: string) {
    this.alertMessage = message;
    this.alertModal.visible = true;

    await this.alertModal.waitForClose();
  }

  toggleSuccessAlert() {
    this.alertModalvisible = !this.alertModalvisible;
  }

  changePage(page: any) {
    this.pagination.page = page
    this.initCraftperson()
  }

  async onFilesSelected(event: any): Promise<void> {
    try {
      console.log("onFilesSelected",event)
      const buffer = await event.target.files[0].arrayBuffer();
      const blob = new Blob([buffer], { type: event.target.files[0].type });
      const url = URL.createObjectURL(blob);
      this.imgUrl = url
      this.fileUpdate = event.target.files[0]
    } catch (error) {
      console.log(error)
    }
  }

  onUpload(fileUpdate: any): void {
    fileUpdate.click()
  }

  async onModalEvent(event: any) {
    console.log("event",event)
    if (event == true) {
      await this.deleteById()
      this.isShowModalConfrim = false
    } else {
      this.isShowModalConfrim = false
    }
  }
}
