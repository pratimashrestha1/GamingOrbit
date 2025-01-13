// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaCamera, FaEdit, FaTrash, FaUsers, FaProjectDiagram } from 'react-icons/fa';
// import styled from 'styled-components';

// const ViewTournament = () => {
//   const location = useLocation();
//   const tournament = location.state?.tournament;

//   const [profileImage, setProfileImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const storageLink = "https://example.com/storage-link"; // Replace with actual storage link

//   if (!tournament) {
//     return <div style={{ textAlign: 'center', marginTop: '100px' }}>No tournament data available.</div>;
//   }

//   return (
//     <Wrapper>
//       <div className="main-container">
//           <div className="navbar">
//             <p className="styled-region">{tournament.region}</p>
//             <h2 className="styled-tournament-name">{tournament.tournamentName}</h2>
//             <p className="styled-game">{tournament.game}</p>
//           </div>

//           {/* <div className="cover-photo"></div> */}

//           <div className="profile-section">
//             {profileImage ? (
//               <img className="profile-image" src={profileImage} alt="Profile" />
//             ) : (
//               <span>No Profile Picture</span>
//             )}
//             <div className="camera-icon-wrapper">
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="profile-pic-upload"
//                 onChange={handleImageUpload}
//                 style={{ display: 'none' }}
//               />
//             </div>
//             <label htmlFor="profile-pic-upload">
//               <FaCamera />
//             </label>
//           </div>

//         <div className="button-container">
//           <div className="button-row">
//             <button className="button">
//               <span className="icon-wrapper">
//                 <FaEdit />
//               </span>
//               Join tournament
//             </button>
//             <button className="button">
//               <span className="icon-wrapper">
//                 <FaUsers />
//               </span>
//               See Participants
//             </button>
//             <button className="button">
//               <span className="icon-wrapper">
//                 <FaProjectDiagram />
//               </span>
//               See Bracket Seeding
//             </button>
//           </div>
//         </div>

//         {profileImage && (
//           <a className="storage-link" href={storageLink} target="_blank" rel="noopener noreferrer">
//             View Profile Picture in Storage
//           </a>
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// export default ViewTournament;

// const Wrapper = styled.div`
// .main-container {
//   // padding-top: 120px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// }

// .navbar {
//   margin-top: 100px;
//   width: 100%;
//   background: #121212;
//   color: white;
//   padding: 20px 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// }

// .styled-region {
//   color: white;
//   font-weight: bold;
//   font-size: 16px;
//   margin: 0;
// }

// .styled-tournament-name {
//   color: #8b0000;
//   font-size: 32px;
//   font-weight: 900;
//   margin: 5px 0;
// }

// .styled-game {
//   color: white;
//   font-size: 18px;
//   margin: 0;
// }

// .cover-photo {
//   width: 100%;
//   height: 300px;
//   background: url('https://via.placeholder.com/1600x900') center/cover no-repeat;
//   margin-top: 120px;
// }

// .profile-section {
//   width: 100%;
//   height: 300px;
//   background-color: #f1f1f1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   margin-top: 0;
// }

// .profile-image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// .camera-icon-wrapper {
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   background-color: #007bff;
//   border-radius: 50%;
//   padding: 10px;
//   cursor: pointer;
//   color: white;
//   font-size: 20px;
//   transition: background-color 0.3s;
// }

// .camera-icon-wrapper:hover {
//   background-color: #0056b3;
// }

// .button-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 40px;
// }

// .button-row {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   gap: 20px;
//   margin-top: 20px;
// }

// .button {
//   background: #007bff;
//   color: white;
//   font-size: 16px;
//   padding: 15px 30px;
//   margin: 10px 0;
//   border: none;
//   border-radius: 5px;
//   width: 200px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.3s;
// }

// .button:hover {
//   background: #0056b3;
// }

// .button:active {
//   background: #003d80;
// }

// .icon-wrapper {
//   margin-right: 10px;
// }

// .storage-link {
//   margin-top: 10px;
//   font-size: 14px;
//   color: #007bff;
//   text-decoration: none;
// }

// .storage-link:hover {
//   text-decoration: underline;
// }

// `
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCamera, FaEdit, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import styled from 'styled-components';

const ViewTournament = () => {
  const location = useLocation();
  const tournament = location.state?.tournament;

  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const storageLink = "https://example.com/storage-link"; // Replace with actual storage link

  if (!tournament) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>No tournament data available.</div>;
  }

  return (
    <Wrapper>
      <div className="main-container">
          <div className="navbar">
            <h2 className="styled-tournament-name">{tournament.tournamentName}</h2>
          </div>

          {/* <div className="cover-photo"></div> */}

          <div className="profile-section">
            {profileImage ? (
              <img className="profile-image" src={profileImage} alt="Profile" />
            ) : (
              <span>No Profile Picture</span>
            )}
            <div className="camera-icon-wrapper">
              <input
                type="file"
                accept="image/*"
                id="profile-pic-upload"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            <label htmlFor="profile-pic-upload">
              <FaCamera />
            </label>
          </div>

        <div className="button-container">
          <div className="button-row">
            <button className="button">
              <span className="icon-wrapper">
                <FaEdit />
              </span>
              Join tournament
            </button>
            <button className="button">
              <span className="icon-wrapper">
                <FaUsers />
              </span>
              See Participants
            </button>
            <button className="button">
              <span className="icon-wrapper">
                <FaProjectDiagram />
              </span>
              See Bracket Seeding
            </button>
          </div>
        </div>

        {profileImage && (
          <a className="storage-link" href={storageLink} target="_blank" rel="noopener noreferrer">
            View Profile Picture in Storage
          </a>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewTournament;

const Wrapper = styled.div`
.main-container {
  // padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.navbar {
  margin-top: 100px;
  width: 100%;
  background: #121212;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-region {
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}

.styled-tournament-name {
  color: #8b0000;
  font-size: 32px;
  font-weight: 900;
  margin: 5px 0;
}

.styled-game {
  color: white;
  font-size: 18px;
  margin: 0;
}

.cover-photo {
  width: 100%;
  height: 300px;
  background: url('https://via.placeholder.com/1600x900') center/cover no-repeat;
  margin-top: 120px;
}

.profile-section {
  width: 100%;
  height: 300px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-icon-wrapper {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #007bff;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  transition: background-color 0.3s;
}

.camera-icon-wrapper:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.button {
  background: #007bff;
  color: white;
  font-size: 16px;
  padding: 15px 30px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.button:hover {
  background: #0056b3;
}

.button:active {
  background: #003d80;
}

.icon-wrapper {
  margin-right: 10px;
}

.storage-link {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.storage-link:hover {
  text-decoration: underline;
}

`
