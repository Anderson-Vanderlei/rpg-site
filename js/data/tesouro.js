/* ============================================================
   TORMENTA 20 — tesouro.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, seção "Tesouros" (pp. 327-345, pdf 333-351).

   Todo o Gerador de Tesouro (Regras Gerais > aba "Gerador de Tesouro")
   num arquivo só, em 5 seções (era 5 arquivos separados — consolidado
   num único arquivo pra não espalhar o data/ com muitos arquivos
   pequenos e correlacionados; o motor de rolagem em compendio.js não
   mudou, só o arquivo que ele importa).

   ND → Tabela 8-1 (Dinheiro + Itens) → conforme o resultado, cai em
   Riquezas (8-2) / Itens Diversos (8-3) / tipo de Equipamento (8-4) /
   Itens Superiores (8-5) / encantos e itens específicos de armas
   (8-8/8-9), armaduras-escudos (8-10/8-11), acessórios (8-13/14/15)
   ou poções (8-12). Tabelas 8-6/8-7 são só referência de mestre.

   FORMATO DE UMA FAIXA d%: { min, max, ... }. Campos por `tipo` (ver
   Seção 1 pra detalhe completo de cada um): 'nenhum' | 'diverso' |
   'equipamento' | 'pocao' | 'riqueza' | 'superior' | 'magico'.
   `qtd` é sempre { n, lados?, bonus? } — lados/bonus ausentes = valor
   fixo `n`.
============================================================ */

/* ---------------------------------------------------------------
   SEÇÃO 1 — Tabelas 8-1 a 8-7: base da cascata de ND
--------------------------------------------------------------- */

window.TESOURO_ND_TABELA = [
  { nd: '1/4', dinheiro: [
      { min: 1, max: 30, tipo: 'nenhum' },
      { min: 31, max: 70, tipo: 'dado', dado: { n: 1, lados: 6 }, mult: 10, moeda: 'TC' },
      { min: 71, max: 95, tipo: 'dado', dado: { n: 1, lados: 4 }, mult: 100, moeda: 'TC' },
      { min: 96, max: 100, tipo: 'dado', dado: { n: 1, lados: 6 }, mult: 10, moeda: 'T$' },
    ], itens: [
      { min: 1, max: 50, tipo: 'nenhum' },
      { min: 51, max: 75, tipo: 'diverso' },
      { min: 76, max: 100, tipo: 'equipamento' },
    ] },
  { nd: '1/2', dinheiro: [
      { min: 1, max: 25, tipo: 'nenhum' },
      { min: 26, max: 70, tipo: 'dado', dado: { n: 2, lados: 6 }, mult: 10, moeda: 'TC' },
      { min: 71, max: 95, tipo: 'dado', dado: { n: 2, lados: 8 }, mult: 10, moeda: 'T$' },
      { min: 96, max: 100, tipo: 'dado', dado: { n: 1, lados: 4 }, mult: 100, moeda: 'T$' },
    ], itens: [
      { min: 1, max: 45, tipo: 'nenhum' },
      { min: 46, max: 70, tipo: 'diverso' },
      { min: 71, max: 100, tipo: 'equipamento' },
    ] },
  { nd: '1', dinheiro: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 70, tipo: 'dado', dado: { n: 3, lados: 8 }, mult: 10, moeda: 'T$' },
      { min: 71, max: 95, tipo: 'dado', dado: { n: 4, lados: 12 }, mult: 10, moeda: 'T$' },
      { min: 96, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1 } },
    ], itens: [
      { min: 1, max: 40, tipo: 'nenhum' },
      { min: 41, max: 65, tipo: 'diverso' },
      { min: 66, max: 90, tipo: 'equipamento' },
      { min: 91, max: 100, tipo: 'pocao', qtd: { n: 1 } },
    ] },
  { nd: '2', dinheiro: [
      { min: 1, max: 15, tipo: 'nenhum' },
      { min: 16, max: 55, tipo: 'dado', dado: { n: 3, lados: 10 }, mult: 10, moeda: 'T$' },
      { min: 56, max: 85, tipo: 'dado', dado: { n: 2, lados: 4 }, mult: 100, moeda: 'T$' },
      { min: 86, max: 95, tipo: 'dado', dado: { n: 2, lados: 6, bonus: 1 }, mult: 100, moeda: 'T$' },
      { min: 96, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1 } },
    ], itens: [
      { min: 1, max: 30, tipo: 'nenhum' },
      { min: 31, max: 40, tipo: 'diverso' },
      { min: 41, max: 70, tipo: 'equipamento' },
      { min: 71, max: 90, tipo: 'pocao', qtd: { n: 1 } },
      { min: 91, max: 100, tipo: 'superior', melhorias: 1 },
    ] },
  { nd: '3', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 20, tipo: 'dado', dado: { n: 4, lados: 12 }, mult: 10, moeda: 'T$' },
      { min: 21, max: 60, tipo: 'dado', dado: { n: 1, lados: 4 }, mult: 100, moeda: 'T$' },
      { min: 61, max: 90, tipo: 'dado', dado: { n: 1, lados: 8 }, mult: 10, moeda: 'TO' },
      { min: 91, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1, lados: 3 } },
    ], itens: [
      { min: 1, max: 25, tipo: 'nenhum' },
      { min: 26, max: 35, tipo: 'diverso' },
      { min: 36, max: 60, tipo: 'equipamento' },
      { min: 61, max: 85, tipo: 'pocao', qtd: { n: 1 } },
      { min: 86, max: 100, tipo: 'superior', melhorias: 1 },
    ] },
  { nd: '4', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 50, tipo: 'dado', dado: { n: 1, lados: 6 }, mult: 100, moeda: 'T$' },
      { min: 51, max: 80, tipo: 'dado', dado: { n: 1, lados: 12 }, mult: 100, moeda: 'T$' },
      { min: 81, max: 90, tipo: 'riqueza', tier: 'menor', qtd: { n: 1 }, bonusPct: true },
      { min: 91, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1, lados: 3 }, bonusPct: true },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 30, tipo: 'diverso' },
      { min: 31, max: 55, tipo: 'equipamento', escolha2D: true },
      { min: 56, max: 80, tipo: 'pocao', qtd: { n: 1 }, bonusPct: true },
      { min: 81, max: 100, tipo: 'superior', melhorias: 1, escolha2D: true },
    ] },
  { nd: '5', dinheiro: [
      { min: 1, max: 15, tipo: 'nenhum' },
      { min: 16, max: 65, tipo: 'dado', dado: { n: 1, lados: 8 }, mult: 100, moeda: 'T$' },
      { min: 66, max: 95, tipo: 'dado', dado: { n: 3, lados: 4 }, mult: 10, moeda: 'TO' },
      { min: 96, max: 100, tipo: 'riqueza', tier: 'media', qtd: { n: 1 } },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 70, tipo: 'pocao', qtd: { n: 1 } },
      { min: 71, max: 90, tipo: 'superior', melhorias: 1 },
      { min: 91, max: 100, tipo: 'superior', melhorias: 2 },
    ] },
  { nd: '6', dinheiro: [
      { min: 1, max: 15, tipo: 'nenhum' },
      { min: 16, max: 60, tipo: 'dado', dado: { n: 2, lados: 6 }, mult: 100, moeda: 'T$' },
      { min: 61, max: 90, tipo: 'dado', dado: { n: 2, lados: 10 }, mult: 100, moeda: 'T$' },
      { min: 91, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1, lados: 3, bonus: 1 } },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 65, tipo: 'pocao', qtd: { n: 1 }, bonusPct: true },
      { min: 66, max: 95, tipo: 'superior', melhorias: 1 },
      { min: 96, max: 100, tipo: 'superior', melhorias: 2, escolha2D: true },
    ] },
  { nd: '7', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 60, tipo: 'dado', dado: { n: 2, lados: 8 }, mult: 100, moeda: 'T$' },
      { min: 61, max: 90, tipo: 'dado', dado: { n: 2, lados: 12 }, mult: 10, moeda: 'TO' },
      { min: 91, max: 100, tipo: 'riqueza', tier: 'menor', qtd: { n: 1, lados: 4, bonus: 1 } },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 60, tipo: 'pocao', qtd: { n: 1, lados: 3 } },
      { min: 61, max: 90, tipo: 'superior', melhorias: 2 },
      { min: 91, max: 100, tipo: 'superior', melhorias: 3 },
    ] },
  { nd: '8', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 55, tipo: 'dado', dado: { n: 2, lados: 10 }, mult: 100, moeda: 'T$' },
      { min: 56, max: 95, tipo: 'riqueza', tier: 'menor', qtd: { n: 1, lados: 4, bonus: 1 } },
      { min: 96, max: 100, tipo: 'riqueza', tier: 'media', qtd: { n: 1 }, bonusPct: true },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 75, tipo: 'pocao', qtd: { n: 1, lados: 3 } },
      { min: 76, max: 95, tipo: 'superior', melhorias: 2 },
      { min: 96, max: 100, tipo: 'superior', melhorias: 3, escolha2D: true },
    ] },
  { nd: '9', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 35, tipo: 'riqueza', tier: 'media', qtd: { n: 1 } },
      { min: 36, max: 85, tipo: 'dado', dado: { n: 4, lados: 6 }, mult: 100, moeda: 'T$' },
      { min: 86, max: 100, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3 } },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 70, tipo: 'pocao', qtd: { n: 1 }, bonusPct: true },
      { min: 71, max: 95, tipo: 'superior', melhorias: 3 },
      { min: 96, max: 100, tipo: 'magico', porte: 'menor' },
    ] },
  { nd: '10', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 30, tipo: 'dado', dado: { n: 4, lados: 6 }, mult: 100, moeda: 'T$' },
      { min: 31, max: 85, tipo: 'dado', dado: { n: 4, lados: 10 }, mult: 10, moeda: 'TO' },
      { min: 86, max: 100, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3, bonus: 1 } },
    ], itens: [
      { min: 1, max: 50, tipo: 'nenhum' },
      { min: 51, max: 75, tipo: 'pocao', qtd: { n: 1, lados: 3, bonus: 1 } },
      { min: 76, max: 90, tipo: 'superior', melhorias: 3 },
      { min: 91, max: 100, tipo: 'magico', porte: 'menor' },
    ] },
  { nd: '11', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 45, tipo: 'dado', dado: { n: 2, lados: 4 }, mult: 1000, moeda: 'T$' },
      { min: 46, max: 85, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3 } },
      { min: 86, max: 100, tipo: 'dado', dado: { n: 2, lados: 6 }, mult: 100, moeda: 'TO' },
    ], itens: [
      { min: 1, max: 45, tipo: 'nenhum' },
      { min: 46, max: 70, tipo: 'pocao', qtd: { n: 1, lados: 4, bonus: 1 } },
      { min: 71, max: 90, tipo: 'superior', melhorias: 3 },
      { min: 91, max: 100, tipo: 'magico', porte: 'menor', escolha2D: true },
    ] },
  { nd: '12', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 45, tipo: 'riqueza', tier: 'media', qtd: { n: 1 }, bonusPct: true },
      { min: 46, max: 80, tipo: 'dado', dado: { n: 2, lados: 6 }, mult: 1000, moeda: 'T$' },
      { min: 81, max: 100, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 4, bonus: 1 } },
    ], itens: [
      { min: 1, max: 45, tipo: 'nenhum' },
      { min: 46, max: 70, tipo: 'pocao', qtd: { n: 1, lados: 3, bonus: 1 }, bonusPct: true },
      { min: 71, max: 85, tipo: 'superior', melhorias: 4 },
      { min: 86, max: 100, tipo: 'magico', porte: 'menor' },
    ] },
  { nd: '13', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 45, tipo: 'dado', dado: { n: 4, lados: 4 }, mult: 1000, moeda: 'T$' },
      { min: 46, max: 80, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3, bonus: 1 } },
      { min: 81, max: 100, tipo: 'dado', dado: { n: 4, lados: 6 }, mult: 100, moeda: 'TO' },
    ], itens: [
      { min: 1, max: 40, tipo: 'nenhum' },
      { min: 41, max: 65, tipo: 'pocao', qtd: { n: 1, lados: 4, bonus: 1 } },
      { min: 66, max: 95, tipo: 'superior', melhorias: 4 },
      { min: 96, max: 100, tipo: 'magico', porte: 'medio' },
    ] },
  { nd: '14', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 45, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3, bonus: 1 } },
      { min: 46, max: 80, tipo: 'dado', dado: { n: 3, lados: 6 }, mult: 1000, moeda: 'T$' },
      { min: 81, max: 100, tipo: 'riqueza', tier: 'maior', qtd: { n: 1 } },
    ], itens: [
      { min: 1, max: 40, tipo: 'nenhum' },
      { min: 41, max: 65, tipo: 'pocao', qtd: { n: 1, lados: 4, bonus: 1 }, bonusPct: true },
      { min: 66, max: 90, tipo: 'superior', melhorias: 4 },
      { min: 91, max: 100, tipo: 'magico', porte: 'medio' },
    ] },
  { nd: '15', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 45, tipo: 'riqueza', tier: 'media', qtd: { n: 1 }, bonusPct: true },
      { min: 46, max: 80, tipo: 'dado', dado: { n: 2, lados: 10 }, mult: 1000, moeda: 'T$' },
      { min: 81, max: 100, tipo: 'dado', dado: { n: 1, lados: 4 }, mult: 1000, moeda: 'TO' },
    ], itens: [
      { min: 1, max: 35, tipo: 'nenhum' },
      { min: 36, max: 45, tipo: 'pocao', qtd: { n: 1, lados: 6, bonus: 1 } },
      { min: 46, max: 85, tipo: 'superior', melhorias: 4, escolha2D: true },
      { min: 86, max: 100, tipo: 'magico', porte: 'medio' },
    ] },
  { nd: '16', dinheiro: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 40, tipo: 'dado', dado: { n: 3, lados: 6 }, mult: 1000, moeda: 'T$' },
      { min: 41, max: 75, tipo: 'dado', dado: { n: 3, lados: 10 }, mult: 100, moeda: 'TO' },
      { min: 76, max: 100, tipo: 'riqueza', tier: 'maior', qtd: { n: 1, lados: 3 } },
    ], itens: [
      { min: 1, max: 35, tipo: 'nenhum' },
      { min: 36, max: 45, tipo: 'pocao', qtd: { n: 1, lados: 6, bonus: 1 }, bonusPct: true },
      { min: 46, max: 80, tipo: 'superior', melhorias: 4, escolha2D: true },
      { min: 81, max: 100, tipo: 'magico', porte: 'medio' },
    ] },
  { nd: '17', dinheiro: [
      { min: 1, max: 5, tipo: 'nenhum' },
      { min: 6, max: 40, tipo: 'dado', dado: { n: 4, lados: 6 }, mult: 1000, moeda: 'T$' },
      { min: 41, max: 75, tipo: 'riqueza', tier: 'media', qtd: { n: 1, lados: 3 }, bonusPct: true },
      { min: 76, max: 100, tipo: 'dado', dado: { n: 2, lados: 4 }, mult: 1000, moeda: 'TO' },
    ], itens: [
      { min: 1, max: 20, tipo: 'nenhum' },
      { min: 21, max: 40, tipo: 'magico', porte: 'menor' },
      { min: 41, max: 80, tipo: 'magico', porte: 'medio' },
      { min: 81, max: 100, tipo: 'magico', porte: 'maior' },
    ] },
  { nd: '18', dinheiro: [
      { min: 1, max: 5, tipo: 'nenhum' },
      { min: 6, max: 40, tipo: 'dado', dado: { n: 4, lados: 10 }, mult: 1000, moeda: 'T$' },
      { min: 41, max: 75, tipo: 'riqueza', tier: 'maior', qtd: { n: 1 } },
      { min: 76, max: 100, tipo: 'riqueza', tier: 'maior', qtd: { n: 1, lados: 3, bonus: 1 } },
    ], itens: [
      { min: 1, max: 15, tipo: 'nenhum' },
      { min: 16, max: 40, tipo: 'magico', porte: 'menor', escolha2D: true },
      { min: 41, max: 70, tipo: 'magico', porte: 'medio' },
      { min: 71, max: 100, tipo: 'magico', porte: 'maior' },
    ] },
  { nd: '19', dinheiro: [
      { min: 1, max: 5, tipo: 'nenhum' },
      { min: 6, max: 40, tipo: 'dado', dado: { n: 4, lados: 12 }, mult: 1000, moeda: 'T$' },
      { min: 41, max: 75, tipo: 'riqueza', tier: 'maior', qtd: { n: 1 }, bonusPct: true },
      { min: 76, max: 100, tipo: 'dado', dado: { n: 1, lados: 12 }, mult: 1000, moeda: 'TO' },
    ], itens: [
      { min: 1, max: 10, tipo: 'nenhum' },
      { min: 11, max: 40, tipo: 'magico', porte: 'menor', escolha2D: true },
      { min: 41, max: 60, tipo: 'magico', porte: 'medio', escolha2D: true },
      { min: 61, max: 100, tipo: 'magico', porte: 'maior' },
    ] },
  { nd: '20', dinheiro: [
      { min: 1, max: 5, tipo: 'nenhum' },
      { min: 6, max: 40, tipo: 'dado', dado: { n: 2, lados: 4 }, mult: 1000, moeda: 'TO' },
      { min: 41, max: 75, tipo: 'riqueza', tier: 'maior', qtd: { n: 1, lados: 3 } },
      { min: 76, max: 100, tipo: 'riqueza', tier: 'maior', qtd: { n: 1, lados: 3, bonus: 1 }, bonusPct: true },
    ], itens: [
      { min: 1, max: 5, tipo: 'nenhum' },
      { min: 6, max: 40, tipo: 'magico', porte: 'menor', escolha2D: true },
      { min: 41, max: 50, tipo: 'magico', porte: 'medio', escolha2D: true },
      { min: 51, max: 100, tipo: 'magico', porte: 'maior', escolha2D: true },
    ] },
];

/* --------------------------------------------------------------
   Tabela 8-2: Riquezas (p.330/pdf 336). Um item sem uso prático,
   mas valioso — o roll de d% muda de faixa conforme o "porte" da
   riqueza (menor/média/maior), então cada porte vira sua própria
   sub-tabela de 1 a 100 (reaproveitando as mesmas linhas de valor
   quando os portes se sobrepõem, exatamente como a tabela impressa).
-------------------------------------------------------------- */
window.TABELA_RIQUEZAS = {
  menor: [
    { min: 1, max: 25, dado: { n: 4, lados: 4 }, mult: 1, moeda: 'T$', exemplos: 'Ágata ou hematita (1/2); barril de farinha ou gaiola com galinhas (5).' },
    { min: 26, max: 40, dado: { n: 1, lados: 4 }, mult: 10, moeda: 'T$', exemplos: 'Quartzo rosa ou topázio (1/2); caixa de tabaco ou rolo de linho (1); jarro de especiarias, como canela, gorad, pimenta ou sal (2).' },
    { min: 41, max: 55, dado: { n: 2, lados: 4 }, mult: 10, moeda: 'T$', exemplos: 'Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim entalhado ou rolo de seda (1); vaso de prata (2).' },
    { min: 56, max: 70, dado: { n: 4, lados: 6 }, mult: 10, moeda: 'T$', exemplos: 'Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata com gemas de lápis-lazúli (1); tapeçaria grande e bem-feita de lã (5).' },
    { min: 71, max: 85, dado: { n: 1, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1).' },
    { min: 86, max: 95, dado: { n: 2, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5).' },
    { min: 96, max: 99, dado: { n: 2, lados: 8 }, mult: 100, moeda: 'T$', exemplos: 'Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2).' },
    { min: 100, max: 100, dado: { n: 4, lados: 10 }, mult: 100, moeda: 'T$', exemplos: 'Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2).' },
  ],
  media: [
    { min: 1, max: 10, dado: { n: 2, lados: 4 }, mult: 10, moeda: 'T$', exemplos: 'Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim entalhado ou rolo de seda (1); vaso de prata (2).' },
    { min: 11, max: 30, dado: { n: 4, lados: 6 }, mult: 10, moeda: 'T$', exemplos: 'Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata com gemas de lápis-lazúli (1); tapeçaria grande e bem-feita de lã (5).' },
    { min: 31, max: 50, dado: { n: 1, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1).' },
    { min: 51, max: 65, dado: { n: 2, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5).' },
    { min: 66, max: 80, dado: { n: 2, lados: 8 }, mult: 100, moeda: 'T$', exemplos: 'Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2).' },
    { min: 81, max: 90, dado: { n: 4, lados: 10 }, mult: 100, moeda: 'T$', exemplos: 'Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2).' },
    { min: 91, max: 95, dado: { n: 6, lados: 12 }, mult: 100, moeda: 'T$', exemplos: 'Anel de prata e safira e correntinha com pequenas pérolas rosas, diamante branco (1/2); ídolo de ouro puro maciço (5).' },
    { min: 96, max: 99, dado: { n: 2, lados: 10 }, mult: 1000, moeda: 'T$', exemplos: 'Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro decoradas com esmeraldas (2).' },
    { min: 100, max: 100, dado: { n: 6, lados: 8 }, mult: 1000, moeda: 'T$', exemplos: 'Coroa de ouro adornada com centenas de gemas, pertencente a um antigo monarca (1); baú de mitral com coleção de diamantes (2).' },
  ],
  maior: [
    { min: 1, max: 5, dado: { n: 1, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata e gema negra no cabo ou pente de prata com pedras preciosas (1).' },
    { min: 6, max: 15, dado: { n: 2, lados: 6 }, mult: 100, moeda: 'T$', exemplos: 'Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica com ornamentos de zircão e marfim (5).' },
    { min: 16, max: 25, dado: { n: 2, lados: 8 }, mult: 100, moeda: 'T$', exemplos: 'Opala negra ou tapa-olho com um olho falso de safira (1/2); luva bordada e adornada com gemas ou pingente de opala vermelha com corrente de ouro (1); lingote de ouro ou pintura antiga (2).' },
    { min: 26, max: 40, dado: { n: 4, lados: 10 }, mult: 100, moeda: 'T$', exemplos: 'Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro ou tornozeleira com gemas (1); manto bordado em veludo e seda com inúmeras pedras preciosas (2).' },
    { min: 41, max: 60, dado: { n: 6, lados: 12 }, mult: 100, moeda: 'T$', exemplos: 'Anel de prata e safira e correntinha com pequenas pérolas rosas, diamante branco (1/2); ídolo de ouro puro maciço (5).' },
    { min: 61, max: 75, dado: { n: 2, lados: 10 }, mult: 1000, moeda: 'T$', exemplos: 'Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro decoradas com esmeraldas (2).' },
    { min: 76, max: 85, dado: { n: 6, lados: 8 }, mult: 1000, moeda: 'T$', exemplos: 'Coroa de ouro adornada com centenas de gemas, pertencente a um antigo monarca (1); baú de mitral com coleção de diamantes (2).' },
    { min: 86, max: 95, dado: { n: 1, lados: 10 }, mult: 10000, moeda: 'T$', exemplos: 'Arca de madeira reforçada repleta de lingotes de prata e ouro, além de pedras preciosas de vários tipos (20).' },
    { min: 96, max: 100, dado: { n: 4, lados: 12 }, mult: 10000, moeda: 'T$', exemplos: 'Uma sala forrada de moedas! Mover todo esse dinheiro exige trabalhadores e carroças (ou outra ideia por parte dos jogadores), além de atrair a atenção de bandidos, coletores de impostos e aproveitadores de vários tipos...' },
  ],
};

/* --------------------------------------------------------------
   Tabela 8-3: Itens Diversos (p.331/pdf 337) — d100, item mundano
   simples, sem descrição mecânica própria (equipamento comum).
-------------------------------------------------------------- */
window.TABELA_ITENS_DIVERSOS = [
  { min: 1, max: 2, nome: 'Ácido' }, { min: 3, max: 4, nome: 'Água benta' },
  { min: 5, max: 5, nome: 'Alaúde élfico' }, { min: 6, max: 6, nome: 'Algemas' },
  { min: 7, max: 8, nome: 'Baga-de-fogo' }, { min: 9, max: 23, nome: 'Bálsamo restaurador' },
  { min: 24, max: 24, nome: 'Bandana' }, { min: 25, max: 25, nome: 'Bandoleira de poções' },
  { min: 26, max: 30, nome: 'Bomba' }, { min: 31, max: 31, nome: 'Botas reforçadas' },
  { min: 32, max: 32, nome: 'Camisa bufante' }, { min: 33, max: 33, nome: 'Capa esvoaçante' },
  { min: 34, max: 34, nome: 'Capa pesada' }, { min: 35, max: 35, nome: 'Casaco longo' },
  { min: 36, max: 36, nome: 'Chapéu arcano' }, { min: 37, max: 38, nome: 'Coleção de livros' },
  { min: 39, max: 40, nome: 'Cosmético' }, { min: 41, max: 42, nome: 'Dente-de-dragão' },
  { min: 43, max: 43, nome: 'Enfeite de elmo' }, { min: 44, max: 44, nome: 'Elixir do amor' },
  { min: 45, max: 46, nome: 'Equipamento de viagem' }, { min: 47, max: 56, nome: 'Essência de mana' },
  { min: 57, max: 57, nome: 'Estojo de disfarces' }, { min: 58, max: 58, nome: 'Farrapos de ermitão' },
  { min: 59, max: 59, nome: 'Flauta mística' }, { min: 60, max: 66, nome: 'Fogo alquímico' },
  { min: 67, max: 67, nome: 'Gorro de ervas' }, { min: 68, max: 69, nome: 'Líquen lilás' },
  { min: 70, max: 70, nome: 'Luneta' }, { min: 71, max: 71, nome: 'Luva de pelica' },
  { min: 72, max: 73, nome: 'Maleta de medicamentos' }, { min: 74, max: 74, nome: 'Manopla' },
  { min: 75, max: 75, nome: 'Manto eclesiástico' }, { min: 76, max: 78, nome: 'Mochila de aventureiro' },
  { min: 79, max: 80, nome: 'Musgo púrpura' }, { min: 81, max: 81, nome: 'Organizador de pergaminhos' },
  { min: 82, max: 83, nome: 'Ossos de monstro' }, { min: 84, max: 85, nome: 'Pó de cristal' },
  { min: 86, max: 87, nome: 'Pó de giz' }, { min: 88, max: 88, nome: 'Pó do desaparecimento' },
  { min: 89, max: 89, nome: 'Robe místico' }, { min: 90, max: 91, nome: 'Saco de sal' },
  { min: 92, max: 92, nome: 'Sapatos de camurça' }, { min: 93, max: 94, nome: 'Seixo de âmbar' },
  { min: 95, max: 95, nome: 'Sela' }, { min: 96, max: 96, nome: 'Tabardo' },
  { min: 97, max: 97, nome: 'Traje da corte' }, { min: 98, max: 99, nome: 'Terra de cemitério' },
  { min: 100, max: 100, nome: 'Veste de seda' },
];

/* --------------------------------------------------------------
   Tabela 8-4: Equipamento (p.331/pdf 337) — 3 sub-tabelas conforme
   o tipo sorteado em 1d6 (1-3 arma; 4-5 armadura/escudo; 6 esotérico).
   Itens mundanos simples, sem descrição mecânica própria.
-------------------------------------------------------------- */
window.EQUIPAMENTO_TIPOS = {
  arma: [
    { min: 1, max: 3, nome: 'Adaga' }, { min: 4, max: 5, nome: 'Alabarda' },
    { min: 6, max: 7, nome: 'Alfange' }, { min: 8, max: 10, nome: 'Arco curto' },
    { min: 11, max: 13, nome: 'Arco longo' }, { min: 14, max: 15, nome: 'Azagaia' },
    { min: 16, max: 16, nome: 'Balas (20)' }, { min: 17, max: 18, nome: 'Besta leve' },
    { min: 19, max: 20, nome: 'Besta pesada' }, { min: 21, max: 23, nome: 'Bordão' },
    { min: 24, max: 24, nome: 'Chicote' }, { min: 25, max: 27, nome: 'Cimitarra' },
    { min: 28, max: 30, nome: 'Clava' }, { min: 31, max: 31, nome: 'Corrente de espinhos' },
    { min: 32, max: 33, nome: 'Espada bastarda' }, { min: 34, max: 38, nome: 'Espada curta' },
    { min: 39, max: 43, nome: 'Espada longa' }, { min: 44, max: 46, nome: 'Flechas (20)' },
    { min: 47, max: 49, nome: 'Florete' }, { min: 50, max: 51, nome: 'Foice' },
    { min: 52, max: 53, nome: 'Funda' }, { min: 54, max: 55, nome: 'Gadanho' },
    { min: 56, max: 56, nome: 'Katana' }, { min: 57, max: 59, nome: 'Lança' },
    { min: 60, max: 60, nome: 'Lança montada' }, { min: 61, max: 63, nome: 'Maça' },
    { min: 64, max: 66, nome: 'Machadinha' }, { min: 67, max: 67, nome: 'Machado anão' },
    { min: 68, max: 70, nome: 'Machado de batalha' }, { min: 71, max: 73, nome: 'Machado de guerra' },
    { min: 74, max: 74, nome: 'Machado táurico' }, { min: 75, max: 76, nome: 'Mangual' },
    { min: 77, max: 77, nome: 'Marreta' }, { min: 78, max: 80, nome: 'Martelo de guerra' },
    { min: 81, max: 83, nome: 'Montante' }, { min: 84, max: 84, nome: 'Mosquete' },
    { min: 85, max: 85, nome: 'Pedras (20)' }, { min: 86, max: 88, nome: 'Picareta' },
    { min: 89, max: 90, nome: 'Pique' }, { min: 91, max: 92, nome: 'Pistola' },
    { min: 93, max: 93, nome: 'Rede' }, { min: 94, max: 96, nome: 'Tacape' },
    { min: 97, max: 98, nome: 'Tridente' }, { min: 99, max: 100, nome: 'Virotes (20)' },
  ],
  armadura: [
    { min: 1, max: 5, nome: 'Couro' }, { min: 6, max: 10, nome: 'Brunea' },
    { min: 11, max: 25, nome: 'Completa' }, { min: 26, max: 30, nome: 'Cota de malha' },
    { min: 31, max: 45, nome: 'Couraça' }, { min: 46, max: 55, nome: 'Couro batido' },
    { min: 56, max: 65, nome: 'Escudo leve' }, { min: 66, max: 80, nome: 'Escudo pesado' },
    { min: 81, max: 85, nome: 'Gibão de peles' }, { min: 86, max: 90, nome: 'Loriga segmentada' },
    { min: 91, max: 100, nome: 'Meia armadura' },
  ],
  esoterico: [
    { min: 1, max: 10, nome: 'Bolsa de pó' }, { min: 11, max: 25, nome: 'Cajado arcano' },
    { min: 26, max: 35, nome: 'Cetro elemental' }, { min: 36, max: 42, nome: 'Costela de lich' },
    { min: 43, max: 50, nome: 'Dedo de ente' }, { min: 51, max: 55, nome: 'Luva de ferro' },
    { min: 56, max: 65, nome: 'Medalhão de prata' }, { min: 66, max: 75, nome: 'Orbe cristalino' },
    { min: 76, max: 85, nome: 'Tomo hermético' }, { min: 86, max: 100, nome: 'Varinha arcana' },
  ],
};

/* --------------------------------------------------------------
   Tabela 8-5: Itens Superiores (p.332/pdf 338) — melhorias que
   caem sobre um item de Equipamento (arma/armadura-escudo/
   esotérico) já sorteado. Puramente mecânica de bônus (sem
   parágrafo de efeito no livro, ao contrário dos encantos mágicos).
   ¹ conta como duas melhorias (role de novo se o item só tiver uma).
   ² "Material especial" exige rolar 1d6 à parte pra definir o material.
-------------------------------------------------------------- */
window.TABELA_ITENS_SUPERIORES = {
  arma: [
    { min: 1, max: 10, nome: 'Atroz', duplaMelhoria: true },
    { min: 11, max: 13, nome: 'Banhada a ouro' }, { min: 14, max: 23, nome: 'Certeira' },
    { min: 24, max: 26, nome: 'Cravejada de gemas' }, { min: 27, max: 36, nome: 'Cruel' },
    { min: 37, max: 39, nome: 'Discreta' }, { min: 40, max: 44, nome: 'Equilibrada' },
    { min: 45, max: 48, nome: 'Harmonizada' }, { min: 49, max: 53, nome: 'Injeção alquímica' },
    { min: 54, max: 55, nome: 'Macabra' }, { min: 56, max: 65, nome: 'Maciça' },
    { min: 66, max: 75, nome: 'Material especial', material: true },
    { min: 76, max: 80, nome: 'Mira telescópica' }, { min: 81, max: 90, nome: 'Precisa' },
    { min: 91, max: 100, nome: 'Pungente', duplaMelhoria: true },
  ],
  armadura: [
    { min: 1, max: 15, nome: 'Ajustada' }, { min: 16, max: 19, nome: 'Banhada a ouro' },
    { min: 20, max: 23, nome: 'Cravejada de gemas' }, { min: 24, max: 28, nome: 'Delicada' },
    { min: 29, max: 32, nome: 'Discreta' }, { min: 33, max: 37, nome: 'Espinhos' },
    { min: 38, max: 40, nome: 'Macabra' },
    { min: 41, max: 50, nome: 'Material especial', material: true },
    { min: 51, max: 55, nome: 'Polida' }, { min: 56, max: 80, nome: 'Reforçada' },
    { min: 81, max: 90, nome: 'Selada' },
    { min: 91, max: 100, nome: 'Sob medida', duplaMelhoria: true },
  ],
  esoterico: [
    { min: 1, max: 4, nome: 'Banhado a ouro' }, { min: 5, max: 19, nome: 'Canalizador' },
    { min: 20, max: 23, nome: 'Cravejado de gemas' }, { min: 24, max: 27, nome: 'Discreto' },
    { min: 28, max: 42, nome: 'Energético' }, { min: 43, max: 57, nome: 'Harmonizado' },
    { min: 58, max: 60, nome: 'Macabro' },
    { min: 61, max: 69, nome: 'Material especial', material: true },
    { min: 70, max: 85, nome: 'Poderoso' }, { min: 86, max: 100, nome: 'Vigilante' },
  ],
};
window.MATERIAIS_ESPECIAIS = ['Aço-rubi', 'Adamante', 'Gelo eterno', 'Madeira Tollon', 'Matéria vermelha', 'Mitral'];

/* --------------------------------------------------------------
   Tabela 8-6: Tesouro Médio por Cena (p.332/pdf 338) — referência de
   mestre (não entra na rolagem: compara o total acumulado do grupo
   contra esses valores esperados por nível).
-------------------------------------------------------------- */
window.TESOURO_MEDIO_CENA = [
  { nivel: 1, tesouro: 'T$ 300' }, { nivel: 2, tesouro: 'T$ 300' },
  { nivel: 3, tesouro: 'T$ 400' }, { nivel: 4, tesouro: 'T$ 1.000' },
  { nivel: 5, tesouro: 'T$ 1.000' }, { nivel: 6, tesouro: 'T$ 2.000' },
  { nivel: 7, tesouro: 'T$ 2.000' }, { nivel: 8, tesouro: 'T$ 3.000' },
  { nivel: 9, tesouro: 'T$ 3.000' }, { nivel: 10, tesouro: 'T$ 6.000' },
  { nivel: 11, tesouro: 'T$ 8.000' }, { nivel: 12, tesouro: 'T$ 9.000' },
  { nivel: 13, tesouro: 'T$ 13.000' }, { nivel: 14, tesouro: 'T$ 17.000' },
  { nivel: 15, tesouro: 'T$ 22.000' }, { nivel: 16, tesouro: 'T$ 22.000' },
  { nivel: 17, tesouro: 'T$ 40.000' }, { nivel: 18, tesouro: 'T$ 50.000' },
  { nivel: 19, tesouro: 'T$ 60.000' }, { nivel: 20, tesouro: 'T$ 72.000' },
];

/* --------------------------------------------------------------
   Tabela 8-7: Preço de Encantos (p.334/pdf 340) — referência de
   custo (não entra na rolagem: o gerador já sorteia os encantos
   prontos; isso aqui é só o "porquê" do preço, pra contexto de mesa).
-------------------------------------------------------------- */
window.TABELA_PRECO_ENCANTOS = [
  { encantos: 1, aumentoPreco: 'T$ 18.000', aumentoCD: '+10' },
  { encantos: 2, aumentoPreco: 'T$ 36.000', aumentoCD: '+15' },
  { encantos: 3, aumentoPreco: 'T$ 72.000', aumentoCD: '+20' },
];

/* ---------------------------------------------------------------
   SEÇÃO 2 — Tabelas 8-8 e 8-9: encantos e armas específicas
--------------------------------------------------------------- */

window.TABELA_ARMAS_MAGICAS_ENCANTOS = [
  { min: 1, max: 5, nome: 'Ameaçadora', descricao: 'A margem de ameaça da arma duplica. Por exemplo, uma espada longa ameaçadora tem margem de ameaça 17. Efeitos que duplicam a margem de ameaça são aplicados antes de quaisquer efeitos que a aumentem.' },
  { min: 6, max: 10, nome: 'Anticriatura', descricao: 'A arma é letal contra um tipo de criatura (ou uma raça de humanoides). Uma vez por rodada, quando você ataca uma criatura desse tipo, você pode gastar 2 PM. Se fizer isso e acertar o ataque, causa +4d8 de dano. Para determinar o tipo de criatura aleatoriamente, role 1d6: 1) animal; 2) constructo; 3) espírito; 4) monstro; 5) morto-vivo; 6) uma raça de humanoides.' },
  { min: 11, max: 12, nome: 'Arremesso', descricao: 'A arma pode ser arremessada em alcance curto. Caso já pudesse ser arremessada, seu alcance aumenta em uma categoria. Após o ataque, se estiver livre, a arma volta voando para você. Pegá-la é uma reação.' },
  { min: 13, max: 14, nome: 'Assassina', descricao: 'A arma aumenta os dados de dano extra de um ataque furtivo para d8. Além disso, quando faz um Ataque Furtivo, pode gastar 2 PM. Se fizer isso, pode rolar novamente quaisquer resultados 1 nesses dados de dano extra.' },
  { min: 15, max: 16, nome: 'Caçadora', descricao: 'A arma persegue o alvo, anulando penalidades por camuflagem leve e total e por cobertura leve. Caso a arma seja de ataque à distância, seu alcance também aumenta em uma categoria.' },
  { min: 17, max: 21, nome: 'Congelante', descricao: 'A arma causa +1d6 de dano de frio. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica enredada por uma rodada. Uma arma congelante é coberta por uma camada de gelo e névoa.' },
  { min: 22, max: 23, nome: 'Conjuradora', descricao: 'Um conjurador pode lançar na arma uma magia que tenha como alvo uma criatura ou que afete uma área. A magia não gera efeito na hora; em vez disso, fica guardada no item. Quando acerta um ataque com a arma, você pode descarregar a magia guardada como uma ação livre e sem pagar seu custo. Ela tem como alvo (ou como ponto de origem de sua área) a criatura ou ponto atingido pelo ataque. Uma vez que a magia seja descarregada, outra pode ser armazenada.' },
  { min: 24, max: 28, nome: 'Corrosiva', descricao: 'A arma causa +1d6 de dano de ácido. Uma vez por rodada, quando ataca e acertar o ataque, você pode gastar 2 PM. Se fizer isso, a vítima sofre 4d4 pontos de dano de ácido na próxima rodada. Uma arma corrosiva exala vapores e goteja líquido tóxico.' },
  { min: 29, max: 30, nome: 'Dançarina', descricao: 'Você pode gastar uma ação de movimento e 1 PM para fazer a arma flutuar e atacar uma criatura em alcance curto a sua escolha, com as mesmas estatísticas que teria se você a estivesse empunhando. Este efeito tem duração sustentada; se parar de sustentá-lo, a arma cai no chão.' },
  { min: 31, max: 34, nome: 'Defensora', descricao: 'A arma se movimenta para aparar ataques contra você. Você recebe +2 na Defesa.' },
  { min: 35, max: 36, nome: 'Destruidora', descricao: 'Se usada contra constructos e objetos (com a manobra quebrar), a arma fornece +2 no teste de ataque e causa +2d8 de dano.' },
  { min: 37, max: 38, nome: 'Dilacerante', descricao: 'A arma inflige ferimentos profundos. Quando faz um acerto crítico com a arma, você causa +10 pontos de dano.' },
  { min: 39, max: 40, nome: 'Drenante', descricao: 'Quando você faz um acerto crítico em uma criatura viva, a criatura fica fraca e você ganha 2d10 pontos de vida temporários. Uma arma drenante emite um brilho purpúreo.' },
  { min: 41, max: 45, nome: 'Elétrica', descricao: 'A arma causa +1d6 de dano de eletricidade. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, um raio atinge outra criatura em alcance curto, causando 3d8 pontos de dano de eletricidade. Uma arma elétrica emite faíscas e é coberta por arcos voltaicos.' },
  { min: 46, max: 46, nome: 'Energética', duplaMelhoria: true, preRequisito: 'formidável', descricao: 'A arma tem sua parte perigosa (a lâmina de uma espada, a ponta de uma lança...) transformada em magia pura. Ela fornece +4 em testes de ataque, ignora 20 pontos de redução de dano, e converte todo o dano causado para essência e emana luz como uma tocha. Pré-requisito: formidável.' },
  { min: 47, max: 48, nome: 'Excruciante', descricao: 'A arma inflige dor terrível. Uma criatura viva atingida fica fraca. Se já estiver fraca por este efeito, fica debilitada (a condição máxima que essa arma pode causar).' },
  { min: 49, max: 53, nome: 'Flamejante', descricao: 'A arma causa +1d6 de dano de fogo. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso, em vez do ataque normal, você dispara uma bola de fogo contra um alvo em alcance médio. O alvo sofre 6d6 pontos de dano. Um teste de Reflexos (CD For ou Des, à sua escolha) reduz à metade. Uma arma flamejante emana chamas como uma tocha.' },
  { min: 54, max: 63, nome: 'Formidável', descricao: 'A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.' },
  { min: 64, max: 64, nome: 'Lancinante', duplaMelhoria: true, preRequisito: 'dilacerante', descricao: 'Quando você faz um acerto crítico com a arma, você causa +10 pontos de dano ou, além de multiplicar os dados de dano, multiplica também quaisquer bônus numéricos, a sua escolha. Este efeito substitui o efeito de dilacerante. Pré-requisito: dilacerante.' },
  { min: 65, max: 72, nome: 'Magnífica', duplaMelhoria: true, preRequisito: 'formidável', descricao: 'A arma é encantada para desferir golpes perfeitos. Ela fornece +4 em testes de ataque e rolagens de dano. Pré-requisito: formidável.' },
  { min: 73, max: 74, nome: 'Piedosa', descricao: 'A arma causa +1d8 de dano, mas todo o dano causado é não letal. Você pode gastar 1 PM para desativar e ativar este encanto.' },
  { min: 75, max: 76, nome: 'Profana', descricao: 'A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia positiva e criaturas bondosas (a critério do mestre). A arma profana emite luz rubra pulsante.' },
  { min: 77, max: 78, nome: 'Sagrada', descricao: 'A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre). Uma arma sagrada emite uma sutil luz pura.' },
  { min: 79, max: 80, nome: 'Sanguinária', descricao: 'Uma criatura viva atingida pela arma fica sangrando. A perda de PV por sangramento causada pela arma é cumulativa — uma criatura atingida duas vezes perde 2d6 PV por sangramento por rodada.' },
  { min: 81, max: 82, nome: 'Trovejante', descricao: 'A arma emite um trovão ribombante a cada golpe. Quando você faz um acerto crítico, a vítima fica atordoada por uma rodada (apenas uma vez por cena; Fort CD For ou Des, a sua escolha, evita).' },
  { min: 83, max: 84, nome: 'Tumular', descricao: 'A arma causa +1d8 de dano de trevas. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso, o bônus de dano aumenta para +2d8, mas você perde 1d8 pontos de vida. Uma arma tumular drena o calor ao redor.' },
  { min: 85, max: 88, nome: 'Veloz', descricao: 'Você recebe a habilidade Ataque Extra, do guerreiro, mas só pode usá-la com esta arma. Se já a possuir, em vez disso, o custo para usá-la com esta arma diminui em –1 PM.' },
  { min: 89, max: 90, nome: 'Venenosa', descricao: 'Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica envenenada, perdendo 1d12 pontos de vida por rodada durante 3 rodadas. Uma arma venenosa verte um líquido verde e viscoso.' },
  { min: 91, max: 100, nome: 'Arma específica', especifica: true, descricao: 'Role na Tabela 8-9: Armas Específicas — o item perde quaisquer encantos já rolados.' },
];

window.TABELA_ARMAS_ESPECIFICAS = [
  { min: 1, max: 5, nome: 'Azagaia dos Relâmpagos', preco: 'T$ 30.000', descricao: 'Quando arremessada, esta azagaia se transforma em um Relâmpago (8d6 de dano de eletricidade numa linha com alcance médio; CD For ou Des a sua escolha). Quando atinge o fim do alcance ela volta a ser uma azagaia e volta para você no início do turno.' },
  { min: 6, max: 15, nome: 'Espada Baronial', preco: 'T$ 30.000', descricao: 'Esta espada longa de guarda reta fornece +1 em testes de ataque e rolagens de dano. Este bônus aumenta em +1 se você possuir um código de conduta (de honra, do herói...), for devoto de Khalmyr ou for treinado em Nobreza. Os bônus não são cumulativos — um personagem com um código de conduta, devoto de Khalmyr e treinado em Nobreza recebe +4 em ataque e dano.' },
  { min: 16, max: 25, nome: 'Lâmina da Luz', preco: 'T$ 45.000', descricao: 'De lâmina prateada e reluzente, esta espada bastarda formidável é concedida a cavaleiros da Luz de honra e virtude comprovadas. Você pode gastar uma ação de movimento e 2 PM para erguer a lâmina da luz acima de sua cabeça. Se fizer isso, ela irradia luz brilhante em alcance médio até o fim da cena. Todos os inimigos dentro da luz ficam ofuscados.' },
  { min: 26, max: 30, nome: 'Lança Animalesca', preco: 'T$ 45.000', descricao: 'Espinhos e folhas vivas brotam desta lança formidável. Se você usar a habilidade Forma Selvagem, aplica o bônus de +2 em ataque e dano da lança animalesca em suas armas naturais.' },
  { min: 31, max: 35, nome: 'Maça do Terror', preco: 'T$ 45.000', descricao: 'Esta maça formidável é feita com um osso e um crânio e permite que você lance a magia Amedrontar (CD For ou Car a sua escolha). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.' },
  { min: 36, max: 40, nome: 'Florete Fugaz', preco: 'T$ 50.000', descricao: 'Este florete formidável tem o cabo e a guarda trabalhados com prata e pedrarias. Quando usa a ação agredir, você pode gastar 1 PM. Se fizer isso e acertar um crítico no turno, pode fazer um ataque adicional contra a mesma criatura.' },
  { min: 41, max: 45, nome: 'Cajado da Destruição', preco: 'T$ 60.000', descricao: 'Este bordão formidável escuro e reforçado com ponteiras de metal é procurado por conjuradores de batalha. Conta como um cajado arcano. Além dos benefícios desse esotérico, quando você lança uma magia de dano, ela causa +1 ponto de dano por dado.' },
  { min: 46, max: 50, nome: 'Cajado da Vida', preco: 'T$ 60.000', descricao: 'Este bordão formidável branco com runas prateadas é valorizado por curandeiros. Conta como um cajado arcano, mas afeta magias divinas. Além disso, quando você lança uma magia de cura, ela cura +2 pontos de vida por dado.' },
  { min: 51, max: 55, nome: 'Machado Silvestre', preco: 'T$ 70.000', descricao: 'O cabo e a lâmina deste machado de batalha formidável são cobertos com gravuras representando plantas e animais selvagens. Quando usa o machado silvestre em um ambiente ermo e ao ar livre, causa +1d8 de dano e recebe o poder Trespassar. Caso já possua este poder, pode utilizá-lo sem pagar pontos de mana.' },
  { min: 56, max: 60, nome: 'Martelo de Doherimm', preco: 'T$ 70.000', descricao: 'Este martelo de guerra formidável é feito de pedra e aço. Quando empunhado por um anão, adquire o encanto arremesso e aumenta seu dano em +1d8 (ou +2d8 se usado contra criaturas Grandes ou maiores).' },
  { min: 61, max: 67, nome: 'Arco do Poder', preco: 'T$ 90.000', descricao: 'O arco do poder conta como um arco longo formidável, mas parece apenas o corpo de um arco — não tem corda e não aceita flechas. Contudo, quando você o empunha e faz o gesto de puxar a corda inexistente, o arco cria uma corda e uma flecha de energia dourada. É capaz de ler as suas intenções, produzindo diferentes tipos de flechas: Flecha Normal (3d8 de dano de essência), Flecha Piedosa (4d8 de dano de essência não letal), Flecha Explosiva (3d6 de dano de fogo no alvo e em todas as criaturas adjacentes, Reflexos CD Des reduz à metade) e Flecha-Rede (não causa dano, mas agarra a vítima numa rede de energia — Força ou Acrobacia CD 25 para se soltar; a rede se dissipa quando a criatura se solta ou no fim da cena).' },
  { min: 68, max: 72, nome: 'Língua do Deserto', preco: 'T$ 90.000', descricao: 'Esta cimitarra formidável é originária do Deserto da Perdição. Você pode gastar uma ação de movimento e 1 PM para transformar a lâmina dela em chamas até o fim da cena. Nessa condição, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Você pode gastar uma ação de movimento e 2 PM para fazer as chamas brilharem com muita força, deixando os inimigos em alcance curto desprevenidos por uma rodada.' },
  { min: 73, max: 77, nome: 'Besta Explosiva', preco: 'T$ 100.000', descricao: 'Esta besta pesada formidável é feita de madeira escurecida, similar a carvão. Você pode gastar 3 PM para transformar o virote disparado por ela em uma Bola de Fogo, mirando em um alvo ou em um ponto em alcance médio. Contra um alvo: se acertar, ele sofre o dano do disparo mais 6d6 de fogo, e todas as criaturas até 6m do alvo sofrem 6d6 de dano de fogo (Reflexos CD Des reduz à metade); se errar, o virote se desfaz em cinzas inofensivas. Num ponto: funciona como a magia Bola de Fogo, sem teste de ataque.' },
  { min: 78, max: 82, nome: 'Punhal Sszzaazita', preco: 'T$ 100.000', descricao: 'Esta adaga assassina formidável venenosa tem lâmina negra e ondulada. Você pode gastar uma ação padrão e 2 PM para transformar o punhal em um objeto inofensivo de tamanho similar, como uma colher ou pena — nenhuma magia é capaz de detectar essa transformação. Transformá-lo em arma novamente exige uma ação livre.' },
  { min: 83, max: 87, nome: 'Espada Sortuda', preco: 'T$ 110.000', descricao: 'Esta espada curta formidável é cravejada de brilhantes. Você recebe +2 nos testes de resistência e, quando faz um teste, pode gastar 3 PM para rolá-lo novamente. Se possuir o poder Sortudo, em vez disso seu custo diminui em –1 PM.' },
  { min: 88, max: 92, nome: 'Avalanche', preco: 'T$ 140.000', descricao: 'Este machado de guerra de gelo eterno congelante formidável fornece redução de fogo 10. Você pode gastar uma ação padrão e 6 PM para brandi-lo acima de sua cabeça e invocar uma tempestade de gelo que afeta alcance curto ao seu redor. Criaturas na área recebem camuflagem leve e sofrem 3d6 pontos de dano de impacto e 3d6 de frio por rodada. Você não sofre os efeitos nocivos da tempestade e pode gastar 1 PM no início de cada um dos seus turnos para mantê-la.' },
  { min: 93, max: 95, nome: 'Cajado do Poder', preco: 'T$ 180.000', descricao: 'Este bordão defensor magnífico tem cabo reto e liso, com uma joia cintilante na ponta. Conta como um cajado arcano. Além dos benefícios desse esotérico, o custo de suas magias arcanas diminui em –1 PM (cumulativo com Mestre em Escola) e a CD para resistir a elas aumenta em +2 (para um aumento total de +3).' },
  { min: 96, max: 100, nome: 'Vingadora Sagrada', preco: 'T$ 200.000', descricao: 'Esta espada longa formidável revela todo o seu poder apenas quando empunhada por um paladino. Se você for paladino, recebe +5 em testes de ataque e rolagens de dano com a arma, o custo do seu Golpe Divino é reduzido em –1 PM e você e seus aliados em alcance curto recebem resistência a magia +5.' },
];

/* ---------------------------------------------------------------
   SEÇÃO 3 — Tabelas 8-10 e 8-11: encantos e armaduras/escudos específicos
--------------------------------------------------------------- */

window.TABELA_ARMADURAS_MAGICAS_ENCANTOS = [
  { min: 1, max: 6, nome: 'Abascanto', descricao: 'Você recebe resistência a magia +5.' },
  { min: 7, max: 10, nome: 'Abençoado', descricao: 'Você recebe redução de trevas 10 e +5 em testes de resistência contra efeitos de necromancia. Um item abençoado é decorado com gravuras de símbolos sagrados de deuses do Bem.' },
  { min: 11, max: 12, nome: 'Acrobático', descricao: 'Você recebe +5 em Acrobacia e ignora a penalidade de armadura do item para testes dessa perícia.' },
  { min: 13, max: 14, nome: 'Alado', descricao: 'Você pode gastar 2 PM para fazer asas emergirem de suas costas e receber deslocamento de voo 12m com duração sustentada.' },
  { min: 15, max: 16, nome: 'Animado', apenasEscudo: true, descricao: 'Você pode gastar uma ação de movimento e 1 PM para fazer o escudo flutuar ao seu redor até o fim da cena. Você recebe o mesmo bônus na Defesa que receberia se estivesse empunhando o escudo, mas fica com as duas mãos livres. Você só pode ser protegido por um escudo ao mesmo tempo. Apenas escudos — role de novo para armaduras.' },
  { min: 17, max: 18, nome: 'Assustador', descricao: 'Você pode gastar uma ação de movimento e 2 PM para gerar uma onda de medo. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão abalados até o fim da cena. Um item assustador possui manchas de sangue, ossos pendurados e outras decorações horripilantes.' },
  { min: 19, max: 22, nome: 'Cáustica', descricao: 'Você recebe redução de ácido 10 e pode gastar uma ação de movimento e 2 PM para fazer o item gotejar ácido. Se fizer isso, seus ataques causam +1d4 de dano de ácido até o fim da cena.' },
  { min: 23, max: 32, nome: 'Defensor', descricao: 'O item é encantado para desviar golpes. O bônus na Defesa do item aumenta em +2.' },
  { min: 33, max: 34, nome: 'Escorregadio', descricao: 'Você recebe +10 em testes de Acrobacia para escapar e em testes de manobra contra agarrar. Um item escorregadio parece estar sempre coberto de óleo levemente gorduroso.' },
  { min: 35, max: 36, nome: 'Esmagador', apenasEscudo: true, descricao: 'Este escudo fornece +2 em ataques e dano e tem seu dano aumentado em um passo. Apenas escudos — role de novo para armaduras.' },
  { min: 37, max: 38, nome: 'Fantasmagórico', descricao: 'Você pode lançar a magia Manto de Sombras. Um item fantasmagórico é cinzento e esfumaçado.' },
  { min: 39, max: 40, nome: 'Fortificado', descricao: 'Você recebe 25% de chance (para escudos) e 50% de chance (para armaduras) de ignorar o dano extra de acertos críticos e ataques furtivos.' },
  { min: 41, max: 44, nome: 'Gélido', descricao: 'Você recebe redução de frio 10 e pode gastar uma ação de movimento e 2 PM para se cobrir de gelo até o fim da cena. Se fizer isso, recebe 10 PV temporários. Um item gélido é azulado e frio ao toque.' },
  { min: 45, max: 54, nome: 'Guardião', duplaMelhoria: true, preRequisito: 'defensor', descricao: 'O item emite um campo de força que desvia ataques. O bônus na Defesa do item aumenta em +4. Pré-requisito: defensor.' },
  { min: 55, max: 56, nome: 'Hipnótico', descricao: 'Você pode gastar uma ação padrão e 3 PM para emitir luzes coloridas. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão fascinados por 1d6 rodadas. O efeito termina se a criatura afetada for atacada. Um item hipnótico é espalhafatoso e colorido.' },
  { min: 57, max: 58, nome: 'Ilusório', descricao: 'Você pode gastar uma ação de movimento e 1 PM para fazer o item adquirir a aparência de uma roupa comum, mantendo suas propriedades (bônus na Defesa, penalidade de armadura...). A magia Visão da Verdade revela o item disfarçado.' },
  { min: 59, max: 62, nome: 'Incandescente', descricao: 'Você recebe redução de fogo 10 e pode gastar uma ação de movimento e 2 PM para fazer o item emitir labaredas até o fim da cena. Se fizer isso, no início de cada um dos seus turnos você causa 1d6 pontos de dano de fogo em todas as criaturas adjacentes. Um item incandescente é avermelhado e quente ao toque.' },
  { min: 63, max: 68, nome: 'Invulnerável', descricao: 'Você recebe redução de dano 2 (para escudos) ou 5 (para armaduras).' },
  { min: 69, max: 72, nome: 'Opaco', descricao: 'Você recebe redução de ácido, eletricidade, fogo e frio 10. Um item opaco parece sem cor, totalmente comum e desinteressante.' },
  { min: 73, max: 78, nome: 'Protetor', descricao: 'Você recebe +2 em testes de resistência.' },
  { min: 79, max: 80, nome: 'Refletor', descricao: 'Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela.' },
  { min: 81, max: 84, nome: 'Relampejante', descricao: 'Você recebe redução de eletricidade 10 e pode gastar uma ação de movimento e 2 PM para gerar arcos voltaicos até o fim da cena. Se fizer isso, qualquer criatura que o ataque em corpo a corpo sofre 2d6 pontos de dano de eletricidade. Um item relampejante é decorado com ouro, prata e cobre.' },
  { min: 85, max: 86, nome: 'Reluzente', descricao: 'Você pode gastar uma ação de movimento e 2 PM para emitir um clarão de luz. Todos os inimigos em alcance curto devem passar num teste de Reflexos (CD Car) ou ficarão cegos por uma rodada. Um item reluzente é polido e brilhante.' },
  { min: 87, max: 88, nome: 'Sombrio', descricao: 'Você recebe +5 em Furtividade e ignora a penalidade de armadura do item para testes dessa perícia. Um item sombrio é escuro, fosco e bem lubrificado, para não fazer barulho.' },
  { min: 89, max: 90, nome: 'Zeloso', descricao: 'Uma vez por rodada, se um aliado adjacente for alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque, que então é resolvido normalmente.' },
  { min: 91, max: 100, nome: 'Item específico', especifica: true, descricao: 'Role na Tabela 8-11: Armaduras & Escudos Específicos — o item perde quaisquer encantos já rolados.' },
];

window.TABELA_ARMADURAS_ESPECIFICAS = [
  { min: 1, max: 10, nome: 'Cota Élfica', preco: 'T$ 30.000', descricao: 'Composta de anéis finíssimos, esta cota de malha defensora de mitral parece ser feita de seda. Ela permite que você aplique sua Destreza na Defesa como se fosse uma armadura leve.' },
  { min: 11, max: 20, nome: 'Couro de Monstro', preco: 'T$ 36.000', descricao: 'Usado por chefes bárbaros das Montanhas Sanguinárias, este gibão de peles defensor é feito do couro de monstros, como basiliscos e serpes. Se você usar o poder Ataque Poderoso ou fizer uma investida, recebe um bônus de +2d6 nas rolagens de dano.' },
  { min: 21, max: 25, nome: 'Escudo do Conjurador', preco: 'T$ 45.000', descricao: 'Este escudo leve defensor tem uma pequena tira de couro na parte interna, sobre a qual um conjurador pode lançar uma magia. A magia não surte efeito na hora; em vez disso, fica inscrita na tira, que pode então ser lida como um pergaminho, descarregando a magia em seus alvos/área. Uma vez descarregada, outra pode ser armazenada.' },
  { min: 26, max: 32, nome: 'Loriga do Centurião', preco: 'T$ 45.000', descricao: 'Esta loriga segmentada defensora é dourada com detalhes em vermelho e possui o símbolo de Tauron, antigo Deus da Força, gravado no peitoral. Se estiver liderando uma ou mais criaturas (usando o poder Comandar ou similar), seus ataques corpo a corpo causam +2d6 de fogo.' },
  { min: 33, max: 42, nome: 'Manto da Noite', preco: 'T$ 45.000', descricao: 'Este couro batido ajustado defensor sombrio é negro com partes metálicas foscas. Quando usa esta armadura, você não sofre penalidade para se mover em seu deslocamento normal em testes de Furtividade, e a penalidade que sofre em testes de Furtividade por atacar diminui para –10.' },
  { min: 43, max: 49, nome: 'Couraça do Comando', preco: 'T$ 45.000', descricao: 'Esta couraça banhada a ouro sob medida defensora irradia uma aura de autoridade. Você recebe +1 em Carisma. Se usar o poder Comandar, o bônus fornecido aumenta para +2.' },
  { min: 50, max: 59, nome: 'Baluarte Anão', preco: 'T$ 50.000', descricao: 'Esta armadura completa reforçada defensora de adamante fornece proteção sem igual. Se você não se deslocar em seu turno, a RD que ela fornece aumenta para 10 até o seu próximo turno.' },
  { min: 60, max: 66, nome: 'Escudo Espinhoso', preco: 'T$ 50.000', descricao: 'Este escudo pesado defensor é coberto de espinhos. Você pode gastar uma ação de movimento e 2 PM para disparar um espinho em um alvo em alcance curto. O espinho acerta automaticamente e causa 1d10+2 pontos de dano de perfuração.' },
  { min: 67, max: 76, nome: 'Escudo do Leão', preco: 'T$ 50.000', descricao: 'Este escudo pesado defensor é forjado como uma cabeça de leão rugindo. Uma vez por rodada, você pode gastar 2 PM para fazer a cabeça criar vida e morder uma criatura adjacente. A mordida acerta automaticamente e causa 2d6+2 pontos de dano de perfuração.' },
  { min: 77, max: 83, nome: 'Carapaça Demoníaca', preco: 'T$ 63.000', descricao: 'Esta armadura completa macabra reforçada guardiã é forjada para fazer com que o usuário pareça um demônio — o elmo tem o formato de uma cabeça demoníaca com chifres e o usuário enxerga através da boca aberta e repleta de dentes. Se for devoto de uma divindade que canaliza apenas energia negativa, seus ataques corpo a corpo causam +1d8 de dano de trevas.' },
  { min: 84, max: 88, nome: 'Escudo do Eclipse', preco: 'T$ 70.000', descricao: 'Este escudo pesado defensor é completamente negro e parece absorver a luz. Ele fornece redução de trevas 10 e causa +1d8 de dano de trevas num ataque. Além disso, você pode gastar uma ação de movimento e 2 PM para lançar Escuridão.' },
  { min: 89, max: 93, nome: 'Escudo de Azgher', preco: 'T$ 140.000', descricao: 'Este escudo pesado guardião é forjado na forma de um sol estilizado. Você pode gastar uma ação padrão e 10 PM para fazê-lo emitir uma luz brilhante e quente num cone em alcance curto. A luz gera os efeitos da magia Visão da Verdade e causa 6d6 pontos de dano de fogo em todos os seus inimigos (mortos-vivos e criaturas vulneráveis à luz solar sofrem 6d8 pontos de dano).' },
  { min: 94, max: 100, nome: 'Armadura da Luz', preco: 'T$ 150.000', descricao: 'Esta armadura completa banhada a ouro reforçada guardiã zelosa possui o símbolo de Khalmyr gravado no peitoral. Se você possuir um código de conduta (de honra, do herói...) ou for devoto de uma divindade que canaliza apenas energia positiva, recebe redução de dano igual ao seu Carisma.' },
];

/* ---------------------------------------------------------------
   SEÇÃO 4 — Tabelas 8-13, 8-14 e 8-15: acessórios + descrições
--------------------------------------------------------------- */

window.TABELA_ACESSORIOS_MENORES = [
  { min: 1, max: 2, nome: 'Anel do Sustento', preco: 'T$ 3.000' },
  { min: 3, max: 7, nome: 'Bainha Mágica', preco: 'T$ 3.000' },
  { min: 8, max: 12, nome: 'Corda da Escalada', preco: 'T$ 3.000' },
  { min: 13, max: 14, nome: 'Ferraduras da Velocidade', preco: 'T$ 3.000' },
  { min: 15, max: 19, nome: 'Garrafa da Fumaça Eterna', preco: 'T$ 3.000' },
  { min: 20, max: 24, nome: 'Gema da Luminosidade', preco: 'T$ 3.000' },
  { min: 25, max: 29, nome: 'Manto Élfico', preco: 'T$ 3.000' },
  { min: 30, max: 34, nome: 'Mochila de Carga', preco: 'T$ 3.000' },
  { min: 35, max: 40, nome: 'Brincos da Sagacidade', preco: 'T$ 4.500' },
  { min: 41, max: 46, nome: 'Luvas da Delicadeza', preco: 'T$ 4.500' },
  { min: 47, max: 52, nome: 'Manoplas da Força do Ogro', preco: 'T$ 4.500' },
  { min: 53, max: 59, nome: 'Manto da Resistência', preco: 'T$ 4.500' },
  { min: 60, max: 65, nome: 'Manto do Fascínio', preco: 'T$ 4.500' },
  { min: 66, max: 71, nome: 'Pingente da Sensatez', preco: 'T$ 4.500' },
  { min: 72, max: 77, nome: 'Torque do Vigor', preco: 'T$ 4.500' },
  { min: 78, max: 82, nome: 'Chapéu do Disfarce', preco: 'T$ 6.000' },
  { min: 83, max: 84, nome: 'Flauta Fantasma', preco: 'T$ 6.000' },
  { min: 85, max: 89, nome: 'Lanterna da Revelação', preco: 'T$ 6.000' },
  { min: 90, max: 96, nome: 'Anel da Proteção', preco: 'T$ 9.000' },
  { min: 97, max: 98, nome: 'Anel do Escudo Mental', preco: 'T$ 9.000' },
  { min: 99, max: 100, nome: 'Pingente da Saúde', preco: 'T$ 9.000' },
];

window.TABELA_ACESSORIOS_MEDIOS = [
  { min: 1, max: 4, nome: 'Anel da Telecinesia', preco: 'T$ 10.500' },
  { min: 5, max: 8, nome: 'Bola de Cristal', preco: 'T$ 10.500' },
  { min: 9, max: 10, nome: 'Caveira Maldita', preco: 'T$ 10.500' },
  { min: 11, max: 14, nome: 'Botas Aladas', preco: 'T$ 15.000' },
  { min: 15, max: 18, nome: 'Braceletes de Bronze', preco: 'T$ 16.500' },
  { min: 19, max: 24, nome: 'Anel da Energia', preco: 'T$ 21.000' },
  { min: 25, max: 30, nome: 'Anel da Vitalidade', preco: 'T$ 21.000' },
  { min: 31, max: 34, nome: 'Anel de Invisibilidade', preco: 'T$ 21.000' },
  { min: 35, max: 38, nome: 'Braçadeiras do Arqueiro', preco: 'T$ 21.000' },
  { min: 39, max: 42, nome: 'Brincos de Marah', preco: 'T$ 21.000' },
  { min: 43, max: 46, nome: 'Faixas do Pugilista', preco: 'T$ 21.000' },
  { min: 47, max: 50, nome: 'Manto da Aranha', preco: 'T$ 21.000' },
  { min: 51, max: 54, nome: 'Vassoura Voadora', preco: 'T$ 21.000' },
  { min: 55, max: 58, nome: 'Símbolo Abençoado', preco: 'T$ 21.000' },
  { min: 59, max: 64, nome: 'Amuleto da Robustez', preco: 'T$ 25.500' },
  { min: 65, max: 68, nome: 'Botas Velozes', preco: 'T$ 25.500' },
  { min: 69, max: 74, nome: 'Cinto da Força do Gigante', preco: 'T$ 25.500' },
  { min: 75, max: 80, nome: 'Coroa Majestosa', preco: 'T$ 25.500' },
  { min: 81, max: 86, nome: 'Estola da Serenidade', preco: 'T$ 25.500' },
  { min: 87, max: 88, nome: 'Manto do Morcego', preco: 'T$ 25.500' },
  { min: 89, max: 94, nome: 'Pulseiras da Celeridade', preco: 'T$ 25.500' },
  { min: 95, max: 100, nome: 'Tiara da Sapiência', preco: 'T$ 25.500' },
];

window.TABELA_ACESSORIOS_MAIORES = [
  { min: 1, max: 2, nome: 'Elmo do Teletransporte', preco: 'T$ 30.000' },
  { min: 3, max: 4, nome: 'Gema da Telepatia', preco: 'T$ 30.000' },
  { min: 5, max: 9, nome: 'Gema Elemental', preco: 'T$ 30.000' },
  { min: 10, max: 15, nome: 'Manual da Saúde Corporal', preco: 'T$ 30.000' },
  { min: 16, max: 21, nome: 'Manual do Bom Exercício', preco: 'T$ 30.000' },
  { min: 22, max: 27, nome: 'Manual dos Movimentos Precisos', preco: 'T$ 30.000' },
  { min: 28, max: 34, nome: 'Medalhão de Lena', preco: 'T$ 30.000' },
  { min: 35, max: 40, nome: 'Tomo da Compreensão', preco: 'T$ 30.000' },
  { min: 41, max: 46, nome: 'Tomo da Liderança e Influência', preco: 'T$ 30.000' },
  { min: 47, max: 52, nome: 'Tomo dos Grandes Pensamentos', preco: 'T$ 30.000' },
  { min: 53, max: 57, nome: 'Anel Refletor', preco: 'T$ 51.000' },
  { min: 58, max: 60, nome: 'Cinto do Campeão', preco: 'T$ 51.000' },
  { min: 61, max: 67, nome: 'Colar Guardião', preco: 'T$ 51.000' },
  { min: 68, max: 72, nome: 'Estatueta Animista', preco: 'T$ 51.000' },
  { min: 73, max: 77, nome: 'Anel da Liberdade', preco: 'T$ 60.000' },
  { min: 78, max: 82, nome: 'Tapete Voador', preco: 'T$ 60.000' },
  { min: 83, max: 87, nome: 'Braceletes de Ouro', preco: 'T$ 64.500' },
  { min: 88, max: 89, nome: 'Espelho da Oposição', preco: 'T$ 75.000' },
  { min: 90, max: 94, nome: 'Robe do Arquimago', preco: 'T$ 90.000' },
  { min: 95, max: 96, nome: 'Orbe das Tempestades', preco: 'T$ 97.500' },
  { min: 97, max: 98, nome: 'Anel da Regeneração', preco: 'T$ 150.000' },
  { min: 99, max: 100, nome: 'Espelho do Aprisionamento', preco: 'T$ 150.000' },
];

window.ACESSORIOS_DESCRICOES = {
  'Amuleto da Robustez': 'Este disco com corrente de ouro é usado como um colar. Você recebe +2 em Constituição (somente após um dia de uso).',
  'Anel da Energia': 'Você recebe +5 PM (somente após um dia de uso).',
  'Anel da Liberdade': 'Forjado em ouro, este anel é uma relíquia da Igreja de Valkaria. Você fica permanentemente sob efeito de Libertação.',
  'Anel da Proteção': 'Este anel desvia ataques contra seu usuário. Você recebe +2 de Defesa.',
  'Anel da Regeneração': 'Você recebe Cura Acelerada 5 (somente após um dia de uso).',
  'Anel da Telecinesia': 'Você pode lançar Telecinesia (CD Int). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.',
  'Anel da Vitalidade': 'Você recebe +10 PV (somente após um dia de uso).',
  'Anel de Invisibilidade': 'Ao colocar este anel de prata, você fica sob efeito de Invisibilidade. O efeito termina se você fizer um ataque ou lançar uma magia ofensiva, mas você pode tirar e recolocar o anel (uma ação padrão) para que ele volte a funcionar.',
  'Anel do Escudo Mental': 'Você recebe imunidade a magias de adivinhação.',
  'Anel do Sustento': 'Você não precisa comer ou beber e precisa dormir apenas duas horas por noite para descansar. Os efeitos do anel só se ativam após uma semana de uso.',
  'Anel Refletor': 'Este aro de platina é poderoso contra conjuradores. Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao seu conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela.',
  'Bainha Mágica': 'Esta bainha de couro curtido e prata muda de tamanho para acomodar qualquer arma corpo a corpo. Você pode lançar Arma Mágica em qualquer arma na bainha sem pagar seu custo em PM.',
  'Bola de Cristal': 'Esta pequena esfera revela pessoas e lugares distantes. Olhar através dela é uma ação completa e gera a ação da magia Vidência (CD Sab).',
  'Botas Aladas': 'Você pode gastar 2 PM para fazer asas brotarem dos calcanhares destas botas e receber deslocamento de voo 12m por uma rodada. Você pode gastar 1 PM no início de cada um dos seus turnos para manter esse efeito.',
  'Botas Velozes': 'Você recebe +3m em seu deslocamento e pode lançar Velocidade (apenas sobre você mesmo).',
  'Braçadeiras do Arqueiro': 'Você recebe +2 em rolagens de dano com armas de ataque à distância (cumulativo com outros itens).',
  'Braceletes de Bronze': 'Estes braceletes geram um campo de força invisível, porém tangível. Você recebe +4 na Defesa, cumulativo com outros itens mágicos, mas não com armaduras.',
  'Braceletes de Ouro': 'Como braceletes de bronze, mas fornece +8 na Defesa, não cumulativo com braceletes de bronze.',
  'Brincos da Sagacidade': 'Este par de brincos de safira aguça o raciocínio. Você recebe +1 em Inteligência (somente após um dia de uso).',
  'Brincos de Marah': 'Este par de brincos brancos é abençoado pela Deusa da Paz. A primeira criatura que atacar em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá a ação. Se você atacar uma criatura, o efeito dos brincos é cancelado por um dia. Se você possuir Aparência Inofensiva (ou um poder similar), os efeitos acumulam, afetando as duas primeiras criaturas que o atacarem em uma cena.',
  'Caveira Maldita': 'Esta pedra esculpida em formato de crânio gera o efeito da magia Profanar, com o crânio como ponto de origem. Mortos-vivos e devotos de deuses que canalizam apenas energia negativa na área recebem +2 em testes e Defesa.',
  'Chapéu do Disfarce': 'Você pode lançar Disfarce Ilusório (CD Car), com o aprimoramento que inclui odores e sensações e muda o bônus em Enganação para disfarces para +20, sem pagar seu custo em PM. Você não pode usar outros aprimoramentos. Como parte do disfarce, o chapéu pode mudar para um elmo, faixa, tiara, gorro, touca e assim por diante.',
  'Cinto da Força do Gigante': 'Este cinto largo é feito de couro com rebites de ferro. Você recebe +2 em Força (somente após um dia de uso).',
  'Cinto do Campeão': 'Este cinturão de ouro é cravejado de joias e possui gravuras de gladiadores e pugilistas minotauros. Você recebe +1 em Força e a habilidade Briga (somente após um dia de uso). Caso já a possua, seu dano desarmado será calculado como se você possuísse quatro níveis de lutador a mais (máximo 2d12). Caso possua o poder Torcida, o bônus aumenta para +3. Estes cintos eram dados aos vencedores dos jogos gladiatoriais do Império de Tauron.',
  'Colar Guardião': 'Este diamante lapidado preso em uma corrente de platina deflete ataques contra seu usuário. Você recebe +5 na Defesa.',
  'Corda da Escalada': 'Esta corda de 15m é bastante fina, mas forte o suficiente para suportar até seis criaturas Médias (ou 120 espaços). Com um comando (uma ação de movimento), a corda se move em qualquer direção (incluindo para cima) a 3m por rodada, fixando-se firmemente onde você quiser. Ela pode se desamarrar e voltar da mesma forma.',
  'Coroa Majestosa': 'Esta coroa de ouro possui dezenas de pedras preciosas. Você recebe +2 em Carisma (somente após um dia de uso).',
  'Elmo do Teletransporte': 'Você pode lançar Salto Dimensional e Teletransporte, mas apenas em você mesmo. Caso já conheça as magias, o custo para lançá-las diminui em –1 PM.',
  'Espelho da Oposição': 'Este item lembra um espelho normal com cerca de 1m de comprimento e 1,5m de altura. Pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Quando uma criatura observa seu reflexo, o espelho cria uma cópia sua, com as mesmas habilidades e equipamento. A duplicata ataca a criatura original; quando um dos dois é derrotado, a duplicata e seus itens desaparecem.',
  'Espelho do Aprisionamento': 'Este item de cristal, com 1,5m de altura e moldura de metal, pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Qualquer criatura que se aproxime a alcance curto do espelho e enxergue seu próprio reflexo deve passar por um teste de Reflexos (CD Int) ou será transportada magicamente para um espaço extradimensional dentro do espelho, ficando presa ali (constructos, mortos-vivos e objetos não podem ser transportados). Se o espelho for quebrado, todas as criaturas dentro dele são libertadas. Com um comando, é possível conversar com uma criatura presa no espelho ou libertá-la.',
  'Estatueta Animista': 'Esta estátua de pedra é esculpida na forma de um animal. Quando é atirada no chão e a palavra de comando é proferida, transforma-se no animal correspondente. O animal fornece os benefícios de um parceiro veterano até o fim da cena, quando então volta a sua forma de estatueta. O tipo de parceiro é definido pelo animal (raposa: ajudante; onça: assassino; águia: atirador; lobo: combatente; leão: fortão; urso: guardião).',
  'Estola da Serenidade': 'Esta faixa de pano com inscrições mágicas é usada sobre a nuca, com as duas extremidades caindo na frente do corpo. Você recebe +2 em Sabedoria (somente após um dia de uso).',
  'Faixas do Pugilista': 'Estas faixas surradas são amarradas nos punhos, nos braços ou na testa. Você recebe +2 em testes de ataque e rolagens de dano com ataques desarmados (cumulativo com outros itens).',
  'Ferraduras da Velocidade': 'Este conjunto de ferraduras pode ser fixado nos cascos de um cavalo (ou outro parceiro montaria, a critério do mestre) para aumentar seu deslocamento em +3m.',
  'Flauta Fantasma': 'Se for treinado em Atuação, você pode lançar Esculpir Sons (CD Car) sem pagar seu custo em PM.',
  'Garrafa da Fumaça Eterna': 'Você pode abrir a tampa desta ânfora de metal para lançar a magia Névoa sem pagar seu custo em PM. A fumaça persiste até a garrafa ser tampada. Após isso, dissipa-se no fim da cena (ou após 4 rodadas, sob vento forte, ou 1 rodada, sob um vendaval).',
  'Gema da Luminosidade': 'Este cristal tem a aparência de um longo prisma. Com um comando, emite luz equivalente a uma tocha ou então um raio brilhante, que deixa uma criatura em alcance curto cega por 1d4 rodadas (Fort CD Car evita).',
  'Gema da Telepatia': 'Você pode lançar Compreensão e Enfeitiçar (CD Car) sem pagar seu custo em PM.',
  'Gema Elemental': 'Você pode lançar Conjurar Elemental sem pagar seu custo em PM.',
  'Lanterna da Revelação': 'Este item funciona como um lampião normal, mas sua luz revela todas as criaturas e objetos invisíveis no alcance.',
  'Luvas da Delicadeza': 'Estas luvas de tecido fino permitem manipulação delicada. Você recebe +1 em Destreza (somente após um dia de uso).',
  'Manoplas da Força do Ogro': 'Este par de luvas é feito de couro grosso com rebites de ferro. Você recebe +1 em Força (somente após um dia de uso).',
  'Manto da Aranha': 'Este manto é feito de seda negra com fios de prata bordados. Você recebe deslocamento de escalada igual ao seu deslocamento terrestre, +5 em testes de resistência contra venenos e imunidade a teias mundanas ou mágicas. Além disso, caso já conheça a magia, pode lançar Teia (CD Des) com o custo reduzido em –1 PM.',
  'Manto da Resistência': 'Este manto de tecido grosso e pesado protege seu usuário. Você recebe +2 em testes de resistência.',
  'Manto do Fascínio': 'Este manto de veludo possui bordados de ouro. Você recebe +1 em Carisma (somente após um dia de uso).',
  'Manto do Morcego': 'Este manto marrom escuro ou negro fornece +5 em Furtividade e permite que você fique pendurado de ponta-cabeça no teto, como um morcego. Além disso, você pode gastar uma ação padrão para segurar as pontas do manto e se transformar em um morcego: seu tamanho muda para Minúsculo e você recebe deslocamento de voo 12m e uma arma natural de mordida (dano 1d4, perfuração) — funciona como a Forma Selvagem do druida. Você só pode se transformar em morcego à noite ou em ambientes escuros.',
  'Manto Élfico': 'Indistinguível de um manto cinza comum. Entretanto, quando usado com o capuz cobrindo o rosto, fornece +5 em Furtividade.',
  'Manual da Saúde Corporal': 'Este tomo volumoso contém exercícios de resistência e dietas saudáveis, mas suas páginas trazem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Constituição.',
  'Manual do Bom Exercício': 'Este tomo volumoso contém exercícios de musculação, mas escondido entre as palavras há um poderoso efeito mágico. Ler o livro leva uma semana e aumenta o valor de Força em +1 permanentemente (o atributo só pode ser aumentado uma vez com um Manual). Assim que o livro é lido, a magia desaparece de suas páginas e ele se torna um item mundano.',
  'Manual dos Movimentos Precisos': 'Este tomo volumoso descreve exercícios de coordenação e equilíbrio, mas mesclados às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Destreza.',
  'Medalhão de Lena': 'Quando você é reduzido a 0 ou menos PV, esta joia emite uma explosão de energia positiva que cura 100 PV (antes que caia). Este poder só se ativa uma vez por dia.',
  'Mochila de Carga': 'Este item, que parece uma simples mochila de pano, está na verdade ligado a um espaço interdimensional — fazendo com que seja maior por dentro do que por fora. A mochila de carga aumenta sua capacidade de carga em 10 espaços (ela própria não gasta um espaço). Se a mochila for rasgada, os objetos em seu interior são destruídos. Criaturas vivas colocadas no interior da mochila podem sobreviver até 10 minutos, mas depois disso ficarão sem ar.',
  'Orbe das Tempestades': 'Esta esfera de vidro com 20cm de diâmetro contém fumaça e raios em seu interior. Você pode lançar Controlar o Clima e Fúria do Panteão (CD Sab). Caso já conheça as magias, o custo para lançá-las diminui em –1 PM. Além disso, você e todos os seus aliados adjacentes ficam sob efeito de Suporte Ambiental.',
  'Pingente da Saúde': 'O usuário desta joia verde num cordão de prata recebe imunidade a doenças e venenos. Os efeitos só se ativam após uma semana de uso.',
  'Pingente da Sensatez': 'Esta pequena pérola com uma corrente leve é usada como um colar. Você recebe +1 em Sabedoria (somente após um dia de uso).',
  'Pulseiras da Celeridade': 'Esta pulseira de platina aguça todos os seus movimentos. Você recebe +2 em Destreza (somente após um dia de uso).',
  'Robe do Arquimago': 'Este traje pesado alinha-se com as energias arcanas emitidas por seu usuário para gerar um campo protetor. Se você for conjurador arcano, recebe um bônus na Defesa igual a 5 + o círculo de magia mais alto que puder lançar, e um bônus em testes de resistência igual à metade do bônus na Defesa. Assim, um arcanista de 9º nível (capaz de lançar magias de 3º círculo) recebe +8 na Defesa e +4 em testes de resistência.',
  'Símbolo Abençoado': 'Conta com um símbolo sagrado. Se você for devoto do deus, o custo de suas magias divinas diminui em –1 PM (cumulativo com o poder Símbolo Sagrado Energizado). Apenas devotos desse deus podem fabricar um símbolo abençoado.',
  'Tapete Voador': 'Com um comando, este tapete flutua, fornecendo deslocamento de voo 12m. O tapete tem 3m x 3m e pode carregar seis criaturas Médias (ou 120 espaços). Se você estiver a alcance longo do tapete, pode comandar o voo dele.',
  'Tiara da Sapiência': 'Esta tiara delicada possui uma gema que descansa sobre a testa. Você recebe +2 em Inteligência (somente após um dia de uso).',
  'Tomo da Compreensão': 'Este livro volumoso contém ensinamentos para tornar o leitor mais centrado e aguçar sua percepção, mas também possui um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Sabedoria.',
  'Tomo da Liderança e Influência': 'Este livro de encadernação luxuosa contém instruções detalhadas para convencer e inspirar os demais, mas as páginas escondem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Carisma.',
  'Tomo dos Grandes Pensamentos': 'Este livro pesado contém exercícios para aprimorar o raciocínio e a memória, mas mesclado às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Inteligência.',
  'Torque do Vigor': 'O acabamento deste colar ou bracelete remete a um animal poderoso, como um urso ou lobo. Você recebe +1 em Constituição (somente após um dia de uso).',
  'Vassoura Voadora': 'Como um tapete voador, mas pode carregar duas pessoas (ou 40 espaços).',
};

/* ---------------------------------------------------------------
   SEÇÃO 5 — Tabela 8-12: poções
--------------------------------------------------------------- */

window.TABELA_POCOES = [
  { min: 1, max: 1, nome: 'Abençoar Alimentos (óleo)', preco: 'T$ 30' },
  { min: 2, max: 3, nome: 'Área Escorregadia (granada)', preco: 'T$ 30' },
  { min: 4, max: 6, nome: 'Arma Mágica (óleo)', preco: 'T$ 30' },
  { min: 7, max: 7, nome: 'Compreensão', preco: 'T$ 30' },
  { min: 8, max: 15, nome: 'Curar Ferimentos (2d8+2 PV)', preco: 'T$ 30' },
  { min: 16, max: 18, nome: 'Disfarce Ilusório', preco: 'T$ 30' },
  { min: 19, max: 20, nome: 'Escuridão (óleo)', preco: 'T$ 30' },
  { min: 21, max: 22, nome: 'Luz (óleo)', preco: 'T$ 30' },
  { min: 23, max: 24, nome: 'Névoa (granada)', preco: 'T$ 30' },
  { min: 25, max: 26, nome: 'Primor Atlético', preco: 'T$ 30' },
  { min: 27, max: 28, nome: 'Proteção Divina', preco: 'T$ 30' },
  { min: 29, max: 30, nome: 'Resistência a Energia', preco: 'T$ 30' },
  { min: 31, max: 32, nome: 'Sono', preco: 'T$ 30' },
  { min: 33, max: 33, nome: 'Suporte Ambiental', preco: 'T$ 30' },
  { min: 34, max: 34, nome: 'Tranca Arcana (óleo)', preco: 'T$ 30' },
  { min: 35, max: 35, nome: 'Visão Mística', preco: 'T$ 30' },
  { min: 36, max: 36, nome: 'Vitalidade Fantasma', preco: 'T$ 30' },
  { min: 37, max: 38, nome: 'Escudo da Fé (aprimoramento para duração cena)', preco: 'T$ 120' },
  { min: 39, max: 40, nome: 'Alterar Tamanho', preco: 'T$ 270' },
  { min: 41, max: 42, nome: 'Aparência Perfeita', preco: 'T$ 270' },
  { min: 43, max: 43, nome: 'Armamento da Natureza (óleo)', preco: 'T$ 270' },
  { min: 44, max: 49, nome: 'Bola de Fogo (granada)', preco: 'T$ 270' },
  { min: 50, max: 51, nome: 'Camuflagem Ilusória', preco: 'T$ 270' },
  { min: 52, max: 53, nome: 'Concentração de Combate (aprimoramento para duração cena)', preco: 'T$ 270' },
  { min: 54, max: 62, nome: 'Curar Ferimentos (4d8+4 PV)', preco: 'T$ 270' },
  { min: 63, max: 66, nome: 'Físico Divino', preco: 'T$ 270' },
  { min: 67, max: 68, nome: 'Mente Divina', preco: 'T$ 270' },
  { min: 69, max: 70, nome: 'Metamorfose', preco: 'T$ 270' },
  { min: 71, max: 75, nome: 'Purificação', preco: 'T$ 270' },
  { min: 76, max: 77, nome: 'Velocidade', preco: 'T$ 270' },
  { min: 78, max: 79, nome: 'Vestimenta da Fé (óleo)', preco: 'T$ 270' },
  { min: 80, max: 80, nome: 'Voz Divina', preco: 'T$ 270' },
  { min: 81, max: 82, nome: 'Arma Mágica (óleo; aprimoramento para bônus +3)', preco: 'T$ 750' },
  { min: 83, max: 88, nome: 'Curar Ferimentos (7d8+7 PV)', preco: 'T$ 1.080' },
  { min: 89, max: 89, nome: 'Físico Divino (aprimoramento para três atributos)', preco: 'T$ 1.080' },
  { min: 90, max: 92, nome: 'Invisibilidade', preco: 'T$ 1.080' },
  { min: 93, max: 96, nome: 'Bola de Fogo (granada; aprimoramento para 10d6 de dano)', preco: 'T$ 1.470' },
  { min: 97, max: 100, nome: 'Curar Ferimentos (11d8+11 PV)', preco: 'T$ 3.000' },
];
