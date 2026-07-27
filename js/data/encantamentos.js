/* ============================================================
   TORMENTA 20 — encantamentos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 333-340 (Armas Mágicas + Armaduras &
   Escudos Mágicos — só a parte de "encantos")

   Separado num arquivo próprio (em vez de ficar dentro de
   armas_magicas.js / armaduras_magicas.js) porque encantamentos são
   uma categoria de Modificador com vida própria — junto com Melhorias
   (melhorias.js), Materiais Especiais (materiais_especiais.js) e,
   futuramente, Maldições — e a lista deve crescer independente das
   armas/armaduras específicas nomeadas.

   Cada entrada de ENCANTOS_ARMA:
   { id, nome, custoEncantos: 1|2, efeito, descricao, preRequisito? }

   custoEncantos: a maioria vale 1, mas Energética, Lancinante e
   Magnífica contam como DOIS encantos cada (a tabela original manda
   "role novamente" se o item só tiver 1 encanto disponível).

   Cada entrada de ENCANTOS_ARMADURA:
   { id, nome, aplicavel: ['armadura','escudo'] ou só um dos dois,
     custoEncantos: 1|2, efeito, descricao, preRequisito? }

   aplicavel: a maioria vale pra armadura E escudo, mas Animado e
   Esmagador são EXCLUSIVOS de escudo.

   preRequisito: nome de outro encanto que precisa estar no mesmo item
   antes (Lancinante exige Dilacerante; Magnífica exige Formidável;
   Guardião exige Defensor).
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

const ENCANTOS_ARMADURA = [
  {
    id: 'abascanto', nome: 'Abascanto', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra magia',
    descricao: 'Você recebe resistência a magia +5.',
  },
  {
    id: 'abencoado', nome: 'Abençoado', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra trevas',
    descricao: 'Você recebe redução de trevas 10 e +5 em testes de resistência contra efeitos de necromancia. Um item abençoado é decorado com gravuras de símbolos sagrados de deuses do Bem.',
  },
  {
    id: 'acrobatico', nome: 'Acrobático', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Bônus em Acrobacia',
    descricao: 'Você recebe +5 em Acrobacia e ignora a penalidade de armadura do item para testes dessa perícia.',
  },
  {
    id: 'alado', nome: 'Alado', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Deslocamento de voo 12m',
    descricao: 'Você pode gastar 2 PM para fazer asas emergirem de suas costas e receber deslocamento de voo 12m com duração sustentada.',
  },
  {
    id: 'animado', nome: 'Animado', aplicavel: ['escudo'], custoEncantos: 1,
    efeito: 'Escudo defende sozinho',
    descricao: 'Você pode gastar uma ação de movimento e 1 PM para fazer o escudo flutuar ao seu redor até o fim da cena. Você recebe o mesmo bônus na Defesa que receberia se estivesse empunhando o escudo, mas fica com as duas mãos livres. Você só pode ser protegido por um escudo ao mesmo tempo. Apenas escudos — para armaduras, role novamente.',
  },
  {
    id: 'assustador', nome: 'Assustador', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Causa efeito de medo',
    descricao: 'Você pode gastar uma ação de movimento e 2 PM para gerar uma onda de medo. Inimigos em alcance curto devem passar num teste de Vontade (CD Carisma) ou ficarão abalados até o fim da cena. Um item assustador possui manchas de sangue, ossos pendurados e outras decorações horripilantes.',
  },
  {
    id: 'caustica', nome: 'Cáustica', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra ácido',
    descricao: 'Você recebe redução de ácido 10 e pode gastar uma ação de movimento e 2 PM para fazer o item gotejar ácido. Se fizer isso, seus ataques causam +1d4 de dano de ácido até o fim da cena.',
  },
  {
    id: 'defensor', nome: 'Defensor', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Defesa +2',
    descricao: 'O item é encantado para desviar golpes. O bônus na Defesa do item aumenta em +2.',
  },
  {
    id: 'escorregadio', nome: 'Escorregadio', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Bônus para escapar',
    descricao: 'Você recebe +10 em testes de Acrobacia para escapar e em testes de manobra contra agarrar. Um item escorregadio parece estar sempre coberto de óleo levemente gorduroso.',
  },
  {
    id: 'esmagador', nome: 'Esmagador', aplicavel: ['escudo'], custoEncantos: 1,
    efeito: 'Escudo causa mais dano',
    descricao: 'Este escudo fornece +2 em ataques e dano e tem seu dano aumentado em um passo. Apenas escudos — para armaduras, role novamente.',
  },
  {
    id: 'fantasmagorico', nome: 'Fantasmagórico', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Lança Manto de Sombras',
    descricao: 'Você pode lançar a magia Manto de Sombras. Um item fantasmagórico é cinzento e esfumaçado.',
  },
  {
    id: 'fortificado', nome: 'Fortificado', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Chance de ignorar crítico',
    descricao: 'Você recebe 25% de chance (para escudos) e 50% de chance (para armaduras) de ignorar o dano extra de acertos críticos e ataques furtivos.',
  },
  {
    id: 'gelido', nome: 'Gélido', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra frio',
    descricao: 'Você recebe redução de frio 10 e pode gastar uma ação de movimento e 2 PM para se cobrir de gelo até o fim da cena. Se fizer isso, recebe 10 PV temporários. Um item gélido é azulado e frio ao toque.',
  },
  {
    id: 'guardiao', nome: 'Guardião', aplicavel: ['armadura', 'escudo'], custoEncantos: 2,
    efeito: 'Defesa +4',
    descricao: 'O item emite um campo de força que desvia ataques. O bônus na Defesa do item aumenta em +4. Conta como dois encantos — para itens menores, role novamente.',
    preRequisito: 'Defensor',
  },
  {
    id: 'hipnotico', nome: 'Hipnótico', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Fascina inimigos',
    descricao: 'Você pode gastar uma ação padrão e 3 PM para emitir luzes coloridas. Inimigos em alcance curto devem passar num teste de Vontade (CD Carisma) ou ficarão fascinados por 1d6 rodadas. O efeito termina se qualquer criatura afetada for atacada. Um item hipnótico é espalhafatoso e colorido.',
  },
  {
    id: 'ilusorio', nome: 'Ilusório', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Camufla-se como item comum',
    descricao: 'Você pode gastar uma ação de movimento e 1 PM para fazer o item adquirir a aparência de uma roupa comum, mas mantendo suas propriedades (bônus na Defesa, penalidade de armadura...). A magia Visão da Verdade revela o item disfarçado.',
  },
  {
    id: 'incandescente', nome: 'Incandescente', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra fogo',
    descricao: 'Você recebe redução de fogo 10 e pode gastar uma ação de movimento e 2 PM para fazer o item emitir labaredas até o fim da cena. Se fizer isso, no início de cada um de seus turnos você causa 1d6 pontos de dano de fogo em todas as criaturas adjacentes. Um item incandescente é avermelhado e quente ao toque.',
  },
  {
    id: 'invulneravel', nome: 'Invulnerável', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Redução de dano',
    descricao: 'Você recebe redução de dano 2 (para escudos) ou 5 (para armaduras).',
  },
  {
    id: 'opaco', nome: 'Opaco', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Redução de energia',
    descricao: 'Você recebe redução de ácido, eletricidade, fogo e frio 10. Um item opaco parece sem cor, totalmente comum e desinteressante.',
  },
  {
    id: 'protetor', nome: 'Protetor', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência +2',
    descricao: 'Você recebe +2 em testes de resistência.',
  },
  {
    id: 'refletor', nome: 'Refletor', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Reflete magia',
    descricao: 'Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela. Um item refletor parece espelhado.',
  },
  {
    id: 'relampejante', nome: 'Relampejante', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Resistência contra eletricidade',
    descricao: 'Você recebe redução de eletricidade 10 e pode gastar uma ação de movimento e 2 PM para gerar arcos voltaicos até o fim da cena. Se fizer isso, qualquer criatura que o ataque em corpo a corpo sofre 2d6 pontos de dano de eletricidade. Um item relampejante é decorado com ouro, prata e cobre.',
  },
  {
    id: 'reluzente', nome: 'Reluzente', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Causa efeito de cegueira',
    descricao: 'Você pode gastar uma ação de movimento e 2 PM para emitir um clarão de luz. Todos os inimigos em alcance curto devem passar num teste de Reflexos (CD Carisma) ou ficarão cegos por uma rodada. Um item reluzente é polido e brilhante.',
  },
  {
    id: 'sombrio', nome: 'Sombrio', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Bônus em Furtividade',
    descricao: 'Você recebe +5 em Furtividade e ignora a penalidade de armadura do item para testes dessa perícia. Um item sombrio é escuro, fosco e bem lubrificado, para não fazer barulho.',
  },
  {
    id: 'zeloso', nome: 'Zeloso', aplicavel: ['armadura', 'escudo'], custoEncantos: 1,
    efeito: 'Atrai ataques em aliados',
    descricao: 'Uma vez por rodada, se um aliado adjacente for alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque, que então é resolvido normalmente.',
  },
];

if (typeof window !== 'undefined') {
  window.PRECO_POR_ENCANTO = PRECO_POR_ENCANTO;
  window.ENCANTOS_ARMA = ENCANTOS_ARMA;
  window.ENCANTOS_ARMADURA = ENCANTOS_ARMADURA;
}
