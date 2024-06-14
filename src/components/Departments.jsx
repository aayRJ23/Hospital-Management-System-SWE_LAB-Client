import React from "react";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    // { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  return (
    <div className="departments-container">
      <h2>Departments</h2>
      <div className="departments-grid">
        {departmentsArray.map((depart, index) => (
          <div key={index} className="department-card">
            <div className="department-name">{depart.name}</div>
            <img src={depart.imageUrl} alt="Department" className="department-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
