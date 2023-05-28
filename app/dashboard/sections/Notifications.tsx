const Notifications = () => {
    return (
        <section id="notifications" className="container mx-auto mt-8">
            <div className="bg-white p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="text-green-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17.707 8.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L11 13.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <p className="text-gray-600">Congratulations! Your NFT has been sold.</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-red-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 6.293a1 1 0 010 1.414L7.414 12l5.293 5.293a1 1 0 01-1.414 1.414L6 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L4.586 12 .293 7.707A1 1 0 011.707 6.293L6 10.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <p className="text-gray-600">Oops! There was an error processing your payment.</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zm0-1a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm0-5a1 1 0 012 0v1a1 1 0 11-2 0V2z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <p className="text-gray-600">You have a new message from a buyer.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Notifications;
