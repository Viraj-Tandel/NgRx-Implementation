import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { createProductModel, ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Input() currentProduct!: ProductModel;
  productForm!: FormGroup;
  productData!: ProductModel;

  constructor(private formBuilder: FormBuilder, private ngbActiveModal: NgbActiveModal) {
    this.productData = createProductModel();
  }

  ngOnInit(): void {
    this.createFormControls();
  }

  // * initialize form controls
  createFormControls() {
    if (!this.currentProduct) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      this.productForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        discountPercentage: ['', [Validators.min(0), Validators.max(100)]],
        rating: ['', [Validators.min(0), Validators.max(5)]],
        stock: ['', Validators.min(0)],
        brand: ['', Validators.required],
        category: ['', Validators.required],
        thumbnail: ['', [Validators.required, Validators.pattern(urlPattern)]]
      });
    } else {
      this.productForm = this.formBuilder.group({
        title: [this.currentProduct.title, Validators.required],
        description: [this.currentProduct.description, Validators.required],
        price: [this.currentProduct.price, [Validators.required, Validators.min(1)]],
        discountPercentage: [this.currentProduct.discountPercentage, [Validators.min(0), Validators.max(100)]],
        rating: [this.currentProduct.rating, [Validators.min(0), Validators.max(5)]],
        stock: [this.currentProduct.stock, Validators.min(0)],
        brand: [this.currentProduct.brand, Validators.required],
        category: [this.currentProduct.category, Validators.required]
        // thumbnail: ['', [Validators.required, Validators.pattern(urlPattern)]]
      });
    }
  }

  // * cancel button click
  cancelButtonClick(): void {
    this.ngbActiveModal.close(false);
  }

  // * save button click
  saveButtonClick(): void {
    // if (!this.currentProduct) {
    this.productData = this.productForm.value;
    this.ngbActiveModal.close(this.productData);
    // } else {
    //
    // }
    console.log('Updated product DATA---------->', this.productData);
  }
}
