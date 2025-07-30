const path = require('path');
const express = require('express');
const { Event } = require('./models');

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

    const cities = await Event.findDistinctCities(type);
    res.json(cities);
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

async function startServer() {
  try {
    await Event.createTable();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao inicializar o servidor:', err);
    process.exit(1);
  }
}

startServer();
