# SafeZone [![Build Status](https://travis.ibm.com/Obinna-Elobi/SafeZone.svg?token=fgz7M9GztpXq2LwfSUcG&branch=master)](https://travis.ibm.com/Obinna-Elobi/SafeZone)
#### Team 2s Call For Code Submission
**This submission is made up of 2 Repos. This, our backend and a frontend repo:**
https://github.ibm.com/Zhibo-Zhang/SafeZoneApp


## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Server Setup](#server-setup)
1. [Using API](#using-api)
1. [Tests](#tests)
1. [Contributing](#contributing)


### What's the problem?

As a result of the COVID-19 virus, people have to take extra steps to mitigate their chances of getting sick. But, in Canada today there is currently no now way to see data on where infected persons have been that is specific enough to help people make decisions on places to go in their day to day lives. 

### How can technology help?

With contact-tracing we can help slow the spread of the virus by letting people know when they're about to go in areas that has seen high traffic of infected persons as well as enables businesses in those areas to take the necessary precautions. 


### The idea

A heatmap showing areas that have been visited by infected persons. To protect their identities, when users voluntarily submit their location data we do not associate them to their data.
The app collects user location data locally on users phone with their permission and they have the option to send it to us, we then confirm they have been sick and add their data to our database.

#### Use Cases:
- Preemptively allow users see what the covid situation looks like around them and plan how they go out, just as they would with checking the weather.
- Allow users see where they might have gotten exposed to the virus in the past by moving the filters backwards.  

## Demo video

https://ibm.box.com/s/1b2r1r1l484ivyeioo2qb84po5syxpou

## The Architecture
![architecture](safezone.jpg)
 

### Server Setup 
```shell script
1. npm install
2. npm run start-dev for development / npm run start for production
```

### Using API
#### To **POST** data:
**ENDPOINT**: "http://safezone1.fyre.ibm.com:3003/api/location/

**BODY**:
```json
{ 
   "locations": [
       { 
          "visitTime": "Timestamp", 
          "location": { 
               coordinates: [ "<Longitude>", "<Latitude>"] 
          } 
       },
       ...
    ] 
}
```

#### To **GET** data:
**ENDPOINT**: "http://safezone1.fyre.ibm.com:3003/api/location/

**QUERY**: 
```json
{ "fromTimestamp": "Timestamp", "toTimestamp": "Timestamp" }
```


---------------------------------------
## :construction_worker: In Progress

### safezone-backend

#### To **GET** location data:
**ENDPOINT**: "api/location/
```json
{ 
  "fromTimestamp": "Timestamp", 
  "toTimestamp": "Timestamp", 
  "bounds": "[[Longitude, Latitude], [Longitude, Latitude], ...]"
}
```

#### To **GET** location metadata:
**ENDPOINT**: "api/location/metadata
```json
{ 
  "fromTimestamp": "Timestamp", 
  "toTimestamp": "Timestamp", 
  "proximity":  "[Longitude, Latitude]",
  "range": "Integer"
}
```

### data-ingester
**ENDPOINT**: "http://safezone1.fyre.ibm.com:3004/api/location/

**BODY**:
```json
{ 
   "locations": [
       { 
          "visitTime": "Timestamp", 
          "location": { 
               coordinates: [ "<Longitude>", "<Latitude>"] 
          } 
       },
       ...
    ] 
}
```

---------------------------------------

### Tests

```shell script
npm test
```

## Contributing
Pull requests are only welcome from members of Team 2. For major changes, please open an issue first to discuss what you would like to change.
