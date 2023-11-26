import { Modal } from "antd";

export const useMessage = (message, onOk, open, setOpen) => {
    const onCancel = () => {
        setOpen(false);
    };
    return (
        <Modal onCancel={onCancel} onOk={onOk} open={open}>
            {message}
        </Modal>
    );
};
