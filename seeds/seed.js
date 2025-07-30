const { Event } = require('../models');

async function seed() {
  try {
    await Event.createTable();
    await Event.destroy({ where: {} });

    const cities = [
      'São Paulo', 'Rio de Janeiro', 'Recife', 'Belo Horizonte', 'Salvador', 
      'Fortaleza', 'Porto Alegre', 'Brasília', 'Curitiba', 'Manaus', 'Natal'
    ];

    const events = [];

    // Shows - 6 por cidade
    cities.forEach(city => {
      const cityShows = [
        { title: `Show - ${city} Rock Festival`, date: '2025-06-15', time: '20:00', location: `${city} Arena`, description: `Festival de rock com as melhores bandas da região de ${city}.`, type: 'show' },
        { title: `Show - MPB em ${city}`, date: '2025-07-20', time: '21:00', location: `Teatro ${city}`, description: `Noite especial de MPB com artistas locais e nacionais.`, type: 'show' },
        { title: `Show - Sertanejo ${city}`, date: '2025-08-10', time: '22:00', location: `${city} Convention Center`, description: `Os maiores nomes do sertanejo em ${city}.`, type: 'show' },
        { title: `Show - Forró ${city}`, date: '2025-09-05', time: '23:00', location: `${city} Dance Hall`, description: `Noite de forró com as melhores bandas.`, type: 'show' },
        { title: `Show - Jazz ${city}`, date: '2025-10-12', time: '19:30', location: `${city} Jazz Club`, description: `Jazz sofisticado em ambiente intimista.`, type: 'show' },
        { title: `Show - Pop ${city}`, date: '2025-11-18', time: '20:30', location: `${city} Stadium`, description: `Show pop com artistas internacionais.`, type: 'show' }
      ];
      
      cityShows.forEach(show => {
        events.push({ ...show, city });
      });
    });

    // Workshops - 6 por cidade
    cities.forEach(city => {
      const cityWorkshops = [
        { title: `Workshop de Fotografia - ${city}`, date: '2025-06-20', time: '09:00', location: `${city} Photo Studio`, description: `Aprenda técnicas avançadas de fotografia.`, type: 'workshop' },
        { title: `Workshop de Culinária - ${city}`, date: '2025-07-25', time: '14:00', location: `${city} Cooking School`, description: `Receitas tradicionais da região de ${city}.`, type: 'workshop' },
        { title: `Workshop de Dança - ${city}`, date: '2025-08-15', time: '16:00', location: `${city} Dance Academy`, description: `Aulas de dança para todos os níveis.`, type: 'workshop' },
        { title: `Workshop de Tecnologia - ${city}`, date: '2025-09-22', time: '10:00', location: `${city} Tech Hub`, description: `Programação e desenvolvimento web.`, type: 'workshop' },
        { title: `Workshop de Arte - ${city}`, date: '2025-10-08', time: '13:00', location: `${city} Art Gallery`, description: `Pintura e técnicas artísticas.`, type: 'workshop' },
        { title: `Workshop de Negócios - ${city}`, date: '2025-11-30', time: '15:00', location: `${city} Business Center`, description: `Empreendedorismo e gestão de negócios.`, type: 'workshop' }
      ];
      
      cityWorkshops.forEach(workshop => {
        events.push({ ...workshop, city });
      });
    });

    // Leilões - 6 por cidade
    cities.forEach(city => {
      const cityAuctions = [
        { title: `Leilão de Arte - ${city}`, date: '2025-06-28', time: '19:00', location: `${city} Auction House`, description: `Obras de arte de artistas locais e nacionais.`, type: 'leilao' },
        { title: `Leilão de Automóveis - ${city}`, date: '2025-07-30', time: '18:00', location: `${city} Auto Auction`, description: `Carros usados e seminovos em ótimo estado.`, type: 'leilao' },
        { title: `Leilão de Imóveis - ${city}`, date: '2025-08-25', time: '20:00', location: `${city} Real Estate`, description: `Oportunidades em imóveis residenciais.`, type: 'leilao' },
        { title: `Leilão de Joias - ${city}`, date: '2025-09-18', time: '17:00', location: `${city} Jewelry Auction`, description: `Joias exclusivas e relógios de luxo.`, type: 'leilao' },
        { title: `Leilão de Antiguidades - ${city}`, date: '2025-10-15', time: '16:30', location: `${city} Antique Shop`, description: `Peças raras e históricas.`, type: 'leilao' },
        { title: `Leilão de Eletrônicos - ${city}`, date: '2025-11-20', time: '19:30', location: `${city} Tech Auction`, description: `Eletrônicos e gadgets em ótimo estado.`, type: 'leilao' }
      ];
      
      cityAuctions.forEach(auction => {
        events.push({ ...auction, city });
      });
    });

    // Cultura - 6 por cidade
    cities.forEach(city => {
      const cityCulture = [
        { title: `Festival Cultural - ${city}`, date: '2025-06-10', time: '15:00', location: `${city} Cultural Center`, description: `Festival multicultural com música, dança e arte.`, type: 'cultura' },
        { title: `Exposição de Arte - ${city}`, date: '2025-07-12', time: '10:00', location: `${city} Museum`, description: `Exposição de artistas locais e nacionais.`, type: 'cultura' },
        { title: `Teatro - ${city}`, date: '2025-08-08', time: '20:00', location: `${city} Theater`, description: `Peças teatrais de grupos locais.`, type: 'cultura' },
        { title: `Cinema ao Ar Livre - ${city}`, date: '2025-09-14', time: '19:00', location: `${city} Park`, description: `Sessão de cinema ao ar livre.`, type: 'cultura' },
        { title: `Feira de Livros - ${city}`, date: '2025-10-25', time: '11:00', location: `${city} Book Fair`, description: `Feira literária com autores e editoras.`, type: 'cultura' },
        { title: `Festival Gastronômico - ${city}`, date: '2025-11-05', time: '12:00', location: `${city} Food Festival`, description: `Festival de gastronomia local.`, type: 'cultura' }
      ];
      
      cityCulture.forEach(culture => {
        events.push({ ...culture, city });
      });
    });

    await Event.bulkCreate(events);

    console.log(`Seed concluído com ${events.length} eventos (6 por cidade para cada tipo)!`);
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
}

seed();
