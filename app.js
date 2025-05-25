// app.js
const path      = require('path');
const express   = require('express');
const { sequelize, Event } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// view engine & pasta de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// arquivos estáticos (css, js, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mapeamento de rota → tipo do evento no DB
const TYPE_MAP = {
  cultura:   'cultura',
  leiloes:   'leilao',
  shows:     'show',
  workshops: 'workshop'
};

// rota genérica para os 4 tipos
app.get('/:section', async (req, res, next) => {
  try {
    const section    = req.params.section;
    const eventType  = TYPE_MAP[section];

    // se vier algo que não está no TYPE_MAP, devolve 404
    if (!eventType) {
      return res.status(404).send('Página não encontrada');
    }

    const selectedCity = req.query.city || '';

    // 1) lista de cidades distintas
    const citiesRaw = await Event.findAll({
      where: { type: eventType },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('city')), 'city']
      ]
    });
    const cidades = citiesRaw.map(r => r.get('city'));

    // 2) montar cláusula WHERE
    const where = { type: eventType };
    if (selectedCity) where.city = selectedCity;

    // 3) buscar eventos (ordena por date ou time)
    const order = section === 'shows' ? [['time','ASC']] : [['date','ASC']];
    const eventos = await Event.findAll({ where, order });

    // 4) renderizar
    return res.render(`${section}/index`, {
      eventos,
      cidades,
      selectedCity
    });
  } catch (err) {
    next(err);
  }
});


// raiz redireciona para /cultura
app.get('/', (req, res) => res.render('index'));

// error handler simples
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro no servidor');
});

// sync + start
sequelize.sync()
  .then(() => {
    console.log('DB sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor em http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
