export interface Result {
  id: string;
  name: string;
  items: string[];
  address: string;
  pincode: string;
}

export interface FilteredResult extends Result {
  queryInItems?: string;
}
