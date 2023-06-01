const StoredCollectionsCard = ({ address }: {address: string}) => {
  
  return (
    <>
        <li className="mx-2">
            <p className="font-satoshi text-gray-700">{address}</p>
        </li>
    </>
  )
};

export default StoredCollectionsCard;