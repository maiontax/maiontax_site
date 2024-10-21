#!/bin/bash

# Função para exibir mensagens de erro e sair

# Atualizar o repositório git
echo "Atualizando o repositório git em ~/site..."
cd ~/site
git pull
echo "Parando serviços Docker..."
docker compose -f docker-compose.yml down

echo "Iniciando serviços Docker..."
docker compose -f docker-compose.yml up -d 

echo "Deploy concluído com sucesso!"
