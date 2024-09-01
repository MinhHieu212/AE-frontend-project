# Sử dụng hình ảnh Node.js
FROM node:16-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose port 3000
EXPOSE 3000

# Chạy lệnh để khởi chạy ứng dụng React
CMD ["npm", "start"]
