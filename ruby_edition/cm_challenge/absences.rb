require 'icalendar'
require_relative './api'

module CmChallenge
  class Absences
    def to_ical(absences)
      cal = Icalendar::Calendar.new

      absences.map do |absence|
        cal.event do |e|
          e.dtstart     = DateTime.parse(absence[:start_date] + 'T00:00:00')
          e.dtend       = DateTime.parse(absence[:end_date] + 'T23:59:59')
          e.summary     = "#{absence[:member][:name]} is #{get_reason(absence[:type])}"
          e.description = absence[:member_note]
        end
      end

      cal.to_ical
    end

    def get_reason(type)
      case type
      when 'sickness'
        'sick'
      when 'vacation'
        'on vacation'
      else
        'absent'
      end
    end
  end
end
