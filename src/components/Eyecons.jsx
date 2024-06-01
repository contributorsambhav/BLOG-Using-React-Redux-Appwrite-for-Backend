import React from 'react';

import EyeIcon from './SVGs/eye-on.svg'
import EyeOffIcon from './SVGs/eye-off.svg'

function EyeOn() {
  return (
    <div className='w-5'>
      <img src={EyeIcon} alt="" />
    </div>
  );
}

function EyeOff (){
    return (
        <div className='w-5'>
          <img src={EyeOffIcon} alt="" />
        </div>
      );
}

export {EyeOn , EyeOff};
