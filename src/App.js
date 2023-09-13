import "./dist/styles.css";
import Faq from "./components/Faq";
import PickCar from "./components/PickCar";
import BookCar from "./components/BookCar";

function App() {
  return (
    <>
      <PickCar />
      <BookCar />
      <Faq />;
    </>
  );
}

export default App;
