import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  descripton: { type: String, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'] },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Client',
    required: true,
  },
  
});

const Project = mongoose.model('Project', projectSchema);

export default Project;