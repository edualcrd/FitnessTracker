import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const User = mongoose.model('User', userSchema);

const UserModel = {
    async create(user) {
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        });
        await newUser.save();
        // Return an object that has an id property or similar, to match expected result.
        // The controller likely uses result.insertId for mySQL. Let's return the user.
        return newUser;
    },

    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    },

    async findById(id) {
        const user = await User.findById(id).select('username email created_at avatar');
        return user;
    }
};

export default UserModel;
export { User };