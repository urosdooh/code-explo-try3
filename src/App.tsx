import { ReactFlowProvider } from "@xyflow/react";
import GraphViewer from "./components/GraphViewer";
import { GlobalStyle } from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <ReactFlowProvider>
        <GraphViewer />
      </ReactFlowProvider>
    </>
  );
}

export default App;
