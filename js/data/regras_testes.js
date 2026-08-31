/* ============================================================
   TORMENTA 20 — regras_testes.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 5: Regras do Jogo, seção "Testes", pp. 220–223.

   Estrutura em ÁRVORE (31/ago) — reformulado a pedido do usuário pra
   separar cada mecânica nomeada em sua própria entrada navegável, no
   padrão "Categoria > Subcategoria > Item > Descrição" (ex.: "Regras
   Adicionais > Testes sem Rolagens > Escolher 10 > Descrição"). Cada nó
   tem um `id` estável — a ideia é que esses ids sirvam de âncora tanto
   pra navegação/consulta rápida quanto, no futuro, pra keywords.js
   linkar menções soltas a essas mecânicas (ver nota de cautela sobre
   colisão semântica em CLAUDE.md §9.1 antes de ligar isso de verdade —
   nomes como "Ajudar" ou "Novas Tentativas" são palavras comuns e
   precisam do mesmo cuidado caso a caso que "Tormenta" exigiu).

   Schema de cada nó:
   { id, titulo?, nome?, icone?, formula?, paragrafos?, lista?, destaque?,
     tabela?, itens?: [...nós filhos...] }
   — um nó é "galho" se tiver `itens` (pode ter conteúdo próprio antes
   dos filhos); é "folha" se não tiver `itens` (some vezes usa `nome` em
   vez de `titulo`, mas ambos funcionam — o renderizador usa titulo||nome).
============================================================ */

window.REGRAS_TESTES_ARVORE = [
  {
    id: 'fundamentos', titulo: 'Fundamentos do Teste', icone: 'ti-dice',
    paragrafos: [
      'Sempre que um personagem tenta fazer uma ação cujo resultado é incerto, o jogador faz um <strong>teste</strong>. Um teste é uma rolagem de 1d20 + um modificador. Você passa no teste se este resultado for igual ou maior que a CD.',
      'Testes são classificados pela característica utilizada (atributo ou perícia) e pelo que define sua CD (comuns ou opostos).',
    ],
    itens: [
      {
        id: 'teste-atributo', nome: 'Teste de Atributo',
        formula: 'Teste de Atributo = 1d20 + Atributo',
        descricao: [
          'Você usa testes de atributo para tarefas básicas, para as quais nenhuma perícia se aplica. Para fazer um teste de atributo, role 1d20 e some o valor do atributo apropriado.',
        ],
        lista: [
          'Erguer um objeto pesado (Força).',
          'Amarrar cordas (Destreza).',
          'Estabilizar sangramento (Constituição).',
          'Resolver um enigma (Inteligência).',
          'Decidir se algo é prudente (Sabedoria).',
          'Causar boa impressão (Carisma).',
        ],
      },
      {
        id: 'teste-pericia', nome: 'Teste de Perícia',
        formula: 'Teste de Perícia = 1d20 + Valor de Perícia',
        descricao: [
          'Um teste de perícia funciona como um teste de atributo. Porém, você soma o valor da perícia em questão. O Capítulo 2: Perícias & Poderes explica como calcular seu valor de cada perícia.',
        ],
      },
    ],
  },
  {
    id: 'comuns-opostos', titulo: 'Testes Comuns & Opostos', icone: 'ti-versus',
    itens: [
      {
        id: 'testes-comuns', nome: 'Testes Comuns',
        descricao: [
          'Testes comuns são usados quando um personagem está competindo contra o ambiente. Eles são realizados contra uma CD determinada pelo mestre, de acordo com a tarefa sendo realizada.',
          'O mestre pode estipular as dificuldades de todos os testes usando a tabela abaixo como guia. Porém, o Capítulo 2 traz exemplos de dificuldades para tarefas específicas nas descrições de cada perícia.',
        ],
        tabela: {
          titulo: 'Tabela 5-1: Dificuldades',
          colunas: ['Tarefa', 'CD', 'Exemplo'],
          linhas: [
            ['Fácil*', '5', 'Subir uma encosta íngreme (Atletismo)'],
            ['Média', '10', 'Ouvir um guarda se aproximando (Percepção)'],
            ['Difícil', '15', 'Estancar um sangramento (Cura)'],
            ['Desafiadora', '20', 'Nadar contra uma correnteza (Atletismo)'],
            ['Formidável', '25', 'Sabotar uma armadilha complexa (Ladinagem)'],
            ['Heroica', '30', 'Decifrar um pergaminho antigo em um idioma morto (Conhecimento)'],
            ['Quase Impossível', '40', 'Fabricar uma "obra-prima", ou seja, um item com quatro melhorias (Ofício)'],
          ],
          nota: '*Testes fáceis aparecem na tabela para fornecer senso de escala, mas normalmente não são exigidos — caso um personagem tente uma tarefa fácil, o mestre pode considerar que ele passa automaticamente, para acelerar o jogo.',
        },
      },
      {
        id: 'testes-opostos', nome: 'Testes Opostos',
        descricao: [
          'Testes opostos são usados quando dois ou mais personagens estão competindo entre si. Cada personagem envolvido faz seu teste. Aquele com maior valor é o vencedor. Em caso de empate, aquele com o maior valor vence. Se os valores forem iguais, outra rolagem deve ser feita.',
        ],
      },
      {
        id: 'testes-mistura', nome: 'Misturando Testes Comuns e Opostos',
        descricao: [
          'Um teste pode ser comum e oposto ao mesmo tempo. Por exemplo, se três personagens estão disputando para ver quem atravessa um lago primeiro, todos devem fazer um teste de Atletismo contra uma CD. Aqueles que passarem atravessam o lago. Dentre esses, aquele com o maior resultado chega primeiro.',
        ],
      },
    ],
  },
  {
    id: 'regras-adicionais', titulo: 'Regras Adicionais de Testes', icone: 'ti-adjustments',
    itens: [
      {
        id: 'sucessos-falhas', nome: 'Sucessos e Falhas Automáticos',
        descricao: [
          'Ao fazer um teste, um 20 natural (quando o resultado do d20 é 20) sempre é um sucesso, e um 1 natural (quando o resultado do d20 é 1) sempre é uma falha, não importando o valor a ser alcançado.',
        ],
      },
      {
        id: 'condicoes-fav-desfav', nome: 'Condições Favoráveis e Desfavoráveis',
        descricao: [
          'Certas situações podem tornar um teste mais fácil ou mais difícil. Para representar isso, o mestre pode alterar o teste de duas maneiras.',
        ],
        lista: [
          'Conceder ao personagem um bônus de +2 ou mais para representar circunstâncias que melhorem seu desempenho. Por exemplo, procurar por um livro em uma biblioteca bem organizada com um teste de Investigação.',
          'Impor ao personagem uma penalidade de –2 ou mais para representar circunstâncias que atrapalham seu desempenho, como procurar por um frasco específico em um laboratório bagunçado com um teste de Investigação.',
        ],
      },
      {
        id: 'novas-tentativas', nome: 'Novas Tentativas',
        descricao: [
          'Em geral, você pode tentar um teste de novo em caso de falha e continuar tentando por toda a eternidade. Contudo, alguns testes acarretam penalidades (ou problemas!) em caso de falha. Por exemplo, um personagem que falhe em um teste de Atletismo para subir uma encosta pode tentar novamente. Mas, se falhar por 5 ou mais, cairá. Ele pode se levantar e tentar de novo, supondo que a queda não tenha sido muito dolorida...',
        ],
      },
      {
        id: 'ferramentas', nome: 'Ferramentas',
        descricao: [
          'Algumas perícias requerem ferramentas. Se isso for necessário, será mencionado na descrição da perícia. Se você não possui o item apropriado, ainda pode usar a perícia, mas sofre uma penalidade de –5 no teste.',
        ],
      },
      {
        id: 'ajudar', nome: 'Ajudar',
        descricao: [
          'Às vezes, os personagens trabalham juntos e se ajudam. Um personagem (normalmente aquele com o maior bônus) é considerado o líder, e faz o teste normal, enquanto cada ajudante faz um teste contra CD 10 (usando a mesma perícia ou outra que faça sentido). Um teste de ajuda concede ao líder um bônus de +1, e +1 adicional para cada 10 pontos acima da CD (+2 para um resultado 20, +3 para 30 e assim por diante).',
          'Em muitos casos, ajuda externa não traz benefícios — você não pode ajudar um colega a ser mais silencioso em seu teste de Furtividade. Ou então apenas um número limitado de ajudantes pode auxiliar alguém ao mesmo tempo. O mestre limita a ajuda como achar melhor, de acordo com a tarefa e as condições.',
        ],
      },
      {
        id: 'testes-sem-rolagem', titulo: 'Testes sem Rolagens',
        paragrafos: [
          'Um teste representa a realização de uma tarefa desafiadora — com alta dificuldade ou feita em situação de perigo. Quando este não é o caso, você pode usar as opções a seguir para dispensar as rolagens. Elas são úteis para acelerar o jogo e não interromper a história com rolagens desnecessárias.',
        ],
        destaque: 'Para alguns testes, não há perigo em falhar. Mas só alguns...',
        itens: [
          {
            id: 'escolher-0', nome: 'Escolher 0',
            descricao: [
              'Quando seu bônus total em um teste é igual ou maior que a CD, você não precisa fazer o teste — você automaticamente passa. A tarefa é trivial para alguém com suas habilidades. Por exemplo, um personagem com Sobrevivência +15 não precisa fazer testes para montar acampamento em uma planície (uma tarefa com CD 15). Caso o teste tenha variados graus de sucesso, você obtém o mínimo possível. Você ainda pode fazer uma rolagem para alcançar um grau maior de sucesso, se quiser, mas arrisca falhar se rolar um 1 natural.',
            ],
          },
          {
            id: 'escolher-10', nome: 'Escolher 10',
            descricao: [
              'Quando não há pressão para realizar uma tarefa, você pode escolher 10. Isso significa realizar a tarefa com calma, sem chance para erros. Em vez de rolar 1d20, considere um resultado 10 automático. Isso costuma bastar para muitas tarefas.',
            ],
          },
          {
            id: 'escolher-20', nome: 'Escolher 20',
            descricao: [
              'Quando não há pressão e a tarefa não oferece nenhuma consequência ou penalidade em caso de falha, você pode escolher 20. Isso significa gastar todo o tempo do mundo e tentar todas as possibilidades, até passar. Em vez de rolar 1d20, considere um resultado 20 automático. Escolher 20 exige vinte vezes mais tempo que o normal para executar a perícia (ou, para simplificar, a cena inteira, de acordo com o mestre).',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'testes-estendidos-cat', titulo: 'Testes Estendidos', icone: 'ti-hourglass',
    itens: [
      {
        id: 'testes-estendidos', nome: 'Testes Estendidos',
        descricao: [
          'A maioria das tarefas pode ser resolvida com um único teste. Se um personagem quer escalar um muro, o sucesso ou a falha são aparentes após um único teste. Entretanto, para situações complexas e que consomem tempo — como escalar uma montanha —, ou quando o mestre quer criar clima de tensão, esta regra pode ser usada.',
          'Em um teste estendido, o grupo deve acumular uma quantidade de sucessos antes de três falhas, o que indica uma falha total. Quanto mais complexa a tarefa, mais sucessos são exigidos — veja a tabela abaixo.',
          'Por exemplo, os personagens estão procurando o esconderijo de uma guilda de ladrões. Para isso precisam fazer perguntas na cidade. Pela complexidade da tarefa, o mestre pede um teste estendido de Investigação com complexidade média e CD 20. Isso significa que os heróis devem fazer testes de Investigação contra CD 20 até acumularem cinco sucessos. Se conseguirem, descobrem as pistas. Porém, se acumularem três falhas antes dos cinco sucessos, têm uma falha total — nesse caso, o grupo pode ter sido descuidado e alertado os membros da guilda, além de não conseguir a informação que queria.',
          'Testes estendidos podem envolver mais de uma perícia. Por exemplo, infiltrar-se em uma base purista pode exigir um sucesso em Atletismo, para escalar o muro, e dois em Furtividade, para não ser visto pelas sentinelas. Um julgamento pode exigir dois sucessos em Nobreza, para conhecer a lei, mas três em Diplomacia, para convencer o magistrado.',
        ],
        tabela: {
          titulo: 'Tabela 5-2: Testes Estendidos',
          colunas: ['Sucessos exigidos', 'Complexidade', 'Exemplos'],
          linhas: [
            ['3', 'Baixa', 'Escalar um paredão (Atletismo)'],
            ['5', 'Média', 'Atravessar o Pântano dos Juncos (Sobrevivência)'],
            ['7', 'Alta', 'Compreender um ritual antigo (Misticismo)'],
          ],
        },
      },
      {
        id: 'testes-estendidos-abertos', nome: 'Testes Estendidos Abertos',
        descricao: [
          'O mestre pode permitir que os jogadores decidam quais perícias vão usar em um teste estendido. O jogador escolhe a perícia, então explica como vai utilizá-la para resolver o desafio.',
          'Por exemplo, em um julgamento, um personagem poderia usar Enganação ("vou corromper o magistrado"); Intimidação ("vou assustar os jurados para que decidam em meu favor"); Intuição ("vou analisar a situação para determinar qual o melhor argumento") etc.',
          'Permitir que os jogadores descrevam quais perícias vão usar irá envolvê-los mais com a cena. Se o mestre permitir isso, cada teste avulso dentro do teste estendido precisa ser feito com uma perícia diferente. Se combinada com as opções que dificultam os testes estendidos, essa opção exige pensamento tático por parte do grupo!',
        ],
      },
      {
        id: 'testes-estendidos-grupo', nome: 'Testes Estendidos em Grupo',
        descricao: [
          'Por serem feitos ao longo do tempo, testes estendidos podem ser feitos por mais de um personagem, ou mesmo pelo grupo todo. De fato, colocar o grupo inteiro para fazer um único teste estendido é uma ótima forma de unir os jogadores!',
          'Caso mais de um personagem esteja participando do teste estendido, resolva o teste por "rodadas"; a cada rodada, cada jogador faz um teste. Some os sucessos e falhas de todos para definir se o teste estendido é bem-sucedido ou não.',
          'Fazer testes estendidos em grupo é muito útil em testes estendidos abertos, nos quais cada perícia só pode ser usada uma vez. Com vários personagens participando do teste, a chance deles terem mais perícias treinadas diferentes é maior.',
        ],
      },
      {
        id: 'ajuda-testes-estendidos', nome: 'Ajuda e Testes Estendidos',
        descricao: [
          'Personagens podem ajudar em testes estendidos, usando a regra de ajuda padrão. Porém, uma perícia usada para ajudar não poderá ser usada novamente no teste estendido, seja para ajudar, seja para realizar o teste principal.',
        ],
      },
      {
        id: 'dificultando-testes-estendidos', nome: 'Dificultando Testes Estendidos',
        descricao: [
          'Para testes estendidos especialmente desafiadores, o mestre pode usar dificuldades cumulativas e penalidades por falhas.',
          'No primeiro caso, a CD aumenta em +2 a cada teste (independentemente de o teste ser um sucesso ou uma falha), representando a dificuldade crescente. Por exemplo, num teste estendido para se infiltrar até os aposentos reais do castelo, a CD pode aumentar a cada teste, pois quanto mais perto do quarto do rei, maior a segurança.',
          'No segundo caso, o mestre aplica uma penalidade para cada falha. Digamos que um personagem esteja envolvido em uma negociação intrincada com um aristocrata, exigindo um teste estendido de Diplomacia. Cada vez que falhe, pode sofrer uma penalidade cumulativa de –2 nos testes seguintes. Da mesma forma, um personagem escalando uma montanha com um teste estendido de Atletismo pode sofrer 3d6 pontos de dano para cada falha, representando ferimentos durante a subida.',
        ],
      },
      {
        id: 'interrupcoes-testes-estendidos', nome: 'Interrupções e Novas Tentativas',
        descricao: [
          'A maioria dos testes estendidos pode ser interrompida sem problemas. Entretanto, o mestre pode determinar que uma interrupção conte como uma falha ou até mesmo como uma falha completa no teste estendido.',
          'Normalmente pode-se fazer novas tentativas de testes estendidos. Entretanto, da mesma forma que com testes normais, alguns testes estendidos têm consequências que devem ser levadas em conta. Por exemplo, uma armadilha que exige um teste estendido de Ladinagem pode disparar em caso de falha.',
        ],
      },
    ],
  },
];
