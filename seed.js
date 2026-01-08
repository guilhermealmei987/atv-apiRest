const conectarBanco = require('./database');

async function popular() {
  const db = await conectarBanco();

  const produtos = [
    ['Monitor', 899.90, 10],
    ['Mouse', 120.50, 50],
    ['Teclado', 350.00, 15],
    ['Headset', 280.00, 20],
    ['Cadeira', 1200.00, 5],
    ['Mesa', 750.00, 7],
    ['Webcam', 230.00, 12],
    ['Placa Gráfica', 2500.00, 3],
    ['Processador', 1800.00, 4],
    ['Memória RAM', 450.00, 25]
  ];

  console.log("Inserindo produtos...");

  for (const p of produtos) {
    await db.run(
      'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
      p
    );
  }

  console.log("✅ Banco populado com sucesso!");
  process.exit();
}

popular();