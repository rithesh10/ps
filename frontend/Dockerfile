FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .

# Environment variables injected during image build
ARG VITE_BACKEND_URL
ARG VITE_FLASK_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_FLASK_URL=$VITE_FLASK_URL

RUN npm run build

# Serve with raw NGINX for production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default NGINX configuration to allow react-router to work properly
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
