# Absence Manager

Absence Manager is an application that gives you the ability to export employees absences to outlook.

# Installation

### Javascript

1. Install node (v6.5.0 or higher)
2. `npm i`

### Ruby

1. Install Ruby
2. `gem install bundler`
3. `bundle install`

# Running

### Javascript

```
npm run babel
```

### Ruby

```
ruby main.rb -p 3000
```

# Usage

Both application will listen at localhost port 3000. The available actions are:

`GET http://localhost:3000`
(iCal file download)

`GET http://localhost:3000?userId=123`
(iCal file download, filtered by employee)

`GET http://localhost:3000?startDate=2017-01-01&endDate=2017-02-01`
(iCal file download, filtered by date range)

# Testing

### Javascript

```
npm run test
```

### Ruby

```
bundle exec rspec
```