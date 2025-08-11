import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MatchedBenefitsPage from './index';
import { getMatchedBenefits, acceptBeneficiary } from '@/services/matchedBenefits';

// Mock the services
jest.mock('@/services/matchedBenefits', () => ({
  getMatchedBenefits: jest.fn(),
  acceptBeneficiary: jest.fn(),
}));

// Sample mock data
const mockMatchedBenefits = [
  {
    id: '1',
    beneficiary: {
      id: 'b1',
      name: 'John Doe',
      age: 12,
      gender: 'male',
      location: 'New York',
      educationLevel: 'primary',
      guardianName: 'Jane Doe',
      guardianContact: '123-456-7890',
    },
    program: {
      id: 'p1',
      programName: 'After School Program',
      capacity: 30,
      ageCriteria: '10-15',
      educationLevel: 'primary',
      organization: {
        id: 'o1',
        name: 'Education First',
        location: 'New York',
      },
    },
    matchScore: 85,
    status: 'PENDING',
  },
  {
    id: '2',
    beneficiary: {
      id: 'b2',
      name: 'Alice Smith',
      age: 16,
      gender: 'female',
      location: 'Boston',
      educationLevel: 'upskill',
      guardianName: 'Bob Smith',
      guardianContact: '987-654-3210',
    },
    program: {
      id: 'p2',
      programName: 'Coding Bootcamp',
      capacity: 20,
      ageCriteria: '15-18',
      educationLevel: 'upskill',
      organization: {
        id: 'o2',
        name: 'Tech Future',
        location: 'Boston',
      },
    },
    matchScore: 92,
    status: 'ACCEPTED',
  },
];

describe('MatchedBenefitsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (getMatchedBenefits as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
    
    render(<MatchedBenefitsPage />);
    
    expect(screen.getByText('Matched Benefits')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // LoadingSpinner
  });

  it('renders matched benefits when data is loaded', async () => {
    (getMatchedBenefits as jest.Mock).mockResolvedValue(mockMatchedBenefits);
    
    render(<MatchedBenefitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('After School Program')).toBeInTheDocument();
      expect(screen.getByText('Coding Bootcamp')).toBeInTheDocument();
    });
  });

  it('expands a row when the expand button is clicked', async () => {
    (getMatchedBenefits as jest.Mock).mockResolvedValue(mockMatchedBenefits);
    
    render(<MatchedBenefitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Find the first expand button and click it
    const expandButtons = screen.getAllByRole('button', { name: /Expand details/i });
    fireEvent.click(expandButtons[0]);
    
    // Check if detailed information is displayed
    expect(screen.getByText('Beneficiary Details')).toBeInTheDocument();
    expect(screen.getByText('Program Details')).toBeInTheDocument();
    expect(screen.getByText('Match Details')).toBeInTheDocument();
  });

  it('calls acceptBeneficiary when Accept button is clicked', async () => {
    (getMatchedBenefits as jest.Mock).mockResolvedValue(mockMatchedBenefits);
    (acceptBeneficiary as jest.Mock).mockResolvedValue({ id: '1', status: 'ACCEPTED' });
    
    render(<MatchedBenefitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Find the Accept button for the pending match and click it
    const acceptButtons = screen.getAllByRole('button', { name: /Accept$/i });
    fireEvent.click(acceptButtons[0]);
    
    await waitFor(() => {
      expect(acceptBeneficiary).toHaveBeenCalledWith('b1', 'p1');
    });
  });

  it('filters matches by status', async () => {
    (getMatchedBenefits as jest.Mock).mockResolvedValue(mockMatchedBenefits);
    
    render(<MatchedBenefitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });
    
    // Select ACCEPTED status from the filter dropdown
    const statusFilter = screen.getByRole('combobox');
    fireEvent.change(statusFilter, { target: { value: 'ACCEPTED' } });
    
    // John Doe should be hidden (PENDING) and Alice Smith should be visible (ACCEPTED)
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('shows error message when data fetching fails', async () => {
    (getMatchedBenefits as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    
    render(<MatchedBenefitsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load matched benefits/i)).toBeInTheDocument();
    });
  });
});