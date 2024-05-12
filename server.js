const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Убедитесь, что путь к модели правильный

const app = express();
const port = 5000;

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Подключаемся к MongoDB
mongoose.connect('')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err)); // Логирование ошибки подключения к MongoDB

app.use(bodyParser.json());

// Обработчик для POST запроса на добавление книги
app.post('/addBook', async (req, res) => {
  try {
    const existingBook = await Book.findOne({ id: req.body.id });

    if (existingBook) {
      return res.status(400).send(`Книга с ID ${req.body.id} уже существует.`);
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).send(`Книга с ID ${req.body.id} успешно добавлена.`);
  } catch (error) {
    console.error('Произошла ошибка при добавлении книги:', error); // Логирование ошибки добавления книги
    res.status(500).send('Ошибка при добавлении книги');
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
