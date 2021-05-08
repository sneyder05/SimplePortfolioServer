FROM node:12.18.0

# Install Java runtime
RUN apt-get update && apt-get install -y openjdk-8-jdk

WORKDIR /usr/src

# Install dependencies
RUN npm install -g npm@6.14.8
RUN npm install -g typescript@4.2.4
RUN npm install -g serverless@1.83.3

# Copy sources
COPY . ./app

WORKDIR /usr/src/app

# Install NPM packages
RUN npm install

# Install DynamoDB local
RUN serverless dynamodb install

# Install S3 local
RUN serverless plugin install --name serverless-s3-local

# Run the app
CMD [ "npm", "start" ]