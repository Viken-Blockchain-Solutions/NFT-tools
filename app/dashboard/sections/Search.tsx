const Search = () => {
    return (
        <section className='feed'>
            <form action="" className="relative w-full flex-center">
                <input
                    type="text"
                    className="search_input peer"
                    placeholder="Search for an address or a collection name"
                    value={""}
                    onChange={() => { }}
                    required
                />
            </form>
        </section>
    )
}

export default Search;