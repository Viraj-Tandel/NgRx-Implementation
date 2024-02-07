import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductAction from '../Actions/product.action';
import { ProductService } from '../../Service/product.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { handleCustomError, handleSuccessMessage } from '../Actions/generic.action';

@Injectable()
export class ProductEffect {

  // * Effect to handle the 'getProduct'
  getProductList$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.getProduct),
      mergeMap(() =>
        this.productService.getProductList().pipe(
          map((data) => {
            this.store.dispatch(handleSuccessMessage({ message: 'Products Retrieved Successfully!' }));
            return ProductAction.getProductSuccess({ products: data.products });
          }),
          catchError(error => {
            this.store.dispatch(handleCustomError({ message: 'Error while getting products' }));
            return of(ProductAction.getProductFail({ error: error }));
          })
        )
      )
    )
  );

  // * Effect to handle the 'addProduct'
  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.addProduct),
      mergeMap((action) => {
        return this.productService.addProduct(action.product).pipe(
          map((data) => {
            this.store.dispatch(handleSuccessMessage({ message: 'Product Add Successfully!' }));
            return ProductAction.addProductSuccess({ product: data });
          }),
          catchError(error => {
            this.store.dispatch(handleCustomError({ message: 'Error while adding products' }));
            return of(ProductAction.addProductFail({ error: error }));
          })
        );
      })
    )
  );

  // * Effect to handle the 'updateProduct'
  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.updateProduct),
      mergeMap((action) => {
        return this.productService.updateProduct(action.product, action.productId).pipe(
          map((data) => {
            this.store.dispatch(handleSuccessMessage({ message: 'Product Updated Successfully!' }));
            return ProductAction.updateProductSuccess({ product: data });
          }),
          catchError((error) => {
            this.store.dispatch(handleCustomError({ message: 'Error while updating products' }));
            return of(ProductAction.updateProductFail({ error: error }));
          })
        );
      })
    )
  );

  // * Effect to handle the 'deleteProduct'
  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.deleteProduct),
      mergeMap((data) => {
        return this.productService.deleteProduct(data.productId).pipe(
          map((res) => {
            this.store.dispatch(handleSuccessMessage({ message: 'Product Deleted Successfully!' }));
            return ProductAction.deleteProductSuccess({ product: res });
          }),
          catchError((error) => {
            this.store.dispatch(handleCustomError({ message: 'Error while delete!' }));
            return of(ProductAction.deleteProductFail({ error }));
          })
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private store: Store,
    private productService: ProductService
  ) {
  }


  // * code reference for understanding
  // getProductList$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(ProductAction.getProduct),
  //     mergeMap(() =>
  //       this.productService.getProductList().pipe(
  //         map((data) => {
  //           // * Below code is applicable for generic API response
  //           /*
  //            * Sample API response
  //            * {
  //            * success: true,
  //            * response: [{},{},...],
  //            * isCustom: true,
  //            * message: ""
  //            * }
  //            */
  //           // if (data.success) {
  //           //   this.store.dispatch(handleSuccessMessage({ message: 'Products Retrieved Successfully!' }));
  //           //   return ProductAction.getProductSuccess({ products: data });
  //           // } else if (data.isCustom) {
  //           //   this.store.dispatch(handleCustomError({ message: data.message }));
  //           //   return ProductAction.getProductFail({ error: error });
  //           // }
  //           this.store.dispatch(handleSuccessMessage({ message: 'Products Retrieved Successfully!' }));
  //           return ProductAction.getProductSuccess({ products: data });
  //         }),
  //         catchError(error => of(ProductAction.getProductFail({ error: error })))
  //       )
  //     )
  //   )
  // );
}

