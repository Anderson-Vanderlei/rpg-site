/* ============================================================
   TORMENTA 20 — regras_ambientes.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 6: O Mestre, seção "Ambientes de Aventura", pp. 263–275.

   Mesma árvore das demais páginas de Regras Gerais (ver cabeçalho de
   js/data/regras_testes.js). É o maior dos novos blocos (31/ago) — o
   equivalente de exploração ao que Combate já cobre para batalha:
   Masmorras, Ermos, Clima, Terrenos, Viagens, Perseguições e Ambientes
   Urbanos, cada um com suas próprias sub-regras nomeadas (CDs, danos,
   tabelas). Perigos Ambientais mecânicos específicos (avalanches etc.)
   ficam no Capítulo 7 e já têm seu próprio cadastro em perigos.js — não
   duplicados aqui.
============================================================ */

window.REGRAS_AMBIENTES_ARVORE = [
  {
    id: 'masmorras-cat', titulo: 'Masmorras', icone: 'ti-door',
    paragrafos: [
      'Antigas redes de túneis, covis de dragões, templos esquecidos: lugares fechados, perigosos, repletos de armadilhas e monstros são conhecidos coletivamente como "masmorras". São o ambiente de aventura mais comum de Arton — por serem fechadas, limitam as opções dos jogadores e simplificam a vida do mestre.',
    ],
    itens: [
      {
        id: 'elementos-masmorras', titulo: 'Elementos de Masmorras',
        itens: [
          { id: 'pisos', nome: 'Pisos', descricao: ['Pisos planos (tablados de madeira, ladrilhos em bom estado...) não têm efeito em regras. Pisos irregulares (cavernas naturais, construções em ruínas...) exigem testes de Acrobacia (CD 10) para correr ou fazer uma investida. Piso escorregadio, seja por água, gelo ou mesmo sangue, também exige o uso de Acrobacia para se equilibrar. Um piso que seja irregular e escorregadio aumenta a CD do teste para 15. Pisos cobertos de escombros, entulhos ou outros obstáculos impactantes contam como terreno difícil.'] },
          {
            id: 'paredes', nome: 'Paredes',
            descricao: ['Paredes normalmente são de alvenaria ou pedra bruta (escavada ou natural), mas também podem ser de madeira. Paredes de alvenaria têm redução de dano 8 e 200 PV por trecho de 1,5m de lado. A CD de Atletismo para escalá-las é 20. Paredes de pedra bruta têm RD 8, 500 PV e CD 15 para escalar. Por fim, paredes de madeira possuem RD 5, 100 PV e CD 20 para escalar.'],
          },
          {
            id: 'portas', nome: 'Portas',
            descricao: ['Podem ser de madeira (usada em casas comuns), madeira reforçada (encontrada em mansões, armazéns e outras construções protegidas), pedra (usada em templos e torres) ou ferro (usada em salas de tesouro). Além de portas, muitos ambientes são fechados por grades de ferro, especialmente castelos, calabouços e esgotos. É possível abrir uma porta com um encontrão ou chute — em termos de jogo, uma ação padrão e um teste de Força. Um personagem que falhe por 5 ou mais sofre 1d6 de dano de impacto.'],
            tabela: {
              titulo: 'Tabela 6-3: Portas',
              colunas: ['Tipo de Porta', 'RD', 'PV', 'CD'],
              linhas: [
                ['Madeira', '5', '20', '15'],
                ['Madeira reforçada', '5', '30', '20'],
                ['Pedra', '8', '100', '25'],
                ['Ferro', '10', '100', '25'],
                ['Grade', '10', '60', '20'],
              ],
            },
          },
          { id: 'portas-secretas', nome: 'Portas Secretas', descricao: ['Encontrar uma dessas exige um teste de Investigação, com CD de 20 (portas escondidas atrás de estantes ou tapeçarias) a 30 (portas feitas para se mesclar perfeitamente às paredes).'] },
          { id: 'escadarias', nome: 'Escadarias', descricao: ['Subir uma escadaria conta como terreno difícil. Descer uma escadaria correndo ou fazendo uma investida exige um teste de Acrobacia (CD 10). Em caso de falha, você cai no chão, rola 1d4 x 1,5m para frente (ou até o fim da escada) e sofre 1d6 pontos de dano de impacto por 1,5m rolados.'] },
          { id: 'pilares', nome: 'Pilares', descricao: ['Existem por motivos funcionais (suportar o peso do teto) e estéticos. Pilares podem ser estreitos (com menos de 1,5m de largura) ou largos (com mais de 1,5m de largura). Um pilar estreito tem RD 8 e 100 PV — um personagem pode ficar no mesmo espaço dele e receber cobertura leve por isso (+5 na Defesa). Um pilar largo possui RD 8 e 500 PV; um personagem não pode ficar no mesmo espaço dele, mas pode ficar atrás dele para ganhar cobertura leve. Estalagmites e estátuas contam como pilares estreitos ou largos, de acordo com seu tamanho.'] },
          { id: 'tapecarias', nome: 'Tapeçarias', descricao: ['Um elemento comum de muitas masmorras (especialmente templos e castelos antigos), tapeçarias podem ser úteis como esconderijo ou meio de alcançar um ponto mais alto. Uma tapeçaria com 1,5m de largura tem RD 0 e 10 PV. Um personagem atrás de uma tapeçaria possui camuflagem leve. A CD do teste de Atletismo para escalar uma tapeçaria é 15 (supondo que ela seja resistente o bastante para sustentar o peso do personagem).'] },
          { id: 'altares', nome: 'Altares', descricao: ['Outro elemento típico de masmorras são altares — normalmente, blocos de pedra retangulares que são o centro de um templo. Um altar comum ocupa um espaço de 1,5m por 3m, possui RD 8 e 200 PV e fornece cobertura leve a qualquer criatura atrás dele, embora altares maiores, menores e de outros materiais existam. Um altar também pode emanar uma aura mágica, especialmente as magias Consagrar e Profanar.'] },
        ],
      },
    ],
  },
  {
    id: 'ermos-cat', titulo: 'Ermos', icone: 'ti-trees',
    paragrafos: [
      'Florestas sombrias, montanhas escarpadas e o fundo do mar são exemplos de "ermos", lugares abertos e inóspitos — ao contrário de masmorras, que são fechadas e inóspitas. Ermos e masmorras são os ambientes de aventura mais comuns.',
    ],
    itens: [
      { id: 'covil', nome: 'Covil', descricao: ['Da gruta de um urso-coruja ao fosso de um escorpião gigante, os ermos estão repletos de lares de monstros. Um covil pode ser avistado com testes de Percepção ou Sobrevivência, e esta última perícia pode ser usada para identificar o habitante do lugar (CD 15 + ND da criatura). Normalmente um monstro estará em seu covil, mas há uma chance de 25% de ele estar fora — e qualquer tesouro que ele possua estará desprotegido.'] },
      { id: 'ruina', nome: 'Ruína', descricao: ['Os ermos são repletos dos resquícios de eras passadas. Um personagem que entre em uma ruína pode role 1d6. Com um resultado 1 ou 2, a ruína possui apenas uma ameaça (normalmente uma armadilha ou monstro, a critério do mestre). Com um resultado 3 ou 4, estará vazia. Com um resultado 5, possui uma ameaça e um tesouro. Com um resultado 6, possui apenas um tesouro. As ameaças e os tesouros são apropriados para o nível do grupo. Essa mecânica serve para lugares pequenos — ruínas grandes são masmorras por si só.'] },
      { id: 'santuario', nome: 'Santuário', descricao: ['Mesmo em regiões inóspitas é possível encontrar lugares consagrados aos deuses — uma estátua de Khalmyr, um círculo de flores para Allihanna, uma pedra manchada de sangue para Megalokk... Um teste de Religião (CD 20) indica a qual deus um santuário é consagrado. Tocar um santuário de seu deus patrono fornece o efeito de uma magia (normalmente Bênção, Curar Ferimentos, Físico Divino ou Vestimenta da Fé), mas apenas uma vez por dia. Porém, se o santuário for de um deus inimigo, você é amaldiçoado (veja Rogar Maldição) até o final do dia.'] },
    ],
  },
  {
    id: 'clima-cat', titulo: 'Clima', icone: 'ti-cloud-storm',
    paragrafos: [
      'O clima pode ser um aspecto importante de uma cena — uma batalha sob uma tempestade costuma ser mais dramática que lutar em um belo dia de sol!',
    ],
    itens: [
      { id: 'calor-frio', nome: 'Calor e Frio', descricao: ['Um personagem em clima muito quente (acima de 50°C) ou muito frio (abaixo de –10°C) deve fazer um teste de Fortitude por dia (CD 15 +1 por teste anterior). Se falhar sofre 1d6 pontos de dano de fogo ou frio que só pode ser curado após sair do clima quente ou frio. Em calor ou frio extremos (acima de 60°C ou abaixo de –20°C) o teste deve ser feito por minuto.'] },
      { id: 'neblina', nome: 'Neblina', descricao: ['Fornece camuflagem. Neblina espessa fornece camuflagem leve a criaturas a 1,5m e camuflagem total a criaturas a mais de 1,5m.'] },
      {
        id: 'precipitacoes', titulo: 'Precipitações',
        itens: [
          { id: 'chuva', nome: 'Chuva', descricao: ['–5 em testes de Percepção e os mesmos efeitos de vento forte.'] },
          { id: 'granizo', nome: 'Granizo', descricao: ['Como chuva, mas no início de cada rodada, todas as criaturas sofrem 1 ponto de dano de impacto.'] },
          { id: 'neve', nome: 'Neve', descricao: ['Como chuva, mas cria terreno difícil.'] },
          { id: 'tempestade', nome: 'Tempestade', descricao: ['–10 em testes de Percepção e os mesmos efeitos de vendaval. No início de cada rodada, há 10% de chance de uma criatura aleatória ser atingida por um raio (8d10 pontos de dano de eletricidade).'] },
        ],
      },
      {
        id: 'vento', titulo: 'Vento',
        itens: [
          { id: 'vento-forte', nome: 'Vento Forte', descricao: ['–2 em testes de ataque à distância e 50% de chance por rodada de apagar chamas ou dissipar névoas.'] },
          { id: 'vendaval', nome: 'Vendaval', descricao: ['–5 em testes de ataque à distância. Apaga chamas e dissipa névoas.'] },
          { id: 'furacao', nome: 'Furacão', descricao: ['Torna ataques à distância impossíveis, apaga chamas e dissipa névoas. No início de cada rodada, criaturas Médias ou menores devem passar em um teste de Fortitude (CD 15) ou caem, são arrastadas 1d4 x 1,5m na direção do vento e sofrem 1d6 pontos de dano de impacto para cada 1,5m.'] },
          { id: 'tornado', nome: 'Tornado', descricao: ['Torna ataques à distância impossíveis, apaga chamas e dissipa névoas. No início de cada rodada, criaturas Grandes ou menores devem passar em um teste de Fortitude (CD 25) ou caem, são arrastadas 1d12 x 1,5m em uma direção aleatória e sofrem 1d6 pontos de dano de impacto para cada 1,5m.'] },
        ],
      },
    ],
    destaque: 'O Capítulo 7: Ameaças traz regras para perigos ambientais, como avalanches — uma boa alternativa para quando você quer uma cena de ação que não seja necessariamente combate (já cadastradas na aba Perigos do site).',
  },
  {
    id: 'terrenos-cat', titulo: 'Terrenos', icone: 'ti-map-2',
    paragrafos: [
      'São agrupados em colinas, desertos, florestas, montanhas, pântanos, planícies, árticos e aquáticos.',
    ],
    itens: [
      {
        id: 'colinas', titulo: 'Colinas',
        paragrafos: ['Um tipo de terreno caracterizado por ondulações (suaves ou íngremes) e eventuais penhascos.'],
        itens: [
          { id: 'inclinacao-suave', nome: 'Inclinação Suave', descricao: ['Não afeta o movimento, mas os personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior.'] },
          { id: 'inclinacao-ingreme', nome: 'Inclinação Íngreme', descricao: ['Conta como terreno difícil para subir. Descer uma inclinação íngreme correndo ou fazendo uma investida exige um teste de Acrobacia (ou Cavalgar, se montado; CD 10). Em caso de falha, você cai no chão, rola 1d4 1,5m para frente (ou até o fim da inclinação) e sofre 1d6 pontos de dano de impacto por 1,5m rolados.'] },
          { id: 'penhasco', nome: 'Penhasco', descricao: ['Um rochedo alto e escarpado, normalmente com 1d6 x 3m de altura. Escalar um penhasco típico exige um teste de Atletismo (CD 15).'] },
        ],
      },
      {
        id: 'desertos', titulo: 'Desertos',
        paragrafos: ['Lugares áridos e quentes (para desertos de clima frio, veja "Ártico", a seguir).'],
        itens: [
          { id: 'dunas', nome: 'Dunas', descricao: ['Formadas pela ação do vento sobre a areia, dunas funcionam como inclinações íngremes (veja "Colinas"). Porém, cair e rolar de uma duna não causa dano.'] },
        ],
      },
      {
        id: 'florestas', titulo: 'Florestas',
        paragrafos: ['Incluem florestas fechadas e abertas (bosques). Florestas fechadas são cobertas de árvores largas, folhagens e vegetação rasteira. Bosques normalmente possuem apenas árvores estreitas.'],
        itens: [
          { id: 'arvores', nome: 'Árvores', descricao: ['Podem ser estreitas (com menos de 1,5m de largura) ou largas (com mais de 1,5m de largura). Uma árvore estreita tem RD 5 e 100 PV. O personagem pode ficar no mesmo espaço de uma árvore estreita e receber cobertura leve. Uma árvore larga possui RD 5 e 500 PV. Um personagem não pode ficar no mesmo espaço de uma árvore larga, mas pode ficar atrás dela para ganhar cobertura leve. Subir numa árvore exige um teste de Atletismo (CD 15). Um personagem no topo de uma árvore precisa se equilibrar (CD 15; veja Acrobacia). Um personagem no topo de uma árvore larga recebe camuflagem leve contra criaturas no solo.'] },
          { id: 'folhagens', nome: 'Folhagens', descricao: ['Moitas e arbustos contam como terreno difícil e fornecem camuflagem leve a criaturas dentro deles.'] },
          { id: 'vegetacao-rasteira', nome: 'Vegetação Rasteira', descricao: ['Raízes, vinhas e outros tipos de vegetação rasteira contam como terreno difícil. Além disso, impõem penalidade de –2 em testes de Furtividade pelas folhas secas e galhos caídos.'] },
        ],
      },
      {
        id: 'montanhas', titulo: 'Montanhas',
        paragrafos: ['O início de um terreno montanhoso é normalmente marcado por inclinações e penhascos (veja "Colinas", acima).'],
        itens: [
          { id: 'abismo', nome: 'Abismo', descricao: ['Uma fenda no chão, normalmente com 1d4 x 1,5m de largura e 2d4 x 3m de profundidade. Escalar para fora de um abismo exige um teste de Atletismo (CD 20).'] },
          { id: 'altitude', nome: 'Altitude', descricao: ['A falta de oxigênio de grandes altitudes pode ser letal. Um personagem no cume de uma montanha deve fazer um teste de Fortitude (CD 15 + 1 por teste anterior) por dia. Em caso de falha, fica fatigado até descer (se já estava fatigado, fica exausto).'] },
          { id: 'paredao', nome: 'Paredão', descricao: ['Um penhasco vertical e muito alto, normalmente com 2d6 x 3m de altura. Escalar um paredão exige um teste de Atletismo (CD 25).'] },
          { id: 'seixos', nome: 'Seixos', descricao: ['Em montanhas, inclinações íngremes às vezes são cobertas de pedrinhas. Nesse caso, a CD do teste para descer a inclinação numa corrida ou investida aumenta para 15.'] },
        ],
      },
      {
        id: 'pantanos', titulo: 'Pântanos',
        paragrafos: ['Inclui brejos, charcos, mangues (pântanos de água salgada) e qualquer tipo de terreno alagado. Pântanos possuem muita vegetação rasteira, folhagens e árvores (veja "Florestas"), além de água parada (veja "Aquático") e lodaçais.'],
        itens: [
          { id: 'lodacal', nome: 'Lodaçal', descricao: ['Poças com uma mistura de água e lama que atrapalha os movimentos. Um lodaçal conta como terreno difícil e impõe a condição vulnerável a qualquer personagem dentro dele.'] },
        ],
      },
      {
        id: 'planicies', titulo: 'Planícies',
        paragrafos: ['Incluem estradas, pastos, fazendas e campos de batalha. Normalmente, não há elementos associados a planícies, embora às vezes elas contenham vegetação rasteira (veja "Florestas") ou trincheiras.'],
        itens: [
          { id: 'trincheira', nome: 'Trincheira', descricao: ['Uma vala escavada no solo para proteger soldados. Um personagem em uma trincheira recebe cobertura leve contra ataques à distância. Sair de uma trincheira conta como terreno difícil. Essa regra pode ser usada para valas, leitos de rio secos e acidentes geográficos similares.'] },
        ],
      },
      {
        id: 'artico', titulo: 'Ártico',
        paragrafos: ['Qualquer região fria. Normalmente, regiões árticas são montanhas ou desertos gelados (tundras).'],
        itens: [
          { id: 'gelo', nome: 'Gelo', descricao: ['Você pode andar no gelo à metade do seu deslocamento sem testes. Porém, andar em seu deslocamento normal, correr, fazer uma investida ou sofrer dano sobre o gelo exige um teste de Acrobacia (CD 15, no caso de movimento, ou igual ao dano sofrido). Em caso de falha, você cai e desliza 1d4 x 1,5m (para a frente, no caso de movimento, ou na direção do ataque, no caso de dano sofrido).'] },
          { id: 'rio-congelado', nome: 'Rio Congelado', descricao: ['Andar sobre um rio congelado é como andar sobre gelo. Se você cair e rolar 1 no d4 para determinar quanto desliza, o gelo quebra e você se afunda. Se você se afundar, sofre 1d6 pontos de dano de frio por rodada e precisa nadar. Sair exige estar debaixo de um buraco no gelo e gastar uma ação de movimento para se erguer. Abrir um buraco exige causar 10 pontos de dano de impacto ou fogo.'] },
        ],
      },
      {
        id: 'aquatico', titulo: 'Aquático',
        paragrafos: ['Este tipo de terreno é dividido em água corrente (rios e mar agitado) e parada (lagos e mar calmo).'],
        itens: [
          { id: 'agua-corrente', nome: 'Água Corrente', descricao: ['A velocidade típica de uma correnteza é 1d6 x 3m por rodada. No fim de cada rodada, todos os personagens na água são arrastados nessa velocidade na direção da correnteza. A CD de testes de Atletismo para nadar em um rio é 15 (para correntezas de 9m por rodada ou menos) ou 20 (para correntezas mais rápidas). Sair de uma correnteza com velocidade de 15m ou mais exige chegar até a margem ou ponto de apoio (como um bote ou uma tábua flutuante), então gastar uma ação de movimento e passar num teste de Atletismo (CD 20) para agarrar alguma coisa (galho, raiz, corda...). Se falhar, o personagem não consegue agarrar nada (e, no fim da rodada, será levado pela correnteza).'] },
          { id: 'agua-parada', nome: 'Água Parada', descricao: ['Água parada exige testes de Atletismo para nadar, conforme a descrição da perícia, mas não possui nenhum outro modificador.'] },
          { id: 'personagens-submersos', nome: 'Personagens Submersos', descricao: ['Criaturas debaixo d\'água não podem falar (e, portanto, lançar magias) e sofrem –2 em testes de ataque e –5 em testes de Percepção. Elas só podem se deslocar fazendo testes de Atletismo para nadar. Criaturas com deslocamento de natação não sofrem essas penalidades. Armas de ataque à distância não podem ser usadas (com exceção de armas de arremesso de perfuração, bestas e redes) e armas de corte e impacto que não sejam armas naturais causam metade do dano debaixo d\'água. Por fim, criaturas submersas recebem camuflagem e cobertura leves contra personagens fora d\'água.'] },
        ],
      },
    ],
  },
  {
    id: 'viagens-cat', titulo: 'Viagens', icone: 'ti-route',
    paragrafos: [
      'Via de regra, é melhor lidar com viagens de forma abstrata (resumindo com uma descrição curta, como "depois de uma semana de viagem, vocês chegam a Nova Malpetrim"). Mas, se quiser lidar com uma viagem de forma detalhada, use as informações a seguir.',
    ],
    itens: [
      {
        id: 'velocidade-viagem', nome: 'Velocidade de Viagem',
        descricao: ['Consulte a tabela abaixo para determinar a velocidade de viagem do grupo, por hora ou por dia, de acordo com o deslocamento do membro mais lento do grupo.'],
        tabela: {
          titulo: 'Tabela 6-4: Viagens',
          colunas: ['Deslocamento', 'Por hora¹', 'Por dia²'],
          linhas: [
            ['4,5m', '2,25km', '18km'],
            ['6m', '3km', '24km'],
            ['7,5m', '3,75km', '30km'],
            ['9m', '4,5km', '36km'],
            ['12m', '6km', '48km'],
          ],
          nota: '¹Deslocamento x 0,5 km. ²Deslocamento por hora x 8 km.',
        },
      },
      { id: 'terreno-clima-viagem', nome: 'Terreno e Clima', descricao: ['As distâncias na tabela consideram terreno aberto e clima bom. Em terreno difícil (florestas, pântanos...) ou clima ruim (chuva, neblina...) diminuem a distância pela metade. Essas reduções são cumulativas. De acordo com o mestre, testes de Sobrevivência podem anular essas reduções.'] },
      { id: 'marcha-forcada', nome: 'Marcha Forçada', descricao: ['As distâncias na tabela consideram o ritmo normal de caminhada, mas é possível avançar mais rápido. Nesse caso, a distância por hora dobra, mas a cada hora o personagem deve passar em um teste de Fortitude (CD 15 +1 por teste anterior) ou perde 1d6 pontos de vida.'] },
      { id: 'perdendo-se', nome: 'Perdendo-se', descricao: ['Se o grupo não está seguindo uma estrada ou marco — como um rio ou praia —, o guia deve passar em um teste de Sobrevivência por dia, ou ficará perdido. Um grupo perdido viaja em uma direção aleatória. Uma vez por dia, cada personagem pode fazer um teste de Sobrevivência (CD 20 –1 por dia da viagem aleatória) para perceber que está no caminho errado e determinar um novo caminho (com um novo teste de Sobrevivência).'] },
      { id: 'suprimentos', nome: 'Suprimentos', descricao: ['Controle suprimentos apenas se isso for importante para a aventura — por exemplo, durante uma travessia pelo Deserto da Perdição, a falta de água e comida pode ser tão perigosa quanto um monstro! Nesse caso, os jogadores devem controlar suas rações de viagem. Testes de Sobrevivência para encontrar suprimentos, e de Fortitude para resistir à fome e à sede, podem tornar uma viagem tão emocionante quanto um combate.'] },
    ],
  },
  {
    id: 'perseguicoes-cat', titulo: 'Perseguições', icone: 'ti-run',
    paragrafos: [
      'Um elemento típico de aventuras urbanas, especialmente aquelas envolvendo a lei e o crime, são perseguições. Os personagens podem correr atrás de um bandido pelas ruas de uma cidade, desviando-se da multidão e saltando por sobre caixotes — ou então eles mesmos podem ser perseguidos pela milícia.',
    ],
    itens: [
      {
        id: 'iniciando-perseguicao', nome: 'Iniciando a Perseguição',
        descricao: [
          'Para iniciar uma perseguição, o mestre deve listar quem são os perseguidores e fugitivos, determinar os objetivos de cada lado e estipular a distância inicial.',
          'Normalmente, o objetivo dos perseguidores é simples: alcançar os fugitivos. Já o objetivo dos fugitivos pode ser alcançar um lugar específico ou abrir uma distância mínima. A distância inicial entre os perseguidores e os fugitivos depende da cena — pode ser 3m, se os dois lados estavam discutindo até algo acontecer e um deles resolver fugir, ou 30m, no caso de um miliciano que viu um bandido procurado do outro lado do mercado. Na dúvida, o mestre pode rolar 1d10 x 3m.',
        ],
      },
      {
        id: 'conduzindo-perseguicao', nome: 'Conduzindo a Perseguição',
        descricao: [
          'Para conduzir uma perseguição, utilize as regras de corrida, descritas na perícia Atletismo. Cada participante faz um teste de Atletismo por rodada. Para controlar a distância que cada um percorreu, separe uma folha em colunas, uma para cada participante — anote 0 na coluna de cada perseguidor e a distância inicial na coluna de cada fugitivo. No fim de cada rodada, some a distância que cada participante percorreu com o número acima em sua coluna.',
          'No fim de uma rodada, se a distância de um perseguidor for maior que a de um fugitivo, esse perseguidor alcançou o fugitivo, encerrando a perseguição — o fugitivo pode se render ou uma cena de combate pode começar.',
          'Um personagem pode correr por um número de rodadas igual a 1 + sua Constituição. Após isso, deve fazer um teste de Fortitude (CD 15 +1 por teste anterior) por rodada. Se falhar, fica fatigado e sai da perseguição.',
          'Para deixar a perseguição mais interessante, o mestre pode adicionar eventos, divididos em obstáculos e atalhos. Obstáculos exigem que todos os participantes façam um teste — um participante que falhe percorre metade da distância naquela rodada (arredonde para baixo para o incremento de 1,5m mais próximo). Atalhos permitem que cada participante escolha fazer um teste — um participante que passe no teste avança o dobro da distância naquela rodada; se falhar, avança apenas metade.',
        ],
        tabela: {
          titulo: 'Tabela 6-5: Eventos de Perseguições',
          colunas: ['d20', 'Evento', 'Teste', 'Exemplo'],
          linhas: [
            ['1-6', 'Nenhum', '—', '—'],
            ['7-8', 'Obstáculo', 'Força CD 15', 'Pilha de caixotes bloqueia o caminho.'],
            ['9-10', 'Obstáculo', 'Acrobacia CD 20', 'Frutas caídas deixam o piso escorregadio.'],
            ['11-12', 'Obstáculo', 'Reflexos CD 20', 'Barris rolam pela rua.'],
            ['13-14', 'Obstáculo', 'Intimidação CD 20', 'Multidão impede a passagem.'],
            ['15-16', 'Atalho', 'Adestramento CD 20', 'Carroça na qual se pode tentar subir.'],
            ['17-18', 'Atalho', 'Força CD 15', 'Caminho mais curto, mas bloqueado.'],
            ['19-20', 'Atalho', 'Percepção CD 20', 'Ruelas labirínticas, nas quais se pode cortar caminho ou se perder.'],
          ],
          nota: 'O mestre pode decidir por obstáculos ou atalhos, ou rolar uma vez por rodada na tabela. O mestre pode aumentar a CD dos obstáculos em +5, para zonas especialmente movimentadas, criar novos elementos ou determinar penalidades diferentes para uma falha (como dano, por exemplo).',
        },
      },
    ],
  },
  {
    id: 'ambientes-urbanos-cat', titulo: 'Ambientes Urbanos', icone: 'ti-building-community',
    paragrafos: [
      'O terceiro e último tipo de ambiente de aventura é formado por cidades, vilas e qualquer lugar com uma comunidade organizada — de um acampamento das legiões táuricas a um bosque habitado por fadas. Embora a fantasia épica seja mais ligada a masmorras e ermos, ambientes urbanos são ótimos para muitas aventuras: crime e intriga fazem com que as ruas de uma metrópole sejam tão perigosas quanto os corredores de qualquer masmorra.',
    ],
    itens: [
      {
        id: 'tipos-comunidade', titulo: 'Tipos de Comunidade',
        paragrafos: ['Ter uma ideia geral das características do lugar onde se passa a aventura é útil, sem precisar detalhar completamente um ambiente urbano.'],
        itens: [
          { id: 'aldeia', nome: 'Aldeia', descricao: ['Até 1.000 habitantes. Em geral, sem governo formal — decisões são tomadas por um "sábio", ancião respeitado, ou por um magistrado apontado por um nobre local. Guarda: nenhuma formal (em caso de ataque, 2d10 camponeses pegam ancinhos, foices e outras ferramentas; se tiver magistrado, 1d4+1 guardas). Justiça: baseada em senso comum ou dogmas religiosos; um criminoso é julgado pelo sábio ou magistrado, que tem autoridade absoluta. Economia: um único armazém, com itens de até T$ 50 disponíveis em quantidades limitadas (1d6 exemplares de cada ou menos); a aldeia tem 1d4 x T$ 100 em dinheiro.'] },
          { id: 'vila', nome: 'Vila', descricao: ['Até 5.000 habitantes. Governo: um burgomestre (equivalente a um prefeito) eleito ou apontado por um nobre local, com um salão comunal e estrutura simples de servos, clérigo e talvez um arcanista. Guarda: milícia formada por 10d10 guardas comandados por um sargento, com o burgomestre podendo ter guarda-costas de alto nível. Justiça: leis simples impostas pela milícia — crimes pequenos resolvidos pelo sargento, crimes maiores julgados pelo nobre local (com testes opostos de Diplomacia entre acusador e réu, ou Intuição do nobre para descobrir mentiras). Economia: mercado com itens de até T$ 1.000, itens raros em quantidades limitadas (2d6 exemplares de cada) e 1d6 x T$ 1.000 em dinheiro disponível.'] },
          { id: 'cidade', nome: 'Cidade', descricao: ['Até 25.000 habitantes. Governo: um lorde-prefeito apontado pelo regente do reino, assessorado por um conselho eleito de cidadãos "respeitáveis". Guarda: força com centenas de soldados e oficiais, liderada por um capitão (normalmente cavaleiro ou guerreiro de pelo menos 8º nível); em caso de ataque, clérigos de templos locais e aventureiros residentes podem ajudar. Justiça: leis complexas, detalhadas em documentos oficiais, com juízes (normalmente clérigos de Khalmyr), advogados e promotores públicos; um julgamento pode envolver um teste estendido e a busca por provas e testemunhas. Economia: praticamente qualquer item ou serviço mundano disponível; itens acima de T$ 10.000 podem não estar disponíveis; 2d4 x T$ 10.000 em dinheiro disponível.'] },
          { id: 'metropole', nome: 'Metrópole', descricao: ['Comunidades raras, no máximo uma por reino (sua capital) — normalmente por volta de 100 mil habitantes, embora as maiores metrópoles de Arton (Valkaria, Tiberus) tenham mais de um milhão cada. Governo: o próprio regente do reino, com a administração cotidiana delegada a incontáveis oficiais e conselheiros — um verdadeiro labirinto burocrático. Guarda: um exército com soldados, oficiais, clérigos, arcanistas de batalha, constructos, monstros domados e o que o mestre quiser, além de dezenas de aventureiros habitando a cidade. Justiça: diversos tribunais, guildas de juristas — e também todo tipo de jogo e corrupção. Economia: uma infinidade de oficinas locais, caravanas e navios mercantes de todo o mundo — a quantidade de dinheiro disponível é virtualmente ilimitada.'] },
        ],
      },
      { id: 'lei-ordem', nome: 'Lei & Ordem', descricao: ['Uma grande diferença de ambientes urbanos para masmorras e ermos é a existência da lei. Nas profundezas de uma mina abandonada, os heróis podem fazer o que quiserem — já nas ruas de uma cidade, devem pensar duas vezes antes de sair lançando Bolas de Fogo! A legislação varia de reino para reino, ou mesmo de comunidade para comunidade. No que tange a aventureiros, as normas mais importantes são as que restringem o que eles podem portar — a maior parte das comunidades não tem restrições, mas algumas proíbem armas marciais, varinhas de bruxos e outros itens perigosos, além de símbolos sagrados de certos deuses (como Aharadak, Sszzaas e Tenebra). Armas de fogo são um caso especial: são proibidas em todo o Reinado. Personagens podem fazer testes de Nobreza para conhecer a lei de lugares que visitem.'] },
      {
        id: 'outros-elementos-urbanos', titulo: 'Outros Elementos Urbanos',
        itens: [
          { id: 'ruas', nome: 'Ruas', descricao: ['Vilas e cidades possuem ruas estreitas, entre 3m e 6m de largura, e becos mais estreitos ainda, com 1,5m ou 3m de largura. Cidades grandes e metrópoles também possuem avenidas com até 9m de largura, permitindo que duas carroças passem lado a lado. Ruas normalmente são de terra batida (que vira um lamaçal em caso de chuva, exigindo testes de Acrobacia para corridas ou investidas), ou, mais raramente, paralelepípedos.'] },
          { id: 'construcoes', nome: 'Construções', descricao: ['Em vilas e cidades, a maior parte das construções possui dois ou três pavimentos. O primeiro, de alvenaria, é usado para lojas e oficinas; os restantes, de madeira, são usados para residência. As construções são geminadas, formando longas filas separadas por becos. Bairros pobres possuem casebres de um andar, enquanto as maiores cidades possuem mansões protegidas por muros e jardins internos.'] },
          { id: 'muros-portoes', nome: 'Muros e Portões', descricao: ['Muros de uma cidade normalmente possuem entre 6m e 9m de altura, enquanto os de uma metrópole podem atingir até 18m de altura. Muros possuem ameias que fornecem cobertura leve a quem estiver no topo. A CD para escalá-los é 25. O portão típico de uma cidade é feito de madeira, com RD 5 e 60 PV, mas as maiores comunidades possuem portões de ferro, com RD 10 e 300 PV.'] },
          { id: 'telhados', nome: 'Telhados', descricao: ['Subir em um telhado exige escalar a lateral de uma construção (CD 20). Andar em um telhado exige um teste de Acrobacia (CD 10) por ação de movimento. Correr sobre um telhado aumenta a CD em +5. Quando um telhado termina, o personagem deve pular para o próximo telhado (ou para outro ponto alto, como uma marquise, gárgula, poste etc.). Isso normalmente exige um teste de Atletismo (CD 20), mas a CD pode ser maior (para ruas muito largas) ou menor (para ruas especialmente estreitas). O mestre pode misturar as regras sobre telhados com as regras de perseguição.'] },
          { id: 'esgotos', nome: 'Esgotos', descricao: ['Apenas metrópoles possuem sistemas de esgotos. Entrar num esgoto exige abrir um bueiro (ação completa) e descer uma escada (ação de movimento) ou saltar (ação livre, exige um teste de Atletismo contra CD 15 para não sofrer 1d6 pontos de dano de impacto).'] },
          { id: 'multidoes', nome: 'Multidões', descricao: ['As ruas das maiores cidades muitas vezes estão lotadas de pessoas. Um espaço ocupado por uma multidão conta como terreno difícil e fornece cobertura leve a qualquer um dentro dele. Uma multidão que veja algo perigoso foge na direção oposta com deslocamento de 9m no fim de cada rodada. É possível direcionar uma multidão com um teste de Diplomacia (CD 15, ação completa) ou Intimidação (CD 20, ação livre).'] },
        ],
      },
    ],
  },
];
