import fs from 'fs';
import path from 'path';
import moment from 'moment';
import ical from 'ical-generator';

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, 'json_files', 'members.json');

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
  .then((data) => JSON.parse(data))
  .then((data) => data.payload);

const filterAbsences = (absences, userId = null, startDate = null, endDate = null) => new Promise((resolve) => {
  resolve(absences.filter((absence) => {
    if (userId && absence.userId != userId) {
      return false;
    }

    if (startDate && moment(absence.startDate).isBefore(startDate)) {
      return false;
    }

    if (endDate && moment(absence.endDate).isAfter(endDate)) {
      return false;
    }

    return true;
  }));
});

export const getReason = (type) => {
  const reasons = {
    'sickness': 'sick',
    'vacation': 'on vacation',
    'default': 'absent'
  };
  return reasons[type] || reasons['default'];
};

export const absences = (userId = null, startDate = null, endDate = null) => {
  return readJsonFile(ABSENCES_PATH).then((absences) => {
    return readJsonFile(MEMBERS_PATH).then((members) => {
      return filterAbsences(absences, userId, startDate, endDate).then((absences) => {
        return absences.map((absence) => {
          absence.member = members.find(member => member.userId == absence.userId);
          absence.reason = getReason(absence.type);
          return absence;
        });
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
};

export const absencesAsIcal = (absences) => {
  const cal = ical();

  absences.map(function(absence) {
      cal.createEvent({
          start: moment(absence.startDate).utc().startOf('day'),
          end: moment(absence.endDate).utc().endOf('day'),
          summary: absence.member.name + ' is ' + absence.reason,
          description: absence.memberNote,
          floating: true
      });
  });

  return cal;
};

export const members = () => readJsonFile(MEMBERS_PATH);
