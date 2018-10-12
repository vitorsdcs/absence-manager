const express = require('express');
const app = express();
const ical = require('ical-generator');

import { absences } from './src/api.js';
import moment from 'moment'

app.get('/', function (req, res) {
    const cal = ical({name: 'absences'});
    const userId = parseInt(req.query.userId) || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    absences(userId, startDate, endDate).then(function(absences) {
        absences.map(function(absence) {
            cal.createEvent({
                start: moment(absence.startDate).utc().startOf('day'),
                end: moment(absence.endDate).utc().endOf('day'),
                summary: absence.member.name + ' is ' + absence.reason,
                description: absence.memberNote,
                floating: true
            });
        });

        cal.serve(res);
    });
});

app.listen(3000);