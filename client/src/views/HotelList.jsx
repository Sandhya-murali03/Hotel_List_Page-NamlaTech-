import HotelCard from "../components/HotelCard";
import "./HotelList.css";

function HotelList() {
  const hotels = [
    {
      id: 1,
      image: "/hotel1.jpg",
      title: "Hotel Taj",
      description:
        "A comfortable and elegant hotel offering well-furnished rooms, modern amenities, and a relaxing stay.",
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

  return (
    <div className="hotel-list-page">
      <h1>Our Hotels</h1>

      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </div>
  );
}

export default HotelList;