/* ============================================================
   PARCEIROS.JS — Regras Gerais de Parceiros
   Fonte: Tormenta 20 - Edição Jogo do Ano v1.3, Capítulo 6
   "O Mestre" (pp. 260-262).

   IMPORTANTE — este é o sistema GERAL de parceiros, não algo exclusivo
   de Druida/Caçador. Hoje o poder "Companheiro Animal" (Druida e
   Caçador, em js/data/poderes_classes.js) já duplica um subconjunto
   destes mesmos tipos (Ajudante, Assassino, Atirador, Fortão, Guardião,
   Perseguidor, Montaria) dentro do próprio array de poderes. Os `id`
   usados aqui foram escolhidos batendo com os nomes já usados lá
   (ex.: 'ajudante', 'guardiao') de propósito — pensando numa faxina
   futura pra fazer poderes_classes.js referenciar ESTES dados por id
   em vez de repetir o texto (ainda não feita; combinado com o usuário
   fazer isso depois, quando outras classes também usarem parceiros).

   TIPOS_PARCEIRO: os 12 tipos "genéricos" (servem pra qualquer parceiro
   humanoide, NPC ou animal que não seja usado como montaria) + o
   resumo do tipo Montaria (que tem sua página própria de detalhe, ver
   MONTARIAS_PARCEIRO abaixo, com os 6 parceiros-montaria nomeados que
   o livro já traz prontos).

   Cada tipo: { id, nome, icone, descricao (quem costuma ser esse
   parceiro), niveis: [{label:'Iniciante'|'Veterano'|'Mestre', descricao}] }.

   MONTARIAS_PARCEIRO: os 6 parceiros-montaria NOMEADOS do livro
   (Cavalo, Cão de Caça, Lobo-das-Cavernas, Grifo, Gorlogg, Trobo) —
   cada um já é um "tipo Montaria" pronto, com categoria de tamanho e
   progressão própria por patamar (em vez do bônus genérico do tipo
   Montaria abstrato, que o livro deixa em aberto pro mestre criar
   outras montarias). NÃO são fichas de criatura completas (sem PV,
   Defesa, ataques etc. próprios) — são só o bônus que concedem como
   parceiro, igual aos 12 tipos acima.

   PARCEIRO-CRIATURA (ex.: Urso das Neves, ND 5) — quando uma criatura
   do Bestiário É TAMBÉM um parceiro pronto (o próprio livro já faz
   isso em alguns casos), a ficha completa NÃO mora aqui — ela mora
   como sempre em CRIATURAS (js/data/criaturas.js), só ganha um campo
   opcional `parceiro: { tipo, tamanho, niveis }` (mesma forma de
   MONTARIAS_PARCEIRO acima). A página de Parceiros lê esse campo
   direto de CRIATURAS (função `criaturasComParceiro()` em
   compendio.js) — não duplica nada aqui. `tipo` pode ser 'montaria'
   ou qualquer id de TIPOS_PARCEIRO (uma criatura-parceiro não
   precisa ser montaria). Nenhuma criatura tem esse campo ainda —
   ele é adicionado à criatura individualmente, quando o usuário trouxer
   os dados (ex.: da imagem do Urso das Neves).

   PARCEIRO_LIMITE_POR_NIVEL: quantos parceiros simultâneos um
   personagem pode ter, por patamar DELE (não confundir com o patamar
   do parceiro em si) — usado pela mini-calculadora da página.
============================================================ */

const TIPOS_PARCEIRO = [
  {
    id: 'adepto', nome: 'Adepto', icone: 'ti-wand',
    descricao: 'Um conjurador capaz de ajudá-lo a lançar suas próprias magias.',
    niveis: [
      { label: 'Iniciante', descricao: 'O custo para lançar suas magias de 1º círculo diminui em 1 PM.' },
      { label: 'Veterano', descricao: 'Como acima, e também reduz o custo de suas magias de 2º círculo.' },
      { label: 'Mestre', descricao: 'Como acima, e essa redução se torna cumulativa com outras reduções de custo que você possua.' },
    ],
  },
  {
    id: 'ajudante', nome: 'Ajudante', icone: 'ti-star',
    descricao: 'Um bardo, nobre ou sábio que ajuda com palavras firmes ou encorajadoras.',
    niveis: [
      { label: 'Iniciante', descricao: '+2 em duas perícias.' },
      { label: 'Veterano', descricao: 'Muda para +2 em três perícias.' },
      { label: 'Mestre', descricao: 'Muda para +4 em três perícias. As perícias são definidas pelo parceiro; um ajudante não pode fornecer bônus em Luta ou Pontaria.' },
    ],
  },
  {
    id: 'assassino', nome: 'Assassino', icone: 'ti-crosshair',
    descricao: 'Um ladino ou outro tipo de combatente furtivo e letal.',
    niveis: [
      { label: 'Iniciante', descricao: 'Você pode usar a habilidade Ataque Furtivo +1d6 — se já a possui, o bônus é cumulativo.' },
      { label: 'Veterano', descricao: 'Além do Ataque Furtivo, fornece bônus por flanquear contra um inimigo por rodada.' },
      { label: 'Mestre', descricao: 'O dano do Ataque Furtivo muda para +2d6, e o bônus por flanquear facilita o uso do seu próprio Ataque Furtivo.' },
    ],
  },
  {
    id: 'atirador', nome: 'Atirador', icone: 'ti-arrow-narrow-up',
    descricao: 'Um arqueiro, besteiro ou outro combatente à distância.',
    niveis: [
      { label: 'Iniciante', descricao: 'Uma vez por rodada, +1d6 em uma rolagem de dano à distância.' },
      { label: 'Veterano', descricao: 'Muda para +1d10.' },
      { label: 'Mestre', descricao: 'Muda para +2d8.' },
    ],
  },
  {
    id: 'combatente', nome: 'Combatente', icone: 'ti-swords',
    descricao: 'Um bucaneiro, guerreiro, paladino ou outro animal de caça.',
    niveis: [
      { label: 'Iniciante', descricao: '+2 em testes de ataque.' },
      { label: 'Veterano', descricao: 'Muda para +3 em testes de ataque.' },
      { label: 'Mestre', descricao: 'Muda para +4 em testes de ataque e, uma vez por rodada, você pode gastar 5 PM para fazer um ataque extra.' },
    ],
  },
  {
    id: 'destruidor', nome: 'Destruidor', icone: 'ti-bolt',
    descricao: 'Um arcanista ou inventor especializado em causar dano à distância.',
    niveis: [
      { label: 'Iniciante', descricao: 'Uma vez por rodada, como ação livre, pode gastar 1 PM pra causar 2d6 de dano (ácido, eletricidade, fogo ou frio, de acordo com o parceiro) em alcance curto.' },
      { label: 'Veterano', descricao: 'Como acima, mas também pode gastar 2 PM para causar 4d6 de dano.' },
      { label: 'Mestre', descricao: 'Como acima, mas também pode gastar 4 PM para causar 6d6 de dano numa área de 6m de raio, em alcance médio.' },
    ],
  },
  {
    id: 'fortao', nome: 'Fortão', icone: 'ti-hand-stop',
    descricao: 'Um bárbaro, lutador ou outro tipo que bate primeiro e pensa depois.',
    niveis: [
      { label: 'Iniciante', descricao: 'Uma vez por rodada, +1d8 em uma rolagem de dano corpo a corpo.' },
      { label: 'Veterano', descricao: 'Muda para +1d12.' },
      { label: 'Mestre', descricao: 'Muda para +3d6.' },
    ],
  },
  {
    id: 'guardiao', nome: 'Guardião', icone: 'ti-shield',
    descricao: 'Um cavaleiro, cão de guarda ou outro NPC cuja função primária é proteger.',
    niveis: [
      { label: 'Iniciante', descricao: '+2 na Defesa.' },
      { label: 'Veterano', descricao: 'Muda para +3.' },
      { label: 'Mestre', descricao: 'Muda para +4 na Defesa e +2 em testes de resistência.' },
    ],
  },
  {
    id: 'magivocador', nome: 'Magivocador', icone: 'ti-sparkles',
    descricao: 'Um conjurador especializado em magias ofensivas.',
    niveis: [
      { label: 'Iniciante', descricao: 'O dano de suas magias aumenta em +1 dado do mesmo tipo.' },
      { label: 'Veterano', descricao: 'Como acima, e a CD para resistir a suas magias aumenta em +1.' },
      { label: 'Mestre', descricao: 'Como acima, mas dobra os dois bônus (total de +2 dados de dano e +2 na CD).' },
    ],
  },
  {
    id: 'medico', nome: 'Médico', icone: 'ti-first-aid-kit',
    descricao: 'Um clérigo, druida, herbalista ou outro NPC com capacidades curativas.',
    niveis: [
      { label: 'Iniciante', descricao: 'Uma vez por rodada, pode gastar 1 PM pra curar 1d8+1 PV de uma criatura adjacente.' },
      { label: 'Veterano', descricao: 'Como acima, mas pode gastar 3 PM para curar 3d8+3 PV ou remover uma condição prejudicial (como abalado ou fatigado).' },
      { label: 'Mestre', descricao: 'Como acima, mas também pode gastar 5 PM para curar 6d8+6 PV.' },
    ],
  },
  {
    id: 'perseguidor', nome: 'Perseguidor', icone: 'ti-search',
    descricao: 'Um caçador, animal farejador ou outro especialista em localizar alvos.',
    niveis: [
      { label: 'Iniciante', descricao: '+2 em Percepção e Sobrevivência.' },
      { label: 'Veterano', descricao: 'Você pode usar Sentidos Aguçados.' },
      { label: 'Mestre', descricao: 'Você pode usar Percepção às Cegas.' },
    ],
  },
  {
    id: 'vigilante', nome: 'Vigilante', icone: 'ti-eye',
    descricao: 'Um vigia ou animal de guarda, sempre atento aos arredores.',
    niveis: [
      { label: 'Iniciante', descricao: '+2 em Percepção e Iniciativa.' },
      { label: 'Veterano', descricao: 'Você pode usar Esquiva Sobrenatural.' },
      { label: 'Mestre', descricao: 'Você pode usar Olhos nas Costas.' },
    ],
  },
];

const MONTARIAS_PARCEIRO = [
  {
    id: 'cavalo', nome: 'Cavalo', tamanho: 'Grande', icone: 'ti-horse',
    descricao: 'A montaria mais comum do Reinado. Estas mesmas estatísticas também valem para pôneis (tamanho Médio).',
    niveis: [
      { label: 'Iniciante', descricao: 'Deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (só para se deslocar).' },
      { label: 'Veterano', descricao: 'Como acima, mas o deslocamento muda para 15m e você recebe +2 em ataques corpo a corpo.' },
      { label: 'Mestre', descricao: 'Como acima, mas você recebe uma segunda ação de movimento extra por turno (de novo, só para se deslocar).' },
    ],
  },
  {
    id: 'cao-de-caca', nome: 'Cão de Caça', tamanho: 'Médio ou Pequeno', icone: 'ti-dog',
    descricao: 'Cães de porte adequado servem como montaria comum para personagens Pequenos ou Minúsculos.',
    niveis: [
      { label: 'Iniciante', descricao: 'Deslocamento muda para 9m, você pode usar faro e recebe uma ação de movimento extra por turno (só para se deslocar).' },
      { label: 'Veterano', descricao: 'Como acima, mas o deslocamento muda para 12m e você recebe +2 na Defesa.' },
      { label: 'Mestre', descricao: 'Como acima; além disso, uma vez por rodada, ao acertar um ataque corpo a corpo, você pode fazer a manobra derrubar como ação livre.' },
    ],
  },
  {
    id: 'lobo-das-cavernas', nome: 'Lobo-das-Cavernas', tamanho: 'Grande', icone: 'ti-paw',
    descricao: 'Primos primitivos e maiores dos lobos comuns, usados como montaria por goblinoides e aventureiros selvagens. Estas mesmas estatísticas também valem para lobos comuns (tamanho Médio).',
    niveis: [
      { label: 'Iniciante', descricao: 'Deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (só para se deslocar).' },
      { label: 'Veterano', descricao: 'Como acima, mas o deslocamento muda para 15m e, uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.' },
      { label: 'Mestre', descricao: 'Como acima; além disso, uma vez por rodada, ao acertar um ataque corpo a corpo, você pode fazer a manobra derrubar como ação livre.' },
    ],
  },
  {
    id: 'grifo', nome: 'Grifo', tamanho: 'Grande', icone: 'ti-feather',
    descricao: 'Fera majestosa muito cobiçada por heróis — um grifo iniciante é um filhote e ainda não pode ser usado como montaria.',
    niveis: [
      { label: 'Iniciante', descricao: 'Uma vez por rodada, +1d8 em uma rolagem de dano corpo a corpo (é um filhote — ainda não pode ser usado como montaria).' },
      { label: 'Veterano', descricao: 'Como acima, mas já pode ser usado como montaria, com deslocamento de voo 18m.' },
      { label: 'Mestre', descricao: 'Como acima, mas você recebe uma ação de movimento extra por turno (só para se deslocar).' },
    ],
  },
  {
    id: 'gorlogg', nome: 'Gorlogg', tamanho: 'Grande', icone: 'ti-mountain',
    descricao: 'Besta primitiva usada como montaria pelos povos mais selvagens.',
    niveis: [
      { label: 'Iniciante', descricao: 'Deslocamento muda para 12m e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo.' },
      { label: 'Veterano', descricao: 'Como acima, mas o bônus de dano corpo a corpo muda para +1d10.' },
      { label: 'Mestre', descricao: 'Deslocamento muda para 15m e o bônus de dano corpo a corpo muda para +2d8.' },
    ],
  },
  {
    id: 'trobo', nome: 'Trobo', tamanho: 'Grande', icone: 'ti-elephant',
    descricao: 'Usado como animal de carga e tração, o trobo também serve como montaria.',
    niveis: [
      { label: 'Iniciante', descricao: 'Deslocamento muda para 9m, você recebe uma ação de movimento extra por turno (só para se deslocar) e +1 em testes de resistência.' },
      { label: 'Veterano', descricao: 'Como acima, mas o deslocamento muda para 12m e o bônus em testes de resistência muda para +2.' },
      { label: 'Mestre', descricao: 'Como acima, mas o bônus em testes de resistência muda para +5.' },
    ],
  },
];

// ── Textos de apoio (resumos próprios, não cópia literal do livro) ──
const PARCEIROS_REGRAS = {
  resumo: 'Parceiros são NPCs que se aventuram ao lado do grupo — adquiridos por uma habilidade de classe, contratados, comprados (no caso de animais e construtos) ou recebidos como recompensa. Cada parceiro concede um bônus fixo ao personagem que ajuda, sem turno ou ações próprias — o tipo de parceiro define qual é esse bônus, e o patamar (Iniciante/Veterano/Mestre) define o tamanho dele.',
  limite: 'Personagens iniciantes (até o 4º nível) podem ter 1 parceiro; veteranos e campeões (5º ao 16º nível) podem ter até 2; lenda (17º nível ou mais) podem ter até 3. Um parceiro só ajuda um personagem por vez, mas pode ser passado a outro aliado em alcance curto (ação de movimento).',
  montaria: 'O tipo Montaria tem regra própria: usar o parceiro exige montar nele (ação de movimento) e um teste de Cavalgar (CD 10) por turno pra guiá-lo, salvo se treinado em Cavalgar. Cada montaria tem uma categoria de tamanho — só é possível montar em algo maior que o próprio personagem.',
  bestiario: 'Algumas criaturas do Bestiário já vêm prontas pra servir de parceiro (o próprio livro faz isso, ex.: Urso das Neves) — a ficha completa (PV, Defesa, ataques...) mora na página de Criaturas; aqui mostramos só o bônus que ela concede como parceiro, com um link pra ficha completa.',
};

// Limite de parceiros simultâneos por patamar do PERSONAGEM (não confundir
// com o patamar do PARCEIRO, Iniciante/Veterano/Mestre acima — são duas
// escalas independentes que só coincidem de nome). Cap. 6, p. 260.
const PARCEIRO_LIMITE_POR_NIVEL = [
  { min: 1, max: 4, limite: 1, patamar: 'Iniciante' },
  { min: 5, max: 16, limite: 2, patamar: 'Veterano/Campeão' },
  { min: 17, max: 20, limite: 3, patamar: 'Lenda' },
];

if (typeof window !== 'undefined') {
  window.TIPOS_PARCEIRO = TIPOS_PARCEIRO;
  window.MONTARIAS_PARCEIRO = MONTARIAS_PARCEIRO;
  window.PARCEIROS_REGRAS = PARCEIROS_REGRAS;
  window.PARCEIRO_LIMITE_POR_NIVEL = PARCEIRO_LIMITE_POR_NIVEL;
}
