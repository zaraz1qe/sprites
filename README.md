# Convergence — Visual Novel Sprite Repository

Character sprite assets for the **Convergence** AI-driven visual novel artifact, served via GitHub Pages.

## URL Pattern

Sprites are publicly accessible at:

```
https://zaraz1qe.github.io/sprites/sprites/<character>/<expression>.png
```

**Examples:**
- `https://zaraz1qe.github.io/sprites/sprites/lucina/neutral.png`
- `https://zaraz1qe.github.io/sprites/sprites/tharja/blush.png`
- `https://zaraz1qe.github.io/sprites/sprites/corrin/surprised.png`

## Repository Structure

```
/
├── sprite-manifest.json        # Runtime manifest — maps characters to expressions
├── sprites/
│   ├── lucina/
│   │   ├── neutral.png
│   │   ├── happy.png
│   │   ├── angry.png
│   │   └── ...
│   ├── tharja/
│   │   └── ...
│   ├── camilla/
│   ├── corrin/
│   ├── kagero/
│   ├── kronya/
│   ├── gullveig/
│   ├── filament/
│   ├── cordelia/
│   ├── shirma/
│   ├── ariael/
│   ├── midori/
│   ├── konata/
│   ├── makima/
│   ├── clan-witch/
│   ├── crusch/
│   ├── supura/
│   └── zero/
├── index.html                  # GitHub Pages root (enables serving)
└── README.md
```

## Characters (18)

| Character   | Franchise                          | Folder        |
|-------------|------------------------------------|---------------|
| Lucina      | Fire Emblem Awakening              | `lucina`      |
| Tharja      | Fire Emblem Awakening              | `tharja`      |
| Camilla     | Fire Emblem Fates                  | `camilla`     |
| Corrin      | Fire Emblem Fates                  | `corrin`      |
| Kagero      | Fire Emblem Fates                  | `kagero`      |
| Kronya      | Fire Emblem Three Houses           | `kronya`      |
| Gullveig    | Fire Emblem Heroes                 | `gullveig`    |
| Filament    | Ar Tonelico Qoga                   | `filament`    |
| Cordelia    | Ken to Mahou to Gakuen Mono.       | `cordelia`    |
| Shirma      | Mugen Souls Z                      | `shirma`      |
| Ariael      | The Awakened Fate Ultimatum        | `ariael`      |
| Midori      | Shin Megami Tensei Devil Survivor  | `midori`      |
| Konata      | Lucky Star                         | `konata`      |
| Makima      | Chainsaw Man                       | `makima`      |
| Clan Witch  | Indivisible                        | `clan-witch`  |
| Crusch      | Re:Zero                            | `crusch`      |
| Supura      | Mugen Souls Z                      | `supura`      |
| Zero        | Dengeki Bunko Fighting Climax      | `zero`        |

## Expressions

Each character has 8 expression variants. All characters share a common base set:

- `neutral` — default resting expression
- `happy` — smiling, cheerful
- `angry` — frustrated, upset
- `sad` — downcast, melancholy
- `surprised` — shocked, wide-eyed
- `blush` — embarrassed, flustered

Plus 2 character-specific expressions (see `sprite-manifest.json` for details).

## Sprite Manifest

The artifact fetches `sprite-manifest.json` at runtime to discover available expressions per character. The manifest includes:

- `baseUrl` — root URL prefix for all sprite images
- `imageFormat` — file extension (`png`)
- `characters` — object keyed by folder name, each containing:
  - `displayName` — human-readable character name
  - `franchise` — source franchise
  - `expressions` — array of available expression filenames (without extension)

### Usage in the Artifact

```javascript
const manifest = await fetch('https://zaraz1qe.github.io/sprites/sprite-manifest.json').then(r => r.json());

// Build sprite URL
const getSpriteUrl = (character, expression) =>
  `${manifest.baseUrl}/${character}/${expression}.${manifest.imageFormat}`;

// Example
const url = getSpriteUrl('lucina', 'happy');
// => "https://zaraz1qe.github.io/sprites/sprites/lucina/happy.png"
```

## Adding Sprites

1. Place PNG files in the appropriate character folder: `sprites/<character>/<expression>.png`
2. Update `sprite-manifest.json` if adding new expressions
3. Commit and push — GitHub Pages will serve them automatically

## Setup

GitHub Pages must be enabled on this repository:
- **Settings → Pages → Source**: Deploy from branch
- **Branch**: `main` (or `master`), root `/`
