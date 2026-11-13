# Relevé UI de saoub.fanadata.com

Captures faites avec REA (`capture_browser_scenario`, Chrome headless, 1440x900) le 13/11/2026.
Les fichiers `.png` de ce dossier servent de référence visuelle.

## Layout commun

- Barre du haut fixe : bouton menu (ouvre/ferme les libellés de la barre latérale) à gauche, drapeau de langue à droite.
- Barre latérale gauche : titre `SAO UB / Database`, boutons-icônes biseautés (Index, Banner, Character, Weapon, Equipment), bouton actif en violet.
- Cadre central biseauté (bordures `border_*`), étiquette en haut à droite : `PAGE: LIST/CHARACTER`, `UNIT TYPE: WEAPON/SWORD`, `SCOUT TYPE: CHARACTER`.
- Footer : About us, Privacy policy, crédits Bandai Namco.

## Listes (characters, weapons, equipments)

- Rangée de filtres d'éléments en losanges (neutre, feu, eau, vent, terre, lumière, ténèbres).
- Onglet `Advanced search` (repliable).
- Grille de 3 cartes par ligne, 21 par page, pagination en bas.
- Carte personnage : rareté (en haut à gauche), image, icône arme+élément, icônes de type d'attaque (C/A/E…), nom puis `[titre]`.
- Carte arme : image, icône arme+élément, rareté, nom.
- Bannières : 2 cartes par ligne (image large + nom), sans filtre.

## Fiches détail

- Personnage : nom `[titre]`, image principale + image secondaire, losange élément + étoiles, carte de l'arme liée,
  tableau de stats (Lv / HP MP ATK MATK DEF MDEF CRIT SPD) avec sélecteur de Limit Break (0 à 4),
  liste des compétences (icône de type, nom, description, MP), `<OTHER LANGUAGES>`, `<Description>`, bannière d'origine.
- Arme : nom, image, élément + étoiles, personnage lié, stats + Limit Break, effets passifs, autres langues, bannière.
- Bannière : nom, image, `<PERIOD>` (From / To), `<CHARACTER>` (avatars ronds).

## Écarts avec l'API SAOARS

| fanadata | API SAOARS |
| --- | --- |
| Type d'arme des personnages (icône arme+élément) | `weapon_type` n'est pas exposé par `CharacterResource` : on affiche l'élément seul |
| Bannière d'origine sur les fiches personnage/arme | Pas de relation exposée |
| Noms dans les autres langues | Seulement `available_locales` : on propose de basculer la langue |
| Galeries fonds d'écran / home | Pas de données : seule la galerie personnages est reprise |
| Imaginations | Absentes de fanadata, ajoutées (0 entrée en base actuellement) |
| Capacités, attaques | Absentes de fanadata, ajoutées avec le même gabarit |
| `special_partner` parfois un nom libre | Corrigé côté API : résolution par id / slug / nom, sinon `{ name }` |
