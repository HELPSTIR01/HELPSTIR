import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #555;
`;

export const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0066cc;
  font-size: 1.5rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: #004499;
  }
`;

export const DetailRow = styled.tr`
  background-color: #f9f9f9;
`;

export const DetailCell = styled.td`
  padding: 0;
`;

export const DetailContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DetailSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const DetailCard = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: solid 1px #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #555;
`;

export const InfoValue = styled.span`
  color: #333;
`;

export const ActionButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;

  ${({ status }) => {
    switch (status) {
      case "PENDING":
        return `
          background-color: #fff8e1;
          color: #f57c00;
        `;
      case "ACCEPTED":
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
      case "REJECTED":
        return `
          background-color: #ffebee;
          color: #c62828;
        `;
      default:
        return `
          background-color: #e0e0e0;
          color: #616161;
        `;
    }
  }}
`;

export const MatchScore = styled.div<{ score: number }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ score }) => {
    if (score >= 80) return "#4caf50";
    if (score >= 60) return "#8bc34a";
    if (score >= 40) return "#ffc107";
    return "#ff5722";
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #0066cc;
    border-color: #0066cc transparent #0066cc transparent;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 150px;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
  min-width: 200px;
`;
