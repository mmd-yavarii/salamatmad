import mongoose from 'mongoose';

const supportMessageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        chatId: {
            type: String,
            required: true,
            index: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },

        type: {
            type: String,
            enum: ['user', 'answer'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

supportMessageSchema.index({ userId: 1, chatId: 1, createdAt: 1 });

export default mongoose.models.SupportMessage || mongoose.model('SupportMessage', supportMessageSchema);
