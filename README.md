# Управление контактами

Это веб-приложение для управления контактами, разработанное с использованием Vue 3 и Node.js. Приложение позволяет добавлять, редактировать, удалять и искать контакты.

## Установка и запуск

### 1. Клонирование репозитория

Сначала клонируйте репозиторий на ваш локальный компьютер:

```bash
git clone https://github.com/gremwiz1/contacts-manager-vue3.git
cd contact-managemen
```

2. Установка зависимостей сервера
Перейдите в папку сервера и установите необходимые зависимости:

```bash
cd server
npm install
```

3. Запуск сервера
Запустите сервер:

```bash
node index.js
```

4. Установка зависимостей клиента
Перейдите в папку клиента и установите необходимые зависимости:

```bash
cd ../client
npm install
```

5. Запуск приложения на Vue 3
Запустите приложение:

```bash
npm run serve
```

Приложение будет доступно по умолчанию по адресу http://localhost:8080.

## Функциональные возможности

- **Добавление контактов**: Возможность добавлять новые контакты с полями имя, телефон и email.
- **Редактирование контактов**: Возможность редактировать существующие контакты.
- **Удаление контактов**: Возможность удалять контакты.
- **Поиск контактов**: Возможность искать контакты по имени.

## Тестирование

Для запуска тестов выполните следующую команду в папке клиента:

```bash
npm run test
```

## Стек технологий

- **Frontend**: Vue 3, Vue Router, Axios
- **Backend**: Node.js, Express.js
- **Тестирование**: Jest, Vue Test Utils
