#!/bin/bash

# Função para exibir mensagens de erro e sair
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Atualizar o repositório git
echo "Atualizando o repositório git em ~/site..."
cd ~/site || error_exit "Falha ao acessar o diretório ~/site"
git pull || error_exit "Falha ao executar git pull"

# Parar e iniciar os serviços Docker
echo "Parando serviços Docker..."
docker compose -f docker-compose.prod.yml down || error_exit "Falha ao parar serviços Docker"

docker system prune --all --force --volumes

echo "Iniciando serviços Docker..."
docker compose -f docker-compose.prod.yml up -d || error_exit "Falha ao iniciar serviços Docker"

echo "Deploy concluído com sucesso!"
