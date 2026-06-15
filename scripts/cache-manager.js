#!/usr/bin/env node

/**
 * Cache Management Utility for Next.js Development
 * Provides automated cache clearing and development optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CACHE_DIRS = [
  '.next',
  'node_modules/.cache',
  '.next/cache',
  '.next/static',
];

const CACHE_FILES = [
  '.next/trace',
  '.next/build-manifest.json',
  '.next/app-build-manifest.json',
];

class CacheManager {
  constructor() {
    this.verbose = process.argv.includes('--verbose') || process.argv.includes('-v');
  }

  log(message, force = false) {
    if (this.verbose || force) {
      console.log(`[CacheManager] ${message}`);
    }
  }

  async clearDirectory(dirPath) {
    const fullPath = path.join(PROJECT_ROOT, dirPath);
    if (fs.existsSync(fullPath)) {
      try {
        await fs.promises.rm(fullPath, { recursive: true, force: true });
        this.log(`Cleared directory: ${dirPath}`);
        return true;
      } catch (error) {
        this.log(`Failed to clear ${dirPath}: ${error.message}`, true);
        return false;
      }
    }
    return false;
  }

  async clearFile(filePath) {
    const fullPath = path.join(PROJECT_ROOT, filePath);
    if (fs.existsSync(fullPath)) {
      try {
        await fs.promises.unlink(fullPath);
        this.log(`Cleared file: ${filePath}`);
        return true;
      } catch (error) {
        this.log(`Failed to clear ${filePath}: ${error.message}`, true);
        return false;
      }
    }
    return false;
  }

  async clearAll() {
    this.log('Starting comprehensive cache clearing...', true);
    
    let clearedCount = 0;
    
    // Clear cache directories
    for (const dir of CACHE_DIRS) {
      if (await this.clearDirectory(dir)) {
        clearedCount++;
      }
    }
    
    // Clear cache files
    for (const file of CACHE_FILES) {
      if (await this.clearFile(file)) {
        clearedCount++;
      }
    }
    
    // Clear npm cache
    try {
      execSync('npm cache clean --force', { cwd: PROJECT_ROOT, stdio: 'pipe' });
      this.log('Cleared npm cache');
      clearedCount++;
    } catch (error) {
      this.log(`Failed to clear npm cache: ${error.message}`, true);
    }
    
    this.log(`Cache clearing complete. Cleared ${clearedCount} items.`, true);
    return clearedCount;
  }

  async clearBasic() {
    this.log('Starting basic cache clearing...', true);
    
    let clearedCount = 0;
    
    // Clear essential directories only
    const essentialDirs = ['.next', 'node_modules/.cache'];
    for (const dir of essentialDirs) {
      if (await this.clearDirectory(dir)) {
        clearedCount++;
      }
    }
    
    this.log(`Basic cache clearing complete. Cleared ${clearedCount} items.`, true);
    return clearedCount;
  }

  async watch() {
    this.log('Starting cache watch mode...', true);
    this.log('Watching for file changes that may require cache clearing...', true);
    
    const watchPaths = [
      'next.config.ts',
      'next.config.js',
      'package.json',
      'tsconfig.json',
      '.env',
      '.env.local',
      '.env.development',
    ];
    
    const watchers = watchPaths.map(filePath => {
      const fullPath = path.join(PROJECT_ROOT, filePath);
      if (fs.existsSync(fullPath)) {
        return fs.watch(fullPath, async (eventType) => {
          if (eventType === 'change') {
            this.log(`Configuration file changed: ${filePath}`, true);
            
            // Auto-clear cache for critical files
            if (['next.config.ts', 'next.config.js', 'package.json'].includes(filePath)) {
              this.log('Auto-clearing cache due to critical configuration change...', true);
              await this.clearBasic();
              this.log('Cache cleared automatically. Please restart your dev server.', true);
            } else {
              this.log('Consider running cache:clear if you experience issues', true);
            }
          }
        });
      }
      return null;
    }).filter(Boolean);
    
    // Keep the process alive
    process.on('SIGINT', () => {
      this.log('Stopping cache watcher...', true);
      watchers.forEach(watcher => watcher.close());
      process.exit(0);
    });
  }

  async autoInvalidate() {
    this.log('Starting automatic cache invalidation...', true);
    
    // Clear cache every hour in development
    const interval = setInterval(async () => {
      if (process.env.NODE_ENV === 'development') {
        this.log('Performing scheduled cache clearing...', true);
        await this.clearBasic();
      }
    }, 60 * 60 * 1000); // 1 hour
    
    // Clear on process exit
    process.on('exit', () => {
      clearInterval(interval);
    });
    
    return interval;
  }

  showUsage() {
    console.log(`
Cache Manager Usage:
  node scripts/cache-manager.js [command] [options]

Commands:
  clear-all       Clear all caches (comprehensive)
  clear-basic     Clear basic caches (.next, node_modules/.cache)
  watch           Watch for configuration changes with auto-clear
  auto-invalidate Start automatic cache invalidation timer
  help            Show this help message

Options:
  --verbose, -v   Show detailed output

Examples:
  node scripts/cache-manager.js clear-all --verbose
  node scripts/cache-manager.js clear-basic
  node scripts/cache-manager.js watch
  node scripts/cache-manager.js auto-invalidate

Development Tips:
  - Use 'watch' mode while developing to auto-clear on config changes
  - Run 'clear-basic' if you experience stale module issues
  - Use 'clear-all' for comprehensive cache reset
    `);
  }
}

async function main() {
  const manager = new CacheManager();
  const command = process.argv[2];

  switch (command) {
    case 'clear-all':
      await manager.clearAll();
      break;
    case 'clear-basic':
      await manager.clearBasic();
      break;
    case 'watch':
      await manager.watch();
      break;
    case 'auto-invalidate':
      await manager.autoInvalidate();
      manager.log('Auto-invalidation started. Press Ctrl+C to stop.', true);
      // Keep process alive
      await new Promise(() => {});
      break;
    case 'help':
    case '--help':
    case '-h':
      manager.showUsage();
      break;
    default:
      if (!command) {
        await manager.clearBasic();
      } else {
        console.log(`Unknown command: ${command}`);
        manager.showUsage();
        process.exit(1);
      }
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Cache manager error:', error);
    process.exit(1);
  });
}

module.exports = CacheManager;