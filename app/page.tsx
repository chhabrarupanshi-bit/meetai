import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      
      {/* Fixed variant quotes + styling classes */}
      <Button 
        variant="custom" 
       // className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md cursor-pointer"
      >
        Get Started
      </Button>

      <p className="mt-4 text-lg text-gray-600">
        This is the home page of my Next.js application.
      </p>
    </div>
  );
}