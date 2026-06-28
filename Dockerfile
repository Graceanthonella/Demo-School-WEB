# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación
RUN npm run build

# Etapa 2: Servidor Nginx para archivos estáticos
FROM nginx:alpine

# Copiamos el build generado a la carpeta que expone Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración de Nginx para manejar el enrutamiento (React Router, etc.)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
