import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./style.scss"

const PhoneInputComponent = ({ phoneNumber,name, onPhoneChange,error,label,showAsterisk,className }) => {
  return (
    <div className={`phoneInput__wrapper ${className}`}>
     {label && (
        <label className="mb-1 text-[14px]" style={{ display: "block" }}>
          {label}
          {showAsterisk && (
            <span className="asterisk ml-1" style={{ color: "red" }}>
              *
            </span>
          )}
        </label>
      )}
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={onPhoneChange}
        defaultCountry="IN" 
        international
        countryCallingCodeEditable ={true}
        name={name}
        
      />
       {error && (
        <div className="text-[red] mt-1 ml-2" style={{ fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default PhoneInputComponent;
