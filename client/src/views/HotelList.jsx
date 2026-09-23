import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HotelCard from "../components/HotelCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

import "./HotelList.css";

function HotelList() {
  const navigate = useNavigate();

  const hotels = [
    {
      id: 1,
      image: "/hotel1.jpg",
      title: "Hotel Taj",
      description:
        "A comfortable and elegant hotel offering well-furnished rooms, modern amenities, and a relaxing stay for both business and leisure travelers.",
      price: 2500,
    },
    {
      id: 2,
      image: "/hotel2.jpg",
      title: "Grand Palace Hotel",
      description:
        "A premium hotel providing spacious rooms, excellent service, and a peaceful environment for travelers.",
      price: 3200,
    },
    {
      id: 3,
      image: "/hotel3.jpg",
      title: "Royal Residency",
      description:
        "A modern hotel with comfortable rooms and convenient facilities for both business and leisure travelers.",
      price: 2800,
    },
    {
      id: 4,
      image: "/hotel4.jpg",
      title: "Green Valley Resort",
      description:
        "A relaxing stay surrounded by beautiful surroundings with comfortable rooms and modern facilities.",
      price: 4000,
    },
    {
      id: 5,
      image: "/hotel5.jpg",
      title: "City View Hotel",
      description:
        "A stylish city hotel offering well-designed rooms, modern amenities, and easy access to major locations.",
      price: 3000,
    },
    {
      id: 6,
      image: "/hotel6.jpg",
      title: "Ocean Breeze Hotel",
      description:
        "A peaceful hotel offering comfortable accommodation, beautiful views, and a pleasant atmosphere.",
      price: 4500,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      minPrice === "" ||
      hotel.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" ||
      hotel.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const startIndex =
    (currentPage - 1) * hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );

  return (
    <div className="hotel-list-page">

      {}
      <div className="hotel-header">
        <h1>Our Hotels</h1>

        <button
          className="add-hotel-button"
          onClick={() => navigate("/add")}
        >
          + Add Hotel
        </button>
      </div>

      {}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {}
      <p className="hotel-count">
        {filteredHotels.length} hotel
        {filteredHotels.length !== 1 ? "s" : ""} found
      </p>

      {}
      {currentHotels.length > 0 ? (
        <div className="hotel-grid">
          {currentHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
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

      {}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

    </div>
  );
}

export default HotelList;