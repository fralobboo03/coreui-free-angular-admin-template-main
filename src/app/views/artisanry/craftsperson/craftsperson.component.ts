import { Component } from '@angular/core';
import { BorderDirective, AlignDirective, ColComponent, RowComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CraftspersonModel, CriteriaRequest } from '../../../model/common.model'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import { CommonHttpService } from '../../../service/common-http.service'
// import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-craftsperson',
  standalone: true,
  imports: [
    CommonModule,
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
    RouterLink,
    ReactiveFormsModule,
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    IconDirective
  ],
  templateUrl: './craftsperson.component.html',
  styleUrl: './craftsperson.component.scss'
})
export class CraftspersonComponent {
  craftspersonModel: CraftspersonModel[] = [];

  searchForm: FormGroup = this.fb.group({
    craftsperson_name: ['']
  });

  craftspersonForm = new FormGroup({
    craftspersonId: new FormControl<number | null>(null),
    craftspersonName: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    contact: new FormControl<string | null>(null),
    history: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null)
  });

  criteriaReq: CriteriaRequest = {
    craftspersonName: '',
    nameprodcut: ''
  };

  visible = false;
  isInsert = true;

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.initCraftperson();
  }

  initCraftperson(){
    this.commonHttpService.getCraftperson().subscribe(res => {
      this.craftspersonModel = res;
    })
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
        description: selected_craftpersonModel.description
      });
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
      description: formCtl.description ?? ''
    };

    if(this.isInsert){
      //insert
      console.log("insert", updatedCraftspersonReq)
      this.commonHttpService.createCraftsperson(updatedCraftspersonReq).subscribe(res => {
        console.log("insert res", res)
        this.initCraftperson()
      })

    }else{
      //update
      console.log("update", updatedCraftspersonReq)
    }
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  openModalAddProduct() {
    this.isInsert = true;
    this.craftspersonForm.reset();
    this.visible = true
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
