import React, { useContext, useEffect } from 'react'
import notesContext from '../context/notes/notesContext'
const About = () => {
  const a = useContext(notesContext)
  useEffect(() => {
    a.update();
  }, [])
  
  return(
    <div>
      usaid {a.state.name} ahmed {a.state.class}
    </div>
  )
}

export default About