import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from "axios";


const Asnmt_page = () => {
  const [selectedOptions, setSelectedOptions] = useState({
  });

  var p;
  const [userdata,setuserdata]=useState({
    name:"",
    rollno:"",
    phoneno:"",
    id:""
  })
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log("AC===",accessToken)
        if (!accessToken) {
          setError('Access token not found'); // Handle missing token
          return;
        }
        const response = await axios.get('http://localhost:2000/api/users/student-profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        console.log("res===",response)

        if (response && response.data) {
          p=response.data
          setuserdata({
            name:p.name,
            rollno:p.rollno,
            phoneno:p.phoneno,
            id:p.id,

          })
          
          console.log(response.data)
          console.log("p==",p)
          console.log("p==",p.name)
        }
      } catch (error) {
        console.log(error);
        setError(error.message || 'An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, []);



  

  // Function to handle radio button changes
  const handleOptionChange = (questionNumber, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [`selectedoption${questionNumber}`]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    
      
      
      console.log(userdata)
      const combinedData = {
        userdata,
        selectedOptions,
        // selectedOptions: selectedOptions,
      };
      console.log(combinedData);
      const response = await fetch("http://127.0.0.1:5000/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
        
      });

      const data = await response.json();
      console.log("Response from Flask:", data);
    } catch (error) {
      console.error("Error sending data to Flask:", error);
    }
  };

  return (
    <>
    <Sidebar/>
    <Navbar/>
      {/* <div className="q-container"> */}
        <form className="form" onSubmit={handleSubmit}>
          <h1>Assessment</h1>
          <h2>** Depression Subscale **</h2>
          <div className="questions">
            <h3>1. I found it hard to wind down.</h3>
            <div className="opt">
              <input
                type="radio"
                id="1-1"
                name="selectedoption1"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption1", 1)}
              />
              <label htmlFor="1-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="1-2"
                name="selectedoption1"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption1", 2)}
              />
              <label htmlFor="1-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="1-3"
                name="selectedoption1"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption1", 3)}
              />
              <label htmlFor="1-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="1-4"
                name="selectedoption1"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption1", 4)}
              />
              <label htmlFor="1-4">
                Applied to me very much, or most of the time
              </label>
            </div>
            {/* <button type="reset">Clear</button> */}
          </div>

          <div className="questions">
            <h3>2. I was aware of dryness of my mouth.</h3>
            <div className="opt">
              <input
                type="radio"
                id="2-1"
                name="selectedoption2"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption2", 1)}
              />
              <label htmlFor="2-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="2-2"
                name="selectedoption2"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption2", 2)}
              />
              <label htmlFor="2-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="2-3"
                name="selectedoption2"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption2", 3)}
              />
              <label htmlFor="2-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="2-4"
                name="selectedoption2"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption2", 4)}
              />
              <label htmlFor="2-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              3. I couldn't seem to experience any positive feeling at all.
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="3-1"
                name="selectedoption3"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption3", 1)}
              />
              <label htmlFor="3-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="3-2"
                name="selectedoption3"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption3", 2)}
              />
              <label htmlFor="3-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="3-3"
                name="selectedoption3"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption3", 3)}
              />
              <label htmlFor="3-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="3-4"
                name="selectedoption3"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption3", 4)}
              />
              <label htmlFor="3-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              4. I experienced breathing difficulty (e.g., excessively rapid
              breathing, breathlessness in the absence of physical exertion).
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="4-1"
                name="selectedoption4"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption4", 1)}
              />
              <label htmlFor="4-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="4-2"
                name="selectedoption4"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption4", 2)}
              />
              <label htmlFor="4-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="4-3"
                name="selectedoption4"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption4", 3)}
              />
              <label htmlFor="4-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="4-4"
                name="selectedoption4"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption4", 4)}
              />
              <label htmlFor="4-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              5. I found it difficult to work up the initiative to do things.
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="5-1"
                name="selectedoption5"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption5", 1)}
              />
              <label htmlFor="5-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="5-2"
                name="selectedoption5"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption5", 2)}
              />
              <label htmlFor="5-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="5-3"
                name="selectedoption5"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption5", 3)}
              />
              <label htmlFor="5-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="5-4"
                name="selectedoption5"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption5", 4)}
              />
              <label htmlFor="5-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>6. I tended to over-react to situations.</h3>
            <div className="opt">
              <input
                type="radio"
                id="6-1"
                name="selectedoption6"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption6", 1)}
              />
              <label htmlFor="6-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="6-2"
                name="selectedoption6"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption6", 2)}
              />
              <label htmlFor="6-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="6-3"
                name="selectedoption6"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption6", 3)}
              />
              <label htmlFor="6-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="6-4"
                name="selectedoption6"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption6", 4)}
              />
              <label htmlFor="6-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              7. I had a feeling of shakiness (e.g., legs going to give way).
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="7-1"
                name="selectedoption7"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption7", 1)}
              />
              <label htmlFor="7-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="7-2"
                name="selectedoption7"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption7", 2)}
              />
              <label htmlFor="7-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="7-3"
                name="selectedoption7"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption7", 3)}
              />
              <label htmlFor="7-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="7-4"
                name="selectedoption7"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption7", 4)}
              />
              <label htmlFor="7-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <h2>** Anxiety Subscale **</h2>
          <div className="questions">
            <h3>8. I felt that I was using a lot of nervous energy.</h3>
            <div className="opt">
              <input
                type="radio"
                id="8-1"
                name="selectedoption8"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption8", 1)}
              />
              <label htmlFor="8-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="8-2"
                name="selectedoption8"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption8", 2)}
              />
              <label htmlFor="8-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="8-3"
                name="selectedoption8"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption8", 3)}
              />
              <label htmlFor="8-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="8-4"
                name="selectedoption8"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption8", 4)}
              />
              <label htmlFor="8-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              9. I was worried about situations in which I might panic and make
              a fool of myself.
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="9-1"
                name="selectedoption9"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption9", 1)}
              />
              <label htmlFor="9-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="9-2"
                name="selectedoption9"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption9", 2)}
              />
              <label htmlFor="9-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="9-3"
                name="selectedoption9"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption9", 3)}
              />
              <label htmlFor="9-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="9-4"
                name="selectedoption9"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption9", 4)}
              />
              <label htmlFor="9-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>10. I felt that I was close to panic.</h3>
            <div className="opt">
              <input
                type="radio"
                id="10-1"
                name="selectedoption10"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption10", 1)}
              />
              <label htmlFor="10-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="10-2"
                name="selectedoption10"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption10", 2)}
              />
              <label htmlFor="10-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="10-3"
                name="selectedoption10"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption10", 3)}
              />
              <label htmlFor="10-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="10-4"
                name="selectedoption10"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption10", 4)}
              />
              <label htmlFor="10-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              11. I was aware of the action of my heart in the absence of
              physical exertion (e.g., sense of heart rate increase, heart
              missing a beat).
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="11-1"
                name="selectedoption11"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption11", 1)}
              />
              <label htmlFor="11-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="11-2"
                name="selectedoption11"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption11", 2)}
              />
              <label htmlFor="11-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="11-3"
                name="selectedoption11"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption11", 3)}
              />
              <label htmlFor="11-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="11-4"
                name="selectedoption11"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption11", 4)}
              />
              <label htmlFor="11-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>12. I felt scared without any good reason.</h3>
            <div className="opt">
              <input
                type="radio"
                id="12-1"
                name="selectedoption12"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption12", 1)}
              />
              <label htmlFor="12-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="12-2"
                name="selectedoption12"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption12", 2)}
              />
              <label htmlFor="12-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="12-3"
                name="selectedoption12"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption12", 3)}
              />
              <label htmlFor="12-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="12-4"
                name="selectedoption12"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption12", 4)}
              />
              <label htmlFor="12-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>13. I felt that life was meaningless.</h3>
            <div className="opt">
              <input
                type="radio"
                id="13-1"
                name="selectedoption13"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption13", 1)}
              />
              <label htmlFor="13-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="13-2"
                name="selectedoption13"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption13", 2)}
              />
              <label htmlFor="13-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="13-3"
                name="selectedoption13"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption13", 3)}
              />
              <label htmlFor="13-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="13-4"
                name="selectedoption13"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption13", 4)}
              />
              <label htmlFor="13-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              14. I found it hard to focus on anything other than my breathing.
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="14-1"
                name="selectedoption14"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption14", 1)}
              />
              <label htmlFor="14-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="14-2"
                name="selectedoption14"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption14", 2)}
              />
              <label htmlFor="14-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="14-3"
                name="selectedoption14"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption14", 3)}
              />
              <label htmlFor="14-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="14-4"
                name="selectedoption14"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption14", 4)}
              />
              <label htmlFor="14-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>
          <h2>** Stress Subscale **</h2>
          <div className="questions">
            <h3>15. I found it difficult to relax.</h3>
            <div className="opt">
              <input
                type="radio"
                id="15-1"
                name="selectedoption15"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption15", 1)}
              />
              <label htmlFor="15-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="15-2"
                name="selectedoption15"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption15", 2)}
              />
              <label htmlFor="15-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="15-3"
                name="selectedoption15"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption15", 3)}
              />
              <label htmlFor="15-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="15-4"
                name="selectedoption15"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption15", 4)}
              />
              <label htmlFor="15-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>16. I felt that I was rather touchy.</h3>
            <div className="opt">
              <input
                type="radio"
                id="16-1"
                name="selectedoption16"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption16", 1)}
              />
              <label htmlFor="16-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="16-2"
                name="selectedoption16"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption16", 2)}
              />
              <label htmlFor="16-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="16-3"
                name="selectedoption16"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption16", 3)}
              />
              <label htmlFor="16-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="16-4"
                name="selectedoption16"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption16", 4)}
              />
              <label htmlFor="16-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>
              17. I was intolerant of anything that kept me from getting on with
              what I was doing.
            </h3>
            <div className="opt">
              <input
                type="radio"
                id="17-1"
                name="selectedoption17"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption17", 1)}
              />
              <label htmlFor="17-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="17-2"
                name="selectedoption17"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption17", 2)}
              />
              <label htmlFor="17-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="17-3"
                name="selectedoption17"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption17", 3)}
              />
              <label htmlFor="17-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="17-4"
                name="selectedoption17"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption17", 4)}
              />
              <label htmlFor="17-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>18. I felt that I was rather touchy.</h3>
            <div className="opt">
              <input
                type="radio"
                id="18-1"
                name="selectedoption18"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption18", 1)}
              />
              <label htmlFor="18-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="18-2"
                name="selectedoption18"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption18", 2)}
              />
              <label htmlFor="18-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="18-3"
                name="selectedoption18"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption18", 3)}
              />
              <label htmlFor="18-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="18-4"
                name="selectedoption18"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption18", 4)}
              />
              <label htmlFor="18-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>19. I was unable to become enthusiastic about anything.</h3>
            <div className="opt">
              <input
                type="radio"
                id="19-1"
                name="selectedoption19"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption19", 1)}
              />
              <label htmlFor="19-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="19-2"
                name="selectedoption19"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption19", 2)}
              />
              <label htmlFor="19-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="19-3"
                name="selectedoption19"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption19", 3)}
              />
              <label htmlFor="19-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="19-4"
                name="selectedoption19"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption19", 4)}
              />
              <label htmlFor="19-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>20. I felt I wasn’t worth much as a person.</h3>
            <div className="opt">
              <input
                type="radio"
                id="20-1"
                name="selectedoption20"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption20", 1)}
              />
              <label htmlFor="20-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="20-2"
                name="selectedoption20"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption20", 2)}
              />
              <label htmlFor="20-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="20-3"
                name="selectedoption20"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption20", 3)}
              />
              <label htmlFor="20-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="20-4"
                name="selectedoption20"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption20", 4)}
              />
              <label htmlFor="20-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>

          <div className="questions">
            <h3>21. I felt that I was not able to cope with things.</h3>
            <div className="opt">
              <input
                type="radio"
                id="21-1"
                name="selectedoption21"
                defaultValue={1}
                onChange={() => handleOptionChange("selectedoption21", 1)}
              />
              <label htmlFor="21-1">Did not apply to me at all</label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="21-2"
                name="selectedoption21"
                defaultValue={2}
                onChange={() => handleOptionChange("selectedoption21", 2)}
              />
              <label htmlFor="21-2">
                Applied to me to some degree, or some of the time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="21-3"
                name="selectedoption21"
                defaultValue={3}
                onChange={() => handleOptionChange("selectedoption21", 3)}
              />
              <label htmlFor="21-3">
                Applied to me to a considerable degree, or a good part of the
                time
              </label>
            </div>
            <div className="opt">
              <input
                type="radio"
                id="2-4"
                name="selectedoption21"
                defaultValue={4}
                onChange={() => handleOptionChange("selectedoption21", 4)}
              />
              <label htmlFor="2-4">
                Applied to me very much, or most of the time
              </label>
            </div>
          </div>
          <div className="q-btns">
            <button type="reset">Clear All Selections</button>
            {/* <Link to="/api/data"> */}
            <button type="submit">Submit</button>
            {/* </Link> */}
          </div>
        </form>
      {/* </div> */}
    </>
  );
};

export default Asnmt_page;