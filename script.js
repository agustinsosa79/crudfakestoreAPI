const url = "https://fakestoreapi.com/products";
const $name = document.querySelector("#name");
const $description = document.querySelector("#description");
const $price = document.querySelector("#price");
const $image = document.querySelector("#image");
const $form = document.querySelector("#product-form");
const $submit = document.querySelector("#add-product-btn");
let productsData = [];

// Actualiza tbody
function renderTable() {
    const $tbody = document.querySelector("#products-table tbody");
    $tbody.innerHTML = productsData.map(p => `
        <tr>
            <td data-label="Producto">${p.id}</td>
            <td data-label="Titulo">${p.title}</td>
            <td data-label="Imagenes"><img src="${p.image}" alt="${p.title}" style="width:60px;height:60px"></td>
            <td data-label="Precio">$${p.price}</td>
            <td data-label="Acciones"><button class="editar" data-id="${p.id}">Editar</button></td>
            <td data-label="Acciones"><button class="eliminar" data-id="${p.id}">Eliminar</button></td>
        </tr>
    `).join('');
}

// Obtiene productos
async function fetchProducts() {
    const res = await fetch(url);
    productsData = await res.json();
    renderTable();
}

// Iniciar
fetchProducts();

// Manejar clics
document.addEventListener('click', async e => {
    // Editar
    if (e.target.classList.contains('editar')) {
        const id = e.target.dataset.id;
        const prod = productsData.find(x => x.id == id);
        $name.value = prod.title;
        $description.value = prod.description;
        $price.value = prod.price;
        $image.value = prod.image;
        $submit.dataset.id = id;
        $submit.textContent = 'Actualizar Producto';
    }
    // Eliminar
    if (e.target.classList.contains('eliminar')) {
        const id = e.target.dataset.id;
        await fetch(`${url}/${id}`, { method:'DELETE' });
        productsData = productsData.filter(x=>x.id!=id);
        renderTable();
    }
    // Agregar/Actualizar
    if (e.target.id === 'add-product-btn') {
        const id = e.target.dataset.id;
        const method = id ? 'PUT':'POST';
        const endpoint = id? `${url}/${id}`:url;
        const body = {
            title: $name.value,
            description: $description.value,
            price: parseFloat($price.value),
            image: $image.value
        };
        const res = await fetch(endpoint, {
            method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
        });
        const data = await res.json();
        if (id) {
            const idx = productsData.findIndex(x=>x.id==id);
            productsData[idx]=data;
        } else {
            productsData.push(data);
        }
        renderTable();
        $form.reset();
        delete $submit.dataset.id;
        $submit.textContent='Agregar Producto';
    }
});