import {ProductModel} from "../../models/product.model";


export interface ProductState {
  products: ProductModel[];
}
export const initialState:ProductState = {
  products: []
}
