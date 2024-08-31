import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/model/common.model';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  public isShowModal = false;
  customerForm = new FormGroup({
    customerId: new FormControl<number | null>(null),
    customerName:   new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    contact: new FormControl<string | null>(null),
    history: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null)
  });

  customerModel: CustomerModel[] = [];

  formSearch = new FormControl(null);

  constructor(private commonHttpService: CommonHttpService) { }

  ngOnInit(){
    this.getCustomer();
  }

  getCustomer(){
    this.commonHttpService.getCustomer().subscribe(res =>{
      if(res){
        this.customerModel = res;
      }
    })
  }


  toggleLiveDemo() {
    this.isShowModal = !this.isShowModal;
  }

  openModalAddProduct() {
    this.customerForm.reset();
    this.isShowModal = true
  }

  handleLiveDemoChange(event: any) {
    this.isShowModal = event;
  }

  onSearch() {
    console.log(this.formSearch.value)
  }

  onSave() {
    const formCtl = this.customerForm.value;
    const createCustomerSeq : CustomerModel = {
      customerId: formCtl.customerId ?? null,
      customerName: formCtl.customerName ?? null,
      address: formCtl.address ?? null,
      contact: formCtl.contact ?? null,
      history: formCtl.history ?? null,
      description: formCtl.description ?? null
    }

    this.commonHttpService.createCustomer(createCustomerSeq).subscribe(res =>{
      this.getCustomer();
      this.toggleLiveDemo();
    })
  }

  onDelete(customer_id: any){
    this.commonHttpService.deleteMCustomer(customer_id).subscribe(res =>{
      this.getCustomer();
    })
  }

  onEdit(customer_id: any){
    const seleted_custome_dr = this.customerModel.find(item => item.customerId == customer_id);
    if(seleted_custome_dr){
      this.customerForm.patchValue({
        customerId: seleted_custome_dr.customerId,
        customerName: seleted_custome_dr.customerName,
        address: seleted_custome_dr.address,
        contact: seleted_custome_dr.contact,
        history: seleted_custome_dr.history,
        description: seleted_custome_dr.description
      })
    }

    this.toggleLiveDemo();
  }

}
