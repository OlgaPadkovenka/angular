import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageProduct, Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //on est obligé d'inisialiser la variable
  products!: Array<Product>;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
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

    //this.handleGetAllProducts();
    this.handleGetPageProducts();
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

  handleGetPageProducts() {
    this.productService
      .getPageProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (data: PageProduct) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
          console.log(this.totalPages);
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }

  goToPage(i: number) {
    this.currentPage = i;
    this.handleGetPageProducts();
  }
}
