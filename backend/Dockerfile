FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]



# # Backend Dockerfile
# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# # Install netcat
# # RUN apt-get update && apt-get install -y netcat
# RUN apt-get update && apt-get install -y netcat-traditional


# COPY . .

# EXPOSE 5000

# # Use the custom init script as the entrypoint
# ENTRYPOINT ["bash", "./init.sh"]
