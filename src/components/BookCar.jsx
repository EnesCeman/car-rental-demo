import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCar,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { CAR_DATA } from "./CarData";
import { format } from "date-fns";
import BookModal from "./BookModal";

export default function BookCar() {
  const todayDate = format(new Date(), "yyyy-MM-dd");

  const initialCarBookingInfo = {
    carType: "",
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpTime: todayDate,
    dropOffTime: "",
  };

  const [showDoneMsg, setShowDoneMsg] = useState(false);
  const [showErrorMsg, setshowErrorMsg] = useState(false);
  const [modal, setModal] = useState(false);
  const [carBookingInfo, setCarBookingInfo] = useState(initialCarBookingInfo);

  const handleCarBooking = (ev, key) => {
    const { value } = ev.target;

    setCarBookingInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    // Update the min date for drop-off time based on the selected pickup time
    const pickupTime = new Date(carBookingInfo.pickUpTime);
    const minDropOffDate = new Date(pickupTime);
    minDropOffDate.setDate(pickupTime.getDate() + 1); // Minimum drop-off date is the next day
    const minDropOffDateString = format(minDropOffDate, "yyyy-MM-dd");

    setCarBookingInfo((prevInfo) => ({
      ...prevInfo,
      dropOffTime: minDropOffDateString,
    }));
  }, [carBookingInfo.pickUpTime]);

  const openModal = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal(false);
    setShowDoneMsg(true);
    document.body.style.overflow = "auto";
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    const isAnyEmpty = Object.values(carBookingInfo).some(
      (value) => value === ""
    );
    if (isAnyEmpty) {
      setshowErrorMsg(true);
    } else {
      setshowErrorMsg(false);
      openModal();
    }
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>
              {showErrorMsg && (
                <p className="error-message">
                  All fields required!{" "}
                  <FontAwesomeIcon
                    className="fa-icons"
                    icon={faXmark}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setshowErrorMsg(false);
                    }}
                  />
                </p>
              )}
              {showDoneMsg && (
                <p className="booking-done">
                  Check your email to confirm an order.{" "}
                  <FontAwesomeIcon
                    className="fa-icons"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowDoneMsg(false);
                    }}
                    icon={faXmark}
                  />
                </p>
              )}
              <form className="box-form" onSubmit={submitHandler}>
                <div className="box-form__car-type">
                  <label>
                    <FontAwesomeIcon className="fa-icons" icon={faCar} /> &nbsp;
                    Select Your Car Type <b>*</b>
                  </label>
                  <select
                    value={carBookingInfo.carType}
                    onChange={(ev) => handleCarBooking(ev, "carType")}
                  >
                    <option value={""}>Select your car type</option>
                    {CAR_DATA.map((car, index) => (
                      <option key={index} value={car.name}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="box-form__car-type">
                  <label>
                    <FontAwesomeIcon
                      className="fa-icons"
                      icon={faLocationDot}
                    />{" "}
                    &nbsp; Pick-up location <b>*</b>
                  </label>
                  <select
                    value={carBookingInfo.pickUpLocation}
                    onChange={(ev) => handleCarBooking(ev, "pickUpLocation")}
                  >
                    <option value={""}>Select pick up location</option>
                    <option value={"Sarajevo"}>Sarajevo</option>
                    <option value={"Mostar"}>Mostar</option>
                    <option value={"Tuzla"}>Tuzla</option>
                  </select>
                </div>
                <div className="box-form__car-type">
                  <label>
                    <FontAwesomeIcon
                      className="fa-icons"
                      icon={faLocationDot}
                    />{" "}
                    &nbsp; Drop-off location <b>*</b>
                  </label>
                  <select
                    value={carBookingInfo.dropOffLocation}
                    onChange={(ev) => handleCarBooking(ev, "dropOffLocation")}
                  >
                    <option value={""}>Select drop off location</option>
                    <option value={"Sarajevo"}>Sarajevo</option>
                    <option value={"Mostar"}>Mostar</option>
                    <option value={"Tuzla"}>Tuzla</option>
                  </select>
                </div>
                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <FontAwesomeIcon
                      className="fa-icons"
                      icon={faCalendarDays}
                    />{" "}
                    &nbsp; Pick-up date <b>*</b>
                  </label>
                  <input
                    type="date"
                    min={todayDate}
                    id="picktime"
                    value={carBookingInfo.pickUpTime}
                    onChange={(ev) => {
                      handleCarBooking(ev, "pickUpTime");
                    }}
                  />
                </div>
                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <FontAwesomeIcon
                      className="fa-icons"
                      icon={faCalendarDays}
                    />{" "}
                    &nbsp; Drop-off date <b>*</b>
                  </label>
                  <input
                    type="date"
                    min={carBookingInfo.pickUpTime}
                    id="droptime"
                    value={carBookingInfo.dropOffTime}
                    onChange={(ev) => {
                      handleCarBooking(ev, "dropOffTime");
                    }}
                  />
                </div>
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <BookModal
          onClose={closeModal}
          bookingInfo={carBookingInfo}
          carData={CAR_DATA}
        />
      )}
    </>
  );
}
