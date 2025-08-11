/* eslint-disable */
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
  ProgramsSection,
  SectionTitle,
  ProgramCard,
  ProgramTitle,
  RemoveButton,
  AddProgramButton,
  SubmitButton,
} from "../../../styles/ngo-scheme/styles";
import { addNGOScheme } from "@/services";

// Define the initial structure for a single program
const initialProgramState = {
  programName: "",
  capacity: "",
  ageCriteria: "",
  educationLevel: "", // elementary, primary, upskilling
};

export default function CreateNgoProfilePage() {
  // State for basic NGO info
  const [ngoName, setNgoName] = useState("");
  const [ngoLocation, setNgoLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  // State for the list of programs
  const [programs, setPrograms] = useState([initialProgramState]); // Start with one empty program

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
        const { latitude: lat, longitude: lng } = position.coords;

        // Set the coordinates and update the location field
        setLatitude(lat.toString());
        setLongitude(lng.toString());
        setNgoLocation(`Lat: ${lat.toFixed(6)}, Long: ${lng.toFixed(6)}`);

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

  // Handler for NGO Name and Location inputs
  const handleNgoInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "ngoName") {
      setNgoName(value);
    } else if (name === "ngoLocation") {
      setNgoLocation(value);
    }
  };

  // Handler for changes within a specific program
  const handleProgramChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedPrograms = programs.map((program, i) =>
      i === index ? { ...program, [name]: value } : program
    );
    setPrograms(updatedPrograms);
  };

  // Function to add a new program entry
  const handleAddProgram = () => {
    setPrograms([...programs, { ...initialProgramState }]); // Add a new empty program object
  };

  // Function to remove a program entry
  const handleRemoveProgram = (index: number) => {
    // Prevent removing the last program entry if desired, or handle accordingly
    if (programs.length <= 1) {
      alert("You must have at least one program.");
      return;
    }
    const updatedPrograms = programs.filter((_, i) => i !== index);
    setPrograms(updatedPrograms);
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true)

    const formData = {
      ngoName,
      location: ngoLocation,
      latitude: Number(latitude),
      longitude: Number(longitude),
      programs: programs.map((program) => ({
        name: program.programName,
        capacity: Number(program.capacity),
        ageCriteria: program.ageCriteria,
        educationLevel: program.educationLevel,
      })),
    };

    try {
      await addNGOScheme(formData);
      alert("NGO profile submitted successfully!");
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.error("Error submitting form:", error);
      alert("Error submitting NGO profile. See console for details.");
    }
  };

  return (
    <Container>
      <Title>Create NGO Profile</Title>
      <Form onSubmit={handleSubmit}>
        {/* NGO Name */}
        <FormGroup>
          <Label htmlFor="ngoName">
            Name of NGO <RequiredMark>*</RequiredMark>
          </Label>
          <Input
            type="text"
            id="ngoName"
            name="ngoName"
            value={ngoName}
            onChange={handleNgoInfoChange}
            required
            placeholder="Enter the NGO's name"
          />
        </FormGroup>

        {/* NGO Location */}
        <FormGroup>
          <Label htmlFor="ngoLocation">
            Location of NGO <RequiredMark>*</RequiredMark>
          </Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              type="text"
              id="ngoLocation"
              name="ngoLocation"
              value={ngoLocation}
              onChange={handleNgoInfoChange}
              required
              placeholder="e.g., City, State, Country"
              style={{ flex: 1, marginRight: "10px" }}
              readOnly={locationLoading}
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              style={{
                padding: "8px 12px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: locationLoading ? "not-allowed" : "pointer",
              }}
            >
              {locationLoading ? "Getting Location..." : "Get Location"}
            </button>
          </div>
          {locationError && (
            <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
              {locationError}
            </div>
          )}
          {latitude && longitude && (
            <div style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>
              Coordinates: {latitude}, {longitude}
            </div>
          )}
        </FormGroup>

        {/* Programs Section */}
        <ProgramsSection>
          <SectionTitle>Programs Offered</SectionTitle>
          {programs.map((program, index) => (
            <ProgramCard key={index}>
              <ProgramTitle>Program #{index + 1}</ProgramTitle>

              {/* Program Name */}
              <FormGroup>
                <Label htmlFor={`programName-${index}`}>
                  Program Name <RequiredMark>*</RequiredMark>
                </Label>
                <Input
                  type="text"
                  id={`programName-${index}`}
                  name="programName"
                  value={program.programName}
                  onChange={(e) => handleProgramChange(index, e)}
                  required
                  placeholder="Name of the program"
                />
              </FormGroup>

              {/* Capacity */}
              <FormGroup>
                <Label htmlFor={`capacity-${index}`}>
                  Capacity <RequiredMark>*</RequiredMark>
                </Label>
                <Input
                  type="number"
                  id={`capacity-${index}`}
                  name="capacity"
                  value={program.capacity}
                  onChange={(e) => handleProgramChange(index, e)}
                  required
                  min="1"
                  placeholder="Number of participants"
                />
              </FormGroup>

              {/* Age Criteria */}
              <FormGroup>
                <Label htmlFor={`ageCriteria-${index}`}>
                  Age Criteria (if any)
                </Label>
                <Input
                  type="text"
                  id={`ageCriteria-${index}`}
                  name="ageCriteria"
                  value={program.ageCriteria}
                  onChange={(e) => handleProgramChange(index, e)}
                  placeholder="e.g., 18-25, 60+, None"
                />
              </FormGroup>

              {/* Level of Education Offered */}
              <FormGroup>
                <Label htmlFor={`educationLevel-${index}`}>
                  Level of Education Offered <RequiredMark>*</RequiredMark>
                </Label>
                <Select
                  id={`educationLevel-${index}`}
                  name="educationLevel"
                  value={program.educationLevel}
                  onChange={(e) => handleProgramChange(index, e)}
                  required
                >
                  <option value="" disabled>
                    -- Select Education Level --
                  </option>
                  <option value="After school support">After school support </option>
                  <option value="Ready for school">Ready for school                  </option>
                  <option value="Upskilling">Upskilling</option>
                </Select>
              </FormGroup>

              {/* Remove Program Button */}
              {programs.length > 1 && (
                <RemoveButton
                  type="button"
                  onClick={() => handleRemoveProgram(index)}
                  title="Remove Program"
                >
                  &times;
                </RemoveButton>
              )}
            </ProgramCard>
          ))}

          {/* Add Program Button */}
          <AddProgramButton type="button" onClick={handleAddProgram}>
            + Add Another Program
          </AddProgramButton>
        </ProgramsSection>

        {/* Submit Button */}
        <FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Submitting NGO Profile...' : 'Submit NGO Profile'}
          </SubmitButton>
        </FormGroup>
      </Form>
    </Container>
  );
}
