export function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function generateTimeSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  let currentMinutes = parseTime(start);
  const endMinutes = parseTime(end);

  while (currentMinutes + 30 <= endMinutes) {
    const slotEnd = currentMinutes + 30;
    slots.push(`${formatTime(currentMinutes)}-${formatTime(slotEnd)}`);
    currentMinutes = slotEnd;
  }

  return slots;
}