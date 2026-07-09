# Tormenta 20 — Site Companion

## Projeto
Site companion para o sistema de RPG brasileiro Tormenta 20.
Stack: HTML, CSS, JavaScript puro. Hospedagem: GitHub Pages.
Repositório: Anderson-Vanderlei/rpg-site

## Identidade Visual
- Tema escuro, fundo #0a0a0a
- Carmesim (#8B0000) e dourado (#c9a84c) como cores principais
- Fontes: Cinzel (títulos) + Crimson Text (corpo)
- Inspiração: League of Legends Universe

## Estrutura de Arquivos
- index.html — página principal
- pages/atlas.html — mapa interativo de Arton
- pages/compendio.html — compêndio de regras
- css/variables.css — variáveis globais
- css/style.css — estilos da home
- css/atlas.css — estilos do atlas
- css/compendio.css — estilos do compêndio
- js/main.js — scripts da home
- js/atlas.js — scripts do atlas
- js/compendio.js — scripts do compêndio
- js/data/locais.js — dados dos mapas
- js/data/racas.js — dados das raças
- images/ — imagens dos mapas

## Status Atual
- index.html: funcional, precisa de ajustes mobile e ultrawide
- atlas.html: funcional com 5 camadas de mapa
- compendio.html: raças funcionando, painel lateral precisa empurrar grid ao abrir

## Próximas Tarefas
1. compendio.js — hambúrguer mobile + breadcrumb + localStorage
2. index.html + style.css — mobile completo + ultrawide max-width
3. Raças com dados 100% oficiais do livro
4. Classes, Magias, Poderes (próximas seções do compêndio)