/* ============================================================
   TORMENTA 20 — magias.js
   Dados oficiais — Edição Jogo do Ano v1.3
   Capítulo 4: Magia, pp. 168–211

   Cada entrada:
   { id, nome, tipo, escola, circulo, execucao, alcance, alvoArea,
     duracao, resistencia, descricao, aprimoramentos: [] }

   tipo: 'arcana' | 'divina' | 'universal' — "Universal" é tag OFICIAL
   do livro (não é dedução nossa), usada quando a magia funciona igual
   pra arcanistas e divinos — uma entrada só, não duas.

   escola: 'abjuracao' | 'adivinhacao' | 'convocacao' | 'encantamento' |
   'evocacao' | 'ilusao' | 'necromancia' | 'transmutacao'

   aprimoramentos[].tipo: 'muda' | 'aumenta' | 'truque'
   aprimoramentos[].restricao: 'arcana' | 'divina' (opcional — só em magias
   'universal' cujo aprimoramento vale só pra um dos dois tipos de conjurador,
   ex: Luz tem upgrades "Apenas Arcanos" e "Apenas Divinos")
   - 'truque': custoPM sempre 0, EXCLUSIVO (não combina com nenhum outro
     aprimoramento da mesma magia — UI precisa desmarcar os outros)
   - 'aumenta': cumulativo, pode ser pago várias vezes (UI = stepper)
   - 'muda': liga/desliga uma vez só (UI = checkbox normal)

   Custo-base por círculo (Tabela 4-1, pra somar no painel):
   1º=1PM, 2º=3PM, 3º=6PM, 4º=10PM, 5º=15PM

   CAPÍTULO DE MAGIAS COMPLETO — 196 magias, Círculos 1 a 5, todos fechados.

   ⚠️ Pendências de verificação (marcadas, não inventadas):
   - Um fragmento SEM NOME e SEM DESCRIÇÃO apareceu entre "Soco de Arsenal"
     e "Sombra Assassina" (extração do Círculo 2), com só a linha de
     estatísticas e dois aprimoramentos sobrevivendo: "Execução: padrão;
     Alcance: curto; Alvo: 1 humanoide; Duração: cena; Resistência: Vontade
     parcial." + "+2 PM: aumenta o dano em +1d6." + "+5 PM: muda o tipo do
     dano para essência." Não dá pra saber a que magia pertence só por isso
     (é um padrão comum em várias magias de ataque do livro) — não incluído
     em lugar nenhum ainda, não descartado.
============================================================ */

const CUSTO_POR_CIRCULO = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };

const MAGIAS = [

  {
    id: 'abencoar-alimentos', nome: 'Abençoar Alimentos', tipo: 'divina', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'alimento para 1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você purifica e abençoa uma porção de comida ou dose de bebida. Isso torna um alimento sujo, estragado ou envenenado próprio para consumo. Além disso, se for consumido até o final da duração, o alimento oferece 5 PV temporários ou 1 PM temporário (além de quaisquer bônus que já oferecesse). Bônus de alimentação duram um dia e cada personagem só pode receber um bônus de alimentação por dia.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'o alimento é purificado (não causa nenhum efeito nocivo se estava estragado ou envenenado), mas não fornece bônus ao ser consumido.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda a duração para permanente, o alvo para 1 frasco com água e adiciona componente material (pó de prata no valor de T$ 5). Em vez do normal, cria um frasco de água benta.' },
    ],
  },
  {
    id: 'acalmar-animal', nome: 'Acalmar Animal', tipo: 'divina', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'O animal fica prestativo em relação a você. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe +10 nos testes de Adestramento e Diplomacia que fizer contra o animal. Um alvo hostil ou que esteja envolvido em um combate recebe +5 em seu teste de resistência. Se você ou seus aliados tomarem qualquer ação hostil contra o alvo, a magia é dissipada e ele retorna à atitude que tinha antes (ou piorada, de acordo com o mestre). Se tratar bem o alvo, a atitude pode permanecer mesmo após o término da magia.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para médio.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 monstro ou espírito com Inteligência –5 ou –4.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para 1 monstro ou espírito. Requer 3º círculo.' },
    ],
  },
  {
    id: 'adaga-mental', nome: 'Adaga Mental', tipo: 'arcana', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Vontade parcial',
    descricao: 'Você manifesta e dispara uma adaga imaterial contra a mente do alvo, que sofre 2d6 pontos de dano psíquico e fica atordoado por uma rodada. Se passar no teste de resistência, sofre apenas metade do dano e evita a condição. Uma criatura só pode ficar atordoada por esta magia uma vez por cena.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'você lança a magia sem gesticular ou pronunciar palavras (o que permite lançar esta magia de armadura) e a adaga se torna invisível. Se o alvo falhar no teste de resistência, não percebe que você lançou uma magia contra ele.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para um dia. Além do normal, você "finca" a adaga na mente do alvo. Enquanto a magia durar, você sabe a direção e localização do alvo, desde que ele esteja no mesmo mundo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d6.' },
    ],
  },
  {
    id: 'alarme', nome: 'Alarme', tipo: 'arcana', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'esfera com 9m de raio', duracao: '1 dia', resistencia: null,
    descricao: 'Você cria uma barreira protetora invisível que detecta qualquer criatura que tocar ou entrar na área protegida. Ao lançar a magia, você pode escolher quais criaturas podem entrar na área sem ativar seus efeitos. Alarme pode emitir um aviso telepático ou sonoro, decidido quando a magia é lançada. Um aviso telepático alerta apenas você, inclusive acordando-o se estiver dormindo, mas apenas se estiver a até 1km da área protegida. Um aviso sonoro alerta todas as criaturas em alcance longo.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para pessoal. A área é emanada a partir de você.' },
      { custoPM: 5, tipo: 'muda', efeito: 'além do normal, você também percebe qualquer efeito de adivinhação que seja usado dentro da área ou atravesse a área. Você pode fazer um teste oposto de Misticismo contra quem usou o efeito; se passar, tem um vislumbre de seu rosto e uma ideia aproximada de sua localização ("três dias de viagem ao norte", por exemplo).' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a duração para um dia ou até ser descarregada e a resistência para Vontade anula. Quando um intruso entra na área, você pode descarregar a magia. Se o intruso falhar na resistência, ficará paralisado por 1d4 rodadas. Além disso, pelas próximas 24 horas você e as criaturas escolhidas ganham +10 em testes de Sobrevivência para rastrear o intruso.' },
    ],
  },
  {
    id: 'amedrontar', nome: 'Amedrontar', tipo: 'arcana', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal ou humanoide', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'O alvo é envolvido por energias sombrias e assustadoras. Se falhar na resistência, fica apavorado por 1 rodada, depois abalado. Se passar, fica abalado por 1d4 rodadas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'alvos que falhem na resistência ficam apavorados por 1d4+1 rodadas, em vez de apenas 1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para 1 criatura.' },
      { custoPM: 5, tipo: 'muda', efeito: 'afeta todos os alvos válidos a sua escolha dentro do alcance.' },
    ],
  },
  {
    id: 'arma-espiritual', nome: 'Arma Espiritual', tipo: 'divina', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Você invoca a arma preferida de sua divindade (caso sua divindade possua uma), que surge flutuando a seu lado. Uma vez por rodada, quando você sofre um ataque corpo a corpo, pode usar uma reação para que a arma cause automaticamente 2d6 pontos de dano do tipo da arma (por exemplo, uma espada longa causa dano de corte) no oponente que fez o ataque. Esta magia se dissipa se você morrer.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, a arma o protege. Você recebe +1 na Defesa.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus na Defesa em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para sustentada. Além do normal, uma vez por rodada, você pode gastar uma ação livre para fazer a arma acertar automaticamente um alvo adjacente. Se a arma atacar, não poderá contra-atacar até seu próximo turno. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o tipo do dano para essência. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano causado pela arma em +1d6 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 5, tipo: 'muda', efeito: 'invoca duas armas, permitindo que você contra-ataque (ou ataque, se usar o aprimoramento acima) duas vezes por rodada. Requer 3º círculo.' },
    ],
  },
  {
    id: 'arma-magica', nome: 'Arma Mágica', tipo: 'universal', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 arma empunhada', duracao: 'cena', resistencia: null,
    descricao: 'A arma é considerada mágica e fornece +1 nos testes de ataque e rolagens de dano (isso conta como um bônus de encanto). Caso você esteja empunhando a arma, pode usar seu atributo-chave de magias em vez do atributo original nos testes de ataque (não cumulativo com efeitos que somam este atributo).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 2, tipo: 'muda', efeito: 'a arma causa +1d6 de dano de ácido, eletricidade, fogo ou frio, escolhido quando a magia é lançada. Este aprimoramento só pode ser usado uma vez.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o bônus de dano do aprimoramento acima para +2d6.' },
    ],
  },
  {
    id: 'armadura-arcana', nome: 'Armadura Arcana', tipo: 'arcana', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia cria uma película protetora invisível, mas tangível, fornecendo +5 na Defesa. Esse bônus é cumulativo com outras magias, mas não com bônus fornecido por armaduras.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para reação. Em vez do normal, quando sofre um ataque, você cria um escudo mágico que fornece +5 na Defesa contra esse ataque (cumulativo com o bônus do efeito básico desta magia e de armaduras).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus na Defesa em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para um dia.' },
    ],
  },

  {
    id: 'armamento-da-natureza', nome: 'Armamento da Natureza', tipo: 'divina', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 arma (veja texto)', duracao: 'cena', resistencia: null,
    descricao: 'Você fortalece uma arma mundana primitiva (sem custo em T$, como bordão, clava, funda ou tacape), uma arma natural ou um ataque desarmado. O dano da arma aumenta em um passo e ela é considerada mágica. Ao lançar a magia, você pode mudar o tipo de dano da arma (escolhendo entre corte, impacto ou perfuração).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'fornece +1 nos testes de ataque com a arma.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a execução para ação de movimento.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o bônus nos testes de ataque em +1.' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta o dano da arma em mais um passo.' },
    ],
  },
  {
    id: 'aviso', nome: 'Aviso', tipo: 'universal', escola: 'adivinhacao', circulo: 1,
    execucao: 'movimento', alcance: 'longo', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: null,
    descricao: 'Envia um aviso telepático para uma criatura, mesmo que não possa vê-la nem tenha linha de efeito. Escolha um: Alerta — o alvo recebe +5 em seu próximo teste de Iniciativa e de Percepção até o fim da próxima cena. Mensagem — o alvo recebe uma mensagem sua de até 25 palavras (vocês devem ter um idioma em comum). Localização — o alvo sabe onde você está naquele momento; se você mudar de posição, ele não saberá.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o alcance em um fator de 10 (90m para 900m, 900m para 9km e assim por diante).' },
      { custoPM: 1, tipo: 'muda', efeito: 'se escolher mensagem, o alvo pode enviar uma resposta de até 25 palavras para você até o fim de seu próximo turno.' },
      { custoPM: 2, tipo: 'muda', efeito: 'se escolher localização, muda a duração para cena. O alvo sabe onde você está mesmo que você mude de posição.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
    ],
  },
  {
    id: 'bencao', nome: 'Bênção', tipo: 'divina', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'aliados', duracao: 'cena', resistencia: null,
    descricao: 'Abençoa seus aliados, que recebem +1 em testes de ataque e rolagens de dano. Bênção anula Perdição.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 cadáver e a duração para 1 semana. O cadáver não se decompõe nem pode ser transformado em morto-vivo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os bônus em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
    ],
  },
  {
    id: 'caminhos-da-natureza', nome: 'Caminhos da Natureza', tipo: 'divina', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'criaturas escolhidas', duracao: '1 dia', resistencia: null,
    descricao: 'Você invoca espíritos da natureza, pedindo que eles abram seu caminho. As criaturas afetadas recebem deslocamento +3m e ignoram penalidades por terreno difícil em terrenos naturais.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para pessoal e o alvo para você. Em vez do normal, você recebe +5 em testes de Sobrevivência para se orientar.' },
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, a CD para rastrear os alvos em terreno natural aumenta em +10.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus de deslocamento em +3m.' },
    ],
  },
  {
    id: 'comando', nome: 'Comando', tipo: 'divina', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 humanoide', duracao: '1 rodada', resistencia: 'Vontade anula',
    descricao: 'Você dá uma ordem irresistível, que o alvo deve ser capaz de ouvir (mas não precisa entender). Se falhar na resistência, ele deve obedecer ao comando em seu próprio turno da melhor maneira possível. Escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Fuja', descricao: 'O alvo gasta seu turno se afastando de você (usando todas as suas ações).' },
      { nome: 'Largue', descricao: 'O alvo solta quaisquer itens que esteja segurando e não pode pegá-los novamente até o início de seu próximo turno. Como esta é uma ação livre, ele ainda pode executar outras ações (exceto pegar aquilo que largou).' },
      { nome: 'Pare', descricao: 'O alvo fica pasmo (apenas uma vez por cena).' },
      { nome: 'Senta', descricao: 'Com uma ação livre, o alvo senta no chão (se estava pendurado ou voando, desce até o chão). Ele pode fazer outras ações, mas não se levantar até o início de seu próximo turno.' },
      { nome: 'Venha', descricao: 'O alvo gasta seu turno se aproximando de você (usando todas as suas ações).' },
    ],
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 criatura.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a quantidade de alvos em +1.' },
    ],
  },
  {
    id: 'concentracao-de-combate', nome: 'Concentração de Combate', tipo: 'arcana', escola: 'adivinhacao', circulo: 1,
    execucao: 'livre', alcance: 'pessoal', alvoArea: 'você', duracao: '1 rodada', resistencia: null,
    descricao: 'Você amplia sua percepção, antecipando movimentos dos inimigos e achando brechas em sua defesa. Quando faz um teste de ataque, você rola dois dados e usa o melhor resultado.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda a execução para padrão e a duração para cena. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'além do normal, ao atacar você, um inimigo deve rolar dois dados e usar o pior resultado. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a execução para padrão, o alcance para curto, o alvo para criaturas escolhidas e a duração para cena. Requer 4º círculo.' },
      { custoPM: 14, tipo: 'muda', efeito: 'muda a execução para padrão e a duração para um dia. Além do normal, você recebe um sexto sentido que o avisa de qualquer perigo ou ameaça. Você fica imune às condições surpreendido e desprevenido e recebe +10 na Defesa e Reflexos. Requer 5º círculo.' },
    ],
  },
  {
    id: 'conjurar-monstro', nome: 'Conjurar Monstro', tipo: 'arcana', escola: 'convocacao', circulo: 1,
    execucao: 'completa', alcance: 'curto', alvoArea: '1 criatura conjurada', duracao: 'sustentada', resistencia: null,
    descricao: 'Você conjura um monstro Pequeno que ataca seus inimigos. Você escolhe a aparência do monstro e o tipo de dano que ele pode causar, entre corte, impacto e perfuração. No entanto, ele não é uma criatura real, e sim uma criatura feita de energia — se for destruído, ou quando a magia acaba, desaparece com um brilho, sem deixar nada para trás. Você só pode ter um monstro conjurado por esta magia por vez. O monstro surge num espaço desocupado a sua escolha dentro do alcance e age no início de cada um de seus turnos, a partir da próxima rodada, com deslocamento 9m. Você pode gastar uma ação padrão para dar uma ordem a ele: Mover (dobra o deslocamento na rodada), Atacar (causa 2d4+2 de dano de corte, impacto ou perfuração a um alvo adjacente) ou Lançar Magia (o monstro serve de ponto de origem para uma magia sua de execução padrão ou menor — ele pode descarregar um Toque Chocante em um alvo adjacente a ele, atacar um inimigo distante, ou mesmo "cuspir" uma Bola de Fogo! Você gasta PM normalmente para lançar a magia). Outros usos criativos para o monstro conjurado ficam a critério do mestre. Ele não age sem receber uma ordem.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o deslocamento do monstro em +3m.' },
      { custoPM: 1, tipo: 'muda', efeito: 'o monstro ganha deslocamento de escalada ou natação igual ao seu deslocamento terrestre.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o tipo de dano do ataque do monstro para ácido, fogo, frio ou eletricidade.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os PV do monstro em +10 para cada categoria de tamanho a partir de Pequeno (+10 PV para Pequeno, +20 PV para Médio etc.).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o tamanho do monstro para Médio. Ele tem For 4, Des 3, 45 PV, deslocamento 12m e seu ataque causa 2d6+6 pontos de dano.' },
      { custoPM: 2, tipo: 'muda', efeito: 'o monstro ganha redução 5 contra dois tipos de dano (por exemplo, corte e frio).' },
      { custoPM: 4, tipo: 'muda', efeito: 'o monstro ganha uma nova ordem, Arma de Sopro: gastando 1 PM, faz o monstro causar o dobro de seu dano de ataque em um cone de 6m a partir de si (Reflexos reduz à metade).' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta o tamanho do monstro para Grande. Ele tem For 7, Des 2, 75 PV, deslocamento 12m e seu ataque causa 4d6+10 pontos de dano com 3m de alcance. Requer 2º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'o monstro ganha deslocamento de voo igual ao dobro do deslocamento.' },
      { custoPM: 9, tipo: 'muda', efeito: 'o monstro ganha imunidade contra dois tipos de dano.' },
      { custoPM: 9, tipo: 'aumenta', efeito: 'aumenta o tamanho do monstro para Enorme. Ele tem For 11, Des 1, 110 PV, deslocamento 15m e seu ataque causa 4d8+15 pontos de dano com 4,5m de alcance. Requer 4º círculo.' },
      { custoPM: 14, tipo: 'aumenta', efeito: 'aumenta o tamanho do monstro para Colossal. Ele tem For 15, Des 0, 180 PV, deslocamento 15m e seu ataque causa 4d12+20 pontos de dano com 9m de alcance. Requer 5º círculo.' },
    ],
  },
  {
    id: 'consagrar', nome: 'Consagrar', tipo: 'divina', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'esfera com 9m de raio', duracao: '1 dia', resistencia: null,
    descricao: 'Você enche a área com energia positiva. Pontos de vida curados por efeitos de luz são maximizados dentro da área (isso também afeta dano causado em mortos-vivos por esses efeitos) — por exemplo, Curar Ferimentos cura automaticamente 18 PV. Esta magia não pode ser lançada em uma área contendo um símbolo visível dedicado a uma divindade que não a sua. Consagrar anula Profanar.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, mortos-vivos na área sofrem –2 em testes e Defesa.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta as penalidades para mortos-vivos em –1 (penalidade máxima limitada pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a execução para 1 hora, a duração para permanente e adiciona componente material (incenso e óleos no valor de T$ 1.000). Requer 4º círculo.' },
    ],
  },

  {
    id: 'controlar-plantas', nome: 'Controlar Plantas', tipo: 'divina', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'quadrado com 9m de lado', duracao: 'cena', resistencia: 'Reflexos anula',
    descricao: 'Esta magia só pode ser lançada em uma área com vegetação. As plantas se enroscam nas criaturas da área — aquelas que falharem na resistência ficam enredadas (uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo). A área é considerada terreno difícil, e no início de seus turnos a vegetação tenta enredar novamente qualquer criatura na área, exigindo um novo teste de Reflexos.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda a área para alvo de 1 planta e a resistência para nenhuma. Em vez do normal, você pode fazer a planta se mover como se fosse animada. Ela não pode causar dano ou atrapalhar a concentração de um conjurador.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda a duração para instantânea. Em vez do normal, as plantas na área diminuem, como se tivessem sido podadas. Terreno difícil muda para terreno normal e não fornece camuflagem. Esse efeito dissipa o uso normal de Controlar Plantas.' },
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, criaturas que falhem na resistência também ficam imóveis.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para pessoal, a área para alvo (você) e a resistência para nenhuma. Em vez do normal, você consegue se comunicar com plantas, que começam com atitude prestativa em relação a você. Além disso, você pode fazer testes de Diplomacia com plantas.' },
    ],
  },
  {
    id: 'criar-elementos', nome: 'Criar Elementos', tipo: 'divina', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'elemento escolhido', duracao: 'instantânea', resistencia: null,
    descricao: 'Você cria uma pequena porção de um elemento, a sua escolha — real, não mágico. Elementos físicos devem surgir em uma superfície (objetos simples, sem partes móveis).',
    opcoes: [
      { nome: 'Água', descricao: 'Enche um recipiente Minúsculo com água potável ou cria um cubo de gelo Minúsculo.' },
      { nome: 'Ar', descricao: 'Cria um vento fraco em um quadrado de 1,5m, purificando a área de gás/fumaça ou removendo névoa por uma rodada.' },
      { nome: 'Fogo', descricao: 'Cria uma chama que ilumina como uma tocha (segurável sem se queimar) ou surge num quadrado de 1,5m causando 1d6 de dano de fogo (Reflexos ou fica em chamas).' },
      { nome: 'Terra', descricao: 'Cria um cubo Minúsculo de terra, argila ou pedra.' },
    ],
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a quantidade do elemento em um passo (uma categoria de tamanho para água ou terra, +1 quadrado de 1,5m para ar e fogo).' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o efeito para alvo 1 criatura ou objeto e a resistência para Reflexos reduz à metade. Se escolher água ou terra, você arremessa o cubo ou objeto criado no alvo, causando 2d4 pontos de dano de impacto (aumenta um passo por categoria de tamanho acima de Minúsculo). O cubo se desfaz em seguida.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'se escolheu fogo, aumenta o dano inicial de cada chama em +1d6.' },
    ],
  },
  {
    id: 'criar-ilusao', nome: 'Criar Ilusão', tipo: 'arcana', escola: 'ilusao', circulo: 1,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'ilusão que se estende a até 4 cubos de 1,5m', duracao: 'cena', resistencia: 'Vontade desacredita',
    descricao: 'Esta magia cria uma ilusão visual (uma criatura, uma parede...) ou sonora (um grito de socorro, um uivo assustador...). A magia cria apenas imagens ou sons simples, com volume equivalente ao tom de voz normal para cada cubo de 1,5m no efeito. Não é possível criar cheiros, texturas ou temperaturas, nem sons complexos, como uma música ou diálogo. Criaturas e objetos atravessam uma ilusão sem sofrer dano, mas a magia pode, por exemplo, esconder uma armadilha ou inimigo. A magia é dissipada se você sair do alcance.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a duração para sustentada. A cada rodada você pode gastar uma ação livre para mover a imagem ou alterar levemente o som (volume, aproximar-se ou afastar-se), ainda dentro dos limites do efeito. Quando você para de sustentar, a imagem ou som persistem por mais uma rodada antes de a magia se dissipar.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o efeito da ilusão em +1 cubo de 1,5m.' },
      { custoPM: 1, tipo: 'muda', efeito: 'também pode criar ilusões de imagem e sons combinados.' },
      { custoPM: 1, tipo: 'muda', efeito: 'também pode criar sons complexos com volume máximo equivalente ao que cinco pessoas podem produzir para cada cubo de 1,5m no efeito. Com uma ação livre, você pode alterar o volume do som ou fazê-lo se aproximar ou se afastar dentro do alcance.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também pode criar odores e sensações térmicas, percebidos a uma distância igual ao dobro do tamanho máximo do efeito. Por exemplo, uma miragem de uma fogueira com 4 cubos de 1,5m poderia emanar calor e cheiro de queimado a até 12m.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para longo e o efeito para esfera com 30m de raio. Em vez do normal, você cria um som muito alto, equivalente a uma multidão. Criaturas na área lançam magias como se estivessem em uma condição ruim e a CD de testes de Percepção para ouvir aumenta em +10. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também pode criar sensações táteis, como texturas; criaturas que não saibam que é uma ilusão não conseguem atravessá-la sem passar em um teste de Vontade (objetos ainda a atravessam). A ilusão ainda é incapaz de causar ou sofrer dano. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda a duração para sustentada. Além do normal, você pode gastar uma ação livre para modificar livremente a ilusão (mas não pode acrescentar novos aprimoramentos após lançá-la). Requer 3º círculo.' },
    ],
  },
  {
    id: 'curar-ferimentos', nome: 'Curar Ferimentos', tipo: 'divina', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: null,
    descricao: 'Você canaliza luz que recupera 2d8+2 pontos de vida na criatura tocada. Curar Ferimentos anula Infligir Ferimentos.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alvo para 1 morto-vivo. Em vez do normal, causa 1d8 pontos de dano de luz (Vontade reduz à metade).' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a cura em +1d8+1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também remove uma condição de cansaço do alvo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para curto.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas.' },
    ],
  },
  {
    id: 'despedacar', nome: 'Despedaçar', tipo: 'divina', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura ou objeto mundano Pequeno', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Esta magia emite um som alto e agudo. O alvo sofre 1d8+2 pontos de dano de impacto (ou o dobro disso e ignora RD se for um construto ou objeto mundano) e fica atordoado por uma rodada (apenas uma vez por cena). Um teste de Fortitude reduz o dano à metade e evita o atordoamento. Despedaçar anula Transmutar Objetos.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8+2.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para objeto mundano Médio. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para objeto mundano Grande. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o alvo para objeto mundano Enorme. Requer 4º círculo.' },
      { custoPM: 14, tipo: 'muda', efeito: 'muda o alvo para objeto mundano Colossal. Requer 5º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para pessoal e o alvo para área: esfera com 6m de raio. Todas as criaturas e objetos mundanos na área são afetados.' },
    ],
  },
  {
    id: 'detectar-ameacas', nome: 'Detectar Ameaças', tipo: 'divina', escola: 'adivinhacao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'esfera com 18m de raio', duracao: 'cena, até ser descarregada', resistencia: null,
    descricao: 'Você recebe uma intuição aguçada sobre perigos ao seu redor. Quando uma criatura hostil ou armadilha entra na área do efeito, você faz um teste de Percepção (CD determinada pelo mestre de acordo com a situação). Se passar, sabe a origem (criatura ou armadilha), direção e distância do perigo. Se falhar, sabe apenas que o perigo existe.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'você descobre também a raça ou espécie e o poder da criatura detectada (determinado pela aura dela). Criaturas de 1º a 6º nível ou ND geram aura tênue, de 7º a 12º geram aura moderada, de 13º a 20º geram aura poderosa, e acima do 20º geram aura avassaladora.' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, você não fica surpreendido contra perigos detectados com sucesso e recebe +5 em testes de resistência contra armadilhas. Requer 2º círculo.' },
    ],
  },
  {
    id: 'disfarce-ilusorio', nome: 'Disfarce Ilusório', tipo: 'arcana', escola: 'ilusao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: 'Vontade desacredita',
    descricao: 'Você muda a aparência do alvo, incluindo seu equipamento — altura, peso, tom de pele, cor de cabelo, timbre de voz etc. O alvo recebe +10 em testes de Enganação para disfarce. O alvo não recebe novas habilidades (pode ficar parecido com outra raça, mas não ganha as habilidades dela), nem modifica o equipamento (uma espada longa disfarçada de bordão continua funcionando e causando dano como uma espada).',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para toque, o alvo para 1 criatura e a duração para 1 semana. Em vez do normal, você faz uma pequena alteração na aparência do alvo, como deixar o nariz vermelho ou fazer brotar um gerânio no alto da cabeça. A mudança é inofensiva, mas persistente.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para 1 objeto. Você pode, por exemplo, transformar pedaços de ferro em moedas de ouro. Você recebe +10 em testes de Enganação para falsificação.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para 1 criatura. Uma criatura involuntária pode anular o efeito com um teste de Vontade.' },
      { custoPM: 2, tipo: 'muda', efeito: 'a ilusão inclui odores e sensações. Isso muda o bônus em testes de Enganação para disfarce para +20.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas. Cada criatura pode ter uma aparência diferente. Criaturas involuntárias podem anular o efeito com um teste de Vontade. Requer 2º círculo.' },
    ],
  },
  {
    id: 'enfeiticar', nome: 'Enfeitiçar', tipo: 'arcana', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 humanoide', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'O alvo fica enfeitiçado. Um alvo hostil ou que esteja envolvido em um combate recebe +5 em seu teste de resistência. Se você ou seus aliados tomarem qualquer ação hostil contra o alvo, a magia é dissipada e o alvo retorna à atitude que tinha antes (ou piorada, de acordo com o mestre).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'em vez do normal, você sugere uma ação para o alvo e ele obedece. A sugestão deve ser feita de modo que pareça aceitável, a critério do mestre — pedir que pule de um precipício, por exemplo, dissipa a magia; sugerir a um guarda que descanse um pouco é aceitável. Quando o alvo executa a ação, a magia termina.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para 1 espírito ou monstro. Requer 3º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'afeta todos os alvos dentro do alcance.' },
    ],
  },

  {
    id: 'escudo-da-fe', nome: 'Escudo da Fé', tipo: 'divina', escola: 'abjuracao', circulo: 1,
    execucao: 'reação', alcance: 'curto', alvoArea: '1 criatura', duracao: '1 turno', resistencia: null,
    descricao: 'Um escudo místico se manifesta momentaneamente para bloquear um golpe. O alvo recebe +2 na Defesa.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para ação padrão, o alcance para toque e a duração para cena.' },
      { custoPM: 1, tipo: 'muda', efeito: 'também fornece ao alvo camuflagem leve contra ataques à distância.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus na Defesa em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a execução para ação padrão, o alcance para toque e a duração para cena. A magia cria uma conexão mística entre você e o alvo. Além do efeito normal, o alvo sofre metade do dano por ataques e efeitos; a outra metade do dano é transferida a você. Se o alvo sair de alcance curto de você, a magia é dissipada. Requer 2º círculo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para um dia. Requer 2º círculo.' },
    ],
  },
  {
    id: 'escuridao', nome: 'Escuridão', tipo: 'universal', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 objeto', duracao: 'cena', resistencia: 'Vontade anula (veja texto)',
    descricao: 'O alvo emana sombras em uma área com 6m de raio. Criaturas dentro da área recebem camuflagem leve por escuridão leve. As sombras não podem ser iluminadas por nenhuma fonte de luz natural. O objeto pode ser guardado (em um bolso, por exemplo) para interromper a escuridão, que voltará a funcionar caso o objeto seja revelado. Se lançar a magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la. Escuridão anula Luz.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a área da escuridão em +1,5m de raio.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o efeito para fornecer camuflagem total por escuridão total. O alvo emana escuridão total e ela bloqueia a visão na área e através dela.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para 1 criatura e a resistência para Fortitude parcial. Você lança a magia nos olhos do alvo, que fica cego pela cena. Se passar na resistência, fica cego por 1 rodada. Requer 2º círculo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para um dia.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para pessoal e o alvo para você. Em vez do normal, você é coberto por sombras, recebendo +10 em testes de Furtividade e camuflagem leve. Requer 2º círculo.' },
    ],
  },
  {
    id: 'explosao-de-chamas', nome: 'Explosão de Chamas', tipo: 'arcana', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 6m', duracao: 'instantânea', resistencia: 'Reflexos reduz à metade',
    descricao: 'Um leque de chamas irrompe de suas mãos, causando 2d6 pontos de dano de fogo às criaturas na área.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para curto, a área para alvo de 1 objeto e a resistência para Reflexos anula. Você gera uma pequena explosão que não causa dano mas pode acender uma vela, tocha ou fogueira. Também pode fazer um objeto inflamável com RD 0 (como uma corda ou pergaminho) ficar em chamas. Uma criatura em posse de um objeto pode evitar esse efeito se passar no teste de resistência.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano em +1d6.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda a resistência para Reflexos parcial. Se passar, a criatura reduz o dano à metade; se falhar, fica em chamas.' },
    ],
  },
  {
    id: 'imagem-espelhada', nome: 'Imagem Espelhada', tipo: 'arcana', escola: 'ilusao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Três cópias ilusórias suas aparecem. As duplicatas ficam ao seu redor e imitam suas ações, tornando difícil para um inimigo saber quem atacar. Você recebe +6 na Defesa. Cada vez que um ataque contra você erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Um oponente deve ver as cópias para ser confundido. Se você estiver invisível, ou o atacante fechar os olhos, você não recebe o bônus (mas o atacante ainda sofre penalidades normais por não enxergar).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de cópias em +1 (e o bônus na Defesa em +2).' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, toda vez que uma cópia é destruída, emite um clarão de luz. A criatura que destruiu a cópia fica ofuscada por uma rodada. Requer 2º círculo.' },
    ],
  },
  {
    id: 'infligir-ferimentos', nome: 'Infligir Ferimentos', tipo: 'divina', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude reduz à metade',
    descricao: 'Você canaliza energia negativa contra um alvo, causando 2d8+2 pontos de dano de trevas (ou curando 2d8+2 PV, se for um morto-vivo). Infligir Ferimentos anula Curar Ferimentos.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, o alvo fica fraco pela cena (passar no teste de resistência evita).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8+1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a resistência para nenhum. Como parte da execução da magia, você pode fazer um ataque corpo a corpo contra o alvo. Se acertar, causa o dano do ataque e o efeito da magia.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas.' },
    ],
  },
  {
    id: 'leque-cromatico', nome: 'Leque Cromático', tipo: 'arcana', escola: 'ilusao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 4,5m', duracao: 'instantânea', resistencia: 'Vontade parcial',
    descricao: 'Um cone de luzes brilhantes surge das suas mãos, deixando os animais e humanoides na área atordoados por 1 rodada (apenas uma vez por cena, Vontade anula) e ofuscados pela cena. Esta magia não afeta criaturas cegas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, as criaturas afetadas ficam vulneráveis pela cena.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também afeta espíritos e monstros na área. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'também afeta construtos, espíritos, monstros e mortos-vivos na área. Requer 3º círculo.' },
    ],
  },
  {
    id: 'luz', nome: 'Luz', tipo: 'universal', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 objeto', duracao: 'cena', resistencia: 'Vontade anula (veja texto)',
    descricao: 'O alvo emite luz (mas não produz calor) em uma área com 6m de raio. O objeto pode ser guardado (em um bolso, por exemplo) para interromper a luz, que voltará a funcionar caso o objeto seja revelado. Se lançar a magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la. Luz anula Escuridão.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a área iluminada em +3m de raio.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para um dia.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona componente material (pó de rubi no valor de T$ 50). Não pode ser usado em conjunto com outros aprimoramentos. Requer 2º círculo.' },
      { custoPM: 0, tipo: 'muda', restricao: 'arcana', efeito: 'muda o alvo para 1 criatura. Você lança a magia nos olhos do alvo, que fica ofuscado pela cena. Não afeta criaturas cegas.' },
      { custoPM: 2, tipo: 'muda', restricao: 'arcana', efeito: 'muda o alcance para longo e o efeito para criar 4 pequenos globos flutuantes de pura luz, posicionáveis dentro do alcance e móveis 1x/rodada por ação livre. Cada um ilumina como uma tocha, sem produzir calor. Se um globo ocupar o espaço de uma criatura, ela fica ofuscada e sua silhueta fica visível (sem camuflagem por escuridão ou invisibilidade). Requer 2º círculo.' },
      { custoPM: 2, tipo: 'muda', restricao: 'divina', efeito: 'a luz é cálida como a do sol. Criaturas que sofrem penalidades e dano pela luz solar sofrem seus efeitos como se estivessem expostas à luz solar real. Seus aliados na área estabilizam automaticamente e ficam imunes à condição sangrando, e seus inimigos ficam ofuscados. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', restricao: 'divina', efeito: 'muda o alcance para toque e o alvo para 1 criatura. Em vez do normal, o alvo é envolto por um halo de luz, recebendo +10 em testes de Diplomacia e redução de trevas 10. Requer 2º círculo.' },
    ],
  },
  {
    id: 'nevoa', nome: 'Névoa', tipo: 'universal', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'nuvem com 6m de raio e 6m de altura', duracao: 'cena', resistencia: null,
    descricao: 'Uma névoa espessa eleva-se de um ponto a sua escolha, obscurecendo toda a visão — criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. Esta magia não funciona sob a água.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'a magia também funciona sob a água, criando uma nuvem de tinta.' },
      { custoPM: 2, tipo: 'muda', efeito: 'você pode escolher criaturas no alcance ao lançar a magia; elas enxergam através do efeito. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'a nuvem tem um cheiro horrível. No início de seus turnos, qualquer criatura dentro dela, ou com faro em alcance curto da nuvem, deve fazer um teste de Fortitude. Se falhar, fica enjoada por uma rodada.' },
      { custoPM: 2, tipo: 'muda', efeito: 'a nuvem tem um tom esverdeado e se torna cáustica. No início de seus turnos, criaturas dentro dela sofrem 2d4 pontos de dano de ácido.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o dano de ácido em +2d4.' },
      { custoPM: 5, tipo: 'muda', efeito: 'além do normal, a nuvem fica espessa, quase sólida. Qualquer criatura dentro dela tem seu deslocamento reduzido para 3m (independentemente de seu deslocamento normal) e sofre –2 em testes de ataque e rolagens de dano.' },
    ],
  },

  {
    id: 'orientacao', nome: 'Orientação', tipo: 'divina', escola: 'adivinhacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: '1 rodada', resistencia: null,
    descricao: 'Em seu próximo teste de perícia, o alvo pode rolar dois dados e ficar com o melhor resultado.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para cena. Em vez do normal, escolha um atributo. Sempre que o alvo fizer um teste de perícia baseado no atributo escolhido, pode rolar dois dados e ficar com o melhor resultado. Não se aplica a testes de ataque ou resistência. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'como acima, mas, em vez de um atributo, escolha entre atributos físicos (Força, Destreza e Constituição) ou mentais (Inteligência, Sabedoria e Carisma). Requer 3º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para criaturas escolhidas. Requer 3º círculo.' },
    ],
  },
  {
    id: 'perdicao', nome: 'Perdição', tipo: 'divina', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'criaturas escolhidas', duracao: 'cena', resistencia: 'nenhuma',
    descricao: 'Amaldiçoa os alvos, que recebem –1 em testes de ataque e rolagens de dano. Perdição anula Bênção.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta as penalidades em –1 (penalidade máxima limitada pelo círculo máximo de magia que você pode lançar).' },
    ],
  },
  {
    id: 'primor-atletico', nome: 'Primor Atlético', tipo: 'arcana', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você modifica os limites físicos do alvo, que recebe deslocamento +9m e +10 em testes de Atletismo.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, o alvo recebe um bônus adicional de +20 em testes de Atletismo para saltar (para um bônus total de +30).' },
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, o alvo pode escalar paredes e tetos sem precisar fazer testes de Atletismo. Precisa estar com as mãos livres (mas pode usar uma única mão se ficar parado no lugar) e não fica desprevenido enquanto escala.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para ação de movimento, o alcance para pessoal, o alvo para você e a duração para instantânea. Você salta muito alto e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura neste turno, recebe os benefícios e penalidades de uma investida e sua arma causa um dado extra de dano do mesmo tipo durante este ataque.' },
      { custoPM: 3, tipo: 'muda', efeito: 'além do normal, ao fazer testes de perícias baseadas em Força, Destreza ou Constituição, o alvo pode rolar dois dados e escolher o melhor. Não afeta testes de ataque ou resistência. Requer 2º círculo.' },
    ],
  },
  {
    id: 'profanar', nome: 'Profanar', tipo: 'divina', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'esfera com 9m de raio', duracao: '1 dia', resistencia: null,
    descricao: 'Você enche a área com energia negativa. Dano de trevas é maximizado dentro da área (isso também afeta PV curados em mortos-vivos por esses efeitos). Esta magia não pode ser lançada em uma área contendo um símbolo visível dedicado a uma divindade que não a sua. Profanar anula Consagrar.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, mortos-vivos na área recebem +2 na Defesa e +2 em todos os testes.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os bônus para mortos-vivos em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a execução para 1 hora, a duração para permanente e adiciona componente material (incenso e óleos no valor de T$ 1.000). Requer 4º círculo.' },
    ],
  },
  {
    id: 'protecao-divina', nome: 'Proteção Divina', tipo: 'divina', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia cria uma barreira mística invisível que fornece ao alvo +2 em testes de resistência.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus concedido em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a execução para reação, o alcance para curto e a duração para 1 rodada. Em vez do normal, o alvo recebe +5 no próximo teste de resistência que fizer (cumulativo com o efeito básico desta magia).' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para área de esfera com 3m de raio. Todos os aliados dentro do círculo recebem o bônus da magia. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'torna o alvo imune a efeitos mentais e de medo. Requer 3º círculo.' },
    ],
  },
  {
    id: 'queda-suave', nome: 'Queda Suave', tipo: 'arcana', escola: 'transmutacao', circulo: 1,
    execucao: 'reação', alcance: 'curto', alvoArea: '1 criatura ou objeto Grande ou menor', duracao: 'até chegar ao solo ou cena, o que vier primeiro', resistencia: null,
    descricao: 'O alvo cai lentamente. A velocidade da queda é reduzida para 18m por rodada — o suficiente para não causar dano. Como lançar esta magia é uma reação, você pode lançá-la rápido o bastante para salvar a si ou um aliado de quedas inesperadas. Lançada sobre um projétil (como uma flecha ou uma rocha largada do alto de um penhasco), a magia faz com que ele cause metade do dano normal, devido à lentidão. Queda Suave só funciona em criaturas e objetos em queda livre; a magia não vai frear um golpe de espada ou o mergulho rasante de um atacante voador.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alvo para objeto Minúsculo. Em vez do normal, você pode gastar uma ação de movimento para levitar o alvo até 4,5m em qualquer direção.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para até 10 criaturas ou objetos adequados.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a categoria de tamanho do alvo em uma.' },
    ],
  },
  {
    id: 'raio-do-enfraquecimento', nome: 'Raio do Enfraquecimento', tipo: 'arcana', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Fortitude parcial',
    descricao: 'Você dispara um raio púrpura que drena as forças do alvo. Se falhar na resistência, o alvo fica fatigado. Se passar, fica vulnerável. Note que, como efeitos de magia não acumulam, lançar esta magia duas vezes contra o mesmo alvo não irá deixá-lo exausto.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para toque e a resistência para Fortitude anula. Em vez do normal, sua mão emana um brilho púrpura e, ao tocar o alvo, ele fica fatigado.' },
      { custoPM: 2, tipo: 'muda', efeito: 'em vez do normal, se falhar na resistência o alvo fica exausto. Se passar, fica fatigado. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'como acima, mas muda o alvo para criaturas escolhidas. Requer 3º círculo.' },
    ],
  },
  {
    id: 'resistencia-a-energia', nome: 'Resistência a Energia', tipo: 'universal', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Ao lançar esta magia, escolha entre ácido, eletricidade, fogo, frio, luz ou trevas. O alvo recebe redução de dano 10 contra o tipo de dano escolhido.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a redução de dano em +5.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para um dia. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas. Requer 3º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o efeito para redução de dano contra todos os tipos listados na magia. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o efeito para imunidade a um tipo listado na magia. Requer 4º círculo.' },
    ],
  },

  {
    id: 'santuario', nome: 'Santuário', tipo: 'divina', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'Qualquer criatura que tente fazer uma ação hostil contra o alvo deve fazer um teste de Vontade. Se falhar, não consegue, perde a ação e não pode tentar novamente enquanto a magia durar. Santuário não protege o alvo de efeitos de área. Além disso, o próprio alvo também não pode fazer ações hostis (incluindo forçar outras criaturas a atacá-lo), ou a magia é dissipada — mas pode usar habilidades e magias de cura e suporte, como Curar Ferimentos e Bênção.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, escolha um tipo de criatura entre animal, construto ou morto-vivo. Você não pode ser percebido por criaturas não inteligentes (Int –4 ou menor) do tipo escolhido.' },
      { custoPM: 9, tipo: 'muda', efeito: 'também protege o alvo contra efeitos de área. Uma criatura que tente atacar uma área que inclua o alvo deve fazer o teste de Vontade; se falhar, não consegue e perde a ação. Ela só pode tentar novamente se o alvo sair da área.' },
    ],
  },
  {
    id: 'seta-infalivel-de-talude', nome: 'Seta Infalível de Talude', tipo: 'arcana', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'criaturas escolhidas', duracao: 'instantânea', resistencia: null,
    descricao: 'Favorita entre arcanistas iniciantes, esta magia lança duas setas de energia que causam 1d4+1 pontos de dano de essência cada. Você pode lançar as setas em alvos diferentes ou concentrá-las num mesmo alvo. Caso você possua um bônus no dano de magias, como pelo poder Arcano de Batalha, ele é aplicado em apenas uma seta (o bônus vale para a magia, não cada alvo).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda as setas para lanças de energia que surgem e caem do céu. Cada lança causa 1d8+1 pontos de dano de essência. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o número de setas/lanças para três.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o número de setas/lanças para cinco. Requer 2º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o número de setas/lanças para dez. Requer 4º círculo.' },
    ],
  },
  {
    id: 'sono', nome: 'Sono', tipo: 'arcana', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal ou humanoide', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'Um cansaço místico recai sobre o alvo. Se falhar na resistência, ele fica inconsciente e caído ou, se estiver envolvido em combate ou outra situação perigosa, fica exausto por 1 rodada, depois fatigado. Em ambos os casos, se passar, o alvo fica fatigado por 1d4 rodadas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'alvos que falhem na resistência ficam exaustos por 1d4+1 rodadas, em vez de apenas 1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para criatura.' },
      { custoPM: 5, tipo: 'muda', efeito: 'afeta todos os alvos válidos a sua escolha dentro do alcance.' },
    ],
  },
  {
    id: 'suporte-ambiental', nome: 'Suporte Ambiental', tipo: 'divina', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: '1 dia', resistencia: null,
    descricao: 'Esta magia facilita a sobrevivência em ambientes hostis. O alvo fica imune aos efeitos de calor e frio extremos, pode respirar na água se respirar ar (ou vice-versa) e não sufoca em fumaça densa.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas.' },
    ],
  },
  {
    id: 'teia', nome: 'Teia', tipo: 'arcana', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'cubo com 6m de lado', duracao: 'cena', resistencia: 'Reflexos anula',
    descricao: 'Teia cria várias camadas de fibras entrelaçadas e pegajosas na área. Qualquer criatura na área que falhar na resistência fica enredada. Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo. A área ocupada por Teia é terreno difícil. A Teia é inflamável — qualquer ataque que cause dano de fogo destrói as teias por onde passar, libertando as criaturas enredadas mas deixando-as em chamas.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, criaturas que falhem na resistência também ficam imóveis.' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, no início de seus turnos a magia afeta novamente qualquer criatura na área, exigindo um novo teste de Reflexos. Requer 2º círculo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a área em +1 cubo de 1,5m.' },
    ],
  },
  {
    id: 'toque-chocante', nome: 'Toque Chocante', tipo: 'arcana', escola: 'evocacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude reduz à metade',
    descricao: 'Arcos elétricos envolvem sua mão, causando 2d8+2 pontos de dano de eletricidade. Se o alvo usa armadura de metal (ou carrega muito metal, a critério do mestre), sofre uma penalidade de –5 no teste de resistência.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8+1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a resistência para nenhum. Como parte da execução da magia, você faz um ataque corpo a corpo contra o alvo. Se acertar, causa o dano do ataque e da magia.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para pessoal e o alvo para área: esfera com 6m de raio. Você dispara raios pelas pontas dos dedos que afetam todas as criaturas na área.' },
    ],
  },
  {
    id: 'tranca-arcana', nome: 'Tranca Arcana', tipo: 'arcana', escola: 'abjuracao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 objeto Grande ou menor', duracao: 'permanente', resistencia: null,
    descricao: 'Esta magia tranca uma porta ou outro item que possa ser aberto ou fechado (como um baú, caixa etc.), aumentando a CD de testes de Força ou Ladinagem para abri-lo em +10. Você pode abrir livremente sua própria tranca sem problemas. Componente material: chave de bronze no valor de T$ 25.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para curto. Em vez do normal, pode abrir ou fechar um objeto de tamanho Grande ou menor, como uma porta ou baú. Não afeta objetos trancados.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para curto e a duração para instantânea. Em vez do normal, a magia abre portas, baús e janelas trancadas, presas, barradas ou protegidas por Tranca Arcana (o efeito é dissipado) a sua escolha. Ela também afrouxa grilhões e solta correntes.' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta a CD para abrir o alvo em +5.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para 1 objeto de qualquer tamanho, podendo afetar até mesmo os portões de um castelo. Requer 3º círculo.' },
    ],
  },
  {
    id: 'tranquilidade', nome: 'Tranquilidade', tipo: 'divina', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal ou humanoide', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'Você emana ondas de serenidade. Se falhar na resistência, o alvo tem sua atitude mudada para indiferente e não pode atacar ou realizar qualquer ação agressiva. Se passar, sofre –2 em testes de ataque. Qualquer ação hostil contra o alvo ou seus aliados dissipa a magia e faz ele retornar à atitude que tinha antes (ou pior, de acordo com o mestre).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 criatura.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para médio e o alvo para criaturas escolhidas. Requer 3º círculo.' },
    ],
  },
  {
    id: 'transmutar-objetos', nome: 'Transmutar Objetos', tipo: 'arcana', escola: 'transmutacao', circulo: 1,
    execucao: 'padrão', alcance: 'toque', alvoArea: 'matéria-prima, como madeira, rochas, ossos', duracao: 'cena', resistencia: null,
    descricao: 'A magia transforma matéria bruta para moldar um novo objeto. Você pode usar matéria-prima mundana para criar um objeto de tamanho Pequeno ou menor e preço máximo de T$ 25, como um balde ou uma espada. O objeto reverte à matéria-prima no final da cena, ou se for tocado por um objeto feito de chumbo. Esta magia não pode ser usada para criar objetos consumíveis, como alimentos ou itens alquímicos, nem objetos com mecanismos complexos, como bestas ou armas de fogo. Transmutar Objetos anula Despedaçar.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alvo para 1 objeto mundano Minúsculo (ou material em quantidade equivalente) e a duração para instantânea. Em vez do normal, você pode alterar as propriedades físicas do alvo — colorir, limpar, sujar, aquecer, esfriar, temperar (mas não produzir), ou curar 1 PV do objeto, consertando pequenas falhas. Um objeto só pode ser afetado por este truque uma vez por dia.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para toque, o alvo para 1 construto e a duração para instantânea. Em vez do normal, cura 2d8 PV do alvo. Você pode gastar 2 PM adicionais para aumentar a cura em +1d8.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o limite de tamanho do objeto em uma categoria.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o preço máximo do objeto criado em um fator de x10 (+3 PM por T$ 250 de preço, +6 PM por T$ 2.500 de preço e assim por diante).' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para 1 objeto mundano e a duração para instantânea. Em vez do normal, você cura todos os PV do alvo, restaurando o objeto totalmente. Sujeito aos limites de tamanho e preço da magia original; não funciona se o objeto tiver sido completamente destruído. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'como o aprimoramento anterior, mas passa a afetar itens mágicos.' },
    ],
  },
  {
    id: 'visao-mistica', nome: 'Visão Mística', tipo: 'universal', escola: 'adivinhacao', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Seus olhos brilham com uma luz azul e passam a enxergar auras mágicas. Este efeito é similar ao uso de Misticismo para detectar magia, mas você detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Além disso, você pode gastar uma ação de movimento para descobrir se uma criatura que possa perceber em alcance médio é capaz de lançar magias e qual a aura gerada pelas magias de círculo mais alto que ela pode lançar.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'recebe visão no escuro.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para um dia.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também pode enxergar objetos e criaturas invisíveis. Eles aparecem como formas translúcidas.' },
    ],
  },
  {
    id: 'vitalidade-fantasma', nome: 'Vitalidade Fantasma', tipo: 'arcana', escola: 'necromancia', circulo: 1,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'instantânea', resistencia: null,
    descricao: 'Você suga energia vital da terra, recebendo 2d10 pontos de vida temporários. Os PV temporários desaparecem ao final da cena.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os PV temporários recebidos em +1d10. Caso a magia cause dano, em vez disso aumenta o dano causado em +1d10.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para área: esfera com 6m de raio centrada em você e a resistência para Fortitude reduz à metade. Em vez do normal, você suga energia das criaturas vivas na área, causando 1d10 pontos de dano de trevas e recebendo PV temporários iguais ao dano total causado. Os PV temporários desaparecem ao final da cena. Requer 2º círculo.' },
    ],
  },
  {
    id: 'area-escorregadia', nome: 'Área Escorregadia', tipo: 'arcana', escola: 'convocacao', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'quadrado de 3m ou 1 objeto', duracao: 'cena', resistencia: 'Reflexos (veja texto)',
    descricao: 'Esta magia recobre uma superfície com uma substância gordurosa e escorregadia. Criaturas na área devem passar na resistência para não cair. Nas rodadas seguintes, criaturas que tentem movimentar-se pela área devem fazer testes de Acrobacia para equilíbrio (CD 10). Área Escorregadia pode tornar um item escorregadio — uma criatura segurando um objeto afetado deve passar na resistência para não deixar o item cair cada vez que usá-lo.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a área em +1 quadrado de 1,5m.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a CD dos testes de Acrobacia para 15.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda a CD dos testes de Acrobacia para 20.' },
    ],
  },

  // ══════════════════════ CÍRCULO 2 (47 confirmadas) ══════════════════════

  {
    id: 'aliado-animal', nome: 'Aliado Animal', tipo: 'divina', escola: 'encantamento', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal prestativo', duracao: '1 dia', resistencia: null,
    descricao: 'Você cria um vínculo mental com um animal prestativo em relação a você. O Aliado Animal obedece a você no melhor de suas capacidades, mesmo que isso arrisque a vida dele. Ele funciona como um parceiro veterano, de um tipo a sua escolha entre ajudante, combatente, fortão, guardião, montaria ou perseguidor.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 animal Minúsculo e a duração para 1 semana. Em vez do normal, o animal se desloca no melhor de suas capacidades até um local designado por você — em geral, para levar um item, carta ou similar. Quando chega ao destino, fica esperando até o fim da magia, permitindo que criaturas escolhidas por você se aproximem e peguem o que ele estiver carregando.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o parceiro para mestre. Requer 3º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'muda o alvo para 2 animais prestativos. Cada animal funciona como um parceiro de um tipo diferente, e você pode receber a ajuda de ambos (mas ainda precisa seguir o limite de parceiros de acordo com o seu nível de personagem). Requer 4º círculo.' },
    ],
  },
  {
    id: 'alterar-tamanho', nome: 'Alterar Tamanho', tipo: 'arcana', escola: 'transmutacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 objeto', duracao: '1 dia', resistencia: null,
    descricao: 'Esta magia aumenta ou diminui o tamanho de um item mundano em até três categorias (um objeto Enorme vira Pequeno, por exemplo). Você também pode mudar a consistência do item, deixando-o rígido como pedra ou flexível como seda (isso não altera sua RD ou PV, apenas suas propriedades físicas). Se lançar a magia num objeto de uma criatura involuntária, ela pode fazer um teste de Vontade para anulá-la.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura. Em vez do normal, o alvo aumenta uma categoria de tamanho (seu equipamento se ajusta ao novo tamanho) e recebe Força +2. Um alvo involuntário pode fazer um teste de Fortitude para negar o efeito.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura. Em vez do normal, o alvo diminui uma categoria de tamanho (seu equipamento se ajusta ao novo tamanho) e recebe Destreza +2. Um alvo involuntário pode fazer um teste de Fortitude para negar o efeito. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o alcance para toque, o alvo para 1 criatura, a duração para permanente e a resistência para Fortitude anula. Em vez do normal, se falhar na resistência o alvo e seu equipamento têm seu tamanho mudado para Minúsculo — o alvo tem sua Força reduzida a –5 e seus deslocamentos reduzidos a 3m. Requer 4º círculo.' },
    ],
  },
  {
    id: 'amarras-etereas', nome: 'Amarras Etéreas', tipo: 'arcana', escola: 'convocacao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Reflexos anula',
    descricao: 'Três laços de energia surgem e se enroscam no alvo, deixando-o agarrado. A vítima pode tentar se livrar, gastando uma ação padrão e um teste de Atletismo — se passar, destrói um laço, mais um adicional para cada 5 pontos pelos quais superou a CD. Os laços também podem ser atacados e destruídos: cada um tem Defesa 10, 10 PV, RD 5 e imunidade a dano mágico. Se todos forem destruídos, a magia é dissipada. Por serem feitos de energia, os laços afetam criaturas incorpóreas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de laços em um alvo a sua escolha em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, cada laço é destruído automaticamente com um único ataque bem-sucedido; porém, cada laço destruído libera um choque de energia que causa 1d8+1 pontos de dano de essência na criatura amarrada. Requer 3º círculo.' },
    ],
  },
  {
    id: 'aparencia-perfeita', nome: 'Aparência Perfeita', tipo: 'arcana', escola: 'ilusao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia lhe concede um rosto idealizado, porte físico garboso, voz melodiosa e olhar sedutor. Caso seu Carisma seja 5 ou mais, você recebe +2 neste atributo — do contrário, ele se torna 5 (isso conta como um bônus). Além disso, você recebe +5 em Diplomacia e Enganação. Quando a magia acaba, observadores percebem a mudança e tendem a suspeitar de você; pessoas que o viram sob o efeito sentirão que "algo está errado" ao vê-lo em condições normais. Quando a cena acabar, você pode gastar os PM da magia novamente como uma ação livre para mantê-la ativa (sem fornecer PV ou PM adicionais).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 humanoide.' },
    ],
  },
  {
    id: 'auguria', nome: 'Augúrio', tipo: 'divina', escola: 'adivinhacao', circulo: 2,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'você', duracao: 'instantânea', resistencia: null,
    descricao: 'Esta magia diz se uma ação que você tomará em breve (no máximo uma hora no futuro) trará resultados bons ou ruins. O mestre rola 1d6 em segredo; com resultado de 2 a 6, você recebe uma das respostas: "felicidade" (bons resultados), "miséria" (maus resultados), "felicidade e miséria" (ambos) ou "nada" (nenhum). Com resultado 1, a magia falha e oferece "nada" (não há como saber se foi falha ou não). Lançar esta magia várias vezes sobre o mesmo assunto sempre gera o primeiro resultado.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda a execução para 1 minuto. Em vez do normal, você consulta uma divindade sobre um evento que acontecerá até um dia no futuro. O mestre rola a chance de falha; com 2 a 6, você recebe uma resposta (de uma frase simples a um enigma), geralmente com pistas úteis. Numa falha, não recebe resposta. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda a execução para 10 minutos e a duração para 1 minuto. Você pode fazer uma pergunta por rodada que possa ser respondida com "sim", "não" ou "não sei". O mestre rola a chance de falha pra cada pergunta; se falhar, a resposta também é "não sei". Requer 4º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'o mestre rola 1d12; a magia só falha em um resultado 1.' },
      { custoPM: 12, tipo: 'muda', efeito: 'o mestre rola 1d20; a magia só falha em um resultado 1.' },
    ],
  },
  {
    id: 'bola-de-fogo', nome: 'Bola de Fogo', tipo: 'arcana', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'esfera com 6m de raio', duracao: 'instantânea', resistencia: 'Reflexos reduz à metade',
    descricao: 'Esta famosa magia de ataque cria uma poderosa explosão, causando 6d6 pontos de dano de fogo em todas as criaturas e objetos livres na área.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a área para efeito de esfera flamejante com tamanho Médio e a duração para cena. Em vez do normal, cria uma esfera flamejante com 1,5m de diâmetro que causa 3d6 pontos de dano a qualquer criatura no mesmo espaço. Você pode gastar uma ação de movimento para fazer a esfera voar 9m em qualquer direção. Ela é imune a dano, mas pode ser apagada com água. Uma criatura só pode sofrer dano da esfera uma vez por rodada.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para um dia ou até ser descarregada. Em vez do normal, você cria uma pequena pedra flamejante, que pode detonar como uma reação, descarregando a magia. A pedra pode ser usada como arma de arremesso com alcance curto. Uma vez detonada, causa o dano da magia numa área de esfera com 6m de raio.' },
    ],
  },
  {
    id: 'campo-de-forca', nome: 'Campo de Força', tipo: 'arcana', escola: 'abjuracao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia cria uma película protetora sobre você. Você recebe 30 pontos de vida temporários.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para reação e a duração para instantânea. Em vez do normal, você recebe RD 30 contra o próximo dano que sofrer.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda os PV temporários ou a RD para 50. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda os PV temporários ou a RD para 70. Requer 4º círculo.' },
    ],
  },
  {
    id: 'camuflagem-ilusoria', nome: 'Camuflagem Ilusória', tipo: 'arcana', escola: 'ilusao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'O alvo fica com sua imagem nublada, como se vista através de um líquido, recebendo os efeitos de camuflagem leve.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para sustentada. A imagem do alvo fica mais distorcida, aumentando a chance de falha da camuflagem leve para 50%.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas. Requer 4º círculo.' },
    ],
  },

  {
    id: 'condicao', nome: 'Condição', tipo: 'divina', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'até 5 criaturas', duracao: 'cena', resistencia: null,
    descricao: 'Pela duração da magia, você sabe a posição e status (PV atuais, se estão com uma condição ou sob efeito de magia...) dos alvos. Depois de lançada, a distância dos alvos não importa — a magia só deixa de detectar um alvo se ele morrer ou for para outro plano.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda a duração para um dia.' },
    ],
  },
  {
    id: 'conjurar-mortos-vivos', nome: 'Conjurar Mortos-Vivos', tipo: 'universal', escola: 'necromancia', circulo: 2,
    execucao: 'completa', alcance: 'curto', alvoArea: '6 mortos-vivos', duracao: 'sustentada', resistencia: null,
    descricao: 'Você conjura seis esqueletos capangas de tamanho Médio feitos de energia negativa em espaços desocupados dentro do alcance. Você pode gastar uma ação de movimento para fazer os mortos-vivos andarem (deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6+2 de trevas cada). Os esqueletos têm For 2, Des 2, Defesa 18, todos os outros atributos nulos, 1 PV, falham automaticamente em testes de resistência ou opostos, mas são imunes a atordoamento, cansaço, dano não letal, doença, encantamento, frio, ilusão, paralisia, sono e veneno. Desaparecem ao chegarem a 0 PV ou no fim da cena. Não agem sem receber ordem.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de mortos-vivos conjurados em +1.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez de esqueletos, conjura carniçais (For 3, Des 3, Defesa 27, causam 1d8+3 de trevas + perda de 1d8 PV por veneno; alvos atingidos devem passar em Fortitude ou ficam paralisados por 1 rodada, imunes por 1 dia se passarem). Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'em vez de esqueletos, conjura sombras (Des 4, Defesa 35, incorpóreas, causam 2d10 de trevas; criaturas vivas atingidas devem passar em Fortitude ou perdem 1d4 PM; perdem incorporeidade sob luz do sol). Requer 4º círculo.' },
    ],
  },
  {
    id: 'controlar-fogo', nome: 'Controlar Fogo', tipo: 'divina', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'veja texto', duracao: 'cena', resistencia: null,
    descricao: 'Você pode criar, moldar, mover ou extinguir chamas e emanações de calor. Ao lançar a magia, escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Chamejar', descricao: 'A arma escolhida causa +1d6 de dano de fogo (inclui armas naturais e ataques desarmados).' },
      { nome: 'Esquentar', descricao: '1 objeto sofre 1d6 de dano de fogo por rodada e causa o mesmo dano a quem o segura. Pode ser resfriado com uma ação completa.' },
      { nome: 'Extinguir', descricao: 'Apaga 1 chama Grande ou menor, criando uma nuvem de fumaça em esfera de 3m de raio com camuflagem leve dentro.' },
      { nome: 'Modelar', descricao: 'Move 1 chama Grande ou menor 9m/rodada como ação livre, causando 2d6 de dano se atravessar uma criatura (1x/rodada).' },
    ],
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a duração para sustentada e a resistência para Reflexos reduz à metade. Em vez do normal, escolha o efeito Labaredas: a cada rodada, gaste uma ação de movimento para projetar uma labareda, acertando um alvo em alcance curto a partir da chama — ele sofre 4d6 pontos de dano de fogo (Reflexos reduz à metade).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d6 (exceto do efeito chamejar).' },
    ],
  },
  {
    id: 'controlar-madeira', nome: 'Controlar Madeira', tipo: 'divina', escola: 'transmutacao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 objeto de madeira Grande ou menor', duracao: 'cena', resistencia: null,
    descricao: 'Você molda, retorce, altera ou repele madeira. Se lançar esta magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la. Ao lançar a magia, escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Fortalecer', descricao: 'Armas têm dano aumentado em um passo, escudos +2 no bônus de Defesa cumulativo com outras magias, outros itens de madeira +5 RD e PV dobrados.' },
      { nome: 'Modelar', descricao: 'Muda a forma do alvo — transforma um galho em espada, cria uma porta numa parede, mas não mecanismos complexos nem itens consumíveis.' },
      { nome: 'Repelir', descricao: 'O alvo é repelido por você — armas erram automaticamente contra você, portas se abrem ao se aproximar mesmo trancadas, objetos lançados desviam sem lhe causar dano.' },
      { nome: 'Retorcer', descricao: 'Estraga o alvo — porta emperra CD 25 de Força pra abrir, armas/itens –5 em perícias, escudos param de dar bônus mas mantêm penalidades, barco afunda no fim da cena.' },
    ],
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para pessoal, o alvo para você e a duração para um dia. Você e seu equipamento se transformam em uma árvore de tamanho Grande. Nessa forma, não pode falar ou fazer ações físicas, mas percebe seus arredores normalmente. Se for atacado, a magia é dissipada. Um teste de Sobrevivência (CD 30) revela que você não é uma árvore verdadeira.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para área de quadrado com 9m de lado e a duração para cena. Em vez do normal, qualquer vegetação na área fica rígida e afiada. A área é terreno difícil e criaturas que andem nela sofrem 1d6 pontos de dano de corte para cada 1,5m que avancem.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o tamanho do alvo para Enorme ou menor. Requer 3º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'muda o tamanho do alvo para Colossal ou menor. Requer 4º círculo.' },
    ],
  },
  {
    id: 'cranio-voador-de-vladislav', nome: 'Crânio Voador de Vladislav', tipo: 'arcana', escola: 'necromancia', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Esta magia cria um crânio envolto em energia negativa. Quando atinge o alvo, causa 4d8+4 pontos de dano de trevas e se desfaz emitindo um som horrendo, deixando abalado o alvo e todos os inimigos num raio de 3m dele (criaturas já abaladas ficam apavoradas por 1d4 rodadas). Passar no teste de resistência reduz o dano à metade e evita a condição (as demais criaturas na área também têm direito ao teste, para evitar a condição).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8+1.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
    ],
  },
  {
    id: 'circulo-da-justica', nome: 'Círculo da Justiça', tipo: 'divina', escola: 'abjuracao', circulo: 2,
    execucao: 'completa', alcance: 'curto', alvoArea: 'esfera com 9m de raio', duracao: '1 dia', resistencia: 'Vontade parcial',
    descricao: 'Também conhecida como Lágrimas de Hyninn, esta magia é usada em tribunais e para proteger áreas sensíveis. Criaturas na área sofrem –10 em testes de Acrobacia, Enganação, Furtividade e Ladinagem e não podem mentir deliberadamente — mas podem tentar evitar perguntas que normalmente responderiam com uma mentira (sendo evasivas ou cometendo omissões, por exemplo). Uma criatura que passe na resistência tem as penalidades reduzidas para –5 e pode mentir.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para ação padrão, o alcance para pessoal, o alvo para você, a duração para cena e a resistência para nenhuma. Em vez do normal, qualquer criatura ou objeto invisível em alcance curto se torna visível. Isso não dissipa o efeito mágico; se sair do seu alcance, a criatura ou objeto voltam a ficar invisíveis.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a penalidade nas perícias para –10 (se passar na resistência) e –20 (se falhar). Requer 4º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona componente material (balança de prata no valor de T$ 5.000).' },
    ],
  },
  {
    id: 'desespero-esmagador', nome: 'Desespero Esmagador', tipo: 'arcana', escola: 'encantamento', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 6m', duracao: 'instantânea', resistencia: 'Vontade parcial',
    descricao: 'Humanoides na área são acometidos de grande tristeza, ficando fracos e frustrados até o fim da cena (ou por uma rodada, se passarem no teste de resistência).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'em vez do normal, as condições adquiridas são debilitado e esmorecido.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, afeta qualquer tipo de criatura.' },
      { custoPM: 3, tipo: 'muda', efeito: 'além do normal, criaturas que falhem na resistência ficam aos prantos (pasmos) por 1 rodada (apenas uma vez por cena). Requer 3º círculo.' },
    ],
  },
  {
    id: 'dissipar-magia', nome: 'Dissipar Magia', tipo: 'universal', escola: 'abjuracao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura ou 1 objeto mágico ou esfera com 3m de raio', duracao: 'instantânea', resistencia: null,
    descricao: 'Você dissipa outras magias que estejam ativas, como se sua duração tivesse acabado (efeitos de magias instantâneas não podem ser dissipados — não se pode dissipar uma Bola de Fogo ou Relâmpago depois que já causaram dano). Se lançar essa magia em uma criatura ou área, faça um teste de Misticismo — você dissipa as magias com CD igual ou menor que o resultado do teste. Se lançada contra um item mágico, o transforma em um item mundano por 1d6 rodadas (Vontade anula).',
    aprimoramentos: [
      { custoPM: 12, tipo: 'muda', efeito: 'muda a área para esfera com 9m de raio. Em vez do normal, cria um efeito de disjunção: todas as magias na área são automaticamente dissipadas e todos os itens mágicos na área, exceto os que você estiver carregando, viram itens mundanos por uma cena (com direito a um teste de Vontade para evitar). Requer 5º círculo.' },
    ],
  },
  {
    id: 'enxame-de-pestes', nome: 'Enxame de Pestes', tipo: 'divina', escola: 'convocacao', circulo: 2,
    execucao: 'completa', alcance: 'médio', alvoArea: '1 enxame Médio (quadrado de 1,5m)', duracao: 'sustentada', resistencia: 'Fortitude reduz à metade',
    descricao: 'Você conjura um enxame de criaturas a sua escolha, como besouros, gafanhotos, ratos, morcegos ou serpentes. O enxame pode passar pelo espaço de outras criaturas e não impede que outras criaturas entrem no espaço dele. No final de seus turnos, o enxame causa 2d12 pontos de dano de corte a qualquer criatura em seu espaço (Fortitude reduz à metade). Você pode gastar uma ação de movimento para mover o enxame 12m.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d12.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a resistência para Reflexos reduz à metade e o enxame para criaturas maiores, como gatos, guaxinins, compsognatos ou kobolds. Ele causa 3d12 pontos de dano (a sua escolha entre corte, impacto ou perfuração).' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta o número de enxames em +1. Eles não podem ocupar o mesmo espaço. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda a resistência para Reflexos reduz à metade e o enxame para criaturas elementais. Ele causa 5d12 pontos de dano (a sua escolha entre ácido, eletricidade, fogo ou frio). Requer 4º círculo.' },
    ],
  },
  {
    id: 'esculpir-sons', nome: 'Esculpir Sons', tipo: 'arcana', escola: 'ilusao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura ou objeto', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'Esta magia altera os sons emitidos pelo alvo. Ela não é capaz de criar sons, mas pode omiti-los (como fazer uma carroça ficar silenciosa) ou transformá-los (como fazer uma pessoa ficar com voz de passarinho). Você não pode criar sons que não conhece. Uma vez que escolha a alteração, ela não pode ser mudada. Um conjurador que tenha a voz modificada drasticamente não poderá lançar magias.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1. Todas as criaturas e objetos devem ser afetadas da mesma forma.' },
    ],
  },

  {
    id: 'flecha-acida', nome: 'Flecha Ácida', tipo: 'arcana', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura ou objeto', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Você dispara um projétil que causa 4d6 pontos de dano de ácido. Se falhar no teste de resistência, o alvo fica coberto por um muco corrosivo, sofrendo mais 2d6 de dano de ácido no início de seus dois próximos turnos. Se lançada contra um objeto que não esteja em posse de uma criatura, a magia causa dano dobrado e ignora a RD do objeto.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, se o alvo coberto pelo muco ácido estiver usando armadura ou escudo, o item é corroído — isso reduz o bônus na Defesa do item em 1 ponto permanentemente (pode ser consertado, restaurando o bônus).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a redução na Defesa em +1.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano inicial e o dano por rodada em +1d6.' },
    ],
  },
  {
    id: 'fisico-divino', nome: 'Físico Divino', tipo: 'divina', escola: 'transmutacao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você fortalece o corpo do alvo. Ele recebe +2 em Força, Destreza ou Constituição, a sua escolha. Esse aumento não oferece PV ou PM adicionais.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +2 nos três atributos físicos. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +4 no atributo escolhido. Requer 4º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +4 nos três atributos físicos. Requer 5º círculo.' },
    ],
  },
  {
    id: 'invisibilidade', nome: 'Invisibilidade', tipo: 'arcana', escola: 'ilusao', circulo: 2,
    execucao: 'livre', alcance: 'pessoal', alvoArea: 'você', duracao: '1 rodada', resistencia: null,
    descricao: 'O alvo fica invisível (incluindo seu equipamento). Um personagem invisível recebe camuflagem total, +10 em testes de Furtividade contra ouvir e criaturas que não possam percebê-lo ficam desprevenidas contra seus ataques. A magia termina se o alvo faz uma ação hostil contra uma criatura (ações contra objetos livres não dissipam a Invisibilidade). Objetos soltos pelo alvo voltam a ser visíveis; objetos apanhados por ele ficam invisíveis. Qualquer parte de um item carregado que se estenda além de seu alcance corpo a corpo natural se torna visível. Uma luz nunca fica invisível (mesmo que sua fonte seja).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para ação padrão, o alcance para toque e o alvo para 1 criatura ou 1 objeto Grande ou menor.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para cena. Requer 3º círculo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para sustentada. Em vez do normal, o alvo gera uma esfera de invisibilidade (não combina com outros aprimoramentos). O alvo e todas as criaturas a até 3m dele se tornam invisíveis, como no efeito normal (ainda ficam visíveis caso façam ação hostil). A esfera se move junto com o alvo; qualquer coisa que saia dela fica visível. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda a execução para ação padrão, o alcance para toque e o alvo para 1 criatura. A magia não é dissipada caso o alvo faça uma ação hostil. Requer 4º círculo.' },
    ],
  },
  {
    id: 'ligacao-telepatica', nome: 'Ligação Telepática', tipo: 'arcana', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '2 criaturas voluntárias', duracao: '1 dia', resistencia: null,
    descricao: 'Você cria um elo mental entre duas criaturas com Inteligência –3 ou maior (você pode ser uma delas). As criaturas podem se comunicar independente de idioma ou distância, mas não em mundos diferentes.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para 1 criatura. Em vez do normal, você cria um elo mental que permite que você veja e ouça pelos sentidos da criatura, se gastar uma ação de movimento. Uma criatura involuntária pode fazer um teste de Vontade para suprimir a magia por uma hora. Requer 3º círculo.' },
    ],
  },
  {
    id: 'localizacao', nome: 'Localização', tipo: 'arcana', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'esfera com 90m de raio', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia pode encontrar uma criatura ou objeto a sua escolha. Você pode pensar em termos gerais ("um elfo", "algo de metal") ou específicos ("Gwen, a elfa", "uma espada longa"). A magia indica a direção e distância da criatura ou objeto mais próximo desse tipo, caso esteja ao alcance. Você pode movimentar-se para continuar procurando. Procurar algo muito específico exige que você tenha em mente uma imagem precisa do objeto; caso a imagem não seja muito próxima da verdade, a magia falha, mas você gasta os PM mesmo assim. Esta magia pode ser bloqueada por uma fina camada de chumbo.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda a área para alvo você. Em vez do normal, você sabe onde fica o norte e recebe +5 em testes de Sobrevivência para se orientar.' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta a área em um fator de 10 (90m para 900m, 900m para 9km e assim por diante).' },
    ],
  },
  {
    id: 'mapear', nome: 'Mapear', tipo: 'arcana', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: 'superfície ou objeto plano, como uma mesa ou papel', duracao: 'cena', resistencia: null,
    descricao: 'Uma fagulha percorre a superfície afetada, queimando-a enquanto esboça um mapa da região onde o conjurador está. Se você conhece o lugar, o mapa será completo. Caso contrário, apresentará apenas um esboço geral, além de um ponto de referência (pra localização) e um lugar de interesse, definidos pelo mestre. A região representada tem tamanho máximo de um quadrado de 10km de lado. Caso esteja dentro de uma construção, o mapa mostrará o andar em que você se encontra.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para 1 criatura e a duração para 1 hora. Em vez do normal, a criatura tocada descobre o caminho mais direto para entrar ou sair de um lugar (não funciona para encontrar a localização de uma criatura ou objeto, só de lugares). Caso demore mais de uma hora para percorrer o caminho, o conhecimento se perde.' },
    ],
  },
  {
    id: 'marca-da-obediencia', nome: 'Marca da Obediência', tipo: 'universal', escola: 'encantamento', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'Você toca uma criatura, gravando uma marca mística no corpo dela enquanto profere uma ordem, como "não ataque a mim ou meus aliados", "siga-me" ou "não saia desta sala". A criatura deve seguir essa ordem, gastando todas as ações de seu turno para isso. A ordem não pode ser genérica demais (como "ajude-me"), nem forçar o alvo a atos suicidas. A cada rodada, o alvo pode fazer um teste de Vontade; se passar, a magia é dissipada.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para um dia. Se não estiver em combate, a criatura só pode fazer o teste de Vontade a cada hora. Requer 3º círculo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'sempre que o alvo fizer o teste de Vontade e falhar, a marca causa 3d6 pontos de dano psíquico. Requer 3º círculo.' },
    ],
  },
  {
    id: 'mente-divina', nome: 'Mente Divina', tipo: 'divina', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você fortalece a mente do alvo. Ele recebe +2 em Inteligência, Sabedoria ou Carisma, a sua escolha. Esse aumento não oferece PV, PM ou perícias adicionais.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +2 nos três atributos mentais. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +4 no atributo escolhido. Requer 4º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'em vez do normal, o alvo recebe +4 nos três atributos mentais. Requer 5º círculo.' },
    ],
  },
  {
    id: 'metamorfose', nome: 'Metamorfose', tipo: 'arcana', escola: 'transmutacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Você muda sua aparência e forma — incluindo seu equipamento — para qualquer outra criatura, existente ou imaginada. Independentemente da forma escolhida, você recebe +20 em testes de Enganação para disfarce. Características não mencionadas não mudam. Se mudar para uma forma humanoide, pode mudar o tipo de dano (corte, impacto, perfuração) de suas armas, e pode assumir uma categoria de tamanho acima ou abaixo da sua (aplicando os modificadores em Furtividade e testes de manobra). Se mudar para outras formas, pode escolher uma Forma Selvagem do druida — nesse caso não pode atacar com armas, falar ou lançar magias até voltar ao normal, mas recebe armas naturais e os bônus da forma selvagem escolhida.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'a forma escolhida recebe uma habilidade de sentidos entre faro, visão na penumbra e visão no escuro.' },
      { custoPM: 3, tipo: 'muda', efeito: 'a forma escolhida recebe percepção às cegas. Requer 3º círculo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para toque, o alvo para 1 criatura e adiciona resistência (Vontade anula).' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para médio, o alvo para 1 criatura e a resistência para Vontade anula. Em vez do normal, transforma o alvo em uma criatura ou objeto inofensivo (ovelha, sapo, galinha, pudim de ameixa etc.) — não pode atacar, falar ou lançar magias, seu deslocamento vira 3m e sua Defesa vira 10 (outras características não mudam). No início de seus turnos, o alvo pode fazer um teste de Vontade; se passar, retorna à forma normal e a magia termina. Requer 3º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'se mudar para formas não humanoides, pode escolher uma Forma Selvagem Aprimorada. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'se mudar para formas não humanoides, pode escolher uma Forma Selvagem Superior. Requer 4º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'além do normal, no início de seus turnos o alvo pode mudar de forma novamente, como uma ação livre, fazendo novas escolhas. Requer 5º círculo.' },
    ],
  },
  {
    id: 'miasma-mefitico', nome: 'Miasma Mefítico', tipo: 'divina', escola: 'necromancia', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'nuvem com 6m de raio', duracao: 'instantânea', resistencia: 'Fortitude (veja texto)',
    descricao: 'A área é coberta por emanações letais. Criaturas na área sofrem 5d6 pontos de dano de ácido e ficam enjoadas por 1 rodada. Se passarem na resistência, sofrem metade do dano e não ficam enjoadas.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda o alcance para toque, a área para alvo (1 criatura com 0 PV ou menos), a duração para instantânea, a resistência para Fortitude anula e adiciona componente material (pó de ônix no valor de T$ 10). Em vez do normal, você canaliza o Miasma contra uma vítima. Se falhar na resistência, ela morre e você recebe +2 na CD de suas magias por um dia. Se passar, fica imune a este truque por um dia.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d6.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o tipo do dano para trevas.' },
    ],
  },

  {
    id: 'montaria-arcana', nome: 'Montaria Arcana', tipo: 'arcana', escola: 'convocacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'criatura conjurada', duracao: '1 dia', resistencia: null,
    descricao: 'Esta magia convoca um parceiro cavalo (ou pônei) de guerra veterano. Sua aparência é de um animal negro com crina e cauda cinzentas e cascos feitos de fumaça, mas você pode mudá-la se quiser. Além dos benefícios normais, a Montaria Arcana pode atravessar terreno difícil sem redução em seu deslocamento. Você pode usar Misticismo no lugar de Cavalgar para efeitos desta montaria (incluindo ser considerado treinado).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, criaturas do tipo animal em alcance curto da montaria devem fazer um teste de Vontade. Se passarem, ficam abaladas pela cena; se falharem, ficam apavoradas por 1d4 rodadas, depois abaladas pela cena.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona penalidade de –3 PM.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o tamanho da montaria em uma categoria. Isso também aumenta o número de criaturas que ela pode carregar — duas para uma criatura Enorme, seis para Colossal. Uma única criatura controla a montaria; as outras apenas são deslocadas.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o nível do parceiro para mestre. Requer 3º círculo.' },
    ],
  },
  {
    id: 'oracao', nome: 'Oração', tipo: 'divina', escola: 'encantamento', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'todas as criaturas (veja texto)', duracao: 'sustentada', resistencia: null,
    descricao: 'Você e os seus aliados no alcance recebem +2 em testes de perícia e rolagens de dano, e todos os seus inimigos no alcance sofrem –2 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias. Componente material: T$ 20 por PM gasto em incensos ou outras oferendas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os bônus em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta as penalidades em –1 (penalidade máxima limitada pelo círculo máximo de magia que você pode lançar).' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o alcance para médio. Requer 3º círculo.' },
      { custoPM: 12, tipo: 'muda', efeito: 'muda a duração para cena. Requer 4º círculo.' },
    ],
  },
  {
    id: 'purificacao', nome: 'Purificação', tipo: 'divina', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: null,
    descricao: 'Você purifica a criatura tocada, removendo uma condição dela entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, envenenado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, ofuscado, paralisado, pasmo ou surdo.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'também recupera todos os PV perdidos por veneno.' },
      { custoPM: 2, tipo: 'muda', efeito: 'em vez de uma, remove todas as condições listadas.' },
      { custoPM: 3, tipo: 'muda', efeito: 'também permite que o alvo solte qualquer item amaldiçoado que esteja segurando (mas não remove a maldição do item em si).' },
      { custoPM: 7, tipo: 'muda', efeito: 'também dissipa magias e efeitos prejudiciais de encantamento, necromancia e transmutação afetando o alvo. Requer 3º círculo.' },
    ],
  },
  {
    id: 'raio-solar', nome: 'Raio Solar', tipo: 'divina', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'linha de 30m', duracao: 'instantânea', resistencia: 'Reflexos (veja texto)',
    descricao: 'Você canaliza uma poderosa rajada de energia positiva que ilumina o campo de batalha. Criaturas na área sofrem 4d8 pontos de dano de luz (ou 4d12, se forem mortos-vivos) e ficam ofuscadas por uma rodada. Se passarem na resistência, sofrem metade do dano e não ficam ofuscadas.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda a duração para cena e a resistência para nenhuma. Em vez do normal, cria um facho de luz que ilumina a área da magia. Uma vez por rodada, você pode mudar a direção do facho como uma ação livre.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano ou cura em +1d8 (ou +1d12 em mortos-vivos).' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, criaturas vivas a sua escolha na área curam 4d8 pontos de vida; o restante sofre o dano normalmente.' },
      { custoPM: 3, tipo: 'muda', efeito: 'criaturas que falhem na resistência ficam cegas por 1d4 rodadas.' },
    ],
  },
  {
    id: 'refugio', nome: 'Refúgio', tipo: 'arcana', escola: 'abjuracao', circulo: 2,
    execucao: 'completa', alcance: 'curto', alvoArea: 'domo com 6m de raio', duracao: '1 dia', resistencia: null,
    descricao: 'Esta magia cria um domo imóvel e quase opaco por fora, mas transparente pelo lado de dentro. Ele protege contra calor, frio e forças pequenas, mas não contra qualquer coisa capaz de causar dano (protege contra neve e vento comuns, mas não contra uma flecha ou Bola de Fogo). Como o domo é quase opaco, qualquer criatura dentro dele tem camuflagem total contra ataques vindos de fora. Criaturas podem entrar e sair do domo livremente. Descansar dentro do Refúgio concede recuperação normal de PV e PM.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, os limites do domo são envoltos por uma fumaça escura e espessa, que impede criaturas do lado de fora de enxergar ou ouvir o que está dentro (as de dentro enxergam e ouvem normalmente o que está fora). A fumaça também bloqueia magias de adivinhação.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, cria uma cabana que comporta até 10 criaturas Médias. Descansar nesse espaço concede recuperação confortável (recupera PV e PM igual ao dobro do nível). É uma cabana normal, com paredes de madeira, telhado, uma porta, duas janelas e mobília básica. A porta e as janelas têm 15 PV, RD 5 e são protegidas por um efeito idêntico à magia Tranca Arcana. As paredes têm 200 PV e RD 5.' },
      { custoPM: 3, tipo: 'muda', efeito: 'em vez do normal, cria um espaço extradimensional, similar a uma caverna vazia e escura, que comporta até 10 criaturas Médias. A entrada precisa estar desenhada em um objeto fixo como uma grande pedra ou árvore. Nenhum efeito do mundo real afeta o espaço e vice-versa, mas quem está dentro pode observar o mundo real como se uma janela de 1m estivesse centrada na entrada. Qualquer coisa no espaço surge no mundo real na área vazia mais próxima da entrada quando a duração acaba. Requer 3º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'em vez do normal, cria uma mansão extradimensional que comporta até 100 criaturas Médias, com quartos luxuosos, comida, bebida e dez servos fantasmagóricos (como na magia Servos Invisíveis). Descansar na mansão concede recuperação luxuosa (recupera PV e PM igual ao triplo do nível). A mansão tem uma única entrada, uma porta feita de luz, que você pode deixar visível ou invisível como uma ação livre — apenas criaturas escolhidas por você podem passar. Requer 4º círculo.' },
    ],
  },
  {
    id: 'relampago', nome: 'Relâmpago', tipo: 'arcana', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'linha de 30m', duracao: 'instantânea', resistencia: 'Reflexos reduz à metade',
    descricao: 'Você dispara um poderoso raio que causa 6d6 pontos de dano de eletricidade em todas as criaturas e objetos livres na área.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para médio e a área para alvo: criaturas escolhidas. Em vez do normal, você dispara vários relâmpagos, um para cada alvo escolhido, causando 6d6 pontos de dano de eletricidade. Requer 3º círculo.' },
    ],
  },
  {
    id: 'rogar-maldicao', nome: 'Rogar Maldição', tipo: 'divina', escola: 'necromancia', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'sustentada', resistencia: 'Fortitude anula',
    descricao: 'Você entoa cânticos maléficos que amaldiçoam uma vítima, criando efeitos variados. Ao lançar a magia, escolha um dos efeitos abaixo. Você também pode inventar sua própria maldição, usando esses exemplos como sugestões, mas o mestre tem a palavra final sobre o efeito.',
    opcoes: [
      { nome: 'Debilidade', descricao: 'O alvo fica esmorecido e não pode se comunicar ou lançar magias, mas ainda reconhece aliados e pode segui-los e ajudá-los de maneira simplória.' },
      { nome: 'Doença', descricao: 'Muda a duração para instantânea. O alvo contrai uma doença a sua escolha, que o afeta imediatamente sem período de incubação.' },
      { nome: 'Fraqueza', descricao: 'O alvo fica debilitado e lento.' },
      { nome: 'Isolamento', descricao: 'O alvo perde o uso de um dos cinco sentidos a sua escolha.' },
    ],
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o número de efeitos que você pode escolher em +1. Requer 3º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda a duração para permanente e a resistência para Fortitude parcial. Se passar, a criatura ainda sofre os efeitos da maldição, mas por 1 rodada. Requer 4º círculo.' },
    ],
  },
  {
    id: 'runa-de-protecao', nome: 'Runa de Proteção', tipo: 'universal', escola: 'abjuracao', circulo: 2,
    execucao: '1 hora', alcance: 'toque', alvoArea: 'uma área de 6m de raio', duracao: 'permanente até ser descarregada', resistencia: 'varia (veja o texto)',
    descricao: 'Você escreve uma runa pessoal em uma superfície fixa, como uma parede ou o chão, que protege uma pequena área ao redor. Quando uma criatura entra na área afetada a runa explode, causando 6d6 pontos de dano em todos os alvos a até 6m. A criatura que ativa a runa não tem direito a teste de resistência; outras criaturas na área têm direito a um teste de Reflexos para reduzir o dano à metade. Quando lança a magia, você escolhe o tipo de dano, entre ácido, eletricidade, fogo, frio, luz ou trevas. Você pode determinar que a runa se ative apenas em condições específicas (por exemplo, apenas por goblins ou apenas por mortos-vivos) e também pode criar uma palavra mágica que impeça a runa de se ativar. Um personagem pode encontrar a runa com um teste de Investigação e desarmá-la com um teste de Ladinagem. Componente material: pó de diamante no valor de T$ 200.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para "você" e o alcance para "pessoal". Ao invés do normal, escolha uma magia de 1º círculo que você conhece e pode lançar, com tempo de execução de uma ação padrão ou menor. Você escreve a runa em seu corpo e especifica uma condição de ativação (como "quando eu for alvo de um ataque"). Quando a condição for cumprida, você pode ativar a runa e lançar a magia escolhida como uma reação. Você só pode escrever uma runa em seu corpo ao mesmo tempo.' },
      { custoPM: 3, tipo: 'muda', efeito: 'como o aprimoramento anterior, mas você pode escolher magias de 2º círculo. Requer 3º círculo.' },
    ],
  },
  {
    id: 'salto-dimensional', nome: 'Salto Dimensional', tipo: 'arcana', escola: 'convocacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'você', duracao: 'instantânea', resistencia: null,
    descricao: 'Esta magia transporta você para outro lugar dentro do alcance. Você não precisa perceber nem ter linha de efeito ao seu destino, podendo simplesmente imaginá-lo. Por exemplo, pode se transportar 3m adiante para ultrapassar uma porta fechada. Uma vez transportadas, criaturas não podem agir até a rodada seguinte. Esta magia não permite que você apareça dentro de um corpo sólido; se o ponto de chegada não tem espaço livre, você ressurge na área vazia mais próxima.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para médio.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'muda o alvo para você e uma criatura voluntária. Você pode escolher este aprimoramento mais vezes para aumentar o número de alvos adicionais em +1, mas deve estar tocando todos os alvos.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a execução para reação. Em vez do normal, você recebe +5 na Defesa e em testes de Reflexos contra um ataque ou efeito que esteja prestes a atingi-lo. Após a resolução do efeito, salta para um espaço adjacente (1,5m).' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alcance para longo.' },
    ],
  },
  {
    id: 'servos-invisiveis', nome: 'Servos Invisíveis', tipo: 'arcana', escola: 'convocacao', circulo: 2,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'criaturas conjuradas', duracao: '1 cena', resistencia: null,
    descricao: 'Você cria até três servos invisíveis e silenciosos, capazes de realizar tarefas simples como apanhar lenha, colher frutos, varrer o chão ou alimentar um cavalo. Os servos podem ser usados para manter arrumada e organizada uma mansão ou pequena torre, ou para preparar um acampamento nos ermos para você e seus aliados. Eles também podem ajudá-lo em tarefas mais complexas, como fazer uma pesquisa ou preparar uma poção, mas isso consome sua energia mágica — você pode "gastar" um servo para receber um bônus não cumulativo de +2 em um teste de perícia (exceto testes de ataque e resistência). Os servos não são criaturas reais; não podem lutar, nem resistir a qualquer dano ou efeito que exija um teste de resistência ou teste oposto — falharão automaticamente e serão destruídos.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de servos conjurados em 1.' },
      { custoPM: 3, tipo: 'muda', efeito: 'você pode comandar os servos para realizar uma única tarefa no seu lugar. Em termos de jogo, eles passam automaticamente em um teste de perícia com CD máxima igual ao seu nível, +2 para cada servo conjurado. O tempo necessário para realizar a tarefa é o tempo do uso da perícia em questão. Requer 3º círculo.' },
    ],
  },

  {
    id: 'silencio', nome: 'Silêncio', tipo: 'divina', escola: 'ilusao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'esfera com 6m de raio', duracao: 'sustentada', resistencia: null,
    descricao: 'Um silêncio sepulcral recai sobre a área e nenhum som é produzido nela. Enquanto estiverem na área, todas as criaturas ficam surdas. Além disso, como lançar magias exige palavras mágicas, normalmente nenhuma magia pode ser lançada dentro da área.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a área para alvo de 1 objeto. Em vez do normal, o alvo emana uma área de silêncio com 3m de raio. Se lançar a magia num objeto de uma criatura involuntária, ela tem direito a um teste de Vontade para anulá-la.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para cena. Em vez do normal, nenhum som pode deixar a área, mas criaturas dentro da área podem falar, ouvir e lançar magias com palavras mágicas normalmente.' },
    ],
  },
  {
    id: 'soco-de-arsenal', nome: 'Soco de Arsenal', tipo: 'divina', escola: 'convocacao', circulo: 2,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Ninguém sabe se Mestre Arsenal foi realmente o criador desta magia — mas ele foi o primeiro a utilizá-la. Você fecha o punho e gesticula como se estivesse golpeando o alvo, causando dano de impacto igual a 4d6 + sua Força. A vítima é empurrada 3m na direção oposta à sua. Passar no teste de resistência reduz o dano à metade e evita o empurrão.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para pessoal, o alvo para você, a duração para cena e a resistência para nenhuma. Em vez do normal, seus ataques corpo a corpo passam a acertar inimigos distantes. Seu alcance natural aumenta em 3m; uma criatura Média pode atacar adversários a até 4,5m, por exemplo.' },
      { custoPM: 4, tipo: 'aumenta', efeito: 'aumenta o empurrão em +3m.' },
    ],
  },
  {
    id: 'sopro-das-uivantes', nome: 'Sopro das Uivantes', tipo: 'arcana', escola: 'evocacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 9m', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Você sopra ar gélido que causa 4d6 pontos de dano de frio (Fortitude reduz à metade). Criaturas de tamanho Médio ou menor que falhem na resistência ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano de frio em +2d6.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o tamanho máximo das criaturas afetadas em uma categoria. Requer 3º círculo.' },
    ],
  },
  {
    id: 'sussurros-insanos', nome: 'Sussurros Insanos', tipo: 'arcana', escola: 'encantamento', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 humanoide', duracao: 'cena', resistencia: 'Vontade anula',
    descricao: 'Você murmura palavras desconexas que afetam a mente do alvo. O alvo fica confuso.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para 1 criatura.' },
      { custoPM: 12, tipo: 'muda', efeito: 'muda o alvo para criaturas escolhidas. Requer 5º círculo.' },
    ],
  },
  {
    id: 'tempestade-divina', nome: 'Tempestade Divina', tipo: 'divina', escola: 'evocacao', circulo: 2,
    execucao: 'completa', alcance: 'longo', alvoArea: 'cilindro com 15m de raio e 15m de altura', duracao: 'sustentada', resistencia: null,
    descricao: 'Esta magia só pode ser usada em ambientes abertos. A área fica sujeita a um vendaval — ataques à distância sofrem penalidade de –5, chamas são apagadas e névoas são dissipadas. Você também pode gerar chuva (–5 em testes de Percepção), neve (como chuva, e a área se torna terreno difícil) ou granizo (como chuva, mais 1 ponto de dano de impacto por rodada, no início de seus turnos).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, uma vez por rodada você pode gastar uma ação padrão para fazer um raio cair sobre um alvo na área, causando 3d8 pontos de dano de eletricidade (Reflexos reduz à metade).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano de raios (veja acima) em +1d8.' },
      { custoPM: 3, tipo: 'muda', efeito: 'se escolheu causar chuva, ela se torna mais grossa, revelando a silhueta de criaturas invisíveis na área. Criaturas Médias ou menores ficam lentas e criaturas voadoras precisam passar num teste de Atletismo por rodada ou caem ao solo (podem fazer testes de Acrobacia pra reduzir o dano de queda, como o normal).' },
      { custoPM: 3, tipo: 'muda', efeito: 'se escolheu causar granizo, muda o dano para 2d6 por rodada.' },
      { custoPM: 3, tipo: 'muda', efeito: 'se escolheu causar neve, criaturas na área sofrem 2d6 pontos de dano de frio no início de seus turnos.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda a área para cilindro com 90m de raio e 90m de altura.' },
    ],
  },
  {
    id: 'toque-vampirico', nome: 'Toque Vampírico', tipo: 'arcana', escola: 'necromancia', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude reduz à metade',
    descricao: 'Sua mão brilha com energia sombria, causando 6d6 pontos de dano de trevas. Você recupera pontos de vida iguais à metade do dano causado (se causou algum dano).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda a resistência para nenhum. Como parte da execução da magia, você pode fazer um ataque corpo a corpo contra o alvo. Se acertar, causa o dano do ataque e da magia, e recupera pontos de vida iguais à metade do dano da magia.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para pessoal, o alvo para você e a duração para cena. Em vez do normal, a cada rodada você pode gastar uma ação padrão para tocar 1 criatura e causar 3d6 pontos de dano. Você recupera pontos de vida iguais à metade do dano causado. Requer 3º círculo.' },
    ],
  },
  {
    id: 'velocidade', nome: 'Velocidade', tipo: 'arcana', escola: 'transmutacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'sustentada', resistencia: null,
    descricao: 'O alvo pode realizar uma ação padrão ou de movimento adicional por turno. Esta ação não pode ser usada para lançar magias e ativar engenhocas.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'muda', efeito: 'muda a duração para cena. A ação adicional que você pode fazer é apenas de movimento. Uma criatura só pode receber uma ação adicional por turno como efeito de Velocidade.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o alvo para criaturas escolhidas no alcance. Requer 4º círculo.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o alcance para pessoal e o alvo para você. Você acelera sua mente, além de seu corpo. A ação adicional pode ser usada para lançar magias e ativar engenhocas. Requer 4º círculo.' },
    ],
  },
  {
    id: 'vestimenta-da-fe', nome: 'Vestimenta da Fé', tipo: 'divina', escola: 'abjuracao', circulo: 2,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 armadura, escudo ou vestuário', duracao: '1 dia', resistencia: null,
    descricao: 'Você fortalece um item, aumentando o bônus de Defesa de uma armadura ou escudo em +2. No caso de um vestuário, ele passa a oferecer +2 na Defesa (não cumulativo com armadura). Os efeitos desta magia contam como um bônus de encanto.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'o objeto oferece o mesmo bônus em testes de resistência. Requer 3º círculo.' },
      { custoPM: 4, tipo: 'aumenta', efeito: 'aumenta o bônus em +1.' },
      { custoPM: 7, tipo: 'muda', efeito: 'o objeto também oferece redução de dano 5. Requer 4º círculo.' },
    ],
  },
  {
    id: 'voz-divina', nome: 'Voz Divina', tipo: 'divina', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Você pode conversar com criaturas de qualquer raça e tipo: animal, construto, espírito, humanoide, monstro ou morto-vivo. Pode fazer perguntas e entende suas respostas, mesmo sem um idioma em comum ou se a criatura não for capaz de falar, mas respeitando os limites da Inteligência dela. A atitude dessas criaturas não é alterada, mas você pode usar a perícia Diplomacia para tentar mudar sua atitude.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'você concede um pouco de vida a um cadáver, suficiente para que ele responda a suas perguntas. O conhecimento do corpo é limitado ao que ele tinha enquanto vivo e suas respostas são curtas e enigmáticas. Um corpo só pode ser alvo desta magia uma vez. Ela também não funciona em um corpo cuja cabeça tenha sido destruída.' },
      { custoPM: 1, tipo: 'muda', efeito: 'você pode falar com plantas (normais ou monstruosas) e rochas. Plantas e rochas têm percepção limitada de seus arredores e normalmente fornecem respostas simplórias.' },
    ],
  },

  // Achado de bônus durante a extração do Círculo 5 — pertence de verdade
  // ao CÍRCULO 2 (estava faltando na nossa lista original).
  {
    id: 'globo-da-verdade-de-gwen', nome: 'Globo da Verdade de Gwen', tipo: 'divina', escola: 'adivinhacao', circulo: 2,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 globo', duracao: 'cena', resistencia: null,
    descricao: 'Cria um globo flutuante e intangível, com 50cm de diâmetro. O globo mostra uma cena vista até uma semana atrás por você ou por uma criatura que você toque ao lançar a magia (mediante uma pergunta; a criatura pode fazer um teste de Vontade para anular o efeito), permitindo que outras pessoas a vejam.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'o globo mostra uma cena vista até um mês atrás.' },
      { custoPM: 2, tipo: 'muda', efeito: 'como acima, até um ano atrás.' },
      { custoPM: 2, tipo: 'muda', efeito: 'ao lançar a magia, você pode tocar um cadáver. O globo mostra a última cena vista por essa criatura.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para longo e o efeito para 10 globos. Todos mostram a mesma cena.' },
    ],
  },

  // ══════════════════════ CÍRCULO 3 (40 confirmadas) ══════════════════════

  {
    id: 'anular-a-luz', nome: 'Anular a Luz', tipo: 'divina', escola: 'necromancia', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'esfera com 6m de raio', duracao: 'ver texto', resistencia: null,
    descricao: 'Esta magia cria uma onda de escuridão que causa diversos efeitos. Magias de até 3º círculo na área são dissipadas se você passar num teste de Religião contra a CD de cada uma. Seus aliados na área são protegidos por uma aura sombria e recebem +4 na Defesa até o fim da cena. Inimigos na área ficam enjoados por 1d4 rodadas (apenas uma vez por cena). Anular a Luz anula Dispersar as Trevas (este efeito tem duração instantânea).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus na Defesa em +1.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda as magias dissipadas para até 4º círculo. Requer 4º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda as magias dissipadas para até 5º círculo. Requer 5º círculo.' },
    ],
  },
  {
    id: 'banimento', nome: 'Banimento', tipo: 'divina', escola: 'abjuracao', circulo: 3,
    execucao: '1d3+1 rodadas', alcance: 'curto', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Vontade parcial',
    descricao: 'Você expulsa uma criatura não nativa de Arton. Um alvo nativo de outro mundo (como muitos espíritos) é teletransportado de volta para um lugar aleatório de seu mundo de origem. Já um alvo morto-vivo tem sua conexão com as energias negativas rompidas, sendo reduzido a 0 PV. Se passar na resistência, em vez dos efeitos acima, o alvo fica enjoado por 1d4 rodadas. Se você tiver um ou mais itens que se oponham ao alvo de alguma maneira, a CD do teste de resistência aumenta em +2 por item.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'muda', efeito: 'muda a resistência para nenhum. Em vez do normal, devolve automaticamente uma criatura conjurada (como por uma magia de convocação) para seu plano de origem.' },
    ],
  },
  {
    id: 'coluna-de-chamas', nome: 'Coluna de Chamas', tipo: 'divina', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'cilindro com 3m de raio e 30m de altura', duracao: 'instantânea', resistencia: 'Reflexos reduz à metade',
    descricao: 'Um pilar de fogo sagrado desce dos céus, causando 6d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano de fogo em +1d6.' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano de luz em +1d6.' },
    ],
  },
  {
    id: 'comunhao-com-a-natureza', nome: 'Comunhão com a Natureza', tipo: 'divina', escola: 'adivinhacao', circulo: 3,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'você', duracao: '1 dia', resistencia: null,
    descricao: 'Após uma breve união com a natureza local, você obtém informações e intuições sobre a região em que está, numa distância equivalente a um dia de viagem. Você recebe 6d4 dados de auxílio. Enquanto a magia durar, sempre que for realizar um teste de perícia em áreas naturais, você pode gastar 2d4 (mais 2d4 para cada círculo de magias acima do 3º que puder lançar) e adicionar o resultado rolado como bônus no teste. A magia termina se você ficar sem dados.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda a execução para 1 minuto e a duração para instantânea. Em vez do normal, você descobre 1d4+1 informações sobre os seguintes temas: terreno, animais, vegetais, minerais, cursos d\'água e presença de criaturas antinaturais numa região natural em que você esteja.' },
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o número de dados de auxílio em +2.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o tipo dos dados de auxílio para d6.' },
      { custoPM: 8, tipo: 'muda', efeito: 'muda o tipo dos dados de auxílio para d8.' },
    ],
  },
  {
    id: 'contato-extraplanar', nome: 'Contato Extraplanar', tipo: 'arcana', escola: 'adivinhacao', circulo: 3,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'você', duracao: '1 dia', resistencia: null,
    descricao: 'Sua mente viaja até outro plano de existência, onde entra em contato com seres como gênios e demônios. Você firma um contrato com uma dessas entidades para que o auxilie, em troca de se alimentar de seu mana. Quando a magia é lançada, você recebe 6d6 dados de auxílio. Enquanto a magia durar, sempre que for realizar um teste de perícia, você pode gastar 1d6 (mais 1d6 para cada círculo de magias acima do 3º que puder lançar) e adicionar o resultado como bônus no teste. No entanto, sempre que rolar um "6" num desses dados, a entidade "suga" 1 PM de você. A magia termina se você gastar todos os dados, ficar sem PM ou no fim do dia (o que acontecer primeiro).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de dados de auxílio em +1.' },
      { custoPM: 8, tipo: 'muda', efeito: 'muda os dados de auxílio para d12. Sempre que rolar um resultado 12 nesses dados, a entidade "suga" 2 PM de você. Requer 4º círculo.' },
    ],
  },
  {
    id: 'controlar-terra', nome: 'Controlar Terra', tipo: 'divina', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'longo', alvoArea: '9 cubos com 1,5m de lado', duracao: 'instantânea', resistencia: 'veja texto',
    descricao: 'Você manipula a densidade e a forma de toda terra, pedra, lama, argila ou areia na área. Ao lançar a magia, escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Amolecer', descricao: 'Se afetar um teto, coluna ou suporte, provoca desabamento causando 10d6 de dano de impacto (Reflexos reduz à metade). Se afetar o piso, cria terreno difícil de areia ou argila.' },
      { nome: 'Modelar', descricao: 'Usa pedra ou argila para criar objetos simples de tamanho Enorme ou menor, sem mecanismos — transformar um tijolo em maça, criar uma passagem, levantar paredes com RD 8 e 50 PV por 3m.' },
      { nome: 'Solidificar', descricao: 'Transforma lama ou areia em terra ou pedra. Criaturas com os pés na superfície ficam agarradas, soltando-se com uma ação padrão e um teste de Acrobacia ou Atletismo.' },
    ],
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de cubos de 1,5m em +2.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para pessoal, o alvo para você e a duração para um dia. Você e seu equipamento fundem-se a uma superfície ou objeto adjacente feito de pedra, terra, argila ou areia que possa acomodá-lo. Você pode voltar ao espaço adjacente como uma ação livre, dissipando a magia. Enquanto mesclado, não pode falar ou fazer ações físicas, mas percebe seus arredores normalmente. Pequenos danos não o afetam, mas se o objeto for destruído, a magia é dissipada, você volta a um espaço livre adjacente e sofre 10d6 pontos de dano de impacto.' },
    ],
  },
  {
    id: 'controlar-agua', nome: 'Controlar Água', tipo: 'divina', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'esfera com 30m de raio', duracao: 'cena', resistencia: 'veja texto',
    descricao: 'Você controla os movimentos e comportamentos da água. Ao lançar a magia, escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Congelar', descricao: 'Toda água mundana na área congela. Criaturas nadando ficam imóveis; escapar exige uma ação padrão e um teste de Atletismo ou Acrobacia.' },
      { nome: 'Derreter', descricao: 'Gelo mundano vira água e a magia termina.' },
      { nome: 'Enchente', descricao: 'Eleva o nível da água em até 4,5m. A sua escolha, muda a área para alvo uma embarcação, que recebe +3m de deslocamento.' },
      { nome: 'Evaporar', descricao: 'Água e gelo mundano evaporam instantaneamente e a magia termina. Elementais da água, plantas monstruosas e criaturas imunes a frio sofrem 10d8 de dano de fogo; outras criaturas vivas recebem metade (Fortitude reduz à metade).' },
      { nome: 'Partir', descricao: 'Diminui o nível da água em até 4,5m, abrindo caminho seco em água rasa ou criando um redemoinho em água profunda que prende barcos. Elementais da água ficam lentos.' },
    ],
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d8.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para 1 criatura composta principalmente por fogo, lava ou magma (como um elemental do fogo) e a resistência para Fortitude parcial. Em vez do normal, se a criatura falhar no teste de resistência, é reduzida a 0 PV. Se passar, sofre 5d6 pontos de dano.' },
    ],
  },
  {
    id: 'convocacao-instantanea', nome: 'Convocação Instantânea', tipo: 'arcana', escola: 'convocacao', circulo: 3,
    execucao: 'padrão', alcance: 'ilimitado', alvoArea: '1 objeto de até 2 espaços', duracao: 'instantânea', resistencia: null,
    descricao: 'Você invoca um objeto de qualquer lugar para sua mão. O item deve ter sido previamente preparado com uma runa pessoal sua (ao custo de T$ 5). A magia não funciona se o objeto estiver com outra criatura, mas você saberá onde ele está e quem o está carregando (ou sua descrição física, caso não conheça a criatura).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, até 1 hora após ter lançado a magia, você pode gastar uma ação de movimento para enviar o objeto de volta para o local em que ele estava antes.' },
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para um baú Médio, a duração para permanente e adiciona sacrifício de 1 PM. Em vez do normal, você esconde o baú no Éter Entre Mundos, com até 20 espaços de equipamento. A magia faz com que qualquer objeto caiba no baú, independentemente do seu tamanho. Uma vez escondido, você pode convocar o baú para um espaço livre adjacente, ou de volta para o Éter, com uma ação padrão. Componente material: baú construído com matéria-prima da melhor qualidade (T$ 1.000), mais uma miniatura do baú (T$ 100) que você deve ter em mãos para invocá-lo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para 1 objeto de até 10 espaços. Um objeto muito grande ou pesado para aparecer em suas mãos surge em um espaço adjacente a sua escolha.' },
    ],
  },

  {
    id: 'despertar-consciencia', nome: 'Despertar Consciência', tipo: 'divina', escola: 'encantamento', circulo: 3,
    execucao: 'completa', alcance: 'toque', alvoArea: '1 animal ou planta', duracao: '1 dia', resistencia: null,
    descricao: 'Você desperta a consciência de um animal ou planta. O alvo se torna um parceiro veterano de um tipo a sua escolha entre ajudante, combatente, fortão, guardião, médico, perseguidor ou vigilante. Se usar esta magia em outro parceiro que já possua, o nível de poder de um de seus tipos aumenta em um passo (apenas uma vez por parceiro). Se já for um parceiro mestre, recebe o bônus de outro tipo de parceiro iniciante. O alvo se torna uma criatura racional, com Inteligência –1, e pode falar.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alvo para 1 escultura mundana inanimada. Além do normal, o alvo tem as mesmas características de um construto.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona penalidade de –3 PM.' },
    ],
  },
  {
    id: 'dificultar-deteccao', nome: 'Dificultar Detecção', tipo: 'arcana', escola: 'abjuracao', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura ou objeto', duracao: '1 dia', resistencia: null,
    descricao: 'Esta magia oculta a presença do alvo contra qualquer meio mágico de detecção, inclusive detectar magia. Um conjurador que lance uma magia de adivinhação para detectar a presença ou localização do alvo deve fazer um teste de Vontade. Se falhar, a magia não funciona, mas os PM são gastos mesmo assim. Se for lançada sobre uma criatura, Dificultar Detecção protege tanto a criatura quanto seu equipamento.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alvo para área de cubo de 9m. Qualquer criatura ou objeto na área recebe o efeito da magia enquanto estiver dentro dela.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para 1 semana.' },
    ],
  },
  {
    id: 'dispersar-as-trevas', nome: 'Dispersar as Trevas', tipo: 'divina', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'esfera com 6m de raio', duracao: 'veja texto', resistencia: null,
    descricao: 'Esta magia cria um forte brilho (multicolorido ou de uma cor que remeta a sua divindade) que causa diversos efeitos. Todas as magias de 3º círculo ou menor ativas na área são dissipadas se você passar num teste de Religião contra a CD de cada magia. Seus aliados na área recebem +4 em testes de resistência e redução de trevas 10 até o fim da cena, protegidos por uma aura sutil da mesma cor. Inimigos na área ficam cegos por 1d4 rodadas (apenas uma vez por cena). Dispersar as Trevas anula Anular a Luz (este efeito tem duração instantânea).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus nas resistências em +1.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para curto, a área para alvo 1 criatura e a duração para cena. O alvo fica imune a efeitos de trevas.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o círculo máximo de magias dissipadas para 4º. Requer 4º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o círculo máximo de magias dissipadas para 5º. Requer 5º círculo.' },
    ],
  },
  {
    id: 'enxame-rubro-de-ichabod', nome: 'Enxame Rubro de Ichabod', tipo: 'arcana', escola: 'convocacao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 enxame Grande (quadrado de 3m)', duracao: 'sustentada', resistencia: 'Reflexos reduz à metade',
    descricao: 'Você conjura um enxame de pequenas criaturas da Tormenta. O enxame pode passar pelo espaço de outras criaturas e não impede que outras criaturas entrem no espaço dele. No final de cada um de seus turnos, o enxame causa 4d12 pontos de dano de ácido a qualquer criatura em seu espaço (Reflexos reduz à metade). Você pode gastar uma ação de movimento para mover o enxame com deslocamento de 12m.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, uma criatura que falhe no teste de Reflexos fica agarrada (o enxame escala e cobre o corpo dela). A criatura pode gastar uma ação padrão e fazer um teste de Acrobacia ou Atletismo para escapar. Se você mover o enxame, a criatura fica livre.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d12.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o dano para trevas.' },
      { custoPM: 3, tipo: 'muda', efeito: 'o enxame vira Enorme (quadrado de 6m de lado).' },
      { custoPM: 3, tipo: 'muda', efeito: 'o enxame ganha deslocamento de voo 18m e passa a ocupar um cubo ao invés de um quadrado.' },
      { custoPM: 4, tipo: 'muda', efeito: 'o enxame inclui parasitas que explodem e criam novos enxames. No início de cada um de seus turnos, role 1d6 — em um resultado 5 ou 6, um novo enxame surge adjacente a um já existente à sua escolha. Você pode mover todos os enxames com uma única ação de movimento, mas eles não podem ocupar o mesmo espaço. Requer 4º círculo.' },
    ],
  },
  {
    id: 'erupcao-glacial', nome: 'Erupção Glacial', tipo: 'arcana', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'quadrado de 6m de lado', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Estacas de gelo irrompem do chão. Criaturas na área sofrem 4d6 de dano de corte, 4d6 de dano de frio e ficam caídas. Passar no teste de Reflexos evita o dano de corte e a queda. As estacas duram pela cena, o que torna a área afetada terreno difícil, e concedem cobertura leve para criaturas dentro da área ou atrás dela. As estacas são destruídas caso sofram qualquer quantidade de dano por fogo mágico.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o dano de frio em +2d6 e o dano de corte em +2d6.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a área para cilindro com 6m de raio e 6m de altura e a duração para sustentada. Em vez do normal, a magia cria uma tempestade de granizo que causa 3d6 pontos de dano de impacto e 3d6 pontos de dano de frio em todas as criaturas na área (sem teste de resistência). A tempestade fornece camuflagem leve às criaturas dentro dela e deixa o piso escorregadio (terreno difícil, exigindo testes de Acrobacia para equilíbrio). Requer 4º círculo.' },
    ],
  },
  {
    id: 'ferver-sangue', nome: 'Ferver Sangue', tipo: 'arcana', escola: 'necromancia', circulo: 3,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'sustentada', resistencia: 'Fortitude parcial',
    descricao: 'O sangue do alvo aquece até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, o alvo sofre 4d8 pontos de dano de fogo e fica enjoado por uma rodada (Fortitude reduz o dano à metade e evita a condição). Se o alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se o alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Reflexos reduz à metade). Essa magia não afeta criaturas sem sangue, como construtos ou mortos-vivos.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda alvo para criaturas escolhidas. Requer 5º círculo.' },
    ],
  },
  {
    id: 'globo-de-invulnerabilidade', nome: 'Globo de Invulnerabilidade', tipo: 'arcana', escola: 'abjuracao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você é envolto por uma esfera mágica brilhante com 3m de raio, que detém qualquer magia de 2º círculo ou menor. Nenhuma magia pode ser lançada contra um alvo dentro do globo e magias de área não têm efeito dentro dele (mas magias ainda podem ser lançadas de dentro para fora). Uma magia que dissipe outras magias só dissipa o globo se for usada diretamente sobre você, não o afetando se usada em área. Efeitos mágicos não são dissipados quando entram na esfera, apenas suprimidos (voltam a funcionar fora do globo, caso sua duração não tenha acabado). O globo é imóvel e não tem efeito sobre criaturas ou objetos. Após lançá-lo, você pode entrar ou sair livremente.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o efeito para afetar magias de até 3º círculo. Requer 4º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o efeito para afetar magias de até 4º círculo. Requer 5º círculo.' },
    ],
  },
  {
    id: 'heroismo', nome: 'Heroísmo', tipo: 'divina', escola: 'encantamento', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia imbui uma criatura com coragem e valentia. O alvo fica imune a medo e recebe 40 PV temporários e +4 em testes de ataque e rolagens de dano contra o inimigo de maior ND na cena.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o bônus para +6.' },
    ],
  },
  {
    id: 'ilusao-lacerante', nome: 'Ilusão Lacerante', tipo: 'arcana', escola: 'ilusao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'cubo de 9m', duracao: 'sustentada', resistencia: 'Vontade anula',
    descricao: 'Você cria uma ilusão de algum perigo mortal. Quando a magia é lançada, criaturas na área devem fazer um teste de Vontade; uma falha significa que a criatura acredita que a ilusão é real e sofre 3d6 pontos de dano psíquico não letal. Sempre que uma criatura iniciar seu turno dentro da área, deve repetir o teste de Vontade. Se falhar, sofre o dano novamente. Somente criaturas que falham veem a ilusão, e racionalizam o efeito sempre que falham no teste.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a área para um cubo de 90m. Requer 4º círculo.' },
    ],
  },
  {
    id: 'imobilizar', nome: 'Imobilizar', tipo: 'universal', escola: 'encantamento', circulo: 3,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 humanoide ou animal', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'O alvo fica paralisado; se passar na resistência, em vez disso fica lento. A cada rodada, pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, se liberta do efeito.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alvo para 1 espírito.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o alvo para 1 criatura. Requer 4º círculo.' },
    ],
  },
  {
    id: 'lanca-ignea-de-aleph', nome: 'Lança Ígnea de Aleph', tipo: 'arcana', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Esta magia foi desenvolvida pelo mago imortal Aleph Olhos Vermelhos, um entusiasta dos estudos vulcânicos. Ela dispara um projétil de magma contra o alvo, que sofre 4d6 pontos de dano de fogo e 4d6 pontos de dano de perfuração e fica em chamas. As chamas causam 2d6 pontos de dano por rodada, em vez do dano normal. Se passar no teste de resistência, o alvo sofre metade do dano e não fica em chamas. Respingos de rocha incandescente se espalham com a explosão, atingindo todas as criaturas adjacentes ao alvo, que devem fazer um teste de Reflexos — se falharem, ficam em chamas, como descrito acima.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o dano inicial em +2d6 e o dano do efeito em chamas em +1d6.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para cena ou até ser descarregada. Em vez do efeito normal, a magia cria quatro dardos de lava que flutuam ao lado do conjurador. Uma vez por rodada, como uma ação livre, você pode disparar um dos dardos em uma criatura, causando o efeito normal da magia. Requer 4º círculo.' },
    ],
  },
  {
    id: 'lendas-e-historias', nome: 'Lendas e Histórias', tipo: 'universal', escola: 'adivinhacao', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura, objeto ou local', duracao: 'sustentada', resistencia: null,
    descricao: 'Você descobre informações sobre uma criatura, objeto ou local que esteja tocando. O que exatamente você descobre depende do mestre: talvez você não descubra tudo que há para saber, mas ganhe pistas para continuar a investigação. A cada rodada que mantiver a magia, você descobre: todas as informações sobre o alvo (como se tivesse passado em todos os testes de Conhecimento), todas as habilidades do alvo (se criatura: raça, classe, nível, atributos, magias, resistências e fraquezas; se item mágico: efeito e funcionamento), e se o alvo está sob influência de alguma magia, com todas as informações sobre ela.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda a execução para um dia, o alcance para ilimitado e adiciona componente material (cuba de ouro cheia d\'água e ingredientes mágicos, no valor de T$ 1.000). Você ainda precisa ter alguma informação sobre o alvo, como um nome, descrição ou localização.' },
    ],
  },
  {
    id: 'manto-de-sombras', nome: 'Manto de Sombras', tipo: 'universal', escola: 'ilusao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você fica coberto por um manto de energia sombria. Nesta forma, torna-se incorpóreo (inclui seu equipamento): só pode ser afetado por armas e habilidades mágicas, ou por outras criaturas incorpóreas, e pode atravessar objetos sólidos, mas não manipulá-los. Também não pode atacar criaturas normais (mas ainda pode lançar magias nelas). Além disso, se torna vulnerável à luz direta: se exposto a uma fonte de luz, sofre 1 ponto de dano por rodada. Você pode gastar uma ação de movimento e 1 PM para "entrar" em uma sombra do seu tamanho ou maior e se teletransportar para outra sombra, também do seu tamanho ou maior, em alcance médio.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura voluntária. Requer 4º círculo.' },
    ],
  },
  {
    id: 'miragem', nome: 'Miragem', tipo: 'arcana', escola: 'ilusao', circulo: 3,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'cubo de até 90m de lado', duracao: '1 dia', resistencia: 'Vontade desacredita',
    descricao: 'Você faz um terreno parecer outro, incluindo sons e cheiros. Uma planície pode parecer um pântano, uma floresta pode parecer uma montanha etc. Esta magia pode ser usada para criar armadilhas: areia movediça pode parecer terra firme ou um precipício pode parecer um lago. Você pode alterar, incluir e esconder estruturas dentro da área, mas não criaturas (embora elas possam se esconder nas estruturas ilusórias).',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'além do normal, pode alterar a aparência de criaturas escolhidas na área, como se usando Disfarce Ilusório.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona componente material (pó de diamante no valor de T$ 1.000). Requer 4º círculo.' },
    ],
  },
  {
    id: 'missao-divina', nome: 'Missão Divina', tipo: 'divina', escola: 'encantamento', circulo: 3,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: '1 semana ou até ser descarregada', resistencia: 'Vontade anula (veja texto)',
    descricao: 'Esta magia obriga o alvo a cumprir uma tarefa a sua escolha. Ela dura uma semana ou até o alvo cumprir a tarefa, o que vier primeiro. O alvo pode recusar a missão — mas, no fim de cada dia em que não se esforçar para cumprir a tarefa, deve fazer um teste de Vontade; se falhar, sofre uma penalidade cumulativa de –2 em todos os testes e rolagens. A Missão Divina não pode forçar um ato suicida, nem uma missão impossível (como matar um ser que não existe).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para toque, a duração para permanente e adiciona penalidade de –1 PM. Em vez do normal, você inscreve uma marca (como uma tatuagem) na pele do alvo e escolhe um tipo de ação que ativará a marca — normalmente, cometer um crime ou outra coisa contrária às Obrigações & Restrições de sua divindade. Sempre que a marca é ativada, o alvo recebe uma penalidade cumulativa de –2 em todos os testes. Uma magia que dissipe outras suprime a marca e suas penalidades por um dia; elas só podem ser totalmente removidas pelo conjurador original ou pela magia Purificação.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para 1 ano ou até ser descarregada.' },
    ],
  },
  {
    id: 'muralha-elemental', nome: 'Muralha Elemental', tipo: 'arcana', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'muralha de energia', duracao: 'cena', resistencia: 'veja texto',
    descricao: 'Uma muralha de um elemento a sua escolha se eleva da terra. Ela pode ser um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 3m de raio. Os efeitos variam conforme o elemento escolhido abaixo.',
    opcoes: [
      { nome: 'Fogo', descricao: 'Faz surgir uma violenta cortina de chamas — um lado da muralha (a sua escolha) emite ondas de calor, causando 2d6 pontos de dano de fogo em criaturas a até 6m quando você lança a magia e no início de seus turnos. Atravessar a muralha causa 8d6 pontos de dano de fogo.' },
      { nome: 'Gelo', descricao: 'Evoca uma parede grossa de gelo denso com 15cm de espessura (na forma de cúpula, pode prender criaturas, com direito a um teste de Reflexos para escapar antes que se forme). Cada trecho de 3m tem Defesa 8, 40 PV e RD 5 (fogo causa dano dobrado à muralha). Atravessar um trecho rompido causa 4d6 de dano de frio.' },
    ],
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano por atravessar a muralha em +2d6.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o comprimento em +15m e altura em +3m, até 60m de comprimento e 9m de altura.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para sustentada e adiciona uma nova escolha, Essência: a muralha é invisível e indestrutível — imune a qualquer forma de dano e não afetada por nenhuma magia, e não pode ser atravessada nem mesmo por criaturas incorpóreas (mas magias que teletransportam, como Salto Dimensional, podem atravessá-la; magias e efeitos de dano de área não vencem a muralha, mas magias lançadas diretamente sobre um alvo do outro lado ainda funcionam como se houvesse linha de efeito). Requer 4º círculo.' },
    ],
  },
  {
    id: 'pele-de-pedra', nome: 'Pele de Pedra', tipo: 'universal', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Sua pele ganha aspecto e dureza de rocha. Você recebe redução de dano 5.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para um dia.' },
      { custoPM: 4, tipo: 'muda', efeito: 'sua pele ganha aspecto e dureza de aço. Você recebe redução de dano 10. Requer 4º círculo.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para toque, o alvo para 1 criatura, a duração para 1d4 rodadas e adiciona Resistência: Fortitude anula. Em vez do efeito normal, a magia transforma o alvo e seu equipamento em uma estátua inerte e sem consciência. A estátua possui os mesmos PV da criatura e redução de dano 8; se for quebrada, a criatura morrerá. Requer 4º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'como acima, mas com duração permanente. Requer 5º círculo.' },
    ],
  },
  {
    id: 'poeira-da-podridao', nome: 'Poeira da Podridão', tipo: 'divina', escola: 'necromancia', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'nuvem com 6m de raio', duracao: 'cena', resistencia: 'Fortitude (veja texto)',
    descricao: 'Você manifesta uma nuvem de poeira carregada de energia negativa, que apodrece lentamente as criaturas na área. Ao lançar a magia, e no início de seus turnos, criaturas na área sofrem 2d8+8 pontos de dano de trevas (Fortitude reduz à metade). Alvos que falharem no teste não podem recuperar PV por uma rodada.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d8+4.' },
    ],
  },
  {
    id: 'potencia-divina', nome: 'Potência Divina', tipo: 'divina', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você canaliza o poder de sua divindade. Você aumenta uma categoria de tamanho (seu equipamento muda de acordo) e recebe Força +4 e RD 10. Você não pode lançar magias enquanto estiver sob efeito de Potência Divina.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o bônus de Força em +1.' },
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta a RD em +5.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura. A magia falha se você e o alvo não forem devotos da mesma divindade.' },
    ],
  },
  {
    id: 'protecao-contra-magia', nome: 'Proteção contra Magia', tipo: 'divina', escola: 'abjuracao', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você protege o alvo contra efeitos mágicos nocivos. O alvo recebe +5 em testes de resistência contra magias.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o bônus para +10. Requer 4º círculo.' },
      { custoPM: 4, tipo: 'muda', efeito: 'em vez do normal, o alvo fica imune a uma escola de magia a sua escolha. Requer 4º círculo.' },
      { custoPM: 9, tipo: 'muda', efeito: 'em vez do normal, o alvo fica imune a duas escolas de magia a sua escolha. Requer 5º círculo.' },
    ],
  },

  // Achado de bônus durante a extração do Círculo 3 (estava contaminando o
  // final de "Heroísmo") — pertence de verdade ao CÍRCULO 1.
  {
    id: 'hipnotismo', nome: 'Hipnotismo', tipo: 'arcana', escola: 'encantamento', circulo: 1,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 animal ou humanoide', duracao: '1d4 rodadas', resistencia: 'Vontade anula',
    descricao: 'Suas palavras e movimentos ritmados deixam o alvo fascinado. Esta magia só afeta criaturas que possam perceber você. Se usar esta magia em combate, o alvo recebe +5 em seu teste de resistência. Se a criatura passar, fica imune a este efeito por um dia.',
    aprimoramentos: [
      { custoPM: 0, tipo: 'truque', efeito: 'muda a duração para 1 rodada. Em vez de fascinado, o alvo fica pasmo (apenas uma vez por cena).' },
      { custoPM: 1, tipo: 'muda', efeito: 'como o normal, mas alvos que passem na resistência não sabem que foram vítimas de uma magia.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para animais ou humanoides escolhidos.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda a duração para sustentada.' },
      { custoPM: 2, tipo: 'muda', efeito: 'também afeta espíritos e monstros na área. Requer 2º círculo.' },
      { custoPM: 5, tipo: 'muda', efeito: 'também afeta construtos, espíritos, monstros e mortos-vivos na área. Requer 3º círculo.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
    ],
  },

  {
    id: 'segunda-chance', nome: 'Segunda Chance', tipo: 'divina', escola: 'evocacao', circulo: 5,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: null,
    descricao: 'Um brilho de luz, na forma de asas de fênix, emana do alvo. Ele recupera 200 pontos de vida e se cura de qualquer das seguintes condições: abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, envenenado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, ofuscado, paralisado, pasmo ou surdo.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta a cura em +20 PV.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para até 5 criaturas.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para uma criatura que tenha morrido há até uma rodada. Esta magia pode curá-la.' },
    ],
  },
  {
    id: 'selo-de-mana', nome: 'Selo de Mana', tipo: 'universal', escola: 'encantamento', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'Seu toque manifesta um selo mágico na pele do alvo, que atrapalha o fluxo de mana. Pela duração da magia, sempre que o alvo realizar qualquer ação que gaste PM, deve fazer um teste de Vontade; se passar, faz a ação normalmente. Se falhar, a ação não tem efeito (mas os PM são gastos mesmo assim).',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para criaturas escolhidas dentro do alcance. Requer 4º círculo.' },
    ],
  },
  {
    id: 'servo-divino', nome: 'Servo Divino', tipo: 'divina', escola: 'convocacao', circulo: 3,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'criatura conjurada', duracao: 'cena ou até ser descarregada', resistencia: null,
    descricao: 'Você pede a sua divindade que envie um espírito para ajudá-lo. Esse espírito realiza uma tarefa a sua escolha que possa ser cumprida em até uma hora — desde algo simples até algo complexo. A magia é descarregada quando a criatura cumpre a tarefa, retornando a seu plano natal. O tipo de criatura é escolhido pelo mestre, de acordo com as necessidades da tarefa. Componente material: um pagamento de T$ 100 ao espírito (a forma de pagamento varia — doações a um templo, um item mágico ou mesmo dinheiro).',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para um dia ou até ser descarregada. O espírito realiza uma tarefa a sua escolha que exija até um dia. O custo do pagamento aumenta para T$ 500.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a duração para 1 semana ou até ser descarregada. O espírito realiza uma tarefa que exija até uma semana. O custo do pagamento aumenta para T$ 1.000.' },
    ],
  },
  {
    id: 'servo-morto-vivo', nome: 'Servo Morto-Vivo', tipo: 'universal', escola: 'necromancia', circulo: 3,
    execucao: 'completa', alcance: 'toque', alvoArea: '1 cadáver', duracao: 'instantânea', resistencia: null,
    descricao: 'Esta magia transforma o cadáver de um humanoide, animal ou monstro em um esqueleto ou zumbi (conforme o estado de conservação do corpo). O morto-vivo então obedece a todos os seus comandos, mesmo suicidas. Se quiser que o morto-vivo o acompanhe, ele funciona como um parceiro iniciante, de um tipo a sua escolha entre ajudante, atirador, combatente, fortão, guardião ou montaria. Uma vez por rodada, quando sofre dano, você pode sacrificar um servo morto-vivo e evitar esse dano (o servo é destruído no processo e não pode ser reanimado). Componente material: um ônix negro (T$ 100), inserido na boca ou olho do cadáver.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda o componente material para pó de ônix negro (T$ 500). Em vez de um zumbi ou esqueleto, cria um carniçal. Ele pode funcionar como um parceiro veterano, escolhido entre ajudante, atirador, combatente, fortão ou guardião.' },
      { custoPM: 3, tipo: 'muda', efeito: 'muda o componente material para pó de ônix negro (T$ 500). Em vez de um zumbi ou esqueleto, cria uma sombra. Ela pode funcionar como um parceiro veterano, escolhido entre assassino, combatente ou perseguidor.' },
      { custoPM: 7, tipo: 'muda', efeito: 'muda o componente material para ferramentas de embalsamar (T$ 1.000). Em vez de um zumbi ou esqueleto, cria uma múmia. Ela pode funcionar como um parceiro mestre, escolhido entre ajudante, destruidor, guardião ou médico. Requer 4º círculo.' },
    ],
  },
  {
    id: 'sopro-da-salvacao', nome: 'Sopro da Salvação', tipo: 'divina', escola: 'evocacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 9m', duracao: 'instantânea', resistencia: null,
    descricao: 'Você enche seus pulmões de luz e energia positiva e sopra um cone de poeira reluzente. O sopro afeta apenas seus aliados na área, curando 2d8+4 pontos de vida e removendo uma das seguintes condições de todos os alvos: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a cura em +1d8+2.' },
      { custoPM: 4, tipo: 'muda', efeito: 'além do normal, se um aliado estiver com PV negativos, seus PV são levados a 0 e então a cura é aplicada.' },
      { custoPM: 4, tipo: 'muda', efeito: 'remove todas as condições listadas, em vez de apenas uma.' },
    ],
  },
  {
    id: 'telecinesia', nome: 'Telecinesia', tipo: 'arcana', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'veja texto', duracao: 'sustentada ou instantânea (veja texto)', resistencia: null,
    descricao: 'Você move objetos ou criaturas se concentrando. Ao lançar a magia, escolha uma das opções abaixo.',
    opcoes: [
      { nome: 'Força Contínua', descricao: 'Move uma criatura Média ou menor, ou objeto de até 10 espaços, a até 6m por rodada. A criatura pode anular o efeito com teste de Vontade. Cai no chão se sair do alcance ou a magia terminar. Duração sustentada.' },
      { nome: 'Empurrão Violento', descricao: 'A energia é expelida de uma vez e arremessa até 10 objetos a até 10 espaços cada, que devem estar a até 3m uns dos outros. Objetos arremessados podem atingir criaturas causando de 1 a 1d6 de dano de impacto por espaço dependendo do tipo de objeto (Reflexos reduz à metade). Criaturas Médias ou menores também podem ser arremessadas, com direito a teste de Vontade. Uma criatura arremessada contra superfície sólida sofre 1d6 de dano de impacto para cada 3m voado. Duração instantânea.' },
    ],
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o tamanho máximo da criatura em uma categoria (para Grande, Enorme e Colossal) ou dobra a quantidade de espaços do objeto.' },
    ],
  },
  {
    id: 'teletransporte', nome: 'Teletransporte', tipo: 'arcana', escola: 'convocacao', circulo: 3,
    execucao: 'padrão', alcance: 'toque', alvoArea: 'até 5 criaturas voluntárias', duracao: 'instantânea', resistencia: null,
    descricao: 'Esta magia transporta os alvos para um lugar a sua escolha a até 1.000km. Você precisa fazer um teste de Misticismo, com dificuldade que depende de seu conhecimento sobre o local de destino: CD 20 (lugar familiar, que você visita com frequência), CD 30 (lugar conhecido, que já visitou pelo menos uma vez) ou CD 40 (lugar que nunca visitou e só conhece pela descrição de outra pessoa que esteve lá). Você não pode se teletransportar para um lugar que nunca visitou sem a descrição de alguém. Se passar no teste, os alvos chegam ao lugar desejado. Se falhar, surgem 1d10 x 10km afastados em qualquer direção. Se falhar por 5 ou mais, você chega em um lugar parecido, mas errado. Se rolar 1 natural, a magia falha (mas gasta os PM) e você fica atordoado por 1d4 rodadas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +5.' },
      { custoPM: 2, tipo: 'muda', efeito: 'em vez do normal, a magia teletransporta os alvos para seu santuário — um local familiar e previamente preparado. A magia pode ser usada sem limite de distância ou necessidade de testes, mas apenas dentro do mesmo plano. Preparar um local como seu santuário exige um ritual de um dia e o gasto de T$ 1.000. Você só pode ter um santuário por vez.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda a execução para ação completa, a duração para cena e adiciona sacrifício de 1 PM. Em vez do normal, você cria um círculo de 1,5m de diâmetro no chão, que transporta qualquer criatura que pisar nele. O destino é escolhido quando a magia é lançada e pode ser qualquer lugar, em qualquer mundo, sem necessidade de testes, desde que seja conhecido por você. O círculo é tênue e praticamente invisível. Requer 5º círculo.' },
    ],
  },
  {
    id: 'tentaculos-de-trevas', nome: 'Tentáculos de Trevas', tipo: 'arcana', escola: 'necromancia', circulo: 3,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'esfera com 6m de raio', duracao: 'cena', resistencia: null,
    descricao: 'Um círculo de energias sombrias se abre no chão, de onde surgem tentáculos feitos de treva viscosa. Ao lançar a magia e no início de cada um de seus turnos, você faz um teste da manobra agarrar (usando seu valor de Misticismo) contra cada criatura na área. Se você passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 4d6 pontos de dano de trevas. A área conta como terreno difícil. Os tentáculos são imunes a dano.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o raio da área em +3m.' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano dos tentáculos em +2d6.' },
    ],
  },
  {
    id: 'transformacao-de-guerra', nome: 'Transformação de Guerra', tipo: 'arcana', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você se torna uma máquina de combate, ficando mais forte, rápido e resistente. Você recebe +6 na Defesa, testes de ataque e rolagens de dano corpo a corpo, e 30 PV temporários. Durante a Transformação de Guerra você não pode lançar magias, mas se torna proficiente em todas as armas.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os bônus na Defesa, testes de ataque e rolagens de dano corpo a corpo em +1, e os PV temporários em +10.' },
      { custoPM: 2, tipo: 'muda', efeito: 'adiciona componente material (barra de adamante no valor de T$ 100). Sua forma de combate ganha um aspecto metálico e sem expressões. Além do normal, você recebe redução de dano 10 e imunidade a atordoamento e efeitos de cansaço, encantamento, metabolismo, trevas e veneno, e não precisa respirar.' },
    ],
  },
  {
    id: 'viagem-arborea', nome: 'Viagem Arbórea', tipo: 'divina', escola: 'convocacao', circulo: 3,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Como parte da execução, você entra em uma árvore adjacente que seja maior do que você. Você pode permanecer dentro da árvore, percebendo os arredores de forma normal (mas sem poder fazer ações). Você pode gastar uma ação de movimento para sair dessa árvore, ou de qualquer outra dentro de 1km. Se estiver dentro de uma árvore que seja destruída, a magia termina e você sofre 10d6 pontos de dano de impacto. Enquanto a magia durar, você pode gastar uma ação de movimento e 1 PM para entrar em outras árvores.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para toque, o alvo para até cinco criaturas e a duração para instantânea. Os alvos entram em uma planta (de tamanho Médio ou maior) e saem em outra planta do mesmo tamanho a até 100km de distância, especificada em direção e distância aproximadas (como "50km ao norte").' },
    ],
  },
  {
    id: 'videncia', nome: 'Vidência', tipo: 'universal', escola: 'adivinhacao', circulo: 3,
    execucao: 'completa', alcance: 'ilimitado', alvoArea: '1 criatura', duracao: 'sustentada', resistencia: 'Vontade anula',
    descricao: 'Através de uma superfície reflexiva (bacia de água benta para clérigos, lago para druidas, bola de cristal para magos, espelho para feiticeiros etc.) você pode ver e ouvir uma criatura escolhida e seus arredores (cerca de 6m em qualquer direção), mesmo que ela se mova. O alvo pode estar a qualquer distância, mas se passar em um teste de Vontade, a magia falha. A vítima recebe bônus ou penalidades em seu teste de resistência, dependendo do conhecimento que você tiver dela.',
    tabela: {
      colunas: ['Conhecimento sobre o alvo', 'Modificador'],
      linhas: [
        ['Não conhece o alvo', '+10'],
        ['Ouviu falar do alvo', '+5'],
        ['O alvo está em outro plano ou mundo', '+5'],
        ['Já encontrou o alvo pessoalmente', '+0'],
        ['Tem uma pintura, escultura ou outra representação do alvo', '–2'],
        ['Conhece bem o alvo', '–5'],
        ['Tem um pertence pessoal ou peça de roupa do alvo', '–5'],
        ['Tem uma parte do corpo do alvo (unhas, cabelos...)', '–10'],
      ],
    },
    aprimoramentos: [],
  },
  {
    id: 'voo', nome: 'Voo', tipo: 'arcana', escola: 'transmutacao', circulo: 3,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Você recebe deslocamento de voo 12m. Voar por meio desta magia é simples como andar — você pode atacar e lançar magias normalmente enquanto voa. Quando a magia termina, você desce lentamente até o chão, como se estivesse sob efeito de Queda Suave.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para um dia. Requer 4º círculo.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para até 10 criaturas. Requer 4º círculo.' },
    ],
  },
  {
    id: 'ancora-dimensional', nome: 'Âncora Dimensional', tipo: 'arcana', escola: 'abjuracao', circulo: 3,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura ou objeto', duracao: 'cena', resistencia: null,
    descricao: 'O alvo é envolvido por um campo de força cor de esmeralda que impede qualquer movimento planar. Isso inclui magias de convocação (como Salto Dimensional e Teletransporte), viagens astrais e a habilidade incorpóreo.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para médio, a área para esfera com 3m de raio e o alvo para criaturas escolhidas.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o efeito para criar um fio de energia cor de esmeralda que prende o alvo a um ponto no espaço dentro do alcance (o ponto precisa ser fixo, mas não precisa de apoio ou superfície). O alvo não pode se afastar mais de 3m do ponto, nem fisicamente, nem com movimento planar. O fio possui 20 PV e redução de dano 20 (mas pode ser dissipado por efeitos que libertam criaturas, como o Julgamento Divino: Libertação do paladino).' },
      { custoPM: 4, tipo: 'muda', efeito: 'como acima, mas em vez de um fio, cria uma corrente de energia, com 20 PV e redução de dano 40.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda o alvo para área de cubo de 9m, a duração para permanente e adiciona componente material (chave de esmeralda no valor de T$ 2.000). Em vez do normal, nenhum tipo de movimento planar pode ser feito para entrar ou sair da área.' },
      { custoPM: 9, tipo: 'muda', efeito: 'muda o alcance para médio, a área para esfera com 3m de raio e o alvo para criaturas escolhidas. Cria um fio de energia (veja acima) que prende todos os alvos ao centro da área.' },
    ],
  },

  // ══════════════════════ CÍRCULO 4 (30 confirmadas) ══════════════════════

  {
    id: 'alterar-memoria', nome: 'Alterar Memória', tipo: 'arcana', escola: 'encantamento', circulo: 4,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Vontade anula',
    descricao: 'Você invade a mente do alvo e altera ou apaga suas memórias da última hora.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para pessoal e o alvo para área cone de 4,5m.' },
      { custoPM: 5, tipo: 'muda', efeito: 'você pode alterar ou apagar as memórias das últimas 24 horas.' },
    ],
  },
  {
    id: 'animar-objetos', nome: 'Animar Objetos', tipo: 'arcana', escola: 'transmutacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'até 8 objetos Minúsculos ou Pequenos, 4 objetos Médios, 2 objetos Grandes ou 1 objeto Enorme', duracao: 'cena', resistencia: null,
    descricao: 'Você concede vida a objetos inanimados. Cada objeto se torna um parceiro sob seu controle. O tipo dele é escolhido da tabela abaixo, de acordo com o tamanho, e ele não conta em seu limite de parceiros. Com uma ação de movimento, você pode comandar mentalmente qualquer objeto animado dentro do alcance para que auxilie você ou outra criatura. Objetos animados são construtos com valores de Força, Destreza e PV de acordo com seu tamanho (todos os outros atributos são nulos, não têm Defesa ou testes de resistência e falham automaticamente em qualquer teste oposto). Diferente de parceiros comuns, um objeto pode ser alvo de ações hostis. Esta magia não afeta itens mágicos, nem objetos que estejam sendo carregados por outra criatura.',
    tabela: {
      colunas: ['Tamanho', 'For / Des / PV', 'Tipo de parceiro'],
      linhas: [
        ['Minúsculo', 'For –3 / Des 4 / 5 PV', 'Assassino ou Combatente Iniciante'],
        ['Pequeno', 'For –2 / Des 2 / 10 PV', 'Combatente ou Guardião Iniciante'],
        ['Médio', 'For 0 / Des 1 / 20 PV', 'Combatente ou Guardião Veterano'],
        ['Grande', 'For 2 / Des 0 / 40 PV', 'Fortão, Guardião ou Montaria Veterano'],
        ['Enorme', 'For 4 / Des –2 / 80 PV', 'Fortão, Guardião ou Montaria Mestre'],
      ],
    },
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona componente material (prataria no valor de T$ 1.000). Você pode ter um máximo de objetos animados igual à metade do seu nível.' },
    ],
  },
  {
    id: 'assassino-fantasmagorico', nome: 'Assassino Fantasmagórico', tipo: 'arcana', escola: 'necromancia', circulo: 4,
    execucao: 'padrão', alcance: 'longo', alvoArea: '1 criatura', duracao: 'cena, até ser descarregada', resistencia: 'Vontade anula, Fortitude parcial',
    descricao: 'Usando os medos subconscientes do alvo, você cria uma imagem daquilo que ele mais teme. Apenas a própria vítima pode ver o Assassino Fantasmagórico com nitidez; outras criaturas presentes (incluindo o conjurador) enxergam apenas um espectro sombrio. Quando você lança a magia, o espectro surge adjacente a você e a vítima faz um teste de Vontade — se passar, percebe que o espectro é uma ilusão e a magia é dissipada; se falhar, acredita na existência do espectro, que então flutua 18m por rodada em direção à vítima, sempre no fim do seu turno. Ele é incorpóreo e imune a magias (exceto magias que dissipam outras). Se o espectro terminar seu turno adjacente à vítima, ela deve fazer um teste de Fortitude. Se passar, sofre 6d6 pontos de dano de trevas (este dano não pode reduzir o alvo a menos de 0 PV e não o deixa sangrando). Se falhar, sofre um colapso, ficando imediatamente com –1 PV e sangrando. O espectro persegue o alvo implacavelmente. Ele desaparece se o alvo ficar inconsciente ou se afastar além de alcance longo dele, ou se for dissipado.',
    aprimoramentos: [],
  },
  {
    id: 'campo-antimagia', nome: 'Campo Antimagia', tipo: 'arcana', escola: 'abjuracao', circulo: 4,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você é cercado por uma barreira invisível com 3m de raio que o acompanha. Qualquer habilidade mágica ou item mágico que entre na área da barreira é suprimida enquanto estiver lá. Criaturas convocadas que entrem em um Campo Antimagia desaparecem. Elas reaparecem na mesma posição quando a duração do Campo termina — supondo que a duração da magia que as convocou ainda não tenha terminado.',
    aprimoramentos: [],
  },
  {
    id: 'conceder-milagre', nome: 'Conceder Milagre', tipo: 'divina', escola: 'encantamento', circulo: 4,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'permanente até ser descarregada', resistencia: null,
    descricao: 'Você transfere um pouco de seu poder divino a outra criatura. Escolha uma magia de até 2º círculo que você conheça; o alvo pode lançar essa magia uma vez, sem pagar o custo dela em PM (aprimoramentos podem ser usados, mas o alvo deve gastar seus próprios PM). Você sofre uma penalidade de –3 PM até que o alvo lance a magia.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'muda', efeito: 'muda o círculo da magia concedida para 3º e a penalidade de PM para –6.' },
    ],
  },
  {
    id: 'conjurar-elemental', nome: 'Conjurar Elemental', tipo: 'arcana', escola: 'convocacao', circulo: 4,
    execucao: 'completa', alcance: 'médio', alvoArea: 'parceiro elemental', duracao: 'sustentada', resistencia: null,
    descricao: 'Esta magia transforma uma porção de um elemento inerte em uma criatura elemental Grande do tipo do elemento alvo. Por exemplo, lançar esta magia numa fogueira ou tocha cria um elemental do fogo. Você pode criar elementais do ar, água, fogo e terra com essa magia — escolha um deles abaixo. O elemental obedece a todos os seus comandos e pode funcionar como um parceiro do tipo destruidor (cuja habilidade custa apenas 2 PM para ser usada) e mais um tipo entre os indicados, ambos mestres. O elemental auxilia apenas você e não conta em seu limite de parceiros. Para efeitos de jogo, o elemental tem For 2, Des 3 e todos os outros atributos nulos. Ele tem Defesa igual a sua, 20 PV, usa o seu valor em Reflexos e é imune a efeitos que pedem um teste de Fortitude ou Vontade.',
    opcoes: [
      { nome: 'Ar', descricao: 'Parceiro do tipo assassino, perseguidor ou vigilante. Dano de eletricidade.' },
      { nome: 'Água', descricao: 'Parceiro do tipo ajudante, guardião ou médico. Dano de frio.' },
      { nome: 'Fogo', descricao: 'Parceiro do tipo atirador, combatente ou fortão. Dano de fogo.' },
      { nome: 'Terra', descricao: 'Parceiro do tipo combatente, guardião ou montaria. Dano de impacto.' },
    ],
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'o elemental muda para Enorme e recebe dois tipos de parceiro indicados no seu elemento.' },
      { custoPM: 5, tipo: 'muda', efeito: 'você convoca um elemental de cada tipo. Quando lança a magia, você pode escolher se cada elemental vai auxiliar você ou um aliado no alcance. Requer 5º círculo.' },
    ],
  },
  {
    id: 'controlar-a-gravidade', nome: 'Controlar a Gravidade', tipo: 'arcana', escola: 'transmutacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'cubo de 12m de lado', duracao: 'sustentada', resistencia: null,
    descricao: 'Você controla os efeitos da gravidade dentro da área. Ao lançar a magia, escolha um dos efeitos abaixo (pode gastar uma ação padrão para mudar o efeito enquanto a magia durar).',
    opcoes: [
      { nome: 'Aumentar', descricao: 'No início de seus turnos, cada criatura na área deve fazer um teste de Atletismo — se passar, fica fatigada; se falhar, fica fatigada e caída.' },
      { nome: 'Inverter', descricao: 'Inverte a gravidade da área, fazendo criaturas e objetos "caírem" para cima, atingindo o topo (12m) em uma rodada. Se um obstáculo impedir o movimento, sofrem 1d6 de dano de impacto para cada 1,5m de "queda"; sem obstáculo, ficam flutuando no topo sem poder sair do lugar. Criaturas voadoras se movem normalmente. Alguém adjacente a algo que possa agarrar tem direito a um teste de Reflexos para evitar a "queda", mas deve permanecer preso pela duração ou "cairá".' },
      { nome: 'Reduzir', descricao: 'Criaturas ou objetos livres Médios ou menores flutuam para cima e para baixo conforme sua vontade, com deslocamento de voo 6m. Criaturas na área recebem +20 em testes de Atletismo para escalar e saltar. Uma criatura levitando fica instável, sofrendo –2 em testes de ataque.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'controlar-o-clima', nome: 'Controlar o Clima', tipo: 'divina', escola: 'transmutacao', circulo: 4,
    execucao: 'completa', alcance: '2km', alvoArea: 'esfera com 2km de raio', duracao: '4d12 horas', resistencia: null,
    descricao: 'Você muda o clima da área onde se encontra, podendo criar qualquer condição climática: chuva, neve, ventos, névoas... Veja o Capítulo 6: O Mestre para os efeitos do clima.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: '(Apenas Druidas) muda o raio da área para 3km e a duração para 1d4 dias.' },
    ],
  },

  {
    id: 'circulo-da-restauracao', nome: 'Círculo da Restauração', tipo: 'divina', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'esfera com 3m de raio', duracao: '5 rodadas', resistencia: null,
    descricao: 'Você evoca um círculo de luz que emana uma energia poderosa. Qualquer criatura viva que termine o turno dentro do círculo recupera 3d8+3 PV e 1 PM. Mortos-vivos e criaturas que sofrem dano por luz perdem PV e PM na mesma quantidade. Uma criatura pode recuperar no máximo 5 PM por dia com esta magia.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a regeneração de PV em 1d8+1.' },
    ],
  },
  {
    id: 'cupula-de-repulsao', nome: 'Cúpula de Repulsão', tipo: 'divina', escola: 'abjuracao', circulo: 4,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: 'Vontade anula',
    descricao: 'Uma cúpula de energia invisível o cerca, impedindo a aproximação de certas criaturas. Escolha um tipo de criatura (animais, espíritos, monstros...) ou uma raça de humanoides (elfos, goblins, minotauros...). Criaturas do grupo escolhido que tentem se aproximar a menos de 3m de você devem fazer um teste de Vontade — se falharem, não conseguem, gastam a ação e só podem tentar novamente na rodada seguinte. Isso impede ataques corpo a corpo, mas não ataques ou outros efeitos à distância. Se você tentar se aproximar além do limite de 3m, rompe a cúpula e a magia é dissipada.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'a cúpula impede criaturas de se aproximarem a menos de 4,5m de você (dois quadrados entre você e as criaturas).' },
      { custoPM: 5, tipo: 'muda', efeito: 'além do normal, criaturas afetadas também precisam fazer o teste de resistência se fizerem um ataque ou efeito à distância contra você. Se falharem, o efeito é desviado pela cúpula. Requer 5º círculo.' },
    ],
  },
  {
    id: 'desintegrar', nome: 'Desintegrar', tipo: 'arcana', escola: 'transmutacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura ou objeto', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Você dispara um raio fino e esverdeado que causa 10d12 pontos de dano de essência. Se o alvo passar no teste de resistência, em vez disso sofre 2d12 pontos de dano. Independentemente do resultado do teste de Fortitude, se os PV do alvo forem reduzidos a 0 ou menos, ele será completamente desintegrado, restando apenas pó.',
    aprimoramentos: [
      { custoPM: 4, tipo: 'aumenta', efeito: 'aumenta o dano total em +2d12 e o dano mínimo em +1d12.' },
    ],
  },
  {
    id: 'duplicata-ilusoria', nome: 'Duplicata Ilusória', tipo: 'arcana', escola: 'ilusao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'cópia ilusória', duracao: 'cena', resistencia: null,
    descricao: 'Você cria uma cópia ilusória semirreal de... você mesmo! Ela é idêntica em aparência, som e cheiro, mas é intangível. A cada turno, você escolhe se verá e ouvirá através da duplicata ou de seu corpo original. A cópia reproduz todas as suas ações, incluindo fala. Qualquer magia com alcance de toque ou maior que você lançar pode se originar da duplicata, em vez do seu corpo original (as magias afetam outros alvos normalmente, só mudando a origem visual). Se quiser que a duplicata faça algo diferente de você, você deve gastar uma ação de movimento. Qualquer criatura que interagir com a cópia tem direito a um teste de Vontade para perceber que é uma ilusão (as magias que se originam dela, no entanto, são reais). A cópia desaparece se sair do alcance.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'cria uma cópia adicional.' },
    ],
  },
  {
    id: 'explosao-caleidoscopica', nome: 'Explosão Caleidoscópica', tipo: 'arcana', escola: 'ilusao', circulo: 4,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'esfera com 6m de raio', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Esta magia cria uma forte explosão de luzes estroboscópicas e sons cacofônicos que desorientam as criaturas atingidas. O efeito que cada criatura sofre depende do nível ou ND dela. Nível/ND 4 ou menor: se falhar, fica inconsciente; se passar, fica atordoada por 1d4 rodadas e enjoada pelo resto da cena. Nível/ND entre 5 e 9: se falhar, fica atordoada por 1d4 rodadas e enjoada pelo resto da cena; se passar, fica atordoada por 1 rodada e enjoada por 1d4 rodadas. Nível/ND 10 ou maior: se falhar, fica atordoada por 1 rodada e enjoada por 1d4 rodadas; se passar, fica desprevenida e enjoada por 1 rodada. Uma criatura só pode ser atordoada por esta magia uma vez por cena.',
    aprimoramentos: [],
  },
  {
    id: 'forma-eterea', nome: 'Forma Etérea', tipo: 'arcana', escola: 'transmutacao', circulo: 4,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você e todo o equipamento que está com você são transportados para o plano etéreo, que existe paralelamente ao plano material. Na prática, é como ser transformado em um fantasma (mas você ainda é considerado uma criatura viva). Uma criatura etérea é invisível (pode alterar entre visível e invisível como ação livre), incorpórea e capaz de se mover em qualquer direção, inclusive para cima e para baixo. Ela enxerga o plano material, mas tudo parece cinza e insubstancial, reduzindo o alcance da visão e audição para 18m. Magias de abjuração e essência afetam criaturas etéreas, mas outras magias, não. Da mesma forma, uma criatura etérea não pode atacar nem lançar magias contra criaturas no plano material (duas criaturas etéreas podem se afetar normalmente). Uma criatura afetada pode se materializar como uma ação de movimento, encerrando a magia. Uma criatura etérea que se materialize em um espaço ocupado é jogada para o espaço não ocupado mais próximo e sofre 1d6 pontos de dano de impacto para cada 1,5m de deslocamento.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para até 5 criaturas voluntárias que estejam de mãos dadas. Depois que a magia é lançada, as criaturas podem soltar as mãos. Requer 5º círculo.' },
    ],
  },
  {
    id: 'guardiao-divino', nome: 'Guardião Divino', tipo: 'divina', escola: 'convocacao', circulo: 4,
    execucao: 'padrão', alcance: 'curto', alvoArea: 'elemental de luz invocado', duracao: 'cena ou até ser descarregado', resistencia: null,
    descricao: 'A magia invoca um elemental Pequeno, com a forma de um orbe feito de luz divina. A criatura é incorpórea, imune a dano e ilumina como uma tocha. O elemental tem 100 pontos de luz. Uma vez por rodada, durante o seu turno, o elemental pode se movimentar (deslocamento de voo 18m) e gastar quantos pontos de luz quiser para curar dano ou condições de criaturas em alcance curto, à taxa de 1 PV por 1 ponto de luz ou uma condição por 3 pontos de luz (entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, ofuscado, pasmo, sangrando, surdo ou vulnerável). A magia é encerrada quando o elemental fica sem pontos de luz.',
    aprimoramentos: [],
  },
  {
    id: 'libertacao', nome: 'Libertação', tipo: 'universal', escola: 'abjuracao', circulo: 4,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'O alvo fica imune a efeitos de movimento e ignora qualquer efeito que impeça ou restrinja seu deslocamento. Por fim, pode usar habilidades que exigem liberdade de movimentos mesmo se estiver usando armadura ou escudo.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, o alvo pode caminhar sobre a água ou outros líquidos com seu deslocamento normal (isso não protege contra qualquer efeito que o líquido possa causar — o alvo pode andar sobre lava, mas ainda vai sofrer dano).' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, o alvo pode escolher 20 em todos os testes de Atletismo.' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, o alvo pode escolher 20 em todos os testes de Acrobacia e pode fazer todas as manobras desta perícia mesmo sem treinamento.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para até 5 criaturas.' },
      { custoPM: 5, tipo: 'muda', efeito: 'pode dissipar Aprisionamento.' },
    ],
  },
  {
    id: 'ligacao-sombria', nome: 'Ligação Sombria', tipo: 'divina', escola: 'necromancia', circulo: 4,
    execucao: 'padrão', alcance: 'longo', alvoArea: '1 criatura', duracao: '1 dia', resistencia: 'Fortitude anula',
    descricao: 'Cria uma conexão entre seu corpo e o da criatura alvo, deixando uma marca idêntica na pele de ambos. Enquanto a magia durar, sempre que você sofrer qualquer dano ou condição, o alvo desta magia deve fazer um teste de Fortitude; se falhar, sofre o mesmo dano que você ou adquire a mesma condição. A magia termina se o alvo chegar a 0 pontos de vida.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'a magia não termina se o alvo chegar a 0 PV (o que significa que dano causado por essa magia pode matá-lo).' },
    ],
  },
  {
    id: 'manto-do-cruzado', nome: 'Manto do Cruzado', tipo: 'divina', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'sustentada', resistencia: null,
    descricao: 'Você invoca o poder de sua divindade na forma de um manto de energia que reveste seu corpo. Esta magia tem duas versões abaixo — você escolhe qual pode lançar quando aprende esta magia, e ela não pode ser mudada depois.',
    opcoes: [
      { nome: 'Manto de Luz', descricao: 'Um manto dourado e luminoso. No início de cada um de seus turnos, você e todos os seus aliados em alcance curto recuperam 2d8 PV. Você recebe imunidade a dano de trevas e seus ataques corpo a corpo causam +2d8 pontos de dano de luz.' },
      { nome: 'Manto de Trevas', descricao: 'Um manto negro como a noite. No início de cada um de seus turnos, todos os inimigos em alcance curto sofrem 4d8 pontos de dano de trevas. Você cura metade de todo o dano causado pela magia.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'marionete', nome: 'Marionete', tipo: 'arcana', escola: 'encantamento', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'sustentada', resistencia: 'Fortitude anula',
    descricao: 'Esta magia manipula o sistema nervoso do alvo. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada. Se falhar, todas as suas ações físicas naquele turno estarão sob controle do conjurador. A vítima ainda tem consciência de tudo que acontece à sua volta, podendo ver, ouvir e até falar com certo esforço (mas não para lançar magias). Contudo, seu corpo realiza apenas os movimentos que o conjurador deseja — pode ser manipulada para se movimentar, lutar, usar habilidades de combate, enfim, qualquer coisa de que seja fisicamente capaz. Você precisa de linha de efeito para controlar a vítima. Se perder o contato, não poderá controlá-la — mas ela estará paralisada até que o conjurador recupere o controle ou a magia termine.',
    aprimoramentos: [],
  },
  {
    id: 'muralha-de-ossos', nome: 'Muralha de Ossos', tipo: 'universal', escola: 'necromancia', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'muro de ossos', duracao: 'cena', resistencia: null,
    descricao: 'Uma parede de ossos se eleva da terra. A parede tem 15m de comprimento, 9m de altura e 1,5m de espessura. Ela pode ter qualquer forma (não precisa ser uma linha reta), mas sua base precisa estar sempre tocando o solo. Quando a parede surge, criaturas na área ocupada ou adjacentes sofrem 4d8 pontos de dano de corte e precisam fazer um teste de Reflexos para não ficarem presas no emaranhado de ossos. Uma criatura presa fica agarrada e pode gastar uma ação padrão para fazer um teste de Atletismo para se soltar — se passar, sai da muralha para um dos lados adjacentes; se falhar, sofre 4d8 pontos de dano de corte. É possível destruir o muro para atravessá-lo ou libertar uma criatura agarrada: cada trecho de 3m tem Defesa 8, 40 PV e redução de corte, frio e perfuração 10. Também é possível escalar a parede (exige teste de Atletismo e causa 4d8 pontos de dano de corte para cada 3m escalados).',
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o comprimento em +15m e a altura em +3m.' },
      { custoPM: 5, tipo: 'muda', efeito: 'o muro é feito de uma massa de esqueletos animados. Sempre que uma criatura iniciar seu turno adjacente ou escalando a muralha, deve fazer um teste de Reflexos. Se falhar fica agarrada, sofrendo os efeitos normais de estar agarrada pela magia.' },
    ],
  },
  {
    id: 'mao-poderosa-de-talude', nome: 'Mão Poderosa de Talude', tipo: 'arcana', escola: 'convocacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'mão gigante de energia', duracao: 'sustentada', resistencia: null,
    descricao: 'Esta magia cria uma mão flutuante Grande que sempre se posiciona entre você e um oponente a sua escolha. A mão fornece cobertura leve (+5 na Defesa) contra esse oponente. Nada é capaz de enganar a mão — coisas como escuridão, invisibilidade, metamorfose e disfarces mundanos não a impedem de protegê-lo. A mão tem Defesa 20 e PV e resistências iguais aos seus. Com uma ação de movimento, você pode comandar a mão para que o proteja de outro oponente ou para que realize uma das ações abaixo.',
    opcoes: [
      { nome: 'Agarrar', descricao: 'A mão usa uma manobra agarrar contra o oponente, usando seu Misticismo com bônus adicional de +10, mantendo o oponente agarrado sem causar dano.' },
      { nome: 'Esmagar', descricao: 'A mão esmaga um oponente agarrado, causando 2d6+10 pontos de dano de impacto.' },
      { nome: 'Empurrar', descricao: 'A mão afasta o oponente usando manobra empurrar com o seu Misticismo e bônus adicional de +10, acompanhando-o para empurrá-lo o máximo possível dentro do alcance.' },
    ],
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +1d6+5.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o bônus adicional em Misticismo para +20. Requer 5º círculo.' },
    ],
  },
  {
    id: 'premonicao', nome: 'Premonição', tipo: 'divina', escola: 'adivinhacao', circulo: 4,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Vislumbres do futuro permitem que você reavalie suas ações. Uma vez por rodada, você pode rolar novamente um teste recém realizado, mas deve aceitar o resultado da nova rolagem.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'muda', efeito: 'muda a execução para reação, o alcance para curto, o alvo para 1 criatura e a duração para instantânea. Esta magia só pode ser usada em uma criatura que tenha acabado de fazer um teste. Obriga a criatura a fazer uma nova rolagem de dados e aceitar o novo resultado, seja sucesso ou falha. Criaturas involuntárias têm direito a um teste de Vontade para negar o efeito.' },
      { custoPM: 10, tipo: 'muda', efeito: 'muda a duração para um dia.' },
    ],
  },
  {
    id: 'raio-polar', nome: 'Raio Polar', tipo: 'arcana', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Você dispara um raio azul esbranquiçado de gelo e ar congelante. O alvo sofre 10d8 pontos de dano de frio e fica preso em um bloco de gelo (paralisado). Se passar no teste de resistência, sofre metade do dano e, em vez de paralisado, fica lento por uma rodada. É possível quebrar o gelo para libertar uma criatura presa: o bloco tem 20 PV, RD 10 e é vulnerável a fogo. Uma criatura presa pode gastar uma ação completa para fazer um teste de Atletismo e se libertar do gelo; cada vez que passar no teste causa 10 pontos de dano ao bloco, ignorando a RD.',
    aprimoramentos: [
      { custoPM: 3, tipo: 'aumenta', efeito: 'aumenta o dano em +2d8.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alvo para área de esfera com 6m de raio. Em vez de um raio, você dispara uma bola de gelo que explode, causando o efeito da magia em todas as criaturas na área.' },
    ],
  },
  {
    id: 'relampago-flamejante-de-reynard', nome: 'Relâmpago Flamejante de Reynard', tipo: 'arcana', escola: 'evocacao', circulo: 4,
    execucao: 'duas rodadas', alcance: 'médio', alvoArea: 'bolas de fogo e relâmpagos', duracao: 'sustentada', resistencia: 'Reflexos reduz à metade',
    descricao: 'Esta é uma magia poderosa, desenvolvida pelo metódico e impassível arquimago Reynard. Você invoca as energias elementais do fogo e do relâmpago, fazendo com que uma de suas mãos fique em chamas e a outra mão eletrificada. Pela duração da magia, você pode gastar uma ação de movimento para disparar uma bola de fogo (10d6 pontos de dano de fogo numa esfera com 6m de raio) ou um relâmpago (10d6 pontos de dano de eletricidade numa linha). Você também pode, como uma ação padrão, usar as duas mãos num ataque de energia mista (20d12 pontos de dano, metade de fogo e metade de eletricidade, numa esfera com 9m de raio) — precisa estar com as duas mãos livres para isso, e o efeito misto consome toda a energia da magia, terminando-a imediatamente. Por se tratar de um ritual complexo, o tempo de execução dessa magia não pode ser reduzido.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano das rajadas em +1d6 e o dano da rajada mista em +2d12.' },
    ],
  },
  {
    id: 'sonho', nome: 'Sonho', tipo: 'arcana', escola: 'adivinhacao', circulo: 4,
    execucao: '10 minutos', alcance: 'ilimitado', alvoArea: '1 criatura viva', duracao: 'veja texto', resistencia: null,
    descricao: 'Você entra nos sonhos de uma criatura. Uma vez lá, pode conversar com ela até que ela acorde. Se o alvo não estiver dormindo quando você lançar a magia, você pode permanecer em transe até que ele adormeça. Durante o transe, você fica indefeso e sem consciência dos arredores. Você pode sair do transe quando quiser, mas a magia termina.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'transforma o sonho do alvo em um pesadelo. A vítima deve fazer um teste de Vontade. Se falhar, não recupera PV ou PM pela noite, sofre 1d10 pontos de dano de trevas e acorda fatigada. A vítima recebe bônus ou penalidades em seu teste de resistência, dependendo do conhecimento que você tiver dela (use os mesmos modificadores da magia Vidência).' },
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1. Todos os alvos compartilham um mesmo sonho (ou pesadelo) entre si e com você.' },
    ],
  },
  {
    id: 'talho-invisivel-de-edauros', nome: 'Talho Invisível de Edauros', tipo: 'arcana', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'cone de 9m', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Esta magia cruel foi desenvolvida pelo mago de combate Edauros, quando ainda era um bípede. Você faz um gesto rápido e dispara uma lâmina de ar em alta velocidade. Criaturas na área sofrem 10d8 pontos de dano de corte e ficam sangrando. Alvos que passem no teste de resistência sofrem metade do dano e não ficam sangrando.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d8.' },
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para você, a duração para sustentada e o efeito para uma vez por rodada, como uma ação de movimento, você pode disparar uma lâmina de ar contra um alvo em alcance médio, causando 6d8 pontos de dano de corte (Fortitude reduz à metade).' },
    ],
  },
  {
    id: 'terremoto', nome: 'Terremoto', tipo: 'divina', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'longo', alvoArea: 'esfera com 30m de raio', duracao: '1 rodada', resistencia: 'veja texto',
    descricao: 'Esta magia cria um tremor de terra que rasga o solo. O terremoto dura uma rodada, durante a qual criaturas sobre o solo ficam atordoadas (apenas uma vez por cena). Barreiras físicas não interrompem a área de Terremoto. O efeito exato depende do terreno, escolhido abaixo. Criaturas agarradas sofrem 1d6 de dano por rodada até serem libertadas, exigindo ação completa e teste de Atletismo (pela própria criatura ou aliado adjacente).',
    opcoes: [
      { nome: 'Caverna ou Subterrâneo', descricao: 'Derruba o teto, causando 12d6 de dano de impacto e agarrando todas as criaturas na área (Reflexos reduz à metade e evita a condição).' },
      { nome: 'Construção', descricao: 'Todas as estruturas sofrem 200 pontos de dano de impacto, suficiente para derrubar construções de madeira ou alvenaria simples mas não reforçada. Criaturas dentro sofrem o mesmo efeito de caverna.' },
      { nome: 'Espaço Aberto', descricao: 'Fendas se abrem no chão — cada criatura rola um dado; em resultado ímpar, uma fenda se abre sob ela e precisa de Reflexos ou cai. Pode escapar com ação completa e Atletismo. As fendas se fecham no início do próximo turno, matando quem estiver dentro.' },
      { nome: 'Penhasco', descricao: 'Racha e desmorona numa distância horizontal igual à altura da queda, causando 12d6 de dano de impacto e agarrando quem estiver no caminho (Reflexos reduz à metade e evita ficar agarrado).' },
      { nome: 'Rio, Lago ou Pântano', descricao: 'Fissuras drenam a água formando lamaçal — Reflexos ou fica agarrado na lama. As fissuras se fecham no próximo turno, podendo afogar quem ficou preso.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'viagem-planar', nome: 'Viagem Planar', tipo: 'universal', escola: 'convocacao', circulo: 4,
    execucao: 'completa', alcance: 'toque', alvoArea: 'pessoal', duracao: 'instantânea', resistencia: null,
    descricao: 'Você viaja instantaneamente para outro plano da Criação. Lá, você chega de 10 a 1.000km do destino pretendido (role 1d100 e multiplique por 10km). Componente material: um bastão de metal precioso em forma de forquilha (T$ 1.000) — o tipo de metal determina para qual plano você será enviado (metais que levam a dimensões específicas podem ser difíceis de encontrar, de acordo com o mestre).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alvo para até cinco criaturas voluntárias que você esteja tocando.' },
    ],
  },
  {
    id: 'visao-da-verdade', nome: 'Visão da Verdade', tipo: 'universal', escola: 'adivinhacao', circulo: 4,
    execucao: 'movimento', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Você enxerga a forma real das coisas. Você pode ver através de camuflagem e escuridão (normais e mágicas), assim como efeitos de ilusão e transmutação (enxergando a verdade como formas translúcidas ou sobrepostas).',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'muda o alcance para toque e o alvo para 1 criatura.' },
      { custoPM: 1, tipo: 'muda', efeito: 'além do normal, o alvo fica com sentidos apurados; ele recebe +10 em todos os testes de Percepção.' },
      { custoPM: 2, tipo: 'muda', efeito: 'além do normal, o alvo escuta falsidades; ele recebe +10 em todos os testes de Intuição.' },
      { custoPM: 4, tipo: 'muda', efeito: 'além do normal, o alvo enxerga através de paredes e barreiras com 30cm de espessura ou menos (as paredes e barreiras parecem translúcidas).' },
    ],
  },
  {
    id: 'colera-de-azgher', nome: 'Cólera de Azgher', tipo: 'divina', escola: 'evocacao', circulo: 4,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'esfera com 6m de raio', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Você cria um fulgor dourado e intenso. Criaturas na área ficam cegas por 1d4 rodadas e em chamas, e sofrem 10d6 pontos de dano de fogo (mortos-vivos sofrem 10d8 pontos de dano). Uma criatura que passe no teste de resistência não fica cega nem em chamas e sofre metade do dano.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o dano em +2d6 (+2d8 contra mortos-vivos).' },
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta a área em +6m de raio.' },
      { custoPM: 5, tipo: 'muda', efeito: 'a luz purificadora do Deus-Sol dissipa todas as magias de necromancia ativas na área. Requer 5º círculo.' },
    ],
  },

  // ══════════════════════ CÍRCULO 5 (25 confirmadas — o último!) ══════════════════════

  {
    id: 'alterar-destino', nome: 'Alterar Destino', tipo: 'arcana', escola: 'adivinhacao', circulo: 5,
    execucao: 'reação', alcance: 'pessoal', alvoArea: 'você', duracao: 'instantânea', resistencia: null,
    descricao: 'Sua mente visualiza todas as possibilidades de um evento, permitindo a você escolher o melhor curso de ação. Você pode rolar novamente um teste de resistência com um bônus de +10 ou um inimigo deve rolar novamente um ataque contra você com uma penalidade de –10.',
    aprimoramentos: [],
  },
  {
    id: 'aprisionamento', nome: 'Aprisionamento', tipo: 'arcana', escola: 'abjuracao', circulo: 5,
    execucao: 'completa', alcance: 'curto', alvoArea: '1 criatura', duracao: 'permanente', resistencia: 'Vontade anula',
    descricao: 'Você cria uma prisão mágica para aprisionar uma criatura. Se falhar no teste de resistência, o alvo sofre o efeito da magia; se passar, fica imune a esta magia por uma semana. Enquanto estiver aprisionada, a criatura não precisa respirar e alimentar-se, e não envelhece. Magias de adivinhação não conseguem localizar ou perceber o alvo. Ao lançar a magia, você escolhe uma das seguintes formas de prisão abaixo (o componente material varia, mas todos custam T$ 1.000). Ao lançar a magia, você deve especificar uma condição que fará com que ela termine e solte o alvo — pode ser tão específica ou elaborada quanto quiser, mas deve ser possível de acontecer (baseada em nome, identidade ou divindade padroeira, ou ações/qualidades observáveis, nunca em estatísticas intangíveis como nível ou PV). O mestre tem a palavra final sobre a validade da condição.',
    opcoes: [
      { nome: 'Acorrentamento', descricao: 'O alvo é preso por correntes enraizadas no chão, ficando paralisado e incapaz de se mover ou ser movido. Componente: fina corrente de mitral.' },
      { nome: 'Contenção Mínima', descricao: 'O alvo diminui para 2cm de altura e é preso dentro de uma pedra preciosa, podendo ver e ser visto mas nada mais passa por ela, nem teletransporte. Componente: diamante ou rubi.' },
      { nome: 'Prisão Dimensional', descricao: 'O alvo é transportado para um semiplano protegido contra teletransporte e viagens planares. Componente: miniatura da prisão em jade.' },
      { nome: 'Sepultamento', descricao: 'O alvo é sepultado nas profundezas da terra em uma esfera mágica indestrutível e intransponível. Componente: pequeno orbe de adamante.' },
      { nome: 'Sono Eterno', descricao: 'O alvo adormece e não pode ser acordado. Componente: fruta preparada com ervas soníferas raras.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'aura-divina', nome: 'Aura Divina', tipo: 'divina', escola: 'abjuracao', circulo: 5,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'esfera com 9m de raio', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'Você se torna um conduíte da energia de sua divindade, emanando uma aura brilhante. Você e aliados devotos da mesma divindade ficam imunes a encantamento e recebem +10 na Defesa e em testes de resistência. Aliados não devotos da mesma divindade recebem +5 na Defesa e em testes de resistência. Além disso, inimigos que entrem na área devem fazer um teste de Vontade; em caso de falha, recebem uma condição a sua escolha entre esmorecido, debilitado ou lento até o fim da cena. O teste deve ser refeito cada vez que a criatura entrar novamente na área.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta os bônus na Defesa e em testes de resistência em +1.' },
    ],
  },
  {
    id: 'barragem-elemental-de-vectorius', nome: 'Barragem Elemental de Vectorius', tipo: 'arcana', escola: 'evocacao', circulo: 5,
    execucao: 'padrão', alcance: 'longo', alvoArea: '4 esferas elementais', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Criada pelo arquimago Vectorius, esta magia produz quatro esferas, de ácido, eletricidade, fogo e frio, que voam até um ponto a sua escolha. Quando atingem o ponto escolhido, explodem causando 6d6 pontos de dano de seu respectivo tipo numa área com 12m de raio. Um teste de Reflexos reduz o dano à metade. Você pode mirar cada esfera em uma criatura ou ponto diferente. Uma criatura ao alcance da explosão de mais de uma esfera deve fazer um teste de resistência para cada uma. Além disso, cada esfera causa um efeito adicional em criaturas que falharem em seus testes de resistência.',
    opcoes: [
      { nome: 'Ácido', descricao: 'A criatura fica vulnerável até o fim da cena.' },
      { nome: 'Elétrica', descricao: 'A criatura fica atordoada por 1 rodada (apenas uma vez por cena).' },
      { nome: 'Fogo', descricao: 'A criatura fica em chamas.' },
      { nome: 'Frio', descricao: 'A criatura fica lenta até o fim da cena.' },
    ],
    aprimoramentos: [
      { custoPM: 5, tipo: 'aumenta', efeito: 'aumenta o dano de cada esfera em +2d6.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda o tipo de dano de todas as esferas para essência (mas elas ainda causam os outros efeitos como se seu tipo de dano não mudasse).' },
    ],
  },
  {
    id: 'buraco-negro', nome: 'Buraco Negro', tipo: 'universal', escola: 'convocacao', circulo: 5,
    execucao: 'completa', alcance: 'longo', alvoArea: 'buraco negro', duracao: '3 rodadas', resistencia: 'Fortitude parcial',
    descricao: 'Esta magia cria um vácuo capaz de sugar tudo nas proximidades. Escolha um espaço desocupado para o buraco negro. No início de cada um de seus três turnos seguintes, todas as criaturas a até alcance longo do buraco negro, incluindo você, devem fazer um teste de Fortitude. Em caso de falha, ficam caídas e são puxadas 30m na direção do buraco. Objetos soltos também são puxados. Criaturas podem gastar uma ação de movimento para se segurar em algum objeto fixo, recebendo +2 em seus testes de resistência. Criaturas e objetos que iniciem seu turno no espaço do buraco negro devem gastar uma ação de movimento e fazer um teste de Fortitude — se passarem, podem escapar se arrastando (deslocamento de 1,5m) para longe dele; se falharem, perdem a ação (mas podem gastar outra para tentar novamente). Se terminarem seu turno no espaço do buraco negro, são sugadas, desaparecendo para sempre. Não se conhece o destino das coisas sugadas pelo buraco negro — alguns estudiosos sugerem que são enviadas para outros mundos, provavelmente Sombria, reino da deusa Tenebra.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'muda o efeito para que você não seja afetado.' },
    ],
  },
  {
    id: 'chuva-de-meteoros', nome: 'Chuva de Meteoros', tipo: 'arcana', escola: 'convocacao', circulo: 5,
    execucao: 'completa', alcance: 'longo', alvoArea: 'quadrado com 18m de lado', duracao: 'instantânea', resistencia: 'Reflexos parcial',
    descricao: 'Meteoros caem dos céus, devastando a área afetada. Criaturas na área sofrem 15d6 pontos de dano de impacto, 15d6 pontos de dano de fogo e ficam caídas e presas sob os escombros (agarradas). Uma criatura que passe no teste de resistência sofre metade do dano total e não fica caída e agarrada. Uma criatura agarrada pode escapar gastando uma ação padrão e passando em um teste de Atletismo. Toda a área afetada fica coberta de escombros, sendo considerada terreno difícil, e imersa numa nuvem de poeira (camuflagem leve). Esta magia só pode ser utilizada a céu aberto.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'aumenta', efeito: 'aumenta o número de meteoros que atingem a área, o que aumenta o dano em +2d6 de impacto e +2d6 de fogo.' },
    ],
  },
  {
    id: 'controlar-o-tempo', nome: 'Controlar o Tempo', tipo: 'arcana', escola: 'transmutacao', circulo: 5,
    execucao: 'padrão', alcance: 'veja texto', alvoArea: 'veja texto', duracao: 'veja texto', resistencia: null,
    descricao: 'Escolha um dos efeitos a seguir.',
    opcoes: [
      { nome: 'Congelar o Tempo', descricao: 'Você gera uma bolha do seu tamanho na qual o tempo passa mais lentamente — para outras criaturas, a bolha surge e desaparece instantaneamente, mas para você ela dura 3 rodadas (2 turnos extras após o atual), durante as quais você pode agir e não é afetado por efeitos contínuos (como chamas). Porém, você e quaisquer efeitos que gerar não podem sair da área que ocupava quando lançou a magia; você não pode congelar o tempo nem preparar ações enquanto está sob esse efeito.' },
      { nome: 'Saltar no Tempo', descricao: 'Você e até 5 criaturas voluntárias são transportadas de 1 a 24 horas para o futuro, desaparecendo com um brilho e ressurgindo no mesmo lugar, com a mesma velocidade e orientação — do seu ponto de vista, nenhum tempo se passou.' },
      { nome: 'Voltar no Tempo', descricao: 'Você revive os últimos segundos — todas as ações da rodada anterior são desfeitas (incluindo perda de PV e PM, exceto os gastos nesta magia). Tudo retorna à posição do início do seu turno na última rodada e você é o único que sabe o que acontecerá. Você só pode reviver uma mesma rodada uma vez.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'deflagracao-de-mana', nome: 'Deflagração de Mana', tipo: 'arcana', escola: 'evocacao', circulo: 5,
    execucao: 'completa', alcance: 'pessoal', alvoArea: 'esfera com 15m de raio', duracao: 'instantânea', resistencia: 'Fortitude parcial',
    descricao: 'Após concentrar seu mana, você emana energia, como uma estrela em plena terra. Todas as criaturas na área sofrem 150 pontos de dano de essência e todos os itens mágicos (exceto artefatos) tornam-se mundanos. Você não é afetado pela magia. Alvos que passem no teste de Fortitude sofrem metade do dano e seus itens mágicos voltam a funcionar após um dia.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano em +10.' },
      { custoPM: 5, tipo: 'muda', efeito: 'afeta apenas criaturas a sua escolha.' },
    ],
  },

  {
    id: 'desejo', nome: 'Desejo', tipo: 'arcana', escola: 'transmutacao', circulo: 5,
    execucao: 'completa', alcance: 'veja texto', alvoArea: 'veja texto', duracao: 'veja texto', resistencia: 'veja texto',
    descricao: 'Esta é a mais poderosa das magias arcanas, permitindo alterar a realidade a seu bel-prazer. Escolha um dos efeitos abaixo. Desejo pode gerar efeitos ainda mais poderosos, mas cuidado! Desejar a fortuna de um rei pode transportá-lo para a sala de tesouro real, onde poderá ser preso ou morto; desejar ser imortal pode transformá-lo em morto-vivo, e assim por diante. Qualquer efeito que não se encaixe na lista abaixo deve ser decidido pelo mestre.',
    opcoes: [
      { nome: 'Dissipar Magias', descricao: 'Dissipa os efeitos de qualquer magia de 4º círculo ou menor.' },
      { nome: 'Transportar Criaturas', descricao: 'Transporta até 10 criaturas voluntárias em alcance longo para qualquer outro local, em qualquer plano.' },
      { nome: 'Desfazer um Acontecimento', descricao: 'Permite que um teste realizado por uma criatura em alcance longo na última rodada seja realizado novamente — por exemplo, se um aliado morreu devido ao ataque de um inimigo, você pode obrigar o inimigo a refazer esse ataque.' },
      { nome: 'Criar Item Mundano (+2 PM)', descricao: 'Cria um item mundano de até T$ 30.000. Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Duplicar Magia (+2 PM)', descricao: 'Duplica os efeitos de qualquer magia de até 4º círculo (ainda exigindo componente material, se necessário). Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Aumentar Atributo (+2 PM)', descricao: 'Aumenta um atributo de uma criatura em +1 (cada atributo só pode ser aumentado uma vez com Desejo). Custa o sacrifício de 2 PM adicionais.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'engenho-de-mana', nome: 'Engenho de Mana', tipo: 'arcana', escola: 'abjuracao', circulo: 5,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'disco de energia com 1,5m de diâmetro', duracao: 'sustentada', resistencia: null,
    descricao: 'Você cria um disco de energia que lembra uma roda de engenho e flutua no ponto em que foi conjurado. O disco é imune a dano, não pode ser movido e faz uma contramágica automática contra qualquer magia lançada em alcance médio dele (exceto as suas), usando seu teste de Misticismo. Caso vença o teste, o engenho não só anula a magia como absorve os PM usados para lançá-la, acumulando PM temporários. No seu turno, se estiver ao alcance do disco, você pode gastar PM nele para lançar magias.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'muda', efeito: 'em vez de flutuar no ponto em que foi conjurado, o disco flutua atrás de você, mantendo-se sempre adjacente.' },
      { custoPM: 4, tipo: 'muda', efeito: 'muda a duração para um dia.' },
    ],
  },
  {
    id: 'furia-do-panteao', nome: 'Fúria do Panteão', tipo: 'divina', escola: 'evocacao', circulo: 5,
    execucao: 'completa', alcance: 'longo', alvoArea: 'cubo de 90m', duracao: 'sustentada', resistencia: 'veja texto',
    descricao: 'Você cria uma nuvem de tempestade violenta. Os ventos tornam ataques à distância impossíveis e fazem a área contar como condição terrível para lançar magia. Além disso, inimigos na área têm a visibilidade reduzida (como a magia Névoa). Uma vez por turno, você pode gastar uma ação de movimento para gerar um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Nevasca', descricao: 'Inimigos sofrem 10d6 de dano de frio (Fortitude reduz à metade). A área fica coberta de neve, virando terreno difícil até o fim da cena ou até você usar Siroco.' },
      { nome: 'Raios', descricao: 'Até 6 inimigos a sua escolha sofrem 10d8 de dano de eletricidade (Reflexos reduz à metade).' },
      { nome: 'Siroco', descricao: 'Transforma a chuva em tempestade de areia escaldante. Inimigos sofrem 10d6 de dano metade corte/metade fogo e ficam sangrando (Fortitude reduz o dano à metade e evita a condição).' },
      { nome: 'Trovões', descricao: 'Inimigos sofrem 10d6 de dano de impacto e ficam desprevenidos por uma rodada (Fortitude reduz o dano à metade e evita a condição).' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'intervencao-divina', nome: 'Intervenção Divina', tipo: 'divina', escola: 'convocacao', circulo: 5,
    execucao: 'completa', alcance: 'veja texto', alvoArea: 'veja texto', duracao: 'veja texto', resistencia: 'veja texto',
    descricao: 'Você pede a sua divindade para interceder diretamente. Escolha um dos efeitos abaixo.',
    opcoes: [
      { nome: 'Curar', descricao: 'Cura todos os PV e condições de até 10 criaturas em alcance longo (este efeito cura mortos-vivos, em vez de causar dano).' },
      { nome: 'Dissipar Magias', descricao: 'Dissipa os efeitos de qualquer magia de 4º círculo ou menor.' },
      { nome: 'Criar Item Mundano (+2 PM)', descricao: 'Cria um item mundano de até T$ 30.000. Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Duplicar Magia (+2 PM)', descricao: 'Duplica os efeitos de qualquer magia de até 4º círculo (ainda exigindo componente material, se necessário). Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Proteger uma Cidade (+2 PM)', descricao: 'Protege uma cidade de um desastre, como uma erupção vulcânica, enchente ou terremoto. Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Ressuscitar (+2 PM)', descricao: 'Ressuscita uma criatura em alcance longo que tenha morrido há até uma rodada. A criatura acorda com 1 PV. Custa o sacrifício de 2 PM adicionais.' },
      { nome: 'Outro efeito (+2 PM)', descricao: 'Qualquer outra coisa que o mestre autorize, conforme os desejos e objetivos da divindade do conjurador. Custa o sacrifício de 2 PM adicionais.' },
    ],
    aprimoramentos: [],
  },
  {
    id: 'invulnerabilidade', nome: 'Invulnerabilidade', tipo: 'universal', escola: 'abjuracao', circulo: 5,
    execucao: 'padrão', alcance: 'pessoal', alvoArea: 'você', duracao: 'cena', resistencia: null,
    descricao: 'Esta magia cria uma barreira mágica impenetrável que protege você contra efeitos nocivos mentais ou físicos, a sua escolha. Proteção mental: você fica imune às condições abalado, alquebrado, apavorado, atordoado, confuso, esmorecido, fascinado, frustrado e pasmo, além de efeitos de encantamento e ilusão. Proteção física: você fica imune às condições atordoado, cego, debilitado, enjoado, envenenado, exausto, fatigado, fraco, lento, ofuscado e paralisado, além de acertos críticos, ataques furtivos e doenças.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para 1 criatura.' },
    ],
  },
  {
    id: 'legiao', nome: 'Legião', tipo: 'arcana', escola: 'encantamento', circulo: 5,
    execucao: 'padrão', alcance: 'médio', alvoArea: 'até 10 criaturas na área', duracao: 'sustentada', resistencia: 'Vontade parcial',
    descricao: 'Você domina a mente dos alvos. Os alvos obedecem cegamente a seus comandos, exceto ordens claramente suicidas. Um alvo tem direito a um teste no final de cada um de seus turnos para se livrar do efeito. Alvos que passarem no teste ficam abalados por 1 rodada enquanto recuperam a consciência.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o número de alvos em +1.' },
    ],
  },
  {
    id: 'lagrimas-de-wynna', nome: 'Lágrimas de Wynna', tipo: 'divina', escola: 'abjuracao', circulo: 5,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'Vontade parcial',
    descricao: 'Se falhar no teste de resistência, o alvo perde a habilidade de lançar magias arcanas até o fim da cena. Se passar, perde a habilidade por uma rodada.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda a área para esfera com 6m de raio e o alvo para criaturas escolhidas.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda a execução para um dia e adiciona custo adicional (sacrifício de 1 PM). O alvo da magia precisa ser mantido em alcance curto do conjurador durante toda a execução. Ao término, faz um teste de Vontade. Se falhar, perde a habilidade de lançar magias arcanas permanentemente. Se passar, resiste, mas ainda pode ser alvo da magia no dia seguinte. Nenhum poder mortal é capaz de reverter essa perda. Os clérigos de Wynna dizem que a deusa chora cada vez que este ritual é realizado.' },
    ],
  },
  {
    id: 'mata-dragao', nome: 'Mata-Dragão', tipo: 'arcana', escola: 'evocacao', circulo: 5,
    execucao: 'duas rodadas', alcance: 'pessoal', alvoArea: 'cone de 30m', duracao: 'instantânea', resistencia: 'Reflexos reduz à metade',
    descricao: 'Esta é uma das mais poderosas magias de destruição existentes. Após entoar longos cânticos, o conjurador dispara uma carga de energia que varre uma enorme área à sua frente, causando 20d12 pontos de dano de essência em todas as criaturas, construções e objetos livres atingidos. Sempre que rola um resultado 12 em um dado de dano, a magia causa +1d12 pontos de dano. Apesar de seu poder destrutivo, esta magia é lenta, tornando seu uso difícil em combate.',
    aprimoramentos: [
      { custoPM: 1, tipo: 'aumenta', efeito: 'aumenta o dano em +1d12.' },
    ],
  },
  {
    id: 'palavra-primordial', nome: 'Palavra Primordial', tipo: 'universal', escola: 'encantamento', circulo: 5,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura com menos níveis que você', duracao: 'instantânea ou veja texto', resistencia: 'Vontade parcial',
    descricao: 'Você pronuncia uma palavra do idioma primordial da Criação, que causa um dos efeitos abaixo, a sua escolha.',
    opcoes: [
      { nome: 'Atordoar', descricao: 'A criatura fica atordoada por 1d4+1 rodadas (apenas uma vez por cena) — se passar no teste de resistência, ou se já foi atordoada por esta magia, fica desprevenida por 1d4 rodadas.' },
      { nome: 'Cegar', descricao: 'A criatura fica cega — se passar, fica ofuscada por 1d4 rodadas.' },
      { nome: 'Matar', descricao: 'A criatura morre — além do teste de Vontade, a criatura tem direito a um teste de Fortitude se tiver mais da metade de seus PV; se passar em qualquer um deles, em vez de morrer perde 10d8 pontos de vida e fica sangrando.' },
    ],
    aprimoramentos: [],
  },

  {
    id: 'possessao', nome: 'Possessão', tipo: 'arcana', escola: 'encantamento', circulo: 5,
    execucao: 'padrão', alcance: 'longo', alvoArea: '1 criatura', duracao: '1 dia', resistencia: 'Vontade anula',
    descricao: 'Você projeta sua consciência no corpo do alvo. Enquanto possuir uma criatura, você assume o controle total do corpo dela. O seu próprio corpo fica inconsciente e a consciência do alvo fica inerte. Em termos de jogo, você continua usando a sua ficha, mas com os atributos físicos e deslocamento da criatura. Se o alvo passar no teste de resistência, sabe que você tentou possuí-lo e fica imune a esta magia por um dia. Caso o corpo da criatura morra enquanto você a possui, a criatura morre e você deve fazer um teste de Vontade contra a CD da sua própria magia — se passar, sua consciência retorna para o seu corpo (contanto que esteja dentro do alcance); do contrário, você também morre. Retornar para o seu corpo voluntariamente é uma ação livre.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'você ganha acesso às habilidades de raça e classe da criatura.' },
      { custoPM: 5, tipo: 'muda', efeito: 'enquanto a magia durar e você estiver dentro do alcance do seu corpo original, pode "saltar" de uma criatura possuída para outra. O novo alvo tem direito a um teste de Vontade. Se falhar, você assume o controle do corpo dele e o alvo anterior recobra a consciência.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda a duração para permanente, mas destrói seu corpo original no processo. Uma criatura possuída pode fazer um teste de Vontade no começo do dia para retomar seu corpo — se passar, recobra a consciência (e a sua própria consciência fica inerte); o teste se repete no início de cada dia. Se o corpo de uma criatura possuída morrer e houver outra criatura em alcance curto, você pode tentar possuí-la. Enquanto houver novos corpos para possuir, você é imortal!' },
    ],
  },
  {
    id: 'projetar-consciencia', nome: 'Projetar Consciência', tipo: 'universal', escola: 'adivinhacao', circulo: 5,
    execucao: 'padrão', alcance: 'ilimitado (veja texto)', alvoArea: 'local ou criatura conhecidos', duracao: 'sustentada', resistencia: null,
    descricao: 'Esta magia faz com que sua consciência deixe seu corpo e se transporte instantaneamente para um local ou para perto de uma criatura. Se escolher um local, ele precisa ser conhecido por você. Se escolher uma criatura, você transporta sua consciência até onde ela estiver, desde que esteja no mesmo plano. Você adquire uma forma fantasmagórica invisível, mas pode se mostrar usando uma ação de movimento. Pode se mover em qualquer direção com deslocamento de voo 18m e, por ser incorpóreo, é capaz de atravessar objetos sólidos, mas fica limitado a se mover dentro dos limites do local, ou dentro de alcance curto da criatura alvo. Você pode ver e ouvir como se estivesse presente no local e pode falar mentalmente com qualquer criatura que possa ver, contanto que tenham um idioma em comum.',
    aprimoramentos: [
      { custoPM: 10, tipo: 'muda', efeito: 'além do normal, sua projeção é capaz de lançar magias que não precisem de componentes materiais e tenham duração diferente de sustentada. Sua forma fantasmagórica funciona como na magia Forma Etérea, sendo afetada por magias de abjuração e essência, mas as magias que ela lança podem afetar criaturas corpóreas.' },
    ],
  },
  {
    id: 'reanimacao-impura', nome: 'Reanimação Impura', tipo: 'divina', escola: 'necromancia', circulo: 5,
    execucao: 'completa', alcance: 'toque', alvoArea: '1 criatura', duracao: 'cena', resistencia: null,
    descricao: 'Você reanima uma criatura morta recentemente (dentro da mesma cena), trazendo sua alma de volta ao corpo de forma forçada. O tipo da criatura muda para morto-vivo, mas ela retém suas memórias e habilidades de quando estava viva, podendo inclusive lançar magias. A criatura pode pensar e falar livremente, mas obedece cegamente a seus comandos. Quando a cena termina, a criatura volta a ficar morta, mas muitos clérigos malignos usam meios para guardar e preservar o corpo de criaturas poderosas para serem reanimadas dessa forma quando necessário. Se for destruída, a criatura não pode ser reanimada novamente com esta magia.',
    aprimoramentos: [],
  },
  {
    id: 'roubar-a-alma', nome: 'Roubar a Alma', tipo: 'universal', escola: 'necromancia', circulo: 5,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'permanente', resistencia: 'Vontade parcial',
    descricao: 'Você rouba a alma da vítima, armazenando-a em um objeto. Se o alvo passar no teste de resistência, sente o impacto de sua alma ser puxada para fora do corpo e fica abalado por 1 rodada. Se falhar, seu corpo fica caído, inconsciente e inerte, enquanto sua alma é transportada para dentro do objeto. O corpo não envelhece nem se decompõe, permanecendo em estase, e pode ser atacado e destruído normalmente. O objeto escolhido deve custar T$ 1.000 por nível ou ND da criatura e não possuir uma alma presa, ou se quebrará quando a magia for lançada. Se o objeto for destruído, a magia se esvai — se o corpo ainda estiver disponível, a alma retorna para ele; caso contrário, escapa para os Mundos dos Deuses. Custo adicional: sacrifício de 1 PM.',
    aprimoramentos: [
      { custoPM: 5, tipo: 'muda', efeito: 'o objeto que abriga a alma detém os mesmos PM totais que o alvo. Se estiver empunhando o objeto, você pode usar esses PM para pagar o custo de PM para lançar magias. O objeto recupera PM por dia como se o personagem estivesse em descanso normal.' },
      { custoPM: 10, tipo: 'muda', efeito: 'como uma reação ao lançar esta magia, você possui o corpo sem alma do alvo, como na magia Possessão (mesmo que não conheça a magia).' },
    ],
  },
  {
    id: 'requiem', nome: 'Réquiem', tipo: 'arcana', escola: 'ilusao', circulo: 5,
    execucao: 'completa', alcance: 'curto', alvoArea: 'criaturas escolhidas', duracao: 'sustentada', resistencia: 'Vontade anula',
    descricao: 'Esta magia cria uma ilusão particular para cada uma das criaturas que atingir. Enquanto a magia durar, no início de cada um de seus turnos, cada criatura afetada deve fazer um teste de Vontade; se falhar, acha que não tomou as ações que realmente fez no turno anterior e é obrigada a repetir as mesmas ações neste turno, com uma penalidade cumulativa de –5 em todos os testes para cada vez que se repetir (a penalidade não se aplica ao teste de Vontade contra esta magia). Por exemplo, se a criatura se aproximou de um alvo e o atacou, precisa se aproximar desse mesmo alvo e atacar novamente. A ação repetida consome PM e recursos normalmente e, caso exija um teste de resistência, qualquer alvo faz esse teste com um bônus igual ao da penalidade desta magia.',
    aprimoramentos: [],
  },
  {
    id: 'semiplano', nome: 'Semiplano', tipo: 'arcana', escola: 'convocacao', circulo: 5,
    execucao: 'completa', alcance: 'curto', alvoArea: 'semiplano com 30m de lado', duracao: '1 dia', resistencia: null,
    descricao: 'Você cria uma dimensão particular. Você pode entrar no semiplano gastando uma ação padrão e 10 PM, desaparecendo do plano material como se tivesse se teletransportado. Você pode levar criaturas voluntárias que esteja tocando, ao custo de 1 PM por criatura extra. Você também pode levar objetos que esteja tocando, ao custo de 1 PM por objeto Médio ou menor, 2 PM por objeto Grande, 5 PM por Enorme e 10 PM por Colossal. Uma vez no semiplano, pode gastar uma ação completa para voltar ao plano material, no mesmo local onde estava. Caso conheça a magia Viagem Planar, pode lançá-la para voltar ao plano material em outro local. Você escolhe a forma e a aparência do semiplano — uma caverna, um asteroide que singra o éter, um palacete de cristal etc. Ele contém ar, luz e calor, mas além disso é vazio (você pode levar itens a cada viagem).',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'adiciona alvo (1 criatura). Você cria um semiplano labiríntico e expulsa o alvo para ele. A cada rodada, a vítima tem direito a um teste de Investigação ou Sobrevivência, com bônus cumulativo de +1 para cada teste já realizado, para escapar do labirinto. Quando o alvo escapa, a magia termina e ele reaparece no plano material no mesmo local onde estava quando a magia foi lançada. Magias como Salto Dimensional e Teletransporte não ajudam a escapar do labirinto, mas Viagem Planar sim.' },
      { custoPM: 5, tipo: 'muda', efeito: 'muda a duração para permanente e adiciona componente material (maquete do semiplano feita de materiais preciosos no valor de T$ 5.000). Você pode lançar a magia diversas vezes para aumentar as dimensões do semiplano em +30m de lado a cada vez.' },
    ],
  },
  {
    id: 'sombra-assassina', nome: 'Sombra Assassina', tipo: 'arcana', escola: 'ilusao', circulo: 5,
    execucao: 'padrão', alcance: 'curto', alvoArea: '1 criatura', duracao: 'cena', resistencia: 'Vontade parcial',
    descricao: 'Esta magia cria uma duplicata ilusória do alvo na forma de uma silhueta, ligada a ele como se fosse uma manifestação sólida de sua própria sombra. A duplicata de sombras segue automaticamente o alvo. Sempre que o alvo faz uma ação hostil (fazer um ataque, usar uma habilidade, lançar uma magia), a sombra imediatamente realiza a mesma ação contra o alvo, usando as mesmas estatísticas e rolagens. A sombra pode ser atacada, tem as mesmas estatísticas do alvo e é destruída quando chega a 0 PV. Se o alvo passar no teste de resistência, a sombra desaparece no final do turno do alvo, depois de copiar sua ação dessa rodada.',
    aprimoramentos: [
      { custoPM: 10, tipo: 'muda', efeito: 'muda o alvo para criaturas escolhidas na área.' },
    ],
  },
  {
    id: 'toque-da-morte', nome: 'Toque da Morte', tipo: 'universal', escola: 'necromancia', circulo: 5,
    execucao: 'padrão', alcance: 'toque', alvoArea: '1 criatura', duracao: 'instantânea', resistencia: 'veja texto',
    descricao: 'Sua mão exala energias letais. A criatura sofre 10d8+10 pontos de dano de trevas. Se estiver com menos da metade de seus PV, em vez disso deve fazer um teste de Fortitude — se passar, sofre o dano normal; se falhar, seus PV são reduzidos a –10.',
    aprimoramentos: [
      { custoPM: 2, tipo: 'muda', efeito: 'muda o alcance para curto. Em vez de tocar no alvo, você dispara um raio púrpura da ponta de seu dedo indicador.' },
      { custoPM: 10, tipo: 'muda', efeito: 'muda o alcance para curto e o alvo para inimigos no alcance. Em vez de tocar no alvo, você dispara raios púrpuras da ponta de seus dedos.' },
    ],
  },

];

// Expõe globalmente
if (typeof window !== 'undefined') {
  window.MAGIAS = MAGIAS;
  window.CUSTO_POR_CIRCULO = CUSTO_POR_CIRCULO;
}
