// app/api/check-slots/route.ts
import { NextResponse } from 'next/server';
import { getAvailabilityData } from '@/lib/redis';
import { generateTimeSlots } from '@/lib/utils';
import { CheckSlotsInput } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const input: CheckSlotsInput = await request.json();
    const data = await getAvailabilityData();
    
    const results: Record<string, string[]> = {};
    const startDate = new Date(input.date_range.start.split('/').reverse().join('-'));
    const endDate = new Date(input.date_range.end.split('/').reverse().join('-'));

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      // Get available slots for each participant
      const participantSlots = input.participant_ids.map(id => {
        const availability = data.participantAvailability[id]?.[dayOfWeek] || [];
        const dailySchedule = data.schedules[id]?.[dateStr] || [];
        const threshold = data.participants[id].threshold;

        // Get all possible slots from availability
        const availableSlots = new Set<string>();
        availability.forEach(({ start, end }) => {
          generateTimeSlots(start, end).forEach(slot => availableSlots.add(slot));
        });

        // Remove scheduled slots
        dailySchedule.forEach(({ start, end }) => {
          generateTimeSlots(start, end).forEach(slot => availableSlots.delete(slot));
        });

        // Apply threshold
        if (dailySchedule.length >= threshold) {
          availableSlots.clear();
        }

        return Array.from(availableSlots);
      });

      // Find overlapping slots
      const commonSlots = participantSlots.reduce((common, slots) => {
        if (common.length === 0) return slots;
        return common.filter(slot => slots.includes(slot));
      }, [] as string[]);

      if (commonSlots.length > 0) {
        results[dateStr] = commonSlots;
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error checking slots:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}