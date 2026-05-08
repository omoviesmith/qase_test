const { spawnSync } = require('node:child_process');
const path = require('node:path');

const cypressBin = path.join(__dirname, '..', 'node_modules', 'cypress', 'bin', 'cypress');
const env = { ...process.env };
const args = process.argv.slice(2);

delete env.ELECTRON_RUN_AS_NODE;

if (args[0] === 'qase') {
  env.QASE_MODE = 'testops';
  args.splice(0, 1, 'run');
}

const result = spawnSync(process.execPath, [cypressBin, ...args], {
  env,
  stdio: 'inherit',
  shell: false
});

process.exit(result.status ?? 1);
