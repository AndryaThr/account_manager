const fr = {
  common: {
    app_title: "Password Manager",
    app_description: "Gestion de mots de passes et de comptes",
    nothing: "Rien à afficher",
    default: "Par défaut",
    all: "Toutes les catégories",
    category_order: "Catégorie",
    date: "Dernière date de modification",
    button: {
      new: "Ajouter",
      login: "Se connecter",
      logout: "Se déconnecter",
      create: "Valider les informations",
      default: "Valeurs par défaut",
      yes: "Oui",
      no: "Non",
      validate: "Valider",
      clear: "Effacer",
      reset: "Réinitialiser",
      clear_filter: "Effacer le filtre",
      delete: "Supprimer",
      modify: "Modifier",
    },
    form: {
      name: "Nom",
      firstname: "Prénoms",
      username: "Nom d'utilisateur du compte",
      password: "Mot de passe",
      mail: "Mail",
      phone: "Téléphone",
      confirm_pass: "Confirmation mot de passe",
      token: "Token",
      placeholder_token: "Insérer votre token ici si vous en avez",
      placeholder_cat: "Séléctionnez la catégorie ...",
      placeholder_sm_label: "Sélectionner le site ...",
      sm_label: "Plateforme",
      icon: "Icône (facultatif)",
      category: "Catégorie",
      query: "Question",
      answer: "Réponse",
      placeholder_query: "Question de sécurité ...",
      placeholder_answer: "Réponse correspondante ...",
      private_key: "Clé privé",
    },
    explication_token:
      "Les jetons d'authentification (token) fonctionnent à la manière d'un ticket d'entrée à validité limitée : ils accordent un accès en continu pendant leur durée de validité. Dès que l'utilisateur se déconnecte ou quitte l'application, le jeton est invalidé.",
    asc: "Ascendant",
    desc: "Descendant",
    order: "Ordre",
    undefined: "",
  },
  message: {
    error: "Erreur de développement",
    errors: {
      required: "Champ requis",
      username:
        "5 caractères alphanumériques minimum, caractères spéciaux non supportés",
      mail: "Adresse mail non valide",
      login_error: "Utilisateur ou mot de passe invalide",
      phone_number: "Caractères reconnus: 0 ~ 9, 8 caractères minimum",
      ph_length: "Un numéro téléphone comporte au moins 10 chiffres",
      confirmation: "Mot de passe non confirmé",
      space_not_allowed: "Le caractère _ (espace) n'est pas autorisé",
    },
    err_message: {
      err_insert: "Erreur de création",
      err_update: "Erreur de modification",
      err_insert_desc: "Vérifiez les informations saisies avant de valider",
      err_update_desc: "Vérifiez les informations saisies avant de valider",
    },
    delete: {
      title: "Confirmer suppression",
      description: "Voulez-vous vraiment supprimer?",
    },
    quit: {
      title: "Quitter",
      description: "Voulez-vous vraiment quitter?",
    },
    caution: {
      password:
        "Votre compte ne pourra plus être restauré si vous oubliez votre mot de passe/code pin",
      password_long:
        "Malheureusement, la seule solution pour accéder à l'application est de connaître le mot de passe et le code pin en même temps, tant que vous ne vous en souviendrez pas, vous ne pouvez accéder à votre espace personnel, merci de votre compréhension !",
      password_long_2:
        "Par contre, si vous souhaitez quand même utiliser l'application et que vous ne connaissez pas votre mot de passe, la seule solution serait de réinitialiser votre application, toutes les données sauvegardées seraient supprimées, et ne pourront pas être restaurées, pensez-y avant de regretter votre action.",
      reset_app:
        "Pour confirmer la réinitialisation de l'application et la perte de toutes vos données, saisissez OK et confirmez",
    },
    reset: {
      title: "Réinitialisation réussie",
      subtitle: "Félicitations, vous pouvez utiliser l'application à nouveau",
    },
    proceed: {
      title: "Procéder ?",
      subtitle: "Voulez-vous vraiment continuer ?",
    },
  },
  screens: {
    auth: {
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      sign_in: "Continuer",
      welcome: "Identifiez-vous",
      welcome_description:
        "Identifiez-vous pour accéder à votre espace personnel",
      forget_pass: "Mot de passe oublié ?",
      create_account: "Pour associer un autre profil, cliquez ici",
    },
    forget_pass: {
      title: "Réinitialiser l'application",
      subtitle: "Supprimer toutes les données",
      header: "Attention !!",
      ok_label: 'Saisissez "OK" puis validez',
    },
    home: {
      title: "Espace personnel",
      saved_account: "Liste de vos comptes enregistrés",
      subtitle: "Gestion des comptes",
      description: "Vous pouvez gérer vos comptes ici",
      sort: "Trier",
      sort_by: "Trier par",
      filter: "Filtrer par",
    },
    new: {
      title: "Ajout de compte",
      description: "A propos du compte",
      warning: "Vérifier bien les informations saisies avant de valider",
      account_info: "Informations du compte",
      platform_info: "Information sur la plateforme",
      platform_selection: "Choisissez la plateforme",
      placeholder_platform: "ex: facebook ...",
      security_question: "Question(s) de sécurité",
      sq_description:
        "Cliquez sur le bouton pour une question de sécurité lors de la création du compte",
    },
    digit: {
      title: "Confirmer votre identité",
      description: "On n'est jamais trop prudent",
      added: "Ajouté le {{x}}",
      username: "user",
      mail: "mail",
    },
    details: {
      title: "Détails d'un compte",
      description: "Informations enregistrées sur le compte",
      sq_description: "Pas de question de sécurité enregistrée pour ce compte",
    },
    edit: {
      title: "Modification d'informations",
      subtitle: "Mettez à jour les informations sur votre compte",
    },
    create: {
      title: "Nouvel utilisateur",
      subtitle:
        "Ces informations sont nécessaires pour sécuriser l'application",
      welcome: "Qui êtes vous ?",
      welcome_description:
        "Pour utiliser cette application, veuillez remplir ces champs",
    },
    add_digit: {
      title_1: "Code secret",
      description_1: "Ajouter un code que seul vous connaissez",
      title_2: "Confirmation code secret",
      description_2: "Re-saisir votre code secret",
    },
  },
};

export default fr;
