const fs = require('fs');
const path = require('path');

// Yapıyı oluşturacak fonksiyon
function createStructure(rootName) {
  const rootPath = path.join(__dirname, rootName);

  // Kök klasörü oluştur
  fs.mkdirSync(rootPath, { recursive: true });

  // $id klasörünü oluştur
  const idPath = path.join(rootPath, '$id');
  fs.mkdirSync(idPath, { recursive: true });

  // Dosyaları oluştur
  fs.writeFileSync(path.join(rootPath, 'index.tsx'), '// Root index file');
  fs.writeFileSync(path.join(rootPath, 'new.tsx'), '// New file');
  fs.writeFileSync(path.join(idPath, 'index.tsx'), '// ID index file');

  console.log(`Yapı başarıyla oluşturuldu: ${rootName}`);
}

// Komut satırından parametre al
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Lütfen bir kök klasör adı girin!');
  process.exit(1);
}

// Fonksiyonu çağır
createStructure(args[0]);
