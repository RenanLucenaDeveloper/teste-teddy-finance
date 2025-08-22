# Etapa 1: Build da aplicação React
FROM node:20.18.1-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração do npm para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências de forma limpa e consistente
RUN npm ci

# Copia o restante do código da aplicação
COPY . .

# Executa o build da aplicação para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com Nginx
FROM nginx:alpine

# Copia o arquivo de configuração do Nginx personalizado
# Substitui o arquivo de configuração padrão do Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia a saída do build da etapa anterior para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 do contêiner para o mundo exterior
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]