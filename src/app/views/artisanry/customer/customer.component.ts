import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  formSearch = new FormControl(null);

  public isShowModal = false;
  toggleLiveDemo() {
    this.isShowModal = !this.isShowModal;
  }

  openModalAddProduct() {
    this.isShowModal = true
  }

  handleLiveDemoChange(event: any) {
    this.isShowModal = event;
  }

  onSearch() {
    console.log(this.formSearch.value)
  }
}
