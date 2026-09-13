import { comparePassword, generateToken, normalizePhone } from '@/helper/auth';

import { phoneRegex } from '@/helper/regex';

import dbConnect from '@/lib/dbConnect';

import User from '@/models/User';

export default async function handler(req, res) {
    // check request method

    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'authMessages.methodNotAllowed',
        });
    }

    try {
        await dbConnect();

        const { phone, password } = req.body;

        // required validation

        if (!phone || !password) {
            return res.status(400).json({
                message: 'authMessages.required.phonePassword',
            });
        }

        // normalize phone number

        const normalizedPhone = normalizePhone(phone);

        // phone validation

        if (!phoneRegex.test(normalizedPhone)) {
            return res.status(400).json({
                message: 'authMessages.invalid.phonePassword',
            });
        }

        // find user

        const user = await User.findOne({
            phone: normalizedPhone,
        });

        // security: don't reveal if user exists

        if (!user) {
            return res.status(401).json({
                message: 'authMessages.login.invalidCredentials',
            });
        }

        // compare password

        const verifyPassword = await comparePassword(
            password,

            user.password
        );

        if (!verifyPassword) {
            return res.status(401).json({
                message: 'authMessages.login.invalidCredentials',
            });
        }

        // generate jwt token

        const token = generateToken({
            id: user._id,

            name: user.name,

            phone: user.phone,

            role: user.role,
        });

        return res.status(200).json({
            message: 'authMessages.login.success',

            data: {
                token,

                info: {
                    name: user.name,

                    phone: user.phone,

                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'authMessages.server.error',
        });
    }
}
