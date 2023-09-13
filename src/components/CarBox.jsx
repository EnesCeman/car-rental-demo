import { useState } from "react";

export default function CarBox({ selectedCar }) {
  //   console.log(selectedCar);
  //   console.log("carID", carID);

  const [carLoad, setCarLoad] = useState(true);
  return (
    <>
      <div className="box-cars">
        <div className="pick-car">
          {carLoad && <span className="loader"></span>}
          <img
            style={{ display: carLoad ? "none" : "block" }}
            src={selectedCar?.img}
            alt="car_img"
            onLoad={() => setCarLoad(false)}
          />
        </div>

        <div className="pick-description">
          <div className="pick-description__price">
            <span>${selectedCar.price}</span>/ per day
          </div>
          <div className="pick-description__table">
            <div className="pick-description__table__col">
              <span>Model</span>
              <span>{selectedCar.model}</span>
            </div>
            <div className="pick-description__table__col">
              <span>Mark</span>
              <span>{selectedCar.mark}</span>
            </div>
            <div className="pick-description__table__col">
              <span>Year</span>
              <span>{selectedCar.year}</span>
            </div>
            <div className="pick-description__table__col">
              <span>Doors</span>
              <span>{selectedCar.doors}</span>
            </div>
            <div className="pick-description__table__col">
              <span>AC</span>
              <span>{selectedCar.air}</span>
            </div>
            <div className="pick-description__table__col">
              <span>Transmission</span>
              <span>{selectedCar.transmission}</span>
            </div>
            <div className="pick-description__table__col">
              <span>Fuel</span>
              <span>{selectedCar.fuel}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
