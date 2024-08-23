export interface CraftspersonModel {
  craftspersonId: number;  // generated field, so it is optional
  craftspersonName: string;
  address?: string;
  contact?: string;
  history?: string;
  description?: string;
}


export interface CriteriaRequest {
  craftsperson_name: string,
  nameprodcut: string
}
