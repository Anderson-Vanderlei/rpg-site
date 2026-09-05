/* ============================================================
   TORMENTA 20 — acessorios.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 8: Recompensas, pp. 341-345 (Acessórios)

   Todo item mágico que não é arma, armadura, escudo, poção ou
   pergaminho é um acessório. Diferente de armas/armaduras mágicas,
   acessórios são sempre ITENS ESPECÍFICOS (nomeados, com efeito e
   preço fixos) — não recebem "encantos" escolhidos livremente.

   Cada entrada:
   { id, nome, categoria: 'menor'|'medio'|'maior', preco, descricao, fonte?, pagina? }

   Categoria define a CD de fabricação (Ofício-artesão): menor CD 30,
   médio CD 40, maior CD 50 — mesma regra dos itens específicos de
   armas/armaduras (não repetida aqui campo a campo).

   fonte/pagina: OPCIONAIS — ausentes em todo acessório do livro-base
   (a badge de fonte assume 'Tormenta 20' quando o campo não existe).
   Só aparecem num item vindo de outro livro-fonte (ex.: Braceletes
   das Escamas, Guia de NPCs).
============================================================ */

const ACESSORIOS = [

  // ══════════════════════ MENORES (T$ 3.000 – 9.000) ══════════════════════

  { id: 'anel-do-sustento', nome: 'Anel do Sustento', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Você não precisa comer ou beber e precisa dormir apenas duas horas por noite para descansar. Os efeitos do anel só se ativam após uma semana de uso.' },
  { id: 'bainha-magica', nome: 'Bainha Mágica', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Esta bainha de couro curtido e prata muda de tamanho para acomodar qualquer arma corpo a corpo. Você pode lançar Arma Mágica em qualquer arma na bainha sem pagar seu custo em PM.' },
  { id: 'corda-da-escalada', nome: 'Corda da Escalada', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Esta corda de 15m é bastante fina, mas forte o suficiente para suportar até seis criaturas Médias (ou 120 espaços). Com um comando (uma ação de movimento), a corda se move em qualquer direção (incluindo para cima) a 3m por rodada, fixando-se firmemente onde você quiser. Ela pode se desamarrar e voltar da mesma forma.' },
  { id: 'ferraduras-da-velocidade', nome: 'Ferraduras da Velocidade', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Este conjunto de ferraduras pode ser fixado nos cascos de um cavalo (ou outro parceiro montaria, a critério do mestre) para aumentar seu deslocamento em +3m.' },
  { id: 'garrafa-da-fumaca-eterna', nome: 'Garrafa da Fumaça Eterna', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Você pode abrir a tampa desta ânfora de metal para lançar a magia Névoa sem pagar seu custo em PM. A fumaça persiste até a garrafa ser tampada. Após isso, dissipa-se no fim da cena (ou após 4 rodadas, sob vento forte, ou 1 rodada, sob um vendaval).' },
  { id: 'gema-da-luminosidade', nome: 'Gema da Luminosidade', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Este cristal tem a aparência de um longo prisma. Com um comando, emite luz equivalente a uma tocha ou então um raio brilhante, que deixa uma criatura em alcance curto cega por 1d4 rodadas (Fortitude CD Carisma evita).' },
  { id: 'manto-elfico', nome: 'Manto Élfico', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Indistinguível de um manto cinza comum. Entretanto, quando usado com o capuz cobrindo o rosto, fornece +5 em Furtividade.' },
  { id: 'mochila-de-carga', nome: 'Mochila de Carga', categoria: 'menor', preco: 'T$ 3.000',
    descricao: 'Este item, que parece uma simples mochila de pano, está na verdade ligado a um espaço interdimensional — fazendo com que seja maior por dentro do que por fora. A mochila de carga aumenta sua capacidade de carga em 10 espaços (ela própria não gasta um espaço). Se a mochila for rasgada, os objetos em seu interior são destruídos. Criaturas vivas colocadas no interior da mochila podem sobreviver até 10 minutos, mas depois disso ficarão sem ar.' },
  { id: 'brincos-da-sagacidade', nome: 'Brincos da Sagacidade', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Este par de brincos de safira aguça o raciocínio. Você recebe +1 em Inteligência (somente após um dia de uso).' },
  { id: 'luvas-da-delicadeza', nome: 'Luvas da Delicadeza', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Estas luvas de tecido fino permitem manipulação delicada. Você recebe +1 em Destreza (somente após um dia de uso).' },
  { id: 'manoplas-da-forca-do-ogro', nome: 'Manoplas da Força do Ogro', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Este par de luvas é feito de couro grosso com rebites de ferro. Você recebe +1 em Força (somente após um dia de uso).' },
  { id: 'manto-da-resistencia', nome: 'Manto da Resistência', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Este manto de tecido grosso e pesado protege seu usuário. Você recebe +2 em testes de resistência.' },
  { id: 'manto-do-fascinio', nome: 'Manto do Fascínio', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Este manto de veludo possui bordados de ouro. Você recebe +1 em Carisma (somente após um dia de uso).' },
  { id: 'pingente-da-sensatez', nome: 'Pingente da Sensatez', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'Esta pequena pérola com uma corrente leve é usada como um colar. Você recebe +1 em Sabedoria (somente após um dia de uso).' },
  { id: 'torque-do-vigor', nome: 'Torque do Vigor', categoria: 'menor', preco: 'T$ 4.500',
    descricao: 'O acabamento deste colar ou bracelete remete a um animal poderoso, como um urso ou lobo. Você recebe +1 em Constituição (somente após um dia de uso).' },
  { id: 'chapeu-do-disfarce', nome: 'Chapéu do Disfarce', categoria: 'menor', preco: 'T$ 6.000',
    descricao: 'Você pode lançar Disfarce Ilusório (CD Carisma), com o aprimoramento que inclui odores e sensações e muda o bônus em Enganação para disfarces para +20, sem pagar seu custo em PM. Você não pode usar outros aprimoramentos. Como parte do disfarce, o chapéu pode mudar para um elmo, faixa, tiara, gorro, touca e assim por diante.' },
  { id: 'flauta-fantasma', nome: 'Flauta Fantasma', categoria: 'menor', preco: 'T$ 6.000',
    descricao: 'Se for treinado em Atuação, você pode lançar Esculpir Sons (CD Carisma) sem pagar seu custo em PM.' },
  { id: 'lanterna-da-revelacao', nome: 'Lanterna da Revelação', categoria: 'menor', preco: 'T$ 6.000',
    descricao: 'Este item funciona como um lampião normal, mas sua luz revela todas as criaturas e objetos invisíveis no alcance.' },
  { id: 'anel-da-protecao', nome: 'Anel da Proteção', categoria: 'menor', preco: 'T$ 9.000',
    descricao: 'Este anel desvia ataques contra seu usuário. Você recebe +2 de Defesa.' },
  { id: 'anel-do-escudo-mental', nome: 'Anel do Escudo Mental', categoria: 'menor', preco: 'T$ 9.000',
    descricao: 'Você recebe imunidade a magias de adivinhação.' },
  { id: 'pingente-da-saude', nome: 'Pingente da Saúde', categoria: 'menor', preco: 'T$ 9.000',
    descricao: 'O usuário desta joia verde em um cordão de prata recebe imunidade a doenças e venenos. Os efeitos só se ativam após uma semana de uso.' },

  // ══════════════════════ MÉDIOS (T$ 10.500 – 25.500) ══════════════════════

  { id: 'anel-de-telecinesia', nome: 'Anel de Telecinesia', categoria: 'medio', preco: 'T$ 10.500',
    descricao: 'Você pode lançar Telecinesia (CD Inteligência). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.' },
  { id: 'bola-de-cristal', nome: 'Bola de Cristal', categoria: 'medio', preco: 'T$ 10.500',
    descricao: 'Esta pequena esfera revela pessoas e lugares distantes. Olhar através dela é uma ação completa e gera a magia Vidência (CD Sabedoria).' },
  { id: 'caveira-maldita', nome: 'Caveira Maldita', categoria: 'medio', preco: 'T$ 10.500',
    descricao: 'Esta pedra esculpida em formato de crânio gera o efeito da magia Profanar, com o crânio como ponto de origem. Mortos-vivos e devotos de deuses que canalizam apenas energia negativa na área de efeito recebem +2 em testes e Defesa.' },
  { id: 'botas-aladas', nome: 'Botas Aladas', categoria: 'medio', preco: 'T$ 15.000',
    descricao: 'Você pode gastar 2 PM para fazer asas brotarem dos calcanhares destas botas e receber deslocamento de voo 12m por uma rodada. Você pode gastar 1 PM no início de cada um de seus turnos para manter esse efeito.' },
  { id: 'braceletes-de-bronze', nome: 'Braceletes de Bronze', categoria: 'medio', preco: 'T$ 16.500',
    descricao: 'Estes braceletes geram um campo de força invisível, porém tangível. Você recebe +4 na Defesa, cumulativo com outros itens mágicos, mas não com armaduras.' },
  { id: 'anel-da-energia', nome: 'Anel da Energia', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Você recebe +5 PM (somente após um dia de uso).' },
  { id: 'anel-da-vitalidade', nome: 'Anel da Vitalidade', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Você recebe +10 PV (somente após um dia de uso).' },
  { id: 'anel-de-invisibilidade', nome: 'Anel de Invisibilidade', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Ao colocar este anel de prata, você fica sob efeito de Invisibilidade. O efeito termina se você fizer um ataque ou lançar uma magia ofensiva, mas você pode tirar e recolocar o anel (uma ação padrão) para que ele volte a funcionar.' },
  { id: 'bracadeiras-do-arqueiro', nome: 'Braçadeiras do Arqueiro', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Você recebe +2 em rolagens de dano com armas de ataque à distância (cumulativo com outros itens).' },
  { id: 'brincos-de-marah', nome: 'Brincos de Marah', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Este par de brincos brancos é abençoado pela Deusa da Paz. A primeira criatura que o atacar em uma cena deve fazer um teste de Vontade (CD Carisma). Se falhar, perderá a ação. Se você atacar uma criatura, o efeito dos brincos é cancelado por um dia. Se você possuir Aparência Inofensiva (ou um poder similar) os efeitos acumulam, afetando as duas primeiras criaturas que o atacarem em uma cena.' },
  { id: 'faixas-do-pugilista', nome: 'Faixas do Pugilista', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Estas faixas surradas são amarradas nos punhos, nos braços ou na testa. Você recebe +2 em testes de ataque e rolagens de dano com ataques desarmados (cumulativo com outros itens).' },
  { id: 'manto-da-aranha', nome: 'Manto da Aranha', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Este manto é feito de seda negra com fios de prata bordados. Você recebe deslocamento de escalada igual ao seu deslocamento terrestre, +5 em testes de resistência contra venenos e imunidade a teias mundanas ou mágicas. Além disso, pode lançar Teia (CD Destreza). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.' },
  { id: 'vassoura-voadora', nome: 'Vassoura Voadora', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Como um tapete voador, mas pode carregar duas pessoas (ou 40 espaços).' },
  { id: 'simbolo-abencoado', nome: 'Símbolo Abençoado', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Conta como um símbolo sagrado. Se você for devoto do deus, o custo de suas magias divinas diminui em –1 PM (cumulativo com o poder Símbolo Sagrado Energizado). Apenas devotos desse deus podem fabricar um símbolo abençoado.' },
  { id: 'amuleto-da-robustez', nome: 'Amuleto da Robustez', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Este disco com corrente de ouro é usado como um colar. Você recebe +2 em Constituição (somente após um dia de uso).' },
  { id: 'botas-velozes', nome: 'Botas Velozes', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Você recebe +3m em seu deslocamento e pode lançar Velocidade (apenas sobre você mesmo).' },
  { id: 'cinto-da-forca-do-gigante', nome: 'Cinto da Força do Gigante', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Este cinto largo é feito de couro com rebites de ferro. Você recebe +2 em Força (somente após um dia de uso).' },
  { id: 'coroa-majestosa', nome: 'Coroa Majestosa', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Esta coroa de ouro possui dezenas de pedras preciosas. Você recebe +2 em Carisma (somente após um dia de uso).' },
  { id: 'estola-da-serenidade', nome: 'Estola da Serenidade', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Esta faixa de pano com inscrições mágicas é usada sobre a nuca, com as duas extremidades caindo na frente do corpo. Você recebe +2 em Sabedoria (somente após um dia de uso).' },
  { id: 'manto-do-morcego', nome: 'Manto do Morcego', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Este manto marrom escuro ou negro fornece +5 em Furtividade e permite que você fique pendurado de ponta-cabeça no teto, como um morcego. Além disso, você pode gastar uma ação padrão para segurar as pontas do manto e se transformar em um morcego. Seu tamanho muda para Minúsculo e você recebe deslocamento de voo 12m e uma arma natural de mordida (dano 1d4, perfuração). Em outros aspectos, isso funciona como a Forma Selvagem do druida. Você só pode se transformar em morcego à noite ou em ambientes escuros.' },
  { id: 'pulseiras-da-celeridade', nome: 'Pulseiras da Celeridade', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Esta pulseira de platina aguça todos os seus movimentos. Você recebe +2 em Destreza (somente após um dia de uso).' },
  { id: 'tiara-da-sapiencia', nome: 'Tiara da Sapiência', categoria: 'medio', preco: 'T$ 25.500',
    descricao: 'Esta tiara delicada possui uma gema que descansa sobre a testa. Você recebe +2 em Inteligência (somente após um dia de uso).' },
  { id: 'braceletes-das-escamas', nome: 'Braceletes das Escamas', categoria: 'medio', preco: 'T$ 21.000',
    descricao: 'Criados por Acteia, uma das Obras das Irmãs (presentes de Kallyadranoch), estes braceletes de aço escurecido são entalhados de forma a parecer escamas de dragão. Fornecem redução de dano 5 e contam como uma luva de ferro. Os poderes mágicos deste item só funcionam com devotos de Kallyadranoch.',
    fonte: 'Guia de NPCs' },
  { id: 'face-draconica', nome: 'Face Dracônica', categoria: 'medio', preco: 'T$ 25.000',
    descricao: 'Esta máscara dourada, semelhante ao rosto estilizado de um dragão, fortalece o poder arcano do usuário. Fruto do poder de Ilítia, uma das Obras das Irmãs (presentes de Kallyadranoch), fornece +2 na CD para resistir a suas habilidades mágicas (incluindo magias) e conta como um medalhão de prata. Os poderes mágicos deste item só funcionam com devotos de Kallyadranoch.',
    fonte: 'Guia de NPCs' },

  // ══════════════════════ MAIORES (T$ 30.000 – 150.000) ══════════════════════

  { id: 'elmo-do-teletransporte', nome: 'Elmo do Teletransporte', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Você pode lançar Salto Dimensional e Teletransporte, mas apenas em você mesmo. Caso já conheça as magias, o custo para lançá-las diminui em –1 PM.' },
  { id: 'gema-da-telepatia', nome: 'Gema da Telepatia', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Você pode lançar Compreensão e Enfeitiçar (CD Carisma) sem pagar seu custo em PM.' },
  { id: 'gema-elemental', nome: 'Gema Elemental', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Você pode lançar Conjurar Elemental sem pagar seu custo em PM.' },
  { id: 'manual-da-saude-corporal', nome: 'Manual da Saúde Corporal', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este tomo volumoso contém exercícios de resistência e dietas saudáveis, mas suas palavras trazem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Constituição.' },
  { id: 'manual-do-bom-exercicio', nome: 'Manual do Bom Exercício', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este tomo volumoso contém exercícios de musculação, mas escondido entre as palavras há um poderoso efeito mágico. Ler o livro leva uma semana e aumenta seu valor de Força em +1 permanentemente (o atributo só pode ser aumentado uma vez com um Manual). Assim que o livro é lido, a magia desaparece de suas páginas e ele se torna um item mundano.' },
  { id: 'manual-dos-movimentos-precisos', nome: 'Manual dos Movimentos Precisos', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este tomo volumoso descreve exercícios de coordenação e equilíbrio, mas mesclado às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Destreza.' },
  { id: 'medalhao-de-lena', nome: 'Medalhão de Lena', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Quando você é reduzido a 0 ou menos PV, esta joia emite uma explosão de energia positiva que cura 100 PV (antes que você caia). Este poder só se ativa uma vez por dia.' },
  { id: 'tomo-da-compreensao', nome: 'Tomo da Compreensão', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este livro volumoso contém ensinamentos para tornar o leitor mais centrado e aguçar sua percepção, mas também possui um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Sabedoria.' },
  { id: 'tomo-da-lideranca-e-influencia', nome: 'Tomo da Liderança e Influência', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este livro de encadernação luxuosa contém instruções detalhadas para convencer e inspirar os demais, mas as páginas escondem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Carisma.' },
  { id: 'tomo-dos-grandes-pensamentos', nome: 'Tomo dos Grandes Pensamentos', categoria: 'maior', preco: 'T$ 30.000',
    descricao: 'Este livro pesado contém exercícios para aprimorar o raciocínio e a memória, mas mesclado às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Inteligência.' },
  { id: 'anel-refletor', nome: 'Anel Refletor', categoria: 'maior', preco: 'T$ 51.000',
    descricao: 'Este aro de platina é poderoso contra conjuradores. Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao seu conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela.' },
  { id: 'cinto-do-campeao', nome: 'Cinto do Campeão', categoria: 'maior', preco: 'T$ 51.000',
    descricao: 'Este cinturão de ouro é cravejado de joias e possui gravuras de gladiadores e pugilistas minotauros. Você recebe +1 em Força e a habilidade Briga (somente após um dia de uso). Caso já a possua, seu dano desarmado será calculado como se você possuísse quatro níveis de lutador a mais (máximo 2d12). Por fim, caso possua o poder Torcida, o bônus que você recebe por ele aumenta para +3. Estes cintos eram dados aos vencedores dos jogos gladiatoriais do Império de Tauron.' },
  { id: 'colar-guardiao', nome: 'Colar Guardião', categoria: 'maior', preco: 'T$ 51.000',
    descricao: 'Este diamante lapidado preso em uma corrente de platina deflete ataques contra seu usuário. Você recebe +5 na Defesa.' },
  { id: 'estatueta-animista', nome: 'Estatueta Animista', categoria: 'maior', preco: 'T$ 51.000',
    descricao: 'Esta estatueta de pedra é esculpida na forma de um animal. Quando é atirada no chão e a palavra de comando é proferida, transforma-se no animal correspondente. O animal fornece os benefícios de um parceiro veterano até o fim da cena, quando então volta à sua forma de estatueta. O tipo de parceiro é definido pelo animal: raposa (ajudante; perícias definidas na fabricação do item), onça (assassino), águia (atirador), lobo (combatente), leão (fortão) ou urso (guardião).' },
  { id: 'anel-da-liberdade', nome: 'Anel da Liberdade', categoria: 'maior', preco: 'T$ 60.000',
    descricao: 'Forjado em ouro, este anel é uma relíquia da Igreja de Valkaria. Você fica permanentemente sob efeito de Libertação.' },
  { id: 'tapete-voador', nome: 'Tapete Voador', categoria: 'maior', preco: 'T$ 60.000',
    descricao: 'Com um comando, este tapete flutua, fornecendo deslocamento de voo 12m. O tapete tem 3m x 3m e pode carregar seis criaturas Médias (ou 120 espaços). Se você estiver em alcance longo do tapete, pode comandar o voo dele.' },
  { id: 'braceletes-de-ouro', nome: 'Braceletes de Ouro', categoria: 'maior', preco: 'T$ 64.500',
    descricao: 'Como braceletes de bronze, mas fornece +8 na Defesa, não cumulativo com braceletes de bronze.' },
  { id: 'espelho-da-oposicao', nome: 'Espelho da Oposição', categoria: 'maior', preco: 'T$ 75.000',
    descricao: 'Este item lembra um espelho normal com cerca de 1m de comprimento e 1,5m de altura. Pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Quando uma criatura observa seu reflexo, o espelho cria uma cópia sua, com as mesmas habilidades e equipamento. A duplicata ataca a criatura original; quando um dos dois é derrotado, a duplicata e seus itens desaparecem.' },
  { id: 'robe-do-arquimago', nome: 'Robe do Arquimago', categoria: 'maior', preco: 'T$ 90.000',
    descricao: 'Este traje pesado alinha-se com as energias arcanas emitidas por seu usuário para gerar um campo protetor. Se você for um conjurador arcano, recebe um bônus na Defesa igual a 5 + o círculo de magia mais alto que puder lançar e um bônus em testes de resistência igual à metade do bônus na Defesa. Assim, um arcanista de 9º nível (capaz de lançar magias de 3º círculo) recebe +8 na Defesa e +4 em testes de resistência.' },
  { id: 'orbe-das-tempestades', nome: 'Orbe das Tempestades', categoria: 'maior', preco: 'T$ 97.500',
    descricao: 'Esta esfera de vidro com 20cm de diâmetro contém fumaça e raios em seu interior. Você pode lançar Controlar o Clima e Fúria do Panteão (CD Sabedoria). Caso já conheça as magias, o custo para lançá-las diminui em –1 PM. Além disso, você e todos os seus aliados adjacentes ficam sob efeito de Suporte Ambiental.' },
  { id: 'anel-da-regeneracao', nome: 'Anel da Regeneração', categoria: 'maior', preco: 'T$ 150.000',
    descricao: 'Você recebe Cura Acelerada 5 (somente após um dia de uso).' },
  { id: 'espelho-do-aprisionamento', nome: 'Espelho do Aprisionamento', categoria: 'maior', preco: 'T$ 150.000',
    descricao: 'Este item de cristal, com 1,5m de altura e moldura de metal, pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Qualquer criatura que se aproxime a alcance curto do espelho do aprisionamento e enxergue seu próprio reflexo deve passar em um teste de Reflexos (CD Inteligência) ou será transportada magicamente para um espaço extradimensional dentro do espelho, ficando presa ali. O tamanho da criatura não importa — mas construtos, mortos-vivos e objetos não podem ser transportados. Com um comando, é possível conversar com uma criatura presa no espelho ou libertá-la. Se o espelho for quebrado, todas as criaturas dentro dele são libertadas.' },

];

if (typeof window !== 'undefined') window.ACESSORIOS = ACESSORIOS;
