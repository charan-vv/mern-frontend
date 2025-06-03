import { Card, Skeleton } from "antd";
import "./style.scss"; // Reuse same SCSS file or split if needed

const Cards = ({ loading, title, description,gradient,type, }) => {
  return (
    <Card className="custom-card">
    <Skeleton loading={loading} active style={{ height: "100%" }}>
        <Card.Meta title={title} description={description} />
      </Skeleton>
    </Card>
  );
};

export default Cards;
