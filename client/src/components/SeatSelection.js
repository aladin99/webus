import React from "react";
import { Row, Col } from "antd";
import "../resources/bus.css";

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = bus.capacity;

  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <>
    <div className="mx-5">
      <div className="bus-container">
      <b><p style={{color: "white", background: "#1c273c", padding: "5px"}} >Rezervišite sedište/a samo jednim klikom na kvadratić ispod:</p></b>
        <Row id="seats-container" gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass = ''
            if(selectedSeats.includes(seat+1))
            {
                seatClass = 'selected-seat'
            }else if (bus.seatsBooked.includes(seat+1))
            {
                seatClass = 'booked-seat'
            }
            return (
              <Col  key={seat} span={6}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seat + 1)}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
   
    </>
  );
}

export default SeatSelection;
