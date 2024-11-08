/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { AvailabilityData, CheckSlotsInput } from '@/lib/types';

import { MultiSelect } from 'primereact/multiselect';
        
interface AvailabilityFormProps {
  initialData: AvailabilityData;
}

export default function AvailabilityForm({ initialData }: AvailabilityFormProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<Array<{ value: string; label: string }>>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [results, setResults] = useState<Record<string, string[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const participantOptions = Object.entries(initialData.participants).map(([id, data]) => ({
    value: id,
    label: data.name,
  }));

  
  async function handleSubmit() {
    if (!startDate || !endDate || selectedParticipants.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const input: CheckSlotsInput = {
      participant_ids: selectedParticipants.map(p => p.value),
      date_range: {
        start: format(startDate, 'dd/MM/yyyy'),
        end: format(endDate, 'dd/MM/yyyy'),
      },
    };

    try {
      const response = await fetch('/api/check-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to check slots');

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to check availability');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8">

      <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Choose Participants</label>
          <Select
            isMulti
            options={participantOptions}
            value={selectedParticipants}
            onChange={(values) => setSelectedParticipants(values as any)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
              minDate={startDate as Date | undefined}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Checking...' : 'Check Slot'}
        </button>

        {results && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Available Slot</h2>
            {Object.entries(results).length === 0 ? (
              <p className="text-gray-500 text-center">No available slots found</p>
            ) : (
              Object.entries(results).map(([date, slots]) => (
                <div key={date} className="mb-4">
                  <h3 className="font-medium mb-2">{date}</h3>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot, index) => (
                      <span
                        key={index}
                        className="bg-purple-500 text-white py-1 px-3 rounded-full text-sm"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
