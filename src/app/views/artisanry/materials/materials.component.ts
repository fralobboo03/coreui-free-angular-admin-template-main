import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaterialModel } from 'src/app/model/common.model';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent {

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

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.initMaterial();
  }

  initMaterial(){
    this.commonHttpService.getMaterial().subscribe(res => {
      this.materialModel = res;
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
        this.beforeSaveSuccess();
      })

    }else{
      //update
      console.log("update", updatedMaterialReq)
      if(formCtl.materialId != null){
        this.commonHttpService.updateMaterial(formCtl.materialId, updatedMaterialReq).subscribe(res => {
          // console.log("insert res", res)
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


}
