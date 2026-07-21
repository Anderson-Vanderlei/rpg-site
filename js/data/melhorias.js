/* ============================================================
   TORMENTA 20 — melhorias.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 3: Equipamento, pp. 163-166 (Itens Superiores & Melhorias)

   Cada entrada:
   { id, nome, categorias: [], preRequisito, descricao }

   categorias: array com uma ou mais de 'arma' | 'armadura' | 'escudo' |
   'esoterico' | 'ferramenta' | 'vestuario' | 'qualquer' — 'qualquer'
   significa que serve pra qualquer uma das categorias que aceitam
   melhoria (armas, armaduras, escudos, ferramentas, vestuário e
   esotéricos).

   Regras gerais de Itens Superiores (não repetidas em cada melhoria):
   - Só armas, armaduras, escudos, ferramentas, vestuário e esotéricos
     podem receber melhorias.
   - Cada melhoria só pode ser aplicada uma vez ao mesmo item.
   - O preço e a CD de fabricação aumentam de acordo com o NÚMERO TOTAL
     de melhorias no item (não por melhoria individual) — ver
     PRECO_POR_MELHORIA abaixo.
   - Fabricar um item superior exige a habilidade Fabricar Item Superior.

   preRequisito: nome de outra melhoria que o item precisa ter antes
   (opcional). Algumas melhorias também são mutuamente EXCLUSIVAS entre
   si (ex: Maciça e Precisa não podem coexistir na mesma arma) — isso
   fica anotado no texto da própria descrição, não como campo à parte.
============================================================ */

// Tabela 3-7: Preço de Melhorias — baseado no NÚMERO TOTAL de melhorias
// que o item tem, não em qual melhoria é. Usada pro cálculo de preço
// final de um item superior.
const PRECO_POR_MELHORIA = [
  { melhorias: 1, aumentoPreco: 300, aumentoCD: 5 },
  { melhorias: 2, aumentoPreco: 3000, aumentoCD: 10 },
  { melhorias: 3, aumentoPreco: 9000, aumentoCD: 15 },
  { melhorias: 4, aumentoPreco: 18000, aumentoCD: 20 },
];

const MELHORIAS = [

  {
    id: 'ajustada', nome: 'Ajustada', categorias: ['armadura', 'escudo'], preRequisito: null,
    efeito: '–1 na penalidade de armadura',
    descricao: 'Feito com peças medidas com precisão, o item tem a sua penalidade de armadura diminuída em 1.',
  },
  {
    id: 'aprimorado', nome: 'Aprimorado', categorias: ['ferramenta', 'vestuario'], preRequisito: null,
    efeito: '+1 em testes de perícia',
    descricao: 'O item é construído de forma cuidadosa e com os melhores materiais. Esta melhoria só pode ser aplicada a uma ferramenta ou vestuário que modifique uma perícia (reduza uma penalidade ou forneça um bônus) e fornece um bônus de +1 nessa perícia (ou aumenta o bônus fornecido em +1). Por exemplo, uma maleta de medicamentos aprimorada fornece +1 em Cura e uma luva de pelica aprimorada fornece +2 em Ladinagem.',
  },
  {
    id: 'atroz', nome: 'Atroz', categorias: ['arma'], preRequisito: 'Cruel',
    efeito: '+2 nas rolagens de dano',
    descricao: 'A arma é um amontoado de pontas, ganchos e protuberâncias. É difícil empunhá-la sem se machucar, mas ela fornece +2 nas rolagens de dano.',
  },
  {
    id: 'banhado-a-ouro', nome: 'Banhado a Ouro', categorias: ['qualquer'], preRequisito: null,
    efeito: '+2 em Diplomacia',
    descricao: 'Uma melhoria favorita de nobres pomposos ou de aventureiros que acabaram de enriquecer. Fornece +2 em Diplomacia. O mestre pode mudar o bônus para uma penalidade de –2 contra pessoas que desprezam ostentação. Além disso, pode atrair a cobiça de ladrões.',
  },
  {
    id: 'canalizador', nome: 'Canalizador', categorias: ['esoterico'], preRequisito: null,
    efeito: '+1 no limite de PM',
    descricao: 'O esotérico possui uma gema mística que permite que você canalize mais mana do que normalmente seria capaz. O máximo de PM que você pode gastar em magias aumenta em +1.',
  },
  {
    id: 'certeira', nome: 'Certeira', categorias: ['arma'], preRequisito: null,
    efeito: '+1 nos testes de ataque',
    descricao: 'Fabricada para ser mais precisa e balanceada, a arma fornece +1 nos testes de ataque.',
  },
  {
    id: 'cravejado-de-gemas', nome: 'Cravejado de Gemas', categorias: ['qualquer'], preRequisito: null,
    efeito: '+2 em Enganação',
    descricao: 'É fácil ser persuadido por alguém opulento o bastante para ostentar um item cravejado de gemas. Fornece +2 em Enganação. Assim como um item banhado a ouro, um item cravejado de gemas pode atrair a cobiça de ladrões.',
  },
  {
    id: 'cruel', nome: 'Cruel', categorias: ['arma'], preRequisito: null,
    efeito: '+1 nas rolagens de dano',
    descricao: 'Rebarbas, espinhos e até mesmo lâminas adicionais compõem uma arma cruel. Ela fornece +1 nas rolagens de dano.',
  },
  {
    id: 'delicada', nome: 'Delicada', categorias: ['armadura'], preRequisito: null,
    efeito: 'Aplica 1 ponto de Des na Defesa',
    restricao: { requerCategoriaArmadura: 'pesada', exclusivaCom: 'reforcada' },
    descricao: 'Apenas os materiais mais leves foram usados nesta armadura. As placas têm a espessura mínima necessária para oferecer a proteção que devem. Esta melhoria só pode ser aplicada a armaduras pesadas e permite que o personagem aplique 1 ponto de sua Destreza na Defesa (ou de outro atributo, caso o utilize em vez de Destreza). Uma armadura não pode ser delicada e reforçada.',
  },
  {
    id: 'discreto', nome: 'Discreto', categorias: ['qualquer'], preRequisito: null,
    efeito: '–1 espaço, +5 para ocultar',
    descricao: 'O item é disfarçado como outro item inócuo (como um florete escondido em uma bengala) ou modificado para ser telescópico (podendo se dobrar em si mesmo para ocupar menos espaço). O item ocupa –1 espaço (mínimo 1) e fornece +5 em testes de Ladinagem para ser ocultado.',
  },
  {
    id: 'energetico', nome: 'Energético', categorias: ['esoterico'], preRequisito: null,
    efeito: '+1d6 no dano de magias',
    descricao: 'Catalisadores alquímicos inseridos no item fazem com que ele potencialize energias mágicas. Suas magias que causam dano causam +1d6 pontos de dano do mesmo tipo.',
  },
  {
    id: 'equilibrada', nome: 'Equilibrada', categorias: ['arma'], preRequisito: null,
    efeito: '+2 em testes de manobras',
    descricao: 'Uma arma equilibrada é forjada com o balanço perfeito, o que facilita movimentos complexos. Ela fornece +2 em testes de manobras (desarmar, quebrar etc.).',
  },
  {
    id: 'espinhosa', nome: 'Espinhosa', categorias: ['armadura'], preRequisito: null,
    efeito: 'Causa dano com agarrar',
    descricao: 'Uma armadura coberta de espinhos é uma visão impressionante — principalmente se os espinhos estiverem banhados com o sangue dos inimigos! Se o usuário agarrar ou for agarrado por uma criatura, causa dano de perfuração nesta criatura igual a sua Força. O dano é causado quando a manobra é feita e no início de cada turno do personagem, enquanto ela for mantida.',
  },
  {
    id: 'espinhoso', nome: 'Espinhoso', categorias: ['escudo'], preRequisito: null,
    efeito: 'Aumenta dano do escudo',
    descricao: 'Aumenta o dano de um ataque com escudo em um passo.',
  },
  {
    id: 'harmonizada', nome: 'Harmonizada', categorias: ['arma'], preRequisito: 'outra melhoria qualquer',
    efeito: 'Custo de habilidades de ataque diminui em –1 PM',
    restricao: { requerQualquerOutra: true },
    descricao: 'A arma foi banhada em óleos alquímicos que a deixaram sintonizada com a aura de seu usuário. Escolha uma habilidade ativada ao se fazer um ataque ou usar a ação agredir e que custe pontos de mana. Esta habilidade tem seu custo em PM reduzido em –1 se utilizada com esta arma.',
  },
  {
    id: 'harmonizado', nome: 'Harmonizado', categorias: ['esoterico'], preRequisito: null,
    efeito: 'Custo de uma magia diminui em –1 PM',
    descricao: 'Escolha uma magia. Seu custo diminui em –1 PM. Você pode mudar a magia afetada pelo item com um ritual que exige um dia e T$ 100 em ingredientes.',
  },
  {
    id: 'injecao-alquimica', nome: 'Injeção Alquímica', categorias: ['arma'], preRequisito: null,
    efeito: 'Gera efeito de preparado',
    descricao: 'Um minúsculo frasco de cerâmica ou vidro é inserido ao longo da arma, junto com um mecanismo injetor ativado por impacto. Um ataque que acerte causa seu dano normal e libera uma carga de um preparado (como ácido ou fogo alquímico) ou de água benta, que atinge o alvo automaticamente. A melhoria tem espaço para 2 doses. Carregá-la exige uma ação completa e o gasto dos itens com os quais você quiser carregá-la.',
  },
  {
    id: 'macabro', nome: 'Macabro', categorias: ['qualquer'], preRequisito: null,
    efeito: '+2 em Intimidação, –2 em Diplomacia',
    descricao: 'O macabro é pintado com sangue seco, esculpido na forma de uma caveira ou decorado com pedaços de orelhas, dedos e olhos. Essa aparência assustadora fornece +2 em Intimidação, mas impõe uma penalidade de –2 em Diplomacia.',
  },
  {
    id: 'macica', nome: 'Maciça', categorias: ['arma'], preRequisito: null,
    efeito: '+1 no multiplicador de crítico',
    restricao: { exclusivaCom: 'precisa' },
    descricao: 'A arma é feita com material denso, fazendo com que seus golpes tenham impacto terrível. O multiplicador de crítico da arma aumenta em 1 ponto. Uma arma não pode ser maciça e precisa.',
  },
  {
    id: 'material-especial', nome: 'Material Especial', categorias: ['arma', 'armadura', 'escudo', 'esoterico'], preRequisito: null,
    efeito: 'Conforme o material',
    descricao: 'A arma, armadura, escudo ou item esotérico é feito de, ou banhado com, um material especial (veja js/data/materiais_especiais.js). Cada material fornece um benefício, cumulativo com outros benefícios de melhorias, mas possui um preço adicional que deve ser pago além do preço da melhoria. Fabricar um item de material especial é uma melhoria porque materiais especiais exigem um trabalho mais complexo do que materiais comuns.',
  },
  {
    id: 'mira-telescopica', nome: 'Mira Telescópica', categorias: ['arma'], preRequisito: null,
    efeito: 'Aumenta alcance da arma',
    restricao: { requerTipoAtaque: 'distancia', excluirArmaIds: ['funda'] },
    descricao: 'Aumenta o alcance da arma em uma categoria (de curto para médio, de médio para longo) e o alcance da habilidade Ataque Furtivo para médio. Esta melhoria só pode ser aplicada em armas de disparo (exceto fundas).',
  },
  {
    id: 'poderoso', nome: 'Poderoso', categorias: ['esoterico'], preRequisito: null,
    efeito: '+1 na CD de suas magias',
    descricao: 'A CD para resistir a suas magias aumenta em +1.',
  },
  {
    id: 'polida', nome: 'Polida', categorias: ['armadura', 'escudo'], preRequisito: null,
    efeito: '+5 na Defesa na primeira rodada',
    descricao: 'A armadura ou escudo foi feito com metais reluzentes. Além de bonita, a luz refletida ofusca inimigos. Em ambientes iluminados, o bônus de Defesa do item aumenta em +5, mas apenas na primeira rodada de combate — após isso, os inimigos se acostumam ao reflexo.',
  },
  {
    id: 'precisa', nome: 'Precisa', categorias: ['arma'], preRequisito: null,
    efeito: '+1 na margem de ameaça',
    restricao: { exclusivaCom: 'macica' },
    descricao: 'Cuidado especial foi tomado ao temperar o aço desta arma, para que seu fio se mantenha sempre como uma navalha. A margem de ameaça aumenta em 1 ponto. Uma arma não pode ser precisa e maciça.',
  },
  {
    id: 'pungente', nome: 'Pungente', categorias: ['arma'], preRequisito: 'Certeira',
    efeito: '+2 nos testes de ataque',
    descricao: 'Temperada diversas vezes para adquirir o fio ou o equilíbrio perfeito, a arma fornece +2 nos testes de ataque.',
  },
  {
    id: 'reforcada', nome: 'Reforçada', categorias: ['armadura', 'escudo'], preRequisito: null,
    efeito: '+1 na Defesa, +1 na penalidade de armadura',
    restricao: { exclusivaCom: 'delicada' },
    descricao: 'Se for uma armadura, o item possui uma camada adicional de tecido, malha mais densa ou placas mais grossas. Se for um escudo, possui uma chapa mais espessa. O bônus na Defesa e a penalidade de armadura do item aumentam em 1. Um item não pode ser reforçado e delicado.',
  },
  {
    id: 'selada', nome: 'Selada', categorias: ['armadura'], preRequisito: null,
    efeito: '+1 nos testes de resistência',
    restricao: { requerCategoriaArmadura: 'pesada' },
    descricao: 'A armadura foi forjada de forma a proteger todo o corpo do usuário, sem deixar espaço para nem mesmo um alfinete! Esta melhoria fornece um bônus de +1 em testes de resistência, mas só pode ser aplicado em armaduras pesadas.',
  },
  {
    id: 'sob-medida', nome: 'Sob Medida', categorias: ['armadura'], preRequisito: 'Ajustada',
    efeito: '–2 na penalidade de armadura',
    descricao: 'Embora muitas armaduras sejam feitas especificamente para um usuário, esta passou por um período extenso de ajustes e refinamento, adequando-se com perfeição ao seu corpo. Reduz a penalidade de armadura em 2, mas apenas para o usuário específico (para outros, comporta-se como um item ajustado).',
  },
  {
    id: 'vigilante', nome: 'Vigilante', categorias: ['esoterico'], preRequisito: null,
    efeito: '+2 na Defesa',
    descricao: 'O item usa parte de sua mana pessoal para gerar um campo que desvia ataques. Você recebe +2 na Defesa.',
  },

];

if (typeof window !== 'undefined') {
  window.MELHORIAS = MELHORIAS;
  window.PRECO_POR_MELHORIA = PRECO_POR_MELHORIA;
}
