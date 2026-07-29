// Dados Iniciais
let reviews = [
  {
    id: 1,
    title: "Interstellar",
    category: "filme",
    rating: 5,
    tag: "Finais surpreendentes",
    review: "Uma obra-prima da ficção científica. Trilha sonora e visual espetaculares."
  },
  {
    id: 2,
    title: "Stardew Valley",
    category: "game",
    rating: 5,
    tag: "Jogos para passar o tempo",
    review: "Extremamente relaxante. Perfeito para jogar ouvindo um podcast no final de semana."
  },
  {
    id: 3,
    title: "Random Access Memories",
    category: "musica",
    rating: 4,
    tag: "Para ouvir treinando",
    review: "Álbum incrível do Daft Punk. A produção de áudio é simplesmente impecável."
  }
];

let currentFilter = 'todos';

// Função para renderizar os cards na tela
function renderReviews() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  const filteredReviews = currentFilter === 'todos' 
    ? reviews 
    : reviews.filter(item => item.category === currentFilter);

  if (filteredReviews.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-muted);">Nenhuma resenha cadastrada nesta categoria.</p>';
    return;
  }

  filteredReviews.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <div class="card-header">
          <span class="badge badge-${item.category}">${item.category}</span>
          <span class="rating">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-body">"${item.review}"</p>
      </div>
      ${item.tag ? `<div class="card-tag"># ${item.tag}</div>` : ''}
    `;
    grid.appendChild(card);
  });
}

// Evento para os botões de filtro
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.getAttribute('data-category');

    // Atualiza o estado ativo dos botões
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    renderReviews();
  });
});

// Evento de envio do formulário
document.getElementById('reviewForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const newReview = {
    id: Date.now(),
    title: document.getElementById('title').value,
    category: document.getElementById('category').value,
    rating: parseInt(document.getElementById('rating').value),
    tag: document.getElementById('tag').value,
    review: document.getElementById('review').value
  };

  // Adiciona a nova resenha ao início do array
  reviews.unshift(newReview);

  // Limpa o formulário
  this.reset();

  // Atualiza a exibição
  renderReviews();
});

// Renderização inicial ao carregar a página
renderReviews();
