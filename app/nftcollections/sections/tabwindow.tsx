import { useEffect, useState } from 'react';
import Stats from './stats';
import { INftCollection } from '@models/nftCollection';


type DbData = {
    dbData: INftCollection[];
};

function TabWindow({ dbData }: DbData) {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [collectionData, setCollectionData] = useState<INftCollection[]>([]);

    useEffect(() => {
        const data = dbData;
        const getCollections = () => {
            const col: INftCollection[] = [];

            if (data) {
                data.map((nftcollection: INftCollection) => {
                    col.push(nftcollection);
                });
            }

            setCollectionData(col);
        };
        getCollections();
    }, [dbData]);

    const toggleTab = (tab: number) => {
        setActiveTab(tab);
    };

    return (
        <>
        {collectionData?.length > 0 && (
            <section>
                <div className='flex flex-row'>
                    {collectionData?.map((collection: INftCollection, index: number) => (
                        <a
                            key={index}
                            className={activeTab === index ? "tab tab-lg tab-lifted tab-active" : "tab tab-lg"}
                            onClick={() => toggleTab(index)}
                        >
                            <span className='font-satoshi text-sm'>{collection.name}</span>
                        </a>
                    ))}
                </div>
                <div>
                    {activeTab < collectionData.length && 
                        <Stats collectionData={collectionData[activeTab]} />
                    }
                </div>
            </section>
        )}
        </>
    );
}

export default TabWindow;
