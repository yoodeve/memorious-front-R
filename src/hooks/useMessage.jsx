import { message } from "antd";

export const useMessage = content => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "error",
            content,
        });
    };
    return [contextHolder, success];
};
