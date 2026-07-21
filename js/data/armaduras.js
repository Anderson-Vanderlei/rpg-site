/* ============================================================
   TORMENTA 20 — armaduras.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 3: Equipamento, pp. 152-154 (Armaduras & Escudos)

   Cada entrada:
   { id, nome, categoria, preco, bonusDefesa, penalidadeArmadura,
     espacos, descricao }

   categoria: 'leve' | 'pesada' | 'escudo'
   - Leves: vestir/remover é ação completa. Não impedem Destreza na Defesa.
   - Pesadas: vestir/remover demora 5 minutos. NÃO aplica Destreza na
     Defesa, deslocamento –3m, e dormir com ela deixa fatigado pelo dia.
   - Escudos: colocar/tirar é ação de movimento. Pode usar com armadura
     (bônus acumula), mas não dois escudos ao mesmo tempo.

   bonusDefesa: número, bônus na Defesa.
   penalidadeArmadura: número (negativo ou 0) — aplicado em testes de
   Acrobacia, Furtividade, Ladinagem e Atletismo (natação). Penalidades
   de armadura e escudo se acumulam entre si.
   espacos: espaço de carga que a armadura/escudo ocupa.
============================================================ */

const ARMADURAS = [

  // ══════════════════════ ARMADURAS LEVES ══════════════════════

  {
    id: 'armadura-acolchoada', nome: 'Armadura Acolchoada', categoria: 'leve',
    preco: 'T$ 5', bonusDefesa: 1, penalidadeArmadura: 0, espacos: 2,
    descricao: 'Uma túnica almofadada feita em linho ou lã. É a armadura mais leve, mas protege todo o corpo, fornecendo +2 em Fortitude.',
  },
  {
    id: 'armadura-de-couro', nome: 'Armadura de Couro', categoria: 'leve',
    preco: 'T$ 20', bonusDefesa: 2, penalidadeArmadura: 0, espacos: 2,
    descricao: 'O peitoral desta armadura é feito de couro curtido em óleo fervente, para ficar mais rígido, enquanto as demais partes são feitas de couro flexível.',
  },
  {
    id: 'couro-batido', nome: 'Couro Batido', categoria: 'leve',
    preco: 'T$ 35', bonusDefesa: 3, penalidadeArmadura: -1, espacos: 2,
    descricao: 'Versão mais pesada da armadura de couro, reforçada com rebites de metal.',
  },
  {
    id: 'gibao-de-peles', nome: 'Gibão de Peles', categoria: 'leve',
    preco: 'T$ 25', bonusDefesa: 4, penalidadeArmadura: -3, espacos: 2,
    descricao: 'Usada principalmente por bárbaros e selvagens, esta armadura é formada por várias camadas de peles e couro de animais.',
  },
  {
    id: 'couraca', nome: 'Couraça', categoria: 'leve',
    preco: 'T$ 500', bonusDefesa: 5, penalidadeArmadura: -4, espacos: 2,
    descricao: 'A mais robusta das armaduras leves, formada por uma placa metálica que protege o peito e as costas, presa sobre um casaco de couro.',
  },

  // ══════════════════════ ARMADURAS PESADAS ══════════════════════

  {
    id: 'brunea', nome: 'Brunea', categoria: 'pesada',
    preco: 'T$ 50', bonusDefesa: 5, penalidadeArmadura: -2, espacos: 5,
    descricao: 'Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe. Por ser barata de produzir, é a armadura mais utilizada no Reinado por soldados de infantaria e guardas de castelo.',
  },
  {
    id: 'cota-de-malha', nome: 'Cota de Malha', categoria: 'pesada',
    preco: 'T$ 150', bonusDefesa: 6, penalidadeArmadura: -2, espacos: 5,
    descricao: 'Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente, que vai até os joelhos.',
  },
  {
    id: 'loriga-segmentada', nome: 'Loriga Segmentada', categoria: 'pesada',
    preco: 'T$ 250', bonusDefesa: 7, penalidadeArmadura: -3, espacos: 5,
    descricao: 'Composta por tiras horizontais de metal, esta armadura pesada é muito utilizada por legionários do Império de Tauron.',
  },
  {
    id: 'meia-armadura', nome: 'Meia Armadura', categoria: 'pesada',
    preco: 'T$ 600', bonusDefesa: 8, penalidadeArmadura: -4, espacos: 5,
    descricao: 'Uma cota de malha reforçada com placas de metal.',
  },
  {
    id: 'armadura-completa', nome: 'Armadura Completa', categoria: 'pesada',
    preco: 'T$ 3.000', bonusDefesa: 10, penalidadeArmadura: -5, espacos: 5,
    descricao: 'A mais forte e pesada das armaduras, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Inclui uma túnica acolchoada para ser usada sob as placas. Correias e fivelas distribuem o peso da armadura pelo corpo inteiro. Esta armadura precisa ser feita sob medida para cada usuário; um ferreiro cobra T$ 200 para adaptar uma armadura completa a um novo usuário.',
  },

  // ══════════════════════ ESCUDOS ══════════════════════

  {
    id: 'escudo-leve', nome: 'Escudo Leve', categoria: 'escudo',
    preco: 'T$ 5', bonusDefesa: 1, penalidadeArmadura: -1, espacos: 1,
    descricao: 'Tipicamente feito de madeira, este escudo é amarrado no antebraço, deixando a mão livre. Você pode carregar um objeto na mão que empunha o escudo, mas não manusear uma arma.',
  },
  {
    id: 'escudo-pesado', nome: 'Escudo Pesado', categoria: 'escudo',
    preco: 'T$ 15', bonusDefesa: 2, penalidadeArmadura: -2, espacos: 2,
    descricao: 'Normalmente feito de aço, este escudo é preso ao antebraço e também deve ser empunhado com firmeza, impedindo o usuário de usar aquela mão.',
  },

];

if (typeof window !== 'undefined') window.ARMADURAS = ARMADURAS;
