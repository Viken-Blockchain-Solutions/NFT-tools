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
        <h1 className="mt-5 text-5xl leading-[1.15] sm:text-6xl text_left">
            <span className="blue_gradient font-extrabold">{name.toLocaleUpperCase()} Profile</span></h1>
        <p className="text-lg text-stone-400 sm:text-xl max-w-2xl text_left mt-10">{desc}</p>
        <div className="mt-16 prompt_layout">
            {data.map(async (nftCollection: any) => (
              <NFTCollectionCard
                        key={nftCollection._id}
                        data={nftCollection}
                        handleEdit={() => handleEdit && handleEdit(nftCollection)}
                        handleDelete={() => handleDelete && handleDelete(nftCollection)} 
                    /> 
            ))}
        </div>

    </section>
  )
}
