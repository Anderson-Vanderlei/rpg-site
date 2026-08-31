// ============================================================================
// PERIGOS — Compêndio Tormenta 20
// Fonte: Tormenta20 - Edição Jogo do Ano, Capítulo 7 "Ameaças", seção
// "Perigos" e "Perigos Complexos" (livro p. 317 a 321).
//
// window.PERIGOS_SIMPLES — array de perigos "simples" (uma cena, um teste
// ou uma exposição contínua), dividido em três categorias:
//   - 'ambiental': regras gerais sem ND individual (Ácido, Fogo, Queda...).
//   - 'armadilha': as 23 armadilhas de exemplo do livro, cada uma com ND
//     próprio, igual a uma criatura.
//   - 'doenca': as 8 doenças de exemplo, com transmissão, CD e uma
//     progressão de efeitos (piora a cada falha consecutiva no teste).
// Alguns 'ambiental' também têm progressão (campo progressao preenchido),
// quando o próprio texto do livro descreve uma cadeia explícita de piora
// a cada falha (ex: Areia Movediça, Fome e Sede, Sono, Tormenta) — extraída
// literalmente do texto de descricao, nunca inventada.
// Schema por item:
//   { id, nome, categoria, nd (string|null), ndValor (number|null),
//     dano (string|null), resistencia (string|null),
//     investigacaoCD (number|null), ladinagemCD (number|null),
//     transmissao (string|null), cd (number|null),
//     progressao (string[]|null), descricao (string), pagina }
// Observação: a extração em texto plano do PDF não preserva itálico, então
// não foi possível identificar com certeza quais armadilhas são "mágicas"
// (nome em itálico no livro) — esse campo foi deixado de fora desta leva
// para não inventar essa informação; pode ser conferido contra o livro
// físico depois.
//
// window.PERIGOS_COMPLEXOS — array com os 4 exemplos de perigos complexos
// do livro (cenas de ação fora de combate, baseadas em testes estendidos).
// Schema por item:
//   { id, nome, nd, ndValor, objetivo, efeito, notas (string|null),
//     contadorNota (string|null) — o texto do próprio livro que explica o
//       que os números de sucessos/falhas significam nesse perigo (usado
//       ao lado do contador de sucessos/falhas na interface, sem nenhuma
//       lógica de "quem venceu" calculada por código — só a citação do
//       livro para o mestre interpretar durante a mesa),
//     acoes: [{ nome, pericia (string|null), cd (number|string|null), texto }],
//     pagina }
// ============================================================================

window.PERIGOS_SIMPLES = [
  // ── Ambientais ────────────────────────────────────────────────────────
  {
    id: 'acido', nome: 'Ácido', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Ácidos corrosivos causam 1d6 pontos de dano por rodada de exposição. Imersão total (por exemplo, cair dentro de um poço de ácido) causa 10d6 pontos de dano por rodada e o dano persiste por uma rodada adicional. Por exemplo, se um personagem fica duas rodadas no ácido e depois sai, sofre um total de 30d6 pontos de dano.',
    pagina: 317,
  },
  {
    id: 'areia-movedica', nome: 'Areia Movediça', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null,
    progressao: ['fatigada', 'exausta', 'inconsciente'],
    descricao: 'Presente em pântanos e desertos, pode engolir criaturas ou objetos para dentro de si. Em geral, areia movediça ocupa um quadrado com 6m de lado. Um personagem deve passar em um teste de Sobrevivência (CD 25) para notar areia movediça à frente. Se entrar na área da areia, fica agarrado. Se passar uma rodada inteira agarrado, submerge e precisa prender a respiração (veja Sufocamento). Uma criatura na areia movediça pode gastar uma ação completa e fazer um teste de Atletismo (CD 25) para escapar. Se estava submersa, fica agarrada. Se estava agarrada, fica livre na margem da areia. Porém, se falhar por 5 ou mais, fica fatigada (se já estava fatigada, fica exausta e, se já estava exausta, fica inconsciente, provavelmente morrendo...). Personagens fora da área de areia movediça podem ajudar no teste de Atletismo (alcançando um galho, vara ou corda para a vítima, por exemplo).',
    pagina: 317,
  },
  {
    id: 'clima-calor-frio', nome: 'Clima, Calor e Frio', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'O livro remete às regras completas de clima, calor e frio na página 267 (veja a seção Ambiente > Clima do compêndio, com todos os efeitos de clima do livro).',
    pagina: 318,
  },
  {
    id: 'escuridao', nome: 'Escuridão', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Escuridão é dividida em leve e total. Escuridão Leve: qualquer situação de penumbra, como uma noite enluarada ou os cantos da cidade ao longe dos postes com seus lampiões — fornece camuflagem leve. Escuridão Total: o breu da noite sem estrelas ou luar, longe de qualquer fonte de luz, ou uma câmara totalmente fechada ou nos subterrâneos, longe da entrada — fornece camuflagem total.',
    pagina: 318,
  },
  {
    id: 'fogo', nome: 'Fogo', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: 'Reflexos CD 15 evita',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Um personagem exposto a fogo deve fazer um teste de Reflexos (CD 15). Se falhar, fica em chamas, sofrendo 1d6 pontos de dano de fogo no início de seus turnos. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas. Fogo provocado por efeitos instantâneos, como nas magias Explosão de Chamas e Bola de Fogo, não dura o suficiente para incendiar alguém.',
    pagina: 319,
  },
  {
    id: 'fome-e-sede', nome: 'Fome e Sede', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: 'Fortitude CD 15 (+1 por teste anterior)',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null,
    progressao: ['fatigado', 'exausto', 'inconsciente', 'letal'],
    descricao: 'Um personagem pode resistir um dia inteiro sem água ou comida sem maiores problemas. Depois disso, deve fazer um teste de Fortitude por dia (CD 15 +1 por teste anterior). Se falhar, fica fatigado. Se falhar novamente, fica exausto. Se falhar pela terceira vez, fica inconsciente. A quarta falha é letal. Condições causadas por fome e sede só podem ser curadas por comida e bebida.',
    pagina: 319,
  },
  {
    id: 'fumaca', nome: 'Fumaça', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: 'Fortitude CD 10 (+1 por teste anterior)',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Um personagem imerso em fumaça densa (por exemplo, dentro de uma casa em chamas) deve fazer um teste de Fortitude no início de cada um de seus turnos (CD 10 +1 por teste anterior). Se falhar, perde o turno engasgando-se e tossindo, sem conseguir realizar nenhuma outra ação. Falhar em dois testes seguidos causa a perda de 1d6 pontos de vida. Fumaça também obscurece a visão, fornecendo camuflagem leve às criaturas em seu interior.',
    pagina: 319,
  },
  {
    id: 'lava', nome: 'Lava', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Lava, magma e outros materiais incandescentes (como metal derretido) causam 2d6 pontos de dano de fogo por rodada de exposição direta. Imersão total (por exemplo, cair na cratera de um vulcão) causa 20d6 pontos de dano de fogo por rodada e o dano persiste por uma rodada adicional. Por exemplo, se um personagem fica duas rodadas na lava e depois sai, sofre um total de 60d6 pontos de dano de fogo.',
    pagina: 319,
  },
  {
    id: 'queda', nome: 'Queda', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: null,
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Uma queda causa 1d6 pontos de dano de impacto para cada 1,5m, até um máximo de 40d6 para uma queda de 60m. Em caso de queda na água, reduza o dano em 6m (ou seja, –4d6). Um objeto pesado (pedra, baú, barril...) que caia sobre uma criatura também causa 1d6 pontos de dano para cada 1,5m da queda. Dobre o dano para um objeto muito pesado (rocha, altar, carroça...).',
    pagina: 319,
  },
  {
    id: 'sono', nome: 'Sono', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: 'Fortitude CD 15 (+1 por teste anterior)',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null,
    progressao: ['fatigado', 'exausto', 'inconsciente'],
    descricao: 'Um personagem pode ficar uma noite sem dormir sem problemas — embora não recupere PV e PM. Depois disso, deve fazer um teste de Fortitude por dia sem dormir (CD 15 +1 por teste anterior). Se falhar, fica fatigado. Se já estiver fatigado, fica exausto. Se já estiver exausto, cai inconsciente e não pode ser acordado até dormir pelo menos oito horas.',
    pagina: 319,
  },
  {
    id: 'sufocamento', nome: 'Sufocamento', categoria: 'ambiental',
    nd: null, ndValor: null, dano: null, resistencia: 'Fortitude CD 15 (+1 por teste anterior)',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null, progressao: null,
    descricao: 'Um personagem pode prender a respiração por um número de rodadas igual a 1 + sua Constituição (por exemplo, 3 rodadas se tem Con 2). Depois disso, deve fazer um teste de Fortitude por rodada (CD 15 +1 por teste anterior). Se falhar, cai inconsciente e perde 1d6 PV por rodada até respirar novamente ou morrer.',
    pagina: 319,
  },
  {
    id: 'tormenta-perigo', nome: 'Tormenta', categoria: 'ambiental',
    // semAutoLink (30/ago): "Tormenta" é também o nome do PRÓPRIO cenário/
    // fenômeno histórico citado o tempo todo em texto de lore (Deuses,
    // Raças, Origens...) sem ligação nenhuma com este perigo específico —
    // ex: "Aharadak... Antigo Lorde da Tormenta" virava link pra este
    // perigo de área, o que é errado na maioria das vezes que a
    // palavra aparece. Com essa flag, o Passo 11 de keywords.js (auto-link
    // de nomes de Perigo) pula esta entrada — ela continua 100% acessível
    // normalmente pela página de Perigos, só não vira link automático
    // sempre que a palavra "Tormenta" aparecer em qualquer descrição do
    // site. Mesmo mecanismo vale pra qualquer nome futuro (de suplemento)
    // que também seja uma palavra comum do cenário — ver CLAUDE.md §9.1.
    semAutoLink: true,
    nd: null, ndValor: null, dano: null, resistencia: 'Vontade CD 25 (+2 por dia anterior consecutivo)',
    investigacaoCD: null, ladinagemCD: null, transmissao: null, cd: null,
    progressao: ['frustrada', 'esmorecida', 'confusa', 'insana'],
    descricao: 'Ao entrar em uma área de Tormenta, uma criatura fica automaticamente frustrada, à medida que sua mente luta contra a insanidade. No início de cada dia na área, a criatura deve fazer um teste de Vontade (CD 25 + 2 por dia anterior consecutivo) ou ficará esmorecida pelo dia. Se já estava esmorecida, fica confusa pelo dia. Se já estava confusa, fica completamente insana — se era um personagem, se torna um NPC maligno sob controle do mestre. Além disso, enquanto estiver na área de Tormenta, habilidades com custo em pontos de mana têm seu custo aumentado em 2 PM e itens mágicos encantados perdem um de seus encantamentos (a escolha do portador). Por fim, a recuperação de PV e PM por descanso é reduzida à metade (após aplicar outros efeitos que afetem sua recuperação). Lefeu e lefou são imunes a todos esses efeitos.',
    pagina: 319,
  },

  // ── Armadilhas ────────────────────────────────────────────────────────
  {
    id: 'agulha-envenenada', nome: 'Agulha Envenenada', categoria: 'armadilha',
    nd: '1/4', ndValor: 0.25,
    dano: '1 ponto de dano de perfuração e perde 1d12 PV por veneno',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 25, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'arame-farpado', nome: 'Arame Farpado', categoria: 'armadilha',
    nd: '1/4', ndValor: 0.25,
    dano: 'Conta como terreno difícil e causa 1d6+2 pontos de dano de corte em quem atravessá-lo',
    resistencia: null, investigacaoCD: 10, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'fosso-camuflado', nome: 'Fosso Camuflado', categoria: 'armadilha',
    nd: '1/4', ndValor: 0.25,
    dano: 'Queda de 3m causa 2d6 pontos de dano de impacto (Atletismo CD 20 para escalar de volta)',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'rede', nome: 'Rede', categoria: 'armadilha',
    nd: '1/4', ndValor: 0.25,
    dano: 'Criatura fica agarrada (ação completa e Acrobacia CD 20 para escapar)',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'virote', nome: 'Virote', categoria: 'armadilha',
    nd: '1/4', ndValor: 0.25,
    dano: '1d10+2 pontos de dano de perfuração',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 25, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'fosso-profundo', nome: 'Fosso Profundo', categoria: 'armadilha',
    nd: '1/2', ndValor: 0.5,
    dano: 'Queda de 6m causa 4d6 pontos de dano de impacto (Atletismo CD 20 para escalar de volta)',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'lamina-na-parede', nome: 'Lâmina na Parede', categoria: 'armadilha',
    nd: '1/2', ndValor: 0.5,
    dano: '2d6+5 pontos de dano de corte',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 25, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'bloco-de-pedra', nome: 'Bloco de Pedra', categoria: 'armadilha',
    nd: '1', ndValor: 1,
    dano: '6d6 pontos de dano de impacto',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'pendulo-de-teto', nome: 'Pêndulo de Teto', categoria: 'armadilha',
    nd: '1', ndValor: 1,
    dano: '1d12+10 pontos de dano de corte',
    resistencia: 'Reflexos CD 25 evita', investigacaoCD: 25, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'fosso-com-estacas', nome: 'Fosso com Estacas', categoria: 'armadilha',
    nd: '2', ndValor: 2,
    dano: 'Queda de 9m causa 6d6 pontos de dano de impacto mais estacas causam 2d4+5 de perfuração (Atletismo CD 20 para escalar de volta)',
    resistencia: 'Reflexos CD 20 evita', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'runa-de-protecao', nome: 'Runa de Proteção', categoria: 'armadilha',
    nd: '2', ndValor: 2,
    dano: '6d6 pontos de dano de fogo (ou ácido, eletricidade, frio, luz ou trevas) em todas as criaturas a até 3m',
    resistencia: 'Reflexos CD 20 reduz à metade (a criatura que ativou não tem direito)',
    investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'simbolo-do-medo', nome: 'Símbolo do Medo', categoria: 'armadilha',
    nd: '2', ndValor: 2,
    dano: 'Criaturas em alcance curto ficam abaladas até o fim da cena',
    resistencia: 'Vontade CD 20 evita', investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 317,
  },
  {
    id: 'estatua-executora', nome: 'Estátua Executora', categoria: 'armadilha',
    nd: '3', ndValor: 3,
    dano: '1d12+10 mais 1d12+10 pontos de dano de corte',
    resistencia: 'dois testes de Reflexos CD 25 (cada teste evita um dos danos)',
    investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'gas-venenoso', nome: 'Gás Venenoso', categoria: 'armadilha',
    nd: '3', ndValor: 3,
    dano: 'perde 1d12 PV por veneno por rodada durante 2d4 rodadas',
    resistencia: 'Fortitude CD 20 reduz à metade', investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'simbolo-do-sono', nome: 'Símbolo do Sono', categoria: 'armadilha',
    nd: '3', ndValor: 3,
    dano: 'Criaturas em alcance curto com 8 níveis ou menos caem inconscientes (como na magia Sono)',
    resistencia: 'Vontade CD 20 evita', investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'parede-instavel', nome: 'Parede Instável', categoria: 'armadilha',
    nd: '4', ndValor: 4,
    dano: '8d6 pontos de dano de impacto num quadrado de 3m de lado',
    resistencia: 'Reflexos CD 25 reduz à metade', investigacaoCD: 20, ladinagemCD: 20,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'simbolo-da-dor', nome: 'Símbolo da Dor', categoria: 'armadilha',
    nd: '4', ndValor: 4,
    dano: 'Criaturas em alcance curto sofrem dores terríveis, que impõem uma penalidade de –5 em todos os testes até o fim da cena',
    resistencia: 'Fortitude CD 25 evita', investigacaoCD: 30, ladinagemCD: 30,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'bruma-da-insanidade', nome: 'Bruma da Insanidade', categoria: 'armadilha',
    nd: '5', ndValor: 5,
    dano: 'Criaturas em um cubo de 6m de lado ficam confusas até o fim da cena',
    resistencia: 'Fortitude CD 20 evita', investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'simbolo-do-atordoamento', nome: 'Símbolo do Atordoamento', categoria: 'armadilha',
    nd: '5', ndValor: 5,
    dano: 'Criaturas em alcance curto ficam atordoadas por 1d6 rodadas',
    resistencia: 'Fortitude CD 25 evita', investigacaoCD: 30, ladinagemCD: 30,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'desabamento-do-teto', nome: 'Desabamento do Teto', categoria: 'armadilha',
    nd: '6', ndValor: 6,
    dano: '15d6 pontos de dano de impacto em todas as criaturas num quadrado de 6m de lado',
    resistencia: 'Reflexos CD 30 reduz à metade', investigacaoCD: 25, ladinagemCD: 25,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'simbolo-da-insanidade', nome: 'Símbolo da Insanidade', categoria: 'armadilha',
    nd: '6', ndValor: 6,
    dano: 'Criaturas em alcance curto ficam confusas permanentemente',
    resistencia: 'Vontade CD 25 evita', investigacaoCD: 30, ladinagemCD: 30,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'abismo-da-morte', nome: 'Abismo da Morte', categoria: 'armadilha',
    nd: '8', ndValor: 8,
    dano: 'Um quadrado de 6m de lado no chão se abre para uma queda de 30m sobre estacas, causando 20d6 pontos de dano de impacto e 2d8+10 pontos de dano de perfuração (Atletismo CD 25 para escalar de volta)',
    resistencia: 'Reflexos CD 30 evita', investigacaoCD: 30, ladinagemCD: 30,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },
  {
    id: 'simbolo-da-morte', nome: 'Símbolo da Morte', categoria: 'armadilha',
    nd: '8', ndValor: 8,
    dano: 'Criaturas em alcance curto são reduzidas a –1 PV',
    resistencia: 'Fortitude CD 30 reduz para 10d6 pontos de dano de trevas', investigacaoCD: 30, ladinagemCD: 30,
    transmissao: null, cd: null, progressao: null, descricao: null, pagina: 318,
  },

  // ── Doenças ───────────────────────────────────────────────────────────
  {
    id: 'calafrio-diabolico', nome: 'Calafrio Diabólico', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Contato', cd: 25,
    progressao: ['fraca', 'debilitada', 'inconsciente', 'morre'],
    descricao: 'Causa fraqueza e, em casos graves, coma e morte.',
    pagina: 318,
  },
  {
    id: 'febre-do-riso', nome: 'Febre do Riso', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Inalação', cd: 20,
    progressao: ['frustrada', 'esmorecida', 'confusa'],
    descricao: 'Causa surtos de agitação e, em casos graves, loucura. A condição se ativa no início de cada cena.',
    pagina: 318,
  },
  {
    id: 'febre-mental', nome: 'Febre Mental', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Inalação', cd: 20,
    progressao: ['frustrada', 'esmorecida', 'alquebrada'],
    descricao: 'Causa enxaquecas e torpor.',
    pagina: 318,
  },
  {
    id: 'infeccao-do-esgoto', nome: 'Infecção do Esgoto', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Contato', cd: 15,
    progressao: ['fraca', 'debilitada'],
    descricao: 'Transmitida por criaturas como ratos gigantes e otyughs. Uma pessoa ferida que passe por lugares imundos também pode contrair esta doença.',
    pagina: 318,
  },
  {
    id: 'maldicao-pegajosa', nome: 'Maldição Pegajosa', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Contato', cd: 20,
    progressao: ['perde 1d12 PV', 'perde 2d12 PV', 'perde 4d12 PV'],
    descricao: 'Transforma os órgãos internos em uma massa disforme. A vítima deve passar em três testes de Fortitude seguidos para se curar (em vez dos dois dias seguidos usuais).',
    pagina: 318,
  },
  {
    id: 'molestia-demoniaca', nome: 'Moléstia Demoníaca', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Contato', cd: 20,
    progressao: ['perde 1d12 PV', 'perde 2d12 PV', 'perde 1 de Constituição* (permanente)', 'morre'],
    descricao: 'Causa danos internos e, em casos graves, sequelas permanentes e morte. *Perda permanente (só é possível perder 1 ponto de atributo por uma mesma doença).',
    pagina: 318,
  },
  {
    id: 'tremores', nome: 'Tremores', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Contato', cd: 15,
    progressao: ['vulnerável'],
    descricao: 'Causa tremedeira e convulsões.',
    pagina: 318,
  },
  {
    id: 'variola', nome: 'Varíola', categoria: 'doenca',
    nd: null, ndValor: null, dano: null, resistencia: null, investigacaoCD: null, ladinagemCD: null,
    transmissao: 'Inalação', cd: 20,
    progressao: ['enjoada', 'debilitada', 'perde 1 de Carisma* (permanente)', 'morre'],
    descricao: 'Causa febre e vômitos. Em casos graves, forma úlceras e erupções na pele, que deixam cicatrizes, e pode levar à morte. *Perda permanente (só é possível perder 1 ponto de atributo por uma mesma doença).',
    pagina: 318,
  },
];

window.PERIGOS_COMPLEXOS = [
  {
    id: 'avalanche', nome: 'Avalanche', nd: '4', ndValor: 4,
    objetivo: 'Escapar da avalanche.',
    efeito: 'O grupo tem cinco rodadas para se afastar dos escombros. No fim da quinta rodada, a posição de cada personagem é definida pelo número de sucessos acumulados nas ações Correr ou Carregar Outro. Um personagem com dois sucessos ou menos fica na zona de soterramento (o caminho direto dos escombros): sofre 16d6 pontos de dano de impacto e fica soterrado. Um personagem com três ou quatro sucessos fica na zona de deslizamento (o caminho pelo qual os escombros se espalham): sofre 8d6 pontos de dano de impacto. Um personagem com cinco sucessos ou mais escapa ileso.',
    notas: 'Os personagens têm direito a um teste de Sobrevivência (CD 20) para perceber a avalanche iniciando — quem passar pode realizar uma ação adicional em sua primeira rodada. Personagens soterrados ficam imóveis e sofrem 1d6 pontos de dano de impacto no início de cada um de seus turnos; soltar-se (ou soltar um aliado soterrado) exige um teste de Força (CD 25), e vários personagens podem ajudar nesse teste.',
    contadorNota: 'Ao fim das 5 rodadas: 0–2 sucessos = soterrado (16d6 de dano, fica soterrado); 3–4 sucessos = zona de deslizamento (8d6 de dano); 5+ sucessos = escapa ileso.',
    acoes: [
      { nome: 'Correr', pericia: 'Atletismo', cd: 20, texto: 'O personagem corre para longe da avalanche. Se passar, afasta-se dos escombros. Um sucesso por 10 ou mais (ou um 20 natural) conta como dois sucessos. Recebe os mesmos modificadores da ação corrida e pode ser substituído por Cavalgar ou Pilotagem, caso o personagem esteja usando uma montaria ou veículo.' },
      { nome: 'Carregar Outro', pericia: 'Atletismo', cd: 25, texto: 'O personagem carrega um aliado próximo (com no máximo um sucesso de diferença). Funciona como Correr, mas com CD maior. Se passar, o personagem acumula um sucesso para si e para o aliado.' },
      { nome: 'Procurar Caminho', pericia: 'Percepção', cd: 20, texto: 'O personagem analisa o terreno em busca de uma rota de fuga. Se passar, recebe +5 em todos os testes de Correr e Carregar Outro realizados durante o perigo.' },
    ],
    pagina: 320,
  },
  {
    id: 'jornada-pelos-ermos', nome: 'Jornada pelos Ermos', nd: '2', ndValor: 2,
    objetivo: 'Chegar ao destino.',
    efeito: 'Para chegar ao destino, o grupo deverá fazer certa quantidade de testes, definida pelo tamanho da jornada: curta (até outro reino na mesma região, 3 testes exigidos), média (até outra região, como do Reinado até as Repúblicas Livres, 5 testes) ou longa (até outra região longínqua ou continente, como do Reinado até o Deserto da Perdição ou Lamnor, 7 testes exigidos). Para cada falha, os personagens perdem 2d6 pontos de vida — cansaço e desgaste que só pode ser curado a partir de um dia após o fim da jornada. Se o grupo acumular três falhas, os pontos de mana máximos dos personagens diminuem em 1 por nível na próxima aventura.',
    notas: 'A CD do teste de Avançar varia conforme o terreno: 15 para planícies e colinas, 20 para florestas e pântanos, 25 para desertos ou montanhas, e 30 para regiões planares perigosas ou áreas de Tormenta. Independentemente do resultado, o grupo sempre chega ao destino — o que está em jogo é o estado dos personagens ao fim da jornada.',
    contadorNota: 'Sucessos necessários: 3 (jornada curta), 5 (média) ou 7 (longa). O grupo falha a jornada (recomeça, a critério do mestre) se acumular 3 falhas antes de atingir a meta de sucessos.',
    acoes: [
      { nome: 'Avançar', pericia: 'Sobrevivência ou outra perícia justificável', cd: 'Varia por terreno (15/20/25/30)', texto: 'Os personagens se alternam fazendo testes até atingir a quantidade de sucessos exigida pela jornada (ou até acumular três falhas). Os testes podem ser de Sobrevivência ou de qualquer outra perícia que o jogador consiga justificar e que o mestre aprove — cada perícia que não seja Sobrevivência só pode ser usada uma vez pela jornada.' },
    ],
    pagina: 320,
  },
  {
    id: 'tempestade-em-alto-mar', nome: 'Tempestade em Alto Mar', nd: '6', ndValor: 6,
    objetivo: 'Sobreviver à fúria do mar. A tempestade dura 1d6+6 rodadas; após esse período, a chuva pode continuar, mas sem os perigos abaixo.',
    efeito: 'No início de seu turno, cada personagem deve fazer um teste de Reflexos para evitar ondas gigantes. Se falhar, sofre 4d6 pontos de dano de impacto; se falhar por 10 ou mais, sofre o dano e cai no mar. A CD é 20+1d6 (role uma vez no início de cada rodada e aplique a mesma CD para todos os personagens). Um personagem no mar falha automaticamente no teste para evitar as ondas.',
    notas: 'Os personagens têm direito a um teste de Sobrevivência (CD 20) para perceber a tempestade iniciando — quem passar pode realizar uma ação adicional em sua primeira rodada.',
    contadorNota: 'A duração é 1d6+6 rodadas; cada sucesso em Navegar reduz a duração restante em 1 rodada.',
    acoes: [
      { nome: 'Navegar', pericia: 'Pilotagem', cd: 25, texto: 'O personagem conduz a embarcação para fora da tempestade. Cada sucesso reduz a duração da tempestade em uma rodada. Apenas um personagem pode fazer esta ação por rodada.' },
      { nome: 'Ajudar o Piloto', pericia: 'Varia (qualquer perícia justificável)', cd: null, texto: 'O personagem faz um teste para ajudar o teste de Pilotagem. Pode usar qualquer perícia que conseguir justificar — Atletismo para segurar o cordame no lugar, Percepção para ver a melhor direção para escapar da tempestade etc.' },
      { nome: 'Esconder-se', pericia: null, cd: null, texto: 'O personagem desce ao convés inferior (ou outro lugar) para se proteger das ondas. No convés inferior, a CD do teste de Reflexos é 20 fixo (desconsidere o 1d6) e não há chance de cair no mar — porém o personagem não pode navegar a embarcação ou ajudar o piloto.' },
      { nome: 'Voltar para o Navio', pericia: 'Atletismo', cd: 25, texto: 'Um personagem no mar pode nadar de volta ao navio. Exige dois sucessos em testes de Atletismo: um para alcançar o navio e outro para subir pelo costado. Em caso de falha, o personagem não avança; falhando por 5 ou mais, o personagem afunda.' },
    ],
    pagina: 321,
  },
  {
    id: 'sala-esmagadora', nome: 'Sala Esmagadora', nd: '9', ndValor: 9,
    objetivo: 'Abrir a porta e sair da sala ou desabilitar o mecanismo que move as paredes.',
    efeito: 'Quando o grupo entra na sala, a porta se fecha e as paredes começam a se mover para esmagá-los. Os personagens têm três rodadas para agir. Na quarta, começam a ser esmagados e sofrem 10d6 pontos de dano de impacto. Na quinta rodada, a sala se fecha completamente — qualquer personagem que ainda estiver dentro dela é morto.',
    notas: 'A sala esmagadora é protegida por uma Âncora Dimensional que impede qualquer movimento planar.',
    contadorNota: '3 sucessos em Força (Derrubar Porta) OU 3 sucessos em Ladinagem (Desabilitar Mecanismo) resolvem o perigo. Cada 2 sucessos em Segurar Paredes adiam o esmagamento em mais 1 rodada.',
    acoes: [
      { nome: 'Derrubar Porta', pericia: 'Força', cd: 30, texto: 'O jeito mais simples de escapar é abrir a porta e sair — mas como ela não tem fechadura por dentro e é feita de aço maciço, a única opção é derrubá-la. Exige acumular três sucessos em Força. No máximo dois personagens podem fazer esta ação por rodada (cada um pode testar por si ou ajudar o outro).' },
      { nome: 'Desabilitar Mecanismo', pericia: 'Ladinagem', cd: 30, texto: 'Um jeito mais sagaz de sobreviver é emperrar as paredes. Exige três sucessos em Ladinagem. Uma vez emperradas, o grupo pode derrubar a porta com calma, sem exigir mais testes.' },
      { nome: 'Segurar Paredes', pericia: 'Força', cd: 25, texto: 'O personagem faz força contra as paredes para impedir que elas se fechem. Cada dois sucessos nesta ação aumentam em mais uma rodada o tempo para a sala se fechar — não salva o grupo sozinho, mas dá mais tempo para outros derrubarem a porta ou emperrarem as paredes.' },
    ],
    pagina: 320,
  },
];
