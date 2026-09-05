/* ============================================================
   TORMENTA 20 — deuses_menores.js
   Dados oficiais — Guia de Deuses Menores, 1ª edição (maio/2025, v1.1)
   Deuses menores de Arton: divindades fora do Panteão dos Vinte
   (mortais ascendidos, dragões-reais, objetos despertos, conceitos vivos
   e entidades primordiais). Todas concedem um único Poder Concedido, com
   texto mecânico completo (diferente dos 20 maiores, que só citam o nome
   do poder em poderes_gerais).

   Cada entrada:
   { id, nome, epiteto,                        // epiteto pode ser null (ex.: Espada-Deus)
     natureza,                                  // 'mortal ascendido'|'dragão-real'|'objeto desperto'|'conceito vivo'|'entidade primordial'
     statusDivino,                              // 1 a 5 (Tabela "Deuses Menores de Arton", apêndice do livro)
     energia,                                   // 'positiva'|'negativa'|'dual'
     lore, crencas, simboloSagrado,
     armaPreferida,                             // string | null
     devotosRacas[], devotosClasses[],          // TODOS os devotos citados no livro, na ordem em que
                                                  // aparecem — raças/classes já existentes no site usam
                                                  // os nomes canônicos exatos (mesma grafia de racas.js/
                                                  // classes.js); as que ainda não existem no site (ex.:
                                                  // Centauro, Kobold, Meio-Elfo, Sulfure, Aggelus, Tabrachi,
                                                  // Naidora, Kallyanach — ver lista completa no changelog)
                                                  // ficam nos arrays mesmo assim, em Title Case singular,
                                                  // pra já estarem prontas quando essas raças/classes forem
                                                  // adicionadas ao site (04/set, pedido do usuário) — o
                                                  // filtro de Devoto (compendio.js) só oferece as raças/
                                                  // classes que window.RACAS/CLASSES já têm, então esses
                                                  // termos extras não aparecem no <select> ainda, mas já
                                                  // saem no chip de "Devotos" do painel de detalhe (como
                                                  // texto simples, sem link — chipsDevoto() já trata esse
                                                  // caso) e na busca por texto.
     devotosNota,                                // texto livre complementar, quando existe | null
     naoPermitidoJogadores,                       // opcional, true|undefined — flag explícita quando o
                                                  // próprio livro afirma que essa divindade menor NÃO é
                                                  // permitida para jogadores (ex.: Sartan, p.43); dispara
                                                  // o badge "Não p/ Jogadores" no card e no painel de
                                                  // detalhe (04/set) — checado nas 60 entradas, só Sartan
                                                  // tem essa restrição explícita no texto do livro.
     obrigacoes,
     poderConcedido: { nome, texto },            // objeto único, com o texto mecânico completo do poder
     fonte: 'Guia de Deuses Menores',            // fixo em todas as entradas deste arquivo
     pagina,                                     // página do livro onde a divindade é descrita
     _duvida }                                   // opcional; nota de fidelidade/ambiguidade da extração,
                                                  // não é renderizado na UI — apenas para revisão futura

   Observações de integração:
   - 4 destas divindades já existem como NPCs no Guia de NPCs (js/data/lendas.js),
     marcadas com deusMenor: true — os ids abaixo foram conferidos para bater
     exatamente com lendas.js: beluhga, benthos, hippion, inghlblhpholtsgt.
     (Gwendolynn também tem deusMenor: true em lendas.js, mas não aparece como
     divindade documentada neste livro — não há entrada dela aqui.)
   - Por instrução do usuário, esta adição atinge SOMENTE a página de Deuses;
     lendas.js não foi alterado.
============================================================ */

const DEUSES_MENORES = [
  {
    "id": "akok",
    "nome": "Akok",
    "epiteto": "Deus dos Lobos",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "positiva",
    "lore": "Um enorme lobo com dentes que se projetam fora da mandíbula, Akok é o Deus dos Lobos, mas também governa certas raças de cães, principalmente de guerra, de guarda e de caça. É cultuado por goblinoides e outros humanoides que usam lobos como montaria, mas também por soldados responsáveis por bandos de cães de guerra, caçadores que só contam com seus cães ou lobos como companheiros e até mesmo por humanoides criados nos ermos por lobos. Devotos de Akok, entretanto, não são meros ginetes ou \"donos\": são parte da alcateia e veem os lobos como seus irmãos peludos. São abençoados com instintos para lutar e agir em bando como lobos.\n\nSendo um deus animalesco, Akok nunca revelou sua origem (não tendo capacidade ou interesse para isso). Também não existem registros de quando teria ascendido. No entanto, uma lenda afirma que Akok foi o primeiro lobo a se aproximar de uma comunidade humanoide — talvez pressentindo que um dia poderia haver cooperação entre essas espécies, talvez apenas ferido e precisando de ajuda. Segundo essa história, teria sido esse gesto que deu origem à domesticação de lobos que levou à existência dos cães.",
    "crencas": "Reverenciar Akok como o único grande alfa. Trabalhar em equipe. Proteger alcateias. Promover harmonia entre matilhas e a civilização. Combater ameaças que perturbam o equilíbrio natural.",
    "simboloSagrado": "Uma grande pata de lobo rodeada por patas menores.",
    "armaPreferida": "Espada curta.",
    "devotosRacas": [
      "Dahllan",
      "Elfo",
      "Goblin",
      "Centauro",
      "Gnoll",
      "Kobold"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Ladino",
      "Lutador",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Akok não podem aprisionar ou matar lobos de qualquer tipo (como lobos-das-cavernas), nem permitir que outros o façam. Além disso, o grupo ao qual o devoto pertence (família, aventureiros, guilda…) é considerado sua alcateia. Ele não pode enganá-la, traí-la ou abandoná-la.",
    "poderConcedido": {
      "nome": "Espírito da Alcateia",
      "texto": "Você pode se comunicar livremente com todos os tipos de cães e lobos, como se estivesse sob efeito da magia Voz Divina. Além disso, quando ataca um inimigo que você esteja flanqueando, você recebe +2 na rolagem de dano."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 7,
    "_duvida": "Devotos completos conforme o livro; termos como 'Centauro', 'Gnoll' e 'Kobold' (raças) e 'Treinador' (classe) ainda não têm raça/classe correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "altair",
    "nome": "Altair",
    "epiteto": "Deus das Montanhas",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Este deus bárbaro era um homem alto, forte e musculoso. Usava apenas uma tanga, exibia o corpo cheio de cicatrizes e a cabeleira escura que parecia a juba de uma fera. Padroeiro dos que desafiam o mundo selvagem, escalou e venceu desafios nas maiores montanhas de Arton, além de ser associado à caça e à sobrevivência.\n\nEmbora seja o Deus Menor das Montanhas, Altair é mais do que isso: é o padroeiro do modo de vida das montanhas, da resiliência necessária para sobreviver e prosperar nesse tipo de ambiente, dos povos que nunca se dobraram à necessidade de erguer cidades em terrenos planos, mas mantiveram seus costumes ancestrais. Para muitos, as montanhas são território de monstros ou algo a ser \"vencido\" em uma escalada. Para os devotos de Altair, as montanhas são um lar desafiador, que acolhe seus habitantes ao mesmo tempo em que exige muito deles.\n\nA ascensão de Altair já se perdeu no tempo. Ele surge como um herói folclórico em vários povos montanheses, desde as Lannestul até as Uivantes, e inclusive em algumas aldeias das Sanguinárias. Contudo, é consenso que não se trata de uma entidade, mas de um humano que ascendeu. Em todos os relatos, Altair aparece interagindo com a população, espreitando com bandos de caçadores e conversando com chefes. Mesmo entre seus devotos, parece ser uma pessoa quase comum. Existem inclusive histórias em que Altair obedece às ordens de um devoto, sendo mais um guerreiro em seu grupo!\n\nAltair foi encontrado pela última vez nas Montanhas Lannestul, quando Orion Drake reuniu seu Exército de Deuses. Contudo, seu machado enorme foi usado pela última vez defendendo Betsumial, o Deus dos Vigias, quando então um vulcão surgiu sob seus pés e a horda lefeu conseguiu sobrepujá-lo na Batalha de Tamu-ra, em 1405.",
    "crencas": "Reverenciar Altair e as cadeias montanhosas de Arton. Desafiar as montanhas e seus perigos. Proteger as montanhas. Nunca recuar perante as dificuldades da natureza.",
    "simboloSagrado": "Uma montanha com um machado cravado.",
    "armaPreferida": "Machado de guerra.",
    "devotosRacas": [
      "Anão",
      "Minotauro",
      "Trog",
      "Naidora"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Lutador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Altair nunca podem recusar uma missão que envolva escalar ou desbravar uma montanha. Além disso, a cada 1d4+2 meses o devoto deve escalar a maior montanha da região onde está e passar um dia meditando em seu cume, para se reconectar com a natureza e com sua divindade.",
    "poderConcedido": {
      "nome": "Liberdade das Montanhas",
      "texto": "Quando faz um teste de Atletismo para escalar, você rola dois dados e usa o melhor resultado. Além disso, se você estiver em terreno elevado, recebe +2 em testes de perícia contra criaturas em terreno inferior."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 8,
    "_duvida": "Devotos completos conforme o livro; 'Naidora' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "anilatir",
    "nome": "Anilatir",
    "epiteto": "Deusa da Inspiração",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Anilatir, quando ainda era uma jovem mortal, trancou-se numa torre para que fosse resgatada por heróis. Ela mesma inventou uma série de perigos e desafios para seus salvadores e prometeu se casar com quem a libertasse. Muitos o fizeram, e ela viveu feliz para sempre por algumas semanas com cada um, até que se trancava de novo num lugar ainda mais inóspito, com mais perigos, para instigar heróis mais valorosos.\n\nQuando enfim, depois de alguns anos, cansou-se do jogo, foi ela mesma uma aventureira, tendo sido clériga de Khalmyr, Thyatis, Lena, Nimb e Oceano. Após ter roubado uma fortuna de um dragão, decidiu entregá-la ao bardo que compusesse a melhor balada. Escolheu crianças que julgava terem potencial e arranjou para que suas famílias fossem chacinadas, impulsionando-as assim ao caminho de aventuras. Depois decidiu ser vilã, maquinando planos ilógicos de dominação e destruição para que heróis se levantassem para detê-la. Enfim, após essas e muitas outras peripécias, acabou ascendendo a Deusa da Inspiração, musa de bardos e centro de um minúsculo mas imaginativo culto.\n\nA história de Anilatir é tão curiosa quanto improvável. Segundo esses relatos, ela parecia agir como uma divindade, decidida a inspirar mortais e sem qualquer preocupação com a própria segurança, mesmo muito jovem. Talvez isso seja sinal de que tais histórias não passam de mentiras. Ou talvez Anilatir tenha inspirado alguém (talvez seu paladino, o indefectível Tex Scorpion Mako) a desenvolver alguma técnica mágica que direcionasse sua própria inspiração a ela mesma, desafiando as barreiras do tempo. Impossível? Dizem que alguns clérigos de Anilatir já se interessaram pelo conceito do Akzath de Thwor…\n\nOs clérigos de Anilatir se organizam (de forma bastante solta) em uma conspiração pela liberdade de Arton, eternamente combatendo a conspiração inimiga perpetrada pelos clérigos de Yasshara, a Deusa da Opressão, que desejam enclausurar o mundo em parâmetros rígidos e ordenados. Além disso, vivem aventuras, dançam, criam novas filosofias, entregam-se a todas as formas de expressão artística, traem o culto, arrependem-se, sagram-se cavaleiros, entram em guildas de ladrões… Fazem tudo que for diferente e inesperado. Serão seus melhores amigos, por pelo menos uma noite na taverna, desde que você aguente.",
    "crencas": "Reverenciar Anilatir com intensidade. Criar coisas novas. Estudar coisas novas. Tornar-se algo novo. Reinventar-se de tempos em tempos. Evoluir sempre e inspirar outros a fazer o mesmo.",
    "simboloSagrado": "Um escorpião, uma máscara, uma estrela, um pincel… — seu símbolo muda a cada 2d10+10 dias, mas seus devotos estão sempre cientes da mudança.",
    "armaPreferida": "Adaga, espada, arco longo… — muda na mesma frequência que seu símbolo sagrado.",
    "devotosRacas": [],
    "devotosClasses": [],
    "devotosNota": "Quaisquer. Anilatir não rejeita ninguém que queira criar ou ser algo novo.",
    "obrigacoes": "Devotos de Anilatir devem trocar pelo menos um item vestido ou empunhado por outro que ainda não tenham usado a cada 2d10+10 dias. (Para este efeito, versões aprimoradas ou encantadas de itens contam como itens diferentes.) Além disso, deve estar sempre atento às tramas de Yasshara, a Deusa Menor da Opressão, inimiga mortal de Anilatir.",
    "poderConcedido": {
      "nome": "Inspiração Concedida",
      "texto": "Você pode gastar 2 PM para evocar o poder da criatividade. Até o fim da cena, sempre que fizer um teste de perícia, você recebe um bônus cumulativo de +1 nesse teste (ou seja, +1 no primeiro teste, +2 no segundo teste, +3 no terceiro e assim por diante). Esse bônus dura até o fim da cena ou até você fazer um teste de uma perícia que já tenha usado nesta cena."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 9
  },
  {
    "id": "apis",
    "nome": "Apis",
    "epiteto": "Deusa das Abelhas",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Também conhecida como Abelha-Imperatriz, Apis é a rainha de todas as abelhas de Arton. Ela vive em Tzeh'collmah, uma gigantesca colmeia no coração das Montanhas Lannestul, com milhares de abelhas gigantes como suas operárias. Alguns bárbaros das Lannestul aprenderam a temer e venerar Apis ao longo das eras. Nas redondezas, vários druidas, da mesma forma que os insetos gigantes, são considerados abelhas operárias ou campeiras, responsáveis pela proteção da colmeia e coleta de recursos, como néctar, pólen, resina e água.\n\nAlguns sábios fazem uma relação curiosa: Apis habita as Lannestul, onde também ficava a antiga nação de Ked'Rach, dos gigantes. Sabe-se que os gigantes escravizaram os minotauros durante muitos séculos, e que os minotauros só conseguiram se libertar usando trabalho em equipe e organização meticulosa. Segundo esses sábios, Goratikis, o líder minotauro responsável por unir seu povo, teria se inspirado em Apis, após encontrar por acaso Tzeh'collmah e observar a organização e união metódica das abelhas. Caso haja alguma verdade nisso, esta deusa, mesmo pouco conhecida, teria tido um impacto decisivo na história de Arton.\n\nDe fato, algumas pessoas acreditam que peregrinar a Tzeh'collmah e vislumbrar Apis, talvez trazendo mel de volta, seja um rito que garanta o sucesso na formação de qualquer ordem, guilda, companhia mercenária ou organização com hierarquia rígida. Além de garantir que o peregrino nunca mais seja picado por abelhas…",
    "crencas": "Reverenciar Apis e as abelhas. Proteger a colmeia e o futuro das abelhas. Promover harmonia entre as abelhas e a civilização, e combater ameaças a essa harmonia.",
    "simboloSagrado": "Uma abelha em um hexágono imitando um favo de mel.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Dahllan",
      "Sílfide",
      "Trog",
      "Hobgoblin",
      "Kobold"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Apis não podem aprisionar ou matar abelhas de qualquer tipo (como abelhas monstruosas), nem permitir que outros o façam. Além disso, devem consumir T$ 1 por nível em mel todos os dias.",
    "poderConcedido": {
      "nome": "Chamado",
      "texto": "Você pode gastar 1 PM e uma ação padrão para invocar um enxame de abelhas Grande com duração sustentada, que surge em um espaço a sua escolha em alcance médio. O enxame pode passar pelo espaço de outras criaturas e não impede que outras criaturas entrem no espaço dele. No final de seus turnos, o enxame causa 2d6 pontos de dano de perfuração a qualquer criatura em seu espaço (Reflexos CD Sab reduz à metade). Você pode gastar uma ação de movimento para mover o enxame 12m. A cada patamar além de iniciante, você pode gastar +1 PM quando invoca o enxame para aumentar seu dano em +2d6."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 10,
    "_duvida": "Devotos completos conforme o livro; 'Hobgoblin' e 'Kobold' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "artaphan",
    "nome": "Artaphan",
    "epiteto": "Deus da Amizade",
    "natureza": "conceito vivo",
    "statusDivino": 2,
    "energia": "positiva",
    "lore": "Artaphan talvez seja único entre os deuses menores de Arton. Enquanto pessoas e até mesmo objetos foram elevados à divindade durante o período em que o Panteão estava incompleto, Artaphan foi criado a partir do nada.\n\nDarien, um trambiqueiro (antes bandoleiro, depois Cavaleiro do Corvo e depois o infame Cavaleiro Risonho), inventou-o para ludibriar os cidadãos de Roschfallen e impedir que cultuassem a Tormenta ou deuses malignos. De fato, o próprio nome do deus é um anagrama de \"patranha\" — um sinônimo de mentira. O resultado foi um deus pequeno, esquálido, fraco… mas ainda assim um deus. Artaphan não era nada antes de se tornar divino. Nasceu capaz de falar, compreender e abençoar o mundo, imortal, formado de crença pura. Tem consciência de que Darien o inventou e sente gratidão, mas não é um servo dele.\n\nTudo indica que, pelo menos durante o início de sua vida, Artaphan seja extremamente maleável, afetado pela crença de seus devotos. Assim, caso o consenso geral diga que ele é um deus masculino, assumirá essa forma. Se o povo decidir que é feminino, assim será. Humanoide, animal, objeto... Artaphan é argila espiritual nas mãos de seus fiéis. Nasceu na antiga União Púrpura, fruto das lembranças de Darien a respeito de suas amizades da juventude. Por isso, Artaphan é fortemente associado à amizade juvenil e inconsequente.",
    "crencas": "Reverenciar Artaphan e a amizade. Espalhar a amizade. Ajudar os outros. Aproveitar a vida em comunidade ou com um grupo seleto.",
    "simboloSagrado": "Um par de mãos dadas.",
    "armaPreferida": "Funda.",
    "devotosRacas": [
      "Goblin",
      "Hynne",
      "Qareen",
      "Sílfide",
      "Gnoll"
    ],
    "devotosClasses": [
      "Bardo",
      "Cavaleiro",
      "Nobre",
      "Paladino",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Artaphan devem espalhar a amizade. Uma vez por dia (ou por sessão de jogo, o que demorar mais), o devoto deve aproximar pessoas. Ele pode convencer alguém a ajudar outrem, passar um recado com uma mensagem positiva, colocar duas pessoas para beber juntas… Em termos de jogo, uma ação exigindo um teste de Diplomacia com CD mínima 15 + metade do seu nível.",
    "poderConcedido": {
      "nome": "Poder da Amizade",
      "texto": "Escolha um personagem para ser seu amigo de fé. Se estiver em alcance médio dele e vocês puderem pelo menos trocar olhares, você recebe +2 em todos os testes de perícia e o custo de suas habilidades que tenham ele como alvo diminui em –1 PM (cumulativo com outras reduções). Entretanto, se ele morrer, seus pontos de mana máximos diminuem em 1 por nível até o fim da aventura. Se perder seu amigo de fé, você pode escolher outro entre os demais personagens no início da próxima aventura."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 10,
    "_duvida": "Devotos completos conforme o livro; 'Gnoll' (raça) e 'Treinador' (classe) ainda não têm correspondência no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "ayllana",
    "nome": "Ayllana",
    "epiteto": "Deusa das Sereias",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "positiva",
    "lore": "Nas profundezas cintilantes dos recifes, Ayllana destacou-se desde a infância por sua conexão com as forças arcanas do oceano. Superando os demais membros de sua raça, dominava os feitiços que controlavam as marés e invocavam feras dos abismos marinhos, transformando campos de batalha em tempestades místicas. Durante a eterna guerra das sereias e dos tritões contra os elfos-do-mar, sua habilidade mágica foi decisiva em numerosas batalhas. Em um confronto memorável, Ayllana enfrentou Tessalus, o feroz guerreiro dos elfos-do-mar — que acreditava que a força bruta superava qualquer encantamento.\n\nNaquele dia, os dois colidiram em duelo mortal: o tridente mágico de Tessalus contra as invocações arcanas de Ayllana. Mesmo com a fúria do adversário, a feiticeira reverteu o ataque com feitiços potentes, selando uma vitória que marcou a história do conflito. Esse embate não apenas fortaleceu sua reputação, como também alimentou uma rivalidade que perduraria. Após o feito heroico, Ayllana foi elevada à posição divina. Seu culto é conduzido por feiticeiras-sacerdotisas, celebrando sua mente arguta e dons arcanistas — exercido não apenas sob as ondas de Arton, mas também no próprio Reino do Oceano. Devotas da Deusa das Sereias acreditam que seus encantamentos as fortalecem, renovando sua meta de governar os mares com magia e colocar os elfos-do-mar em merecida submissão.",
    "crencas": "Proteger as sereias e sua soberania. Enaltecer a magia arcana. Dominar os oceanos. Derrotar os elfos-do-mar.",
    "simboloSagrado": "Uma barbatana dorsal multicolorida.",
    "armaPreferida": "Não há. Devotos desta deusa não podem usar a magia Arma Espiritual e similares.",
    "devotosRacas": [
      "Qareen",
      "Sereia/Tritão"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Ayllana são proibidos de matar sereias e tritões, recusar-se a ajudar sereias e tritões inocentes, e recusar missões para resgatar ou proteger sereias/tritões e sua cultura.",
    "poderConcedido": {
      "nome": "Canção dos Mares",
      "texto": "Você adquire a habilidade Canção dos Mares das sereias/tritões (Tormenta20, p. 30). Se já tiver essa habilidade, você pode escolher outras magia da lista da habilidade, ou as mesmas para diminuir seu custo."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 11
  },
  {
    "id": "beluhga",
    "nome": "Beluhga",
    "epiteto": "Dragoa-Rainha do Gelo",
    "natureza": "dragão-real",
    "statusDivino": 4,
    "energia": "positiva",
    "lore": "Tão majestosa quanto as próprias Montanhas Uivantes, Beluhga é venerada pelos povos que habitam a região. Ao contrário de quase todos os Dragões-Reais (e da maioria dos dragões em geral), Beluhga é uma presença do bem. Sua magia era capaz de curar, embora ela também fosse uma senhora tão exigente quanto as próprias Uivantes.\n\nSua história é trágica — na verdade, tão trágica que pode ser duvidosa, e coloca em xeque a benevolência de um dos deuses do Panteão. Diz-se que, há mais de 100.000 anos, Beluhga foi aprisionada nas Uivantes pelo próprio Khalmyr. Essa seria a verdadeira causa do clima na região: apenas a presença da Dragoa-Rainha do Gelo poderia tornar toda a cordilheira tão fria. Mas, se Beluhga não era maligna, por que foi punida? Segundo ao menos uma versão, Khalmyr estava apaixonado por Beluhga, mas ela o rejeitou. O Deus da Justiça teria então cometido uma injustiça suprema, apenas por seu orgulho ferido. Sabe-se que os deuses do Panteão não são perfeitos, mas Khalmyr não poderia ser tão imperfeito… ou poderia? Outras versões afirmam que a punição seria justa: Beluhga teria conspirado contra o Panteão, junto a Sckhar. Mas isso leva à pergunta de por que então Sckhar não foi punido…\n\nMesmo confinada às Uivantes como punição, Beluhga tomou para si o dever de proteger a região. Foi uma das divindades menores mais atuantes de Arton, e rivalizou apenas com Sckhar como Dragoa-Rainha mais influente nas vidas dos mortais. Contudo, sua tragédia não havia acabado. Quando o Paladino de Arton se ergueu contra os deuses, tomou a Dragoa-Rainha como montaria, apenas para matá-la quando ela se tornou inútil para ele. Morta, Beluhga não retornou a sua forma dracônica; em vez disso, permaneceu como humanoide. Nessa forma — semelhante a uma meia-elfa de pele azulada, com cabelos roxos adornados por diademas cristalinos —, seu cadáver pôde ser levado de volta às Uivantes, onde repousa até hoje em um caixão de gelo eterno, impedindo o degelo da região. Dizem que um fantasma da Dragoa-Rainha foi visto nas montanhas; outros afirmam que não se trata de um fantasma, mas da própria Beluhga, retornada da morte para retomar seu reino gelado.",
    "crencas": "Reverenciar o cadáver congelado de Beluhga e impedir que ele seja profanado. Perpetuar as tradições criadas no território da Dragoa-Rainha do Gelo. Combater quaisquer criaturas que ameacem pessoas, animais e outros seres nativos das Montanhas Uivantes.",
    "simboloSagrado": "Uma lágrima azul cristalizada.",
    "armaPreferida": "Machado de guerra.",
    "devotosRacas": [
      "Anão",
      "Hynne",
      "Golem",
      "Minotauro",
      "Galokk",
      "Kallyanach",
      "Ogro"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Beluhga não devem permitir que não nativos das Uivantes adentrem a caverna onde repousa o corpo da Dragoa-Rainha. Não podem negar pedidos de ajuda feitos por um nativo inocente das Uivantes. Além disso, devem retornar às Uivantes para prestar seus respeitos a Beluhga a cada 1d4+2 meses.",
    "poderConcedido": {
      "nome": "Bênção do Frio",
      "texto": "Você recebe redução de frio 5. Além disso, se terminar o seu turno adjacente a um ou mais inimigos, eles ficam enredados por cristais de gelo por 1 rodada. Se já estavam enredados dessa forma, em vez disso ficam imóveis por 1 rodada (Fortitude evita a condição imóvel)."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 12,
    "_duvida": "Devotos completos conforme o livro; 'golens' segue mapeado para 'Golem' (grafia alternativa da mesma raça, não é raça nova). 'Galokk', 'Kallyanach' e 'Ogro' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "benthos",
    "nome": "Benthos",
    "epiteto": "Dragão-Rei dos Mares",
    "natureza": "dragão-real",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "Pouco se sabe a respeito de Benthos, já que são raras suas visitas ao mundo seco. Para ele, nada importa além da vastidão submersa que habita e as inúmeras ilhas que defende. Quase nunca visto em terra firme, este Dragão-Rei interveio em um punhado de vezes na história dos bípedes do continente — e todas deixaram consequências que ecoam por séculos, como a retaliação contra Thomas Lendilkar e a batalha contra o Dragão da Tormenta. Embora não seja uma figura benevolente, Benthos é o grande protetor de Khubar, o Reino Arquipélago. Os xamãs khubarianos possuem rituais secretos, capazes de invocar Benthos para combater ameaças às ilhas como um todo. Benthos é adorado em Khubar tanto quanto os deuses do Panteão, considerado por muitos a divindade principal, por sua proximidade e fisicalidade. Quase todos em Khubar lembram de alguma intervenção de Benthos, ou têm na família alguém que lembra. Assim, os ritos de adoração cotidiana ao Dragão-Rei têm um elemento de autopreservação e gratidão.\n\nEm sua forma humanoide, Benthos costuma aparecer como um tritão robusto de pele azulada, com roupas feitas de conchas e algas. Em forma dracônica, exibe um corpanzil esguio, com escamas brilhantes em tons de azul claro e verde-água, barbatanas emergindo ao longo do corpo e uma longa cauda bifurcada. As asas, em forma de leque, são utilizadas para voar e nadar.",
    "crencas": "Reverenciar a magnificência de Benthos. Promover harmonia entre Khubar e o domínio submerso do Dragão-Rei dos Mares. Respeitar as dádivas providas pelas criaturas marinhas, além de retribuí-las sempre que possível. Proclamar a superioridade do Mar do Dragão-Rei e de suas ilhas. Vingar transgressões contra Khubar.",
    "simboloSagrado": "Uma coroa feita de conchas e pérolas.",
    "armaPreferida": "Tridente.",
    "devotosRacas": [
      "Sereia/Tritão",
      "Elfo-do-Mar",
      "Kallyanach",
      "Tabrachi"
    ],
    "devotosClasses": [
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Benthos não podem recusar pedidos de ajuda feitos por criaturas marinhas ou khubarianos inocentes. Além disso, não podem permanecer mais de um dia sem contato com água.",
    "poderConcedido": {
      "nome": "Investida Tempestade",
      "texto": "Quando faz uma investida, você pode gastar 2 PM para cobrir seu corpo com eletricidade. Se fizer isso, seu ataque causa +2d8 pontos de dano de eletricidade. Além disso, criaturas adjacentes ao caminho que você percorre na investida sofrem 2d8 pontos de dano de eletricidade e ficam ofuscadas por 1 rodada (Ref CD Sab reduz à metade e evita a condição)."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 13,
    "_duvida": "Devotos completos conforme o livro; 'Elfo-do-Mar', 'Kallyanach' e 'Tabrachi' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas. Mantida a dúvida quanto ao nome exato do poder concedido ('Investida Tempestade'), reconstruído de um trecho quebrado em duas linhas no layout original do PDF."
  },
  {
    "id": "betsumial",
    "nome": "Betsumial",
    "epiteto": "Deus dos Vigias",
    "natureza": "mortal ascendido",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Betsumial era uma divindade de pequena importância há cerca de 300 anos. Nasceu em Petrynia, marcado por ter um único enorme olho no meio da face, capaz de enxergar a enormes distâncias. Seu nariz era deformado, para dar espaço ao olho ciclópico, resultando em uma voz fanhosa. Devido a seus poderes, ainda na infância começou a ser cultuado por aqueles que dependiam da visão para sobreviver. Os primeiros devotos foram vigias. Logo vieram guardas, exploradores, patrulheiros e outros. Ainda jovem, como um aventureiro errante, era disputado por lordes que desejavam tê-lo a seu serviço e por cidades que o queriam como seu guardião. Assim, Betsumial ascendeu a deus menor.\n\nSeu culto foi sempre obscuro — dominado por uma irmandade de guardas e outros \"vigilantes\". Ele mesmo nunca se preocupou em angariar seguidores, mas sempre concedeu sua bênção a todos que vinham procurá-lo. Sua religião nunca teve um centro definido, até a queda de Glórienn, em 1405. Na época, formou-se uma espécie de sítio de peregrinação nas colinas próximas à antiga Malpetrim, onde seus devotos controlavam a chegada de novos seguidores, mas as peregrinações acabaram quando Betsumial encontrou seu fim na Batalha de Tamu-ra, mais tarde no mesmo ano. Suas representações póstumas mostram um jovem magriço que usava uma venda cobrindo seu único olho — mas essa venda, curiosamente, às vezes trazia um olho enorme pintado no tecido.",
    "crencas": "Vigiar os arredores. Manter-se alerta. Preparar-se para os perigos e reagir a eles com antecipação. Proteger os mais fracos e indefesos.",
    "simboloSagrado": "Um olho aberto.",
    "armaPreferida": "Arco longo.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Hynne",
      "Kliren",
      "Naidora"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Cavaleiro",
      "Guerreiro",
      "Ladino",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Betsumial sempre se oferecem para vigiar um local, objeto ou criatura, se isso for necessário, e jamais se recusam a fazê-lo (mas não precisam permanecer em vigília por mais de 1 dia).",
    "poderConcedido": {
      "nome": "Olhos do Vigia",
      "texto": "Você recebe +2 em Percepção, não fica surpreendido e desprevenido contra inimigos que não possa perceber e nunca acerta o alvo errado ao atacar alguém envolvido na manobra agarrar."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 13,
    "_duvida": "Devotos completos conforme o livro; 'Naidora' ainda não tem raça correspondente no site, fica no array pra quando for adicionada. Mantida a observação de que o texto de Obrigações & Restrições e Poder Concedido de Betsumial aparece intercalado com o início da seção de Blinar no layout de duas colunas do PDF (páginas 13-14), tendo sido reconstruído com cuidado a partir do conteúdo temático (olho, vigia)."
  },
  {
    "id": "blinar",
    "nome": "Blinar",
    "epiteto": "Deus das Máscaras",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Um deus dissimulado, com rosto na forma de uma máscara de porcelana que se transforma constantemente, Blinar é uma figura enigmática e extravagante. Sempre veste roupas elaboradas que parecem fantasias — ou talvez também façam parte de seu corpo. Reverenciado em inúmeros bailes da corte e (secretamente) entre espiões, Blinar ensina seus devotos a jamais mostrar quem realmente são. Muito popular em Ahlen, é considerado por muitos o padroeiro da festa do Dia das Máscaras que acontece no Palácio Rishantor de Thartann, a capital do Reino da Intriga.\n\nBlinar governa sobre todos os aspectos das máscaras, desde sua função festiva e brincalhona até seu uso como disfarce e mesmo seu lado ritualístico. O deus ensina que, sob uma máscara, um mortal (ou mesmo uma divindade) pode ser qualquer um, ou qualquer coisa. A máscara seria a maior das defesas, pois protegeria a identidade, algo que engloba corpo, mente e alma. Paradoxalmente, as pessoas também mostram quem são de verdade ao usar uma máscara. Afinal, não há vergonha quando se usa um rosto que não é o seu próprio. Com sua identidade oculta, o que está em seu interior pode aflorar…",
    "crencas": "Nunca mostrar sua verdadeira face. Provar-se mais esperto do que os demais. Deixar todos imaginando quem você é. Fazer aquilo que só é possível com anonimato total.",
    "simboloSagrado": "Uma máscara de baile.",
    "armaPreferida": "Adaga.",
    "devotosRacas": [
      "Goblin",
      "Hynne",
      "Medusa",
      "Osteon",
      "Sílfide",
      "Sulfure"
    ],
    "devotosClasses": [
      "Bardo",
      "Bucaneiro",
      "Ladino",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Blinar devem sempre usar máscaras em público (a máscara conta como um item vestido). Além disso, uma vez por semana devem fazer um estranho acreditar que sua identidade é outra.",
    "poderConcedido": {
      "nome": "Máscara Mística",
      "texto": "Se estiver usando uma máscara, você pode lançar as magias Disfarce Ilusório e Proteção Divina (mas apenas em você mesmo). Caso aprenda uma dessas magias, seu custo diminui em –1 PM enquanto você estiver de máscara."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 14,
    "_duvida": "Devotos completos conforme o livro; 'sulfure' não é erro de OCR (o termo reaparece também entre os devotos de outro deus menor, ligado a Voracis) e foi normalizado para 'Sulfure'. Ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "caerdellach",
    "nome": "Caerdellach",
    "epiteto": "Deus dos Unicórnios",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "positiva",
    "lore": "Talvez exista um unicórnio mais antigo que Caerdellach, mas ninguém se lembra. Sendo, presumivelmente, a mais ancestral dessas criaturas, desde sempre foi procurado por outros de sua espécie, como conselheiro e sábio. Não demorou para começar a ser cultuado e se tornar um verdadeiro deus menor.\n\nCaerdellach é uma divindade muito distante dos artonianos “civilizados”. Embora existam (raros) unicórnios que se associam a bípedes, o Deus Menor dos Unicórnios não costuma participar desse tipo de aliança. Prefere permanecer em existência reclusa, na Floresta de Tollon, sendo procurado por aqueles que necessitam de conselhos ou a miraculosa cura que seu chifre concede. Sua clareira é muitas vezes chamada de Refúgio dos Unicórnios, pois diz-se que nenhum mortal é capaz de alcançá-la sem sua permissão, e todos esses seres delicados encontram lá abrigo e proteção.\n\nEm vários pontos de Arton, a figura do unicórnio é relacionada ao conceito de pureza. Algumas pessoas (principalmente em culturas rígidas) associam isso à castidade. Assim, existem artonianos de todos os sexos e gêneros que cultuam Caerdellach porque, por alguma razão, valorizam e desejam preservar sua “inocência”.",
    "crencas": "Preservar e pregar a sacralidade de corpo, mente e alma. Proteger bosques, florestas, clareiras pacíficas, córregos límpidos e outros locais onde os unicórnios habitam. Curar os feridos.",
    "simboloSagrado": "Um chifre dourado.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Dahllan",
      "Elfo",
      "Sílfide",
      "Aggelus",
      "Centauro",
      "Eiradaan",
      "Meio-Elfo"
    ],
    "devotosClasses": [
      "Cavaleiro",
      "Druida",
      "Paladino",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Caerdellach devem ser sacros e castos, recusando-se a se casar ou ter relações íntimas com outras pessoas. Além disso, não podem recusar pedidos de ajuda de pessoas inocentes ou animais em perigo.",
    "poderConcedido": {
      "nome": "Pureza Corporal",
      "texto": "Você pode gastar uma ação de movimento e 1 PM para cobrir sua mão com luz e tocar uma criatura em alcance corpo a corpo. A criatura recupera 2d6+2 PV. Além disso, aprende e pode lançar a magia Purificação. Se aprender essa magia novamente, o custo dela diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 15,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus', 'Centauro', 'Eiradaan' e 'Meio-Elfo' (raças) e 'Treinador' (classe) ainda não têm correspondência no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "canastra",
    "nome": "Canastra",
    "epiteto": "Deus das Armadilhas",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Um deus pequeno e esguio, com personalidade teatral, Canastra esconde sua inteligência e o perigo que representa, fingindo ser indefeso. Protege aqueles que usam de esperteza e artimanhas para vencer e diverte-se com devotos capazes de encontrar um jeitinho de se virar em situações perigosas. Embora possua muitos servos em palácios, também é reverenciado por todo tipo de caçadores, desde meros aldeões que usam de armadilhas para capturar pequenos animais até caçadores de monstros ou recompensas, que guiam suas presas para as mais mortais emboscadas.\n\nCanastra também tem outros devotos mais sofisticados… e mais perigosos. Em várias partes de Arton, projetistas de masmorras cultuam este deus, em busca de inspiração para suas criações mortíferas e engenhosas. De fato, alguns teólogos especulam que o próprio Hyninn possa sentir algum “ciúme” desse culto. Outros afirmam que Canastra é um fantoche de Hyninn, para que o Deus da Trapaça possa influenciar o mundo ainda mais, mantendo sua fachada “inofensiva”.",
    "crencas": "Planejar adiante. Estar sempre um passo à frente. Emboscar inimigos. Preparar armadilhas. Manipular outros a seu favor.",
    "simboloSagrado": "Uma armadilha arataca.",
    "armaPreferida": "Rede.",
    "devotosRacas": [
      "Goblin",
      "Hynne",
      "Kliren",
      "Sílfide",
      "Trog",
      "Finntroll",
      "Gnoll",
      "Harpia",
      "Kobold",
      "Nezumi"
    ],
    "devotosClasses": [
      "Bardo",
      "Caçador",
      "Inventor",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Canastra devem sempre estar um passo à frente de seus adversários. Uma vez por dia (ou por sessão de jogo, o que demorar mais), devem executar uma armadilha ou uma emboscada com sucesso.",
    "poderConcedido": {
      "nome": "Dom de Armadilheiro",
      "texto": "Você recebe um poder de Armadilha do caçador a sua escolha e a CD de todas as suas armadilhas aumenta em +2. Além disso, você pode aprender Conjurar Armadilha (Heróis de Arton, p. 252) como uma magia divina."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 15,
    "_duvida": "Devotos completos conforme o livro; 'Finntroll', 'Gnoll', 'Harpia', 'Kobold' e 'Nezumi' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "canora",
    "nome": "Canora",
    "epiteto": "Deusa da Canção",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Com a aparência de uma donzela esguia, pálida e com olheiras, esta deusa é capaz de modular a voz como quiser, da melodia mais doce a um guincho doloroso ou mesmo mortal. Suas canções são capazes de agradar os mais distintos gostos e seu repertório é infinito — desde as mais delicadas melodias élficas até as mais poderosas óperas anãs. Do canto suave de pássaros aos berros agonizantes dos moribundos. Seus devotos são ensinados a fazer o mesmo, usando suas vozes para incitar todos os tipos de emoções.\n\nA voz de Canora pode ressoar com materiais específicos, destruindo-os com a mesma facilidade com que ela encanta seu público. A deusa não aprecia o uso de sua arte como arma, mas sabe que às vezes isso é necessário.",
    "crencas": "A melodia é a perfeição. Treino vocal é imprescindível. O canto é a mais perfeita forma de arte e o jeito certo de conquistar corações. A voz é a mais poderosa das armas.",
    "simboloSagrado": "Uma flor em forma de nota musical.",
    "armaPreferida": "Florete.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Hynne",
      "Qareen",
      "Sereia/Tritão",
      "Sílfide",
      "Harpia",
      "Sátiro"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Canora nunca recusam uma oportunidade de cantar. Além disso, uma vez por semana (ou por sessão de jogo, o que demorar mais), devem se apresentar para uma grande plateia, como uma taverna lotada, a corte de um nobre local ou um festival em uma vila.",
    "poderConcedido": {
      "nome": "Canção Divina",
      "texto": "Você pode usar Sabedoria para Atuação (em vez de Carisma) e como atributo-chave de suas magias de bardo (se as tiver). Além disso, aprende e pode lançar a magia Despedaçar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 16,
    "_duvida": "Devotos completos conforme o livro; termos como 'Harpia' e 'Sátiro' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "cette",
    "nome": "Cette",
    "epiteto": "Deus dos Arqueiros",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Cette era um deus antigo, que transcendeu até mesmo a extrema longevidade élfica muito antes da queda de Lenórienn — alguns dizem que já era uma divindade menor quando os elfos chegaram a Arton. Suas maneiras, seu estilo de luta e sua própria aparência remetem a um tempo em que os elfos nunca haviam sido humilhados, mas também a uma época ainda sem a arrogância e a autoconfiança excessiva que foram sua perdição. De certa forma, Cette foi um símbolo de tudo que os elfos deveriam ter sido: perfeitos, mas sem nenhuma noção de superioridade. Embora representasse uma das maiores tradições élficas, Cette não parecia ter grande ligação com Glórienn. De alguma forma, ao personificar a disciplina do arco e flecha, Cette se concentrou na arma e se afastou de todo o resto. Também adquiriu certas características do arco (flexível, adquire força sob pressão) e da flecha (direto, rápido, sem meandros). Assim, continuava apresentando a típica postura élfica de séculos atrás: refinamento, delicadeza e tranquilidade, sem empáfia.\n\nCette perdeu muitos seguidores no período entre a chegada dos elfos a Arton e a queda de Glórienn — pois, durante esse tempo, a raça se voltou cada vez mais para sua deusa padroeira, de forma quase exclusiva. Mesmo assim, o Deus dos Arqueiros não parecia se abalar. Continuava pronto para defender as tradições élficas, como sempre fizera.\n\nDe certa forma, Cette era uma divindade simples: não desafiava a compreensão nem adquiria formas metafísicas. Era um elfo esguio, de longos cabelos verdes presos em tranças, tão leve que ao andar seus pés mal tocavam o chão. Seu arco era tão alto quanto ele mesmo. Vestia-se com a mais fina malha élfica, trançada com folhas vivas. Era um guerreiro eficiente, franco e até mesmo bem-humorado. Sua morte na Batalha de Tamu-ra em 1405 foi uma grande perda para Arton.",
    "crencas": "Manter vivas as tradições de arquearia élficas. Treinar e aperfeiçoar-se nas artes do tiro e da guerra. Honrar juramentos. Lutar por causas justas. Demonstrar força sob pressão e franqueza nas palavras.",
    "simboloSagrado": "Uma flecha com folhas verdes.",
    "armaPreferida": "Arco longo.",
    "devotosRacas": [
      "Elfo",
      "Medusa",
      "Naidora"
    ],
    "devotosClasses": [
      "Caçador",
      "Inventor",
      "Guerreiro",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "As únicas armas empunhadas que o devoto de Cette pode usar são arcos. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com arco na rodada.",
    "poderConcedido": {
      "nome": "Disparo Sublime",
      "texto": "Você pode gastar uma ação de movimento e 2 PM para fazer um teste de Percepção (CD 15 + ND da criatura) contra uma criatura em alcance médio. Se passar no teste e acertar um ataque com arco contra o alvo na mesma rodada, esse ataque é um acerto crítico automático. Se for o paladino de Cette, você pode usar Golpe Divino com ataques com arco à distância."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 16,
    "_duvida": "Devotos completos conforme o livro; 'Naidora' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "champarr",
    "nome": "Champarr",
    "epiteto": "Deus dos Jogos",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Patrono dos torneios, dos conflitos e dos jogos, Champarr é a divindade favorita dos atletas, duelistas, jogadores e guerreiros entre os moreau. É o juiz de todas as disputas, desde duelos de espadas até guerras entre reinos, desde jogos de cartas até corridas de cavalos nos Reinos de Moreania. Ele abençoa os vencedores e perdoa (ou amaldiçoa) os perdedores. Os adoradores de Champarr conseguem traçar sua origem até os mais distantes domínios extraplanares. Há milhares de anos ele teria participado de um torneio cósmico promovido por um poderoso Deus da Guerra — com certeza Keenn, a menos que todas as escrituras sagradas estejam erradas e tenha havido um Deus da Guerra antes dele! Esse presumivelmente foi o Torneio do Deus Guerreiro, a mesma disputa que rendeu a Arsenal o título de Deus da Guerra. Na ocasião, após sucessivas vitórias, Champarr chegou à grande final e duelou contra o deus em pessoa, mas foi derrotado. No entanto, por sua tenacidade, teria recebido a imortalidade e o título de Deus dos Jogos.\n\nChamparr tem a aparência de um poderoso gladiador, usando um elmo fechado que mantém suas emoções indecifráveis. Está sempre armado com duas espadas curtas idênticas: uma delas concede a bênção da vitória e a outra, a maldição da derrota.\n\nChamparr é querido em Moreania, especialmente no reino de Brando, onde flâmulas em sua homenagem são hasteadas antes de cada grande torneio, e seus clérigos atuam como juízes. Moreau diante de provações muitas vezes rogam seu nome, para assegurar a vitória.",
    "crencas": "Reverenciar os jogos. Incitar disputas. Derrotar inimigos. Desafiar a si mesmo. Superar limites. Promover e participar de torneios e jogos. Vencer em condições justas.",
    "simboloSagrado": "Um troféu.",
    "armaPreferida": "Espada curta.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Hynne",
      "Sílfide",
      "Sátiro"
    ],
    "devotosClasses": [
      "Bardo",
      "Bucaneiro",
      "Guerreiro",
      "Ladino",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Champarr devem vencer um jogo por dia (ou por sessão de jogo, o que demorar mais). Em termos de regras, devem vencer um teste oposto de Jogatina, Luta ou Pontaria contra um oponente digno (a critério do mestre). Outras perícias podem ser usadas para atender essa obrigação, também a critério do mestre.",
    "poderConcedido": {
      "nome": "Jogada Decisiva",
      "texto": "Uma vez por dia, quando faz um teste, você pode gastar 1 PM para somar +2 por patamar no teste."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 17,
    "_duvida": "Devotos completos conforme o livro; 'Sátiro' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "dahriol",
    "nome": "Dahriol",
    "epiteto": "Deus dos Selos",
    "natureza": "mortal ascendido",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Dahriol foi um grande herói eras atrás, responsável por atravessar verdadeiros infernos para entregar mensagens de suma importância que mudaram o destino de reinos inteiros. Qualquer um que quisesse garantir a entrega de sua carta buscava Dahriol e o herói nunca rompeu um selo que não devia — fosse o simples selo de cera de um pergaminho confidencial, fosse o selo místico de uma porta. Admirado por milhares, arrebanhou tanto poder que começou a ser considerado um deus por muitas pessoas ajudadas por seus feitos, além de ter inspirado outros mensageiros a se comportar da mesma forma.\n\nNum mundo em que vencer limites, quebrar barreiras e desvendar segredos são demonstrações de heroísmo valorizadas por quase todos, Dahriol é um defensor daquilo que deve ser mantido fechado, protegido e seguro. Desde entidades malignas que não podem escapar de suas prisões até informações sensíveis que não podem chegar aos olhos e ouvidos de inimigos, tudo que deve ficar selado é domínio de Dahriol. Assim, mesmo sem a fama de outros deuses menores, esta divindade carrega um grande fardo.\n\nComo recompensa por suas ações e seu senso de dever, Dahriol costuma servir como mensageiro de Tanna-Toh, a Deusa do Conhecimento, e ocasionalmente também de Khalmyr. Além disso, já foi enviado para Arton em missões envolvendo reunir aventureiros e garantir que selos amaldiçoados continuassem intactos. Durante sua participação na saga do Disco dos Três, ajudando a impedir que o deus menor Sartan viesse ao mundo, Dahriol foi o instigador de uma das primeiras expedições registradas de aventureiros do continente às proximidades de Galrasia. Assim, também é cultuado por alguns exploradores da ilha. Costuma se mostrar aos mortais como um homem velho com longos cabelos e barba branca, vestido com roupas simples e empunhando um cajado de madeira em uma das mãos.",
    "crencas": "Proteger os selos. Impedir que ameaças seladas causem mal a Arton. Estudar selos místicos e manter o mal afastado através deles.",
    "simboloSagrado": "Um selo de cera.",
    "armaPreferida": "Bordão.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Qareen"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Cavaleiro",
      "Guerreiro",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Dahriol não podem recusar pedidos de ajuda para entregar mensagens ou impedir que selos sejam abertos. Além disso, não podem abrir selos trancados sem permissão. Para estes fins, um “selo” é qualquer barreira, como uma porta, tranca ou fechadura, mundana ou mágica.",
    "poderConcedido": {
      "nome": "Selo Impedidor",
      "texto": "Você pode gastar uma ação padrão e 3 PM para impedir uma criatura em alcance curto de usar uma habilidade a sua escolha até o fim da cena (Von CD Sab evita). Você só pode escolher uma habilidade que tenha visto a criatura usar ou que tenha identificado com um teste de perícia (como um teste de Misticismo para identificar criatura). Você não pode escolher a habilidade Magias (ou habilidades equivalentes), mas pode escolher uma magia específica. Uma mesma criatura só pode ser afetada por este poder uma vez por cena."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 18
  },
  {
    "id": "deus-cristal-de-urielka",
    "nome": "O Deus Cristal de Urielka",
    "epiteto": null,
    "natureza": "objeto desperto",
    "statusDivino": 1,
    "energia": "positiva",
    "lore": "Este foi um dos primeiros casos registrados de deuses criados a partir de objetos inanimados, apenas pela vontade dos mortais. A aldeia de Urielka, nos ermos de Tyrondir, antes que a região se tornasse uma devastação com a queda da Flecha de Fogo, nunca teve muito de que se orgulhar. No entanto, possuía um imenso cristal, que atraía viajantes de tempos em tempos. O cristal nunca demonstrou nenhum poder mágico até que uma aldeã elfa chamada Dealla notou que era estranho que ele não fosse divino.\n\nAfetada pela queda de Glórienn, a Deusa dos Elfos, Dealla procurava algo para cultuar. Começou a deixar oferendas para o cristal e a espalhar sua crença secreta. Os demais aldeões, também ansiosos por algo que preenchesse o vazio que sentiam, logo distorceram fatos do passado para que parecessem milagres realizados pelo cristal. O culto nasceu. Viajantes de passagem por Urielka se juntaram, espalharam a notícia e logo o objeto angariou muitos seguidores até despertar como um deus menor, brilhando e falando com seus protegidos.\n\nO Deus Cristal passou a proteger a vila de Urielka. Não fazia muito além de oferecer consolo, aceitar oferendas e tranquilizar o povo, mas era amado como se fosse o mais poderoso deus maior. Depois da queda da Flecha de Fogo, a aldeia de Urielka chegou perto de desaparecer do mapa, mas sobreviveu, e o Deus Cristal continuou intacto. Isso passou a atrair ainda mais peregrinos e devotos. Hoje em dia, muitos que ousam desbravar as Ruínas de Tyrondir encontram em Urielka um ponto de descanso, um local intocado pelo lodo negro, onde um deus pode curá-los e abençoá-los para que continuem a jornada. Talvez isso aumente ainda mais o poder e o culto deste estranho deus menor.",
    "crencas": "Proteger a vila de Urielka e sua população. Abençoar viajantes e forasteiros que visitam o local. Espalhar a palavra e as bênçãos do Cristal.",
    "simboloSagrado": "Um cristal.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Elfo",
      "Hynne",
      "Qareen",
      "Aggelus"
    ],
    "devotosClasses": [
      "Bardo",
      "Caçador",
      "Cavaleiro",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos do Deus Cristal de Urielka devem peregrinar até a aldeia pelo menos uma vez por aventura (ou tempo entre aventuras) e, pelo menos uma vez por ano, devem fazer essa peregrinação levando consigo um novo devoto convertido.",
    "poderConcedido": {
      "nome": "Conjurar Cristal",
      "texto": "Você pode gastar uma ação de movimento e 3 PM para conjurar um cristal azul, verde ou vermelho. Conforme a cor do cristal, você pode quebrá-lo para gerar um efeito: azul (recebe RD 20 contra um dano recém-sofrido); verde (rola novamente um teste de resistência recém-realizado); vermelho (ganha uma ação de movimento nesse turno). O cristal dura até o fim da cena, até ser usado ou até você conjurar outro cristal."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 39,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "deus-das-cidades",
    "nome": "O Deus das Cidades",
    "epiteto": null,
    "natureza": "conceito vivo",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "À primeira vista, esta divindade parece não ter nome. No entanto, o oposto é verdade: o Deus das Cidades tem infinitos nomes, batizado de novo e de novo sempre que uma nova comunidade é formada. Chama-se Nova Malpetrim, Smokestone, Norm, Roschfallen, Var Raan, Gallien, Ghallystryx… Chama-se até mesmo Valkaria e Rhond. O Deus Menor das Cidades é composto por todos os centros urbanos de Arton. Em parte, ele é cada cidade do mundo. Portanto, uma divindade de grande poder.\n\nHá quem diga que o Deus das Cidades já foi um mortal; um mendigo que vagava de comunidade em comunidade. No entanto, a corrente de pensamento mais aceita afirma que isso nunca ocorreu — o Deus das Cidades apenas se formou espontaneamente quando os grandes centros urbanos do continente floresceram (ou até mesmo antes). Ele é uma manifestação do modo de vida dos artonianos urbanos, uma coleção de tudo que significa viver em cidades.\n\nSeu corpo é formado por ruas, prédios, cercas e telhados. Embora seja uma criatura enorme, sua aparência é incongruente, pois não é tão grande a ponto de abrigar tudo isso dentro de si. Alguns afirmam que a forma física do deus é como um portal para várias comunidades em Arton. Além disso, seu corpanzil é avassalador em combate, capaz de fazer frente aos mais ferozes deuses guerreiros. Fica mais poderoso com a concentração urbana — o próprio ato de viver em comunidade é uma forma de adoração.\n\nO Deus das Cidades pode ser encontrado nos esgotos, subterrâneos ou outros lugares ocultos de metrópoles como Valkaria. Contudo, alguns dizem que ele está presente ao mesmo tempo em todas as cidades de Arton. Basta encontrá-lo.",
    "crencas": "Formar comunidades e ajudar a desenvolvê-las. Estabelecer caravanas em entrepostos comerciais. Proteger o modo de vida das pessoas nos grandes centros.",
    "simboloSagrado": "Torres amontoadas atrás de um muro.",
    "armaPreferida": "Martelo de guerra.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Goblin",
      "Hynne",
      "Kliren",
      "Minotauro"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Inventor",
      "Ladino",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos do Deus das Cidades jamais podem se manter afastados de um centro urbano por mais 2d10+10 dias, nem se recusar a auxiliar uma comunidade.",
    "poderConcedido": {
      "nome": "Manha da Cidade",
      "texto": "Quando está em uma comunidade, você soma sua Sabedoria (mínimo de 1) em testes de Conhecimento, Investigação, Ladinagem e Nobreza, e pode fazer testes dessas perícias mesmo sem ser treinado. Além disso, em comunidades pode fazer testes para interrogar sem precisar falar com pessoas ou gastar tibares, questionando a própria cidade."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 39
  },
  {
    "id": "deus-do-medo",
    "nome": "O Deus do Medo",
    "epiteto": null,
    "natureza": "conceito vivo",
    "statusDivino": 4,
    "energia": "negativa",
    "lore": "Um deus sem nome, cuja presença é sempre sentida, mas jamais vista diretamente — pois tudo é mais amedrontador quando não é visto, e mais terrível quando não pode ser nomeado. O Deus do Medo se encontra sempre fora do ângulo de visão de um observador, como se estivesse à beira da percepção, nunca completamente revelado, mas sua influência é inegável. Sua natureza misteriosa e evasiva reflete o instinto primitivo que representa: o medo. Por ser padroeiro desse instinto básico, que está presente em todo ser vivo, esta divindade é extremamente poderosa e imortalizada nos corações dos mortais. O medo, em suas mais variadas formas, é infinito, uma força que governa a vida e a morte, a ação e a inação, e o deus sem nome compreende isso melhor do que qualquer outro ser.\n\nOs devotos do Deus Menor do Medo são aqueles que veem essa emoção como uma ferramenta a ser manipulada. Eles exploram cada nuance dos medos dos outros para alcançar seus próprios objetivos, seja em batalhas psicológicas, seja em estratégias para obter poder, controle ou influência. Ao alimentar e amplificar o medo, esses seguidores aumentam ainda mais o poder e a autoridade de sua divindade. Cada suspiro de pavor, cada sombra que se move de forma inesperada, serve para fortalecer o vínculo com o deus sem nome, aproximando-os cada vez mais de sua essência. Não ter medo é impossível.\n\nTambém há outros devotos, esses involuntários: aqueles tomados pelo medo. Medo da morte, medo de uma tragédia, medo de um grande inimigo… Até mesmo medo da felicidade, do sucesso, de tentar alguma coisa. Pessoas paralisadas pelo medo muitas vezes acabam considerando esse sentimento sagrado e cultuando o Deus do Medo sem saber. Para piorar as coisas, isso pode fazer com que este deus se manifeste sempre atrás desses devotos. Mas, quando o infeliz se vira para olhar, a divindade não está mais lá.",
    "crencas": "Espalhar o medo e o terror. Afugentar inimigos. Amedrontar a todos. Fazer com que ninguém se sinta em segurança, nem mesmo em casa. Apavorar crianças. Temer.",
    "simboloSagrado": "Uma silhueta sombria.",
    "armaPreferida": "Corrente de espinhos.",
    "devotosRacas": [
      "Lefou",
      "Minotauro",
      "Medusa",
      "Osteon",
      "Trog",
      "Bugbear",
      "Sulfure",
      "Voracis"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Bardo",
      "Bucaneiro",
      "Guerreiro",
      "Ladino",
      "Lutador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos do Deus do Medo devem deixar uma criatura sob qualquer efeito de medo pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais) em adoração a sua divindade.",
    "poderConcedido": {
      "nome": "Domínio do Medo",
      "texto": "Você recebe +2 em Intimidação e na CD de seus efeitos de medo, e pode escolher poderes relacionados a efeitos de medo sem necessidade de cumprir pré-requisitos de classe ou devoção. Por fim, pode aprender magias de medo como magias divinas."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 40,
    "_duvida": "Devotos completos conforme o livro (confirmado via cruzamento com deuses_menores_layout.txt, já que no full.txt esta linha de Devotos estava intercalada com a do Deus das Cidades, vizinho de coluna); termos como 'Bugbear', 'Sulfure' e 'Voracis' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "drumak",
    "nome": "Drumak",
    "epiteto": "Deus do Duelo",
    "natureza": "conceito vivo",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Diferente da imensa maioria de deuses artonianos, o Deus do Duelo não é uma criatura, mas um título. A cada ano é realizado o Torneio Deus do Duelo, um campeonato secreto no qual lutadores de toda Arton desafiam uns aos outros em duelos formais, em diferentes arenas, muitas vezes mascarando essa competição como simples brigas de rua ou lutas entre aventureiros. O vencedor, que fica conhecido como o “Guerreiro de Arton”, é então desafiado pelo Drumak atual. Se o Guerreiro de Arton vence o duelo, ele se torna o novo Deus do Duelo e parte da personalidade da divindade se une à do campeão.\n\nO segredo do Torneio Deus do Duelo é mantido para que só aqueles que são convidados (ou seja, apenas aventureiros considerados “combatentes” e que honrem a tradição das competições) saibam de sua existência. Os participantes do torneio formam uma grande confraria, respeitando-se ainda que sejam oponentes ferrenhos. Assim como o deus, seus devotos honram e respeitam duelos formais, jamais intrometendo-se na luta de outros — mas também nunca se acovardam, sempre resolvendo suas disputas pessoalmente. Nem todos os competidores do torneio são devotos de Drumak, mas todos os devotos do Deus do Duelo competem.\n\nO torneio é realizado no outono. Isso deriva das condições dos aventureiros no passado. A primavera e o verão eram considerados “época de aventuras”, quando os grupos de heróis eram contratados para desbravar locais inexplorados e invadir covis de monstros, quando os exércitos marchavam e os reis faziam seus movimentos agressivos. Assim, as duas estações eram reservadas às missões importantes. No outono, os grupos de aventureiros costumavam estar menos ocupados. Assim, os combatentes desses grupos podiam se dedicar a sua competição secreta. Contudo, não há uma data definida para o início do torneio.\n\nAté hoje, nunca houve um caso em que a luta contra Drumak não tenha sido a mais difícil de todo o torneio. O deus menor usa todas as técnicas, truques e poderes a sua disposição, e poucos lutadores são capazes de fazer frente. Assim, é comum que o Guerreiro de Arton não chegue a sagrar-se Deus do Duelo, e o posto permaneça com o hospedeiro atual da divindade. Dizem que a atual Deusa do Duelo, a bárbara Drusilla, está desaparecida há muitos anos. Vários competidores do torneio têm como objetivo encontrá-la — por serem seus devotos ou apenas para poder desafiá-la!",
    "crencas": "Honrar duelos individuais. Aventurar-se. Aperfeiçoar a arte do combate. Participar do Torneio Deus do Duelo. Ir ao encontro do mais forte.",
    "simboloSagrado": "Duas espadas se cruzando.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [],
    "devotosClasses": [],
    "devotosNota": "Quaisquer “combatentes”. A critério do mestre, qualquer personagem que use o combate físico como tática principal pode ser convidado para o Torneio Deus do Duelo e, assim, também pode ser devoto de Drumak.",
    "obrigacoes": "Devotos de Drumak devem competir no Torneio Deus do Duelo e não podem interromper ou recusar lutas justas entre dois oponentes.",
    "poderConcedido": {
      "nome": "Um Contra Um",
      "texto": "Você pode gastar 2 PM para escolher um oponente em alcance curto e receber +2 em testes de ataque e rolagens de dano contra ele até o fim da cena. Se atacar outro oponente, o bônus termina. Se tiver a habilidade Duelo, em vez disso seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 18
  },
  {
    "id": "dunsark",
    "nome": "Dunsark",
    "epiteto": "Deus dos Mercenários",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Dunsark é um deus guerreiro, um combatente que carrega uma quantidade aparentemente infinita de armas pendendo de seu corpo, sempre interessado em lutar por dinheiro e arriscar-se por lucro. É o protetor das batalhas sem motivos pessoais, dos conflitos sem moralidade. Protege a noção de risco e ganho, a luta por puro interesse.\n\nReza a lenda que Dunsark foi um mercenário abençoado que já teve tanto ouro quanto os cofres de Sambúrdia e tantos itens mágicos quanto Arsenal. Seus devotos agarram-se a ele como uma esperança de riqueza e glória, anunciando seu nome após cada vitória em batalha, cada ataque bem-sucedido a um castelo, cada contrato lucrativo. Mesmo os mercenários que não acreditam na lenda contam suas histórias ao redor das fogueiras. Sua última grande vitória foi na Batalha de Tamu-ra, em 1405, onde Dunsark enfrentou a Tormenta e escapou para contar a história.\n\nApesar de ser viciado em risco e campeão de incontáveis guerras, sua aparência é comum. Soldados supersticiosos desconfiam que qualquer mercenário poderoso sem vínculos de lealdade possa ser Dunsark disfarçado, buscando um novo contrato, uma nova guerra. Durante a Guerra Artoniana, Dunsark foi “visto” inúmeras vezes. Talvez algumas dessas não sejam mera boataria de acampamento.",
    "crencas": "Lutar por dinheiro. Planejar e arriscar tudo por ouro, joias e espólios. Usar estratégias e técnicas superiores sempre. Colocar lucro acima de lealdade. Assumir grandes riscos por grandes recompensas.",
    "simboloSagrado": "Uma espada longa entre joias.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [
      "Goblin",
      "Lefou",
      "Osteon",
      "Suraggel",
      "Trog",
      "Gnoll",
      "Kobold",
      "Nezumi",
      "Orc"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Guerreiro",
      "Ladino",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Dunsark não podem recusar aventuras que envolvam uma recompensa em dinheiro e não podem aceitar aventuras que não tenham esse tipo de recompensa. Além disso, não podem ajudar alguém sem receber algo em troca e devem ajudar quem estiver disposto a pagar mais.",
    "poderConcedido": {
      "nome": "Armas e Espólios",
      "texto": "Você recebe uma proficiência a sua escolha entre armaduras pesadas, armas de fogo, armas marciais ou escudos. Se já tiver proficiência com armas marciais, pode escolher armas exóticas. Além disso, quando rolar um tesouro, como na tabela de Tesouro por Nível de Desafio (Tormenta20, p. 328), você pode rolar duas vezes para cada coluna apropriada e escolher entre os dois resultados."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 19,
    "_duvida": "Devotos completos conforme o livro; termos como 'Gnoll', 'Kobold', 'Nezumi' e 'Orc' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "elrophin",
    "nome": "Elrophin",
    "epiteto": "Deus da Vaidade",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Não se sabe muito sobre a origem de Elrophin. Alguns dizem que seria filho de Valkaria, e assim um semideus. Também correm histórias de que teria sido um grande bardo, um poderoso guerreiro, ou ambos. Também dizem que Elrophin foi um antigo sumo-sacerdote da Deusa da Ambição, atuante quando Arton Norte ainda não havia sido desbravada.\n\nAs histórias afirmam que Elrophin era tão seguro de si em tudo que fazia que aos poucos foi conquistando tudo que desejava: poderes, vitórias, domínios, amores. Sua lábia e autoconfiança eram lendárias. E assim foi crescendo e conquistando uma legião de admiradores e seguidores, até que acabou por se transformar em um deus menor. Talvez esse feito tenha recebido ajuda e bênção da própria Valkaria, que sempre admirou pessoas ambiciosas; outros pensam que Elrophin alcançou a divindade justamente por dar as costas a ela — pois a maior ambição (e a maior vaidade) seria não precisar nem mesmo dos deuses.\n\nMuitas lendas correm em torno deste deus — que, embora um tanto obscuro, não deixa de ser poderoso e influente.",
    "crencas": "Conhecer seu próprio valor e demonstrá-lo. Conquistar o que deseja através da lábia ou da força. Admirar-se e ser a maior prioridade de si mesmo.",
    "simboloSagrado": "Uma espada bastarda entre rosas.",
    "armaPreferida": "Espada bastarda.",
    "devotosRacas": [
      "Elfo",
      "Goblin",
      "Medusa",
      "Minotauro",
      "Qareen",
      "Suraggel",
      "Minauro",
      "Naidora",
      "Tabrachi"
    ],
    "devotosClasses": [
      "Bardo",
      "Bucaneiro",
      "Cavaleiro",
      "Guerreiro",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Elrophin devem pregar o quanto eles mesmos — e seu deus — são incríveis e convencer pessoas de seus feitos pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais). Em termos de jogo, uma ação exigindo um teste de Diplomacia com CD mínima 15 + metade do seu nível.",
    "poderConcedido": {
      "nome": "Vanglória",
      "texto": "Uma vez por cena, quando faz um teste de perícia, você pode gastar 1 PM para somar +1d6 como um bônus no teste. Se rolar o valor máximo nesse dado de bônus, role um segundo d6 e adicione ao resultado. Você não pode usar esta habilidade em testes de ataque."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 20,
    "_duvida": "Corrigido: 'Minauro' e 'Minotauro' são devotos distintos no texto original ('minauros' e 'minotauros'), antes fundidos incorretamente em 'Minotauro'; agora ambos constam. Devotos completos conforme o livro; termos como 'Minauro', 'Naidora' e 'Tabrachi' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "escamandra",
    "nome": "Escamandra",
    "epiteto": "Deusa da Permanência",
    "natureza": "mortal ascendido",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Antes de ser uma deusa, Escamandra foi uma grande líder entre as medusas, acolhendo aquelas que eram caçadas como monstros séculos atrás. Na Floresta dos Basiliscos, em certa área que passou a ser conhecida como Santuário das Estátuas Eternas, Escamandra criou um ambiente seguro para abrigar suas irmãs e, por esse feito, passou a ser adorada. Aos poucos, a área ao redor do Santuário passou a abrigar mais e mais “estátuas de pedra”, na verdade pretensos intrusos que eram petrificados por Escamandra antes que pudessem ameaçar suas protegidas. Para contribuir com os objetivos de sua deusa, as medusas devotas de Escamandra passaram a domesticar os basiliscos da região — e até mesmo outros lagartos enormes sem poderes de petrificação —, usando-os para reduzir as suspeitas sobre as frequentes transformações de visitantes da floresta em estátuas.\n\nA deusa Escamandra, uma medusa belíssima, de olhar fulminante e cabelos serpentinos cor de mármore, despreza invasores e envia seus devotos para atacar qualquer um que se aproxime demais de seu santuário — petrificando-os e transformando-os em mais das “estátuas eternas” que dão nome ao local. No entanto, há registros de pessoas que conseguiram dialogar com Escamandra e até mesmo se converteram à sua causa, passando a espalhar sua palavra por Arton.",
    "crencas": "Proteger as medusas e sua cultura. Proteger o Santuário das Estátuas Eternas e manter sua localização em sigilo, exceto de medusas em busca de abrigo. Lutar pela permanência e defender a imutabilidade.",
    "simboloSagrado": "Olhos de cobra em uma face de mármore.",
    "armaPreferida": "Arco curto.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Golem",
      "Medusa",
      "Osteon",
      "Centauro"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Caçador",
      "Cavaleiro",
      "Druida",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Escamandra não podem causar dano letal ou perda de PV a medusas, nagahs, trogs e outras criaturas relacionadas com cobras (fornecer bônus em dano letal contra elas também é proibido) a critério do mestre. Podem causar dano não letal e prejudicar essas criaturas (em termos de jogo, impondo condições), desde que não causem dano letal ou perda de PV. Além disso, não podem recusar pedidos de ajuda de medusas inocentes.",
    "poderConcedido": {
      "nome": "Olhar Atordoante",
      "texto": "Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se falhar, a criatura fica atordoada por 1 rodada (apenas uma vez por cena). Se você já tiver esta habilidade, em vez disso ela passa a afetar criaturas a sua escolha em alcance curto e a CD para resistir a ela aumenta em +2."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 19,
    "_duvida": "Devotos completos conforme o livro; 'Centauro' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "esmeralda",
    "nome": "Esmeralda",
    "epiteto": "Deusa das Joias",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Quando ainda era apenas humana, Esmeralda já atuava como uma excelente joalheira e ourives, procurada por especialistas em joias de todo o Reinado. Em meio à infindável batalha entre falsificadores de preciosidades e nobres exigentes, dizia-se que ninguém era mais confiável que Esmeralda para atestar a fidelidade de uma joia. Contudo, apesar de famosa, a ourives era misteriosa e enigmática; sabia que, se sua verdadeira identidade fosse descoberta por contrabandistas e falsificadores, sua vida estaria em risco.\n\nInevitavelmente, Esmeralda desapareceu e, na ausência de alguém igualmente competente, vários comerciantes e até mesmo nobres ergueram templos e passaram a orar por seu retorno — uma medida desesperada para evitar que suas joalherias fossem à falência, ou apenas para que não precisassem estar privados de suas obras. Aos poucos, as joias fabricadas enquanto Esmeralda estava desaparecida passaram a ser consideradas falsas, ou ao menos de qualidade inferior. Sem Esmeralda, nada podia ser realmente precioso. Todos desejavam a volta de Esmeralda que, inesperadamente, atendeu aos desejos daqueles que, a essa altura, já eram seus fiéis. Mas, quando retornou, não era mais a mesma.\n\nEla agora lembrava uma aristocrata humana, mas sua pele era feita de diamante e seus olhos eram gemas coloridas. Vendo nisso um sinal claro do significado transcendental da ourives, seus devotos passaram a espalhar sua palavra. Após seu retorno, podia haver mais uma vez joias “verdadeiras”.\n\nOs devotos de Esmeralda aprendem as nuances dos metais valiosos e pedras preciosas, reconhecem o valor potencial de gemas brutas e honram sua deusa usando ou fabricando as mais deslumbrantes joias. Contudo, desprezam de forma quase irracional as joias fabricadas durante o curto período em que ela esteve desaparecida. Para eles, peças dessa época infeliz são como itens malditos.",
    "crencas": "Fabricar joias. Identificar pedras preciosas. Usar as mais finas preciosidades. Exalar a nobreza. Exibir a riqueza dos minérios.",
    "simboloSagrado": "Um colar de ouro com um pingente de esmeralda.",
    "armaPreferida": "Picareta.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Qareen",
      "Sílfide"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro",
      "Inventor",
      "Ladino",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Esmeralda devem usar um item na forma de uma joia — que sempre será considerado um item vestido. A joia deve estar exposta. Se não estiver usando uma joia por motivo justificável (se for furtado ou preso, por exemplo), o devoto tem um dia para voltar a usar uma joia antes de descumprir estas Obrigações & Restrições.",
    "poderConcedido": {
      "nome": "Toque de Esmeralda",
      "texto": "Se fabricar um item que possa receber as melhorias banhado a ouro ou cravejado de joias, você pode gastar T$ 100 para aplicar uma dessas melhorias automaticamente, sem aumento na CD e sem que ela conte como uma melhoria. Sempre que você encontra uma riqueza aleatória (Tormenta20, p. 330), pode rolar duas vezes na tabela e escolher o melhor valor."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 19
  },
  {
    "id": "espada-deus",
    "nome": "A Espada-Deus",
    "epiteto": null,
    "natureza": "objeto desperto",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "A Espada-Deus é a obra-prima de Rhond (ele próprio o Deus das Armas), uma arma lendária que transcende seus portadores. Já esteve nas mãos de guerreiros valentes, heróis gloriosos, assassinos astutos e santos devotos, mas os nomes desses mortais se perderam no tempo — pois a espada é maior que qualquer um deles. Sempre que cumpria seu propósito, acabava esquecida em locais remotos, esperando por um novo destino. Podia estar presa em algum lugar de onde só seria tirada por um mortal digno. Ou no fundo de um lago, sendo entregue por uma náiade, ou cravada em uma pedra, selecionando quem pode arrancá-la.\n\nAlém de guerreiros de uma aldeia no antigo Reino de Yudennach, a Espada-Deus tem poucos devotos em estruturas organizadas, sendo adorada mais comumente por clérigos nômades que migram de batalha em batalha. A Espada-Deus não rege um portfólio definido. Em vez disso, ela apenas é adorada, é a ferramenta, a instigadora e a protagonista em inúmeras histórias de batalha e heroísmo. A última dessas foi a batalha em que Orion Drake liderou um exército de deuses menores para derrotar Crânio Negro e expulsar a Tormenta de Tamu-ra, conquistando a primeira vitória de Arton contra os lefeu. Até onde se sabe, a Espada-Deus ainda se encontra de posse do cavaleiro, mas a qualquer momento ela pode ser \"perdida\", para que seja encontrada por um novo campeão valoroso.",
    "crencas": "Estar pronto para cortar, perfurar e matar. Defender-se, defender aqueles que se ama, defender sua honra e orgulho. Estar sempre pronto para empunhar uma espada — e usá-la. Realizar grandes feitos. Provar-se digno.",
    "simboloSagrado": "Uma espada.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Minotauro"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Cavaleiro",
      "Guerreiro"
    ],
    "devotosNota": null,
    "obrigacoes": "As únicas armas empunhadas que o devoto da Espada-Deus pode usar são espadas. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com espada na rodada.",
    "poderConcedido": {
      "nome": "Espadachim Divino",
      "texto": "Você recebe +1 nas rolagens de dano e no multiplicador de crítico com espadas e, para você, todas as espadas marciais são armas simples."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 7
  },
  {
    "id": "garanaam",
    "nome": "Garanaam",
    "epiteto": "Deus das Charadas",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Um homem com traços de esfinge, que sempre falava em metáforas, enigmas e perguntas, Garanaam pregava que as respostas só poderiam ser obtidas vendo as coisas por outro ponto de vista e que as mais importantes verdades se escondem da obviedade. Ao mesmo tempo, ensinava a seus devotos que só aqueles capazes de pensar fora dos padrões comuns e ver o que não é evidente eram dignos de suas bênçãos.\n\nDiz-se que, apesar de um dia ter sido um mortal, Garanaam não guarda nenhuma semelhança com a pessoa que era antes de ascender. Sua aparência, sotaque, maneirismos e até mesmo seu nome teriam sido totalmente diferentes. De fato, talvez haja uma charada no próprio nome de Garanaam, além de um prêmio místico para quem for capaz de decifrá-la. Ao se tornar um deus menor, Garanaam virou ele mesmo uma charada, um enigma em forma de divindade.\n\nGaranaam foi recrutado por Orion Drake para o Exército de Deuses e lutou na Batalha de Tamu-ra. Contudo, diferente da maioria das divindades menores que participaram desse conflito, o Deus das Charadas não está morto! Ao entrar na área de Tormenta de Tamu-ra, Garanaam se deparou com os lefeu e enlouqueceu. Em sua mente surgia a charada suprema: o que são aquelas criaturas? Qual a forma real dos demônios da Tormenta, meramente traduzidos pelos cérebros artonianos em quelíceras e carapaças rubras? O Deus das Charadas agarrou as têmporas e caiu de joelhos, gargalhando insanamente.\n\nQuando a batalha acabou e a Tormenta foi sugada de volta para a Anticriação, Garanaam foi resgatado e levado de volta ao continente junto com os deuses feridos, mas carregava em sua mente a loucura que vivenciou. Hoje se veste com panos sujos e puídos. Seu cajado com a forma de um ponto de interrogação está quebrado. No entanto, suas charadas são ainda mais elaboradas: por trás de sua loucura, Garanaam mantém uma lógica em seus enigmas.",
    "crencas": "Testar a inteligência dos artonianos. Jogar com as palavras. Compreender significados. Propor enigmas. Esconder o que é óbvio.",
    "simboloSagrado": "Um ponto de interrogação.",
    "armaPreferida": "Bordão.",
    "devotosRacas": [
      "Goblin",
      "Kliren",
      "Qareen"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro",
      "Inventor",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Um devoto de Garanaam deve, pelo menos uma vez por cena, responder a uma pergunta com um enigma, uma charada ou um jogo de palavras que devem ser decifrados por quem perguntou.",
    "poderConcedido": {
      "nome": "Na Ponta da Língua",
      "texto": "Sempre que fizer um teste de Vontade para resistir a uma habilidade de uma criatura inteligente (Int –3 ou maior), você pode gastar 2 PM para propor uma charada a ela. Faça um teste de Enganação, oposto pelo Conhecimento ou Intuição da criatura. Se você vencer o teste, passa automaticamente no teste de Vontade. Caso contrário, faça o teste de Vontade normalmente."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 20
  },
  {
    "id": "garth",
    "nome": "Garth",
    "epiteto": "Deus da Pólvora",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "negativa",
    "lore": "Garth é um caso triste de um deus menor que odeia aquilo que governa. A maioria daqueles que usam armas de pólvora conhece a história de seu passado. Garth foi o pistoleiro mais sanguinário que já existiu.\n\nEra um bandido terrível, mas relutava em matar pessoas indefesas (embora tenha feito isso algumas vezes). Exceto por esses casos, se a morte fosse o caminho mais fácil ou eficiente, mesmo que desnecessário, Garth sempre escolhia-o e, assim, tornou-se temido e caçado nas infindáveis planícies de Petrynia, antes que esse território fizesse parte do Império de Tauron.\n\nContudo, pelo amor a uma mulher capaz de ver bondade dentro dele, Garth cansou da vida sem sentido e tentou se regenerar. Ambos se casaram, tiveram um filho e viveram em paz numa pequena fazenda por alguns anos, sem que Garth disparasse um único tiro. O temido pistoleiro passou a ver que as armas de fogo tinham sido uma prisão, uma maldição.\n\nInfelizmente, o destino tinha outros planos para ele. Um bando de pistoleiros surgiu na fazenda, aproveitando sua ausência. Roubaram todo o pouco dinheiro que a família possuía. Mataram sua mulher e filho. Ao chegar em casa, Garth não parou sequer para enterrar os cadáveres. Pegou as pistolas e saiu em busca dos assassinos, caçando-os um a um.\n\nSua alma voltou a endurecer e ele aceitou que nunca teria redenção verdadeira. Garth odiava suas pistolas, mas elas eram tudo que ele tinha. Sua história se espalhou, pistoleiros passaram a cultuá-lo e logo se tornou o Deus Menor da Pólvora. Como uma divindade, poderia trazer sua família de volta à vida — mas sabe ser tarde para isso. Suas mortes, e a jornada de vingança que ele empreendeu, transformaram-no. Hoje em dia, Garth existe apenas para espalhar mais morte, difundir a ciência letal das armas de pólvora que ele tanto odeia, com pistolas que nunca precisam ser recarregadas. Em seu coração, apenas ódio.",
    "crencas": "Matar. Matar rápido. Matar sempre. Jamais oferecer perdão ou rendição. Vingar-se de tudo e todos.",
    "simboloSagrado": "Uma pistola.",
    "armaPreferida": "Pistola.",
    "devotosRacas": [
      "Anão",
      "Goblin",
      "Kliren",
      "Osteon",
      "Hobgoblin",
      "Meio-Orc",
      "Minauro",
      "Sulfure"
    ],
    "devotosClasses": [
      "Bucaneiro",
      "Caçador",
      "Inventor",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Garth não podem poupar inimigos nem aceitar ou oferecer perdão. Além disso, devem se vingar (de forma letal, usando armas de pólvora) de qualquer um que os prejudique seriamente.",
    "poderConcedido": {
      "nome": "Pólvora Sagrada",
      "texto": "Você recebe proficiência com armas de fogo. Além disso, pode gastar 1 PM para abençoar até 10 balas. Até o fim da cena, estas balas fornecem +1 na margem de ameaça e +2 nas rolagens de dano (cumulativo com outros bônus de itens)."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 20,
    "_duvida": "Devotos completos conforme o livro; termos como 'Hobgoblin', 'Meio-Orc', 'Minauro' e 'Sulfure' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "goharom",
    "nome": "Goharom",
    "epiteto": "Deus dos Machados",
    "natureza": "mortal ascendido",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "Goharom era um dos deuses anões mais antigos e, à primeira vista, poderia ser confundido com um simples guerreiro da raça. Sua aparência não entregava a verdadeira natureza divina. Era um anão forte, de estatura impressionante, barbudo, sempre trajando armadura pesada e empunhando um imenso machado. Conta-se que, ocasionalmente, Goharom visitava Doherimm apenas para beber grandes quantidades de cerveja nas tavernas, e os outros frequentadores não percebiam estar na presença de um deus até notarem sua resistência fora do comum. Quando essas visitas terminavam, várias tavernas estavam sem estoque e a Guilda dos Cervejeiros precisava enviar carregamentos emergenciais.\n\nEm sua vida mortal, Goharom era um habilidoso armeiro e guerreiro anão, especializado no uso de machados. Sua devoção a Rhond, o Deus das Armas, era evidente, mas ele próprio passou a ser cultuado quando suas criações se mostraram incomparáveis, superando tudo que os anões conheciam. Goharom poderia ter se tornado grão-mestre da Guilda dos Armeiros ou até mesmo rei, se quisesse. Contudo, essa nunca foi sua ambição. Após transcender a mortalidade, deixou Doherimm para espalhar a paixão pelos machados por toda Arton.\n\nGoharom tinha uma ligação profunda com as armas que governava. Ao se concentrar, conseguia sentir e até visualizar qualquer criatura que empunhava um machado em Arton. Ele acreditava que o machado é uma arma essencialmente anã e seu uso propaga a cultura e estilo de vida dos anões. Isso se devia, em parte, à natureza do machado: uma arma que nunca é embainhada, está sempre pronta para ser usada. Contudo, nem mesmo seu poderoso machado pode protegê-lo da Tormenta, tendo seu fim nas mãos da tempestade rubra em 1405, na Batalha de Tamu-ra.",
    "crencas": "Forjar e usar os melhores machados. Honrar e proteger a raça, a cultura e as tradições anãs. Admirar machados como obras de arte, mas respeitá-los e usá-los como as ferramentas de trabalho ou guerra que são.",
    "simboloSagrado": "Um machado.",
    "armaPreferida": "Machado anão.",
    "devotosRacas": [
      "Anão",
      "Trog",
      "Galokk"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Cavaleiro",
      "Guerreiro",
      "Inventor"
    ],
    "devotosNota": null,
    "obrigacoes": "As únicas armas empunhadas que o devoto de Goharom pode usar são machados. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com machado na rodada.",
    "poderConcedido": {
      "nome": "Amor ao Machado",
      "texto": "Você pode gastar uma ação padrão e 3 PM para tocar um machado e colocar nele um encanto de arma a sua escolha. O encanto não pode ter pré-requisitos e dura até o fim da cena ou até você usar este poder novamente."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 21,
    "_duvida": "Devotos completos conforme o livro; 'Galokk' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "granto",
    "nome": "Granto",
    "epiteto": "Deus dos Escultores",
    "natureza": "mortal ascendido",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "Granto era um anão robusto e entroncado, cuja presença impunha respeito e admiração. Sua figura era uma verdadeira representação da força e resiliência da raça anã, com músculos visíveis sob a pele áspera e firme. Sua barba era longa e espessa, de um cinza profundo, cuidadosamente moldada em formas minuciosas que narravam a grandiosa história de seu povo. Cada mecha carregava símbolos e figuras que representavam feitos heroicos, batalhas épicas e lendas passadas, desde os primeiros dias de sua civilização até os eventos mais recentes que marcaram sua história.\n\nAs cicatrizes que atravessavam seu corpo tinham um caráter especial, pois, observadas mais de perto, revelavam formas surpreendentemente belas, como se cada uma fosse testemunho da resistência e coragem que o anão acumulou ao longo da vida. Granto, embora fosse um anão (e não um golem ou outro construto), era uma escultura viva, mais estátua do que gente.\n\nTudo que Granto tocava tinha o potencial de assumir uma forma bela, incluindo o que golpeava com seu estonteante martelo, fosse um objeto ou uma criatura. Até mesmo rachaduras em superfícies que ele martelava adquiriam formas artísticas. Mas, verdadeiro ao espírito anão de praticidade e utilitarismo, tudo que Granto fazia também tinha um propósito. Quando fez parte do Exército de Deuses de Orion Drake, Granto propôs construir uma imensa ponte do continente até Tamu-ra, para que não precisassem usar navios. E, quando esse plano foi rejeitado, Granto esculpiu os acrostólios que o general requisitou para adornar as proas das naus.\n\nGranto foi morto pelas forças lefeu durante a Batalha de Tamu-ra. No entanto, muitas de suas obras continuam adornando os salões de Doherimm, além de vários lugares da superfície.",
    "crencas": "Esculpir as mais belas obras de arte. Valorizar e pregar a importância do trabalho duro. Honrar e proteger a cultura e as tradições dos escultores. Unir estética e função.",
    "simboloSagrado": "Um cinzel e um martelo.",
    "armaPreferida": "Martelo leve (Heróis de Arton, p. 221).",
    "devotosRacas": [
      "Anão",
      "Golem",
      "Kliren",
      "Qareen"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Cavaleiro",
      "Guerreiro",
      "Inventor",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Granto devem fabricar ou consertar uma escultura (um item não consumível simples com preço de T$ 150 por patamar) pelo menos uma vez por aventura.",
    "poderConcedido": {
      "nome": "Âmago de Escultor",
      "texto": "Você paga 20% a menos em aposentos e mobílias de bases e construções de domínios. Além disso, pode construir um aposento ou construção acima do limite definido pelo tamanho da base ou nível do domínio."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 22
  },
  {
    "id": "gratissa",
    "nome": "Gratissa",
    "epiteto": "Deusa da Hospitalidade",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "positiva",
    "lore": "Outrora humana, Gratissa foi elevada à divindade por seu empenho em receber bem qualquer um que batesse à sua porta. Sua boa vontade comoveu criminosos, acolheu doentes e evitou conflitos, fazendo de sua imagem um símbolo de paz e aliança. A virtude, venerada por milhares de fiéis, rendeu-lhe a imortalidade.\n\nA história de Gratissa se confunde com a própria tradição da hospitalidade no Reinado. Alguns historiadores afirmam que, enquanto mortal, Gratissa foi a maior defensora dessa tradição. Sua família descendia de muitos povos nativos de Arton Norte e da Caravana dos Exilados. Assim, foram capazes de notar que essa tradição estava presente em diversas culturas, sendo algo inerente aos costumes humanos. Gratissa teria sido o produto de gerações de educação voltada à hospitalidade. Outros, contudo, afirmam que Gratissa deu origem a essa tradição! Ao receber as comitivas de dois lordes inimigos em sua casa durante uma tempestade, a anfitriã obrigou-os (com educação, simplicidade e palavras duras) a deixar de lado suas desavenças enquanto estivessem sob seu teto. O costume ancestral teria se espalhado a partir daí.\n\nAtualmente, a deusa menor perambula pelo mundo ensinando sobre hospitalidade. Imagens suas podem ser encontradas na entrada de estalagens e residências, um culto ao bom anfitrião. Além disso, viajantes, aventureiros e caravaneiros também aprendem e utilizam as práticas do bom anfitrião mesmo em acampamentos. Assim, não é incomum encontrar na estrada grupos muito hospitaleiros e dispostos a oferecer um lugar em suas fogueiras. Na verdade, os devotos de Gratissa afirmam que, no instante em que um grupo de viajantes qualquer prepara uma fogueira e ergue tendas, tem obrigação de acolher qualquer um que peça por sua hospitalidade. Da mesma forma, o acampamento deve ser considerado sua casa e respeitado. A tradição da hospitalidade deve ser preservada, e aqueles que a contrariam não passam de selvagens.\n\nEntre as muitas aparências que Gratissa adota, a que mais se destaca é a de uma mulher humana com vestes aconchegantes, olhar convidativo e palavras que acalmam a mente e o coração. Sua chegada em qualquer local é capaz de apaziguar os ânimos e promover convivência pacífica, pelo menos enquanto dois ou mais lados em conflito estiverem sob o mesmo teto.",
    "crencas": "Servir bem a todos os que buscam descanso. Pregar o cuidado. Acolher outros da melhor maneira possível. Praticar e ensinar a tradição da hospitalidade.",
    "simboloSagrado": "Uma lareira.",
    "armaPreferida": "Não há. Devotos desta deusa não podem lançar a magia Arma Espiritual e similares.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Hynne",
      "Minotauro",
      "Qareen",
      "Centauro"
    ],
    "devotosClasses": [
      "Bardo",
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Gratissa não podem causar dano, perda de PV e condições (exceto enfeitiçado, fascinado e pasmo) a criaturas inteligentes (Int –3 ou maior) que estejam convivendo, hospedadas ou sendo recebidas no mesmo local (como fregueses em uma taverna ou membros de uma caravana), nem podem fornecer bônus em dano contra essas criaturas. Além disso, não podem recusar hospitalidade a ninguém.",
    "poderConcedido": {
      "nome": "Igual ao Lar",
      "texto": "Uma vez por dia, você pode gastar alguns minutos para transformar um espaço de descanso em um lar provisório por um dia. Todas as criaturas que descansarem nesse local aumentam sua recuperação de PV ou PM em +1 por nível (a escolha da criatura) e, enquanto estiverem nesse lar, recebem +1 em testes de perícias."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 23,
    "_duvida": "Devotos completos conforme o livro; 'Centauro' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "hippion",
    "nome": "Hippion",
    "epiteto": "Deus dos Cavalos",
    "natureza": "mortal ascendido",
    "statusDivino": 4,
    "energia": "positiva",
    "lore": "Hippion é um dos poucos deuses menores cultuados como divindade principal de uma nação inteira no Reinado. Em Namalkah, ele é mais venerado até mesmo que Allihanna e Valkaria. Quando os primeiros colonos vindos do continente sul chegaram ao reino, seu contato com o povo nativo que vivia lá foi relativamente pacífico — daí surgiu boa parte da cultura de tropeiros e nomadismo de Namalkah, inspirada nos centauros. E os povos nativos dessa região já cultuavam o senhor de todos os cavalos, chamado Hippion.\n\nA origem do culto a Hippion se perde no tempo; ninguém sabe quando ele começou a ser cultuado, apenas que sua religião (chamada “culto hippionte”) sempre pareceu fazer parte da cultura local. Hippion era venerado pelos centauros (e também por cavalos inteligentes) antes que o primeiro humano pisasse nas terras que viriam a ser Namalkah. Diz a tradição que Hippion era um cavalo imortal mesmo antes de se tornar um deus, tendo servido como montaria ou líder para incontáveis heróis durante a história dos povos originais das coxilhas. Hippion era a única constante em todas essas histórias tradicionais. A conclusão era simples: guerreiros, tanto centauros quanto bípedes, surgiam e desapareciam, mas o cavalo era eterno.\n\nQuando a Caravana dos Exilados chegou a Arton Norte, um dos primeiros povos a fazer contato pacífico com os refugiados foram as Amazonas de Hippion, em uma peregrinação periódica para a estátua de Valkaria. A rainha amazona se casou com o líder da caravana, formando uma tradição de ajuda mútua que perdura até hoje. Assim, Hippion é um dos deuses menores mais influentes em toda a história do mundo conhecido.\n\nA devoção a Hippion nunca diminuiu em Namalkah com a integração de povos nativos e exilados de Lamnor apenas aumentou. Os habitantes do reino (especialmente ginetes e tropeiros) consideram-no sua principal divindade. Como é o modo de Namalkah, às vezes chamam-no por apelidos grosseiros mas afetuosos (“o bagual eterno”). Diz-se que Hippion muitas vezes galopa incógnito, deixando-se ser montado apenas pelos maiores heróis — sempre em pelo, nunca admitindo uma sela.\n\nContudo, também é possível identificá-lo: sua presença provoca vontade de correr pelas planícies, mesmo nos bípedes, e ele é seguido por um enorme bando de corcéis. Outros cavalos parecem potros perto de seu tamanho. Seu pelo é castanho e branco, sua crina é longa, espalhando-se em todas as direções. Hippion é capaz de falar e encarna tudo aquilo que os cavalos são: fortes, rápidos, selvagens, leais. Hippion, assim como a maioria dos humanos e cavalos em Namalkah, acredita que cada coisa tem seu lugar: o cavalo deve ser montado e o cavaleiro deve montar. O cavalo deve carregar seu companheiro em batalha, o cavaleiro deve lutar. Um não deve tentar assumir o papel do outro.",
    "crencas": "Reverenciar Hippion e respeitar os cavalos. Defender o vínculo e promover a harmonia entre montarias e ginetes. Combater monstros, mortos-vivos e outras criaturas que perturbam o equilíbrio natural. Galopar.",
    "simboloSagrado": "Um cavalo galopando.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Aggelus",
      "Centauro",
      "Eiradaan"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Cavaleiro",
      "Druida",
      "Guerreiro",
      "Nobre",
      "Treinador",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Hippion jamais podem matar cavalos, nem mesmo suas variantes monstruosas (como cavalos glaciais). Além disso, não podem permitir que cavalos sejam assassinados ou maltratados. Também nunca podem usar selas ou outros equipamentos de montaria enquanto estiverem montados.",
    "poderConcedido": {
      "nome": "Ginete Altivo",
      "texto": "Enquanto está montado sobre um cavalo, você recebe +2 em testes de ataque e em Cavalgar. Além disso, você passa automaticamente em testes de Cavalgar para não cair do cavalo quando sofre dano e não sofre penalidades para atacar à distância ou lançar magias quando montado em cavalos. Este poder conta como o poder Ginete para efeitos de pré-requisitos de outras habilidades. Se você é um centauro, os benefícios deste poder mudam para: você pode fazer investidas em terreno difícil e não sofre a penalidade de –2 na Defesa por fazer uma investida. Por fim, recebe +2 nas rolagens de dano com armas em investidas."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 24,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus', 'Centauro', 'Eiradaan' (raças) e 'Treinador' (classe) ainda não têm correspondente no site, ficam nos arrays pra quando forem adicionados."
  },
  {
    "id": "hurlaagh",
    "nome": "Hurlaagh",
    "epiteto": "Deus dos Hobgoblins",
    "natureza": "entidade primordial",
    "statusDivino": 3,
    "energia": "negativa",
    "lore": "Um hobgoblin imponente, com ares de nobreza e sempre trajado com roupas militares, Hurlaagh representa o auge da cultura militarista que ele mesmo ajudou a forjar. Ninguém sabe sua origem, mas era parte de um trio de entidades irmãs de guerra, conflito, violência e brutalidade — deuses menores antes mesmo que houvesse alguém para cultuá-los. Seus dois irmãos eram Ragnar, que mais tarde ascendeu a Deus da Morte, e Graolak. Cada um dos três criou uma raça mortal que encarnava seus valores e sua personalidade. Ragnar deu origem aos bugbears. Graolak fez os goblins. Hurlaagh forjou os hobgoblins.\n\nOs hobgoblins, embora por muito tempo tenham sido considerados meros monstros por grande parte dos povos do norte, são uma raça muito mais antiga que a humanidade (precedendo-a em dezenas de milhares de anos!). De fato, talvez sejam a primeira raça de Lamnor a estabelecer fronteiras e tomar terras como “suas”. Pela influência de Hurlaagh, os hobgoblins seriam os conquistadores e donos por direito de grande parte do continente.\n\nCuriosamente, o culto a Hurlaagh aumentou em fervor e intensidade com a chegada dos elfos a Lamnor. Com o início da Infinita Guerra, um inimigo poderoso fez com que os hobgoblins se unissem ainda mais sob seu deus. A influência de Hurlaagh em Lamnor só diminuiu significativamente quando seu irmão Ragnar ascendeu a deus maior, dando início a um plano que o tornou a divindade principal de todos os povos goblinoides. Hurlaagh então travou uma aliança com um grupo de deuses menores que buscava destronar o Deus da Morte dos Goblinoides, para que um deles ocupasse seu posto. Diz-se que, antes da queda de Khalifor, alguns de seus cultistas estavam infiltrados no exército de Thwor, com a intenção de provocar um levante. No entanto, foram descobertos e detidos por Gaardalok, o sumo-sacerdote de Ragnar, que os desmantelou utilizando espiões de Khalifor.\n\nA queda da Flecha de Fogo frustrou todos os planos de Hurlaagh. Ninguém sabe ao certo se sua aliança de deuses menores ainda existe ou desistiu de sua tentativa de tomar o posto de Thwor.\n\nEmbora ainda seja adorado por algumas comunidades hobgoblins espalhadas pelo sul de Arton, há muito tempo Hurlaagh não lidera batalhões hobgoblins em campanhas militares ou incursões de guerra. O Deus dos Hobgoblins permanece uma figura distante da linha de frente das batalhas que tanto definiram seu passado.",
    "crencas": "Promover a guerra e o conflito. Vencer a qualquer custo, por força ou estratégia. Jamais oferecer ou aceitar rendição. Jamais demonstrar fraquezas. Proteger a cultura e o modo de vida hobgoblin a qualquer custo.",
    "simboloSagrado": "Tambor de guerra hobgoblin.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [
      "Goblin",
      "Minotauro",
      "Hobgoblin",
      "Orc"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Cavaleiro",
      "Guerreiro"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Hurlaagh jamais podem desobedecer à ordem de um superior (devoto de Hurlaagh de nível maior ou hobgoblin de patente militar superior). Além disso, devem lutar contra “o Mundo Como Deve Ser” proposto por Thwor.",
    "poderConcedido": {
      "nome": "Selvageria Marcial",
      "texto": "Você pode usar Sobrevivência no lugar de Guerra. Além disso, se passar em um teste para analisar terreno, além das vantagens descobertas, você fornece um bônus de +1 em testes de ataque e rolagens de dano de seus aliados em alcance curto até o fim da cena."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 25,
    "_duvida": "Devotos completos conforme o livro; 'Hobgoblin' e 'Orc' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "hydora",
    "nome": "Hydora",
    "epiteto": "Dragão-Rei das Nuvens",
    "natureza": "dragão-real",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "Encarnação das tempestades, Hydora é um dos mais poderosos Dragões-Reais de Arton, superado apenas por Tarso e Sckhar e equiparando-se a Benthos. Isso explicaria como uma criatura tão instável conseguiu sobreviver por tanto tempo. Marcial e guerreiro como todos os dragões do ar, Hydora também tem humor volúvel como os raios e trovões. Muitas vezes já negou coisas que havia proferido, quebrou promessas, não reconheceu aliados e apoiou antigos inimigos. Uma promessa feita por Hydora é tão sólida quanto uma bolha de sabão.\n\nEspecula-se que o Dragão-Rei das Nuvens tenha transcendido a necessidade de pisar em terra firme. Voa durante a maior parte do tempo, sem parar para descansar, comer ou dormir. Tem forte predileção por tempestades elétricas: gosta de voar através das nuvens carregadas como quem aprecia a brisa da manhã. Em Arton, costuma-se dizer que, quando cai uma tempestade, Hydora está por perto.\n\nHydora também é criador de todo um povo: de sua união com uma heroína élfica surgiram os naidora, também chamados de elfos-do-céu. Existem versões da história que dizem que o Dragão-Rei raptou a elfa, mas ninguém até hoje foi capaz de determinar se isso é verdade. Conhecendo-se a inconstância de Hydora, talvez ele alterne entre amor genuíno e tirania.\n\nSua forma humanoide lembra um naidora com belíssimas asas que mudam conforme seu humor, pele clara e cabelos azuis longos e esvoaçantes. Sua forma dracônica tem corpo longo e asas que misturam aspectos de morcegos e pássaros; uma coroa de penas circunda sua cabeça, criando algo parecido com uma juba. Em ambas as formas Hydora tem olhos em tons diferentes de azul — um mais claro que o outro.",
    "crencas": "Reverenciar a altivez de Hydora. Reverenciar os céus, o vento e a liberdade. Jamais ceder ao conformismo. Evitar descer dos céus. Promover o progresso e a inventividade. Agir conforme os próprios instintos, jamais deixando-se influenciar pelos outros.",
    "simboloSagrado": "Uma nuvem negra em forma de asa cuspindo três raios.",
    "armaPreferida": "Cimitarra.",
    "devotosRacas": [
      "Elfo",
      "Kliren",
      "Qareen",
      "Sílfide",
      "Suraggel",
      "Kallyanach",
      "Naidora",
      "Tengu"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Caçador",
      "Cavaleiro",
      "Guerreiro",
      "Inventor"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Hydora devem ser inquietos e inconstantes como os ventos, proibidos de passar mais de um dia com os pés no chão — escalar uma montanha ou voar por uma rodada é suficiente para agradar ao Dragão-Rei. Além disso, não podem fixar moradia exceto em local mais próximo dos céus do que da terra.",
    "poderConcedido": {
      "nome": "Alcançar os Céus",
      "texto": "Você pode gastar uma quantidade de PM limitada por sua Sabedoria (mínimo de 1) para receber deslocamento de voo até o fim do seu turno. Esse deslocamento é igual a 12m, +3m para cada PM gasto além do primeiro."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 26,
    "_duvida": "Devotos completos conforme o livro; 'Kallyanach', 'Naidora' e 'Tengu' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "inghlblhpholtsgt",
    "nome": "Inghlblhpholtsgt",
    "epiteto": "a Grande Divindade Anfíbia",
    "natureza": "entidade primordial",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Esta divindade menor possui um nome impronunciável para a maioria dos mortais, sendo conhecida como o Grande Deus Sapo entre os povos tabrachi. Nos antigos murais, é retratado como o primeiro ser marinho a pisar em terra firme, parte das criaturas que atenderam ao chamado de Allihanna, a Mãe Natureza, para deixar as profundezas oceânicas e migrar para o continente. Outras retratações históricas o descrevem como uma das inúmeras crias de Megalokk, o Deus dos Monstros. Existem até relatos afirmando que sua semente veio do éter divino, entre os mundos, precedendo a própria existência da vida em Arton.\n\nO templo mais conhecido dedicado a esta divindade encontra-se no Pântano dos Juncos, em Deheon. O local é protegido por uma criatura chamada catoblepas, capaz de transformar qualquer criatura em um ser batráquio com um simples olhar. Diz-se que essa habilidade do monstro sagrado é responsável por aumentar lentamente, mas de forma constante, a população tabrachi na região, que vem crescendo desde os primeiros tempos de ocupação do continente norte.\n\nNão se sabe ao certo quais são as intenções de Inghlblhpholtsgt. Existem rumores sobre uma antiga profecia que fala de uma inundação em escala mundial, que transformará todas as terras de Arton em pântanos. Mas, como o culto à Grande Divindade Anfíbia não é especialmente organizado, nem possui grandes registros, isso pode ser apenas um boato.\n\nOs locais de adoração a Inghlblhpholstgt podem ser meros vestígios de uma era em que pântanos dominavam os continentes e libélulas gigantes voavam pelos céus, ou talvez o deus busque espalhar sua bênção anfíbia por todo o mundo. O fato é: mesmo após milênios, sua presença ainda persiste.",
    "crencas": "Reverenciar Inghlblhpholstgt. Proteger o povo-sapo e os demais anfíbios. Pregar a evolução e a transformação do mundo em um grande pântano. Auxiliar a vinda do grande dilúvio profetizado eras atrás.",
    "simboloSagrado": "Um sapo sobre uma pirâmide.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Dahllan",
      "Goblin",
      "Lefou",
      "Sereia/Tritão",
      "Trog",
      "Tabrachi"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Caçador",
      "Druida",
      "Ladino",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Inghlblhpholstgt devem espalhar sua fé com afinco, angariando pelo menos um novo devoto por mês. Além disso, devem ajudar e proteger criaturas anfíbias, desde que isso não prejudique seus aliados.",
    "poderConcedido": {
      "nome": "Salto Anurídeo",
      "texto": "Você pode gastar uma ação de movimento e 2 PM para saltar 9m em qualquer direção. Se terminar o salto em alcance corpo a corpo de uma criatura e atacá-la no mesmo turno, você recebe os benefícios e as penalidades de uma investida e sua arma causa um dado extra de dano do mesmo tipo durante esse ataque. Você pode aprender Primor Atlético como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 29,
    "_duvida": "O livro grafa o nome de duas formas em pontos diferentes do texto: 'Inghlblhpholstgt' e 'Inghlblhpholtsgt'; o id usa a forma 'inghlblhpholtsgt' para bater com um NPC já existente em outro arquivo do site. Devotos completos conforme o livro; 'Tabrachi' (raça) e 'Treinador' (classe) ainda não têm correspondente no site, ficam nos arrays pra quando forem adicionados."
  },
  {
    "id": "irione",
    "nome": "Irione",
    "epiteto": "Deus da Sedução",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Irione é uma entidade que levou suas habilidades ao extremo, alcançando a divindade como resultado desse processo. Originalmente, ele era um duplo — uma criatura humanoide sem características fixas, capaz de assumir qualquer forma. Normalmente, os duplos se infiltram nas sociedades, assassinando humanos e membros de outras raças civilizadas. No entanto, Irione logo percebeu que seu maior poder estava na sedução. Ao adotar diversas formas, experimentou o prazer de ser adorado, de ver homens e mulheres se atirando aos seus pés. Essa experiência se tornou viciante e Irione passou a buscar cada vez mais pretendentes. O próximo passo natural foi alcançar a divindade.\n\nIrione tem a habilidade de se transformar na figura que mais seduz cada pessoa. Sua transformação não é física, como os duplos, mas acontece na mente de quem o observa. Por isso, ao enxergá-lo, dois indivíduos podem ver, ouvir e até sentir coisas completamente diferentes ao mesmo tempo. Por exemplo, para Orion Drake, Irione parecia sua esposa Vanessa.\n\nOutra habilidade surpreendente de Irione é sua capacidade de se tornar inalcançável. Pessoas de todas as origens e modos de vida se veem seduzidas por ele, tentando alcançar sua presença para oferecer presentes e devoção, mas Irione sempre permanece distante, como se estivesse na próxima esquina ou um andar acima. Contudo, ele é uma divindade obcecada por atenção e mimos. Acostumado a seduzir, não tolera ser ignorado. A única maneira de convencê-lo a fazer algo que não seja para seu próprio benefício é justamente não lhe dar atenção ou importância. Nesse caso, Irione fará de tudo para conquistar seus alvos.",
    "crencas": "Provar seu valor, tornando-se alvo de desejo. Seduzir os outros para obter favores e adulações. Gerar suspiros de pretendentes. Tornar-se inalcançável para que todos venham atrás de você.",
    "simboloSagrado": "Marca de beijo.",
    "armaPreferida": "Chicote.",
    "devotosRacas": [
      "Elfo",
      "Medusa",
      "Sereia/Tritão",
      "Sílfide",
      "Suraggel",
      "Harpia",
      "Nagah",
      "Naidora"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro",
      "Ladino",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Irione devem obter a adoração de uma pessoa que originalmente não era prestativa, pelo menos uma vez por aventura (ou por mês, o que demorar menos), como forma de honrar sua divindade. Isso significa tornar um NPC prestativo e, após isso, tornar-se objeto da admiração e adoração desse personagem.",
    "poderConcedido": {
      "nome": "Fisgar Corações",
      "texto": "Você aprende e pode lançar a magia Enfeitiçar (atributo-chave Carisma) usando apenas concentração, sem necessidade de gestos ou palavras (como se sob efeito do poder Magia Discreta). Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 30,
    "_duvida": "Devotos completos conforme o livro; 'Harpia', 'Nagah' e 'Naidora' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "jandra",
    "nome": "Jandra",
    "epiteto": "Deusa das Boas Maneiras",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Uma dama de elegância impressionante, quase sempre ostentando penteado alto e vestido sofisticado, adornado com joias, Jandra é uma divindade que exala comedimento, altivez e requinte. Sua presença imponente é tamanha que poucos conseguem imaginar que, no passado, foi uma simples governanta.\n\nQuando era mortal, Jandra se dedicou a ensinar jovens nobres, criados e até plebeus sobre o comportamento adequado diante das pessoas de alta posição. Assim, criou uma verdadeira escola de boas maneiras e etiqueta. Boa parte de suas “regras” podia parecer arbitrária, mas quase todas tinham um fundo prático — destinavam-se a garantir que ninguém consumisse comida estragada, conferir se nenhum conviva trazia armas a uma reunião social, impedir a ativação de maldições…\n\nApós anos de ensino em um único local — uma mansão no antigo condado de Portsmouth — ela decidiu partir e viajar por todo o Reinado, espalhando seus conhecimentos de etiqueta a todos. Graças aos seus esforços, incontáveis conflitos foram evitados, pois as pessoas sabiam como se portar. Muitos notavam que, ainda que não soubessem a razão de todas as normas de etiqueta, sentiam estar dando importância a um evento (e às pessoas presentes) apenas por segui-las. Isso começou a adquirir um componente ritualístico, sagrado. Todos eram muito gratos e oravam por Jandra, até que tanta adoração foi suficiente para torná-la uma deusa.\n\nHoje, Jandra segue percorrendo Arton, sendo uma convidada de honra em bailes e jantares — principalmente onde decisões importantes de cortes serão tomadas —, conquistando ainda mais seguidores ao ensinar os mortais sobre o valor das boas maneiras. Ao seguir certos padrões de comportamento, todos estão honrando a si mesmos, seus convivas… e a Deusa das Boas Maneiras.",
    "crencas": "Ensinar boas maneiras. Julgar a etiqueta dos presentes em ocasiões formais. Educar futuros aristocratas sobre as formas corretas de se portar entre os nobres. Ensinar servos a cumprir seu dever de maneira elegante e ao mesmo tempo imperceptível. Tratar cada convidado como o mais importante de um evento.",
    "simboloSagrado": "Uma xícara.",
    "armaPreferida": "Adaga.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Golem",
      "Hynne",
      "Minotauro",
      "Aggelus"
    ],
    "devotosClasses": [
      "Bardo",
      "Cavaleiro",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Jandra nunca deixam de fazer testes de Diplomacia ou Nobreza quando isso é socialmente adequado. Além disso, não suportam falta de modos e desconhecimento de etiqueta; quando presencia uma falha em um teste de Diplomacia ou Nobreza, o devoto deve corrigir a pessoa que falhou (em termos de jogo, deve passar em um teste da perícia apropriada com a mesma CD, enquanto explica de forma discreta e elegante onde ela errou).",
    "poderConcedido": {
      "nome": "Etiqueta A Toda Hora",
      "texto": "Uma vez por cena, você pode gastar uma ação de movimento e 1 PM para fazer um teste de Nobreza para ajudar. Cada aliado em alcance curto pode usar o bônus de ajuda fornecido por este teste em um de seus testes de perícia feito até o fim da cena."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 31,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus' ainda não tem raça correspondente no site, fica no array pra quando for adicionada. O termo 'golens' foi mantido como variante gráfica de 'Golem'."
  },
  {
    "id": "klangor",
    "nome": "Klangor",
    "epiteto": "Deus das Armaduras",
    "natureza": "mortal ascendido",
    "statusDivino": 4,
    "energia": "positiva",
    "lore": "Klangor se destaca entre as várias divindades anãs como uma figura imponente e admirada. Ele não é apenas um deus de metais, mas um verdadeiro símbolo de resistência e resiliência. Seu corpo, recoberto por uma couraça de pedra e metal, desperta o temor e a admiração dos que o contemplam. É difícil discernir se essa armadura é uma construção criada pelo próprio Klangor ou se faz parte intrínseca de seu ser, um mistério que apenas ele pode responder.\n\nSua origem está nos primórdios de Doherimm. Klangor foi um dos primeiros membros da Guilda dos Armeiros do Reino dos Anões, responsável por muitas das inovações que há séculos fazem parte da arte tradicional da fabricação de armaduras entre essa raça. Contudo, ao longo dos séculos as técnicas de Klangor se tornaram tão precisas e intrincadas que ele não era mais capaz de ensiná-las a ninguém. Suas armaduras eram mais fortes que o aço, mas leves como seda. Assim, o ferreiro deixou de ser apenas um mestre e passou a ser considerado uma figura mítica, ainda em vida. Passou a ser cultuado e se tornou um deus.\n\nEm 1405, a resiliência de Klangor foi testada nas chamas da batalha mais sangrenta que já presenciou. Como sobrevivente do ataque devastador do exército de deuses menores à área de Tormenta de Tamu-ra, o Deus das Armaduras suportou os horrores dessa cataclísmica invasão que matou vários de seus companheiros. A batalha deixou cicatrizes profundas no mundo, mas Klangor se ergueu das cinzas.\n\nApós a batalha, o deus menor se dedica a um propósito nobre e altruísta: forjar armaduras metafísicas para aqueles que enfrentam as forças malignas que assolam Arton. Ele pode ser encontrado tanto no subterrâneo quanto na superfície, fabricando suas obras-primas para guerreiros valorosos.",
    "crencas": "Forjar as melhores armaduras. Honrar e proteger a raça, a cultura e as tradições anãs. Defender a vida de guerreiros e soldados, dando-lhes as ferramentas para se protegerem.",
    "simboloSagrado": "Um elmo anão.",
    "armaPreferida": "Martelo de guerra.",
    "devotosRacas": [
      "Anão",
      "Aggelus"
    ],
    "devotosClasses": [
      "Cavaleiro",
      "Guerreiro",
      "Inventor",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Klangor devem passar pelo menos uma hora por dia limpando, consertando ou polindo uma armadura, ou treinando enquanto trajam uma armadura. Além disso, pelo menos uma vez por aventura o devoto deve fabricar uma armadura qualquer.",
    "poderConcedido": {
      "nome": "Manutenção Sagrada",
      "texto": "Uma vez por dia, você pode gastar 10 minutos ajustando sua própria armadura. Faça um teste de Ofício (armeiro) para ajudar. Enquanto estiver trajando esta armadura, você recebe um bônus na Defesa igual ao bônus de ajuda fornecido pelo teste. Entretanto, a cada vez que você for atingido por um ataque, esse bônus diminui em 1 (até um mínimo de 0)."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 31,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "kurur-lianth",
    "nome": "Kurur Lianth",
    "epiteto": "Deus Vulcão de Khubar",
    "natureza": "objeto desperto",
    "statusDivino": 1,
    "energia": "negativa",
    "lore": "Muitas lendas cercam Kurur Lianth, o maior e mais temido vulcão ativo de Khubar, o Reino Arquipélago. Localizado no coração da ilha de Hurtka, a mais próxima da costa de Bielefeld, Kurur Lianth é uma força da natureza cuja fúria não pode ser ignorada. Este vulcão expele fogo e explosões durante intensos períodos de uma semana ou mais, antes de se acalmar temporariamente, repousando por alguns meses.\n\nÉ dito, nas histórias antigas, que a única maneira de acalmar o “Velho Furioso”, como é chamado por seus devotos, é através de um sacrifício humanoide voluntário, realizado quando o vulcão desperta de seu sono. Caso contrário, Kurur Lianth tomará todas as vidas que julgar necessárias.\n\nAlgumas lendas atribuem essa necessidade de sacrifícios ao fato de que, no interior do vulcão, está aprisionado um antigo deus menor do fogo, derrotado por Thyatis em tempos imemoriais. Cada vez que o vulcão entra em erupção, acredita-se que o deus aprisionado desperta, provocando as explosões cataclísmicas que ameaçam a terra. Outras histórias sugerem que a cratera de Kurur Lianth é, na verdade, a bocarra de um monstruoso dragão do fogo, cuja magnitude colossal o impede de escapar do interior da terra, forçando-o a liberar sua fúria nas erupções. Seja qual for a verdadeira origem dessas lendas, o fato permanece: o vulcão é tratado como uma entidade viva, consciente. Com o passar dos séculos, os sacrifícios oferecidos ao vulcão fizeram com que ele fosse considerado algo sagrado, o que provocou sua ascensão a deus menor. Para seus seguidores, Kurur Lianth não é apenas um agente de destruição, mas uma divindade que protege a terra contra males ainda maiores, previstos para surgir em Khubar no futuro.",
    "crencas": "Cultuar o Velho Furioso. Proteger o povo da ilha de Hurtka e de Khubar em geral. Pregar a renovação que Kurur Lianth traz e a proteção que ele fará contra o grande mal descrito nas antigas profecias.",
    "simboloSagrado": "Um vulcão em erupção.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Qareen",
      "Suraggel",
      "Trog"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bardo",
      "Druida",
      "Guerreiro",
      "Lutador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Kurur Lianth devem se reunir com seu deus uma vez por ano para sacrificar um humanoide voluntário. Na ausência de um voluntário, o devoto mais velho deve se oferecer de imediato. Se não o fizer, deixa de ser um devoto imediatamente e seu destino como sacrifício passa para outro devoto mais velho.",
    "poderConcedido": {
      "nome": "Alma em Erupção",
      "texto": "Você recebe redução de fogo 10 e, quando causa dano, pode perder 2 pontos de vida (exceto PV temporários) para causar +1d8 pontos de dano de fogo."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 32
  },
  {
    "id": "laan",
    "nome": "Laan",
    "epiteto": "Deus das Viagens",
    "natureza": "entidade primordial",
    "statusDivino": 3,
    "energia": "positiva",
    "lore": "Talvez o deus menor mais antigo de que se tem notícia, Laan é um deus tão ancestral que parece sempre ter existido. Alguns especulam que nasceu numa era muito primordial de Arton, quando conceitos como “raças” ainda não eram tão definidos, e criaturas únicas surgiam e desapareciam de tempos em tempos. Alguns teólogos afirmam que Laan surgiu logo após as primeiras criaturas vivas deixarem os oceanos, impulsionadas por Allihanna — essa jornada primordial teria provocado o surgimento do deus. Assim, embora segundo essa hipótese não tenha “sempre existido”, Laan ainda seria mais velho do que quase qualquer outra coisa em Arton.\n\nLaan é um deus menor inquieto e curioso, em constante movimento. Governa não apenas as viagens, mas os viajantes e o próprio conceito de deslocamento de um lugar a outro. Também tem influência sobre comunicação e mensageiros. De alguma forma, Laan parece ter domínio sobre todos os tipos de jornadas — desde a viagem de Azgher pelos céus todos os dias até a passagem das almas de Arton aos reinos dos deuses após a morte. Seu propósito é desbravar novos terrenos, espalhar a necessidade de migração entre as criaturas. Laan nunca está onde as pessoas estão paradas, e ninguém nunca permanece parado após sua passagem.\n\nO Deus Menor das Viagens possui a estranha capacidade de abrir uma “estrada reta” à sua frente — um caminho que ignora todos os tipos de obstáculos físicos, por onde os viajantes progridem com muito mais rapidez, sem necessidade de paradas. Fisicamente, é um homem alto, largo e musculoso, com voz ribombante e risada monumental. Veste uma toga solta, uma tiara dourada e não usa sapatos, enfrentando o chão com seus enormes pés descalços.",
    "crencas": "Viajar. Deslocar-se de um lugar a outro. Explorar. Conhecer o mundo. Descobrir novos locais. Entregar mensagens. Levar pessoas e objetos até onde são necessários.",
    "simboloSagrado": "Uma estrada que se perde no horizonte.",
    "armaPreferida": "Bordão.",
    "devotosRacas": [
      "Goblin",
      "Golem",
      "Kliren",
      "Lefou",
      "Naidora"
    ],
    "devotosClasses": [
      "Bardo",
      "Bucaneiro",
      "Caçador",
      "Guerreiro",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Laan são proibidos de fixar moradia, não podendo permanecer mais de 1d10+10 dias na mesma cidade (ou vila, aldeia, povoado...) ou 1d4+1 meses no mesmo reino.",
    "poderConcedido": {
      "nome": "Pé na Estrada",
      "texto": "Você pode gastar 3 PM para fornecer o dom da caminhada a criaturas escolhidas em alcance curto. Até o fim da cena, as criaturas afetadas recebem +3m em deslocamento, ficam imunes às condições imóvel e lento e passam automaticamente em testes de Fortitude para marcha forçada (Tormenta20, p. 270)."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 33,
    "_duvida": "Devotos completos conforme o livro; 'Naidora' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "lamashtu",
    "nome": "Lamashtu",
    "epiteto": "Deusa da Matança",
    "natureza": "entidade primordial",
    "statusDivino": 4,
    "energia": "negativa",
    "lore": "Uma das divindades mais temidas nos reinos dos deuses, Lamashtu é também conhecida como a Deusa da Matança, a Senhora do Genocídio e outros títulos igualmente horrendos. Venerada por cultos secretos, é descrita como uma belíssima mulher-serpente com seis braços, cada um empunhando uma arma mortífera.\n\nLamashtu é uma divindade de morte, mal e destruição. Criaturas de coração sombrio fazem cerimônias e oferendas profanas à deusa-serpente, buscando atrair suas graças a qualquer preço — os cultistas de Lamashtu estão entre os vilões mais odiados e temidos, reunindo-se em células mercenárias para oferecer seus serviços a clientes com bolsos fundos o suficiente. Além disso, Lamashtu comanda legiões demoníacas nos domínios de Werra, o Reino de Arsenal, um mundo de guerra e matança. Avançando diante das tropas, sua fúria em batalha é indomável.\n\nA Senhora do Genocídio se deleita com sacrifícios humanos, mas também pode ser seduzida por belas joias, sua única fraqueza conhecida. Entre aventureiros, como forma de bravata exagerada, é comum dizer que “posso até mesmo roubar o tesouro de Lamashtu”.",
    "crencas": "Praticar a violência em nome da Rainha dos Massacres. Jamais reprimir os próprios instintos e desejos. Jamais ser domado. Jamais oferecer perdão ou rendição. Destruir seus inimigos. Reunir joias e pedras preciosas para a Senhora do Genocídio.",
    "simboloSagrado": "Uma joia ensanguentada.",
    "armaPreferida": "Cimitarra.",
    "devotosRacas": [
      "Medusa",
      "Minotauro",
      "Osteon",
      "Trog",
      "Sulfure"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Guerreiro",
      "Ladino",
      "Lutador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Uma vez por nível, o personagem deve consagrar uma de suas vítimas fatais a Lamashtu. Essa vítima pode ser qualquer criatura inteligente (Int –3 ou maior) que o personagem tenha matado (para criaturas que o grupo inteiro enfrentou em combate, o devoto deve ter sido responsável pelo golpe fatal). Para devotar a criatura, o personagem deve executar um ritual, com a presença do corpo da vítima, e sacrificar um valor em joias igual a 10% da diferença do dinheiro inicial do nível atual para o seguinte (por exemplo, T$ 40 para subir para o 4° nível).",
    "poderConcedido": {
      "nome": "Furacão de Lâminas",
      "texto": "Uma vez por rodada, quando erra um ataque corpo a corpo, você pode gastar 2 PM para fazer um novo ataque (com a mesma arma) contra outra criatura ao seu alcance."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 34,
    "_duvida": "Devotos completos conforme o livro; 'Sulfure' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "lupan",
    "nome": "Lupan",
    "epiteto": "Deus dos Caçadores",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "positiva",
    "lore": "Um dos deuses menores mais antigos de Arton, cultuado e respeitado desde antes da ascensão das grandes civilizações, Lupan era um deus furtivo e arredio, que podia assumir forma humanoide ou animal, sempre espreitando alguma presa. Diz-se que era filho da própria Allihanna, parte essencial do ciclo da vida. Segundo essas hipóteses, embora matasse seus irmãos, outros filhos da Mãe Natureza, Lupan sabia exatamente quais presas abater para que as populações nunca diminuíssem.\n\nSabendo da necessidade da morte como parte do Grande Ciclo de Allihanna, em 1405 Lupan aceitou se unir a Orion Drake em seu exército de deuses para devolver a Tamu-ra e seus habitantes às leis da natureza. Seguiu em frente, matando lefeu, atirando com seu arco e cortando com sua adaga, até que o exército avançou para o centro da área de Tormenta para enfrentar o Lorde. Mas Crânio Negro era implacável e sua pontaria, infalível. O Lorde da Tormenta chegou ao topo de uma colina com um arco de matéria vermelha, fez mira e disparou uma flecha mortal — a primeira de muitas.\n\nA primeira vítima foi justamente Lupan. A seta rubra atingiu sua testa, atravessando-a e saindo pela nuca, fazendo seu corpo divino despencar inerte. Assim, o Deus Menor dos Caçadores encontrou seu fim.",
    "crencas": "Reverenciar os seres da natureza. Proteger o equilíbrio da vida selvagem. Promover harmonia entre a natureza e a civilização. Combater monstros, mortos-vivos e outras criaturas que perturbam o equilíbrio natural. Caçar para o próprio sustento.",
    "simboloSagrado": "Um cão de caça.",
    "armaPreferida": "Arco curto.",
    "devotosRacas": [
      "Dahllan",
      "Elfo",
      "Medusa",
      "Sereia/Tritão",
      "Trog"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida",
      "Ladino",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Lupan não podem matar criaturas não inteligentes (Int –4 ou –5) grávidas ou filhotes, nem permitir que elas sejam mortas. Além disso, devem extrair algo de útil de qualquer criatura não inteligente que matarem (em termos de jogo, passar em um teste de Sobrevivência com CD 15 + ND da criatura). Alternativamente, se você tiver o suplemento Ameaças de Arton, o devoto deve extrair pelo menos um recurso natural da criatura (veja p. 401).",
    "poderConcedido": {
      "nome": "Passo do Caçador",
      "texto": "Você recebe +2 em Sobrevivência e soma sua Sabedoria em Furtividade. Além disso, contra criaturas desprevenidas ou surpreendidas, seus ataques causam +1d6 pontos de dano."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 35,
    "_duvida": "Devotos completos conforme o livro; 'Treinador', citado em Devotos, ainda não tem classe correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "luvithy",
    "nome": "Luvithy",
    "epiteto": "Deusa da Peste",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "negativa",
    "lore": "Uma deusa de comunidades isoladas e nações hoje em dia quase esquecidas, Luvithy foi uma bruxa humana na época em que os nativos de Lamnor ainda não ousavam desbravar Arton Norte. Naquele período, a aldeia de Luvithy estava à beira da destruição devido à guerra com outros povos. Mas a bruxa lançou uma praga que adoeceu e matou todos os inimigos da região. Os povos que não estavam em confronto direto ficaram temerosos e prestaram respeito e devoção a Luvithy, que se tornou a Deusa Menor da Peste.\n\nAo longo dos séculos, o culto a Luvithy se espalhou por todo o continente e chegou também a Lamnor. Todos aqueles que, frente a uma grande peste, suplicavam pela piedade da doença em vez de procurar sua cura acabavam, mesmo sem saber, adorando esta deusa menor. A devoção a Luvithy é um segredo em várias famílias, uma religião praticada em particular por pais e mães que têm medo de perder seus filhos por doenças, por servos que tentam manter vivos senhores moribundos, por pessoas que temem adoecer.\n\nLuvithy ganhou muitos devotos depois do surgimento da Praga Coral em Lomatubar. Mesmo sem relação nenhuma com essa doença mágica, a Deusa da Peste passou a ouvir as preces de várias comunidades desesperadas, que imaginavam que a Praga só podia ser obra de uma entidade da pestilência. Com a morte de Ragnar e a ascensão de Thwor, o culto a Luvithy tem se renovado, com fé revigorada e a ambição de conquistar o título de Deusa da Morte para sua padroeira.",
    "crencas": "Espalhar doenças. Trazer de volta a antiga glória de Luvithy.",
    "simboloSagrado": "Um crânio encapuzado.",
    "armaPreferida": "Gadanho.",
    "devotosRacas": [
      "Dahllan",
      "Osteon",
      "Trog",
      "Kobold",
      "Nezumi",
      "Orc",
      "Sulfure"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Luvithy devem contaminar pelo menos uma criatura Pequena ou maior com uma doença por semana. Na falta de uma vítima adequada, um devoto pode contaminar a si mesmo.",
    "poderConcedido": {
      "nome": "Toque Pestilento",
      "texto": "Você aprende e pode lançar Infligir Ferimentos e, quando você usa essa magia, se o alvo falhar no teste de resistência, ele também é exposto à doença maldição pegajosa (Tormenta20, p. 318) e sofre seu efeito inicial imediatamente. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 35,
    "_duvida": "Devotos completos conforme o livro; 'Kobold'/'Nezumi'/'Orc'/'Sulfure', citados em Devotos, ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "marina",
    "nome": "Marina",
    "epiteto": "Deusa dos Marinheiros",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "As histórias sobre a origem e a verdadeira aparência desta deusa são tão variadas quanto as histórias de pescadores, marinheiros e piratas. Uns dizem que ela foi uma sereia que se apaixonou por um marinheiro, abrindo mão de sua própria raça para ficar mais perto dele. Outros, que foi a maior capitã pirata do Mar Negro, conquistando a devoção de incontáveis tripulações. Há quem diga que foi uma jovem donzela capturada por piratas e jogada ao mar para morrer, mas que foi salva por Oceano. Outros ainda afirmam que ela foi um bebê que caiu no mar, mas sobreviveu ao ser levado para uma área de “ar molhado” (águas mágicas onde é possível respirar) e foi criada por peixes. Por fim, existem versões que afirmam que ela é a princesa de um antigo império submarino, e até mesmo aqueles que afirmam que Marina era um mero acrostólio (uma decoração de proa de navio) tão adorada pela tripulação que ganhou vida.\n\nQuando alguém pergunta diretamente à deusa qual das histórias é real, ela apenas responde: “sim”. A verdadeira personificação das histórias de marinheiros, Marina abençoa oficiais respeitáveis, piratas, pescadores e exploradores sem distinção, pois é a deusa de todos que desbravam o mar. É capaz de invocar incontáveis navios de todos os tipos e tamanhos, mais rápidos, resistentes e poderosos do que qualquer embarcação já vista em Arton. Ninguém sabe de onde vêm esses navios — o que leva alguns a especular que ela realmente possui um império subaquático. Também é capaz de construir navios, sozinha ou com a ajuda de misteriosas equipes que surgem apenas à noite. No convés de uma nau capitânia, é capaz de guiar uma frota inteira, domando as ondas e fazendo soprar os ventos mais favoráveis. Marina recebe devoção absoluta porque não é uma deusa do mar ou de suas criaturas, mas dos homens e mulheres que o desbravam. Seus fiéis não precisam apaziguar uma deusa imprevisível como o próprio mar, não precisam implorar permissão para singrá-lo: sob Marina, o mar pertence a eles.\n\nÉ comum que navios sejam dedicados a Marina antes de sua primeira viagem. Esse costume ficou ainda mais arraigado depois do papel decisivo desta deusa no combate à Tempestade Rubra: foi nos navios de Marina que o exército de deuses menores de Orion Drake chegou à área de Tormenta de Tamu-ra em 1405, libertando o Império de Jade de sua corrupção.",
    "crencas": "Explorar o mar. Desafiar as ondas. Desbravar o oceano. Enfrentar tempestades. Vencer limites. Desafiar o impossível. Construir, consertar e pilotar embarcações.",
    "simboloSagrado": "Um redemoinho marinho.",
    "armaPreferida": "Florete.",
    "devotosRacas": [
      "Elfo",
      "Hynne",
      "Minotauro",
      "Qareen",
      "Sereia/Tritão",
      "Elfo-do-Mar",
      "Kappa"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Marina devem sempre carregar consigo um recipiente fechado com água do mar (em termos de jogo, um item que ocupa 0,5 espaço). Além disso, uma vez por aventura, devem passar pelo menos uma noite em uma embarcação no mar.",
    "poderConcedido": {
      "nome": "Mar Aberto",
      "texto": "Você aprende e pode lançar Caminhos da Natureza. Você só pode lançar essa magia em ambientes aquáticos, mas pode aplicar seu bônus em deslocamento em qualquer embarcação em que esteja. Caso aprenda novamente essa magia, pode usá-la em qualquer ambiente e seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 36,
    "_duvida": "Devotos completos conforme o livro; 'Elfo-do-Mar'/'Kappa', citados em Devotos, ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "mzzileyn",
    "nome": "Mzzileyn",
    "epiteto": "Dragão-Rei das Trevas",
    "natureza": "dragão-real",
    "statusDivino": 3,
    "energia": "negativa",
    "lore": "Dotado de uma inteligência comparável apenas a sua crueldade, Mzzileyn tece planos dentro de planos. Seus objetivos são cada vez mais perversos, mas todos espalham intriga, morte e destruição pelo mundo. Esta é uma divindade que se diverte com a desgraça e a infelicidade alheias, provocando catástrofes como passatempo.\n\nEm eras remotas, o Dragão-Rei das Trevas colaborou com os seguidores de Sszzas. Em contrapartida, diz-se que o Deus da Traição nutre certa simpatia por ele (dentro do que é possível). Na verdade, alguns acadêmicos suspeitam de que Mzzileyn seja criação do próprio Sszzas — uma teoria provada falsa com o ressurgimento de Kallyadranoch, mas ainda popular.\n\nMzzileyn conheceu ele mesmo o gosto da traição quando seus devotos dragões o abandonaram para seguir o Dragão da Tormenta. Isso, embora tenha sido uma lição de humildade, não mudou sua personalidade. Pelo contrário: Mzzileyn aprendeu que não pode contar com a lealdade de ninguém. Assim, deve trair todos antes que eles mesmos o traiam. Hoje em dia, busca reerguer seu culto, mas sacrificaria qualquer um de seus devotos se isso pudesse lhe trazer uma ínfima vantagem. Um dos únicos atos de bravura que já realizou foi enfrentar os lefeu diretamente, durante a Batalha de Tamu-ra.\n\nDiferente dos outros Dragões-Reais, Mzzileyn costuma assumir várias formas humanoides que mostram simpatia ou confiabilidade: o mercador da vila, o taverneiro, o pedinte… Todas, no entanto, têm cabelos e olhos escuros. Nas raras vezes em que assume sua forma verdadeira, o Dragão-Rei das Trevas lembra um longo réptil serpentino, com escamas sombrias e uma face que parece mais um crânio de dragão descarnado; suas asas reais foram arrancadas tempos atrás, substituídas por asas feitas de sombra.",
    "crencas": "Reverenciar a sagacidade de Mzzileyn. Praticar a mentira, a traição e a trapaça. Propagar caos, desordem e destruição. Usar dos recursos de qualquer um para alcançar seus próprios objetivos. Promover a soberania das sombras e da escuridão.",
    "simboloSagrado": "O crânio de um dragão vertendo sombras.",
    "armaPreferida": "Adaga.",
    "devotosRacas": [
      "Goblin",
      "Finntroll",
      "Gnoll",
      "Kallyanach",
      "Nagah",
      "Tengu"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Bucaneiro",
      "Ladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Sempre que estiver diante de um desafio (um combate, um perigo complexo ou outra cena que envolva vencer ou superar algo desafiador) você deve passar em pelo menos um teste de Enganação que seja útil contra esse desafio. O mestre tem a palavra final sobre quais ações se encaixam nessa descrição.",
    "poderConcedido": {
      "nome": "Sombras Venenosas",
      "texto": "Você pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 PV por veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro). Além disso, se você estiver em uma área de escuridão, a CD para resistir aos seus venenos aumenta em +2 e a perda de vida deles aumenta em +2 por dado."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 36,
    "_duvida": "Devotos completos conforme o livro; 'Finntroll'/'Gnoll'/'Kallyanach'/'Nagah'/'Tengu', citados em Devotos, ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "nerelim",
    "nome": "Nerelim",
    "epiteto": "Deusa da Água Doce",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Uma deusa de origem ancestral, cujo culto foi abraçado pelos colonos que fundaram o antigo reino de Callistia, Nerelim foi a divindade mais cultuada nessa nação, antes de ser absorvida pelas Repúblicas Livres de Sambúrdia. De fato, antigamente nenhuma família que não cultuasse Nerelim nesse reino era considerada \"respeitável\", ao menos na capital.\n\nNerelim costuma se apresentar na forma de uma mulher com cabelos imensos, trançados de modo a parecer uma rede de pesca. É também a padroeira dos rios e pescadores. Diz-se que é filha de Oceano e teria ensinado os primeiros habitantes da região que viria a ser Callistia a pescar e sobreviver dos inúmeros rios dessas terras. Os nerelitas (nome dado aos devotos da deusa) por sua vez ensinam a população a respeitar os rios e não poluí-los, além de pescar apenas nas épocas certas para que nunca falte alimento.\n\nDepois que Callistia passou a fazer parte das Repúblicas Livres de Sambúrdia, o culto a Nerelim se expandiu. O antigo reino era notoriamente provinciano e um pouco xenófobo. Assim, sua deusa não era especialmente difundida em outros lugares. Agora que os Príncipes Mercantes trafegam pelas águas da região, a proteção de Nerelim é ainda mais valorizada e sua religião, mais conhecida.",
    "crencas": "Reverenciar e proteger os rios, os lagos e os seres que ali habitam. Promover harmonia entre os seres das águas e o mundo seco. Proteger os seres fluviais. Exigir devido respeito às águas correntes.",
    "simboloSagrado": "Um rio cortando a várzea.",
    "armaPreferida": "Arpão (Ameaças de Arton, p. 392).",
    "devotosRacas": [
      "Elfo",
      "Hynne",
      "Minotauro",
      "Qareen",
      "Sereia/Tritão",
      "Elfo-do-Mar",
      "Kappa"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Nerelim não podem se manter afastados de um grande corpo de água doce (como um lago ou rio) por mais de um mês. Além disso, devem pescar em um rio ou outro corpo de água doce pelo menos uma vez por semana.",
    "poderConcedido": {
      "nome": "Água da vida",
      "texto": "Uma vez por dia, você pode transformar um jarro (ou outro recipiente equivalente que ocupe 0,5 espaço) de água doce em uma poção mágica. Beber essa água mágica é uma ação padrão e recupera 2d8+2 PV e 1d4+1 PM. A água mantém suas propriedades mágicas por 1 semana ou até ser bebida."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 37,
    "_duvida": "Devotos completos conforme o livro; 'Elfo-do-Mar'/'Kappa' (raças) e 'Treinador' (classe), citados em Devotos, ainda não têm correspondente no site, ficam no array pra quando forem adicionados."
  },
  {
    "id": "neruite",
    "nome": "Neruíte",
    "epiteto": "Deusa do Sono",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "dual",
    "lore": "Neruíte é uma deusa maternal, de voz suave e melodiosa, que convida todos a relaxar em um sono tranquilo e reparador. Sua presença de aparência inconstante traz uma paz inexplicável, envolvendo os corações aflitos com serenidade e aconchego. Suas canções de ninar são mágicas e possuem o poder de adormecer qualquer criatura, independente de seu tamanho ou natureza. Uma vez adormecida pela melodia de Neruíte, a criatura não acordará até ter um descanso adequado, segundo os ensinamentos da deusa.\n\nDevotos de Neruíte acreditam que o sono, quando adequado e tranquilo, é um ritual sagrado. São ensinados a respeitar o ciclo natural do descanso, evitando excessos e buscando sempre a harmonia entre o dia e a noite. Os sacerdotes de Neruíte, conhecidos como \"Sonhadores\", passam seus dias compartilhando as lições de equilíbrio e de cuidados com o corpo e a mente, realizando cerimônias que celebram a importância do descanso.\n\nNão se sabe a origem exata de Neruíte, apenas que a deusa é muito antiga. Certas histórias falam de uma princesa de um reino ancestral, que teria adormecido num sono de décadas, sem envelhecer ou sofrer qualquer efeito do tempo. Seus súditos teriam começado a peregrinar para velar seu sono, aos poucos transformando-se em seus devotos… Infelizmente, ninguém conhece o final da história, pois todos adormecem ao ouvi-la, então não se sabe se tem algum fundo de verdade.\n\nOs templos de Neruíte são conhecidos por sua atmosfera serena e acolhedora. Decorados com tecidos suaves, almofadas e velas perfumadas, esses santuários são considerados locais ideais para descansar e se reconectar com o divino.",
    "crencas": "Ensinar a importância de um bom sono. Auxiliar as pessoas a obterem o descanso adequado. Velar pelo sono alheio. Desvendar pesadelos. Interpretar sonhos. Sonhar.",
    "simboloSagrado": "Uma vela apagada.",
    "armaPreferida": "Maça.",
    "devotosRacas": [
      "Elfo",
      "Qareen",
      "Sereia/Tritão",
      "Sílfide",
      "Aggelus"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Caçador",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Neruíte jamais podem acordar intencionalmente alguém que esteja dormindo, ou permitir que outros o façam. Além disso, sempre que acorda, o devoto fica pasmo por 1 rodada, enquanto seu espírito lentamente desperta de seu sono sagrado.",
    "poderConcedido": {
      "nome": "Sono Reparador",
      "texto": "Se descansar (dormindo) em condições normais ou melhores, você pode melhorar sua recuperação de PV ou PM em um passo. Alternativamente, você pode ter um sonho inspirador: ao despertar, recebe +1d6 em um teste de perícia a sua escolha realizado até o fim do dia."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 38,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus', citado em Devotos, ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "piscigeros",
    "nome": "Piscigeros",
    "epiteto": "Deus dos Homens-Peixes",
    "natureza": "conceito vivo",
    "statusDivino": 1,
    "energia": "negativa",
    "lore": "Também chamado entre os homens-peixes de Pai Peixe, esta divindade possui uma história curiosa. Originalmente, o Pai Peixe não passava de uma mentira dos thalassothan, monstros aquáticos inteligentes e cruéis, capazes de herdar memórias de seus progenitores e absorvê-las de suas vítimas. Esses algozes das águas convenceram os homens-peixes da existência do deus Piscigeros para obter controle sobre eles, afirmando serem arautos dessa divindade.\n\nEntretanto, o poder da crença em Arton é tão forte — e a farsa durou tantas gerações — que há relatos de um indivíduo solto nas profundezas marítimas que afirma ser Piscigeros, e que está sendo cultuado pelos homens-peixes. Os thalassothan foram pegos desprevenidos por isso. Vários homens-peixes já se revoltaram contra seus mestres ao perceber que os \"arautos do Pai Peixe\" pareciam saber menos sobre o deus do que seus servos!\n\nSe o tal \"Piscigeros\" é um ser que tomou a identidade do Pai Peixe para si ou se de fato surgiu espontaneamente devido à crença dos fiéis, ninguém da superfície sabe ainda. O que se sabe é que a fé dos homens-peixes é genuína, e que seus devotos são os comandantes dessa raça submarina — alguns até mesmo desafiando o controle thalassothan.",
    "crencas": "Obedecer aos arautos do Pai Peixe acima de tudo. Vencer a qualquer custo, pela força ou estratégia. Proteger a cultura e o modo de vida dos homens-peixes. Dominar os mares e os seres sob as ondas.",
    "simboloSagrado": "Um peixe imenso em um cardume de peixes menores.",
    "armaPreferida": "Tridente.",
    "devotosRacas": [
      "Dahllan",
      "Hynne",
      "Minotauro",
      "Sereia/Tritão",
      "Elfo-do-Mar",
      "Kappa"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Piscigeros jamais podem ignorar um pedido de ajuda de um homem-peixe e devem proteger qualquer membro de seu povo até a morte, se preciso. Além disso, devotos do Pai Peixe jamais podem desobedecer às ordens dos arautos de sua divindade ou causar dano letal ou perda de PV a eles (habilidades que forneçam bônus em dano letal ou em perda de vida para criaturas em combate contra eles também são proibidas). Esse último dogma vem sendo contestado por alguns sacerdotes de Piscigeros, mas não se sabe ainda as consequências de fazer isso.",
    "poderConcedido": {
      "nome": "Bolha Hídrica",
      "texto": "Uma vez por rodada, quando você ou um aliado em alcance curto faz um teste de resistência ou sofre dano, você pode gastar 2 PM para cuspir uma bolha de água protetora que fornece +5 nesse teste de resistência ou RD 15 contra esse dano. Estes benefícios são dobrados contra efeitos de fogo."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 41,
    "_duvida": "Devotos completos conforme o livro; 'Elfo-do-Mar'/'Kappa' (raças) e 'Treinador' (classe), citados em Devotos, ainda não têm correspondente no site, ficam no array pra quando forem adicionados. Texto extraído com trechos intercalados devido ao layout de duas colunas do PDF nesta página, mas a lista de Devotos foi confirmada de forma contígua no arquivo -layout."
  },
  {
    "id": "rhond",
    "nome": "Rhond",
    "epiteto": "Deus das Armas",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Rhond é um dos deuses menores mais acessíveis — e sua história é uma das mais conhecidas. Ele reside na Cidade de Rhond, no reino de Zakharov, que também abriga seu templo mais importante e boa parte de seus clérigos.\n\nRhond teria sido um dos mais antigos clérigos de Keenn, o antigo Deus da Guerra. Tanto um armeiro supremo quanto um aventureiro poderoso, Rhond forjou incontáveis armas, transcendendo a mera habilidade mundana para fabricar verdadeiros itens mágicos. Acumulou tanto poder e artefatos de sua própria criação que acreditou ser capaz de vencer o próprio Deus da Guerra e ocupar seu posto. E efetivamente viajou até o Reino de Keenn para desafiá-lo, mas foi vencido.\n\nNo entanto, Keenn não puniu o desafiante. Orgulhoso da coragem de seu clérigo, recompensou-o com a imortalidade, o poder mágico de forjar as mais poderosas e magníficas ferramentas de morte. Contudo, também o puniu por sua arrogância: prendeu-o numa forma monstruosa de seis braços e obrigou-o a forjar armas pela eternidade. Assim, pensava Keenn, o poderoso desafiante estaria para sempre servindo a ele.\n\nContudo, Rhond viu a recompensa/castigo como uma grande injustiça, o capricho de um deus arbitrário. Perdeu a fé e abandonou o sacerdócio, continuando em sua tarefa eterna. Com o passar dos séculos, sua fama como armeiro se tornou tão grande que ele próprio começou a ser cultuado, ascendendo a Deus Menor das Armas.\n\nRhond trabalha sem cessar em uma caverna, na oficina que é também seu templo. A forja é um pequeno vulcão, borbulhando de lava, e todas as paredes são recobertas dos mais variados tipos de armamentos. Ao redor da caverna existe a Cidade de Rhond, onde o martelar incessante do deus pode ser ouvido dia e noite, em qualquer lugar.\n\nRhond não é conhecido por sua paciência ou generosidade, mas às vezes contribui com suas magníficas criações quando acredita que o objetivo é importante o bastante. Teve papel decisivo na Batalha de Tamu-ra, por exemplo. Vários outros deuses menores governam meros aspectos do portfólio de Rhond — o Deus da Pólvora e o Deus dos Machados são alguns exemplos. Rhond é um dos mais poderosos deuses menores, com um dos portfólios mais abrangentes.",
    "crencas": "Forjar e usar as melhores armas. Honrar e respeitar as armas como obras de arte. Vencer pela força ou estratégia. Realizar grandes feitos. Derrotar monstros e inimigos usando suas próprias criações.",
    "simboloSagrado": "Uma espada, um machado de batalha e um martelo de guerra cruzados sobre uma bigorna.",
    "armaPreferida": "Martelo de guerra.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Golem",
      "Minotauro"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Cavaleiro",
      "Guerreiro",
      "Inventor",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Rhond devem passar pelo menos uma hora por dia limpando, consertando ou afiando uma arma, ou treinando com uma arma. Além disso, pelo menos uma vez por aventura o devoto deve fabricar uma arma qualquer.",
    "poderConcedido": {
      "nome": "Artista das Armas",
      "texto": "Você pode infundir armas com uma fagulha divina. Gaste uma semana e T$ 100 e faça um teste de Ofício (armeiro) com CD igual à de fabricação da arma. Se passar, a arma se torna mágica e recebe uma melhoria cujos pré-requisitos cumpra (exceto material especial), que não conta em seu limite de melhorias."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 41,
    "_duvida": "O termo original 'golens' foi interpretado como plural de 'Golem'."
  },
  {
    "id": "sartan",
    "nome": "Sartan",
    "epiteto": "Deus da Desolação",
    "natureza": "entidade primordial",
    "statusDivino": 4,
    "energia": "negativa",
    "lore": "Milênios atrás, quando o mundo ainda era jovem e os deuses também, o Panteão precisou enfrentar inúmeras entidades que surgiam espontaneamente ou até vinham de outros mundos, com a intenção de dominar Arton. Algumas dessas entidades eram elas mesmas deuses menores, enquanto outras eram demônios e diabos extremamente poderosos. No entanto, todas foram derrotadas e repelidas. O mundo viveu em paz por algum tempo, até que o maligno Deus Menor da Desolação, Sartan, conseguiu retornar a Arton, trazendo consigo guerra, fome, doenças e destruição.\n\nNaquela época, os deuses maiores há muito tinham criado e estabelecido seus próprios povos. Não andavam no mundo em suas formas verdadeiras, mas contavam com campeões mortais. Então escolheram entre os mortais um grupo de heróis para banir Sartan, usando um objeto sagrado: o Disco dos Três. O deus diabólico foi derrotado, mas não completamente destruído. Ele esperou pacientemente até que os astros se alinhassem e, quando tal fenômeno ocorreu, fez uma nova tentativa de retornar.\n\nMais uma vez um grupo de heróis foi convocado por Dahriol, o Deus Menor dos Selos, mensageiro do Panteão, na antiga cidade de Malpetrim. Esses heróis reuniram as partes do Disco dos Três e encontraram o local onde os cultistas do Deus da Desolação tentavam trazer Sartan de volta a Arton. Eles se depararam com um horror indescritível: uma cabeça imensa e demoníaca, cheia de chifres e espinhos, com inúmeros vermes rastejando sobre sua pele repugnante. Apesar disso, o grupo triunfou e Sartan foi banido mais uma vez. Com o banimento de Sartan, seu culto se encolheu nas sombras, esperando pela oportunidade de invocá-lo novamente.\n\nAo longo das eras, este deus passou pouco tempo em Arton, pois sempre foi repelido. Assim, nem mesmo seus cultistas sabem muito sobre ele. Contudo, a obsessão de Sartan por vir a este mundo é motivação suficiente para que seja cultuado. A proibição de sua permanência em Arton, sem que ninguém saiba exatamente quais seriam as consequências disso, parece seduzir cultistas. Muitos dizem que, se Sartan efetivamente viesse, Arton seria destruída… Mas isso só pode ser um exagero. Ou não?",
    "crencas": "Trazer Sartan de volta a Arton. Preparar-se para o retorno do Deus da Desolação. Espalhar a guerra, a morte, a fome e doenças pelo mundo, até que restem apenas os eleitos. Praticar a devassidão e a perversão. Deturpar tudo que é comum. Abraçar a agonia e a crueldade.",
    "simboloSagrado": "Uma cabeça de demônio com a bocarra arreganhada.",
    "armaPreferida": "Maça.",
    "devotosRacas": [],
    "devotosClasses": [],
    "devotosNota": "Quaisquer. Sartan não rejeita ninguém que queira ajudá-lo a retornar a Arton.",
    "naoPermitidoJogadores": true,
    "obrigacoes": "Devotos de Sartan jamais podem se recusar a participar de tentativas de trazer seu padroeiro de volta para Arton. Eles devem estar sempre estudando os alinhamentos dos astros para antecipar seu retorno. Além disso, devem praticar o mal através de algum ato de crueldade, como ferir uma criatura indefesa, pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais), como oferenda a Sartan. Esta divindade menor não é permitida para jogadores.",
    "poderConcedido": {
      "nome": "Inimigo dos Deuses",
      "texto": "Você recebe resistência a magia divina +5 e, contra devotos de outros deuses, recebe +2 em testes de ataque e na CD de suas habilidades."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 43,
    "_duvida": "O livro afirma explicitamente que esta divindade menor não é permitida para jogadores; texto mantido em obrigacoes por estar contíguo a essa seção no original."
  },
  {
    "id": "sckhar",
    "nome": "Sckhar",
    "epiteto": "Dragão-Rei do Fogo",
    "natureza": "dragão-real",
    "statusDivino": 5,
    "energia": "negativa",
    "lore": "De várias formas, Sckhar representa tudo aquilo que define um dragão — força, influência, orgulho, perigo… —, sempre ao extremo. Sua expressão é intimidadora mesmo quando está calmo, e ele se enfurece com facilidade. Seus acessos de raiva são notórios, pois assassina seus servos, guardas e esposas diante da menor transgressão. Com uma nação inteira à sua disposição e nenhuma das preocupações \"mundanas\" de um regente (como intrigas, rivais ou ameaças de invasões), Sckhar devota grande parte do tempo e dos recursos de Sckharshantallas à sua adoração.\n\nExistem inúmeros relatos sobre Sckhar como um rei (ou tirano): sobre como considera todo o reino seu covil e tudo que está dentro de suas fronteiras como seu tesouro. Existem histórias sobre Sckhar como oponente: poucos sobrevivem a sua fúria, e ele teve papel decisivo na luta contra o Dragão da Tormenta. Existem até mesmo boatos sobre os sentimentos de Sckhar: ele teria se apaixonado por Beluhga no passado, sendo capaz de uma forma de amor. Teria também feito um pacto com o cavaleiro Lothar Algherulff, mostrando astúcia e dando ouvidos a uma \"criatura inferior\".\n\nMas e Sckhar como divindade? Sckhar é um dos deuses menores mais presentes nas vidas de seus devotos. Eles sentem o toque do deus sempre que acordam sob o calor escaldante do reino. Festivais são realizados em sua honra, sacrifícios ritualísticos de prisioneiros ocorrem todos os anos, no feriado do Dia da Execução, após o Sckharal (também um feriado em honra ao deus). O culto a Sckhar é a religião oficial de Sckharshantallas. A devoção faz parte da vida de qualquer sckharjagar, como são chamados os nativos do reino. Alguém que não seja devoto de Sckhar é visto com desconfiança, um esquisito que provavelmente está escondendo outras \"infrações\".\n\nSckhar cobra pesados tributos, mas também lhes fornece uma fruta extremamente nutritiva, garantindo que seus súditos/devotos não passem fome. Sckhar é absoluto. Ao mesmo tempo, seus filhos ocupam quase todas as posições de alto poder, tornando a figura física do deus estranhamente próxima. Para um sckharjagar médio, Sckhar é muito mais poderoso (ou ao menos perigoso) que Khalmyr ou mesmo Valkaria!\n\nNa forma humanoide, Sckhar aparenta ser um elfo de cabelos vermelhos e porte altivo. Sempre usa vestimentas soberbas, em tons quentes como vermelho e dourado. Poderia ser confundido com um nobre elfo qualquer, não fosse um traço particular — seu olho esquerdo é cego, trazendo três cicatrizes alinhadas que cruzam sua extensão. Em sua forma dracônica, o Dragão-Rei é uma das mais impressionantes e aterradoras criaturas de Arton. Suas escamas são de um escarlate profundo, entremeadas com algumas douradas e cor de rubi, com garras enormes e poderosas, e a cabeça coroada com chifres espiralados.",
    "crencas": "Reverenciar a soberania de Sckhar. Reverenciar os filhos do Dragão-Rei do Fogo. Enfrentar heresia ou transgressão às leis, domínios e à honra de Sckhar. Combater as criaturas que ameacem os súditos de Sckharshantallas. Caçar quaisquer dragões que invadam o território sckharjagar.",
    "simboloSagrado": "Chamas vermelhas com uma coroa dourada no centro.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Elfo",
      "Kallyanach",
      "Meio-Elfo"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bardo",
      "Cavaleiro",
      "Nobre",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Sckhar devem obedecer cegamente às ordens do seu Dragão-Rei, especialmente quando convocados para expulsar dragões e outras criaturas aparentadas do território de Sckharshantallas. Além disso, uma vez por mês, os devotos devem doar 20% de todo seu tesouro para os cofres de Sckhar. Essa doação deve ser feita em ouro.",
    "poderConcedido": {
      "nome": "Ego",
      "texto": "Quando faz um teste, você pode gastar 1 PM para receber +5 nesse teste. Se fizer isso e falhar no teste, até o fim da cena você sofre uma penalidade de –2 em testes e não pode usar este poder."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 44,
    "_duvida": "Devotos completos conforme o livro; 'Kallyanach'/'Meio-Elfo' (raças) e 'Treinador' (classe), citados em Devotos, ainda não têm correspondente no site, ficam no array pra quando forem adicionados. Quanto ao poder concedido 'Ego': conferindo a ordem contígua do bloco no arquivo -layout (Devotos > Obrigações & Restrições > poder concedido, todos antes da quebra de página 42/43, com o bloco de Sunnary só começando depois), fica confirmado que 'Ego' pertence a Sckhar, não a Sunnary — a ambiguidade anterior está resolvida."
  },
  {
    "id": "sunnary",
    "nome": "Sunnary",
    "epiteto": "Deusa da Culinária",
    "natureza": "mortal ascendido",
    "statusDivino": 2,
    "energia": "positiva",
    "lore": "Dona Sunnary, como ficou conhecida, nasceu em uma pequena vila desconhecida, não se casou e nem teve filhos, mas adotou toda a vila como sua família. Sempre com uma refeição deliciosa e uma palavra amiga, resolvia todas as disputas e desavenças em torno da mesa farta. Era devota de Marah e representava muito bem o lado gentil e tranquilo da Deusa da Paz. Sua fama como cozinheira e mediadora de conflitos se espalhou pela região e logo a pequena vila recebia viajantes em busca da comida de Dona Sunnary.\n\nA vida transcorria tranquila até que o vilarejo foi ameaçado por um terrível dragão. Sem recursos para enfrentar a ameaça mortal, os aldeões entraram em pânico, rezando aos deuses por misericórdia e implorando por uma solução. No entanto, como a maioria dos artonianos sabe, os deuses não resolvem seus problemas diretamente, mas enviam campeões para isso. Nesse caso, a campeã não foi nenhuma aventureira.\n\nEmocionada pela situação e com fé inabalável nas próprias habilidades, a talentosa cozinheira decidiu intervir. Dona Sunnary escolheu suas melhores receitas e fez um banquete magnífico em honra ao seu “convidado” dragão, chamando-o para conversar e partilhar a refeição. Ao fim da sobremesa, o dragão já estava apaziguado e desistiu de destruir a vila. Adotou o vilarejo como seu protegido em troca de banquetes periódicos feitos pelas mãos divinas de Dona Sunnary. Curiosamente, logo a ameaça implícita nisso se dissipou. O dragão passou a ser apenas mais um conviva. A história se espalhou e logo começaram as peregrinações para conhecer a lendária cozinheira. E assim, Dona Sunnary, a simpática aldeã, ascendeu como divindade menor da culinária, abençoando a boa comida e aqueles que a produzem.\n\nComo deusa, Dona Sunnary costuma parecer uma senhora baixa de cabelos grisalhos, sempre presos em coque (para que seu cabelo não caia nas panelas), com olhos gentis, cintura roliça e nariz aquilino, sempre sorridente.",
    "crencas": "Reverenciar a arte da culinária. Alimentar os necessitados. Cozinhar com prazer. Criar novas receitas. Espalhar a palavra da boa culinária.",
    "simboloSagrado": "Panela sobre uma fogueira.",
    "armaPreferida": "Adaga.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Hynne",
      "Qareen",
      "Aggelus"
    ],
    "devotosClasses": [
      "Bardo",
      "Druida",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Sunnary não podem se negar a atender um pedido para cozinhar para alguém, e devem preparar pelo menos um prato especial por semana.",
    "poderConcedido": {
      "nome": "Alimento da Alma",
      "texto": "Você recebe treinamento em Ofício (cozinheiro) e aprende e pode lançar Abençoar Alimentos. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 43,
    "_duvida": "Devotos completos conforme o livro; 'Aggelus' (subtipo de Suraggel) ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "tamagrah",
    "nome": "Tamagrah",
    "epiteto": "Deus da Ilha Viva",
    "natureza": "entidade primordial",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Em Moreania há criaturas enormes — mas poucas se comparam a Tamagrah. O monstro se assemelha a um peixe achatado, com boca de bagre e olhos esbugalhados. Possui seis nadadeiras e uma cauda curta, porém vigorosa. Suas costas são protegidas por uma grossa carapaça, guarnecida por longos espinhos. Apesar da aparência demoníaca, Tamagrah é ainda mais assustador por seu tamanho: seu casco tem 12km de diâmetro, mantendo uma superfície de 8km emersa. Uma vez que a criatura flutua lentamente pelos mares, sem jamais submergir, vegetação floresceu em sua carapaça e vida animal passou a habitar Tamagrah como se fosse uma ilha.\n\nNem todos conhecem a verdadeira natureza de Tamagrah: a maioria das pessoas acredita ser apenas uma ilhota peculiar. Mas aqueles que sabem do segredo cultuam o monstro como um deus. E são correspondidos.\n\nTamagrah concede poderes a seus devotos — mas, exceto por esse fato, pouco interfere em assuntos dos mortais. Sua existência é milenar, suas preocupações são mistérios profundos como os mares: o monstro tanto ajuda aos que pedem seu auxílio em orações, como causa maremotos e catástrofes com um simples movimento de nadadeira.",
    "crencas": "Reverenciar Tamagrah. Proteger a vida selvagem e o povo da Ilha Viva. Combater monstros, mortos-vivos e invasores que perturbam o equilíbrio natural do ecossistema da Ilha Viva.",
    "simboloSagrado": "Um casco de tartaruga com seis nadadeiras de peixe.",
    "armaPreferida": "Lança.",
    "devotosRacas": [
      "Anão",
      "Dahllan",
      "Elfo",
      "Hynne",
      "Sílfide"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador",
      "Druida",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Tamagrah devem proteger seu deus e, consequentemente, seu habitat, por meio de missões além mar para prevenir ameaças (pelo menos uma missão a cada 1d4+2 meses), mas não podem permanecer mais de 1d4+2 meses longe de Tamagrah.",
    "poderConcedido": {
      "nome": "Casco de Tartaruga",
      "texto": "Uma vez por rodada, quando sofre dano, você pode gastar 2 PM para receber RD 20 contra esse dano."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 44,
    "_duvida": "Devotos completos conforme o livro; 'Treinador' ainda não tem classe correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "teldiskan",
    "nome": "Teldiskan",
    "epiteto": "O Gigante Máximo",
    "natureza": "entidade primordial",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Em Deheon, o Reino Capital, há uma cordilheira chamada de Montanhas Teldiskan, que ocupa boa parte do território a noroeste do reino. Apesar de fazerem parte da mesma formação das Montanhas Uivantes, o local tem sua própria identidade por ser lar de Teldiskan, o Gigante Máximo.\n\nProvavelmente a criatura mais alta de Arton, dizem que quando se levanta, Teldiskan consegue ver as nuvens que se formam em todos os reinos do que sobrou do Reinado, conseguindo prever o clima de semanas e até meses à frente. Por esse motivo os humanos há muitos séculos cultuam a criatura como a divindade menor do clima.\n\nMas nem sempre Teldiskan foi bondoso ou pacífico — e talvez não o seja hoje em dia. Teldiskan, o Gigante Máximo, atacou a cidade de Valkaria, quando era um mero assentamento de refugiados, pouco depois da chegada da Caravana dos Exilados a Arton Norte. Na ocasião, a Rainha Yvanna das Amazonas e Roramar Pruss, o Rei Profeta, derrotaram juntos o gigante, banindo-o para as montanhas e assim selando a aliança entre o que viria a ser o reino de Deheon e as nações amazonas. Teldiskan teria se arrependido e, desde então, tornado-se uma divindade pastoril, que protege as pequenas aldeias que existem no sopé das montanhas. Um deus pacato, que pouco faz além de garantir bom tempo. Ou apenas um vilão dotado de enorme paciência.\n\nAtualmente, devotos de Teldiskan se espalham pelas diversas aldeias nas encostas das montanhas e usam de rituais para prever o clima e auxiliar o povo com suas criações de cabras, carneiros e outros animais montanheses. Entre os devotos, há um grupo chamado Pastores de Teldiskan que viaja por Deheon pregando como seu padroeiro é uma divindade bondosa que trará bom tempo, chuvas adequadas e colheitas abundantes para o povo. Enquanto pregam que seu patrono se arrependeu e cumpre sua pena, os Pastores de Teldiskan arrebanham cada vez mais fiéis na tentativa de conseguir poder o suficiente para que o Gigante Máximo seja capaz de romper seu confinamento e dominar (ou destruir!) Deheon, vingando-se pela derrota de séculos atrás. Alguns dos mais fanáticos fazem sacrifícios humanos para seu deus, na tentativa de instigar sua sede de sangue.\n\nAssim, Teldiskan é uma divindade ambígua. Muitas gerações já o cultuaram como o deus do clima que ele parece ser, e suas preces foram atendidas. Mas vilões sanguinários servem a ele. Será Teldiskan um monstro arrependido ou uma ameaça futura? Ambos? Nenhum?",
    "crencas": "Vigiar o céu e prever o clima. Reverenciar e proteger as Montanhas Teldiskan. Ajudar o Gigante Máximo a alcançar liberdade. Pregar sobre a benevolência do Gigante Máximo e como suas bênçãos podem trazer prosperidade. Vingar-se do reino de Deheon.",
    "simboloSagrado": "Vários picos de montanhas surgindo por cima das nuvens.",
    "armaPreferida": "Tacape.",
    "devotosRacas": [
      "Dahllan",
      "Hynne",
      "Medusa",
      "Trog",
      "Gnoll",
      "Harpia",
      "Kallyanach",
      "Ogro"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida",
      "Lutador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Teldiskan devem pregar a benevolência de sua divindade por meio de seus atos e previsões climáticas. Uma vez por dia (ou por sessão de jogo, o que demorar mais), o devoto precisa convencer outra pessoa de que Teldiskan é um salvador ou prever o clima da região. Em termos de jogo, deve passar em um teste de Enganação ou Sobrevivência com CD mínima 15 + metade do seu nível.",
    "poderConcedido": {
      "nome": "Despertar do Gigante",
      "texto": "Você pode gastar uma ação de movimento e 3 PM para se tornar fisicamente mais imponente. Até o fim da cena você recebe +1 em Força e é considerado uma categoria de tamanho maior para modificadores de manobra de combate."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 44,
    "_duvida": "Devotos completos conforme o livro; 'Gnoll', 'Harpia', 'Kallyanach' e 'Ogro' ainda não têm raça correspondente no site, ficam no array pra quando forem adicionadas."
  },
  {
    "id": "tessalus",
    "nome": "Tessalus",
    "epiteto": "Deus dos Elfos-do-Mar",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "dual",
    "lore": "Nas águas turbulentas de Arton, Tessalus cresceu na tradição guerreira dos elfos-do-mar. Treinado desde a infância para a batalha, seu tridente encantado simbolizava a força e bravura desse povo bárbaro. Durante o acirrado conflito contra as sereias, ele se destacou como um líder feroz e destemido.\n\nUm dia, o destino o colocou frente a frente com Ayllana, a mais poderosa feiticeira entre as sereias. Em um duelo intenso, Tessalus viu seus ataques serem desviados por conjurações que invocavam redemoinhos, feras e tempestades. Aquele confronto, marcado pelo choque entre força bruta e poder místico, se tornaria lendário entre os elfos marinhos — pois Tessalus emergiu vitorioso, colocando a adversária em fuga.\n\nA admiração desmedida de seu povo elevou Tessalus ao status de Deus dos Elfos-do-Mar. Seu culto, pleno de rituais que exaltam a coragem, mantém viva a memória daquele confronto. Entre cânticos, cerimônias e duelos, seus seguidores espalham-se pelos mares de Arton, também dominando grandes extensões de Pelágia, o Reino de Oceano. Juram superar qualquer adversário, honrar a tradição e a fúria de seu deus bárbaro e, acima de tudo, buscam supremacia sobre as sereias.",
    "crencas": "Proteger os elfos-do-mar e sua soberania. Levar sua fúria às sereias e aos povos do mundo seco. Dominar os oceanos. Derrotar as sereias.",
    "simboloSagrado": "Um tridente.",
    "armaPreferida": "Tridente.",
    "devotosRacas": [
      "Qareen",
      "Elfo-do-Mar"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bucaneiro",
      "Caçador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Tessalus são proibidos de matar elfos-do-mar, recusar-se a ajudar elfos-do-mar, e recusar missões para resgatar ou proteger elfos-do-mar e seus ritos.",
    "poderConcedido": {
      "nome": "Arsenal do Oceano",
      "texto": "Você recebe proficiência em tridente e recebe +1 em testes de ataque e na margem de ameaça com essa arma. Se já for proficiente em tridente, seu dano aumenta em um passo."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 46,
    "_duvida": "Devotos completos conforme o livro; 'Elfo-do-Mar' ainda não tem raça correspondente no site (distinta de 'Elfo' genérico), fica no array pra quando for adicionada."
  },
  {
    "id": "toris",
    "nome": "Toris",
    "epiteto": "Deusa de Jallar",
    "natureza": "entidade primordial",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Pouquíssimas pessoas sabem da existência de Jallar, um minúsculo reino nos limites do Reinado. Isso se deve à paranoia de Toris, a deusa menor que fundou e protege o local desde sua origem. Seus devotos são praticamente toda a população do reino, seus clérigos são poucos e, anos atrás, ela possuía um paladino que era seu grande orgulho.\n\nO paladino passava os dias cavalgando e patrulhando as fronteiras do reino, e foi responsável por livrar Jallar da maioria dos monstros e animais perigosos que havia por lá. Entretanto, um dia esse homem santo passou uma noite com uma donzela que conhecia seus feitos e o admirava há muito tempo. Como recompensa, ao amanhecer foi fulminado por um relâmpago lançado por sua própria deusa.\n\nO corpo do paladino foi encontrado por um necromante e o resto é história. Quanto a Toris, após perder seu mais íntimo fiel, a deusa ficou ainda mais reclusa e paranoica. Com medo de perder fiéis para deuses mais poderosos ou para outros mortais, lançou um feitiço para esconder Jallar do restante do mundo.\n\nAlgumas pessoas duvidam da existência de Jallar e dizem que Toris não passa de uma lenda. De fato, ninguém sabe como esta deusa teria surgido (ela parece ser uma entidade que existe desde sempre) ou qual seria seu portfólio. É uma deusa do reino de Jallar, e Jallar é um reino que existe (será?) basicamente para adorar esta deusa. O tal feitiço que escondeu o reino teria sido lançado há algumas décadas, mas não existe registro de ninguém que tenha visitado Jallar, nem de nenhum habitante do reino fora de suas fronteiras, exceto pelo Paladino de Jallar. O destino desse paladino é ainda mais duvidoso. A história mais aceita do Paladino de Jallar envolve sua morte em um covil de Sckhar, não fulminado pela deusa. Será que o mesmo paladino morreu mais de uma vez? Se a história for falsa, por que ele se chamaria “Paladino de Jallar”? Teriam sido dois paladinos (talvez o mesmo guerreiro sagrado copiado magicamente de alguma forma)? Mas como uma deusa menor poderia ter dois paladinos? É possível que essas contradições e esse ceticismo sejam incentivados pela própria Toris. Afinal, ninguém pode tentar descobrir um reino que não acredita existir…",
    "crencas": "Proteger Jallar, seu povo e suas fronteiras. Conscientizar a população de que Jallar é seguro, e que o restante do mundo é perigoso e implacável.",
    "simboloSagrado": "Um castelo dentro de um círculo.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [],
    "devotosClasses": [
      "Caçador",
      "Cavaleiro",
      "Guerreiro",
      "Ladino",
      "Nobre",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Toris jamais podem ignorar um pedido de ajuda de um cidadão de Jallar e devem proteger qualquer membro de seu povo até a morte, se preciso. Além disso, mesmo nas raras ocasiões em que deve sair do reino para realizar alguma missão a pedido de sua deusa, o devoto deve manter contato com ela, não podendo permanecer mais de 2d10+10 dias sem conversar com ela (por meios mundanos ou mágicos) nem passar 1d4+2 meses sem voltar a Jallar para se reportar pessoalmente. Toris é infame por seus ciúmes. Qualquer atenção demasiada que um devoto dê a qualquer outra pessoa, coisa ou entidade pode valer sua fúria (contando como um descumprimento das Obrigações & Restrições ou valendo um relâmpago na cabeça…).",
    "poderConcedido": {
      "nome": "Véu de Toris",
      "texto": "Você recebe +5 em Furtividade e não sofre penalidade de armadura em testes dessa perícia. Além disso, você sempre sabe em que direção está Jallar, sendo capaz de encontrar o pequeno reino mesmo com a magia de proteção contra detecção invocada pela deusa."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 46
  },
  {
    "id": "tukala",
    "nome": "Tukala",
    "epiteto": "Deusa dos Texugos Alados",
    "natureza": "mortal ascendido",
    "statusDivino": 1,
    "energia": "dual",
    "lore": "Nascida nos Ermos Púrpuras e expulsa da região após uma série de conflitos contra criaturas da Tormenta, a Tribo do Texugo Cinzento possui um mito de criação próprio, em que a figura central é o Texugo, um ser alado (?!?) cujas asas foram roubadas por Sszzaas, que as deu de presente aos seus filhos, criando assim as serpes. Como vingança, o Texugo roubou os ovos das serpentes e os chocou ele mesmo. Quando os filhotes nasceram, ele deu aos rebentos sua fúria, criando assim os primeiros kobolds.\n\nNinguém sabe se há algo de real nesse mito (na verdade, qualquer pessoa sã diria que o mito é tão irreal que, cada vez que ele é repetido, algumas coisas reais se tornam fictícias). Mas, se por um milagre houver uma migalha factual nessa história, ela se relaciona apenas aos kobolds dessa tribo. O que implicaria que existe uma tribo de kobolds que difere de todo o resto dessas criaturas, e que descende de um texugo alado que… Não, melhor não pensar nisso. Verdadeira ou não, a história é contada com orgulho pelos membros dos Texugos Cinzentos e deu origem até a uma ordem de bravos bárbaros alados que ostentam o título de Furiosos Cinzentos.\n\nDescendente direta do Texugo, a poderosa e exaltada Tukala herdou a força e a fúria de seu antepassado divino. Como Deusa Menor dos Texugos Alados, ela protege todos aqueles que erguem sua visão aos céus em busca de ajuda do Texugo.\n\n“Tukala”, na verdade, é uma fêmea de texugo que a Tribo trouxe consigo dos Ermos Púrpuras como uma de suas mascotes. Não há nenhuma evidência de que ela tenha alguma ascendência divina. Mas nossos diminutos heróis acreditam nisso com força suficiente para que, de alguma forma, a magia aconteça.\n\nSustentada à base de besouros e guloseimas, Tukala de fato abençoa a tribo e permite que Grund, o chefe da Tribo, evoque uma revoada de texugos espectrais em seu auxílio. Em retribuição, a Tribo espalha a palavra (?!?) de Tukala entre todos aqueles que buscam de alguma forma alcançar os céus.",
    "crencas": "Proteger todos os texugos e outros pequenos mamíferos escavadores e permitir que eles voem livres pelos céus. Combater Sszzaas e todas as formas de mentira. Impedir que qualquer ser inocente tenha suas asas roubadas. Voar, como é natural para todos os texugos.",
    "simboloSagrado": "Contorno cinza do rosto de um texugo sobreposto a um par de asas de morcego.",
    "armaPreferida": "Espada curta.",
    "devotosRacas": [
      "Goblin",
      "Sílfide",
      "Duende",
      "Kobold"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Bardo",
      "Caçador",
      "Druida",
      "Inventor",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Tukala não podem trilhar os caminhos de Sszzaas; eles são proibidos de mentir ou usar qualquer forma de Enganação. Eles também são proibidos de matar texugos e outros pequenos mamíferos escavadores (incluindo carcajus, raposas, tatus e canídeos). Jamais podem negar o desejo de voar de outras criaturas, a menos que isso seja usado para a mentira ou o mal.",
    "poderConcedido": {
      "nome": "Revoada de Texugos",
      "texto": "Você pode gastar uma ação de movimento e 3 PM para invocar uma revoada de 1d4+1 texugos alados espirituais que ficam ao seu redor até o fim da cena. Enquanto estiverem ao seu redor, os texugos fornecem +2 em rolagens de dano corpo a corpo e na Defesa. Além disso, quando sofre dano, você pode “gastar” um dos texugos alados para receber RD 5 contra esse dano."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 47,
    "_duvida": "Devotos completos conforme o livro; 'Duende' e 'Kobold' ainda não têm raça correspondente no site, e 'Treinador' ainda não tem classe correspondente, ficam nos arrays pra quando forem adicionadas."
  },
  {
    "id": "ur",
    "nome": "Ur",
    "epiteto": "Deus dos Carvalhos",
    "natureza": "entidade primordial",
    "statusDivino": 3,
    "energia": "positiva",
    "lore": "Ur é uma das criaturas mais antigas de Arton. Lembra-se do mundo antes da Revolta dos Três e até mesmo antes da chegada dos elfos. Não se sabe se era um carvalho que adquiriu consciência por ser adorado ou se é um ente. O próprio Ur diz que isso não importa — quando se é tão velho quanto ele, lembrar de pormenores do passado pode tomar o resto da vida.\n\nSe as árvores possuem consciência, as florestas de Tollon cultuam Ur. Os entes certamente são seus seguidores. Alguns sábios afirmam que todos os entes de Arton estão em uma peregrinação até Ur — mas são tão lentos e pacientes que os humanos (e até mesmo os elfos!) não notam seus movimentos vagarosos e deliberados.\n\nUr prefere passar seus dias em contemplação silenciosa. Mesmo quando é abordado por seus fiéis, passa longo tempo sem dizer nada, deixando que seu silêncio e placidez tragam as respostas. Apenas em casos de grande emergência (como um incêndio fora de controle) desloca-se e fala ativamente.",
    "crencas": "Reverenciar Ur, as árvores e os seres da natureza. Proteger as florestas e a vida selvagem. Combater incêndios, desmatamentos desenfreados, monstros, mortos-vivos e outras situações ou criaturas que perturbam o equilíbrio natural das florestas. Peregrinar até Ur.",
    "simboloSagrado": "Um carvalho com uma face.",
    "armaPreferida": "Bordão.",
    "devotosRacas": [
      "Anão",
      "Dahllan",
      "Elfo",
      "Sílfide",
      "Eiradaan"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Caçador",
      "Druida"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Ur não podem causar dano de fogo direta ou indiretamente a nenhuma criatura. Além disso, não podem descansar em nenhuma comunidade maior que uma aldeia (não perdem seus poderes, mas também não recuperam pontos de vida ou mana).",
    "poderConcedido": {
      "nome": "Trilhas das Árvores Antigas",
      "texto": "Uma vez por rodada, você pode gastar 1 PM para entrar em uma árvore adjacente de tamanho igual ou maior que o seu e sair em outra árvore em alcance longo (também de tamanho igual ou maior que o seu). Você não precisa de linha de visão para a árvore de saída, mas deve estar ciente de sua existência."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 48,
    "_duvida": "Devotos completos conforme o livro; 'Eiradaan' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "yasshara",
    "nome": "Yasshara",
    "epiteto": "Deusa da Opressão",
    "natureza": "mortal ascendido",
    "statusDivino": 3,
    "energia": "negativa",
    "lore": "Inimiga mortal de Anilatir, a Deusa da Inspiração, Yasshara é uma divindade marcada por uma história trágica. Quando jovem, seus pais foram mortos por uma mulher desequilibrada, que desejava forjar jovens “com potencial” para se tornarem aventureiros. Devastada, Yasshara se uniu ao clero de Khalmyr, na busca por algo nos dogmas do Deus da Justiça que pudesse explicar a insanidade que destruiu sua vida e a de tantas outras pessoas. No entanto, nada conseguiu aliviar sua alma.\n\nApós descobrir a identidade de sua algoz e enfrentar no clero de Nimb inimigos tão cruéis quanto ela, Yasshara assumiu como missão pessoal erradicar o caos do mundo e transformar a realidade em algo rígido e ordenado. Embora à primeira vista sua causa parecesse nobre, com o tempo a busca de Yasshara e de seu séquito se afastou dos preceitos de justiça de Khalmyr, focando unicamente em “consertar” a realidade, tornando-a estável e “compreensível”.\n\nIsso é uma das versões da história de Yasshara. Outra versão da história, difundida pelos devotos de Anilatir, diz que Yasshara foi uma nobre que, desde sempre, teve uma necessidade doentia de monitorar e controlar as vidas de seus servos. Precisava que tudo fosse ordenado, previsível e igual, sempre. Teria sido devota de Khalmyr, mas perdeu a fé quando notou que o Deus da Justiça não era capaz de impor a verdadeira estabilidade. Proibiu a entrada de aventureiros em seu feudo, pois eles traziam coisas novas. Proibiu quaisquer inventos ou inovações que não existissem quando ela própria era uma criança. Por fim, passou a controlar de tal modo as vidas de seu povo que esse controle adquiriu características sagradas e ela ascendeu à divindade. Em sua busca obsessiva por eliminar tudo que é novo e diferente, por tornar Arton segura, constante e estanque, ela expandiu seu culto para além de suas fronteiras, criando uma verdadeira rede de devotos conspiradores, dedicados à opressão.\n\nEm ambas as versões, e em muitas outras, o clero de Yasshara teria entrado em conflito com o clero de Anilatir, e ambas existiriam numa eterna guerra pelo futuro de Arton.\n\nExiste ainda outra versão, sussurrada por poucos: Yasshara e Anilatir seriam a mesma pessoa, inimiga de si mesma. Afinal, para que exista inspiração para heróis, é preciso haver vilões. E, para que possa haver opressão e controle, é preciso que haja alguém ameaçando essa estabilidade.",
    "crencas": "Destruir o caos e a aleatoriedade. Pregar a ordem e a estabilidade. Fazer com que tudo seja igual, sempre. Moldar a realidade em padrões simplistas e compreensíveis até mesmo por aqueles de mente mais fechada. Impedir inovações.",
    "simboloSagrado": "Uma balança dentro de um círculo perfeito.",
    "armaPreferida": "Espada longa.",
    "devotosRacas": [
      "Anão",
      "Elfo",
      "Minotauro",
      "Finntroll"
    ],
    "devotosClasses": [
      "Cavaleiro",
      "Guerreiro",
      "Nobre"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Yasshara devem escolher o destino dos outros para que o mundo tenha ordem óbvia. Eles precisam garantir que, pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais), uma criatura obedeça a suas ordens. Em termos de jogo, uma ação exigindo um teste de Diplomacia ou Intimidação com CD mínima 15 + metade do seu nível. Além disso, o devoto deve estar sempre atento às tramas de Anilatir, a Deusa Menor da Inspiração, inimiga mortal de Yasshara. Por último, sempre que houver possibilidade de escolher 10 em um teste, o devoto deve fazer isso.",
    "poderConcedido": {
      "nome": "Oprimir Escolhas",
      "texto": "Quando uma criatura em alcance curto faz um teste de perícia, você pode gastar 2 PM para forçar essa criatura a escolher 10 nesse teste (mesmo que isso não seja possível). A criatura tem direito a um teste de Vontade (CD Sab) para resistir a esse efeito. Você só pode usar este poder uma vez por criatura em cada cena."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 49,
    "_duvida": "Devotos completos conforme o livro; 'Finntroll' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  },
  {
    "id": "zadbblein",
    "nome": "Zadbblein",
    "epiteto": "Dragoa-Rainha das Florestas",
    "natureza": "dragão-real",
    "statusDivino": 4,
    "energia": "negativa",
    "lore": "Havia outro Dragão-Real não muitos anos atrás — Heart, o Dragão-Rei das Montanhas. Depois de sua morte nas mãos do Paladino de Arton, muitos pensaram que passaria a haver um Dragão-Real a menos. Não conheciam Zadbblein, a Dragoa-Rainha das Florestas.\n\nZadbblein é a irmã gêmea de Heart — fisicamente mais fraca, mas ardilosa e hábil na magia. Tem personalidade oposta à de seu irmão: enquanto Heart era pacato e preguiçoso, preferindo maldades menores como escravizar e torturar, Zadbblein sempre foi agressiva. Com a morte de Heart, Zadbblein voltou a se sentir à vontade para fazer suas aparições, principalmente na Floresta das Escamas Verdes, considerando essa e todas as florestas da região sua propriedade. Protege e defende grandes áreas florestais e seu equilíbrio natural.\n\nPara irritá-la, Heart costumava chamá-la de “falsa druida”, lembrando que Allihanna nunca iria aceitá-la. No entanto, acredita-se que a energia vital de Zadbblein é tão poderosa que faz as florestas onde passa a maior parte de seu tempo espalharem-se com mais rapidez. Alguns druidas e xamãs deram boas-vindas à Dragoa-Rainha das Florestas, acreditando que poderia ser sinal de uma reconciliação entre Allihanna e seu irmão Megalokk. No entanto, outros apontam atos de destruição e crueldade praticados por Zadbblein contra qualquer criatura que pise em suas florestas — especialmente monstros e seres não naturais, como construtos e mortos-vivos. Podem ser atos de proteção ou vingança, ninguém sabe ao certo.\n\nE a própria Zadbblein, mesmo antes da volta de Kallyadranoch, sempre soube que Megalokk nunca poderia ser o deus criador dos dragões. Quando o Deus dos Dragões voltou, preso no corpo da elfa Yadallina, Zadbblein ofereceu a ele sua magia e sua esperteza.\n\nA aptidão de Zadbblein para a magia às vezes parece contradizer seu amor pela natureza — mas tudo fica claro quando lembramos que, como a maioria dos dragões, ela é acima de tudo maligna. Zadbblein odeia seres não naturais, mas acredita poder “aperfeiçoar” a natureza. Afinal, se a presença de um dragão pode impulsionar o crescimento das florestas, um pouco de intervenção arcana poderia beneficiar seus habitantes…\n\nZadbblein por vezes assume a forma de uma bela elfa com longos cabelos negros e olhos verdes. Usa roupas que lembram as escamas de sua forma natural, mas também pode ser vista vestindo folhagens, como uma dríade. Está quase sempre acompanhada por animais selvagens, que não a temem. Sua forma dracônica é graciosa. Comparativamente, é pequena (embora ainda impressionante). Tem escamas tão verdes quanto esmeraldas.",
    "crencas": "Reverenciar Zadbblein. Promover harmonia entre todas as criaturas vivas nas florestas. Aperfeiçoar as criaturas das florestas. Reverenciar a superioridade dos dragões da terra. Combater quaisquer criaturas que invadam o território da Dragoa-Rainha das Florestas. Promover a expansão e a evolução dos domínios de Zadbblein.",
    "simboloSagrado": "Árvore cujas folhas são escamas verdes.",
    "armaPreferida": "Bordão.",
    "devotosRacas": [
      "Dahllan",
      "Elfo",
      "Trog",
      "Centauro",
      "Eiradaan",
      "Kallyanach",
      "Sátiro",
      "Tabrachi"
    ],
    "devotosClasses": [
      "Arcanista",
      "Bárbaro",
      "Caçador",
      "Druida",
      "Guerreiro",
      "Treinador"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Zadbblein devem proteger a Floresta das Escamas Verdes e não podem ferir nenhum animal ou dragão nativo dessa floresta, ou de outras florestas que sejam território de Zadbblein. Além disso, uma vez por mês, devem expandir os domínios ou a influência da Dragoa-Rainha significativamente.",
    "poderConcedido": {
      "nome": "Natureza Gloriosa",
      "texto": "Você pode gastar 2 PM para que uma parte de seu corpo assuma uma forma animalesca até você ficar inconsciente ou escolher encerrá-la (uma ação livre). Quando faz isso, você recebe dois benefícios a sua escolha entre os seguintes: uma arma natural à sua escolha (dano 1d6, crítico x2, a sua escolha entre corte, impacto ou perfuração); +1 passo de dano em uma de suas armas naturais; +2 na Defesa; +6m de deslocamento; deslocamento de natação 9m; faro; ou +5 em Atletismo e Fortitude."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 50,
    "_duvida": "Devotos completos conforme o livro; a grafia 'eiradann' do original foi normalizada para 'Eiradaan' (consistente com os demais deuses que citam esse termo). 'Centauro', 'Eiradaan', 'Kallyanach', 'Sátiro' e 'Tabrachi' (raças) e 'Treinador' (classe) ainda não têm correspondente no site, ficam nos arrays pra quando forem adicionados."
  },
  {
    "id": "zakharov",
    "nome": "Zakharov",
    "epiteto": "Deus da Bravura",
    "natureza": "mortal ascendido",
    "statusDivino": 4,
    "energia": "dual",
    "lore": "Uma das várias divindades anãs, Zakharov era um anão imensamente forte e musculoso, com um corpo tão robusto e duro que parecia uma estátua esculpida em mármore. Sua pele dava a impressão de ser feita de pedra. Ao contrário dos demais anões, ele não costumava ser visto com armadura alguma protegendo seu torso. Os equipamentos de batalha deste herói lendário se resumem ao seu elmo aberto, que sempre revelava sua farta e cobreada barba, e ao seu inseparável machado mágico, o Zakharin. Enfrentando todos os desafios de peito aberto, sem demonstrar hesitação ou mesmo necessidade de autopreservação, Zakharov passou a ser mais do que admirado — tornou-se adorado. Ascendeu à divindade, como Deus da Bravura.\n\nSão muitas as histórias contadas sobre a coragem de Zakharov. Tantas, na verdade, que chegam a entrar em contradição: na mesma época Zakharov teria estado tanto vários níveis abaixo de Doherimm, enfrentando sozinho um clã de gigantes do fogo, quanto na superfície, caçando uma coluna finntroll. Teria olhado nos olhos da Rainha das Medusas (uma entidade que não existe exceto em algumas lendas), fazendo com que ela se transformasse em pedra, e desembaraçado suas serpentes, conquistando sua amizade eterna. Teria domado todos os javalis doheritas e criado ele mesmo essa espécie, ao desafiar um rinoceronte para que fosse mais compacto e adequado ao subterrâneo!\n\nSeja como for, algo é constante em quase todas as histórias: Zakharov é uma figura despojada e simples. Não seria nem um pouco apegado a seu lendário machado, às vezes esquecendo-o ao voltar para casa depois de mais uma aventura. Numa dessas ocasiões, quando mais uma vez uma comitiva de devotos veio lhe devolver a arma, Zakharov teria dito para que ficassem com ela e “usassem para alguma coisa útil um dia”. Essa seria a razão pela qual Zakharin foi presenteado de forma tão livre e surpreendente pelos anões aos humanos que colonizaram o reino de Zakharov.\n\nÉ justamente em honra a este deus que a nação humana de Zakharov e sua capital, Zakharin, receberam seus nomes. No entanto, devido a uma desavença ocorrida décadas atrás, considerada pelos anões como um desrespeito à divindade, as relações entre o reino humano e o reino anão nunca mais foram as mesmas.\n\nNão se sabe o paradeiro atual de Zakharov. Alguns afirmam que ele está escavando um túnel para o outro lado do mundo, apenas porque isso é algo muito perigoso. Outros garantem que anda pela superfície em busca de desafios. Há quem diga que ele morreu na Batalha de Tamu-ra, em 1405, enquanto outros afirmam que está vivendo tranquilamente em Doher e pode ser visto bebendo cerveja em várias tavernas da cidade.",
    "crencas": "Honrar e proteger a raça, a cultura e as tradições anãs. Combater os finntroll e quaisquer outros inimigos da raça anã. Lutar o bom combate. Demonstrar coragem. Não se proteger demais. Encarar desafios — quanto mais difíceis, melhor.",
    "simboloSagrado": "Um braço segurando o machado Zakharin.",
    "armaPreferida": "Machado anão.",
    "devotosRacas": [
      "Anão",
      "Golem",
      "Minotauro",
      "Trog",
      "Centauro"
    ],
    "devotosClasses": [
      "Bárbaro",
      "Cavaleiro",
      "Guerreiro",
      "Lutador",
      "Paladino"
    ],
    "devotosNota": null,
    "obrigacoes": "Devotos de Zakharov devem fazer pelo menos uma demonstração de coragem por aventura (ou por mês, de acordo com o mestre). Para este efeito, uma demonstração de coragem é qualquer ato no qual o personagem possa morrer ou sofrer uma consequência grave e/ou permanente, que seja realizado sem nenhuma preparação que garanta sua segurança. Por exemplo, lutar contra um ogro sozinho, tentar escalar uma montanha sem equipamento ou tomar para si um item mágico que provavelmente é amaldiçoado são demonstrações de coragem. Enfrentar o mesmo ogro com seu grupo, escalar a montanha devidamente equipado ou tomar para si um item mágico qualquer não são. O mestre tem a palavra final sobre o que configura uma demonstração de coragem.",
    "poderConcedido": {
      "nome": "Irmão da Coragem",
      "texto": "Você se torna imune a medo (se já for imune, em vez disso recebe +2 em Vontade). Além disso, uma vez por cena envolvendo um perigo, você pode substituir um teste de perícia por um teste de Vontade."
    },
    "fonte": "Guia de Deuses Menores",
    "pagina": 51,
    "_duvida": "Devotos completos conforme o livro; 'Centauro' ainda não tem raça correspondente no site, fica no array pra quando for adicionada."
  }
];

// Expõe globalmente
if (typeof window !== 'undefined') window.DEUSES_MENORES = DEUSES_MENORES;
