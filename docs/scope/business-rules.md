# 6. Règles métier

## 6.1 Présentation

Les règles métier définissent les conditions que la plateforme AIWORX doit respecter pendant l'exécution des différents workflows.

Elles permettent de garantir :

* la cohérence des données ;
* le respect des rôles ;
* la sécurité ;
* la traçabilité ;
* la cohérence des statuts ;
* la protection des informations ;
* la bonne exécution du processus métier ;
* la cohérence des opérations financières.

Les règles sont organisées par domaine fonctionnel.

---

# 6.2 Règles relatives aux comptes

### BR-001 — Identification de l'utilisateur

Chaque utilisateur doit disposer d'un compte permettant d'identifier son accès à la plateforme.

### BR-002 — Rôle de l'utilisateur

Les actions disponibles dépendent du rôle de l'utilisateur.

### BR-003 — Permissions

Un utilisateur ne peut effectuer qu'une action pour laquelle il dispose des permissions nécessaires.

### BR-004 — Statut du compte

Les actions disponibles doivent respecter le statut du compte.

Un compte suspendu ne doit pas pouvoir effectuer les opérations interdites par son statut.

---

# 6.3 Règles relatives aux organisations

### BR-005 — Appartenance à une organisation

Un utilisateur peut être associé à une organisation selon les règles définies par AIWORX.

### BR-006 — Accès aux données de l'organisation

L'accès aux informations d'une organisation dépend des permissions de l'utilisateur.

### BR-007 — Rôles organisationnels

Les rôles associés à une organisation déterminent les actions que l'utilisateur peut effectuer dans son contexte.

---

# 6.4 Règles relatives aux prestataires

### BR-008 — Qualification obligatoire

Un prestataire doit passer par le processus de qualification prévu avant d'être présenté comme prestataire validé.

### BR-009 — Informations obligatoires

Les informations et documents nécessaires à la qualification doivent être fournis avant la validation.

### BR-010 — Vérification

Le prestataire peut être soumis à :

* vérification d'identité ;
* vérification légale ;
* vérification professionnelle ;
* vérification du portfolio ;
* vérification des références ;
* tests de compétences.

### BR-011 — Statut du prestataire

Le statut du prestataire doit déterminer les actions qu'il peut effectuer.

### BR-012 — Suspension

Un prestataire suspendu ne doit pas pouvoir effectuer les opérations interdites pendant sa suspension.

### BR-013 — Documents expirés

Les documents soumis à expiration doivent pouvoir être contrôlés et leur expiration doit pouvoir affecter l'éligibilité du prestataire.

---

# 6.5 Règles relatives aux besoins

### BR-014 — Création du besoin

Une entreprise cliente peut créer un besoin lorsqu'elle dispose des droits nécessaires.

### BR-015 — Informations du besoin

Le besoin doit contenir les informations nécessaires à sa qualification et à son traitement.

### BR-016 — Qualification

Un besoin doit être qualifié avant de passer aux étapes qui nécessitent une spécification exploitable.

### BR-017 — Informations manquantes

Lorsqu'une information nécessaire manque, le système ou le conseiller peut demander un complément.

### BR-018 — Version du besoin

Les modifications importantes doivent pouvoir être distinguées des versions précédentes.

### BR-019 — Besoin contractuel

Une version validée du besoin peut devenir une référence contractuelle.

---

# 6.6 Règles relatives à la confidentialité

### BR-020 — Protection des informations

Les informations sensibles doivent être accessibles uniquement aux acteurs autorisés.

### BR-021 — Masquage

Avant l'étape autorisée, certaines informations permettant d'identifier directement les parties peuvent être masquées.

### BR-022 — Coordonnées du prestataire

Les coordonnées directes du prestataire ne doivent pas être accessibles avant l'étape autorisée.

### BR-023 — Offres concurrentes

Un prestataire ne doit pas accéder aux informations confidentielles des offres de ses concurrents.

### BR-024 — Documents confidentiels

Les documents soumis à confidentialité doivent être accessibles uniquement aux utilisateurs autorisés.

---

# 6.7 Règles relatives au matching

### BR-025 — Éligibilité au matching

Un prestataire ne peut être considéré comme candidat valide que s'il satisfait aux conditions d'éligibilité applicables.

### BR-026 — Critères de matching

Le matching peut prendre en compte notamment :

* compétences ;
* catégorie ;
* sous-catégorie ;
* expérience ;
* secteur ;
* qualité ;
* disponibilité ;
* autres critères configurés.

### BR-027 — Résultat du matching

Le résultat du matching doit pouvoir être expliqué par les critères utilisés.

### BR-028 — Décision humaine

Le matching ne remplace pas la décision finale du client.

### BR-029 — Intervention du conseiller

Le conseiller AIWORX peut intervenir dans la sélection ou l'exclusion des prestataires selon les règles prévues.

---

# 6.8 Règles relatives aux offres

### BR-030 — Création d'une offre

Seul un prestataire autorisé peut soumettre une offre.

### BR-031 — Offre brouillon

Une offre peut rester en brouillon avant sa soumission.

### BR-032 — Champs obligatoires

Une offre ne peut être soumise que lorsque les informations obligatoires sont complètes.

### BR-033 — Respect du besoin

L'offre doit respecter les contraintes définies dans le besoin.

### BR-034 — Prix

Le prix indiqué dans l'offre doit être cohérent avec les règles applicables au besoin.

### BR-035 — Jalons de l'offre

Lorsque des jalons sont définis, leurs montants doivent respecter les règles de cohérence prévues avec le montant global de l'offre.

### BR-036 — Versionnement

Une modification importante d'une offre après soumission doit créer ou conserver une nouvelle version identifiable.

### BR-037 — Offre expirée

Une offre dont la période de validité est dépassée ne doit plus être considérée comme une offre active.

---

# 6.9 Règles relatives à la comparaison

### BR-038 — Comparaison structurée

Les offres doivent être comparables sur les critères disponibles.

### BR-039 — Confidentialité des offres

Les informations confidentielles des offres concurrentes ne doivent pas être exposées aux prestataires.

### BR-040 — Analyse IA

Une analyse générée par IA doit être basée sur les informations réellement disponibles dans les offres.

### BR-041 — Absence d'information

L'IA ne doit pas présenter comme certain un élément qui n'est pas présent dans les données disponibles.

### BR-042 — Décision finale

La sélection finale du prestataire appartient au client.

---

# 6.10 Règles relatives à la sélection

### BR-043 — Prestataire sélectionné

La sélection doit être enregistrée dans le système.

### BR-044 — Éligibilité

Un prestataire sélectionné doit satisfaire aux conditions d'éligibilité applicables.

### BR-045 — Préparation du contrat

La sélection déclenche la préparation de la contractualisation.

---

# 6.11 Règles relatives aux contrats

### BR-046 — Contrat avant exécution

La mission doit disposer d'un cadre contractuel valide avant son exécution lorsque cette condition est prévue.

### BR-047 — Version du contrat

Les modifications importantes doivent produire une nouvelle version identifiable.

### BR-048 — Signature

La signature doit être enregistrée avec son état.

### BR-049 — Contrat signé

Le document signé doit être conservé conformément aux règles de conservation.

### BR-050 — Modification après signature

Une modification importante après signature doit suivre le processus contractuel approprié.

---

# 6.12 Règles relatives aux paiements

### BR-051 — Traçabilité financière

Chaque opération financière importante doit être traçable.

### BR-052 — Référence externe

Lorsqu'un fournisseur de paiement fournit une référence externe, celle-ci doit être conservée.

### BR-053 — Idempotence

Les opérations financières doivent être conçues de manière à éviter les doubles traitements.

### BR-054 — Statut financier

Une transaction doit disposer d'un statut représentant son état réel.

### BR-055 — Échec

Une opération financière échouée ne doit pas être considérée comme réussie.

### BR-056 — Remboursement

Un remboursement doit être enregistré comme une opération distincte ou comme un événement financier traçable selon le modèle retenu.

---

# 6.13 Règles relatives aux missions

### BR-057 — Création de la mission

La mission est créée à partir de la sélection et de la contractualisation.

### BR-058 — Informations contractuelles

La mission doit rester cohérente avec les conditions contractuelles.

### BR-059 — Dates

Les dates importantes de la mission doivent être enregistrées.

### BR-060 — Statut

La mission doit disposer d'un statut représentant son état.

### BR-061 — Modification du périmètre

Une modification substantielle du périmètre doit suivre le processus prévu de modification ou d'avenant.

---

# 6.14 Règles relatives aux jalons

### BR-062 — Jalon

Un jalon doit être associé à une mission.

### BR-063 — Critères d'acceptation

Les critères d'acceptation d'un jalon doivent être définis lorsque cela est nécessaire à son contrôle.

### BR-064 — Échéance

Une échéance doit pouvoir être suivie.

### BR-065 — Retard

Un retard doit pouvoir être détecté et signalé.

### BR-066 — Validation

Un jalon ne doit être considéré comme validé que lorsque les conditions nécessaires sont satisfaites.

---

# 6.15 Règles relatives aux livrables

### BR-067 — Association

Un livrable doit être associé à une mission ou à un jalon lorsque le processus le prévoit.

### BR-068 — Versionnement

Les versions successives d'un livrable doivent être distinguables.

### BR-069 — Contrôle

Un livrable soumis doit pouvoir être contrôlé avant sa validation.

### BR-070 — Correction

Un livrable non conforme peut être retourné au prestataire pour correction.

### BR-071 — Nouvelle version

Une correction doit produire une nouvelle version identifiable lorsque le versionnement est applicable.

---

# 6.16 Règles relatives au contrôle qualité

### BR-072 — Contrôle qualité

Les livrables doivent être soumis au processus de contrôle qualité prévu.

### BR-073 — Grille qualité

Le contrôle doit utiliser la grille applicable au service concerné.

### BR-074 — Résultat d'un critère

Un critère peut être marqué :

* conforme ;
* non conforme ;
* non applicable.

### BR-075 — Preuves

Les résultats du contrôle doivent pouvoir être accompagnés de preuves ou de commentaires.

### BR-076 — Non-conformité

Une non-conformité doit pouvoir déclencher une demande de correction.

### BR-077 — Traçabilité

Les contrôles qualité doivent être traçables.

---

# 6.17 Règles relatives à la validation client

### BR-078 — Validation

Le client peut valider un livrable lorsque les conditions prévues sont satisfaites.

### BR-079 — Refus

Un refus doit pouvoir être associé à un motif lorsque les règles contractuelles l'exigent.

### BR-080 — Correction

Un livrable refusé peut être renvoyé en correction.

### BR-081 — Historique

Les décisions de validation doivent être conservées.

---

# 6.18 Règles relatives à la validation finale

### BR-082 — Conditions de validation finale

La validation finale nécessite que les conditions définies pour la mission soient satisfaites.

### BR-083 — Éléments manquants

Une mission ne doit pas être clôturée comme terminée lorsqu'un élément obligatoire reste manquant.

### BR-084 — Litige

Une situation litigieuse peut empêcher la clôture normale jusqu'à résolution.

### BR-085 — Traçabilité

La validation finale doit être enregistrée.

---

# 6.19 Règles relatives aux reversements

### BR-086 — Éligibilité

Le prestataire doit être éligible au reversement.

### BR-087 — Validation préalable

Le reversement final dépend de la satisfaction des conditions de validation prévues.

### BR-088 — Statut du reversement

Le reversement doit avoir un statut permettant de suivre son traitement.

### BR-089 — Échec

Un reversement échoué doit rester identifiable et nécessiter le traitement prévu.

### BR-090 — Retour

Un reversement retourné doit être identifiable et traité selon les règles applicables.

---

# 6.20 Règles relatives à la messagerie

### BR-091 — Messagerie interne

Les communications liées au processus doivent pouvoir être réalisées dans les espaces prévus.

### BR-092 — Accès

Un utilisateur ne peut accéder qu'aux conversations auxquelles il est autorisé.

### BR-093 — Pièces jointes

Les fichiers envoyés par messagerie doivent respecter les règles de sécurité applicables.

### BR-094 — Contournement

Les tentatives de partage de coordonnées directes peuvent être détectées et bloquées selon les règles prévues.

### BR-095 — Traçabilité

Les événements importants liés à la messagerie doivent pouvoir être enregistrés.

---

# 6.21 Règles relatives aux notifications

### BR-096 — Événement déclencheur

Une notification est déclenchée par un événement métier configuré.

### BR-097 — Canal

La notification utilise le canal applicable :

* plateforme ;
* e-mail ;
* WhatsApp lorsque prévu.

### BR-098 — Déduplication

Une même notification ne doit pas être envoyée plusieurs fois pour le même événement lorsqu'une déduplication est applicable.

### BR-099 — Résolution

Une relance ne doit pas continuer après la résolution de l'événement concerné.

### BR-100 — Notifications critiques

Les notifications critiques doivent respecter les règles de disponibilité définies par la plateforme.

---

# 6.22 Règles relatives aux fichiers

### BR-101 — Contrôle des fichiers

Les fichiers doivent respecter les formats et tailles autorisés.

### BR-102 — Sécurité

Les fichiers doivent être soumis aux contrôles de sécurité prévus.

### BR-103 — Accès

Un fichier ne peut être consulté que par les utilisateurs autorisés.

### BR-104 — URL temporaire

Les accès aux fichiers sensibles peuvent utiliser des URLs temporaires.

### BR-105 — Conservation

Les fichiers doivent être conservés selon les règles de rétention applicables.

---

# 6.23 Règles relatives aux litiges

### BR-106 — Création d'un litige

Un litige peut être ouvert lorsqu'une situation correspond aux conditions prévues.

### BR-107 — Preuves

Les parties peuvent fournir les éléments nécessaires à l'examen du litige.

### BR-108 — Intervention AIWORX

AIWORX peut intervenir dans le traitement et la médiation selon le niveau du litige.

### BR-109 — Décision

Une décision de résolution doit être enregistrée.

### BR-110 — Traçabilité

Les étapes du traitement du litige doivent être traçables.

---

# 6.24 Règles relatives aux pénalités

### BR-111 — Déclenchement

Une pénalité ne peut être appliquée que lorsqu'une condition prévue par les règles applicables est satisfaite.

### BR-112 — Justification

L'application d'une pénalité doit être justifiable et traçable.

### BR-113 — Configuration

Les seuils et niveaux de pénalité doivent pouvoir être configurés lorsque le cahier des charges le prévoit.

---

# 6.25 Règles relatives aux évaluations

### BR-114 — Évaluation après mission

L'évaluation intervient après la réalisation de la prestation selon les conditions prévues.

### BR-115 — Évaluation du prestataire

Le client peut évaluer la prestation et le prestataire.

### BR-116 — Utilisation

Les évaluations peuvent contribuer aux mécanismes de réputation, de qualité et de matching lorsque les règles correspondantes sont activées.

### BR-117 — Visibilité

La visibilité d'une évaluation doit respecter les règles définies par AIWORX.

---

# 6.26 Règles relatives à l'intelligence artificielle

### BR-118 — Assistance IA

L'IA peut assister certaines étapes du processus.

### BR-119 — Données disponibles

Une réponse générée par l'IA doit être basée sur les informations réellement disponibles.

### BR-120 — Traçabilité

Les résultats importants générés ou influencés par l'IA doivent pouvoir être identifiés lorsque la traçabilité est nécessaire.

### BR-121 — Décision humaine

Les décisions nécessitant une validation humaine ne doivent pas être transformées en décisions automatiques irréversibles.

### BR-122 — Explication

Lorsque l'IA produit un score ou une recommandation, les critères utilisés doivent pouvoir être expliqués lorsque cette fonctionnalité est prévue.

---

# 6.27 Règles relatives au Back-office

### BR-123 — Accès administratif

Le Back-office est accessible uniquement aux utilisateurs autorisés.

### BR-124 — Permissions administratives

Les fonctionnalités administratives sont contrôlées par permissions.

### BR-125 — Actions sensibles

Les actions administratives sensibles doivent être protégées et tracées.

### BR-126 — Motif

Lorsqu'une action sensible nécessite un motif, celui-ci doit être enregistré.

### BR-127 — Configuration

Les paramètres configurables doivent être modifiables uniquement par les rôles autorisés.

---

# 6.28 Règles d'audit

### BR-128 — Journalisation

Les actions importantes doivent être enregistrées dans le journal d'audit.

### BR-129 — Acteur

L'événement doit permettre d'identifier l'acteur ayant effectué l'action.

### BR-130 — Objet

L'événement doit permettre d'identifier l'objet concerné.

### BR-131 — État

Lorsque nécessaire, l'état avant et après l'action doit être conservé.

### BR-132 — Date

Chaque événement d'audit doit être associé à une date et une heure.

### BR-133 — Corrélation

Les événements techniques liés à une même opération doivent pouvoir être corrélés lorsque cela est nécessaire.

---

# 6.29 Règles de sécurité

### BR-134 — Contrôle d'accès

L'accès aux ressources doit être contrôlé.

### BR-135 — Séparation des responsabilités

Les actions sensibles doivent respecter les rôles et permissions définis.

### BR-136 — Protection des données

Les données sensibles doivent être protégées pendant leur stockage et leur transmission selon les exigences applicables.

### BR-137 — Journalisation de sécurité

Les événements de sécurité importants doivent être enregistrés.

### BR-138 — Accès aux documents

Les documents sensibles ne doivent pas être accessibles publiquement sans autorisation.

---

# 6.30 Règles de statut

Les statuts utilisés dans les différents domaines doivent représenter l'état réel de l'objet concerné.

Un objet ne doit pas être considéré comme :

* validé s'il est encore en attente ;
* payé si le paiement a échoué ;
* livré si le livrable n'a pas été soumis ;
* conforme si le contrôle a détecté une non-conformité ;
* clôturé si une condition obligatoire reste ouverte.

Les transitions de statut doivent être contrôlées par les règles métier et les permissions.

---

# 6.31 Règles de traçabilité

Les opérations importantes doivent conserver suffisamment d'informations pour permettre :

* le suivi ;
* l'audit ;
* l'analyse d'un incident ;
* la compréhension d'une décision ;
* la résolution d'un litige ;
* le suivi financier ;
* le suivi des versions.

---

# 6.32 Règles configurables

Certaines valeurs ne doivent pas être codées en dur lorsqu'elles sont destinées à être configurées par AIWORX.

Cela concerne notamment :

* délais ;
* échéances ;
* quotas ;
* poids de matching ;
* commissions ;
* frais ;
* taxes ;
* pénalités ;
* seuils ;
* niveaux de litige ;
* grilles qualité ;
* modèles de notification ;
* modèles de contrat ;
* règles de conservation.

Les valeurs exactes qui ne sont pas déterminées dans le cahier des charges doivent être définies ultérieurement.

---

# 6.33 Éléments à valider

Les éléments suivants nécessitent une décision ou une précision lorsque leur valeur exacte n'est pas définie dans le cahier des charges :

* fournisseur définitif de signature électronique ;
* fournisseur définitif de paiement ;
* paramètres exacts des commissions ;
* paramètres exacts des pénalités ;
* seuils précis du matching ;
* poids précis des critères de matching ;
* durées exactes de certaines relances ;
* durées exactes de conservation ;
* niveaux exacts de litige ;
* valeurs exactes de certains paramètres administrables.

Ces éléments doivent être considérés comme **configurables ou à valider**, et non comme des valeurs déjà décidées.

---

# 6.34 Synthèse

Les règles métier assurent la cohérence entre :

```text
Acteurs
   ↓
Permissions
   ↓
Workflows
   ↓
Statuts
   ↓
Données
   ↓
Règles métier
   ↓
Audit
```

Elles serviront directement à la conception :

* de la base de données ;
* des API ;
* des services Backend ;
* des permissions ;
* des validations ;
* des transitions de statut ;
* des tests ;
* des mécanismes d'audit.
