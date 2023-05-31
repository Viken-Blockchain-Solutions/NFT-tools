import { connectToDB } from '@lib/database';
import { NFTCollection } from '@types';
import Collection from '@/models/collection';

export const POST = async ( req: NFTCollection ) => {
    const { address, userId } = await req.json();

    try {
        await connectToDB();
        const collection = await Collection.findOne({ creator: userId });
        
        if (!collection) {
            const newCollection = await Collection.create({
                creator: userId,
                contractAddress: [address]
            });

            await newCollection.save();
            return new Response(JSON.stringify(newCollection), {status: 201});

        } else {
            if (collection.contractAddress.length >= 20) {
                    return new Response(JSON.stringify({ error: 'You can only have up to 20 addresses.' }), {status: 400});
            }
            if (collection.contractAddress.includes(address)) {
                return new Response(JSON.stringify({ error: 'Address already exists' }), {status: 400});
            }
            collection.contractAddress.push(address);
            await collection.save();
            return new Response(JSON.stringify(collection), {status: 200});
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to store collection" }), {status: 500});
    }
}






  /* if (req.method === 'POST') {
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

export { POST as GET, POST as POST }; */