import React, { useState, useEffect } from "react";
import { DoctorsCard } from "../../import-export/ImportExport";
import axios from "axios";

function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/alldoctors"
        );
        console.log(response.data.data);
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="all-doctors">
      <section className="all-doctors__grid">
        {/* Search doctors component */}
        {/* code here */}

        {/* Doctors components */}
        {doctors.map((doctor) => (
          <DoctorsCard key={doctor._id} doctor={doctor} />
        ))}
      </section>
    </div>
  );
}

export default AllDoctorsPage;
