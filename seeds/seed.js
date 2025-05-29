const { sequelize, Event } = require('../models');

async function seed() {
  await sequelize.sync();

  const count = await Event.count();
  if (count > 0) {
    console.log('Banco já populado, nada a fazer.');
    process.exit(0);
  }

  const events = [];

  const tiposCidades = {
    cultura: ['Fortaleza', 'Recife', 'Salvador', 'São Paulo'],
    leilao: ['Recife', 'São Paulo', 'Salvador', 'Fortaleza'],
    show: ['Recife', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
    workshop: ['Recife', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte']
  };

  // Função auxiliar para gerar data entre 1 a 28 de meses entre 5 e 10 de 2025
  function randomDate() {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 6) + 5;
    return `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  // Função auxiliar para gerar horários entre 08:00 e 22:00
  function randomTime() {
    const hour = Math.floor(Math.random() * 15) + 8;
    const minute = Math.random() < 0.5 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  }

  // Gerar títulos e descrições simples por tipo e cidade
  function generateEvent(type, city, index) {
    const baseTitles = {
      cultura: ['Exposição de Arte', 'Festival Cultural', 'Mostra de Cinema', 'Concerto ao Ar Livre', 'Feira de Artesanato'],
      leilao: ['Leilão de Antiguidades', 'Leilão de Pinturas', 'Leilão de Joias', 'Leilão de Móveis', 'Leilão de Colecionáveis'],
      show: ['Show de Banda', 'Concerto Acústico', 'Festival de Música', 'Show Internacional', 'Apresentação Local'],
      workshop: ['Workshop de Fotografia', 'Workshop de Dança', 'Workshop de Marketing', 'Workshop de Gastronomia', 'Workshop de Tecnologia']
    };

    const baseDescriptions = {
      cultura: 'Evento cultural imperdível em',
      leilao: 'Leilão especial com peças únicas em',
      show: 'Apresentação musical no palco de',
      workshop: 'Aprenda e desenvolva habilidades em',
    };

    const titleIndex = index % baseTitles[type].length;
    return {
      city,
      title: `${baseTitles[type][titleIndex]} #${index + 1} - ${city}`,
      date: type === 'show' ? null : randomDate(),
      time: type === 'show' ? randomTime() : null,
      location: `${city} Centro Cultural`,
      description: `${baseDescriptions[type]} ${city}. Evento número ${index + 1}.`,
      type
    };
  }

  // Criar 20 eventos para cada tipo, 5 eventos para cada uma das 4 cidades
  for (const [type, cities] of Object.entries(tiposCidades)) {
    for (let i = 0; i < 20; i++) {
      const city = cities[Math.floor(i / 5)]; // 5 eventos por cidade
      events.push(generateEvent(type, city, i));
    }
  }

  await Event.bulkCreate(events);

  console.log('Seed concluído com 60 eventos!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
