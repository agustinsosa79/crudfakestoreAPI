const url = "https://fakestoreapi.com/products";

// Función para obtener los productos
const fetchProducts = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta.");
        }

        // Obtenemos los datos en formato JSON
        const data = await response.json();
        
        // Creamos una tabla para mostrar los productos
        let tableHTML = "<tr><th>ID</th><th>Titulo</th><th>Precio</th><th>Imagen</th></tr>";
        
        data.forEach(product => {
            // Creamos una imagen usando la URL de la imagen del producto
            const productImage = `<img src="${product.image}" alt="${product.title}" style="width: 100px; height: 100px;">`;

            // Agregamos la fila de la tabla con la imagen
            tableHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${productImage}</td>
                    <td>$${product.price}</td>
                </tr>
            `;
        });
        
        // Insertamos el HTML generado en la tabla
        document.querySelector("#products-table").innerHTML = tableHTML;
        
        // Mostramos los productos en la consola
        console.log("Productos recibidos:", data);
        
        // Retornamos los datos
        return data;
    } catch (error) {
        // En caso de error, lo mostramos en la consola
        console.error("Error al obtener los productos:", error);
    }
};

// Llamamos a la función
fetchProducts();
