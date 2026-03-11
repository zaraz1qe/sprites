# Convergence — Visual Novel Sprite Repository

Character sprite assets for the **Convergence** AI-driven visual novel artifact, served via GitHub Pages.

## URL Pattern

Sprites are publicly accessible at:

```
https://zaraz1qe.github.io/sprites/sprites/<character>/<sprite-name>.png
```

**Examples:**
- `https://zaraz1qe.github.io/sprites/sprites/lucina-3ds/neutral.png`
- `https://zaraz1qe.github.io/sprites/sprites/emilia/happy.png`
- `https://zaraz1qe.github.io/sprites/sprites/rem/battle-ready.png`

## Repository Structure

```
/
├── sprite-manifest.json        # Runtime manifest — maps characters to sprites
├── sprite-api.js               # JavaScript API for loading sprites
├── sprites/
│   ├── ariael/
│   ├── camilla/
│   ├── clan-witch/
│   ├── cordelia/
│   ├── corrin/
│   ├── corrin-adrift/
│   ├── crusch/
│   ├── crusch-dress/
│   ├── emilia/
│   ├── emilia-halloween/
│   ├── filament/
│   ├── gullveig/
│   ├── kagero/
│   ├── konata/
│   ├── kronya/
│   ├── lucifer/
│   ├── lucina-3ds/
│   ├── lucina-feh/
│   ├── midori/
│   ├── naoto/
│   ├── priscilla/
│   ├── priscilla-pajamas/
│   ├── ram/
│   ├── rem/
│   ├── shirma/
│   ├── supura/
│   ├── tharja-3ds/
│   ├── tharja-feh/
│   ├── tharja-feh-summer/
│   └── zero/
├── index.html                  # GitHub Pages root
└── README.md
```

## Characters (30)

| Character              | Franchise                          | Folder              | Sprites |
|------------------------|------------------------------------|---------------------|---------|
| Ariael                 | The Awakened Fate Ultimatum        | `ariael`            | 39      |
| Camilla                | Fire Emblem Fates                  | `camilla`           | 3       |
| Clan Witch             | Indivisible                        | `clan-witch`        | 1       |
| Cordelia               | Ken to Mahou to Gakuen Mono.       | `cordelia`          | 13      |
| Corrin                 | Fire Emblem Fates                  | `corrin`            | 8       |
| Corrin (Adrift)        | Fire Emblem Heroes                 | `corrin-adrift`     | 4       |
| Crusch Karsten         | Re:Zero                            | `crusch`            | 12      |
| Crusch Karsten (Dress) | Re:Zero                            | `crusch-dress`      | 11      |
| Emilia                 | Re:Zero                            | `emilia`            | 36      |
| Emilia (Halloween)     | Re:Zero                            | `emilia-halloween`  | 10      |
| Filament               | Ar Tonelico Qoga                   | `filament`          | 56      |
| Gullveig               | Fire Emblem Heroes                 | `gullveig`          | 2       |
| Kagero                 | Fire Emblem Fates                  | `kagero`            | 4       |
| Konata                 | Lucky Star                         | `konata`            | 2       |
| Kronya                 | Fire Emblem Three Houses           | `kronya`            | 4       |
| Lucifer                | The Awakened Fate Ultimatum        | `lucifer`           | 14      |
| Lucina                 | Fire Emblem Awakening              | `lucina-3ds`        | 14      |
| Lucina (FEH)           | Fire Emblem Heroes                 | `lucina-feh`        | 5       |
| Midori                 | Shin Megami Tensei Devil Survivor  | `midori`            | 4       |
| Naoto Shirogane        | Persona 4                          | `naoto`             | 53      |
| Priscilla              | Re:Zero                            | `priscilla`         | 11      |
| Priscilla (Pajamas)    | Re:Zero                            | `priscilla-pajamas` | 11      |
| Ram                    | Re:Zero                            | `ram`               | 23      |
| Rem                    | Re:Zero                            | `rem`               | 36      |
| Shirma                 | Mugen Souls Z                      | `shirma`            | 32      |
| Supura                 | Mugen Souls Z                      | `supura`            | 4       |
| Tharja                 | Fire Emblem Awakening              | `tharja-3ds`        | 11      |
| Tharja (FEH)           | Fire Emblem Heroes                 | `tharja-feh`        | 3       |
| Tharja (FEH Summer)    | Fire Emblem Heroes                 | `tharja-feh-summer` | 6       |
| Zero                   | Dengeki Bunko Fighting Climax      | `zero`              | 22      |

## Sprite API

Include `sprite-api.js` in your project to load and manage sprites:

```html
<script src="https://zaraz1qe.github.io/sprites/sprite-api.js"></script>
```

```javascript
const sprites = new SpriteAPI();
await sprites.load();

// Get a sprite URL
const url = sprites.getUrl('emilia', 'happy');

// List all characters
const characters = sprites.listCharacters();

// List sprites for a character
const emiliaSprites = sprites.listSprites('emilia');

// Check if a sprite exists
sprites.hasSprite('rem', 'battle-ready'); // true

// Search by franchise
sprites.searchByFranchise('Re:Zero');
// => [{id: 'crusch', ...}, {id: 'emilia', ...}, {id: 'ram', ...}, {id: 'rem', ...}, ...]

// Preload sprites for smooth display
await sprites.preload('lucina-3ds');
```

## Sprite Manifest

The manifest (`sprite-manifest.json`) contains:

- `baseUrl` — root URL prefix for all sprite images
- `imageFormat` — file extension (`png`)
- `characters` — object keyed by folder name, each containing:
  - `displayName` — human-readable character name
  - `franchise` — source franchise
  - `directory` — folder name in the sprites directory
  - `sprites` — array of available sprite filenames (without extension)

## Adding Sprites

1. Place PNG files in the appropriate character folder: `sprites/<character>/<sprite-name>.png`
2. Update `sprite-manifest.json` with the new sprite names
3. Commit and push — GitHub Pages will serve them automatically
