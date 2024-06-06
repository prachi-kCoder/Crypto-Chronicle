import React from 'react'
import {DNA} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:"center", height:"100vh"}}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}

export default Loader;