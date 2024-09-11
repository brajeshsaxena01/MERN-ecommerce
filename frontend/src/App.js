import { useDispatch, useSelector } from "react-redux";
import { AllRoutes } from "./components/AllRoutes";
import { Navbar } from "./components/Navbar";
import { useEffect } from "react";
import { fetchCartItemByUserId } from "./redux/Cart/action";
import { Footer } from "./components/Admin/Footer";

function App() {
  //to show the data in the cart as user logged in
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.userInfo);
  console.log("user", user);
  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemByUserId(user.id));
    }
  }, [dispatch, user]);
  return (
    <>
      <Navbar>
        <AllRoutes />
      </Navbar>
      <Footer />
    </>
  );
}
export default App;
