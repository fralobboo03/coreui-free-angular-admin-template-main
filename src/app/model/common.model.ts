export interface CraftspersonModel {
  craftspersonId: number | null;  // generated field, so it is optional
  craftspersonName: string | null;
  address: string | null;
  contact: string | null;
  history: string | null;
  description: string | null;
}

export interface MaterialModel {
  materialId: number | null;
  nameMaterial: string | null;
  typeMaterial: string | null;
  source: string | null;
  otherDetails: string | null;
}

export interface CustomerModel {
  customerId: number | null;
  customerName: string | null;
  address: string | null;
  contact: string | null;
  history: string | null;
  description: string | null;
}

export interface Order {
  orderId: number | null;
  orderDate: string | null;
  quantity: number | null;
  status: string | null;
  otherDetails: string | null;
  orderDetails: OrderDetail[] | null;
}
export interface OrderRequest {
  orderId: number | null;
  orderDate: string | null;
  quantity: number | null;
  status: string | null;
  otherDetails: string | null;
  orderDetails: OrderDetailRequest[] | null;
}

export interface OrderDetail {
  orderDetailId: number | null;
  order: Order | null;
  product: Product | null;
  quantity: number;
}
export interface OrderDetailRequest {
  orderDetailId: number | null;
  product: Product | null;
  quantity: number;
}

export interface Product {
  productId: number,
  nameProduct: string | null,
  description: string | null,
  amount: number | null,
  costPrice: number | null,
  salePrice: number | null,
  image: any,
  otherDetails: string,
  materialDetail: any[],
  craftspersonDetail: any[]
}


export interface CriteriaRequest {
  craftspersonName: string,
  nameprodcut: string
}

export interface ProductImage {
  imageId: number,
  image: string,
  detailImage: string,
  otherDetails: string
  file: File
}

export interface CraftspersonDetail {
  craftspersonDetailId: number,
  product?: Product,
  craftsperson: CraftspersonModel,
}

export interface MaterialDetail {
  materialDetailId: number,
  product?: Product,
  material: MaterialModel,
}


