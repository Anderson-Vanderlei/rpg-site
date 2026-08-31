/* ============================================================
   TORMENTA 20 — regras_habilidades_efeitos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 5: Regras do Jogo, seção "Habilidades", pp. 224–229.

   Estrutura em ÁRVORE (31/ago) — mesmo padrão de regras_testes.js:
   "Categoria > Subcategoria > Item > Descrição". Esta é a página mais
   "compartilhada" das três — Alcance, Duração, Tipos de Efeito e,
   principalmente, Habilidades Gerais (Agarrar Aprimorado, RD, Imunidade
   etc.) são o vocabulário usado o tempo todo nas descrições de poderes,
   magias e criaturas já cadastradas no site. Cada folha tem `id` estável
   pensado como âncora futura pra keywords.js e pra ficha interativa —
   ver aviso de cautela sobre colisão semântica no cabeçalho de
   regras_testes.js (mesmo motivo da flag `semAutoLink` em perigos.js).
============================================================ */

window.REGRAS_HABILIDADES_ARVORE = [
  {
    id: 'como-funcionam', titulo: 'Como Habilidades Funcionam', icone: 'ti-sparkles',
    paragrafos: [
      'Além de atributos e perícias, personagens possuem habilidades fornecidas por sua raça, origem, classe, itens e outras fontes. Habilidades podem ser passivas (seus efeitos estão sempre funcionando) ou ativadas (precisam ser usadas para gerar seus efeitos). O poder Coração da Selva, do druida, é uma habilidade passiva, enquanto a Fúria do bárbaro é uma habilidade ativada. Para usar habilidades ativadas você precisa gastar uma ação e, provavelmente, pontos de mana.',
    ],
    itens: [
      {
        id: 'acao-necessaria', nome: 'Ação Necessária',
        descricao: [
          'A descrição da habilidade determina a ação necessária para usá-la. Caso nada esteja descrito, usar a habilidade é uma ação livre (exceto no caso de habilidades engatilhadas).',
          '<strong>Habilidades Engatilhadas.</strong> Habilidades ativadas por decorrência de outro evento (como fazer um ataque), são ativadas como uma reação e somente uma vez por instância do evento.',
        ],
        destaque: 'A habilidade Frenesi, do bárbaro, diz que quando você usa a ação agredir, pode gastar 2 PM para realizar um ataque adicional. Ativar Frenesi é uma reação que só pode ser feita uma vez por ação agredir.',
      },
      {
        id: 'custo-pm', nome: 'Custo de Pontos de Mana',
        descricao: [
          'A descrição da habilidade determina se são necessários PM para usá-la. Nesse caso, você gasta os PM mesmo em caso de falha. Por exemplo, se um guerreiro usa Ataque Especial e erra o ataque, ainda assim gasta os pontos de mana.',
          'Para habilidades com custo variável, o máximo de PM que você pode gastar por uso é igual ao seu nível na classe que fornece a habilidade (mas você sempre pode usar a habilidade em seu custo mínimo). Para habilidades de raça, origem ou outras fontes e poderes gerais, o limite é o seu nível de personagem.',
        ],
        itens: [
          { id: 'componente-material', nome: 'Componente Material', descricao: ['A habilidade exige ingredientes para ser usada. Esses ingredientes devem estar na mão do personagem e são consumidos com o uso (mesmo que a habilidade falhe).'] },
          { id: 'penalidade-pm', nome: 'Penalidade de PM', descricao: ['A habilidade reduz seus PM máximos enquanto estiver ativa (você não recupera esses PM até a duração da habilidade acabar).'] },
          { id: 'sacrificio-pm', nome: 'Sacrifício de PM', descricao: ['Certas habilidades poderosíssimas têm um custo ainda mais alto: você deve sacrificar permanentemente certa quantidade de PM para usá-las.'] },
        ],
      },
      {
        id: 'efeitos-testes', nome: 'Efeitos que Afetam Testes',
        descricao: [
          'Efeitos que fornecem um bônus a um teste ou modificam sua dificuldade devem ser usados antes de você rolar o dado. Efeitos que permitem que você role novamente o dado devem ser usados antes de o mestre declarar se você passou ou não no teste (e você deve ficar com o segundo valor rolado, mesmo que seja pior que o primeiro).',
        ],
        destaque: 'A habilidade Orgulho, do nobre, que fornece um bônus para um teste, deve ser usada antes de rolar o teste. A habilidade Mestre em Arma, do guerreiro, que permite que você role novamente o ataque recém realizado, deve ser usada antes de o mestre declarar se o ataque acertou ou não.',
      },
      {
        id: 'limites-nivel', nome: 'Limites de Nível',
        descricao: [
          'Algumas habilidades são limitadas pelo seu nível. Para classes, use seu nível naquela classe. Para outros casos, seu nível de personagem.',
        ],
        destaque: 'A habilidade Insolência, do bucaneiro, permite que você some seu Carisma na Defesa, limitado pelo seu nível. Assim, um bucaneiro de 2º nível com Car 3 soma +2 na Defesa. Quando subir para o 3º nível, passará a somar +3. Da mesma forma, um lutador de 4º nível usando a habilidade Voadora soma no máximo +4d6 de dano, mesmo que tenha se deslocado mais de 8 quadrados.',
      },
    ],
  },
  {
    id: 'alcance-cat', titulo: 'Alcance', icone: 'ti-ruler-measure',
    paragrafos: [
      'Muitas habilidades possuem um alcance, isto é, a distância máxima a partir do personagem da qual o efeito pode se originar. Caso alguma parte da área da habilidade esteja além do alcance, a área é afetada normalmente.',
    ],
    itens: [
      { id: 'alcance-pessoal', nome: 'Pessoal', descricao: ['A habilidade afeta somente o personagem e/ou objetos que ele esteja carregando. Também pode ser uma habilidade de área que se inicia a partir do personagem e só o afeta se mencionado.'] },
      { id: 'alcance-toque', nome: 'Toque', descricao: ['O personagem precisa tocar o alvo em seu alcance natural para afetá-lo, mas não precisa gastar uma ação ou fazer testes para isso (tocar o alvo faz parte da ação da habilidade).'] },
      { id: 'alcance-curto', nome: 'Curto', descricao: ['A habilidade alcança alvos a até 9m (6 quadrados em um mapa).'] },
      { id: 'alcance-medio', nome: 'Médio', descricao: ['A habilidade alcança alvos a até 30m (20 quadrados em um mapa).'] },
      { id: 'alcance-longo', nome: 'Longo', descricao: ['A habilidade alcança alvos a até 90m (60 quadrados em um mapa).'] },
      { id: 'alcance-ilimitado', nome: 'Ilimitado', descricao: ['A habilidade alcança qualquer lugar no mesmo mundo. A maioria das habilidades com este alcance exige que você conheça e/ou já tenha estado no ponto de origem da habilidade.'] },
    ],
  },
  {
    id: 'efeito-cat', titulo: 'Efeito', icone: 'ti-target',
    paragrafos: [
      'Toda habilidade gera um efeito — causar dano em um alvo, fornecer um bônus a você ou qualquer outra coisa. A seguir estão regras gerais para efeitos.',
    ],
    itens: [
      {
        id: 'alvos-areas', titulo: 'Alvos & Áreas',
        paragrafos: ['A maior parte das habilidades atinge um ou mais alvos ou afeta uma área.'],
        itens: [
          { id: 'linha-efeito', nome: 'Linha de Efeito', descricao: ['Um caminho direto e sem obstruções até onde a habilidade pode ter efeito. Você deve ter linha de efeito para qualquer alvo ou ponto de origem da área que queira afetar, ou para qualquer espaço onde queira criar um efeito. Qualquer barreira sólida, visível ou não, anula a linha de efeito.'] },
          { id: 'alvo', nome: 'Alvo', descricao: [
              'A habilidade afeta um ou mais alvos, que podem ser criaturas ou objetos. Você usa a habilidade sobre os alvos e deve ser capaz de percebê-los. Uma habilidade usada sobre um tipo de alvo errado falha automaticamente. Por exemplo, a magia Tranca Arcana não tem efeito se lançada sobre algo que não seja uma porta, baú ou semelhante.',
              '<em>Objetos e Tamanhos.</em> Algumas habilidades se referem a objetos em termos de espaços — consulte o Capítulo 3. Outras se referem a objetos em termos de categorias de tamanho. Nesse caso, o mestre deve arbitrar a categoria do objeto comparando-o com criaturas. Por exemplo, uma adaga é um objeto Minúsculo, uma carroça é um objeto Grande e um galeão é um objeto Colossal.',
            ] },
          {
            id: 'area', nome: 'Área',
            descricao: [
              'A habilidade afeta uma área. Normalmente, você escolhe um ponto dentro do alcance e que possa perceber para ser a origem da área, mas não controla quais criaturas ou objetos serão afetados — qualquer coisa na área estará sujeita aos efeitos, incluindo você. De acordo com o mestre, você pode usar uma habilidade numa área que não possa perceber com um teste de Percepção (Misticismo no caso de magias) contra CD 20 + custo em PM. Para habilidades com alcance pessoal, você é o ponto de origem e não é afetado (exceto quando dito o contrário). Áreas avançam até seu limite ou até serem interrompidas por uma barreira capaz de bloqueá-las.',
            ],
            itens: [
              { id: 'area-cilindro', nome: 'Cilindro', descricao: ['Surge na interseção de quatro quadrados, estendendo-se pela largura indicada e subindo até o fim da altura indicada.'] },
              { id: 'area-cone', nome: 'Cone', descricao: ['Surge adjacente a você e se afasta de você na direção escolhida, ficando mais largo com a distância.'] },
              { id: 'area-esfera', nome: 'Esfera', descricao: ['Surge na interseção de quatro quadrados, estendendo-se em todas as direções até o limite de seu raio.'] },
              { id: 'area-linha', nome: 'Linha', descricao: ['Surge adjacente a você e se afasta de você reta até o fim do alcance. A menos que o contrário, uma linha tem 1,5m de largura.'] },
              { id: 'area-quadrado', nome: 'Quadrado', descricao: ['Surge no quadrado ou quadrados escolhidos, afetando o piso. Um "cubo" é como um quadrado, mas afeta também a altura.'] },
              { id: 'area-outros', nome: 'Outros', descricao: ['Algumas habilidades podem ter áreas específicas, citadas em sua descrição.'] },
            ],
            tabela: {
              titulo: 'Áreas de Efeito — Referência de Tamanhos (diagrama, p.225)',
              colunas: ['Forma', 'Exemplos de tamanho (1 quadrado = 1,5m)'],
              linhas: [
                ['Raio (esfera)', '1,5m · 3m · 6m'],
                ['Cubo', '1,5m · 3m'],
                ['Cone', '4,5m · 6m · 9m'],
                ['Linha', '15m'],
              ],
              nota: 'Os valores variam conforme cada habilidade específica; aqui estão só os exemplos ilustrados no livro.',
            },
          },
        ],
      },
      {
        id: 'criacao-redirecionando', nome: 'Criação & Redirecionando Efeitos',
        descricao: [
          '<strong>Criação.</strong> Caso a habilidade crie ou invoque alguma coisa, ela aparece em um local a sua escolha dentro do alcance e para o qual você tenha linha de efeito. Após surgir, a coisa pode se mover ou ser movida para fora da linha de efeito. Você não pode conjurar um monstro dentro de uma sala fechada. Mas, uma vez conjurado, o monstro pode entrar na sala, mesmo que você ainda não tenha linha de efeito para o interior dela.',
          '<strong>Redirecionando Efeitos.</strong> Algumas habilidades permitem redirecionar seu efeito para novos alvos ou áreas após serem usadas. Quando isso for possível, redirecionar a habilidade é uma ação padrão.',
        ],
      },
      {
        id: 'clarificacoes-regras', titulo: 'Clarificações de Regras',
        itens: [
          { id: 'arredondando', nome: 'Arredondando', descricao: ['A menos que indicado o contrário, sempre que um efeito indica uma divisão, arredonde para baixo. Por exemplo, se um ataque causa 7 pontos de dano e o efeito reduz esse dano à metade, o ataque causa apenas 3 pontos de dano.'] },
          { id: 'ordem', nome: 'Ordem', descricao: ['Se mais de um efeito afetar um valor, siga a ordem de operações padrão. Ou seja, aplique primeiro multiplicações e divisões, depois somas e subtrações. O resultado de um teste de resistência é sempre o primeiro a ser aplicado.'],
            destaque: 'Exemplo completo: um guerreiro usando uma armadura incandescente (redução de fogo 10) é atingido por uma Bola de Fogo que causa 26 pontos de dano. Primeiro, ele faz seu teste de Reflexos. Se passar, reduz o dano à metade, para 13 (26/2=13). Então, pode usar a habilidade Durão. Se tiver passado no teste de resistência, sofrerá 6 pontos de dano (13/2=6). Se tiver falhado, sofrerá 13 (26/2=13). Por fim, aplica sua RD 10: se passou no teste e usou Durão, não sofre dano; se passou em só um dos dois, sofre 3 (13–10); se falhou nos dois, sofre 16 (26–10=16).' },
          { id: 'multiplicacoes', nome: 'Multiplicações', descricao: ['Se mais de um efeito fizer você multiplicar um valor, combine-os em um único multiplicador, com cada efeito além do primeiro adicionando seu multiplicador –1. Por exemplo, dois efeitos que dobrem o valor (x2 + x2) irão triplicar o valor em vez de quadruplicá-lo.'] },
        ],
      },
    ],
  },
  {
    id: 'acumulando-efeitos-cat', titulo: 'Acumulando Efeitos', icone: 'ti-stack-2',
    paragrafos: [
      'A interação entre diferentes efeitos depende de sua origem. As fontes de efeitos são habilidades, perícias, itens, magias, parceiros e o ambiente.',
      'Efeitos de habilidades e perícias acumulam entre si, exceto quando vierem da mesma habilidade ou perícia. Assim, o bônus na Defesa da Pele de Ferro do bárbaro acumula com o bônus na Defesa da Esquiva Sagaz do bucaneiro. Isso não inclui magias.',
      'Efeitos de itens, magias, parceiros e o ambiente acumulam com os de outras fontes, mas não entre si. Assim, um personagem com um item que forneça +1 em Fortitude e uma magia que também forneça +1 em Fortitude terá um bônus de +2 nessa perícia. Porém, um personagem com duas magias que forneçam +1 em Fortitude não terá +2 — como os efeitos são da mesma fonte, não acumulam.',
    ],
    itens: [
      { id: 'acumulo-armaduras', nome: 'Armaduras', descricao: ['Bônus na Defesa da armadura de escudos e armaduras se acumulam com os de um outro item adicional à sua escolha.'] },
      { id: 'acumulo-atributos', nome: 'Atributos', descricao: ['O valor de um mesmo atributo não se acumula em características do personagem. Ou seja, um clérigo/druida não soma duas vezes sua Sabedoria nos pontos de mana, assim como um bucaneiro/nobre não soma duas vezes seu Carisma na Defesa. A exceção são perícias: é possível somar um atributo a uma perícia que use esse mesmo atributo-chave, mas apenas uma vez. Por exemplo, o caçador pode usar Explorador para somar sua Sabedoria em Percepção e Sobrevivência (perícias que usam Sabedoria).'] },
      { id: 'acumulo-chance-falha', nome: 'Chance de Falha', descricao: ['Chance de falha nunca acumula acima de 75%. Sempre há no mínimo uma chance de 1 em 4 de acertar o alvo.'] },
      { id: 'acumulo-reducoes-custo', nome: 'Reduções de Custo', descricao: ['Reduções no custo de PM não são cumulativas. Uma habilidade nunca pode ter seu custo reduzido para menos de 1 PM.'] },
    ],
  },
  {
    id: 'duracao-cat', titulo: 'Duração', icone: 'ti-clock-hour-4',
    paragrafos: ['A duração indica por quanto tempo a habilidade mantém seu efeito.'],
    itens: [
      { id: 'duracao-instantanea', nome: 'Instantânea', descricao: ['O efeito da habilidade termina assim que ela é usada, mas suas consequências podem durar mais tempo. Por exemplo, uma magia Curar Ferimentos age instantaneamente, mas os ferimentos continuam curados.'] },
      { id: 'duracao-cena', nome: 'Cena', descricao: ['A habilidade dura uma cena inteira, encerrando-se quando esse momento da história acaba. Uma cena não tem uma medida fixa: podem ser algumas rodadas (um combate), alguns minutos (uma conversa entre personagens), horas (atravessar um bosque) ou até dias (uma viagem sem incidentes). Veja mais sobre isso no Capítulo 6: O Mestre.'] },
      { id: 'duracao-sustentada', nome: 'Sustentada', descricao: ['A habilidade precisa de um fluxo constante de mana. O personagem deve gastar 1 PM como uma ação livre no início de cada turno seu para manter o efeito ativo. Se não o fizer, a habilidade termina. Você pode manter diversas habilidades sustentadas, pagando o custo de cada uma, mas apenas uma magia sustentada por vez.'] },
      { id: 'duracao-definida', nome: 'Definida', descricao: ['A duração pode ser medida em rodadas, horas, dias ou outra unidade de tempo.'] },
      { id: 'duracao-permanente', nome: 'Permanente', descricao: ['A habilidade fica ativa para sempre, mas ainda pode ser encerrada de outras formas.'] },
      { id: 'duracao-areas', nome: 'Duração e Áreas', descricao: ['Caso a habilidade afete uma área, seus efeitos permanecem nessa área pela sua duração. Criaturas e objetos válidos que entrem na área são afetados, deixando de sê-lo quando saem.'] },
      { id: 'duracao-descarregar', nome: 'Descarregar', descricao: ['Algumas habilidades duram até serem ativadas e descarregadas. A habilidade permanece "dormente" até que determinado evento aconteça, quando é ativada e descarregada, ou até que sua duração transcorra, quando se encerra sem efeito.'] },
      { id: 'duracao-encerrando', nome: 'Encerrando suas Habilidades', descricao: ['Um personagem pode encerrar uma habilidade sua e seus respectivos efeitos como uma ação livre.'] },
      { id: 'duracao-morte', nome: 'Morte e Duração', descricao: ['A morte de um personagem não afeta suas habilidades (exceto sustentadas) — elas permanecem até que sua duração termine.'] },
    ],
  },
  {
    id: 'testes-resistencia-cat', titulo: 'Testes de Resistência', icone: 'ti-shield-check',
    paragrafos: [
      'Habilidades prejudiciais normalmente permitem que seus alvos façam um teste de resistência para evitar ou reduzir seus efeitos. Se esse for o caso, o tipo de teste (Fortitude, Reflexos ou Vontade) e a maneira como ele altera o efeito serão descritos na habilidade.',
      'A CD do teste de resistência para qualquer efeito gerado por um personagem é <strong>10 + metade do nível do personagem + seu valor num atributo</strong>. O atributo aparecerá entre parênteses na descrição da fonte do efeito (habilidade ou item); para magias, será sempre o atributo-chave da magia.',
    ],
    destaque: 'A habilidade Presença Aristocrática, do nobre, tem CD Car, ou seja, uma CD para resistir a ela é 10 + metade do nível do personagem + seu Carisma. Para Marsha Yleus, uma humana nobre de 10º nível com Carisma 4, a CD para resistir a essa habilidade é 19 (10 + 5 + 4).',
    itens: [
      { id: 'anula', nome: 'Anula', descricao: ['A habilidade não tem efeito sobre um alvo que passe em seu teste de resistência.'] },
      { id: 'parcial', nome: 'Parcial', descricao: ['O efeito é menor em um alvo que passe no teste de resistência.'] },
      { id: 'reduz-metade', nome: 'Reduz à Metade', descricao: ['O efeito é reduzido à metade em um alvo que passe no teste de resistência.'] },
      { id: 'descredita', nome: 'Descredita', descricao: ['Um termo específico para efeitos de ilusão. Se uma criatura interagir com a ilusão (examinando-a de perto ou tocando-a; apenas observá-la de longe não é suficiente) tem direito a um teste para perceber que ela não é real. A ilusão continua funcionando mesmo que uma criatura perceba que ela não é real; essa criatura pode avisar seus aliados como uma ação livre, permitindo que eles façam testes para desacreditar.'] },
      { id: 'objetos-dano', nome: 'Objetos e Dano', descricao: ['A menos que a descrição do efeito diga o contrário, itens carregados não sofrem dano por habilidades (mesmo de área). Objetos soltos sofrem dano (mas somente de habilidades que possam ter objetos como alvo ou que afetem uma área).'] },
      { id: 'objetos-teste-resistencia', nome: 'Objetos e Testes de Resistência', descricao: ['Para habilidades capazes de afetar objetos e que permitem testes de resistência, itens mundanos soltos falham automaticamente e itens mundanos carregados podem fazer testes com o bônus de seu portador. Itens mágicos sempre podem fazer teste de resistência, usando seu próprio bônus (veja p.334) ou de seu portador, se houver (o que for maior).'] },
      { id: 'testes-pericia-resistencia', nome: 'Testes de Perícia', descricao: ['Algumas habilidades incluem testes de perícia para resistir a efeitos. A menos que a descrição indique o contrário, a dificuldade dos testes para resistir à habilidade é igual à CD para resistir à habilidade.'] },
    ],
  },
  {
    id: 'tipos-efeito-cat', titulo: 'Tipos de Efeito', icone: 'ti-category-2',
    paragrafos: [
      'Muitos efeitos são categorizados em um (ou mais) dos tipos a seguir. Por si só, a maioria dos tipos não possui efeito em regras. Contudo, indicam como o efeito interage com outros. Por exemplo, uma criatura com imunidade a medo não será afetada por efeitos do tipo medo.',
    ],
    itens: [
      { id: 'tipo-arcano', nome: 'Arcano', descricao: ['Gerado pelas energias místicas de Arton. Todos efeitos arcanos são mágicos.'] },
      { id: 'tipo-atordoamento', nome: 'Atordoamento', descricao: ['Afeta a capacidade de agir do alvo.'] },
      { id: 'tipo-cansaco', nome: 'Cansaço', descricao: ['Diminui as capacidades físicas do alvo. Construtos e mortos-vivos são imunes a efeitos de cansaço.'] },
      { id: 'tipo-climatico', nome: 'Climático', descricao: ['Gerado pelas forças da natureza.'] },
      { id: 'tipo-cura', nome: 'Cura', descricao: ['Cura pontos de vida do alvo.'] },
      { id: 'tipo-dano', nome: 'Dano', descricao: ['Reduz os PV do alvo. Efeitos deste tipo são subdivididos em tipos de dano (veja a página de Combate).'] },
      { id: 'tipo-divino', nome: 'Divino', descricao: ['Gerado pela energia de um deus, direta ou indiretamente. Todos efeitos divinos são mágicos.'] },
      { id: 'tipo-luz', nome: 'Luz', descricao: ['Efeitos relacionados a dano e cura de luz, iluminação e energia positiva (sinônimo de luz).'] },
      { id: 'tipo-magico', nome: 'Mágico', descricao: ['Energizados por forças arcanas ou divinas, envolvem magias, efeitos gerados por itens mágicos ou marcados com o símbolo próprio. Podem ser subdivididos em escolas de magia.'] },
      { id: 'tipo-medo', nome: 'Medo', descricao: ['Medo capaz de prejudicar o alvo. Criaturas com Inteligência nula são imunes a medo.'] },
      { id: 'tipo-mental', nome: 'Mental', descricao: ['Afeta a mente do alvo, diminuindo suas capacidades ou influenciando-a. Criaturas com Inteligência nula são imunes a efeitos mentais.'] },
      { id: 'tipo-metabolismo', nome: 'Metabolismo', descricao: ['Afeta a fisiologia do alvo. Inclui doenças, sangramento e fome. Construtos e mortos-vivos são imunes a efeitos de metabolismo.'] },
      { id: 'tipo-metamorfose', nome: 'Metamorfose', descricao: ['Altera a forma ou composição corporal do alvo. Inclui petrificação.'] },
      { id: 'tipo-movimento', nome: 'Movimento', descricao: ['Afeta ou remove a capacidade de se movimentar do alvo.'] },
      { id: 'tipo-perda-vida', nome: 'Perda de Vida', descricao: ['Reduz os PV do alvo. Ao contrário de dano, não é afetado por redução de dano.'] },
      { id: 'tipo-sentidos', nome: 'Sentidos', descricao: ['Afeta os sentidos físicos do alvo, por exemplo, deixando-o cego ou surdo.'] },
      { id: 'tipo-trevas', nome: 'Trevas', descricao: ['Efeitos relacionados a necromancia, escuridão e energia negativa (sinônimo de trevas).'] },
      { id: 'tipo-veneno', nome: 'Veneno', descricao: ['Efeitos gerados por venenos. Construtos e mortos-vivos são imunes a venenos.'] },
    ],
  },
  {
    id: 'habilidades-gerais-cat', titulo: 'Habilidades Gerais', icone: 'ti-list-details',
    paragrafos: [
      'As habilidades a seguir podem ser fornecidas por diversas fontes, como raça ou magias — são efeitos-padrão reutilizados por vários poderes e criaturas do livro em vez de serem redescritos toda vez.',
    ],
    itens: [
      { id: 'agarrar-aprimorado', nome: 'Agarrar Aprimorado', descricao: ['Se a criatura acertar um ataque com uma arma natural (especificada na habilidade), poderá fazer a manobra agarrar com esta arma como uma ação livre. Enquanto está usando a arma natural para agarrar, a criatura não pode usá-la para desferir outros ataques.'] },
      { id: 'cura-acelerada', nome: 'Cura Acelerada', descricao: ['No início de seu turno, a criatura recupera pontos de vida iguais ao seu valor de cura acelerada (por exemplo, 5 PV com cura acelerada 5). Se houver algum tipo de dano listado após uma barra, esta habilidade não recupera dano do tipo listado. Por exemplo, uma criatura com cura acelerada 10/ácido recupera 10 PV no início de seu turno, a menos que o dano tenha sido causado por ácido. Cura acelerada não cura perda de PV, apenas dano.'] },
      { id: 'deslocamento-escalada', nome: 'Deslocamento de Escalada', descricao: ['Pode caminhar por superfícies verticais e até mesmo de cabeça para baixo como se fossem o chão. O movimento de escalada segue as demais regras de movimento e é afetado pelas características da superfície (uma parede acidentada pode ser considerada terreno difícil, por exemplo). Uma criatura que esteja escalando e perca seu deslocamento de escalada ou a capacidade de realizar ações físicas (como por ficar inconsciente ou paralisada) cai.'] },
      { id: 'deslocamento-escavacao', nome: 'Deslocamento de Escavação', descricao: ['Pode se mover sob terreno granular, como terra e areia (mas não atravessar rocha sólida). Após a passagem da criatura, o terreno atrás dela se fecha devido aos restos de material deixados para trás. Deslocamento de escavação pode ser afetado pelas características do solo: por exemplo, um solo pedregoso pode ser considerado terreno difícil.'] },
      { id: 'deslocamento-natacao', nome: 'Deslocamento de Natação', descricao: ['Pode se deslocar na água sem precisar fazer testes de Atletismo. Porém, assim como criaturas terrestres precisam fazer testes para se deslocar em certas circunstâncias (como em terreno escorregadio ou íngreme), uma criatura com deslocamento de natação pode precisar desses testes (como em uma correnteza muito forte ou num redemoinho). Ela pode respirar debaixo d\'água, mas não fora dela, a menos que tenha outra forma de deslocamento. A criatura não sofre penalidades e limitações por estar submersa (com exceção daquelas relacionadas às suas armas — veja p.269).'] },
      { id: 'deslocamento-voo', nome: 'Deslocamento de Voo', descricao: ['Pode voar. Uma criatura com deslocamento de voo pode encerrar seu deslocamento em pleno ar e pode se mover e atacar como uma criatura terrestre. Uma criatura voando que perca seu deslocamento de voo ou a capacidade de realizar ações cai 150m por rodada. Uma criatura voando que sofra uma manobra derrubar bem-sucedida cai 1d6 x 1,5m antes de recuperar o voo.'] },
      { id: 'faro', nome: 'Faro', descricao: ['A criatura tem olfato apurado. Contra inimigos em alcance curto que ela não possa perceber, ela não fica desprevenida e camuflagem total lhe causa apenas 20% de chance de falha.'] },
      { id: 'fortificacao', nome: 'Fortificação', descricao: ['A criatura tem uma chance de ignorar o dano adicional de acertos críticos e ataques furtivos (em caso de sucesso, trate-a como se tivesse Imunidade a isso).'] },
      { id: 'imunidade', nome: 'Imunidade', descricao: ['A criatura é imune a um tipo de efeito ou outro elemento (como um tipo de dano, uma condição ou uma habilidade). Ela não sofre nenhuma consequência direta daquilo contra o qual ela é imune. Ela ainda pode ser afetada indiretamente — por exemplo, uma criatura imune a efeitos mágicos ainda é afetada por terreno difícil criado por magias. Imunidade a acertos críticos os transforma em acertos normais.'] },
      { id: 'incorporeo', nome: 'Incorpóreo', descricao: ['A criatura não tem corpo físico. Só pode ser afetada por armas e efeitos mágicos (mesmo as com alcance toque) ou criaturas incorpóreas. Pode atravessar objetos sólidos, mas não manipulá-los e tem Força nula.'] },
      { id: 'percepcao-cegas', nome: 'Percepção às Cegas', descricao: ['A criatura usa sentidos diferentes da visão (como radar, sonar, sensibilidade a vibrações etc.). Efeitos relacionados à visão, como escuridão e invisibilidade, não a afetam. Ela pode fazer testes de Percepção para observar usando estes sentidos, ao invés da visão. Esta habilidade tem alcance curto (a menos que especificado o contrário).'] },
      { id: 'reducao-dano', nome: 'Redução de Dano (RD)', descricao: ['A criatura ignora parte do dano que sofre. Por exemplo, se uma criatura com RD 5 sofre um ataque que causa 8 pontos de dano, perde apenas 3 PV. A redução pode ser contra um ou mais tipos de dano específicos. Assim, uma criatura com redução de fogo 10 ignora 10 pontos de dano de fogo, mas sofre dano de outros tipos normalmente. Caso haja um ou mais tipos de dano listados após uma barra, a RD não se aplica àqueles tipos. Por exemplo, uma criatura com RD 10/mágico ignora 10 pontos de dano de todos os ataques que sofrer — exceto dano causado por habilidades e armas mágicas.'] },
      { id: 'resistencia-efeito', nome: 'Resistência a <Efeito>', descricao: ['A criatura recebe um bônus em testes de resistência contra efeitos do tipo especificado no nome desta habilidade. Por exemplo, uma criatura com resistência a magia +2 recebe +2 em testes de Fortitude, Reflexos ou Vontade contra habilidades mágicas.'] },
      { id: 'visao-penumbra', nome: 'Visão na Penumbra', descricao: ['A criatura enxerga em escuridão leve em alcance curto (exceto mágica). Ela ignora camuflagem leve por esse tipo de escuridão.'] },
      { id: 'visao-escuro', nome: 'Visão no Escuro', descricao: ['A criatura enxerga em escuridão total em alcance curto (exceto mágica). Ela ignora camuflagem total por esse tipo de escuridão.'] },
      { id: 'vulnerabilidade-dano', nome: 'Vulnerabilidade a Dano', descricao: ['A criatura sofre +50% a mais de dano de um tipo específico. Por exemplo, se uma criatura com vulnerabilidade a frio sofre um ataque que causa 15 pontos de dano de frio, ela sofre 22 pontos de dano (15 x 1,5 = 22).'] },
    ],
  },
];
