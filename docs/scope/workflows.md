# 5. Workflows fonctionnels

## 5.1 Présentation

Les workflows décrivent le déroulement fonctionnel des principales opérations de la plateforme AIWORX.

Chaque workflow définit :

* l'objectif ;
* les acteurs ;
* le déclencheur ;
* les préconditions ;
* les étapes principales ;
* les décisions et contrôles ;
* le résultat ;
* les cas particuliers ;
* les règles métier principales.

Le cycle fonctionnel AIWORX est décomposé en 16 workflows.

---

## 5.2 Vue globale

Le cycle principal est le suivant :

```text
01. Inscription et création du compte
              ↓
02. Création du besoin
              ↓
03. Qualification du besoin
              ↓
04. Matching
              ↓
05. Création et soumission d'une offre
              ↓
06. Comparaison et négociation
              ↓
07. Sélection du prestataire
              ↓
08. Contrat et signature
              ↓
09. Financement
              ↓
10. Démarrage et exécution de la mission
              ↓
11. Gestion des jalons
              ↓
12. Contrôle qualité
              ↓
13. Correction des livrables
              ↓
14. Validation finale
              ↓
15. Reversement
              ↓
16. Évaluation
```

---

# 5.3 Workflow 01 — Inscription et création de compte

## Objectif

Permettre à un utilisateur de créer un compte et d'accéder à son espace selon son rôle.

## Acteurs

* Entreprise cliente ;
* Prestataire ;
* Système AIWORX.

## Déclencheur

L'utilisateur choisit de créer un compte.

## Préconditions

* L'utilisateur dispose d'une adresse de contact valide.
* Les informations obligatoires peuvent être renseignées.

## Étapes principales

1. Accéder au formulaire d'inscription.
2. Choisir le type de compte.
3. Renseigner les informations demandées.
4. Valider l'inscription.
5. Le système contrôle les informations.
6. Le compte est créé ou placé dans un état nécessitant une vérification complémentaire.
7. L'utilisateur accède à son espace selon les droits associés à son rôle.

## Décisions et contrôles

* Informations obligatoires manquantes : l'inscription doit être complétée.
* Pour un prestataire, des éléments de qualification peuvent être demandés.
* Les documents ou informations nécessaires doivent être valides pour permettre la qualification.

## Résultat

Un compte est créé avec un rôle et un statut adaptés.

## Cas particuliers

* Données invalides ou incomplètes.
* Vérification du prestataire non terminée.
* Compte suspendu.
* Documents arrivés à expiration.

## Règles métier

* Les droits dépendent du rôle.
* La qualification d'un prestataire est distincte de la simple création du compte.

---

# 5.4 Workflow 02 — Création d'un besoin

## Objectif

Permettre à l'entreprise cliente de formaliser une demande de mission exploitable par AIWORX et les prestataires.

## Acteurs

* Entreprise cliente ;
* Système AIWORX ;
* Conseiller AIWORX.

## Déclencheur

Le client souhaite publier une nouvelle demande.

## Préconditions

* Le client est connecté.
* Les informations nécessaires à la description du besoin sont disponibles.

## Étapes principales

1. Créer un nouveau besoin.
2. Renseigner le contexte et l'objectif.
3. Décrire le périmètre et les livrables attendus.
4. Préciser les contraintes, le calendrier et le budget.
5. Ajouter les critères d'acceptation et les pièces utiles.
6. Enregistrer le besoin en brouillon.
7. Soumettre le besoin pour qualification.

## Décisions et contrôles

* Un besoin incomplet peut nécessiter des compléments.
* Les incohérences entre objectifs, budget, calendrier ou livrables doivent être signalées.
* Une modification substantielle après réception d'offres peut nécessiter une nouvelle version et une reconfirmation.

## Résultat

Le besoin est enregistré puis transmis à l'étape de qualification.

## Cas particuliers

* Informations insuffisantes.
* Contradictions dans la demande.
* Besoin modifié après publication.

## Règles métier

* Le besoin doit être suffisamment précis pour permettre le matching et la comparaison des offres.
* Les critères d'acceptation doivent être compréhensibles et vérifiables.

---

# 5.5 Workflow 03 — Qualification du besoin

## Objectif

Vérifier et améliorer la qualité du besoin avant sa publication.

## Acteurs

* Conseiller AIWORX ;
* Entreprise cliente ;
* Système / IA.

## Déclencheur

Un besoin est soumis à qualification.

## Préconditions

Le besoin existe et contient les informations principales.

## Étapes principales

1. Analyser le besoin.
2. Identifier les informations manquantes ou ambiguës.
3. Proposer des compléments ou reformulations.
4. Échanger avec le client si nécessaire.
5. Valider la version qualifiée.
6. Autoriser la publication lorsque les conditions sont remplies.

## Décisions et contrôles

* Besoin suffisamment clair : validation.
* Compléments nécessaires : retour au client.
* Incohérence importante : correction avant publication.

## Résultat

Le besoin est qualifié et prêt à être publié, ou renvoyé au client pour complément.

## Cas particuliers

* Client ne répond pas aux demandes de complément.
* Besoin trop vague ou incohérent.

## Règles métier

La qualification ne remplace pas la décision du client.

Les informations essentielles doivent être cohérentes avec le périmètre de la mission.

---

# 5.6 Workflow 04 — Matching

## Objectif

Identifier les prestataires correspondant au besoin selon les critères disponibles dans le système.

## Acteurs

* Système AIWORX ;
* Entreprise cliente ;
* Prestataires.

## Déclencheur

Un besoin qualifié est disponible pour le matching.

## Préconditions

* Le besoin est qualifié.
* Les profils prestataires nécessaires sont disponibles.

## Étapes principales

1. Analyser les caractéristiques du besoin.
2. Comparer avec les compétences et caractéristiques des prestataires.
3. Générer une sélection ou une liste de correspondances.
4. Présenter les résultats aux utilisateurs concernés.
5. Permettre la consultation des profils pertinents.

## Décisions et contrôles

* Correspondance suffisante : prestataire proposé.
* Correspondance insuffisante : élargissement ou ajustement possible.
* Profil non qualifié : il ne doit pas être retenu comme prestataire valide.

## Résultat

Une liste de prestataires pertinents est disponible.

## Cas particuliers

* Aucun prestataire suffisamment correspondant.
* Informations de profil insuffisantes.
* Qualification expirée.

## Règles métier

Le matching aide à la sélection mais ne constitue pas à lui seul la décision finale.

---

# 5.7 Workflow 05 — Création et soumission d'une offre

## Objectif

Permettre à un prestataire de répondre à un besoin avec une proposition structurée.

## Acteurs

* Prestataire ;
* Entreprise cliente ;
* Système AIWORX.

## Déclencheur

Le prestataire décide de répondre à un besoin.

## Préconditions

* Le prestataire est autorisé à proposer une offre.
* Le besoin est ouvert aux offres.

## Étapes principales

1. Consulter le besoin.
2. Préparer une proposition.
3. Indiquer le prix, le calendrier, les modalités et les éléments demandés.
4. Ajouter les informations ou pièces nécessaires.
5. Soumettre l'offre.
6. Le système enregistre l'offre et son statut.

## Décisions et contrôles

* Offre incomplète : soumission impossible ou demande de correction.
* Besoin fermé : nouvelle offre impossible.
* Offre déjà soumise : appliquer les règles de modification prévues.

## Résultat

L'offre est enregistrée et devient disponible pour l'étape de comparaison.

## Cas particuliers

* Offre hors délai.
* Données manquantes.
* Prestataire non qualifié.
* Prestataire suspendu.

## Règles métier

Une offre doit respecter les contraintes du besoin.

Le système conserve l'état et l'historique utiles à la comparaison.

---

# 5.8 Workflow 06 — Comparaison et négociation

## Objectif

Permettre au client de comparer les offres et, lorsque prévu, de négocier avec les prestataires.

## Acteurs

* Entreprise cliente ;
* Prestataires ;
* Conseiller AIWORX.

## Déclencheur

Plusieurs offres sont disponibles ou une négociation est engagée.

## Préconditions

* Les offres sont accessibles.
* Le besoin est toujours actif.

## Étapes principales

1. Consulter les offres.
2. Comparer les prix, délais, compréhension du besoin, expérience et autres critères.
3. Identifier les offres à approfondir.
4. Échanger avec les prestataires.
5. Enregistrer les modifications convenues.
6. Conserver la version retenue de chaque proposition.

## Décisions et contrôles

* Offre conforme : elle peut rester en compétition.
* Offre modifiée : une nouvelle version doit être identifiable.
* Modification importante du besoin : les prestataires concernés peuvent devoir reconfirmer leur offre.

## Résultat

Le client dispose d'offres comparables pour prendre une décision.

## Cas particuliers

* Désaccord sur les conditions.
* Offre retirée.
* Offre expirée.
* Modification du besoin en cours de négociation.

## Règles métier

Les conditions finales doivent être explicites avant la sélection.

---

# 5.9 Workflow 07 — Sélection du prestataire

## Objectif

Permettre au client de choisir le prestataire qui réalisera la mission.

## Acteurs

* Entreprise cliente ;
* Prestataire ;
* Système AIWORX.

## Déclencheur

Le client a terminé la comparaison des offres.

## Préconditions

* Au moins une offre est disponible.
* Le prestataire sélectionné est éligible.

## Étapes principales

1. Choisir une offre.
2. Confirmer la sélection.
3. Le système enregistre le prestataire retenu.
4. Informer les parties concernées.
5. Préparer la contractualisation.

## Décisions et contrôles

* Prestataire éligible : sélection possible.
* Prestataire non éligible : sélection bloquée ou soumise à résolution préalable.

## Résultat

Un prestataire est officiellement retenu pour la mission.

## Cas particuliers

* Sélection annulée.
* Prestataire indisponible.
* Offre devenue invalide.

## Règles métier

La sélection doit correspondre aux conditions finalement acceptées.

---

# 5.10 Workflow 08 — Contrat et signature

## Objectif

Formaliser l'accord entre les parties avant l'exécution de la mission.

## Acteurs

* Entreprise cliente ;
* Prestataire ;
* Système AIWORX.

## Déclencheur

Un prestataire a été sélectionné.

## Préconditions

* Les conditions de la mission sont définies.
* Les parties sont identifiées.

## Étapes principales

1. Préparer le contrat.
2. Vérifier les éléments contractuels.
3. Transmettre le contrat aux parties.
4. Chaque partie signe selon le processus prévu.
5. Enregistrer l'état des signatures.
6. Passer la mission à l'étape suivante lorsque les conditions sont remplies.

## Décisions et contrôles

* Signature complète : contrat effectif.
* Signature manquante : mission non finalisée.
* Modification contractuelle : nouvelle version du contrat.

## Résultat

Un contrat valide est disponible pour la mission.

## Cas particuliers

* Refus de signature.
* Divergence sur les conditions.
* Signature non finalisée.

## Règles métier

La mission ne doit pas être considérée comme pleinement engagée tant que les conditions requises ne sont pas remplies.

---

# 5.11 Workflow 09 — Financement

## Objectif

Permettre de mettre en place et de contrôler le financement nécessaire à la mission.

## Acteurs

* Entreprise cliente ;
* Administrateur financier ;
* Système AIWORX.

## Déclencheur

Le contrat est prêt et le financement doit être traité.

## Préconditions

* Les conditions financières sont connues.
* Le montant de la mission est défini.

## Étapes principales

1. Enregistrer les informations financières.
2. Vérifier le financement.
3. Valider la disponibilité ou le mécanisme prévu.
4. Associer le financement à la mission.
5. Autoriser le démarrage lorsque les préconditions financières sont satisfaites.

## Décisions et contrôles

* Financement validé : poursuite.
* Financement refusé ou incomplet : mission bloquée jusqu'à résolution.
* Écart financier : correction ou validation complémentaire.

## Résultat

Le financement est validé et associé à la mission, ou la mission reste bloquée.

## Cas particuliers

* Paiement ou financement refusé.
* Informations financières incomplètes.

## Règles métier

Les règles financières doivent être respectées avant le reversement final.

---

# 5.12 Workflow 10 — Démarrage et exécution de la mission

## Objectif

Permettre au prestataire de réaliser la mission conformément au contrat et au calendrier.

## Acteurs

* Prestataire ;
* Entreprise cliente ;
* Système AIWORX.

## Déclencheur

Le contrat et les préconditions de démarrage sont validés.

## Préconditions

* Contrat valide.
* Financement et autres préconditions satisfaits.

## Étapes principales

1. Démarrer la mission.
2. Suivre le planning.
3. Réaliser les travaux.
4. Préparer les livrables.
5. Soumettre les éléments attendus à chaque étape.
6. Mettre à jour l'avancement.

## Décisions et contrôles

* Retard : le statut et les parties concernées doivent être informés.
* Blocage : signalement et traitement.
* Livrable prêt : passage au contrôle ou à la validation prévue.

## Résultat

La mission progresse conformément aux jalons et livrables définis.

## Cas particuliers

* Retard.
* Abandon.
* Blocage opérationnel.
* Modification du périmètre.

## Règles métier

L'exécution doit rester alignée sur le contrat et les critères d'acceptation.

---

# 5.13 Workflow 11 — Gestion des jalons

## Objectif

Structurer l'exécution autour d'étapes et de livrables permettant de suivre la progression.

## Acteurs

* Prestataire ;
* Entreprise cliente ;
* Système AIWORX.

## Déclencheur

Un jalon arrive à son échéance ou un livrable doit être soumis.

## Préconditions

* Les jalons sont définis dans la mission.
* Les critères du jalon sont connus.

## Étapes principales

1. Atteindre le jalon.
2. Soumettre le livrable.
3. Enregistrer la date et l'état.
4. Contrôler le livrable.
5. Valider ou demander une correction.
6. Passer au jalon suivant lorsque les conditions sont remplies.

## Décisions et contrôles

* Jalon validé : progression.
* Jalon non conforme : correction.
* Jalon en retard : signalement et traitement.

## Résultat

Le jalon est validé ou placé dans un état nécessitant une action.

## Cas particuliers

* Retard.
* Livrable absent.
* Livrable non conforme.

## Règles métier

Les critères d'acceptation servent de référence à la validation.

---

# 5.14 Workflow 12 — Contrôle qualité

## Objectif

Vérifier la conformité des livrables par rapport aux exigences convenues.

## Acteurs

* Expert qualité AIWORX ;
* Prestataire ;
* Entreprise cliente.

## Déclencheur

Un livrable est soumis au contrôle.

## Préconditions

* Un livrable est disponible.
* Les critères d'acceptation sont définis.

## Étapes principales

1. Examiner le livrable.
2. Comparer avec les exigences.
3. Identifier les écarts.
4. Enregistrer le résultat du contrôle.
5. Valider ou demander une correction.
6. Transmettre le statut aux acteurs concernés.

## Décisions et contrôles

* Conforme : validation.
* Non conforme : correction demandée.
* Écart majeur : blocage de l'étape suivante jusqu'à résolution.

## Résultat

Le livrable est déclaré conforme ou renvoyé pour correction.

## Cas particuliers

* Non-conformité.
* Critères insuffisamment définis.
* Nouvelle version du livrable.

## Règles métier

Le contrôle doit être traçable et fondé sur les critères définis.

---

# 5.15 Workflow 13 — Correction des livrables

## Objectif

Permettre au prestataire de corriger un livrable non conforme et de le soumettre à nouveau.

## Acteurs

* Prestataire ;
* Expert qualité AIWORX ;
* Entreprise cliente.

## Déclencheur

Un contrôle qualité demande une correction.

## Préconditions

* Le livrable comporte des écarts identifiés.
* Les corrections attendues sont connues.

## Étapes principales

1. Consulter les remarques.
2. Corriger le livrable.
3. Soumettre une nouvelle version.
4. Recontrôler le livrable.
5. Valider ou demander une nouvelle correction.

## Décisions et contrôles

* Correction satisfaisante : validation.
* Correction insuffisante : nouveau cycle.
* Dépassement de délai : signalement.

## Résultat

Une version conforme est validée ou le problème reste ouvert.

## Cas particuliers

* Corrections répétées.
* Délai dépassé.
* Désaccord sur la conformité.

## Règles métier

Les versions doivent rester identifiables afin de conserver l'historique.

---

# 5.16 Workflow 14 — Validation finale

## Objectif

Clore la mission sur le plan fonctionnel après validation des livrables et des conditions prévues.

## Acteurs

* Entreprise cliente ;
* Expert qualité AIWORX ;
* Prestataire ;
* Système AIWORX.

## Déclencheur

Les derniers livrables sont conformes.

## Préconditions

* Les jalons requis sont traités.
* Les critères d'acceptation sont satisfaits.

## Étapes principales

1. Vérifier que les livrables attendus sont présents.
2. Confirmer la conformité.
3. Enregistrer la validation finale.
4. Clore la mission.
5. Déclencher les étapes financières finales.

## Décisions et contrôles

* Tout est conforme : clôture.
* Élément manquant : correction ou complément.
* Litige : traitement spécifique avant clôture.

## Résultat

La mission est validée et peut passer au reversement.

## Cas particuliers

* Litige.
* Dernier livrable non conforme.
* Validation non obtenue.

## Règles métier

La validation finale doit être traçable.

---

# 5.17 Workflow 15 — Reversement

## Objectif

Permettre le paiement des sommes dues au prestataire après satisfaction des conditions prévues.

## Acteurs

* Prestataire ;
* Administrateur financier ;
* Système AIWORX.

## Déclencheur

La validation finale est enregistrée et les conditions de reversement sont satisfaites.

## Préconditions

* Mission validée.
* Conditions financières satisfaites.
* Prestataire éligible au reversement.

## Étapes principales

1. Vérifier l'éligibilité au reversement.
2. Calculer le montant dû selon les règles applicables.
3. Enregistrer l'opération.
4. Soumettre le reversement au traitement.
5. Suivre le statut de l'opération.
6. Enregistrer le résultat.

## Décisions et contrôles

* Reversement éligible : traitement.
* Reversement non éligible : opération retenue.
* Échec du traitement : statut échoué et traitement prévu.

## Résultat

Le reversement est effectué ou placé dans un état nécessitant une intervention.

## Cas particuliers

* Reversement échoué.
* Informations financières incorrectes.
* Opération retournée.

## Règles métier

Le reversement ne doit être effectué que lorsque les conditions prévues sont satisfaites.

---

# 5.18 Workflow 16 — Évaluation de la prestation

## Objectif

Permettre au client d'évaluer la prestation et le prestataire après la réalisation de la mission.

## Acteurs

* Entreprise cliente ;
* Prestataire ;
* Système AIWORX.

## Déclencheur

La mission est terminée et les conditions permettant l'évaluation sont satisfaites.

## Préconditions

* La mission est clôturée.
* La prestation peut être évaluée.

## Étapes principales

1. Ouvrir le processus d'évaluation.
2. Permettre au client de fournir son évaluation.
3. Enregistrer l'évaluation.
4. Associer l'évaluation à la prestation et au prestataire selon les règles prévues.
5. Mettre à jour les informations de réputation ou de qualité lorsque les règles applicables le prévoient.

## Décisions et contrôles

* Évaluation valide : enregistrement.
* Évaluation incomplète : demander les informations nécessaires.
* Évaluation non disponible : conserver la mission sans évaluation.

## Résultat

L'évaluation de la prestation est enregistrée.

## Cas particuliers

* Évaluation non réalisée.
* Désaccord concernant l'évaluation.
* Données d'évaluation incomplètes.

## Règles métier

Les évaluations doivent respecter les règles de visibilité, de conservation et d'utilisation définies par AIWORX.

---

# 5.19 Relations entre les workflows

Les workflows sont liés entre eux.

Une étape terminée permet généralement de déclencher l'étape suivante lorsque toutes les conditions nécessaires sont satisfaites.

```text
Compte
  ↓
Besoin
  ↓
Qualification
  ↓
Matching
  ↓
Offres
  ↓
Comparaison / négociation
  ↓
Sélection
  ↓
Contrat / signature
  ↓
Financement
  ↓
Mission
  ↓
Jalons
  ↓
Livrables
  ↓
Contrôle qualité
  ↓
Corrections éventuelles
  ↓
Validation finale
  ↓
Reversement
  ↓
Évaluation
```

Certains workflows peuvent cependant provoquer un retour vers une étape précédente.

Exemple :

```text
Contrôle qualité
      ↓
Non-conformité
      ↓
Correction
      ↓
Nouveau contrôle
      ↓
Conforme
      ↓
Validation
```

De même, une modification importante du besoin peut entraîner une reconfirmation des offres.

---

# 5.20 Règles transversales

Les workflows doivent respecter les règles transversales suivantes :

* les actions importantes doivent être traçables ;
* les accès doivent dépendre du rôle ;
* les versions importantes doivent être conservées ;
* les documents doivent être protégés ;
* les opérations financières doivent être idempotentes ;
* les décisions importantes doivent être enregistrées ;
* les statuts doivent représenter l'état réel du processus ;
* les opérations bloquées doivent être identifiables ;
* les erreurs doivent être traitées sans créer de fausse confirmation ;
* les actions réalisées par les différents acteurs doivent respecter leurs permissions.

---

# 5.21 Résultat

Les 16 workflows constituent la représentation fonctionnelle du cycle de vie principal d'une prestation AIWORX.

Ils serviront de base pour :

* les règles métier ;
* les cas d'utilisation ;
* les API Backend ;
* les modèles de données ;
* les permissions ;
* les tests fonctionnels ;
* les scénarios de recette ;
* l'architecture technique.
