const express = require('express');
const Weight = require('./models/weights');

const app = express();

app.get('/weights', async (req, res) => {
    const weights = await Weight.findAll({ order: ['date'] });

    res.json({ weights });
});

app.post('/weights', express.json(), async (req, res) => {
    try {
        const date = new Date(req.body.date);
        const diff = date.getTime() - Date.now();
        if (diff > /* 5 minutes */ 5 * 60 * 1000) {
            res.status(403).json({ message: 'Date must be in the past' });
            return;
        }

        await Weight.create(req.body);

        res.json({ message: 'OK' });
    } catch(error) {
        res.status(403).json({ error: error.errors[0].message });
    }
});

app.listen(3000);
