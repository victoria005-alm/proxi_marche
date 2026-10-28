# ProxiMarché PWA

## Vérification locale

```sh
npm install
npm run build
npm run preview -- --port 4173
```

Ouvrir http://localhost:4173 dans une fenêtre de navigateur indépendante. Le service worker est activé uniquement dans la version compilée, pour préserver le rechargement Vite en développement.

Dans Chrome ou Edge, utiliser le bouton « Installer l’application » lorsqu’il apparaît, ou le menu d’installation du navigateur. Sur iPhone/iPad, ouvrir dans Safari puis Partager → Sur l’écran d’accueil.

Après la première visite et l’activation du service worker, passer hors connexion et recharger une route, par exemple `/client/recherche`. Les écrans et les fichiers JS/CSS sont conservés ; les images et polices externes ne sont pas mises en cache. Les fonctions métier du prototype restent simulées.

Pour vérifier une mise à jour, compiler une modification, revenir en ligne et redonner le focus à la fenêtre de l’application. Le bouton « Mettre à jour » active la nouvelle version et recharge la page. Les modifications non enregistrées dans l’écran sont perdues lors de ce rechargement.

## Hébergement

Publier le dossier `dist` sur HTTPS. Configurer les routes applicatives pour retourner `index.html`, tout en servant les fichiers statiques réels normalement. Servir `sw.js` avec un type JavaScript et `Cache-Control: no-cache`. Servir le manifeste avec `application/manifest+json`. Garder les URL de l’application sur le même domaine et dans le même périmètre que le service worker.

Le cache contient uniquement les fichiers de l’interface, jamais les réponses API ou les données des comptes. Chaque compilation produit une version du cache basée sur son contenu. Aucun service de paiement ou de synchronisation de commandes hors connexion n’est ajouté.
