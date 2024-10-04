import React from 'react'
import Modal from './Components/Modal'
import styled from 'styled-components'
import Theme from './Components/Intro_theme'

function Community() {
  return (
    <Div>    
    <Modal/>
    <Theme title="Community"
     image='./images/community.png'
     description='Join a vibrant community of gamers where you can connect, chat, and collaborate with others who share your passion for gaming. Build your profile, join forums, and participate in discussions about your favorite games.'
     />
    </Div>
  )
}

const Div = styled.div`

`

export default Community