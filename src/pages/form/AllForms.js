import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import styles from "./AllFroms.module.css";
import axios from "axios";
import config from "../../environment/config";
import { useNavigate } from "react-router-dom";

function AllForms() {
  const [forms, setFroms] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(config.API_URL + "form");

    setFroms(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const nav = useNavigate();
  const openForm = (id) => {
    nav(`/form/${id}`);
  };
  return (
    <>
      <Navbar />

      <h3 style={{ margin: "1rem" }}>All Forms</h3>
      <div className={styles.container}>
        {forms.map((form) => (
          <div
            key={form._id}
            className={styles.card}
            onClick={() => openForm(form._id)}
          >
            {form.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllForms;
