import React from 'react'

function Gradient({text, tagline, use}) {
  return (
    <div className="col-md-6 gradient" style={{ paddingTop: '200px', paddingBottom: '40px' }}>
        <div className="d-flex flex-column py-5">
            <h1 style={{ color: '#FFFFFF', fontSize: '86px' }} className="text-center">{text}</h1>
            <p style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: '200', maxWidth: '300px' }} className="align-self-center text-center pb-5">
                {tagline}
            </p>
            <a href="#" style={{ color: '#FFFFFF', border: '1px solid #FFFFFF', fontSize: '30px', padding: '10px', textDecoration: 'none' }} className="align-self-center px-5">
                {use}
            </a>
        </div>
    </div>
  )
}

export default Gradient