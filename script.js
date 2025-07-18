// 🛍️ Estado global
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 🔧 Utilidades de selección
const $ = selector => document.querySelector(selector);

// 📦 Inicializar aplicación
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  mostrarCarrito();
  configurarEventos();
});

// 🛍️ Lista completa de productos (sin fetch)
productos = [
  { id: 1, nombre: "Sticker Capibara", precio: 1200, imagen: "stickers.jpg" },
  { id: 2, nombre: "Lapicera Azul", precio: 1500, imagen: "lapicera.jpg" },
  { id: 3, nombre: "Lapicera de 4 Colores", precio: 2100, imagen: "mapedcolores.jpg" },
  { id: 4, nombre: "Resaltadores con perfume", precio: 4500, imagen: "resaltadores1.jpg" },
  { id: 5, nombre: "Anotador cartera", precio: 3500, imagen: "anotadorcartera.jpg" },
  { id: 6, nombre: "Anotador París", precio: 3600, imagen: "anotadorparis.jpg" },
  { id: 7, nombre: "Cartuchos fibrones", precio: 2900, imagen: "cartuchosfibron.jpg" },
  { id: 8, nombre: "Clips kawaii", precio: 1800, imagen: "clipskawaii.jpg" },
  { id: 9, nombre: "Cuaderno A5", precio: 4900, imagen: "cuadernoa5.jpg" },
  { id: 10, nombre: "Cuaderno pastel", precio: 5200, imagen: "cuadernospastel.jpg" },
  { id: 11, nombre: "Espejito flor", precio: 2500, imagen: "espejito1.jpg" },
  { id: 12, nombre: "Fibrones para pizarra", precio: 3100, imagen: "fibronpizarra.jpg" },
  { id: 13, nombre: "Lapicera gel", precio: 1900, imagen: "lapiceragel.jpg" },
  { id: 14, nombre: "Lapicera mini conejo", precio: 2100, imagen: "lapiceraminiconejo.jpg" },
  { id: 15, nombre: "Lapicera negra", precio: 1700, imagen: "lapiceranegra.jpg" },
  { id: 16, nombre: "Lapicera panda", precio: 2300, imagen: "lapicerapanda.jpg" },
  { id: 17, nombre: "Lapicera Pikachu", precio: 2400, imagen: "lapicerapikachu.jpg" },
  { id: 18, nombre: "Libreta Dino", precio: 3300, imagen: "libretadino.jpg" },
  { id: 19, nombre: "Libreta Juegos", precio: 3200, imagen: "libretajuegos.jpg" },
  { id: 20, nombre: "Microfibra motivos", precio: 2800, imagen: "microfibrasmotivos.jpg" },
  { id: 21, nombre: "Notas transparentes", precio: 1600, imagen: "notastransparentes.jpg" },
  { id: 22, nombre: "Sellitos divertidos", precio: 2200, imagen: "sellitos.jpg" },
  { id: 23, nombre: "Set de sellos", precio: 3400, imagen: "setsello.jpg" },
  { id: 24, nombre: "Espejito corazón", precio: 2500, imagen: "spejito2.jpg" },
  { id: 25, nombre: "Stickers corazones", precio: 1300, imagen: "stickers2.jpg" },
  { id: 26, nombre: "Stickers animales", precio: 1300, imagen: "stickers3.jpg" },
  { id: 27, nombre: "Stickers kawaii", precio: 1300, imagen: "stickers4.jpg" },
  { id: 28, nombre: "Goma Pikachu", precio: 1400, imagen: "gomapikachu.jpg" },
  { id: 29, nombre: "Gomas dinosaurios", precio: 1500, imagen: "gomasdinos.jpg" },
  { id: 30, nombre: "Gomas pastitas", precio: 1500, imagen: "gomaspatitas.jpg" },
  { id: 31, nombre: "Lapicera flexible", precio: 1800, imagen: "flexibles.jpg" },
  { id: 32, nombre: "Libretita estilo 1", precio: 3100, imagen: "libretita1.jpg" },
  { id: 33, nombre: "Cuaderno A5 color 1", precio: 5100, imagen: "cuadernoa5-1.jpg" },
  { id: 34, nombre: "Cuaderno A5 color 2", precio: 5100, imagen: "cuadernoa5-2.jpg" },
  { id: 35, nombre: "Lapicera 1", precio: 1500, imagen: "lapicera1.jpg" },
  { id: 36, nombre: "Lapicera 2", precio: 1500, imagen: "lapicera2.jpg" },
  { id: 37, nombre: "Lapicera 3", precio: 1500, imagen: "lapicera3.jpg" },
  { id: 38, nombre: "Lapicera 4", precio: 1500, imagen: "lapicera4.jpg" },
  { id: 39, nombre: "Lapicera 5", precio: 1500, imagen: "lapicera5.jpg" },
  { id: 40, nombre: "Lapicera 6", precio: 1500, imagen: "lapicera6.jpg" },
];

// 🎯 Reemplazá tu función cargarProductos() con esta línea en el DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos($(".productos-container"));
  actualizarContador();
  mostrarCarrito();
  configurarEventos();
});

// 🎨 Renderizar cards de productos
function renderizarProductos(contenedor) {
  contenedor.innerHTML = "";
  productos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button class="agregar-carrito" data-id="${prod.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// 🛒 Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  const item = carrito.find(p => p.id == id);

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContador();
}

// 🔄 Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 🔢 Actualizar contador
function actualizarContador() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const contador = $("#contador-numero");
  if (contador) contador.textContent = total;
}

// 🛍️ Mostrar carrito
function mostrarCarrito() {
  const contenedor = $("#carrito-container");
  const totalElement = $("#total");
  if (!contenedor || !totalElement) return;

  contenedor.innerHTML = "";
  carrito.forEach(prod => {
    const item = document.createElement("div");
    item.className = "carrito-item";
    item.innerHTML = `
      <h4>${prod.nombre}</h4>
      <p>Precio: $${prod.precio}</p>
      <p>Cantidad: 
        <button onclick="cambiarCantidad(${prod.id}, -1)">−</button>
        ${prod.cantidad}
        <button onclick="cambiarCantidad(${prod.id}, 1)">+</button>
      </p>
      <p>Subtotal: $${prod.precio * prod.cantidad}</p>
      <button onclick="eliminarProducto(${prod.id})">Eliminar</button>
    `;
    contenedor.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalElement.textContent = `Total: $${total}`;
}

// 🔁 Cambiar cantidad
function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito();
  mostrarCarrito();
  actualizarContador();
}

// 🗑️ Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  mostrarCarrito();
  actualizarContador();
}

// 🧭 Configurar eventos globales
function configurarEventos() {
  document.addEventListener("click", e => {
    if (e.target.classList.contains("agregar-carrito")) {
      agregarAlCarrito(e.target.dataset.id);
    }
  });

  $("#seguir-comprando")?.addEventListener("click", () => {
    $("#carrito")?.classList.remove("visible");
    $("#productos")?.scrollIntoView({ behavior: "smooth" });
  });

  $("#contador-carrito")?.addEventListener("click", () => {
    $("#carrito")?.classList.toggle("visible");
    mostrarCarrito();
  });

  document.addEventListener("click", e => {
    if (
      !$("#carrito")?.contains(e.target) &&
      !$("#contador-carrito")?.contains(e.target)
    ) {
      $("#carrito")?.classList.remove("visible");
    }
  });

  // 🧼 Validación y envío del formulario
  const formCompra = $("#form-compra");
  formCompra?.addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Gracias por tu compra, en breve te llegará un mensaje con los detalles para finalizar la transacción, Sol! 🛍️");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
    $("#modal-compra").style.display = "none";
  });

  $("#iniciar-compra")?.addEventListener("click", () => {
    $("#modal-compra").style.display = "flex";
  });

  $("#cerrar-modal")?.addEventListener("click", () => {
    $("#modal-compra").style.display = "none";
  });

  // 🔄 Reset del formulario al volver
  window.addEventListener("pageshow", () => {
    formCompra?.reset();
  });
}
