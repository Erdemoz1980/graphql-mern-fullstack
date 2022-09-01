import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed']
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;