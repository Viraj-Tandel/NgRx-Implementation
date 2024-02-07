import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../../Store/State/product.state';
import * as ProductAction from '../../Store/Actions/product.action';
import { Subject, takeUntil } from 'rxjs';
import { selectProduct } from '../../Store/Selector/product.selector';
import { ProductModel } from '../../models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();
  productList!: ProductModel[];

  constructor(private store: Store<ProductState>, private ngbModal: NgbModal) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.initializeSubscription();
  }

  // * api call to get the product list
  getProductList() {
    this.store.dispatch(ProductAction.getProduct());
    // TODO I want to do something here
  }

  // * initialize required subscription
  initializeSubscription() {
    // * Subscribe to product state and update productList on changes
    this.store.select(selectProduct).pipe(takeUntil(this.destroyed$)).subscribe((products) => {
      this.productList = products;
    });
  }

  // * api call to add new product
  addNewProduct() {
    const addModal = this.ngbModal.open(AddProductComponent, {
      size: 'xl',
      keyboard: false,
      backdrop: false,
      centered: true
    });
    addModal.componentInstance.currentProduct = null;
    addModal.result.then((res: ProductModel) => {
      if (res) {
        this.store.dispatch(ProductAction.addProduct({ product: res }));
      }
    });
  }

  editProduct(product: ProductModel) {
    const editDialog = this.ngbModal.open(AddProductComponent, {
      size: 'xl',
      backdrop: false,
      keyboard: false,
      centered: true
    });
    editDialog.componentInstance.currentProduct = { ...product };
    editDialog.result.then((res: ProductModel) => {
      if (res) {
        // @ts-ignore
        this.store.dispatch(ProductAction.updateProduct({ product: res, productId: product.id }));
      }
    });
  }

  deleteProduct(product: ProductModel) {
    this.store.dispatch(ProductAction.deleteProduct({ productId: product.id }));
  }

  trackByFunction(index: number, product: ProductModel): any {
    return product.id;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
