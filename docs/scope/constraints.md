# AIWORX — Contraintes

## 1. Objet

Ce document définit les contraintes fonctionnelles, techniques, de sécurité, juridiques, opérationnelles et de développement qui doivent être respectées lors de la conception et de la réalisation de la plateforme AIWORX.

Ces contraintes constituent des limites ou conditions obligatoires pour l'architecture, le développement, la base de données, les API, la sécurité, les tests et le déploiement.

---

# 2. Contraintes générales

## C-001 — Respect du cahier des charges

L'implémentation doit respecter les exigences définies dans le cahier des charges AIWORX.

Toute modification importante du périmètre doit être validée avant son implémentation.

---

## C-002 — Périmètre V1

Les fonctionnalités développées doivent respecter le périmètre défini pour la version V1.

Les fonctionnalités futures ne doivent pas être considérées comme obligatoires pour la V1 sans validation.

---

## C-003 — Traçabilité

Toute exigence importante doit pouvoir être reliée à :

* une règle métier ;
* un workflow ;
* un module ;
* une implémentation ;
* un ou plusieurs tests.

---

# 3. Contraintes fonctionnelles

## C-004 — Respect des rôles

Chaque fonctionnalité doit respecter les rôles et permissions définis pour les utilisateurs.

Un utilisateur ne doit pas pouvoir effectuer une opération qui n'est pas autorisée pour son rôle.

---

## C-005 — Respect des workflows

Les opérations métier doivent respecter les workflows définis dans `05-workflows.md`.

Une transition non autorisée ne doit pas être exécutée.

---

## C-006 — Gestion des statuts

Les changements de statut doivent respecter les transitions autorisées.

Le système ne doit pas permettre de passer directement à un statut incompatible avec l'état actuel de l'objet.

---

## C-007 — Validation des données

Les données obligatoires doivent être vérifiées avant leur enregistrement ou leur utilisation dans un processus métier.

---

## C-008 — Cohérence métier

Une opération métier ne doit pas créer un état incohérent entre plusieurs objets liés.

---

## C-009 — Versionnement

Les objets nécessitant un historique doivent conserver des versions identifiables.

---

## C-010 — Audit des actions importantes

Les opérations métier, administratives et de sécurité importantes doivent être enregistrées dans le journal d'audit.

---

# 4. Contraintes relatives aux utilisateurs et organisations

## C-011 — Identité unique

Chaque compte utilisateur doit posséder un identifiant unique.

---

## C-012 — Organisation

Les utilisateurs appartenant à une organisation doivent être associés à celle-ci selon les règles d'accès définies.

---

## C-013 — Isolation des organisations

Les données d'une organisation ne doivent pas être accessibles par un utilisateur non autorisé appartenant à une autre organisation.

---

## C-014 — Désactivation d'un compte

Un compte désactivé ou suspendu ne doit plus pouvoir effectuer les opérations interdites par son statut.

---

# 5. Contraintes relatives aux prestataires

## C-015 — Éligibilité

Un prestataire doit satisfaire les conditions d'éligibilité applicables avant de participer aux opérations qui nécessitent cette éligibilité.

---

## C-016 — Documents obligatoires

Les documents nécessaires à la qualification et à la vérification du prestataire doivent être contrôlés avant l'activation des fonctionnalités concernées.

---

## C-017 — Documents expirés

Un document expiré doit être identifié et traité conformément aux règles métier applicables.

---

## C-018 — Suspension

Un prestataire suspendu ne doit pas pouvoir effectuer les opérations interdites pendant sa suspension.

---

# 6. Contraintes relatives aux besoins

## C-019 — Qualification obligatoire

Un besoin nécessitant une qualification ne doit pas pouvoir passer à l'étape suivante tant que les conditions de qualification ne sont pas satisfaites.

---

## C-020 — Informations obligatoires

Les informations obligatoires d'un besoin doivent être renseignées avant sa publication ou son traitement lorsque le workflow l'exige.

---

## C-021 — Modification d'un besoin

Une modification importante d'un besoin doit respecter les règles de versionnement et de confirmation applicables.

---

# 7. Contraintes relatives au matching

## C-022 — Critères de matching

Le matching doit utiliser uniquement les critères autorisés et définis par les règles métier.

---

## C-023 — Éligibilité du prestataire

Un prestataire non éligible ne doit pas être proposé lorsqu'une règle métier interdit sa sélection.

---

## C-024 — Assistance par IA

Les résultats générés par l'IA ne doivent pas être considérés automatiquement comme une décision humaine lorsque le workflow exige une validation.

---

## C-025 — Traçabilité du matching

Les informations nécessaires à l'explication et à l'audit du processus de matching doivent être conservées conformément aux règles définies.

---

# 8. Contraintes relatives aux offres

## C-026 — Offre valide

Une offre doit respecter les informations obligatoires avant sa soumission.

---

## C-027 — Offre modifiable

Une offre ne peut être modifiée que pendant les étapes du workflow où cette modification est autorisée.

---

## C-028 — Sélection

La sélection d'un prestataire doit respecter les règles d'éligibilité et de validation définies.

---

# 9. Contraintes relatives aux contrats

## C-029 — Contrat

Un contrat doit être généré ou préparé à partir des informations validées du processus de sélection.

---

## C-030 — Signature

Un contrat nécessitant une signature ne doit pas être considéré comme signé tant que le service de signature externe n'a pas confirmé son état.

---

## C-031 — Intégrité du document signé

Le document signé doit rester associé au contrat correspondant et ne doit pas être remplacé silencieusement par une version différente.

---

# 10. Contraintes relatives aux paiements

## C-032 — Prestataire de paiement

Les opérations de paiement doivent utiliser un prestataire de paiement externe validé pour le projet.

Le prestataire exact reste à confirmer.

---

## C-033 — Idempotence des paiements

Une même opération de paiement ne doit pas provoquer plusieurs transactions financières en cas de répétition de la requête.

---

## C-034 — Statut du paiement

Chaque paiement doit posséder un statut explicite et traçable.

---

## C-035 — Confirmation externe

Une opération de paiement ne doit pas être considérée comme définitivement réussie uniquement sur la base d'une réponse locale non confirmée lorsque le processus externe exige une confirmation.

---

## C-036 — Webhooks

Les événements reçus par webhook doivent être vérifiés et traités de manière idempotente.

---

## C-037 — Échec de paiement

Un échec de paiement doit produire un état contrôlé et ne doit pas être considéré comme un paiement réussi.

---

## C-038 — Remboursement

Les remboursements doivent respecter les règles métier, contractuelles et financières applicables.

---

# 11. Contraintes relatives aux missions

## C-039 — Création de mission

Une mission ne doit être activée que lorsque les conditions nécessaires du workflow sont satisfaites.

---

## C-040 — Jalons

Les jalons doivent respecter les règles de dates, de statut et de validation définies pour la mission.

---

## C-041 — Livrables

Un livrable doit être associé à la mission et, lorsque nécessaire, au jalon correspondant.

---

## C-042 — Version des livrables

Les nouvelles soumissions d'un livrable doivent être identifiables comme de nouvelles versions.

---

## C-043 — Validation finale

La validation finale ne doit être possible que lorsque les conditions nécessaires sont satisfaites.

---

# 12. Contraintes relatives à la qualité

## C-044 — Critères d'acceptation

Le contrôle qualité doit se baser sur les critères d'acceptation définis pour la prestation concernée.

---

## C-045 — Non-conformité

Un livrable non conforme doit pouvoir être retourné pour correction lorsque le workflow l'autorise.

---

## C-046 — Historique qualité

Les résultats des contrôles qualité doivent être conservés et traçables.

---

## C-047 — Intervention humaine

Une décision nécessitant une validation humaine ne doit pas être prise automatiquement par l'IA sans intervention humaine.

---

# 13. Contraintes relatives aux litiges

## C-048 — Ouverture d'un litige

Un litige doit être ouvert uniquement par un utilisateur autorisé ou par un mécanisme métier autorisé.

---

## C-049 — Preuves

Les éléments utilisés dans le traitement d'un litige doivent être conservés conformément aux règles de traçabilité.

---

## C-050 — Blocage

Les opérations concernées par un litige peuvent être bloquées lorsque les règles métier l'exigent.

---

## C-051 — Décision

La résolution d'un litige doit être enregistrée avec les informations nécessaires à son audit.

---

# 14. Contraintes relatives aux fichiers

## C-052 — Types de fichiers

Seuls les types de fichiers autorisés doivent pouvoir être importés.

---

## C-053 — Taille des fichiers

La taille maximale des fichiers doit être limitée conformément à la configuration du système.

---

## C-054 — Analyse de sécurité

Les fichiers importés doivent être soumis aux contrôles de sécurité nécessaires.

---

## C-055 — Accès aux fichiers

Un fichier ne doit être accessible qu'aux utilisateurs disposant des autorisations nécessaires.

---

## C-056 — Conservation

Les fichiers doivent être conservés conformément aux règles de conservation applicables.

---

# 15. Contraintes relatives à la messagerie

## C-057 — Accès aux conversations

Une conversation ne doit être accessible qu'aux utilisateurs autorisés.

---

## C-058 — Anti-contournement

Les mécanismes anti-contournement doivent être appliqués conformément aux règles métier et aux exigences légales applicables.

---

## C-059 — Traçabilité

Les événements importants liés à la messagerie doivent pouvoir être audités lorsque cela est nécessaire.

---

# 16. Contraintes relatives aux notifications

## C-060 — Événements déclencheurs

Les notifications doivent être déclenchées uniquement par les événements métier configurés.

---

## C-061 — Échec d'envoi

Un échec d'envoi d'une notification externe ne doit pas rendre l'opération métier principale incohérente.

---

## C-062 — Données sensibles

Les notifications ne doivent pas exposer inutilement de données sensibles.

---

# 17. Contraintes de sécurité

## C-063 — Chiffrement des communications

Les communications avec la plateforme doivent utiliser des mécanismes de transport sécurisés.

---

## C-064 — Mots de passe

Les mots de passe ne doivent jamais être stockés en clair.

---

## C-065 — Secrets

Les clés, secrets, mots de passe et identifiants sensibles ne doivent pas être stockés directement dans le code source.

---

## C-066 — Autorisation serveur

Les contrôles d'autorisation doivent être effectués côté serveur.

---

## C-067 — Protection contre les accès directs

L'accès direct à une ressource protégée ne doit pas permettre de contourner les contrôles d'autorisation.

---

## C-068 — Principe du moindre privilège

Les utilisateurs et services doivent disposer uniquement des permissions nécessaires à leurs fonctions.

---

## C-069 — Journalisation de sécurité

Les événements de sécurité importants doivent être enregistrés.

---

## C-070 — Données sensibles dans les logs

Les informations sensibles ne doivent pas être enregistrées inutilement dans les journaux.

---

# 18. Contraintes relatives à l'IA

## C-071 — Validation humaine

L'IA doit assister les utilisateurs sans remplacer les validations humaines obligatoires définies dans les workflows.

---

## C-072 — Fiabilité des résultats

Les résultats de l'IA doivent être considérés comme des résultats d'assistance lorsqu'ils nécessitent une validation humaine.

---

## C-073 — Données transmises à l'IA

Seules les données nécessaires doivent être transmises aux services d'IA externes.

---

## C-074 — Confidentialité

Les données sensibles doivent être protégées lors de leur utilisation par des services d'IA externes.

---

## C-075 — Traçabilité

Les opérations importantes réalisées avec l'assistance de l'IA doivent pouvoir être identifiées et auditées.

---

# 19. Contraintes juridiques et conformité

## C-076 — Protection des données

Le traitement des données personnelles doit respecter les obligations légales et réglementaires applicables.

---

## C-077 — CNDP

Les formalités et obligations applicables auprès de la CNDP doivent être identifiées et respectées avant les traitements concernés.

---

## C-078 — Consentement

Lorsque le consentement est nécessaire, celui-ci doit être obtenu, enregistré et géré conformément aux règles applicables.

---

## C-079 — Droits des utilisateurs

Les mécanismes nécessaires à l'exercice des droits des utilisateurs sur leurs données doivent être prévus.

---

## C-080 — Conservation des données

Les durées de conservation doivent respecter les obligations légales, contractuelles et métier applicables.

---

# 20. Contraintes d'infrastructure

## C-081 — Environnements

Le projet doit séparer les environnements de développement, de test et de production selon les besoins du projet.

---

## C-082 — Configuration

Les configurations propres à chaque environnement doivent être séparées du code source.

---

## C-083 — Variables d'environnement

Les secrets et paramètres sensibles doivent être gérés au moyen de mécanismes de configuration sécurisés.

---

## C-084 — Sauvegarde

Les données critiques doivent être sauvegardées automatiquement conformément à la politique de sauvegarde définie.

---

## C-085 — Tests de récupération

La restauration des sauvegardes doit être testée périodiquement.

---

## C-086 — Monitoring

L'infrastructure doit fournir une supervision permettant notamment de suivre :

* la santé de l'application ;
* les erreurs ;
* la disponibilité ;
* les ressources importantes de l'infrastructure.

---

# 21. Contraintes de développement

## C-087 — Contrôle de version

Le code source doit être géré avec un système de contrôle de version.

---

## C-088 — Branches

Le développement doit utiliser une stratégie de branches définie par l'équipe.

---

## C-089 — Revue de code

Les modifications importantes du code doivent faire l'objet d'une revue lorsque le processus de développement l'exige.

---

## C-090 — Qualité du code

Le code doit respecter des conventions cohérentes de nommage, d'organisation et de documentation.

---

## C-091 — Tests

Les fonctionnalités importantes doivent être couvertes par des tests appropriés.

---

## C-092 — Documentation technique

Les décisions techniques importantes doivent être documentées.

---

# 22. Contraintes relatives à la base de données

## C-093 — Intégrité référentielle

Les relations entre les données doivent préserver l'intégrité référentielle.

---

## C-094 — Contraintes d'unicité

Les données nécessitant une unicité doivent être protégées par des contraintes appropriées.

---

## C-095 — Contraintes de nullité

Les champs obligatoires doivent être définis comme non nuls lorsque cela correspond aux règles métier.

---

## C-096 — Migrations

Les modifications du schéma de base de données doivent être réalisées au moyen de migrations versionnées.

---

## C-097 — Données sensibles

Les données sensibles doivent bénéficier des mesures de protection appropriées.

---

# 23. Contraintes API

## C-098 — Validation des entrées

Toutes les données reçues par les API doivent être validées avant leur traitement.

---

## C-099 — Authentification API

Les endpoints protégés doivent vérifier l'authentification de l'utilisateur.

---

## C-100 — Autorisation API

Les endpoints protégés doivent vérifier les permissions nécessaires.

---

## C-101 — Gestion des erreurs API

Les API doivent retourner des réponses d'erreur cohérentes et contrôlées.

---

## C-102 — Documentation API

Les endpoints publics et internes nécessaires doivent être documentés.

---

## C-103 — Idempotence

Les endpoints nécessitant une exécution unique doivent prendre en charge l'idempotence lorsque cela est nécessaire.

---

# 24. Contraintes de déploiement

## C-104 — Déploiement contrôlé

Les versions déployées doivent être identifiables.

---

## C-105 — Séparation des environnements

Les données de production ne doivent pas être utilisées directement dans l'environnement de développement sans mesures appropriées de protection et d'anonymisation lorsque nécessaire.

---

## C-106 — Rollback

Le processus de déploiement doit permettre un retour contrôlé vers une version précédente lorsque cela est nécessaire.

---

# 25. Contraintes de performance

## C-107 — Temps de réponse

Les opérations principales doivent respecter les objectifs de performance définis lors de la conception technique.

---

## C-108 — Charge

L'architecture doit pouvoir supporter la charge prévue pour la V1.

---

## C-109 — Traitements asynchrones

Les traitements longs ou non critiques pour la réponse immédiate doivent pouvoir être exécutés de manière asynchrone lorsque cela est approprié.

---

# 26. Contraintes de maintenance

## C-110 — Modularité

Les composants du système doivent être organisés de manière modulaire.

---

## C-111 — Faible couplage

Les modules doivent limiter les dépendances inutiles entre eux.

---

## C-112 — Configuration centralisée

Les paramètres métier susceptibles d'évoluer doivent être configurables lorsqu'une configuration est appropriée.

---

## C-113 — Évolutivité

La conception doit permettre l'ajout de nouvelles fonctionnalités sans nécessiter une refonte complète du système.

---

# 27. Gestion des contraintes non définies

Lorsqu'une valeur précise n'est pas définie dans le cahier des charges, elle ne doit pas être inventée.

Elle doit être enregistrée comme une question ouverte dans :

`01-scope/09-open-questions.md`

Puis validée avant de devenir une contrainte d'implémentation définitive.

---

# 28. Priorité des contraintes

Les contraintes sont classées selon leur impact.

### Critique

Contraintes pouvant bloquer le fonctionnement ou compromettre la sécurité du système.

Exemples :

* authentification ;
* autorisation ;
* sécurité ;
* intégrité des données ;
* paiements ;
* protection des données.

### Haute

Contraintes importantes pour le fonctionnement des workflows.

Exemples :

* qualification ;
* matching ;
* contrats ;
* missions ;
* qualité ;
* litiges.

### Moyenne

Contraintes importantes pour la qualité technique et l'exploitation.

Exemples :

* monitoring ;
* performance ;
* documentation ;
* maintenance.

### Faible

Contraintes pouvant être affinées ultérieurement sans bloquer le cœur de la V1.

---

# 29. Référence finale

Les contraintes définies dans ce document doivent être prises en compte dans :

* l'architecture ;
* la conception Backend ;
* la conception de la base de données ;
* les API ;
* la sécurité ;
* les tests ;
* l'infrastructure ;
* le déploiement.

Toute contrainte nouvelle ou toute modification d'une contrainte existante doit être documentée et validée avant son intégration dans l'implémentation.
