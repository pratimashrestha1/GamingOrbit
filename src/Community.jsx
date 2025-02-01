import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'
import Footer from './Components/Footer'
import CommunityList from './Components/TopCommunities'

function Community() {

  return (
    <Div>
      <Modal />
      <Theme title="Community"
        image='./images/community.png'
        description='Join a vibrant community of gamers where you can connect, chat, and collaborate with others who share your passion for gaming. Build your profile, join forums, and participate in discussions about your favorite games.'
      />

      <CommunityList/>

      {/* create your own community */}
      <div className="community-creation">
        <div class="create-form">
          <form action={`${process.env.REACT_APP_API_BASE_URL}/postData/communityCreate`} method="POST" encType="multipart/form-data">
            <h1>Make your own community!</h1>

            <input type="text" placeholder="Name of your community" name="cn" />

            <textarea placeholder="Description" name="description" />

            <input type="text" placeholder="Location" name="location" />

            <input type="text" placeholder="Game precedence (e.g., Freefire, Fortnite, CoC)" name="gameList" />

            <label htmlFor="privacy">Privacy setting:</label>
            <select name="privacy">
              <option value="anyone">Anyone can join</option>
              <option value="invite">Invite only</option>
            </select>

            <br /><br />

            <label for="file-upload" className="custom-file-upload">Attach your profile</label><br /><br />
            <input id="file-upload" type="file" name="photo" accept="image/*" />

            <button type="submit">Submit</button>
          </form>

        </div>
        <img src="./images/purpleman.png" alt="" />
      </div>

      <Footer />
    </Div>
  )
}

const Div = styled.div`

// create your own community*****************************
.community-creation{
  font-family: ${({theme})=>theme.fontFamily.games};
  width: 100vw;
  height: 500px;
  background-image: linear-gradient(to bottom right,#020f1f,#4d0702);
  background-size: cover;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;

  .create-form{
    color: #fff;
    width: 50%;
    height: 100%;
    display: grid;
    
    form{
    margin:0 auto;

    button{
      margin-left: 120px;
      transition: all 0.5s ease;

      &:hover{
        box-shadow: 0 5px 2px #fff;
        translate: 0 -5px;
      }
    }
    }

    h1{
      // text-align: center;
      margin: 20px 0 20px 0; 
    }
    
    textarea{
      display: block;
      width: 80%;
      margin: 20px 0;     
      background: transparent;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
      height: 4em;
      text-align: center;
      &::placeholder{
        text-align: center;
        font-family: ${({theme})=>theme.fontFamily.games};
      }
        &:focus{
        background: rgba(77,21,45,0.7);
        outline: none;
      }
    }
    
    input{
      display: block;
      width: 80%;
      margin: 20px 0;     
      background: transparent;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
      height: 2em;
      text-align: center;
      &::placeholder{
        text-align: center;
        font-family: ${({theme})=>theme.fontFamily.games};
      }
      
      &:focus{
        background: rgba(77,21,45,0.7);
        outline: none;
      }
    }
    
    select{
      background: transparent;
      color: #fff;
      border-radius: 4px;
      width: 200px;
      margin-left: 20px;
    }
    
    button{
      background: transparent;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 5px 10px;
    }

    input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    display: inline-block;
    padding: 5px 12px;
    cursor: pointer;
    background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 4px;
    margin-left: 80px;
  }

  .custom-file-upload:hover {
    background-color: #0056b3;
  }

  }

  img{
    height: 400px;
    margin: auto;
    filter: drop-shadow(0px 30px 20px rgba(255,255,255,0.5));
  }
}
`

export default Community;