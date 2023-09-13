import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function BookModal({ onClose, bookingInfo, carData }) {
  const matchingCar = carData.find((car) => car.name === bookingInfo.carType);
  const carImg = matchingCar.img;

  const initialInfo = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  };

  const [personalInfo, setPersonalInfo] = useState(initialInfo);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handlePersonalInfo = (ev, key) => {
    const { value } = ev.target;

    setPersonalInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    const isAnyEmpty = Object.values(personalInfo).some(
      (value) => value === ""
    );
    if (isAnyEmpty) {
      setShowErrorMsg(true);
    } else {
      setShowErrorMsg(false);
      onClose();
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
          <div className="modal-content__title">
            <h3>Complete reservation</h3>
          </div>
          <div className="modal-content__message">
            <h3>Upon completing this reservation enquiry, you will receive:</h3>
            <p>
              Your rental voucher to use it upon arrival at the rental desk and
              a toll-free customer support number.
            </p>
          </div>
          <div className="modal-content__booking-info">
            <div className="info-confirmation">
              <h3>Date & Location</h3>
              <div className="details-container">
                <div className="booking-details">
                  <h5>Pick-up Date</h5>
                  <p>{bookingInfo.pickUpTime}</p>
                </div>
                <div className="booking-details">
                  <h5>Drop-off Date</h5>
                  <p>{bookingInfo.dropOffTime}</p>
                </div>
                <div className="booking-details">
                  <h5>Pick-up Location</h5>
                  <p>{bookingInfo.pickUpLocation}</p>
                </div>
                <div className="booking-details">
                  <h5>Drop-off Location</h5>
                  <p>{bookingInfo.dropOffLocation}</p>
                </div>
              </div>
            </div>
            <div className="selected-vehicle">
              <h5>
                <span>Selected vehicle: </span> {bookingInfo.carType}
              </h5>
              <img src={carImg} alt="selected vehicle" />
            </div>
          </div>

          {/* =========== Personal Info =========== */}

          <div className="personal-info">
            {showErrorMsg && (
              <p className="error-message">
                All fields required!{" "}
                <FontAwesomeIcon className="fa-icons" icon={faXmark} />
              </p>
            )}
            <h3>Personal information</h3>
            <form className="info-form" onSubmit={handleOnSubmit}>
              <div className="info-form__2-col">
                <div className="single-field">
                  <label>
                    First Name <b>*</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    onChange={(ev) => handlePersonalInfo(ev, "firstName")}
                    value={personalInfo.firstName}
                  />
                  <p>This field is required.</p>
                </div>
                <div className="single-field">
                  <label>
                    Last Name <b>*</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    onChange={(ev) => handlePersonalInfo(ev, "lastName")}
                    value={personalInfo.lastName}
                  />
                  <p>This field is required.</p>
                </div>
                <div className="single-field">
                  <label>
                    Phone Number <b>*</b>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    onChange={(ev) => handlePersonalInfo(ev, "phoneNumber")}
                    value={personalInfo.phoneNumber}
                  />
                  <p>This field is required.</p>
                </div>
                <div className="single-field">
                  <label>
                    Age <b>*</b>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    min="18"
                    onChange={(ev) => handlePersonalInfo(ev, "age")}
                    value={personalInfo.age}
                  />
                  <p>This field is required.</p>
                </div>
              </div>
              <div className="info-form__1-col">
                <div className="single-field">
                  <label>
                    Email <b>*</b>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(ev) => handlePersonalInfo(ev, "email")}
                    value={personalInfo.email}
                  />
                  <p>This field is required.</p>
                </div>
                <div className="single-field">
                  <label>
                    Address <b>*</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your street address"
                    onChange={(ev) => handlePersonalInfo(ev, "address")}
                    value={personalInfo.address}
                  />
                  <p>This field is required.</p>
                </div>
              </div>
              <div className="info-form__2-col">
                <div className="single-field">
                  <label>
                    City <b>*</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    onChange={(ev) => handlePersonalInfo(ev, "city")}
                    value={personalInfo.city}
                  />
                  <p>This field is required.</p>
                </div>
                <div className="single-field">
                  <label>
                    Zip Code <b>*</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your zip code"
                    onChange={(ev) => handlePersonalInfo(ev, "zipCode")}
                    value={personalInfo.zipCode}
                  />
                  <p>This field is required.</p>
                </div>
              </div>
              <div className="reserve-button">
                <button>Reserve Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
