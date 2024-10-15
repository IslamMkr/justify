# Justification de texte API

## Description

Ce projet est une API REST qui permet de justifier des textes en fonction d'une longueur de ligne spécifiée. L'API prend un texte en entrée et renvoie un texte où chaque ligne est justifiée pour correspondre à une longueur donnée (par défaut 80 caractères). Ce projet est développé en **Node.js** avec **TypeScript** et utilise **Express** pour gérer les requêtes HTTP.

L'API est déployée sur **Vercel** et disponible à l'adresse suivante :  
[https://justify-gules.vercel.app/](https://justify-gules.vercel.app/)

Le code source est disponible sur GitHub :  
[https://github.com/IslamMkr/justify](https://github.com/IslamMkr/justify)

## Fonctionnalités

- Justification d'un texte pour s'adapter à une longueur de ligne spécifiée.
- Vérification et validation des emails dans certaines requêtes.
- Utilisation d'un système d'authentification par token JWT pour sécuriser les accès.
- Limitation du nombre de mots pouvant être traités par jour par token (limite de 80 000 mots).
- Tests unitaires couvrant les fonctionnalités de justification et validation via **Jest**.

## Prérequis

Avant d'installer et de lancer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn**
- **Git**

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/IslamMkr/justify.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd justify
   ```

3. Installez les dépendances :

   ```bash
   npm install
   ```

   ou si vous utilisez **yarn** :

   ```bash
   yarn install
   ```

4. Créez un fichier `.env` à la racine du projet et ajoutez votre clé secrète JWT et d'autres configurations si nécessaires :

   ```bash
   SECRET_KEY="votre_cle_secrete"
   ```

## Lancement de l'API

1. Démarrez l'API en mode développement :

   ```bash
   npm run dev
   ```

   ou si vous utilisez **yarn** :

   ```bash
   yarn dev
   ```

   Cela démarrera le serveur à l'URL suivante : [http://localhost:3000](http://localhost:3000)

2. Pour lancer l'API en mode production :

   ```bash
   npm run build
   npm start
   ```

## Endpoints de l'API

### 1. Authentification

- **POST** `/api/auth`

  Génère un token JWT basé sur un email.

  ```json
  {
  	"email": "foo@bar.com"
  }
  ```

  **Réponse :**

  ```json
  {
  	"token": "votre_jwt_token"
  }
  ```

### 2. Justification

- **POST** `/api/justify`

  Justifie le texte en entrée pour correspondre à une longueur de ligne définie (par défaut 80 caractères).

  **Requête :**

  - Header : `Authorization: Bearer <token>`
  - Body : Le texte à justifier

  ```json
  {
  	"text": "Write your text here ..."
  }
  ```

  **Réponse :**
  Le texte justifié avec chaque ligne faisant exactement 80 caractères.

### 3. Limitation d'utilisation

- L'API limite chaque token à 80 000 mots par jour. Si la limite est dépassée, l'API retourne une erreur 402 Payment Required.

## Tests

Le projet utilise **Jest** pour les tests unitaires. Pour exécuter les tests, utilisez la commande suivante :

```bash
npm test
```

ou si vous utilisez **yarn** :

```bash
yarn test
```

Les tests couvrent les aspects suivants :

- La justification du texte.
- La validation des emails.
- Les mécanismes d'authentification par token.
- La gestion des erreurs (limite de mots, texte manquant, etc.).

Pour voir le coverage :

```bash
npm test -- --coverage
```

ou si vous utilisez **yarn** :

```bash
yarn test --coverage
```

## Arborescence du projet

```bash
.
├── src
│   ├── controllers
│   │   └── auth.ts          # Gestion des tokens JWT
│   │   └── justify.ts       # Justification du texte
│   ├── middlewares
│   │   └── isAuthenticated.ts   # Middleware de vérification de token
│   │   └── rateLimiting.ts      # Middleware de limitation par token
│   │   └── validation.ts      # Middleware de de validation de payloads
│   ├── services
│   │   └── justify.ts       # Logique de justification de texte
│   └── utils
│       └── email.ts   # Validation d'email avec regex
├── tests
│   ├── controllers
│   │   └── auth.test.ts      # Tests pour le contrôleur d'authentification
│   │   └── justify.test.ts      # Tests pour le contrôleur de justification
│   ├── middlewares
│   │   └── isAuthenticated.test.ts      # Tests pour le middleware d'authentification
│   │   └── rateLimiting.test.ts      # Tests pour le middleware de limitation
│   │   └── validateEmail.test.ts      # Tests pour le middleware de validation d'email
│   │   └── validateText.test.ts      # Tests pour le middleware de validation de text
│   ├── services
│   │   └── justify.test.ts   # Tests pour le service de justification
│   ├── utils
│   │   └── email.test.ts      # Tests la validation d'email
│   └── index.ts    # Point d'entrée
├── .env                     # Fichier de configuration des variables d'environnement
├── package.json              # Fichier de configuration du projet
├── tsconfig.json             # Configuration TypeScript
└── README.md                 # Ce fichier
```
