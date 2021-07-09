import { Link } from "react-router-dom";

const ForestCard = ({id, name, thumbnail_image, forest_type, description_brief}) => {
  return (
    <div>
      <Link to={`/details/${id}`}>
        <div>{name}</div>
        <img src={thumbnail_image} alt={name}/>
        <div>Forest Type: {forest_type}</div>
        <div>{description_brief}</div>
      </Link>
    </div>
  )
}

export default ForestCard;