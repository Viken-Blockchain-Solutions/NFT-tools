'use client'
import { useEffect, useState } from 'react';
import Stats from './stats';
import { Collection } from 'mongoose';



/* const SelectedContent = (activeContent, collectionData) => {
    
    for (const collection in collectionData) {
        console.log(collection)
    }

    return (
        <div className={activeTab === 1 ? "content content-active" : "content"}>
            <Stats />
        </div>
    )
} */

function TabWindow(dbData: any) {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [activeContent, setActiveContent] = useState<number>(1);
    const [collectionData, setCollectionData] = useState([]);

    useEffect(() => {
        const data = dbData?.dbData;
        const getCollections = () => {
            const col: any = [];

            if (data) {
                data.map(async (collection: any) => {
                        col.push(collection)
                    })
            }
            setCollectionData(col)
        }
        getCollections();

    }, [dbData?.dbData]);

    const toggleTab = (tab: number) => {
        setActiveTab(tab);
        setActiveContent(tab);
        console.log("hey")
    }

    return (
        <>
        {collectionData?.length > 0 && (
            <section>
                <div className="tabs">
                    <a 
                        className={activeTab === 1 ? "tab tab-lg tab-lifted tab-active" : "tab tab-lg"}
                        onClick={() => toggleTab(1)}
                        >
                        Collection {collectionData?.length}
                    </a> 
                    <a 
                        className={activeTab === 2 ? "tab tab-lg tab-lifted tab-active" : "tab tab-lg"}
                        onClick={() => toggleTab(2)}
                        >
                        Collection 2
                    </a> 
                    <a 
                        className={activeTab === 3 ? "tab tab-lg tab-lifted tab-active" : "tab tab-lg"}
                        onClick={() => toggleTab(3)}
                        >
                        Collection 3
                    </a>
                </div>
                  {/*   <SelectedContent activeContent={activeContent} collectionData={collectionData}/> */}
            </section>
            )}
        </>
    );
}

export default TabWindow;