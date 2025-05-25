// seeds/seed.js
const { sequelize, Event } = require('../models');  // <- correção aqui

async function seed() {
  // 1) garante que as tabelas existem
  await sequelize.sync();

  // 2) conta quantos eventos já há
  const count = await Event.count();
  if (count > 0) {
    console.log('Banco já populado, nada a fazer.');
    process.exit(0);
  }

  // 3) dados de seed, adaptados dos seus HTML estáticos
  await Event.bulkCreate([
    // ——— Cultura ———
    {
      city: 'Fortaleza',
      title: 'Exposição de Fotografia "Retratos da Cidade"',
      date: '2025-08-05',
      time: null,
      location: 'Centro Cultural',
      description: 'Uma mostra fotográfica que retrata a vida e a cultura da cidade em diversos momentos.',
      type: 'cultura'
    },
    {
      city: 'Fortaleza',
      title: 'Concerto de Música Tradicional Nordestina',
      date: '2025-07-12',
      time: null,
      location: 'Praça Cultural',
      description: 'Uma noite de música regional com artistas locais, celebrando a tradição nordestina.',
      type: 'cultura'
    },

    // ——— Leilões ———
    {
      city: 'Recife',
      title: 'Leilão de Arte Clássica',
      date: '2025-05-20',
      time: null,
      location: 'Casa de Leilões Recife',
      description: 'Um leilão exclusivo de obras de arte clássica, incluindo pinturas renomadas.',
      type: 'leilao'
    },
    {
      city: 'São Paulo',
      title: 'Leilão de Joias Raras',
      date: '2025-06-06',
      time: null,
      location: 'Galeria Joias SP',
      description: 'Um leilão de joias finas e raras, com peças selecionadas de alta qualidade.',
      type: 'leilao'
    },
    {
      city: 'Salvador',
      title: 'Leilão de Móveis Antigos',
      date: '2025-09-25',
      time: null,
      location: 'Casa de Leilões Salvador',
      description: 'Um leilão de móveis antigos e de época, incluindo peças de valor histórico e colecionável.',
      type: 'leilao'
    },
    {
      city: 'Fortaleza',
      title: 'Leilão de Relíquias Históricas',
      date: '2025-10-12',
      time: null,
      location: 'Salão Nobre Fortaleza',
      description: 'Um leilão de relíquias históricas, incluindo artefatos culturais e objetos raros.',
      type: 'leilao'
    },

    // ——— Shows ———
    {
      city: 'Recife',
      title: 'Lagum',
      date: null,
      time: '20:00',
      location: 'Marco Zero',
      description: 'Um show incrível, repleto de uma harmonia sem igual. Venha e aproveite.',
      type: 'show'
    },
    {
      city: 'São Paulo',
      title: 'Anavitória',
      date: null,
      time: '19:30',
      location: 'Espaço das Américas',
      description: 'Um espetáculo emocionante, com músicas que tocam o coração. Não perca!',
      type: 'show'
    },
    {
      city: 'Rio de Janeiro',
      title: 'Maroon 5',
      date: null,
      time: '21:00',
      location: 'Estádio do Maracanã',
      description: 'Apresentação da banda internacional Maroon 5 no Maracanã. Garanta seu ingresso!',
      type: 'show'
    },
    {
      city: 'Belo Horizonte',
      title: 'Ivete Sangalo',
      date: null,
      time: '18:30',
      location: 'Mineirão',
      description: 'Um espetáculo de energia e alegria com a rainha do axé. Não perca!',
      type: 'show'
    },
    {
      city: 'Salvador',
      title: 'O Rappa',
      date: null,
      time: '19:00',
      location: 'Arena Fonte Nova',
      description: 'Uma apresentação única com sucessos marcantes da banda. Garanta seu ingresso!',
      type: 'show'
    },
    {
      city: 'Fortaleza',
      title: 'Jorge & Mateus',
      date: null,
      time: '21:00',
      location: 'Centro de Eventos',
      description: 'Uma noite de música sertaneja para animar seu fim de semana. Venha se divertir!',
      type: 'show'
    },

    // ——— Workshops ———
    {
      city: 'Recife',
      title: 'Workshop de Fotografia',
      date: '2025-05-20',
      time: null,
      location: 'Escola de Fotografia Recife',
      description: 'Um workshop intensivo de fotografia, abordando técnicas avançadas e práticas de edição.',
      type: 'workshop'
    },
    {
      city: 'São Paulo',
      title: 'Workshop de Marketing Digital',
      date: '2025-06-05',
      time: null,
      location: 'Centro de Convenções SP',
      description: 'Um workshop sobre estratégias de marketing digital, incluindo redes sociais e SEO.',
      type: 'workshop'
    },
    {
      city: 'Rio de Janeiro',
      title: 'Workshop de Design de Interiores',
      date: '2025-07-15',
      time: null,
      location: 'Estúdio de Design RJ',
      description: 'Um workshop de design de interiores, com dicas de decoração e planejamento de ambientes.',
      type: 'workshop'
    },
    {
      city: 'Belo Horizonte',
      title: 'Workshop de Gastronomia',
      date: '2025-08-10',
      time: null,
      location: 'Escola de Culinária BH',
      description: 'Um workshop de gastronomia, com aulas práticas de preparo de pratos gourmet e técnicas culinárias.',
      type: 'workshop'
    },
    {
      city: 'Salvador',
      title: 'Workshop de Dança Contemporânea',
      date: '2025-09-25',
      time: null,
      location: 'Estúdio de Dança Salvador',
      description: 'Um workshop de dança contemporânea, explorando movimentos e expressões artísticas.',
      type: 'workshop'
    },
    {
      city: 'Fortaleza',
      title: 'Workshop de Desenvolvimento Pessoal',
      date: '2025-10-12',
      time: null,
      location: 'Espaço de Coaching Fortaleza',
      description: 'Um workshop de desenvolvimento pessoal, com foco em autoconhecimento e habilidades de liderança.',
      type: 'workshop'
    }
  ]);

  console.log('Seed concluído com sucesso!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
