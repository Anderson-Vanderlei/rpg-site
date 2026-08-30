/* ============================================================
   TORMENTA 20 — toques_finais.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 1: Construção de Personagem, seção "Toques Finais",
   pp. 106–111 (Características Derivadas, Idade, Alinhamento).
   Descrição e Nome (mesma seção do livro) são só dicas de escrita
   criativa, sem regra mecânica — não entram aqui de propósito.
============================================================ */

// ── CARACTERÍSTICAS DERIVADAS: recuperação de PV/PM por noite de
// descanso (condições de descanso: Ruim/Normal/Confortável/Luxuosa,
// ver Sobrevivência p.123 e Hospedagem p.163). O valor é sempre em
// relação ao nível do personagem; nunca ultrapassa o máximo de PV/PM.
window.RECUPERACAO_DESCANSO = [
  { id: 'ruim', nome: 'Ruim', multiplicador: 0.5, formula: 'Metade do nível (arred. p/ baixo)',
    descricao: 'Dormir ao relento, sem um saco de dormir, ou em um acampamento — condição ruim (Sobrevivência).' },
  { id: 'normal', nome: 'Normal', multiplicador: 1, formula: 'Igual ao nível',
    descricao: 'Dormir em uma estalagem comum — condição normal (Hospedagem).' },
  { id: 'confortavel', nome: 'Confortável', multiplicador: 2, formula: 'Dobro do nível',
    descricao: 'Uma noite de descanso em condições confortáveis.' },
  { id: 'luxuosa', nome: 'Luxuosa', multiplicador: 3, formula: 'Triplo do nível',
    descricao: 'Uma noite de descanso em condições luxuosas.' },
];

// ── CARACTERÍSTICAS DERIVADAS: Tamanho (Tabela 1-21) ──
window.TAMANHOS = [
  { id: 'minusculo', categoria: 'Minúsculo', exemplos: 'Falcão, rato, sílfide', espaco: '1,5m', modFurtividade: 5, modManobras: -5 },
  { id: 'pequeno',   categoria: 'Pequeno',   exemplos: 'Cão, goblin, hynne',   espaco: '1,5m', modFurtividade: 2, modManobras: -2 },
  { id: 'medio',     categoria: 'Médio',     exemplos: 'Humano, anão, elfo',   espaco: '1,5m', modFurtividade: 0, modManobras: 0 },
  { id: 'grande',    categoria: 'Grande',    exemplos: 'Cavalo, ogro, serpe',  espaco: '3m',   modFurtividade: -2, modManobras: 2 },
  { id: 'enorme',    categoria: 'Enorme',    exemplos: 'Ente, gigante, hidra', espaco: '4,5m', modFurtividade: -5, modManobras: 5 },
  { id: 'colossal',  categoria: 'Colossal',  exemplos: 'Colosso, dragão, kraken', espaco: '9m', modFurtividade: -10, modManobras: 10 },
];
window.TAMANHO_NOTA = 'Por padrão, o tamanho é Médio (sem modificadores). Criaturas Minúsculas usam armas reduzidas (um passo a menos de dano); Grandes e Enormes usam armas aumentadas (um passo a mais); Colossais usam armas gigantes (dois passos a mais). Usar arma de categoria de tamanho diferente da própria dá –5 nos testes de ataque (mínimo meio espaço de diferença).';

// ── DEFESA e DESLOCAMENTO (valores-base fixos, sem tabela) ──
window.DEFESA_BASE = 10; // Defesa = 10 + Destreza + bônus de armadura/escudo
window.DESLOCAMENTO_PADRAO = 9; // metros (6 quadrados no mapa)

// ── IDADE INICIAL por grupo de classe (rolagem 1x, no início da vida
// do personagem) — os 3 grupos cobrem as 14 classes do livro. ──
window.IDADE_INICIAL_GRUPOS = [
  { dado: '1d6+15', faixa: '16 a 21 anos', classes: ['barbaro', 'bucaneiro', 'ladino', 'lutador'] },
  { dado: '2d4+15', faixa: '17 a 23 anos', classes: ['bardo', 'cacador', 'cavaleiro', 'guerreiro', 'nobre', 'paladino'] },
  { dado: '2d6+15', faixa: '17 a 27 anos', classes: ['arcanista', 'clerigo', 'druida', 'inventor'] },
];

// ── ENVELHECIMENTO: modificadores por categoria etária. O livro só define
// Maduro e Velho, com a nota de que os modificadores são cumulativos (um
// personagem Velho soma Maduro + Velho). Separamos esse total acumulado
// numa 3ª entrada própria, "Ancião" — NÃO é uma categoria oficial do
// livro à parte, é o mesmo total que o livro descreve pra "personagem
// Velho", só reorganizado num card próprio (pedido do usuário) pra ficar
// mais fácil de ler e pra já deixar espaço pronto pra quando um suplemento
// futuro definir uma faixa etária de verdade além dos 70 anos. ──
window.ENVELHECIMENTO = [
  { id: 'maduro', categoria: 'Maduro', idade: '45 anos',
    mod: { for: -1, des: -1, con: -1, int: 1, sab: 1, car: 1 } },
  { id: 'velho', categoria: 'Velho', idade: '70 anos',
    mod: { for: -2, des: -2, con: -2, int: 1, sab: 1, car: 1 } },
  { id: 'anciao', categoria: 'Ancião', idade: 'Além de 70 anos', oficial: false,
    mod: { for: -3, des: -3, con: -3, int: 2, sab: 2, car: 2 },
    nota: 'Total acumulado de Maduro + Velho — o livro não separa essa faixa, é reorganização do site.' },
];
window.LONGEVIDADE_MAXIMA_FORMULA = '70 + 2d20 anos';
window.RACAS_LONGEVAS = [
  { multiplicador: 2, racas: 'Anões e Qaeen',
    nota: 'Multiplicam as categorias de envelhecimento (Maduro/Velho) e a longevidade máxima por 2.' },
  { multiplicador: 5, racas: 'Dahllan, Elfos, Golens, Osteon e Sílfides',
    nota: 'Multiplicam por 5 — na prática não têm longevidade máxima: podem viver para sempre, morrendo só de forma violenta ou por razão excepcional.' },
];

// ── ALINHAMENTO: os dois eixos ──
window.ALINHAMENTO_EIXO_ETICO = [
  { id: 'bondade', nome: 'Bondade', descricao: 'Realiza boas ações e protege o bem-estar alheio sem esperar recompensa; ajudar é a atitude natural.' },
  { id: 'neutralidade-etica', nome: 'Neutralidade', descricao: 'Colabora com os semelhantes, mas em geral espera algo em troca — reconhecimento ou gratidão.' },
  { id: 'maldade', nome: 'Maldade', descricao: 'Provoca dor, morte e angústia — por crueldade, prazer com a dor alheia ou simples indiferença ao bem-estar dos outros.' },
];
window.ALINHAMENTO_EIXO_MORAL = [
  { id: 'lei', nome: 'Lei', descricao: 'Cumpre deveres, respeita a lei, a autoridade e a tradição; honesto e confiável, mas pode ser inflexível.' },
  { id: 'neutralidade-moral', nome: 'Neutralidade', descricao: 'Obedece a leis e ordens, mas só até onde seus sentimentos permitem.' },
  { id: 'caos', nome: 'Caos', descricao: 'Segue o próprio coração, valoriza a liberdade acima de tudo e muda de ideia o tempo todo.' },
];

// ── ALINHAMENTO: os nove alinhamentos combinados. `exemploPao` é o
// mesmo teste recorrente do livro ("criança faminta roubando pão"),
// usado pra ilustrar a diferença de comportamento entre alinhamentos
// vizinhos. ──
window.ALINHAMENTOS = [
  { id: 'LB', nome: 'Leal e Bondoso', etico: 'bondade', moral: 'lei',
    descricao: 'Faz o que se espera de uma pessoa justa: respeita a lei e se sacrifica para ajudar os necessitados. Cumpre promessas e diz a verdade. Intolerante com o mal, mas capaz de perdão e compaixão. Alinhamento clássico dos paladinos.',
    exemploPao: 'Explicaria que roubar é errado, mas compraria comida para a criança e sua família, então a levaria até lá.' },
  { id: 'NB', nome: 'Neutro e Bondoso', etico: 'bondade', moral: 'neutralidade-moral',
    descricao: 'Pessoa de bom coração que sente prazer com a felicidade dos outros. Colabora com as autoridades, mas não se sente obrigada a fazê-lo — acha que ajudar o próximo é mais importante que seguir ordens ou leis.',
    exemploPao: 'Ajuda tanto a criança quanto o mercador roubado; não tentará punir a criança, talvez apenas dê-lhe um bom susto.' },
  { id: 'CB', nome: 'Caótico e Bondoso', etico: 'bondade', moral: 'caos',
    descricao: 'Espírito livre que promove o bem seguindo seus próprios instintos, em vez de confiar em regras. Não acha errado mentir, trapacear ou roubar para trazer bem-estar a outros; também preza a liberdade alheia.',
    exemploPao: 'Ajuda a criança a encobrir a fuga, e talvez a oriente a roubar de comerciantes ricos e inescrupulosos.' },
  { id: 'LN', nome: 'Leal e Neutro', etico: 'neutralidade-etica', moral: 'lei',
    descricao: 'Pessoa metódica e disciplinada, que obedece às leis e cumpre suas promessas a qualquer custo, pouco importando quem é beneficiado ou prejudicado. Diz o que pensa e não mente, mesmo quando a verdade pode magoar.',
    exemploPao: 'Impede o roubo e avisa a milícia ou leva a criança às autoridades.' },
  { id: 'N', nome: 'Neutro', etico: 'neutralidade-etica', moral: 'neutralidade-moral',
    descricao: 'Costuma ser indiferente, fraco em convicções morais ou éticas — ou luta ativamente pelo equilíbrio entre bem, mal, lei e caos. Usa o bom senso simples para decidir.',
    exemploPao: 'Em geral não se envolve, a menos que tenha alguma ligação pessoal com a criança ou o mercador.' },
  { id: 'CN', nome: 'Caótico e Neutro', etico: 'neutralidade-etica', moral: 'caos',
    descricao: 'Faz o que bem entende, sem se importar com o que os outros pensam. Valoriza a própria liberdade, mas sem preocupação com a liberdade alheia; impaciente e imprevisível.',
    exemploPao: 'Talvez ajude na fuga da criança, ou aproveite a distração para pegar seu próprio pedaço.' },
  { id: 'LM', nome: 'Leal e Maligno', etico: 'maldade', moral: 'lei',
    descricao: 'Acredita que ordem, tradições e códigos de conduta são mais importantes que liberdade, dignidade e vida alheia. Metódico e organizado; respeita regras de combate e cumpre a palavra, mesmo com inimigos.',
    exemploPao: 'Castigaria o pequeno ladrão ou o entregaria à milícia para receber a punição mais severa.' },
  { id: 'NM', nome: 'Neutro e Maligno', etico: 'maldade', moral: 'neutralidade-moral',
    descricao: 'Egoísta e mesquinho, coloca a si mesmo sempre em primeiro lugar. Faz alianças só para tirar vantagem do parceiro e traí-lo no momento oportuno.',
    exemploPao: 'Ameaça entregar a criança à milícia se ela não obedecer às suas ordens — pode até chantagear os pais dela.' },
  { id: 'CM', nome: 'Caótico e Maligno', etico: 'maldade', moral: 'caos',
    descricao: 'Verdadeiramente cruel, tira prazer do sofrimento alheio. Brutal, violento e imprevisível — capaz de matar por diversão ou necessidade perversa. Dificuldade em fazer planos ou trabalhar em equipe.',
    exemploPao: 'Mataria a criança, o mercador, e quem mais estivesse por perto — e os comeria, com pão.' },
];
