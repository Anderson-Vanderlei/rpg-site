/* ============================================================
   TORMENTA 20 — regras_combate.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 5: Regras do Jogo, seção "Combate", pp. 230–239.

   Estrutura em ÁRVORE (31/ago) — mesmo padrão de regras_testes.js e
   regras_habilidades_efeitos.js: "Categoria > Subcategoria > Item >
   Descrição" (ex.: "Ações > Ação de Movimento > Levantar-se >
   Descrição"). Tipos de Dano, Manobras de Combate e cada tipo de ação
   (Padrão/Movimento/Completa/Livre) viram itens nomeados próprios, com
   `id` estável — mesmo motivo das outras duas páginas: são o vocabulário
   compartilhado citado o tempo todo em poderes/magias/criaturas, e a
   base natural pra uma futura ficha interativa (ex.: um botão "Levantar-
   se" na ficha que só precisa ler a descrição daqui).
============================================================ */

window.REGRAS_COMBATE_ARVORE = [
  {
    id: 'estatisticas-combate-cat', titulo: 'Estatísticas de Combate', icone: 'ti-sword',
    paragrafos: [
      'Embora seja possível superar obstáculos e vencer inimigos de muitas formas, às vezes os heróis ficam sem escolha além de sacar suas armas, preparar suas magias e partir para a batalha. A seguir estão as explicações das estatísticas usadas em combate.',
    ],
    itens: [
      {
        id: 'teste-ataque', nome: 'Teste de Ataque',
        descricao: [
          'Este é um tipo específico de teste de perícia, para acertar um alvo com um ataque. Normalmente é um teste de Luta, para um ataque corpo a corpo, ou de Pontaria, para um ataque à distância.',
          'A dificuldade do teste é a Defesa do alvo. Se o resultado é igual ou maior que a Defesa do alvo, você acerta e causa dano. Um teste de ataque pode sofrer modificadores por habilidades, arma e condições.',
        ],
      },
      {
        id: 'dano', nome: 'Dano',
        formula: 'Dano com Arma Corpo a Corpo ou de Arremesso = Dano da Arma + Força do Atacante\nDano com Arma de Disparo = Dano da Arma',
        descricao: [
          'Quando você acerta um ataque, causa dano. Esse dano reduz os pontos de vida do inimigo (veja "Ferimentos & Morte").',
          'Você rola dados para descobrir quanto causou. O tipo de dado depende da arma ou ataque utilizado — por exemplo, 1d4 para uma adaga ou 1d8 para uma espada longa. O dano de cada arma é descrito no Capítulo 3: Equipamento. Para ataques corpo a corpo ou com armas de arremesso, você soma sua Força na rolagem de dano.',
          'Assim, um personagem com Força 3 usando uma espada longa causa 1d8+3 pontos de dano (1d8 da espada longa mais 3 da Força).',
        ],
      },
      {
        id: 'tipos-dano', titulo: 'Tipos de Dano',
        paragrafos: [
          'Cada arma ou efeito que causa dano possui um tipo. Por si só, o tipo de dano não possui efeito em regras. Contudo, indica a relação do dano com outros efeitos. Por exemplo, uma criatura com redução de dano de corte 5 reduz todo dano de corte que sofre em 5.',
        ],
        itens: [
          { id: 'dano-acido', nome: 'Ácido', descricao: ['Certos monstros e perigos naturais, além de itens alquímicos, causam dano deste tipo. Ácido é ligado ao elemento terra.'] },
          { id: 'dano-corte', nome: 'Corte', descricao: ['Armas afiadas, como espadas, machados e as garras de um monstro, causam dano de corte.'] },
          { id: 'dano-eletricidade', nome: 'Eletricidade', descricao: ['Algumas magias e perigos naturais, como um relâmpago, causam dano deste tipo. Eletricidade é ligada ao elemento ar.'] },
          { id: 'dano-essencia', nome: 'Essência', descricao: ['Energia mágica pura, canalizada por magias como Seta Infalível de Talude.'] },
          { id: 'dano-fogo', nome: 'Fogo', descricao: ['Causado por calor e chamas naturais e mágicas. Fogo é ligado ao elemento fogo.'] },
          { id: 'dano-frio', nome: 'Frio', descricao: ['Algumas magias, além de clima severo, causam dano de frio. Ligado ao elemento água.'] },
          { id: 'dano-impacto', nome: 'Impacto', descricao: ['Causado por armas de contusão, como clavas e maças, além de ondas de choque, explosões, ataques sônicos e quedas.'] },
          { id: 'dano-luz', nome: 'Luz', descricao: ['Magias e outros efeitos provenientes de divindades bondosas causam dano de luz.'] },
          { id: 'dano-perfuracao', nome: 'Perfuração', descricao: ['Armas pontudas, como lanças, e mordidas de monstros causam dano de perfuração.'] },
          { id: 'dano-psiquico', nome: 'Psíquico', descricao: ['Ataques mentais e magias que afetam a mente da vítima causam dano deste tipo.'] },
          { id: 'dano-trevas', nome: 'Trevas', descricao: ['Causado por efeitos de necromancia e ligados a divindades malignas.'] },
        ],
      },
      {
        id: 'acertos-criticos', nome: 'Acertos Críticos',
        descricao: [
          'Um acerto crítico é um ataque especialmente certeiro, que atinge pontos vitais ou vulneráveis.',
          'A tabela de armas do Capítulo 3: Equipamento possui uma coluna "Crítico". Cada arma tem uma margem de ameaça (que pode ser 18, 19 ou 20) e um multiplicador (que pode ser x2, x3 ou x4). Quando nenhuma margem aparece, será 20. Quando nenhum multiplicador aparece, será x2.',
          'Você faz um acerto crítico quando acerta um ataque rolando um valor igual ou maior que a margem de ameaça da arma. Neste caso, multiplica os dados de dano do ataque (incluindo quaisquer aumentos por passos) pelo multiplicador da arma. Bônus numéricos de dano, assim como dados extras (como pela habilidade Ataque Furtivo) não são multiplicados.',
          'Certas criaturas são imunes a acertos críticos. Um alvo imune a acertos críticos ainda sofre o dano de um ataque normal.',
        ],
      },
    ],
  },
  {
    id: 'iniciativa-rodada-cat', titulo: 'Iniciativa & Rodada de Combate', icone: 'ti-clock-play',
    itens: [
      {
        id: 'iniciativa', nome: 'Iniciativa',
        descricao: [
          'A cada rodada, todo personagem tem um turno — sua vez de agir. A Iniciativa determina a ordem dos turnos dentro da rodada.',
          '<strong>Teste de Iniciativa.</strong> No início do combate, cada jogador faz um teste de Iniciativa para seu personagem. O mestre faz um único teste para os inimigos (caso haja inimigos com valor de Iniciativa diferentes, o mestre usa o menor valor). Aqueles com os resultados mais altos agem primeiro.',
          'No caso de empates, o personagem com o maior valor de perícia age primeiro. Se o empate persistir, eles fazem um novo teste de Iniciativa entre si, para decidir quem age primeiro. Não é preciso fazer novos testes de Iniciativa a cada rodada; a ordem se mantém durante todo o combate.',
          '<strong>Entrando na Batalha.</strong> Se um personagem entra na batalha depois que ela começou, faz um teste de Iniciativa e age quando seu turno chegar, na rodada seguinte.',
          '<strong>Surpresa.</strong> Quando o combate começa, se você não percebeu seus inimigos, está surpreendido. Se você está ciente de seus inimigos, mas eles não estão cientes de você, eles é que estão surpreendidos. Caso os dois lados tenham se percebido, ninguém está surpreendido. E se nenhum lado percebe o outro... bem, nenhum combate acontece!',
          '<strong>Percebendo os Inimigos.</strong> O mestre diz quem está ciente de seus inimigos no começo do combate. Em geral, ele diz aos jogadores para fazerem testes de Percepção contra uma dificuldade ou opostos pelo teste de Furtividade dos inimigos (caso estes estejam sendo cautelosos). Um personagem que nunca fica surpreendido (por exemplo, se tiver a habilidade Esquiva Sobrenatural) pode rolar a Iniciativa e agir mesmo que falhe em seu teste de Percepção.',
        ],
      },
      {
        id: 'como-funciona-combate', nome: 'Como Funciona o Combate?',
        descricao: [
          'O combate acontece em uma série de rodadas. Uma rodada é o tempo necessário para que todos os personagens no combate tenham seu turno. Um turno é o tempo que cada personagem tem para agir. Um combate obedece aos seguintes passos.',
        ],
        lista: [
          'Passo 1. Cada personagem faz um teste de Iniciativa. O mestre faz um único teste para os inimigos.',
          'Passo 2. O mestre diz quais personagens estão cientes de seus inimigos. Aqueles que não percebem a presença de inimigos começam o combate surpreendidos. Um personagem surpreendido fica desprevenido e não age na primeira rodada.',
          'Passo 3. Todos os personagens têm seu turno na ordem da Iniciativa (exceto aqueles surpreendidos, que não agem na primeira rodada).',
          'Passo 4. Quando todos os personagens tiverem seu turno, a rodada termina. Uma outra rodada se inicia, com todos os personagens agindo novamente, na mesma ordem. Mesmo aqueles que estavam surpreendidos agora podem agir.',
        ],
      },
      {
        id: 'rodada-combate', nome: 'A Rodada de Combate',
        descricao: [
          'Uma rodada representa cerca de seis segundos no mundo de jogo. Durante a rodada, cada jogador (incluindo o mestre) tem o seu turno, a sua vez de realizar ações.',
          'Pense em "rodada" como se fosse uma medida de tempo, como "mês": o mês representa os dias marcados no calendário, mas também determina o tempo entre um dia e o mesmo dia no mês seguinte.',
          'Assim, a rodada começa no turno do primeiro personagem (aquele que teve Iniciativa mais alta) e termina após o turno do último (aquele com Iniciativa mais baixa). Mas a rodada também é o tempo entre uma Iniciativa e a mesma Iniciativa na rodada seguinte. Efeitos que duram certo número de rodadas terminam imediatamente antes do mesmo resultado de Iniciativa quando se iniciaram, após o número apropriado de rodadas.',
        ],
      },
    ],
  },
  {
    id: 'acoes-cat', titulo: 'Ações', icone: 'ti-player-play',
    paragrafos: [
      'No seu turno, você pode fazer uma ação padrão e uma ação de movimento, em qualquer ordem. Você pode trocar sua ação padrão por uma ação de movimento, para fazer duas ações de movimento, mas não pode fazer o inverso. Você também pode abrir mão das duas ações (tanto a padrão quanto a de movimento) para fazer uma ação completa.',
      'Portanto, em um turno você pode fazer: uma ação padrão e uma ação de movimento; ou duas ações de movimento; ou uma ação completa. Você também pode executar qualquer quantidade de ações livres e reações.',
    ],
    itens: [
      {
        id: 'acao-padrao-cat', titulo: 'Ação Padrão',
        paragrafos: ['Sua ação padrão normalmente representa a coisa mais importante que você vai fazer em seu turno. Fazer um ataque ou lançar uma magia são as ações padrão mais comuns.'],
        itens: [
          { id: 'agredir', nome: 'Agredir', descricao: [
              'Você faz um ataque com uma arma corpo a corpo ou à distância. Com uma arma corpo a corpo, você pode atacar qualquer inimigo dentro de seu alcance natural (1,5m para criaturas Pequenas e Médias ou um inimigo adjacente no mapa). Personagens maiores, ou usando certas armas, podem atacar mais longe. Você pode substituir um ataque corpo a corpo por uma manobra de combate.',
              'Com uma arma de ataque à distância, você pode atacar qualquer inimigo que consiga ver e que esteja no alcance da arma (ou até o dobro do alcance, sofrendo uma penalidade de –5). <strong>Atirando em Combate Corpo a Corpo:</strong> quando faz um ataque à distância contra uma criatura em combate corpo a corpo, você sofre –5 no teste de ataque. Uma criatura está em combate corpo a corpo se estiver dentro do alcance natural de qualquer inimigo (incluindo você).',
            ] },
          { id: 'atropelar-acao', nome: 'Atropelar', descricao: ['Você usa sua ação padrão durante um movimento para avançar pelo espaço ocupado por uma criatura (normalmente, você não pode fazer uma ação padrão durante um movimento; isto é uma exceção). A criatura pode lhe dar passagem ou resistir. Se der passagem, você avança pelo espaço dela; nenhum teste é necessário. Se resistir, faça um teste de manobra oposto; se você vencer, deixa a criatura caída e continua seu avanço. Se o alvo vencer, você continua de pé e detém seu avanço. Atropelar é uma ação livre se tentada durante uma investida.'] },
          { id: 'fintar', nome: 'Fintar', descricao: ['Faça um teste de Enganação oposto ao teste de Reflexos de uma criatura em alcance curto. Se passar, ela fica desprevenida contra seu próximo ataque, mas apenas até o fim de seu próximo turno.'] },
          { id: 'lancar-magia-padrao', nome: 'Lançar uma Magia', descricao: ['A maioria das magias exige uma ação padrão para ser executada.'] },
          { id: 'preparar', nome: 'Preparar', descricao: ['Você prepara uma ação (padrão, de movimento ou livre) para realizar mais tarde, após seu turno, mas antes de seu turno na próxima rodada. Diga a ação que vai fazer e em quais circunstâncias (por exemplo, "disparar minha besta contra a primeira criatura que passar pela porta"). A qualquer momento antes de seu próximo turno, você pode fazer a ação preparada como uma reação a essas circunstâncias. Se, no seu próximo turno, você ainda não tiver realizado sua ação preparada, não pode mais realizá-la (embora possa preparar a mesma ação de novo). Pelo resto do combate, sua Iniciativa fica imediatamente acima daquela na qual você fez a ação preparada.'] },
          { id: 'usar-habilidade-item', nome: 'Usar Habilidade ou Item', descricao: ['Algumas habilidades e itens, como poções, exigem uma ação padrão para serem usados.'] },
        ],
      },
      {
        id: 'acao-movimento-cat', titulo: 'Ação de Movimento',
        paragrafos: ['Uma ação de movimento serve para mudar algo de posição — seja você, seja um item.'],
        itens: [
          { id: 'levantar-se', nome: 'Levantar-se', descricao: ['Levantar do chão (ou de uma cama, cadeira...) exige uma ação de movimento.'] },
          { id: 'manipular-item', nome: 'Manipular Item', descricao: ['Muitas vezes, manipular um item exige uma ação de movimento. Pegar um objeto de sua mochila, abrir ou fechar uma porta e atirar uma corda para alguém são ações de movimento.'] },
          { id: 'mirar', nome: 'Mirar', descricao: ['Você mira em um alvo que possa ver, dentro do alcance de sua arma. Isso anula a penalidade de –5 em testes de Pontaria realizados neste turno contra aquele alvo caso ele esteja engajado em combate corpo a corpo.'] },
          { id: 'movimentar-se', nome: 'Movimentar-se', descricao: ['Você percorre uma distância igual a seu deslocamento (tipicamente 9m para raças de tamanho Médio). Outros movimentos, como nadar, escalar ou cavalgar, também usam esta ação.'] },
          { id: 'sacar-guardar-item', nome: 'Sacar ou Guardar Item', descricao: ['Sacar ou guardar um item exige uma ação de movimento. Se puder usar mais de uma arma (como por possuir Ambidestria), pode sacar todas elas.'] },
        ],
      },
      {
        id: 'acao-completa-cat', titulo: 'Ação Completa',
        paragrafos: ['Ações completas exigem muito tempo e esforço, e substituem tanto a ação padrão quanto a de movimento do turno.'],
        itens: [
          { id: 'corrida', nome: 'Corrida', descricao: ['Você corre mais rapidamente que seu deslocamento normal. Veja a perícia Atletismo.'] },
          { id: 'golpe-misericordia', nome: 'Golpe de Misericórdia', descricao: ['Você desfere um golpe letal em um oponente adjacente e indefeso. Um golpe de misericórdia é um acerto crítico automático. Além de sofrer dano, a vítima tem uma chance de morrer instantaneamente. Esta chance é de 25% (1 em 1d4) para personagens e NPCs importantes e de 75% (1 a 3 em 1d4) para NPCs secundários.'] },
          { id: 'investida', nome: 'Investida', descricao: ['Você avança até o dobro de seu deslocamento (e no mínimo 3m) em linha reta e, no fim do movimento, faz um ataque corpo a corpo. Você recebe +2 no teste de ataque, mas sofre –2 na Defesa até seu próximo turno, porque sua guarda fica aberta. Você não pode fazer uma investida em terreno difícil. Durante uma investida, você pode fazer uma manobra atropelar como uma ação livre (mas não pode atropelar e atacar o mesmo alvo).'] },
          { id: 'lancar-magia-completa', nome: 'Lançar uma Magia (execução longa)', descricao: ['Ao lançar magias com execução maior do que uma ação completa, você gasta uma ação completa a cada rodada.'] },
        ],
      },
      {
        id: 'acao-livre-cat', titulo: 'Ação Livre',
        paragrafos: ['Uma ação livre demanda pouco ou nenhum tempo, esforço ou atenção. Normalmente você pode executar quantas ações livres quiser por turno, mas o mestre pode limitar ou proibir ações complexas.'],
        itens: [
          { id: 'atrasar', nome: 'Atrasar', descricao: [
              'Escolhendo atrasar sua ação, você age mais tarde na ordem de Iniciativa, em relação à Iniciativa que rolou. Quando sua nova Iniciativa chegar, você age normalmente. Você pode especificar este novo valor de Iniciativa ou apenas esperar até algum momento e então agir, fixando sua nova Iniciativa neste ponto.',
              '<strong>Limites para atrasar.</strong> Você pode atrasar sua Iniciativa até –10 menos seu valor de Iniciativa. Quando a contagem de Iniciativa chega a esse ponto, você deve agir ou abrir mão de qualquer ação na rodada.',
              '<strong>Vários atrasos.</strong> Se vários personagens estão atrasando suas ações, aquele com o maior valor de Iniciativa (ou a maior Destreza, em caso de empate) tem a vantagem.',
            ] },
          { id: 'falar', nome: 'Falar', descricao: ['Em geral, falar é uma ação livre. Lançar magias ou usar habilidades de classe que dependem da voz não são ações livres. O mestre também pode limitar aquilo que você consegue falar durante uma rodada (vinte palavras são o limite padrão).'] },
          { id: 'jogar-se-chao', nome: 'Jogar-se no Chão', descricao: ['Jogar-se no chão é uma ação livre. Você recebe os benefícios e penalidades normais por estar caído, mas normalmente não sofre dano ao se jogar no chão.'] },
          { id: 'largar-item', nome: 'Largar um Item', descricao: ['Deixar cair um item que esteja segurando é uma ação livre. Mas deixar cair (ou jogar) um item com a intenção de acertar algo é uma ação padrão. E deixar cair (ou jogar) um item que outra pessoa agarre é uma ação de movimento.'] },
        ],
      },
      {
        id: 'reacao', nome: 'Reação',
        descricao: ['Uma reação acontece em resposta a outra coisa. Como ações livres, reações tomam tão pouco tempo que você pode realizar qualquer quantidade delas. A diferença é que uma ação livre é uma escolha consciente, feita no seu turno. Já uma reação é uma resposta automática, que pode ocorrer mesmo fora do seu turno. Você pode reagir mesmo se não puder realizar ações, como por estar atordoado. Um teste de Percepção para perceber um troll escondido no pântano, ou um teste de Reflexos para escapar de uma explosão, são exemplos de reações.'],
      },
    ],
  },
  {
    id: 'manobras-combate-cat', titulo: 'Manobras de Combate', icone: 'ti-swords',
    paragrafos: [
      'Uma manobra é um ataque corpo a corpo para fazer algo diferente de causar dano — como arrancar a arma do oponente ou empurrá-lo para um abismo. Não é possível fazer manobras de combate com ataques à distância.',
      'Faça um teste de manobra (um teste de ataque corpo a corpo) oposto com a criatura. Mesmo que ela esteja usando uma arma de ataque à distância, deve fazer o teste usando seu valor de Luta. Em caso de empate, o personagem com o maior bônus vence. Se os bônus forem iguais, outro teste deve ser feito. Em geral, você pode usar qualquer arma corpo a corpo para fazer manobras de combate.',
    ],
    itens: [
      { id: 'manobra-agarrar', nome: 'Agarrar', descricao: [
          'Você segura uma criatura (por seu braço, sua roupa etc.). Uma criatura agarrada fica desprevenida e imóvel, sofre –2 nos testes de ataque e só pode atacar com armas leves. Ela pode se soltar com a ação padrão, vencendo um teste de manobra oposto. Você só pode agarrar com um ataque desarmado e, enquanto agarra, fica com essa mão ou arma natural ocupada. Além disso, move-se apenas com metade do deslocamento normal, mas arrasta a criatura que estiver agarrando.',
          'Você pode atacar a criatura agarrada com sua mão livre. Se preferir, pode substituir o ataque por um teste de agarrar contra a criatura. Ao vencer, causa dano de impacto igual a um ataque desarmado ou arma natural.',
          'Um personagem fazendo um ataque à distância envolvido em uma manobra agarrar contra um alvo tem 50% de chance de mirar no alvo errado.',
        ] },
      { id: 'manobra-derrubar', nome: 'Derrubar', descricao: ['Você deixa o alvo caído. Esta queda normalmente não causa dano. Se você vencer o teste oposto por 5 pontos ou mais, derruba o oponente com tanta força que também o empurra um quadrado em uma direção a sua escolha. Se isso for jogar além de um parapeito ou precipício, ele pode fazer teste de Reflexos (CD 20) para se agarrar numa beirada.'] },
      { id: 'manobra-desarmar', nome: 'Desarmar', descricao: ['Você derruba um item que a criatura esteja segurando. Normalmente o item cai no mesmo lugar em que o alvo está (a menos que o alvo esteja voando, sobre uma ponte etc.). Se você vencer o teste oposto por 5 pontos ou mais, derruba o item com tanta força que também o empurra um quadrado em uma direção a sua escolha.'] },
      { id: 'manobra-empurrar', nome: 'Empurrar', descricao: ['Você empurra a criatura 1,5m. Para cada 5 pontos de diferença entre os testes, você empurra o alvo mais 1,5m. Você pode gastar uma ação de movimento para avançar junto com a criatura (até o limite de seu deslocamento).'] },
      { id: 'manobra-quebrar', nome: 'Quebrar', descricao: ['Você atinge um item que a criatura esteja segurando. Veja as Estatísticas de Objetos.'] },
      { id: 'manobra-atropelar', nome: 'Atropelar (manobra)', descricao: ['Mesma manobra descrita em Ações Padrão: se a criatura resistir, faça um teste de manobra oposto; se você vencer, deixa a criatura caída e continua seu avanço. Se o alvo vencer, você continua de pé e detém seu avanço. Atropelar é uma ação livre se tentada durante uma investida.'] },
    ],
  },
  {
    id: 'ferimentos-morte-cat', titulo: 'Ferimentos & Morte', icone: 'ti-heart-broken',
    itens: [
      {
        id: 'ferimentos-morte', nome: 'Ferimentos & Morte',
        descricao: [
          'Sempre que você sofre dano — golpeado pelo tapa de um ogro, atingido por uma Bola de Fogo ou caindo em uma armadilha — subtrai este valor de seus pontos de vida. O dano pode deixar cicatrizes, amassar sua armadura e sujar sua roupa de sangue, mas não o impede de agir. Isso só muda quando seus pontos de vida chegam a 0 ou menos.',
          'Se ficar com 0 PV ou menos, você cai inconsciente e fica sangrando. No início de seu turno, faça um teste de Constituição (CD 15). Se passar, você estabiliza e não precisa mais fazer esse teste (exceto se perder mais PV). Se falhar, você perde 1d6 pontos de vida. Você deve repetir o teste a cada rodada, até estabilizar ou morrer. Um personagem sangrando pode ser estabilizado com um teste de Cura (CD 15) ou com qualquer efeito que o cure pelo menos 1 PV.',
          'Um personagem com 0 ou menos pontos de vida que recupere PV até um valor positivo (1 ou mais) por causa de uma habilidade, magia ou descanso, recobra a consciência e pode agir normalmente.',
          'Quando seus pontos de vida chegam a –10 ou a um número negativo igual à metade de seus PV totais (o que for mais baixo), você morre.',
        ],
        destaque: 'Por exemplo: Oberon, o Martelo, um arcanista com 12 PV, morre se chegar a –10 PV. Mais tarde na campanha, Oberon sobe vários níveis e chega a 30 PV. Agora, ele só morre se chegar a –15 PV.',
      },
      {
        id: 'dano-nao-letal', nome: 'Dano Não Letal',
        descricao: [
          'Dano não letal conta para determinar quando você cai inconsciente, mas não para determinar quando você começa a sangrar ou morrer. Efeitos de cura recuperam primeiro pontos de vida perdidos por dano não letal.',
          'Quase todo dano causado em condições normais (armas, armadilhas, magias...) é letal. Você pode usar uma arma para causar dano não letal (batendo com as partes não afiadas da arma, controlando a força dos golpes ou evitando pontos vitais), mas sofre uma penalidade de –5 no teste de ataque.',
          'Ataques desarmados e certas armas específicas causam dano não letal. Você pode usar esses ataques e armas para causar dano letal, mas sofre a mesma penalidade de –5 no teste de ataque.',
        ],
      },
    ],
  },
  {
    id: 'movimentacao-cat', titulo: 'Movimentação', icone: 'ti-walk',
    itens: [
      { id: 'deslocamento', nome: 'Deslocamento', descricao: ['Esta é a medida de quantos metros você pode percorrer com uma ação de movimento. O deslocamento padrão é 9m, mas algumas habilidades de raça e classe podem mudá-lo.'] },
      { id: 'atravessar-espaco-ocupado', nome: 'Atravessar um Espaço Ocupado', descricao: ['Você pode atravessar um espaço ocupado por um aliado. No entanto, não pode atravessar um espaço ocupado por um inimigo, a menos que ele esteja pelo menos três categorias de tamanho maior ou menor que você. Você também pode atravessar o espaço ocupado por um inimigo com Acrobacia ou a ação atropelar. Espaço ocupado por um inimigo conta como terreno difícil.'] },
      { id: 'carga', nome: 'Carga', descricao: ['Se você estiver sobrecarregado (veja a página 141), seu deslocamento diminui em 3m.'] },
      { id: 'diagonais', nome: 'Diagonais', descricao: ['Em um mapa, mover-se na diagonal custa o dobro. Ou seja, andar 1,5m (1 quadrado) na diagonal conta como 3m (2 quadrados).'] },
      { id: 'outros-tipos-movimento', nome: 'Outros Tipos de Movimento', descricao: ['Além de andar, você pode gastar uma ação de movimento para se mover de outras maneiras. Consulte as perícias Acrobacia e Atletismo.'] },
      { id: 'subir-mergulhar', nome: 'Subir ou Mergulhar', descricao: ['Voando ou nadando, movimentar-se na vertical custa o dobro na subida (ou o triplo em diagonais) e metade na descida (ou o normal em diagonais). Ou seja, voar 1,5m para cima conta como 3m, enquanto voar 3m para baixo conta como 1,5m.'] },
      { id: 'terreno-dificil', nome: 'Terreno Difícil', descricao: ['Lugares onde é difícil andar, como uma floresta cheia de raízes, neve profunda, ruínas com destroços ou mesmo uma rua lotada de pessoas, são terreno difícil. Mover-se em terreno difícil custa o dobro. Ou seja, você se move metade do deslocamento normal — ou gasta 3m de deslocamento por quadrado, em vez de 1,5m.'] },
    ],
  },
  {
    id: 'situacoes-especiais-cat', titulo: 'Situações Especiais', icone: 'ti-shield-half',
    itens: [
      { id: 'camuflagem', nome: 'Camuflagem', descricao: ['Você recebe camuflagem leve quando um efeito dificulta a visão dos inimigos. Pode ser escuridão leve, neblina, folhagens ou um efeito similar. Ataques contra você têm 20% de chance de falha (ao fazer um ataque, o atacante rola 1d10 junto com o d20 do teste de ataque; se o resultado desse d10 for 1 ou 2, o ataque erra, independentemente do resultado do teste de ataque). Você recebe camuflagem total quando um efeito impede a visão dos inimigos — por exemplo, em uma câmara em escuridão total. A chance de falha em camuflagem total é 50% (1 a 5 no d10).'] },
      { id: 'cobertura', nome: 'Cobertura', descricao: ['Você recebe cobertura leve quando está atrás de algo que bloqueia o ataque dos inimigos, como uma árvore, uma muralha de castelo, a lateral de uma carroça ou uma criatura maior. Cobertura leve fornece +5 na Defesa. No mapa, o atacante e o alvo escolhem, cada um, um canto do quadrado onde estão; trace uma linha reta entre os cantos — se a linha é interrompida por um obstáculo ou criatura, o alvo tem cobertura leve. Você recebe cobertura total quando seus inimigos não podem alcançá-lo — por exemplo, atrás de uma parede. Cobertura total impede que você seja atacado.'] },
      { id: 'flanquear', nome: 'Flanquear', descricao: ['Quando você luta corpo a corpo com um oponente e um aliado faz o mesmo no lado oposto — ou seja, o inimigo está entre vocês — vocês estão flanqueando o alvo. Ambos recebem +2 em seus testes de ataque contra o alvo flanqueado. Não se pode flanquear à distância ou com ataques desarmados (a menos que você possua as habilidades Briga ou Estilo Desarmado).'] },
    ],
    tabela: {
      titulo: 'Tabela 5-3: Situações Especiais',
      colunas: ['O atacante está…', 'Modificador no ataque'],
      linhas: [
        ['Caído', '–5 (apenas para corpo a corpo)'],
        ['Cego', '50% de chance de falha'],
        ['Em posição elevada', '+2'],
        ['Flanqueando o alvo', '+2 (apenas para corpo a corpo)'],
        ['Invisível', 'O alvo sofre –5 na Defesa'],
        ['Ofuscado', '–2'],
      ],
      tabela2: {
        colunas: ['O alvo está…', 'Modificador na Defesa'],
        linhas: [
          ['Caído', '–5 contra ataques corpo a corpo, +5 contra ataques à distância'],
          ['Cego', '–5'],
          ['Desprevenido', '–5'],
          ['Sob camuflagem leve', '20% de chance de falha'],
          ['Sob camuflagem total', '50% de chance de falha'],
          ['Sob cobertura leve', '+5'],
          ['Sob cobertura total', 'O alvo não pode ser atacado'],
        ],
      },
    },
  },
  {
    id: 'objetos-cat', titulo: 'Estatísticas de Objetos', icone: 'ti-box',
    itens: [
      { id: 'quebrando-objetos', nome: 'Quebrando Objetos', descricao: [
          'Tentar quebrar ou destruir um objeto — desde uma porta fechada até uma espada empunhada por um inimigo — é similar a atacar uma criatura.',
          'Para objetos soltos, faça um ataque contra a Defesa do objeto, definida por sua categoria de tamanho. Se o objeto estiver em movimento, recebe +5 na Defesa. Para um objeto segurado por outra criatura, use a manobra quebrar.',
          'Se você acerta o ataque, causa dano normal. Entretanto, objetos normalmente têm redução de dano, dependendo de seu material. Um objeto reduzido a 0 ou menos PV é destruído.',
        ] },
    ],
    tabela: {
      titulo: 'Tabela 5-4: Estatísticas de Objetos',
      colunas: ['Exemplo', 'Tamanho', 'Def', 'RD', 'PV'],
      nota: 'Pontos de vida de itens comuns. Divida por 2 para itens reduzidos, multiplique por 2 para itens aumentados e multiplique por 5 para itens gigantes.',
      grupos: [
        {
          rotulo: 'Objetos Gerais',
          linhas: [
            ['Pergaminho', 'Minúsculo', '15', '0', '1'],
            ['Corda', 'Minúsculo', '15', '0', '2'],
            ['Corrente', 'Minúsculo', '15', '10', '2'],
            ['Cadeira', 'Pequeno', '12', '5', '5'],
            ['Barril', 'Médio', '10', '5', '10'],
            ['Porta de madeira', 'Grande', '8', '5', '20'],
            ['Porta de pedra', 'Grande', '8', '8', '100'],
            ['Porta de ferro', 'Grande', '8', '10', '100'],
            ['Carroça', 'Grande', '8', '5', '50'],
            ['Casebre', 'Enorme', '5', '0', '100'],
            ['Celeiro', 'Colossal', '0', '5', '200'],
          ],
        },
        {
          rotulo: 'Armas, Armaduras e Escudos',
          linhas: [
            ['Arma leve de madeira (machadinha)', '—', '5', '2', '—'],
            ['Arma de uma mão de madeira (clava)', '—', '5', '5', '—'],
            ['Arma de duas mãos de madeira (bordão)', '—', '5', '10', '—'],
            ['Arma leve de metal (adaga)', '—', '10', '2', '—'],
            ['Arma de uma mão de metal (espada longa)', '—', '10', '5', '—'],
            ['Arma de duas mãos de metal (montante)', '—', '10', '10', '—'],
            ['Escudo leve', '—', '5', '10', '—'],
            ['Escudo pesado', '—', '10', '20', '—'],
            ['Armadura leve', '—', '5', '20', '—'],
            ['Armadura pesada', '—', '10', '40', '—'],
          ],
        },
      ],
    },
  },
];
