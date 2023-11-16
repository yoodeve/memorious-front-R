import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import Routing from "./Routing";

/* 컬러 옵션 : https://ant.design/docs/react/customize-theme */
const config = {
    token: {
        colorPrimary: "#6F6257",
        colorWarning: "#952323",
        colorError: "#952323",
        colorInfo: "#e6a156",
        colorTextBase: "#666",
    },
};

function App() {
    const queryClient = new QueryClient();
    return (
        <ConfigProvider theme={config}>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Routing />
                </RecoilRoot>
            </QueryClientProvider>
        </ConfigProvider>
    );
}

export default App;
