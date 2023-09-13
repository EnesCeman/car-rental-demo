import { useState } from "react";
import CarBox from "./CarBox";
import { CAR_DATA } from "./CarData";

export default function PickCar() {
  const [colorBtn, setColorBtn] = useState(0);

  const btnID = (id) => {
    if (id === colorBtn) {
      return;
    }
    setColorBtn(id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Vehicle Models</h3>
              <h2>Our rental fleet</h2>
              <p>
                Choose from a variety of our amazing vehicles to rent for your
                next adventure or business trip
              </p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {CAR_DATA.map((car, index) => (
                  <button
                    key={index}
                    className={`${coloringButton(index)}`}
                    onClick={() => {
                      btnID(index);
                    }}
                  >
                    {car.name}
                  </button>
                ))}
              </div>

              <CarBox selectedCar={CAR_DATA[colorBtn]} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
