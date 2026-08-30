/* ============================================================
   TORMENTA 20 — atributos_basicos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 1: Construção de Personagem, seção "Atributos Básicos"
   (Tabela 1-1: Atributos — Custo × Rolagem, p. 17). Os modificadores
   raciais (Tabela 1-2, p. 18) já vivem em `racas.js`, no campo
   `atributosCalc` de cada raça — reaproveitados aqui, sem duplicar.
============================================================ */

// ── Os seis atributos, na ordem do livro. `descricao` é um resumo (não
// cópia literal do parágrafo do livro) do pra-que-serve de cada um,
// usado no ícone de informação ao lado do nome na Compra de Atributos. ──
window.ATRIBUTOS_LISTA = [
  { id: 'for', nome: 'Força',        sigla: 'FOR',
    descricao: 'Poder muscular — Atletismo, Luta, dano corpo a corpo/arremesso e testes de força bruta.' },
  { id: 'des', nome: 'Destreza',     sigla: 'DES',
    descricao: 'Agilidade e reflexos — Defesa, Acrobacia, Cavalgar, Furtividade, Iniciativa, Ladinagem, Pilotagem, Pontaria e Reflexos.' },
  { id: 'con', nome: 'Constituição', sigla: 'CON',
    descricao: 'Saúde e vigor — define os PV iniciais e por nível, e testes de Fortitude.' },
  { id: 'int', nome: 'Inteligência', sigla: 'INT',
    descricao: 'Raciocínio e educação — Conhecimento, Guerra, Investigação, Misticismo, Nobreza e Ofício; se positiva, dá perícias treinadas extras.' },
  { id: 'sab', nome: 'Sabedoria',    sigla: 'SAB',
    descricao: 'Observação e determinação — Cura, Intuição, Percepção, Religião, Sobrevivência e Vontade.' },
  { id: 'car', nome: 'Carisma',      sigla: 'CAR',
    descricao: 'Personalidade e persuasão — Adestramento, Atuação, Diplomacia, Enganação, Intimidação e Jogatina.' },
];

// ── Tabela 1-1: custo em pontos por valor de atributo comprado.
// -2 só é alcançável por rolagem (custo:null = não é comprável com
// pontos) — o livro só define custo de pontos de -1 a 4. ──
window.ATRIBUTOS_CUSTO = [
  { valor: -2, custo: null, rolagem: '7 ou menos' },
  { valor: -1, custo: -1,   rolagem: '8-9' },
  { valor: 0,  custo: 0,    rolagem: '10-11' },
  { valor: 1,  custo: 1,    rolagem: '12-13' },
  { valor: 2,  custo: 2,    rolagem: '14-15' },
  { valor: 3,  custo: 4,    rolagem: '16-17' },
  { valor: 4,  custo: 7,    rolagem: '18' },
];

window.ATRIBUTOS_PONTOS_INICIAIS = 10; // pontos pra distribuir (p.17)
window.ATRIBUTOS_VALOR_MIN = -1; // mínimo comprável com pontos, oficial
window.ATRIBUTOS_VALOR_MAX = 4;  // máximo da Tabela 1-1, oficial
