import NFTCollection from "@/models";

const collections = async (req, res) => {
    const { collection } = req.params;
    const { method } = req;
    
    switch (method) {
        case 'GET':
        // get data from collection
        
        break;
        case 'POST':
        // create new data in collection
        break;
        case 'PUT':
        // update data in collection
        break;
        case 'DELETE':
        // delete data from collection
        break;
        default:
        res.status(405).end();
        break;
    }

}

export default collections;
