export interface CraftspersonModel {
  craftspersonId: number | null;  // generated field, so it is optional
  craftspersonName: string | null;
  address: string | null;
  contact: string | null;
  history: string | null;
  description: string | null;
}


export interface CriteriaRequest {
  craftspersonName: string,
  nameprodcut: string
}
