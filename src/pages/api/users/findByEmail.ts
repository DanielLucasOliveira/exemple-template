import { PrismaClient, Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function create(req: NextApiRequest, res: NextApiResponse) {

    const { email } = req.body;


    const response = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    return res.status(200).json(response);


};


