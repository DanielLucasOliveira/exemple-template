import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    try {
        // Encontre o usuário pelo e-mail
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // Verifique se o usuário foi encontrado e se a senha corresponde
        if (user && await bcrypt.compare(password, user.password)) {
            // Remova o campo password da resposta
            const { password, ...userWithoutPassword } = user;
            return res.status(200).json({ success: true, user: userWithoutPassword });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
