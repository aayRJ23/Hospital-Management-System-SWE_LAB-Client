import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faIdCard, faCalendarAlt, faMapMarkerAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Choose the department");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);
  
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Choose the department");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component-login appointment-form-login">
      <h2>Book an Appointment</h2>
      <p>Please fill in the details below</p>
      <p>Our doctors are here to help you. Schedule your appointment today!</p>
      <form onSubmit={handleAppointment} className="appointment-form">
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faIdCard} className="icon" />
          <input
            type="text"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            <option value="Choose the department">Choose the department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department || department === "Choose the department"}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          <textarea
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
          <p>Have you visited before?</p>
        </div>
        <div className="button-group">
          <button type="button" className="clear-btn" onClick={() => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNic("");
            setDob("");
            setGender("");
            setAppointmentDate("");
            setDepartment("Choose the department");
            setDoctorFirstName("");
            setDoctorLastName("");
            setHasVisited(false);
            setAddress("");
          }}>Clear</button>
          <button type="submit" className="appointment-btn">Get Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
