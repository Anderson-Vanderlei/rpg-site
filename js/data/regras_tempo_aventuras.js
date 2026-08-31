/* ============================================================
   TORMENTA 20 — regras_tempo_aventuras.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 6: O Mestre, seção "Tempo entre Aventuras", pp. 276–279.

   Mesma árvore das demais páginas de Regras Gerais (ver cabeçalho de
   js/data/regras_testes.js). Cobre o que os personagens fazem entre uma
   aventura e outra — Trabalho, Treinamento e Busca — mecânica de
   progressão de personagem fora de combate, ligada de perto a uma
   futura ficha interativa (ex.: um botão "Treinar" que resolve os 3
   testes e aplica o benefício direto na ficha).
============================================================ */

window.REGRAS_TEMPO_ARVORE = [
  {
    id: 'tempo-aventuras-intro-cat', titulo: 'Tempo entre Aventuras', icone: 'ti-hourglass-high',
    paragrafos: [
      'Durante aventuras, os personagens invadem masmorras, enfrentam vilões, conquistam tesouros. Mas o que acontece entre uma missão e outra? Em campanhas complexas, que buscam contar uma saga épica, essa questão ganha importância — os personagens precisam de tempo entre aventuras para que eles e as tramas possam se desenvolver de forma verossímil.',
      'Os personagens podem fazer uma ação por mês de tempo de jogo (o mestre pode aumentar este tempo para uma ação por estação ou até por ano, para campanhas mais longas).',
    ],
    itens: [
      { id: 'sumarios', nome: 'Sumários', descricao: ['A opção mais simples. Entre uma aventura e outra, você arbitra o que acontece: "Depois de salvar o reino do ataque purista, vocês passam um mês festejando na capital, aproveitando a fama e a fortuna que ganharam. Até que, certa noite, um velhinho entra na taverna em que vocês estão...". Essa opção funciona quando os personagens não têm objetivos específicos — nesses casos, é melhor que o mestre tome as rédeas do tempo entre aventuras e simplesmente descreva o que aconteceu.'] },
      { id: 'jogando-solos', nome: 'Jogando Solos', descricao: ['A opção mais complexa: em vez do mestre descrever o que acontece, os jogadores escolhem o que querem fazer. A diferença para uma aventura normal está no nível de detalhamento — aventuras são a parte principal da campanha e resolvidas com as regras completas; já o tempo entre aventuras é a parte secundária, por isso é menos detalhado e resolvido com regras simplificadas.'] },
    ],
  },
  {
    id: 'acoes-tempo-cat', titulo: 'Ações do Tempo entre Aventuras', icone: 'ti-briefcase',
    paragrafos: [
      'A seguir estão três ações que os jogadores podem fazer durante o tempo entre aventuras: trabalho, treinamento e busca. A primeira opção serve para ganhar dinheiro. A segunda tem como objetivo ganhar poder. A terceira é uma grande "guarda-chuva" para outras coisas que o jogador queira fazer — basicamente, qualquer ação cujo objetivo não seja adquirir dinheiro ou poder é uma busca.',
    ],
    itens: [
      {
        id: 'trabalho', nome: 'Trabalho',
        descricao: ['Personagens treinados em Ofício podem usar o tempo entre aventuras para ganhar dinheiro ou fabricar itens, conforme as regras da perícia. Embora esta ação não seja a preferida de aventureiros, é a mais usada por pessoas comuns.'],
      },
      {
        id: 'treinamento', nome: 'Treinamento',
        descricao: [
          'A vida de aventuras é perigosa; faz sentido que em seu tempo livre os personagens pratiquem para ficar mais poderosos.',
          'O jogador deve descrever como seu personagem vai treinar e escolher um atributo relacionado ao treinamento descrito. Um guerreiro que faça exercícios físicos pode usar Força, enquanto um arcanista que estude em uma biblioteca pode usar Inteligência.',
          'O personagem então faz três testes do atributo escolhido, com CD 10 + metade do seu nível. Se passar em pelo menos dois, recebe um benefício de seu próximo nível de personagem, a sua escolha. Caso contrário, nada acontece — o personagem não sofre nenhuma penalidade por falhar no treinamento, além do tempo perdido.',
        ],
        lista: [
          'PV equivalente ao seu próximo nível.',
          'PM equivalente ao seu próximo nível.',
          'Uma habilidade de classe do seu próximo nível.',
          '+1 em todas as perícias (apenas se o seu próximo nível de personagem for par).',
        ],
        paragrafosPos: [
          'Você pode treinar múltiplas vezes, mas deve escolher um benefício diferente a cada vez. Quando sobe de nível, recebe os benefícios não escolhidos desse nível, tornando-se um personagem normal. Na prática, você perde os benefícios do treinamento quando sobe de nível — isso evita que os personagens fiquem com poder acima do resto do grupo, mas você ainda terá tido um benefício em todas as sessões entre o treinamento e o próximo nível.',
          'De acordo com o mestre, benefícios de treinamento podem se manter entre os níveis — isto é, se você tem um benefício de treinamento e sobe de nível, automaticamente ganha um benefício do próximo nível. Se a qualquer momento o personagem acumular quatro benefícios de treinamento, perde todos eles e sobe um nível imediatamente.',
          'Como alternativa, seu benefício de treinamento pode trocar uma habilidade escolhida previamente (como um poder ou magia) por outra que poderia ter escolhido naquele momento.',
        ],
      },
      {
        id: 'busca', nome: 'Busca',
        descricao: [
          'Com esta ação, o personagem executa qualquer tarefa a sua escolha, limitado apenas pelo bom senso. Se na última aventura o grupo encontrou um artefato misterioso, o arcanista pode pesquisar para descobrir o que o item faz. Se o histórico do guerreiro diz que ele teve sua família morta por um vampiro, ele pode usar seu tempo livre para investigar o paradeiro do morto-vivo, para que um dia possa se vingar.',
          'Para resolver uma busca, o jogador descreve o que planeja fazer em linhas gerais — não é necessário detalhar. O jogador então escolhe uma perícia relacionada à descrição da busca. Depois, é a vez do mestre escolher uma segunda perícia coerente com a mesma descrição.',
          'Por fim, o jogador rola 2d12 na Tabela 6-6: Desafios de Buscas, para definir a terceira e última perícia. A tabela traz exemplos de desafios relacionados a cada perícia, mas o mestre pode inventar outros.',
          'Com as três perícias definidas (a primeira escolhida pelo jogador, a segunda pelo mestre e a terceira aleatória), é hora de rolar. Os testes têm CD 20 + metade do nível do personagem (heróis mais poderosos se envolvem em missões mais difíceis ou atraem a atenção de inimigos mais poderosos).',
          'A quantidade de sucessos determina o resultado da busca: 0 sucessos = não consegue o que queria e sofre um castigo; 1 sucesso = não consegue o que queria, mas não sofre penalidade; 2 sucessos = consegue o que queria; 3 sucessos = consegue o que queria e um benefício adicional a critério do mestre.',
        ],
        tabela: {
          titulo: 'Tabela 6-6: Desafios de Buscas',
          colunas: ['2d12', 'Perícia', 'Exemplo'],
          linhas: [
            ['2', 'Misticismo', 'Decifrar uma runa'],
            ['3', 'Adestramento', 'Acalmar uma fera'],
            ['4', 'Conhecimento', 'Traduzir um texto antigo'],
            ['5', 'Enganação', 'Participar de uma intriga'],
            ['6', 'Cura', 'Tratar um veneno'],
            ['7', 'Iniciativa', 'Perseguir um bandido'],
            ['8', 'Intimidação', 'Negociar com um criminoso'],
            ['9', 'Investigação', 'Descobrir uma localização'],
            ['10', 'Reflexos', 'Evitar um desmoronamento'],
            ['11', 'Atletismo', 'Escalar um penhasco'],
            ['12', 'Percepção', 'Evitar uma emboscada'],
            ['13', 'Sobrevivência', 'Atravessar os ermos'],
            ['14', 'Fortitude', 'Tolerar clima ruim'],
            ['15', 'Diplomacia', 'Negociar com um mercador'],
            ['16', 'Furtividade', 'Infiltrar-se num lugar'],
            ['17', 'Acrobacia', 'Atravessar uma ravina'],
            ['18', 'Intuição', 'Elucidar um enigma'],
            ['19', 'Vontade', 'Resistir a uma maldição'],
            ['20', 'Luta', 'Defender-se de um monstro'],
            ['21', 'Jogatina', 'Apostar com as fadas'],
            ['22', 'Nobreza', 'Participar de um baile'],
            ['23', 'Religião', 'Entender um presságio'],
            ['24', 'Guerra', 'Atravessar um campo de batalha'],
          ],
        },
        itens: [
          {
            id: 'recompensas-busca', nome: 'Recompensas',
            descricao: ['Tanto os castigos quanto as recompensas de uma busca podem ser definidos pelo mestre ou de forma aleatória, usando a Tabela 6-7: Consequências de Buscas — especialmente útil se o personagem se aventurou sem um objetivo específico.'],
            lista: [
              'Favor. Você recebe um favor de um NPC ou organização, ou a promessa de um favor futuro, que o ajuda por uma cena. Você decide o favor, mas o mestre deve aprová-lo.',
              'Informação. Você recebe uma informação, como a localização de um tesouro, a identidade do traidor na corte, a resposta para um enigma mágico etc. Você decide a informação, mas o mestre deve aprová-la.',
              'Poder. Você recebe um benefício de treinamento, definido aleatoriamente.',
              'Tesouro. Você ganha um bem material. Role na tabela de Tesouros (Capítulo 8: Recompensas), na coluna de riquezas, de itens ou em ambas, na linha correspondente a seu nível.',
            ],
          },
          {
            id: 'castigos-busca', nome: 'Castigos',
            descricao: [],
            lista: [
              'Abalo. Você sofre uma derrota que abala sua confiança. Durante a próxima aventura, seus pontos de mana máximos diminuem em 1 por nível de personagem.',
              'Complicação. Você sofre uma complicação, que irá afetá-lo em algum momento de sua carreira — como ter feito um inimigo poderoso ou contraído uma doença mágica. Cabe ao mestre definir os detalhes exatos dessa complicação.',
              'Ferimento. Você sofre um ferimento severo, que demora a cicatrizar. Durante a próxima aventura, seus pontos de vida máximos diminuem em 1 por nível de personagem. Habilidades e magias de cura não funcionam contra este efeito.',
              'Maldição. Você sofre um efeito da magia Rogar Maldição na próxima aventura.',
              'Ruína. Você perde dinheiro ou itens, à sua escolha, em valor equivalente a um quarto (perda menor) ou metade (perda maior) do dinheiro inicial de seu nível. Se não tiver como pagar, sofre um Abalo.',
            ],
          },
          {
            id: 'consequencias-busca', nome: 'Consequências de Buscas',
            descricao: [],
            tabela: {
              titulo: 'Tabela 6-7: Consequências de Buscas',
              colunas: ['Sucessos', 'Consequência'],
              linhas: [
                ['0', '1 castigo'],
                ['1', 'Nenhuma'],
                ['2', '1 recompensa'],
                ['3', '2 recompensas'],
              ],
              tabela2: {
                colunas: ['1d6 (Recompensa/Castigo)', 'Recompensa', 'Castigo'],
                linhas: [
                  ['1', 'Tesouro (riqueza)', 'Ruína (menor)'],
                  ['2', 'Favor', 'Abalo'],
                  ['3', 'Tesouro (item)', 'Complicação'],
                  ['4', 'Informação', 'Ferimento'],
                  ['5', 'Tesouro (ambos)', 'Maldição'],
                  ['6', 'Poder', 'Ruína (maior)'],
                ],
              },
            },
          },
        ],
        destaque: 'Lembre-se de que cada teste de busca não representa uma única ação, mas sim uma sequência de eventos ao longo de horas ou meses. Habilidades que modificam perícias (fornecem bônus, substituem um teste por outro...) não podem ser usadas em buscas. Usos criativos de habilidades podem, entretanto, fornecer bônus num dos testes — o bônus varia de +2 a +5.',
      },
    ],
  },
  {
    id: 'custo-vida-cat', titulo: 'Custo de Vida (Variante)', icone: 'ti-coin',
    paragrafos: [
      'Entre uma aventura e outra, heróis precisam comer e comprar roupas, como qualquer pessoa. Para simplificar, em vez de pagar cada estadia ou refeição, você pode pagar um custo mensal que representa o seu sustento. Esse valor inclui despesas mundanas como moradia, comida, roupas e transporte, mas não itens com benefícios mecânicos. O jogador escolhe um dos custos mensais a seguir; o custo define a condição de descanso padrão do personagem.',
    ],
    itens: [
      { id: 'custo-vida-pobre', nome: 'Pobre (T$ 10)', descricao: ['Você dorme na rua, em celeiros ou nas piores hospedarias. Come pão velho e veste trapos. Alguns clérigos e paladinos vivem assim por opção — doam quase todo o seu dinheiro, mantendo apenas o mínimo para viver. Outros, como bárbaros, caçadores e druidas, não se importam com conforto. Condição de descanso: ruim.'] },
      { id: 'custo-vida-medio', nome: 'Médio (T$ 50)', descricao: ['Você dorme em estalagens e come em tavernas. Este estilo de vida é caro para pessoas comuns — imagine alguém que viva em hotéis e coma em restaurantes todos os dias —, mas boa parte dos aventureiros pode pagar por isso. Condição de descanso: normal.'] },
      { id: 'custo-vida-rico', nome: 'Rico (T$ 100)', descricao: ['Você fica em quartos privativos nas estalagens, alimenta-se bem e veste-se com roupas feitas por alfaiates. Condição de descanso: confortável.'] },
      { id: 'custo-vida-luxuoso', nome: 'Luxuoso (T$ 200)', descricao: ['Você dorme nas melhores estalagens — quando não é convidado por um nobre local para ficar em seu castelo — e come banquetes. Seus passeios de carruagem atraem olhares de admiração e inveja. Condição de descanso: luxuosa.'] },
    ],
  },
];
