# Front SAOARS/UB

Base de données non officielle de Sword Art Online Unleash Blading. L'interface reprend celle de
[saoub.fanadata.com](https://saoub.fanadata.com/) (relevé dans [docs/fanadata](docs/fanadata/README.md)),
et les données viennent de l'[API SAOARS](https://github.com/Renaudfradin/API-SAOARS).

## Aperçu

| Accueil | Personnages |
| --- | --- |
| <img src="docs/screenshots/home.png" alt="Accueil" width="100%"> | <img src="docs/screenshots/characters.png" alt="Liste des personnages" width="100%"> |

| Bannières | Armes |
| --- | --- |
| <img src="docs/screenshots/banners.png" alt="Liste des bannières" width="100%"> | <img src="docs/screenshots/weapons.png" alt="Liste des armes" width="100%"> |

| Équipements | Galerie |
| --- | --- |
| <img src="docs/screenshots/equipments.png" alt="Liste des équipements" width="100%"> | <img src="docs/screenshots/gallery.png" alt="Galerie des personnages" width="100%"> |

## Project Setup

```sh
npm install
cp .env.example .env
```

### Compile for Development

```sh
npm run dev
```

L'API doit tourner en parallèle (dans `API-SAOARS` : `./vendor/bin/sail up`, port 8001).

Le rendu est fait par Next.js. La langue est lue dans le cookie `saoub.lang` (ou, à la première visite, dans `Accept-Language`) et envoyée à l'API. La page 1 des listes et les fiches sont chargées côté serveur, avec un cache de 5 minutes. La pagination suivante, les filtres et la galerie restent dans le navigateur.

### Routes de l'API utilisées

| Route | Usage |
| --- | --- |
| `GET /characters`, `/weapons`, `/equipments`, `/banners`, `/abilities`, `/attacks`, `/imaginations` | Listes paginées (21 par page, `?page=`) |
| `GET /character/{slug}`, `/weapon/{slug}`, `/equipment/{slug}`, `/banner/{slug}`, `/ability/{slug}`, `/attack/{slug}`, `/imagination/{slug}` | Fiches détail |
| `GET /character/random` | Personnage aléatoire de l'accueil |
| `GET /stats` | Compteurs de l'accueil |

Toutes les requêtes ajoutent `?lang=` (fr, en, zh, ko, ja, de, es), choisi avec le sélecteur de langue.
L'API limite à 60 requêtes par minute : les listes sont paginées côté serveur, et toutes les pages
ne sont chargées que lorsqu'un filtre ou une recherche est actif.
