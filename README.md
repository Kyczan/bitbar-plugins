# My BitBar Plugins

[BitBar](https://github.com/matryer/bitbar) is a great way to add your own widgets into OSX bar. Only need is to create a script that writes some info into standard output (in NodeJS this is `console.log()`).

This repo contains my set of scripts. Most of them are written in NodeJS and this repo looks like typical npm project.

## Install

First install [BitBar](https://github.com/matryer/bitbar) and make sure that you have NodeJS and git.

Next go to terminal, clone this repo, navigate into it and install dependencies:

```bash
git clone https://github.com/Kyczan/bitbar-plugins.git
cd bitbar-plugins
npm i
```

This command also automatically makes executable (`chmod +x`) scripts that will be used by BitBar (it is required by BitBar).

There is `.env.example` file in the root of this repo. Copy it to `.env` file. Some scripts get data from external services and they require api keys. To get them you need to create accounts in these services. Once obtained api keys should be placed into `.env` file.

Next go to BitBar, select Change Plugin Folder and select `./plugins` folder in this repo.

Then refresh BitBar widgets.

## Widgets

### Airly

Checks quality of air and shows CAQI index (if >50 this means air is bad and you should stay home).

Data is gathered from https://airly.eu/

As mentioned in previous section you need to create account to obtain api key, and select installation id (id of sensor nearest to your home location). Then add them into `.env`:

```bash
AIRLY_API_KEY="yourApiKey"
AIRLY_INSTALLATION_ID="yourInstallationId"
```

### Caffeine

This is bash script. It allows to turn on/off caffeinate - build in program that prevents your Mac from sleep or turning off screen.

### Sonoff

Allows to control your smart lights in home directly from your Mac. More explanation - soon.

### Weather

Shows current weather and temperature for defined location.

Data is gathered from https://openweathermap.org/api

As mentioned in previous section you need to create account to obtain api key, and select city id. Then add them into `.env`:

```bash
WEATHER_API_KEY="yourApiKey"
WEATHER_CITY_ID="yourCityId"
```
