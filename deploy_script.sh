#!/bin/bash

# Função para exibir mensagens de erro e sair

# Atualizar o repositório git
echo "Atualizando o repositório git em ~/site..."
cd ~/site
git pul

# Parar e iniciar os serviços Docker
echo "Parando serviços Docker..."
docker build -t nextjs-docker .

echo "Iniciando serviços Docker..."
docker run -p 3000:3005 nextjs-docker

echo "Deploy concluído com sucesso!"
