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

# Accept build arguments
ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT=3000

# Set environment variables from build args
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV PORT=${PORT}
ENV VITE_API_URL=http://localhost:3000
ENV BASE_URL=http://localhost:3000/api/orders

# Expose port backend
EXPOSE 3000

# Jalankan backend
CMD ["npm", "start"]