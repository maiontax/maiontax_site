#!/bin/bash

# Função para exibir mensagens de erro e sair

# Atualizar o repositório git
echo "Atualizando o repositório git em ~/site..."
cd ~/site || error_exit "Falha ao acessar o diretório ~/site"
git pull || error_exit "Falha ao executar git pull"

# Parar e iniciar os serviços Docker
echo "Parando serviços Docker..."
docker compose -f docker-compose.yml down

echo "Iniciando serviços Docker..."
docker compose -f docker-compose.yml up -d

echo "Deploy concluído com sucesso!"
