import React from 'react';
import './styles.scss';

//Destructuring from props, handleChange allows to update the field
const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && (
        <label>
          {label}
        </label>
      )}

      <input className="formInput" onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default FormInput; 