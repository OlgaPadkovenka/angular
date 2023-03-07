import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Computer', price: 6500, promotion: true },
      { id: UUID.UUID(), name: 'Printer', price: 1200, promotion: false },
      { id: UUID.UUID(), name: 'Smart phone', price: 1400, promotion: true },
    ];
  }

  //methode qui retourne tous les produits
  //Observable<Array<Product>> ou Observable<Product[]> c'est la même chose
  public getAllProducts(): Observable<Array<Product>> {
    let rnd = Math.random();
    if (rnd < 0.5)
      return throwError(() => new Error('Internet connexion error'));
    else return of(this.products);
  }

  public deleteProduct(id: string): Observable<boolean> {
    //je prends des ids des produits que je ne veux pas supprimer.
    //si l'id est differant de l'id- que je veux supprimer.
    this.products.filter((p) => p.id != id);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean> {
    let product = this.products.find((p) => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else return throwError(() => new Error("Product n'est pas trouvé"));
  }

  public searchProducts(keyword: string): Observable<Product[]> {
    let products = this.products.filter((p) => p.name.includes(keyword));
    return of(products);
  }
}
