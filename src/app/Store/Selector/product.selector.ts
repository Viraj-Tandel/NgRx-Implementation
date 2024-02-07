import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../State/product.state';


// * featureName 'product' should match the reducer key
// * Make sure that the feature name in your createFeatureSelector matches the key under which the reducer is registered in your overall state
export const productFeatureSelector = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(productFeatureSelector, (state: ProductState) => state.products);
