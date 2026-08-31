/* ============================================================
   TORMENTA 20 — regras_construindo_combates.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 7: Ameaças, seção "Construindo Combates", pp. 282–285.

   Mesma árvore das demais páginas de Regras Gerais (ver cabeçalho de
   js/data/regras_testes.js). Cobre como o mestre monta e equilibra um
   combate (ND, vários inimigos, papéis) e o que cada campo da ficha de
   uma criatura significa — o "por trás das ficha" de tudo que já existe
   em criaturas.js/perigos.js. Mais voltado ao mestre que às outras
   páginas de Regras Gerais, mas documenta o vocabulário (ND, papel de
   combate, tipo de criatura) citado o tempo todo no Bestiário.
============================================================ */

window.REGRAS_CONSTRUCAO_ARVORE = [
  {
    id: 'construindo-combates-cat', titulo: 'Construindo Combates', icone: 'ti-swords',
    paragrafos: [
      'A ameaça mais comum em Tormenta20 é o combate — uma cena de ação na qual os personagens enfrentam uma ou mais criaturas. Para construir um combate equilibrado — nem tão fácil a ponto de ser chato, nem tão difícil a ponto de o grupo não ter chance — você deve considerar o nível de desafio (ND) dos inimigos.',
    ],
    itens: [
      {
        id: 'nivel-desafio', nome: 'Nível de Desafio (ND)',
        descricao: [
          'O nível de desafio mede o poder da criatura e indica o nível para o qual ela é um desafio justo. Assim, uma criatura de ND 3 fornece um combate equilibrado para personagens de 3º nível. Isso significa que ela causará dano aos heróis, exigirá que eles gastem pontos de mana e talvez derrube alguns deles. Porém, ao fim do combate, ela será derrotada.',
          '<strong>Experiência dos Jogadores.</strong> Jogadores veteranos dominam fatores como posicionamento tático e uso de habilidades, e normalmente conseguem enfrentar criaturas com ND maior do que o nível de seus personagens.',
          '<strong>Composição do Grupo.</strong> O nível de desafio de uma criatura considera grupos de quatro personagens. Grupos com menos ou mais aventureiros devem enfrentar inimigos com ND menor ou maior. Além disso, grupos com personagens mais poderosos e/ou focados em combate podem lidar com inimigos com ND acima do seu nível.',
          '<strong>Ambiente e Circunstâncias.</strong> Fatores ambientais, como terreno elevado, cobertura e escuridão, podem afetar o resultado de um combate. Inimigos com ataques à distância, por exemplo, serão mais perigosos se estiverem em um local de difícil acesso. Circunstâncias afetando os personagens também podem ser determinantes. Um grupo que esteja sem seu equipamento dificilmente conseguirá enfrentar inimigos de seu ND.',
        ],
      },
      { id: 'quantidade-combates', nome: 'Quantidade de Combates', descricao: ['Um grupo consegue enfrentar um ou dois combates de seu nível de desafio antes de precisar descansar. Se você quiser uma aventura com muitas batalhas, diminua o ND de cada uma em 1 ou 2. Por outro lado, se quiser uma aventura com apenas um combate, aumente o ND dele em 1 ou 2 pontos.'] },
      {
        id: 'varios-inimigos', nome: 'Vários Inimigos',
        descricao: [
          'Para construir um combate com vários inimigos, calcule o nível de desafio do combate, que será uma função do ND de cada inimigo.',
          'Para criaturas com ND menor do que 1, o nível de desafio do combate será igual ao ND da criatura multiplicado pela quantidade delas. Assim, quatro inimigos de ND 1/4, ou dois inimigos de ND 1/2, formam um combate apropriado para um grupo de 1º nível.',
          'Para criaturas com ND igual ou maior do que 1, o nível de desafio do combate será igual ao ND da criatura +2 para cada vez que a quantidade delas dobrar. Assim, dois inimigos de ND 1 formam um combate de ND 3, quatro inimigos de ND 5 formam um combate de ND 9 e assim por diante.',
          'Para calcular a XP e rolar tesouro, continue usando o ND de cada criatura separadamente.',
        ],
      },
    ],
  },
  {
    id: 'papeis-combate-cat', titulo: 'Papéis de Combate', icone: 'ti-users-group',
    paragrafos: [
      'O papel de combate da criatura indica como ela deve ser usada pelo mestre. Existem três papéis, indicados por um ícone na ficha da criatura.',
    ],
    itens: [
      { id: 'papel-solo', nome: 'Solo', descricao: ['A criatura foi construída para enfrentar os personagens sozinha. Ela possui estatísticas equilibradas; especialmente, possui muitos pontos de vida, para garantir que o combate dure um tempo bom (por volta de 3 a 5 rodadas). Este papel é ocupado principalmente por grandes monstros e vilões.'] },
      { id: 'papel-lacaio', nome: 'Lacaio', descricao: ['A criatura foi construída para enfrentar os personagens em grandes quantidades. Por conta disso, você normalmente usará lacaios de ND menor do que o nível do grupo. Por exemplo, um grupo de 5º nível pode enfrentar um bando de lacaios de ND 1. Lacaios possuem valores de ataque e dano mais altos, para garantir que continuem sendo uma ameaça real para personagens, mesmo considerando que seu ND será menor que o deles; e menos pontos de vida, para serem derrotados mais rapidamente e não deixarem o combate excessivamente lento. Este papel é ocupado primariamente por humanoides e monstros pequenos.'] },
      { id: 'papel-especial', nome: 'Especial', descricao: ['A criatura possui diversas habilidades especiais e/ou foi feita para ser usada em situações fora de combate direto (por exemplo, pode ser usada para enganar ou roubar os personagens). Este papel é ocupado também por conjuradores ou líderes (criaturas cujas habilidades fortalecem outras, e consequentemente devem ser usadas em conjunto com lacaios). Procure analisar a ficha de uma criatura especial antes de usá-la!'] },
    ],
    destaque: 'Algumas criaturas funcionam melhor como oponentes avulsos: terão muitos pontos de vida, para resistirem aos ataques de todo o grupo por algumas rodadas (basiliscos, mantícoras e quase todos os monstros entram nesse grupo). Já criaturas feitas para serem usadas em grandes quantidades possuem poucos PV em relação aos seus valores de ataque e dano — são perigosas, mas caem rápido, para que o combate não se estenda muito (orcs, ratos gigantes e zumbis entram aqui).',
  },
  {
    id: 'campos-ficha-cat', titulo: 'Estatísticas de uma Criatura', icone: 'ti-file-description',
    paragrafos: [
      'As seções a seguir explicam o que cada campo da ficha de uma criatura significa — o mesmo vocabulário usado em toda entrada do Bestiário e de Perigos já cadastrados no site.',
    ],
    itens: [
      { id: 'nome-nd', nome: 'Nome e ND', descricao: ['O nome e o nível de desafio (ND) da criatura. O ND funciona como o nível da criatura (mas uma criatura terá sempre pelo menos 1 nível).'] },
      { id: 'tipo-tamanho', nome: 'Tipo e Tamanho', descricao: ['O tipo (e subtipo, quando houver) representa a natureza da criatura dentro do mundo. Ele determina que habilidades podem afetar a criatura. Além disso, alguns tipos fornecem habilidades específicas.'] },
      { id: 'iniciativa-percepcao', nome: 'Iniciativa e Percepção', descricao: ['Os valores de Iniciativa e Percepção da criatura, e quaisquer habilidades relacionadas a sentidos.'] },
      { id: 'defesa-resistencias', nome: 'Defesa e Resistências', descricao: ['A Defesa e os valores de Fortitude, Reflexos e Vontade da criatura, além de quaisquer habilidades especiais defensivas, como redução de dano.'] },
      { id: 'pontos-vida-ficha', nome: 'Pontos de Vida', descricao: ['O total de pontos de vida da criatura.'] },
      { id: 'deslocamento-ficha', nome: 'Deslocamento', descricao: ['A quantidade de metros que a criatura consegue percorrer com uma ação de movimento (e, entre parênteses, a quantidade de quadrados de 1,5m). O número padrão é o deslocamento terrestre da criatura. Uma criatura pode possuir outras formas de deslocamento, como voo e natação.'] },
      { id: 'pontos-mana-ficha', nome: 'Pontos de Mana', descricao: ['A quantidade de PM que a criatura possui. Caso a criatura não possua habilidades com custo em PM, esta linha não aparecerá.'] },
      { id: 'acoes-ficha', nome: 'Ações', descricao: ['Todos os ataques e habilidades que a criatura pode fazer (e, entre parênteses, a ação necessária e seu custo em PM, se houver). Habilidades sem ação exigida são passivas (estão sempre ativas). Algumas habilidades terminam com o termo "recarga" e um tipo de ação — nesse caso, sempre que usar a habilidade, a criatura precisará gastar a ação determinada para recarregá-la antes de poder usá-la novamente.'] },
      { id: 'atributos-ficha', nome: 'Atributos', descricao: ['Os valores de atributos da criatura. Algumas criaturas possuem um valor de atributo nulo (–). Nesse caso, a criatura não possui o atributo em questão e não pode usá-lo. Uma criatura com "For –" não pode exercer força física sobre o mundo; uma com "Des –" não pode se mover, e uma com "Int –" não é capaz de pensar, agindo apenas conforme uma programação prévia.'] },
      { id: 'pericias-ficha', nome: 'Perícias', descricao: ['Os valores totais das demais perícias da criatura (além de Iniciativa, Percepção, Fortitude, Reflexos e Vontade, que já apareceram). Caso a criatura não possua outras perícias, esta linha não aparecerá.'] },
      { id: 'equipamento-tesouro', nome: 'Equipamento e Tesouro', descricao: ['Itens utilizados pela criatura, se houver. Após os itens, a categoria de tesouro da criatura (veja o Capítulo 8: Recompensas). Algumas criaturas possuem recursos que podem ser extraídos de seu corpo. Extrair um recurso exige uma hora de trabalho e um teste de Sobrevivência, ou de um Ofício relacionado ao recurso, com CD 15 + ND da criatura. Em caso de falha, os recursos são estragados.'] },
    ],
  },
  {
    id: 'tipos-criatura-cat', titulo: 'Tipos de Criatura', icone: 'ti-paw',
    paragrafos: [
      'O tipo de uma criatura determina que habilidades podem afetá-la e, em alguns casos, fornece imunidades específicas.',
    ],
    itens: [
      { id: 'tipo-animais', nome: 'Animais', descricao: ['Bestas e feras irracionais (Int –5 ou –4), sem poderes mágicos.'] },
      { id: 'tipo-construtos', nome: 'Construtos', descricao: ['Objetos animados ou criaturas artificiais. Possuem visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno, não recuperam PV por descanso e efeitos de cura, e a perícia Cura não funciona com eles — mas Ofício (artesão) pode ser usada no lugar dela com os mesmos efeitos.'] },
      { id: 'tipo-espiritos', nome: 'Espíritos', descricao: ['Nativos de outros planos.'] },
      { id: 'tipo-humanoides', nome: 'Humanoides', descricao: ['Seres parecidos com os humanos: racionais e com culturas próprias. Este tipo é subdividido nas mesmas raças (humano, anão, goblin...).'] },
      { id: 'tipo-monstros', nome: 'Monstros', descricao: ['Criaturas de anatomia estranha e/ou com habilidades fantásticas.'] },
      { id: 'tipo-mortos-vivos', nome: 'Mortos-vivos', descricao: ['Cadáveres animados por energia negativa. Mortos-vivos possuem visão no escuro; imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno; sofrem dano por efeitos mágicos de cura de luz (Vontade CD do efeito reduz à metade) e recuperam PV com dano de trevas.'] },
    ],
  },
];
