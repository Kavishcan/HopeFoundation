const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'user';
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const db = readDb();
    const existingUserIndex = db.users.findIndex(u => u.id === this.id);
    
    const userData = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt
    };

    if (existingUserIndex >= 0) {
      db.users[existingUserIndex] = userData;
    } else {
      db.users.push(userData);
    }

    writeDb(db);
    return this;
  }

  static async findOne(query) {
    const db = readDb();
    const user = db.users.find(u => {
      for (let key in query) {
        if (u[key] !== query[key]) return false;
      }
      return true;
    });
    return user ? new User(user) : null;
  }

  static async find() {
    const db = readDb();
    const users = db.users.map(u => new User(u));
    // Add a mock select method to the array to satisfy the controller
    users.select = function() { return this; }; 
    return users;
  }

  static async countDocuments() {
    const db = readDb();
    return db.users.length;
  }
  
  // Helper to match mongoose behavior
  static async findById(id) {
    const db = readDb();
    const user = db.users.find(u => u.id === id);
    return user ? new User(user) : null;
  }
}

module.exports = User;
