/* ============================================================
   POVO.JS — Personagens > Povo (Compêndio Tormenta 20)
   Fonte: Guia de NPCs v1.1, seção "Povo de Arton" (pp. 66-79).

   40 fichas de NPCs genéricos (não são personagens icônicos como
   em lendas.js — são "papéis" reutilizáveis: um ferreiro, um
   guarda, um assassino) organizadas em 6 subseções do livro: A
   Plebe (8), O Templo (3), A Lei (7), O Crime (6), A Corte (6),
   Mercenários (10). Schema DELIBERADAMENTE mais simples que
   lendas.js (sem epiteto/obras/poderConcedido/artefatos — o
   próprio livro descreve estas fichas como "bem mais simples",
   pedido explícito do usuário), mas REAPROVEITA o mesmo vocabulário
   de campos numéricos/estruturados já unificado entre criaturas.js
   e lendas.js no changelog item 43, pro mesmo motivo: permitir
   busca/filtro cruzado entre os 3 datasets de "ficha de jogo".

   Cada objeto:
   - id / nome: como sempre.
   - nd / ndValor: ND exibido (string) e valor numérico pra
     filtro/ordenação — mesma convenção de criaturas.js/lendas.js.
     Aqui vai de 1/4 (Camponês) a 10 (Mago da Corte); ND não é um
     indicador de "usar em combate" (o livro avisa que a maioria
     dessas fichas "não será muito utilizada em combate"), é só
     referência de poder relativo caso um NPC vire antagonista.
   - subsecao: 'a-plebe' | 'o-templo' | 'a-lei' | 'o-crime' |
     'a-corte' | 'mercenarios' — EQUIVALENTE ao `grupo` do
     Bestiário (mesma função: agrupar/filtrar por categoria
     temática), mas com nome de campo próprio porque o conceito é
     diferente (subseção do livro, não bioma/ambiente de encontro).
   - tipo / tamanho / raca: SEPARADOS, mesmo padrão de
     criaturas.js/lendas.js (ver changelog item 43) — `raca` sempre
     em minúsculas e sem acento (ex. "anão"→"anao", "tritão"→
     "tritao"), pra bater com o mesmo vocabulário usado nos outros
     2 datasets ao comparar por igualdade (o chip clicável de raça
     em compendio.js, por ex., compara `raca.toLowerCase()` contra
     `racas.js` — funciona de qualquer forma, mas manter minúsculo
     aqui evita duplicar a mesma raça em variações de capitalização
     entre os 3 arquivos).
   - iniciativa / percepcao / sentidosExtra / defesa / fort / ref /
     von: mesmo padrão numérico puro (sem "+") de criaturas.js/
     lendas.js — exibição com sinal via `formatarBonus()` em
     compendio.js.
   - resistencias[]: mesmo formato estruturado { categoria, alvo,
     valor } ou { _naoExtraido, textoOriginal } dos outros 2
     datasets.
   - pv / pm / deslocamento: como sempre (`pm: null` quando o NPC
     não conjura).
   - ataques[]: mesmo schema estruturado { categoria, arma, bonus,
     dano, tipoDano, critico, extra } — `tipoDano` é sempre `null`
     por enquanto (mesma situação de criaturas.js/lendas.js, campo
     ainda não preenchido em lugar nenhum do site).
   - habilidades[] / magias / atributos / pericias[] / equipamento /
     tesouro / descricao: como sempre.
   - fonte: sempre 'Guia de NPCs'.
   - pagina: número de página do LIVRO (não do PDF) onde a ficha
     começa.
   - _duvida (OPCIONAL, presente em só 1 dos 40): anotação de
     limitação de schema, não de erro de extração — o Mercador
     Desonesto tem um bônus condicional de Enganação ("+18 para
     barganha") que o formato atual de perícias (nome/valor único)
     não representa; fica só documentado no campo, não exibido na
     UI.

   Extraído com apoio de 3 sub-agentes em paralelo (2 subseções
   cada), a partir de texto de PDF re-extraído com `pdftotext
   -layout` recortado por COLUNA (o layout original é 2 colunas por
   página, bem mais compacto que as fichas de página inteira de
   lendas.js — extração direta em ordem de leitura do stream
   original ficava embaralhada entre colunas; recortar left/right
   por coordenadas x resolveu). Todos os campos numéricos
   verificados por script (`node`) contra o schema — 0 problemas.

   DELIBERADAMENTE FORA deste arquivo (fica pro backlog, ver
   CLAUDE.md):
   - Tabela "NPCs de Outras Raças" (ajustes pra reaplicar as fichas
     com Anão/Dahllan/Elfo/Goblin/Hynne/Lefou/Minotauro/Qareen/
     Sereia/Suraggel/Trog) — não é uma ficha, é uma tabela de
     modificadores; ainda sem lugar decidido no site.
   - Sidebar "Truques Mercenários" (6 habilidades nomeadas pra
     customizar companhias) — mesmo caso, tabela de modificadores.
   - Sidebar "Contrata do Brucutus" (regra de custo pra contratar um
     Brucutu como parceiro temporário) — a habilidade "Parceiro" do
     próprio Brucutu foi mantida como uma habilidade normal dele
     (não virou campo `.parceiro` de verdade — essa decisão é do
     usuário, mesma regra já em vigor pra criaturas.js).
   - 3 itens mágicos com stat block completo encontrados embutidos
     na seção (Machado de Lenha, Báculo da Fé, Batina Consagrada) —
     já fazem parte do backlog 0d (entrar no Gerador de Tesouro).
   - Falcão (ND 1/4) e Molosso Deheoni (ND 2) — NÃO são NPCs de Povo,
     são criaturas/parceiros à parte encontradas dentro desta seção
     (Falcão, sidebar "Falcoaria" em A Corte) e da seção de Lendas
     (Molosso Deheoni, ligado à Rainha-Imperatriz Shivara) — ambas
     já rastreadas no backlog 0d pra entrar no Bestiário.
============================================================ */

const POVO_ARTON = [
{
  id: "campones", nome: "Camponês",
  nd: "1/4", ndValor: 0.25, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 0, percepcao: 3, sentidosExtra: null,
  defesa: 10, fort: 3, ref: 0, von: 1,
  resistencias: [],
  pv: 3, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":1,"Des":0,"Con":1,"Int":0,"Sab":1,"Car":0},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Bordão","bonus":1,"dano":"1d6+1","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [],
  magias: null,
  pericias: [{"nome":"Adestramento","valor":2},{"nome":"Ofício (fazendeiro)","valor":2}],
  equipamento: "Bordão.", tesouro: "Nenhum",
  descricao: "A ficha mais simples de todas. Representa pessoas que vivem no campo, como fazendeiros, pastoras e outras — a maior parte da população do Reinado e além.",
  fonte: "Guia de NPCs", pagina: 66,
},
{
  id: "ferreiro", nome: "Ferreiro",
  nd: "1", ndValor: 1, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 2, percepcao: 2, sentidosExtra: null,
  defesa: 14, fort: 9, ref: 2, von: 5,
  resistencias: [{"categoria":"resistencia","alvo":"fogo","valor":2}],
  pv: 21, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":3,"Des":0,"Con":1,"Int":1,"Sab":0,"Car":-1},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Martelo de ferreiro","bonus":7,"dano":"1d8+9","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {"titulo":"Martelo e Bigorna","texto":"Quando usa a manobra quebrar ou ataca um objeto ou construto, o ferreiro recebe +2 no teste de ataque e na rolagem de dano."}
  ],
  magias: null,
  pericias: [{"nome":"Ofício (ferreiro)","valor":8}],
  equipamento: "Avental de couro (conta como armadura de couro), instrumentos de Ofício (ferreiro), martelo de ferreiro (conta como uma maça).", tesouro: "Padrão",
  descricao: "A figura responsável por forjar metais, normalmente de corpo forte e semblante rabugento. Em seu dia a dia, costuma fabricar ferramentas para sua comunidade, mas também pode lidar com armas e armaduras.",
  fonte: "Guia de NPCs", pagina: 66,
},
{
  id: "matuto", nome: "Matuto",
  nd: "1/2", ndValor: 0.5, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 3, percepcao: 3, sentidosExtra: null,
  defesa: 14, fort: 4, ref: 1, von: 3,
  resistencias: [],
  pv: 14, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":1,"Con":2,"Int":0,"Sab":1,"Car":-1},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Machado de lenha","bonus":7,"dano":"1d6+5","tipoDano":null,"critico":"x3","extra":null}],
  habilidades: [],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":6},{"nome":"Ofício (lenhador)","valor":4}],
  equipamento: "Gibão de peles, machado de lenha.", tesouro: "Nenhum",
  descricao: "Mais embrutecido que o camponês. São lenhadoras, mineradores e outras pessoas habituadas a trabalho pesado ou perigoso. Use esta ficha também para camponeses de regiões hostis.",
  fonte: "Guia de NPCs", pagina: 66,
},
{
  id: "menestrel", nome: "Menestrel",
  nd: "1/2", ndValor: 0.5, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 4, percepcao: 2, sentidosExtra: null,
  defesa: 12, fort: 0, ref: 6, von: 2,
  resistencias: [],
  pv: 11, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":-1,"Des":2,"Con":0,"Int":1,"Sab":0,"Car":2},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Adaga","bonus":4,"dano":"1d4+2","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Adaga","bonus":4,"dano":"1d4+4","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [
    {"titulo":"Distrair (Padrão)","texto":"O menestrel fascina uma criatura em alcance curto (Von CD 14 evita e a criatura não pode mais ser fascinada por esta habilidade por um dia). A criatura fica fascinada enquanto o menestrel se concentrar (uma ação padrão por rodada)."},
    {"titulo":"Estilo de Arremesso","texto":"O menestrel pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas (já contabilizado)."}
  ],
  magias: null,
  pericias: [{"nome":"Atuação","valor":6},{"nome":"Enganação","valor":6},{"nome":"Diplomacia","valor":6},{"nome":"Jogatina","valor":6}],
  equipamento: "Adaga x2, instrumento musical.", tesouro: "Metade",
  descricao: "Típico artista de rua, entoando canções populares por algumas moedas. Pode surgir em quase qualquer lugar, de tavernas a estradas. Dizem que matar um deles atrai azar terrível — principalmente para o menestrel!",
  fonte: "Guia de NPCs", pagina: 66,
},
{
  id: "mercador", nome: "Mercador",
  nd: "1/2", ndValor: 0.5, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 2, percepcao: 5, sentidosExtra: null,
  defesa: 10, fort: 1, ref: 2, von: 5,
  resistencias: [],
  pv: 11, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":0,"Des":0,"Con":1,"Int":1,"Sab":1,"Car":1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Clava","bonus":2,"dano":"1d6","tipoDano":null,"critico":null,"extra":null},
    {"categoria":"À Distância","arma":"Besta leve","bonus":5,"dano":"1d8+2","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [],
  magias: null,
  pericias: [{"nome":"Diplomacia","valor":5},{"nome":"Intuição","valor":5},{"nome":"Ofício (mercador)","valor":5}],
  equipamento: "Besta leve, clava, virotes x20.", tesouro: "Padrão",
  descricao: "Comerciante comum, desde vendedores nos mercados das cidades até mascates viajantes nas estradas ou negociantes em entrepostos de fronteira.",
  fonte: "Guia de NPCs", pagina: 66,
},
{
  id: "mestre-mercante", nome: "Mestre Mercante",
  nd: "4", ndValor: 4, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 8, percepcao: 8, sentidosExtra: null,
  defesa: 20, fort: 6, ref: 10, von: 14,
  resistencias: [],
  pv: 76, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":0,"Des":2,"Con":3,"Int":3,"Sab":2,"Car":3},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Adaga","bonus":12,"dano":"1d4+4","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Besta pesada","bonus":14,"dano":"3d6+4","tipoDano":null,"critico":"18","extra":"mais 3d4 ácido"}
  ],
  habilidades: [
    {"titulo":"Duro de Enrolar","texto":"Recebe +5 em Vontade contra barganha."},
    {"titulo":"Estoque de Poções (Padrão)","texto":"Saca e usa uma poção entre as seguintes.\n• Granada de Fogo. Causa 10d6 pontos de dano de fogo num raio de 6m em alcance curto (Ref CD 21 reduz à metade).\n• Poção de Invisibilidade. Fica invisível por uma cena ou até executar uma ação hostil.\n• Poção de Visão Mística. Até o fim da cena, detecta todas as auras mágicas em alcance médio e enxerga criaturas e objetos invisíveis."},
    {"titulo":"Pernas pra que te Quero","texto":"Com o costume de correr de assaltantes para salvar sua pele e mercadorias, sempre que se move na direção oposta de seus adversários, seu deslocamento aumenta em +6m."}
  ],
  magias: null,
  pericias: [{"nome":"Adestramento","valor":7},{"nome":"Conhecimento","valor":9},{"nome":"Diplomacia","valor":12},{"nome":"Intuição","valor":11},{"nome":"Ofício (mercador)","valor":12}],
  equipamento: "Adaga, besta pesada certeira, couro batido reforçado, virotes x20.", tesouro: "Dobro",
  descricao: "Este negociante experiente possui um bazar ou oficina ou comanda uma caravana ou navio mercante. Embora não seja uma figura aventureira, já se habituou a viagens desconfortáveis e já enfrentou sua cota de bandidagem. Talvez seja responsável por contratar o grupo para suas primeiras missões.",
  fonte: "Guia de NPCs", pagina: 67,
},
{
  id: "sabio", nome: "Sábio",
  nd: "1/2", ndValor: 0.5, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 1, percepcao: 7, sentidosExtra: null,
  defesa: 9, fort: 0, ref: 2, von: 7,
  resistencias: [],
  pv: 9, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":-1,"Des":-1,"Con":0,"Int":3,"Sab":3,"Car":2},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Bordão","bonus":2,"dano":"1d6–1","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {"titulo":"Conselho (Completa)","texto":"Uma vez por cena por criatura, o sábio instrui uma criatura inteligente em alcance curto. Ela recebe +1d6 num teste à sua escolha em seu próximo turno."},
    {"titulo":"Eloquência (Completa)","texto":"O sábio distrai uma criatura inteligente (Int –3 ou maior) em alcance curto, que fica pasma por 1 rodada (Vont CD 16 evita e a criatura não pode mais ficar pasma por esta habilidade até o fim do dia)."}
  ],
  magias: null,
  pericias: [{"nome":"Conhecimento","valor":10},{"nome":"Cura","valor":10},{"nome":"Intuição","valor":10},{"nome":"Misticismo","valor":10},{"nome":"Nobreza","valor":10},{"nome":"Ofício (alquimia)","valor":10},{"nome":"Religião","valor":10},{"nome":"Sobrevivência","valor":10}],
  equipamento: "Bálsamo restaurador, bordão, gorro de ervas.", tesouro: "Padrão",
  descricao: "Em pequenas comunidades onde não há burgomestre ou clérigo, muitas vezes esses papéis acabam nas mãos de um ancião ou anciã respeitados por sua sabedoria. Também há aqueles que vivem isolados como eremitas… Ou aqueles que inesperadamente entram em tavernas à procura de aventureiros.",
  fonte: "Guia de NPCs", pagina: 67,
},
{
  id: "taverneiro", nome: "Taverneiro",
  nd: "2", ndValor: 2, subsecao: "a-plebe",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 3, percepcao: 3, sentidosExtra: null,
  defesa: 14, fort: 10, ref: 7, von: 5,
  resistencias: [],
  pv: 32, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":0,"Con":2,"Int":0,"Sab":1,"Car":1},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Clava","bonus":10,"dano":"1d6+7","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {"titulo":"Cerveja nos Olhos (Movimento)","texto":"Uma vez por cena, o taverneiro atira cerveja nos olhos de uma criatura em alcance curto. A criatura fica atordoada por uma rodada (Ref CD 18 evita)."},
    {"titulo":"Fofoca","texto":"O taverneiro fornece +5 em um teste de Investigação para interrogar (apenas uma vez por dia para a mesma informação). Receber esse benefício pode exigir conquistar a boa vontade do taverneiro, com diplomacia ou tibares."}
  ],
  magias: null,
  pericias: [{"nome":"Intuição","valor":9},{"nome":"Ofício (taverneiro)","valor":8}],
  equipamento: "Caneco de cerveja, clava.", tesouro: "Padrão",
  descricao: "Trabalhando atrás de seu balcão, o taverneiro típico já viu muitas brigas de bar e não se assusta com qualquer coisa. Alguns possuem segurança (veja \"Capangas\", em Ameaças de Arton, p. 43) ou podem ser aventureiros aposentados, com fichas mais poderosas.",
  fonte: "Guia de NPCs", pagina: 68,
},

{
  id: "acolito", nome: "Acólito",
  nd: "1/2", ndValor: 0.5, subsecao: "o-templo",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 1, percepcao: 4, sentidosExtra: null,
  defesa: 11, fort: 3, ref: 0, von: 5,
  resistencias: [],
  pv: 11, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":0,"Con":1,"Int":0,"Sab":2,"Car":1},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Maça","bonus":5,"dano":"1d8+3","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {"titulo":"Prece (Movimento)","texto":"O acólito recebe +1d6 em seu próximo teste de perícia feito nesse turno. Esta habilidade só pode ser usada uma vez por cena."}
  ],
  magias: null,
  pericias: [{"nome":"Religião","valor":4}],
  equipamento: "Maça, símbolo sagrado.", tesouro: "Nenhum",
  descricao: "Devotos sem poderes divinos, acólitos formam a maior parte dos membros de uma igreja. Atuam como assistentes de sacerdotes e guardas de templos.",
  fonte: "Guia de NPCs", pagina: 68,
},
{
  id: "sacerdote", nome: "Sacerdote",
  nd: "2", ndValor: 2, subsecao: "o-templo",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 3, percepcao: 6, sentidosExtra: null,
  defesa: 17, fort: 7, ref: 4, von: 11,
  resistencias: [{"categoria":"resistencia","alvo":"mental","valor":2}],
  pv: 47, deslocamento: "9m (6q)", pm: 13,
  atributos: {"For":0,"Des":0,"Con":1,"Int":2,"Sab":3,"Car":3},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Bordão","bonus":7,"dano":"1d6+3","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {"titulo":"Autoridade Eclesiástica","texto":"O sacerdote recebe +5 em Diplomacia e Intimidação com devotos de sua divindade."},
    {"titulo":"Defesas do Templo (Movimento, 2 PM)","texto":"O sacerdote evoca as defesas divinas do templo. Isso funciona como o efeito básico da magia Arma Espiritual, mas também concede +5 na Defesa do sacerdote. Ele só pode usar esta habilidade dentro dos limites de seu templo."},
    {"titulo":"Paróquia","texto":"Enquanto estiver em seu templo, o sacerdote recebe +2 na Defesa e em testes de resistência, e a CD para resistir às suas magias aumenta em +2."}
  ],
  magias: {
    conjurador: "clérigo de 2º nível (CD 18)",
    lista: [
      {"titulo":"Curar Ferimentos (Padrão, 2 PM)","texto":"Uma criatura adjacente cura 3d8+3 PV."},
      {"titulo":"Orientação (Padrão, 3 PM)","texto":"O sacerdote escolhe um atributo e uma criatura em alcance curto. Até o fim da cena, sempre que a criatura fizer um teste de perícia do atributo escolhido, rola dois dados e fica com o melhor resultado."},
      {"titulo":"Santuário (Padrão, 1 PM)","texto":"O sacerdote toca uma criatura. Até o fim da cena, ou até que a criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita)."}
    ]
  },
  pericias: [{"nome":"Conhecimento","valor":5},{"nome":"Cura","valor":6},{"nome":"Diplomacia","valor":6},{"nome":"Misticismo","valor":5},{"nome":"Religião","valor":12}],
  equipamento: "Bordão, manto eclesiástico, símbolo sagrado.", tesouro: "Padrão",
  descricao: "Responsável por um pequeno templo ou conselheiro de um burgomestre ou nobre menor. Embora tenha menos poderes que um clérigo aventureiro, pode acudir heróis em necessidade.",
  fonte: "Guia de NPCs", pagina: 68,
},
{
  id: "alto-sacerdote", nome: "Alto Sacerdote",
  nd: "9", ndValor: 9, subsecao: "o-templo",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 8, percepcao: 13, sentidosExtra: null,
  defesa: 31, fort: 15, ref: 9, von: 21,
  resistencias: [{"categoria":"resistencia","alvo":"mental","valor":2}],
  pv: 250, deslocamento: "9m (6q)", pm: 50,
  atributos: {"For":1,"Des":0,"Con":3,"Int":3,"Sab":5,"Car":4},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Báculo da fé","bonus":25,"dano":"2d6+10","tipoDano":null,"critico":null,"extra":"mais 2d6 energia"}],
  habilidades: [
    {"titulo":"Autoridade Eclesiástica","texto":"O alto sacerdote recebe +5 em Diplomacia e Intimidação com devotos de sua divindade."},
    {"titulo":"Defesas do Templo (Movimento, 2 PM)","texto":"O alto sacerdote evoca as defesas divinas do templo. Isso funciona como o efeito básico da magia Arma Espiritual, mas também concede +5 na Defesa do sacerdote. Ele só pode usar esta habilidade dentro dos limites de seu templo."},
    {"titulo":"Força da Fé (Reação, 2 PM)","texto":"Uma vez por cena, quando sofrer dano que o deixaria abaixo de 1 PV, o alto sacerdote ignora esse dano."},
    {"titulo":"Paróquia","texto":"Enquanto estiver em seu templo, o alto sacerdote recebe +2 na Defesa e em testes de resistência, e a CD para resistir às suas magias aumenta em +2."}
  ],
  magias: {
    conjurador: "clérigo de 9º nível (CD 30)",
    lista: [
      {"titulo":"Comando (Padrão, 4 PM)","texto":"O alto sacerdote ordena a duas criaturas em alcance curto que se ajoelhem no início de seus turnos. Cada criatura fica caída e não pode se levantar até o começo de seu próximo turno (Von evita)."},
      {"titulo":"Coluna de Chamas (Padrão, 9 PM)","texto":"Um cilindro de fogo com 3m de raio e 15m de altura em alcance longo causa 8d6 pontos de dano de fogo e 7d6 pontos de dano de luz em criaturas e objetos livres na área (Ref reduz à metade)."},
      {"titulo":"Curar Ferimentos (Padrão, 9 PM)","texto":"Uma criatura adjacente cura 10d8+10 PV."},
      {"titulo":"Dissipar Magia (Padrão, 3 PM)","texto":"O alto sacerdote escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula)."},
      {"titulo":"Orientação (Padrão, 8 PM)","texto":"O alto sacerdote escolhe um atributo e qualquer número de criaturas em alcance curto. Até o fim da cena, sempre que uma das criaturas fizer um teste de perícia do atributo escolhido, rola dois dados e fica com o melhor resultado."},
      {"titulo":"Santuário (Padrão, 1 PM)","texto":"O alto sacerdote toca uma criatura. Até o fim da cena, ou até que a criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita)."}
    ]
  },
  pericias: [{"nome":"Conhecimento","valor":11},{"nome":"Cura","valor":13},{"nome":"Diplomacia","valor":14},{"nome":"Intuição","valor":13},{"nome":"Misticismo","valor":12},{"nome":"Religião","valor":20}],
  equipamento: "Báculo da fé, batina consagrada, manto eclesiástico aprimorado, símbolo sagrado.", tesouro: "Dobro",
  descricao: "Uma autoridade da fé, provavelmente o clérigo mais poderoso de sua cidade. Sempre ocupado com assuntos administrativos da igreja, será difícil conseguir uma audiência com ele.",
  fonte: "Guia de NPCs", pagina: 69,
},

{
  id: "alcaide-de-valkaria", nome: "Alcaide de Valkaria",
  nd: "4", ndValor: 4, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 6, percepcao: 6, sentidosExtra: null,
  defesa: 23, fort: 15, ref: 10, von: 6,
  resistencias: [],
  pv: 70, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":3,"Des":2,"Con":2,"Int":0,"Sab":2,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada longa x2","bonus":16,"dano":"1d8+8","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Arco longo x2","bonus":16,"dano":"1d8+8","tipoDano":null,"critico":"x3","extra":null}
  ],
  habilidades: [
    {"titulo":"Chamar Reforços (Padrão)","texto":"O alcaide invoca 1d4 patrulheiros de Valkaria (veja p. 71) que surgem em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do alcaide. Recarga (1d4 rodadas)."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":7},{"nome":"Intuição","valor":6}],
  equipamento: "Arco longo, algemas, apito, cota de malha reforçada, espada longa, flechas x20, lampião.", tesouro: "Metade.",
  descricao: "Patrulheiros veteranos. Operam liderando patrulhas ou alocados em postos importantes da cidade, como portões ou praças de mercados.",
  fonte: "Guia de NPCs", pagina: 70,
},
{
  id: "besteiro", nome: "Besteiro",
  nd: "1", ndValor: 1, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 7, percepcao: 5, sentidosExtra: null,
  defesa: 16, fort: 5, ref: 8, von: 3,
  resistencias: [],
  pv: 11, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":1,"Des":3,"Con":1,"Int":0,"Sab":1,"Car":-1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada curta","bonus":9,"dano":"1d6+2","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Besta pesada","bonus":11,"dano":"1d12+6","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [
    {"titulo":"Besteiro Treinado","texto":"Pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque. Além disso, pode recarregar sua besta como uma ação de movimento."},
    {"titulo":"Saraivada (Padrão)","texto":"Se dois ou mais besteiros estiverem adjacentes, todos podem gastar uma ação padrão para disparar uma saraivada em um alvo em alcance médio. O alvo sofre 1d12+6 pontos de dano de perfuração, +1d12 por besteiro além do primeiro (Ref CD 17 reduz à metade)."}
  ],
  magias: null,
  pericias: [],
  equipamento: "Besta pesada, couro batido, espada curta, virotes x20.", tesouro: "Metade.",
  descricao: "Estes guardas especializados atuam nas muralhas de grandes cidades ou nas torres de castelos. Um pelotão desses pode abater até mesmo monstros como serpes — ou aventureiros imprudentes.",
  fonte: "Guia de NPCs", pagina: 70,
},
{
  id: "capitao-da-guarda", nome: "Capitão da Guarda",
  nd: "6", ndValor: 6, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "anao",
  iniciativa: 5, percepcao: 7, sentidosExtra: "visão no escuro",
  defesa: 27, fort: 17, ref: 7, von: 12,
  resistencias: [
    {"categoria":"reducao","alvo":null,"valor":5},
    {"categoria":"resistencia","alvo":"medo","valor":2}
  ],
  pv: 195, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":4,"Des":0,"Con":5,"Int":0,"Sab":2,"Car":1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Machado anão x2","bonus":20,"dano":"2d12+10","tipoDano":null,"critico":"x3","extra":null},
    {"categoria":"À Distância","arma":"Azagaia","bonus":17,"dano":"2d6+8","tipoDano":null,"critico":null,"extra":null}
  ],
  habilidades: [
    {"titulo":"Mexa-se, Soldado (Movimento)","texto":"O capitão dá um comando a um aliado em alcance médio, que pode fazer uma ação padrão imediatamente."},
    {"titulo":"Ordens (Movimento)","texto":"O capitão grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":9},{"nome":"Guerra","valor":5},{"nome":"Intuição","valor":9}],
  equipamento: "Apito, azagaia x2, enfeite de elmo, escudo pesado, machado anão, meia armadura.", tesouro: "Metade.",
  descricao: "O oficial mais graduado na força policial local, respondendo apenas ao burgomestre ou barão. Muitas vezes trata-se de um aventureiro veterano.",
  fonte: "Guia de NPCs", pagina: 70,
},
{
  id: "golem-guardiao", nome: "Golem Guardião",
  nd: "7", ndValor: 7, subsecao: "a-lei",
  tipo: "Construto", tamanho: "Grande", raca: null,
  iniciativa: 6, percepcao: 12, sentidosExtra: "visão no escuro",
  defesa: 30, fort: 18, ref: 13, von: 7,
  resistencias: [
    {"categoria":"imunidade","alvo":"eletricidade","valor":null},
    {"categoria":"reducao","alvo":null,"valor":10}
  ],
  pv: 55, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":5,"Des":-1,"Con":4,"Int":null,"Sab":0,"Car":-5},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Duas pancadas","bonus":25,"dano":"2d10+15","tipoDano":null,"critico":null,"extra":"mais 2d8 eletricidade"}
  ],
  habilidades: [
    {"titulo":"Pancada Atordoante","texto":"Uma criatura atingida pela pancada do golem guardião fica atordoada por 1 rodada (Fort CD 24 evita e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena)."},
    {"titulo":"Raio (Padrão)","texto":"O golem dispara um raio em uma criatura em alcance médio. A criatura sofre 10d8 pontos de dano de eletricidade e fica atordoada por uma rodada (Ref CD 24 reduz à metade, evita a condição e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena). Recarga (movimento)."},
    {"titulo":"Runas Divinatórias (Movimento)","texto":"O golem fica sob efeito de Visão da Verdade até o fim da cena."}
  ],
  magias: null,
  pericias: [],
  equipamento: "", tesouro: "Fragmentos de runas (CD 21 para extrair, valem T$ 200 para fabricar catalisadores).",
  descricao: "Este construto rudimentar, pouco mais que uma armadura animada, é encontrado em castelos e grandes cidades, onde é usado para enfrentar invasores poderosos demais para guardas comuns. Runas de adivinhação gravadas no chassi deste golem tornam-no muito eficaz em detectar inimigos.",
  fonte: "Guia de NPCs", pagina: 70,
},
{
  id: "guarda-palaciano", nome: "Guarda Palaciano",
  nd: "3", ndValor: 3, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 6, percepcao: 5, sentidosExtra: null,
  defesa: 21, fort: 14, ref: 4, von: 9,
  resistencias: [],
  pv: 28, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":3,"Des":1,"Con":3,"Int":0,"Sab":2,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada longa x2","bonus":16,"dano":"1d8+8","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Besta pesada","bonus":16,"dano":"1d12+4","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [
    {"titulo":"Sentinela Determinada","texto":"O guarda palaciano recebe +2 em testes de perícia quando está lutando para defender seu posto (como um castelo, fortificação ou templo)."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":6},{"nome":"Intuição","valor":5}],
  equipamento: "Besta pesada, escudo pesado, espada longa, meia armadura, virotes x20.", tesouro: "Metade.",
  descricao: "Um guarda de elite, encarregado de proteger os portões e as muralhas de um castelo. Pequenos grupos podem ser destacados para missões especiais, como lidar com aventureiros, sob o comando de um guarda real (veja \"A Corte\").",
  fonte: "Guia de NPCs", pagina: 71,
},
{
  id: "milicia-arcana", nome: "Milícia Arcana",
  nd: "5", ndValor: 5, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 7, percepcao: 7, sentidosExtra: null,
  defesa: 21, fort: 11, ref: 4, von: 15,
  resistencias: [
    {"categoria":"imunidade","alvo":"efeitos mentais","valor":null}
  ],
  pv: 70, deslocamento: "9m (6q)", pm: 27,
  atributos: {"For":2,"Des":3,"Con":2,"Int":3,"Sab":1,"Car":-1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada longa","bonus":12,"dano":"1d8+7","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [
    {"titulo":"Arcano de Batalha","texto":"A milícia arcana soma sua Inteligência nas rolagens de dano com magias (já contabilizado)."}
  ],
  magias: {"conjurador":"mago de 5º nível (CD 21)","lista":[
    {"titulo":"Amarras Etéreas (Padrão, 3 PM)","texto":"Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Os laços podem ser atacados e destruídos: cada um tem Def 10, 10 PV, RD 5 e imunidade a dano mágico. Se todos os laços forem destruídos, a magia é dissipada."},
    {"titulo":"Arma Mágica (Padrão, 3 PM)","texto":"Uma arma empunhada em alcance de toque se torna mágica até o fim da cena. Ela fornece +1 em testes de ataque e rolagens de dano e causa +1d6 pontos de dano de fogo. Se estiver empunhando a arma, o membro da milícia usa sua Inteligência no lugar da Força nos testes de ataque (ataque total +14)."},
    {"titulo":"Dissipar Magia (Padrão, 3 PM)","texto":"Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula)."},
    {"titulo":"Seta Infalível de Talude (Padrão, 3 PM)","texto":"Projeta três setas de energia distribuídas em até três criaturas em alcance médio. Cada seta causa 1d4+1 pontos de dano de essência (uma delas recebe +3 na rolagem de dano)."},
    {"titulo":"Visão Mística (Padrão, 3 PM)","texto":"Até o fim da cena, enxerga criaturas invisíveis e detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Pode gastar uma ação de movimento para descobrir se uma criatura em alcance médio é capaz de lançar magias e qual a aura gerada por suas magias."}
  ]},
  pericias: [{"nome":"Atletismo","valor":6},{"nome":"Intuição","valor":7},{"nome":"Misticismo","valor":10}],
  equipamento: "Essência de mana, espada longa, robe místico, varinha arcana.", tesouro: "Metade.",
  descricao: "Presente em muitas das maiores cidades do Reinado, a milícia arcana é composta por arcanistas de combate atuando como guardas. Possuem função de auxiliar demais guardas contra ameaças não mundanas ou acompanhar capitães em missões.",
  fonte: "Guia de NPCs", pagina: 71,
},
{
  id: "patrulheiro-de-valkaria", nome: "Patrulheiro de Valkaria",
  nd: "2", ndValor: 2, subsecao: "a-lei",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 5, percepcao: 4, sentidosExtra: null,
  defesa: 18, fort: 11, ref: 7, von: 4,
  resistencias: [],
  pv: 17, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":2,"Con":2,"Int":0,"Sab":1,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada longa x2","bonus":13,"dano":"1d8+5","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"Corpo a Corpo","arma":"Porrete x2","bonus":13,"dano":"1d6+5","tipoDano":null,"critico":null,"extra":"não letal"},
    {"categoria":"À Distância","arma":"Arco longo","bonus":13,"dano":"1d8+5","tipoDano":null,"critico":"x3","extra":null}
  ],
  habilidades: [
    {"titulo":"Guardião Urbano","texto":"O patrulheiro recebe +2 em testes de ataque, Atletismo, Intuição e Percepção em Valkaria."},
    {"titulo":"Manter a Ordem","texto":"O patrulheiro recebe +2 em testes para agarrar, derrubar ou desarmar."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":5},{"nome":"Intuição","valor":4}],
  equipamento: "Arco longo, algemas, apito, couro batido reforçado, espada longa, flechas x20, lampião, porrete (veja Ameaças de Arton, p. 393).", tesouro: "Metade.",
  descricao: "Embora sejam a base da hierarquia da Guarda de Valkaria, os patrulheiros ainda estão em patamar superior às demais cidades, com treinamento e equipamento de melhor qualidade.",
  fonte: "Guia de NPCs", pagina: 71,
},

{
  id: "assassino", nome: "Assassino",
  nd: "3", ndValor: 3, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 9, percepcao: 3, sentidosExtra: null,
  defesa: 19, fort: 9, ref: 15, von: 3,
  resistencias: [
    {"_naoExtraido": true, "textoOriginal": "evasão"}
  ],
  pv: 51, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":0,"Des":4,"Con":2,"Int":2,"Sab":0,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Duas espadas curtas","bonus":12,"dano":"1d6+4","tipoDano":null,"critico":"19","extra":"mais veneno"},
    {"categoria":"À Distância","arma":"Adaga","bonus":12,"dano":"1d4+4","tipoDano":null,"critico":"19","extra":"mais veneno"}
  ],
  habilidades: [
    {"titulo":"Assassinar (Movimento)","texto":"O assassino analisa uma criatura em alcance curto. Até o fim de seu próximo turno, ele dobra os dados de dano extras por Ataque Furtivo em seu primeiro Ataque Furtivo que causar dano contra essa criatura."},
    {"titulo":"Ataque Furtivo","texto":"+3d6."},
    {"titulo":"Veneno","texto":"Peçonha concentrada (perde 1d12 pontos de vida durante 3 rodadas, Fort CD 19 reduz a duração para 1 rodada)."}
  ],
  magias: null,
  pericias: [{"nome":"Acrobacia","valor":9},{"nome":"Atletismo","valor":5},{"nome":"Enganação","valor":5},{"nome":"Furtividade","valor":9},{"nome":"Ladinagem","valor":9}],
  equipamento: "Adaga x2, couro batido ajustado, espada curta x2, estojo de disfarces, gazua, veneno de naja x3.", tesouro: "Padrão.",
  descricao: "Hábeis com armas e táticas furtivas, estes matadores são tipicamente contratados por dinheiro. Podem agir acompanhados por capangas ou saqueadores, ou atuar como guarda-costas para nobres e chefes de guildas.",
  fonte: "Guia de NPCs", pagina: 72,
},
{
  id: "brucutu", nome: "Brucutu",
  nd: "1/2", ndValor: 0.5, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 2, percepcao: 2, sentidosExtra: null,
  defesa: 13, fort: 5, ref: 3, von: 0,
  resistencias: [],
  pv: 7, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":0,"Con":2,"Int":-1,"Sab":0,"Car":-1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Clava","bonus":9,"dano":"1d6+6","tipoDano":null,"critico":null,"extra":null}
  ],
  habilidades: [
    {"titulo":"Valentão","texto":"O brucutu recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, enredados, flanqueados ou indefesos."},
    {"titulo":"Parceiro","texto":"O brucutu é um parceiro que impõe uma penalidade de –2 em Diplomacia e fornece os benefícios a seguir. Iniciante: pode carregar 2 espaços de itens e, uma vez por rodada, você recebe +1d6 pontos de dano em uma rolagem de dano corpo a corpo. Veterano: a quantidade de espaços carregados aumenta para 5 e o bônus em rolagens de dano corpo a corpo aumenta para +1d8. Mestre: a quantidade de espaços carregados aumenta para 10 e o bônus em rolagens de dano corpo a corpo aumenta para +1d10."},
    {"titulo":"Contratando Brucutus","texto":"Um brucutu pode ser contratado como um parceiro que irá auxiliá-lo por uma cena. Ele irá acompanhá-lo, contando para seu limite de parceiros, mas sem oferecer benefício, até que você peça sua ajuda. Então, fornecerá seu benefício até o fim da cena. Após ajudá-lo, o brucutu irá embora. Um brucutu iniciante custa T$ 30, enquanto um veterano custa T$ 150. De acordo com o mestre, pode ser possível contratar um brucutu para uma aventura inteira pelo triplo desses preços."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":4},{"nome":"Intimidação","valor":3}],
  equipamento: "Andrajos de aldeão, bandana, clava.", tesouro: "Nenhum.",
  descricao: "Um trabalhador braçal ou capanga forte, ainda que não muito brilhante. Normalmente frequenta tavernas, portos e outros lugares onde possa encontrar um empregador interessado em suas habilidades — no caso, carregar coisas... ou bater nelas.",
  fonte: "Guia de NPCs", pagina: 72,
},
{
  id: "charlatao", nome: "Charlatão",
  nd: "1/2", ndValor: 0.5, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Pequeno", raca: "hynne",
  iniciativa: 7, percepcao: 3, sentidosExtra: null,
  defesa: 13, fort: -1, ref: 6, von: 3,
  resistencias: [],
  pv: 9, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":-1,"Des":3,"Con":-1,"Int":1,"Sab":-1,"Car":4},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Adaga","bonus":5,"dano":"1d4+3","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"À Distância","arma":"Funda","bonus":10,"dano":"1d6+3","tipoDano":null,"critico":null,"extra":null}
  ],
  habilidades: [
    {"titulo":"Aparência Inofensiva (Reação)","texto":"A primeira criatura inteligente (Int –3 ou maior) que atacar o charlatão em uma cena deve fazer um teste de Vontade (CD 16). Se falhar, perderá sua ação."},
    {"titulo":"Engambelar (Completa)","texto":"O charlatão conquista a simpatia das pessoas ao seu redor. Isso simula a magia Enfeitiçar (veja Ameaças de Arton, p. 376), mas afeta todos os humanoides em alcance curto (Von CD 16 evita)."},
    {"titulo":"Sorte Salvadora (Reação)","texto":"Uma vez por rodada, quando faz um teste de resistência, o charlatão pode rolar novamente esse teste."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":5},{"nome":"Diplomacia","valor":8},{"nome":"Enganação","valor":14},{"nome":"Furtividade","valor":9},{"nome":"Jogatina","valor":8},{"nome":"Ladinagem","valor":7}],
  equipamento: "Adaga, capa esvoaçante, funda, gazua, pedras x20, poção de curar ferimentos (2d8+2), poção falsa.", tesouro: "Padrão.",
  descricao: "O típico \"trambiqueiro\" — falsificador, vigarista, trapaceira ou mercador ambulante de elixires \"milagrosos\" e outros produtos de origem duvidosa. Use esta ficha para qualquer criminoso que possa enganar os personagens.",
  fonte: "Guia de NPCs", pagina: 72,
},
{
  id: "mercador-desonesto", nome: "Mercador Desonesto",
  nd: "5", ndValor: 5, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Médio", raca: "tritao",
  iniciativa: 8, percepcao: 5, sentidosExtra: null,
  defesa: 23, fort: 6, ref: 12, von: 15,
  resistencias: [
    {"_naoExtraido": true, "textoOriginal": "evasão"}
  ],
  pv: 95, deslocamento: "9m (6q), natação 12m", pm: null,
  atributos: {"For":-1,"Des":4,"Con":0,"Int":2,"Sab":1,"Car":4},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Tridente","bonus":15,"dano":"1d8+12","tipoDano":null,"critico":null,"extra":null},
    {"categoria":"À Distância","arma":"Azagaia","bonus":17,"dano":"1d6+12","tipoDano":null,"critico":null,"extra":null}
  ],
  habilidades: [
    {"titulo":"Canção dos Mares (Padrão)","texto":"Uma vez por cena, o mercador pode lançar Enfeitiçar ou Sono (CD 20)."},
    {"titulo":"Chamar Empregados (Movimento)","texto":"O mercador invoca 1d4+1 capangas em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada do mercador, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d10+5 pontos de dano de impacto em uma criatura adjacente. Os capangas têm For 2, Des 1, Defesa 13, 1 PV e falham automaticamente em qualquer teste oposto ou de resistência. Recarga (1d4 rodadas)."},
    {"titulo":"Língua dos Tolos","texto":"O mercador usa Enganação no lugar da Diplomacia para barganha e recebe +5 nesses testes. Se um personagem barganhar com o mercador e perder, o mercador muda o preço a seu favor, como se ele estivesse barganhando (veja Tormenta20, p. 118). O personagem irá acreditar que está fazendo um ótimo negócio, a menos que passe em um teste de Vontade (CD 25)."},
    {"titulo":"Tudo que Você Precisa","texto":"O mercador tem qualquer item mundano superior de até T$ 1.000 em seu estoque. Entretanto, para cada item, role 1d6 para determinar sua condição. 1-2: o item é falso e não funciona. 3-4: o item está defeituoso e precisa ser consertado. 5-6: o item funciona normalmente. O comprador precisa passar em um teste de Percepção ou de um Ofício apropriado (CD 25) para notar qualquer problema no item."}
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":8},{"nome":"Diplomacia","valor":8},{"nome":"Enganação","valor":13},{"nome":"Ladinagem","valor":10},{"nome":"Intuição","valor":5},{"nome":"Misticismo","valor":6}],
  equipamento: "Azagaia x2, capa esvoaçante, gazua, luva de pelica, tridente.", tesouro: "Padrão.",
  descricao: "Um negociante bem-sucedido, talvez até mesmo dono de um bazar ou mestre de caravanas, e completamente salafrário. Grupos recém-chegados de suas aventuras, carregados de ouro para gastar e tesouros para vender, estão entre seus alvos preferidos.",
  fonte: "Guia de NPCs", pagina: 72,
  _duvida: "A perícia Enganação tem um bônus condicional '+18 para barganha' junto de seu +13 base que não é representado estruturalmente (schema só tem nome/valor); mantido apenas o valor base 13 — o +18 fica só documentado aqui.",
},
{
  id: "mestre-assassino", nome: "Mestre Assassino",
  nd: "9", ndValor: 9, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Médio", raca: "elfo",
  iniciativa: 16, percepcao: 11, sentidosExtra: "visão na penumbra",
  defesa: 32, fort: 15, ref: 21, von: 9,
  resistencias: [
    {"_naoExtraido": true, "textoOriginal": "evasão aprimorada"}
  ],
  pv: 152, deslocamento: "12m (8q)", pm: null,
  atributos: {"For":0,"Des":6,"Con":3,"Int":4,"Sab":1,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Duas cimitarras","bonus":25,"dano":"2d6+12","tipoDano":null,"critico":"17","extra":"mais veneno"},
    {"categoria":"À Distância","arma":"Besta pesada","bonus":25,"dano":"3d6+9","tipoDano":null,"critico":"19","extra":"mais veneno"}
  ],
  habilidades: [
    {"titulo":"Assassinar (Movimento)","texto":"O assassino analisa uma criatura em alcance curto. Até o fim de seu próximo turno, ele dobra os dados de dano extras por Ataque Furtivo em seu primeiro Ataque Furtivo que causar dano contra essa criatura."},
    {"titulo":"Ataque Furtivo","texto":"+9d8."},
    {"titulo":"Dança da Morte (Movimento)","texto":"Uma vez por cena, o assassino se movimenta com tanta velocidade que desaparece da visão. Ele fica invisível por 1d4+1 rodadas."},
    {"titulo":"Mão na Boca","texto":"O assassino recebe +2 em testes de agarrar (modificador total +27). Quando faz um ataque furtivo contra uma criatura desprevenida, ele pode fazer um teste de agarrar como uma ação livre. A criatura não poderá falar enquanto estiver agarrada dessa forma."},
    {"titulo":"Veneno","texto":"Peçonha potente (perde 2d12 pontos de vida durante 3 rodadas, Fort CD 30 reduz a duração para 1 rodada)."}
  ],
  magias: null,
  pericias: [{"nome":"Acrobacia","valor":16},{"nome":"Atletismo","valor":10},{"nome":"Enganação","valor":10},{"nome":"Furtividade","valor":16},{"nome":"Ladinagem","valor":16}],
  equipamento: "Besta pesada certeira com mira telescópica, cimitarra certeira x2, couraça sob medida, gazua aprimorada, virote de adamante x20.", tesouro: "Padrão.",
  descricao: "Este costuma ser o melhor assassino que o dinheiro pode pagar. Alguns, no entanto, não trabalham por moedas; seguem um código pessoal, são devotos de deuses cruéis ou apenas alimentam algum prazer sádico em tirar vidas. Pode também ser o líder de uma guilda de assassinos.",
  fonte: "Guia de NPCs", pagina: 73,
},
{
  id: "punguista", nome: "Punguista",
  nd: "1/2", ndValor: 0.5, subsecao: "o-crime",
  tipo: "Humanoide", tamanho: "Pequeno", raca: "goblin",
  iniciativa: 8, percepcao: 3, sentidosExtra: "visão no escuro",
  defesa: 14, fort: 1, ref: 6, von: 3,
  resistencias: [],
  pv: 11, deslocamento: "12m (8q), escalada 12m (8q)", pm: null,
  atributos: {"For":0,"Des":4,"Con":0,"Int":2,"Sab":0,"Car":-2},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Adaga","bonus":5,"dano":"1d4+4","tipoDano":null,"critico":"19","extra":null}
  ],
  habilidades: [],
  magias: null,
  pericias: [{"nome":"Acrobacia","valor":6},{"nome":"Atletismo","valor":6},{"nome":"Furtividade","valor":10},{"nome":"Ladinagem","valor":10}],
  equipamento: "Adaga, gazua.", tesouro: "Metade.",
  descricao: "Um ladrão típico, que infesta as praças e os becos de grandes cidades. Seu modo de \"trabalho\" é furtar sua vítima e desaparecer antes que ela perceba. Se for visto, tentará fugir.",
  fonte: "Guia de NPCs", pagina: 73,
},

{
  id: "barao", nome: "Barão",
  nd: "7", ndValor: 7, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 8, percepcao: 9, sentidosExtra: null,
  defesa: 32, fort: 21, ref: 7, von: 14,
  resistencias: [{categoria:"reducao", alvo:null, valor:10}, {categoria:"resistencia", alvo:"medo", valor:2}],
  pv: 220, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":3,"Des":1,"Con":3,"Int":2,"Sab":2,"Car":3},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Espada bastarda x2","bonus":24,"dano":"3d6+20","tipoDano":null,"critico":"18","extra":null}],
  habilidades: [
    {titulo:"Guarda Pessoal", texto:"O barão está sempre acompanhado de dois guardas palacianos (veja p. 71) que não contam para o cálculo de XP e tesouro do encontro."},
    {titulo:"Presença Aristocrática (Reação)", texto:"Quando uma criatura inteligente (Int –3 ou maior) tenta machucar o barão, deve fazer um teste de Vontade (CD 24). Se falhar, não conseguirá machucá-lo e perderá a ação. O barão só pode usar esta habilidade uma vez por cena contra cada criatura."},
  ],
  magias: null,
  pericias: [{"nome":"Diplomacia","valor":17},{"nome":"Guerra","valor":14},{"nome":"Intimidação","valor":10},{"nome":"Intuição","valor":14},{"nome":"Nobreza","valor":14}],
  equipamento: "Armadura completa reforçada, escudo pesado, espada bastarda certeira de adamante, tabardo aprimorado.", tesouro: "Dobro",
  descricao: "Antes de despertar a atenção de reis e generais, aventureiros muitas vezes serão contratados por barões. Embora seja membro da baixa nobreza, um barão tem várias propriedades rurais, seu próprio castelo e um bom número de guardas e cavaleiros.",
  fonte: "Guia de NPCs", pagina: 74,
},
{
  id: "castelao", nome: "Castelão",
  nd: "4", ndValor: 4, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 4, percepcao: 7, sentidosExtra: null,
  defesa: 22, fort: 10, ref: 4, von: 16,
  resistencias: [],
  pv: 90, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":2,"Des":0,"Con":3,"Int":2,"Sab":3,"Car":2},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Maça x2","bonus":15,"dano":"1d8+7","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {titulo:"Chamar Reforços (Padrão)", texto:"O castelão invoca 1d4 guardas palacianos (veja p. 71) que surgem em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do castelão. Recarga (1d4 rodadas)."},
    {titulo:"Desconfiar", texto:"Uma vez por cena, o castelão pode rolar novamente um teste de Intuição ou Percepção recém-realizado."},
    {titulo:"Gritar Ordens (Padrão)", texto:"Os aliados em alcance médio do castelão recebem +2 em testes de perícia até o fim da rodada."},
  ],
  magias: null,
  pericias: [{"nome":"Conhecimento","valor":6},{"nome":"Diplomacia","valor":6},{"nome":"Intimidação","valor":6},{"nome":"Intuição","valor":7},{"nome":"Nobreza","valor":8}],
  equipamento: "Cota de malha, escudo pesado, maça certeira.", tesouro: "Padrão",
  descricao: "O principal conselheiro de um barão, responsável pela administração cotidiana do castelo (daí o nome do cargo). Pode ser um guarda veterano ou um nobre menor; arrogante e corrupto ou justo e honrado. De qualquer forma, normalmente será o primeiro contato de aventureiros iniciantes com o poder.",
  fonte: "Guia de NPCs", pagina: 74,
},
{
  id: "cavaleiro", nome: "Cavaleiro",
  nd: "5", ndValor: 5, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 5, percepcao: 5, sentidosExtra: null,
  defesa: 26, fort: 17, ref: 9, von: 7,
  resistencias: [{categoria:"resistencia", alvo:"medo", valor:5}],
  pv: 145, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":3,"Des":1,"Con":3,"Int":0,"Sab":1,"Car":3},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Lança montada","bonus":16,"dano":"1d8+12","tipoDano":null,"critico":"x3","extra":"alcance 3m"},
    {"categoria":"Corpo a Corpo","arma":"Espada longa","bonus":16,"dano":"1d8+12","tipoDano":null,"critico":"19","extra":null},
  ],
  habilidades: [
    {titulo:"Cavaleiro Experiente", texto:"O cavaleiro passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montado. Além disso, quando faz uma investida montada, ele causa +2d8 pontos de dano e pode continuar se movendo depois do ataque. Ele deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento."},
    {titulo:"Corcel de Batalha", texto:"O cavaleiro cavalga um cavalo de guerra (veja Tormenta20, p. 262). Enquanto ele estiver montado, seu deslocamento se torna 15m, ele recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo."},
    {titulo:"Duelo (Livre)", texto:"Uma vez por rodada, o cavaleiro escolhe um oponente em alcance curto e recebe +2 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":7},{"nome":"Cavalgar","valor":7},{"nome":"Diplomacia","valor":9},{"nome":"Guerra","valor":4},{"nome":"Nobreza","valor":4}],
  equipamento: "Cavalo de guerra, escudo pesado, espada longa, lança montada, meia armadura, tabardo aprimorado.", tesouro: "Padrão",
  descricao: "O patamar mais baixo da nobreza feudal, cavaleiros não possuem terras próprias, em vez disso morando no castelo de um barão ou outro nobre. Servem como guerreiros de elite, capazes de lutar tanto dentro dos salões do castelo para proteger seu senhor, quanto no campo de batalha para esmagar os inimigos dele. Suas personalidades variam — de guerreiros sérios e sisudos a dândis que adoram torneios e bailes —, mas quase sempre serão rivais de aventureiros intrometidos.",
  fonte: "Guia de NPCs", pagina: 74,
},
{
  id: "cortesao", nome: "Cortesão",
  nd: "1", ndValor: 1, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 3, percepcao: 3, sentidosExtra: null,
  defesa: 14, fort: 1, ref: 5, von: 10,
  resistencias: [],
  pv: 24, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":0,"Des":1,"Con":1,"Int":1,"Sab":1,"Car":4},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Adaga","bonus":7,"dano":"1d4+4","tipoDano":null,"critico":"19","extra":"mais veneno"}],
  habilidades: [
    {titulo:"Desprezo", texto:"O cortesão recebe +2 na Defesa e em testes de perícia contra criaturas inteligentes (Int –3 ou maior) com Carisma menor que o dele."},
    {titulo:"Veneno", texto:"Peçonha concentrada (perde 1d12 pontos de vida por rodada por 3 rodadas, Fort CD 16 reduz a duração para 1 rodada)."},
  ],
  magias: null,
  pericias: [{"nome":"Atuação","valor":8},{"nome":"Diplomacia","valor":8},{"nome":"Intimidação","valor":8},{"nome":"Intuição","valor":5},{"nome":"Nobreza","valor":8}],
  equipamento: "Adaga, peçonha concentrada x3, traje da corte.", tesouro: "Padrão",
  descricao: "Membros de menor importância da corte. Enquanto alguns possuem cargos burocráticos ou diplomáticos, outros estão ali simplesmente porque agradam a alguém importante, entretendo (e bajulando) os nobres com conversas, músicas, jogos e danças.",
  fonte: "Guia de NPCs", pagina: 75,
},
{
  id: "guarda-costas-real", nome: "Guarda-costas Real",
  nd: "8", ndValor: 8, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 8, percepcao: 16, sentidosExtra: null,
  defesa: 33, fort: 20, ref: 9, von: 15,
  resistencias: [{categoria:"imunidade", alvo:"desprevenido e surpreendido", valor:null}, {categoria:"reducao", alvo:null, valor:5}],
  pv: 70, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":4,"Des":0,"Con":4,"Int":0,"Sab":2,"Car":0},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Alabarda x2","bonus":27,"dano":"4d6+20","tipoDano":null,"critico":"x4","extra":null}],
  habilidades: [
    {titulo:"Antecipar Perigo", texto:"Criaturas adjacentes ao guarda-costas recebem imunidade a desprevenido e surpreendido."},
    {titulo:"Golpe Punitivo", texto:"O guarda-costas recebe +5 na margem de ameaça contra criaturas que tenham atacado ele mesmo ou um de seus aliados na cena."},
    {titulo:"Retaliar (Reação)", texto:"Uma vez por rodada, quando o guarda-costas ou um aliado adjacente é alvo de um ataque corpo a corpo, o guarda-costas pode fazer um ataque na criatura que o atacou."},
    {titulo:"Zeloso (Reação)", texto:"Uma vez por rodada, se um aliado adjacente for alvo de um ataque, o guarda-costas pode se tornar o alvo do ataque, que é resolvido normalmente."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":13},{"nome":"Intuição","valor":12}],
  equipamento: "Alabarda aumentada, armadura completa.", tesouro: "Padrão",
  descricao: "Selecionado entre os melhores combatentes do reino, este guarda-costas de elite traja armadura pesada e empunha uma arma mais pesada ainda. Pode ser encontrado nos pontos mais importantes de um castelo ou palácio, como a sala do tesouro e o quarto do regente.",
  fonte: "Guia de NPCs", pagina: 75,
},
{
  id: "mago-da-corte", nome: "Mago da Corte",
  nd: "10", ndValor: 10, subsecao: "a-corte",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 10, percepcao: 11, sentidosExtra: null,
  defesa: 33, fort: 16, ref: 10, von: 22,
  resistencias: [{categoria:"imunidade", alvo:"desprevenido e surpreendido", valor:null}, {categoria:"reducao", alvo:null, valor:5}],
  pv: 220, deslocamento: "9m (6q)", pm: 77,
  atributos: {"For":0,"Des":1,"Con":3,"Int":5,"Sab":2,"Car":2},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Bordão","bonus":24,"dano":"1d6+5","tipoDano":null,"critico":null,"extra":null}],
  habilidades: [
    {titulo:"Arcano de Batalha", texto:"O mago da corte soma sua Inteligência nas rolagens de dano com magias (já contabilizado)."},
    {titulo:"Biblioteca Mágica (Padrão, 1 PM)", texto:"O mago saca um pergaminho de uma magia arcana de até 3º círculo. Ele pode ativar o pergaminho (gastando a ação normal para isso) e lançar a magia contida nele como se a conhecesse."},
    {titulo:"Magia Acelerada (Livre, +4 PM)", texto:"Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o mago muda a execução dela para livre."},
  ],
  magias: {conjurador:"mago de 10º nível (CD 32)", lista:[
    {titulo:"Bola de Fogo (Padrão, 10 PM)", texto:"O mago causa 12d6+5 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade)."},
    {titulo:"Campo de Força (Reação, 7 PM)", texto:"Quando sofre dano, o mago recebe redução de dano 50 contra esse dano."},
    {titulo:"Dissipar Magia (Padrão, 3 PM)", texto:"O mago escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula)."},
    {titulo:"Lendas e Histórias (Padrão, 6 PM)", texto:"Descobre informações sobre uma criatura, objeto ou local que esteja tocando."},
    {titulo:"Runa de Proteção (1 hora, 10 PM)", texto:"Cria uma runa que protege uma passagem. Quando uma criatura entra na área afetada, a runa explode, causando 20d6 pontos de dano de fogo em todos os alvos até 6m."},
    {titulo:"Seta Infalível de Talude (Padrão, 7 PM)", texto:"O mago projeta cinco setas de energia em até cinco criaturas em alcance médio. Cada seta causa 1d8+1 pontos de dano de essência (uma delas recebe +5 na rolagem de dano)."},
  ]},
  pericias: [{"nome":"Conhecimento","valor":14},{"nome":"Misticismo","valor":18},{"nome":"Nobreza","valor":14},{"nome":"Ofício (alquimista)","valor":14}],
  equipamento: "Bordão, chapéu arcano, essência de mana, medalhão de prata, poção de curar ferimentos (7d8+7 PV), robe místico aprimorado.", tesouro: "Dobro",
  descricao: "Embora atue principalmente como conselheiro, este arcanista está sempre preparado para conjurar poderosos feitiços em defesa de seu regente, atuando em conjunto com os guardas reais.",
  fonte: "Guia de NPCs", pagina: 76,
},

{
  id: "arquivista", nome: "Arquivista",
  nd: "6", ndValor: 6, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 5, percepcao: 9, sentidosExtra: "visão no escuro",
  defesa: 24, fort: 12, ref: 6, von: 18,
  resistencias: [],
  pv: 145, deslocamento: "6m (4q)", pm: 29,
  atributos: {"For":1,"Des":0,"Con":1,"Int":3,"Sab":4,"Car":1},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Bordão x2","bonus":16,"dano":"1d6+6","tipoDano":null,"critico":null,"extra":"mais 2d6 luz"}],
  habilidades: [
    {titulo:"Histórias da Companhia (Padrão)", texto:"Uma vez por cena, o arquivista relembra seus companheiros de alguma missão bem-sucedida. Até o fim da cena, o arquivista e seus aliados em alcance médio recebem +5 nos testes de uma perícia específica (exceto testes de ataque)."},
    {titulo:"Símbolo Sagrado Energizado (Movimento, 1 PM)", texto:"O arquivista energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz prateada que ilumina como uma tocha e, enquanto estiver sendo empunhado, reduz o custo de magias divinas em –1 PM."},
    {titulo:"Voz da Civilização", texto:"O arquivista está sempre sob efeito da magia Compreensão."},
  ],
  magias: {conjurador:"clérigo de Tanna-Toh de 6º nível (CD 22)", lista:[
    {titulo:"Arma Espiritual (Padrão, 5 PM sustentada)", texto:"Uma vez por rodada, como uma ação livre, o arquivista causa 3d6 pontos de dano de impacto automaticamente a uma criatura adjacente. Se não fizer isso e sofrer um ataque corpo a corpo nessa rodada, ele pode usar uma reação para causar esse dano ao atacante."},
    {titulo:"Bênção (Padrão, 3 PM)", texto:"Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena."},
    {titulo:"Curar Ferimentos (Padrão, 5 PM)", texto:"Uma criatura adjacente cura 6d8+6 PV."},
    {titulo:"Oração (Padrão, 3 PM, sustentada)", texto:"O arquivista e seus aliados em alcance curto recebem +2 em testes de perícia e rolagens de dano, e todos os seus inimigos em alcance curto sofrem –2 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias."},
  ]},
  pericias: [{"nome":"Conhecimento","valor":8},{"nome":"Diplomacia","valor":6},{"nome":"Guerra","valor":8},{"nome":"Intuição","valor":9},{"nome":"Investigação","valor":8},{"nome":"Misticismo","valor":8},{"nome":"Nobreza","valor":8},{"nome":"Ofício (escriba)","valor":8},{"nome":"Religião","valor":9}],
  equipamento: "Bordão, cota de malha, essência de mana, símbolo sagrado de Tanna-Toh.", tesouro: "Padrão",
  descricao: "Um misto de escriba, sábio e intendente, o arquivista é encarregado de registrar a história da companhia (para quais reinos ela viajou, de quais batalhas participou…) e redigir os contratos de serviço (documentos que estipulam os termos a serem seguidos pelos mercenários). O arquivista também atua no campo de batalha, usando preces e conhecimento para auxiliar seus companheiros.",
  fonte: "Guia de NPCs", pagina: 76,
},
{
  id: "carcereiro", nome: "Carcereiro",
  nd: "5", ndValor: 5, subsecao: "mercenarios",
  tipo: "Morto-vivo", tamanho: "Médio", raca: "osteon",
  iniciativa: 7, percepcao: 5, sentidosExtra: "visão no escuro",
  defesa: 24, fort: 5, ref: 11, von: 17,
  resistencias: [{categoria:"imunidade", alvo:"medo", valor:null}, {categoria:"reducao", alvo:"corte, frio e perfuração", valor:5}],
  pv: 180, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":3,"Des":3,"Con":2,"Int":0,"Sab":1,"Car":3},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Ferro em brasa","bonus":13,"dano":"2d6+8","tipoDano":null,"critico":null,"extra":"mais 1d6 fogo"},
    {"categoria":"Corpo a Corpo","arma":"Gancho de carne","bonus":13,"dano":"2d8+8","tipoDano":null,"critico":"x3","extra":null},
  ],
  habilidades: [
    {titulo:"Encarcerar a Coragem (Padrão)", texto:"Criaturas em alcance curto ficam abaladas (Von CD 20 reduz a duração para 1 rodada e a criatura não pode mais ser abalada por esta habilidade até o fim da cena). Recarga (movimento)."},
    {titulo:"Saborear o Tormento", texto:"O carcereiro recebe +2 em testes de ataque e rolagens de dano contra criaturas sob efeito de uma condição de medo."},
  ],
  magias: null,
  pericias: [{"nome":"Cura","valor":5},{"nome":"Intimidação","valor":12}],
  equipamento: "Couraça, ferro em brasa e gancho de carne (equivalentes a uma maça e a uma foice).", tesouro: "Padrão",
  descricao: "Seja com desertores, prisioneiros de guerra ou cativos valiosos esperando resgate, as celas de um forte mercenário sempre estão ocupadas. O encarregado por manter esses prisioneiros na linha é o carcereiro, um indivíduo embrutecido que se diverte com o medo nos olhos de seus “hóspedes”.",
  fonte: "Guia de NPCs", pagina: 77,
},
{
  id: "condotiero", nome: "Condotiero",
  nd: "9", ndValor: 9, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Grande", raca: "centauro",
  iniciativa: 9, percepcao: 9, sentidosExtra: null,
  defesa: 34, fort: 21, ref: 15, von: 9,
  resistencias: [{categoria:"reducao", alvo:null, valor:5}, {categoria:"resistencia", alvo:"efeitos mentais e medo", valor:5}],
  pv: 365, deslocamento: "12m (8q)", pm: null,
  atributos: {"For":5,"Des":1,"Con":4,"Int":1,"Sab":1,"Car":2},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Lança montada x2","bonus":26,"dano":"2d8+18","tipoDano":null,"critico":"x3","extra":null},
    {"categoria":"Corpo a Corpo","arma":"Espada longa x2","bonus":26,"dano":"2d6+18","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"Corpo a Corpo","arma":"Cascos","bonus":26,"dano":"2d8+18","tipoDano":null,"critico":null,"extra":null},
    {"categoria":"À Distância","arma":"Azagaia","bonus":26,"dano":"2d8+18","tipoDano":null,"critico":null,"extra":null},
  ],
  habilidades: [
    {titulo:"Formação de Ataque (Movimento)", texto:"O condotiero comanda seus aliados em alcance médio. Até o início do próximo turno do condotiero, sempre que um desses aliados faz um ataque, rola dois dados e usa o melhor resultado."},
    {titulo:"Formação de Defesa (Movimento)", texto:"O condotiero comanda seus aliados em alcance médio. Até o início do próximo turno do condotiero, cada aliado recebe redução de dano 5."},
    {titulo:"Investida Galopante (Completa)", texto:"O condotiero faz uma investida. Ele pode passar pelo espaço ocupado por criaturas menores que ele, pode continuar se movendo depois do ataque e, se acertar, causa +4d8 pontos de dano. Criaturas no caminho percorrido pelo condotiero sofrem 1d8+9 pontos de dano de impacto e ficam caídas (Ref CD 28 evita)."},
    {titulo:"Medo de Altura", texto:"Se estiver adjacente a uma queda de 3m ou mais de altura, o condotiero fica abalado."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":13},{"nome":"Diplomacia","valor":10},{"nome":"Intimidação","valor":10},{"nome":"Guerra","valor":11}],
  equipamento: "Azagaia aumentada x3, couraça reforçada, escudo pesado, espada longa aumentada, lança montada aumentada.", tesouro: "Padrão",
  descricao: "Mercenários tendem a seguir o líder mais forte e habilidoso nas artes da guerra, alguém capaz de conduzi-los a vitórias (e saques) espetaculares. Chamados de condotieros, estes líderes mercenários podem vir de qualquer raça, até mesmo dos reclusos e desconfiados centauros.",
  fonte: "Guia de NPCs", pagina: 77,
},
{
  id: "espiao", nome: "Espião",
  nd: "3", ndValor: 3, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Médio", raca: "nezumi",
  iniciativa: 9, percepcao: 4, sentidosExtra: "faro, visão no escuro",
  defesa: 20, fort: 5, ref: 13, von: 9,
  resistencias: [
    {_naoExtraido:true, textoOriginal:"esquiva sobrenatural"},
    {_naoExtraido:true, textoOriginal:"evasão"},
    {categoria:"resistencia", alvo:"medo de criaturas maiores", valor:5},
  ],
  pv: 75, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":2,"Des":4,"Con":3,"Int":-1,"Sab":1,"Car":0},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada curta","bonus":12,"dano":"1d8+4","tipoDano":null,"critico":"19","extra":"mais veneno"},
    {"categoria":"Corpo a Corpo","arma":"Mordida","bonus":12,"dano":"1d6+4","tipoDano":null,"critico":null,"extra":"corte"},
    {"categoria":"À Distância","arma":"Besta leve","bonus":12,"dano":"1d8+4","tipoDano":null,"critico":"19","extra":"mais veneno"},
  ],
  habilidades: [
    {titulo:"Ataque Furtivo", texto:"+2d6."},
    {titulo:"Emboscar (Livre)", texto:"O espião executa uma ação padrão adicional em seu turno. Ele só pode usar esta habilidade na primeira rodada de um combate."},
    {titulo:"Roedor", texto:"Quando faz um acerto crítico com sua mordida, o espião deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico (uma armadura avariada impõe –5 na Defesa)."},
    {titulo:"Rolamento Defensivo (Reação)", texto:"Uma vez por rodada, quando sofre dano, o espião reduz esse dano à metade e fica caído."},
    {titulo:"Veneno", texto:"Perde 1d12 pontos de vida."},
  ],
  magias: null,
  pericias: [{"nome":"Acrobacia","valor":8},{"nome":"Atletismo","valor":5},{"nome":"Enganação","valor":3},{"nome":"Furtividade (+11 em urbano)","valor":9},{"nome":"Investigação","valor":2},{"nome":"Intimidação","valor":6},{"nome":"Ladinagem","valor":9}],
  equipamento: "Bandana, besta leve, espada curta aumentada, gazua, sapatos de camurça, virotes x20.", tesouro: "Padrão",
  descricao: "Além dos usos convencionais, um espião pode descobrir oportunidades de trabalho para sua companhia e, em casos extremos, fomentar disputas e criar essas oportunidades. Por sua natureza furtiva, nezumi são excelentes para este trabalho. Sobretudo aqueles que, desgostosos com a paz entre seu povo e os humanos, abandonam Tamu-ra rumo ao continente em busca de oportunidades de empregar suas habilidades.",
  fonte: "Guia de NPCs", pagina: 77,
},
{
  id: "guarda-do-portao", nome: "Guarda do Portão",
  nd: "6", ndValor: 6, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Grande", raca: "gigante",
  iniciativa: 5, percepcao: 6, sentidosExtra: "visão na penumbra",
  defesa: 26, fort: 17, ref: 12, von: 2,
  resistencias: [],
  pv: 52, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":8,"Des":0,"Con":5,"Int":-3,"Sab":-1,"Car":-2},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Machado de guerra x2","bonus":24,"dano":"4d6+17","tipoDano":null,"critico":"x3","extra":null}],
  habilidades: [
    {titulo:"Esperto o Suficiente…", texto:"O guarda do portão sofre uma penalidade de –5 em testes de Vontade (já contabilizado)."},
    {titulo:"…Para Montar Guarda", texto:"Todo dano de corte, impacto e perfuração que o guarda sofre é reduzido à metade e ele nunca fica surpreendido."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":13}],
  equipamento: "Loriga segmentada, machado de guerra aumentado.", tesouro: "Metade",
  descricao: "Ogros podem ser estúpidos e ignorantes. Mas também são grandes, fortes e resistentes. Com essas qualidades, são ótimos para guardar o portão do forte da companhia, impedindo a entrada de indesejáveis e mantendo inimigos à distância tempo suficiente para seus companheiros se prepararem. Infelizmente, nem sempre o ogro lembra quem faz parte do bando ou não e pode manter um colega mercenário do lado de fora por horas, até ser convencido de que aquele “estranho” pode entrar.",
  fonte: "Guia de NPCs", pagina: 78,
},
{
  id: "gorlogg-de-estimacao", nome: "Gorlogg de Estimação",
  nd: "2", ndValor: 2, subsecao: "mercenarios",
  tipo: "Animal", tamanho: "Grande", raca: null,
  iniciativa: 5, percepcao: 4, sentidosExtra: "visão na penumbra",
  defesa: 20, fort: 10, ref: 7, von: 5,
  resistencias: [{categoria:"resistencia", alvo:"mental", valor:2}],
  pv: 72, deslocamento: "9m (6q)", pm: null,
  atributos: {"For":5,"Des":2,"Con":5,"Int":-4,"Sab":1,"Car":-4},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Mordida","bonus":12,"dano":"2d8+8","tipoDano":null,"critico":"x3","extra":null}],
  habilidades: [
    {titulo:"Agarrar Aprimorado (Livre)", texto:"Mordida (teste +16). A criatura agarrada sofre 5 pontos de dano de perfuração quando é agarrada e no início de cada turno do gorlogg de estimação, enquanto estiver agarrada."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":10}],
  equipamento: "Cota de malha espinhosa.", tesouro: "Nenhum",
  descricao: "Este mascote é um gorlogg adulto, criado e treinado pelos mercenários para servir de animal de estimação, “cão de guarda” e companheiro de batalha. Manter feras selvagens como mascotes é um costume entre bandos mercenários. Além de seus usos práticos, um mascote selvagem é um símbolo de status e poder para o bando; quanto mais perigosa e rara a criatura, melhor.",
  fonte: "Guia de NPCs", pagina: 78,
},
{
  id: "sargento", nome: "Sargento",
  nd: "3", ndValor: 3, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Médio", raca: "anao",
  iniciativa: 2, percepcao: 5, sentidosExtra: "+7 em subterrâneo, visão no escuro",
  defesa: 20, fort: 14, ref: 4, von: 9,
  resistencias: [{categoria:"resistencia", alvo:"encantamento", valor:2}],
  pv: 80, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":4,"Des":-1,"Con":5,"Int":0,"Sab":2,"Car":0},
  ataques: [{"categoria":"Corpo a Corpo","arma":"Machado anão","bonus":17,"dano":"2d10+12","tipoDano":null,"critico":"x3","extra":null}],
  habilidades: [
    {titulo:"“De Pé, Preguiçoso!” (Movimento)", texto:"O sargento mercenário reanima um aliado vivo com 0 ou menos PV em alcance curto. O aliado acorda estável e com 2d6 PV. Uma criatura só pode ser reanimada por esta habilidade uma vez por cena."},
    {titulo:"“Lutem, Infelizes!” (Movimento)", texto:"O sargento grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de ataque e rolagens de dano até o fim da cena."},
    {titulo:"“Mexam-se!” (Movimento)", texto:"O sargento aumenta em +6m o deslocamento de seus aliados em alcance curto até o início de seu próximo turno."},
  ],
  magias: null,
  pericias: [{"nome":"Intimidação","valor":5},{"nome":"Guerra","valor":5}],
  equipamento: "Escudo pesado, machado anão, meia armadura.", tesouro: "Padrão",
  descricao: "Anões normalmente são durões, resistentes e disciplinados. E também mal-humorados e impacientes. Em suma, reúnem todas as qualidades necessárias para transformar um grupo de mercenários indisciplinados e desorganizados em uma unidade de soldados eficiente. Muitos anões que se unem a mercenários buscam o prazer da luta e pilhagem, enquanto outros acabam nesses grupos para fugir de algum crime ou problema em sua terra natal.",
  fonte: "Guia de NPCs", pagina: 78,
},
{
  id: "soldado-da-fortuna", nome: "Soldado da Fortuna",
  nd: "1", ndValor: 1, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Médio", raca: "humano",
  iniciativa: 3, percepcao: 2, sentidosExtra: null,
  defesa: 16, fort: 10, ref: 5, von: 1,
  resistencias: [],
  pv: 10, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":3,"Des":1,"Con":2,"Int":-1,"Sab":0,"Car":-1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Alabarda","bonus":11,"dano":"1d12+10","tipoDano":null,"critico":"x3","extra":null},
    {"categoria":"À Distância","arma":"Arco longo","bonus":5,"dano":"1d8+6","tipoDano":null,"critico":"x3","extra":null},
  ],
  habilidades: [],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":5}],
  equipamento: "Alabarda, arco longo, cota de malha, flechas x20.", tesouro: "Metade",
  descricao: "Os combatentes que formam a base de uma companhia mercenária têm as mais diversas origens, desde guardas saídos de um exército real até aqueles que encontraram no serviço mercenário a melhor (ou única) forma de conseguir algum sustento. Estes soldados de aluguel muitas vezes veem mais ação do que militares de alguns exércitos e acabam compensando com a experiência prática o que lhes falta em treinamento formal.",
  fonte: "Guia de NPCs", pagina: 78,
},
{
  id: "tenente", nome: "Tenente",
  nd: "5", ndValor: 5, subsecao: "mercenarios",
  tipo: "Humanoide", tamanho: "Médio", raca: "minotauro",
  iniciativa: 6, percepcao: 3, sentidosExtra: "faro",
  defesa: 24, fort: 17, ref: 5, von: 11,
  resistencias: [{categoria:"resistencia", alvo:"efeitos mentais e medo", valor:2}],
  pv: 180, deslocamento: "6m (4q)", pm: null,
  atributos: {"For":5,"Des":1,"Con":4,"Int":2,"Sab":0,"Car":1},
  ataques: [
    {"categoria":"Corpo a Corpo","arma":"Espada longa","bonus":17,"dano":"2d8+12","tipoDano":null,"critico":"19","extra":null},
    {"categoria":"Corpo a Corpo","arma":"Chifres","bonus":17,"dano":"2d6+12","tipoDano":null,"critico":null,"extra":null},
    {"categoria":"À Distância","arma":"Azagaia","bonus":16,"dano":"1d6+10","tipoDano":null,"critico":null,"extra":"mais 1d6 perfuração"},
  ],
  habilidades: [
    {titulo:"Bloqueio com Escudo (Reação)", texto:"Uma vez por rodada, quando sofre dano de um ataque, o tenente mercenário reduz esse dano em 5."},
    {titulo:"“De Pé, Preguiçoso!” (Movimento)", texto:"O tenente reanima um aliado vivo com 0 ou menos PV em alcance curto. O aliado acorda estável e com 3d6 PV. Uma criatura só pode ser reanimada por esta habilidade uma vez por cena."},
    {titulo:"Medo de Altura", texto:"Se estiver adjacente a uma queda de 3m ou mais de altura, o tenente fica abalado."},
  ],
  magias: null,
  pericias: [{"nome":"Atletismo","valor":11},{"nome":"Guerra","valor":8},{"nome":"Intimidação","valor":7}],
  equipamento: "Azagaia x3, cota de malha, escudo pesado, espada longa.", tesouro: "Padrão",
  descricao: "O segundo em comando na maioria das companhias mercenárias, o tenente é o braço direito do condotiero, executando suas ordens e liderando partes da companhia nas ocasiões em que é necessário dividir suas forças. Um combatente experiente, o tenente é tão perigoso liderando mercenários quanto manejando suas próprias armas.",
  fonte: "Guia de NPCs", pagina: 79,
},
{
  id: "vidente", nome: "Vidente",
  nd: "5", ndValor: 5, subsecao: "mercenarios",
  tipo: "Espírito", tamanho: "Médio", raca: "sulfure",
  iniciativa: 7, percepcao: 5, sentidosExtra: "visão no escuro",
  defesa: 22, fort: 5, ref: 11, von: 17,
  resistencias: [],
  pv: 99, deslocamento: "9m (6q)", pm: 39,
  atributos: {"For":0,"Des":3,"Con":3,"Int":4,"Sab":1,"Car":1},
  ataques: [],
  habilidades: [
    {titulo:"Diabretes Sombrios (Padrão)", texto:"Uma vez por cena, o vidente invoca 1d4+1 diabretes sombrios em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do conjurador, têm deslocamento 9m (normal e de voo) e podem gastar uma ação padrão para causar 1d6+2 pontos de dano de trevas em uma criatura adjacente. Os diabretes sombrios são espíritos, têm For 2, Des 2, Defesa 14 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena."},
    {titulo:"Magia Acelerada (Livre, +4 PM)", texto:"Uma vez por rodada, quando usa seu Raio Arcano ou lança uma magia com execução de ação completa ou menor, o conjurador muda a execução dessa ação para livre."},
    {titulo:"Raio Arcano (Padrão)", texto:"Uma criatura em alcance médio sofre 2d12 pontos de dano de essência (Ref CD 28 reduz à metade)."},
  ],
  magias: {conjurador:"bruxo de 5º nível (CD 23, –1 PM no custo de Escuridão). Seu foco arcano é sua varinha arcana.", lista:[
    {titulo:"Escuridão (Padrão, 2 PM)", texto:"Até o fim da cena, um objeto em alcance curto emana escuridão total em um raio de 6m, bloqueando a visão na área e através dela."},
    {titulo:"Imagem Espelhada (Padrão, 5 PM)", texto:"O conjurador cria 4 cópias ilusórias de si mesmo que fornecem +8 na Defesa. Cada vez que um ataque contra ele erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada."},
    {titulo:"Relâmpago (Padrão, 5 PM)", texto:"Criaturas em uma linha de 30m sofrem 8d6 pontos de dano de eletricidade (Ref reduz à metade)."},
    {titulo:"Seta Infalível de Talude (Padrão, 5 PM)", texto:"Dispara 5 setas de energia distribuídas em até 5 criaturas em alcance médio. Cada seta causa 1d4+1 pontos de dano de essência."},
  ]},
  pericias: [{"nome":"Enganação","valor":7},{"nome":"Furtividade","valor":9},{"nome":"Guerra","valor":8},{"nome":"Intuição","valor":5},{"nome":"Misticismo","valor":8}],
  equipamento: "Varinha arcana.", tesouro: "Padrão",
  descricao: "Mesmo o mais embrutecido mercenário reconhece o valor da magia. O vidente mercenário é um misto de fonte de informações e arma de cerco. Seus poderes de adivinhação mantêm a companhia informada, enquanto suas magias de destruição asseguram uma vantagem importante no campo de batalha.",
  fonte: "Guia de NPCs", pagina: 79,
},

];
window.POVO_ARTON = POVO_ARTON;

/* ============================================================
   POVO_NOTAS — conteúdo de referência da seção Povo de Arton que NÃO
   é ficha de NPC (por isso mora fora do array POVO_ARTON): duas
   caixas de regra citadas no livro, mas sem stat block próprio.
   Cada nota: { id, titulo, itens: [{titulo, texto}] }. Renderizada
   como caixas "ld-destaque" (mesmo visual das caixas de Poder
   Concedido/Artefato usadas em Lendas) no rodapé da seção Povo.
============================================================ */
const POVO_NOTAS = [
  {
    id: 'npcs-outras-racas',
    titulo: 'NPCs de Outras Raças',
    resumo: 'A maioria dos NPCs genéricos deste livro é humana, mas Arton é um mundo diverso. A seguir estão ajustes que você pode aplicar nas fichas para substituir as raças delas — uma simplificação em relação às regras de raças para jogadores.',
    itens: [
      { titulo: 'Anão', texto: 'Con +1, Des –1, Fort +1, Ref –1, +2 PV/ND, recebe Visão no Escuro, muda deslocamento para 6m e arma corpo a corpo para machado anão, +1 em ataque com o machado.' },
      { titulo: 'Dahllan', texto: 'Sab +1, Int –1, Percepção +1, Von +1, recebe Empatia Selvagem e uma vez por cena pode lançar Controlar Plantas.' },
      { titulo: 'Elfo', texto: 'Int +1, Con –1, Percepção +2, Fort –1, –1 PV/nível, deslocamento +3m.' },
      { titulo: 'Goblin', texto: 'Des +1, Car –1, tamanho Pequeno, Iniciativa +1, Def +1, Fort +2, Ref +1, recebe Visão no Escuro e deslocamento de escalada igual ao deslocamento terrestre.' },
      { titulo: 'Hynne', texto: 'Des +1, For –1, tamanho Pequeno, Iniciativa +1, Def +1, Ref +1, deslocamento –3m, –1 em testes de ataque e rolagens de dano corpo a corpo, recebe um ataque à distância de funda.' },
      { titulo: 'Humano', texto: 'Para transformar um NPC de outra raça em humano, simplesmente "desaplique" os ajustes da raça dele.' },
      { titulo: 'Lefou', texto: 'Car –1, recebe +2 em uma perícia ou um poder da Tormenta à sua escolha.' },
      { titulo: 'Minotauro', texto: 'For +1, Sab –1, Def +1, Von –1, recebe um ataque de chifres (teste de ataque igual ao ataque corpo a corpo já existente, dano 1d6+Força), +1 em testes de ataque e rolagens de dano corpo a corpo, recebe Faro e Medo de Altura.' },
      { titulo: 'Qareen', texto: 'Car +1, Sab –1, Percepção –1, Von –1, recebe Tatuagem Mística (uma vez por cena, pode lançar uma magia específica de 1º círculo).' },
      { titulo: 'Sereia', texto: 'Deslocamento de natação 12m e pode lançar uma das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono.' },
      { titulo: 'Suraggel', texto: 'Sab +1 e pode lançar Luz (aggelus); Des +1 e pode lançar Escuridão (sulfure). Ambos são do tipo espírito e recebem Visão no Escuro.' },
      { titulo: 'Trog', texto: 'Con +1, Int –1, Def +1, Fort +1, +2 PV/ND, recebe um ataque de mordida (teste de ataque igual ao ataque corpo a corpo já existente, dano 1d6+Força), Sangue Frio e Mau Cheiro.' },
    ],
    fonte: 'Guia de NPCs', pagina: 67,
  },
  {
    id: 'trucos-mercenarios',
    titulo: 'Truques Mercenários',
    resumo: 'Para personalizar uma companhia de mercenários, escolha uma das habilidades a seguir e aplique-a a todos os membros da companhia.',
    itens: [
      { titulo: 'Armaduras Reforçadas', texto: 'O mercenário recebe +2 na Defesa.' },
      { titulo: 'Armas Envenenadas', texto: 'Quando acerta seu primeiro ataque com arma na cena, o mercenário faz com que a vítima perca 1d12 pontos de vida por veneno.' },
      { titulo: 'Disciplina Surpreendente', texto: 'O mercenário recebe +2 em testes de resistência.' },
      { titulo: 'Lâminas Farpadas', texto: 'O multiplicador de crítico dos ataques corpo a corpo do mercenário aumenta em +1.' },
      { titulo: 'Pó Ardente (Movimento)', texto: 'Uma vez por cena, o mercenário deixa uma criatura adjacente ofuscada. A vítima pode remover essa condição gastando uma ação padrão para limpar os olhos.' },
      { titulo: 'Táticas de Emboscada', texto: 'Os ataques do mercenário causam +2d6 pontos de dano contra criaturas surpreendidas.' },
    ],
    fonte: 'Guia de NPCs', pagina: 81,
  },
];
window.POVO_NOTAS = POVO_NOTAS;
