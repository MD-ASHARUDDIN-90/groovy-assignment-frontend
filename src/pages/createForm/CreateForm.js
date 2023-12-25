import React, { useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import style from "./CreateForm.module.css";
import { MdDeleteForever } from "react-icons/md";
import { ImCross } from "react-icons/im";
import config from "../../environment/config";
import axios from "axios";

function CreateForm() {
  const [form, setForm] = useState({
    title: "",
    inputs: [
      {
        id: Math.random().toString(),
        type: "",
        name: "",
        regexValidations: "",
        isRequired: false,
        minLength: null,
        maxLength: null,
        options: [
          {
            name: "",
          },
          {
            name: "",
          },
        ],
      },
    ],
  });

  function addInput() {
    setForm((prevForm) => ({
      ...prevForm,
      inputs: [
        ...prevForm.inputs,
        {
          id: Math.random().toString(),
          type: "",
          name: "",
          regexValidations: "",
          isRequired: false,
          minLength: null,
          maxLength: null,
          textAreaLimit: null,
          options: [
            {
              name: "",
            },
            {
              name: "",
            },
          ],
        },
      ],
    }));
  }

  function handleDelete(id) {
    const newInput = form.inputs.filter((input) => input.id !== id);
    setForm((prevForm) => ({ ...prevForm, inputs: newInput }));
  }

  function handleChange(e, id) {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      inputs: prevForm.inputs.map((input) =>
        input.id === id
          ? {
              ...input,
              [name]: type === "checkbox" ? checked : value,
            }
          : input
      ),
    }));
  }

  function handleOptionChange(e, inputId, optionIndex) {
    setForm((prevForm) => ({
      ...prevForm,
      inputs: prevForm.inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: input.options.map((option, index) =>
                index === optionIndex
                  ? { ...option, name: e.target.value }
                  : option
              ),
            }
          : input
      ),
    }));
  }

  function addOption(inputId) {
    setForm((prevForm) => ({
      ...prevForm,
      inputs: prevForm.inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: [
                ...input.options,
                {
                  name: "",
                },
              ],
            }
          : input
      ),
    }));
  }

  function handleDeleteOption(inputId, optionIndex) {
    setForm((prevForm) => ({
      ...prevForm,
      inputs: prevForm.inputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              options: input.options.filter(
                (_, index) => index !== optionIndex
              ),
            }
          : input
      ),
    }));
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(config.API_URL + "form/create", form);

      if (res && !res.error) {
        alert("New Form Created");
        setForm({
          title: "",
          inputs: [
            {
              id: Math.random().toString(),
              type: "",
              name: "",
              regexValidations: "",
              isRequired: false,
              minLength: null,
              maxLength: null,
              options: [
                {
                  name: "",
                },
                {
                  name: "",
                },
              ],
            },
          ],
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.nav}>
          <Navbar />
        </div>

        <div className={style.content_container}>
          <div className={style.content_heading}>
            <h3>Create Form</h3>
            <button onClick={addInput}>Add Input</button>
          </div>
          <div className={style.form_container}>
            <div className={style.inputContainer}>
              <label htmlFor='title'>Form Title</label>
              <input
                className={style.formTitle}
                placeholder='Title of the form'
                id='title'
                name='title'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className={style.form_inputs_container}>
              <h3>Form Inputs</h3>

              {form.inputs.map((input) => {
                return (
                  <div key={input.id} className={style.inputs}>
                    <div className={style.input_sub_container}>
                      <div className={style.inputContainer}>
                        <label htmlFor={`type-${input.id}`}>Type</label>
                        <select
                          id={`type-${input.id}`}
                          name='type'
                          onChange={(e) => handleChange(e, input.id)}
                        >
                          <option value=''>Select Type</option>
                          <option value='text'>Text</option>
                          <option value='email'>Email</option>
                          <option value='password'>Password</option>
                          <option value='textarea'>TextArea</option>
                          <option value='date'>Date</option>
                          <option value='checkbox'>Checkbox</option>
                          <option value='radio'>Radio</option>
                        </select>
                      </div>
                      <div className={style.inputContainer}>
                        <label htmlFor={`name-${input.id}`}>Input Name</label>

                        <input
                          id={`name-${input.id}`}
                          type='text'
                          name='name'
                          placeholder='Input Name'
                          onChange={(e) => handleChange(e, input.id)}
                        />
                      </div>
                      {input.type === "text" ||
                      input.type === "email" ||
                      input.type === "password" ? (
                        <div className={style.inputContainer}>
                          <label htmlFor={`regexValidations-${input.id}`}>
                            Regex Validation
                          </label>
                          <input
                            id={`regexValidations-${input.id}`}
                            type='text'
                            name='regexValidations'
                            placeholder='Regex Validations'
                            onChange={(e) => handleChange(e, input.id)}
                          />
                        </div>
                      ) : null}

                      <MdDeleteForever
                        onClick={() => handleDelete(input.id)}
                        className={style.deleteIcon}
                      />
                    </div>
                    <div className={style.bottomInputBox}>
                      <div className={style.checkbox}>
                        <input
                          id={`isRequired-${input.id}`}
                          type='checkbox'
                          name='isRequired'
                          onChange={(e) => handleChange(e, input.id)}
                        />
                        <label htmlFor={`isRequired-${input.id}`}>
                          Is Required ?
                        </label>
                      </div>

                      {input.type === "text" || input.type === "password" ? (
                        <>
                          <div className={style.inputContainer}>
                            <label htmlFor={`minLength-${input.id}`}>
                              Min Length
                            </label>

                            <input
                              id={`minLength-${input.id}`}
                              type='number'
                              name='minLength'
                              placeholder=' Min Length'
                              onChange={(e) => handleChange(e, input.id)}
                            />
                          </div>
                          <div className={style.inputContainer}>
                            <label htmlFor={`maxLength-${input.id}`}>
                              Max Length
                            </label>

                            <input
                              id={`maxLength-${input.id}`}
                              type='number'
                              name='maxLength'
                              placeholder=' Max Length'
                              onChange={(e) => handleChange(e, input.id)}
                            />
                          </div>
                        </>
                      ) : null}
                      {input.type === "textarea" && (
                        <div className={style.inputContainer}>
                          <label htmlFor={`textAreaLimit-${input.id}`}>
                            Text area limit
                          </label>

                          <input
                            id={`textAreaLimit-${input.id}`}
                            type='number'
                            name='textAreaLimit'
                            placeholder=' Text area limit'
                            onChange={(e) => handleChange(e, input.id)}
                          />
                        </div>
                      )}
                    </div>

                    {input.type === "radio" && (
                      <div className={style.optionsContainer}>
                        <h4>Options</h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {input.options.map((option, index) => (
                            <div
                              key={index}
                              className={style.subOptionsContainer}
                            >
                              <div
                                className={style.inputContainer}
                                style={{ minWidth: "50%" }}
                              >
                                <label htmlFor={`option-${input.id}-${index}`}>
                                  Option {index + 1}{" "}
                                  <ImCross
                                    style={{ fill: "red" }}
                                    onClick={() =>
                                      handleDeleteOption(input.id, index)
                                    }
                                  />
                                </label>
                                <input
                                  id={`option-${input.id}-${index}`}
                                  type='text'
                                  name={`option-${input.id}-${index}`}
                                  placeholder={`Option ${index + 1}`}
                                  value={option.name}
                                  onChange={(e) =>
                                    handleOptionChange(e, input.id, index)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          className={style.addOptionBtn}
                          onClick={() => addOption(input.id)}
                        >
                          Add Option
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={style.submitBtnContainer}>
              <button onClick={handleSubmit} className={style.submitBtn}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateForm;
