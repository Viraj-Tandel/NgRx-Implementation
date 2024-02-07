import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';

const GET_PRODUCT = '[Product Page] Get';
const ADD_PRODUCT = '[Product Page] Add Product';
const UPDATE_PRODUCT = '[Product Page] Update Product';
const DELETE_PRODUCT = '[Product Page] Delete Product';
const GET_PRODUCT_SUCCESS = '[Product Page] Get Product Success';
const GET_PRODUCT_FAIL = '[Product Page] Get Product Fail';
const ADD_PRODUCT_SUCCESS = '[Product Page] Add Product Success';
const ADD_PRODUCT_FAIL = '[Product Page] Add Product Fail';
const UPDATE_PRODUCT_SUCCESS = '[Product Page] Update Product Success';
const UPDATE_PRODUCT_FAIL = '[Product Page] Update Product Fail';
const DELETE_PRODUCT_SUCCESS = '[Product Page] Delete Product Success';
const DELETE_PRODUCT_FAIL = '[Product Page] Delete Product Fail';

/**
 * * Action to retrieve products
 */
export const getProduct = createAction(GET_PRODUCT);

/**
 * * Action to add product
 * * @param product - The product to be added
 */
export const addProduct = createAction(ADD_PRODUCT, props<{ product: ProductModel }>());

/**
 * * Action to add product
 * * @param product - The product to be updated
 */
export const updateProduct = createAction(UPDATE_PRODUCT, props<{ product: ProductModel, productId: number }>());

/**
 * * Action to add product
 * * @param product - The product to be deleted
 */
export const deleteProduct = createAction(DELETE_PRODUCT, props<{ productId: number }>());

/**
 * * Action for successful product retrieval from the server.
 * * @param products - An array of ProductModel representing the retrieved products.
 */
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS, props<{
  products: ProductModel[]
}>());

/**
 * * Action for failure product retrieval from server
 */
export const getProductFail = createAction(GET_PRODUCT_FAIL, props<{ error?: any }>());

/**
 * * Action for successful product creation at server.
 * * @param product - newly added product.
 */
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{
  product: ProductModel
}>());

/**
 * * Action for successful product creation at server.
 */
export const addProductFail = createAction(ADD_PRODUCT_FAIL, props<{
  error?: any
}>());

/**
 * * Action for successful product retrieval from the server.
 * * @param products - An array of ProductModel representing the retrieved products.
 */
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS, props<{
  product: ProductModel
}>());

/**
 * * Action for successful product creation at server.
 */
export const updateProductFail = createAction(UPDATE_PRODUCT_FAIL, props<{
  error?: any
}>());

/**
 * * Action for successful product retrieval from the server.
 * * @param products - An array of ProductModel representing the retrieved products.
 */
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{
  product: ProductModel
}>());

/**
 * * Action for successful product creation at server.
 */
export const deleteProductFail = createAction(DELETE_PRODUCT_FAIL, props<{
  error?: any
}>());
