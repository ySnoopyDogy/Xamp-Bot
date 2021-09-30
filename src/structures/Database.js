const { Schema, model, connect } = require('mongoose');

connect(process.env.MONGO_URI).then(() => console.log('Connected to database'))

const configSchema = new Schema({
  name: { type: String, default: 'config', unique: true },

});

const config = model('status', configSchema);

module.exports.Config = config