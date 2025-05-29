const path = require('path');
const express = require('express');
const { sequelize, Event } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/api/cities', async (req, res, next) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ error: 'Parâmetro "type" é obrigatório' });
    }

    const citiesRaw = await Event.findAll({
      where: { type },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('city')), 'city']
      ]
    });

    const cidades = citiesRaw.map(r => r.get('city'));
    res.json(cidades);
  } catch (err) {
    next(err);
  }
});

app.get('/api/events', async (req, res, next) => {
  try {
    const { type, city } = req.query;

    if (!type) {
      return res.status(400).json({ error: 'Parâmetro "type" é obrigatório' });
    }

    const where = { type };
    if (city) where.city = city;

    const order = type === 'show' ? [['time', 'ASC']] : [['date', 'ASC']];
    const eventos = await Event.findAll({ where, order });

    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).send('Erro interno no servidor');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar DB:', err);
});
