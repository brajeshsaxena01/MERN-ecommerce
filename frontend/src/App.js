import { useDispatch, useSelector } from "react-redux";
import { AllRoutes } from "./components/AllRoutes";
import { Navbar } from "./components/Navbar";
import { useEffect } from "react";
import { fetchCartItemByUserId } from "./redux/Cart/action";

function App() {
  //to show the data in the cart as user logged in
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.userInfo);
  console.log("user", user);
  useEffect(() => {
    if (user) {
      console.log("inside if");
      dispatch(fetchCartItemByUserId(user.id));
    }
  }, [dispatch, user]);
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
