import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise<void>( (resolve, reject) => {
      //DEBO RESOLVER EL ERROR DE QUE NO ME DEJA RECONOCER LA INTERFACE
      this.http.get('https://angular-html-pablo-default-rtdb.firebaseio.com/productos_idx.json').subscribe(
      (resp: any)=> {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
        resolve();
      });
    });
  }

  getProducto(id: string){

//PODRIAS ENCONTRAR UNA FORMA AGRADABLE DE QUE EL USUARIO RECIBA ESA PANTALLA DE CARGA 
    //Este es un observable
    return this.http.get(`https://angular-html-pablo-default-rtdb.firebaseio.com/productos/${ id }.json`)
  }


  buscarProducto(termino: string){

    if( this.productos.length === 0 ){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos
        //Aplicar Filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);

    }
    
    
  }

  private filtrarProductos( termino: string ) {
    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod)
      }
    });
    // this.productosFiltrado = this.productos.filter( producto => {
    //   return true;
    // });
    // console.log(this.productosFiltrado);
  }
}
