import { Component } from '@angular/core';
import { BorderDirective, AlignDirective, ColComponent, RowComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemComponent, PageLinkDirective, PaginationComponent, TableActiveDirective, TableColorDirective, TableDirective, ThemeDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CraftspersonModel, CriteriaRequest } from '../../../model/common.model'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
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

  craftspersonForm = this.fb.group({
    craftsperson_name: ['', Validators.required],
    address: [''],
    contact: [''],
    history: [''],
    description: ['']
  });

  criteriaReq: CriteriaRequest = {
    craftsperson_name: '',
    nameprodcut: ''
  };

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.commonHttpService.getCraftperson().subscribe(res => {
      console.log("res", res);
      this.craftspersonModel = res;
    })
  }


  onSubmit(){
    console.log(this.searchForm.value);
  }

  onSaveCraftsperson(){
    console.log(this.craftspersonForm.value);
  }
}
