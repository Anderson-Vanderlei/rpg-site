/* ============================================================
   TORMENTA 20 — regras_magias.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 4: Magia, seção "Regras de Magias", pp. 170–173.

   Mesma árvore (Categoria > Subcategoria > Item > Descrição) das
   demais páginas de Regras Gerais — ver cabeçalho de
   js/data/regras_testes.js pro schema completo. Esta é a página-irmã
   de Habilidades & Efeitos (magias são um tipo de habilidade — usam as
   mesmas regras de Ação/Alcance/Efeito/Duração/Testes de Resistência),
   mas cobre o vocabulário específico de magia citado em toda magia já
   cadastrada em magias.js: círculo, escola, execução, aprimoramento.
============================================================ */

window.REGRAS_MAGIAS_ARVORE = [
  {
    id: 'classificacao-cat', titulo: 'Classificação & Atributo-Chave', icone: 'ti-wand',
    paragrafos: [
      'A magia é a dádiva da deusa Wynna, a força mais poderosa de Arton, capaz de produzir efeitos diversos. Todas as magias são classificadas em tipos (arcana ou divina) e círculos (do 1º ao 5º).',
    ],
    itens: [
      { id: 'magia-arcana', nome: 'Magia Arcana', descricao: ['Manipula diretamente as energias do mundo, permitindo ao conjurador violar as leis naturais e alterar a realidade. Este tipo de mágica pode ser dominado por estudo ou aptidão natural. Seus efeitos costumam ser impressionantes, destruidores e fantásticos — como produzir relâmpagos, metamorfosear criaturas, transportar por longas distâncias e criar imagens ilusórias.'] },
      { id: 'magia-divina', nome: 'Magia Divina', descricao: ['Provém de uma causa ou entidade poderosa. Através da devoção a essa causa ou entidade, o conjurador recebe poder mágico. A magia divina geralmente envolve proteção, fortalecimento e cura.'] },
      { id: 'circulos', nome: 'Círculos', descricao: ['Magias são divididas em círculos, do 1º ao 5º. Quanto mais alto o círculo da magia, mais poderosa ela é. Magias de 1º círculo são pouco mais que truques, mal excedendo capacidades mundanas. Já magias de 5º círculo podem invocar chuvas de meteoros, parar o tempo e até mesmo realizar desejos!'] },
      {
        id: 'atributo-chave', titulo: 'Atributo-Chave',
        paragrafos: ['A magia é intensa em Arton e pode ser dominada de várias formas.'],
        itens: [
          { id: 'atributo-inteligencia', nome: 'Inteligência', descricao: ['Atributo-chave dos bruxos e magos. Eles seguem métodos e fórmulas antigas, herméticas, registradas em livros e pergaminhos. Para eles, magia é ciência.'] },
          { id: 'atributo-sabedoria', nome: 'Sabedoria', descricao: ['Atributo-chave dos clérigos e druidas. É a magia espiritual, baseada no contato com os deuses e a percepção da natureza. Para eles, magia é fé.'] },
          { id: 'atributo-carisma', nome: 'Carisma', descricao: ['Atributo-chave dos bardos e feiticeiros. Eles invocam seu próprio poder interior, alimentando magias com autoconfiança e força de personalidade. Para eles, magia é arte.'] },
        ],
      },
    ],
  },
  {
    id: 'lancando-magias-cat', titulo: 'Aprendendo & Lançando Magias', icone: 'ti-flame',
    itens: [
      {
        id: 'aprendendo-magias', nome: 'Aprendendo Magias',
        descricao: [
          'Sua classe diz que tipo de magia você pode lançar: arcanistas e bardos lançam magias arcanas; clérigos e druidas lançam magias divinas. Sua classe também diz com quantas magias você começa e quantas ganha por nível.',
          'Algumas habilidades permitem que você aprenda magias novas. Caso a habilidade não diga qual magia você aprende, você pode escolher qualquer magia de um tipo e círculo que possa lançar com aquela classe.',
        ],
      },
      {
        id: 'custo-pm-magias', nome: 'Custo em PM',
        descricao: ['Lançar uma magia exige gastar uma ação (varia de magia para magia) e pontos de mana (de acordo com o círculo da magia).'],
        tabela: {
          titulo: 'Tabela 4-1: Custo de Magias',
          colunas: ['Círculo', 'Custo'],
          linhas: [
            ['1º', '1 PM'],
            ['2º', '3 PM'],
            ['3º', '6 PM'],
            ['4º', '10 PM'],
            ['5º', '15 PM'],
          ],
        },
      },
      { id: 'gestos-palavras', nome: 'Gestos e Palavras', descricao: ['Lançar uma magia envolve pronunciar palavras mágicas e gesticular com pelo menos uma mão livre. É um ato chamativo, perceptível por aqueles ao redor. Um conjurador amordaçado ou incapaz de usar as mãos não pode lançar magias.'] },
      {
        id: 'concentracao', titulo: 'Concentração',
        paragrafos: ['Lançar uma magia também exige calma e concentração. Por isso, um conjurador em situação difícil deve passar em um teste de Vontade. Se falhar no teste a magia é perdida, mas os PM são gastos mesmo assim.'],
        itens: [
          { id: 'ferido-durante-execucao', nome: 'Ferido Durante a Execução', descricao: ['CD igual ao dano. Para magias que exigem uma ação padrão ou menos, o conjurador só pode ser ferido durante a execução se for atacado como uma reação ou se estiver sofrendo dano contínuo (por chamas ou veneno, por exemplo).'] },
          { id: 'condicao-ruim-concentracao', nome: 'Condição Ruim', descricao: ['CD 15 + custo em PM da magia. Exemplos incluem movimento vigoroso, como montado a galope, caído ou em uma tempestade.'] },
          { id: 'condicao-terrivel-concentracao', nome: 'Condição Terrível', descricao: ['CD 20 + custo em PM da magia. Exemplos incluem movimento violento, como uma carroça desgovernada, agarrado ou em um terremoto.'] },
        ],
      },
      { id: 'armaduras-magia-arcana', nome: 'Armaduras e Magia Arcana', descricao: ['O uso de armaduras atrapalha os gestos necessários para lançar magias arcanas. Lançar uma magia arcana usando armadura exige um teste de Misticismo (CD 20 + o custo em PM da magia). O teste sofre penalidade de armadura. Se falhar, a magia não funciona, mas gasta PM. Magias lançadas por habilidades de raça, poderes ou itens mágicos não sofrem essa limitação.'] },
    ],
  },
  {
    id: 'aprimoramentos-cat', titulo: 'Aprimoramentos', icone: 'ti-arrow-up-circle',
    paragrafos: ['Algumas magias permitem gastar mais pontos de mana ao serem lançadas para aumentar seu efeito. Estas opções são chamadas de aprimoramentos.'],
    itens: [
      { id: 'limite-pm-aprimoramento', nome: 'Limite de PM', descricao: ['Como qualquer habilidade com custo variável, o máximo de PM que você pode gastar ao lançar uma magia obedece às regras para gasto de PM já vistas na aba Habilidades & Efeitos.'] },
      { id: 'aprimoramentos-cumulativos', nome: 'Aprimoramentos Cumulativos', descricao: ['Para aprimoramentos que aumentam um valor (o texto começa com a palavra "aumenta"), você pode gastar aquela quantidade de PM várias vezes para acumular o aumento.'],
        destaque: 'A magia Bola de Fogo causa 6d6 pontos de dano e tem um aprimoramento que aumenta esse dano em +2d6 por +2 PM. Um arcanista de 11º nível pode gastar até 11 PM ao lançar essa magia, causando 14d6 pontos de dano.' },
      { id: 'aprimoramentos-mudam-magias', nome: 'Aprimoramentos que Mudam Magias', descricao: ['Alguns aprimoramentos alteram a descrição da magia (o texto começa com "muda"). Nesse caso, a magia continua igual em tudo, exceto a parte mudada pelo aprimoramento. Mudanças na mesma característica da magia nunca se acumulam.'] },
      { id: 'truque', nome: 'Truque', descricao: ['Este aprimoramento transforma a magia em uma versão mais simples e reduz seu custo em PM para zero. Truques não podem ser usados em conjunto com outros aprimoramentos.'] },
      { id: 'pre-requisitos-aprimoramento', nome: 'Pré-requisitos', descricao: ['Alguns aprimoramentos exigem que você seja capaz de lançar magias de determinado círculo. Para magias de classe, você deve cumprir o requisito com a classe com a qual usa a magia. Para magias utilizadas de outra forma, você não tem como cumprir esses pré-requisitos.'] },
    ],
  },
  {
    id: 'execucao-alcance-cat', titulo: 'Execução, Alcance, Efeito, Duração & Resistência', icone: 'ti-list-check',
    paragrafos: [
      'Essas características usam as mesmas regras gerais de qualquer habilidade — ver a aba Habilidades & Efeitos — mas com detalhes próprios de magia, listados abaixo.',
    ],
    itens: [
      {
        id: 'execucao', titulo: 'Execução',
        paragrafos: ['A ação necessária para lançar a magia.'],
        itens: [
          { id: 'execucao-acao-livre', nome: 'Ação Livre', descricao: ['Você só pode lançar uma magia com execução de ação livre por rodada. Isso inclui magias afetadas por habilidades como Magia Acelerada.'] },
          { id: 'execucao-reacao', nome: 'Reação', descricao: ['Magias com execução de reação só podem ser lançadas em reação àquilo contra o qual se aplicam (por exemplo, uma magia que fornece bônus na Defesa pode ser lançada em reação a um ataque).'] },
          { id: 'execucao-acao-completa', nome: 'Ação Completa', descricao: ['No caso de magias com execução maior do que uma ação completa, você fica desprevenido enquanto estiver lançando a magia.'] },
        ],
      },
      { id: 'alcance-magia', nome: 'Alcance', descricao: ['Indica a distância máxima a partir do conjurador que a magia alcança — mesmas categorias (Pessoal, Toque, Curto, Médio, Longo, Ilimitado) descritas na aba Habilidades & Efeitos.'] },
      { id: 'efeito-magia', nome: 'Efeito', descricao: ['Determina se a magia afeta um alvo, uma área ou cria algo — mesmas regras gerais de Efeito descritas na aba Habilidades & Efeitos.'] },
      { id: 'duracao-magia', nome: 'Duração', descricao: ['A duração indica por quanto tempo a magia mantém seu efeito. Quando ela termina, a energia mágica se dissipa e a magia acaba. Uma magia permanente ainda pode ser dissipada para encerrar sua duração.'] },
      {
        id: 'resistencia-magia', nome: 'Resistência',
        descricao: [
          'Magias prejudiciais normalmente permitem que seus alvos façam um teste de resistência para evitar ou reduzir seus efeitos.',
          '<strong>Dificuldade.</strong> A CD do teste de resistência contra uma magia é 10 + metade do nível do personagem + atributo-chave da magia.',
          '<strong>Sucesso em Testes de Resistência.</strong> Uma criatura que passe em seu teste contra uma magia sem efeitos óbvios sente um tipo de formigamento ou força hostil, mas não pode deduzir a natureza exata do ataque. O conjurador também sente que a magia falhou — não é possível fingir ter sido enfeitiçado por Enfeitiçar, pois o conjurador saberá. No entanto, ele não sabe se o alvo passou em um teste de resistência contra magias de área ou efeito.',
        ],
        destaque: 'Samira é uma qareen feiticeira de 8º nível com Carisma 5. A CD para resistir a suas magias é 19 (10 + 4 + 5).',
      },
      { id: 'custos-especiais-magia', nome: 'Custos Especiais', descricao: ['Algumas magias poderosas exigem outros custos além de pontos de mana. Se uma magia possuir custo especial, isso estará indicado no fim do texto descritivo dela.'] },
    ],
  },
  {
    id: 'escolas-cat', titulo: 'Escolas de Magia', icone: 'ti-category',
    paragrafos: [
      'Todas as magias, sejam arcanas ou divinas, pertencem a uma escola. A escolha de uma magia indica como ela utiliza e manipula energia. Escolas de magia contam como tipos de efeitos (ver Tipos de Efeito, na aba Habilidades & Efeitos), o que indica sua relação com outros efeitos — por exemplo, um bônus em testes de resistência contra ilusões se aplica contra quaisquer magias de ilusão.',
    ],
    itens: [
      { id: 'escola-abjuracao', nome: 'Abjuração (Abjur)', descricao: ['Magias de proteção, que anulam outras magias ou expulsam criaturas invocadas de volta a seus planos de existência nativos.'] },
      { id: 'escola-adivinhacao', nome: 'Adivinhação (Adiv)', descricao: ['Magias de detecção ou que vasculham passado e futuro.'] },
      { id: 'escola-convocacao', nome: 'Convocação (Conv)', descricao: ['Magias que transportam matéria. Esse transporte é realizado através do Éter Entre Mundos; por isso, qualquer efeito que bloqueia viagens etéreas também impede convocações. Criaturas convocadas surgem em uma superfície desocupada e, quando destruídas, desaparecem e são devolvidas a seus mundos nativos.'] },
      { id: 'escola-encantamento', nome: 'Encantamento (Encan)', descricao: ['Magias que afetam a mente. Todas as magias de encantamento são efeitos mentais.'] },
      { id: 'escola-evocacao', nome: 'Evocação (Evoc)', descricao: ['Magias que manipulam ou geram energia pura. Ácido, eletricidade, fogo e frio são as energias geradas pelos quatro elementos, respectivamente terra, ar, fogo e água. Magias de fogo funcionam sob a água, mas criam vapor quente em vez de chamas abertas. Luz é energia positiva e sua manifestação é capaz de iluminar, curar e causar dano de luz. Por fim, essência é energia mágica pura.'] },
      { id: 'escola-ilusao', nome: 'Ilusão', descricao: ['Essas magias fazem outros perceberem algo que não existe ou ignorarem algo real. Todas as magias de ilusão são efeitos mentais.'] },
      { id: 'escola-necromancia', nome: 'Necromancia (Necro)', descricao: ['Magias que canalizam energia negativa, criando escuridão, drenando a força vital de criaturas vivas e criando mortos-vivos. Magias de necromancia são efeitos de trevas.'] },
      { id: 'escola-transmutacao', nome: 'Transmutação (Trans)', descricao: ['Magias que alteram as propriedades físicas de uma criatura ou objeto.'] },
    ],
  },
  {
    id: 'anulando-magias-cat', titulo: 'Anulando Magias', icone: 'ti-ban',
    paragrafos: [
      'Você pode anular uma magia conjurada por outra pessoa, fazendo uma contramágica. Para isso, use a ação preparar para agir quando uma criatura lançar uma magia. Nesse instante, você deve lançar uma magia que possa anular a magia original.',
    ],
    itens: [
      { id: 'contramagica', nome: 'Contramágica', descricao: ['Normalmente, uma magia só pode ser anulada por outra igual — se um inimigo lança Bola de Fogo, você deve lançar outra Bola de Fogo para anulá-la. Mas algumas magias podem anular outras: por exemplo, Luz anula Escuridão (e vice-versa). Em caso de dúvida, cabe ao mestre julgar se uma magia anula outra. Como regra geral, uma magia nunca pode anular outra de círculo maior.'] },
      { id: 'dissipar-magia', nome: 'Dissipar Magia', descricao: ['É uma exceção — pode ser usada para anular qualquer magia (mesmo de círculos maiores), mas você deve fazer um teste de Misticismo oposto ao Misticismo ou Vontade de quem está lançando a magia (o que for maior). Se você vencer, seu Dissipar Magia funciona como contramágica. Tanto a magia anulada quanto a usada como contramágica desfazem-se instantaneamente.'] },
    ],
  },
];
