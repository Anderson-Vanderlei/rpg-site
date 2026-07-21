/* ============================================================
   TORMENTA 20 — itens_gerais.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 3: Equipamento, pp. 154-163 (Itens Gerais)

   Cada entrada:
   { id, nome, categoria, preco, espacos, descricao }

   categoria: 'aventura' | 'ferramentas' | 'vestuario' | 'esotericos' |
   'alquimicos-preparados' | 'alquimicos-catalisadores' |
   'alquimicos-venenos' | 'alimentacao' | 'animais' | 'veiculos' |
   'servicos'

   preco: string formatada (ex: 'T$ 10') — alguns serviços usam preço
   por unidade de distância (ex: 'T$ 0,5 por km').

   espacos: número, ou null quando o item não ocupa espaço de carga
   (ex: animais, veículos, serviços — não são "carregados").

   CDs de fabricação por categoria (referência, não um campo por item):
   Equipamento de aventura = 15 | Ferramentas = 20 | Vestuário = 20 |
   Esotéricos = 20 (exige treino em Misticismo) |
   Alquímicos preparados = 15 | Catalisadores = 15 (exige treino em
   Misticismo) | Venenos = 20 (varia, ver descrição individual).
============================================================ */

const ITENS_GERAIS = [

  // ══════════════════════ EQUIPAMENTO DE AVENTURA ══════════════════════

  {
    id: 'agua-benta', nome: 'Água Benta', categoria: 'aventura',
    preco: 'T$ 10', espacos: 0.5,
    descricao: 'Produzida com a magia Abençoar Alimentos, esta água sagrada é um poderoso recurso na luta contra o mal. Para usar a água benta, você gasta uma ação padrão e escolhe um morto-vivo ou abissal em alcance curto (a água benta é inofensiva contra outras criaturas). O alvo sofre 2d10 pontos de dano de luz (Reflexos CD Sabedoria reduz à metade).',
  },
  {
    id: 'algemas', nome: 'Algemas', categoria: 'aventura',
    preco: 'T$ 15', espacos: 1,
    descricao: 'Um par de algemas para criaturas Médias. Prender uma criatura que não esteja indefesa exige empunhar a algema, agarrar o alvo e vencer um novo teste de agarrar contra ela. Você pode prender os dois pulsos da pessoa (–5 em testes que exijam o uso das mãos, impede conjuração) ou um dos pulsos dela em um objeto imóvel adjacente, caso haja, para impedir que ela se mova. Escapar das algemas exige uma ação completa e um teste de Acrobacia contra CD 30 ou de Força contra CD 25 — ou ter as chaves.',
  },
  {
    id: 'arpeu', nome: 'Arpéu', categoria: 'aventura',
    preco: 'T$ 5', espacos: 1,
    descricao: 'Um gancho de aço amarrado na ponta de uma corda para se fixar em muros, janelas, parapeitos de prédios... Prender um arpéu exige um teste de Pontaria (CD 15). Subir um muro com a ajuda de uma corda fornece +5 no teste de Atletismo.',
  },
  {
    id: 'bandoleira-de-pocoes', nome: 'Bandoleira de Poções', categoria: 'aventura',
    preco: 'T$ 20', espacos: 1,
    descricao: 'Um cinto de couro com bolsos que comportam pequenos frascos. Se você estiver vestindo uma bandoleira, pode sacar itens alquímicos e poções como uma ação livre.',
  },
  {
    id: 'barraca', nome: 'Barraca', categoria: 'aventura',
    preco: 'T$ 10', espacos: 1,
    descricao: 'Esta barraca de lona conta como um saco de dormir para duas pessoas e fornece +2 em testes de Sobrevivência para acampar.',
  },
  {
    id: 'corda', nome: 'Corda', categoria: 'aventura',
    preco: 'T$ 1', espacos: 1,
    descricao: 'Um rolo com 10 metros de corda de cânhamo, o mesmo tipo usado em navios. Possui diversas utilidades: pode ajudar a descer um buraco ou muro (+5 em testes de Atletismo nessas situações), amarrar pessoas etc. Dar um nó firme ou especial (por exemplo, capaz de deslizar, se desfazer com um puxão etc.) exige um teste de Destreza (CD 15). Arrebentar a corda exige 2 pontos de dano de corte ou uma ação padrão e um teste de Força (CD 20).',
  },
  {
    id: 'espelho', nome: 'Espelho', categoria: 'aventura',
    preco: 'T$ 10', espacos: 1,
    descricao: 'Este pequeno espelho possui diversas utilidades: observar cantos, fazer sinais de luz e, claro, garantir que você esteja apresentável.',
  },
  {
    id: 'lampiao', nome: 'Lampião', categoria: 'aventura',
    preco: 'T$ 7', espacos: 1,
    descricao: 'Um cilindro com uma alça e duas portinholas. Uma chama alimentada por óleo é acesa dentro do cilindro e uma das portinholas aberta deixa a luz sair. Acender um lampião é uma ação padrão e sua luz ilumina um raio com 15m. Carregar um lampião com óleo é uma ação padrão e ele dura uma cena.',
  },
  {
    id: 'mochila', nome: 'Mochila', categoria: 'aventura',
    preco: 'T$ 2', espacos: null,
    descricao: 'Uma bolsa de lona com tiras para ser carregada nas costas. Não conta como item vestido.',
  },
  {
    id: 'mochila-de-aventureiro', nome: 'Mochila de Aventureiro', categoria: 'aventura',
    preco: 'T$ 50', espacos: null,
    descricao: 'Feita de couro resistente, esta mochila é repleta de bolsos para prender equipamento. Vestir uma mochila de aventureiro aumenta sua capacidade de carga em 2 espaços (ela própria não gasta um espaço).',
  },
  {
    id: 'oleo', nome: 'Óleo', categoria: 'aventura',
    preco: 'T$ 0,1', espacos: 0.5,
    descricao: 'Um frasco com óleo inflamável para lampião. Você pode atirar o frasco em uma criatura em alcance curto com uma ação padrão. Se ela sofrer dano de fogo até o fim do seu próximo turno, sofre 1d6 pontos de dano extra e fica em chamas.',
  },
  {
    id: 'organizador-de-pergaminhos', nome: 'Organizador de Pergaminhos', categoria: 'aventura',
    preco: 'T$ 25', espacos: 1,
    descricao: 'Um estojo de madeira ou couro rígido. Se você estiver vestindo um organizador de pergaminhos, pode sacar pergaminhos como uma ação livre.',
  },
  {
    id: 'pe-de-cabra', nome: 'Pé de Cabra', categoria: 'aventura',
    preco: 'T$ 2', espacos: 1,
    descricao: 'Esta barra de ferro fornece +5 em testes de Força para abrir portas, janelas e baús fechados. Um pé de cabra pode ser usado como arma, com as estatísticas de uma clava.',
  },
  {
    id: 'saco-de-dormir', nome: 'Saco de Dormir', categoria: 'aventura',
    preco: 'T$ 1', espacos: 1,
    descricao: 'Um colchão com uma coberta fina o bastante para ser enrolada e amarrada, é especialmente útil para aventureiros, que nunca sabem onde vão passar a noite. Dormir ao relento sem um acampamento e um saco de dormir diminui sua recuperação de PV e PM.',
  },
  {
    id: 'simbolo-sagrado', nome: 'Símbolo Sagrado', categoria: 'aventura',
    preco: 'T$ 5', espacos: 1,
    descricao: 'Um medalhão de madeira ou metal com o símbolo de uma divindade. Se você estiver vestindo (normalmente com uma corrente ao redor do pescoço) ou empunhando o símbolo sagrado de um deus do qual é devoto, recebe +1 em testes de resistência.',
  },
  {
    id: 'tocha', nome: 'Tocha', categoria: 'aventura',
    preco: 'T$ 0,1', espacos: 1,
    descricao: 'Um bastão de madeira com algum combustível na ponta (geralmente trapos embebidos em parafina). Acender uma tocha é uma ação padrão. Ela ilumina um raio de 9m e dura uma cena. Pode ser usada como uma arma simples leve (dano 1d4 de impacto mais 1 de fogo, crítico x2).',
  },
  {
    id: 'vara-de-madeira', nome: 'Vara de Madeira (3m)', categoria: 'aventura',
    preco: 'T$ 0,2', espacos: 1,
    descricao: 'Uma haste com 3m de comprimento. Útil para alcançar pontos distantes, mas frágil demais para servir como arma.',
  },

  // ══════════════════════ FERRAMENTAS ══════════════════════

  {
    id: 'alaude-elfico', nome: 'Alaúde Élfico', categoria: 'ferramentas',
    preco: 'T$ 300', espacos: 1,
    descricao: 'Feito com madeira de alta qualidade e manufatura delicada, este alaúde gera notas vívidas e emocionantes. Enquanto empunha este item, você pode usar a habilidade Inspiração como uma ação de movimento. Conta como um instrumento musical.',
  },
  {
    id: 'colecao-de-livros', nome: 'Coleção de Livros', categoria: 'ferramentas',
    preco: 'T$ 75', espacos: 1,
    descricao: 'Uma pequena coleção de tomos e tratados sobre um assunto. Fornece +1 em Conhecimento, Guerra, Misticismo, Nobreza ou Religião (definido quando o item é comprado ou fabricado).',
  },
  {
    id: 'equipamento-de-viagem', nome: 'Equipamento de Viagem', categoria: 'ferramentas',
    preco: 'T$ 10', espacos: 1,
    descricao: 'Um saco de lona contendo instrumentos úteis para sobreviver nos ermos, como pederneira (pedra para fazer fogo), panelas e talheres para cozinhar, anzol e linha para pescar e uma pequena pá. Um personagem sem este item sofre –5 em testes de Sobrevivência para fazer um acampamento. Não inclui saco de dormir ou barraca.',
  },
  {
    id: 'estojo-de-disfarces', nome: 'Estojo de Disfarces', categoria: 'ferramentas',
    preco: 'T$ 50', espacos: 1,
    descricao: 'Um conjunto de cosméticos, tintas para cabelo e algumas próteses simples (como bigodes e narizes falsos). Um personagem sem este item sofre –5 em testes de Enganação para disfarce.',
  },
  {
    id: 'flauta-mistica', nome: 'Flauta Mística', categoria: 'ferramentas',
    preco: 'T$ 150', espacos: 1,
    descricao: 'Um instrumento delicado, repleto de runas e pequenas gemas místicas. Um bardo que empunhe este item aumenta a CD para resistir às magias lançadas por ele em +1. Conta como um instrumento musical.',
  },
  {
    id: 'gazua', nome: 'Gazua', categoria: 'ferramentas',
    preco: 'T$ 5', espacos: 1,
    descricao: 'Uma barra fina de ferro, com a ponta torta ou em forma de gancho. Um personagem sem este item sofre –5 em testes de Ladinagem para abrir fechaduras.',
  },
  {
    id: 'instrumentos-de-oficio', nome: 'Instrumentos de <Ofício>', categoria: 'ferramentas',
    preco: 'T$ 30', espacos: 1,
    descricao: 'Existe uma versão deste item para cada perícia de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpinteiro), pergaminhos em branco, tinta e pena para Ofício (escriba) e assim por diante. Um personagem sem os instrumentos de seu Ofício sofre –5 nessa perícia.',
  },
  {
    id: 'instrumento-musical', nome: 'Instrumento Musical', categoria: 'ferramentas',
    preco: 'T$ 35', espacos: 1,
    descricao: 'Um instrumento típico, como um bandolim, flauta ou lira. Você precisa empunhar um instrumento musical com as duas mãos para receber seus benefícios e para usar Músicas de Bardo. Instrumentos musicais podem ser usados como esotéricos por bardos (permitindo que lancem magias usando a mão que empunha o instrumento). Instrumentos musicais podem receber melhorias de ferramentas (contam como itens ligados a Atuação) e de esotéricos (mas afetam apenas magias lançadas por bardos).',
  },
  {
    id: 'luneta', nome: 'Luneta', categoria: 'ferramentas',
    preco: 'T$ 100', espacos: 1,
    descricao: 'Este instrumento valioso consiste de um cilindro metálico com duas lentes. Fornece +5 em testes de Percepção para observar coisas em alcance longo ou além.',
  },
  {
    id: 'maleta-de-medicamentos', nome: 'Maleta de Medicamentos', categoria: 'ferramentas',
    preco: 'T$ 50', espacos: 1,
    descricao: 'Caixa de madeira com ervas, unguentos, bandagens e outros materiais úteis. Um personagem sem este item sofre –5 em Cura.',
  },
  {
    id: 'sela', nome: 'Sela', categoria: 'ferramentas',
    preco: 'T$ 20', espacos: 1,
    descricao: 'Uma peça de couro e pelego colocada sobre o lombo da montaria, sobre a qual o cavaleiro se senta. Inclui arreios para conduzir o animal. Um personagem montado em uma montaria sem sela sofre –5 em testes de Cavalgar. Usada no animal, a sela não ocupa espaço de carga do personagem.',
  },
  {
    id: 'tambor-das-profundezas', nome: 'Tambor das Profundezas', categoria: 'ferramentas',
    preco: 'T$ 80', espacos: 1,
    descricao: 'Um instrumento típico de anões de Doherimm, capaz de sons graves e retumbantes. Enquanto empunha este item, o alcance da habilidade Inspiração e de qualquer Música de Bardo é dobrado. Conta como um instrumento musical.',
  },

  // ══════════════════════ VESTUÁRIO ══════════════════════

  {
    id: 'andrajos-de-aldeao', nome: 'Andrajos de Aldeão', categoria: 'vestuario',
    preco: 'T$ 1', espacos: 1,
    descricao: 'Roupas típicas de camponês. Consiste de camisa larga e calças soltas ou blusa e saia e não inclui botas — os mais pobres andam descalços. Fornece +2 em testes de Investigação para interrogar (ninguém se importa com o que um aldeão escuta) e, se você possuir o poder Aparência Inofensiva, a CD para resistir a ele aumenta em +2. Porém, impõe –2 em perícias baseadas em Carisma contra pessoas que se importam com classe social.',
  },
  {
    id: 'bandana', nome: 'Bandana', categoria: 'vestuario',
    preco: 'T$ 5', espacos: 1,
    descricao: 'Um lenço tipicamente usado por bandidos e piratas. Fornece +1 em Intimidação.',
  },
  {
    id: 'botas-reforcadas', nome: 'Botas Reforçadas', categoria: 'vestuario',
    preco: 'T$ 20', espacos: 1,
    descricao: 'Grossas e resistentes, estas botas de cano alto protegem contra perigos do terreno. Aumentam seu deslocamento em +1,5m se ele for reduzido por terreno difícil (após a redução).',
  },
  {
    id: 'camisa-bufante', nome: 'Camisa Bufante', categoria: 'vestuario',
    preco: 'T$ 25', espacos: 1,
    descricao: 'Blusa colorida, com mangas e golas longas e encrespadas. Fornece +1 em Atuação.',
  },
  {
    id: 'capa-esvoacante', nome: 'Capa Esvoaçante', categoria: 'vestuario',
    preco: 'T$ 25', espacos: 1,
    descricao: 'Favorita entre heróis ousados, esta capa de seda produz movimentos amplos e chamativos, que fornecem +1 em Enganação.',
  },
  {
    id: 'capa-pesada', nome: 'Capa Pesada', categoria: 'vestuario',
    preco: 'T$ 15', espacos: 1,
    descricao: 'Uma capa de couro grossa e resistente. Protege e aquece o corpo, fornecendo +1 em Fortitude.',
  },
  {
    id: 'casaco-longo', nome: 'Casaco Longo', categoria: 'vestuario',
    preco: 'T$ 20', espacos: 1,
    descricao: 'Feito de peles ou couro grosso forrado com lã, e impermeabilizado com óleo, este casaco é quente e pesado. Fornece +5 em testes de Fortitude para resistir a efeitos de frio, mas impõe penalidade de armadura de –2.',
  },
  {
    id: 'chapeu-arcano', nome: 'Chapéu Arcano', categoria: 'vestuario',
    preco: 'T$ 50', espacos: 1,
    descricao: 'Com pinturas e bordados de símbolos místicos, este chapéu pontudo ajuda a canalizar energias mágicas. Ele fornece +1 ponto de mana, mas apenas se você possuir a habilidade de classe Caminho do Arcanista.',
  },
  {
    id: 'enfeite-de-elmo', nome: 'Enfeite de Elmo', categoria: 'vestuario',
    preco: 'T$ 15', espacos: 1,
    descricao: 'Um adorno chamativo, como crina de cavalo, plumas, asas ou um totem de animal. Fornece resistência a medo +2.',
  },
  {
    id: 'farrapos-de-ermitao', nome: 'Farrapos de Ermitão', categoria: 'vestuario',
    preco: 'T$ 1', espacos: 1,
    descricao: 'Trapos "adornados" com plantas e raízes. Uma pessoa vestindo farrapos de ermitão não parece muito civilizada, e sofre –2 em Diplomacia e em testes de Investigação para interrogar. Entretanto, recebe +2 em Adestramento.',
  },
  {
    id: 'gorro-de-ervas', nome: 'Gorro de Ervas', categoria: 'vestuario',
    preco: 'T$ 75', espacos: 1,
    descricao: 'Formado por duas camadas de tecido, este chapéu é preenchido com ervas preparadas para auxiliar a concentração do usuário. Fornece +1 em Vontade.',
  },
  {
    id: 'luva-de-pelica', nome: 'Luva de Pelica', categoria: 'vestuario',
    preco: 'T$ 5', espacos: 1,
    descricao: 'Estas luvas delicadas preservam o tato e impedem que o suor deixe os dedos escorregadios. Fornecem +1 em Ladinagem.',
  },
  {
    id: 'manopla', nome: 'Manopla', categoria: 'vestuario',
    preco: 'T$ 10', espacos: 1,
    descricao: 'Luva metálica que permite socos mais perigosos — o dano de seus ataques desarmados torna-se letal. Uma manopla conta como uma arma para receber melhorias e encantos para usá-los em seus ataques desarmados.',
  },
  {
    id: 'manto-camuflado', nome: 'Manto Camuflado', categoria: 'vestuario',
    preco: 'T$ 12', espacos: 1,
    descricao: 'Um manto camuflado é feito para um tipo de terreno específico (veja a habilidade Explorador). Por exemplo, um manto camuflado para floresta pode ser verde e marrom e coberto de folhas, enquanto um manto urbano pode ser cinza ou negro. Usar um manto camuflado no terreno correto fornece +2 em Furtividade.',
  },
  {
    id: 'manto-eclesiastico', nome: 'Manto Eclesiástico', categoria: 'vestuario',
    preco: 'T$ 20', espacos: 1,
    descricao: 'Um manto típico de igrejas e templos. Fornece +1 em Religião.',
  },
  {
    id: 'robe-mistico', nome: 'Robe Místico', categoria: 'vestuario',
    preco: 'T$ 50', espacos: 1,
    descricao: 'Um manto longo, adornado com temas arcanos. Fornece +1 em Misticismo.',
  },
  {
    id: 'sapatos-de-camurca', nome: 'Sapatos de Camurça', categoria: 'vestuario',
    preco: 'T$ 8', espacos: 1,
    descricao: 'Leves e resistentes, aprimoram o equilíbrio e a firmeza dos pés, fornecendo +1 em Acrobacia.',
  },
  {
    id: 'tabardo', nome: 'Tabardo', categoria: 'vestuario',
    preco: 'T$ 10', espacos: 1,
    descricao: 'Uma peça de tecido usada como um colete, cobrindo o peito e as costas. Geralmente ostenta a heráldica de um reino, igreja, casa nobre ou ordem de cavaleiros. Fornece +1 em Diplomacia.',
  },
  {
    id: 'traje-da-corte', nome: 'Traje da Corte', categoria: 'vestuario',
    preco: 'T$ 100', espacos: 1,
    descricao: 'Roupas de luxo, feitas sob medida e adequadas à nobreza e realeza. Inclui algumas joias, como anéis e colares. Em certos ambientes (um baile, um salão de palácio), um personagem que não esteja vestindo este item sofre –5 em perícias baseadas em Carisma.',
  },
  {
    id: 'traje-de-viajante', nome: 'Traje de Viajante', categoria: 'vestuario',
    preco: 'T$ 10', espacos: null,
    descricao: 'Inclui botas, calças ou saias, cinto, camisa de linho e capa com capuz. A roupa padrão de aventureiros.',
  },
  {
    id: 'veste-de-seda', nome: 'Veste de Seda', categoria: 'vestuario',
    preco: 'T$ 25', espacos: 1,
    descricao: 'Esta roupa leve e elegante deixa seus movimentos os mais livres possíveis. Fornece +1 em Reflexos.',
  },

  // ══════════════════════ ESOTÉRICOS ══════════════════════

  {
    id: 'bolsa-de-po', nome: 'Bolsa de Pó', categoria: 'esotericos',
    preco: 'T$ 300', espacos: 1,
    descricao: 'Uma bolsa com pó multicolorido, fabricado a partir das pétalas trituradas de flores que nascem apenas na Pondsmânia. Quando lança uma magia de encantamento ou ilusão, você recebe +2 PM para gastar em aprimoramentos.',
  },
  {
    id: 'cajado-arcano', nome: 'Cajado Arcano', categoria: 'esotericos',
    preco: 'T$ 1.000', espacos: 2,
    descricao: 'Um cajado típico, feito de madeira de boa qualidade e entalhado com runas. O limite de PM que você pode gastar em magias arcanas e a CD para resistir a elas aumentam em +1. Para fornecer seus benefícios, um cajado precisa ser empunhado com as duas mãos. Ele pode ser usado como arma, com as estatísticas de um bordão.',
  },
  {
    id: 'cetro-elemental', nome: 'Cetro Elemental', categoria: 'esotericos',
    preco: 'T$ 750', espacos: 1,
    descricao: 'Este cetro possui uma pedra preciosa em sua ponta: esmeralda (ácido), topázio (eletricidade), rubi (fogo) ou safira (frio). Quando lança uma magia que causa dano do tipo da pedra, o dano aumenta em um dado do mesmo tipo.',
  },
  {
    id: 'costela-de-lich', nome: 'Costela de Lich', categoria: 'esotericos',
    preco: 'T$ 300', espacos: 1,
    descricao: 'Esta varinha é feita a partir do osso de um morto-vivo. Quando lança uma magia, ela causa +1d6 pontos de dano de trevas. Se estiver empunhando esta varinha você não recupera PV por efeitos mágicos de cura.',
  },
  {
    id: 'dedo-de-ente', nome: 'Dedo de Ente', categoria: 'esotericos',
    preco: 'T$ 200', espacos: 1,
    descricao: 'Uma varinha feita da madeira de uma árvore senciente. Sempre que gastar pelo menos 1 PM para lançar uma magia, role 1d4. Com um resultado 4, você recupera 1 PM.',
  },
  {
    id: 'luva-de-ferro', nome: 'Luva de Ferro', categoria: 'esotericos',
    preco: 'T$ 150', espacos: 1,
    descricao: 'Um conjunto de dedais interligados por correntes. Suas magias arcanas pessoais que concedem bônus na Defesa ou em testes de resistências têm esse bônus aumentado em +1.',
  },
  {
    id: 'medalhao-de-prata', nome: 'Medalhão de Prata', categoria: 'esotericos',
    preco: 'T$ 750', espacos: 1,
    descricao: 'Gravado com uma runa pessoal do conjurador, este medalhão de prata diminui em –1 PM o custo de magias de alcance pessoal.',
  },
  {
    id: 'orbe-cristalino', nome: 'Orbe Cristalino', categoria: 'esotericos',
    preco: 'T$ 750', espacos: 1,
    descricao: 'Esta esfera perfeita concentra seu poder mágico. O limite de PM que você pode gastar em magias arcanas aumenta em +1.',
  },
  {
    id: 'tomo-hermetico', nome: 'Tomo Hermético', categoria: 'esotericos',
    preco: 'T$ 1.500', espacos: 1,
    descricao: 'Um livro de tratados que aumentam a sua compreensão sobre uma escola de magia específica. A CD para resistir a suas magias arcanas dessa escola aumenta em +2.',
  },
  {
    id: 'varinha-arcana', nome: 'Varinha Arcana', categoria: 'esotericos',
    preco: 'T$ 100', espacos: 1,
    descricao: 'Uma varinha típica, feita de madeira de boa qualidade e entalhada com runas. A CD para resistir a suas magias arcanas aumenta em +1.',
  },

  // ══════════════════════ ALQUÍMICOS — PREPARADOS ══════════════════════

  {
    id: 'acido', nome: 'Ácido', categoria: 'alquimicos-preparados',
    preco: 'T$ 10', espacos: 0.5,
    descricao: 'Frasco de vidro contendo um ácido alquímico altamente corrosivo. Para usar o ácido, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 2d4 pontos de dano de ácido (Reflexos CD Destreza reduz à metade).',
  },
  {
    id: 'balsamo-restaurador', nome: 'Bálsamo Restaurador', categoria: 'alquimicos-preparados',
    preco: 'T$ 10', espacos: 0.5,
    descricao: 'Uma pasta verde e fedorenta, feita de ervas medicinais. Usá-la é uma ação completa e recupera 2d4 pontos de vida.',
  },
  {
    id: 'bomba', nome: 'Bomba', categoria: 'alquimicos-preparados',
    preco: 'T$ 50', espacos: 0.5,
    descricao: 'Uma granada rudimentar. Para usar a bomba, você precisa empunhá-la, gastar uma ação de movimento para acender seu pavio e uma ação padrão para arremessá-la em um ponto em alcance curto. Criaturas a até 3m desse ponto sofrem 6d6 pontos de dano de impacto (Reflexos CD Destreza reduz à metade).',
  },
  {
    id: 'cosmetico', nome: 'Cosmético', categoria: 'alquimicos-preparados',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Perfume ou maquiagem. Usá-lo é uma ação completa e fornece +2 em testes de perícias baseadas em Carisma até o fim da cena.',
  },
  {
    id: 'elixir-do-amor', nome: 'Elixir do Amor', categoria: 'alquimicos-preparados',
    preco: 'T$ 100', espacos: 0.5,
    descricao: 'Um humanoide que beba este líquido adocicado fica apaixonado pela primeira criatura que enxergar (condição enfeitiçado; Vontade CD Carisma anula). O efeito dura 1d3 dias.',
  },
  {
    id: 'essencia-de-mana', nome: 'Essência de Mana', categoria: 'alquimicos-preparados',
    preco: 'T$ 50', espacos: 0.5,
    descricao: 'Esta poção feita de ervas raras e compostos alquímicos recupera energia pessoal. Beber a essência de mana é uma ação padrão e recupera 1d4 pontos de mana.',
  },
  {
    id: 'fogo-alquimico', nome: 'Fogo Alquímico', categoria: 'alquimicos-preparados',
    preco: 'T$ 10', espacos: 0.5,
    descricao: 'Frasco de cerâmica contendo uma substância que entra em combustão em contato com o ar. Para usar o fogo alquímico, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 1d6 pontos de dano de fogo e fica em chamas. Um teste de Reflexos (CD Destreza) reduz o dano à metade e evita as chamas.',
  },
  {
    id: 'po-do-desaparecimento', nome: 'Pó do Desaparecimento', categoria: 'alquimicos-preparados',
    preco: 'T$ 100', espacos: 0.5,
    descricao: 'Uma criatura ou objeto coberto por este pó torna-se invisível (como em Invisibilidade) por 2d6 rodadas. O usuário não sabe quando a invisibilidade vai terminar.',
  },

  // ══════════════════════ ALQUÍMICOS — CATALISADORES ══════════════════════

  {
    id: 'baga-de-fogo', nome: 'Baga-de-Fogo', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Pequeno fruto vermelho, apreciado por seu sabor picante. Usado como catalisador, adiciona +1d6 de dano de fogo a magias.',
  },
  {
    id: 'dente-de-dragao', nome: 'Dente-de-Dragão', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 45', espacos: 0.5,
    descricao: 'Uma flor comum em regiões montanhosas, especialmente nas Sanguinárias, possui formato parecido com uma presa de monstro. Suas propriedades místicas aumentam o dano de magias em um dado do mesmo tipo.',
  },
  {
    id: 'essencia-abissal', nome: 'Essência Abissal', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 150', espacos: 0.5,
    descricao: 'Um líquido espesso, produzido através do sangue de criaturas demoníacas. Aumenta os dados de dano de magias de fogo em uma categoria — d4 para d6, d6 para d8, d8 para d10 e d10 para d12 (o máximo).',
  },
  {
    id: 'liquen-lilas', nome: 'Líquen Lilás', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Esta estranha planta tem aspecto cristalino e cresce em abundância na região das Uivantes. Adiciona +1d6 de dano de frio a magias.',
  },
  {
    id: 'musgo-purpura', nome: 'Musgo Púrpura', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 45', espacos: 0.5,
    descricao: 'Encontrado em florestas fechadas, esse fungo cintilante possui propriedades que fornecem +2 na CD de magias de ilusão.',
  },
  {
    id: 'ossos-de-monstro', nome: 'Ossos de Monstro', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 45', espacos: 0.5,
    descricao: 'Pequenas falanges de criaturas monstruosas, tratadas com óleos alquímicos. Fornece +2 na CD de magias de necromancia.',
  },
  {
    id: 'po-de-cristal', nome: 'Pó de Cristal', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Uma pitada de pó de um mineral cristalino puro, como quartzo ou topázio. Diminui o custo de magias de encantamento em –1 PM.',
  },
  {
    id: 'po-de-giz', nome: 'Pó de Giz', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Calcário esmagado em pó, uma substância comum que, usada como catalisador, diminui o custo de magias de convocação em –1 PM.',
  },
  {
    id: 'ramo-verdejante', nome: 'Ramo Verdejante', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 45', espacos: 0.5,
    descricao: 'Esta combinação de ervas potencializa magias de cura, aumentando sua cura em +1 PV por dado.',
  },
  {
    id: 'saco-de-sal', nome: 'Saco de Sal', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 45', espacos: 0.5,
    descricao: 'Um pequeno saco de couro com sal marinho. Fornece +2 na CD de magias de abjuração.',
  },
  {
    id: 'seixo-de-ambar', nome: 'Seixo de Âmbar', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Essa "gema" feita de seiva de árvore fossilizada diminui o custo de magias de transmutação em –1 PM.',
  },
  {
    id: 'terra-de-cemiterio', nome: 'Terra de Cemitério', categoria: 'alquimicos-catalisadores',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Um punhado de terra cinzenta, colhida à noite de um cemitério. Adiciona +1d6 de dano de trevas a magias.',
  },

  // ══════════════════════ ALQUÍMICOS — VENENOS ══════════════════════

  {
    id: 'beladona', nome: 'Beladona', categoria: 'alquimicos-venenos',
    preco: 'T$ 1.500', espacos: 0.5,
    descricao: 'Planta extremamente tóxica que afeta o sistema nervoso da vítima. Ingestão: vítima fica paralisada (lenta) por 3 rodadas. A CD para fabricar e para resistir a este veneno aumenta em +5.',
  },
  {
    id: 'bruma-sonolenta', nome: 'Bruma Sonolenta', categoria: 'alquimicos-venenos',
    preco: 'T$ 150', espacos: 0.5,
    descricao: 'Um gás sonífero. Inalação: vítima fica inconsciente (enjoada por 1 rodada).',
  },
  {
    id: 'cicuta', nome: 'Cicuta', categoria: 'alquimicos-venenos',
    preco: 'T$ 60', espacos: 0.5,
    descricao: 'Planta cuja ingestão pode causar náusea, dores e até morte. Ingestão: perde 1d12 PV por rodada durante 3 rodadas (perde 1d12 PV se passar na resistência).',
  },
  {
    id: 'essencia-de-sombra', nome: 'Essência de Sombra', categoria: 'alquimicos-venenos',
    preco: 'T$ 100', espacos: 0.5,
    descricao: 'Produzido a partir de compostos alquímicos que canalizam energia de trevas. Contato: vítima fica debilitada (fraca, se passar na resistência).',
  },
  {
    id: 'nevoa-toxica', nome: 'Névoa Tóxica', categoria: 'alquimicos-venenos',
    preco: 'T$ 30', espacos: 0.5,
    descricao: 'Este gás verde queima e corrói a pele e os pulmões. Inalação: perde 1d12 PV por rodada durante 3 rodadas (perde 1d12 PV se passar na resistência).',
  },
  {
    id: 'peconha-comum', nome: 'Peçonha Comum', categoria: 'alquimicos-venenos',
    preco: 'T$ 15', espacos: 0.5,
    descricao: 'Veneno típico, extraído de animais ou plantas tóxicas. Contato: perde 1d12 PV (se passar na resistência).',
  },
  {
    id: 'peconha-concentrada', nome: 'Peçonha Concentrada', categoria: 'alquimicos-venenos',
    preco: 'T$ 90', espacos: 0.5,
    descricao: 'Dose concentrada da peçonha comum. Contato: perde 1d12 PV por rodada durante 3 rodadas (perde 1d12 PV se passar na resistência).',
  },
  {
    id: 'peconha-potente', nome: 'Peçonha Potente', categoria: 'alquimicos-venenos',
    preco: 'T$ 600', espacos: 0.5,
    descricao: 'Veneno poderoso, extraído de animais ou plantas perigosos. Contato: perde 2d12 PV por rodada durante 3 rodadas (perde 2d12 PV se passar na resistência).',
  },
  {
    id: 'po-de-lich', nome: 'Pó de Lich', categoria: 'alquimicos-venenos',
    preco: 'T$ 3.000', espacos: 0.5,
    descricao: 'Veneno letal, usado para assassinar alvos poderosos. Ingestão: perde 4d12 PV por rodada durante 5 rodadas (perde 4d12 PV se passar na resistência). A CD para fabricar e para resistir a este veneno aumenta em +5.',
  },
  {
    id: 'riso-de-nimb', nome: 'Riso de Nimb', categoria: 'alquimicos-venenos',
    preco: 'T$ 150', espacos: 0.5,
    descricao: 'Este gás púrpura faz a vítima rir descontroladamente e agir de forma caótica. Inalação: vítima fica confusa (lenta por 1 rodada, se passar na resistência).',
  },

  // ══════════════════════ ALIMENTAÇÃO ══════════════════════

  {
    id: 'batata-valkariana', nome: 'Batata Valkariana', categoria: 'alimentacao',
    preco: 'T$ 2', espacos: 0.5,
    descricao: 'Batatas cortadas em tiras e mergulhadas em óleo fervente. Gordurentas e pouco nutritivas, são o tipo de prato que só é servido numa metrópole como Valkaria. Apesar disso, são gostosas e deixam qualquer um empolgado. Você recebe +1d6 em um teste a sua escolha realizado até o fim do dia.',
  },
  {
    id: 'gorad-quente', nome: 'Gorad Quente', categoria: 'alimentacao',
    preco: 'T$ 18', espacos: 0.5,
    descricao: 'Gorad e leite, servidos quentes. Não tem erro. O gorad ativa o cérebro, fornecendo +2 PM temporários.',
  },
  {
    id: 'macarrao-de-yuvalin', nome: 'Macarrão de Yuvalin', categoria: 'alimentacao',
    preco: 'T$ 6', espacos: 0.5,
    descricao: 'Yuvalin é uma cidade mineradora em Zakharov, na fronteira com as Montanhas Uivantes. Seus habitantes criaram este prato reforçado (macarrão, bacon e creme de leite!) para encarar suas árduas jornadas de trabalho nas minas. Delicioso, o prato se espalhou por outras cidades e reinos. Você recebe +5 PV temporários.',
  },
  {
    id: 'prato-do-aventureiro', nome: 'Prato do Aventureiro', categoria: 'alimentacao',
    preco: 'T$ 1', espacos: 0.5,
    descricao: 'Um cozido de galinha com legumes, esta é uma refeição simples, mas nutritiva. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de vida em +1 por nível.',
  },
  {
    id: 'racao-de-viagem', nome: 'Ração de Viagem (por dia)', categoria: 'alimentacao',
    preco: 'T$ 0,5', espacos: 0.5,
    descricao: 'Própria para viagens, uma porção desta ração alimenta uma pessoa por um dia. É feita de alimentos conservados, como carne defumada, frutas secas, pão, queijo e biscoitos. Se mantida seca dura bastante, mas quando molhada se estraga em 24 horas.',
  },
  {
    id: 'refeicao-comum', nome: 'Refeição Comum', categoria: 'alimentacao',
    preco: 'T$ 0,3', espacos: 0.5,
    descricao: 'Uma refeição típica inclui pão, queijo, cozido de carne ou galinha com legumes e uma caneca de bebida, geralmente cidra, vinho ou cerveja.',
  },
  {
    id: 'sopa-de-peixe', nome: 'Sopa de Peixe', categoria: 'alimentacao',
    preco: 'T$ 1', espacos: 0.5,
    descricao: 'Um cozido de peixe com verduras. É um prato humilde, mas garante um descanso relaxante. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de mana em +1 por nível.',
  },

  // ══════════════════════ ANIMAIS ══════════════════════

  {
    id: 'alforje', nome: 'Alforje', categoria: 'animais',
    preco: 'T$ 30', espacos: null,
    descricao: 'Sacos de couro feitos para serem presos em uma sela. Permitem que um parceiro montaria carregue até 10 espaços de item para você.',
  },
  {
    id: 'cao-de-caca', nome: 'Cão de Caça', categoria: 'animais',
    preco: 'T$ 150', espacos: null,
    descricao: 'Este cachorro valente e leal pode ser usado como parceiro perseguidor por personagens treinados em Adestramento ou montaria por personagens Pequenos e Minúsculos.',
  },
  {
    id: 'cavalo', nome: 'Cavalo', categoria: 'animais',
    preco: 'T$ 75', espacos: null,
    descricao: 'A montaria mais comum no Reinado. Pode ser usado como parceiro montaria. Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste.',
  },
  {
    id: 'cavalo-de-guerra', nome: 'Cavalo de Guerra', categoria: 'animais',
    preco: 'T$ 400', espacos: null,
    descricao: 'Versão treinada para o combate do cavalo comum. Pode ser usado como parceiro montaria e dispensa o teste de Cavalgar para permanecer montado durante um combate.',
  },
  {
    id: 'estabulo', nome: 'Estábulo (por dia)', categoria: 'animais',
    preco: 'T$ 0,1', espacos: null,
    descricao: 'Inclui alimentação para o animal.',
  },
  {
    id: 'ponei', nome: 'Pônei', categoria: 'animais',
    preco: 'T$ 5', espacos: null,
    descricao: 'A montaria mais comum entre raças Pequenas. Pode ser usado como parceiro montaria. Pôneis sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Pôneis de guerra dispensam esse teste.',
  },
  {
    id: 'ponei-de-guerra', nome: 'Pônei de Guerra', categoria: 'animais',
    preco: 'T$ 30', espacos: null,
    descricao: 'Versão treinada para o combate do pônei comum. Pode ser usado como parceiro montaria e dispensa o teste de Cavalgar para permanecer montado durante um combate.',
  },
  {
    id: 'trobo', nome: 'Trobo', categoria: 'animais',
    preco: 'T$ 60', espacos: null,
    descricao: 'Estas enormes aves, também chamadas de pássaros-touros, são parecidas com avestruzes com chifres, couro e cascos. Não têm asas. Possuem poucas penas, que servem apenas como ornamento. Muito dóceis, trobos são usados em áreas rurais como animais de carga e tração, mas também podem ser usados como montaria.',
  },

  // ══════════════════════ VEÍCULOS ══════════════════════

  {
    id: 'balao-goblin', nome: 'Balão Goblin', categoria: 'veiculos',
    preco: 'T$ 200', espacos: null,
    descricao: 'Feito de imensas bolsas de couro e outros tecidos remendados, com uma gôndola parecida com um grande cesto, o balão goblin é um engenho tecnológico sem igual em Arton. Um balão tem tamanho Enorme, deslocamento voo 12m, Defesa 5 (+ Destreza do baloeiro), 100 PV e pode carregar até 8 criaturas Médias ou 160 espaços. Quando o balão perde mais da metade de seus PV, começa a perder ar e flutua lentamente na direção do solo — cada ocupante sofre 4d6 pontos de dano de impacto (Reflexos CD 15 reduz à metade). Um balão só cai de forma perigosa caso perca todos os seus PV. Remendar um balão em pleno voo exige uma ação completa e um teste de Ofício (artesão) contra CD 15; se passar, recupera 1d8 PV do balão.',
  },
  {
    id: 'carroca', nome: 'Carroça', categoria: 'veiculos',
    preco: 'T$ 150', espacos: null,
    descricao: 'Veículo de duas ou quatro rodas, aberto, normalmente usado para transportar cargas pesadas. É puxada por dois cavalos ou um trobo. Inclui os arreios necessários para controlar os animais. Uma carroça tem tamanho Grande, deslocamento 9m, Defesa 8 (+ Destreza do condutor), 50 PV e pode carregar até 4 criaturas Médias ou 80 espaços.',
  },
  {
    id: 'carruagem', nome: 'Carruagem', categoria: 'veiculos',
    preco: 'T$ 500', espacos: null,
    descricao: 'Veículo de quatro rodas, capaz de transportar até quatro pessoas em uma cabine fechada, mais dois condutores do lado de fora. É puxada por dois cavalos ou um trobo. Inclui os arreios necessários para controlar os animais. Tem as mesmas estatísticas de uma carroça, mas fornece cobertura leve a seus passageiros.',
  },
  {
    id: 'canoa', nome: 'Canoa', categoria: 'veiculos',
    preco: 'T$ 70', espacos: null,
    descricao: 'Construída a partir de um único tronco de árvore, é a mais simples das embarcações. Tem as mesmas estatísticas de uma carroça, mas com deslocamento de natação.',
  },
  {
    id: 'veleiro', nome: 'Veleiro', categoria: 'veiculos',
    preco: 'T$ 10.000', espacos: null,
    descricao: 'Com três mastros, é o típico navio de viagem, muito popular entre mercadores.',
  },

  // ══════════════════════ SERVIÇOS ══════════════════════

  {
    id: 'estadia-comum', nome: 'Estadia Comum (por noite)', categoria: 'servicos',
    preco: 'T$ 0,5', espacos: null,
    descricao: 'Um espaço no salão comunal. Se tiver sorte, o taverneiro deixará a lareira acesa para que você não passe frio. Pelo menos não ficará sozinho — pulgas e ratos lhe farão companhia. A refeição consiste de pão, sopa e água. Recupera 1 PV e 1 PM por nível.',
  },
  {
    id: 'estadia-confortavel', nome: 'Estadia Confortável (por noite)', categoria: 'servicos',
    preco: 'T$ 4', espacos: null,
    descricao: 'Um quarto pequeno, mas privativo, com uma cama com colchão de palha e um baú para guardar seus pertences. A refeição inclui pão, queijo, cozido de galinha com legumes e cerveja ou vinho (aguado). Recupera 2 PV e 2 PM por nível.',
  },
  {
    id: 'estadia-luxuosa', nome: 'Estadia Luxuosa (por noite)', categoria: 'servicos',
    preco: 'T$ 20', espacos: null,
    descricao: 'Um quarto grande, com colchão de algodão ou penas, cortinas nas janelas, uma bacia de água quente para banho e outros luxos. A refeição inclui carne, frutas, doces e uma taça de vinho de boa safra. Acomodações desta categoria estão disponíveis apenas nas melhores estalagens, normalmente apenas em cidades e metrópoles. Recupera 3 PV e 3 PM por nível.',
  },
  {
    id: 'conducao-terrestre', nome: 'Condução Terrestre (por km)', categoria: 'servicos',
    preco: 'T$ 0,5 por km', espacos: null,
    descricao: 'Viagem terrestre, em carroças.',
  },
  {
    id: 'conducao-maritima', nome: 'Condução Marítima (por km)', categoria: 'servicos',
    preco: 'T$ 0,1 por km', espacos: null,
    descricao: 'Viagem marítima, em navios.',
  },
  {
    id: 'conducao-aerea', nome: 'Condução Aérea (por km)', categoria: 'servicos',
    preco: 'T$ 10 por km', espacos: null,
    descricao: 'Viagem aérea, em balões goblins. Viajar em balões goblins é arriscado: a cada 100 km há 1 chance em 20 de queda (não fatal).',
  },
  {
    id: 'curandeiro', nome: 'Curandeiro', categoria: 'servicos',
    preco: 'T$ 5', espacos: null,
    descricao: 'O preço para você receber cuidados prolongados ou tratamento contra uma doença ou veneno. Isso considera que você vai até a casa do curandeiro ou onde quer que ele receba seus pacientes — curandeiros não aceitam acompanhar aventureiros em suas jornadas.',
  },
  {
    id: 'magia-1-circulo', nome: 'Magia (1º Círculo)', categoria: 'servicos',
    preco: 'T$ 10', espacos: null,
    descricao: 'O preço para lançar uma magia de 1º círculo em uma situação comum — ou seja, você vai até o conjurador e lançar a magia não oferece risco para ele. Se você pedir ao conjurador para acompanhá-lo numa aventura, a resposta padrão será "não, obrigado".',
  },
  {
    id: 'magia-2-circulo', nome: 'Magia (2º Círculo)', categoria: 'servicos',
    preco: 'T$ 90', espacos: null,
    descricao: 'O preço para lançar uma magia de 2º círculo em uma situação comum.',
  },
  {
    id: 'magia-3-circulo', nome: 'Magia (3º Círculo)', categoria: 'servicos',
    preco: 'T$ 360', espacos: null,
    descricao: 'O preço para lançar uma magia de 3º círculo em uma situação comum.',
  },
  {
    id: 'mensageiro', nome: 'Mensageiro (por km)', categoria: 'servicos',
    preco: 'T$ 0,5 por km', espacos: null,
    descricao: 'Inclui mensagens entregues a pé, por cavaleiros ou navios.',
  },

];

if (typeof window !== 'undefined') window.ITENS_GERAIS = ITENS_GERAIS;
