import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Community() {
  return (
    <Div>
      <Modal />
      <Theme title="Community"
        image='./images/community.png'
        description='Join a vibrant community of gamers where you can connect, chat, and collaborate with others who share your passion for gaming. Build your profile, join forums, and participate in discussions about your favorite games.'
      />

      <div className="communities">
        <h1>Wanna join community ?</h1>
        <p>Here some popular brands</p><br/>
        <div className="community-list">
          <div className="community-1">
            <img src="https://play-lh.googleusercontent.com/XCdNhduGkQeEET0kmAvCo9kCFRZhdmVtZ4doAO9kGzfmxV85gF_5j4phzedxc1lhvYc" alt=""/>
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_3-IBq9D0_UzhFSC-58VpJMvwYCCt5D1G-geiRXM0cEzIyAEbNxMcEhszw7Se8vqrdM&usqp=CAU" alt=""/>
            <div className="details">
              <h2>Team Dragon</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
          <div className="community-1">
            <img src="https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/74408/optimized_product_thumb_stage.jpg" alt=""/>
            <div className="details">
              <h2>Simulator Gaming</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui culpa sed sequi corporis voluptas saepe id accusantium ipsum et vel doloremque esse inventore error adipisci eos, alias consequatur optio debitis!</p>
              <button>Explore</button>
              <button>Join</button>
            </div>
          </div>
        </div>
      </div>
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
  height: 500px;
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
        transition: all 0.5s ease-in;
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


`

export default Community;