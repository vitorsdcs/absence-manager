require 'sinatra'
require 'sinatra/reloader'
require_relative './cm_challenge/api'

get '/' do
    user_id = params[:userId]
    start_date = params[:startDate]
    end_date = params[:endDate]

    p CmChallenge::Api.absences_with_members(user_id, start_date, end_date).to_json
end
