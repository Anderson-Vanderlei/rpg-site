/* ============================================================
   TORMENTA 20 — materiais_especiais.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 3: Equipamento, pp. 166-167 (Materiais Especiais)

   Cada entrada:
   { id, nome, precoAdicional: { arma, armaduraLeve, armaduraPesada,
     escudo, esoterico }, efeitos: { arma, armaduraEscudo, esoterico },
     descricao }

   Materiais especiais exigem a melhoria "Material Especial" (ver
   melhorias.js) — o preço adicional listado aqui se soma ao preço da
   própria melhoria (Tabela 3-7), não substitui.

   precoAdicional: valores em T$, conforme a Tabela 3-9. null quando o
   material não pode ser aplicado naquela categoria de item (ex:
   Madeira Tollon não pode ser usada em armadura leve/pesada em geral,
   só em armas de madeira específicas, escudos leves e esotéricos).

   efeitos.armaduraEscudo: mesmo efeito pra armadura E escudo (o livro
   não separa os dois pra a maioria dos materiais, exceto no preço).
============================================================ */

const MATERIAIS_ESPECIAIS = [

  {
    id: 'aco-rubi', nome: 'Aço-Rubi',
    precoAdicional: { arma: 6000, armaduraLeve: 3000, armaduraPesada: 6000, escudo: 3000, esoterico: 6000 },
    efeitos: {
      arma: 'A arma ignora 10 pontos de redução de dano, além de ignorar a imunidade a crítico de lefeu.',
      armaduraEscudo: 'Fornece uma chance de ignorar o dano extra de acertos críticos e ataques furtivos: armaduras leves e escudos, 25% (1 em 1d4); armaduras pesadas, 50% (qualquer valor par em qualquer dado). Chances cumulativas entre armadura e escudo.',
      esoterico: 'Quando lança uma magia que causa dano, ela ignora 10 pontos de redução de dano, além de ignorar as imunidades a dano de lefeu.',
    },
    descricao: 'Este metal tem a aparência de vidro avermelhado, mas é duro como aço. Aço-rubi é caríssimo e comercializado apenas por uma guilda de ferreiros de Doherimm. Os anões mantêm a origem deste material em segredo, mas suspeita-se de que ele seja minerado das profundezas de uma área de Tormenta.',
  },
  {
    id: 'adamante', nome: 'Adamante',
    precoAdicional: { arma: 3000, armaduraLeve: 6000, armaduraPesada: 18000, escudo: 6000, esoterico: 3000 },
    efeitos: {
      arma: 'Aumenta o dano em um passo.',
      armaduraEscudo: 'Fornece redução de dano: armaduras leves e escudos, RD 2; armaduras pesadas, RD 5.',
      esoterico: 'Quando lança uma magia que causa dano, você pode pagar +1 PM para rolar novamente qualquer resultado 1 na rolagem de dano dela.',
    },
    descricao: 'Encontrado apenas em meteoritos (e por isso também chamado de "ferro-meteórico"), o adamante é um metal escuro, fosco e mais denso que o aço.',
  },
  {
    id: 'gelo-eterno', nome: 'Gelo Eterno',
    precoAdicional: { arma: 600, armaduraLeve: 1500, armaduraPesada: 3000, escudo: 1500, esoterico: 3000 },
    efeitos: {
      arma: 'Causa +2 pontos de dano por frio.',
      armaduraEscudo: 'Fornece redução de fogo: armaduras leves e escudos, redução 5; armaduras pesadas, redução 10.',
      esoterico: 'Quando lança uma magia de frio que causa dano, você pode rolar novamente qualquer resultado 1 na rolagem de dano dela.',
    },
    descricao: 'As gélidas Montanhas Uivantes produzem gelo que nunca derrete. Expedições de aventureiros exploram essa região glacial perigosa à caça deste material fantástico.',
  },
  {
    id: 'madeira-tollon', nome: 'Madeira Tollon',
    precoAdicional: { arma: 1500, armaduraLeve: null, armaduraPesada: null, escudo: 1500, esoterico: 1500 },
    efeitos: {
      arma: 'Conta como mágica para vencer redução de dano. Além disso, habilidades ativadas ao se fazer um ataque ou usar a ação agredir têm seu custo em PM reduzido em –1.',
      armaduraEscudo: 'Fornece resistência a magia +2.',
      esoterico: 'Fornece resistência a magia +2.',
    },
    descricao: 'A Floresta de Tollon produz um tipo de madeira negra, dura como aço e dotada de propriedades mágicas. Apenas armas de madeira — arcos, bordões, clavas, lanças, piques e tacapes —, escudos leves e esotéricos podem ser feitos com madeira Tollon.',
  },
  {
    id: 'materia-vermelha', nome: 'Matéria Vermelha',
    precoAdicional: { arma: 1500, armaduraLeve: 6000, armaduraPesada: 18000, escudo: 6000, esoterico: 3000 },
    efeitos: {
      arma: 'Causa +1d6 de dano extra. Porém, sempre que você acerta um ataque com a arma, perde 1 ponto de vida. Lefou e lefeu são imunes tanto ao dano extra de matéria vermelha quanto à perda de vida por usar armas desse material.',
      armaduraEscudo: 'Por sua aparência "borrada", fornecem chance de falha para cada ataque contra o usuário: 10% para escudos e armaduras leves, 25% para armaduras pesadas (cumulativas entre si). Lefeu ignoram este efeito.',
      esoterico: 'Você e todos os seus inimigos em alcance curto sofrem –2 em testes de resistência contra efeitos mágicos.',
    },
    descricao: 'Qualquer material de origem lefeu — desde suas garras e carapaças, até minérios e partes de estruturas encontradas em áreas de Tormenta — apresenta propriedades parecidas, sendo conhecido como "matéria vermelha". Estes itens assustadores impõem ao usuário penalidade de –2 em perícias baseadas em Carisma (exceto Intimidação).',
  },
  {
    id: 'mitral', nome: 'Mitral',
    precoAdicional: { arma: 1500, armaduraLeve: 1500, armaduraPesada: 12000, escudo: 1500, esoterico: 3000 },
    efeitos: {
      arma: 'Aumenta sua margem de ameaça em 1. Por exemplo, uma espada longa de mitral tem margem de ameaça 18-20.',
      armaduraEscudo: 'Tem sua penalidade de armadura diminuída em 2. Armaduras pesadas de mitral permitem que você aplique até dois pontos de sua Destreza na Defesa.',
      esoterico: 'Permite que você pague +2 PM ao lançar uma magia para aumentar a CD dela em +2.',
    },
    descricao: 'Metal raro e valioso, o mitral é prateado, brilhante e mais leve que aço. Itens de mitral ocupam –1 espaço (mínimo 1).',
  },

];

if (typeof window !== 'undefined') window.MATERIAIS_ESPECIAIS = MATERIAIS_ESPECIAIS;
