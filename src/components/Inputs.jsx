import React from 'react'
import "../index.css"


const Inputs = ({ name,type,formik, placeholder,icon}) => {
  return (
   <>
 <div>
  <div className='d-flex mb-3 flex-row bg-grey rounded-3'>
  <span className='py-1 my-1 ps-3 pe-1'>{icon}</span>
      <input
        type={type}
        name={name}
        value={formik.values[name]}        
        onChange={formik.handleChange}       
        onBlur={formik.handleBlur}          
        placeholder={placeholder}
        className="border-0 w-100 my-1 bg-grey rounded-3 px-2 py-1"
      /></div> 
      {formik.touched[name] && formik.errors[name] ? (
        <div className='flex-column formargin text-danger text-start mb-2 fs-7'>{formik.errors[name]}</div>
      ) : null}
    </div>   </>
  )
}

export default Inputs