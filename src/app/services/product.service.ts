import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<any>;

  constructor() {
    this.products = [
      { id: 1, name: 'Computer', price: 6500 },
      { id: 2, name: 'Printer', price: 1200 },
      { id: 3, name: 'Smart phone', price: 1400 },
    ];
  }

  //methode qui retourne tous les produits
  public getAllProducts(): Observable<Array<any>> {
    let rnd = Math.random();
    if (rnd < 0.5)
      return throwError(() => new Error('Internet connexion error'));
    else return of(this.products);
  }
}
