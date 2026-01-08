const express = require('express');
const conectarBanco = require('./database');

const app = express();
app.use(express.json());

let db;

conectarBanco().then((database) => {
  db = database;
  console.log('Banco de dados pronto.');
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
});

// Rota para listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await db.all('SELECT * FROM produtos');
  res.json(produtos);
});


  // GET http://localhost:3000/produtos/1
app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const produto = await db.get('SELECT * FROM produtos WHERE id = ?', [id]);

  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  res.json(produto);
});

// GET http://localhost:3000/produtos/busca/nome?q=teclado
app.get('/produtos/busca/nome', async (req, res) => {
  const { q } = req.query; // 'q' é o termo de busca
  const produtos = await db.all(
    'SELECT * FROM produtos WHERE nome LIKE ?',
    [`%${q}%`]
  );
  res.json(produtos);
});

// GET http://localhost:3000/produtos/filtro/preco?max=150
app.get('/produtos/filtro/preco', async (req, res) => {
  const { max } = req.query;
  const produtos = await db.all(
    'SELECT * FROM produtos WHERE preco <= ? ORDER BY preco ASC',
    [max]
  );
  res.json(produtos);
});
