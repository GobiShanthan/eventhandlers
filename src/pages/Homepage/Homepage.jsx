import React from 'react'

import { 
  HomeContainer,
  GoldPaint,
  GoldBorder,
  EH,
  Handlers,
  Event,
  LogoWrapper
} from './Homepage.styled'

import four from '../../images/4.webp'
import five from '../../images/5.webp'
import six from '../../images/6.webp'
import seven from '../../images/7.webp'
import eight from '../../images/8.webp'



const ehVariants ={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity: 1,
    transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:2.2}
  },
  exit:{

  }
}


const goldPaintVariants ={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity: 1,
    transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:1.2}
  },
  exit:{

  }
}

const goldBorderVariants ={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity: 1,
    transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:2}
  },
  exit:{

  }
}





const eventVariants ={
  hidden:{
    opacity:0,
    scale:0
  },
  visible:{
    opacity: 1,
    scale:1 ,
    x:'-160px',
    y:'120px',
    transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:0}
  },
  exit:{

  }
}

const handlerVariants ={
  hidden:{
    opacity:0,
    scale:0,
    x:'-110px',
    y:'240px',
  },
  visible:{
    opacity: 1,
    scale:1 ,
    x:'-110px',
    y:'240px',
    transition: {type:'spring',duration:2.5,ease:'easeInOut',delay:.5}
  },
  exit:{

  }
}




const Homepage = () => {
  return (
    <HomeContainer>

      <LogoWrapper >
      <GoldPaint variants={goldPaintVariants} src={eight} initial='hidden' animate='visible' exit='exit'/>
      <GoldBorder variants={goldBorderVariants}  src={seven} initial='hidden' animate='visible' exit='exit'/>
      <EH src={six} variants={ehVariants} initial='hidden' animate='visible' />
      <Event variants={eventVariants} src={four} initial='hidden' animate='visible' exit='exit'/>
      <Handlers variants={handlerVariants}  src={five} initial='hidden' animate='visible' exit='exit'/>
      </LogoWrapper>
     
    </HomeContainer>
  )
}

export default Homepage