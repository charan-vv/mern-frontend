import { useRef } from "react";
import { Input, Flex } from "antd";
import "./style.scss";

const OtpInputGroup = ({ length = 6, value = "", onChange, name, error, }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const otp = value.split("");
      otp[index] = val;
      const newOtp = otp.join("");
      onChange(newOtp);

      if (val && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
   <>
    <Flex gap="small" className="budget_otp_input_group">
      {[...Array(length)].map((_, i) => (
        <Input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          maxLength={1}
          name={name}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="budget_otp_input"
        />
      ))}
      
    </Flex>
    {error && (
        <div className="text-[red] mt-1 ml-2 text-center" style={{ fontSize: 12 }}>
          {error}
        </div>
      )}
   </>
  );
};

export default OtpInputGroup;
