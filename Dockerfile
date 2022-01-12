FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package.lock.json files and run npm
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# copy dir
COPY . .

# compile the app
CMD ["npm", "run", "dev"]