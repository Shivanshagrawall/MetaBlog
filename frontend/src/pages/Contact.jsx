import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
          <h1 className='text-center text-3xl uppercase font-bold my-8'>Contact us</h1>
          <p className=' text-center text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto my-6'>{" "}
          Let's Connect!
          <br />
Have questions, feedback, or just want to say hello?
<br />
I'd love to hear from you! Fill out the form below or drop me a message—I'll get back to you as soon as I can.
          </p>
    
          <div>
            <img src={assets.contact} alt="contact" />
          </div>
        </div>
  )
}

export default Contact