const { Schema, model, connect } = require('mongoose');

connect(process.env.MONGO_URI).then(() => console.log('Connected to database'))

const configSchema = new Schema({
  name: { type: String, default: 'config', unique: true },
  messageTicketBR: String,
  messageTicketUS: String,
  messageTicketCategory: String,
  messageTicketLog: String,
  messageLang: String,
  messageInviter: String,
  roleLangBR: String,
  roleLangUS: String,
  roleAdministrator: String,
  validation: { type: Number, default: 0 },
  financial: { type: Number, default: 0 },
  technical: { type: Number, default: 0 },
  invites: { type: Array, default: [] }
});

const config = model('configs', configSchema);

module.exports = config