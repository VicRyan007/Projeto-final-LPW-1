class EventManager {
    constructor() {
        this.type = this.getEventType();
        this.citySelect = document.getElementById('city');
        this.eventCards = document.getElementById('eventCards');
        this.currentCity = '';
        this.events = [];
        
        this.init();
    }

    getEventType() {
        const path = window.location.pathname;
        if (path.includes('shows')) return 'show';
        if (path.includes('workshops')) return 'workshop';
        if (path.includes('leiloes')) return 'leilao';
        if (path.includes('cultura')) return 'cultura';
        return '';
    }

    async init() {
        try {
            await this.loadCities();
            this.setupEventListeners();
            await this.loadEvents();
        } catch (error) {
            this.showError('Erro ao inicializar a página. Por favor, tente novamente.');
            console.error('Erro na inicialização:', error);
        }
    }

    setupEventListeners() {
        this.citySelect.addEventListener('change', () => {
            this.currentCity = this.citySelect.value;
            this.loadEvents();
        });
    }

    async loadCities() {
        try {
            const response = await fetch(`/api/cities?type=${this.type}`);
            if (!response.ok) throw new Error('Erro ao carregar cidades');
            
            const cities = await response.json();
            this.populateCitySelect(cities);
        } catch (error) {
            this.showError('Erro ao carregar lista de cidades');
            console.error('Erro ao carregar cidades:', error);
        }
    }

    populateCitySelect(cities) {
        this.citySelect.innerHTML = '<option value="">Todas as cidades</option>';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            this.citySelect.appendChild(option);
        });
    }

    async loadEvents() {
        try {
            this.showLoading();
            const url = `/api/events?type=${this.type}${this.currentCity ? `&city=${this.currentCity}` : ''}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Erro ao carregar eventos');
            
            this.events = await response.json();
            this.renderEvents();
        } catch (error) {
            this.showError('Erro ao carregar eventos');
            console.error('Erro ao carregar eventos:', error);
        } finally {
            this.hideLoading();
        }
    }

    renderEvents() {
        if (!this.events.length) {
            this.eventCards.innerHTML = '<p class="no-events">Nenhum evento encontrado</p>';
            return;
        }

        this.eventCards.innerHTML = this.events.map(event => this.createEventCard(event)).join('');
    }

    createEventCard(event) {
        const date = new Date(event.date);
        const formattedDate = isNaN(date) ? '' : date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const time = event.time && /^\d{2}:\d{2}$/.test(event.time) ? event.time : '';

        let descricao = event.description.replace(/Evento número \d+\./, '').trim();

        return `
            <article class="event-card">
                <div class="event-card-content">
                    <h3 class="event-card-title">${event.title}</h3>
                    <div class="event-card-info">
                        <i class="fas fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                    ${time ? `
                        <div class="event-card-info">
                            <i class="fas fa-clock"></i>
                            <span>${time}</span>
                        </div>
                    ` : ''}
                    <div class="event-card-info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.city}</span>
                    </div>
                    <p class="event-card-description">${descricao}</p>
                </div>
            </article>
        `;
    }

    showLoading() {
        this.eventCards.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando eventos...</p>
            </div>
        `;
    }

    hideLoading() {
        const loading = this.eventCards.querySelector('.loading');
        if (loading) loading.remove();
    }

    showError(message) {
        this.eventCards.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EventManager();
});
