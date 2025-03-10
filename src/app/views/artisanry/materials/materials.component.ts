import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertModalComponent } from '@docs-components/alert-modal/alert-modal.component';
import { PaginationManageComponent } from 'src/app/component/pagination-manage/pagination-manage.component';
import { MaterialModel, Pagination } from 'src/app/model/common.model';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [SHARED_DEPENDENCIES,PaginationManageComponent],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent {

  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent
  materialModel: MaterialModel[] = [];

  visible = false;
  isInsert = true;
  alertModalvisible = false;
  alertMessage: string = '';

  materialForm = new FormGroup({
    materialId:   new FormControl<number | null>(null),
    nameMaterial: new FormControl<string | null>(null),
    typeMaterial: new FormControl<string | null>(null),
    source:       new FormControl<string | null>(null),
    otherDetails: new FormControl<string | null>(null)
  });
  isLogin: Boolean = false;
  pagination: Pagination = {
    page: 1,
    size: 10,
    totalPage: 0
  }
  formSearch = new FormControl(null);

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.initMaterial();
    const token = localStorage.getItem("accessToken")
    if (token != null) {
      this.isLogin = true
    }
  }

  initMaterial(){
    this.commonHttpService.getMaterialPagination(this.formSearch.value || "", this.pagination.page, this.pagination.size).subscribe(res => {
      this.materialModel = res.data;
      this.pagination.totalPage = res.totalPage
    })
  }

  openModalAddProduct() {
    this.isInsert = true;
    this.materialForm.reset();
    this.visible = true
  }

  onEdit(id: any){
    this.isInsert = false;
    this.visible = !this.visible;
    const selected_materialModel = this.materialModel.find(item => item.materialId == id);
    if(selected_materialModel){
      this.materialForm.patchValue({
        materialId: selected_materialModel.materialId,
        nameMaterial: selected_materialModel.nameMaterial,
        typeMaterial: selected_materialModel.typeMaterial,
        source: selected_materialModel.source,
        otherDetails: selected_materialModel.otherDetails,
      });
    }
  }

  onDelete(id: any){
    if(id != null){
      this.commonHttpService.deleteMaterial(id).subscribe(res => {
        // console.log("delete res", res);
        // this.showSuccessMessage('ลบข้อมูล สำเร็จ');
        this.showSuccessMessage("ลบข้อมูลวัสดุสำเร็จ")
        this.initMaterial();
      }, error => {

      })

    }
  }

  onSaveMaterial(){
    const formCtl = this.materialForm.value;
    const updatedMaterialReq: MaterialModel = {
      materialId: formCtl.materialId ?? null,
      nameMaterial: formCtl.nameMaterial ?? '',
      typeMaterial: formCtl.typeMaterial ?? '',
      source: formCtl.source ?? '',
      otherDetails: formCtl.otherDetails ?? '',
    };

    if(this.isInsert){
      //insert
      console.log("insert", updatedMaterialReq)
      this.commonHttpService.createMaterial(updatedMaterialReq).subscribe(res => {
        // console.log("insert res", res)
        this.showSuccessMessage("บันทึกข้อมูลวัสดุสำเร็จ")
        this.beforeSaveSuccess();
      })

    }else{
      //update
      console.log("update", updatedMaterialReq)
      if(formCtl.materialId != null){
        this.commonHttpService.updateMaterial(formCtl.materialId, updatedMaterialReq).subscribe(res => {
          // console.log("insert res", res)
        this.showSuccessMessage("แก้ไขข้อมูลวัสดุสำเร็จ")
          this.beforeSaveSuccess();
        })
      }
    }
  }

  beforeSaveSuccess(){
    this.toggleLiveDemo();
    this.materialForm.reset();
    this.initMaterial();
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
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
    this.initMaterial()
  }

  search() {
    this.initMaterial()
  }
}
