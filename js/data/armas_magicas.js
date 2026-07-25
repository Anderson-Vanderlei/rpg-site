/* ============================================================
   TORMENTA 20 — armas_magicas.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 333-337 (Armas Mágicas)

   Duas listas:
   - ENCANTOS_ARMA: os "encantos" de arma mágica — funcionam exatamente
     como as melhorias de Item Superior (js/data/melhorias.js), só que
     com tabela de preço própria (Tabela 8-7, ver PRECO_POR_ENCANTO) e
     aplicáveis apenas em itens MÁGICOS, não mundanos.
   - ARMAS_ESPECIFICAS: armas únicas e nomeadas, com preço fixo, que
     substituem os encantos normais (não recebem encantos comuns).

   Cada entrada de ENCANTOS_ARMA:
   { id, nome, custoEncantos: 1|2, efeito, descricao, preRequisito? }

   custoEncantos: a maioria vale 1, mas Energética, Lancinante e
   Magnífica contam como DOIS encantos cada (a tabela original manda
   "role novamente" se o item só tiver 1 encanto disponível).

   preRequisito: nome de outro encanto que precisa estar no mesmo item
   antes (Lancinante exige Dilacerante; Magnífica exige Formidável;
   Guardião de armadura exige Defensor — este último fica em
   armaduras_magicas.js).

   Cada entrada de ARMAS_ESPECIFICAS:
   { id, nome, tipoArmaBase, preco, descricao }

   tipoArmaBase: referência solta ao tipo de arma mundana usada como
   base (não aponta pro id de armas.js formalmente, é só descritivo,
   já que a arma específica tem preço e regras próprias, independentes
   da tabela de armas comuns).
============================================================ */

// Tabela 8-7: Preço de Encantos — mesmo formato de PRECO_POR_MELHORIA,
// baseado no NÚMERO TOTAL de encantos do item (não por encanto).
const PRECO_POR_ENCANTO = [
  { encantos: 1, aumentoPreco: 18000, aumentoCD: 10 },
  { encantos: 2, aumentoPreco: 36000, aumentoCD: 15 },
  { encantos: 3, aumentoPreco: 72000, aumentoCD: 20 },
];

const ENCANTOS_ARMA = [
  {
    id: 'ameacadora', nome: 'Ameaçadora', custoEncantos: 1,
    efeito: 'Duplica margem de ameaça',
    descricao: 'Duplica a margem de ameaça da arma.',
  },
  {
    id: 'anticriatura', nome: 'Anticriatura', custoEncantos: 1,
    efeito: 'Bônus contra tipo de criatura',
    descricao: 'Fornece um bônus nos testes de ataque e rolagens de dano contra um tipo de criatura escolhido.',
  },
  {
    id: 'arremesso', nome: 'Arremesso', custoEncantos: 1,
    efeito: 'Pode ser arremessada',
    descricao: 'A arma pode ser arremessada, mesmo que normalmente não pudesse, com alcance curto.',
  },
  {
    id: 'assassina', nome: 'Assassina', custoEncantos: 1,
    efeito: 'Aumenta ataque furtivo',
    descricao: 'Aumenta o dano de Ataque Furtivo causado com a arma.',
  },
  {
    id: 'cacadora', nome: 'Caçadora', custoEncantos: 1,
    efeito: 'Ignora camuflagem leve e total e cobertura leve',
    descricao: 'A arma ignora camuflagem leve e total, e cobertura leve, ao atacar.',
  },
  {
    id: 'congelante', nome: 'Congelante', custoEncantos: 1,
    efeito: '+1d6 de dano de frio',
    descricao: 'A arma causa +1d6 pontos de dano de frio.',
  },
  {
    id: 'conjuradora', nome: 'Conjuradora', custoEncantos: 1,
    efeito: 'Pode guardar e lançar magias',
    descricao: 'A arma pode guardar uma magia (como um pergaminho) e lançá-la.',
  },
  {
    id: 'corrosiva', nome: 'Corrosiva', custoEncantos: 1,
    efeito: '+1d6 de dano de ácido',
    descricao: 'A arma causa +1d6 pontos de dano de ácido.',
  },
  {
    id: 'dancarina', nome: 'Dançarina', custoEncantos: 1,
    efeito: 'Ataca sozinha',
    descricao: 'A arma pode atacar sozinha, flutuando e lutando por conta própria.',
  },
  {
    id: 'defensora', nome: 'Defensora', custoEncantos: 1,
    efeito: 'Defesa +2',
    descricao: 'A arma fornece +2 na Defesa de quem a empunha.',
  },
  {
    id: 'destruidora', nome: 'Destruidora', custoEncantos: 1,
    efeito: 'Bônus contra construtos',
    descricao: 'Fornece um bônus nos testes de ataque e rolagens de dano contra construtos.',
  },
  {
    id: 'dilacerante', nome: 'Dilacerante', custoEncantos: 1,
    efeito: '+10 de dano em acertos críticos',
    descricao: 'A arma causa +10 pontos de dano em acertos críticos.',
  },
  {
    id: 'drenante', nome: 'Drenante', custoEncantos: 1,
    efeito: 'Crítico drena vítima',
    descricao: 'Um acerto crítico com a arma drena a vitalidade da vítima, curando o usuário.',
  },
  {
    id: 'eletrica', nome: 'Elétrica', custoEncantos: 1,
    efeito: '+1d6 de dano de eletricidade',
    descricao: 'A arma causa +1d6 pontos de dano de eletricidade.',
  },
  {
    id: 'energetica', nome: 'Energética', custoEncantos: 2,
    efeito: 'Bônus em ataque',
    descricao: 'A arma fornece um bônus adicional em testes de ataque. Conta como dois encantos — para itens menores (que só recebem um encanto), role novamente.',
  },
  {
    id: 'excruciante', nome: 'Excruciante', custoEncantos: 1,
    efeito: 'Causa fraqueza',
    descricao: 'Um alvo atingido pela arma fica debilitado ou fraco.',
  },
  {
    id: 'flamejante', nome: 'Flamejante', custoEncantos: 1,
    efeito: '+1d6 de dano de fogo',
    descricao: 'A arma causa +1d6 pontos de dano de fogo.',
  },
  {
    id: 'formidavel', nome: 'Formidável', custoEncantos: 1,
    efeito: 'Ataque e dano +2',
    descricao: 'A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.',
  },
  {
    id: 'lancinante', nome: 'Lancinante', custoEncantos: 2,
    efeito: 'Causa crítico terrível',
    descricao: 'A arma inflige ferimentos mortais. Quando faz um acerto crítico com a arma, você causa +10 pontos de dano ou, além de multiplicar os dados de dano, multiplica também quaisquer bônus numéricos, a sua escolha. Este efeito substitui o efeito de dilacerante. Conta como dois encantos — para itens menores, role novamente.',
    preRequisito: 'Dilacerante',
  },
  {
    id: 'magnifica', nome: 'Magnífica', custoEncantos: 2,
    efeito: 'Ataque e dano +4',
    descricao: 'A arma é encantada para desferir golpes perfeitos. Ela fornece +4 em testes de ataque e rolagens de dano. Conta como dois encantos — para itens menores, role novamente.',
    preRequisito: 'Formidável',
  },
  {
    id: 'piedosa', nome: 'Piedosa', custoEncantos: 1,
    efeito: 'Dano não letal',
    descricao: 'A arma causa +1d8 de dano, mas todo o dano causado é não letal. Você pode gastar 1 PM para desativar e ativar este encanto.',
  },
  {
    id: 'profana', nome: 'Profana', custoEncantos: 1,
    efeito: 'Bônus contra devotos do Bem',
    descricao: 'A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia positiva e criaturas bondosas (a critério do mestre). Uma arma profana emite luz rubra pulsante.',
  },
  {
    id: 'sagrada', nome: 'Sagrada', custoEncantos: 1,
    efeito: 'Bônus contra devotos do Mal',
    descricao: 'A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre). Uma arma sagrada emite uma sutil luz pura.',
  },
  {
    id: 'sanguinaria', nome: 'Sanguinária', custoEncantos: 1,
    efeito: 'Causa sangramento',
    descricao: 'Uma criatura viva atingida fica sangrando. A perda de PV por sangramento causada pela arma é cumulativa — uma criatura atingida duas vezes perde 2d6 PV por sangramento por rodada.',
  },
  {
    id: 'trovejante', nome: 'Trovejante', custoEncantos: 1,
    efeito: 'Causa atordoamento',
    descricao: 'A arma emite um trovão ribombante a cada golpe. Quando você faz um acerto crítico, a vítima fica atordoada por uma rodada (apenas uma vez por cena; Fortitude CD Força ou Destreza, a sua escolha, evita).',
  },
  {
    id: 'tumular', nome: 'Tumular', custoEncantos: 1,
    efeito: '+1d8 de dano de trevas',
    descricao: 'A arma causa +1d8 de dano de trevas. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso, o bônus de dano aumenta para +2d8, mas você perde 1d8 pontos de vida. Uma arma tumular drena o calor ao redor.',
  },
  {
    id: 'veloz', nome: 'Veloz', custoEncantos: 1,
    efeito: 'Fornece ataque extra',
    descricao: 'Você recebe a habilidade Ataque Extra, do guerreiro, mas só pode usá-la com esta arma. Se já a possui, em vez disso, o custo para usá-la com esta arma diminui em –1 PM.',
  },
  {
    id: 'venenosa', nome: 'Venenosa', custoEncantos: 1,
    efeito: 'Causa envenenamento',
    descricao: 'Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica envenenada, perdendo 1d12 pontos de vida por rodada durante 3 rodadas. Uma arma venenosa verte um líquido verde e viscoso.',
  },
];

const ARMAS_ESPECIFICAS = [
  {
    id: 'arco-do-poder', nome: 'Arco do Poder', tipoArmaBase: 'Arco Longo',
    preco: 'T$ 90.000',
    descricao: 'O arco do poder conta como um arco longo formidável, mas parece apenas o corpo de um arco — não tem corda e não aceita flechas. Contudo, quando você o empunha e faz o gesto de puxar a corda inexistente, o arco cria uma corda e uma flecha de energia dourada. O arco do poder é capaz de ler suas intenções, produzindo diferentes tipos de flechas energéticas a sua escolha: Flecha Normal (3d8 pontos de dano de essência), Flecha Piedosa (4d8 pontos de dano de essência não letal), Flecha Explosiva (3d6 pontos de dano de fogo no alvo e em todas as criaturas adjacentes a ele — essas têm direito a um teste de Reflexos, CD Destreza, para reduzir o dano à metade) ou Flecha-Rede (não causa dano, mas deixa a vítima agarrada por uma rede de energia; a criatura pode se soltar passando em um teste de Força ou Acrobacia, CD 25; a rede se dissipa quando a criatura se solta ou no fim da cena).',
  },
  {
    id: 'avalanche', nome: 'Avalanche', tipoArmaBase: 'Machado de Guerra',
    preco: 'T$ 140.000',
    descricao: 'Este machado de guerra de gelo eterno congelante formidável fornece redução de fogo 10. Você pode gastar uma ação padrão e 6 PM para brandi-lo acima de sua cabeça e invocar uma tempestade de gelo que afeta alcance curto ao seu redor. Criaturas na área recebem camuflagem leve e sofrem 3d6 pontos de dano de impacto e 3d6 pontos de frio por rodada. Você não sofre os efeitos nocivos da tempestade (o dano e a chance de falha pela camuflagem) e pode gastar 1 PM no início de cada um de seus turnos para mantê-la.',
  },
  {
    id: 'azagaia-dos-relampagos', nome: 'Azagaia dos Relâmpagos', tipoArmaBase: 'Azagaia',
    preco: 'T$ 30.000',
    descricao: 'Quando arremessada, esta azagaia se transforma em um Relâmpago (8d6 de dano de eletricidade numa linha com alcance médio; Fortitude CD Força ou Destreza, a sua escolha, reduz à metade). Quando atinge o fim do alcance, ela volta a ser uma azagaia e volta para você no fim do turno.',
  },
  {
    id: 'besta-explosiva', nome: 'Besta Explosiva', tipoArmaBase: 'Besta Pesada',
    preco: 'T$ 100.000',
    descricao: 'Esta besta pesada formidável é feita de madeira escurecida, similar a carvão. Quando usa uma besta explosiva, você pode gastar 3 PM para transformar o virote disparado por ela em uma Bola de Fogo. Você pode mirar esta Bola de Fogo em uma criatura ou em um ponto em alcance médio. No primeiro caso, faça um ataque contra o alvo — se acertar, ele sofre o dano do disparo mais 6d6 de fogo, e todas as criaturas a até 6m do alvo sofrem 6d6 pontos de dano de fogo (Reflexos CD Destreza reduz à metade). Porém, se o ataque errar, o virote se desfaz em uma nuvem de cinzas inofensivas. No segundo caso, ela funciona como a magia de mesmo nome — nenhum teste de ataque é necessário e todas as criaturas a 6m do ponto escolhido sofrem 6d6 pontos de dano de fogo (Reflexos reduz à metade).',
  },
  {
    id: 'cajado-da-destruicao', nome: 'Cajado da Destruição', tipoArmaBase: 'Bordão',
    preco: 'T$ 60.000',
    descricao: 'Este bordão formidável escuro e reforçado com ponteiras de metal é procurado por conjuradores de batalha. Conta como um cajado arcano. Além dos benefícios desse esotérico, quando você lança uma magia de dano, ela causa +1 ponto de dano por dado.',
  },
  {
    id: 'cajado-da-vida', nome: 'Cajado da Vida', tipoArmaBase: 'Bordão',
    preco: 'T$ 60.000',
    descricao: 'Este bordão formidável branco com runas prateadas é valorizado por curandeiros. Conta como um cajado arcano, mas afeta magias divinas. Além disso, quando você lança uma magia de cura, ela cura +2 pontos de vida por dado.',
  },
  {
    id: 'cajado-do-poder', nome: 'Cajado do Poder', tipoArmaBase: 'Bordão',
    preco: 'T$ 180.000',
    descricao: 'Este bordão defensor magnífico tem cabo reto e liso, com uma joia cintilante na ponta. Conta como um cajado arcano. Além dos benefícios desse esotérico, o custo de suas magias arcanas diminui em –1 PM (cumulativo com Mestre em Escola) e a CD para resistir a elas aumenta em +2 (para um aumento total de +3).',
  },
  {
    id: 'espada-baronial', nome: 'Espada Baronial', tipoArmaBase: 'Espada Longa',
    preco: 'T$ 30.000',
    descricao: 'Esta espada longa de guarda reta fornece +1 em testes de ataque e rolagens de dano. Este bônus aumenta em +1 se você possuir um código de conduta (de honra, do herói...), for devoto de Khalmyr ou for treinado em Nobreza. Os bônus são cumulativos — um personagem com um código de conduta, devoto de Khalmyr e treinado em Nobreza recebe +4 em ataque e dano.',
  },
  {
    id: 'espada-sortuda', nome: 'Espada Sortuda', tipoArmaBase: 'Espada Curta',
    preco: 'T$ 110.000',
    descricao: 'Esta espada curta formidável é cravejada de brilhantes. Você recebe +2 nos testes de resistência e, quando faz um teste, pode gastar 3 PM para rolá-lo novamente. Se possuir o poder Sortudo, em vez disso seu custo diminui em –1 PM.',
  },
  {
    id: 'florete-fugaz', nome: 'Florete Fugaz', tipoArmaBase: 'Florete',
    preco: 'T$ 50.000',
    descricao: 'Este florete formidável tem o cabo e a guarda trabalhados com prata e pedrarias. Quando usa a ação agredir, você pode gastar 1 PM. Se fizer isso e acertar um crítico no turno, pode fazer um ataque adicional contra a mesma criatura.',
  },
  {
    id: 'lamina-da-luz', nome: 'Lâmina da Luz', tipoArmaBase: 'Espada Bastarda',
    preco: 'T$ 45.000',
    descricao: 'De lâmina prateada e reluzente, esta espada bastarda formidável é concedida a cavaleiros da Luz de honra e virtude comprovadas. Você pode gastar uma ação de movimento e 2 PM para erguer a lâmina acima de sua cabeça. Se fizer isso, ela irradia luz brilhante em alcance médio até o fim da cena. Todos os inimigos dentro da luz ficam ofuscados.',
  },
  {
    id: 'lanca-animalesca', nome: 'Lança Animalesca', tipoArmaBase: 'Lança',
    preco: 'T$ 45.000',
    descricao: 'Espinhos e folhas vivas brotam desta lança formidável. Se você usar a habilidade Forma Selvagem, aplica o bônus de +2 em ataque e dano da lança animalesca em suas armas naturais.',
  },
  {
    id: 'lingua-do-deserto', nome: 'Língua do Deserto', tipoArmaBase: 'Cimitarra',
    preco: 'T$ 90.000',
    descricao: 'Esta cimitarra formidável é originária do Deserto da Perdição. Você pode gastar uma ação de movimento e 1 PM para transformar a lâmina dela em chamas até o fim da cena — nessa condição, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Você pode gastar uma ação de movimento e 2 PM para fazer as chamas brilharem com muita força, deixando os inimigos em alcance curto desprevenidos por uma rodada.',
  },
  {
    id: 'maca-do-terror', nome: 'Maça do Terror', tipoArmaBase: 'Maça',
    preco: 'T$ 45.000',
    descricao: 'Esta maça formidável é feita com um osso e um crânio e permite que você lance a magia Amedrontar (CD Força ou Carisma, a sua escolha). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.',
  },
  {
    id: 'machado-silvestre', nome: 'Machado Silvestre', tipoArmaBase: 'Machado de Batalha',
    preco: 'T$ 70.000',
    descricao: 'O cabo e a lâmina deste machado de batalha formidável são cobertos de gravuras representando plantas e animais selvagens. Quando você usa o machado silvestre em um ambiente ermo e ao ar livre, ele causa +1d8 de dano e você recebe o poder Trespassar (caso já possua este poder, pode utilizá-lo sem pagar pontos de mana).',
  },
  {
    id: 'martelo-de-doherimm', nome: 'Martelo de Doherimm', tipoArmaBase: 'Martelo de Guerra',
    preco: 'T$ 70.000',
    descricao: 'Este martelo de guerra formidável é feito de pedra e aço. Quando empunhado por um anão, adquire o encanto arremesso e aumenta seu dano em +1d8 (ou +2d8 se usado contra criaturas Grandes ou maiores).',
  },
  {
    id: 'punhal-sszzaazita', nome: 'Punhal Sszzaazita', tipoArmaBase: 'Adaga',
    preco: 'T$ 100.000',
    descricao: 'Esta adaga assassina formidável venenosa tem lâmina negra e ondulada. Você pode gastar uma ação padrão e 2 PM para transformar o punhal sszzaazita em um objeto inofensivo de tamanho similar, como uma colher ou pena. Nenhuma magia é capaz de detectar essa transformação. Transformar o punhal em arma é uma ação livre.',
  },
  {
    id: 'vingadora-sagrada', nome: 'Vingadora Sagrada', tipoArmaBase: 'Espada Longa',
    preco: 'T$ 200.000',
    descricao: 'Esta espada longa formidável revela todo o seu poder apenas quando empunhada por um paladino. Se você for um paladino, recebe +5 em testes de ataque e rolagens de dano, o custo de seu Golpe Divino é reduzido em –1 PM e você e seus aliados em alcance curto recebem resistência a magia +5.',
  },
];

if (typeof window !== 'undefined') {
  window.ENCANTOS_ARMA = ENCANTOS_ARMA;
  window.ARMAS_ESPECIFICAS = ARMAS_ESPECIFICAS;
  window.PRECO_POR_ENCANTO = PRECO_POR_ENCANTO;
}
