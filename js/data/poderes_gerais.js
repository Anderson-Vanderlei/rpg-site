/* ============================================================
   TORMENTA 20 — poderes_gerais.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 2: Poderes Gerais, pp. 123–137
   Mesmo schema de poderes_classes.js — reaproveita renderPoderHtml()
   sem nenhuma mudança de código, só um campo novo: `categoria`.

   categoria: 'combate' | 'destino' | 'magia' | 'concedidos' | 'tormenta'
   (bate exatamente com as 5 seções que já existem no menu lateral:
   data-secao="poderes-combate" etc.)

   Só a categoria 'combate' está completa nesta primeira fase — as
   outras 4 (Destino, Magia, Concedidos, Tormenta) entram depois,
   uma de cada vez. Poderes Concedidos usa os MESMOS nomes já citados
   em deuses.js (poderesConcedidos[]) — quando essa categoria entrar,
   dá pra trocar aquelas strings soltas por link direto, sem reescrever
   deuses.js.

   ⚠️ 'arma-secundaria-grande' está com descrição PENDENTE — a extração
   automática não bateu com o nome do poder (ver conversa com o Anderson,
   14/jul). Não fabriquei texto pra não repetir o erro das raças raras.
============================================================ */

const PODERES_GERAIS = [

  // ══════════════════════ COMBATE (39, +1 pendente) ══════════════════════

  { id: 'acuidade-com-arma', nome: 'Acuidade com Arma', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Des 1',
    descricao: 'Quando usa uma arma corpo a corpo leve ou uma arma de arremesso, você pode usar sua Destreza em vez de Força nos testes de ataque e rolagens de dano.' },

  { id: 'arma-secundaria-grande', nome: 'Arma Secundária Grande', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Estilo de Duas Armas',
    descricao: 'Você pode empunhar duas armas de uma mão com o poder Estilo de Duas Armas.' },

  { id: 'arremesso-potente', nome: 'Arremesso Potente', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'For 1, Estilo de Arremesso',
    descricao: 'Quando usa uma arma de arremesso, você pode usar sua Força em vez de Destreza nos testes de ataque. Se possuir o poder Ataque Poderoso, poderá usá-lo com armas de arremesso.' },

  { id: 'arremesso-multiplo', nome: 'Arremesso Múltiplo', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Des 1, Estilo de Arremesso',
    descricao: 'Uma vez por rodada, quando faz um ataque com uma arma de arremesso, você pode gastar 1 PM para fazer um ataque adicional contra o mesmo alvo, arremessando outra arma de arremesso.' },

  { id: 'ataque-com-escudo', nome: 'Ataque com Escudo', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Estilo de Arma e Escudo',
    descricao: 'Uma vez por rodada, se estiver empunhando um escudo e fizer a ação agredir, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o escudo. Este ataque não faz você perder o bônus do escudo na Defesa.' },

  { id: 'ataque-pesado', nome: 'Ataque Pesado', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Estilo de Duas Mãos',
    descricao: 'Quando faz um ataque corpo a corpo com uma arma de duas mãos, você pode pagar 1 PM. Se acertar o ataque, além do dano você faz uma manobra derrubar ou empurrar contra o alvo como uma ação livre (use o resultado do ataque como o teste de manobra).' },

  { id: 'ataque-poderoso', nome: 'Ataque Poderoso', categoria: 'combate',
    tipo: 'ativo', custoPM: 0, prerequisito: 'For 1',
    descricao: 'Sempre que faz um ataque corpo a corpo, você pode sofrer –2 no teste de ataque para receber +5 na rolagem de dano.' },

  { id: 'ataque-preciso', nome: 'Ataque Preciso', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Estilo de Uma Arma',
    descricao: 'Se estiver empunhando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e +1 no multiplicador de crítico com ela.' },

  { id: 'bloqueio-com-escudo', nome: 'Bloqueio com Escudo', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Estilo de Arma e Escudo',
    descricao: 'Quando sofre dano, você pode gastar 1 PM para receber redução de dano igual ao bônus na Defesa que seu escudo fornece contra este dano. Você só pode usar este poder se estiver usando um escudo.' },

  { id: 'carga-de-cavalaria', nome: 'Carga de Cavalaria', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Ginete',
    descricao: 'Quando faz uma investida montada, você causa +2d8 pontos de dano. Além disso, pode continuar se movendo depois do ataque — deve se mover em linha reta, e seu movimento máximo ainda é o dobro do seu deslocamento.' },

  { id: 'combate-defensivo', nome: 'Combate Defensivo', categoria: 'combate',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Int 1',
    descricao: 'Quando usa a ação agredir, você pode usar este poder. Se fizer isso, até seu próximo turno, sofre –2 em todos os testes de ataque, mas recebe +5 na Defesa.' },

  { id: 'derrubar-aprimorado', nome: 'Derrubar Aprimorado', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Combate Defensivo',
    descricao: 'Você recebe +2 em testes de ataque para derrubar. Quando derruba uma criatura com essa manobra, pode gastar 1 PM para fazer um ataque extra contra ela.' },

  { id: 'desarmar-aprimorado', nome: 'Desarmar Aprimorado', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Combate Defensivo',
    descricao: 'Você recebe +2 em testes de ataque para desarmar. Quando desarma uma criatura, pode gastar 1 PM para arremessar a arma dela para longe — role 1d8 para a direção e 1d6 para a distância (em quadrados de 1,5m a partir da criatura desarmada).' },

  { id: 'disparo-preciso', nome: 'Disparo Preciso', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Estilo de Disparo ou Estilo de Arremesso',
    descricao: 'Você pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque.' },

  { id: 'disparo-rapido', nome: 'Disparo Rápido', categoria: 'combate',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Des 1, Estilo de Disparo',
    descricao: 'Se estiver empunhando uma arma de disparo que possa recarregar como ação livre e gastar uma ação completa para agredir, pode fazer um ataque adicional com ela. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno.' },

  { id: 'empunhadura-poderosa', nome: 'Empunhadura Poderosa', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'For 3',
    descricao: 'Ao usar uma arma feita para uma categoria de tamanho maior que a sua, a penalidade que você sofre nos testes de ataque diminui para –2 (normalmente, usar uma arma de uma categoria de tamanho maior impõe –5 nos testes de ataque).' },

  { id: 'encouracado', nome: 'Encouraçado', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'proficiência com armaduras pesadas',
    descricao: 'Se estiver usando uma armadura pesada, você recebe +2 na Defesa. Esse bônus aumenta em +2 para cada outro poder que você possua que tenha Encouraçado como pré-requisito.' },

  { id: 'esquiva', nome: 'Esquiva', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Des 1',
    descricao: 'Você recebe +2 na Defesa e Reflexos.' },

  { id: 'estilo-de-arma-e-escudo', nome: 'Estilo de Arma e Escudo', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Luta, proficiência com escudos',
    descricao: 'Se você estiver usando um escudo, o bônus na Defesa que ele fornece aumenta em +2.' },

  { id: 'estilo-de-arma-longa', nome: 'Estilo de Arma Longa', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'For 1, treinado em Luta',
    descricao: 'Você recebe +2 em testes de ataque com armas alongadas e pode atacar alvos adjacentes com essas armas.' },

  { id: 'estilo-de-arremesso', nome: 'Estilo de Arremesso', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Pontaria',
    descricao: 'Você pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas. Se também possuir o poder Saque Rápido, também recebe +2 nos testes de ataque com essas armas.' },

  { id: 'estilo-de-disparo', nome: 'Estilo de Disparo', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Pontaria',
    descricao: 'Se estiver usando uma arma de disparo, você soma sua Destreza nas rolagens de dano.' },

  { id: 'estilo-de-duas-armas', nome: 'Estilo de Duas Armas', categoria: 'combate',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Des 2, treinado em Luta',
    descricao: 'Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno. Se possuir Ambidestria, não sofre essa penalidade.' },

  { id: 'estilo-de-duas-maos', nome: 'Estilo de Duas Mãos', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'For 2, treinado em Luta',
    descricao: 'Se estiver usando uma arma corpo a corpo com as duas mãos, você recebe +5 nas rolagens de dano. Este poder não pode ser usado com armas leves.' },

  { id: 'estilo-de-uma-arma', nome: 'Estilo de Uma Arma', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Luta',
    descricao: 'Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma (exceto ataques desarmados).' },

  { id: 'estilo-desarmado', nome: 'Estilo Desarmado', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Luta',
    descricao: 'Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal, sem penalidades.' },

  { id: 'fanatico', nome: 'Fanático', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: '12º nível de personagem, Encouraçado',
    descricao: 'Seu deslocamento não é reduzido por usar armaduras pesadas.' },

  { id: 'finta-aprimorada', nome: 'Finta Aprimorada', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Enganação',
    descricao: 'Você recebe +2 em testes de Enganação para fintar e pode fintar como uma ação de movimento.' },

  { id: 'foco-em-arma', nome: 'Foco em Arma', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'proficiência com a arma',
    descricao: 'Escolha uma arma. Você recebe +2 em testes de ataque com essa arma. Você pode escolher este poder outras vezes para armas diferentes.' },

  { id: 'ginete', nome: 'Ginete', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Cavalgar',
    descricao: 'Você passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano. Além disso, não sofre penalidades para atacar à distância ou lançar magias quando montado.' },

  { id: 'inexpugnavel', nome: 'Inexpugnável', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Encouraçado, 6º nível de personagem',
    descricao: 'Se estiver usando uma armadura pesada, você recebe +2 em todos os testes de resistência.' },

  { id: 'mira-apurada', nome: 'Mira Apurada', categoria: 'combate',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Sab 1, Disparo Preciso',
    descricao: 'Quando usa a ação mirar, você recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno.' },

  { id: 'piqueiro', nome: 'Piqueiro', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Estilo de Arma Longa',
    descricao: 'Uma vez por rodada, se estiver empunhando uma arma alongada e um inimigo entrar voluntariamente em seu alcance corpo a corpo, você pode gastar 1 PM para fazer um ataque corpo a corpo contra este oponente. Se o oponente tiver se aproximado fazendo uma investida, seu ataque causa dois dados de dano extra do mesmo tipo.' },

  { id: 'presenca-aterradora', nome: 'Presença Aterradora', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'treinado em Intimidação',
    descricao: 'Você pode gastar uma ação padrão e 1 PM para assustar todas as criaturas a sua escolha em alcance curto (veja a perícia Intimidação para as regras de assustar).' },

  { id: 'proficiencia', nome: 'Proficiência', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, também pode escolher armas exóticas). Você recebe essa proficiência. Pode escolher este poder outras vezes para proficiências diferentes.' },

  { id: 'quebrar-aprimorado', nome: 'Quebrar Aprimorado', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Ataque Poderoso',
    descricao: 'Você recebe +2 em testes de ataque para quebrar. Quando reduz os PV de uma arma para 0 ou menos, pode gastar 1 PM para realizar um ataque extra contra o usuário dela (mesmos valores de ataque e dano, dados rolados novamente).' },

  { id: 'reflexos-de-combate', nome: 'Reflexos de Combate', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Des 1',
    descricao: 'Você ganha uma ação de movimento extra no seu primeiro turno de cada combate.' },

  { id: 'saque-rapido', nome: 'Saque Rápido', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Iniciativa',
    descricao: 'Você recebe +2 em Iniciativa e pode sacar ou guardar itens como uma ação livre (em vez de ação de movimento). Além disso, a ação para recarregar armas de disparo diminui em uma categoria (completa→padrão, padrão→movimento, movimento→livre).' },

  { id: 'trespassar', nome: 'Trespassar', categoria: 'combate',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Ataque Poderoso',
    descricao: 'Quando você faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode gastar 1 PM para fazer um ataque adicional contra outra criatura dentro do seu alcance.' },

  { id: 'vitalidade', nome: 'Vitalidade', categoria: 'combate',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Con 1',
    descricao: 'Você recebe +1 PV por nível de personagem e +2 em Fortitude.' },

  // ══════════════════════ DESTINO (20) ══════════════════════

  { id: 'acrobatico', nome: 'Acrobático', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Des 2',
    descricao: 'Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas.' },

  { id: 'ao-sabor-do-destino', nome: 'Ao Sabor do Destino', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: '6º nível de personagem',
    descricao: 'Confiando em suas próprias habilidades (ou em sua própria sorte), você abre mão de usar itens mágicos. Em troca, recebe os bônus crescentes da tabela abaixo (sempre em perícia/atributo diferente a cada vez, não cumulativo). Se usar voluntariamente qualquer item mágico (exceto poções), perde o benefício até o fim da aventura. Ainda pode lançar magias, receber magias benéficas ou se beneficiar de itens usados por outros.',
    tabela: {
      colunas: ['Nível', 'Benefício'],
      linhas: [
        ['6º', '+2 em uma perícia'],
        ['7º', '+1 na Defesa'],
        ['8º', '+1 nas rolagens de dano'],
        ['9º', '+1 em um atributo'],
        ['11º', '+2 em uma perícia'],
        ['12º', '+2 na Defesa'],
        ['13º', '+2 nas rolagens de dano'],
        ['14º', '+1 em um atributo'],
        ['16º', '+2 em uma perícia'],
        ['17º', '+3 na Defesa'],
        ['18º', '+3 nas rolagens de dano'],
        ['19º', '+1 em um atributo'],
      ],
    } },

  { id: 'aparencia-inofensiva', nome: 'Aparência Inofensiva', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Car 1',
    descricao: 'A primeira criatura inteligente (Int –3 ou maior) que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perde a ação. Este poder só funciona uma vez por cena; a criatura pode atacá-lo normalmente nas rodadas seguintes, independentemente do resultado do teste.' },

  { id: 'atletico', nome: 'Atlético', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'For 2',
    descricao: 'Você recebe +2 em Atletismo e +3m em seu deslocamento.' },

  { id: 'atraente', nome: 'Atraente', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Car 1',
    descricao: 'Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por você.' },

  { id: 'comandar', nome: 'Comandar', categoria: 'destino',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Car 1',
    descricao: 'Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena.' },

  { id: 'costas-largas', nome: 'Costas Largas', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Con 1, For 1',
    descricao: 'Seu limite de carga aumenta em 5 espaços e você pode se beneficiar de um item vestido adicional.' },

  { id: 'foco-em-pericia', nome: 'Foco em Perícia', categoria: 'destino',
    tipo: 'ativo', custoPM: 1, prerequisito: 'treinado na perícia escolhida',
    descricao: 'Escolha uma perícia. Quando faz um teste dessa perícia, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado. Você pode escolher este poder outras vezes para perícias diferentes. Não pode ser aplicado em Luta e Pontaria (mas veja Foco em Arma).' },

  { id: 'inventario-organizado', nome: 'Inventário Organizado', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Int 1',
    descricao: 'Você soma sua Inteligência no limite de espaços que pode carregar. Itens muito leves ou pequenos, que normalmente ocupam meio espaço, passam a ocupar 1/4 de espaço.' },

  { id: 'investigador', nome: 'Investigador', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Int 1',
    descricao: 'Você recebe +2 em Investigação e soma sua Inteligência em Intuição.' },

  { id: 'lobo-solitario', nome: 'Lobo Solitário', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo.' },

  { id: 'medicina', nome: 'Medicina', categoria: 'destino',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Sab 1, treinado em Cura',
    descricao: 'Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se passar, ela recupera 1d6 PV, mais 1d6 para cada 5 pontos pelos quais o resultado exceder a CD (2d6 com resultado 20, 3d6 com 25, e assim por diante). Só pode usar este poder uma vez por dia numa mesma criatura.' },

  { id: 'parceiro', nome: 'Parceiro', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Adestramento (parceiro animal) ou Diplomacia (parceiro humanoide), 5º nível de personagem',
    descricao: 'Você possui um parceiro animal ou humanoide que o acompanha em aventuras — escolha nome, aparência e personalidade dele. Em termos de jogo, é um parceiro iniciante de um tipo a sua escolha. Ele obedece suas ordens e se arrisca para ajudá-lo, mas pode parar de segui-lo se for maltratado (a critério do mestre). Se perder seu parceiro, recebe outro no início da próxima aventura.' },

  { id: 'sentidos-agucados', nome: 'Sentidos Aguçados', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Sab 1, treinado em Percepção',
    descricao: 'Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha.' },

  { id: 'sortudo', nome: 'Sortudo', categoria: 'destino',
    tipo: 'ativo', custoPM: 3, prerequisito: null,
    descricao: 'Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente.' },

  { id: 'surto-heroico', nome: 'Surto Heroico', categoria: 'destino',
    tipo: 'ativo', custoPM: 5, prerequisito: null,
    descricao: 'Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional.' },

  { id: 'torcida', nome: 'Torcida', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Car 1',
    descricao: 'Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por "torcida" qualquer número de criaturas inteligentes em alcance médio que não estejam fazendo nada além de torcer por você.' },

  { id: 'treinamento-em-pericia', nome: 'Treinamento em Perícia', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você se torna treinado em uma perícia a sua escolha. Você pode escolher este poder outras vezes para perícias diferentes.' },

  { id: 'veneficio', nome: 'Venefício', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'treinado em Ofício (alquimista)',
    descricao: 'Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2.' },

  { id: 'vontade-de-ferro', nome: 'Vontade de Ferro', categoria: 'destino',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Sab 1',
    descricao: 'Você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade.' },

  // ══════════════════════ MAGIA (8) ══════════════════════
  // Todos os poderes deste grupo têm como pré-requisito base "lançar magias"
  // (ter a habilidade de classe Magias), além do que estiver listado.

  { id: 'celebrar-ritual', nome: 'Celebrar Ritual', categoria: 'magia',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Lançar magias, treinado em Misticismo ou Religião, 8º nível de personagem',
    descricao: 'Você pode lançar magias como rituais. Isso dobra seu limite de PM na magia, mas muda a execução para 1 hora (ou o dobro, o que for maior) e exige um gasto de T$ 10 por PM gasto (em incensos, oferendas...) — um arcanista de 8º nível pode lançar uma magia de 16 PM gastando T$ 160. Magias lançadas como rituais não podem ser armazenadas em itens.' },

  { id: 'escrever-pergaminho', nome: 'Escrever Pergaminho', categoria: 'magia',
    tipo: 'passivo', custoPM: 0, prerequisito: 'habilidade de classe Magias, treinado em Ofício (escriba)',
    descricao: 'Você pode usar a perícia Ofício (escriba) para fabricar pergaminhos com magias que conheça, seguindo a regra geral de fabricar itens. Conforme o mestre, você pode usar objetos similares, como runas ou tabuletas de argila.' },

  { id: 'foco-em-magia', nome: 'Foco em Magia', categoria: 'magia',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Lançar magias',
    descricao: 'Escolha uma magia que possa lançar. Seu custo diminui em –1 PM (cumulativo com outras reduções de custo). Você pode escolher este poder outras vezes para magias diferentes.' },

  { id: 'magia-acelerada', nome: 'Magia Acelerada', categoria: 'magia',
    tipo: 'ativo', custoPM: 4, prerequisito: 'Lançar magias de 2º círculo',
    descricao: 'Aprimoramento de magia: muda a execução da magia para ação livre. Só pode ser aplicado em magias com execução de movimento, padrão ou completa, e você só pode lançar uma magia como ação livre por rodada. Custo: +4 PM (somado ao custo da magia).' },

  { id: 'magia-ampliada', nome: 'Magia Ampliada', categoria: 'magia',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Lançar magias',
    descricao: 'Aprimoramento de magia: aumenta o alcance da magia em um passo (de curto para médio, de médio para longo) ou dobra a área de efeito. Por exemplo, uma Bola de Fogo ampliada tem alcance longo ou área de 12m de raio. Custo: +2 PM (somado ao custo da magia).' },

  { id: 'magia-discreta', nome: 'Magia Discreta', categoria: 'magia',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Lançar magias',
    descricao: 'Aprimoramento de magia: você lança a magia sem gesticular nem falar, usando apenas concentração — permite lançar com as mãos presas, amordaçado etc., e lançar magias arcanas usando armadura sem teste de Misticismo. Outros só percebem que você lançou uma magia se passarem num teste de Misticismo (CD 20). Custo: +2 PM (somado ao custo da magia).' },

  { id: 'magia-ilimitada', nome: 'Magia Ilimitada', categoria: 'magia',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Lançar magias',
    descricao: 'Você soma seu atributo-chave no limite de PM que pode gastar numa única magia. Por exemplo, um arcanista de 5º nível com Int 4 e este poder pode gastar até 9 PM em cada magia.' },

  { id: 'preparar-pocao', nome: 'Preparar Poção', categoria: 'magia',
    tipo: 'passivo', custoPM: 0, prerequisito: 'habilidade de classe Magias, treinado em Ofício (alquimista)',
    descricao: 'Você pode usar a perícia Ofício (alquimista) para fabricar poções com magias que conheça de 1º e 2º círculos, seguindo a regra geral de fabricar itens.' },

  // ══════════════════════ CONCEDIDOS (72 únicos, 20 divindades) ══════════════════════
  // Todos têm como pré-requisito ser devoto do(s) deus(es) indicado(s).
  // Atributo-chave destes poderes é Sabedoria. Nomes batem 100% com
  // poderesConcedidos[] em deuses.js — dá pra ativar o link cruzado agora.

  { id: 'afinidade-com-a-tormenta', nome: 'Afinidade com a Tormenta', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Aharadak',
    descricao: 'Você recebe +10 em testes de resistência contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak. Além disso, seu primeiro poder da Tormenta não conta para perda de Carisma.' },

  { id: 'almejar-o-impossivel', nome: 'Almejar o Impossível', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Thwor ou Valkaria',
    descricao: 'Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.' },

  { id: 'anfibio-concedido', nome: 'Anfíbio', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto do Oceano',
    descricao: 'Você pode respirar embaixo d’água e adquire deslocamento de natação igual a seu deslocamento terrestre.' },

  { id: 'apostar-com-o-trapaceiro', nome: 'Apostar com o Trapaceiro', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Hyninn',
    descricao: 'Quando faz um teste de perícia, você pode gastar 1 PM para apostar com Hyninn. Você e o mestre rolam 1d20, mas o mestre mantém o resultado dele em segredo. Você então escolhe entre usar seu próprio resultado ou o resultado oculto do mestre (que aí é revelado).' },

  { id: 'armas-da-ambicao', nome: 'Armas da Ambição', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Valkaria',
    descricao: 'Você recebe +1 em testes de ataque e na margem de ameaça com armas nas quais é proficiente.' },

  { id: 'arsenal-das-profundezas', nome: 'Arsenal das Profundezas', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto do Oceano',
    descricao: 'Você recebe +2 nas rolagens de dano com azagaias, lanças e tridentes, e seu multiplicador de crítico com essas armas aumenta em +1.' },

  { id: 'astucia-da-serpente', nome: 'Astúcia da Serpente', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Sszzaas',
    descricao: 'Você recebe +2 em Enganação, Furtividade e Intuição.' },

  { id: 'ataque-piedoso', nome: 'Ataque Piedoso', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lena ou Thyatis',
    descricao: 'Você pode usar armas corpo a corpo para causar dano não letal sem sofrer a penalidade de –5 no teste de ataque.' },

  { id: 'aura-de-medo', nome: 'Aura de Medo', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Kallyadranoch',
    descricao: 'Você pode gastar 2 PM para gerar uma aura de medo de 9m de raio e duração até o fim da cena. Todos os inimigos que entrem na aura devem fazer um teste de Vontade (CD Car) ou ficam abalados até o fim da cena. Uma criatura que passe no teste fica imune a esta habilidade por um dia.' },

  { id: 'aura-de-paz', nome: 'Aura de Paz', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Marah',
    descricao: 'Você pode gastar 2 PM para gerar uma aura de paz com 9m de raio e duração de uma cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra você deve fazer um teste de Vontade (CD Car). Se falhar, perde sua ação. Se passar, fica imune a esta habilidade por um dia.' },

  { id: 'aura-restauradora', nome: 'Aura Restauradora', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lena',
    descricao: 'Efeitos de cura usados por você e seus aliados em um raio de 9m recuperam +1 PV por dado.' },

  { id: 'bencao-do-mana', nome: 'Bênção do Mana', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Wynna',
    descricao: 'Você recebe +1 PM a cada nível ímpar.' },

  { id: 'caricia-sombria', nome: 'Carícia Sombria', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Tenebra',
    descricao: 'Você pode gastar 1 PM e uma ação padrão para cobrir sua mão com energia negativa e tocar uma criatura em alcance corpo a corpo. A criatura sofre 2d6 pontos de dano de trevas (Fortitude CD Sab reduz à metade) e você recupera PV iguais à metade do dano causado. Você pode aprender Toque Vampírico como magia divina; se fizer isso, o custo dela diminui em –1 PM.' },

  { id: 'centelha-magica', nome: 'Centelha Mágica', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Wynna',
    descricao: 'Escolha uma magia arcana ou divina de 1º círculo. Você aprende e pode lançar essa magia.' },

  { id: 'compreender-os-ermos', nome: 'Compreender os Ermos', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Allihanna',
    descricao: 'Você recebe +2 em Sobrevivência e pode usar Sabedoria para Adestramento (em vez de Carisma).' },

  { id: 'conhecimento-enciclopedico', nome: 'Conhecimento Enciclopédico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Tanna-Toh',
    descricao: 'Você se torna treinado em duas perícias baseadas em Inteligência a sua escolha.' },

  { id: 'conjurar-arma', nome: 'Conjurar Arma', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Arsenal',
    descricao: 'Você pode gastar 1 PM para invocar uma arma corpo a corpo ou de arremesso com a qual seja proficiente. A arma surge em sua mão, fornece +1 em testes de ataque e rolagens de dano, é considerada mágica e dura pela cena. Você não pode criar armas de disparo, mas pode criar 20 munições.' },

  { id: 'coragem-total', nome: 'Coragem Total', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Arsenal, Khalmyr, Lin-Wu ou Valkaria',
    descricao: 'Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros).' },

  { id: 'cura-gentil', nome: 'Cura Gentil', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lena',
    descricao: 'Você soma seu Carisma aos PV restaurados por seus efeitos mágicos de cura.' },

  { id: 'curandeira-perfeita', nome: 'Curandeira Perfeita', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lena',
    descricao: 'Você sempre pode escolher 10 em testes de Cura. Além disso, não sofre penalidade por usar essa perícia sem uma maleta de medicamentos — se possuir o item, recebe +2 no teste (ou +5, se ele for aprimorado).' },

  { id: 'dedo-verde', nome: 'Dedo Verde', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Allihanna',
    descricao: 'Você aprende e pode lançar Controlar Plantas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'descanso-natural', nome: 'Descanso Natural', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Allihanna',
    descricao: 'Para você, dormir ao relento conta como condição de descanso confortável.' },

  { id: 'dom-da-esperanca', nome: 'Dom da Esperança', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Marah',
    descricao: 'Você soma sua Sabedoria em seus PV em vez de Constituição, e se torna imune às condições alquebrado, esmorecido e frustrado.' },

  { id: 'dom-da-imortalidade', nome: 'Dom da Imortalidade', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Thyatis, paladino',
    descricao: 'Você é imortal: sempre que morre, não importando o motivo, volta à vida após 3d6 dias. Apenas paladinos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos.' },

  { id: 'dom-da-profecia', nome: 'Dom da Profecia', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Thyatis',
    descricao: 'Você pode lançar Augúrio (caso aprenda novamente essa magia, seu custo diminui em –1 PM). Você também pode gastar 2 PM para receber +2 em um teste.' },

  { id: 'dom-da-ressurreicao', nome: 'Dom da Ressurreição', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Thyatis, clérigo',
    descricao: 'Você pode gastar uma ação completa e todos os PM que possui (mínimo 1 PM) para tocar o corpo de uma criatura morta há menos de um ano e ressuscitá-la. A criatura volta à vida com 1 PV e 0 PM, e perde 1 ponto de Constituição permanentemente. Só pode ser usado uma vez em cada criatura. Apenas clérigos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos.' },

  { id: 'dom-da-verdade', nome: 'Dom da Verdade', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Khalmyr',
    descricao: 'Você pode pagar 2 PM para receber +5 em testes de Intuição, e em testes de Percepção contra Enganação e Furtividade, até o fim da cena.' },

  { id: 'escamas-draconicas', nome: 'Escamas Dracônicas', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Kallyadranoch',
    descricao: 'Você recebe +2 na Defesa e em Fortitude.' },

  { id: 'escudo-magico', nome: 'Escudo Mágico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Wynna',
    descricao: 'Quando lança uma magia, você recebe um bônus na Defesa igual ao círculo da magia lançada até o início do seu próximo turno.' },

  { id: 'espada-justiceira', nome: 'Espada Justiceira', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Khalmyr',
    descricao: 'Você pode gastar 1 PM para encantar sua espada (ou outra arma corpo a corpo de corte que esteja empunhando). Ela tem seu dano aumentado em um passo até o fim da cena.' },

  { id: 'espada-solar', nome: 'Espada Solar', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Azgher',
    descricao: 'Você pode gastar 1 PM para fazer uma arma corpo a corpo de corte que esteja empunhando causar +1d6 de dano por fogo até o fim da cena.' },

  { id: 'extase-da-loucura', nome: 'Êxtase da Loucura', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Aharadak ou Nimb',
    descricao: 'Toda vez que uma ou mais criaturas falham em um teste de Vontade contra uma de suas habilidades mágicas, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual a sua Sabedoria.' },

  { id: 'familiar-ofidico', nome: 'Familiar Ofídico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Sszzaas',
    descricao: 'Você recebe um familiar cobra que não conta em seu limite de parceiros.' },

  { id: 'farsa-do-fingidor', nome: 'Farsa do Fingidor', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Hyninn',
    descricao: 'Você aprende e pode lançar Criar Ilusão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'fe-guerreira', nome: 'Fé Guerreira', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Arsenal',
    descricao: 'Você pode usar Sabedoria para Guerra (em vez de Inteligência). Além disso, em combate, quando vai fazer um teste de perícia, pode gastar 2 PM para substituí-lo por um teste de Guerra (exceto para testes de ataque).' },

  { id: 'forma-de-macaco', nome: 'Forma de Macaco', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Hyninn',
    descricao: 'Você pode gastar uma ação completa e 2 PM para se transformar em um macaco. Adquire tamanho Minúsculo (+5 em Furtividade, –5 em testes de manobra) e deslocamento de escalar 9m. Seu equipamento desaparece (e você perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não mudam. A transformação dura indefinidamente, até você atacar, lançar uma magia ou sofrer dano.' },

  { id: 'fulgor-solar', nome: 'Fulgor Solar', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Azgher',
    descricao: 'Você recebe redução de frio e trevas 5. Além disso, quando é alvo de um ataque, pode gastar 1 PM para emitir um clarão solar que deixa o atacante ofuscado por uma rodada.' },

  { id: 'furia-divina', nome: 'Fúria Divina', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Thwor',
    descricao: 'Você pode gastar 2 PM para invocar uma fúria selvagem, tornando-se temível em combate. Até o fim da cena, recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode executar ações que exijam paciência ou concentração (como usar Furtividade ou lançar magias). Se usar este poder junto com a habilidade Fúria, ela também dura uma cena inteira.' },

  { id: 'golpista-divino', nome: 'Golpista Divino', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Hyninn',
    descricao: 'Você recebe +2 em Enganação, Jogatina e Ladinagem.' },

  { id: 'habitante-do-deserto', nome: 'Habitante do Deserto', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Azgher',
    descricao: 'Você recebe redução de fogo 10 e pode pagar 1 PM para criar água pura e potável suficiente para um odre (ou outro recipiente pequeno).' },

  { id: 'inimigo-de-tenebra', nome: 'Inimigo de Tenebra', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Azgher',
    descricao: 'Seus ataques e habilidades causam +1d6 pontos de dano contra mortos-vivos. Quando você usa um efeito que gera luz, o alcance da iluminação dobra.' },

  { id: 'kiai-divino', nome: 'Kiai Divino', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 3, prerequisito: 'Devoto de Lin-Wu',
    descricao: 'Uma vez por rodada, quando faz um ataque corpo a corpo, você pode pagar 3 PM. Se acertar o ataque, causa dano máximo, sem necessidade de rolar dados.' },

  { id: 'liberdade-divina', nome: 'Liberdade Divina', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Valkaria',
    descricao: 'Você pode gastar 2 PM para receber imunidade a efeitos de movimento por uma rodada.' },

  { id: 'manto-da-penumbra', nome: 'Manto da Penumbra', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Tenebra',
    descricao: 'Você aprende e pode lançar Escuridão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'mente-analitica', nome: 'Mente Analítica', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Tanna-Toh',
    descricao: 'Você recebe +2 em Intuição, Investigação e Vontade.' },

  { id: 'mente-vazia', nome: 'Mente Vazia', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lin-Wu',
    descricao: 'Você recebe +2 em Iniciativa, Percepção e Vontade.' },

  { id: 'mestre-dos-mares', nome: 'Mestre dos Mares', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto do Oceano',
    descricao: 'Você pode falar com animais aquáticos (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra criaturas aquáticas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'olhar-amedrontador', nome: 'Olhar Amedrontador', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Megalokk ou Thwor',
    descricao: 'Você aprende e pode lançar Amedrontar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'palavras-de-bondade', nome: 'Palavras de Bondade', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Marah',
    descricao: 'Você aprende e pode lançar Enfeitiçar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'percepcao-temporal', nome: 'Percepção Temporal', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 3, prerequisito: 'Devoto de Aharadak',
    descricao: 'Você pode gastar 3 PM para somar sua Sabedoria (limitado por seu nível, não cumulativo com efeitos que somam este atributo) a seus ataques, Defesa e testes de Reflexos até o fim da cena.' },

  { id: 'pesquisa-abencoada', nome: 'Pesquisa Abençoada', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 0, prerequisito: 'Devoto de Tanna-Toh',
    descricao: 'Se passar uma hora pesquisando seus livros e anotações, você pode rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito desde a última cena. Se tiver acesso a mais livros, recebe um bônus no teste: +2 para uma coleção particular ou biblioteca pequena, +5 para a biblioteca de um templo ou universidade.' },

  { id: 'poder-oculto', nome: 'Poder Oculto', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Nimb',
    descricao: 'Você pode gastar uma ação de movimento e 2 PM para invocar a força, a rapidez ou o vigor dos loucos. Role 1d6 para receber +2 em Força (1 ou 2), Destreza (3 ou 4) ou Constituição (5 ou 6) até o fim da cena. Pode usar este poder várias vezes, mas bônus no mesmo atributo não são cumulativos.' },

  { id: 'presas-primordiais', nome: 'Presas Primordiais', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Kallyadranoch ou Megalokk',
    descricao: 'Você pode gastar 1 PM para transformar seus dentes em presas afiadas até o fim da cena. Recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir com outra arma, pode gastar 1 PM para fazer um ataque extra com a mordida. Se já possuir outro ataque natural de mordida, o dano desse ataque aumenta em dois passos.' },

  { id: 'presas-venenosas', nome: 'Presas Venenosas', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Sszzaas',
    descricao: 'Você pode gastar uma ação de movimento e 1 PM para envenenar uma arma corpo a corpo que esteja empunhando. Em caso de acerto, a arma causa perda de 1d12 pontos de vida. A arma permanece envenenada até atingir uma criatura ou até o fim da cena, o que acontecer primeiro.' },

  { id: 'rejeicao-divina', nome: 'Rejeição Divina', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Aharadak',
    descricao: 'Você recebe resistência a magia divina +5.' },

  { id: 'reparar-injustica', nome: 'Reparar Injustiça', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Khalmyr',
    descricao: 'Uma vez por rodada, quando um oponente em alcance curto acerta um ataque em você ou em um de seus aliados, você pode gastar 2 PM para fazer este oponente repetir o ataque, escolhendo o pior entre os dois resultados.' },

  { id: 'sangue-de-ferro', nome: 'Sangue de Ferro', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 3, prerequisito: 'Devoto de Arsenal',
    descricao: 'Você pode pagar 3 PM para receber +2 em rolagens de dano e redução de dano 5 até o fim da cena.' },

  { id: 'sangue-ofidico', nome: 'Sangue Ofídico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Sszzaas',
    descricao: 'Você recebe resistência a veneno +5 e a CD para resistir aos seus venenos aumenta em +2.' },

  { id: 'servos-do-dragao', nome: 'Servos do Dragão', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Kallyadranoch',
    descricao: 'Você pode gastar uma ação completa e 2 PM para invocar 2d4+1 kobolds capangas em espaços desocupados em alcance curto. Pode gastar uma ação de movimento para fazê-los andar (deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6–1 de perfuração cada). Os kobolds têm For –1, Des 1, Defesa 12, 1 PV, e falham automaticamente em qualquer teste de resistência ou oposto. Desaparecem quando morrem ou no fim da cena, e não agem sem receber ordem.' },

  { id: 'sopro-do-mar', nome: 'Sopro do Mar', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto do Oceano',
    descricao: 'Você pode gastar uma ação padrão e 1 PM para soprar vento marinho em um cone de 6m. Criaturas na área sofrem 2d6 de dano de frio (Reflexos CD Sab reduz à metade). Você pode aprender Sopro das Uivantes como magia divina; se fizer isso, o custo dela diminui em –1 PM.' },

  { id: 'sorte-dos-loucos', nome: 'Sorte dos Loucos', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Nimb',
    descricao: 'Quando faz um teste, você pode pagar 1 PM para rolá-lo novamente (pode fazer isso mais de uma vez por teste). Se ainda assim falhar, perde 1d6 PM para cada vez que usou este poder naquele teste.' },

  { id: 'talento-artistico', nome: 'Talento Artístico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Marah',
    descricao: 'Você recebe +2 em Acrobacia, Atuação e Diplomacia.' },

  { id: 'teurgista-mistico', nome: 'Teurgista Místico', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Wynna, habilidade de classe Magias',
    descricao: 'Até uma magia de cada círculo que você aprender pode ser escolhida entre magias divinas (se for um conjurador arcano) ou entre magias arcanas (se for um conjurador divino).' },

  { id: 'tradicao-de-lin-wu', nome: 'Tradição de Lin-Wu', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Lin-Wu',
    descricao: 'Você considera a katana uma arma simples e, se for proficiente em armas marciais, recebe +1 na margem de ameaça com ela.' },

  { id: 'transmissao-da-loucura', nome: 'Transmissão da Loucura', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Nimb',
    descricao: 'Você pode lançar Sussurros Insanos (CD Car). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'tropas-duyshidakk', nome: 'Tropas Duyshidakk', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 2, prerequisito: 'Devoto de Thwor',
    descricao: 'Você pode gastar uma ação completa e 2 PM para invocar 1d4+1 goblinoides capangas em espaços desocupados em alcance curto. Pode gastar uma ação de movimento para fazê-los andar (deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6+1 de corte cada). Os goblinoides têm For 1, Des 1, Defesa 15, 1 PV, e falham automaticamente em qualquer teste de resistência ou oposto. Desaparecem quando morrem ou no fim da cena, e não agem sem receber ordem.' },

  { id: 'urro-divino', nome: 'Urro Divino', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 1, prerequisito: 'Devoto de Megalokk',
    descricao: 'Quando faz um ataque ou lança uma magia, você pode pagar 1 PM para somar sua Constituição (mínimo +1) à rolagem de dano desse ataque ou magia.' },

  { id: 'visao-nas-trevas', nome: 'Visão nas Trevas', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Tenebra',
    descricao: 'Você enxerga perfeitamente no escuro, incluindo em magias de escuridão.' },

  { id: 'voz-da-civilizacao', nome: 'Voz da Civilização', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Tanna-Toh',
    descricao: 'Você está sempre sob efeito de Compreensão.' },

  { id: 'voz-da-natureza', nome: 'Voz da Natureza', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Allihanna',
    descricao: 'Você pode falar com animais (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra animais. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { id: 'voz-dos-monstros', nome: 'Voz dos Monstros', categoria: 'concedidos',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Devoto de Megalokk',
    descricao: 'Você conhece os idiomas de todos os monstros inteligentes e pode se comunicar livremente com monstros não inteligentes (Int –4 ou menor), como se estivesse sob efeito da magia Voz Divina.' },

  { id: 'zumbificar', nome: 'Zumbificar', categoria: 'concedidos',
    tipo: 'ativo', custoPM: 3, prerequisito: 'Devoto de Tenebra',
    descricao: 'Você pode gastar uma ação completa e 3 PM para reanimar o cadáver de uma criatura Pequena ou Média adjacente por um dia. O cadáver funciona como um parceiro iniciante de um tipo a sua escolha entre combatente, fortão ou guardião. Além disso, quando sofre dano, você pode sacrificar esse parceiro; se fizer isso, sofre apenas metade do dano, mas o cadáver é destruído.' },

  // ══════════════════════ TORMENTA (22) ══════════════════════
  // Regra geral do grupo: escolher qualquer poder da Tormenta custa 1
  // ponto de Carisma. A cada 2 outros poderes da Tormenta que você já
  // tenha, perde mais 1 de Carisma (deformidades e perda de identidade).
  // Um personagem reduzido a menos que Car –5 vira NPC do mestre.
  // Muitos desses poderes escalam automaticamente conforme você acumula
  // mais poderes da Tormenta — isso já está descrito em cada um.

  { id: 'anatomia-insana', nome: 'Anatomia Insana', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você tem 25% de chance (resultado "1" em 1d4) de ignorar o dano adicional de um acerto crítico ou ataque furtivo. A chance aumenta em +25% para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'antenas', nome: 'Antenas', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe +1 em Iniciativa, Percepção e Vontade. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'armamento-aberrante', nome: 'Armamento Aberrante', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 1, prerequisito: 'outro poder da Tormenta',
    descricao: 'Você pode gastar uma ação de movimento e 1 PM para produzir uma versão orgânica de qualquer arma corpo a corpo ou de arremesso com a qual seja proficiente — ela brota do seu braço, ombro ou costas como uma planta grotesca e então se desprende. O dano da arma aumenta em um passo para cada dois outros poderes da Tormenta que você possui. A arma dura pela cena, então se desfaz numa poça de gosma.' },

  { id: 'articulacoes-flexiveis', nome: 'Articulações Flexíveis', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe +1 em Acrobacia, Furtividade e Reflexos. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'asas-insetoides', nome: 'Asas Insetoides', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 1, prerequisito: 'quatro outros poderes da Tormenta',
    descricao: 'Você pode gastar 1 PM para receber deslocamento de voo 9m até o fim do seu turno. O deslocamento aumenta em +1,5m para cada outro poder da Tormenta que você possui.' },

  { id: 'carapaca', nome: 'Carapaça', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Sua pele é recoberta por placas quitinosas. Você recebe +1 na Defesa. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'corpo-aberrante', nome: 'Corpo Aberrante', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: 'outro poder da Tormenta',
    descricao: 'Crostas vermelhas em várias partes de seu corpo tornam seus ataques mais perigosos. Seu dano desarmado aumenta em um passo, mais um passo para cada quatro outros poderes da Tormenta que você possui.' },

  { id: 'cuspir-enxame', nome: 'Cuspir Enxame', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 2, prerequisito: null,
    descricao: 'Você pode gastar uma ação completa e 2 PM para criar um enxame de insetos rubros em um ponto a sua escolha em alcance curto, com duração sustentada. O enxame tem tamanho Médio e pode passar pelo espaço de outras criaturas. Uma vez por rodada, você pode gastar uma ação de movimento para mover o enxame 9m. No final do seu turno, o enxame causa 2d6 pontos de dano de ácido a qualquer criatura no espaço que estiver ocupando. Para cada dois outros poderes da Tormenta que possui, você pode gastar +1 PM ao usar este poder para aumentar o dano do enxame em +1d6.' },

  { id: 'dentes-afiados', nome: 'Dentes Afiados', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe uma arma natural de mordida (dano 1d4, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.' },

  { id: 'membros-estendidos', nome: 'Membros Estendidos', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Seus braços e armas naturais são grotescamente mais longos que o normal, o que aumenta seu alcance natural para ataques corpo a corpo em +1,5m. Para cada quatro outros poderes da Tormenta que você possui, esse alcance aumenta em +1,5m.' },

  { id: 'desprezar-a-realidade', nome: 'Desprezar a Realidade', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 2, prerequisito: 'quatro outros poderes da Tormenta',
    descricao: 'Você pode gastar 2 PM para ficar no limiar da realidade até o início de seu próximo turno. Nesse estado, ignora terreno difícil e causa 20% de chance de falha em efeitos usados contra você (não apenas ataques). Para cada dois outros poderes da Tormenta que você possuir, essa chance aumenta em 5% (máximo de 50%).' },

  { id: 'membros-extras', nome: 'Membros Extras', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 2, prerequisito: 'quatro outros poderes da Tormenta',
    descricao: 'Você possui duas armas naturais de patas insetoides que saem de suas costas, ombros ou flancos. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 2 PM para fazer um ataque corpo a corpo extra com cada uma (dano 1d4, crítico x2, corte). Se possuir Ambidestria ou Estilo de Duas Armas, pode empunhar armas leves em suas patas insetoides (mas ainda precisa pagar 2 PM para atacar com elas e sofre a penalidade de –2 em todos os ataques).' },

  { id: 'empunhadura-rubra', nome: 'Empunhadura Rubra', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 1, prerequisito: null,
    descricao: 'Você pode gastar 1 PM para cobrir suas mãos com uma carapaça rubra. Até o final da cena, você recebe +1 em Luta. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'fome-de-mana', nome: 'Fome de Mana', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Quando passa em um teste de resistência para resistir a uma habilidade mágica de um inimigo, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual ao número de poderes da Tormenta que possui.' },

  { id: 'larva-explosiva', nome: 'Larva Explosiva', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Dentes Afiados',
    descricao: 'Se uma criatura que tenha sofrido dano de sua mordida nesta cena for reduzida a 0 ou menos PV, ela explode em chuva cáustica, morrendo e causando 4d4 pontos de dano de ácido em criaturas adjacentes. Para cada dois outros poderes da Tormenta que você possui, o dano aumenta em +2d4. Você é imune a esse dano.' },

  { id: 'legiao-aberrante', nome: 'Legião Aberrante', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: 'Anatomia Insana, três outros poderes da Tormenta',
    descricao: 'Seu corpo se transforma em uma massa de insetos rubros. Você pode atravessar qualquer espaço por onde seja possível passar uma moeda (mas considera esses espaços como terreno difícil) e recebe +1 em testes contra manobras de combate e em testes de resistência contra efeitos que tenham você como alvo (mas não efeitos de área). Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'maos-membranosas', nome: 'Mãos Membranosas', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe +1 em Atletismo, Fortitude e testes de agarrar. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'mente-aberrante', nome: 'Mente Aberrante', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe resistência a efeitos mentais +1. Além disso, sempre que precisa fazer um teste de Vontade para resistir a uma habilidade, a criatura que usou essa habilidade sofre 1d6 pontos de dano psíquico. Para cada dois outros poderes da Tormenta que você possui, o bônus em testes de resistência aumenta em +1 e o dano aumenta em +1d6.' },

  { id: 'olhos-vermelhos', nome: 'Olhos Vermelhos', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Você recebe visão no escuro e +1 em Intimidação. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'pele-corrompida', nome: 'Pele Corrompida', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Sua carne foi mesclada à matéria vermelha. Você recebe redução de ácido, eletricidade, fogo, frio, luz e trevas 2. Esta redução aumenta em +2 para cada dois outros poderes da Tormenta que você possui.' },

  { id: 'sangue-acido', nome: 'Sangue Ácido', categoria: 'tormenta',
    tipo: 'passivo', custoPM: 0, prerequisito: null,
    descricao: 'Quando você sofre dano por um ataque corpo a corpo, o atacante sofre 1 ponto de dano de ácido por poder da Tormenta que você possui.' },

  { id: 'visco-rubro', nome: 'Visco Rubro', categoria: 'tormenta',
    tipo: 'ativo', custoPM: 1, prerequisito: null,
    descricao: 'Você pode gastar 1 PM para expelir um líquido grosso e corrosivo. Até o final da cena, você recebe +1 nas rolagens de dano corpo a corpo. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.' },

];

// Expõe globalmente
if (typeof window !== 'undefined') window.PODERES_GERAIS = PODERES_GERAIS;
