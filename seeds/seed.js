const { sequelize, Event } = require('../models');

async function seed() {
  await sequelize.sync();

  // Limpa todos os eventos antes de inserir novos dados
  await Event.destroy({ where: {} });

  const events = [
    // SHOWS
    { city: 'São Paulo', title: 'Show - Coldplay', date: '2025-09-10', time: '21:00', location: 'Allianz Parque', description: 'A banda britânica Coldplay retorna ao Brasil com sua turnê mundial. Imperdível!', type: 'show' },
    { city: 'Rio de Janeiro', title: 'Show - Ivete Sangalo', date: '2025-08-15', time: '20:00', location: 'Maracanã', description: 'Ivete Sangalo em um show especial com convidados. Energia e alegria garantidas!', type: 'show' },
    { city: 'Recife', title: 'Show - Alceu Valença', date: '2025-07-20', time: '19:30', location: 'Classic Hall', description: 'Alceu Valença apresenta seus maiores sucessos em Recife.', type: 'show' },
    { city: 'Belo Horizonte', title: 'Show - Skank', date: '2025-10-05', time: '18:00', location: 'Mineirão', description: 'Skank faz show de despedida em BH. Não perca!', type: 'show' },
    { city: 'Salvador', title: 'Show - BaianaSystem', date: '2025-11-12', time: '22:00', location: 'Arena Fonte Nova', description: 'BaianaSystem agita Salvador com seu som único.', type: 'show' },
    { city: 'Fortaleza', title: 'Show - Wesley Safadão', date: '2025-12-01', time: '21:30', location: 'Centro de Eventos do Ceará', description: 'Wesley Safadão traz o melhor do forró para Fortaleza.', type: 'show' },
    { city: 'Porto Alegre', title: 'Show - Anitta', date: '2025-10-20', time: '20:30', location: 'Arena do Grêmio', description: 'Anitta apresenta seus hits em Porto Alegre.', type: 'show' },
    { city: 'Brasília', title: 'Show - Legião Urbana Cover', date: '2025-09-25', time: '19:00', location: 'Estádio Mané Garrincha', description: 'Tributo à Legião Urbana com grandes clássicos.', type: 'show' },
    { city: 'Curitiba', title: 'Show - Sandy & Junior', date: '2025-08-30', time: '21:00', location: 'Pedreira Paulo Leminski', description: 'Sandy & Junior em turnê comemorativa.', type: 'show' },
    { city: 'Manaus', title: 'Show - Jorge & Mateus', date: '2025-07-18', time: '20:00', location: 'Sambódromo de Manaus', description: 'Dupla sertaneja Jorge & Mateus em Manaus.', type: 'show' },

    // WORKSHOPS
    { city: 'São Paulo', title: 'Workshop de Fotografia com Araquém Alcântara', date: '2025-06-12', time: '09:00', location: 'MIS - Museu da Imagem e do Som', description: 'Aprenda técnicas de fotografia com um dos maiores fotógrafos do Brasil.', type: 'workshop' },
    { city: 'Recife', title: 'Workshop de Gastronomia Nordestina', date: '2025-07-03', time: '14:00', location: 'Senac Recife', description: 'Descubra os segredos da culinária nordestina com chefs renomados.', type: 'workshop' },
    { city: 'Rio de Janeiro', title: 'Workshop de Dança com Carlinhos de Jesus', date: '2025-08-22', time: '16:00', location: 'Teatro Municipal', description: 'Aulas práticas de samba e dança de salão com Carlinhos de Jesus.', type: 'workshop' },
    { city: 'Belo Horizonte', title: 'Workshop de Programação Web', date: '2025-09-18', time: '10:00', location: 'PUC Minas', description: 'Aprenda a criar sites modernos com HTML, CSS e JavaScript.', type: 'workshop' },
    { city: 'Salvador', title: 'Workshop de Maquiagem Profissional', date: '2025-10-10', time: '13:00', location: 'Senac Salvador', description: 'Técnicas de maquiagem com profissionais renomados.', type: 'workshop' },
    { city: 'Fortaleza', title: 'Workshop de Empreendedorismo Digital', date: '2025-11-05', time: '15:00', location: 'SEBRAE Fortaleza', description: 'Dicas e estratégias para empreender online.', type: 'workshop' },
    { city: 'Porto Alegre', title: 'Workshop de Cerveja Artesanal', date: '2025-12-02', time: '18:00', location: 'Cervejaria POA', description: 'Aprenda a produzir cerveja artesanal em casa.', type: 'workshop' },
    { city: 'Brasília', title: 'Workshop de Oratória', date: '2025-09-28', time: '09:30', location: 'Centro de Convenções Ulysses Guimarães', description: 'Desenvolva habilidades de comunicação e oratória.', type: 'workshop' },
    { city: 'Curitiba', title: 'Workshop de Design Gráfico', date: '2025-08-18', time: '11:00', location: 'UTFPR', description: 'Ferramentas e técnicas de design gráfico.', type: 'workshop' },
    { city: 'Manaus', title: 'Workshop de Sustentabilidade', date: '2025-07-22', time: '14:30', location: 'Sesi Manaus', description: 'Práticas sustentáveis para o dia a dia.', type: 'workshop' },

    // LEILÕES
    { city: 'São Paulo', title: 'Leilão de Arte Moderna', date: '2025-06-25', time: '19:00', location: 'Casa de Leilões São Paulo', description: 'Obras de artistas renomados como Tarsila do Amaral e Di Cavalcanti.', type: 'leilao' },
    { city: 'Recife', title: 'Leilão de Antiguidades', date: '2025-07-10', time: '18:00', location: 'Leilões Recife', description: 'Peças raras e históricas do Brasil colonial.', type: 'leilao' },
    { city: 'Salvador', title: 'Leilão de Joias e Relógios', date: '2025-08-05', time: '20:00', location: 'Leilões Bahia', description: 'Joias exclusivas e relógios de luxo em destaque.', type: 'leilao' },
    { city: 'Fortaleza', title: 'Leilão de Automóveis Clássicos', date: '2025-09-12', time: '17:00', location: 'Centro de Eventos do Ceará', description: 'Carros clássicos nacionais e importados para colecionadores.', type: 'leilao' },
    { city: 'Porto Alegre', title: 'Leilão de Vinhos Raros', date: '2025-10-18', time: '20:00', location: 'Leilões POA', description: 'Vinhos raros e colecionáveis de várias regiões.', type: 'leilao' },
    { city: 'Brasília', title: 'Leilão de Imóveis', date: '2025-11-08', time: '15:00', location: 'Leilões DF', description: 'Oportunidades em imóveis residenciais e comerciais.', type: 'leilao' },
    { city: 'Curitiba', title: 'Leilão de Obras de Arte', date: '2025-12-15', time: '19:30', location: 'Museu Oscar Niemeyer', description: 'Pinturas e esculturas de artistas paranaenses.', type: 'leilao' },
    { city: 'Manaus', title: 'Leilão de Barcos e Lanchas', date: '2025-09-30', time: '16:00', location: 'Porto de Manaus', description: 'Embarcações para lazer e trabalho.', type: 'leilao' },
    { city: 'Belo Horizonte', title: 'Leilão de Móveis Antigos', date: '2025-08-22', time: '18:30', location: 'Leilões BH', description: 'Móveis antigos e restaurados.', type: 'leilao' },
    { city: 'Natal', title: 'Leilão de Colecionáveis', date: '2025-07-29', time: '17:00', location: 'Leilões Natal', description: 'Itens raros para colecionadores.', type: 'leilao' },

    // CULTURAIS
    { city: 'São Paulo', title: 'Bienal Internacional do Livro', date: '2025-08-20', time: '10:00', location: 'Expo Center Norte', description: 'O maior evento literário do Brasil, com autores nacionais e internacionais.', type: 'cultura' },
    { city: 'Recife', title: 'Carnaval do Recife', date: '2025-02-28', time: '12:00', location: 'Marco Zero', description: 'O tradicional carnaval multicultural do Recife, com blocos e shows gratuitos.', type: 'cultura' },
    { city: 'Salvador', title: 'Festival da Primavera', date: '2025-09-21', time: '15:00', location: 'Parque da Cidade', description: 'Música, arte e gastronomia celebrando a chegada da primavera.', type: 'cultura' },
    { city: 'Fortaleza', title: 'Mostra de Cinema Brasileiro', date: '2025-10-10', time: '19:00', location: 'Dragão do Mar', description: 'Exibição de filmes nacionais e debates com diretores.', type: 'cultura' },
    { city: 'Porto Alegre', title: 'Festival de Jazz', date: '2025-11-14', time: '20:00', location: 'Usina do Gasômetro', description: 'Grandes nomes do jazz nacional e internacional.', type: 'cultura' },
    { city: 'Brasília', title: 'Semana de Arte Moderna', date: '2025-12-03', time: '09:00', location: 'Museu Nacional', description: 'Exposições e palestras sobre arte moderna.', type: 'cultura' },
    { city: 'Curitiba', title: 'Festival de Teatro', date: '2025-08-25', time: '18:00', location: 'Teatro Guaíra', description: 'Peças teatrais de grupos do Brasil inteiro.', type: 'cultura' },
    { city: 'Manaus', title: 'Festival Folclórico de Parintins', date: '2025-06-28', time: '16:00', location: 'Bumbódromo', description: 'O maior festival folclórico da Amazônia.', type: 'cultura' },
    { city: 'Belo Horizonte', title: 'Virada Cultural', date: '2025-09-12', time: '20:00', location: 'Praça da Estação', description: '24h de cultura, música e arte.', type: 'cultura' },
    { city: 'Natal', title: 'Festival Literário de Natal', date: '2025-07-19', time: '11:00', location: 'Centro de Convenções', description: 'Autores, debates e lançamentos de livros.', type: 'cultura' }
  ];

  await Event.bulkCreate(events);

  console.log('Seed concluído com 10 eventos reais para cada tipo!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
