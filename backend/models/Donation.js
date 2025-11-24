const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

class Donation {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.userId = data.userId; // Link to user
    this.userName = data.userName; // Snapshot of user name
    this.amount = data.amount;
    this.date = data.date || new Date();
  }

  async save() {
    const db = readDb();
    if (!db.donations) db.donations = [];
    
    const donationData = {
      id: this.id,
      userId: this.userId,
      userName: this.userName,
      amount: this.amount,
      date: this.date
    };

    db.donations.push(donationData);
    writeDb(db);
    return this;
  }

  static async find() {
    const db = readDb();
    return (db.donations || []).map(d => new Donation(d));
  }

  static async countDocuments() {
    const db = readDb();
    return (db.donations || []).length;
  }
  
  static async aggregateTotal() {
    const db = readDb();
    return (db.donations || []).reduce((acc, curr) => acc + Number(curr.amount), 0);
  }
}

module.exports = Donation;
