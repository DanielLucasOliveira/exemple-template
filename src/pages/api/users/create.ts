import { PrismaClient, Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function create(req: NextApiRequest, res: NextApiResponse) {

    const {email, username, imageUrl, password, confirmPassword} = req.body;

    if(password === confirmPassword) {
        const response = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: password,
                image: imageUrl
            }
        })
        return res.status(200).json(response);
    }

};


