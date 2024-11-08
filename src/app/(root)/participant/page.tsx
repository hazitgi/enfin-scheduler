/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/participant/availability.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface Participant {
  id: number;
  name: string;
  threshold: number;
}

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface AvailabilityFormProps {
  participants: Record<string, { name: string; threshold: number }>;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  participants,
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState<
    Array<{ value: number; label: string }>
  >([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [results, setResults] = useState<Record<string, string[]> | null>(null);

  const participantOptions = Object.entries(participants).map(([id, data]) => ({
    value: parseInt(id),
    label: data.name,
  }));

  const handleSubmit = async () => {
    if (
      !dateRange.start ||
      !dateRange.end ||
      selectedParticipants.length === 0
    ) {
      alert("Please fill in all fields");
      return;
    }

    const input = {
      participant_ids: selectedParticipants.map((p) => p.value),
      date_range: {
        start: format(dateRange.start, "dd/MM/yyyy"),
        end: format(dateRange.end, "dd/MM/yyyy"),
      },
    };

    try {
      const response = await fetch("/api/check-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error checking slots:", error);
      alert("Error checking availability");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Check Participant Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Participants
              </label>
              <Select
                isMulti
                options={participantOptions}
                value={selectedParticipants}
                onChange={(selected) =>
                  setSelectedParticipants(selected as any)
                }
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <DatePicker
                  selected={dateRange.start}
                  onChange={(date) =>
                    setDateRange((prev) => ({ ...prev, start: date }))
                  }
                  className="w-full p-2 border rounded"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <DatePicker
                  selected={dateRange.end}
                  onChange={(date) =>
                    setDateRange((prev) => ({ ...prev, end: date }))
                  }
                  className="w-full p-2 border rounded"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Check Slots
            </Button>

            {results ? (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Available Slots:</h3>
                {Object.entries(results).map(([date, slots]) => (
                  <div key={date} className="mb-4">
                    <h4 className="font-medium">{date}</h4>
                    <ul className="list-disc pl-5">
                      {slots.map((slot, index) => (
                        <li key={index}>{slot}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityForm;
