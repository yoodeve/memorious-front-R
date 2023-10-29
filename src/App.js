import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Routing from "./Routing";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routing />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
