const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function conectarBanco() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Criando a tabela de produtos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER DEFAULT 0
    )
  `);

  return db;
}

module.exports = conectarBanco;