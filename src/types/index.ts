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

export interface Schedule {
  [date: string]: TimeSlot[];
}

export interface DateRange {
  start: string;
  end: string;
}

export interface CheckSlotsInput {
  participant_ids: number[];
  date_range: DateRange;
}

export interface CheckSlotsOutput {
  [date: string]: string[];
}
