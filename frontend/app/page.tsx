import { MessageSquare, TrendingUp, Search, Info, Activity, ShieldCheck } from 'lucide-react'; // Added Activity icon
import React from 'react';

// Interface for navigation cards
interface NavCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Reusable Card Component
const NavCard: React.FC<NavCardProps> = ({ href, icon, title, description }) => (
  <a
    href={href}
    className="group flex flex-col items-center justify-start p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 w-full"
  >
    <div className="p-4 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-500 transition-colors duration-300">
      {React.isValidElement(icon) ? (
        React.cloneElement(icon as React.ReactElement<any>, {
          className: "w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300"
        })
      ) : (
        icon 
      )}
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 text-center">{description}</p>
  </a>
);

// Home Page
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        AI Financial Advisor
      </h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
        Your personal stock market assistant. Get data-driven insights and recommendations.
      </p>

      {/* Grid updated to handle 5 cards better */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        
        {/* Card 1: Chat with AI */}
        <NavCard 
          href="/chat"
          icon={<MessageSquare />}
          title="Chat with AI"
          description="Talk to the AI about market trends, predictions, and financial insights."
        />

        {/* Card 2: Trending Page */}
        <NavCard 
          href="/trending"
          icon={<TrendingUp />}
          title="Trending Stocks"
          description="Explore which stocks are trending based on volume and momentum."
        />

        {/* Card 3: Single Stock Search */}
        <NavCard 
          href="/search"
          icon={<Search />}
          title="Single Stock Search"
          description="View complete fundamental and technical analysis of any stock (e.g., RELIANCE)."
        />

        {/* Card 4: CANSLIM Analysis (New Button) */}
        <NavCard 
          href="/canslim" 
          icon={<Activity />}
          title="CANSLIM Strategy"
          description="Filter high-growth stocks based on Earnings, New products, and Market direction."
        />

        {/* Card 5: About Page */}
        <NavCard 
          href="/about"
          icon={<Info />}
          title="About This Platform"
          description="Learn more about what this project does, its key features, and how it works."
        />

        {/* Card: 7-Level Audit (New) */}
        <NavCard 
          href="/audit"
          icon={<ShieldCheck />}
          title="7-Level Stock Audit"
          description="Perform a deep dive analysis into any specific stock using the full 7-Layer CANSLIM Verdict."
        />
      </div>
    </div>
  );
}