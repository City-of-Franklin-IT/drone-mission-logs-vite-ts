# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
RUN cat > /etc/nginx/conf.d/default.conf <<'NGINX'
server {
  listen 8003;
  root /usr/share/nginx/html;

  location /drone-missions/assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location /drone-missions {
    try_files $uri $uri/ /drone-missions/index.html;
  }

  location = / {
    return 302 /drone-missions/;
  }
}
NGINX

COPY --from=build /app/dist /usr/share/nginx/html/drone-missions

EXPOSE 8003
CMD ["nginx", "-g", "daemon off;"]
