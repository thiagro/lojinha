document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('productsList');
    const searchInput = document.getElementById('searchInput');

    // Carrega todos os produtos
    loadProducts();

    // Adiciona listener para busca
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Função para carregar produtos da API
    function loadProducts() {
        fetch('https://lojinha.fly.dev/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar produtos');
                }
                return response.json();
            })
            .then(products => {
                productsList.innerHTML = '';

                if (products.length === 0) {
                    productsList.innerHTML = '<div class="no-products">Nenhum produto cadastrado ainda.</div>';
                    return;
                }

                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">R$ ${parseFloat(product.price).toFixed(2)}</p>
                    `;
                    productsList.appendChild(productCard);
                });
            })
            .catch(error => {
                productsList.innerHTML = `<div class="no-products">Erro ao carregar produtos: ${error.message}</div>`;
                console.error('Error:', error);
            });
    }
});
