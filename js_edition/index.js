const express = require('express');
const app = express();

import { absences } from './src/api.js';

app.get('/', function (req, res) {
    const userId = parseInt(req.query.userId) || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    absences(userId, startDate, endDate).then((absences) => {
        res.send(absences);
    });
});

app.listen(3000);