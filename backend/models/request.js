const mongoose =require('mongoose') ;


const requestSchema = new mongoose.Schema({
    senderEmail: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'refused'], default: 'pending' },
  }, { timestamps: true });
  
  const Request = mongoose.model('Request', requestSchema);

module.exports = Request;