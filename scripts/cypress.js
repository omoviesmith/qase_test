const { spawnSync } = require('node:child_process');
const path = require('node:path');

const cypressBin = path.join(__dirname, '..', 'node_modules', 'cypress', 'bin', 'cypress');
const env = { ...process.env };

delete env.ELECTRON_RUN_AS_NODE;

const result = spawnSync(process.execPath, [cypressBin, ...process.argv.slice(2)], {
  env,
  stdio: 'inherit',
  shell: false
});

process.exit(result.status ?? 1);
