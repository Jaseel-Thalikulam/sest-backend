FROM node:18-alpine

# Create app directory this is in our docker conatiner/in image
WORKDIR /jaseel/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev


# Bundle app source
COPY . .

RUN npm run build       

EXPOSE 4000

CMD [ "node", "dist/main" ]