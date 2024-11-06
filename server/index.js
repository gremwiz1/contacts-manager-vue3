const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let contacts = [
  { id: "1", name: "Иван Иванов", phone: "123-456-7890", email: "ivan@example.com" },
  { id: "2", name: "Петр Петров", phone: "987-654-3210", email: "petr@example.com" },
];

// Получение всех контактов
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Добавление нового контакта
app.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;

  // Проверка на заполненность полей
  if (!name || !phone || !email) {
    return res.status(400).json({ message: "Все поля обязательны для заполнения." });
  }

  const newContact = { id: String(Date.now()), name, phone, email };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Обновление контакта
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.map(contact => contact.id === id ? { ...contact, ...req.body } : contact);
  res.json({ message: 'Контакт обновлён' });
});

// Удаление контакта
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(contact => contact.id !== id);
  res.json({ message: 'Контакт удалён' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
