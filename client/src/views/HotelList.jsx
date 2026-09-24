
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HotelCard from "../components/HotelCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import DeleteConfirm from "../components/DeleteConfirm";
import SuccessPopup from "../components/SuccessPopup";

import hotel1 from "../assets/images/hotel1.jpeg";
import hotel2 from "../assets/images/hotel2.jpeg";
import hotel3 from "../assets/images/hotel3.jpeg";
import hotel4 from "../assets/images/hotel4.jpeg";
import hotel5 from "../assets/images/hotel5.jpeg";
import hotel6 from "../assets/images/hotel6.jpeg";

import "./HotelList.css";

function HotelList() {
  const navigate = useNavigate();

  // --------------------------------
  // Hotel Data
  // --------------------------------
  const [hotels, setHotels] = useState([
    {
      id: 1,
      image: hotel1,
      title: "The Taj Mahal Palace",
      location: "Apollo Bunder, Colaba, Mumbai, Maharashtra",
      description:
        "A landmark luxury hotel overlooking the Gateway of India in Mumbai.",
      price: 25000,
      latitude: 18.921778,
      longitude: 72.833285,
    },

    {
      id: 2,
      image: hotel2,
      title: "ITC Grand Chola",
      location: "63, Anna Salai, Guindy, Chennai, Tamil Nadu",
      description:
        "A luxury hotel in Chennai inspired by the architectural heritage of the Chola dynasty.",
      price: 18000,
      latitude: 13.010574,
      longitude: 80.220194,
    },

    {
      id: 3,
      image: hotel3,
      title: "The Leela Palace Bengaluru",
      location: "23, Old Airport Road, Bengaluru, Karnataka",
      description:
        "A luxury palace-style hotel located on Old Airport Road in Bengaluru.",
      price: 22000,
      latitude: 12.960569,
      longitude: 77.648481,
    },

    {
      id: 4,
      image: hotel4,
      title: "Taj Falaknuma Palace",
      location: "Falaknuma, Hyderabad, Telangana",
      description:
        "A historic palace property offering a royal luxury experience in Hyderabad.",
      price: 30000,
      latitude: 17.33099,
      longitude: 78.46715,
    },

    {
      id: 5,
      image: hotel5,
      title: "The Oberoi Udaivilas",
      location: "Haridasji Ki Magri, Udaipur, Rajasthan",
      description:
        "A luxury resort overlooking Lake Pichola in the historic city of Udaipur.",
      price: 35000,
      latitude: 24.57718,
      longitude: 73.67253,
    },

    {
      id: 6,
      image: hotel6,
      title: "The Tamara Coorg",
      location: "Kabbinakad Estate, Yavakapadi, Coorg, Karnataka",
      description:
        "A nature-focused luxury resort surrounded by the hills and plantations of Coorg.",
      price: 16000,
      latitude: 12.22578,
      longitude: 75.64938,
    },
  ]);

  // --------------------------------
  // Search & Price Filter
  // --------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // --------------------------------
  // Pagination
  // --------------------------------
  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 3;

  // --------------------------------
  // Delete Popup
  // --------------------------------
  const [hotelToDelete, setHotelToDelete] = useState(null);

  // --------------------------------
  // Success Popup
  // --------------------------------
  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------
  // Reset Pagination
  // --------------------------------
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);

  // --------------------------------
  // Filter Hotels
  // --------------------------------
  const filteredHotels = hotels.filter((hotel) => {
    const searchMatch = hotel.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const minMatch =
      minPrice === "" ||
      hotel.price >= Number(minPrice);

    const maxMatch =
      maxPrice === "" ||
      hotel.price <= Number(maxPrice);

    return searchMatch && minMatch && maxMatch;
  });

  // --------------------------------
  // Pagination
  // --------------------------------
  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const startIndex =
    (currentPage - 1) * hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );

  // --------------------------------
  // Delete
  // --------------------------------
  const handleDeleteClick = (hotel) => {
    setHotelToDelete(hotel);
  };

  const handleDeleteConfirm = () => {
    if (!hotelToDelete) {
      return;
    }

    const deletedTitle = hotelToDelete.title;

    setHotels((previousHotels) =>
      previousHotels.filter(
        (hotel) => hotel.id !== hotelToDelete.id
      )
    );

    setHotelToDelete(null);

    setSuccessMessage(
      `${deletedTitle} deleted successfully.`
    );
  };

  const handleDeleteCancel = () => {
    setHotelToDelete(null);
  };

  // --------------------------------
  // Close Success Popup
  // --------------------------------
  const handleSuccessClose = () => {
    setSuccessMessage("");
  };

  // --------------------------------
  // UI
  // --------------------------------
  return (
    <div className="hotel-list-page">

      {/* Header */}
      <div className="hotel-header">

        <div>
          <h1>Our Hotels</h1>

          <p className="hotel-subtitle">
            Find the perfect stay for your journey
          </p>
        </div>

        <button
          type="button"
          className="add-hotel-button"
          onClick={() => navigate("/add")}
        >
          + Add Hotel
        </button>

      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Hotel Count */}
      <p className="hotel-count">
        {filteredHotels.length} hotel
        {filteredHotels.length !== 1 ? "s" : ""} found
      </p>

      {/* Hotel Cards */}
      {currentHotels.length > 0 ? (

        <div className="hotel-grid">

          {currentHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onDelete={handleDeleteClick}
            />
          ))}

        </div>

      ) : (

        <div className="no-hotels">
          <h3>No hotels found</h3>

          <p>
            Try changing your search or price filters.
          </p>
        </div>

      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Delete Confirmation */}
      <DeleteConfirm
        hotel={hotelToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Success Popup */}
      {successMessage && (
        <SuccessPopup
          message={successMessage}
          onClose={handleSuccessClose}
        />
      )}

    </div>
  );
}

export default HotelList;

