import Link from "next/link"



const AddressForm = async ({ type, collection, setCollection, submitting, handleSubmit }: {type: string, collection: any, setCollection: any, submitting: boolean, handleSubmit: any}) => {
  return (
    <section className="w-full max-x-full flex-start flex-col">
      <h1 className="head_text text_left"><span>Store your collection</span></h1>

      <p className="desc text-left max-w-md">
        Store your collection address to get access to the dashboard and start tracking your collection.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-bold text-base text-grey-700">Your Collection Address</span>
            <input 
              value={collection}
              onChange={(e) => setCollection({ ...collection, 
                address: e.target.value })}
                placeholder="Enter collection address"
                required
                className="form_input"
              />
         </label>
         <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button 
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-md" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
         </div>
      </form> 
    </section>
  )
}

export default AddressForm