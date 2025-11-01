
/* script.js */
const recipes = [
  {
    id: 'veloute-courge-ananas',
    title: 'Velouté courge & ananas (Thermomix)',
    category: 'entree',
    excerpt: 'Velouté doux et légèrement sucré, préparé en 25 min au Thermomix.',
    image: 'https://picsum.photos/seed/veloute/900/600',
    url: 'recette.html?slug=veloute-courge-ananas'
  },
  {
    id: 'muffins-banane',
    title: 'Muffins à la banane (Thermomix)',
    category: 'dessert',
    excerpt: 'Muffins moelleux, simples, parfaits pour utiliser les bananes mûres.',
    image: 'https://picsum.photos/seed/muffins/900/600',
    url: 'recette.html?slug=muffins-banane'
  },
  {
    id: 'sauce-bolognaise',
    title: 'Sauce bolognaise rapide (Thermomix)',
    category: 'plat',
    excerpt: 'Sauce bolognaise épaissie et savoureuse, méthode Thermomix.',
    image: 'https://picsum.photos/seed/bolognaise/900/600',
    url: 'recette.html?slug=sauce-bolognaise'
  }
];

function el(tag, attrs={}, children=[]){
  const e = document.createElement(tag);
  for(const k in attrs){
    if(k === 'class') e.className = attrs[k];
    else if(k === 'text') e.textContent = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  children.forEach(c => e.appendChild(c));
  return e;
}

function renderCards(list){
  const container = document.getElementById('recipesList');
  container.innerHTML = '';
  list.forEach(r => {
    const card = el('article', {class:'card'});
    const img = el('img', {src:r.image, alt:r.title});
    const body = el('div', {class:'card-body'});
    const title = el('h4', {text:r.title});
    const meta = el('div', {class:'meta', text:r.category});
    const excerpt = el('p', {text:r.excerpt});
    const actions = el('div', {class:'actions'});
    const view = el('a', {href:r.url, class:'btn primary', text:'Voir la recette'});
    actions.appendChild(view);

    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(excerpt);
    body.appendChild(actions);

    card.appendChild(img);
    card.appendChild(body);
    container.appendChild(card);
  });
}

/* Search + filters */
function applyFilter(){
  const q = document.getElementById('search').value.toLowerCase().trim();
  const cat = document.getElementById('categoryFilter').value;
  const filtered = recipes.filter(r => {
    const matchQ = q === '' || (r.title + ' ' + r.excerpt).toLowerCase().includes(q);
    const matchCat = cat === 'all' || r.category === cat;
    return matchQ && matchCat;
  });
  renderCards(filtered);
}

/* Initial render */
document.addEventListener('DOMContentLoaded', () => {
  renderCards(recipes);
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('search').addEventListener('input', applyFilter);
  document.getElementById('categoryFilter').addEventListener('change', applyFilter);
});


