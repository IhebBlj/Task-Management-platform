const mongoose =require('mongoose') ;

const { Schema } = mongoose;

const noticeSchema = new Schema(
  {
    text: { type: String }, 
    task: { type: Schema.Types.ObjectId, ref: 'Task' }, 
    notiType: { type: String, default: 'alert', enum: ['alert', 'invitaion','message','project'] }, // 
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);




module.exports= Notice;
