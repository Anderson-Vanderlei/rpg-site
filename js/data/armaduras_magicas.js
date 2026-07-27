/* ============================================================
   TORMENTA 20 — armaduras_magicas.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 337-340 (Armaduras & Escudos Específicos)

   Mesmo esquema de armas_magicas.js — ver os comentários lá pra
   entender os campos baseId/encantosFixos/melhoriasFixas/materialFixo.

   Cada entrada:
   { id, nome, tipo: 'armadura'|'escudo', baseId, preco,
     encantosFixos: [], melhoriasFixas: [], materialFixo: null|id,
     descricao, especial }
============================================================ */

const ARMADURAS_ESCUDOS_ESPECIFICOS = [
  {
    id: 'armadura-da-luz', nome: 'Armadura da Luz', tipo: 'armadura', baseId: 'armadura-completa', preco: 'T$ 150.000',
    encantosFixos: ['guardiao', 'zeloso'], melhoriasFixas: ['banhado-a-ouro'], materialFixo: null,
    descricao: 'Esta armadura completa banhada a ouro guardiã zelosa possui o símbolo de Khalmyr gravado no peitoral.',
    especial: 'Se você possuir um código de conduta (de honra, do herói...) ou for devoto de uma divindade que canaliza apenas energia positiva, recebe redução de dano igual ao seu Carisma.',
  },
  {
    id: 'baluarte-anao', nome: 'Baluarte Anão', tipo: 'armadura', baseId: 'armadura-completa', preco: 'T$ 50.000',
    encantosFixos: ['defensor'], melhoriasFixas: ['reforcada'], materialFixo: 'adamante',
    descricao: 'Esta armadura completa reforçada defensora de adamante fornece proteção sem igual.',
    especial: 'Se você não se deslocar em seu turno, a RD que ela fornece aumenta para 10 até seu próximo turno.',
  },
  {
    id: 'carapaca-demoniaca', nome: 'Carapaça Demoníaca', tipo: 'armadura', baseId: 'armadura-completa', preco: 'T$ 63.000',
    encantosFixos: ['guardiao'], melhoriasFixas: ['macabro', 'reforcada'], materialFixo: null,
    descricao: 'Esta armadura completa é forjada para fazer com que o usuário pareça um demônio — o elmo tem o formato de uma cabeça demoníaca com chifres e o usuário enxerga através da boca aberta e repleta de dentes.',
    especial: 'Se você for devoto de uma divindade que canaliza apenas energia negativa, os seus ataques corpo a corpo causam +1d8 de dano de trevas.',
  },
  {
    id: 'cota-elfica', nome: 'Cota Élfica', tipo: 'armadura', baseId: 'cota-de-malha', preco: 'T$ 30.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: 'mitral',
    descricao: 'Composta de anéis finíssimos, esta cota de malha defensora de mitral parece ser feita de seda.',
    especial: 'Ela permite que você aplique sua Destreza na Defesa como se fosse uma armadura leve.',
  },
  {
    id: 'couraca-do-comando', nome: 'Couraça do Comando', tipo: 'armadura', baseId: 'couraca', preco: 'T$ 45.000',
    encantosFixos: ['defensor'], melhoriasFixas: ['banhado-a-ouro', 'sob-medida'], materialFixo: null,
    descricao: 'Esta couraça sob medida irradia uma aura de autoridade.',
    especial: 'Você recebe +1 em Carisma. Se usar o poder Comandar, o bônus fornecido aumenta para +2.',
  },
  {
    id: 'couro-de-monstro', nome: 'Couro de Monstro', tipo: 'armadura', baseId: 'gibao-de-peles', preco: 'T$ 36.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Usado por chefes bárbaros das Montanhas Sanguinárias, este gibão de peles defensor é feito do couro de monstros, como basiliscos e serpes.',
    especial: 'Se você usar o poder Ataque Poderoso ou fizer uma investida, recebe um bônus de +2d6 nas rolagens de dano.',
  },
  {
    id: 'loriga-do-centuriao', nome: 'Loriga do Centurião', tipo: 'armadura', baseId: 'loriga-segmentada', preco: 'T$ 45.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta loriga segmentada defensora é dourada com detalhes em vermelho e possui o símbolo de Tauron, antigo Deus da Força, gravado no peitoral.',
    especial: 'Se estiver liderando uma ou mais criaturas (em termos de jogo, se estiver usando o poder Comandar ou similar), seus ataques corpo a corpo causam +2d6 de fogo.',
  },
  {
    id: 'manto-da-noite', nome: 'Manto da Noite', tipo: 'armadura', baseId: 'couro-batido', preco: 'T$ 45.000',
    encantosFixos: ['defensor', 'sombrio'], melhoriasFixas: ['ajustada'], materialFixo: null,
    descricao: 'Este couro batido é negro com partes metálicas foscas.',
    especial: 'Quando usa esta armadura, você não sofre penalidade em testes de Furtividade por se mover em seu deslocamento normal e a penalidade que você sofre em testes de Furtividade por atacar diminui para –10.',
  },
  {
    id: 'escudo-de-azgher', nome: 'Escudo de Azgher', tipo: 'escudo', baseId: 'escudo-pesado', preco: 'T$ 140.000',
    encantosFixos: ['guardiao'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este escudo pesado guardião é forjado na forma de um sol estilizado.',
    especial: 'Você pode gastar uma ação padrão e 10 PM para fazê-lo emitir uma luz brilhante e quente num cone com alcance curto. A luz gera os efeitos da magia Visão da Verdade e causa 6d6 pontos de dano de fogo em todos os seus inimigos (mortos-vivos e criaturas vulneráveis a luz solar sofrem 6d8 pontos de dano). Você pode gastar 1 PM no início de cada um de seus turnos para manter a luz.',
  },
  {
    id: 'escudo-do-conjurador', nome: 'Escudo do Conjurador', tipo: 'escudo', baseId: 'escudo-leve', preco: 'T$ 45.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este escudo leve defensor tem uma pequena tira de couro na parte interna, sobre a qual um conjurador pode lançar uma magia.',
    especial: 'A magia não surte efeito na hora; em vez disso, fica inscrita na tira. A tira pode então ser lida como um pergaminho, descarregando a magia em seus alvos/área. Uma vez que a magia seja descarregada, outra pode ser armazenada.',
  },
  {
    id: 'escudo-do-eclipse', nome: 'Escudo do Eclipse', tipo: 'escudo', baseId: 'escudo-pesado', preco: 'T$ 70.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este escudo pesado é completamente negro e parece absorver a luz. Ele fornece redução de trevas 10 e causa +1d8 de dano de trevas num ataque.',
    especial: 'Você pode gastar uma ação de movimento e 2 PM para lançar Escuridão.',
  },
  {
    id: 'escudo-do-leao', nome: 'Escudo do Leão', tipo: 'escudo', baseId: 'escudo-pesado', preco: 'T$ 50.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este escudo pesado defensor é forjado como uma cabeça de leão rugindo.',
    especial: 'Uma vez por rodada, você pode gastar 2 PM para fazer a cabeça criar vida e morder uma criatura adjacente. A mordida acerta automaticamente e causa 2d6+2 pontos de dano de perfuração.',
  },
  {
    id: 'escudo-espinhoso', nome: 'Escudo Espinhoso', tipo: 'escudo', baseId: 'escudo-pesado', preco: 'T$ 50.000',
    encantosFixos: ['defensor'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este escudo pesado defensor é coberto de espinhos.',
    especial: 'Você pode gastar uma ação de movimento e 2 PM para disparar um espinho em um alvo em alcance curto. O espinho acerta automaticamente e causa 1d10+2 pontos de dano de perfuração.',
  },
];

if (typeof window !== 'undefined') {
  window.ARMADURAS_ESCUDOS_ESPECIFICOS = ARMADURAS_ESCUDOS_ESPECIFICOS;
}
