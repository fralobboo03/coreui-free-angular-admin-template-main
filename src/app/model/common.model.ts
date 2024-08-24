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


export interface CriteriaRequest {
  craftspersonName: string,
  nameprodcut: string
}

