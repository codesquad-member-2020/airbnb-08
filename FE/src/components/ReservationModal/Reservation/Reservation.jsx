import React from "react";

import SelectedInfo from "@ReservationModal/SelectedInfo/SelectedInfo";
import PriceInfo from "@ReservationModal/PriceInfo/PriceInfo";

const Reservation = ({ roomData }) => {
  return (
    <>
      <SelectedInfo roomData={roomData} />
      <PriceInfo roomData={roomData} />
    </>
  );
};

export default Reservation;
