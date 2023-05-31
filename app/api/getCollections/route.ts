
import type { NextApiRequest, NextApiResponse } from 'next';
import NFTCollection from '@/models/NFTCollection';

interface RequestBody {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId } = req.body as RequestBody;
    const nftCollection = await NFTCollection.findOne({ creator: userId });
    
    if (!nftCollection) {
      console.log("no collections found")
      return res.json([]);
    }

    return res.json(nftCollection.contractAddress);
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}