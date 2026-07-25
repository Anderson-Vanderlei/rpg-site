/* ============================================================
   TORMENTA 20 — armaduras_magicas.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 337-340 (Armaduras & Escudos Mágicos)

   Mesmo esquema de armas_magicas.js — os "encantos" usam a mesma
   Tabela 8-7 de preço (window.PRECO_POR_ENCANTO, já definida em
   armas_magicas.js, reaproveitada aqui em vez de duplicada).

   Cada entrada de ENCANTOS_ARMADURA:
   { id, nome, aplicavel: ['armadura','escudo'] ou só um dos dois,
     custoEncantos: 1|2, efeito, descricao, preRequisito? }

   aplicavel: a maioria vale pra armadura E escudo, mas Animado e
   Esmagador são EXCLUSIVOS de escudo (o livro manda "role novamente"
   se calhar numa armadura).

   Cada entrada de ARMADURAS_ESCUDOS_ESPECIFICOS:
   { id, nome, tipo: 'armadura'|'escudo', tipoBase, preco, descricao }
============================================================ */

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

const ARMADURAS_ESCUDOS_ESPECIFICOS = [
  {
    id: 'armadura-da-luz', nome: 'Armadura da Luz', tipo: 'armadura', tipoBase: 'Armadura Completa',
    preco: 'T$ 150.000',
    descricao: 'Esta armadura completa banhada a ouro reforçada guardiã zelosa possui o símbolo de Khalmyr gravado no peitoral. Se você possuir um código de conduta (de honra, do herói...) ou for devoto de uma divindade que canaliza apenas energia positiva, recebe redução de dano igual ao seu Carisma.',
  },
  {
    id: 'baluarte-anao', nome: 'Baluarte Anão', tipo: 'armadura', tipoBase: 'Armadura Completa',
    preco: 'T$ 50.000',
    descricao: 'Esta armadura completa reforçada defensora de adamante fornece proteção sem igual. Se você não se deslocar em seu turno, a RD que ela fornece aumenta para 10 até seu próximo turno.',
  },
  {
    id: 'carapaca-demoniaca', nome: 'Carapaça Demoníaca', tipo: 'armadura', tipoBase: 'Armadura Completa',
    preco: 'T$ 63.000',
    descricao: 'Esta armadura completa macabra reforçada guardiã é forjada para fazer com que o usuário pareça um demônio — o elmo tem o formato de uma cabeça demoníaca com chifres e o usuário enxerga através da boca aberta e repleta de dentes. Se você for devoto de uma divindade que canaliza apenas energia negativa, os seus ataques corpo a corpo causam +1d8 de dano de trevas.',
  },
  {
    id: 'cota-elfica', nome: 'Cota Élfica', tipo: 'armadura', tipoBase: 'Cota de Malha',
    preco: 'T$ 30.000',
    descricao: 'Composta de anéis finíssimos, esta cota de malha defensora de mitral parece ser feita de seda. Ela permite que você aplique sua Destreza na Defesa como se fosse uma armadura leve.',
  },
  {
    id: 'couraca-do-comando', nome: 'Couraça do Comando', tipo: 'armadura', tipoBase: 'Couraça',
    preco: 'T$ 45.000',
    descricao: 'Esta couraça banhada a ouro sob medida defensora irradia uma aura de autoridade. Você recebe +1 em Carisma. Se usar o poder Comandar, o bônus fornecido aumenta para +2.',
  },
  {
    id: 'couro-de-monstro', nome: 'Couro de Monstro', tipo: 'armadura', tipoBase: 'Gibão de Peles',
    preco: 'T$ 36.000',
    descricao: 'Usado por chefes bárbaros das Montanhas Sanguinárias, este gibão de peles defensor é feito do couro de monstros, como basiliscos e serpes. Se você usar o poder Ataque Poderoso ou fizer uma investida, recebe um bônus de +2d6 nas rolagens de dano.',
  },
  {
    id: 'loriga-do-centuriao', nome: 'Loriga do Centurião', tipo: 'armadura', tipoBase: 'Loriga Segmentada',
    preco: 'T$ 45.000',
    descricao: 'Esta loriga segmentada defensora é dourada com detalhes em vermelho e possui o símbolo de Tauron, antigo Deus da Força, gravado no peitoral. Se estiver liderando uma ou mais criaturas (em termos de jogo, se estiver usando o poder Comandar ou similar), seus ataques corpo a corpo causam +2d6 de fogo.',
  },
  {
    id: 'manto-da-noite', nome: 'Manto da Noite', tipo: 'armadura', tipoBase: 'Couro Batido',
    preco: 'T$ 45.000',
    descricao: 'Este couro batido ajustado defensor sombrio é negro com partes metálicas foscas. Quando usa esta armadura, você não sofre penalidade em testes de Furtividade por se mover em seu deslocamento normal e a penalidade que você sofre em testes de Furtividade por atacar diminui para –10.',
  },
  {
    id: 'escudo-de-azgher', nome: 'Escudo de Azgher', tipo: 'escudo', tipoBase: 'Escudo Pesado',
    preco: 'T$ 140.000',
    descricao: 'Este escudo pesado guardião é forjado na forma de um sol estilizado. Você pode gastar uma ação padrão e 10 PM para fazê-lo emitir uma luz brilhante e quente num cone com alcance curto. A luz gera os efeitos da magia Visão da Verdade e causa 6d6 pontos de dano de fogo em todos os seus inimigos (mortos-vivos e criaturas vulneráveis a luz solar sofrem 6d8 pontos de dano). Você pode gastar 1 PM no início de cada um de seus turnos para manter a luz.',
  },
  {
    id: 'escudo-do-conjurador', nome: 'Escudo do Conjurador', tipo: 'escudo', tipoBase: 'Escudo Leve',
    preco: 'T$ 45.000',
    descricao: 'Este escudo leve defensor tem uma pequena tira de couro na parte interna, sobre a qual um conjurador pode lançar uma magia. A magia não surte efeito na hora; em vez disso, fica inscrita na tira. A tira pode então ser lida como um pergaminho, descarregando a magia em seus alvos/área. Uma vez que a magia seja descarregada, outra pode ser armazenada.',
  },
  {
    id: 'escudo-do-eclipse', nome: 'Escudo do Eclipse', tipo: 'escudo', tipoBase: 'Escudo Pesado',
    preco: 'T$ 70.000',
    descricao: 'Este escudo pesado defensor é completamente negro e parece absorver a luz. Ele fornece redução de trevas 10 e causa +1d8 de dano de trevas num ataque. Além disso, você pode gastar uma ação de movimento e 2 PM para lançar Escuridão.',
  },
  {
    id: 'escudo-do-leao', nome: 'Escudo do Leão', tipo: 'escudo', tipoBase: 'Escudo Pesado',
    preco: 'T$ 50.000',
    descricao: 'Este escudo pesado defensor é forjado como uma cabeça de leão rugindo. Uma vez por rodada, você pode gastar 2 PM para fazer a cabeça criar vida e morder uma criatura adjacente. A mordida acerta automaticamente e causa 2d6+2 pontos de dano de perfuração.',
  },
  {
    id: 'escudo-espinhoso', nome: 'Escudo Espinhoso', tipo: 'escudo', tipoBase: 'Escudo Pesado',
    preco: 'T$ 50.000',
    descricao: 'Este escudo pesado defensor é coberto de espinhos. Você pode gastar uma ação de movimento e 2 PM para disparar um espinho em um alvo em alcance curto. O espinho acerta automaticamente e causa 1d10+2 pontos de dano de perfuração.',
  },
];

if (typeof window !== 'undefined') {
  window.ENCANTOS_ARMADURA = ENCANTOS_ARMADURA;
  window.ARMADURAS_ESCUDOS_ESPECIFICOS = ARMADURAS_ESCUDOS_ESPECIFICOS;
}
