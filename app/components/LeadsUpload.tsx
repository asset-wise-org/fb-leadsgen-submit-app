"use client";
  
import { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const LeadsUpload = () => {
  const [leads, setLeads] = useState([]);
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setLeads(result.data as never[]);
          setCurrentLeadIndex(0);
        },
      });
    }
  };

  const handleNext = () => {
    if (currentLeadIndex < leads.length - 1) {
      setCurrentLeadIndex(currentLeadIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLeadIndex > 0) {
      setCurrentLeadIndex(currentLeadIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/submitLead', leads[currentLeadIndex]);
      alert('Lead submitted successfully!');
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Error submitting lead.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload and Review Facebook Leads</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {leads.length > 0 && (
        <div>
          <h2>Review Lead {currentLeadIndex + 1} of {leads.length}</h2>
          <pre>{JSON.stringify(leads[currentLeadIndex], null, 2)}</pre>
          <button onClick={handlePrevious} disabled={currentLeadIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentLeadIndex === leads.length - 1}>
            Next
          </button>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsUpload;