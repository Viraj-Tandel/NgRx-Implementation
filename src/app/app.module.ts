import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './Store/State/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './Store/Effects/product.effect';
import { ToastrModule } from 'ngx-toastr';
import { GlobalEffect } from './Store/Effects/Global.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MaterialModule } from './Shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductHeaderComponent } from './components/product-header/product-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddProductComponent,
    ProductHeaderComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(AppState),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    HttpClientModule,
    EffectsModule.forRoot([ProductEffect, GlobalEffect]),
    ToastrModule.forRoot({
      timeOut: 3000,
      easing: 'ease-in',
      newestOnTop: true,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
