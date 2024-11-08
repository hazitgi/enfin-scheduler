import { getAvailabilityData } from '@/lib/redis';
import AvailabilityForm from '@/components/forms/availability-form';

export default async function AvailabilityPage() {
  const data = await getAvailabilityData()??{};
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Check Availability</h1>
      <AvailabilityForm initialData={data} />
    </main>
  );
}
