require_relative '../cm_challenge/absences'

RSpec.describe 'Absences' do
  describe '#absences' do
    absences = CmChallenge::Absences.new

    inputs = [
      CmChallenge::Api.absences_with_members(),
      CmChallenge::Api.absences_with_members(649),
      CmChallenge::Api.absences_with_members(nil, '2017-01-01', '2017-02-01')
    ];

    inputs.each do |input|
      result = absences.to_ical(input).to_s
      # Test if we have the same amount of events in the calendar as we have in the input JSON
      it { expect(result.scan('BEGIN:VEVENT').length).to be(input.length) }

      input.each do |absence|
        event = "#{absence[:member][:name]} is #{absences.get_reason(absence[:type])}"
        start_date = absence[:start_date].tr('-', '')
        end_date = absence[:end_date].tr('-', '')

        # Test if the data in the calendar is the same as in the input JSON
        it { expect(result).to include(event) }
        it { expect(result).to include(start_date) }
        it { expect(result).to include(end_date) }
      end
    end

    # Test if we're naming the absence reasons properly
    it { expect(absences.get_reason('sickness')).to eq('sick') }
    it { expect(absences.get_reason('vacation')).to eq('on vacation') }
    it { expect(absences.get_reason('something else')).to eq('absent') }
  end
end
