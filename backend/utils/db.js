const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

const readDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], donations: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDb, writeDb };
