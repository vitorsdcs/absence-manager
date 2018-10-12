import assert from 'assert';
import moment from 'moment';
import { absences, absencesAsIcal, getReason } from './api.js';

var inputs = new Map();
inputs.set('with no filter', absences());
inputs.set('with filter by user', absences(649));
inputs.set('with filter by date', absences(null, '2017-01-01', '2017-02-01'));

for (let [key, input] of inputs) {
  input.then((absences) => {
    describe('should export calendar with the same JSON data', () => {
      describe(key, () => {
        const result = absencesAsIcal(absences).toString();
        const matches = (result.match(/BEGIN:VEVENT/g) || []).length
        it('# of events', () => assert.equal(matches, absences.length));
        const event = absences[0].member.name + ' is ' + absences[0].reason;
        it('event name', () => assert(result.includes(event)));
        const startDate = moment(absences[0].startDate).utc().startOf('day').format('YYYYMMDD');
        it('event start date', () => assert(result.includes(startDate)));
        const endDate = moment(absences[0].endDate).utc().endOf('day').format('YYYYMMDD');
        it('event end date', () => assert(result.includes(endDate)));
      });
    })
  });
}

describe('should name absence reasons correctly', () => {
  it('sickness', () => assert.equal('sick', getReason('sickness')));
  it('vacation', () => assert.equal('on vacation', getReason('vacation')));
  it('something else', () => assert.equal('absent', getReason('something else')));
});
