require 'sinatra'
require 'sinatra/reloader'
require_relative './cm_challenge/api'
require_relative './cm_challenge/absences'

get '/' do
    user_id = params[:userId]
    start_date = params[:startDate]
    end_date = params[:endDate]

    content_type 'text/calendar'
    attachment 'absences.ics'
    absences = CmChallenge::Absences.new
    absences.to_ical(CmChallenge::Api.absences_with_members(user_id, start_date, end_date))
end
