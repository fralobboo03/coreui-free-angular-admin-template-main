import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CraftspersonModel, CriteriaRequest } from '../../../model/common.model'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
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
    ReactiveFormsModule
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initCraftspersonModel();
  }

  initCraftspersonModel(){
    for (let i = 0; i < 5; i++) {
      const newCraftsperson: CraftspersonModel = {
        craftsperson_id: i + 1,
        craftsperson_name: `Craftsperson ${i + 1}`,
        address: `Address ${i + 1}`,
        contact: `Contact ${i + 1}`,
        history: `History ${i + 1}`,
        description: `Description ${i + 1}`
      };

      this.craftspersonModel.push(newCraftsperson);
    }
  }

  onSubmit(){
    console.log(this.searchForm.value);
  }

  onSaveCraftsperson(){
    console.log(this.craftspersonForm.value);
  }
}
