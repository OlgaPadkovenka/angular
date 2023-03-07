import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //on est obligé d'inisialiser la variable
  products!: Array<Product>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  // ca execute au démarage
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      //le champ du formulaire
      keyword: this.fb.control(null),
    });

    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  //supprimer un produit, evenement au click
  handleDeleteProduct(p: Product) {
    // //je cherche l'element à supprimer
    // let index = this.products?.indexOf(p);
    // this.products.splice(index, 1);

    let conf = confirm('Est-ce que vous être sur de vouloir supprimer');
    if (conf == false) return;

    this.productService.deleteProduct(p.id).subscribe({
      next: (data: boolean) => {
        //this.handleGetAllProducts();
        let index = this.products?.indexOf(p);
        this.products.splice(index, 1);
      },
    });
  }

  handelSetPromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next: (data: boolean) => {
        p.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleSearchProducts() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }
}
