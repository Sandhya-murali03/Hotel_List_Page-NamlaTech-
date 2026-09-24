import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

function HotelCard({ hotel, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.title}
        className="hotel-image"
        onClick={() => navigate(`/hotel/${hotel.id}`)}
      />

      <div className="hotel-content">
        <h3>{hotel.title}</h3>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <p className="hotel-price">
          ₹{hotel.price}
        </p>

        <div className="hotel-actions">
          <button
            type="button"
            className="edit-button"
            onClick={() => navigate(`/edit/${hotel.id}`)}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => {
              console.log("DELETE BUTTON CLICKED");
              onDelete(hotel);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;