export interface CraftspersonModel {
  craftsperson_id?: number;  // generated field, so it is optional
  craftsperson_name: string;
  address?: string;
  contact?: string;
  history?: string;
  description?: string;
}


export interface CriteriaRequest {
  craftsperson_name: string,
  nameprodcut: string
}
