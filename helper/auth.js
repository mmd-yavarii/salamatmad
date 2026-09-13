import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

async function hashPassword(value) {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
}

async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

function normalizePhone(phone) {
    if (phone.startsWith('+98')) {
        return '0' + phone.slice(3);
    }
    if (phone.startsWith('98')) {
        return '0' + phone.slice(2);
    }
    return phone;
}

function generateToken(payload) {
    const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return token;
}

export { hashPassword, comparePassword, generateToken, normalizePhone };
