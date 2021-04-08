# React APP ##
## Requriement ##

#Node JS https://nodejs.org/en/

#Yarn or NPM https://yarnpkg.com/ or https://www.npmjs.com/
---------------------------

Affter you clone the project
```sh cd sso-fe```

--For first time--
### `npm install` or `yarn`


--Run Project--
### `npm start` or `yarn start`


Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

or Deploy with docker

`docker build -t .`

`docker run -it \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 3000:3000 \
  --rm \
  docker-react`
  
  ---------------------------
--SetUP env--

check your `.env.example` copy and rename to `.env` and type your backend ip for connect

-------------------------------------------------------------------------------------------

## User Guide

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).

You can find doc integration sso-sit here https://documenter.getpostman.com/view/11099771/TVCZbXHk

## How to Update to New Versions?

Please refer to the [User Guide](https://facebook.github.io/create-react-app/docs/updating-to-new-releases) for this and other information.
