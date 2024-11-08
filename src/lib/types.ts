export interface Participant {
    name: string;
    threshold: number;
  }
  
  export interface TimeSlot {
    start: string;
    end: string;
  }
  
  export interface ParticipantAvailability {
    [day: string]: TimeSlot[];
  }
  
  export interface AvailabilityData {
    participants: Record<string, Participant>;
    participantAvailability: Record<string, ParticipantAvailability>;
    schedules: Record<string, Record<string, TimeSlot[]>>;
  }
  
  export interface CheckSlotsInput {
    participant_ids: string[];
    date_range: {
      start: string;
      end: string;
    };
  }
  