import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HotelFormPage.css";

function HotelFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  // -----------------------------
  // Form State
  // -----------------------------

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  // -----------------------------
  // Handle Input
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // -----------------------------
  // Handle Image
  // -----------------------------

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    setImagePreview(
      URL.createObjectURL(selectedImage)
    );

    setErrors((previousErrors) => ({
      ...previousErrors,
      image: "",
    }));
  };

  // -----------------------------
  // Validation
  // -----------------------------

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Hotel title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Hotel description is required.";
    }

    if (!formData.latitude) {
      newErrors.latitude =
        "Latitude is required.";
    } else if (
      Number(formData.latitude) < -90 ||
      Number(formData.latitude) > 90
    ) {
      newErrors.latitude =
        "Latitude must be between -90 and 90.";
    }

    if (!formData.longitude) {
      newErrors.longitude =
        "Longitude is required.";
    } else if (
      Number(formData.longitude) < -180 ||
      Number(formData.longitude) > 180
    ) {
      newErrors.longitude =
        "Longitude must be between -180 and 180.";
    }

    if (!formData.price) {
      newErrors.price =
        "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price =
        "Price must be greater than 0.";
    }

    if (!isEditMode && !image) {
      newErrors.image =
        "Hotel image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log(
      isEditMode
        ? "Updating hotel..."
        : "Adding hotel..."
    );

    console.log(formData);
    console.log(image);

    // Temporary navigation
    navigate("/");
  };

  // -----------------------------
  // Cancel
  // -----------------------------

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="hotel-form-page">

      <div className="hotel-form-container">

        {/* Header */}

        <div className="form-header">
          <h1>
            {isEditMode
              ? "Edit Hotel"
              : "Add New Hotel"}
          </h1>

          <p>
            {isEditMode
              ? "Update the hotel information below."
              : "Enter the details to add a new hotel."}
          </p>
        </div>

        {/* Form */}

        <form
          className="hotel-form"
          onSubmit={handleSubmit}
        >

          {/* Image Upload */}

          <div className="form-group">

            <label>
              Hotel Image
              <span className="required">*</span>
            </label>

            <div className="image-upload-area">

              {imagePreview ? (
                <div className="image-preview-container">

                  <img
                    src={imagePreview}
                    alt="Hotel preview"
                    className="image-preview"
                  />

                  <label
                    htmlFor="hotel-image"
                    className="change-image-button"
                  >
                    Change Image
                  </label>

                </div>
              ) : (
                <label
                  htmlFor="hotel-image"
                  className="upload-box"
                >
                  <span className="upload-icon">
                    📷
                  </span>

                  <span className="upload-title">
                    Upload Hotel Image
                  </span>

                  <span className="upload-text">
                    Click to choose an image
                  </span>
                </label>
              )}

              <input
                id="hotel-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

            </div>

            {errors.image && (
              <p className="error-message">
                {errors.image}
              </p>
            )}

          </div>

          {/* Title */}

          <div className="form-group">

            <label htmlFor="title">
              Hotel Title
              <span className="required">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter hotel name"
              value={formData.title}
              onChange={handleChange}
            />

            {errors.title && (
              <p className="error-message">
                {errors.title}
              </p>
            )}

          </div>

          {/* Description */}

          <div className="form-group">

            <label htmlFor="description">
              Description
              <span className="required">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Enter hotel description"
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <p className="error-message">
                {errors.description}
              </p>
            )}

          </div>

          {/* Location */}

          <div className="location-row">

            {/* Latitude */}

            <div className="form-group">

              <label htmlFor="latitude">
                Latitude
                <span className="required">*</span>
              </label>

              <input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                placeholder="Example: 10.7905"
                value={formData.latitude}
                onChange={handleChange}
              />

              {errors.latitude && (
                <p className="error-message">
                  {errors.latitude}
                </p>
              )}

            </div>

            {/* Longitude */}

            <div className="form-group">

              <label htmlFor="longitude">
                Longitude
                <span className="required">*</span>
              </label>

              <input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                placeholder="Example: 78.7047"
                value={formData.longitude}
                onChange={handleChange}
              />

              {errors.longitude && (
                <p className="error-message">
                  {errors.longitude}
                </p>
              )}

            </div>

          </div>

          {/* Price */}

          <div className="form-group">

            <label htmlFor="price">
              Price per Night
              <span className="required">*</span>
            </label>

            <div className="price-input">

              <span>₹</span>

              <input
                id="price"
                name="price"
                type="number"
                min="1"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />

            </div>

            {errors.price && (
              <p className="error-message">
                {errors.price}
              </p>
            )}

          </div>

          {/* Buttons */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              {isEditMode
                ? "Update Hotel"
                : "Add Hotel"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default HotelFormPage;