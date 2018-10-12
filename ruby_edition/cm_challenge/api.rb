require 'json'

module CmChallenge
  class Api
    class << self
      def absences
        load_file('absences.json')
      end

      def members
        load_file('members.json')
      end

      def absences_with_members(user_id = nil, start_date = nil, end_date = nil)
        absences = Array.new

        absences().map do |absence|
          if (user_id && absence[:user_id] != user_id.to_i)
            next
          end

          if (start_date && Date::parse(absence[:start_date]) < Date::parse(start_date))
            next
          end

          if (end_date && Date::parse(absence[:end_date]) > Date::parse(end_date))
            next
          end

          absences << absence.merge(:member => members.find { |m| m[:user_id] == absence[:user_id] })
        end

        absences
      end

      private

      def load_file(file_name)
        file = File.join(File.dirname(__FILE__), 'json_files', file_name)
        json = JSON.parse(File.read(file))
        symbolize_collection(json['payload'])
      end

      def symbolize_collection(collection)
        collection.map { |hash| symbolize_hash(hash)}
      end

      def symbolize_hash(hash)
        hash.each_with_object({}) { |(k, v), h| h[k.to_sym] = v; }
      end
    end
  end
end
