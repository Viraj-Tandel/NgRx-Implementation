import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://dummyjson.com/products';
  }

  // * get product list
  getProductList(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // * add product
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(`${this.apiUrl}/add`, product).pipe(
      catchError(this.handleError)
    );
  }

  // * update product
  updateProduct(product: ProductModel, productId: number): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${this.apiUrl}/${productId}`, product).pipe(
      catchError(this.handleError)
    );
  }

  // * delete product
  deleteProduct(productId: number): Observable<ProductModel> {
    return this.httpClient.delete<ProductModel>(`${this.apiUrl}/${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong!';

    // Customize the error message based on the actual error received
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.message}`;
    } else if (error.status) {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.statusText}`;
    }
    return throwError(() => errorMessage);
  }
}
