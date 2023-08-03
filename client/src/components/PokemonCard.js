import { Col } from "react-bootstrap";

export const PokemonCard = ({ name, type1, type2, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{name}</h4>
          <h5>
            {type1} {type2}
          </h5>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
