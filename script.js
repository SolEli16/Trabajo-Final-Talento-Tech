// 🛍️ Productos simulados
let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".productos-container");

  // 🛍️ Cargar productos desde productos.json
  fetch("productos.json")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar productos");
      return response.json();
    })
    .then(data => {
      productos = data;
      mostrarProductos();
    })
    .catch(error => {
      console.error("Hubo un problema con la carga:", error);
      contenedor.innerHTML = "<p>No se pudieron cargar los productos 🛠️</p>";
    });

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
