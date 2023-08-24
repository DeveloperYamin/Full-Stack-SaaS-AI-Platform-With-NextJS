import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <main className="relative h-full">
      <header className="hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </header>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </main>
  );
}
