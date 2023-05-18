// Cada producto que vende el super es creado con esta clase
class Producto {
    constructor(sku, nombre, precio, categoria, stock) {
      this.sku = sku;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.stock = stock || 10; // Si no se proporciona el valor de stock, se asigna 10 por defecto
    }
  }
  // Creo todos los productos que vende mi super
  const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
  const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
  const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
  const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
  const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
  const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
  const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
  const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);
  // Genero un listado de productos. Simulando base de datos
  const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];
  // Cada cliente que venga a mi super va a crear un carrito
  class Carrito {
    constructor() {
      this.precioTotal = 0;
      this.productos = [];
      this.categorias = [];
    }
   /**
     * Función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    agregarProducto(sku, cantidad) {
      console.log(`Agregando ${cantidad} ${sku}`);
  
      return new Promise((resolve, reject) => {
          // Busco el producto en la "base de datos"
        const producto = productosDelSuper.find((product) => product.sku === sku);
  
        if (!producto) {
          reject(`El producto ${sku} no existe.`);
          return;
        }
          // Verifico si el producto ya existe en el carrito
        const productoExistente = this.productos.find((p) => p.sku === sku);
  
        if (productoExistente) {
          productoExistente.cantidad += cantidad;
        } else {
          const nuevoProducto = new Producto(sku, producto.nombre, producto.precio, producto.categoria);
          nuevoProducto.cantidad = cantidad;
          this.productos.push(nuevoProducto);
        }
        // Verifico si la categoría ya está en la lista
        if (!this.categorias.includes(producto.categoria)) {
          this.categorias.push(producto.categoria);
        }
  
        this.precioTotal += producto.precio * cantidad;
        resolve();
      });
    }
  /**
   * Función que elimina @{cantidad} de productos con @{sku} del carrito
   */
    eliminarProducto(sku, cantidad) {
      console.log(`Eliminando ${cantidad} ${sku}`);
  
      return new Promise((resolve, reject) => {
        // Busco el producto en el carrito
        const productoExistente = this.productos.find((p) => p.sku === sku);
  
        if (!productoExistente) {
          reject(`El producto ${sku} no existe en el carrito.`);
          return;
        }
        if (cantidad < productoExistente.cantidad) {
          productoExistente.cantidad -= cantidad;
        } else {
          // Elimino el producto del carrito
          const productoIndex = this.productos.findIndex((p) => p.sku === sku);
          this.productos.splice(productoIndex, 1);
        }
  
        resolve();
      });
    }
  }
   //Prueba Si no me definen stock, pongo 10 por default
   console.log(queso.stock); // Resultado: 4
   console.log(gaseosa.stock); // Resultado: 10
   console.log(cerveza.stock); // Resultado: 10
   console.log(arroz.stock); // Resultado: 20
   console.log(fideos.stock); // Resultado: 10
   console.log(lavandina.stock); // Resultado: 10
   console.log(shampoo.stock); // Resultado: 50
   console.log(jabon.stock); // Resultado: 3
  
  //Uso y prueba de carrito utilizando .then y .catch
  const carrito = new Carrito();
  carrito.agregarProducto('WE328NJ', 1)
    .then(() => {
      console.log('Producto agregado al carrito exitosamente.');
      return carrito.eliminarProducto('WE328NJ', 1);
    })
    .then(() => {
      console.log('Producto eliminado del carrito exitosamente.');
      console.log('Productos en el carrito:', carrito.productos);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  
    carrito.agregarProducto('WE328NJ', 1)
      .then(() => {
        console.log('Producto agregado al carrito exitosamente.');
        console.log('Carrito:', carrito);
        return carrito.eliminarProducto('ABC123', 1);
      })
      .then(() => {
        console.log('Producto eliminado del carrito exitosamente.');
        console.log('Carrito:', carrito);
        console.log('Productos en el carrito:', carrito.productos);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
   
