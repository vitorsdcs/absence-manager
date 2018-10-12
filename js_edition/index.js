const express = require('express');
const app = express();

import { absences, absencesAsIcal } from './src/api.js';

app.get('/', function (req, res) {
    const userId = parseInt(req.query.userId) || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    absences(userId, startDate, endDate).then((absences) => absencesAsIcal(absences).serve(res))
});

app.listen(3000);