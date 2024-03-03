import {FC, useEffect, useState} from "react";
import Modal from "@/components/General/Modal";
import Exit from "@/components/General/Icons/Exit";
import Tabs from "@/components/General/Tabs/Tabs";
import TabsWrapper from "@/components/Stickers/SettingsModal/TabsWrapper";

interface SettingsModalProps {
    openModal: boolean;
    closeModal: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({openModal , closeModal}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(openModal);
    }, [openModal]);

    const handleCloseModal = () => {
        closeModal();
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onClose={handleCloseModal} heading="Options">
            <TabsWrapper />
        </Modal>
    );
}

export default SettingsModal;