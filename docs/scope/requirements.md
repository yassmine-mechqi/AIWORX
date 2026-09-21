# AIWORX — Exigences

## 1. Objet

Ce document définit les exigences fonctionnelles et non fonctionnelles de la plateforme AIWORX.

Les exigences constituent la référence pour :

* l’architecture du système ;
* le développement du Backend ;
* la conception de la base de données ;
* la conception et le développement des API ;
* la mise en œuvre de la sécurité ;
* les tests ;
* le déploiement ;
* la validation du système.

---

# 2. Exigences fonctionnelles

## FR-001 — Inscription des utilisateurs

La plateforme doit permettre aux utilisateurs de créer un compte selon leur type d'utilisateur.

Le processus d'inscription doit collecter les informations nécessaires au type de compte sélectionné.

---

## FR-002 — Authentification

La plateforme doit fournir un mécanisme d'authentification sécurisé.

Le système doit prendre en charge :

* la connexion ;
* la déconnexion ;
* la gestion des sessions ;
* la gestion des erreurs d'authentification ;
* la gestion du statut du compte.

---

## FR-003 — Gestion des utilisateurs

Les utilisateurs autorisés doivent pouvoir gérer leurs informations.

La gestion des utilisateurs doit respecter les rôles et permissions définis.

---

## FR-004 — Gestion des organisations

La plateforme doit permettre la création et la gestion des organisations.

Une organisation peut contenir plusieurs utilisateurs possédant des rôles différents.

---

## FR-005 — Gestion des rôles et permissions

La plateforme doit implémenter un contrôle d'accès basé sur les rôles.

Chaque action protégée doit vérifier que l'utilisateur possède la permission nécessaire.

---

## FR-006 — Profils des prestataires

La plateforme doit permettre aux prestataires de créer et gérer leur profil professionnel.

Le profil prestataire doit pouvoir contenir notamment :

* les informations professionnelles ;
* les compétences ;
* les catégories ;
* l'expérience ;
* le portfolio ;
* les références ;
* les certifications ;
* les informations de vérification ;
* les informations relatives à la qualité.

---

## FR-007 — Qualification des prestataires

La plateforme doit fournir un processus de qualification des prestataires.

Le processus doit permettre de vérifier les informations et documents requis.

---

## FR-008 — Vérification des prestataires

La plateforme doit gérer le statut de vérification des informations des prestataires.

Le système doit pouvoir identifier les informations ou documents expirés ou invalides.

---

## FR-009 — Création d'un besoin

Un client autorisé doit pouvoir créer un besoin de prestation.

Un besoin doit pouvoir contenir notamment :

* le contexte ;
* les objectifs ;
* le périmètre ;
* les livrables ;
* les contraintes ;
* le budget ;
* le calendrier ;
* les critères d'acceptation ;
* les dépendances ;
* les exclusions ;
* les exigences de confidentialité.

---

## FR-010 — Qualification du besoin

La plateforme doit fournir un processus de qualification du besoin.

Le processus doit permettre d'identifier :

* les informations manquantes ;
* les informations ambiguës ;
* les informations incohérentes ;
* les informations nécessitant une clarification.

---

## FR-011 — Spécification du besoin

Un besoin qualifié doit pouvoir être transformé en une spécification structurée.

La spécification doit contenir les informations nécessaires au sourcing, au matching et à la sélection des prestataires.

---

## FR-012 — Versionnement du besoin

La plateforme doit conserver des versions identifiables des modifications importantes apportées à un besoin.

Les versions précédentes doivent rester traçables.

---

## FR-013 — Matching des prestataires

La plateforme doit pouvoir identifier les prestataires correspondant à un besoin.

Le matching peut prendre en compte notamment :

* les compétences ;
* les catégories ;
* les sous-catégories ;
* l'expérience ;
* le secteur d'activité ;
* la qualité ;
* la disponibilité ;
* l'éligibilité.

---

## FR-014 — Résultats du matching

La plateforme doit fournir les résultats du matching aux utilisateurs autorisés.

Lorsque cela est nécessaire, le système doit pouvoir identifier les critères ayant contribué au résultat du matching.

---

## FR-015 — Invitation des prestataires

Les utilisateurs autorisés doivent pouvoir inviter des prestataires éligibles à répondre à un besoin.

---

## FR-016 — Création d'une offre

Un prestataire éligible doit pouvoir créer une offre pour un besoin disponible.

---

## FR-017 — Soumission d'une offre

La plateforme doit vérifier les informations obligatoires avant qu'une offre puisse être soumise.

Une offre incomplète ne doit pas pouvoir être soumise lorsque des informations obligatoires sont manquantes.

---

## FR-018 — Versionnement des offres

La plateforme doit conserver des versions identifiables des offres lorsque leur modification est autorisée.

---

## FR-019 — Comparaison des offres

Le client doit pouvoir comparer les offres auxquelles il est autorisé à accéder.

La comparaison peut notamment prendre en compte :

* le prix ;
* le calendrier ;
* l'expérience ;
* la méthodologie ;
* les livrables ;
* les exclusions ;
* les risques ;
* les informations relatives à la qualité.

---

## FR-020 — Négociation

La plateforme doit permettre la négociation lorsqu'elle est autorisée par le workflow concerné.

Les modifications importantes doivent rester traçables.

---

## FR-021 — Sélection du prestataire

Le client doit pouvoir sélectionner un prestataire éligible.

La sélection doit être enregistrée dans la plateforme.

---

## FR-022 — Création du contrat

La plateforme doit permettre la préparation du contrat après la sélection du prestataire.

---

## FR-023 — Versionnement du contrat

La plateforme doit conserver des versions identifiables du contrat lorsque des modifications sont apportées.

---

## FR-024 — Signature électronique

La plateforme doit permettre la signature électronique au moyen d'un service externe de signature.

Le système doit suivre notamment :

* la demande de signature ;
* le statut de la signature ;
* le document signé ;
* les événements liés à la signature.

---

## FR-025 — Paiement

La plateforme doit prendre en charge les opérations de paiement nécessaires au processus métier d'AIWORX.

Chaque opération de paiement doit posséder un statut traçable.

---

## FR-026 — Transactions financières

La plateforme doit enregistrer les transactions financières associées aux opérations AIWORX.

Les opérations financières doivent rester traçables.

---

## FR-027 — Gestion des missions

La plateforme doit créer et gérer les missions résultant du processus de contractualisation.

Une mission doit pouvoir contenir :

* le client ;
* le prestataire ;
* le contrat ;
* les dates ;
* le montant ;
* le statut ;
* les jalons ;
* les livrables.

---

## FR-028 — Gestion des jalons

La plateforme doit permettre à une mission de contenir plusieurs jalons.

Un jalon peut contenir :

* un titre ;
* un objectif ;
* une date de début ;
* une date d'échéance ;
* un montant ;
* des critères d'acceptation ;
* un statut.

---

## FR-029 — Soumission des livrables

Le prestataire doit pouvoir soumettre les livrables associés à une mission ou à un jalon.

---

## FR-030 — Versionnement des livrables

La plateforme doit conserver des versions identifiables des livrables soumis.

---

## FR-031 — Contrôle qualité

La plateforme doit permettre le contrôle qualité des livrables soumis.

Le contrôle qualité doit utiliser les critères d'acceptation et les règles qualité applicables.

---

## FR-032 — Résultats du contrôle qualité

Les critères qualité doivent permettre de produire des résultats tels que :

* conforme ;
* non conforme ;
* non applicable.

Les résultats doivent rester traçables.

---

## FR-033 — Demande de correction

La plateforme doit permettre de retourner un livrable non conforme pour correction.

---

## FR-034 — Soumission corrigée

Le prestataire doit pouvoir soumettre une nouvelle version corrigée d'un livrable lorsqu'une correction est demandée.

---

## FR-035 — Validation par le client

Le client doit pouvoir valider ou rejeter un livrable conformément aux règles applicables.

---

## FR-036 — Validation finale

La plateforme doit permettre la validation finale d'une mission.

La validation finale ne doit être possible que lorsque les conditions nécessaires sont satisfaites.

---

## FR-037 — Paiement du prestataire

La plateforme doit permettre le paiement du prestataire lorsque les conditions de validation et les conditions financières applicables sont satisfaites.

Le statut du paiement doit être suivi.

---

## FR-038 — Messagerie

La plateforme doit fournir une messagerie interne aux utilisateurs autorisés.

La messagerie peut être associée notamment à :

* des besoins ;
* des offres ;
* des missions ;
* la qualité ;
* la finance ;
* des litiges.

---

## FR-039 — Anti-contournement

La plateforme doit appliquer les règles configurées concernant la détection et la gestion des coordonnées de contact direct interdites.

---

## FR-040 — Notifications

La plateforme doit générer des notifications pour les événements métier importants.

Les canaux pris en charge peuvent inclure :

* les notifications de la plateforme ;
* l'e-mail ;
* WhatsApp lorsque configuré.

---

## FR-041 — Gestion des fichiers

La plateforme doit permettre une gestion sécurisée des fichiers.

La gestion des fichiers doit prendre en charge :

* l'importation ;
* le téléchargement ;
* le contrôle d'accès ;
* la validation ;
* le versionnement ;
* l'accès sécurisé ;
* la conservation.

---

## FR-042 — Gestion des litiges

La plateforme doit permettre la gestion des litiges.

Un litige doit pouvoir prendre en charge :

* l'ouverture ;
* la collecte des preuves ;
* l'examen ;
* la médiation ;
* la décision ;
* la résolution ;
* la traçabilité.

---

## FR-043 — Pénalités

La plateforme doit permettre l'application de pénalités configurables lorsque les conditions métier applicables sont satisfaites.

---

## FR-044 — Évaluation

La plateforme doit permettre aux parties autorisées d'évaluer les prestations terminées.

Les évaluations peuvent contribuer à la qualité et à la réputation du prestataire conformément aux règles configurées.

---

## FR-045 — Assistance par IA

Les fonctionnalités d'IA peuvent assister notamment les processus suivants :

* qualification des besoins ;
* matching des prestataires ;
* analyse des offres ;
* analyse qualité ;
* recommandations.

Les résultats générés par l'IA doivent être soumis à une validation humaine lorsque le processus métier l'exige.

---

## FR-046 — Back-office

La plateforme doit fournir un Back-office destiné aux administrateurs AIWORX autorisés.

Le Back-office doit permettre notamment :

* la gestion des utilisateurs ;
* la gestion des organisations ;
* la vérification des prestataires ;
* le suivi des besoins ;
* le suivi des offres ;
* le suivi des missions ;
* le suivi qualité ;
* la gestion des litiges ;
* le suivi financier ;
* la configuration ;
* l'accès aux journaux d'audit.

---

## FR-047 — Journal d'audit

La plateforme doit conserver un journal d'audit pour les actions métier, administratives et de sécurité importantes.

Un événement d'audit doit contenir, lorsque cela est applicable :

* l'acteur ;
* l'action ;
* l'objet concerné ;
* la date et l'heure ;
* l'état précédent ;
* le nouvel état ;
* le motif.

---

# 3. Exigences non fonctionnelles

## NFR-001 — Sécurité

La plateforme doit protéger les données des utilisateurs, des organisations, des activités métier, des opérations financières et des documents.

---

## NFR-002 — Sécurité de l'authentification

Les mécanismes d'authentification doivent respecter les bonnes pratiques de sécurité.

Les informations d'authentification sensibles ne doivent pas être exposées.

---

## NFR-003 — Autorisation

Chaque ressource protégée doit vérifier les permissions de l'utilisateur authentifié.

---

## NFR-004 — Isolation des données des organisations

Les utilisateurs doivent uniquement accéder aux données des organisations pour lesquelles ils possèdent les autorisations nécessaires.

---

## NFR-005 — Protection des données

Les données sensibles doivent être protégées pendant leur transmission et leur stockage conformément aux exigences de sécurité applicables.

---

## NFR-006 — Sécurité des fichiers

Les fichiers importés doivent être soumis aux contrôles de sécurité nécessaires.

Les fichiers dangereux doivent être rejetés ou isolés conformément au processus de sécurité configuré.

---

## NFR-007 — Auditabilité

Les opérations métier et administratives importantes doivent pouvoir être auditées.

---

## NFR-008 — Performance

La plateforme doit fournir des temps de réponse acceptables pour les opérations normales.

Les objectifs de performance précis seront définis lors de la conception technique.

---

## NFR-009 — Scalabilité

L'architecture doit permettre une croissance progressive du nombre :

* d'utilisateurs ;
* d'organisations ;
* de prestataires ;
* de besoins ;
* d'offres ;
* de missions ;
* de fichiers ;
* de transactions.

---

## NFR-010 — Disponibilité

La plateforme doit être conçue pour rester disponible dans des conditions normales d'exploitation.

---

## NFR-011 — Fiabilité

Les opérations critiques doivent empêcher la création d'états métier incohérents.

---

## NFR-012 — Idempotence

Les opérations financières et les opérations externes critiques doivent prendre en charge l'idempotence lorsque cela est nécessaire.

---

## NFR-013 — Gestion des erreurs

Les erreurs doivent être gérées explicitement.

Une opération échouée ne doit jamais être considérée comme réussie.

---

## NFR-014 — Défaillance des services externes

Une défaillance d'un service externe doit produire un état contrôlé tel que :

* en attente ;
* échoué ;
* nouvelle tentative nécessaire.

---

## NFR-015 — Cohérence des données

Les entités métier liées doivent rester cohérentes pendant tout leur cycle de vie.

---

## NFR-016 — Concurrence

La plateforme doit empêcher l'écrasement involontaire de modifications effectuées simultanément.

---

## NFR-017 — Versionnement

Les objets métier importants doivent prendre en charge le versionnement lorsque cela est nécessaire.

Cela concerne notamment :

* les besoins ;
* les offres ;
* les contrats ;
* les livrables ;
* les informations qualité.

---

## NFR-018 — Traçabilité

Les opérations métier importantes doivent être traçables depuis leur origine jusqu'à leur résultat final.

---

## NFR-019 — Maintenabilité

Le Backend doit être organisé en modules clairement définis avec des responsabilités distinctes.

---

## NFR-020 — Modularité

L'architecture doit séparer les principaux domaines métier.

Ces domaines comprennent notamment :

* Identity ;
* Marketplace ;
* Contract ;
* Delivery ;
* Trust ;
* Finance ;
* Platform.

---

## NFR-021 — Testabilité

Le système doit permettre la réalisation de :

* tests unitaires ;
* tests d'intégration ;
* tests API ;
* tests des workflows ;
* tests end-to-end.

---

## NFR-022 — Documentation

Les règles métier, les API, les décisions techniques et les configurations importantes doivent être documentées.

---

## NFR-023 — Observabilité

La plateforme doit fournir suffisamment de journaux et d'informations de supervision pour identifier les problèmes techniques importants.

---

## NFR-024 — Journalisation

Les journaux doivent contenir suffisamment d'informations pour faciliter le diagnostic sans exposer inutilement les données sensibles.

---

## NFR-025 — Conservation des données

Les données et documents doivent être conservés conformément aux règles de conservation applicables.

Les durées qui ne sont pas encore définies doivent rester configurables.

---

## NFR-026 — Confidentialité

Les données personnelles doivent être traitées conformément aux exigences applicables en matière de protection des données.

---

## NFR-027 — Configuration

Les paramètres susceptibles d'évoluer doivent être configurables plutôt que codés en dur lorsque cela est approprié.

Cela peut notamment concerner :

* les délais ;
* les quotas ;
* les commissions ;
* les pénalités ;
* les seuils ;
* les règles qualité ;
* les modèles de notifications ;
* les limites de fichiers ;
* les durées de conservation.

---

## NFR-028 — Sécurité du Back-office

Les opérations sensibles du Back-office doivent nécessiter les permissions appropriées.

---

## NFR-029 — Intégrations externes

Les services externes doivent être isolés de la logique métier principale lorsque cela est raisonnablement possible.

Le système doit suivre le statut des opérations externes.

---

## NFR-030 — Sauvegarde et récupération

Les données critiques doivent être protégées contre la perte de données grâce à des mécanismes appropriés de sauvegarde et de récupération.

---

# 4. Exigences liées aux règles métier

Le système doit implémenter les règles métier définies dans :

`01-scope/06-business-rules.md`

Ces règles couvrent notamment :

* les utilisateurs ;
* les organisations ;
* les prestataires ;
* les besoins ;
* le matching ;
* les offres ;
* les contrats ;
* les paiements ;
* les missions ;
* les jalons ;
* les livrables ;
* la qualité ;
* les litiges ;
* les paiements aux prestataires ;
* les évaluations ;
* les notifications ;
* la sécurité ;
* l'audit.

---

# 5. Exigences liées aux workflows

Le système doit prendre en charge les workflows définis dans :

`01-scope/05-workflows.md`

Les principaux domaines de workflow sont :

1. Inscription et création de compte
2. Création du besoin
3. Qualification du besoin
4. Matching des prestataires
5. Création et soumission des offres
6. Comparaison et négociation des offres
7. Sélection du prestataire
8. Contrat et signature
9. Financement
10. Exécution de la mission
11. Gestion des jalons
12. Contrôle qualité
13. Correction des livrables
14. Validation finale
15. Paiement du prestataire
16. Évaluation

---

# 6. Exigences relatives aux statuts

Les principaux objets métier doivent posséder des statuts explicites.

Le système doit prendre en charge des statuts tels que :

* brouillon ;
* en attente ;
* soumis ;
* en cours d'examen ;
* informations supplémentaires requises ;
* qualifié ;
* publié ;
* sélectionné ;
* contractualisation ;
* signé ;
* paiement en attente ;
* paiement validé ;
* en cours ;
* soumis pour validation ;
* correction requise ;
* validé ;
* paiement prestataire en attente ;
* paiement prestataire effectué ;
* bloqué ;
* suspendu ;
* annulé ;
* archivé.

Chaque transition de statut doit être contrôlée par les règles métier applicables.

---

# 7. Exigences relatives aux erreurs et cas particuliers

Le système doit gérer correctement les situations exceptionnelles.

## ERR-001 — Paiement en double

Une demande de paiement dupliquée ne doit pas créer plusieurs transactions financières.

---

## ERR-002 — Webhook en double

La réception répétée d'une même notification externe ne doit pas créer plusieurs opérations métier.

---

## ERR-003 — Signature expirée

Une demande de signature expirée ne doit pas être considérée comme correctement signée.

---

## ERR-004 — Document prestataire expiré

Un document critique expiré doit affecter l'éligibilité du prestataire conformément à la règle métier applicable.

---

## ERR-005 — Fichier dangereux

Un fichier identifié comme dangereux doit être rejeté ou isolé.

---

## ERR-006 — Suppression d'un membre d'organisation

La suppression d'un utilisateur d'une organisation doit révoquer les accès applicables tout en conservant les données historiques nécessaires.

---

## ERR-007 — Prestataire suspendu

Un prestataire suspendu ne doit pas pouvoir effectuer les nouvelles opérations qui lui sont interdites.

---

## ERR-008 — Défaillance d'un service externe

Une défaillance d'un service externe doit produire un état contrôlé tel qu'un état en attente ou en échec.

---

## ERR-009 — Modification concurrente

Une modification concurrente ne doit pas écraser silencieusement une version plus récente du même objet métier.

---

# 8. Critères d'acceptation

La plateforme doit être validée au moyen de scénarios fonctionnels et end-to-end.

## AC-001 — Projet standard

La plateforme doit prendre en charge :

Inscription → Besoin → Matching → Offres → Sélection → Contrat → Paiement → Mission → Livraison → Validation → Paiement du prestataire.

---

## AC-002 — Modification du besoin

La plateforme doit prendre en charge :

Offres reçues → Modification du besoin → Reconfirmation → Mise à jour de la sélection.

---

## AC-003 — Non-conformité

La plateforme doit prendre en charge :

Soumission → Rejet qualité → Correction → Nouvelle soumission → Validation.

---

## AC-004 — Absence de réponse du client

La plateforme doit prendre en charge :

Demande de validation → Période d'attente → Relance → Action suivante configurée.

---

## AC-005 — Retard

La plateforme doit prendre en charge :

Échéance dépassée → Avertissement → Justification ou pénalité → Mise à jour de la qualité.

---

## AC-006 — Abandon

La plateforme doit prendre en charge :

Suspension → Processus de remplacement → Recherche d'un nouveau prestataire → Continuité ou alternative de la mission.

---

## AC-007 — Litige

La plateforme doit prendre en charge :

Ouverture du litige → Collecte des preuves → Examen → Décision → Résolution.

---

## AC-008 — Échec du paiement

La plateforme doit prendre en charge :

Échec du paiement → État en attente/bloqué → Nouvelle tentative → Paiement réussi.

---

## AC-009 — Sécurité

La plateforme doit prendre en charge :

Tentative d'accès non autorisée → Accès refusé → Événement d'audit.

---

## AC-010 — Anti-contournement

La plateforme doit prendre en charge :

Détection de coordonnées interdites → Application du traitement configuré → Traçabilité dans l'audit.

---

# 9. Traçabilité des exigences

Chaque exigence majeure doit pouvoir être reliée à son implémentation technique.

La chaîne de traçabilité doit être :

```text
Exigences
    ↓
Règles métier
    ↓
Workflows
    ↓
Modules métier
    ↓
Entités de base de données
    ↓
Endpoints API
    ↓
Services Backend
    ↓
Tests
```

Une exigence ne doit pas être considérée comme complètement implémentée tant que son implémentation et ses tests correspondants n'ont pas été identifiés.

---

# 10. Exigences restant à valider

Les éléments suivants nécessitent une confirmation avant leur implémentation définitive :

* les champs obligatoires exacts pour chaque type de compte ;
* les documents exacts nécessaires à la qualification des prestataires ;
* les critères exacts du matching ;
* les pondérations exactes du matching ;
* le prestataire de paiement exact ;
* le prestataire de signature électronique exact ;
* les règles exactes de commission ;
* les règles exactes de paiement aux prestataires ;
* les règles exactes de pénalité ;
* les niveaux exacts de litige ;
* la visibilité exacte des évaluations ;
* les durées exactes de conservation ;
* les objectifs exacts de performance ;
* les objectifs exacts de disponibilité.

Ces valeurs ne doivent pas être inventées.

Elles doivent être confirmées puis implémentées comme paramètres de configuration ou comme exigences techniques.

---

# 11. Priorité des exigences

## P0 — Cœur de la plateforme

Exigences nécessaires au fonctionnement principal d'AIWORX.

Elles comprennent notamment :

* authentification ;
* utilisateurs ;
* organisations ;
* rôles et permissions ;
* prestataires ;
* besoins ;
* matching ;
* offres ;
* sélection ;
* contrats ;
* paiements ;
* missions ;
* livrables ;
* qualité ;
* audit ;
* sécurité.

---

## P1 — Lancement

Exigences importantes nécessaires au lancement prévu de la plateforme.

Elles comprennent notamment :

* matching avancé ;
* qualification assistée par IA ;
* comparaison des offres ;
* notifications ;
* litiges ;
* pénalités ;
* tableaux de bord ;
* contrôles qualité avancés.

---

## P2 — Évolutions futures

Fonctionnalités supplémentaires pouvant être développées après la mise en fonctionnement du cœur de la plateforme.

Elles peuvent notamment comprendre :

* analyse avancée par IA ;
* analyses avancées ;
* automatisations supplémentaires ;
* fonctionnalités d'optimisation.

---

# 12. Référence finale des exigences

Ce document constitue la référence actuelle des exigences d'AIWORX.

Il constitue le lien entre l'analyse fonctionnelle et l'implémentation technique.

Les phases suivantes du projet doivent utiliser ce document comme entrée pour :

1. la conception de l'architecture ;
2. la définition des modules métier ;
3. la définition des flux de données ;
4. la conception de la base de données ;
5. la conception des API ;
6. le développement du Backend ;
7. les tests.

Toute nouvelle exigence ou modification importante doit être documentée avant d'être intégrée à l'implémentation.
