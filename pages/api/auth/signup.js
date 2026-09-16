import { generateToken, hashPassword, normalizePhone } from '@/helper/auth';
import { passwordRegex, phoneRegex } from '@/helper/regex';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'authMessages.methodNotAllowed',
        });
    }

    try {
        await dbConnect();

        const { name, phone, password } = req.body;

        if (!name || !phone || !password) {
            return res.status(400).json({
                message: 'authMessages.required.namePhonePassword',
            });
        }

        const normalizedPhone = normalizePhone(phone);

        if (!phoneRegex.test(normalizedPhone) || !passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'authMessages.invalid.phonePassword',
            });
        }

        const userExistence = await User.findOne({
            phone: normalizedPhone,
        });

        if (userExistence) {
            return res.status(400).json({
                message: 'authMessages.signup.userExists',
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            phone: normalizedPhone,
            password: hashedPassword,
        });

        const token = generateToken({
            id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
        });

        return res.status(201).json({
            message: 'authMessages.signup.success',

            data: {
                token,
                info: {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                },
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: 'authMessages.server.error',
        });
    }
}
