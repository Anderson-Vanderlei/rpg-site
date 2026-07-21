/* ============================================================
   TORMENTA 20 — armas.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 3: Equipamento, pp. 141-151 (Armas + Munições)

   Cada entrada de ARMAS:
   { id, nome, categoria, tipoAtaque, empunhadura, preco, dano, critico,
     alcance, tipoDano, espacos, habilidades: [], municao, descricao }

   categoria: 'simples' | 'marcial' | 'exotica' | 'fogo' — proficiência
   necessária pra usar sem penalidade de –5 nos testes de ataque.

   tipoAtaque: 'corpo-a-corpo' | 'distancia'

   empunhadura: 'leve' | 'uma-mao' | 'duas-maos'

   preco: string formatada (ex: 'T$ 2') ou null se a arma não tem preço
   (grátis — clava e bordão, por serem fáceis de conseguir).

   dano: string. Pode ter formato duplo — 'X/Y' representa duas leituras
   diferentes: em armas com a habilidade 'dupla' (Bordão, Corrente de
   Espinhos) cada valor é o dano de uma "ponta"; em armas 'adaptável'
   (Espada Bastarda, Katana) o primeiro valor é o dano empunhada com uma
   mão e o segundo é o dano empunhada com duas mãos.

   critico: string. Pode ser uma margem de ameaça ('19' = crítico em 19
   ou 20), um multiplicador ('x3'), ou os dois juntos ('19/x3').

   alcance: 'curto' | 'médio' | null — armas sem alcance só atacam
   corpo a corpo (mas podem ser arremessadas em alcance curto com –5,
   se a descrição disser que podem ser arremessadas).

   tipoDano: 'Corte' | 'Impacto' | 'Perfuração', ou combinação
   ('Corte/Perfuração' na Alabarda), ou null (Rede, que não causa dano).

   habilidades: array de habilidades de arma em itálico no livro —
   'ágil' (usa Acuidade com Arma mesmo não sendo leve), 'alongada'
   (dobra alcance natural, não ataca adjacente), 'adaptável' (arma de
   uma mão pode virar duas mãos pra +1 passo de dano), 'desbalanceada'
   (–2 em testes de ataque), 'dupla' (permite Estilo de Duas Armas,
   cada "ponta" conta como arma separada pra melhorias), 'versátil'
   (bônus em manobras, varia por arma — ver descrição).

   municao: id da munição necessária (armas de disparo) ou null.
============================================================ */

const ARMAS = [

  // ══════════════════════ ARMAS SIMPLES ══════════════════════

  {
    id: 'adaga', nome: 'Adaga', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'leve',
    preco: 'T$ 2', dano: '1d4', critico: '19', alcance: 'curto', tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Esta faca afiada é usada por muitos habitantes adultos do Reinado, embora seja favorita de ladrões e assassinos, por ser facilmente escondida (fornece +5 em testes de Ladinagem para ocultá-la). Quando ataca com uma adaga, você pode usar sua Destreza em vez de Força nos testes de ataque. Uma adaga pode ser arremessada.',
  },
  {
    id: 'espada-curta', nome: 'Espada Curta', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'leve',
    preco: 'T$ 10', dano: '1d6', critico: '19', alcance: null, tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'O tipo mais comum de espada, usada por guardas ou como arma secundária de guerreiros mais capazes. Mede entre 40 e 50cm.',
  },
  {
    id: 'foice', nome: 'Foice', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'leve',
    preco: 'T$ 4', dano: '1d6', critico: 'x3', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Originalmente um instrumento agrícola, consiste de uma lâmina curva presa a um cabo de madeira. Uma arma tradicional de druidas.',
  },
  {
    id: 'clava', nome: 'Clava', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: null, dano: '1d6', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Um pedaço de madeira empunhado como arma, geralmente usado por bárbaros ou criaturas brutais — ou como arma improvisada, como um galho de árvore ou pedaço de mobília. Sendo fácil de conseguir, seu preço é zero.',
  },
  {
    id: 'lanca', nome: 'Lança', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 2', dano: '1d6', critico: 'x2', alcance: 'curto', tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Qualquer arma feita com uma haste de madeira e uma ponta afiada, natural ou metálica. Por sua facilidade de fabricação, é muito comum entre orcs, kobolds, trogloditas e outras raças menos civilizadas. Uma lança pode ser arremessada.',
  },
  {
    id: 'maca', nome: 'Maça', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 12', dano: '1d8', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Bastão com um peso cheio de protuberâncias na ponta, a maça é usada por clérigos que fazem votos de não derramar sangue. De fato, um golpe de maça nem sempre derrama sangue, mas esmaga ossos.',
  },
  {
    id: 'bordao', nome: 'Bordão', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: null, dano: '1d6/1d6', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 2,
    habilidades: ['dupla'], municao: null,
    descricao: 'Um cajado apreciado por viajantes e camponeses por sua praticidade e fácil acesso (seu preço é zero). O bordão é uma arma dupla.',
  },
  {
    id: 'pique', nome: 'Pique', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 2', dano: '1d8', critico: 'x2', alcance: null, tipoDano: 'Perfuração', espacos: 2,
    habilidades: ['alongada'], municao: null,
    descricao: 'Essencialmente uma lança muito longa. O pique é uma arma alongada.',
  },
  {
    id: 'tacape', nome: 'Tacape', categoria: 'simples',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: null, dano: '1d10', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Versão maior e/ou com pregos de uma clava. Usado por bárbaros e humanoides bestiais, não é uma arma elegante, mas faz o serviço.',
  },
  {
    id: 'azagaia', nome: 'Azagaia', categoria: 'simples',
    tipoAtaque: 'distancia', empunhadura: 'uma-mao',
    preco: 'T$ 1', dano: '1d6', critico: 'x2', alcance: 'médio', tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Uma lança leve e flexível, própria para arremesso. Pode ser usada como arma corpo a corpo, mas você sofre uma penalidade de –5 no teste de ataque.',
  },
  {
    id: 'besta-leve', nome: 'Besta Leve', categoria: 'simples',
    tipoAtaque: 'distancia', empunhadura: 'uma-mao',
    preco: 'T$ 35', dano: '1d8', critico: '19', alcance: 'médio', tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: 'virotes',
    descricao: 'Um arco montado sobre uma coronha de madeira com um gatilho, a besta leve é uma arma que dispara virotes com grande potência. Recarregar uma besta leve é uma ação de movimento.',
  },
  {
    id: 'funda', nome: 'Funda', categoria: 'simples',
    tipoAtaque: 'distancia', empunhadura: 'uma-mao',
    preco: null, dano: '1d4', critico: 'x2', alcance: 'médio', tipoDano: 'Impacto', espacos: 1,
    habilidades: [], municao: 'pedras',
    descricao: 'Uma simples tira de couro usada para arremessar pedras polidas. Na falta de munição adequada, pode disparar pedras comuns, mas o dano é reduzido em um passo. Recarregar uma funda é uma ação de movimento. Ao contrário de outras armas de disparo, você aplica sua Força a rolagens de dano com uma funda.',
  },
  {
    id: 'arco-curto', nome: 'Arco Curto', categoria: 'simples',
    tipoAtaque: 'distancia', empunhadura: 'duas-maos',
    preco: 'T$ 30', dano: '1d6', critico: 'x3', alcance: 'médio', tipoDano: 'Perfuração', espacos: 2,
    habilidades: [], municao: 'flechas',
    descricao: 'Uma arma antiga e comum, este arco é usado primariamente como ferramenta de caça, embora seja usado como arma de guerra por milícias, bandidos e exércitos menos equipados. Pode ser usado montado.',
  },

  // ══════════════════════ ARMAS MARCIAIS ══════════════════════

  {
    id: 'machadinha', nome: 'Machadinha', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'leve',
    preco: 'T$ 6', dano: '1d6', critico: 'x3', alcance: 'curto', tipoDano: 'Corte', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Ferramenta útil para cortar madeira e também inimigos. Uma machadinha pode ser arremessada.',
  },
  {
    id: 'cimitarra', nome: 'Cimitarra', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 15', dano: '1d6', critico: '18', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: ['ágil'], municao: null,
    descricao: 'Espada com a lâmina curva e muito afiada. A cimitarra é uma arma ágil.',
  },
  {
    id: 'espada-longa', nome: 'Espada Longa', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 15', dano: '1d8', critico: '19', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Arma típica de soldados e guerreiros, esta espada de dois gumes tem lâmina reta medindo entre 80cm e 1m.',
  },
  {
    id: 'florete', nome: 'Florete', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 20', dano: '1d6', critico: '18', alcance: null, tipoDano: 'Perfuração', espacos: 1,
    habilidades: ['ágil'], municao: null,
    descricao: 'A lâmina leve e fina desta espada torna a arma muito precisa. O florete é uma arma ágil.',
  },
  {
    id: 'machado-de-batalha', nome: 'Machado de Batalha', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 10', dano: '1d8', critico: 'x3', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Adaptado do machado de lenhador, este não é um instrumento para corte de árvores, mas sim uma arma capaz de causar ferimentos terríveis.',
  },
  {
    id: 'mangual', nome: 'Mangual', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 8', dano: '1d8', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 1,
    habilidades: ['versátil'], municao: null,
    descricao: 'Uma haste metálica ligada a uma corrente com uma esfera de aço na ponta, que pode se enroscar na arma do adversário. O mangual é uma arma versátil, fornecendo +2 em testes para desarmar.',
  },
  {
    id: 'martelo-de-guerra', nome: 'Martelo de Guerra', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 12', dano: '1d8', critico: 'x3', alcance: null, tipoDano: 'Impacto', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Outra ferramenta adaptada para combate, esta é a arma favorita de quase todos os anões que não usam machados.',
  },
  {
    id: 'picareta', nome: 'Picareta', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 8', dano: '1d6', critico: 'x4', alcance: null, tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: null,
    descricao: 'Usada por mineradores, esta ferramenta quebra pedras com facilidade. Imagine o que pode fazer com carne e osso!',
  },
  {
    id: 'tridente', nome: 'Tridente', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 15', dano: '1d8', critico: 'x2', alcance: 'curto', tipoDano: 'Perfuração', espacos: 1,
    habilidades: ['versátil'], municao: null,
    descricao: 'Uma lança com três pontas, favorita de povos marinhos e gladiadores e própria para prender as pernas do oponente. O tridente é uma arma versátil, fornecendo +2 em testes para derrubar. Um tridente pode ser arremessado.',
  },
  {
    id: 'alabarda', nome: 'Alabarda', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 10', dano: '1d10', critico: 'x3', alcance: null, tipoDano: 'Corte/Perfuração', espacos: 2,
    habilidades: ['alongada'], municao: null,
    descricao: 'Uma haste de madeira com 2m de comprimento e uma lâmina de machado na ponta. A alabarda é uma arma alongada.',
  },
  {
    id: 'alfange', nome: 'Alfange', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 75', dano: '2d4', critico: '18', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Uma versão maior da cimitarra, esta espada de lâmina larga e curva é bastante usada por guerreiros do Deserto da Perdição.',
  },
  {
    id: 'gadanho', nome: 'Gadanho', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 18', dano: '2d4', critico: 'x4', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Outra ferramenta agrícola, o gadanho é uma versão maior da foice, para uso com as duas mãos. Foi criada para ceifar cereais, mas também pode ceifar vidas.',
  },
  {
    id: 'lanca-montada', nome: 'Lança Montada', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 10', dano: '1d8', critico: 'x3', alcance: null, tipoDano: 'Perfuração', espacos: 2,
    habilidades: ['alongada'], municao: null,
    descricao: 'A lança montada é uma arma alongada. Se você estiver montado, pode usá-la com apenas uma mão. Além disso, quando usada numa investida montada, causa +2d8 pontos de dano (note que dados extras não são multiplicados em caso de acerto crítico).',
  },
  {
    id: 'machado-de-guerra', nome: 'Machado de Guerra', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 20', dano: '1d12', critico: 'x3', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Este imenso machado de lâmina dupla é uma arma extremamente perigosa.',
  },
  {
    id: 'marreta', nome: 'Marreta', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 20', dano: '3d4', critico: 'x2', alcance: null, tipoDano: 'Impacto', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Uma haste de madeira resistente com uma pesada cabeça de metal ou pedra.',
  },
  {
    id: 'montante', nome: 'Montante', categoria: 'marcial',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 50', dano: '2d6', critico: '19', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: [], municao: null,
    descricao: 'Enorme e pesada, esta espada de 1,5m de comprimento é uma arma poderosa.',
  },
  {
    id: 'arco-longo', nome: 'Arco Longo', categoria: 'marcial',
    tipoAtaque: 'distancia', empunhadura: 'duas-maos',
    preco: 'T$ 100', dano: '1d8', critico: 'x3', alcance: 'médio', tipoDano: 'Perfuração', espacos: 2,
    habilidades: [], municao: 'flechas',
    descricao: 'Este arco reforçado tem a altura de uma pessoa. Ao contrário da versão curta, é primariamente uma arma de guerra. Por ter uma puxada pesada, permite que você aplique sua Força às rolagens de dano (ao contrário de outras armas de disparo). Porém, um arco longo não pode ser usado se você estiver montado.',
  },
  {
    id: 'besta-pesada', nome: 'Besta Pesada', categoria: 'marcial',
    tipoAtaque: 'distancia', empunhadura: 'duas-maos',
    preco: 'T$ 50', dano: '1d12', critico: '19', alcance: 'médio', tipoDano: 'Perfuração', espacos: 2,
    habilidades: [], municao: 'virotes',
    descricao: 'Versão maior e mais potente da besta leve. Recarregar uma besta pesada é uma ação padrão.',
  },

  // ══════════════════════ ARMAS EXÓTICAS ══════════════════════

  {
    id: 'chicote', nome: 'Chicote', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 2', dano: '1d3', critico: 'x2', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: ['ágil', 'versátil'], municao: null,
    descricao: 'Esta arma pode ser usada para atacar inimigos a até 4,5m e pode se enroscar nas mãos, pernas ou armas de seus adversários. O chicote é uma arma ágil e versátil, fornecendo +2 em testes para derrubar ou desarmar.',
  },
  {
    id: 'espada-bastarda', nome: 'Espada Bastarda', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 35', dano: '1d10/1d12', critico: '19', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: ['adaptável'], municao: null,
    descricao: 'Maior e mais pesada que a espada longa, esta arma é tradicionalmente usada pelos cavaleiros de Bielefeld. A espada bastarda é uma arma adaptável. É muito grande para ser usada com uma só mão sem treinamento especial; por isso, é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos.',
  },
  {
    id: 'katana', nome: 'Katana', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 100', dano: '1d8/1d10', critico: '19', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: ['adaptável', 'ágil'], municao: null,
    descricao: 'A espada tradicional do samurai tem lâmina levemente curva e apenas um gume. A katana é uma arma adaptável e ágil. É muito grande para ser empunhada com uma só mão sem treinamento especial; por isso, é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos.',
  },
  {
    id: 'machado-anao', nome: 'Machado Anão', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'uma-mao',
    preco: 'T$ 30', dano: '1d10', critico: 'x3', alcance: null, tipoDano: 'Corte', espacos: 1,
    habilidades: ['adaptável'], municao: null,
    descricao: 'A arma preferida de onze entre dez guerreiros anões. Um machado anão é muito grande para ser usado com uma só mão sem treinamento especial; por isso é uma arma exótica. Ele pode ser usado como uma arma marcial de duas mãos.',
  },
  {
    id: 'corrente-de-espinhos', nome: 'Corrente de Espinhos', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 25', dano: '2d4/2d4', critico: '19', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: ['ágil', 'dupla', 'versátil'], municao: null,
    descricao: 'Esta arma pode ser usada para atacar inimigos a até 4,5m e pode se enroscar nas mãos, pernas ou armas de seus adversários. A corrente de espinhos é uma arma ágil, dupla e versátil, fornecendo +2 em testes para derrubar ou desarmar. Ela pode ser usada como uma arma marcial de duas mãos.',
  },
  {
    id: 'machado-taurico', nome: 'Machado Táurico', categoria: 'exotica',
    tipoAtaque: 'corpo-a-corpo', empunhadura: 'duas-maos',
    preco: 'T$ 50', dano: '2d8', critico: 'x3', alcance: null, tipoDano: 'Corte', espacos: 2,
    habilidades: ['desbalanceada'], municao: null,
    descricao: 'Uma haste comprida com uma lâmina extremamente grossa na ponta, esta é uma arma ancestral dos minotauros. Um machado táurico é uma arma desbalanceada. Além disso, é muito grande para ser usado sem treinamento especial; por isso, é uma arma exótica.',
  },
  {
    id: 'rede', nome: 'Rede', categoria: 'exotica',
    tipoAtaque: 'distancia', empunhadura: 'uma-mao',
    preco: 'T$ 20', dano: null, critico: null, alcance: 'curto', tipoDano: null, espacos: 1,
    habilidades: [], municao: null,
    descricao: 'A rede tem pequenos dentes em sua trama e uma corda para controlar os inimigos presos. Se você acertar um ataque com a rede, não causa dano. Em vez disso, a vítima fica enredada (deslocamento reduzido à metade, não pode correr nem fazer investidas e sofre –2 na Defesa e em testes de ataque). Enquanto você estiver segurando a corda, sempre que a vítima se mover você pode fazer um teste de Força oposto contra ela como uma reação. Se você vencer, a vítima só pode se mover até o limite da corda (alcance curto). A vítima pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20). A rede tem 5 pontos de vida e, se rasgar, qualquer criatura enredada se solta automaticamente. A rede só pode ser usada contra criaturas no máximo uma categoria de tamanho maior que você.',
  },

  // ══════════════════════ ARMAS DE FOGO ══════════════════════

  {
    id: 'pistola', nome: 'Pistola', categoria: 'fogo',
    tipoAtaque: 'distancia', empunhadura: 'leve',
    preco: 'T$ 250', dano: '2d6', critico: '19/x3', alcance: 'curto', tipoDano: 'Perfuração', espacos: 1,
    habilidades: [], municao: 'balas',
    descricao: 'A arma de fogo mais comum. Recarregar uma pistola é uma ação padrão.',
  },
  {
    id: 'mosquete', nome: 'Mosquete', categoria: 'fogo',
    tipoAtaque: 'distancia', empunhadura: 'duas-maos',
    preco: 'T$ 500', dano: '2d8', critico: '19/x3', alcance: 'médio', tipoDano: 'Perfuração', espacos: 2,
    habilidades: [], municao: 'balas',
    descricao: 'Uma arma de fogo de uso difícil, mas com poder devastador. Recarregar um mosquete é uma ação padrão.',
  },

];

/* ============================================================
   MUNIÇÕES (Tabela 3-4)
   Vendidas em pacotes de 20 — cada ataque com arma de disparo
   consome 1 unidade, acerte ou erre.
============================================================ */
const MUNICOES = [
  {
    id: 'balas', nome: 'Balas', preco: 'T$ 20', espacos: 1,
    descricao: 'Uma bolsa com 20 balas (pequenas esferas de chumbo) e pólvora. Recarregar uma pistola ou um mosquete é uma ação padrão.',
  },
  {
    id: 'flechas', nome: 'Flechas', preco: 'T$ 1', espacos: 1,
    descricao: 'Uma aljava com 20 flechas, hastes de madeira com ponta metálica e penas para estabilizar o voo. Recarregar um arco com uma flecha é uma ação livre.',
  },
  {
    id: 'pedras', nome: 'Pedras', preco: 'T$ 0,5', espacos: 1,
    descricao: 'Um saco de couro com 20 pedras polidas. Recarregar uma funda com uma pedra de qualquer tipo é uma ação de movimento.',
  },
  {
    id: 'virotes', nome: 'Virotes', preco: 'T$ 2', espacos: 1,
    descricao: 'Uma aljava com 20 setas de madeira. Recarregar uma besta leve é uma ação de movimento; já recarregar uma besta pesada é uma ação padrão.',
  },
];

if (typeof window !== 'undefined') {
  window.ARMAS = ARMAS;
  window.MUNICOES = MUNICOES;
}
