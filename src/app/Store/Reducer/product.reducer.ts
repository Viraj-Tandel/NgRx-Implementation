import { createReducer, on } from '@ngrx/store';
import { initialState } from '../State/product.state';
import * as ProductAction from '../Actions/product.action';

export const productReducer = createReducer(
  initialState,
  on(ProductAction.getProduct, (state) => ({
    ...state,
    products: state.products
  })),
  on(ProductAction.addProductSuccess, (state, newProduct) => {
    return { ...state, products: [...state.products, newProduct.product] };
  }),
  on(ProductAction.updateProductSuccess, (state, updatedProduct) => {
    const updatedProductList = state.products.map(product => {
      if (product.id === updatedProduct.product.id) {
        return { ...product, ...updatedProduct.product };
      }
      return product;
    });
    return { ...state, products: updatedProductList };
  }),
  on(ProductAction.getProductSuccess, (state, productsList) => ({
    ...state,
    products: productsList.products
  })),
  on(ProductAction.deleteProductSuccess, (state, deletedProduct) => ({
    ...state,
    products: state.products.filter((product) => product.id !== deletedProduct.product.id)
  }))
);
