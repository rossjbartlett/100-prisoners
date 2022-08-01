FROM node:12-alpine

# Create app directory
WORKDIR /server

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Bundle app source
COPY . /server
ENV NODE_ENV=production
ENV POSTGRES_DB_URI=postgresql://postgres:postgres@postgresdb:5432/test_db
RUN npm run build

# Exports
EXPOSE 8080


CMD [ "npm", "run", "prod"]
