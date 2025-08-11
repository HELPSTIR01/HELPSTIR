import styled from 'styled-components';

export const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1e1e1e;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

export const RequiredMark = styled.span`
  color: #ff3860;
  margin-left: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #0080ff;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.2);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #0080ff;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.2);
  }
`;

export const ProgramsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

export const ProgramCard = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProgramTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #444;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #ff3860;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: rgba(255, 56, 96, 0.1);
  }
`;

export const AddProgramButton = styled.button`
  display: inline-flex;
  padding: 0.5rem 1rem;
  border: 1px dashed #0080ff;
  border-radius: 0.375rem;
  background: none;
  color: #0080ff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background-color: rgba(0, 128, 255, 0.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #0080ff;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  
  &:hover:not(:disabled) {
    background-color: #006edb;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 128, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;