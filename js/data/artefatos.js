/* ============================================================
   TORMENTA 20 — artefatos.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 345-349 (Artefatos)

   Artefatos são itens mágicos únicos e lendários — o livro é
   explícito: "Não há tabelas para geração aleatória de artefatos,
   nem custo para fabricá-los. Esses itens devem entrar em uma
   campanha apenas por decisão deliberada do mestre." Por isso não
   têm preço nem CD de fabricação, ao contrário de todo o resto do
   capítulo de Itens Mágicos.

   Cada entrada:
   { id, nome, descricao, tabela? }

   tabela (só o Baralho do Caos tem): {colunas, linhas}, reaproveitando
   o mesmo formato/render de outras tabelas do site (Vidência, Animar
   Objetos em magias.js) — as 22 cartas do d% embutido no artefato.
============================================================ */

const ARTEFATOS = [

  {
    id: 'espada-deus', nome: 'A Espada-Deus',
    descricao: 'Poucos duvidam: as divindades estão presentes em cada aspecto da vida em Arton. Uma das provas disso é a capacidade dos mortais de se tornarem deuses menores. Contudo, tão forte é o poder divino que até mesmo objetos podem ser deuses. A Espada-Deus não é um objeto sagrado — não é poderosa porque foi abençoada por um deus. A espada-deus é, ela própria, cultuada. Ela oferece bênçãos, possui clérigos, ouve preces.\n\nA Espada-Deus é a melhor arma já forjada por Rhond, o Deus Menor das Armas. Foi empunhada por incontáveis heróis e vilões, mas os nomes desses mortais foram esquecidos — a arma é maior que todos. Após ser usada por algum tempo, sempre acaba em algum local inóspito de onde só pode ser tirada por um mortal digno. A arma foi vista pela última vez nas mãos de Orion Drake, na batalha contra a Tormenta em Tamu-ra.\n\nMecanicamente, a Espada-Deus é uma espada longa atroz precisa pungente ameaçadora magnífica veloz, com dano básico de 2d12. Seu fio é tão fino que corta em todos os Planos de existência simultaneamente — a arma ignora redução de dano e seus acertos críticos afetam até mesmo criaturas imunes a acertos críticos. A Espada-Deus é indestrutível. Quando há chance de combate, ela vibra na mão do usuário ou mesmo na bainha. Apenas personagens com pelo menos 15 níveis em classes com Luta como perícia inicial podem usá-la — os demais erram todos os ataques com a arma. Quando está aguardando seu próximo usuário, a Espada-Deus não permite que um personagem que não cumpra esse pré-requisito a tire de onde está.\n\nFisicamente, a Espada-Deus é surpreendentemente simples: cabo forrado de couro, guarda-mão de metal sem adornos, lâmina lisa. Seu poder real não se revela na aparência — apenas na luta.',
  },
  {
    id: 'joia-da-alma', nome: 'A Joia da Alma',
    descricao: 'No princípio não havia deuses. Nem vida, nem mundo, nem mesmo o próprio tempo. Foi em meio à não existência que o Nada e o Vazio se casaram e deram origem à Criação e tudo que a compõe — o mundo de Arton. Engana-se, porém, quem pensa que nenhum vestígio restou da aurora do universo. Há uma fagulha, um resíduo da inexistência que se manifesta na forma de uma gema preciosa que ainda hoje busca cumprir o propósito de sua essência. Os mortais a chamam de Joia da Alma.\n\nÉ tênue a linha entre a existência e a não existência. Perdida em um ambiente que não o seu, a Joia da Alma busca transpor essa barreira, vasculhando a memória daqueles que a tocam em busca de falhas na realidade que possa usar como meio para se reunir ao outro lado. Não é capaz de impor uma ação aos seres de carne e osso, mas se alimenta daquilo que enxerga — o que torna o contato prolongado algo perigoso, capaz de causar danos irreparáveis ao espírito do portador.\n\nQualquer um que toque a Joia da Alma terá seu passado esmiuçado pela pedra, recuperando instantaneamente todas as memórias de sua vida, boas e ruins, desde o nascimento até agora — muitas vezes de forma dolorosa. O portador mantém todas as lembranças enquanto segurar a joia; ao soltá-la, as memórias retornam ao esquecimento.\n\nMecanicamente, portar a Joia da Alma fornece +3 em Inteligência (somente após um dia de uso). É cobiçada por arcanistas que memorizam magias, pois impede que elas sumam da memória — para magos, o custo para lançar magias arcanas diminui para 0 PM (custos de aprimoramentos ainda precisam ser pagos).\n\nEmpunhar a Joia da Alma exige um teste de Vontade (CD 25). Se falhar, o personagem fica atordoado por uma rodada e larga o artefato no chão. Se passar, consegue segurá-la sem efeitos colaterais — mas precisa repetir o teste no início de cada dia, com a CD aumentando cumulativamente em +1 por dia. Se falhar, fica frustrado; se falhar de novo, fica esmorecido; num terceiro teste falho, sua sanidade se esvai — se for um personagem jogador, torna-se um NPC sob controle do mestre. A Joia não foi feita para ser empunhada por mortais.\n\nFisicamente, a Joia da Alma é uma gema indestrutível e semitransparente, lapidada com vinte faces iguais — as mesmas faces dos vinte deuses primordiais, cujo nascimento ela presenciou.',
  },
  {
    id: 'baralho-do-caos', nome: 'O Baralho do Caos',
    descricao: 'Este artefato parece um baralho comum, com cartas bastante gastas. Ele pode ser usado para jogos como wyrt e fornece +10 em testes de Jogatina para seu usuário — mas caso ele abuse da sorte, o bônus se transforma em uma penalidade de –10 (o mestre decide o que é "abusar da sorte").\n\nPorém, o verdadeiro poder do Baralho do Caos se revela quando um personagem diz "Eu aposto tudo" e saca de uma a quatro cartas, a sua escolha. O artefato muda para ter 22 cartas, cada uma com um símbolo específico. As cartas devem ser sacadas ao mesmo tempo e seus efeitos acontecem instantaneamente — para o bem ou para o mal. Role 1d% na tabela abaixo para cada carta sacada (role novamente resultados repetidos). Um personagem treinado em Jogatina pode fazer um teste (CD 30) para ignorar uma carta que não queira e sacar outra no lugar (apenas uma vez).\n\nQuando é usado dessa forma, o Baralho do Caos desaparece, para reaparecer em uma mesa de jogo qualquer de Arton — já apareceu nas mais imundas tavernas portuárias e nos mais elegantes salões de palácios, transformando mendigos em reis e reis em mendigos.',
    tabela: {
      colunas: ['d%', 'Carta', 'Efeito'],
      linhas: [
        ['01-05', 'Abismo', 'Recebe redução de dano 10 a um tipo definido aleatoriamente'],
        ['06-09', 'Amigo', 'Um parceiro racional o trai no pior momento possível, em até um ano'],
        ['10-14', 'Anel', '+5 pontos de mana permanentemente'],
        ['15-19', 'Árvore', '+10 pontos de vida permanentemente'],
        ['20-24', 'Coração', '+1 em um atributo a sua escolha, permanentemente'],
        ['25-28', 'Crânio', 'Enfrenta uma cópia sombria de si mesmo (mesmas estatísticas, imune a ataques de outros)'],
        ['29-33', 'Donzela', 'Derrota um monstro (ND = seu nível –1) e sobe de nível, ou fica inconsciente se perder'],
        ['34-38', 'Fogo', 'Ressuscita com PV/PM restaurados na próxima vez que morrer'],
        ['39-43', 'Gema', 'Recebe tesouro mundano (role 10x na coluna "Maior" da Tabela 8-2: Riquezas)'],
        ['44-48', 'Lua', 'Recebe de 1 a 4 Desejos (Lua cheia/nova/crescente/minguante), a usar até o fim da cena'],
        ['49-52', 'Martelo', 'Perde todos os itens mágicos que possui'],
        ['53-56', 'Noite', '–1 permanente em todos os testes de resistência (devotos de Tenebra/mortos-vivos rolam uma arma mágica maior em vez disso)'],
        ['57-60', 'Presas', 'Todo o dinheiro e itens mundanos que possui (mesmo os que não estão com você) viram pó'],
        ['61-65', 'Servo', 'Recebe os serviços de um parceiro veterano (um servo com dívida de honra), a sua escolha de tipo'],
        ['66-70', 'Sol', 'Recebe uma arma mágica maior (devotos de Tenebra/mortos-vivos sofrem –1 permanente em resistência em vez disso)'],
        ['71-75', 'Tentáculo', '–1 permanente em um atributo aleatório (role 1d6: 1=Força, 2=Destreza...)'],
        ['76-80', 'Tolo', 'Perde 10.000 XP (mínimo 0) e saca outra carta'],
        ['81-85', 'Trono', '+2 permanente em Diplomacia e torna-se senhor de um pequeno feudo (poder Título, do cavaleiro)'],
        ['86-90', 'Vizir', 'Recebe a resposta verdadeira para uma pergunta qualquer, a usar em até um ano'],
        ['91-94', 'Nada', 'Anula qualquer ataque ou efeito contra você e ganha imunidade a tudo por 1 rodada, a usar em até um ano'],
        ['95-98', 'Vazio', 'Sua alma é transportada pro vazio entre os Planos — o corpo fica em coma até ser resgatado'],
        ['99-100', 'Curinga', 'Escolhe entre ganhar 10.000 XP ou sacar mais duas cartas'],
      ],
    },
  },
  {
    id: 'olho-de-sszzaas', nome: 'O Olho de Sszzaas',
    descricao: 'Como parte de seu plano para retornar ao Panteão, o deus Sszzaas removeu um de seus próprios olhos para forjar um artefato — o Olho de Sszzaas, uma gema esverdeada segura por um cajado de madeira fossilizada. As extremidades do cajado são ligadas por uma corrente, cujo comprimento pode variar magicamente.\n\nCultistas de Sszzaas foram encarregados de esconder o artefato em um templo nas proximidades de Lenórienn, onde deveria ser encontrado pela pessoa certa. O portador da peça acreditaria ser capaz de usar magia poderosa, quando na verdade estaria servindo aos interesses do Grande Corruptor. De fato, o Olho carrega parte da consciência do próprio Sszzaas, que testemunha e manipula tudo à distância.\n\nMecanicamente, o cajado permite ao personagem lançar qualquer magia que conheça ou tenha ouvido falar — seja arcana ou divina — como se fosse uma habilidade mágica, sem precisar gastar pontos de mana. O personagem ainda pode usar aprimoramentos, mas precisa pagar por eles. Lançar uma magia exige um teste de Misticismo (CD 20 + o custo em PM da magia, incluindo aprimoramentos). Se o teste falhar, a magia não funciona ou provoca algum efeito imprevisível (alvo trocado, efeito invertido, Teletransporte para um local diferente...) ou assim parece — na verdade, sempre que uma magia "falha", isso quer dizer que Sszzaas está no controle, e as coisas estão saindo exatamente como ele planejou, seguindo algum plano intrincado e desconhecido pelo portador do cajado.\n\nApesar de poderoso, o Olho de Sszzaas é uma peça pouco conhecida. Reconhecê-lo e descobrir como usá-lo exige um teste de Conhecimento (CD 30).',
  },
  {
    id: 'rubis-da-virtude', nome: 'Os Rubis da Virtude',
    descricao: 'Criados para selar um pacto entre os deuses do Panteão, os Rubis da Virtude quase foram a causa de sua morte. Cada um, se destruído, destruiria também o deus que estivesse secretamente ligado a ele — sem que fosse possível descobrir qual rubi pertencia a quem. Entregues a cada deus após sua criação, seriam mantidos como provas de confiança, garantias de que os deuses, mesmo aqueles envolvidos em disputas, jamais tentariam destruir uns aos outros.\n\nAs gemas não podem ser danificadas por mortais ou mesmo por deuses menores — apenas um deus do Panteão pode destruí-las. Além disso, não podem ser detectadas por meios mágicos.\n\nMesmo sem saber a quem estava ligada, cada deus guardou em lugar seguro a gema em sua posse. No entanto, conseguindo o que parecia ser impossível, Sszzaas — o mais traiçoeiro e furtivo dos seres — roubou todos os rubis. Ele foi descoberto e julgado antes de descobrir como utilizá-los, mas teve tempo de escondê-los em Arton. E os Rubis, protegidos de qualquer detecção mágica, não puderam ser encontrados. Como castigo, Sszzaas foi transformado em avatar e condenado a vagar pelo mundo até ser destruído ou aceito de volta. Os Rubis estavam desaparecidos, mas nenhum mortal poderia danificá-los — mesmo assim, para evitar riscos, Khalmyr decretou que as ligações vitais entre os rubis e os deuses fossem rompidas.\n\nMesmo sem essa conexão, as gemas ainda eram poderosas, pois traziam parte da essência divina dos vinte deuses. Sabendo que poderia utilizá-las de alguma forma, Sszzaas tratou de mantê-las longe dos olhos dos deuses, até o último instante.\n\nMecanicamente, cada Rubi da Virtude fornece a seu portador um nível de experiência em uma classe que ele já possua. Para isso, a gema deve ser incrustada no corpo da criatura, o que exige um teste de Cura (CD 25) — o efeito leva um dia para se manifestar. Por sua invulnerabilidade, cada Rubi fornece redução de dano 2 e +1 em testes de resistência, cumulativos com efeitos já existentes, incluindo outros rubis. Por fim, por sua indetectabilidade, cada rubi torna o portador mais difícil de observar por meios mágicos — um conjurador que lance uma magia de adivinhação contra o portador de um destes artefatos deve passar em um teste de Misticismo (CD 30 + a quantidade de rubis) ou a magia não terá efeito.',
  },

];

if (typeof window !== 'undefined') window.ARTEFATOS = ARTEFATOS;
