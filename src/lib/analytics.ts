// Analytics data — returns dummy data, or real data if API key is configured
// Set NEXT_PUBLIC_ANALYTICS_API_KEY in .env.local for real data

export interface RevenuePoint {
  month: string;
  mrr: number;
  target: number;
}

export interface PlanDistribution {
  name: string;
  value: number;
  color: string;
}

export interface ChannelData {
  channel: string;
  leads: number;
  color: string;
}

export interface NpsData {
  label: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  revenue: RevenuePoint[];
  planDistribution: PlanDistribution[];
  channels: ChannelData[];
  nps: NpsData[];
  kpis: {
    mrr: number;
    arr: number;
    customers: number;
    churn: number;
    mrrChange: number;
    arrChange: number;
    customersChange: number;
    churnChange: number;
  };
  isReal: boolean;
}

export const DUMMY_ANALYTICS: AnalyticsData = {
  isReal: false,
  kpis: {
    mrr: 84290,
    arr: 1011480,
    customers: 2847,
    churn: 2.8,
    mrrChange: 12.4,
    arrChange: 8.7,
    customersChange: 23,
    churnChange: 0.3,
  },
  revenue: [
    { month: "Feb", mrr: 38, target: 40 },
    { month: "Mar", mrr: 42, target: 44 },
    { month: "Apr", mrr: 47, target: 48 },
    { month: "May", mrr: 51, target: 52 },
    { month: "Jun", mrr: 55, target: 56 },
    { month: "Jul", mrr: 50, target: 52 },
    { month: "Aug", mrr: 52, target: 54 },
    { month: "Sep", mrr: 57, target: 58 },
    { month: "Oct", mrr: 61, target: 62 },
    { month: "Nov", mrr: 65, target: 68 },
    { month: "Dec", mrr: 75, target: 72 },
    { month: "Jan", mrr: 84, target: 82 },
  ],
  planDistribution: [
    { name: "Enterprise", value: 842, color: "#3b82f6" },
    { name: "Pro", value: 1204, color: "#8b5cf6" },
    { name: "Basic", value: 801, color: "#e5e7eb" },
  ],
  channels: [
    { channel: "Organic Search", leads: 38, color: "#3b82f6" },
    { channel: "Referral", leads: 27, color: "#8b5cf6" },
    { channel: "Paid Ads", leads: 21, color: "#f59e0b" },
    { channel: "Social Media", leads: 14, color: "#10b981" },
  ],
  nps: [
    { label: "Detractors", value: 8, color: "#ef4444" },
    { label: "Passives", value: 25, color: "#f59e0b" },
    { label: "Promoters", value: 67, color: "#10b981" },
  ],
};

export async function fetchAnalytics(): Promise<AnalyticsData> {
  let apiKey = process.env.NEXT_PUBLIC_ANALYTICS_API_KEY;
  
  if (typeof window !== "undefined") {
    const localKey = localStorage.getItem("HAI_ANALYTICS_API_KEY");
    if (localKey) apiKey = localKey;
  }

  if (!apiKey) return DUMMY_ANALYTICS;

  try {
    // Real analytics fetch — replace with actual endpoint
    const res = await fetch("https://api.youranalytics.com/v1/dashboard", {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Analytics API failed");
    const data = await res.json();
    return { ...data, isReal: true };
  } catch {
    console.warn("Analytics API unavailable, falling back to dummy data.");
    return DUMMY_ANALYTICS;
  }
}
