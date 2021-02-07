
FROM node:12

# Create app directory
WORKDIR /usr/projects/backend/E-commerce/node-ecommerce

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4040
CMD [ "node", "server.js" ]
