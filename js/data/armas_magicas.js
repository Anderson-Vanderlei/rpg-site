/* ============================================================
   TORMENTA 20 — armas_magicas.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 333-337 (Armas Específicas)

   Armas ÚNICAS e nomeadas, com preço fixo. Diferente de uma arma
   mundana que você modifica na calculadora, uma arma específica já
   VEM com um conjunto fixo de encantamentos/melhorias/material —
   por isso o painel mostra esses como tags fixas (não editáveis),
   e não abre a calculadora de Item Superior nelas.

   Cada entrada:
   { id, nome, baseId, preco, encantosFixos: [], melhoriasFixas: [],
     materialFixo: null|id, descricao, especial }

   baseId: aponta pro id da arma mundana correspondente em armas.js —
   usado pra puxar dano/crítico/alcance/tipo/espaços e montar a mesma
   tabela de estatísticas das armas comuns.

   encantosFixos / melhoriasFixas: ids que já vêm aplicados no item
   (referenciam encantamentos.js / melhorias.js). Só incluídos aqui
   quando o texto do livro cita o nome do encanto/melhoria de forma
   clara e inequívoca (ex: "formidável", "guardiã", "assassina") — se
   um adjetivo do texto não bateu com nenhum nome oficial de encanto/
   melhoria com segurança, foi deixado de fora em vez de arriscar um
   palpite errado.

   materialFixo: id de materiais_especiais.js, se aplicável.

   especial: a habilidade única e exclusiva do item — o que
   realmente diferencia ele de "uma arma comum com uns encantos".
   Fica separado da `descricao` (que é só sabor + os encantos fixos
   mencionados em prosa) pra ficar destacado no painel.
============================================================ */

const ARMAS_ESPECIFICAS = [
  {
    id: 'arco-do-poder', nome: 'Arco do Poder', baseId: 'arco-longo', preco: 'T$ 90.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'O arco do poder conta como um arco longo formidável, mas parece apenas o corpo de um arco — não tem corda e não aceita flechas. Contudo, quando você o empunha e faz o gesto de puxar a corda inexistente, o arco cria uma corda e uma flecha de energia dourada.',
    especial: 'O arco do poder é capaz de ler suas intenções, produzindo diferentes tipos de flechas energéticas a sua escolha: Flecha Normal (3d8 pontos de dano de essência), Flecha Piedosa (4d8 pontos de dano de essência não letal), Flecha Explosiva (3d6 pontos de dano de fogo no alvo e em todas as criaturas adjacentes a ele — essas têm direito a um teste de Reflexos, CD Destreza, para reduzir o dano à metade) ou Flecha-Rede (não causa dano, mas deixa a vítima agarrada por uma rede de energia; a criatura pode se soltar passando em um teste de Força ou Acrobacia, CD 25; a rede se dissipa quando a criatura se solta ou no fim da cena).',
  },
  {
    id: 'avalanche', nome: 'Avalanche', baseId: 'machado-de-guerra', preco: 'T$ 140.000',
    encantosFixos: ['congelante', 'formidavel'], melhoriasFixas: [], materialFixo: 'gelo-eterno',
    descricao: 'Este machado de guerra de gelo eterno congelante formidável fornece redução de fogo 10.',
    especial: 'Você pode gastar uma ação padrão e 6 PM para brandi-lo acima de sua cabeça e invocar uma tempestade de gelo que afeta alcance curto ao seu redor. Criaturas na área recebem camuflagem leve e sofrem 3d6 pontos de dano de impacto e 3d6 pontos de frio por rodada. Você não sofre os efeitos nocivos da tempestade (o dano e a chance de falha pela camuflagem) e pode gastar 1 PM no início de cada um de seus turnos para mantê-la.',
  },
  {
    id: 'azagaia-dos-relampagos', nome: 'Azagaia dos Relâmpagos', baseId: 'azagaia', preco: 'T$ 30.000',
    encantosFixos: [], melhoriasFixas: [], materialFixo: null,
    descricao: 'Uma azagaia de aparência comum, cuja verdadeira natureza só se revela em combate.',
    especial: 'Quando arremessada, esta azagaia se transforma em um Relâmpago (8d6 de dano de eletricidade numa linha com alcance médio; Fortitude CD Força ou Destreza, a sua escolha, reduz à metade). Quando atinge o fim do alcance, ela volta a ser uma azagaia e volta para você no fim do turno.',
  },
  {
    id: 'besta-explosiva', nome: 'Besta Explosiva', baseId: 'besta-pesada', preco: 'T$ 100.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta besta pesada formidável é feita de madeira escurecida, similar a carvão.',
    especial: 'Quando usa uma besta explosiva, você pode gastar 3 PM para transformar o virote disparado por ela em uma Bola de Fogo. Você pode mirar esta Bola de Fogo em uma criatura ou em um ponto em alcance médio. No primeiro caso, faça um ataque contra o alvo — se acertar, ele sofre o dano do disparo mais 6d6 de fogo, e todas as criaturas a até 6m do alvo sofrem 6d6 pontos de dano de fogo (Reflexos CD Destreza reduz à metade). Porém, se o ataque errar, o virote se desfaz em uma nuvem de cinzas inofensivas. No segundo caso, ela funciona como a magia de mesmo nome — nenhum teste de ataque é necessário e todas as criaturas a 6m do ponto escolhido sofrem 6d6 pontos de dano de fogo (Reflexos reduz à metade).',
  },
  {
    id: 'cajado-da-destruicao', nome: 'Cajado da Destruição', baseId: 'bordao', preco: 'T$ 60.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este bordão formidável escuro e reforçado com ponteiras de metal é procurado por conjuradores de batalha. Conta como um cajado arcano.',
    especial: 'Além dos benefícios desse esotérico, quando você lança uma magia de dano, ela causa +1 ponto de dano por dado.',
  },
  {
    id: 'cajado-da-vida', nome: 'Cajado da Vida', baseId: 'bordao', preco: 'T$ 60.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este bordão formidável branco com runas prateadas é valorizado por curandeiros. Conta como um cajado arcano, mas afeta magias divinas.',
    especial: 'Quando você lança uma magia de cura, ela cura +2 pontos de vida por dado.',
  },
  {
    id: 'cajado-do-poder', nome: 'Cajado do Poder', baseId: 'bordao', preco: 'T$ 180.000',
    encantosFixos: ['defensora', 'magnifica'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este bordão defensor magnífico tem cabo reto e liso, com uma joia cintilante na ponta. Conta como um cajado arcano.',
    especial: 'Além dos benefícios desse esotérico, o custo de suas magias arcanas diminui em –1 PM (cumulativo com Mestre em Escola) e a CD para resistir a elas aumenta em +2 (para um aumento total de +3).',
  },
  {
    id: 'espada-baronial', nome: 'Espada Baronial', baseId: 'espada-longa', preco: 'T$ 30.000',
    encantosFixos: [], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta espada longa de guarda reta fornece +1 em testes de ataque e rolagens de dano.',
    especial: 'Este bônus aumenta em +1 se você possuir um código de conduta (de honra, do herói...), for devoto de Khalmyr ou for treinado em Nobreza. Os bônus são cumulativos — um personagem com um código de conduta, devoto de Khalmyr e treinado em Nobreza recebe +4 em ataque e dano.',
  },
  {
    id: 'espada-sortuda', nome: 'Espada Sortuda', baseId: 'espada-curta', preco: 'T$ 110.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta espada curta formidável é cravejada de brilhantes. Você recebe +2 nos testes de resistência e, quando faz um teste, pode gastar 3 PM para rolá-lo novamente.',
    especial: 'Se possuir o poder Sortudo, em vez disso seu custo diminui em –1 PM.',
  },
  {
    id: 'florete-fugaz', nome: 'Florete Fugaz', baseId: 'florete', preco: 'T$ 50.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este florete formidável tem o cabo e a guarda trabalhados com prata e pedrarias.',
    especial: 'Quando usa a ação agredir, você pode gastar 1 PM. Se fizer isso e acertar um crítico no turno, pode fazer um ataque adicional contra a mesma criatura.',
  },
  {
    id: 'lamina-da-luz', nome: 'Lâmina da Luz', baseId: 'espada-bastarda', preco: 'T$ 45.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'De lâmina prateada e reluzente, esta espada bastarda formidável é concedida a cavaleiros da Luz de honra e virtude comprovadas.',
    especial: 'Você pode gastar uma ação de movimento e 2 PM para erguer a lâmina acima de sua cabeça. Se fizer isso, ela irradia luz brilhante em alcance médio até o fim da cena. Todos os inimigos dentro da luz ficam ofuscados.',
  },
  {
    id: 'lanca-animalesca', nome: 'Lança Animalesca', baseId: 'lanca', preco: 'T$ 45.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Espinhos e folhas vivas brotam desta lança formidável.',
    especial: 'Se você usar a habilidade Forma Selvagem, aplica o bônus de +2 em ataque e dano da lança animalesca em suas armas naturais.',
  },
  {
    id: 'lingua-do-deserto', nome: 'Língua do Deserto', baseId: 'cimitarra', preco: 'T$ 90.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta cimitarra formidável é originária do Deserto da Perdição.',
    especial: 'Você pode gastar uma ação de movimento e 1 PM para transformar a lâmina dela em chamas até o fim da cena — nessa condição, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Você pode gastar uma ação de movimento e 2 PM para fazer as chamas brilharem com muita força, deixando os inimigos em alcance curto desprevenidos por uma rodada.',
  },
  {
    id: 'maca-do-terror', nome: 'Maça do Terror', baseId: 'maca', preco: 'T$ 45.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta maça formidável é feita com um osso e um crânio.',
    especial: 'Permite que você lance a magia Amedrontar (CD Força ou Carisma, a sua escolha). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.',
  },
  {
    id: 'machado-silvestre', nome: 'Machado Silvestre', baseId: 'machado-de-batalha', preco: 'T$ 70.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'O cabo e a lâmina deste machado de batalha formidável são cobertos de gravuras representando plantas e animais selvagens.',
    especial: 'Quando você usa o machado silvestre em um ambiente ermo e ao ar livre, ele causa +1d8 de dano e você recebe o poder Trespassar (caso já possua este poder, pode utilizá-lo sem pagar pontos de mana).',
  },
  {
    id: 'martelo-de-doherimm', nome: 'Martelo de Doherimm', baseId: 'martelo-de-guerra', preco: 'T$ 70.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Este martelo de guerra formidável é feito de pedra e aço.',
    especial: 'Quando empunhado por um anão, adquire o encanto arremesso e aumenta seu dano em +1d8 (ou +2d8 se usado contra criaturas Grandes ou maiores).',
  },
  {
    id: 'punhal-sszzaazita', nome: 'Punhal Sszzaazita', baseId: 'adaga', preco: 'T$ 100.000',
    encantosFixos: ['assassina', 'formidavel', 'venenosa'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta adaga assassina formidável venenosa tem lâmina negra e ondulada.',
    especial: 'Você pode gastar uma ação padrão e 2 PM para transformar o punhal sszzaazita em um objeto inofensivo de tamanho similar, como uma colher ou pena. Nenhuma magia é capaz de detectar essa transformação. Transformar o punhal em arma é uma ação livre.',
  },
  {
    id: 'vingadora-sagrada', nome: 'Vingadora Sagrada', baseId: 'espada-longa', preco: 'T$ 200.000',
    encantosFixos: ['formidavel'], melhoriasFixas: [], materialFixo: null,
    descricao: 'Esta espada longa formidável revela todo o seu poder apenas quando empunhada por um paladino.',
    especial: 'Se você for um paladino, recebe +5 em testes de ataque e rolagens de dano, o custo de seu Golpe Divino é reduzido em –1 PM e você e seus aliados em alcance curto recebem resistência a magia +5.',
  },
];

if (typeof window !== 'undefined') {
  window.ARMAS_ESPECIFICAS = ARMAS_ESPECIFICAS;
}
