import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setErrors(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setErrors);

    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation(
        reservation_id,
        reservation,
        abortController.signal
      );
      history.goBack();
    } catch (error) {
      setErrors(error);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={handleChange}
          value={reservation.first_name}
        />

        {}

        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </main>
  );
}

export default EditReservation;