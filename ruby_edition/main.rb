require 'sinatra'
require 'sinatra/reloader'
require_relative './cm_challenge/api'

get '/' do
    p CmChallenge::Api.absences_with_members().to_json
end
