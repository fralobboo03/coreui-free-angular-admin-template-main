import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order, OrderDetail, OrderDetailRequest, OrderRequest, Product } from 'src/app/model/common.model';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { AlertModalComponent, SHARED_DEPENDENCIES } from 'src/app/shared-dependencies';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SHARED_DEPENDENCIES],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;

  visible = false;
  isInsert = true;
  alertModalvisible = false;
  productListModalvisible = false;
  alertMessage: string = '';
  products: Product[] = [];
  orderDt: OrderDetailRequest[]= [];
  orderHd: OrderRequest = {
    orderId: null,
    orderDate: null,
    quantity: null,
    status: null,
    otherDetails: null,
    orderDetails: this.orderDt
  };

  orderForm = new FormGroup({
    orderId:   new FormControl<number | null>(null),
    orderDate: new FormControl<string | null>(null),
    quantity: new FormControl<number | null>(null),
    status:       new FormControl<string | null>(null),
    otherDetails: new FormControl<string | null>(null),
    orderDetails: new FormControl<OrderDetail[] | null>(null)
  });

  orders: Order[] = []

  constructor(private fb: FormBuilder, private commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.getOrders()
  }

  openModalAddOrder(){
    this.isInsert = true;
    this.orderForm.reset();
    this.visible = true
  }

  getOrders() {
    this.commonHttpService.getOrders().subscribe({next: (res) => {
      this.orders = res
    }})
  }

  onSaveOrder(){
    const formCtl = this.orderForm.value;
    const saveOrderReq: OrderRequest = {
      orderId: this.orderHd.orderId ?? null,
      orderDate: '2024-08-26',
      quantity: 0,
      status: formCtl.status ?? '',
      otherDetails: formCtl.otherDetails ?? '',
      orderDetails: this.orderDt
    }

    console.log("saveOrderReq", saveOrderReq)

    this.commonHttpService.saveOrder(saveOrderReq).subscribe(res => {
      console.log(res);
      this.getOrders()
      this.visible = false
    })
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  // onAddPrderDetail(){
  //   this.getProducts();
  // }

  openProductListModal(){
    this.commonHttpService.getProducts("").subscribe({next: (res) => {
      if(res != null){

        console.log("res",res)
        this.products = res
        console.log("this.products",this.products)
        this.productListModalvisible = true;
        // this.toggleProductListModalvisible();
      }else{
        console.log("product is null")
      }

    }})
  }

  // closeproductListModal(){
  //   this.productListModalvisible = false;
  // }

  // toggleProductListModalvisible(){
  //   this.productListModalvisible != this.productListModalvisible;
  // }
  // openProductListModal() {
  //   this.getProducts()


  // }
  closeProductListModal() {
    this.productListModalvisible = false;
  }

  addToOrder(product_id: any){
    // const selected_product = this.products.find(item => item.productId == product_id && (product_id != this.orderDt.find(i => i.product?.productId)));
    const selected_product = this.products.find(item => item.productId == product_id);
    if(selected_product){
      if(!(this.orderDt.find(i => i.product?.productId == selected_product.productId))  || this.orderDt.length == 0){
        const order_detail_ds: OrderDetailRequest = {
          orderDetailId: null,
          product: selected_product,
          quantity: 0
        }
        this.orderDt.push(order_detail_ds)
      }else{
        // this.showSuccessMessage('ไม่สามารถเพิ่มสินค้าซ้ำได้');
      }
    }
    this.closeProductListModal();
  }

  async showSuccessMessage(message: string) {
    this.alertMessage = message;
    this.alertModal.visible = true;

    await this.alertModal.waitForClose();
  }

  toggleSuccessAlert() {
    this.alertModalvisible = !this.alertModalvisible;
  }

  removeOrder(product_id: any){
    const index = this.orderDt.findIndex(item => item.product?.productId == product_id);
    if(index != -1){
      this.orderDt.splice(index, 1)
    }
  }
}
