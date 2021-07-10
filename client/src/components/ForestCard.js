import { Link } from "react-router-dom";
import { capitalize } from '../helpers';
import './ForestCard.css'

const ForestCard = ({name, thumbnail_image, forest_type, description_brief}) => {
  return (
    <div className="forest-card">
      <Link to={`/details/${name}`}>
        <h2 className="forest-card__title">{capitalize(name)}</h2>
        <div className="forest-card__image" style={{
          backgroundImage: `url(${thumbnail_image})`,
        }} />
        <div className="forest-card__description">
          <p>Forest Type: {forest_type}</p>
          <p>{description_brief}</p>
        </div>
      </Link>
    </div>
  )
}

export default ForestCard;
