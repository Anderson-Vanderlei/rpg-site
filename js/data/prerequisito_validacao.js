/* ============================================================
   TORMENTA 20 — prerequisito_validacao.js
   Estrutura auxiliar gerada em 30/ago, pedido do usuário (item 7 da
   "Revisão Final Pendente", CLAUDE.md §12): preparar dados estruturados
   de pré-requisito pra alimentar a validação programática na futura
   ficha de personagem interativa (hoje o compêndio só EXIBE o texto
   livre de `prerequisito`, não valida nada).

   IMPORTANTE — arquivo separado, não mexe em poderes_gerais.js nem em
   poderes_classes.js: os 479 poderes de lá continuam exatamente como
   estavam, com seu campo `prerequisito` (texto livre) intacto. Esta
   estrutura é só um ÍNDICE AUXILIAR por id de poder, gerado por um
   script (não por engenharia manual palavra-por-palavra), pensado pra
   ser conferido/ajustado à mão quando a ficha for construída de
   verdade — algumas cláusulas não deram pra estruturar automaticamente
   (ver tipo 'texto' abaixo) e ficaram como texto bruto de propósito,
   em vez de eu inventar uma estrutura arriscando errar a regra.

   SCHEMA — window.PREREQUISITO_VALIDACAO[idDoPoder] é um array de
   cláusulas (todas obrigatórias entre si, lógica E). Cada cláusula é
   um dos tipos abaixo:

   { tipo: 'atributo', atributo: 'Destreza', valor: 1 }
     — atributo mínimo (Força/Destreza/Constituição/Inteligência/
       Sabedoria/Carisma).
   { tipo: 'nivelClasse', classe: 'cavaleiro', nivel: 12 }
     — nível mínimo numa classe específica (id de classes.js).
   { tipo: 'classe', classe: 'clerigo' }
     — precisa SER daquela classe (sem nível mínimo específico).
   { tipo: 'arquetipo', valor: 'bruxo'|'feiticeiro'|'mago' }
     — precisa ter escolhido aquele Caminho do Arcanista.
   { tipo: 'poder', nome: 'Estilo de Duas Armas', id: 'estilo-de-duas-armas' }
     — precisa ter outro poder específico (id resolvido contra o
       conjunto de todos os poderes gerais + de classe).
   { tipo: 'devoto', deus: 'Aharadak' | null }
     — precisa ser devoto daquele deus (ou de "uma divindade" genérica,
       quando deus é null — ver campo `bruto` nesse caso).
   { tipo: 'treinado', pericia: 'Ofício (alquimista)' | null, bruto: '...' }
     — precisa ser treinado na perícia indicada (ou "na perícia
       escolhida", quando pericia é null — ver `bruto`).
   { tipo: 'ou', opcoes: [...] }
     — qualquer UMA das cláusulas dentro de `opcoes` satisfaz (lógica OU
       entre alternativas, ex: "Devoto de Arsenal, Khalmyr, Lin-Wu ou
       Valkaria" vira um único grupo 'ou' com as 4 opções).
   { tipo: 'texto', bruto: '...' }
     — **NÃO estruturado automaticamente** (7,5% das cláusulas, 33 de
       438) — coisas como proficiência genérica ("proficiência com
       escudos"), contagem de poderes de uma categoria ("três outros
       poderes da Tormenta"), ou pré-requisito de conquista narrativa
       ("ter conquistado terras ou realizado serviço para um nobre").
       Precisam de revisão manual quando a ficha for implementada de
       verdade — a lista completa desses casos está documentada no
       changelog do CLAUDE.md (item 35).

   Poderes com `prerequisito: null` no dado original (nenhum
   pré-requisito) NÃO aparecem aqui — ausência de chave = sem
   pré-requisito, não precisa checar `array vazio` vs `chave ausente`.

   Cobertura: 308 dos 463 poderes (poderes_gerais.js + poderes_classes.js,
   excluindo os 16 blocos tipo 'explicacao') têm pelo menos 1 cláusula
   aqui; os outros 155 têm `prerequisito: null` no dado original.
============================================================ */

const PREREQUISITO_VALIDACAO = {
  'abusar-dos-fracos': [
    { tipo: 'poder', nome: 'Flagelo dos Mares', id: 'flagelo-dos-mares' },
  ],
  'acrobatico': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
  ],
  'acuidade-com-arma': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
  ],
  'afinidade-com-a-tormenta': [
    { tipo: 'devoto', deus: 'Aharadak' },
  ],
  'agite-antes-de-usar': [
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'ajuste-de-mira': [
    { tipo: 'poder', nome: 'Balística', id: 'balistica' },
  ],
  'almejar-o-impossivel': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Thwor' }, { tipo: 'devoto', deus: 'Valkaria' }] },
  ],
  'alquimista-de-batalha': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
  ],
  'alquimista-iniciado': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'ambidestria': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
  ],
  'amigos-no-porto': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
    { tipo: 'nivelClasse', classe: 'bucaneiro', nivel: 6 },
  ],
  'anfibio-concedido': [
    { tipo: 'devoto', deus: 'Oceano' },
  ],
  'ao-sabor-do-destino': [
    { tipo: 'nivelClasse', classe: 'personagem', nivel: 6 },
  ],
  'aparar': [
    { tipo: 'poder', nome: 'Esgrimista', id: 'esgrimista-gue' },
  ],
  'aparencia-inofensiva': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
  ],
  'apostador': [
    { tipo: 'treinado', pericia: 'Jogatina', bruto: 'treinado em Jogatina' },
  ],
  'apostar-com-o-trapaceiro': [
    { tipo: 'devoto', deus: 'Hyninn' },
  ],
  'arma-sagrada': [
    { tipo: 'devoto', deus: 'uma divindade' },
  ],
  'arma-secundaria-grande': [
    { tipo: 'poder', nome: 'Estilo de Duas Armas', id: 'estilo-de-duas-armas' },
  ],
  'armadilheiro': [
    { tipo: 'texto', bruto: 'um poder de armadilha' },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 5 },
  ],
  'armadura-brilhante': [
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 8 },
  ],
  'armamento-aberrante': [
    { tipo: 'texto', bruto: 'outro poder da Tormenta' },
  ],
  'armas-da-ambicao': [
    { tipo: 'devoto', deus: 'Valkaria' },
  ],
  'armeiro': [
    { tipo: 'treinado', pericia: 'Luta e Ofício (armeiro)', bruto: 'treinado em Luta e Ofício (armeiro)' },
  ],
  'arqueiro': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
  ],
  'arremesso-multiplo': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
    { tipo: 'poder', nome: 'Estilo de Arremesso', id: 'estilo-de-arremesso' },
  ],
  'arremesso-potente': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
    { tipo: 'poder', nome: 'Estilo de Arremesso', id: 'estilo-de-arremesso' },
  ],
  'arsenal-das-profundezas': [
    { tipo: 'devoto', deus: 'Oceano' },
  ],
  'asas-insetoides': [
    { tipo: 'texto', bruto: 'quatro outros poderes da Tormenta' },
  ],
  'assassinar': [
    { tipo: 'nivelClasse', classe: 'ladino', nivel: 5 },
  ],
  'astucia-da-serpente': [
    { tipo: 'devoto', deus: 'Sszzaas' },
  ],
  'ataque-com-escudo': [
    { tipo: 'poder', nome: 'Estilo de Arma e Escudo', id: 'estilo-de-arma-e-escudo' },
  ],
  'ataque-pesado': [
    { tipo: 'poder', nome: 'Estilo de Duas Mãos', id: 'estilo-de-duas-maos' },
  ],
  'ataque-piedoso': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Lena' }, { tipo: 'devoto', deus: 'Thyatis' }] },
  ],
  'ataque-poderoso': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
  ],
  'ataque-preciso': [
    { tipo: 'poder', nome: 'Estilo de Uma Arma', id: 'estilo-de-uma-arma' },
  ],
  'ataque-reflexo': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
  ],
  'ativacao-rapida': [
    { tipo: 'poder', nome: 'Engenhoqueiro', id: 'engenhoqueiro' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 7 },
  ],
  'atletico': [
    { tipo: 'atributo', atributo: 'Força', valor: 2 },
  ],
  'atraente': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
  ],
  'aura-antimagia': [
    { tipo: 'nivelClasse', classe: 'paladino', nivel: 14 },
  ],
  'aura-ardente': [
    { tipo: 'nivelClasse', classe: 'paladino', nivel: 10 },
  ],
  'aura-de-cura': [
    { tipo: 'nivelClasse', classe: 'paladino', nivel: 6 },
  ],
  'aura-de-invencibilidade': [
    { tipo: 'nivelClasse', classe: 'paladino', nivel: 18 },
  ],
  'aura-de-medo': [
    { tipo: 'devoto', deus: 'Kallyadranoch' },
  ],
  'aura-de-paz': [
    { tipo: 'devoto', deus: 'Marah' },
  ],
  'aura-poderosa': [
    { tipo: 'nivelClasse', classe: 'paladino', nivel: 6 },
  ],
  'aura-restauradora': [
    { tipo: 'devoto', deus: 'Lena' },
  ],
  'automato': [
    { tipo: 'poder', nome: 'Engenhoqueiro', id: 'engenhoqueiro' },
  ],
  'automato-prototipado': [
    { tipo: 'poder', nome: 'Autômato', id: 'automato' },
  ],
  'autoridade-eclesiastica': [
    { tipo: 'nivelClasse', classe: 'clerigo', nivel: 5 },
    { tipo: 'devoto', deus: 'um deus maior' },
  ],
  'autoridade-feudal-cav': [
    { tipo: 'nivelClasse', classe: 'cavaleiro', nivel: 6 },
  ],
  'autoridade-feudal-nob': [
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 6 },
  ],
  'balistica': [
    { tipo: 'treinado', pericia: 'Pontaria e Ofício (armeiro)', bruto: 'treinado em Pontaria e Ofício (armeiro)' },
  ],
  'bencao-do-mana': [
    { tipo: 'devoto', deus: 'Wynna' },
  ],
  'blindagem': [
    { tipo: 'poder', nome: 'Couraceiro', id: 'couraceiro' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 8 },
  ],
  'bloqueio-com-escudo': [
    { tipo: 'poder', nome: 'Estilo de Arma e Escudo', id: 'estilo-de-arma-e-escudo' },
  ],
  'bote': [
    { tipo: 'poder', nome: 'Ambidestria', id: 'ambidestria' },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 6 },
  ],
  'brado-assustador': [
    { tipo: 'treinado', pericia: 'Intimidação', bruto: 'treinado em Intimidação' },
  ],
  'caldeirao-do-bruxo': [
    { tipo: 'arquetipo', valor: 'bruxo' },
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'camuflagem': [
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 6 },
  ],
  'canalizar-amplo': [
    { tipo: 'poder', nome: 'Canalizar Energia Positiva/Negativa', id: 'canalizar-energia' },
  ],
  'cano-raiado': [
    { tipo: 'poder', nome: 'Balística', id: 'balistica' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 5 },
  ],
  'carga-de-cavalaria': [
    { tipo: 'poder', nome: 'Ginete', id: 'ginete' },
  ],
  'caricia-sombria': [
    { tipo: 'devoto', deus: 'Tenebra' },
  ],
  'catalisador-instavel': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
  ],
  'celebrar-ritual': [
    { tipo: 'texto', bruto: 'Lançar magias' },
    { tipo: 'ou', opcoes: [{ tipo: 'treinado', pericia: 'Misticismo', bruto: 'treinado em Misticismo' }, { tipo: 'texto', bruto: 'Religião' }] },
    { tipo: 'nivelClasse', classe: 'personagem', nivel: 8 },
  ],
  'centelha-magica': [
    { tipo: 'devoto', deus: 'Wynna' },
  ],
  'chave': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
    { tipo: 'poder', nome: 'Lutador de Chão', id: 'lutador-de-chao' },
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 4 },
  ],
  'chutes-e-palavroes': [
    { tipo: 'poder', nome: 'Engenhoqueiro', id: 'engenhoqueiro' },
  ],
  'chuva-de-laminas': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 4 },
    { tipo: 'poder', nome: 'Ambidestria', id: 'ambidestria' },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 12 },
  ],
  'comandar': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
  ],
  'combate-defensivo': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'companheiro-animal': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
    { tipo: 'treinado', pericia: 'Adestramento', bruto: 'treinado em Adestramento' },
  ],
  'companheiro-animal-aprimorado': [
    { tipo: 'poder', nome: 'Companheiro Animal', id: 'companheiro-animal' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 6 },
  ],
  'companheiro-animal-cac': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
    { tipo: 'treinado', pericia: 'Adestramento', bruto: 'treinado em Adestramento' },
  ],
  'companheiro-animal-lendario': [
    { tipo: 'poder', nome: 'Companheiro Animal', id: 'companheiro-animal' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 18 },
  ],
  'companheiro-animal-magico': [
    { tipo: 'poder', nome: 'Companheiro Animal', id: 'companheiro-animal' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 8 },
  ],
  'compreender-os-ermos': [
    { tipo: 'devoto', deus: 'Allihanna' },
  ],
  'confianca-dos-ringues': [
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 8 },
  ],
  'conhecimento-de-formulas': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
  ],
  'conhecimento-enciclopedico': [
    { tipo: 'devoto', deus: 'Tanna-Toh' },
  ],
  'conjurar-arma': [
    { tipo: 'devoto', deus: 'Arsenal' },
  ],
  'contramagica-aprimorada': [
    { tipo: 'texto', bruto: 'Dissipar Magia' },
  ],
  'coragem-total': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Arsenal' }, { tipo: 'devoto', deus: 'Khalmyr' }, { tipo: 'devoto', deus: 'Lin-Wu' }, { tipo: 'devoto', deus: 'Valkaria' }] },
  ],
  'corpo-aberrante': [
    { tipo: 'texto', bruto: 'outro poder da Tormenta' },
  ],
  'costas-largas': [
    { tipo: 'atributo', atributo: 'Constituição', valor: 1 },
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
  ],
  'couraceiro': [
    { tipo: 'treinado', pericia: 'Ofício (armeiro)', bruto: 'treinado em Ofício (armeiro)' },
  ],
  'critico-brutal': [
    { tipo: 'nivelClasse', classe: 'barbaro', nivel: 6 },
  ],
  'cura-gentil': [
    { tipo: 'devoto', deus: 'Lena' },
  ],
  'curandeira-perfeita': [
    { tipo: 'devoto', deus: 'Lena' },
  ],
  'danca-das-laminas': [
    { tipo: 'poder', nome: 'Esgrima Mágica', id: 'esgrima-magica' },
    { tipo: 'nivelClasse', classe: 'bardo', nivel: 10 },
  ],
  'dedo-verde': [
    { tipo: 'devoto', deus: 'Allihanna' },
  ],
  'derrubar-aprimorado': [
    { tipo: 'poder', nome: 'Combate Defensivo', id: 'combate-defensivo' },
  ],
  'desarmar-aprimorado': [
    { tipo: 'poder', nome: 'Combate Defensivo', id: 'combate-defensivo' },
  ],
  'descanso-natural': [
    { tipo: 'devoto', deus: 'Allihanna' },
  ],
  'desprezar-a-realidade': [
    { tipo: 'texto', bruto: 'quatro outros poderes da Tormenta' },
  ],
  'destruidor-bar': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
  ],
  'destruidor-gue': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
  ],
  'disparo-preciso': [
    { tipo: 'ou', opcoes: [{ tipo: 'poder', nome: 'Estilo de Disparo', id: 'estilo-de-disparo' }, { tipo: 'poder', nome: 'Estilo de Arremesso', id: 'estilo-de-arremesso' }] },
  ],
  'disparo-rapido': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
    { tipo: 'poder', nome: 'Estilo de Disparo', id: 'estilo-de-disparo' },
  ],
  'dom-da-esperanca': [
    { tipo: 'devoto', deus: 'Marah' },
  ],
  'dom-da-imortalidade': [
    { tipo: 'devoto', deus: 'Thyatis' },
    { tipo: 'classe', classe: 'paladino' },
  ],
  'dom-da-profecia': [
    { tipo: 'devoto', deus: 'Thyatis' },
  ],
  'dom-da-ressurreicao': [
    { tipo: 'devoto', deus: 'Thyatis' },
    { tipo: 'classe', classe: 'clerigo' },
  ],
  'dom-da-verdade': [
    { tipo: 'devoto', deus: 'Khalmyr' },
  ],
  'elo-com-a-natureza': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 3 },
  ],
  'emboscar': [
    { tipo: 'treinado', pericia: 'Furtividade', bruto: 'treinado em Furtividade' },
  ],
  'emboscar-lad': [
    { tipo: 'treinado', pericia: 'Furtividade', bruto: 'treinado em Furtividade' },
  ],
  'empunhadura-poderosa': [
    { tipo: 'atributo', atributo: 'Força', valor: 3 },
  ],
  'en-garde': [
    { tipo: 'poder', nome: 'Esgrimista', id: 'esgrimista-gue' },
  ],
  'encouracado': [
    { tipo: 'texto', bruto: 'proficiência com armaduras pesadas' },
  ],
  'engenhoqueiro': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 3 },
    { tipo: 'treinado', pericia: 'Ofício (engenhoqueiro)', bruto: 'treinado em Ofício (engenhoqueiro)' },
  ],
  'escamas-draconicas': [
    { tipo: 'devoto', deus: 'Kallyadranoch' },
  ],
  'escaramuca': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 6 },
  ],
  'escaramuca-superior': [
    { tipo: 'poder', nome: 'Escaramuça', id: 'escaramuca' },
    { tipo: 'nivelClasse', classe: 'cacador', nivel: 12 },
  ],
  'escrever-pergaminho': [
    { tipo: 'texto', bruto: 'habilidade de classe Magias' },
    { tipo: 'treinado', pericia: 'Ofício (escriba)', bruto: 'treinado em Ofício (escriba)' },
  ],
  'escriba-arcano': [
    { tipo: 'arquetipo', valor: 'mago' },
    { tipo: 'treinado', pericia: 'Ofício (escriba)', bruto: 'treinado em Ofício (escriba)' },
  ],
  'escudo-magico': [
    { tipo: 'devoto', deus: 'Wynna' },
  ],
  'esgrimista-buc': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'esgrimista-gue': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'espada-justiceira': [
    { tipo: 'devoto', deus: 'Khalmyr' },
  ],
  'espada-solar': [
    { tipo: 'devoto', deus: 'Azgher' },
  ],
  'especialista-em-escola': [
    { tipo: 'ou', opcoes: [{ tipo: 'arquetipo', valor: 'bruxo' }, { tipo: 'arquetipo', valor: 'mago' }] },
  ],
  'especializacao-armadura-cav': [
    { tipo: 'nivelClasse', classe: 'cavaleiro', nivel: 12 },
  ],
  'especializacao-armadura-gue': [
    { tipo: 'nivelClasse', classe: 'guerreiro', nivel: 12 },
  ],
  'espirito-dos-equinocios': [
    { tipo: 'poder', nome: 'Aspecto da Primavera', id: 'aspecto-da-primavera' },
    { tipo: 'poder', nome: 'Aspecto do Outono', id: 'aspecto-do-outono' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 10 },
  ],
  'espirito-dos-solsticios': [
    { tipo: 'poder', nome: 'Aspecto do Inverno', id: 'aspecto-do-inverno' },
    { tipo: 'poder', nome: 'Aspecto do Verão', id: 'aspecto-do-verao' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 10 },
  ],
  'espirito-inquebravel': [
    { tipo: 'poder', nome: 'Alma de Bronze', id: 'alma-de-bronze' },
  ],
  'esquiva': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
  ],
  'estandarte': [
    { tipo: 'poder', nome: 'Título', id: 'titulo-nob' },
    { tipo: 'nivelClasse', classe: 'cavaleiro', nivel: 14 },
  ],
  'estilo-de-arma-e-escudo': [
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
    { tipo: 'texto', bruto: 'proficiência com escudos' },
  ],
  'estilo-de-arma-longa': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'estilo-de-arremesso': [
    { tipo: 'treinado', pericia: 'Pontaria', bruto: 'treinado em Pontaria' },
  ],
  'estilo-de-disparo': [
    { tipo: 'treinado', pericia: 'Pontaria', bruto: 'treinado em Pontaria' },
  ],
  'estilo-de-duas-armas': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'estilo-de-duas-maos': [
    { tipo: 'atributo', atributo: 'Força', valor: 2 },
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'estilo-de-uma-arma': [
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'estilo-desarmado': [
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'estrategista': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
    { tipo: 'treinado', pericia: 'Guerra', bruto: 'treinado em Guerra' },
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 6 },
  ],
  'estrelato': [
    { tipo: 'nivelClasse', classe: 'bardo', nivel: 6 },
  ],
  'expulsar-comandar-mortos-vivos': [
    { tipo: 'poder', nome: 'Canalizar Energia Positiva/Negativa', id: 'canalizar-energia' },
  ],
  'extase-da-loucura': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Aharadak' }, { tipo: 'devoto', deus: 'Nimb' }] },
  ],
  'familiar-ofidico': [
    { tipo: 'devoto', deus: 'Sszzaas' },
  ],
  'fanatico': [
    { tipo: 'nivelClasse', classe: 'personagem', nivel: 12 },
    { tipo: 'poder', nome: 'Encouraçado', id: 'encouracado' },
  ],
  'farmaceutico': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'farsa-do-fingidor': [
    { tipo: 'devoto', deus: 'Hyninn' },
  ],
  'fascinar-em-massa': [
    { tipo: 'poder', nome: 'Música: Balada Fascinante', id: 'musica-balada-fascinante' },
  ],
  'fe-guerreira': [
    { tipo: 'devoto', deus: 'Arsenal' },
  ],
  'ferreiro': [
    { tipo: 'poder', nome: 'Armeiro', id: 'armeiro' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 5 },
  ],
  'finta-aprimorada': [
    { tipo: 'treinado', pericia: 'Enganação', bruto: 'treinado em Enganação' },
  ],
  'flagelo-dos-mares': [
    { tipo: 'treinado', pericia: 'Intimidação', bruto: 'treinado em Intimidação' },
  ],
  'fluxo-de-mana': [
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 10 },
  ],
  'foco-em-arma': [
    { tipo: 'texto', bruto: 'proficiência com a arma' },
  ],
  'foco-em-magia': [
    { tipo: 'texto', bruto: 'Lançar magias' },
  ],
  'foco-em-pericia': [
    { tipo: 'treinado', pericia: null, bruto: 'treinado na perícia escolhida' },
  ],
  'foco-vital': [
    { tipo: 'arquetipo', valor: 'bruxo' },
  ],
  'foliao': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
  ],
  'forca-dos-penhascos': [
    { tipo: 'nivelClasse', classe: 'druida', nivel: 4 },
  ],
  'forma-de-macaco': [
    { tipo: 'devoto', deus: 'Hyninn' },
  ],
  'forma-primal': [
    { tipo: 'nivelClasse', classe: 'druida', nivel: 18 },
  ],
  'forma-selvagem-aprimorada': [
    { tipo: 'poder', nome: 'Forma Selvagem', id: 'forma-selvagem' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 6 },
  ],
  'forma-selvagem-superior': [
    { tipo: 'poder', nome: 'Forma Selvagem Aprimorada', id: 'forma-selvagem-aprimorada' },
    { tipo: 'nivelClasse', classe: 'druida', nivel: 12 },
  ],
  'fortalecimento-arcano': [
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 5 },
  ],
  'fuga-formidavel': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'fulgor-solar': [
    { tipo: 'devoto', deus: 'Azgher' },
  ],
  'furia-divina': [
    { tipo: 'devoto', deus: 'Thwor' },
  ],
  'geral': [
    { tipo: 'poder', nome: 'Estrategista', id: 'estrategista' },
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 12 },
  ],
  'ginete': [
    { tipo: 'treinado', pericia: 'Cavalgar', bruto: 'treinado em Cavalgar' },
  ],
  'golpe-elemental-brd': [
    { tipo: 'poder', nome: 'Golpe Mágico', id: 'golpe-magico' },
  ],
  'golpe-magico': [
    { tipo: 'poder', nome: 'Esgrima Mágica', id: 'esgrima-magica' },
  ],
  'golpe-pessoal': [
    { tipo: 'nivelClasse', classe: 'guerreiro', nivel: 5 },
  ],
  'golpista-divino': [
    { tipo: 'devoto', deus: 'Hyninn' },
  ],
  'granadeiro': [
    { tipo: 'poder', nome: 'Alquimista de Batalha', id: 'alquimista-de-batalha' },
  ],
  'grito-tiranico': [
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 8 },
  ],
  'grudar-o-cano': [
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
    { tipo: 'poder', nome: 'Pistoleiro', id: 'pistoleiro' },
  ],
  'habitante-do-deserto': [
    { tipo: 'devoto', deus: 'Azgher' },
  ],
  'heranca-aprimorada': [
    { tipo: 'arquetipo', valor: 'feiticeiro' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 6 },
  ],
  'heranca-superior': [
    { tipo: 'poder', nome: 'Herança Aprimorada', id: 'heranca-aprimorada' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 11 },
  ],
  'homuncolo': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
  ],
  'imobilizacao': [
    { tipo: 'poder', nome: 'Chave', id: 'chave' },
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 8 },
  ],
  'inexpugnavel': [
    { tipo: 'poder', nome: 'Encouraçado', id: 'encouracado' },
    { tipo: 'nivelClasse', classe: 'personagem', nivel: 6 },
  ],
  'inimigo-de-tenebra': [
    { tipo: 'devoto', deus: 'Azgher' },
  ],
  'inspirar-gloria': [
    { tipo: 'poder', nome: 'Inspirar Confiança', id: 'inspirar-confianca' },
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 8 },
  ],
  'inventario-organizado': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'investigador': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'kiai-divino': [
    { tipo: 'devoto', deus: 'Lin-Wu' },
  ],
  'ladrao-arcano': [
    { tipo: 'poder', nome: 'Roubo de Mana', id: 'roubo-de-mana' },
    { tipo: 'nivelClasse', classe: 'ladino', nivel: 13 },
  ],
  'larva-explosiva': [
    { tipo: 'poder', nome: 'Dentes Afiados', id: 'dentes-afiados' },
  ],
  'legiao-aberrante': [
    { tipo: 'poder', nome: 'Anatomia Insana', id: 'anatomia-insana' },
    { tipo: 'texto', bruto: 'três outros poderes da Tormenta' },
  ],
  'lendas-e-historias': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'liberdade-divina': [
    { tipo: 'devoto', deus: 'Valkaria' },
  ],
  'liderar-pelo-exemplo': [
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 6 },
  ],
  'lingua-de-ouro': [
    { tipo: 'poder', nome: 'Língua de Prata', id: 'lingua-de-prata' },
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 8 },
  ],
  'lingua-dos-becos': [
    { tipo: 'atributo', atributo: 'Força', valor: 1 },
    { tipo: 'treinado', pericia: 'Intimidação', bruto: 'treinado em Intimidação' },
  ],
  'linhagem-draconica-aprimorada': [
    { tipo: 'poder', nome: 'Herança Aprimorada', id: 'heranca-aprimorada' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 6 },
  ],
  'linhagem-draconica-basica': [
    { tipo: 'arquetipo', valor: 'feiticeiro' },
  ],
  'linhagem-draconica-superior': [
    { tipo: 'poder', nome: 'Herança Superior', id: 'heranca-superior' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 11 },
  ],
  'linhagem-feerica-aprimorada': [
    { tipo: 'poder', nome: 'Herança Aprimorada', id: 'heranca-aprimorada' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 6 },
  ],
  'linhagem-feerica-basica': [
    { tipo: 'arquetipo', valor: 'feiticeiro' },
  ],
  'linhagem-feerica-superior': [
    { tipo: 'poder', nome: 'Herança Superior', id: 'heranca-superior' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 11 },
  ],
  'linhagem-rubra-aprimorada': [
    { tipo: 'poder', nome: 'Herança Aprimorada', id: 'heranca-aprimorada' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 6 },
  ],
  'linhagem-rubra-basica': [
    { tipo: 'arquetipo', valor: 'feiticeiro' },
  ],
  'linhagem-rubra-superior': [
    { tipo: 'poder', nome: 'Herança Superior', id: 'heranca-superior' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 11 },
  ],
  'magia-acelerada': [
    { tipo: 'texto', bruto: 'Lançar magias de 2º círculo' },
  ],
  'magia-ampliada': [
    { tipo: 'texto', bruto: 'Lançar magias' },
  ],
  'magia-discreta': [
    { tipo: 'texto', bruto: 'Lançar magias' },
  ],
  'magia-ilimitada': [
    { tipo: 'texto', bruto: 'Lançar magias' },
  ],
  'magia-natural': [
    { tipo: 'poder', nome: 'Forma Selvagem', id: 'forma-selvagem' },
  ],
  'manipular': [
    { tipo: 'poder', nome: 'Música: Balada Fascinante', id: 'musica-balada-fascinante' },
  ],
  'manipular-em-massa': [
    { tipo: 'poder', nome: 'Fascinar em Massa', id: 'fascinar-em-massa' },
    { tipo: 'poder', nome: 'Manipular', id: 'manipular' },
    { tipo: 'nivelClasse', classe: 'bardo', nivel: 10 },
  ],
  'manto-da-penumbra': [
    { tipo: 'devoto', deus: 'Tenebra' },
  ],
  'manutencao-eficiente': [
    { tipo: 'poder', nome: 'Engenhoqueiro', id: 'engenhoqueiro' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 5 },
  ],
  'mao-na-boca': [
    { tipo: 'treinado', pericia: 'Luta', bruto: 'treinado em Luta' },
  ],
  'maos-rapidas': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
    { tipo: 'treinado', pericia: 'Ladinagem', bruto: 'treinado em Ladinagem' },
  ],
  'medicina': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'treinado', pericia: 'Cura', bruto: 'treinado em Cura' },
  ],
  'melodia-restauradora': [
    { tipo: 'poder', nome: 'Música: Melodia Curativa', id: 'musica-melodia-curativa' },
  ],
  'membros-extras': [
    { tipo: 'texto', bruto: 'quatro outros poderes da Tormenta' },
  ],
  'mente-analitica': [
    { tipo: 'devoto', deus: 'Tanna-Toh' },
  ],
  'mente-criminosa': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'mente-vazia': [
    { tipo: 'devoto', deus: 'Lin-Wu' },
  ],
  'mestre-alquimista': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 3 },
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 3 },
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 10 },
  ],
  'mestre-celebrante': [
    { tipo: 'texto', bruto: 'qualquer poder de Missa' },
    { tipo: 'nivelClasse', classe: 'clerigo', nivel: 12 },
  ],
  'mestre-cuca': [
    { tipo: 'treinado', pericia: 'Ofício (cozinheiro)', bruto: 'treinado em Ofício (cozinheiro)' },
  ],
  'mestre-dos-mares': [
    { tipo: 'devoto', deus: 'Oceano' },
  ],
  'mestre-dos-sussurros': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
    { tipo: 'treinado', pericia: 'Enganação e Investigação', bruto: 'treinado em Enganação e Investigação' },
  ],
  'mestre-em-arma': [
    { tipo: 'poder', nome: 'Especialização em Arma', id: 'especializacao-em-arma' },
    { tipo: 'nivelClasse', classe: 'guerreiro', nivel: 12 },
  ],
  'mestre-em-escola': [
    { tipo: 'poder', nome: 'Especialista em Escola', id: 'especialista-em-escola' },
    { tipo: 'nivelClasse', classe: 'arcanista', nivel: 8 },
  ],
  'mira-apurada': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'poder', nome: 'Disparo Preciso', id: 'disparo-preciso' },
  ],
  'mistura-fervilhante': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
    { tipo: 'nivelClasse', classe: 'inventor', nivel: 5 },
  ],
  'montaria-corajosa': [
    { tipo: 'texto', bruto: 'Montaria' },
  ],
  'musica-balada-fascinante': [
    { tipo: 'treinado', pericia: 'Atuação', bruto: 'treinado em Atuação' },
    { tipo: 'texto', bruto: 'instrumento musical' },
  ],
  'musica-cancao-assustadora': [
    { tipo: 'treinado', pericia: 'Atuação', bruto: 'treinado em Atuação' },
    { tipo: 'texto', bruto: 'instrumento musical' },
  ],
  'musica-melodia-curativa': [
    { tipo: 'treinado', pericia: 'Atuação', bruto: 'treinado em Atuação' },
    { tipo: 'texto', bruto: 'instrumento musical' },
  ],
  'nome-na-arena': [
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 11 },
  ],
  'oficina-de-campo': [
    { tipo: 'treinado', pericia: 'Ofício (armeiro)', bruto: 'treinado em Ofício (armeiro)' },
  ],
  'olhar-amedrontador': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Megalokk' }, { tipo: 'devoto', deus: 'Thwor' }] },
  ],
  'oportunismo': [
    { tipo: 'nivelClasse', classe: 'ladino', nivel: 6 },
  ],
  'palavras-de-bondade': [
    { tipo: 'devoto', deus: 'Marah' },
  ],
  'parceiro': [
    { tipo: 'ou', opcoes: [{ tipo: 'treinado', pericia: 'Adestramento (parceiro animal)', bruto: 'treinado em Adestramento (parceiro animal)' }, { tipo: 'texto', bruto: 'Diplomacia (parceiro humanoide)' }] },
    { tipo: 'nivelClasse', classe: 'personagem', nivel: 5 },
  ],
  'pedra-de-amolar': [
    { tipo: 'poder', nome: 'Armeiro', id: 'armeiro' },
  ],
  'pele-de-aco': [
    { tipo: 'poder', nome: 'Pele de Ferro', id: 'pele-de-ferro' },
    { tipo: 'nivelClasse', classe: 'barbaro', nivel: 8 },
  ],
  'percepcao-temporal': [
    { tipo: 'devoto', deus: 'Aharadak' },
  ],
  'pesquisa-abencoada': [
    { tipo: 'devoto', deus: 'Tanna-Toh' },
  ],
  'piqueiro': [
    { tipo: 'poder', nome: 'Estilo de Arma Longa', id: 'estilo-de-arma-longa' },
  ],
  'planejamento-marcial': [
    { tipo: 'treinado', pericia: 'Guerra', bruto: 'treinado em Guerra' },
    { tipo: 'nivelClasse', classe: 'guerreiro', nivel: 10 },
  ],
  'poder-oculto': [
    { tipo: 'devoto', deus: 'Nimb' },
  ],
  'postura-muralha-intransponivel': [
    { tipo: 'texto', bruto: 'empunhando um escudo' },
  ],
  'preparar-pocao': [
    { tipo: 'texto', bruto: 'habilidade de classe Magias' },
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'presas-afiadas': [
    { tipo: 'poder', nome: 'Forma Selvagem', id: 'forma-selvagem' },
  ],
  'presas-primordiais': [
    { tipo: 'ou', opcoes: [{ tipo: 'devoto', deus: 'Kallyadranoch' }, { tipo: 'devoto', deus: 'Megalokk' }] },
  ],
  'presas-venenosas': [
    { tipo: 'devoto', deus: 'Sszzaas' },
  ],
  'presenca-aterradora': [
    { tipo: 'treinado', pericia: 'Intimidação', bruto: 'treinado em Intimidação' },
  ],
  'presenca-majestosa': [
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 16 },
  ],
  'presenca-paralisante': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
    { tipo: 'nivelClasse', classe: 'bucaneiro', nivel: 4 },
  ],
  'prestidigitacao': [
    { tipo: 'nivelClasse', classe: 'bardo', nivel: 6 },
  ],
  'punhos-de-adamante': [
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 8 },
  ],
  'quebrar-aprimorado': [
    { tipo: 'poder', nome: 'Ataque Poderoso', id: 'ataque-poderoso' },
  ],
  'raio-elemental': [
    { tipo: 'poder', nome: 'Raio Arcano', id: 'raio-arcano' },
  ],
  'raio-poderoso': [
    { tipo: 'poder', nome: 'Raio Arcano', id: 'raio-arcano' },
  ],
  'reflexos-de-combate': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 1 },
  ],
  'rejeicao-divina': [
    { tipo: 'devoto', deus: 'Aharadak' },
  ],
  'reparar-injustica': [
    { tipo: 'devoto', deus: 'Khalmyr' },
  ],
  'ripostar': [
    { tipo: 'poder', nome: 'Aparar', id: 'aparar' },
    { tipo: 'nivelClasse', classe: 'bucaneiro', nivel: 12 },
  ],
  'rolamento-defensivo': [
    { tipo: 'treinado', pericia: 'Reflexos', bruto: 'treinado em Reflexos' },
  ],
  'roubo-de-mana': [
    { tipo: 'poder', nome: 'Truque Mágico', id: 'truque-magico' },
    { tipo: 'nivelClasse', classe: 'ladino', nivel: 7 },
  ],
  'sangue-de-ferro': [
    { tipo: 'devoto', deus: 'Arsenal' },
  ],
  'sangue-ofidico': [
    { tipo: 'devoto', deus: 'Sszzaas' },
  ],
  'saque-rapido': [
    { tipo: 'treinado', pericia: 'Iniciativa', bruto: 'treinado em Iniciativa' },
  ],
  'sarado': [
    { tipo: 'atributo', atributo: 'Força', valor: 3 },
  ],
  'sentidos-agucados': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'treinado', pericia: 'Percepção', bruto: 'treinado em Percepção' },
  ],
  'sequencia-destruidora': [
    { tipo: 'poder', nome: 'Trocação', id: 'trocacao' },
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 12 },
  ],
  'servos-do-dragao': [
    { tipo: 'devoto', deus: 'Kallyadranoch' },
  ],
  'sintese-rapida': [
    { tipo: 'poder', nome: 'Alquimista Iniciado', id: 'alquimista-iniciado' },
  ],
  'solidez-cav': [
    { tipo: 'texto', bruto: 'escudo' },
  ],
  'solidez-gue': [
    { tipo: 'texto', bruto: 'escudo' },
  ],
  'sombra': [
    { tipo: 'treinado', pericia: 'Furtividade', bruto: 'treinado em Furtividade' },
  ],
  'sopro-do-mar': [
    { tipo: 'devoto', deus: 'Oceano' },
  ],
  'sorte-dos-loucos': [
    { tipo: 'devoto', deus: 'Nimb' },
  ],
  'talento-artistico': [
    { tipo: 'devoto', deus: 'Marah' },
  ],
  'teurgista-mistico': [
    { tipo: 'devoto', deus: 'Wynna' },
    { tipo: 'texto', bruto: 'habilidade de classe Magias' },
  ],
  'tinta-do-mago': [
    { tipo: 'arquetipo', valor: 'mago' },
    { tipo: 'treinado', pericia: 'Ofício (escriba)', bruto: 'treinado em Ofício (escriba)' },
  ],
  'titulo-cav': [
    { tipo: 'poder', nome: 'Autoridade Feudal', id: 'autoridade-feudal-nob' },
    { tipo: 'nivelClasse', classe: 'cavaleiro', nivel: 10 },
    { tipo: 'ou', opcoes: [{ tipo: 'texto', bruto: 'ter conquistado terras' }, { tipo: 'texto', bruto: 'realizado serviço para um nobre' }] },
  ],
  'titulo-nob': [
    { tipo: 'poder', nome: 'Autoridade Feudal', id: 'autoridade-feudal-nob' },
    { tipo: 'nivelClasse', classe: 'nobre', nivel: 10 },
    { tipo: 'texto', bruto: 'ter conquistado terras' },
  ],
  'torcida': [
    { tipo: 'atributo', atributo: 'Carisma', valor: 1 },
  ],
  'tornado-de-dor': [
    { tipo: 'nivelClasse', classe: 'guerreiro', nivel: 6 },
  ],
  'totem-espiritual': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
    { tipo: 'nivelClasse', classe: 'barbaro', nivel: 4 },
  ],
  'touche': [
    { tipo: 'poder', nome: 'Esgrimista', id: 'esgrimista-gue' },
    { tipo: 'nivelClasse', classe: 'bucaneiro', nivel: 10 },
  ],
  'tradicao-de-lin-wu': [
    { tipo: 'devoto', deus: 'Lin-Wu' },
  ],
  'transmissao-da-loucura': [
    { tipo: 'devoto', deus: 'Nimb' },
  ],
  'trespassar': [
    { tipo: 'poder', nome: 'Ataque Poderoso', id: 'ataque-poderoso' },
  ],
  'trincado': [
    { tipo: 'atributo', atributo: 'Constituição', valor: 3 },
    { tipo: 'poder', nome: 'Sarado', id: 'sarado' },
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 10 },
  ],
  'trocacao': [
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 6 },
  ],
  'trocacao-tumultuosa': [
    { tipo: 'poder', nome: 'Trocação', id: 'trocacao' },
    { tipo: 'nivelClasse', classe: 'lutador', nivel: 8 },
  ],
  'tropas-duyshidakk': [
    { tipo: 'devoto', deus: 'Thwor' },
  ],
  'truque-magico': [
    { tipo: 'atributo', atributo: 'Inteligência', valor: 1 },
  ],
  'urro-divino': [
    { tipo: 'devoto', deus: 'Megalokk' },
  ],
  'velocidade-ladina': [
    { tipo: 'atributo', atributo: 'Destreza', valor: 2 },
    { tipo: 'treinado', pericia: 'Iniciativa', bruto: 'treinado em Iniciativa' },
  ],
  'veneficio': [
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'veneno-persistente': [
    { tipo: 'poder', nome: 'Veneno Potente', id: 'veneno-potente' },
    { tipo: 'nivelClasse', classe: 'ladino', nivel: 8 },
  ],
  'veneno-potente': [
    { tipo: 'treinado', pericia: 'Ofício (alquimista)', bruto: 'treinado em Ofício (alquimista)' },
  ],
  'visao-nas-trevas': [
    { tipo: 'devoto', deus: 'Tenebra' },
  ],
  'vitalidade': [
    { tipo: 'atributo', atributo: 'Constituição', valor: 1 },
  ],
  'vontade-de-ferro': [
    { tipo: 'atributo', atributo: 'Sabedoria', valor: 1 },
  ],
  'voz-da-civilizacao': [
    { tipo: 'devoto', deus: 'Tanna-Toh' },
  ],
  'voz-da-natureza': [
    { tipo: 'devoto', deus: 'Allihanna' },
  ],
  'voz-dos-monstros': [
    { tipo: 'devoto', deus: 'Megalokk' },
  ],
  'zumbificar': [
    { tipo: 'devoto', deus: 'Tenebra' },
  ],
};

if (typeof window !== 'undefined') window.PREREQUISITO_VALIDACAO = PREREQUISITO_VALIDACAO;
