import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const defaultConfig = {
  plugins: [tsconfigPaths(), react()],
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  // process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));

  // dev specific config
  if (command === 'serve') {
    return {
      ...defaultConfig,

      test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
      },
      server: {
        open: Boolean(process.env.VITE_OPEN),
        host: true,
        port: +process.env.VITE_PORT!,
      },
    };
  } else {
    // command === 'build'
    return {
      ...defaultConfig,
      build: {
        outDir: './build',
      },
    };
  }
});
