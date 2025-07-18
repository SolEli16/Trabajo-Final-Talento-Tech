// 🛍️ Productos simulados
const productos = [
  { id: 1, nombre: "Sticker Capibara", precio: 1200, imagen: "img/stickers.jpg" },
  { id: 2, nombre: "Lapicera Azul", precio: 1500, imagen: "img/lapicera.jpg" },
  { id: 3, nombre: "Lapicera de 4 Colores", precio: 2100, imagen: "img/mapedcolores.jpg" },
  { id: 4, nombre: "Resaltadores con perfume", precio: 4500, imagen: "img/resaltadores1.jpg" },
  
  // 🎉 Nuevos productos (comienzan en id: 5)
  { id: 5, nombre: "Anotador cartera", precio: 3500, imagen: "img/anotadorcartera.jpg" },
  { id: 6, nombre: "Anotador París", precio: 3600, imagen: "img/anotadorparis.jpg" },
  { id: 7, nombre: "Cartuchos fibrones", precio: 2900, imagen: "img/cartuchosfibron.jpg" },
  { id: 8, nombre: "Clips kawaii", precio: 1800, imagen: "img/clipskawaii.jpg" },
  { id: 9, nombre: "Cuaderno A5", precio: 4900, imagen: "img/cuadernoa5.jpg" },
  { id:10, nombre: "Cuaderno pastel", precio: 5200, imagen: "img/cuadernospastel.jpg" },
  { id:11, nombre: "Espejito flor", precio: 2500, imagen: "img/espejito1.jpg" },
  { id:12, nombre: "Fibrones para pizarra", precio: 3100, imagen: "img/fibronpizarra.jpg" },
  { id:13, nombre: "Lapicera gel", precio: 1900, imagen: "img/lapiceragel.jpg" },
  { id:14, nombre: "Lapicera mini conejo", precio: 2100, imagen: "img/lapiceraminiconejo.jpg" },
  { id:15, nombre: "Lapicera negra", precio: 1700, imagen: "img/lapiceranegra.jpg" },
  { id:16, nombre: "Lapicera panda", precio: 2300, imagen: "img/lapicerapanda.jpg" },
  { id:17, nombre: "Lapicera Pikachu", precio: 2400, imagen: "img/lapicerapikachu.jpg" },
  { id:18, nombre: "Libreta Dino", precio: 3300, imagen: "img/libretadino.jpg" },
  { id:19, nombre: "Libreta Juegos", precio: 3200, imagen: "img/libretajuegos.jpg" },
  { id:20, nombre: "Microfibra motivos", precio: 2800, imagen: "img/microfibrasmotivos.jpg" },
  { id:21, nombre: "Notas transparentes", precio: 1600, imagen: "img/notastransparentes.jpg" },
  { id:22, nombre: "Resaltador pastel", precio: 3000, imagen: "img/resaltadores1.jpg" },
  { id:23, nombre: "Sellitos divertidos", precio: 2200, imagen: "img/sellitos.jpg" },
  { id:24, nombre: "Set de sellos", precio: 3400, imagen: "img/setsello.jpg" },
  { id:25, nombre: "Espejito corazón", precio: 2500, imagen: "img/spejito2.jpg" },
  { id:26, nombre: "Stickers corazones", precio: 1300, imagen: "img/stickers2.jpg" },
  { id:27, nombre: "Stickers animales", precio: 1300, imagen: "img/stickers3.jpg" },
  { id:28, nombre: "Stickers kawaii", precio: 1300, imagen: "img/stickers4.jpg" },
  { id:29, nombre: "Goma Pikachu", precio: 1400, imagen: "img/gomapikachu.jpg" },
  { id:30, nombre: "Gomas dinosaurios", precio: 1500, imagen: "img/gomasdinos.jpg" },
  { id:31, nombre: "Gomas pastitas", precio: 1500, imagen: "img/gomaspatitas.jpg" },
  { id:32, nombre: "Lapicera flexible", precio: 1800, imagen: "img/flexibles.jpg" },
  { id:33, nombre: "Libreta estilo 1", precio: 3100, imagen: "img/libretita1.jpg" },
  { id:34, nombre: "Cuaderno A5 color 1", precio: 5100, imagen: "img/cuadernoa5-1.jpg" },
  { id:35, nombre: "Cuaderno A5 color 2", precio: 5100, imagen: "img/cuadernoa5-2.jpg" },
  { id:36, nombre: "Lapicera 1", precio: 1500, imagen: "img/lapicera1.jpg" },
  { id:37, nombre: "Lapicera 2", precio: 1500, imagen: "img/lapicera2.jpg" },
  { id:38, nombre: "Lapicera 3", precio: 1500, imagen: "img/lapicera3.jpg" },
  { id:39, nombre: "Lapicera 4", precio: 1500, imagen: "img/lapicera4.jpg" },
  { id:40, nombre: "Lapicera 5", precio: 1500, imagen: "img/lapicera5.jpg" },
  { id:41, nombre: "Lapicera 6", precio: 1500, imagen: "img/lapicera6.jpg" },
  { id:42, nombre: "Lapicera básica", precio: 1500, imagen: "img/lapicera.jpg" }
];

// 🛒 Carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 🔄 Mostrar productos
function mostrarProductos() {
  const contenedor = document.querySelector(".productos-container");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button class="agregar-carrito" data-id="${prod.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// 🧮 Actualizar contador
function actualizarContador() {
  const contador = document.getElementById("contador-numero");
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (contador) {
    contador.textContent = totalItems;
  }
}

// 🛒 Mostrar carrito
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  const totalElement = document.getElementById("total");
  if (!contenedor || !totalElement) return;

  contenedor.innerHTML = "";

  carrito.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("carrito-item");
    item.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>Precio unitario: $${producto.precio}</p>
      <p>Cantidad: 
        <button onclick="cambiarCantidad(${producto.id}, -1)">−</button>
        ${producto.cantidad}
        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
      </p>
      <p>Subtotal: $${producto.precio * producto.cantidad}</p>
      <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
    `;
    contenedor.appendChild(item);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalElement.textContent = `Total: $${total}`;
}

// 🔁 Modificar cantidad
function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;

  producto.cantidad += cambio;
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

// 🗑️ Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

const seguirBtn = document.getElementById("seguir-comprando");

seguirBtn?.addEventListener("click", () => {
  document.getElementById("carrito")?.classList.remove("visible");
  document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
});

// 🚀 Iniciar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  actualizarContador();
  mostrarCarrito();
  

const compraBtn = document.getElementById("iniciar-compra");
const modalCompra = document.getElementById("modal-compra");
const cerrarModal = document.getElementById("cerrar-modal");
const formCompra = document.getElementById("form-compra");

compraBtn?.addEventListener("click", () => {
  modalCompra.style.display = "flex";
});

cerrarModal?.addEventListener("click", () => {
  modalCompra.style.display = "none";
});

formCompra?.addEventListener("submit", (e) => {
  e.preventDefault();
  //Mostrar la confirmación de la compra
  alert("¡Gracias por tu compra! 🛍️, en breve recibirás un email con los pasos a seguir para completar tu compra");
  // 🧹 Vaciar carrito y actualizar
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContador();

  // ❌ Cerrar modal

  modalCompra.style.display = "none";
});

  // Validación del formulario
  const form = document.querySelector("form");
  form?.addEventListener("submit", (e) => {
    const email = document.getElementById("email");
    const nombre = document.getElementById("nombre");
    if (!email.value.includes("@") || nombre.value.trim().length === 0) {
      alert("Por favor, ingresá un correo válido y tu nombre.");
      e.preventDefault();
      return;
    }
  });
  // 💫 Borrar el contenido cuando el usuario vuelve desde Formspree
window.addEventListener("pageshow", () => {
  form?.reset();
});


  // Desplegar carrito debajo del ícono
  const carritoIcono = document.getElementById("contador-carrito");
  const carritoPopup = document.getElementById("carrito");

  carritoIcono?.addEventListener("click", () => {
    carritoPopup.classList.toggle("visible");
    mostrarCarrito();
  });

  // 🚪 Cierre automático si se hace clic fuera
  document.addEventListener("click", (event) => {
    if (
      !carritoPopup.contains(event.target) &&
      !carritoIcono.contains(event.target)
    ) {
      carritoPopup.classList.remove("visible");
    }
  });
});

// 🎯 Escuchar clicks en “Agregar al carrito”
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const id = e.target.dataset.id;
    agregarAlCarrito(id);
  }
});

// ➕ Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  const itemExistente = carrito.find(p => p.id == id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

