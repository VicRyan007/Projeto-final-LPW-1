document.addEventListener('DOMContentLoaded', async () => {
  const page = window.location.pathname.split('/').pop();
  const typeMap = {
    'cultura.html': 'cultura',
    'leiloes.html': 'leilao',
    'shows.html': 'show',
    'workshops.html': 'workshop'
  };
  const type = typeMap[page];
  if (!type) return;

  const params = new URLSearchParams(location.search);
  const selectedCity = params.get('city') || '';

  const citiesResponse = await fetch(`/api/cities?type=${type}`);
  const allCities = await citiesResponse.json();

  let url = `/api/events?type=${type}`;
  if (selectedCity) url += `&city=${encodeURIComponent(selectedCity)}`;
  const eventosResponse = await fetch(url);
  const eventos = await eventosResponse.json();

  const sel = document.getElementById('cidade');
  sel.innerHTML = `<option value="">Todas as cidades</option>` +
    allCities.map(c => `<option value="${c}" ${c === selectedCity ? 'selected' : ''}>${c}</option>`).join('');

  sel.onchange = () => {
    const city = sel.value;
    location.search = city ? `?city=${encodeURIComponent(city)}` : '';
  };

  const container = document.querySelector('.cards');
  container.innerHTML = eventos.map(evt => `
    <div id="card">
      <p>Cidade: ${evt.city}</p>
      <p>Evento: ${evt.title}</p>
      <p>Data: ${evt.date ? new Date(evt.date).toLocaleDateString('pt-BR') : '-'}</p>
      <p>Local: ${evt.location}</p>
      <p>Descrição: ${evt.description}</p>
    </div>
  `).join('');
});
