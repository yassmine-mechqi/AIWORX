# AIWORX — Questions ouvertes

## 1. Objet

Ce document regroupe les questions fonctionnelles, métier, techniques, juridiques et opérationnelles qui ne sont pas encore complètement définies dans les spécifications actuelles d'AIWORX.

Ces questions doivent être clarifiées avant qu'une décision correspondante soit considérée comme définitive.

Une question ouverte ne doit pas être transformée en décision d'implémentation sans validation.

---

# 2. Questions métier

## Q-001 — Catégories de prestataires

Quelle est la liste définitive des catégories et sous-catégories de services proposées par AIWORX ?

La liste doit être définie avant la mise en place définitive du catalogue et des règles de matching.

**Statut :** À valider

---

## Q-002 — Critères d'éligibilité

Quels sont les critères exacts permettant de considérer un prestataire comme éligible à une opportunité ?

**Statut :** À valider

---

## Q-003 — Vérification des prestataires

Quels documents et informations doivent obligatoirement être vérifiés pour chaque catégorie de prestataire ?

**Statut :** À valider

---

## Q-004 — Tests de compétences

Quelles catégories nécessitent un test de compétences et quelles sont les règles de validation associées ?

**Statut :** À valider

---

## Q-005 — Fréquence de renouvellement

À quelle fréquence les documents et informations des prestataires doivent-ils être renouvelés ou actualisés ?

**Statut :** À valider

---

# 3. Questions relatives au matching

## Q-006 — Critères du matching

Quels critères exacts doivent être utilisés par le moteur de matching ?

Les critères envisagés comprennent notamment :

* compétences ;
* expérience ;
* secteur d'activité ;
* score qualité ;
* respect des délais ;
* disponibilité ;
* éligibilité.

**Statut :** À valider

---

## Q-007 — Pondération du matching

Quelle pondération doit être appliquée à chaque critère du matching ?

**Statut :** À valider

---

## Q-008 — Seuil de correspondance

Quel score minimal doit être atteint pour qu'un prestataire soit considéré comme correspondant à un besoin ?

**Statut :** À valider

---

## Q-009 — Validation des recommandations IA

Quelle validation humaine est obligatoire avant qu'une recommandation générée par l'IA soit présentée ou utilisée dans le processus de sélection ?

Le cahier des charges prévoit une validation humaine et aucune attribution entièrement automatisée en V1.

**Statut :** À valider

---

# 4. Questions relatives aux offres

## Q-010 — Durée de validité des offres

Quelle durée de validité par défaut doit être appliquée aux offres des prestataires ?

**Statut :** À valider

---

## Q-011 — Règles de modification

Dans quelles étapes du workflow un prestataire peut-il modifier une offre déjà soumise ?

**Statut :** À valider

---

## Q-012 — Négociation

Quelles sont les limites exactes de la négociation et quelles modifications doivent nécessiter une nouvelle validation du client ?

**Statut :** À valider

---

# 5. Questions relatives aux contrats

## Q-013 — Modèle contractuel

Quel modèle contractuel définitif doit être utilisé pour les missions AIWORX ?

**Statut :** À valider juridiquement

---

## Q-014 — Propriété intellectuelle

Quelles règles exactes de propriété intellectuelle doivent être appliquées aux livrables ?

**Statut :** À valider juridiquement

---

## Q-015 — Ordre de signature

Quel ordre de signature doit être appliqué par défaut entre :

* client ;
* prestataire ;
* AIWORX ?

Le cahier des charges indique que l'ordre doit être configurable.

**Statut :** À valider

---

# 6. Questions relatives aux paiements

## Q-016 — Prestataire de paiement

Quel prestataire de paiement externe sera utilisé par AIWORX ?

Le choix définitif doit être validé avant l'implémentation de l'intégration.

**Statut :** À valider

---

## Q-017 — Mode d'encaissement

Quel mécanisme juridique et technique sera utilisé pour l'encaissement, la conservation temporaire éventuelle et le reversement des fonds ?

Le cahier des charges précise que ces choix doivent être validés avec un conseil juridique et un prestataire de paiement habilité avant la mise en production.

**Statut :** À valider juridiquement

---

## Q-018 — Devises

Quelles devises seront supportées par AIWORX en V1 ?

**Statut :** À valider

---

## Q-019 — Taxes

Comment les taxes applicables doivent-elles être calculées et affichées ?

**Statut :** À valider juridiquement et financièrement

---

## Q-020 — Frais client

Le cahier des charges indique des frais client de 4 %.

La règle définitive de calcul, d'affichage et de facturation doit-elle être confirmée ?

**Statut :** À confirmer

---

## Q-021 — Commission prestataire

Le cahier des charges indique une commission prestataire de 15 % calculée selon la base définie au contrat.

Quelle est exactement cette base de calcul ?

**Statut :** À confirmer

---

## Q-022 — Reversements intermédiaires

Dans quelles conditions AIWORX peut-elle autoriser des reversements avant la validation finale du projet ?

Le cahier des charges prévoit une possibilité d'exception contractuelle.

**Statut :** À valider

---

# 7. Questions relatives à la signature électronique

## Q-023 — Prestataire de signature

Quel service externe de signature électronique sera utilisé ?

**Statut :** À valider

---

## Q-024 — Validité juridique

Quelles exigences juridiques spécifiques doivent être respectées pour les signatures électroniques utilisées au Maroc ?

**Statut :** À valider juridiquement

---

## Q-025 — Conservation des documents signés

Quelle durée de conservation doit être appliquée aux contrats et documents signés ?

**Statut :** À valider juridiquement

---

# 8. Questions relatives à la qualité

## Q-026 — Grilles de contrôle

Quelles grilles de contrôle qualité doivent être utilisées pour chaque catégorie de service ?

**Statut :** À valider

---

## Q-027 — Seuil de conformité

Quel seuil ou ensemble de critères permet de déclarer un livrable conforme ?

**Statut :** À valider

---

## Q-028 — Nombre de corrections

Combien de cycles de correction peuvent être effectués avant l'application d'une pénalité, d'un litige ou d'une autre procédure ?

**Statut :** À valider

---

## Q-029 — Expert qualité

Quelles qualifications sont nécessaires pour qu'une personne puisse exercer le rôle d'expert qualité AIWORX ?

**Statut :** À valider

---

# 9. Questions relatives aux pénalités

## Q-030 — Calcul des pénalités

Comment les pénalités doivent-elles être calculées ?

**Statut :** À valider

---

## Q-031 — Plafond des pénalités

Existe-t-il un plafond maximal applicable aux pénalités ?

**Statut :** À valider juridiquement et contractuellement

---

## Q-032 — Cas d'exonération

Dans quelles situations un retard peut-il être considéré comme justifié et ne pas entraîner de pénalité ?

**Statut :** À valider

---

# 10. Questions relatives aux litiges

## Q-033 — Délais de réclamation

Quel délai dispose chaque partie pour ouvrir une réclamation ou un litige ?

**Statut :** À valider

---

## Q-034 — Médiation

Quelles sont les règles exactes de médiation appliquées par AIWORX ?

**Statut :** À valider

---

## Q-035 — Autorité de décision

Qui possède l'autorité finale pour prendre une décision dans un litige ?

**Statut :** À valider juridiquement et opérationnellement

---

# 11. Questions relatives aux évaluations et à la réputation

## Q-036 — Formule du score qualité

Quelles dimensions exactes sont utilisées pour calculer le score qualité AIWORX ?

Le cahier des charges indique que les dimensions doivent être compréhensibles même si la formule interne peut rester confidentielle.

**Statut :** À valider

---

## Q-037 — Score minimal

Existe-t-il un score minimal entraînant une restriction ou une suspension du prestataire ?

**Statut :** À valider

---

## Q-038 — Badges

Quels sont les critères exacts d'attribution des badges tels que :

* Vérifié ;
* Expert ;
* autres niveaux éventuels ?

**Statut :** À valider

---

# 12. Questions relatives à l'intelligence artificielle

## Q-039 — Fournisseur IA

Quel fournisseur ou modèle d'intelligence artificielle sera utilisé par AIWORX ?

**Statut :** À valider

---

## Q-040 — Données envoyées au service IA

Quelles données peuvent être envoyées à un service d'IA externe ?

**Statut :** À valider juridiquement et techniquement

---

## Q-041 — Conservation des données IA

Les données transmises au service d'IA externe sont-elles conservées par le fournisseur ?

Si oui, pendant combien de temps et dans quelles conditions ?

**Statut :** À valider

---

## Q-042 — Explicabilité

Quel niveau d'explication doit être fourni pour les résultats du matching et les recommandations IA ?

**Statut :** À valider

---

# 13. Questions relatives aux notifications

## Q-043 — Fournisseur e-mail

Quel fournisseur de messagerie transactionnelle sera utilisé ?

**Statut :** À valider

---

## Q-044 — WhatsApp

Le canal WhatsApp sera-t-il disponible dès la V1 ou dans une version ultérieure ?

**Statut :** À valider

---

## Q-045 — Préférences utilisateur

Quels types de notifications chaque utilisateur pourra-t-il activer ou désactiver ?

**Statut :** À valider

---

# 14. Questions relatives à la protection des données

## Q-046 — Responsable du traitement

Quelle entité juridique sera responsable des traitements de données personnelles effectués par AIWORX ?

**Statut :** À valider juridiquement

---

## Q-047 — Base légale

Quelle base légale doit être appliquée à chaque catégorie de traitement ?

**Statut :** À valider juridiquement

---

## Q-048 — Durées de conservation

Quelles sont les durées de conservation applicables à :

* comptes utilisateurs ;
* documents d'identité ;
* documents professionnels ;
* contrats ;
* factures ;
* paiements ;
* conversations ;
* fichiers ;
* livrables ;
* évaluations ;
* litiges ;
* journaux d'audit ?

**Statut :** À valider juridiquement

---

## Q-049 — Hébergement des données

Où les données seront-elles hébergées ?

Le choix d'un hébergement ou d'un transfert hors Maroc doit être identifié et validé avant activation lorsque les obligations applicables l'exigent.

**Statut :** À valider

---

# 15. Questions relatives à la sécurité

## Q-050 — Authentification à deux facteurs

L'authentification à deux facteurs sera-t-elle obligatoire pour tous les utilisateurs ou uniquement pour certains rôles ?

**Statut :** À valider

---

## Q-051 — Durée des sessions

Quelle durée maximale doit être appliquée aux sessions utilisateur ?

**Statut :** À valider

---

## Q-052 — Limitation des tentatives

Quelles limites doivent être appliquées aux tentatives de connexion et aux actions sensibles ?

**Statut :** À valider

---

# 16. Questions relatives aux performances

## Q-053 — Temps de réponse

Quels sont les objectifs précis de temps de réponse pour les principales opérations de la plateforme ?

**Statut :** À valider

---

## Q-054 — Nombre d'utilisateurs

Quel nombre d'utilisateurs simultanés doit être supporté pour la V1 ?

**Statut :** À valider

---

## Q-055 — Volume de données

Quels volumes initiaux et futurs doivent être prévus pour :

* utilisateurs ;
* prestataires ;
* besoins ;
* offres ;
* missions ;
* fichiers ;
* transactions ;
* messages ?

**Statut :** À valider

---

# 17. Questions relatives à l'architecture

## Q-056 — Architecture Backend

Le choix définitif de l'architecture Backend doit-il rester un monolithe modulaire pour la V1 ?

Le cahier des charges recommande cette approche comme architecture logique de départ.

**Statut :** À confirmer

---

## Q-057 — Services externes

Quels services externes doivent être intégrés dès la V1 ?

La liste minimale doit être confirmée pour :

* paiement ;
* signature électronique ;
* e-mail ;
* WhatsApp ;
* IA ;
* stockage de fichiers.

**Statut :** À valider

---

# 18. Questions relatives à la plateforme

## Q-058 — Application mobile native

Le cahier des charges indique qu'aucune application mobile native n'est prévue dans la V1.

Cette décision doit-elle rester inchangée ?

**Statut :** À confirmer

---

## Q-059 — Responsive web

Le responsive web doit-il couvrir officiellement :

* smartphone ;
* tablette ;
* desktop ?

**Statut :** À confirmer

---

# 19. Questions relatives au Back-office

## Q-060 — Rôles administratifs

La liste définitive des rôles administratifs doit-elle être :

* administrateur plateforme ;
* conseiller AIWORX ;
* expert qualité ;
* administrateur financier ;
* autres rôles ?

**Statut :** À valider

---

## Q-061 — Permissions administratives

Quelles permissions exactes chaque rôle administratif doit-il posséder ?

**Statut :** À valider

---

# 20. Questions relatives aux fichiers

## Q-062 — Taille maximale

Quelle taille maximale doit être autorisée pour chaque type de fichier ?

**Statut :** À valider

---

## Q-063 — Formats autorisés

Quels formats de fichiers doivent être acceptés en V1 ?

**Statut :** À valider

---

## Q-064 — Stockage

Quel fournisseur ou mécanisme de stockage de fichiers sera utilisé ?

**Statut :** À valider

---

# 21. Questions relatives à la conservation et à l'archivage

## Q-065 — Archivage

Quand un objet métier doit-il passer de l'état actif à l'état archivé ?

**Statut :** À valider

---

## Q-066 — Suppression

Quelles données peuvent être supprimées définitivement et quelles données doivent obligatoirement être conservées pour des raisons légales, contractuelles ou d'audit ?

**Statut :** À valider juridiquement

---

# 22. Questions relatives au déploiement

## Q-067 — Hébergement

Quel fournisseur d'infrastructure sera utilisé pour le déploiement de la plateforme ?

**Statut :** À valider

---

## Q-068 — Environnements

Quels environnements seront disponibles ?

Minimum envisagé :

* développement ;
* test / préproduction ;
* production.

**Statut :** À confirmer

---

## Q-069 — Sauvegardes

Quelle politique exacte de sauvegarde doit être appliquée ?

Elle doit définir notamment :

* fréquence ;
* durée de conservation ;
* emplacement ;
* chiffrement ;
* procédure de restauration.

**Statut :** À valider

---

# 23. Questions relatives au développement

## Q-070 — Stratégie Git

Quelle stratégie de branches sera utilisée pour le projet AIWORX ?

**Statut :** À valider

---

## Q-071 — Revue de code

Quelles règles de revue de code doivent être appliquées avant fusion d'une branche ?

**Statut :** À valider

---

## Q-072 — Couverture de tests

Quel niveau minimal de couverture de tests doit être atteint pour la V1 ?

**Statut :** À valider

---

# 24. Règle de gestion des questions ouvertes

Une question ouverte doit suivre le cycle suivant :

```text
Question identifiée
        ↓
Analyse
        ↓
Discussion avec le responsable du projet
        ↓
Validation
        ↓
Décision documentée
        ↓
Mise à jour des exigences
        ↓
Implémentation
```

Aucune question ouverte ne doit être transformée en décision technique définitive sans validation lorsqu'elle affecte le périmètre, le métier, la sécurité, les données, les paiements ou les obligations juridiques.

---

# 25. Statuts des questions

Chaque question doit utiliser l'un des statuts suivants :

* **À valider** — aucune décision définitive n'a encore été prise.
* **À confirmer** — une orientation existe mais doit être confirmée.
* **En discussion** — le sujet est actuellement discuté.
* **Validée** — une décision définitive a été approuvée.
* **Décision documentée** — la décision a été enregistrée dans la documentation appropriée.
* **Obsolète** — la question ne s'applique plus.

---

# 26. Référence finale

Ce document constitue la liste de référence des points encore ouverts dans l'analyse AIWORX.

Lorsqu'une question est résolue, la décision correspondante doit être reportée dans le document approprié :

* `06-business-rules.md` pour une règle métier ;
* `07-requirements.md` pour une exigence ;
* `08-constraints.md` pour une contrainte ;
* `02-architecture/08-technical-decisions.md` pour une décision technique ;
* `03-database/` pour une décision relative au modèle de données.

La résolution d'une question ouverte doit donc entraîner la mise à jour des documents concernés afin de maintenir la cohérence globale de la documentation AIWORX.
