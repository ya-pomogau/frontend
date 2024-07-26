import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
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
