# Gunakan image Node.js LTS resmi sebagai base image
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
# Ini dilakukan secara terpisah untuk memanfaatkan caching layer Docker
COPY package*.json ./

# Instal dependensi Node.js
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Paparkan port yang akan digunakan aplikasi
EXPOSE 5000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
