import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const packageVersion = packageJson.version;

let gitSha = '';
try {
  gitSha = execSync('git rev-parse --short HEAD', { stdio: 'pipe' }).toString().trim();
} catch (e) {
  console.warn('Failed to retrieve git sha');
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        open: true,
      },

      plugins: [react()],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.PACKAGE_VERSION': JSON.stringify(packageVersion),
        'process.env.GIT_SHA': JSON.stringify(gitSha),
        'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageVersion),
        'import.meta.env.GIT_SHA': JSON.stringify(gitSha)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
