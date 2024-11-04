import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'
import Footer from './Components/Footer'

function Community() {
  return (
    <Div>
      <Modal />
      <Theme title="Community"
        image='./images/community.png'
        description='Join a vibrant community of gamers where you can connect, chat, and collaborate with others who share your passion for gaming. Build your profile, join forums, and participate in discussions about your favorite games.'
      />

      {/* list of some popular communities */}
      <div className="communities">
        <h1>Wanna join community ?</h1>
        <p>Here some popular communites</p><br />
        <div className="community-list">
          <div className="community-1">
            <img src="https://img.freepik.com/premium-vector/elite-squad-editable-text-effect-template_489997-2420.jpg" alt="" />
            <div className="details">
              <h2>Elite Squad</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1631/posts/36822/image-upload/GamingLogoMaker001.jpg" alt="" />
            <div className="details">
              <h2>Light Force Gaming</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_3-IBq9D0_UzhFSC-58VpJMvwYCCt5D1G-geiRXM0cEzIyAEbNxMcEhszw7Se8vqrdM&usqp=CAU" alt="" />
            <div className="details">
              <h2>Team Dragon</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/74408/optimized_product_thumb_stage.jpg" alt="" />
            <div className="details">
              <h2>Simulator Gaming</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://t4.ftcdn.net/jpg/03/20/70/67/360_F_320706748_9EHt2oP8NgekFXsM3INJtN7HhdRHOTJN.jpg" alt="" />
            <div className="details">
              <h2>Devil Wings</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://marketplace.canva.com/EAFQ-IQMSPw/1/0/1600w/canva-dog-gaming-logo-rTy2ycunlTo.jpg" alt="" />
            <div className="details">
              <h2>Fauget Gaming Team</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* create your own community */}
      <div className="community-creation">
        <div class="create-form">
          <form action="http://localhost:4000/postData/communityCreate" method="POST">
            <h1>Make your own community !</h1>
            <input type="text" placeholder='Name of your community' name="cn" />
            <input type="text" placeholder='description' name="description" />
            <input type="text" placeholder='location' name="location" />
            <input type="text" placeholder='game precedence eg:freefire, fortnite, coc, metal gun' name="gameTypes" />
            <label for="privacy">Privacy setting:</label>
            <select name="privacy">
              <option value="anyone">Anyone can join</option>
              <option value="invite">Invite only</option>
            </select><br /><br />
            <label for="file-upload" class="custom-file-upload">
              Attach your profile
            </label><br /><br />
            <input id="file-upload" type="file" name="image" accept="image/*" />
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

h1{
  text-align: center;
  margin: 0px;
}

.communities{
  background-color: white;
  text-align: left;
  height: fit-content;
  p{text-align: center;
    font-style: italic;
    margin: 0;
  }

  .community-list{
    display: grid;
    grid-template-columns: auto auto;
    gap: 2em;
    margin: 0px 2em 0px 2em;
  }
    
    .community-1{
    box-sizing: border-box;
    position: relative;
    display: flex;
    // width: 50%;
    border-radius: 10px;
    height: auto;
    
    .details{
      transition: box-shadow 0.6s ease-in;
      padding-left: 1em;
      background-color: #040c4a;
      color: #fff;
      p{text-align: left;
      margin: 0;
      &::first-letter{font-size: 2em;
        color: red;}}
        h2{margin:0}
    }
      img{
        width: 40%;
        transition: all 0.4s ease-in;
      }

    &:hover{       
      .details{
        box-shadow: inset 600px 0 50px #3c49b0;
      }
        img{
          transform: scale(1.05);
          box-shadow: 5px 10px 10px rgba(0,0,0,0.5);
        }
      .details::before{
        transform: rotate(360deg);
      }
    } 
        
    button{
      margin-right: 10px;
      text-decoration: underline;
      background: transparent;
      border: none;
      color: #fff;      
      padding: 5px;

      &:hover{
        box-shadow: 0px 5px 5px 0px #fff;
      }
    }
  }
}


// create your own community*****************************
.community-creation{
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