/* eslint-disable */
import { useState, useEffect } from "react";
import {
  Container,
  Title,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  ExpandButton,
  DetailRow,
  DetailCell,
  DetailContent,
  DetailSection,
  DetailCard,
  CardTitle,
  CardContent,
  InfoItem,
  InfoLabel,
  InfoValue,
  ActionButton,
  StatusBadge,
  MatchScore,
  NoDataMessage,
  LoadingSpinner,
  ErrorMessage,
  FilterContainer,
  FilterSelect,
  SearchInput,
} from "../../../styles/matchedBenefits/styles";
import {
  getMatchedBenefits,
  acceptBeneficiary,
} from "@/services/matchedBenefits";

// Define TypeScript interfaces for our data
interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  picture?: string;
  educationLevel: string;
  guardianName: string;
  guardianContact: string;
  enrolledPrograms?: EnrolledProgram[];
}
interface EnrolledProgram {
  programName: string;
  ngoName: string;
  enrollmentDate: string;
}


interface Program {
  id:string;
  name: string;
  capacity: number;
  availableCapacity: number;
  distance: number;
  ngoId: string;
  ngoName: string;
  ageCriteria: string;
  educationLevel: string;
}

interface MatchedBenefit {
  id: string;
  beneficiary: Beneficiary;
  matchingPrograms: Program[];
}

export default function MatchedBenefitsPage() {
  // State for matched benefits data
  const [matchedBenefits, setMatchedBenefits] = useState<MatchedBenefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  // Fetch matched benefits on component mount
  useEffect(() => {
    fetchMatchedBenefits();
  }, []);

  // Function to fetch matched benefits data
  const fetchMatchedBenefits = async () => {
    try {
      setLoading(true);
      const data = await getMatchedBenefits();
      setMatchedBenefits(data);
      setError(null);
    } catch (err) {
      setError("Failed to load matched benefits. Please try again later.");
      console.error("Error fetching matched benefits:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle accepting a beneficiary into a program
  const handleAcceptBeneficiary = async (
    beneficiaryId: string,
    programId: string,
    ngoId: string
  ) => {
    try {
      await acceptBeneficiary(beneficiaryId, programId, ngoId);

      // Update the local state to reflect the change
      setMatchedBenefits((prev) =>
        prev.map((match) =>
          match.id === ngoId ? { ...match, status: "ACCEPTED" } : match
        )
      );

      // Show success message
      alert("Beneficiary successfully accepted into the program!");
    } catch (err) {
      console.error("Error accepting beneficiary:", err);
      alert("Failed to accept beneficiary. Please try again.");
    }
  };
  // Filter the matched benefits based on status and search term

  return (
    <Container>
      <Title>Matched Benefits</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingSpinner />
      ) : matchedBenefits.length === 0 ? (
        <NoDataMessage>
         
        "No matched benefits available."
        </NoDataMessage>
      ) : ( 
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader></TableHeader>
                <TableHeader>Beneficiary</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {matchedBenefits.map((match) => (
                <>
                  <TableRow key={match.beneficiary.id}>
                    <TableCell>
                      <ExpandButton
                        onClick={() => toggleRowExpansion(match.beneficiary.id)}
                        aria-label={
                          expandedRows[match.beneficiary.id]
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedRows[match.beneficiary.id] ? "−" : "+"}
                      </ExpandButton>
                    </TableCell>
                    <TableCell>{match.beneficiary.name}</TableCell>
                  </TableRow>

                  {expandedRows[match.beneficiary.id] && (
                    <DetailRow>
                      <DetailCell colSpan={7}>
                        <DetailContent>
                          <DetailSection>
                            <DetailCard>
                              <CardTitle>Beneficiary Details</CardTitle>
                              <CardContent>
                                <InfoItem>
                                  <InfoLabel>Name:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.name}
                                  </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Age:</InfoLabel>
                                  <InfoValue>{match.beneficiary.age}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Gender:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.gender}
                                  </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Location:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.location}
                                  </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Education Level:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.educationLevel}
                                  </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Guardian:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.guardianName}
                                  </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                  <InfoLabel>Guardian Contact:</InfoLabel>
                                  <InfoValue>
                                    {match.beneficiary.guardianContact}
                                  </InfoValue>
                                </InfoItem>
                              </CardContent>
                            </DetailCard>

                            <DetailCard>
                              <CardTitle>Program Details</CardTitle>
                              {match.beneficiary.enrolledPrograms?.map(
                                (program, index) => (
                                  <CardContent key={`program-${index}`}>
                                    <InfoItem>
                                      <InfoLabel>Program Name:</InfoLabel>
                                      <InfoValue>
                                        {program?.programName}
                                      </InfoValue>
                                    </InfoItem>

                                    <InfoItem>
                                      <InfoLabel>NGO name:</InfoLabel>
                                      <InfoValue>{program?.ngoName}</InfoValue>
                                    </InfoItem>
                                    {program.enrollmentDate && (
                                      <InfoItem>
                                        <InfoLabel>Enrollment Date:</InfoLabel>
                                        <InfoValue>
                                          {new Date(Number(program.enrollmentDate)).toLocaleString()}
                                        </InfoValue>
                                      </InfoItem>
                                    )}
                                   
                                  </CardContent>
                                )
                              )}
                            </DetailCard>

                            <DetailCard>
                              <CardTitle>Match Details</CardTitle>
                              {match.matchingPrograms?.map((program, index) => {
                                const isExists= match.beneficiary.enrolledPrograms?.find(
                                  (enrolledProgram) => enrolledProgram.programName === program.name
                                );
                                return (
                                <CardContent key={`matching-program-${index}`}>
                                 
                                  <InfoItem>
                                    <InfoLabel>Program Name:</InfoLabel>
                                    <InfoValue>{program.name}</InfoValue>
                                  </InfoItem>
                                  {program.ageCriteria && (
                                    <InfoItem>
                                      <InfoLabel>Age Criteria:</InfoLabel>
                                      <InfoValue>{program.ageCriteria}</InfoValue>
                                    </InfoItem>
                                  )}
                                  <InfoItem>
                                    <InfoLabel>Education Level:</InfoLabel>
                                    <InfoValue>
                                      {program.educationLevel}
                                    </InfoValue>
                                  </InfoItem>   
                                  <InfoItem>
                                    <InfoLabel>NGO Name :</InfoLabel>
                                    <InfoValue>
                                      {program.ngoName}
                                    </InfoValue>
                                  </InfoItem>  
                                  <InfoItem>
                                    <InfoLabel>Distance :</InfoLabel>
                                    <InfoValue>
                                      {program.distance} km
                                    </InfoValue>
                                  </InfoItem>    
                                  <ActionButton
                                    onClick={() =>
                                      handleAcceptBeneficiary(
                                        match.beneficiary.id,
                                        program.id,
                                        program.ngoId
                                      )
                                    }
                                    style={{ marginTop: "1rem" }}
                                  >
                                    {isExists ? "Already Enrolled" : "Accept"}
                                  </ActionButton>
                                </CardContent>
                              )}
                              )}
                            </DetailCard>
                          </DetailSection>
                        </DetailContent>
                      </DetailCell>
                    </DetailRow>
                  )}
                </>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
