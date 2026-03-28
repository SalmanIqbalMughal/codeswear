const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rights: { type: String, default: 'readonly' }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model('Login', LoginSchema)
// export default mongoose.models.Login || mongoose.model('Login', LoginSchema)