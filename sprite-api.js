/**
 * Convergence Sprite API
 * Loads and manages character sprites for visual novel games.
 *
 * Usage:
 *   const sprites = new SpriteAPI();
 *   await sprites.load();
 *   const url = sprites.getUrl('emilia', 'happy');
 *   const characters = sprites.listCharacters();
 */

class SpriteAPI {
  constructor(manifestUrl) {
    this.manifestUrl = manifestUrl || 'https://zaraz1qe.github.io/sprites/sprite-manifest.json';
    this.manifest = null;
    this._cache = new Map();
  }

  /** Load the sprite manifest. Must be called before other methods. */
  async load() {
    if (this.manifest) return this.manifest;
    const res = await fetch(this.manifestUrl);
    if (!res.ok) throw new Error(`Failed to load sprite manifest: ${res.status}`);
    this.manifest = await res.json();
    return this.manifest;
  }

  _ensureLoaded() {
    if (!this.manifest) throw new Error('Manifest not loaded. Call await sprites.load() first.');
  }

  /** Get the full URL for a character sprite. */
  getUrl(characterId, spriteName) {
    this._ensureLoaded();
    const char = this.manifest.characters[characterId];
    if (!char) throw new Error(`Unknown character: ${characterId}`);
    const dir = char.directory || characterId;
    return `${this.manifest.baseUrl}/${dir}/${spriteName}.${this.manifest.imageFormat}`;
  }

  /** Get character info by ID. Returns null if not found. */
  getCharacter(characterId) {
    this._ensureLoaded();
    return this.manifest.characters[characterId] || null;
  }

  /** List all character IDs. */
  listCharacters() {
    this._ensureLoaded();
    return Object.keys(this.manifest.characters);
  }

  /** List all characters with their display info. */
  listCharacterDetails() {
    this._ensureLoaded();
    return Object.entries(this.manifest.characters).map(([id, char]) => ({
      id,
      displayName: char.displayName,
      franchise: char.franchise,
      spriteCount: char.sprites.length
    }));
  }

  /** List all sprite names for a character. */
  listSprites(characterId) {
    this._ensureLoaded();
    const char = this.manifest.characters[characterId];
    if (!char) throw new Error(`Unknown character: ${characterId}`);
    return [...char.sprites];
  }

  /** Check if a character has a specific sprite. */
  hasSprite(characterId, spriteName) {
    this._ensureLoaded();
    const char = this.manifest.characters[characterId];
    if (!char) return false;
    return char.sprites.includes(spriteName);
  }

  /**
   * Preload sprite images into browser cache.
   * @param {string} characterId - Character to preload
   * @param {string[]} [spriteNames] - Specific sprites to preload (default: all)
   * @returns {Promise<HTMLImageElement[]>}
   */
  async preload(characterId, spriteNames) {
    this._ensureLoaded();
    const names = spriteNames || this.listSprites(characterId);
    return Promise.all(names.map(name => {
      const url = this.getUrl(characterId, name);
      if (this._cache.has(url)) return this._cache.get(url);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this._cache.set(url, img);
          resolve(img);
        };
        img.onerror = () => reject(new Error(`Failed to load: ${url}`));
        img.src = url;
      });
    }));
  }

  /**
   * Get a random sprite name for a character.
   * @param {string} characterId
   * @returns {string}
   */
  randomSprite(characterId) {
    const sprites = this.listSprites(characterId);
    return sprites[Math.floor(Math.random() * sprites.length)];
  }

  /**
   * Search for characters by franchise name (case-insensitive partial match).
   * @param {string} query
   * @returns {Array<{id: string, displayName: string, franchise: string}>}
   */
  searchByFranchise(query) {
    this._ensureLoaded();
    const q = query.toLowerCase();
    return Object.entries(this.manifest.characters)
      .filter(([, char]) => char.franchise.toLowerCase().includes(q))
      .map(([id, char]) => ({ id, displayName: char.displayName, franchise: char.franchise }));
  }
}

// Export for both module and script tag usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpriteAPI;
}
