import type { NextApiRequest, NextApiResponse } from 'next';
import NFTCollection from '@/models/NFTCollection';

interface RequestBody {
  userId: string;
  address: string;
}

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {

  if (req.method === 'POST') {
    const { userId, address } = req.body as RequestBody;
    let nftCollection = await NFTCollection.findOne({ creator: userId });

    if (!nftCollection) {
      nftCollection = await NFTCollection.create({
        creator: userId,
        contractAddress: [address]
      });
    } else {
      if (nftCollection.contractAddress.length >= 20) {
        return res.status(400).json({ error: 'You can only have up to 20 addresses.' });
      }
      if (nftCollection.contractAddress.includes(address)) {
        return res.status(400).json({ error: 'This address already exists.' });
      }
      nftCollection.contractAddress.push(address);
      await nftCollection.save();
    }

    return res.json(nftCollection);
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export { handler as GET, handler as POST };