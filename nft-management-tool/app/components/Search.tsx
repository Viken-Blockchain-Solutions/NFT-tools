import { getCollectionSalesData } from "@/lib/blockchain";

const SearchForm = () => {

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const collectionAddress = e.target.collectionAddress.value;
    const collectionSalesData = await getCollectionSalesData(collectionAddress);
    console.log(collectionSalesData);
  }

  return (
    <section className="container p-12 rounded-lg bg-gray-900">
      <div className="mx-5">
        <form>
          <div className="mb-5">
            <label htmlFor="collectionAddress" className="form-label">Collection Address:</label>
            <input type="text" className="form-control mx-5 rounded-sm px-1.5 text-gray-700" id="collectionAddress" placeholder="Enter collection address" />
          </div>
          <button className="bg-blue-500 rounded-sm p-2 hover:bg-blue-400" >
          Get Information
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;