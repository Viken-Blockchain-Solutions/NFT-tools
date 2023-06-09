import NFTCollectionCard from "@/components/cards/NFTCollectionCard";

export const Profile = ( {
    name, 
    desc, 
    data, 
    handleEdit, 
    handleDelete
}: {
    name: string, 
    desc: string, 
    data: any, 
    handleEdit: any, 
    handleDelete: any
}) => {

  return ( 
    <section className="w-full">
        <h1 className="head_text text_left">
            <span className="blue_gradient"></span>{name} Profile</h1>
        <p className="desc text_left mt-10">{desc}</p>
        <div className="mt-16 prompt_layout">
            {data.map((nftCollections: any) => (
                nftCollections.map((nftCollection: any) => (
                    <NFTCollectionCard
                        key={nftCollection._id}
                        data={nftCollection}
                        handleEdit={() => handleEdit && handleEdit(nftCollection)}
                        handleDelete={() => handleDelete && handleDelete(nftCollection)} 
                    />
                ))
            ))}
        </div>

    </section>
  )
}
