export const PriceCard = ({usdPrice, oldPrice} :  {usdPrice: number, oldPrice: number}) => {
  return (
    <div className="flex flex-row justify-center">
          <div className="w-fit h-auto mx-5 bg-white rounded-xl text-center">
            <div className="p-3 font-semibold text-gray-700">
              <h4>ETH Price</h4>
            </div>
            <div className=" mb-5 font-semibold">
              <h4 className={usdPrice < oldPrice ? 'text-red-500 opacity-90' : 'text-green-500 opacity-90'}><span className="text-gray-700 font-semibold">$ </span>{usdPrice}</h4>
            </div>
          </div>
    </div>
  )
}
