import { Avatar as AntAvatar } from "antd";

const CustomAvatar = ({ color, name, src }) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <AntAvatar
      style={{ backgroundColor: color, verticalAlign: "middle",color:"#fff" }}
      size="large"
      src={src}
    >
      {!src && getInitial(name)}
    </AntAvatar>
  );
};

export default CustomAvatar;
