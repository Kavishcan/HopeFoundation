const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

class Volunteer {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.skills = data.skills || '';
    this.availability = data.availability || '';
    this.message = data.message || '';
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const db = readDb();
    if (!db.volunteers) db.volunteers = [];
    
    const volunteerData = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      skills: this.skills,
      availability: this.availability,
      message: this.message,
      status: this.status,
      createdAt: this.createdAt
    };

    db.volunteers.push(volunteerData);
    writeDb(db);
    return this;
  }

  static async find() {
    const db = readDb();
    return (db.volunteers || []).map(v => new Volunteer(v));
  }

  static async findOne(query) {
    const db = readDb();
    const volunteer = (db.volunteers || []).find(v => {
      for (let key in query) {
        if (v[key] !== query[key]) return false;
      }
      return true;
    });
    return volunteer ? new Volunteer(volunteer) : null;
  }

  static async countDocuments() {
    const db = readDb();
    return (db.volunteers || []).length;
  }
}

module.exports = Volunteer;
