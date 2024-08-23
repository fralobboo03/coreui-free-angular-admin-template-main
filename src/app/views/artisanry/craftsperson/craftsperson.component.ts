import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CraftspersonModel } from '../../../model/common.model'
import { CommonModule } from '@angular/common';
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
    RouterLink
  ],
  templateUrl: './craftsperson.component.html',
  styleUrl: './craftsperson.component.scss'
})
export class CraftspersonComponent {
  craftspersonModel : CraftspersonModel[] = [];

  constructor() { }

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
}
