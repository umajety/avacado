const fs = require('fs');
const path = require('path');
const out = path.resolve(__dirname, '..', 'dist');
const files = ['index.html', 'solution.css'];

if (!fs.existsSync(out)) {
  fs.mkdirSync(out, { recursive: true });
}

for (const file of files) {
  const src = path.resolve(__dirname, '..', file);
  const dest = path.join(out, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(path.resolve(__dirname, '..', 'assets'), path.join(out, 'assets'));
