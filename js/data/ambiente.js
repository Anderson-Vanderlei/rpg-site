// ============================================================================
// AMBIENTE — Compêndio Tormenta 20
// Fonte: Tormenta20 - Edição Jogo do Ano, Capítulo 6 "O Mestre", seção
// "Ambientes de Aventura" (livro p. 263 a 275).
//
// Diferente de Perigos (onde cada item tinha um conjunto pequeno e fixo de
// campos possíveis — nd, cd, dano, resistência...), o conteúdo de Ambiente
// é muito mais heterogêneo: um elemento de masmorra tem RD/PV/CD de
// arrombar, um efeito de clima só tem um teste e um dano, um tipo de
// assentamento tem população/governo/guarda/justiça/economia. Por isso,
// em vez de repetir dezenas de campos nulos feito nos outros arquivos,
// os "fatos" numéricos de cada item ficam num campo genérico `stats`
// (array de {label, valor}), já no formato que a função grupoChips() do
// site espera — um padrão novo, pensado pra ser reaproveitado por futuras
// páginas com dados igualmente variados (ex: Complicações).
//
// fonte: campo OPCIONAL em qualquer uma das coleções abaixo (junto de
// `pagina`) — ausente em todo item do livro-base (a badge de fonte
// assume 'Tormenta 20' quando o campo não existe, ver
// renderAmbienteCard/abrirDetalheAmbiente em compendio.js). Preparado
// pra próximos suplementos, mesmo sem nenhum item assim ainda; não
// repetido campo a campo nos schemas abaixo.
//
// window.AMBIENTE_CLIMA — os 10 efeitos de clima do livro (p. 267).
//   categoria: 'temperatura' | 'visibilidade' | 'precipitacao' | 'vento'
//   Schema: { id, nome, categoria, efeito, stats, pagina }
//
// window.AMBIENTE_TERRENO — "elementos" de terreno (p. 268-269), cada um
// pertencente a um tipo de terreno do livro. O próprio livro organiza o
// conteúdo assim: um tipo de terreno (Colinas, Florestas...) contém vários
// elementos com regra própria (Penhasco, Árvore Larga...). Um elemento
// "geral" (Vegetação Rasteira) se aplica a mais de um tipo de terreno.
//   terreno: 'geral' | 'colinas' | 'desertos' | 'florestas' | 'montanhas' |
//            'pantanos' | 'planicies' | 'artico' | 'aquatico'
//   Schema: { id, nome, terreno, efeito, stats, pagina }
//
// window.AMBIENTE_MASMORRA_ELEMENTO — elementos estruturais de masmorra
// (Pisos, Paredes, Portas, Pilares, Tapeçarias, Altares — p. 264-265).
//   tipo: 'piso' | 'parede' | 'porta' | 'pilar' | 'outro'
//   Schema: { id, nome, tipo, efeito, stats, pagina }
//
// window.AMBIENTE_MASMORRA_IDEIAS — Tabela 6-2 (p. 263), 20 ideias de
// masmorra por resultado de 1d20. Usada pela ferramenta "Sortear Ideia".
//   Schema: { numero (1-20), ideia }
//
// window.AMBIENTE_ERMO_ELEMENTO — elementos "encontráveis" nos ermos
// (Covil, Ruína, Santuário — p. 269). `subtabela`, quando presente, é uma
// tabela de resultado aleatório citada literalmente do livro (ex: a
// tabela de 1d6 da Ruína).
//   Schema: { id, nome, efeito, stats, subtabela: [{faixa, resultado}]|null, pagina }
//
// window.AMBIENTE_URBANO_ASSENTAMENTO — os 4 portes de comunidade urbana
// (Aldeia, Vila, Cidade, Metrópole — p. 271-273), cada um com os mesmos
// cinco aspectos descritos pelo livro.
//   Schema: { id, nome, populacao, governo, guarda, justica, economia, pagina }
//
// window.AMBIENTE_URBANO_ELEMENTO — "Outros Elementos Urbanos" (Ruas,
// Construções, Muros e Portões, Telhados, Esgotos, Multidões — p. 275).
//   Schema: { id, nome, efeito, stats, pagina }
//
// window.AMBIENTE_VIAGEM_TABELA — Tabela 6-4 (p. 270): velocidade de
// viagem por deslocamento do membro mais lento do grupo.
//   Schema: { deslocamentoM, porHoraKm, porDiaKm }
//
// window.AMBIENTE_VIAGEM_REGRAS — as regras de texto que acompanham a
// tabela (Terreno e Clima, Marcha Forçada, Perdendo-se, Suprimentos),
// citadas literalmente, sem virar tabela (o livro não dá CDs fixas pra
// todas elas).
//   Schema: { titulo, texto }
//
// window.AMBIENTE_PERSEGUICAO_EVENTOS — Tabela 6-5 (p. 274): eventos de
// perseguição por resultado de 1d20. Usada pela ferramenta "Rolar Evento".
//   Schema: { faixaMin, faixaMax, evento: 'Nenhum'|'Obstáculo'|'Atalho',
//             teste (string|null), exemplo (string|null) }
// ============================================================================

window.AMBIENTE_CLIMA = [
  {
    id: 'calor-e-frio', nome: 'Calor e Frio', categoria: 'temperatura',
    efeito: 'Um personagem em clima muito quente (acima de 50º C) ou muito frio (abaixo de –10º C) deve fazer um teste de Fortitude por dia. Se falhar, sofre 1d6 pontos de dano de fogo ou frio, que só pode ser curado após sair do clima quente ou frio. Em calor ou frio extremos (acima de 60º C ou abaixo de –20º C) o teste deve ser feito por minuto, não por dia.',
    stats: [{ label: 'Teste', valor: 'Fortitude (CD 15 +1 por teste anterior)' }, { label: 'Falha', valor: '1d6 de dano de fogo/frio' }],
    pagina: 267,
  },
  {
    id: 'neblina', nome: 'Neblina', categoria: 'visibilidade',
    efeito: 'Neblina espessa fornece camuflagem leve a criaturas a 1,5m e camuflagem total a criaturas a mais de 1,5m.',
    stats: [{ label: 'Efeito', valor: 'Camuflagem leve (1,5m) / total (mais de 1,5m)' }],
    pagina: 267,
  },
  {
    id: 'chuva', nome: 'Chuva', categoria: 'precipitacao',
    efeito: '–5 em testes de Percepção e os mesmos efeitos de vento forte (–2 em testes de ataque à distância e 50% de chance por rodada de apagar chamas ou dissipar névoas).',
    stats: [{ label: 'Percepção', valor: '–5' }, { label: 'Efeito adicional', valor: 'Igual a Vento Forte' }],
    pagina: 267,
  },
  {
    id: 'granizo', nome: 'Granizo', categoria: 'precipitacao',
    efeito: 'Como chuva, mas no início de cada rodada todas as criaturas sofrem 1 ponto de dano de impacto.',
    stats: [{ label: 'Percepção', valor: '–5' }, { label: 'Dano', valor: '1 (impacto, por rodada, início da rodada)' }],
    pagina: 267,
  },
  {
    id: 'neve', nome: 'Neve', categoria: 'precipitacao',
    efeito: 'Como chuva, mas cria terreno difícil.',
    stats: [{ label: 'Percepção', valor: '–5' }, { label: 'Terreno', valor: 'Difícil' }],
    pagina: 267,
  },
  {
    id: 'tempestade', nome: 'Tempestade', categoria: 'precipitacao',
    efeito: '–10 em testes de Percepção e os mesmos efeitos de vendaval (–5 em testes de ataque à distância, apaga chamas e dissipa névoas). No início de cada rodada, há 10% de chance de uma criatura aleatória ser atingida por um raio.',
    stats: [{ label: 'Percepção', valor: '–10' }, { label: 'Raio', valor: '10% de chance/rodada — 8d10 de dano de eletricidade' }],
    pagina: 267,
  },
  {
    id: 'vento-forte', nome: 'Vento Forte', categoria: 'vento',
    efeito: '–2 em testes de ataque à distância e 50% de chance por rodada de apagar chamas ou dissipar névoas.',
    stats: [{ label: 'Ataque à distância', valor: '–2' }],
    pagina: 267,
  },
  {
    id: 'vendaval', nome: 'Vendaval', categoria: 'vento',
    efeito: '–5 em testes de ataque à distância. Apaga chamas e dissipa névoas.',
    stats: [{ label: 'Ataque à distância', valor: '–5' }],
    pagina: 267,
  },
  {
    id: 'furacao', nome: 'Furacão', categoria: 'vento',
    efeito: 'Torna ataques à distância impossíveis, apaga chamas e dissipa névoas. No início de cada rodada, criaturas Médias ou menores devem passar em um teste de Fortitude ou caem, são arrastadas 1d4 x 1,5m na direção do vento e sofrem 1d6 pontos de dano de impacto para cada 1,5m.',
    stats: [{ label: 'Ataque à distância', valor: 'Impossível' }, { label: 'Teste', valor: 'Fortitude CD 15 (Médias ou menores)' }, { label: 'Falha', valor: 'Cai, arrastado 1d4x1,5m, 1d6 dano/1,5m' }],
    pagina: 267,
  },
  {
    id: 'tornado', nome: 'Tornado', categoria: 'vento',
    efeito: 'Torna ataques à distância impossíveis, apaga chamas e dissipa névoas. No início de cada rodada, criaturas Grandes ou menores devem passar em um teste de Fortitude ou caem, são arrastadas 1d12 x 1,5m em uma direção aleatória e sofrem 1d6 pontos de dano de impacto para cada 1,5m.',
    stats: [{ label: 'Ataque à distância', valor: 'Impossível' }, { label: 'Teste', valor: 'Fortitude CD 25 (Grandes ou menores)' }, { label: 'Falha', valor: 'Cai, arrastado 1d12x1,5m, 1d6 dano/1,5m' }],
    pagina: 267,
  },
];

window.AMBIENTE_TERRENO = [
  {
    id: 'vegetacao-rasteira', nome: 'Vegetação Rasteira', terreno: 'geral',
    efeito: 'Raízes, vinhas e outros tipos de vegetação rasteira contam como terreno difícil. Além disso, impõem penalidade de –2 em teste de Furtividade pelas folhas secas e galhos caídos.',
    stats: [{ label: 'Terreno', valor: 'Difícil' }, { label: 'Furtividade', valor: '–2' }],
    pagina: 268,
  },
  {
    id: 'inclinacao-suave', nome: 'Inclinação Suave', terreno: 'colinas',
    efeito: 'Não afeta o movimento, mas personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior.',
    stats: null,
    pagina: 268,
  },
  {
    id: 'inclinacao-ingreme', nome: 'Inclinação Íngreme', terreno: 'colinas',
    efeito: 'Conta como terreno difícil para subir. Descer uma inclinação íngreme correndo ou fazendo uma investida exige um teste de Acrobacia (ou Cavalgar, se estiver montado). Em caso de falha, você cai no chão, rola 1d4 x 1,5m para frente (ou até o fim da inclinação) e sofre 1d6 pontos de dano de impacto por 1,5m rolados.',
    stats: [{ label: 'Subir', valor: 'Terreno difícil' }, { label: 'Descer correndo/investida', valor: 'Acrobacia/Cavalgar CD 10' }, { label: 'Falha', valor: 'Cai, rola 1d4x1,5m, 1d6 dano/1,5m' }],
    pagina: 268,
  },
  {
    id: 'penhasco', nome: 'Penhasco', terreno: 'colinas',
    efeito: 'Um rochedo alto e escarpado. Um penhasco típico tem 1d6 x 3m de altura. Escalar um penhasco exige um teste de Atletismo.',
    stats: [{ label: 'Altura típica', valor: '1d6 x 3m' }, { label: 'Escalar', valor: 'Atletismo CD 15' }],
    pagina: 268,
  },
  {
    id: 'dunas', nome: 'Dunas', terreno: 'desertos',
    efeito: 'Formadas pela ação do vento sobre a areia, dunas funcionam como inclinações íngremes. Porém, cair e rolar de uma duna não causa dano.',
    stats: [{ label: 'Subir', valor: 'Terreno difícil (como Inclinação Íngreme)' }, { label: 'Cair/rolar', valor: 'Sem dano' }],
    pagina: 268,
  },
  {
    id: 'arvore-estreita', nome: 'Árvore Estreita', terreno: 'florestas',
    efeito: 'Menos de 1,5m de largura. Um personagem pode ficar no mesmo espaço de uma árvore estreita e receber cobertura leve.',
    stats: [{ label: 'RD', valor: '5' }, { label: 'PV', valor: '100' }, { label: 'Cobertura', valor: 'Leve, no mesmo espaço' }],
    pagina: 268,
  },
  {
    id: 'arvore-larga', nome: 'Árvore Larga', terreno: 'florestas',
    efeito: 'Mais de 1,5m de largura. Um personagem não pode ficar no mesmo espaço de uma árvore larga, mas pode ficar atrás dela para ganhar cobertura leve. Subir numa árvore exige um teste de Atletismo. Um personagem no topo precisa se equilibrar. Um personagem no topo de uma árvore larga recebe camuflagem leve contra criaturas no solo.',
    stats: [{ label: 'RD', valor: '5' }, { label: 'PV', valor: '500' }, { label: 'Subir', valor: 'Atletismo CD 15' }, { label: 'Equilibrar no topo', valor: 'Acrobacia CD 15' }, { label: 'No topo', valor: 'Camuflagem leve contra o solo' }],
    pagina: 268,
  },
  {
    id: 'folhagens', nome: 'Folhagens', terreno: 'florestas',
    efeito: 'Moitas e arbustos contam como terreno difícil e fornecem camuflagem leve a criaturas dentro deles.',
    stats: [{ label: 'Terreno', valor: 'Difícil' }, { label: 'Camuflagem', valor: 'Leve, dentro delas' }],
    pagina: 268,
  },
  {
    id: 'abismo', nome: 'Abismo', terreno: 'montanhas',
    efeito: 'Uma fenda no chão, normalmente com 1d4 x 1,5m de largura e 2d4 x 3m de profundidade. Escalar para fora de um abismo exige um teste de Atletismo.',
    stats: [{ label: 'Largura típica', valor: '1d4 x 1,5m' }, { label: 'Profundidade típica', valor: '2d4 x 3m' }, { label: 'Escalar pra fora', valor: 'Atletismo CD 20' }],
    pagina: 268,
  },
  {
    id: 'altitude', nome: 'Altitude', terreno: 'montanhas',
    efeito: 'A falta de oxigênio de grandes altitudes pode ser letal. Um personagem no cume de uma montanha deve fazer um teste de Fortitude por dia. Em caso de falha, fica fatigado até descer (se já estava fatigado, fica exausto).',
    stats: [{ label: 'Teste', valor: 'Fortitude (CD 15 +1 por teste anterior), por dia' }, { label: 'Falha', valor: 'Fatigado (ou exausto, se já fatigado)' }],
    pagina: 268,
  },
  {
    id: 'paredao', nome: 'Paredão', terreno: 'montanhas',
    efeito: 'Um penhasco vertical e muito alto, normalmente com 2d6 x 3m de altura. Escalar um paredão exige um teste de Atletismo.',
    stats: [{ label: 'Altura típica', valor: '2d6 x 3m' }, { label: 'Escalar', valor: 'Atletismo CD 25' }],
    pagina: 268,
  },
  {
    id: 'seixos', nome: 'Seixos', terreno: 'montanhas',
    efeito: 'Em montanhas, inclinações íngremes às vezes são cobertas de pedrinhas. Nesse caso, a CD do teste para descer a inclinação numa corrida ou investida aumenta.',
    stats: [{ label: 'Descer correndo/investida', valor: 'Acrobacia/Cavalgar CD 15 (em vez de 10)' }],
    pagina: 268,
  },
  {
    id: 'lodacal', nome: 'Lodaçal', terreno: 'pantanos',
    efeito: 'Poças com uma mistura de água e lama que atrapalha os movimentos. Um lodaçal conta como terreno difícil e impõe a condição vulnerável a qualquer personagem dentro dele.',
    stats: [{ label: 'Terreno', valor: 'Difícil' }, { label: 'Condição', valor: 'Vulnerável, dentro dele' }],
    pagina: 268,
  },
  {
    id: 'trincheira', nome: 'Trincheira', terreno: 'planicies',
    efeito: 'Uma vala escavada no solo para proteger soldados. Um personagem em uma trincheira recebe cobertura leve contra ataques à distância. Sair de uma trincheira conta como terreno difícil. Essa regra pode ser usada para valas, leitos de rio secos e acidentes geográficos similares.',
    stats: [{ label: 'Cobertura', valor: 'Leve, contra ataques à distância' }, { label: 'Sair', valor: 'Terreno difícil' }],
    pagina: 268,
  },
  {
    id: 'gelo', nome: 'Gelo', terreno: 'artico',
    efeito: 'Você pode andar no gelo à metade do seu deslocamento sem testes. Porém, andar em seu deslocamento normal, correr, fazer uma investida ou sofrer dano sobre o gelo exige um teste de Acrobacia. Em caso de falha, você cai e desliza 1d4 x 1,5m (para a frente, no caso de movimento, ou na direção do ataque, no caso de dano sofrido).',
    stats: [{ label: 'Metade do deslocamento', valor: 'Sem teste' }, { label: 'Normal/correr/investida/dano sofrido', valor: 'Acrobacia CD 15 (ou igual ao dano sofrido)' }, { label: 'Falha', valor: 'Cai, desliza 1d4x1,5m' }],
    pagina: 269,
  },
  {
    id: 'rio-congelado', nome: 'Rio Congelado', terreno: 'artico',
    efeito: 'Andar sobre um rio congelado é como andar sobre gelo. Se você cair e rolar 1 no d4 para determinar quanto desliza, o gelo quebra e você afunda, sofrendo dano de frio por rodada e precisando nadar. Sair exige estar debaixo de um buraco no gelo e gastar uma ação de movimento para se erguer. Abrir um buraco exige causar dano suficiente de impacto ou fogo.',
    stats: [{ label: 'Regras', valor: 'Como Gelo' }, { label: 'Se rolar "1" no d4 ao deslizar', valor: 'Gelo quebra, afunda' }, { label: 'Afundado', valor: '1d6 de dano de frio/rodada, precisa nadar' }, { label: 'Abrir buraco', valor: '10 de dano de impacto ou fogo' }],
    pagina: 269,
  },
  {
    id: 'agua-corrente', nome: 'Água Corrente', terreno: 'aquatico',
    efeito: 'Rios e mar agitado. A velocidade típica de uma correnteza é 1d6 x 3m por rodada. No fim de cada rodada, todos os personagens na água são arrastados nessa velocidade na direção da correnteza. Sair de uma correnteza com velocidade de 15m ou mais exige chegar até a margem ou ponto de apoio, gastar uma ação de movimento e passar num teste de Atletismo para agarrar alguma coisa.',
    stats: [{ label: 'Velocidade típica', valor: '1d6 x 3m/rodada' }, { label: 'Nadar (até 9m/rodada)', valor: 'Atletismo CD 15' }, { label: 'Nadar (mais rápido)', valor: 'Atletismo CD 20' }, { label: 'Agarrar apoio (15m+/rodada)', valor: 'Atletismo CD 20' }],
    pagina: 269,
  },
  {
    id: 'agua-parada', nome: 'Água Parada', terreno: 'aquatico',
    efeito: 'Lagos e mar calmo. Exige testes de Atletismo para nadar, conforme a descrição da perícia, mas não possui nenhum outro modificador.',
    stats: null,
    pagina: 269,
  },
  {
    id: 'personagens-submersos', nome: 'Personagens Submersos', terreno: 'aquatico',
    efeito: 'Criaturas debaixo d’água não podem falar (e, portanto, lançar magias) e sofrem penalidade em testes de ataque e de Percepção. Só podem se deslocar fazendo testes de Atletismo para nadar (exceto com deslocamento de natação). Armas de ataque à distância não podem ser usadas (exceto arremesso de perfuração, bestas e redes) e armas de corte e impacto que não sejam naturais causam metade do dano. Criaturas submersas recebem camuflagem e cobertura leves contra personagens fora d’água.',
    stats: [{ label: 'Ataque', valor: '–2' }, { label: 'Percepção', valor: '–5' }, { label: 'Armas corte/impacto', valor: 'Metade do dano' }, { label: 'Camuflagem/Cobertura', valor: 'Leves, contra quem está fora d’água' }],
    pagina: 269,
  },
];

window.AMBIENTE_MASMORRA_ELEMENTO = [
  {
    id: 'piso-irregular', nome: 'Piso Irregular', tipo: 'piso',
    efeito: 'Cavernas naturais, construções em ruínas... Exigem testes de Acrobacia para correr ou fazer uma investida. Um piso que seja irregular e escorregadio (água, gelo, sangue) aumenta a CD do teste para 15.',
    stats: [{ label: 'Correr/investida', valor: 'Acrobacia CD 10' }, { label: 'Irregular + escorregadio', valor: 'Acrobacia CD 15' }],
    pagina: 264,
  },
  {
    id: 'piso-escorregadio', nome: 'Piso Escorregadio', tipo: 'piso',
    efeito: 'Seja por água, gelo ou mesmo sangue, exige o uso de Acrobacia para se equilibrar.',
    stats: [{ label: 'Se equilibrar', valor: 'Acrobacia' }],
    pagina: 264,
  },
  {
    id: 'parede-alvenaria', nome: 'Parede de Alvenaria', tipo: 'parede',
    efeito: 'Por trecho de 1,5m de lado.',
    stats: [{ label: 'RD', valor: '8' }, { label: 'PV', valor: '200' }, { label: 'Escalar', valor: 'Atletismo CD 20' }],
    pagina: 265,
  },
  {
    id: 'parede-pedra-bruta', nome: 'Parede de Pedra Bruta', tipo: 'parede',
    efeito: 'Escavada ou natural.',
    stats: [{ label: 'RD', valor: '8' }, { label: 'PV', valor: '500' }, { label: 'Escalar', valor: 'Atletismo CD 15' }],
    pagina: 265,
  },
  {
    id: 'parede-madeira', nome: 'Parede de Madeira', tipo: 'parede',
    efeito: null,
    stats: [{ label: 'RD', valor: '5' }, { label: 'PV', valor: '100' }, { label: 'Escalar', valor: 'Atletismo CD 20' }],
    pagina: 265,
  },
  {
    id: 'porta-madeira', nome: 'Porta de Madeira', tipo: 'porta',
    efeito: 'Usada em casas comuns. Arrombar exige uma ação padrão e um teste de Força; falhar por 5 ou mais causa 1d6 pontos de dano de impacto.',
    stats: [{ label: 'RD', valor: '5' }, { label: 'PV', valor: '20' }, { label: 'Arrombar (Força)', valor: 'CD 15' }],
    pagina: 265,
  },
  {
    id: 'porta-madeira-reforcada', nome: 'Porta de Madeira Reforçada', tipo: 'porta',
    efeito: 'Encontrada em mansões, armazéns e outras construções protegidas.',
    stats: [{ label: 'RD', valor: '5' }, { label: 'PV', valor: '30' }, { label: 'Arrombar (Força)', valor: 'CD 20' }],
    pagina: 265,
  },
  {
    id: 'porta-pedra', nome: 'Porta de Pedra', tipo: 'porta',
    efeito: 'Usada em templos e torres.',
    stats: [{ label: 'RD', valor: '8' }, { label: 'PV', valor: '100' }, { label: 'Arrombar (Força)', valor: 'CD 25' }],
    pagina: 265,
  },
  {
    id: 'porta-ferro', nome: 'Porta de Ferro', tipo: 'porta',
    efeito: 'Usada em salas de tesouro.',
    stats: [{ label: 'RD', valor: '10' }, { label: 'PV', valor: '100' }, { label: 'Arrombar (Força)', valor: 'CD 25' }],
    pagina: 265,
  },
  {
    id: 'porta-grade', nome: 'Grade de Ferro', tipo: 'porta',
    efeito: 'Fecham muitos ambientes, especialmente castelos, calabouços e esgotos.',
    stats: [{ label: 'RD', valor: '10' }, { label: 'PV', valor: '60' }, { label: 'Arrombar (Força)', valor: 'CD 20' }],
    pagina: 265,
  },
  {
    id: 'porta-secreta', nome: 'Porta Secreta', tipo: 'porta',
    efeito: 'Encontrar uma porta secreta exige um teste de Investigação: CD 20 para portas escondidas atrás de estantes ou tapeçarias, CD 30 para portas feitas para se mesclar perfeitamente às paredes.',
    stats: [{ label: 'Encontrar (atrás de móvel/tapeçaria)', valor: 'Investigação CD 20' }, { label: 'Encontrar (mesclada à parede)', valor: 'Investigação CD 30' }],
    pagina: 265,
  },
  {
    id: 'escadaria', nome: 'Escadaria', tipo: 'outro',
    efeito: 'Subir uma escadaria conta como terreno difícil. Descer uma escadaria correndo ou fazendo uma investida exige um teste de Acrobacia. Em caso de falha, você cai no chão, rola 1d4 x 1,5m para frente (ou até o fim da escada) e sofre 1d6 pontos de dano de impacto por 1,5m rolados.',
    stats: [{ label: 'Subir', valor: 'Terreno difícil' }, { label: 'Descer correndo/investida', valor: 'Acrobacia CD 10' }, { label: 'Falha', valor: 'Cai, rola 1d4x1,5m, 1d6 dano/1,5m' }],
    pagina: 265,
  },
  {
    id: 'pilar-estreito', nome: 'Pilar Estreito', tipo: 'pilar',
    efeito: 'Menos de 1,5m de largura. Um personagem pode ficar no mesmo espaço de um pilar estreito e receber cobertura leve por isso. Estalagmites e estátuas contam como pilares estreitos ou largos, de acordo com seu tamanho.',
    stats: [{ label: 'RD', valor: '8' }, { label: 'PV', valor: '100' }, { label: 'Cobertura', valor: 'Leve, no mesmo espaço' }],
    pagina: 265,
  },
  {
    id: 'pilar-largo', nome: 'Pilar Largo', tipo: 'pilar',
    efeito: 'Mais de 1,5m de largura. Um personagem não pode ficar no mesmo espaço de um pilar largo, mas pode ficar atrás dele para ganhar cobertura leve.',
    stats: [{ label: 'RD', valor: '8' }, { label: 'PV', valor: '500' }, { label: 'Cobertura', valor: 'Leve, atrás dele' }],
    pagina: 265,
  },
  {
    id: 'tapecaria', nome: 'Tapeçaria', tipo: 'outro',
    efeito: 'Elemento comum de muitas masmorras (especialmente templos e castelos antigos), pode ser útil como esconderijo ou meio de alcançar um ponto mais alto. Um personagem atrás de uma tapeçaria possui camuflagem leve. Com 1,5m de largura (supondo que seja resistente o bastante para sustentar o peso do personagem).',
    stats: [{ label: 'RD', valor: '0' }, { label: 'PV', valor: '10' }, { label: 'Escalar', valor: 'Atletismo CD 15' }, { label: 'Camuflagem', valor: 'Leve, atrás dela' }],
    pagina: 265,
  },
  {
    id: 'altar', nome: 'Altar', tipo: 'outro',
    efeito: 'Normalmente, blocos de pedra retangulares que são o centro de um templo. Fornece cobertura a qualquer criatura atrás dele, embora altares maiores, menores e de outros materiais existam. Um altar também pode emanar uma aura mágica, especialmente as magias Consagrar e Profanar.',
    stats: [{ label: 'Tamanho comum', valor: '1,5m x 3m' }, { label: 'RD', valor: '8' }, { label: 'PV', valor: '200' }, { label: 'Cobertura', valor: 'Leve, atrás dele' }],
    pagina: 265,
  },
];

// Tabela 6-2: Ideias de Masmorras (livro, p. 263) — usada pela ferramenta
// "Sortear Ideia de Masmorra".
window.AMBIENTE_MASMORRA_IDEIAS = [
  { numero: 1, ideia: 'Complexo de cavernas subterrâneas' },
  { numero: 2, ideia: 'Mina abandonada' },
  { numero: 3, ideia: 'Templo de um deus maligno' },
  { numero: 4, ideia: 'Esgotos da cidade' },
  { numero: 5, ideia: 'Castelo de um déspota' },
  { numero: 6, ideia: 'Torre de um mago louco' },
  { numero: 7, ideia: 'Moinho da vila' },
  { numero: 8, ideia: 'Armazém no porto' },
  { numero: 9, ideia: 'Ruínas de uma civilização perdida' },
  { numero: 10, ideia: 'Fortaleza anã abandonada' },
  { numero: 11, ideia: 'Mansão assombrada' },
  { numero: 12, ideia: 'Prisão da cidade' },
  { numero: 13, ideia: 'Caverna submersa' },
  { numero: 14, ideia: 'Gruta usada como covil por um monstro' },
  { numero: 15, ideia: 'Biblioteca mágica' },
  { numero: 16, ideia: 'Galeão encalhado' },
  { numero: 17, ideia: 'Labirinto feito para proteger um tesouro' },
  { numero: 18, ideia: 'Manicômio repleto de vilões insanos' },
  { numero: 19, ideia: 'Vulcão inativo' },
  { numero: 20, ideia: 'Castelo nas nuvens' },
];

window.AMBIENTE_ERMO_ELEMENTO = [
  {
    id: 'covil', nome: 'Covil', efeito: 'Da gruta de um urso-coruja ao fosso de um escorpião gigante, os ermos estão repletos de lares de monstros. Um covil pode ser avistado com testes de Percepção ou Sobrevivência, e esta última perícia pode ser usada para identificar o habitante do lugar. Normalmente um monstro estará em seu covil, mas há 25% de chance de ele estar fora — e qualquer tesouro que ele possua estar desprotegido.',
    stats: [{ label: 'Identificar habitante (Sobrevivência)', valor: 'CD 15 + ND da criatura' }, { label: 'Chance do monstro estar fora', valor: '25%' }],
    subtabela: null,
    pagina: 269,
  },
  {
    id: 'ruina', nome: 'Ruína', efeito: 'Os ermos são repletos dos resquícios de eras passadas. Um personagem que entre em uma ruína deve rolar 1d6 para determinar o que encontra. As ameaças e os tesouros são apropriados para o nível do grupo. Essa mecânica serve para lugares pequenos — ruínas grandes são masmorras por si só!',
    stats: null,
    subtabela: [
      { faixa: '1-2', resultado: 'Apenas uma ameaça (normalmente armadilha ou monstro, a critério do mestre)' },
      { faixa: '3-4', resultado: 'Vazia' },
      { faixa: '5', resultado: 'Uma ameaça e um tesouro' },
      { faixa: '6', resultado: 'Apenas um tesouro' },
    ],
    pagina: 269,
  },
  {
    id: 'santuario', nome: 'Santuário', efeito: 'Mesmo em regiões inóspitas é possível encontrar lugares consagrados aos deuses — uma estátua de Khalmyr, um círculo de flores para Allihanna, uma pedra manchada de sangue para Megalokk... Tocar um santuário de seu deus patrono fornece o efeito de uma magia (normalmente Bênção, Curar Ferimentos, Físico Divino ou Vestimenta da Fé), mas apenas uma vez por dia. Porém, se o santuário for de um deus inimigo, você é amaldiçoado (veja Rogar Maldição) até o final do dia.',
    stats: [{ label: 'Identificar o deus (Religião)', valor: 'CD 20' }, { label: 'Tocar (deus patrono)', valor: 'Efeito de magia, 1x/dia' }, { label: 'Tocar (deus inimigo)', valor: 'Amaldiçoado até o fim do dia' }],
    subtabela: null,
    pagina: 269,
  },
];

window.AMBIENTE_URBANO_ASSENTAMENTO = [
  {
    id: 'aldeia', nome: 'Aldeia',
    populacao: 'Até 1.000 habitantes.',
    governo: 'Em aldeias afastadas, nenhum — decisões são tomadas por um "sábio", um ancião respeitado. Aldeias na área de influência de um nobre são governadas por um magistrado apontado por ele.',
    guarda: 'Nenhuma formal. Em caso de ataque, 2d10 camponeses podem pegar ancinhos, foices e outras ferramentas (armas simples). Se a aldeia tiver um magistrado, ele terá uma pequena força de defesa (1d4+1 guardas).',
    justica: 'Nenhuma formal. A comunidade se baseia em senso comum ou dogmas religiosos. Um criminoso será julgado pelo sábio ou magistrado (autoridade absoluta) — ou expulso por uma turba enfurecida.',
    economia: 'Um único armazém (quando não depende de mercadores ambulantes). Apenas itens de até T$ 50 disponíveis, em quantidades limitadas (1d6 exemplares). 1d4 x T$ 100 em dinheiro disponível.',
    pagina: 271,
  },
  {
    id: 'vila', nome: 'Vila',
    populacao: 'Até 5.000 habitantes.',
    governo: 'Um burgomestre (equivalente a um prefeito) eleito pelos habitantes ou apontado por um nobre local. Há um salão comunal, com uma estrutura simples (alguns servos, um clérigo, talvez um arcanista).',
    guarda: 'Milícia formada por 10d10 guardas comandados por um sargento. O burgomestre pode ter alguns guarda-costas de mais alto nível.',
    justica: 'Leis simples, impostas pela milícia. Crimes pequenos são resolvidos pelo sargento (multas, trabalho forçado, pelourinho); crimes maiores são julgados pelo nobre local (testes opostos de Diplomacia entre acusador e réu; Intuição para detectar mentira).',
    economia: 'Um mercado com lojas e oficinas. Itens de até T$ 1.000 disponíveis; itens raros existem em quantidade limitada (2d6 exemplares) ou não existem. 1d6 x T$ 1.000 em dinheiro disponível.',
    pagina: 271,
  },
  {
    id: 'cidade', nome: 'Cidade',
    populacao: 'Até 25.000 habitantes.',
    governo: 'Um lorde prefeito apontado pelo regente do reino, assessorado por um conselho eleito de cidadãos "respeitáveis". Estrutura formal de governo; o lorde prefeito dificilmente estará disponível para qualquer um.',
    guarda: 'Força com centenas de soldados e oficiais, liderada por um capitão (normalmente um cavaleiro ou guerreiro de pelo menos 8º nível). Cidades são quase sempre muradas. Em ataque, clérigos de templos locais e aventureiros residentes podem ajudar.',
    justica: 'Leis complexas, detalhadas em documentos oficiais. Julgamentos são processos formais, com juízes (normalmente clérigos de Khalmyr), advogados e promotores públicos — pode ser uma aventura em si, com teste estendido e busca por provas e testemunhas.',
    economia: 'Praticamente qualquer item ou serviço mundano estará disponível. Itens acima de T$ 10.000 podem não estar disponíveis. 2d4 x T$ 10.000 em dinheiro disponível.',
    pagina: 272,
  },
  {
    id: 'metropole', nome: 'Metrópole',
    populacao: 'Normalmente, por volta de 100 mil habitantes, embora as maiores metrópoles de Arton — Valkaria e Tiberus — tenham mais de um milhão de habitantes cada. Cada reino tem no máximo uma (sua capital).',
    governo: 'O próprio regente do reino, embora a administração cotidiana seja delegada a incontáveis oficiais e conselheiros — um verdadeiro labirinto burocrático.',
    guarda: 'Um exército com soldados, oficiais, clérigos, arcanistas de batalha, construtos, monstros domados e basicamente tudo que o mestre quiser. Também habitada por dezenas de aventureiros que reagem a um ataque.',
    justica: 'Como em cidades, com a diferença de que há diversos tribunais, guildas de juristas oferecendo seus serviços e, em casos maiores, todo tipo de jogo sujo e corrupção.',
    economia: 'Uma infinidade de oficinas locais, além de caravanas e navios mercantes do mundo inteiro, incluindo mercado clandestino e leilões exclusivos de itens mágicos. Dinheiro disponível virtualmente ilimitado.',
    pagina: 273,
  },
];

window.AMBIENTE_URBANO_ELEMENTO = [
  {
    id: 'ruas', nome: 'Ruas', efeito: 'Vilas e cidades possuem ruas estreitas, entre 3m e 6m de largura, e becos mais estreitos ainda, com 1,5m ou 3m de largura. Cidades grandes e metrópoles também possuem avenidas com até 9m de largura. Ruas normalmente são de terra batida (vira lamaçal na chuva, exigindo testes de Acrobacia para corridas ou investidas) ou, mais raramente, paralelepípedos.',
    stats: [{ label: 'Ruas', valor: '3-6m de largura' }, { label: 'Becos', valor: '1,5-3m de largura' }, { label: 'Avenidas', valor: 'Até 9m (cidades grandes/metrópoles)' }],
    pagina: 275,
  },
  {
    id: 'construcoes', nome: 'Construções', efeito: 'Em vilas e cidades, a maior parte das construções possui dois ou três pavimentos. O primeiro, de alvenaria, é usado para lojas e oficinas; os restantes, de madeira, para residência. As construções são geminadas, formando longas filas separadas por becos. Bairros pobres possuem casebres de um andar, enquanto zonas exclusivas das maiores cidades possuem mansões protegidas por muros e jardins internos.',
    stats: null,
    pagina: 275,
  },
  {
    id: 'muros-e-portoes', nome: 'Muros e Portões', efeito: 'Muros de uma cidade normalmente possuem entre 6m e 9m de altura, enquanto os de uma metrópole podem atingir até 18m. Muros possuem ameias que fornecem cobertura leve a quem estiver no topo. O portão típico de uma cidade é feito de madeira, mas as maiores comunidades possuem portões de ferro.',
    stats: [{ label: 'Altura (cidade)', valor: '6-9m' }, { label: 'Altura (metrópole)', valor: 'Até 18m' }, { label: 'Escalar', valor: 'Atletismo CD 25' }, { label: 'Portão de madeira', valor: 'RD 5, PV 60' }, { label: 'Portão de ferro', valor: 'RD 10, PV 300' }],
    pagina: 275,
  },
  {
    id: 'telhados', nome: 'Telhados', efeito: 'Subir em um telhado exige escalar a lateral de uma construção. Andar sobre um telhado exige um teste de Acrobacia por ação de movimento; correr sobre um telhado aumenta a CD em +5. Quando um telhado termina, o personagem deve pular para o próximo (normalmente Atletismo, mas a CD pode variar com a largura da rua).',
    stats: [{ label: 'Subir', valor: 'Atletismo/Escalar CD 20' }, { label: 'Andar (por ação de movimento)', valor: 'Acrobacia CD 10' }, { label: 'Correr', valor: '+5 na CD' }, { label: 'Pular para o próximo telhado', valor: 'Atletismo CD 20 (varia)' }],
    pagina: 275,
  },
  {
    id: 'esgotos', nome: 'Esgotos', efeito: 'Apenas metrópoles possuem sistemas de esgotos. Entrar num esgoto exige abrir um bueiro (ação completa) e descer uma escada (ação de movimento) ou saltar (ação livre).',
    stats: [{ label: 'Saltar direto', valor: 'Atletismo CD 15, falha = 1d6 de dano de impacto' }],
    pagina: 275,
  },
  {
    id: 'multidoes', nome: 'Multidões', efeito: 'As ruas das maiores cidades muitas vezes estão lotadas de pessoas. Um espaço ocupado por uma multidão conta como terreno difícil e fornece cobertura leve a qualquer um dentro dele. Uma multidão que veja algo perigoso foge na direção oposta. É possível direcionar uma multidão.',
    stats: [{ label: 'Terreno', valor: 'Difícil' }, { label: 'Cobertura', valor: 'Leve, dentro dela' }, { label: 'Foge (ao ver perigo)', valor: 'Deslocamento 9m, fim de cada rodada' }, { label: 'Direcionar (Diplomacia)', valor: 'CD 15, ação completa' }, { label: 'Direcionar (Intimidação)', valor: 'CD 20, ação livre' }],
    pagina: 275,
  },
];

// Tabela 6-4: Viagens (livro, p. 270) — velocidade de viagem de acordo com
// o deslocamento do membro mais lento do grupo, em terreno aberto e clima
// bom (fórmula do próprio livro: km/hora = deslocamento em metros x 0,5;
// km/dia = km/hora x 8).
window.AMBIENTE_VIAGEM_TABELA = [
  { deslocamentoM: 4.5, porHoraKm: 2.25, porDiaKm: 18 },
  { deslocamentoM: 6, porHoraKm: 3, porDiaKm: 24 },
  { deslocamentoM: 7.5, porHoraKm: 3.75, porDiaKm: 30 },
  { deslocamentoM: 9, porHoraKm: 4.5, porDiaKm: 36 },
  { deslocamentoM: 12, porHoraKm: 6, porDiaKm: 48 },
];

window.AMBIENTE_VIAGEM_REGRAS = [
  { titulo: 'Terreno e Clima', texto: 'As distâncias na tabela consideram terreno aberto e clima bom. Em terreno difícil (florestas, pântanos...) ou clima ruim (chuva, neblina...) diminua a distância pela metade. Essas reduções são cumulativas. De acordo com o mestre, testes de Sobrevivência podem anular essas reduções.' },
  { titulo: 'Marcha Forçada', texto: 'As distâncias na tabela consideram um ritmo normal de caminhada, mas é possível avançar mais rápido. Nesse caso, a distância por hora dobra, mas a cada hora o personagem deve passar em um teste de Fortitude (CD 15 +1 por teste anterior) ou perde 1d6 pontos de vida.' },
  { titulo: 'Perdendo-se', texto: 'Se o grupo não está seguindo uma estrada ou marco, o guia deve passar em um teste de Sobrevivência por dia, ou ficará perdido. Um grupo perdido viaja em uma direção aleatória. Uma vez por dia, cada personagem pode fazer um teste de Sobrevivência (CD 20 –1 por dia de viagem aleatória) para perceber que está no caminho errado e determinar um novo caminho.' },
  { titulo: 'Suprimentos', texto: 'Controle suprimentos apenas se isso for importante para a aventura. Testes de Sobrevivência para encontrar suprimentos, e de Fortitude para resistir à fome e à sede, podem tornar uma viagem tão emocionante quanto um combate.' },
];

// Tabela 6-5: Eventos de Perseguições (livro, p. 274) — usada pela
// ferramenta "Rolar Evento de Perseguição". Regras completas de como
// conduzir uma perseguição (distância inicial, testes de Atletismo por
// rodada, limite de rodadas correndo) ficam como texto estático na página,
// por não se tratarem de itens individuais de tabela.
window.AMBIENTE_PERSEGUICAO_EVENTOS = [
  { faixaMin: 1, faixaMax: 6, evento: 'Nenhum', teste: null, exemplo: null },
  { faixaMin: 7, faixaMax: 8, evento: 'Obstáculo', teste: 'Força CD 15', exemplo: 'Pilha de caixotes bloqueia o caminho.' },
  { faixaMin: 9, faixaMax: 10, evento: 'Obstáculo', teste: 'Acrobacia CD 20', exemplo: 'Frutas caídas deixam o piso escorregadio.' },
  { faixaMin: 11, faixaMax: 12, evento: 'Obstáculo', teste: 'Reflexos CD 20', exemplo: 'Barris rolam pela rua.' },
  { faixaMin: 13, faixaMax: 14, evento: 'Obstáculo', teste: 'Intimidação CD 20', exemplo: 'Multidão impede a passagem.' },
  { faixaMin: 15, faixaMax: 16, evento: 'Atalho', teste: 'Adestramento CD 20', exemplo: 'Carroça na qual se pode tentar subir.' },
  { faixaMin: 17, faixaMax: 18, evento: 'Atalho', teste: 'Força CD 15', exemplo: 'Caminho mais curto, mas bloqueado.' },
  { faixaMin: 19, faixaMax: 20, evento: 'Atalho', teste: 'Percepção CD 20', exemplo: 'Ruelas labirínticas, nas quais se pode cortar caminho ou se perder.' },
];
