import React, { FC, useState } from 'react';
import Tab from './Tab';

interface TabInfo {
    label: string;
    content: React.ReactNode;
    defaultTab?: number;
}

interface TabsProps {
    tabs: TabInfo[];
    defaultTab?: number;
}

const Tabs: FC<TabsProps> = ({ tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || 0);

    return (
        <div>
            <div className="space-x-4 mb-4">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;