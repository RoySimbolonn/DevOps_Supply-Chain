# Gunakan base image Ubuntu
FROM ubuntu:24.04

# Install Node.js dan npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs python3 make g++ && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Copy semua file backend ke dalam container
COPY . .

# Install dependencies
RUN npm install

# Rebuild bcrypt agar sesuai dengan environment Linux
RUN npm rebuild bcrypt --build-from-source

# Generate Prisma
RUN npx prisma generate

# Expose port backend
EXPOSE 3000

# Jalankan backend
CMD ["npm", "start"]