const db = require('../config/db');

const Contact = {
  // Create a new contact message
  async create(contactData) {
    const { name, email, subject, message } = contactData;
    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [name, email, subject, message]);
    return result;
  },

  // Fetch all contact messages ordered by newest first
  async findAll() {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const [rows] = await db.query(query);
    return rows;
  },

  // Find a single contact message by ID
  async findById(id) {
    const query = 'SELECT * FROM contacts WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0] || null;
  },

  // Delete a contact message by ID
  async deleteById(id) {
    const query = 'DELETE FROM contacts WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Contact;
