/* eslint-disable  */
import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  RequiredMark,
  Input,
  Select,
  FileInput,
  PreviewContainer,
  PreviewLabel,
  PreviewImage,
  SubmitButton,
} from "../../../styles/benifitary/styles";
import { ChangeEvent } from "react";
import { addBeneficiary } from "@/services/benifitaries";

export default function CreateProfilePage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    education: "",
    educationLevel: "",
    guardianName: "",
    guardianPhone: "",
    picture: '',
    latitude: "",
    longitude: "",
  });
  // State for the picture file
  const [picture, setPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | ArrayBuffer | null>(null); // For showing a preview
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setLocationLoading(true);
    setLocationError("");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get address from coordinates
        // For simplicity, we'll just store the coordinates and display them
        setFormData((prevData) => ({
          ...prevData,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          location: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
        }));
        
        setLocationLoading(false);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Get location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Generic handler for text, number, and select inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value, picture, picturePreview );
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Specific handler for the file input
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      setPicture(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicture(null);
      setPicturePreview(null);
    }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with data:", formData);
    setLoading(true);
    e.preventDefault(); // Prevent default form submission

    // Create FormData to send multipart data (including the file)
    const dataToSend = new FormData();
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });
    if (picture) {
      dataToSend.append("picture", picture);
    }

    try {
      // Make sure latitude and longitude are included in the form data
      const beneficiaryData = {
        ...formData,
        latitude: Number(formData.latitude) || 0,
        longitude: Number(formData.longitude) || 0,
      };
      
      const data= await addBeneficiary(beneficiaryData, typeof picturePreview === "string" ? picturePreview : "");
      if(data){
        alert("Profile submitted successfully!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error submitting form:", error);
      alert("Error submitting profile. See console for details.");
    }
  };

  return (
    <Container>
      <Title>Create Your Profile</Title>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <FormGroup>
          <Label htmlFor="name">
            Name <RequiredMark>*</RequiredMark>
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </FormGroup>

        {/* Age */}
        <FormGroup>
          <Label htmlFor="age">
            Age <RequiredMark>*</RequiredMark>
          </Label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
            placeholder="Enter your age"
          />
        </FormGroup>

        {/* Gender */}
        <FormGroup>
          <Label htmlFor="gender">
            Gender <RequiredMark>*</RequiredMark>
          </Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select Gender --
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        {/* Location */}
        <FormGroup>
          <Label htmlFor="location">
            Location <RequiredMark>*</RequiredMark>
          </Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., City, Country"
              style={{ flex: 1, marginRight: '10px' }}
              readOnly={locationLoading}
            />
            <button 
              type="button" 
              onClick={getCurrentLocation}
              disabled={locationLoading}
              style={{
                padding: '8px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: locationLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {locationLoading ? 'Getting Location...' : 'Get Location'}
            </button>
          </div>
          {locationError && (
            <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
              {locationError}
            </div>
          )}
          {(formData.latitude && formData.longitude) && (
            <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
              Coordinates: {formData.latitude}, {formData.longitude}
            </div>
          )}
        </FormGroup>

        {/* Picture (Optional) */}
        <FormGroup>
          <Label htmlFor="picture">Picture (Optional)</Label>
          <FileInput
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg, image/gif"
            onChange={handlePictureChange}
          />
          {picturePreview && (
            <PreviewContainer>
              <PreviewLabel>Preview:</PreviewLabel>
              <PreviewImage src={typeof picturePreview === "string" ? picturePreview : undefined} alt="Selected preview" />
            </PreviewContainer>
          )}
        </FormGroup>

        {/* Level of Education Required */}
        <FormGroup>
          <Label htmlFor="education">
            Level of Education Required <RequiredMark>*</RequiredMark>
          </Label>
          <Select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          >
            <option value=""  disabled>
              -- Select Education Level --
            </option>
            <option value="After school support" >After school support</option>  
            <option value="Ready for school">Ready for school</option>  
            <option value="Upskilling">Upskilling</option>  

            </Select>
        </FormGroup>

        <Label> Guardian details:</Label>
        <FormGroup>
          <Label htmlFor="guardianName">
            Guardian Name <RequiredMark>*</RequiredMark>
          </Label>
          <Input
            id="guardianName"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            type="text"
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="guardianPhone">
            Guardian Phone <RequiredMark>*</RequiredMark>
          </Label>
          <Input
            id="guardianPhone"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            type="text"
            required
          ></Input>
        </FormGroup>

        {/* Submit Button */}
        <FormGroup>
          <SubmitButton type="submit" disabled={loading}>{loading? 'Submiting  Profile...': 'Submit Profile'}</SubmitButton>
        </FormGroup>
      </Form>
    </Container>
  );
}




