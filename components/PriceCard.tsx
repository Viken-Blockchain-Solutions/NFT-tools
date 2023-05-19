export const PriceCard = ({usdPrice} :  {usdPrice: number}) => {
  return (
    <div className="flex flex-row justify-center m-5">
          <div className="w-fit h-auto mx-5 bg-white rounded-xl text-center">
            <div className="p-3 font-semibold text-gray-700">
              <h4>ETH Price</h4>
            </div>
            <div className=" mb-5 font-semibold">
              <h4 className='text-green-600 opacity-90'><span className="text-gray-700 font-semibold">$ </span>{usdPrice}</h4>
            </div>
          </div>
    </div>
  )
}
