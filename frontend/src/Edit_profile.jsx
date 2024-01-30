import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoClose } from "react-icons/io5";

const Edit_profile = ({ isVisible, close_profile, roll, profile }) => {
  const [formdata, setFormData] = useState({
    name: "",
    section: "",
    phoneno: "",
    email: "",
    rollno: "",
  });

  useEffect(() => {
    setFormData({
      name: profile.name,
      section: profile.section,
      phoneno: profile.phoneno,
      email: profile.email,
      rollno: profile.rollno,
    });
  }, []);

  const [edit, setedit] = useState(false);

  const enable_edit = (e) => {
    e.preventDefault();
    console.log("profile : ", profile);
    console.log("formdata : ", formdata);
    setedit(!edit);
  };

  const [nameValid, setNameValid] = useState(true);
  const [secValid, setsecValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);

  const submit_edit = async (e) => {
    e.preventDefault();
    console.log("profile : ", profile);
    console.log("formdata : ", formdata);
    if (profile.name == formdata.name && profile.email == formdata.email && profile.phoneno == formdata.phoneno && profile.section==formdata.section) {
      alert("NO cahnges done to update");
    } else {
      if (
        formdata.name.length <= 0 ||
        formdata.section.length <= 0 ||
        formdata.phoneno.length <= 0 ||
        formdata.email.length <= 0 ||
        formdata.rollno.length <= 0
      ) {
        alert("please complete filling the form before submitting.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:2000/api/users/student-edit-profile",
          formdata,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setNameValid(true);
        setEmailValid(true);
        setPhoneValid(true);
        setEmailValid(true);
        setUsernameValid(true);

        toast.success("Profile Updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          const { data } = error.response;
          console.log("errors : ", data);

          const p = data.errors;
          for (let i = 0; i < p.length; i++) {
            if (p[i] == "Invalid name") {
              setNameValid(false);
            } else if (p[i] == "Invalid section") {
              setsecValid(false);
            } else if (p[i] == "Invalid phone number") {
              setPhoneValid(false);
            } else if (p[i] == "Invalid email") {
              setEmailValid(false);
            } else if (p[i] == "Invalid roll number") {
              setUsernameValid(false);
            }
          }
        } else {
          alert("Failed to edit-profile. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <form className="profile_edit_form" onSubmit={submit_edit}>
        <IoClose className="close-CP" onClick={close_profile} />
        <h1>Profile</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          readOnly={!edit}
          className="profile_edit"
          value={formdata.name}
          onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
          required
        />
        {!nameValid && (
          <b className="error">*Please specify your name coorectly</b>
        )}

        <input
          type="text"
          name="section"
          placeholder="Enter your name"
          readOnly={!edit}
          className="profile_edit"
          value={formdata.section}
          onChange={(e) =>
            setFormData({ ...formdata, section: e.target.value })
          }
          required
        />
        {!secValid && <b className="error">*Invalid section</b>}

        <input
          type="text"
          name="phoneno"
          placeholder="Enter your name"
          readOnly={!edit}
          className="profile_edit"
          value={formdata.phoneno}
          onChange={(e) =>
            setFormData({ ...formdata, phoneno: e.target.value })
          }
          required
        />
        {!phoneValid && <b className="error">*Invalid mobile number</b>}

        <input
          type="email"
          name="email"
          placeholder="Enter your name"
          readOnly={!edit}
          className="profile_edit"
          value={formdata.email}
          onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
          required
        />
        {!emailValid && <b className="error">*Invalid email</b>}

        <input
          type="text"
          name="rollno"
          placeholder="Enter your name"
          readOnly
          // readOnly={!edit}
          className="profile_edit"
          value={formdata.rollno}
          onChange={(e) => setFormData({ ...formdata, rollno: e.target.value })}
          required
        />
        {!usernameValid && <b className="error">*Invalid username</b>}

        <div>
          <button onClick={enable_edit} style={{ color: "black" }}>
            {!edit ? "Enable edit" : "Disable edit"}{" "}
          </button>
          <button type="submit" style={{ color: "black" }}>
            Edit profile
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit_profile;
