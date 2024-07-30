import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  // dev specific config
  if (command === 'serve') {
    return {
      plugins: [tsconfigPaths(), react()],
      build: {
        outDir: './build',
      },
      server: {
        host: true,
        open: false,
        port: +process.env.VITE_PORT!,
      },
    };
  } else {
    // command === 'build'
    return {
      // build specific config
    };
  }
});
