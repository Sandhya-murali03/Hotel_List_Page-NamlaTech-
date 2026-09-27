import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getHotelById } from "../services/hotelApi";

import "./HotelDetails.css";

const API_BASE_URL = "http://localhost:5000";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHotelById(id);

        console.log("Hotel details response:", data);

        if (!data.success) {
          setError(
            data.message || "Hotel not found."
          );
          setHotel(null);
          return;
        }

        let imageUrl = "";

        if (data.hotel.image) {
          if (
            data.hotel.image.startsWith("http")
          ) {
            imageUrl = data.hotel.image;
          } else if (
            data.hotel.image.startsWith("/")
          ) {
            imageUrl =
              `${API_BASE_URL}${data.hotel.image}`;
          } else {
            imageUrl =
              `${API_BASE_URL}/${data.hotel.image}`;
          }
        }

        const formattedHotel = {
          ...data.hotel,
          price: Number(data.hotel.price),
          latitude: Number(data.hotel.latitude),
          longitude: Number(data.hotel.longitude),
          image: imageUrl,
        };

        setHotel(formattedHotel);

      } catch (error) {
        console.error(
          "GET HOTEL DETAILS ERROR:",
          error
        );

        setHotel(null);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch hotel."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="hotel-details-page">
        <div className="hotel-not-found">
          <h2>Loading Hotel...</h2>
          <p>
            Fetching hotel details from the server.
          </p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-details-page">
        <div className="hotel-not-found">

          <h2>Hotel Not Found</h2>

          <p>
            {error ||
              "The hotel you are looking for does not exist."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Hotels
          </button>

        </div>
      </div>
    );
  }

  const mapUrl =
    `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=16&output=embed`;

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`,
      "_blank"
    );
  };

  return (
    <div className="hotel-details-page">

      <div className="hotel-details-container">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Hotels
        </button>

        <div className="details-heading">

          <h1>Hotel Details</h1>

          <p>
            View complete information about this hotel.
          </p>

        </div>

        <div className="hotel-details-card">

          <div className="details-image-container">

            {hotel.image ? (
              <img
                src={hotel.image}
                alt={`${hotel.title} hotel`}
                className="details-image"
              />
            ) : (
              <div className="no-image">
                No Image Available
              </div>
            )}

          </div>

          <div className="hotel-info">

            <h2>{hotel.title}</h2>

            <div className="location-box">

              <span className="location-label">
                📍 Location
              </span>

              <p>
                {hotel.location ||
                  "Location information not provided."}
              </p>

            </div>

            <div className="price-box">

              <span>
                Price per night
              </span>

              <strong>
                ₹
                {Number(
                  hotel.price
                ).toLocaleString("en-IN")}
              </strong>

            </div>

            <div className="details-section">

              <h3>Description</h3>

              <p>
                {hotel.description}
              </p>

            </div>

            <div className="details-section">

              <h3>Coordinates</h3>

              <div className="coordinates">

                <div>
                  <span>Latitude</span>

                  <strong>
                    {hotel.latitude}
                  </strong>
                </div>

                <div>
                  <span>Longitude</span>

                  <strong>
                    {hotel.longitude}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="map-section">

          <div className="map-heading">

            <div>

              <h2>Hotel Location</h2>

              <p>
                Map location based on the hotel's
                latitude and longitude.
              </p>

            </div>

            <button
              type="button"
              className="open-map-button"
              onClick={openGoogleMaps}
            >
              Open in Google Maps
            </button>

          </div>

          <div className="map-container">

            <iframe
              title={`${hotel.title} location map`}
              src={mapUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default HotelDetails;