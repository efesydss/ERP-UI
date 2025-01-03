const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Sağ tıklanarak seçilen dizin
const targetDir = process.argv[2];

if (!targetDir) {
  console.error('Hedef klasör belirtilmedi. Lütfen betiği doğru şekilde çalıştırın.');
  process.exit(1);
}

// Kullanıcıdan ENTITY adını almak için readline kullanalım
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Lütfen Route adını girin: ', (entityName) => {
  if (!entityName) {
    console.error('Route adı boş bırakılamaz.');
    rl.close();
    process.exit(1);
  }

  const entityDir = path.join(targetDir, entityName);

  try {
    // Ana klasörü oluştur
    if (!fs.existsSync(entityDir)) {
      fs.mkdirSync(entityDir);
    }

    // $id klasörünü oluştur
    const idDir = path.join(entityDir, '$id');
    if (!fs.existsSync(idDir)) {
      fs.mkdirSync(idDir);
    }

    // index.tsx, new.tsx ve $id/index.tsx dosyalarını oluştur
    fs.writeFileSync(path.join(entityDir, 'index.tsx'), ``);
    fs.writeFileSync(path.join(entityDir, 'new.tsx'), ``);
    fs.writeFileSync(path.join(idDir, 'index.tsx'), ``);

    console.log(`Yapı başarıyla oluşturuldu: ${entityDir}`);
  } catch (err) {
    console.error('Bir hata oluştu:', err);
  } finally {
    rl.close();
  }
});
