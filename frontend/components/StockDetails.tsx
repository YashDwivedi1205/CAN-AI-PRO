'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, DollarSign, BarChart, Newspaper, Target } from 'lucide-react';
import { RankedTrendingStock } from '../app/trending/page'; 
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ---------- INTERFACES ----------
interface StockDetailsProps {
  stock: RankedTrendingStock;
  onBack: () => void;
}

interface DetailedFinancials {
  MarketCap?: string;
  TrailingPE?: number | string;
  ForwardPE?: number | string;
  DebtToEquity?: number | string;
  status?: string;
}

interface NewsArticle {
  title: string;
  source: string;
  link: string;
}

interface ChartDataPoint {
  date: string;
  price: number;
}

interface AdditionalMetrics {
  '52W High': string;
  '52W Low': string;
  [key: string]: string;
}

interface LiveStockDetails {
  advice: string;
  reason_summary: string;
  risk_level: string;
  fundamentals: DetailedFinancials;
  sentiment_score: number;
  sentiment_status: 'Positive' | 'Negative' | 'Neutral';
  latest_news: NewsArticle[];
  historical_data: Record<string, ChartDataPoint[]>;
  additional_metrics: AdditionalMetrics;
}

// ---------- PRICE CHART COMPONENT ----------
interface PriceChartProps {
  data: ChartDataPoint[];
  timeframe: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, timeframe }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return { datasets: [] };

    const isPositiveTrend = data[data.length - 1].price >= data[0].price;
    const color = isPositiveTrend ? 'rgb(16,185,129)' : 'rgb(239,68,68)';

    return {
      // Logic: 1 Day ke liye ISO string se sirf Time nikalna (e.g., 09:15 AM)
      labels: data.map((d) => {
        const dateObj = new Date(d.date);
        
        // Agar Date object invalid hai (fallback check)
        if (isNaN(dateObj.getTime())) return d.date; 

        if (timeframe === '1 Day') {
          return dateObj.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false // 24-hour format zyada professional lagta hai trading mein
          });
        }
        return dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      }),
      datasets: [
        {
          label: 'Price (INR)',
          data: data.map((d) => d.price),
          borderColor: color,
          backgroundColor: color + '33',
          pointRadius: timeframe === '1 Day' ? 0 : 1.5,
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [data, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: any) => `Price: ₹${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: timeframe === '1 Day' ? 'Time' : 'Date' },
        ticks: { maxTicksLimit: 8, font: { size: 10 } },
        grid: { display: false }
      },
      y: {
        title: { display: true, text: 'Price (₹)' },
        ticks: { font: { size: 10 } }
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-lg text-center p-4">
        No data available for chart.
      </p>
    );
  }

  return <Line options={options as any} data={chartData} />;
};

// ---------- MAIN STOCK DETAILS COMPONENT ----------
const StockDetails: React.FC<StockDetailsProps> = ({ stock, onBack }) => {
  const isPositive = stock.today_change_percent >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  const [liveDetails, setLiveDetails] = useState<LiveStockDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('1 Day');

  // ---------- DATA FETCH ----------
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoadingDetails(true);
      
      // Update this URL with your new Ngrok URL from Colab
      // const NGROK_URL = "https://unpresumed-arline-dealate.ngrok-free.dev"; 
      // const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/full-analysis/${stock.ticker}`;

      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL}';
      const API_URL = `${BASE_URL}/api/full-analysis/${stock.ticker}`;
      
      try {
        const response = await fetch(API_URL, { 
          cache: 'no-store',
          headers: {
            "ngrok-skip-browser-warning": "69420",
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch detailed stock data');

        const data: LiveStockDetails = await response.json();
        setLiveDetails(data);
        setActiveTimeframe('1 Day'); 
      } catch (error) {
        console.error(`Error fetching details for ${stock.ticker}:`, error);
        setLiveDetails(null);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [stock.ticker]);

  // ---------- TIME FRAME SEQUENCE LOGIC ----------
  const renderTimeframeButtons = () => {
    if (!liveDetails || !liveDetails.historical_data) return null;

    const tfConfigs = [
      { id: '1 Day', min: 2 },
      { id: '1 Day', min: 2 }, // Extra check for safety
      { id: '1 Week', min: 5 },
      { id: '1 Month', min: 15 },
      { id: '3 Month', min: 50 },
      { id: '6 Month', min: 100 },
      { id: '1 Year', min: 200 },
      { id: '5 Year', min: 800 }
    ];

    const visibleTfs = [];
    const seen = new Set();
    for (const tf of tfConfigs) {
      if (seen.has(tf.id)) continue;
      const count = liveDetails.historical_data[tf.id]?.length || 0;
      if (count >= tf.min) {
        visibleTfs.push(tf.id);
        seen.add(tf.id);
      } else {
        break; 
      }
    }

    return visibleTfs.map((tfId) => (
      <button
        key={tfId}
        onClick={() => setActiveTimeframe(tfId)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition whitespace-nowrap ${
          activeTimeframe === tfId
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {tfId}
      </button>
    ));
  };

  // ---------- LOADING / ERROR STATES ----------
  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <p className="text-xl font-semibold text-indigo-600 animate-pulse">
          Loading Detailed Data for {stock.ticker}...
        </p>
      </div>
    );
  }

  if (!liveDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <p className="text-xl font-semibold text-red-600">
          Error: Could not load detailed analysis for {stock.ticker}.
        </p>
        <button
          onClick={onBack}
          className="mt-4 text-sm text-indigo-600 font-semibold hover:underline"
        >
          Back to Trending List
        </button>
      </div>
    );
  }

  const initialMetrics = [
    { key: 'Market Cap', value: liveDetails.fundamentals.MarketCap ?? 'N/A', unit: '', isHighlight: false },
    { key: 'P/E Ratio', value: liveDetails.fundamentals.TrailingPE ?? 'N/A', unit: 'x', isHighlight: false },
    { key: 'Forward P/E', value: liveDetails.fundamentals.ForwardPE ?? 'N/A', unit: 'x', isHighlight: false },
    { key: 'Debt/Equity', value: liveDetails.fundamentals.DebtToEquity ?? 'N/A', unit: '', isHighlight: false },
  ];

  const additionalMetricsList = Object.entries(liveDetails?.additional_metrics || {}).map(
    ([key, value]) => ({
      key: key.replace(/_/g, ' ').toUpperCase(),
      value: value || 'N/A',
      unit: '',
      isHighlight: key.includes('High') || key.includes('Low'),
    })
  );

  const financialMetrics = [...initialMetrics, ...additionalMetricsList];
  const hasNews = liveDetails.latest_news && liveDetails.latest_news.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-indigo-600 font-semibold mb-6 p-2 rounded-full hover:bg-indigo-100 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Trending List
          </button>

          <div className={`p-6 rounded-2xl shadow-xl ${bgColor} border border-gray-100`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">
                  {stock.ticker} - Rank #{stock.rank}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black text-gray-900">
                  ₹{stock.current_price.toFixed(2)}
                </p>
                <p className={`text-2xl font-bold ${changeColor}`}>
                  {stock.today_change_percent.toFixed(2)}% Today
                </p>
              </div>
            </div>
        
            <div className="mt-4 p-4 rounded-lg bg-white shadow-inner border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-indigo-700" />
                        <span className="text-lg font-bold text-gray-800 mr-2">
                            Our Verdict:
                        </span>
                        <em
                            className={`text-xl font-extrabold ${
                                liveDetails.advice.includes('BUY')
                                    ? 'text-green-600'
                                    : liveDetails.advice.includes('SELL')
                                    ? 'text-red-600'
                                    : 'text-yellow-600'
                            }`}
                        >
                            {(liveDetails.advice || 'N/A').toUpperCase()}
                        </em>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-gray-500 mr-2">Risk:</span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                            liveDetails.risk_level === 'Low' ? 'bg-green-100 text-green-700' :
                            liveDetails.risk_level === 'High' ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {(liveDetails.risk_level || 'UNKNOWN').toUpperCase()}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                    <strong>Reason:</strong> {liveDetails.reason_summary}
                </p>
            </div>
          </div>
        </header>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" /> Key Financial Metrics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {financialMetrics.map((metric) => (
            <div
              key={metric.key}
              className={`p-4 bg-white rounded-xl shadow-md border ${
                metric.isHighlight ? 'border-indigo-200' : 'border-gray-100'
              }`}
            >
              <p className="text-sm text-gray-500 font-medium truncate">{metric.key}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {metric.value} {metric.unit}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-blue-600" /> Price Chart Analysis
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <div className="flex space-x-2 border-b border-gray-200 pb-4 mb-4 overflow-x-auto">
            {renderTimeframeButtons()}
          </div>

          <div className="h-96 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 p-2">
            {liveDetails.historical_data[activeTimeframe] ? (
              <PriceChart
                data={liveDetails.historical_data[activeTimeframe]}
                timeframe={activeTimeframe}
              />
            ) : (
              <p className="text-gray-500">No chart data available for this timeframe.</p>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
          <Newspaper className="w-6 h-6 mr-2 text-red-600" /> Relevant News Articles
          <span
            className={`ml-3 px-3 py-1 text-sm font-semibold rounded-full ${
              liveDetails.sentiment_status === 'Positive'
                ? 'bg-green-100 text-green-800'
                : liveDetails.sentiment_status === 'Negative'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            Sentiment: {liveDetails.sentiment_status} ({liveDetails.sentiment_score})
          </span>
        </h2>

        {hasNews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {liveDetails.latest_news.map((news, index) => (
              <a
                key={index}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white rounded-xl shadow-md border-l-4 border-indigo-400 hover:shadow-lg transition block"
              >
                <p className="text-lg font-semibold text-gray-800">{news.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Source: <span className="font-medium text-gray-700">{news.source}</span>
                </p>
              </a>
            ))}
          </div>
        ) : (
            <div className="p-4 bg-gray-100 rounded-xl text-center border border-gray-200">
              <p className="text-gray-600">No recent news articles found for analysis.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StockDetails;