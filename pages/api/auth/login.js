import { comparePassword, generateToken, normalizePhone } from '@/helper/auth';
import { passwordRegex, phoneRegex } from '@/helper/regex';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed',
        });
    }

    try {
        await dbConnect();

        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                message: 'phone and password are required',
            });
        }

        const normalizedPhone = normalizePhone(phone);

        if (!phoneRegex.test(normalizedPhone) || !passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'phone number or password is invalid',
            });
        }

        const user = await User.findOne({
            phone: normalizedPhone,
        });

        if (!user) {
            return res.status(400).json({
                message: 'user does not exist',
            });
        }

        const verifyPass = await comparePassword(password, user.password);

        if (!verifyPass) {
            return res.status(400).json({
                message: 'phone number or password is invalid',
            });
        }

        const token = generateToken({
            id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
        });

        return res.status(200).json({
            message: 'login successfully',

            data: {
                token,

                info: {
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
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
