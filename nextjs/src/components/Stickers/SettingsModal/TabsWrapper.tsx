import Tabs from "@/components/General/Tabs/Tabs";

const TabsWrapper = () => {
    const tabs = [
        {
            label: "Word generator",
            content: <p>Content for Tab 1</p>
        },
    ];

    return <Tabs tabs={tabs} />;
}

export default TabsWrapper;