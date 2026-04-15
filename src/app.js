const express = require('express');

const app = express();
app.use(express.json());

const items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const item = { id: items.length + 1, name };
  items.push(item);
  res.status(201).json(item);
});

module.exports = app;
