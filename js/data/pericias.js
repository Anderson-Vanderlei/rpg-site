/* ============================================================
   TORMENTA 20 — pericias.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 2: Perícias & Poderes, pp. 114–123
   Cada entrada: { id, nome, atributoChave, somenteTreinada,
                   penalidadeArmadura, descricao, usos[] }
   usos: sub-habilidades nomeadas com CD própria (quando existem)
============================================================ */

const NOTA_RESISTENCIA = {
  titulo: 'Perícias de Resistência',
  subtitulo: 'Fortitude, Reflexos e Vontade',
  icone: 'ti-shield-half',
  itens: [
    'Fortitude, Reflexos e Vontade são usadas para resistir a efeitos negativos, como uma explosão ou um encantamento de controle mental — por isso são chamadas de perícias de resistência.',
    'Efeitos que afetem seus "testes de resistência" afetam todos os testes destas três perícias. Um efeito que forneça +1 em testes de resistência fornece +1 em Fortitude, Reflexos e Vontade.',
  ],
};

const PERICIAS = [

  // ── FORÇA ──────────────────────────────────────────────────
  {
    id: 'atletismo', icone: 'ti-run', nome: 'Atletismo', atributoChave: 'Força',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Cobre proezas físicas como correr, escalar, nadar e saltar.',
    usos: [
      { nome: 'Corrida', cd: null, apenasTreinado: false,
        descricao: 'Ação completa: avança um número de quadrados de 1,5m igual ao resultado do teste (+2/-2 por 1,5m de deslocamento acima/abaixo de 9m). Só em linha reta, fora de terreno difícil. Após 1 + Constituição rodadas, precisa de testes de Fortitude (CD 15, +1 por teste) ou fica fatigado.' },
      { nome: 'Escalar', cd: 10, apenasTreinado: false,
        descricao: 'Ação de movimento, avança metade do deslocamento se passar. CD 10 (superfície com apoios), 15 (árvore), 20 (muro irregular) ou 25 (muro liso). Fica desprevenido enquanto escala; se cair, sofre dano.' },
      { nome: 'Natação', cd: 10, apenasTreinado: false,
        descricao: 'Ação de movimento por rodada na água. CD 10 (calma), 15 (agitada), 20+ (tempestuosa). Sofre penalidade de armadura. Pode prender a respiração por 1 + Constituição rodadas antes de precisar de testes de Fortitude.' },
      { nome: 'Saltar', cd: null, apenasTreinado: false,
        descricao: 'Parte do movimento, sem gastar ação. Salto longo: CD 5 por 1,5m. Salto em altura: CD 15 por 1,5m. Precisa de 6m de distância para impulso (senão +10 na CD).' },
    ],
  },
  {
    id: 'luta', icone: 'ti-sword', nome: 'Luta', atributoChave: 'Força',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Usada em ataques corpo a corpo. A CD é a Defesa do alvo; um acerto causa dano de acordo com a arma. Regras completas de combate no Capítulo 5.',
    usos: [],
  },

  // ── DESTREZA ───────────────────────────────────────────────
  {
    id: 'acrobacia', icone: 'ti-yoga', nome: 'Acrobacia', atributoChave: 'Destreza',
    somenteTreinada: false, penalidadeArmadura: true,
    descricao: 'Cobre proezas acrobáticas — equilíbrio, quedas e movimentos evasivos.',
    usos: [
      { nome: 'Amortecer Queda', cd: 15, apenasTreinado: true,
        descricao: 'Reação ao cair: reduz o dano da queda em 1d6, +1d6 a cada 5 pontos acima da CD. Zerando o dano, cai de pé.' },
      { nome: 'Equilíbrio', cd: null, apenasTreinado: false,
        descricao: 'Um teste por ação de movimento em superfícies precárias. CD 10 (escorregadio), 15 (estreita), 20 (muito estreita). Falha por 5+ derruba. Fica desprevenido enquanto se equilibra.' },
      { nome: 'Escapar', cd: null, apenasTreinado: false,
        descricao: 'Ação completa para se libertar de amarras. CD igual ao teste de Destreza de quem amarrou +10 (cordas), 20 (redes) ou 30 (algemas).' },
      { nome: 'Levantar-se Rapidamente', cd: 20, apenasTreinado: true,
        descricao: 'Levanta-se como ação livre em vez de gastar a ação de movimento, se passar no teste.' },
      { nome: 'Passar por Espaço Apertado', cd: 25, apenasTreinado: true,
        descricao: 'Ação completa: espreme-se por um espaço de uma categoria de tamanho menor, avançando metade do deslocamento.' },
      { nome: 'Passar por Inimigo', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto ao melhor entre Acrobacia, Iniciativa ou Luta do oponente para atravessar o espaço dele como parte do movimento.' },
    ],
  },
  {
    id: 'cavalgar', icone: 'ti-horse', nome: 'Cavalgar', atributoChave: 'Destreza',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Conduzir montarias como cavalos, trobos e grifos. Ações simples (encilhar, montar, cavalgar em terreno plano) não exigem teste.',
    usos: [
      { nome: 'Conduzir', cd: 15, apenasTreinado: false,
        descricao: 'Parte do movimento, sem custo de ação. CD 15 (terreno ruim) ou 25 (terreno perigoso). Falha: cai da montaria e sofre 1d6 de dano.' },
      { nome: 'Galopar', cd: null, apenasTreinado: false,
        descricao: 'Ação completa: avança um número de quadrados de 1,5m igual ao resultado do teste (+2/-2 por 1,5m de deslocamento acima/abaixo de 9m).' },
      { nome: 'Montar Rapidamente', cd: 20, apenasTreinado: false,
        descricao: 'Monta ou desmonta como ação livre. Falha por 5+ derruba no chão. Exige sela — sem ela, -5 no teste.' },
    ],
  },
  {
    id: 'furtividade', icone: 'ti-eye-off', nome: 'Furtividade', atributoChave: 'Destreza',
    somenteTreinada: true, penalidadeArmadura: true,
    descricao: 'Movimentar-se e agir sem ser percebido.',
    usos: [
      { nome: 'Esconder-se', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Percepção de quem pode notar. Ação livre só ao fim do turno, num lugar que permita se esconder. -5 se moveu (metade do deslocamento evita a penalidade), -20 se atacou ou chamou atenção.' },
      { nome: 'Seguir', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Percepção do alvo. -5 sem esconderijos/parado; alvo tomando precauções recebe +5. Falha faz o alvo perceber na metade do trajeto.' },
    ],
  },
  {
    id: 'iniciativa', icone: 'ti-bolt', nome: 'Iniciativa', atributoChave: 'Destreza',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Determina a ordem de ação no início de uma cena de combate — todos testam e agem em ordem decrescente do resultado.',
    usos: [],
  },
  {
    id: 'pilotagem', icone: 'ti-helm', nome: 'Pilotagem', atributoChave: 'Destreza',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Operar veículos como carroças, barcos e balões. Ações simples (atrelar, velejar em água calma) não exigem teste.',
    usos: [
      { nome: 'Conduzir em Situação Ruim', cd: 15, apenasTreinado: true,
        descricao: 'Ação de movimento por turno/cena. CD 15 (terreno/clima ruim) ou 25 (situação extrema). Falha: avança metade. Falha por 5+: acidente.' },
    ],
  },
  {
    id: 'pontaria', icone: 'ti-target-arrow', nome: 'Pontaria', atributoChave: 'Destreza',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Usada em ataques à distância. A CD é a Defesa do alvo; um acerto causa dano de acordo com a arma. Regras completas no Capítulo 5.',
    usos: [],
  },
  {
    id: 'reflexos', icone: 'ti-wind', nome: 'Reflexos', atributoChave: 'Destreza',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Perícia de resistência contra efeitos que exigem reação rápida, como armadilhas e explosões, e para evitar fintas. A CD é definida pelo efeito.',
    usos: [],
    notaGeral: NOTA_RESISTENCIA,
  },
  {
    id: 'ladinagem', icone: 'ti-lock-open', nome: 'Ladinagem', atributoChave: 'Destreza',
    somenteTreinada: true, penalidadeArmadura: true,
    descricao: 'Atividades ilícitas — arrombar, ocultar e sabotar.',
    usos: [
      { nome: 'Abrir Fechadura', cd: 20, apenasTreinado: false,
        descricao: 'Ação completa + gazua (-5 sem ela). CD 20 (simples), 25 (média), 30 (superior).' },
      { nome: 'Ocultar', cd: null, apenasTreinado: false,
        descricao: 'Ação padrão, teste oposto à Percepção de quem observa. Objetos discretos: +5; grandes: -5. Revista dá +10 ao observador.' },
      { nome: 'Punga', cd: 20, apenasTreinado: false,
        descricao: 'Ação padrão: pega (ou planta) um objeto em alguém. A vítima tem um teste de Percepção (CD = seu resultado) para perceber a tentativa.' },
      { nome: 'Sabotar', cd: 20, apenasTreinado: false,
        descricao: 'CD 20 (ação simples) ou 30 (complexa). Leva 1d4 rodadas (ou uma ação completa com -5). Falha por 5+: algo dá errado.' },
    ],
  },

  // ── CONSTITUIÇÃO ───────────────────────────────────────────
  {
    id: 'fortitude', icone: 'ti-heart', nome: 'Fortitude', atributoChave: 'Constituição',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Perícia de resistência contra efeitos que exigem vitalidade (doenças, venenos) e para manter o fôlego correndo ou sem respirar (CD 15, +1 por teste anterior). A CD de efeitos externos é definida por eles.',
    usos: [],
    notaGeral: NOTA_RESISTENCIA,
  },

  // ── INTELIGÊNCIA ───────────────────────────────────────────
  {
    id: 'conhecimento', icone: 'ti-book-2', nome: 'Conhecimento', atributoChave: 'Inteligência',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Saber acadêmico geral — aritmética, astronomia, geografia, história e afins.',
    usos: [
      { nome: 'Idiomas', cd: 20, apenasTreinado: false,
        descricao: 'Entende um idioma desconhecido. Falha por 5+ gera uma conclusão errada. Idiomas exóticos ou antigos: CD 30.' },
      { nome: 'Informação', cd: 20, apenasTreinado: false,
        descricao: 'Responde dúvidas gerais. Perguntas simples não exigem teste; complexas CD 20; mistérios/enigmas CD 30.' },
    ],
  },
  {
    id: 'guerra', icone: 'ti-map-2', nome: 'Guerra', atributoChave: 'Inteligência',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Educação em tática, estratégia e logística militar.',
    usos: [
      { nome: 'Analisar Terreno', cd: 20, apenasTreinado: false,
        descricao: 'Ação de movimento: revela uma vantagem tática no campo de batalha (cobertura, camuflagem, terreno elevado), se houver.' },
      { nome: 'Plano de Ação', cd: 20, apenasTreinado: false,
        descricao: 'Ação padrão em alcance médio: concede +5 na Iniciativa de um aliado; se ele ainda não agiu e ficar com Iniciativa maior, age logo após você.' },
    ],
  },
  {
    id: 'investigacao', icone: 'ti-search', nome: 'Investigação', atributoChave: 'Inteligência',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Encontrar pistas e obter informações através de perguntas ou busca.',
    usos: [
      { nome: 'Interrogar', cd: 20, apenasTreinado: false,
        descricao: 'Uma hora + T$ 3d6. Informações restritas CD 20, confidenciais CD 30 (valores variam a critério do mestre).' },
      { nome: 'Procurar', cd: 15, apenasTreinado: false,
        descricao: 'CD 15 (item à mostra em bagunça), 20 (escondido) ou 30 (muito bem escondido). Leva de uma ação completa a um dia. Também encontra armadilhas e rastros.' },
    ],
  },
  {
    id: 'misticismo', icone: 'ti-sparkles', nome: 'Misticismo', atributoChave: 'Inteligência',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Conhecimento de magias, itens mágicos e fenômenos sobrenaturais.',
    usos: [
      { nome: 'Detectar Magia', cd: 15, apenasTreinado: false,
        descricao: 'Ação completa: detecta presença e intensidade de auras mágicas em alcance curto. Barreiras impõem -5 (madeira/pedra) ou -10 (ferro/chumbo).' },
      { nome: 'Identificar Criatura', cd: 15, apenasTreinado: false,
        descricao: 'CD 15 + ND da criatura. Revela uma característica (poder ou vulnerabilidade); +1 a cada 5 pontos acima da CD. Falha por 5+: conclusão errada.' },
      { nome: 'Identificar Item Mágico', cd: 20, apenasTreinado: false,
        descricao: 'Uma hora de estudo. CD 20 (menor), 25 (médio), 30 (maior). Pode gastar -10 no teste para reduzir a uma ação completa.' },
      { nome: 'Identificar Magia', cd: 15, apenasTreinado: false,
        descricao: 'Reação: CD 15 + custo em PM da magia sendo lançada, para reconhecer qual magia é pelos gestos e palavras.' },
      { nome: 'Informação', cd: 20, apenasTreinado: false,
        descricao: 'Dúvidas sobre magias, itens, runas ou planos. Simples sem teste, complexas CD 20, mistérios CD 30.' },
      { nome: 'Lançar Magia de Armadura', cd: 20, apenasTreinado: false,
        descricao: 'CD 20 + custo em PM. Necessário para lançar magia arcana usando armadura; sofre penalidade de armadura. Falha consome o PM mesmo sem efeito.' },
    ],
  },
  {
    id: 'nobreza', icone: 'ti-crown', nome: 'Nobreza', atributoChave: 'Inteligência',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Educação aristocrática — protocolo, etiqueta, linhagens e heráldica.',
    usos: [
      { nome: 'Etiqueta', cd: 15, apenasTreinado: false,
        descricao: 'Comportar-se em ambientes aristocráticos, como bailes e audiências.' },
      { nome: 'Informação', cd: 20, apenasTreinado: false,
        descricao: 'Dúvidas sobre leis, tradições e heráldica. Simples sem teste, complexas CD 20, mistérios CD 30.' },
    ],
  },
  {
    id: 'oficio', icone: 'ti-hammer', nome: 'Ofício', atributoChave: 'Inteligência',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Na prática, várias perícias diferentes — cada uma dedicada a fabricar uma categoria de itens. Outros tipos livres (carpinteiro, pedreiro, ourives, fazendeiro, pescador, estalajadeiro, escriba, escultor, pintor...) podem ser criados em acordo com o mestre.',
    opcoes: [
      { nome: 'Armeiro', icone: 'ti-sword',
        descricao: 'Armas e Armaduras & Escudos.' },
      { nome: 'Artesão', icone: 'ti-tool',
        descricao: 'Equipamento de Aventura, Ferramentas, Esotéricos e Veículos.' },
      { nome: 'Alquimista', icone: 'ti-flask',
        descricao: 'Alquímicos.' },
      { nome: 'Cozinheiro', icone: 'ti-chef-hat',
        descricao: 'Alimentação.' },
      { nome: 'Alfaiate', icone: 'ti-shirt',
        descricao: 'Vestuário.' },
      { nome: 'Engenhoqueiro', icone: 'ti-settings',
        descricao: 'Engenhocas e Autômatos. Não é um tipo do livro básico de Ofício — vem de um poder de classe do Inventor (Int 3, treinado em Ofício).' },
    ],
    usos: [
      { nome: 'Consertar', cd: null, apenasTreinado: false,
        descricao: 'Mesma CD de fabricar o item. Uma hora e um décimo do preço original por tentativa; falha perde tempo e dinheiro.' },
      { nome: 'Fabricar', cd: 15, apenasTreinado: false,
        descricao: 'Gasta um terço do preço em matéria-prima. CD 15 (simples) ou 20 (complexo). Tempo: um dia (consumíveis), uma semana (comuns) ou um mês (superiores/mágicos).' },
      { nome: 'Identificar', cd: 20, apenasTreinado: false,
        descricao: 'Ação completa: identifica propriedades e preço de um item raro ligado ao ofício.' },
      { nome: 'Sustento', cd: 15, apenasTreinado: false,
        descricao: 'Uma semana de trabalho: ganha T$ 1, +T$ 1 por ponto acima da CD.' },
    ],
  },

  // ── SABEDORIA ──────────────────────────────────────────────
  {
    id: 'cura', icone: 'ti-first-aid-kit', nome: 'Cura', atributoChave: 'Sabedoria',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Tratar ferimentos, doenças e venenos.',
    usos: [
      { nome: 'Cuidados Prolongados', cd: 15, apenasTreinado: true,
        descricao: 'Uma hora, até um número de pacientes igual ao seu nível: cada um ganha +1 PV por nível na recuperação diária.' },
      { nome: 'Necropsia', cd: 20, apenasTreinado: true,
        descricao: 'Dez minutos: determina causa e hora da morte. Causas raras/extraordinárias: CD 30.' },
      { nome: 'Primeiros Socorros', cd: 15, apenasTreinado: false,
        descricao: 'Ação padrão: estabiliza um aliado adjacente sangrando.' },
      { nome: 'Tratamento', cd: null, apenasTreinado: true,
        descricao: 'Ação completa contra a CD da doença/veneno: paciente ganha +5 no próximo teste de Fortitude contra aquele efeito. Exige maleta de medicamentos (-5 sem ela); -5 se usada em si mesmo.' },
    ],
  },
  {
    id: 'intuicao', icone: 'ti-brain', nome: 'Intuição', atributoChave: 'Sabedoria',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Empatia e "sexto sentido" para perceber pessoas e situações.',
    usos: [
      { nome: 'Perceber Mentira', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Enganação de quem está mentindo, para descobrir a mentira.' },
      { nome: 'Pressentimento', cd: 20, apenasTreinado: true,
        descricao: 'Indica se há algo anormal numa pessoa ou situação — sem revelar a causa.' },
    ],
  },
  {
    id: 'percepcao', icone: 'ti-eye', nome: 'Percepção', atributoChave: 'Sabedoria',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Notar coisas através dos sentidos.',
    usos: [
      { nome: 'Observar', cd: 15, apenasTreinado: false,
        descricao: 'CD 15 a 30 conforme o quão escondido. Contra pessoas/itens ocultos, a CD é o teste de Furtividade/Ladinagem usado para escondê-los. Também permite ler lábios (CD 20).' },
      { nome: 'Ouvir', cd: 0, apenasTreinado: false,
        descricao: 'CD 0 pra conversa casual próxima; 15 para sussurros (+10 do outro lado de uma porta). Dormindo: -10 no teste, sucesso acorda. Perceber criaturas invisíveis: CD 20 ou +10 sobre a Furtividade delas.' },
    ],
  },
  {
    id: 'religiao', icone: 'ti-candle', nome: 'Religião', atributoChave: 'Sabedoria',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Conhecimento sobre os deuses e religiões de Arton.',
    usos: [
      { nome: 'Identificar Criatura', cd: 15, apenasTreinado: false,
        descricao: 'CD 15 + ND, para criaturas de origem divina (anjos, demônios, alguns mortos-vivos). Mesma lógica de Misticismo.' },
      { nome: 'Identificar Item Mágico', cd: 20, apenasTreinado: false,
        descricao: 'Para itens mágicos de origem divina — mesma lógica de Misticismo.' },
      { nome: 'Informação', cd: 20, apenasTreinado: false,
        descricao: 'Dúvidas sobre deuses, profecias e planos. Simples sem teste, complexas CD 20, mistérios CD 30.' },
      { nome: 'Rito', cd: 20, apenasTreinado: false,
        descricao: 'Realiza uma cerimônia religiosa (batizado, casamento, funeral ou penitência). Penitência exige sacrifício de T$ 100 por nível do devoto ou uma missão sagrada.' },
    ],
  },
  {
    id: 'sobrevivencia', icone: 'ti-trees', nome: 'Sobrevivência', atributoChave: 'Sabedoria',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Estar em casa nos ermos — orientação, rastreamento e sobrevivência.',
    usos: [
      { nome: 'Acampamento', cd: 15, apenasTreinado: false,
        descricao: 'Abrigo e alimento por um dia. CD 15 (planície/colina) a 30 (região planar/Tormenta). Clima ruim: -5 cumulativo. Exige equipamento de viagem.' },
      { nome: 'Identificar Criatura', cd: 15, apenasTreinado: false,
        descricao: 'CD 15 + ND, para animais e monstros — mesma lógica de Misticismo.' },
      { nome: 'Orientar-se', cd: null, apenasTreinado: false,
        descricao: 'Um teste por dia de viagem perigosa. Sucesso avança o deslocamento normal; falha avança metade; falha por 5+ perde o dia.' },
      { nome: 'Rastrear', cd: 15, apenasTreinado: true,
        descricao: 'CD 15 (solo macio) a 25 (solo duro). -5 rastreando grupos grandes ou criaturas enormes; +5 em visibilidade ruim. Desloca-se à metade enquanto rastreia; CD sobe +1 por dia desde os rastros.' },
    ],
  },
  {
    id: 'vontade', icone: 'ti-shield', nome: 'Vontade', atributoChave: 'Sabedoria',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Perícia de resistência contra efeitos que exigem determinação, como intimidação e encantamentos. A CD é definida pelo efeito.',
    usos: [],
    notaGeral: NOTA_RESISTENCIA,
  },

  // ── CARISMA ────────────────────────────────────────────────
  {
    id: 'adestramento', icone: 'ti-paw', nome: 'Adestramento', atributoChave: 'Carisma',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Lidar com animais.',
    usos: [
      { nome: 'Acalmar Animal', cd: 25, apenasTreinado: false,
        descricao: 'Ação completa: acalma um animal nervoso ou agressivo, permitindo controlá-lo.' },
      { nome: 'Manejar Animal', cd: 15, apenasTreinado: false,
        descricao: 'Ação de movimento: faz o animal realizar uma tarefa para a qual foi treinado. Também substitui Pilotagem para veículos de tração animal.' },
    ],
  },
  {
    id: 'atuacao', icone: 'ti-music', nome: 'Atuação', atributoChave: 'Carisma',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Apresentações artísticas — música, dança e dramaturgia.',
    usos: [
      { nome: 'Apresentação', cd: 20, apenasTreinado: false,
        descricao: 'Um dia se apresentando: ganha T$ 1d6, +T$ 1d6 a cada 5 pontos acima da CD. Local propício dobra o ganho; local inadequado reduz à metade.' },
      { nome: 'Impressionar', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Vontade do alvo. Sucesso: +2 em testes de Carisma contra ele no mesmo dia. Falha: -2 e não pode tentar de novo naquele dia.' },
    ],
  },
  {
    id: 'diplomacia', icone: 'ti-message-circle', nome: 'Diplomacia', atributoChave: 'Carisma',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Convencer pessoas com lábia e argumentação. Seus usos são efeitos mentais.',
    usos: [
      { nome: 'Barganha', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Vontade do negociante. Sucesso muda o preço em 10% (20% se passar por 10+). Falha por 5+ ofende o comerciante por uma semana.' },
      { nome: 'Mudar Atitude', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Vontade do alvo: muda a atitude dele em uma categoria (duas se passar por 10+). Um minuto de uso, uma vez por dia por alvo.' },
      { nome: 'Persuasão', cd: 20, apenasTreinado: false,
        descricao: 'Convence alguém a fazer algo. Pedido custoso: -5. Pedido perigoso: -10 ou falha automática.' },
    ],
  },
  {
    id: 'enganacao', icone: 'ti-mask', nome: 'Enganação', atributoChave: 'Carisma',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Manipular pessoas com blefes e trapaças.',
    usos: [
      { nome: 'Disfarce', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Percepção de quem observa. Disfarces complexos: -5. Disfarçar-se de alguém específico dá +10 a quem conhece essa pessoa. Exige estojo de disfarces (-5 sem ele) e dez minutos.' },
      { nome: 'Falsificação', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Percepção de quem examina. Documentos complexos ou com assinatura: -10. Combinado com Ofício, também falsifica objetos.' },
      { nome: 'Fintar', cd: null, apenasTreinado: false,
        descricao: 'Ação padrão, teste oposto aos Reflexos de um alvo em alcance curto: se passar, ele fica desprevenido contra seu próximo ataque até o fim do próximo turno.' },
      { nome: 'Insinuação', cd: 20, apenasTreinado: false,
        descricao: 'Passa uma mensagem oculta a alguém. Falha por 5+: a pessoa entende algo diferente. Outros podem entender com Intuição oposta.' },
      { nome: 'Intriga', cd: 20, apenasTreinado: false,
        descricao: 'Espalha uma fofoca (CD 30 se muito improvável). Falha por 5+: o alvo descobre a fonte. Um dia ou mais de uso.' },
      { nome: 'Mentir', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Intuição da vítima. Mentiras muito implausíveis: -10.' },
    ],
  },
  {
    id: 'intimidacao', icone: 'ti-speakerphone', nome: 'Intimidação', atributoChave: 'Carisma',
    somenteTreinada: false, penalidadeArmadura: false,
    descricao: 'Assustar ou coagir outras pessoas. Seus usos são efeitos de medo.',
    usos: [
      { nome: 'Assustar', cd: null, apenasTreinado: false,
        descricao: 'Ação padrão, teste oposto à Vontade de um alvo em alcance curto: fica abalado pelo resto da cena (ou apavorado por uma rodada se passar por 10+).' },
      { nome: 'Coagir', cd: null, apenasTreinado: false,
        descricao: 'Teste oposto à Vontade de um alvo inteligente adjacente: obedece uma ordem. Ordens perigosas dão +5 ao alvo ou sucesso automático. Deixa o alvo hostil.' },
    ],
  },
  {
    id: 'jogatina', icone: 'ti-cards', nome: 'Jogatina', atributoChave: 'Carisma',
    somenteTreinada: true, penalidadeArmadura: false,
    descricao: 'Jogar jogos de azar.',
    usos: [
      { nome: 'Apostar', cd: null, apenasTreinado: false,
        descricao: 'Pague T$ 1d10 e teste a perícia para ver quanto ganha na noite (veja a tabela). O mestre pode variar o valor da aposta básica — de T$ 1d3 numa taverna simples a 1d10 x T$ 1.000 num cassino de luxo.',
        tabela: {
          colunas: ['Teste', 'Ganho'],
          linhas: [
            ['9 ou menos', 'Nenhum.'],
            ['10 a 14', 'Metade da aposta.'],
            ['15 a 19', 'Valor da aposta (você "empata").'],
            ['20 a 29', 'Dobro da aposta.'],
            ['30 a 39', 'Triplo da aposta.'],
            ['40 ou mais', 'Quíntuplo da aposta.'],
          ],
        },
      },
    ],
  },
];

// Expõe globalmente
if (typeof window !== 'undefined') window.PERICIAS = PERICIAS;
