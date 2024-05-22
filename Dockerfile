FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install Prisma client and dotenv
RUN npm install @prisma/client prisma dotenv

# Generate Prisma client
RUN npx prisma generate

# Expose the port that your app runs on
EXPOSE 3333

CMD ["npm", "start"]