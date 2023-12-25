import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../environment/config";
import axios from "axios";
import Navbar from "../../component/navbar/Navbar";

const Form = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    let formData = {}; // Object to hold form data

    // Check each input for pattern validity
    data.inputs.forEach((input) => {
      const inputElement = event.target.elements[input.name];

      // Add input value to formData
      formData[input.name] = inputElement.value;

      // Check if regexValidations is a valid regex pattern
      if (input.regexValidations) {
        try {
          // Remove the double quotes from the regex pattern
          const regexPattern = input.regexValidations.replace(/"/g, "");
          const regex = new RegExp(regexPattern);

          // Check input value against the regex pattern
          if (!regex.test(inputElement.value)) {
            isFormValid = false;
          }
        } catch (error) {
          console.error(`Invalid regex pattern for ${input.name}:`, error);
          isFormValid = false;
        }
      }
    });

    // Submit the form only if all inputs are valid
    if (isFormValid) {
      handleApi(formData);
    }
  };

  const handleApi = async (formData) => {
    try {
      const data = { ...formData, formId: id };
      const res = await axios.post(config.API_URL + "form/submit", data);

      if (res && !res.error) {
        alert("From Submitted Successfully");
        nav("/");
      }
    } catch (error) {}
  };

  const getFormById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(config.API_URL + "form/" + id);
      // Fixed typo here
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormById(id);
  }, [id]); // Fixed missing dependency warning

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <form className={styles.form} onSubmit={handleSubmit}>
            {data &&
              data.inputs &&
              data.inputs.length > 0 && // Fixed typo here
              data.inputs.map((input) => {
                switch (input?.type) {
                  case "text":
                    return (
                      <input
                        key={input._id}
                        type='text'
                        name={input.name}
                        placeholder={input.name}
                        required={input.isRequired}
                        minLength={input.minLength}
                        maxLength={input.maxLength}
                        // pattern={input.regexValidations}
                        className={styles.input}
                      />
                    );
                  case "email":
                    return (
                      <input
                        key={input._id}
                        type='email'
                        name={input.name}
                        placeholder={input.name}
                        required={input.isRequired}
                        // pattern={input.regexValidations}
                        className={styles.input}
                      />
                    );
                  case "password":
                    return (
                      <input
                        key={input._id}
                        type='password'
                        name={input.name}
                        placeholder={input.name}
                        required={input.isRequired}
                        minLength={input.minLength}
                        maxLength={input.maxLength}
                        // pattern={input.regexValidations}
                        className={styles.input}
                      />
                    );
                  case "radio":
                    return input.options.map((option) => (
                      <label key={option._id} className={styles.label}>
                        <input
                          type='radio'
                          name={input.name}
                          value={option.name}
                          required={input.isRequired}
                          className={styles.radio}
                        />
                        {option.name}
                      </label>
                    ));
                  case "textarea":
                    return (
                      <textarea
                        key={input._id}
                        name={input.name}
                        required={input.isRequired}
                        maxLength={input.textAreaLimit}
                        className={styles.textarea}
                      />
                    );
                  case "checkbox":
                    return (
                      <label className={styles.label}>
                        <input
                          key={input._id}
                          type='checkbox'
                          name={input.name}
                          required={input.isRequired}
                          className={styles.checkbox}
                        />
                        {input.name}
                      </label>
                    );
                  case "date":
                    return (
                      <input
                        key={input._id}
                        type='date'
                        name={input.name}
                        required={input.isRequired}
                        className={styles.input}
                      />
                    );
                  default:
                    return null;
                }
              })}
            <button type='submit' className={styles.button}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
