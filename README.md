# Teste técnico Teddy Finance

Este projeto possui Docker e arquitetura MFE Module Federation:

Para rodar este projeto localmente, certifique-se de ter o **Docker** instalado na sua máquina, e que ele tenha o **Compose** incluso para seguir os seguintes passos:

## Passo 1

Inicie clonando **na mesma pasta** este repositório e o mfe a seguir:

- https://github.com/RenanLucenaDeveloper/mfe-header-sidebar

## Passo 2

Na raiz da pasta, que agora tem os dois repositórios clonados, crie um arquivo chamado *docker-compose.yml*, com o seguinte código dentro:

```yml
version: '3.9'

services:
  teste-teddy-finance:
    build:
      context: ./teste-teddy-finance
      dockerfile: Dockerfile
    ports:
      - "5173:80"
    container_name: teste-teddy-finance-container
    networks:
      - microfrontend-net

  mfe-header-sidebar:
    build:
      context: ./mfe-header-sidebar
      dockerfile: Dockerfile
    ports:
      - "5001:80"
    container_name: mfe-header-sidebar-container
    depends_on:
      - teste-teddy-finance
    networks:
      - microfrontend-net


networks:
  microfrontend-net:
    driver: bridge
```

## Passo 3 / Final

Abra um terminal na pasta raiz e rode o seguinte código: *docker compose up --build*

Pronto! Logo após o build, o projeto estará disponível em http://localhost:5173/
