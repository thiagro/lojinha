document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('productsList');
    const searchInput = document.getElementById('searchInput');
    
    // Verifica se os elementos existem antes de adicionar listeners
    if (!productsList || !searchInput) {
        console.error('Elementos necessários não encontrados no DOM');
        return;
    }
    
    // Carrega todos os produtos
    loadProducts();
    
    // Adiciona listener para busca apenas se o input existir
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title')?.textContent.toLowerCase();
                const description = card.querySelector('.product-description')?.textContent.toLowerCase();
                
                if (title?.includes(searchTerm) || description?.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Restante do código...
});
