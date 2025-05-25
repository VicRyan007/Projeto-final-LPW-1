
const path      = require('path');
const express   = require('express');
const { sequelize, Event } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const TYPE_MAP = {
  cultura:   'cultura',
  leiloes:   'leilao',
  shows:     'show',
  workshops: 'workshop'
};


app.get('/:section', async (req, res, next) => {
  try {
    const section    = req.params.section;
    const eventType  = TYPE_MAP[section];

    
    if (!eventType) {
      return res.status(404).send('Página não encontrada');
    }

    const selectedCity = req.query.city || '';

    
    const citiesRaw = await Event.findAll({
      where: { type: eventType },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('city')), 'city']
      ]
    });
    const cidades = citiesRaw.map(r => r.get('city'));

    
    const where = { type: eventType };
    if (selectedCity) where.city = selectedCity;

    
    const order = section === 'shows' ? [['time','ASC']] : [['date','ASC']];
    const eventos = await Event.findAll({ where, order });

    
    return res.render(`${section}/index`, {
      eventos,
      cidades,
      selectedCity
    });
  } catch (err) {
    next(err);
  }
});



app.get('/', (req, res) => res.render('index'));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro no servidor');
});


sequelize.sync()
  .then(() => {
    console.log('DB sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor em http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
