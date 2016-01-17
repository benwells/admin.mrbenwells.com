###  admin.mrbenwells.com

The idea behind this app is that it will become my personal API and admin
dashboard for the rest of my projects.  

### Technologies Used
   - Node
   - React
   - NPM
   - Sass
   - Express
   - Bootstrap
   - React


## Projects within:

1. Weather  (/weather)

    My own personal weather app.  After creating an account, navigate to
    the "weather" nav menu item for a demo.  Features include:

    - Adding/Removing Saved locations
    - Viewing the weather for a specific locations


    * NOTE: Requires a google place API key to be placed in an env variable called `PLACES_API_KEY`
          (see /config/secrets.js) for more info

2. (COMING SOON) Career Finder (/careers)

    Keep up to date with careers on your favorite careers page!

## How to test it out
   - `git clone` this repository
   - start your mongo server with `mongod`
   - run `npm install` to install dependencies
   - `npm start` to start the express server
   - navigate to `http://localhost:3000`


##TODO

  - Implement Design for Weather dashboard
  - Add Career Finder app
  - Deploy to Openshift

  
