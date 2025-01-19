// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";

// const CreateTournament = () => {
//   const navigate = useNavigate();

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 16);
//   };

//   const [formData, setFormData] = useState({
//     tournamentName: "", 
//     tournamentUrl: "",
//     startDate: getCurrentDateTime(),
//     game: "FREEFIRE",
//     region: "Nepal",
//     status: "Public",
//   });

//   const [countries, setCountries] = useState([]);
//   const [nameError, setNameError] = useState("");
//   const [urlError, setUrlError] = useState("");

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         const countryNames = data.map((country) => country.name.common);
//         const sortedCountries = [
//           "Nepal",
//           ...countryNames.filter((name) => name !== "Nepal").sort(),
//         ];
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };

//       if (name === "tournamentName") {
//         const formattedUrl = value
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[^a-z0-9-]/g, "");
//         updatedData.tournamentUrl = `communitygaming.io/tournament/${formattedUrl}`;
//       }
//       return updatedData;
//     });

//     if (name === "tournamentName" && value.trim() !== "") {
//       try {
//         const response = await axios.post("http://localhost:4000/tour/check-name", {
//           tournamentName: value,
//         });

//         if (!response.data.success) {
//           setNameError("Tournament name is already taken.");
//         } else {
//           setNameError("");
//         }
//       } catch (error) {
//         console.error("Error validating name:", error.response?.data || error.message);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { startDate, ...otherData } = formData;
//       const userId = localStorage.getItem('userId');
//       const payload = {
//         ...otherData,
//         startDate: new Date(startDate).toISOString(),
//         userId
//       };
//       // alert(userId);
//       const response = await axios.post("http://localhost:4000/tour/create", payload);
//       console.log("Tournament created successfully:", response.data);
//       navigate("/brackets");
//     } catch (error) {
//       console.error("Error creating tournament:", error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || "Something went wrong";
//       if (errorMessage.includes("name")) {
//         setNameError(errorMessage);
//       } else if (errorMessage.includes("URL")) {
//         setUrlError(errorMessage);
//       } else {
//         alert(`Error: ${errorMessage}`);
//       }
//     }
//   };

//   const myTour=()=>{
//     navigate('/my-tournament');
//   }

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <h2>Create Tournament</h2>
//         <label>
//           Tournament Name:
//           <input
//             type="text"
//             name="tournamentName"
//             value={formData.tournamentName}
//             onChange={handleChange}
//             placeholder="Enter tournament name"
//             required
//           />
//         </label>
//         {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

//         <label>
//           Tournament URL:
//           <input
//             type="text"
//             name="tournamentUrl"
//             value={formData.tournamentUrl}
//             readOnly
//           />
//         </label>
//         {urlError && <ErrorMessage>{urlError}</ErrorMessage>}

//         <label>
//           Start Date:
//           <input
//             type="datetime-local"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Game:
//           <select name="game" value={formData.game} onChange={handleChange} required>
//             <option value="PUBG">PUBG</option>
//             <option value="FREEFIRE">Freefire</option>
//             <option value="FORTNITE">Fortnite</option>
//             <option value="COD">COD</option>
//             <option value="CLASH ROYALE">Clash Royale</option>
//             <option value="COUNTER-STRIKE 2">Counter-Strike 2</option>
//             <option value="CYBERPUNK 2077">Cyberpunk 2077</option>
//             <option value="GTA SAN ANDRES">GTA San Andres</option>
//             <option value="POKEMON GO">Pokemon Go</option>
//             <option value="COC">COC</option>
//           </select>
//         </label>

//         <label>
//           Region:
//           <select name="region" value={formData.region} onChange={handleChange} required>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Status:
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </label>

//         <button type="submit" disabled={!!nameError || !!urlError}>
//           Create Tournament
//         </button>
//       </Form>

//       <button onClick={myTour}>My Tournaments</button>
//     </Container>
//   );
// };

// export default CreateTournament;
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background: url('images/bluemoroon3.jpg') no-repeat center center/cover;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-top: -10px;
//   margin-bottom: 0;
// `;


// const Form = styled.form`
//   padding: 40px;
//   border-radius: 10px;
//   background-color: rgba(2, 20, 45, 0.9); /* Semi-transparent for better contrast */
//   box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.4);
//   width: 100%;
//   max-width: 500px;
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;

//   h2 {
//     text-align: center;
//     color: #ff9c00;
//     margin-bottom: 20px;
//   }

//   label {
//     font-size: 16px;
//     font-weight: bold;
//   }

//   input,
//   select {
//     width: 100%;
//     padding: 12px;
//     border: none;
//     border-radius: 6px;
//     margin-top: 5px;
//     font-size: 16px;
//     color: #ffffff;
//     background-color: #01253a;
//   }

//   button {
//     padding: 14px;
//     border-radius: 8px;
//     border: none;
//     background-color: #007bff; /* Blue color for the button */
//     color: white;
//     font-size: 18px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: 0.3s ease;
//   }

//   button:hover {
//     background-color: #0056b3; /* Darker blue on hover */
//   }

//   button:disabled {
//     background-color: #4a4a4a;
//     cursor: not-allowed;
//   }
// `;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";

// const CreateTournament = () => {
//   const navigate = useNavigate();
//   const getCurrentDateTime = () => new Date().toISOString().slice(0, 16);

//   const [formData, setFormData] = useState({
//     tournamentName: "",
//     tournamentUrl: "",
//     startDate: getCurrentDateTime(),
//     game: "FREEFIRE",
//     region: "Nepal",
//     status: "Public",
//   });

//   const [countries, setCountries] = useState([]);
//   const [nameError, setNameError] = useState("");
//   const [urlError, setUrlError] = useState("");
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         const countryNames = data.map((country) => country.name.common);
//         const sortedCountries = [
//           "Nepal",
//           ...countryNames.filter((name) => name !== "Nepal").sort(),
//         ];
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };

//       if (name === "tournamentName") {
//         const formattedUrl = value
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[^a-z0-9-]/g, "");
//         updatedData.tournamentUrl = `communitygaming.io/tournament/${formattedUrl}`;
//       }
//       return updatedData;
//     });

//     if (name === "tournamentName" && value.trim() !== "") {
//       try {
//         const response = await axios.post("http://localhost:4000/tour/check-name", {
//           tournamentName: value,
//         });

//         if (!response.data.success) {
//           setNameError("Tournament name is already taken.");
//         } else {
//           setNameError("");
//         }
//       } catch (error) {
//         console.error("Error validating name:", error.response?.data || error.message);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { startDate, ...otherData } = formData;
//       const userId = localStorage.getItem("userId");
//       const payload = {
//         ...otherData,
//         startDate: new Date(startDate).toISOString(),
//         userId,
//       };
//       const response = await axios.post("http://localhost:4000/tour/create", payload);
//       console.log("Tournament created successfully:", response.data);
//       navigate("/brackets");
//     } catch (error) {
//       console.error("Error creating tournament:", error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || "Something went wrong";
//       if (errorMessage.includes("name")) {
//         setNameError(errorMessage);
//       } else if (errorMessage.includes("URL")) {
//         setUrlError(errorMessage);
//       } else {
//         alert(`Error: ${errorMessage}`);
//       }
//     }
//   };

//   const handleMyTournaments = () => {
//     navigate("/my-tournament");
//   };

//   const handleShowForm = () => {
//     setIsFormVisible((prevState) => !prevState);
//   };

//   return (
//     <Container>
//       <ButtonContainer>
//         <button onClick={handleShowForm}>
//           {isFormVisible ? "Close Form" : "Create Tournament"}
//         </button>
//         <button onClick={handleMyTournaments}>My Tournaments</button>
//       </ButtonContainer>

//       {isFormVisible && (
//         <Form onSubmit={handleSubmit}>
//           <h2>Create Tournament</h2>
//           <label>
//             Tournament Name:
//             <input
//               type="text"
//               name="tournamentName"
//               value={formData.tournamentName}
//               onChange={handleChange}
//               placeholder="Enter tournament name"
//               required
//             />
//           </label>
//           {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

//           <label>
//             Tournament URL:
//             <input
//               type="text"
//               name="tournamentUrl"
//               value={formData.tournamentUrl}
//               readOnly
//             />
//           </label>
//           {urlError && <ErrorMessage>{urlError}</ErrorMessage>}

//           <label>
//             Start Date:
//             <input
//               type="datetime-local"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Game:
//             <select name="game" value={formData.game} onChange={handleChange} required>
//               <option value="PUBG">PUBG</option>
//               <option value="FREEFIRE">Freefire</option>
//               <option value="FORTNITE">Fortnite</option>
//               <option value="COD">COD</option>
//               <option value="CLASH ROYALE">Clash Royale</option>
//               <option value="COUNTER-STRIKE 2">Counter-Strike 2</option>
//               <option value="CYBERPUNK 2077">Cyberpunk 2077</option>
//               <option value="GTA SAN ANDRES">GTA San Andres</option>
//               <option value="POKEMON GO">Pokemon Go</option>
//               <option value="COC">COC</option>
//             </select>
//           </label>

//           <label>
//             Region:
//             <select name="region" value={formData.region} onChange={handleChange} required>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label>
//             Status:
//             <select name="status" value={formData.status} onChange={handleChange}>
//               <option value="Public">Public</option>
//               <option value="Private">Private</option>
//             </select>
//           </label>

//           <button type="submit" disabled={!!nameError || !!urlError}>
//             Create Tournament
//           </button>
//         </Form>
//       )}
//     </Container>
//   );
// };

// export default CreateTournament;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;
//   background: url("images/bluemoroon3.jpg") no-repeat center center/cover;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   margin-top: 20px;

//   button {
//     padding: 12px 24px;
//     font-size: 16px;
//     border-radius: 6px;
//     border: none;
//     background-color: #007bff;
//     color: white;
//     cursor: pointer;
//     transition: 0.3s ease;
//   }

//   button:hover {
//     background-color: #0056b3;
//   }
// `;

// const Form = styled.form`
//   margin-top: 20px;
//   padding: 40px;
//   border-radius: 10px;
//   background-color: rgba(2, 20, 45, 0.9);
//   box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.4);
//   width: 100%;
//   max-width: 500px;
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   opacity: 1;
//   transition: opacity 0.3s ease;

//   h2 {
//     text-align: center;
//     color: #ff9c00;
//   }

//   input,
//   select {
//     width: 100%;
//     padding: 12px;
//     border-radius: 6px;
//     background-color: #01253a;
//     color: white;
//   }

//   button {
//     padding: 14px;
//     border-radius: 8px;
//     background-color: #007bff;
//     color: white;
//     font-size: 18px;
//     cursor: pointer;
//   }

//   button:disabled {
//     background-color: #4a4a4a;
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-top: -10px;
// `;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";

// const CreateTournament = () => {
//   const navigate = useNavigate();
//   const getCurrentDateTime = () => new Date().toISOString().slice(0, 16);

//   const [formData, setFormData] = useState({
//     tournamentName: "",
//     tournamentUrl: "",
//     startDate: getCurrentDateTime(),
//     game: "FREEFIRE",
//     region: "Nepal",
//     status: "Public",
//   });

//   const [countries, setCountries] = useState([]);
//   const [nameError, setNameError] = useState("");
//   const [urlError, setUrlError] = useState("");
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         const countryNames = data.map((country) => country.name.common);
//         const sortedCountries = [
//           "Nepal",
//           ...countryNames.filter((name) => name !== "Nepal").sort(),
//         ];
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };

//       if (name === "tournamentName") {
//         const formattedUrl = value
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[^a-z0-9-]/g, "");
//         updatedData.tournamentUrl = `communitygaming.io/tournament/${formattedUrl}`;
//       }
//       return updatedData;
//     });

//     if (name === "tournamentName" && value.trim() !== "") {
//       try {
//         const response = await axios.post("http://localhost:4000/tour/check-name", {
//           tournamentName: value,
//         });

//         if (!response.data.success) {
//           setNameError("Tournament name is already taken.");
//         } else {
//           setNameError("");
//         }
//       } catch (error) {
//         console.error("Error validating name:", error.response?.data || error.message);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { startDate, ...otherData } = formData;
//       const userId = localStorage.getItem("userId");
//       const payload = {
//         ...otherData,
//         startDate: new Date(startDate).toISOString(),
//         userId,
//       };
//       const response = await axios.post("http://localhost:4000/tour/create", payload);
//       console.log("Tournament created successfully:", response.data);
//       navigate("/brackets");
//     } catch (error) {
//       console.error("Error creating tournament:", error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || "Something went wrong";
//       if (errorMessage.includes("name")) {
//         setNameError(errorMessage);
//       } else if (errorMessage.includes("URL")) {
//         setUrlError(errorMessage);
//       } else {
//         alert(`Error: ${errorMessage}`);
//       }
//     }
//   };

//   const handleMyTournaments = () => {
//     navigate("/my-tournament");
//   };

//   const handleShowForm = () => {
//     setIsFormVisible((prevState) => !prevState);
//   };

//   return (
//     <Container>
//       <ButtonContainer>
//         <button onClick={handleShowForm}>
//           {isFormVisible ? "Close Form" : "Create Tournament"}
//         </button>
//         <button onClick={handleMyTournaments}>My Tournaments</button>
//       </ButtonContainer>

//       {isFormVisible ? (
//         <Form onSubmit={handleSubmit}>
//           <h2>Create Tournament</h2>
//           <label>
//             Tournament Name:
//             <input
//               type="text"
//               name="tournamentName"
//               value={formData.tournamentName}
//               onChange={handleChange}
//               placeholder="Enter tournament name"
//               required
//             />
//           </label>
//           {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

//           <label>
//             Tournament URL:
//             <input
//               type="text"
//               name="tournamentUrl"
//               value={formData.tournamentUrl}
//               readOnly
//             />
//           </label>
//           {urlError && <ErrorMessage>{urlError}</ErrorMessage>}

//           <label>
//             Start Date:
//             <input
//               type="datetime-local"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//             />
//           </label>

//           <label>
//             Game:
//             <select name="game" value={formData.game} onChange={handleChange} required>
//               <option value="PUBG">PUBG</option>
//               <option value="FREEFIRE">Freefire</option>
//               <option value="FORTNITE">Fortnite</option>
//               <option value="COD">COD</option>
//               <option value="CLASH ROYALE">Clash Royale</option>
//               <option value="COUNTER-STRIKE 2">Counter-Strike 2</option>
//               <option value="CYBERPUNK 2077">Cyberpunk 2077</option>
//               <option value="GTA SAN ANDRES">GTA San Andres</option>
//               <option value="POKEMON GO">Pokemon Go</option>
//               <option value="COC">COC</option>
//             </select>
//           </label>

//           <label>
//             Region:
//             <select name="region" value={formData.region} onChange={handleChange} required>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label>
//             Status:
//             <select name="status" value={formData.status} onChange={handleChange}>
//               <option value="Public">Public</option>
//               <option value="Private">Private</option>
//             </select>
//           </label>

//           <button type="submit" disabled={!!nameError || !!urlError}>
//             Create Tournament
//           </button>
//         </Form>
//       ) : (
//         <Placeholder>
//           <h2>Welcome to the Tournament Dashboard</h2>
//           <p>Click "Create Tournament" to begin or view your tournaments.</p>
//         </Placeholder>
//       )}
//     </Container>
//   );
// };

// export default CreateTournament;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;
//   background: url("images/bluemoroon3.jpg") no-repeat center center/cover;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   margin-top: 20px;

//   button {
//     padding: 12px 24px;
//     font-size: 16px;
//     border-radius: 6px;
//     border: none;
//     background-color: #007bff;
//     color: white;
//     cursor: pointer;
//     transition: 0.3s ease;
//   }

//   button:hover {
//     background-color: #0056b3;
//   }
// `;

// const Form = styled.form`
//   margin-top: 20px;
//   padding: 40px;
//   border-radius: 10px;
//   background-color: rgba(2, 20, 45, 0.9);
//   box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.4);
//   width: 100%;
//   max-width: 500px;
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;

//   h2 {
//     text-align: center;
//     color: #ff9c00;
//   }

//   input,
//   select {
//     width: 100%;
//     padding: 12px;
//     border-radius: 6px;
//     background-color: #01253a;
//     color: white;
//   }

//   button {
//     padding: 14px;
//     border-radius: 8px;
//     background-color: #007bff;
//     color: white;
//     font-size: 18px;
//     cursor: pointer;
//   }

//   button:disabled {
//     background-color: #4a4a4a;
//     cursor: not-allowed;
//   }
// `;

// const Placeholder = styled.div`
//   margin-top: 50px;
//   text-align: center;
//   color: white;

//   h2 {
//     font-size: 24px;
//     color: #ff9c00;
//   }

//   p {
//     font-size: 16px;
//     color: #ffffff;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-top: -10px;
// `;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CreateTournament = () => {
  const navigate = useNavigate();
  const getCurrentDateTime = () => new Date().toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentUrl: "",
    startDate: getCurrentDateTime(),
    game: "FREEFIRE",
    region: "Nepal",
    status: "Public",
  });

  const [countries, setCountries] = useState([]);
  const [nameError, setNameError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        const sortedCountries = [
          "Nepal",
          ...countryNames.filter((name) => name !== "Nepal").sort(),
        ];
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "tournamentName") {
        const formattedUrl = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        updatedData.tournamentUrl = `communitygaming.io/tournament/${formattedUrl}`;
      }
      return updatedData;
    });

    if (name === "tournamentName" && value.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:4000/tour/check-name", {
          tournamentName: value,
        });

        if (!response.data.success) {
          setNameError("Tournament name is already taken.");
        } else {
          setNameError("");
        }
      } catch (error) {
        console.error("Error validating name:", error.response?.data || error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { startDate, ...otherData } = formData;
      const userId = localStorage.getItem("userId");
      const payload = {
        ...otherData,
        startDate: new Date(startDate).toISOString(),
        userId,
      };
      const response = await axios.post("http://localhost:4000/tour/create", payload);
      console.log("Tournament created successfully:", response.data);
      navigate("/brackets");
    } catch (error) {
      console.error("Error creating tournament:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Something went wrong";
      if (errorMessage.includes("name")) {
        setNameError(errorMessage);
      } else if (errorMessage.includes("URL")) {
        setUrlError(errorMessage);
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  const handleMyTournaments = () => {
    navigate("/my-tournament"); // Redirects to My Tournaments page
  };

  const handleShowForm = () => {
    setIsFormVisible((prevState) => !prevState); // Toggle the form visibility
  };

  return (
    <Container>
      <ButtonContainer>
        <button onClick={handleShowForm}>
          {isFormVisible ? "Close Form" : "Create Tournament"}
        </button>
        <button onClick={handleMyTournaments}>My Tournaments</button>
      </ButtonContainer>

      {isFormVisible ? (
        <Form onSubmit={handleSubmit}>
          <h2>Create Tournament</h2>
          <label>
            Tournament Name:
            <input
              type="text"
              name="tournamentName"
              value={formData.tournamentName}
              onChange={handleChange}
              placeholder="Enter tournament name"
              required
            />
          </label>
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

          <label>
            Tournament URL:
            <input
              type="text"
              name="tournamentUrl"
              value={formData.tournamentUrl}
              readOnly
            />
          </label>
          {urlError && <ErrorMessage>{urlError}</ErrorMessage>}

          <label>
            Start Date:
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Game:
            <select name="game" value={formData.game} onChange={handleChange} required>
              <option value="PUBG">PUBG</option>
              <option value="FREEFIRE">Freefire</option>
              <option value="FORTNITE">Fortnite</option>
              <option value="COD">COD</option>
              <option value="CLASH ROYALE">Clash Royale</option>
              <option value="COUNTER-STRIKE 2">Counter-Strike 2</option>
              <option value="CYBERPUNK 2077">Cyberpunk 2077</option>
              <option value="GTA SAN ANDRES">GTA San Andres</option>
              <option value="POKEMON GO">Pokemon Go</option>
              <option value="COC">COC</option>
            </select>
          </label>

          <label>
            Region:
            <select name="region" value={formData.region} onChange={handleChange} required>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </label>

          <button type="submit" disabled={!!nameError || !!urlError}>
            Create Tournament
          </button>
        </Form>
      ) : (
        <Placeholder>
          <h2>Welcome to the Tournament Dashboard</h2>
          <p>Click "Create Tournament" to begin or view your tournaments.</p>
        </Placeholder>
      )}
    </Container>
  );
};

export default CreateTournament;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: url("images/bluemoroon3.jpg") no-repeat center center/cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  button {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  padding: 40px;
  border-radius: 10px;
  background-color: rgba(2, 20, 45, 0.9);
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 500px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    text-align: center;
    color: #ff9c00;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    background-color: #01253a;
    color: white;
  }

  button {
    padding: 14px;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #4a4a4a;
    cursor: not-allowed;
  }
`;

const Placeholder = styled.div`
  margin-top: 50px;
  text-align: center;
  color: white;

  h2 {
    font-size: 24px;
    color: #ff9c00;
  }

  p {
    font-size: 16px;
    color: #ffffff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
`;
