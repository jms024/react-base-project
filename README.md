# README #

### What is this repository for? ###
* Base configuration for a react environment compiled using Webpack

### How do I get set up? ###
* After cloning the repository run 'npm install' in the root directory
* Execute 'npm run build' to output the compiled app in the dist folder
* Execute 'npm run dev' to run the dev server

### Hosting the app on docker
* In the project root dir run 'docker build -t projecttain:latest .' to build the container image
* Run 'docker run --name projecttain-app -d -p 3000:3000 projecttain:latest' to start the container.
* The app may be accessed on localhost:3000

### Contribution guidelines ###

### Who do I talk to? ###

NOTES:
Mock API: https://mockapi.io/projects/61da1382ce86530017e3ccd0

