/* ============================================================
   TORMENTA 20 — condicoes.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Apêndice: Condições, pp. 394–395
   Cada entrada: { id, nome, categoria, descricao, pagina, fonte? }
   fonte: OPCIONAL — ausente em toda condição do livro-base (a badge de
   fonte assume 'Tormenta 20' quando o campo não existe, ver
   renderCondicaoCard em compendio.js). Preparado pra próximos
   suplementos, mesmo sem nenhuma condição assim ainda.
   categoria: a "família" que o próprio livro cita entre parênteses no
   fim do efeito (Medo, Mental, Movimento, Sentidos, Metabolismo, Veneno,
   Cansaço, Metamorfose) — quando o livro não cita nenhuma, o campo fica
   'geral' (não inventamos uma categoria que o livro não deu).
   Texto de `descricao` reproduz o efeito mecânico tal como no livro, sem
   a marcação de "(Se X novamente, fica Y)" reescrita — mantida como o
   livro descreve, condição por condição.
============================================================ */

window.CONDICOES = [
  { id: 'abalado', nome: 'Abalado', categoria: 'medo',
    descricao: 'Sofre –2 em testes de perícia. Se ficar abalado novamente, fica Apavorado.', pagina: 394 },
  { id: 'agarrado', nome: 'Agarrado', categoria: 'movimento',
    descricao: 'Fica Desprevenido e Imóvel, sofre –2 em testes de ataque e só pode usar armas leves.', pagina: 394 },
  { id: 'alquebrado', nome: 'Alquebrado', categoria: 'mental',
    descricao: 'O custo em Pontos de Mana das habilidades aumenta em +1.', pagina: 394 },
  { id: 'apavorado', nome: 'Apavorado', categoria: 'medo',
    descricao: 'Sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo.', pagina: 394 },
  { id: 'atordoado', nome: 'Atordoado', categoria: 'mental',
    descricao: 'Fica Desprevenido e não pode fazer ações.', pagina: 394 },
  { id: 'caido', nome: 'Caído', categoria: 'geral',
    descricao: 'Sofre –5 na Defesa contra ataques corpo a corpo e –5 em ataques corpo a corpo. Recebe +5 na Defesa contra ataques à distância.', pagina: 394 },
  { id: 'cego', nome: 'Cego', categoria: 'sentidos',
    descricao: 'Fica Desprevenido e Lento. Sofre –5 em testes de perícia baseados em Força ou Destreza. Todos os alvos são considerados sob camuflagem total.', pagina: 394 },
  { id: 'confuso', nome: 'Confuso', categoria: 'mental',
    descricao: 'Age de modo aleatório: role 1d6 no início do turno para determinar a ação.', pagina: 394 },
  { id: 'debilitado', nome: 'Debilitado', categoria: 'geral',
    descricao: 'Sofre –5 em Força, Destreza e Constituição. Se ficar debilitado novamente, fica Inconsciente.', pagina: 394 },
  { id: 'desprevenido', nome: 'Desprevenido', categoria: 'geral',
    descricao: 'Sofre –5 na Defesa e em Reflexos.', pagina: 394 },
  { id: 'doente', nome: 'Doente', categoria: 'metabolismo',
    descricao: 'Está sob efeito de uma doença com efeitos variáveis, descritos na doença específica.', pagina: 394 },
  { id: 'em-chamas', nome: 'Em Chamas', categoria: 'geral',
    descricao: 'Sofre 1d6 pontos de dano de fogo no início de cada turno. Uma ação padrão apaga as chamas.', pagina: 394 },
  { id: 'enfeiticado', nome: 'Enfeitiçado', categoria: 'mental',
    descricao: 'Torna-se prestativo em relação à fonte do encantamento. A fonte recebe +10 em testes de Diplomacia contra o enfeitiçado.', pagina: 394 },
  { id: 'enjoado', nome: 'Enjoado', categoria: 'metabolismo',
    descricao: 'Só pode realizar uma ação padrão ou uma ação de movimento (não ambas) a cada rodada.', pagina: 395 },
  { id: 'enredado', nome: 'Enredado', categoria: 'movimento',
    descricao: 'Fica Lento e Vulnerável, e sofre –2 em testes de ataque.', pagina: 395 },
  { id: 'envenenado', nome: 'Envenenado', categoria: 'veneno',
    descricao: 'Está sob efeito de um veneno — perda de pontos de vida recorrente ou outras condições, descritas no veneno específico.', pagina: 395 },
  { id: 'esmorecido', nome: 'Esmorecido', categoria: 'mental',
    descricao: 'Sofre –5 em Inteligência, Sabedoria e Carisma.', pagina: 395 },
  { id: 'exausto', nome: 'Exausto', categoria: 'cansaco',
    descricao: 'Fica Debilitado, Lento e Vulnerável. Se ficar exausto novamente, fica Inconsciente.', pagina: 395 },
  { id: 'fascinado', nome: 'Fascinado', categoria: 'mental',
    descricao: 'Sofre –5 em Percepção e não pode fazer ações — apenas observar o que o fascinou.', pagina: 395 },
  { id: 'fatigado', nome: 'Fatigado', categoria: 'cansaco',
    descricao: 'Fica Fraco e Vulnerável. Se ficar fatigado novamente, fica Exausto.', pagina: 395 },
  { id: 'fraco', nome: 'Fraco', categoria: 'geral',
    descricao: 'Sofre –2 em Força, Destreza e Constituição. Se ficar fraco novamente, fica Debilitado.', pagina: 395 },
  { id: 'frustrado', nome: 'Frustrado', categoria: 'mental',
    descricao: 'Sofre –2 em Inteligência, Sabedoria e Carisma. Se ficar frustrado novamente, fica Esmorecido.', pagina: 395 },
  { id: 'imovel', nome: 'Imóvel', categoria: 'movimento',
    descricao: 'Todas as formas de deslocamento são reduzidas a 0m.', pagina: 395 },
  { id: 'inconsciente', nome: 'Inconsciente', categoria: 'geral',
    descricao: 'Fica Indefeso e não pode fazer ações (nem reações).', pagina: 395 },
  { id: 'indefeso', nome: 'Indefeso', categoria: 'geral',
    descricao: 'Fica Desprevenido, com –10 na Defesa, e falha automaticamente em testes de Reflexos.', pagina: 395 },
  { id: 'lento', nome: 'Lento', categoria: 'movimento',
    descricao: 'Deslocamento reduzido à metade. Não pode correr nem fazer investidas.', pagina: 395 },
  { id: 'ofuscado', nome: 'Ofuscado', categoria: 'sentidos',
    descricao: 'Sofre –2 em testes de ataque e em testes de Percepção.', pagina: 395 },
  { id: 'paralisado', nome: 'Paralisado', categoria: 'movimento',
    descricao: 'Fica Imóvel e Indefeso. Só pode realizar ações puramente mentais.', pagina: 395 },
  { id: 'pasmo', nome: 'Pasmo', categoria: 'mental',
    descricao: 'Não pode fazer ações.', pagina: 395 },
  { id: 'petrificado', nome: 'Petrificado', categoria: 'metamorfose',
    descricao: 'Fica Inconsciente e recebe redução de dano 8.', pagina: 395 },
  { id: 'sangrando', nome: 'Sangrando', categoria: 'geral',
    descricao: 'Testa Constituição (CD 15) no início de cada turno ou perde 1d6 pontos de vida. Passar no teste remove a condição.', pagina: 395 },
  { id: 'sobrecarregado', nome: 'Sobrecarregado', categoria: 'movimento',
    descricao: 'Sofre penalidade de armadura adicional de –5 e deslocamento reduzido em –3m.', pagina: 395 },
  { id: 'surdo', nome: 'Surdo', categoria: 'sentidos',
    descricao: 'Não ouve. Sofre –5 em testes de Iniciativa. É considerado condição ruim para lançar magias com componente verbal.', pagina: 395 },
  { id: 'surpreendido', nome: 'Surpreendido', categoria: 'geral',
    descricao: 'Fica Desprevenido e não pode fazer ações no primeiro turno do combate.', pagina: 395 },
  { id: 'vulneravel', nome: 'Vulnerável', categoria: 'geral',
    descricao: 'Sofre –2 na Defesa.', pagina: 395 },
];
