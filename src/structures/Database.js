const { Schema, model, connect } = require('mongoose');

connect(process.env.MONGO_URI).then(() => console.log('Connected to database'))

const configSchema = new Schema({
  name: { type: String, default: 'config', unique: true },
  messageTicketBR: String,
  messageTicketUS: String,
  messageTicketCategory: String,
  messageTicketLog: String,
  messageLangBR: String,
  messageLangUS: String,
  roleLangBR: String,
  roleLangUS: String,
  roleAdministrator: String,
});

const config = model('configs', configSchema);

module.exports = config