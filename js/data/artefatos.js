/* ============================================================
   TORMENTA 20 — artefatos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 345-349 (Artefatos)

   Artefatos são itens mágicos únicos e lendários — o livro é
   explícito: "Não há tabelas para geração aleatória de artefatos,
   nem custo para fabricá-los. Esses itens devem entrar em uma
   campanha apenas por decisão deliberada do mestre." Por isso não
   têm preço nem CD de fabricação, ao contrário de todo o resto do
   capítulo de Itens Mágicos.

   Cada entrada:
   { id, nome, descricao, tabela?, fonte?, pagina? }

   tabela (só o Baralho do Caos tem): {colunas, linhas}, reaproveitando
   o mesmo formato/render de outras tabelas do site (Vidência, Animar
   Objetos em magias.js) — as 22 cartas do d% embutido no artefato.

   fonte/pagina: OPCIONAIS — ausentes nos 5 artefatos do livro-base (a
   badge de fonte assume 'Tormenta 20' quando o campo não existe). Só
   aparecem num artefato vindo de outro livro-fonte (ex.: Guia de NPCs).
   Kum'shrak e Gemas Eternas foram colocados aqui (em vez de Armas/
   Itens) por serem narrativamente únicos, sem preço/tabela de
   fabricação — o mesmo perfil dos demais artefatos deste arquivo.
============================================================ */

const ARTEFATOS = [

  {
    id: 'espada-deus', nome: 'A Espada-Deus',
    descricao: 'Poucos duvidam: as divindades estão presentes em cada aspecto da vida em Arton. Uma das provas disso é a capacidade dos mortais de se tornarem deuses menores. Contudo, tão forte é o poder divino que até mesmo objetos podem ser deuses. A Espada-Deus não é um objeto sagrado — não é poderosa porque foi abençoada por um deus. A espada-deus é, ela própria, cultuada. Ela oferece bênçãos, possui clérigos, ouve preces.\n\nA Espada-Deus é a melhor arma já forjada por Rhond, o Deus Menor das Armas. Foi empunhada por incontáveis heróis e vilões, mas os nomes desses mortais foram esquecidos — a arma é maior que todos. Após ser usada por algum tempo, sempre acaba em algum local inóspito de onde só pode ser tirada por um mortal digno. A arma foi vista pela última vez nas mãos de Orion Drake, na batalha contra a Tormenta em Tamu-ra.\n\nMecanicamente, a Espada-Deus é uma espada longa atroz precisa pungente ameaçadora magnífica veloz, com dano básico de 2d12. Seu fio é tão fino que corta em todos os Planos de existência simultaneamente — a arma ignora redução de dano e seus acertos críticos afetam até mesmo criaturas imunes a acertos críticos. A Espada-Deus é indestrutível. Quando há chance de combate, ela vibra na mão do usuário ou mesmo na bainha. Apenas personagens com pelo menos 15 níveis em classes com Luta como perícia inicial podem usá-la — os demais erram todos os ataques com a arma. Quando está aguardando seu próximo usuário, a Espada-Deus não permite que um personagem que não cumpra esse pré-requisito a tire de onde está.\n\nFisicamente, a Espada-Deus é surpreendentemente simples: cabo forrado de couro, guarda-mão de metal sem adornos, lâmina lisa. Seu poder real não se revela na aparência — apenas na luta.',
  },
  {
    id: 'joia-da-alma', nome: 'A Joia da Alma',
    descricao: 'No princípio não havia deuses. Nem vida, nem mundo, nem mesmo o próprio tempo. Foi em meio à não existência que o Nada e o Vazio se casaram e deram origem à Criação e tudo que a compõe — o mundo de Arton. Engana-se, porém, quem pensa que nenhum vestígio restou da aurora do universo. Há uma fagulha, um resíduo da inexistência que se manifesta na forma de uma gema preciosa que ainda hoje busca cumprir o propósito de sua essência. Os mortais a chamam de Joia da Alma.\n\nÉ tênue a linha entre a existência e a não existência. Perdida em um ambiente que não o seu, a Joia da Alma busca transpor essa barreira, vasculhando a memória daqueles que a tocam em busca de falhas na realidade que possa usar como meio para se reunir ao outro lado. Não é capaz de impor uma ação aos seres de carne e osso, mas se alimenta daquilo que enxerga — o que torna o contato prolongado algo perigoso, capaz de causar danos irreparáveis ao espírito do portador.\n\nQualquer um que toque a Joia da Alma terá seu passado esmiuçado pela pedra, recuperando instantaneamente todas as memórias de sua vida, boas e ruins, desde o nascimento até agora — muitas vezes de forma dolorosa. O portador mantém todas as lembranças enquanto segurar a joia; ao soltá-la, as memórias retornam ao esquecimento.\n\nMecanicamente, portar a Joia da Alma fornece +3 em Inteligência (somente após um dia de uso). É cobiçada por arcanistas que memorizam magias, pois impede que elas sumam da memória — para magos, o custo para lançar magias arcanas diminui para 0 PM (custos de aprimoramentos ainda precisam ser pagos).\n\nEmpunhar a Joia da Alma exige um teste de Vontade (CD 25). Se falhar, o personagem fica atordoado por uma rodada e larga o artefato no chão. Se passar, consegue segurá-la sem efeitos colaterais — mas precisa repetir o teste no início de cada dia, com a CD aumentando cumulativamente em +1 por dia. Se falhar, fica frustrado; se falhar de novo, fica esmorecido; num terceiro teste falho, sua sanidade se esvai — se for um personagem jogador, torna-se um NPC sob controle do mestre. A Joia não foi feita para ser empunhada por mortais.\n\nFisicamente, a Joia da Alma é uma gema indestrutível e semitransparente, lapidada com vinte faces iguais — as mesmas faces dos vinte deuses primordiais, cujo nascimento ela presenciou.',
  },
  {
    id: 'baralho-do-caos', nome: 'O Baralho do Caos',
    descricao: 'Este artefato parece um baralho comum, com cartas bastante gastas. Ele pode ser usado para jogos como wyrt e fornece +10 em testes de Jogatina para seu usuário — mas caso ele abuse da sorte, o bônus se transforma em uma penalidade de –10 (o mestre decide o que é "abusar da sorte").\n\nPorém, o verdadeiro poder do Baralho do Caos se revela quando um personagem diz "Eu aposto tudo" e saca de uma a quatro cartas, a sua escolha. O artefato muda para ter 22 cartas, cada uma com um símbolo específico. As cartas devem ser sacadas ao mesmo tempo e seus efeitos acontecem instantaneamente — para o bem ou para o mal. Role 1d% na tabela abaixo para cada carta sacada (role novamente resultados repetidos). Um personagem treinado em Jogatina pode fazer um teste (CD 30) para ignorar uma carta que não queira e sacar outra no lugar (apenas uma vez).\n\nQuando é usado dessa forma, o Baralho do Caos desaparece, para reaparecer em uma mesa de jogo qualquer de Arton — já apareceu nas mais imundas tavernas portuárias e nos mais elegantes salões de palácios, transformando mendigos em reis e reis em mendigos.',
    tabela: {
      colunas: ['d%', 'Carta', 'Efeito'],
      linhas: [
        ['01-05', 'Abismo', 'Recebe redução de dano 10 a um tipo definido aleatoriamente'],
        ['06-09', 'Amigo', 'Um parceiro racional o trai no pior momento possível, em até um ano'],
        ['10-14', 'Anel', '+5 pontos de mana permanentemente'],
        ['15-19', 'Árvore', '+10 pontos de vida permanentemente'],
        ['20-24', 'Coração', '+1 em um atributo a sua escolha, permanentemente'],
        ['25-28', 'Crânio', 'Enfrenta uma cópia sombria de si mesmo (mesmas estatísticas, imune a ataques de outros)'],
        ['29-33', 'Donzela', 'Derrota um monstro (ND = seu nível –1) e sobe de nível, ou fica inconsciente se perder'],
        ['34-38', 'Fogo', 'Ressuscita com PV/PM restaurados na próxima vez que morrer'],
        ['39-43', 'Gema', 'Recebe tesouro mundano (role 10x na coluna "Maior" da Tabela 8-2: Riquezas)'],
        ['44-48', 'Lua', 'Recebe de 1 a 4 Desejos (Lua cheia/nova/crescente/minguante), a usar até o fim da cena'],
        ['49-52', 'Martelo', 'Perde todos os itens mágicos que possui'],
        ['53-56', 'Noite', '–1 permanente em todos os testes de resistência (devotos de Tenebra/mortos-vivos rolam uma arma mágica maior em vez disso)'],
        ['57-60', 'Presas', 'Todo o dinheiro e itens mundanos que possui (mesmo os que não estão com você) viram pó'],
        ['61-65', 'Servo', 'Recebe os serviços de um parceiro veterano (um servo com dívida de honra), a sua escolha de tipo'],
        ['66-70', 'Sol', 'Recebe uma arma mágica maior (devotos de Tenebra/mortos-vivos sofrem –1 permanente em resistência em vez disso)'],
        ['71-75', 'Tentáculo', '–1 permanente em um atributo aleatório (role 1d6: 1=Força, 2=Destreza...)'],
        ['76-80', 'Tolo', 'Perde 10.000 XP (mínimo 0) e saca outra carta'],
        ['81-85', 'Trono', '+2 permanente em Diplomacia e torna-se senhor de um pequeno feudo (poder Título, do cavaleiro)'],
        ['86-90', 'Vizir', 'Recebe a resposta verdadeira para uma pergunta qualquer, a usar em até um ano'],
        ['91-94', 'Nada', 'Anula qualquer ataque ou efeito contra você e ganha imunidade a tudo por 1 rodada, a usar em até um ano'],
        ['95-98', 'Vazio', 'Sua alma é transportada pro vazio entre os Planos — o corpo fica em coma até ser resgatado'],
        ['99-100', 'Curinga', 'Escolhe entre ganhar 10.000 XP ou sacar mais duas cartas'],
      ],
    },
  },
  {
    id: 'olho-de-sszzaas', nome: 'O Olho de Sszzaas',
    descricao: 'Como parte de seu plano para retornar ao Panteão, o deus Sszzaas removeu um de seus próprios olhos para forjar um artefato — o Olho de Sszzaas, uma gema esverdeada segura por um cajado de madeira fossilizada. As extremidades do cajado são ligadas por uma corrente, cujo comprimento pode variar magicamente.\n\nCultistas de Sszzaas foram encarregados de esconder o artefato em um templo nas proximidades de Lenórienn, onde deveria ser encontrado pela pessoa certa. O portador da peça acreditaria ser capaz de usar magia poderosa, quando na verdade estaria servindo aos interesses do Grande Corruptor. De fato, o Olho carrega parte da consciência do próprio Sszzaas, que testemunha e manipula tudo à distância.\n\nMecanicamente, o cajado permite ao personagem lançar qualquer magia que conheça ou tenha ouvido falar — seja arcana ou divina — como se fosse uma habilidade mágica, sem precisar gastar pontos de mana. O personagem ainda pode usar aprimoramentos, mas precisa pagar por eles. Lançar uma magia exige um teste de Misticismo (CD 20 + o custo em PM da magia, incluindo aprimoramentos). Se o teste falhar, a magia não funciona ou provoca algum efeito imprevisível (alvo trocado, efeito invertido, Teletransporte para um local diferente...) ou assim parece — na verdade, sempre que uma magia "falha", isso quer dizer que Sszzaas está no controle, e as coisas estão saindo exatamente como ele planejou, seguindo algum plano intrincado e desconhecido pelo portador do cajado.\n\nApesar de poderoso, o Olho de Sszzaas é uma peça pouco conhecida. Reconhecê-lo e descobrir como usá-lo exige um teste de Conhecimento (CD 30).',
  },
  {
    id: 'rubis-da-virtude', nome: 'Os Rubis da Virtude',
    descricao: 'Criados para selar um pacto entre os deuses do Panteão, os Rubis da Virtude quase foram a causa de sua morte. Cada um, se destruído, destruiria também o deus que estivesse secretamente ligado a ele — sem que fosse possível descobrir qual rubi pertencia a quem. Entregues a cada deus após sua criação, seriam mantidos como provas de confiança, garantias de que os deuses, mesmo aqueles envolvidos em disputas, jamais tentariam destruir uns aos outros.\n\nAs gemas não podem ser danificadas por mortais ou mesmo por deuses menores — apenas um deus do Panteão pode destruí-las. Além disso, não podem ser detectadas por meios mágicos.\n\nMesmo sem saber a quem estava ligada, cada deus guardou em lugar seguro a gema em sua posse. No entanto, conseguindo o que parecia ser impossível, Sszzaas — o mais traiçoeiro e furtivo dos seres — roubou todos os rubis. Ele foi descoberto e julgado antes de descobrir como utilizá-los, mas teve tempo de escondê-los em Arton. E os Rubis, protegidos de qualquer detecção mágica, não puderam ser encontrados. Como castigo, Sszzaas foi transformado em avatar e condenado a vagar pelo mundo até ser destruído ou aceito de volta. Os Rubis estavam desaparecidos, mas nenhum mortal poderia danificá-los — mesmo assim, para evitar riscos, Khalmyr decretou que as ligações vitais entre os rubis e os deuses fossem rompidas.\n\nMesmo sem essa conexão, as gemas ainda eram poderosas, pois traziam parte da essência divina dos vinte deuses. Sabendo que poderia utilizá-las de alguma forma, Sszzaas tratou de mantê-las longe dos olhos dos deuses, até o último instante.\n\nMecanicamente, cada Rubi da Virtude fornece a seu portador um nível de experiência em uma classe que ele já possua. Para isso, a gema deve ser incrustada no corpo da criatura, o que exige um teste de Cura (CD 25) — o efeito leva um dia para se manifestar. Por sua invulnerabilidade, cada Rubi fornece redução de dano 2 e +1 em testes de resistência, cumulativos com efeitos já existentes, incluindo outros rubis. Por fim, por sua indetectabilidade, cada rubi torna o portador mais difícil de observar por meios mágicos — um conjurador que lance uma magia de adivinhação contra o portador de um destes artefatos deve passar em um teste de Misticismo (CD 30 + a quantidade de rubis) ou a magia não terá efeito.',
  },

  // ══════════════════════ GUIA DE NPCs ══════════════════════

  {
    id: 'armadura-de-cranio-negro', nome: 'Armadura de Crânio Negro',
    descricao: 'Esta armadura foi criada pelos diabretes negociantes a partir das memórias de Ellisa Thorn, ex-membro do Esquadrão do Inferno. Sua aparência é notável e ameaçadora: completamente negra, parece sugar a luz e destaca-se até mesmo contra o céu noturno. O elmo tem a forma de um crânio estilizado, com adornos que o tornam ainda mais sinistro. Ela é uma armadura completa fortificada guardiã macabra que parece se mover sozinha (suas placas deslizam para manter o usuário protegido e defendê-lo). Apesar de seu peso e rigidez, não atrapalha os movimentos, permitindo saltos e acrobacias em meio ao combate: conta como uma armadura leve com penalidade de armadura 0. Contudo, por ser feita a partir das memórias de uma artoniana, a armadura tem um efeito colateral: bombardeia o usuário com impressões da vida de Ellisa Thorn. Molda o estilo de luta e até mesmo parte do comportamento do usuário para refletir os membros do Esquadrão do Inferno. Por exemplo, Crânio Negro luta com duas espadas (como Vallen Allond), rastreia (como a própria Ellisa ou Andilla Dente-de-Ferro) e repete "não há morte" (como Gregor Vahn).\n\nAtualmente em posse de Crânio Negro, junto com o Anel da Felicidade de Vallen.',
    fonte: 'Guia de NPCs', pagina: 8,
  },
  {
    id: 'anel-da-felicidade-de-vallen', nome: 'Anel da Felicidade de Vallen',
    descricao: 'Este anel foi criado pelos diabretes negociantes a partir da felicidade de Vallen Allond. Foi concedido a Crânio Negro por motivos que apenas os diabretes conhecem — mas que, de forma geral, podem ser resumidos a sadismo e desejo de destruição. O anel da felicidade de Vallen fornece cura acelerada 10 (somente após um dia de uso) que recupera até perda de vida. Além disso, se o usuário for morto enquanto estiver usando o anel e continuar com ele, irá recuperar 1 ponto de vida por dia e, quando chegar a PV positivos, será ressuscitado. Sendo feito a partir da felicidade de Vallen Allond, o anel tem um efeito colateral: o usuário é assaltado por visões desse aventureiro e sente compulsão de protegê-lo, estar perto dele ou garantir sua felicidade. É claro que, para um usuário insano, os conceitos de "proteger" e "garantir a felicidade" tornam-se bem distorcidos… O anel também influencia o comportamento do usuário (tornando-o um pouco mais semelhante a Vallen).\n\nAtualmente em posse de Crânio Negro, junto com a Armadura de Crânio Negro.',
    fonte: 'Guia de NPCs', pagina: 8,
  },
  {
    id: 'artefato-de-cross', nome: 'O Artefato de Cross',
    descricao: 'Esta arma única é um item puramente mundano e tecnológico, inventado e forjado pelas mentes geniais e doentias de demônios. Ela é composta por diversos canos de mosquete, que giram por meio de engrenagens quando o usuário puxa uma alavanca. O artefato é pesado e desajeitado, mas quando acionado, dispara todos os seus canos, banhando os alvos com uma chuva de chumbo. O Artefato de Cross é uma arma de fogo de duas mãos (dano 2d12, crítico 19/x3, alcance médio, perfuração) que fornece +10 nos testes de ataque e, em caso de acerto, causa +1d12 pontos de dano para cada 2 pontos pelos quais o resultado do ataque passar a Defesa do alvo. Recarregá-lo é uma ação padrão.\n\nAtualmente está em posse do Senhor Porrada, que vaga pelos ermos para mantê-lo longe da civilização.',
    fonte: 'Guia de NPCs', pagina: 48,
  },
  {
    id: 'carthalkan', nome: 'Carthalkan, a Espada Cristalina',
    descricao: 'Esta espada longa atroz e pungente é feita de um cristal translúcido. Empunhá-la traz uma sensação estranha, pois ela não tem o peso de materiais comuns, como metal ou madeira. Quando brandida por um herdeiro da família Sharpblade, a arma emite uma luz límpida e revela todos os seus poderes: torna-se uma espada longa atroz pungente ameaçadora magnífica, que tem dano base 4d8.\n\nAtualmente em posse da Rainha-Imperatriz Shivara, junto com a Coroa Imperial.',
    fonte: 'Guia de NPCs', pagina: 44,
  },
  {
    id: 'coroa-imperial', nome: 'Coroa Imperial',
    descricao: 'Símbolo do trono do Reinado, esta coroa é usada pelos Reis-Imperadores há séculos. Ao longo das gerações, foi imbuída pela força de cada um dos monarcas que a usou, até se tornar um artefato capaz de auxiliar o regente na tarefa de guiar a humanidade. O usuário da Coroa Imperial recebe +2 em Sabedoria e Carisma (cumulativo com outros itens), aplica seu Carisma na Defesa e em testes de resistência e recebe imunidade a encantamento. Como um artefato, a Coroa Imperial não pode ser danificada por meios mundanos. A única maneira de destruí-la é roubá-la e escondê-la em uma masmorra. Se nenhum herói resgatar a Coroa dentro de um ano e um dia, ela será reduzida a pó.\n\nAtualmente em posse da Rainha-Imperatriz Shivara, junto com Carthalkan, a Espada Cristalina.',
    fonte: 'Guia de NPCs', pagina: 44,
  },
  {
    id: 'coroa-de-allihanna', nome: 'Coroa de Allihanna',
    descricao: 'Este artefato, criado pela própria Deusa da Natureza, tem a aparência de uma coroa de madeira e vinhas. Concede Força +3, Constituição +3 e redução de dano 20.',
    fonte: 'Guia de NPCs', pagina: 31,
  },
  {
    id: 'kumshrak', nome: 'Kum\'shrak',
    descricao: 'Arma ritualística empunhada apenas pelos melhores guerreiros duyshidakk, um kum\'shrak é uma arma especial que extrai poder de suas vítimas. Seguindo as leis de Lamnor e do Akzath, por ser empregado como uma ferramenta de "morte" cujo único propósito é pôr "fim" à vida, o kum\'shrak está próximo das "trevas". Assim, conforme é empunhada em combate, a arma se torna cada vez mais escura, afiada e avessa à vida, até alcançar um ponto em que se torna capaz de ferir qualquer ser vivo que a toque. Mesmo seu proprietário pode ser ferido pelo kum\'shrak; se a arma não sentir que será usada em combate, pode manifestar seu poder sombrio. Se for usado como ferramenta, o kum\'shrak pode impor uma penalidade de –5 em testes, se for usado para cortar alimentos, pode envenená-los, se o portador estiver com medo ou fugir, pode perder 1d4 pontos de vida e assim por diante.\n\nUm kum\'shrak recém-criado é um osso grande, que funciona como uma arma improvisada (–2 em ataques, dano 1d6, crítico x2, impacto, 1 espaço, T$ –). Quando mata pela primeira vez, torna-se uma clava. Quando mata cinco vítimas, torna-se um machado de batalha. Ao fazer sua décima vítima, o kum\'shrak recebe uma melhoria escolhida por seu portador. Depois disso, sempre que dobra seu número de mortes (20, 40 etc.), adquire uma nova melhoria, até um máximo de quatro melhorias. Além das melhorias normais, um kum\'shrak tem acesso a três melhorias exclusivas: Eviscerador (uma criatura atingida fica sangrando, Fort CD For evita), Necrótico (uma criatura atingida fica fraca, Fort CD For evita) e Peçonhento (uma criatura atingida perde 1d6 pontos de vida por veneno).',
    fonte: 'Guia de NPCs', pagina: 36,
  },
  {
    id: 'gemas-eternas', nome: 'Gemas Eternas',
    descricao: 'Esta joia é formada por uma correntinha de mitral, adornada por safiras, esmeraldas, rubis e diamantes que emitem luz própria, brilhando com todas as cores do arco-íris. A beleza das Gemas Eternas só é rivalizada por seu poder. O usuário recebe +2 em Carisma, +5 na Defesa e 1 ponto de mana extra por nível (após um dia de uso). Se possuir a capacidade de lançar magias arcanas, a CD de suas magias aumenta em +2.\n\nAtualmente em posse de Thantalla.',
    fonte: 'Guia de NPCs', pagina: 59,
  },

];

if (typeof window !== 'undefined') window.ARTEFATOS = ARTEFATOS;
