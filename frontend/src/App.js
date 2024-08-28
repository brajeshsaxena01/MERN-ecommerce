import { AllRoutes } from "./components/AllRoutes";
import { Navbar } from "./components/Navbar";
import { ProductList } from "./pages/ProductList";

function App() {
  return (
    <>
      <Navbar>
        {/* <ProductList /> */}
        <AllRoutes />
      </Navbar>
    </>
  );
}
export default App;
