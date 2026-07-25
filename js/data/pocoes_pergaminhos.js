/* ============================================================
   TORMENTA 20 — pocoes_pergaminhos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 340-341 (Poções & Pergaminhos)

   Poções e pergaminhos são magias "empacotadas" — não são itens
   fixos como armas/armaduras, mas magias de window.MAGIAS embaladas
   com uma fórmula de preço. Por isso este arquivo tem duas partes:

   1. POCOES_CATALOGO — as ~38 entradas concretas que o livro lista
      na Tabela 8-12 (pra quem quer rolar uma poção aleatória ou ver
      exemplos prontos). Cada uma referencia a magia real por
      `magiaId`, pra reaproveitar nome/descrição/escola sem duplicar.

   2. Funções de cálculo (`calcularPrecoPocaoPergaminho`,
      `calcularCDPocaoPergaminho`) — usadas pelo GERADOR DINÂMICO na
      página, que deixa escolher QUALQUER uma das 197 magias +
      aprimoramentos e calcula o preço ao vivo, em vez de só mostrar
      os ~38 exemplos fixos do livro.

   Fórmula oficial (só funciona pra magias de alvo criatura/objeto ou
   efeito em área — não dá pra empoçar todo tipo de magia):
   - Preço = T$ 30 × (custo em PM)² — mínimo custo 1 PM pro cálculo.
   - CD de fabricação = 20 + custo em PM.
   - Custo em PM = custo-base do círculo (CUSTO_POR_CIRCULO, já em
     magias.js) + soma dos aprimoramentos escolhidos.
   - Pergaminhos NÃO aceitam aprimoramentos na fabricação (só o
     usuário pode aplicar aprimoramentos ao ATIVAR um pergaminho,
     pagando o custo em PM deles na hora).

   Cada entrada de POCOES_CATALOGO:
   { id, magiaId, formato: 'poção'|'óleo'|'granada',
     notaAprimoramento?: string, preco }

   formato: 'óleo' = a magia afeta objetos; 'granada' = a magia tem
   efeito em área; 'poção' = caso padrão (afeta uma criatura).
   notaAprimoramento: texto livre indicando qual aprimoramento (e
   quantas vezes) foi aplicado pra chegar nesse preço — quando null,
   é a magia na forma mais básica (sem aprimoramento).
============================================================ */

const POCOES_CATALOGO = [
  { id: 'pocao-abencoar-alimentos', magiaId: 'abencoar-alimentos', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-area-escorregadia', magiaId: 'area-escorregadia', formato: 'granada', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-arma-magica', magiaId: 'arma-magica', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-compreensao', magiaId: 'compreensao', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-curar-ferimentos-1', magiaId: 'curar-ferimentos', formato: 'poção', notaAprimoramento: 'base (2d8+2 PV)', preco: 'T$ 30' },
  { id: 'pocao-disfarce-ilusorio', magiaId: 'disfarce-ilusorio', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-escuridao', magiaId: 'escuridao', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-luz', magiaId: 'luz', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-nevoa', magiaId: 'nevoa', formato: 'granada', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-primor-atletico', magiaId: 'primor-atletico', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-protecao-divina', magiaId: 'protecao-divina', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-resistencia-a-energia', magiaId: 'resistencia-a-energia', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-sono', magiaId: 'sono', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-suporte-ambiental', magiaId: 'suporte-ambiental', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-tranca-arcana', magiaId: 'tranca-arcana', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-visao-mistica', magiaId: 'visao-mistica', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-vitalidade-fantasma', magiaId: 'vitalidade-fantasma', formato: 'poção', notaAprimoramento: null, preco: 'T$ 30' },
  { id: 'pocao-escudo-da-fe', magiaId: 'escudo-da-fe', formato: 'poção', notaAprimoramento: 'duração cena', preco: 'T$ 120' },
  { id: 'pocao-alterar-tamanho', magiaId: 'alterar-tamanho', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-aparencia-perfeita', magiaId: 'aparencia-perfeita', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-armamento-da-natureza', magiaId: 'armamento-da-natureza', formato: 'óleo', notaAprimoramento: 'execução ação de movimento', preco: 'T$ 270' },
  { id: 'pocao-bola-de-fogo-1', magiaId: 'bola-de-fogo', formato: 'granada', notaAprimoramento: 'base (6d6)', preco: 'T$ 270' },
  { id: 'pocao-camuflagem-ilusoria', magiaId: 'camuflagem-ilusoria', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-concentracao-de-combate', magiaId: 'concentracao-de-combate', formato: 'poção', notaAprimoramento: 'duração cena', preco: 'T$ 270' },
  { id: 'pocao-curar-ferimentos-2', magiaId: 'curar-ferimentos', formato: 'poção', notaAprimoramento: '4d8+4 PV', preco: 'T$ 270' },
  { id: 'pocao-fisico-divino-1', magiaId: 'fisico-divino', formato: 'poção', notaAprimoramento: 'base', preco: 'T$ 270' },
  { id: 'pocao-mente-divina', magiaId: 'mente-divina', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-metamorfose', magiaId: 'metamorfose', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-purificacao', magiaId: 'purificacao', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-velocidade', magiaId: 'velocidade', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-vestimenta-da-fe', magiaId: 'vestimenta-da-fe', formato: 'óleo', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-voz-divina', magiaId: 'voz-divina', formato: 'poção', notaAprimoramento: null, preco: 'T$ 270' },
  { id: 'pocao-arma-magica-2', magiaId: 'arma-magica', formato: 'óleo', notaAprimoramento: 'bônus +3', preco: 'T$ 750' },
  { id: 'pocao-curar-ferimentos-3', magiaId: 'curar-ferimentos', formato: 'poção', notaAprimoramento: '7d8+7 PV', preco: 'T$ 1.080' },
  { id: 'pocao-fisico-divino-2', magiaId: 'fisico-divino', formato: 'poção', notaAprimoramento: 'três atributos', preco: 'T$ 1.080' },
  { id: 'pocao-invisibilidade', magiaId: 'invisibilidade', formato: 'poção', notaAprimoramento: 'duração cena', preco: 'T$ 1.080' },
  { id: 'pocao-bola-de-fogo-2', magiaId: 'bola-de-fogo', formato: 'granada', notaAprimoramento: '10d6 de dano', preco: 'T$ 1.470' },
  { id: 'pocao-curar-ferimentos-4', magiaId: 'curar-ferimentos', formato: 'poção', notaAprimoramento: '11d8+11 PV', preco: 'T$ 3.000' },
];

/* ── Funções do Gerador Dinâmico (qualquer uma das 197 magias) ── */

// custoPM: custo total em PM (já somando círculo-base + aprimoramentos
// escolhidos). Retorna o preço em T$ pra uma poção ou pergaminho.
function calcularPrecoPocaoPergaminho(custoPM) {
  const pm = Math.max(1, custoPM);
  return 30 * pm * pm;
}

// CD do teste de Ofício pra fabricar.
function calcularCDPocaoPergaminho(custoPM) {
  return 20 + Math.max(1, custoPM);
}

// Categoria do item mágico (menor/médio/maior) pelo círculo da magia —
// mesma regra usada em "Itens Permanentes" (armas/armaduras mágicas).
function categoriaPorCirculo(circulo) {
  if (circulo <= 2) return 'menor';
  if (circulo <= 4) return 'médio';
  return 'maior';
}

if (typeof window !== 'undefined') {
  window.POCOES_CATALOGO = POCOES_CATALOGO;
  window.calcularPrecoPocaoPergaminho = calcularPrecoPocaoPergaminho;
  window.calcularCDPocaoPergaminho = calcularCDPocaoPergaminho;
  window.categoriaPorCirculo = categoriaPorCirculo;
}