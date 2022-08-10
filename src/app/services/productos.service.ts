import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){

    //DEBO RESOLVER EL ERROR DE QUE NO ME DEJA RECONOCER LA INTERFACE
    this.http.get('https://angular-html-pablo-default-rtdb.firebaseio.com/productos_idx.json').subscribe(
      (resp: any)=> {
        console.log(resp);
        this.productos = resp;
        
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
      });
  }
}
