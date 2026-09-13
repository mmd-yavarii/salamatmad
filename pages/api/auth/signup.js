import { generateToken, hashPassword, normalizePhone } from '@/helper/auth';
import { passwordRegex, phoneRegex } from '@/helper/regex';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(400).json({ name: 'bad request' });
    }

    try {
        await dbConnect();

        const { name, phone, password } = req.body;

        // verification
        if (!name || !phone || !password) {
            return res.status(400).json({
                message: 'bad request',
            });
        }

        const normalizedPhone = normalizePhone(phone);

        if (!phoneRegex.test(normalizedPhone) || !passwordRegex.test(password)) {
            return res.status(400).json({ message: 'phone number or password is invalid' });
        }

        const userExistence = await User.findOne({ phone: normalizedPhone });

        if (userExistence) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // create
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            phone: normalizedPhone,
            password: hashedPassword,
        });

        const token = generateToken({ id: user._id, name: user.name, phone: user.phone, role: user.role });
        // return res.status(201).json({ message: 'user created successfully', data: { token, info: { name, phone } } });
        return res.status(201).json({
            message: 'user created successfully',
            data: {
                token,
                info: {
                    name,
                    phone,
                },
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: 'server error',
        });
    }
}
