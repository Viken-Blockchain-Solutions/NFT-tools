'use client'
import { useState } from 'react';
import Stats from './stats';


const SelectedTab = ({ activeTab }: { activeTab: number }) => {
    
    return (
        <div className={activeTab === 1 ? "content content-active" : "content"}>
            <Stats />
        </div>
    )
}

function TabWindow() {
    const [activeTab, setActiveTab] = useState<number>(1);

    const toggleTab = (tab: number) => {
        setActiveTab(tab);
    }

    return (
        <>
            <div className="tabs">
                <a 
                    className={activeTab === 1 ? "tab tab-lg tab-lifted tab-active" : "tab tab-lg"}
                    onClick={() => toggleTab(1)}
                >
                    Collection 1
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
            <SelectedTab activeTab={activeTab} />
        </>
    );
}

export default TabWindow;