const French = {
  common: {
    close: "Fermer",
    reset: "Réinitialiser",
    next: "Suivant",
    retry: "Réessayer",
    complete: "Terminer",
    start: "Commencer",
    auto: "Auto",
  },

  tabs: {
    learning: "Apprentissage",
    practice: "Pratique",
    kana: "Kana",
    profile: "Paramètres",
  },

  learning: {
    testing: "Tests",
    wordGame: "Jeu de mots"
  },

  practice: {
    start: "Commencer l'apprentissage",

    question: "Question",

    timer: {
      fast: "3 sec",
      medium: "5 sec",
      slow: "7 sec",
    },

    selectCorrectTransliteration: "Sélectionnez la translittération correcte.",

    selectHiraganaForWord: "Sélectionnez le hiragana dans le bon ordre.",
    selectKatakanaForWord: "Sélectionnez le katakana dans le bon ordre.",
  },

  testing: {
    cardMode: "Cartes",
    testMode: "Mode",
  },

  difficultyLevel: {
    timeTest: "Minuteur",
    oneAttempt: "Une tentative",
  },

  wordGame: {
    mode: "Mode",

    choice: "Choix",
    wordBuilding: "Formation de mots",
    findThePair: "Trouver la paire",
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romanji: "Romaji",

    basic: "De base",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yoon",

    kana: "Syllabe"
  },

  selectKana: {
    words: "Mots",
    letters: "Syllabes",
    nothingSelected: "Rien de sélectionné"
  },

  settings: {
    displayStatistics: "Afficher les statistiques",
    hapticFeedback: "Retour haptique",
    theme: {
      title: "Thème",
      light: "Clair",
      dark: "Sombre",
      auto: "Automatique"
    },
    language: "Langue",
    privacyPolicy: "Politique de confidentialité",
    contactSupport: "Contacter le support",

    joinOurCommunity: {
      title: "Rejoignez notre communauté",
    },

    eraseData: {
      button: "Effacer les données de l'application",
      dataTakesUp: "Les données occupent",
      title: "Êtes-vous sûr de vouloir effacer les données ?",
      subtitle: "Toutes les données enregistrées, y compris les paramètres et le progrès, seront supprimées. Cette action est irréversible."
    },
    sourceCode: {
      title: "Code source",
      githubRepository: "Répertoire GitHub",
    },
    version: "Version",
  },

  result: {
    title: "Pratique terminée",
    score: "Score",

    wellDoneNoErrors: "Bien joué, aucune erreur!",

    sec: "sec",
    min: "min",

    question: "question",

    details: "Détails",

    alphabet: "Alphabet",

    fastestAnswer: "Réponse la plus rapide",
    slowestAnswer: "Réponse la plus lente",

    incorrectAnswers: "Réponses incorrectes",

    incorrectWordBuilding: "Réponses incorrectes à la formation de mots",
    incorrectFindPair: "Réponses incorrectes à la recherche de paire",
    incorrectChoice: "Réponses incorrectes au choix de mots",

    done: "Terminé"
  },

  tooltip: {
    syllablesSelectMoreThan5: "* Plus de 5 syllabes doivent être sélectionnées",
    cardSelectAtLeastOne: "* Au moins un type de carte doit être sélectionné",
    wordsSelectMoreThan10: "* Plus de 10 mots doivent être disponibles",
    modeSelectAtLeastOne: "* Au moins un mode doit être sélectionné",
  },

  lessonsList: {
    chapter: "Chapitre",
    completed: "terminé",
    lesson: "Leçon",

    grammar: "Grammaire",

    firstLessonInSectionTitle: "Apprenez à écrire les {{count}} premières syllabes.",
    continuingLessonsTitle: "Apprenez à écrire les {{count}} syllabes suivantes.",
    finalLessonInSectionTitle: "Apprenez à écrire les {{count}} dernières syllabes."
  },

  lesson: {
    rememberWritingAndSoundLetter: "Souvenez-vous de l'écriture et de la prononciation de cette syllabe.",
    drawSyllable: "Dessinez la syllabe «{{syllable}}» dans le bon ordre.",
    matchHiraganaWithTransliteration: "Associez le Hiragana avec la translittération.",
    matchKatakanaWithTransliteration: "Associez le Katakana avec la translittération.",
    selectCorrectTransliteration: "Sélectionnez la translittération correcte de la syllabe «{{syllable}}».",
    chooseCorrectTransliterationSequence: "Sélectionnez la séquence correcte de la translittération.",
    arrangeSyllablesInCorrectOrder: "Disposez les syllabes dans le bon ordre.",
    practiceEveryDay: "Pratiquez tous les jours pour consolider vos connaissances.",
    learningComplete: "Leçon terminée!",
  },

  transliterationSystems: {
    transliterationSystems: "Systèmes de translittération",
    romajiLatin: "Romaji (latin)",
    transliterationInCyrillic: "Translittération en cyrillique",

    russianPhoneticTransliteration: "Phonétique russe",

    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
  },

  alert: {
    exitConformation: {
      title: "Êtes-vous sûr de vouloir quitter?",
      subtitle: "Votre progression ne sera pas sauvegardée si vous quittez maintenant."
    },
    
    cancel: "Annuler",
    ok: "Ok",
    confirm: "Confirmer",
  }
};

export default French;