import "./HotelCard.css";

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.title}
        className="hotel-image"
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
          <button className="edit-button">Edit</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;