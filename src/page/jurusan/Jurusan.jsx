import React, { useState } from 'react'
import Header from '../../components/header/header.jsx'
import Footer from '../../components/footer/footer.jsx'
import JurusanCard from '../../components/jurusan/jurusan_card.jsx'

import UserState from '../../constant/user_state.jsx'

function Jurusan() {
  const [state, setState] = useState(UserState.GUEST)

  return (
    <>
        <JurusanCard />
    </>
  )
}

export default Jurusan
