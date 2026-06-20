const DB_NAME = 'FlashfireImageCache';
const DB_VERSION = 1;
const STORE_NAME = 'images';

interface CacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
  expiresAt: number;
}

class ImageCache {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  private async initDB(): Promise<void> {
    if (this.db) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });

    return this.initPromise;
  }

  async getImage(url: string): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    await this.initDB();
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);

      request.onsuccess = () => {
        const entry: CacheEntry | undefined = request.result;
        if (entry && entry.expiresAt > Date.now()) {
          // Return blob URL for instant display
          const blobUrl = URL.createObjectURL(entry.blob);
          resolve(blobUrl);
        } else {
          // Cache expired or not found
          if (entry) {
            // Clean up expired entry
            this.deleteImage(url);
          }
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  }

  async cacheImage(url: string, blob: Blob, ttl: number = 31536000000): Promise<void> {
    if (typeof window === 'undefined') return;

    await this.initDB();
    if (!this.db) return;

    const entry: CacheEntry = {
      url,
      blob,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl, // Default 1 year
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(entry);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteImage(url: string): Promise<void> {
    if (typeof window === 'undefined' || !this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(url);

      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    });
  }

  async preloadImage(url: string): Promise<boolean> {
    if (typeof window === 'undefined' || !window.document || !window.document.createElement) return false;

    // Check if already cached
    const cached = await this.getImage(url);
    if (cached) {
      URL.revokeObjectURL(cached); // Clean up the blob URL we just created
      return true;
    }

    try {
      // Optimize: Use fetch directly for better control and parallel loading
      // This allows multiple images to load simultaneously
      const response = await fetch(url, { 
        mode: 'cors',
        cache: 'default', // Use browser cache
      });
      
      if (!response.ok) {
        return false;
      }

      const blob = await response.blob();
      
      // Cache the blob
      await this.cacheImage(url, blob);
      
      return true;
    } catch (error) {
      // Fallback: Try with Image element if fetch fails (CORS issues)
      try {
        return new Promise((resolve) => {
          const img = document.createElement('img');
          img.crossOrigin = 'anonymous';
          
          const timeout = setTimeout(() => {
            resolve(false);
          }, 10000); // 10 second timeout
          
          img.onload = async () => {
            clearTimeout(timeout);
            try {
              const response = await fetch(url, { mode: 'cors' });
              if (response.ok) {
                const blob = await response.blob();
                await this.cacheImage(url, blob);
              }
              resolve(true);
            } catch (err) {
              resolve(false);
            }
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(false);
          };
          
          img.src = url;
        });
      } catch (fallbackError) {
        return false;
      }
    }
  }

  async preloadImages(urls: string[], batchSize: number = 6): Promise<void> {
    if (typeof window === 'undefined') return;

    // Filter out URLs that are already cached (fast check)
    const uncachedUrls: string[] = [];
    for (const url of urls) {
      const cached = await this.getImage(url);
      if (cached) {
        URL.revokeObjectURL(cached); // Clean up
      } else {
        uncachedUrls.push(url);
      }
    }

    if (uncachedUrls.length === 0) return;

    // Use requestIdleCallback for non-blocking preloading
    const runOnIdle = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(callback, { timeout: 2000 });
      } else {
        setTimeout(callback, 100);
      }
    };

    let currentIndex = 0;

    const loadBatch = async () => {
      const batch = uncachedUrls.slice(currentIndex, currentIndex + batchSize);
      
      // Load all images in batch in parallel for faster loading
      await Promise.allSettled(
        batch.map((url) => 
          this.preloadImage(url).catch(() => {
            // Silently handle individual failures
            return false;
          })
        )
      );

      currentIndex += batchSize;

      if (currentIndex < uncachedUrls.length) {
        runOnIdle(loadBatch);
      }
    };

    runOnIdle(loadBatch);
  }

  async clearExpired(): Promise<void> {
    if (typeof window === 'undefined' || !this.db) return;

    await this.initDB();
    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.openCursor();
      const now = Date.now();

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const entry: CacheEntry = cursor.value;
          if (entry.expiresAt <= now) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => resolve();
    });
  }
}

// Singleton instance - only create on client side when accessed
let imageCacheInstance: ImageCache | null = null;

// No-op object for SSR - created outside of any function to avoid issues
const createNoOpCache = (): ImageCache => ({
  getImage: async () => null,
  cacheImage: async () => {},
  deleteImage: async () => {},
  preloadImage: async () => false,
  preloadImages: async () => {},
  clearExpired: async () => {},
} as unknown as ImageCache);

const noOpImageCache = createNoOpCache();

class ImageCacheWrapper {
  private getInstance(): ImageCache {
    // Always check window first - never access during SSR
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return noOpImageCache;
    }
    
    if (!imageCacheInstance) {
      try {
        imageCacheInstance = new ImageCache();
        // Clean up expired entries on load (non-blocking)
        setTimeout(() => {
          imageCacheInstance?.clearExpired().catch(() => {
            // Silently fail cleanup
          });
        }, 1000);
      } catch (error) {
        console.warn('Failed to initialize ImageCache:', error);
        return noOpImageCache;
      }
    }
    
    return imageCacheInstance;
  }

  async getImage(url: string): Promise<string | null> {
    return this.getInstance().getImage(url);
  }

  async cacheImage(url: string, blob: Blob, ttl?: number): Promise<void> {
    return this.getInstance().cacheImage(url, blob, ttl);
  }

  async deleteImage(url: string): Promise<void> {
    return this.getInstance().deleteImage(url);
  }

  async preloadImage(url: string): Promise<boolean> {
    return this.getInstance().preloadImage(url);
  }

  async preloadImages(urls: string[], batchSize?: number): Promise<void> {
    return this.getInstance().preloadImages(urls, batchSize);
  }

  async clearExpired(): Promise<void> {
    return this.getInstance().clearExpired();
  }
}

// Export wrapper instance instead of Proxy
export const imageCache = new ImageCacheWrapper();
