// Dados iniciais padrão
const defaultReviews = [
  {
    id: 1,
    title: "Interstellar",
    category: "filme",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
    tag: "Finais surpreendentes",
    review: "Uma obra-prima da ficção científica. Trilha sonora e visual espetaculares."
  },
  {
    id: 2,
    title: "Stardew Valley",
    category: "game",
    rating: 5,
    imageUrl: "",
    tag: "Para passar o tempo",
    review: "Extremamente relaxante. Perfeito para jogar ouvindo um podcast no final de semana."
  }
];

// Carrega os dados salvos no localStorage ou usa os padrão
let reviews = JSON.parse(localStorage.getItem('my_reviews')) || defaultReviews;
let currentFilter = 'todos';
let searchQuery = '';

// Função para salvar no LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('my_reviews', JSON.stringify(reviews));
}

// Renderiza a lista na tela
function renderReviews() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  // Filtra por Categoria e por Busca de texto
  const filtered = reviews.filter(item => {
    const matchesCategory = currentFilter === 'todos' || item.category === currentFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Nenhuma resenha encontrada.</p>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
