export interface MetricItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  badge?: string;
  sparklineData: number[];
}

export interface EMEAOpportunity {
  id: string;
  title: string;
  description: string;
  impact: string;
  complexity: 'Low' | 'Medium' | 'High';
  status: 'active' | 'applied';
}

export interface SaleOrder {
  id: string;
  date: string;
  client: string;
  region: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
}

export interface CustomerDistribution {
  country: string;
  percentage: number;
  emoji: string;
}

export interface FinanceExpense {
  category: string;
  amount: number;
  percentage: number;
}

export interface ForecastPoint {
  month: string;
  actual: number;
  projected: number;
  lowerBand: number;
  upperBand: number;
}

export interface MarketingFunnelStep {
  stage: string;
  users: number;
  conversion: number;
}

export interface SKUStockItem {
  sku: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  turnover: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface GeneratedReport {
  id: string;
  title: string;
  date: string;
  size: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  downloadUrl: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  summary: string;
  savings: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
}

// Database Mock Data
export const overviewMetrics: MetricItem[] = [
  { title: "Avg. CLV", value: "$4,285.00", change: "+12.4%", trend: "up", sparklineData: [40, 42, 45, 43, 44, 46, 48] },
  { title: "Retention Rate", value: "94.2%", change: "+0.8%", trend: "up", badge: "TARGET: 95%", sparklineData: [92, 93, 93.5, 93.8, 94, 94.1, 94.2] },
  { title: "NPS Score", value: "72", change: "+4.1%", trend: "up", badge: "EXCELLENT", sparklineData: [68, 69, 70, 70, 71, 71.5, 72] },
  { title: "Repeat Rate", value: "48.3%", change: "+2.3%", trend: "up", badge: "4 SEGMENTS", sparklineData: [45, 46, 47, 46.5, 47.8, 48, 48.3] }
];

export const emeaOpportunities: EMEAOpportunity[] = [
  {
    id: "OP-101",
    title: "Route Optimization",
    description: "Consolidate logistics hubs in EMEA region to reduce carbon footprint and delivery time by 15%.",
    impact: "+$120K / Yr",
    complexity: "Low",
    status: "active"
  },
  {
    id: "OP-102",
    title: "AWS Cluster Scaling",
    description: "Scale down underutilized EC2 instances in Germany during non-working hours.",
    impact: "+$45K / Yr",
    complexity: "Low",
    status: "active"
  },
  {
    id: "OP-103",
    title: "DB Read-Replica Route",
    description: "Enable read replicas caching on API Gateway routing rules to decrease database load by 40%.",
    impact: "+$85K / Yr",
    complexity: "Medium",
    status: "active"
  }
];

export const recentOrders: SaleOrder[] = [
  { id: "TXN-8801", date: "2026-07-17", client: "Acme Corporation", region: "North America", amount: 12500.00, status: "Success" },
  { id: "TXN-8802", date: "2026-07-17", client: "Globex Industries", region: "Europe", amount: 8400.00, status: "Success" },
  { id: "TXN-8803", date: "2026-07-16", client: "Initech Holdings", region: "Asia Pacific", amount: 1540.00, status: "Pending" },
  { id: "TXN-8804", date: "2026-07-16", client: "Soylent Corp", region: "Latin America", amount: 23200.00, status: "Success" },
  { id: "TXN-8805", date: "2026-07-15", client: "Hooli Inc", region: "North America", amount: 980.00, status: "Failed" },
  { id: "TXN-8806", date: "2026-07-15", client: "Umbrella Corp", region: "Europe", amount: 45000.00, status: "Success" },
  { id: "TXN-8807", date: "2026-07-14", client: "Veer Logistics", region: "Asia Pacific", amount: 7200.00, status: "Success" },
  { id: "TXN-8808", date: "2026-07-14", client: "Core Analytics", region: "Europe", amount: 3100.00, status: "Pending" }
];

export const customerDistribution: CustomerDistribution[] = [
  { country: "United States", percentage: 42, emoji: "🇺🇸" },
  { country: "United Kingdom", percentage: 18, emoji: "🇬🇧" },
  { country: "Germany", percentage: 15, emoji: "🇩🇪" },
  { country: "Singapore", percentage: 12, emoji: "🇸🇬" },
  { country: "Others", percentage: 13, emoji: "🌐" }
];

export const financeExpenses: FinanceExpense[] = [
  { category: "Infrastructure & Cloud Hosting", amount: 245000, percentage: 38 },
  { category: "Core Operations & Staffing", amount: 195000, percentage: 30 },
  { category: "Marketing & Acquisition", amount: 110000, percentage: 17 },
  { category: "API & Third-party integrations", amount: 65000, percentage: 10 },
  { category: "Security & Legal Audits", amount: 35000, percentage: 5 }
];

export const forecastChartData: ForecastPoint[] = [
  { month: "Jan", actual: 1.2, projected: 1.2, lowerBand: 1.1, upperBand: 1.3 },
  { month: "Feb", actual: 1.5, projected: 1.4, lowerBand: 1.3, upperBand: 1.6 },
  { month: "Mar", actual: 1.8, projected: 1.7, lowerBand: 1.5, upperBand: 1.9 },
  { month: "Apr", actual: 2.1, projected: 2.0, lowerBand: 1.8, upperBand: 2.2 },
  { month: "May", actual: 2.4, projected: 2.4, lowerBand: 2.1, upperBand: 2.7 },
  { month: "Jun", actual: 2.9, projected: 2.8, lowerBand: 2.5, upperBand: 3.1 },
  { month: "Jul", actual: 3.2, projected: 3.1, lowerBand: 2.8, upperBand: 3.4 },
  { month: "Aug", actual: 0, projected: 3.5, lowerBand: 3.1, upperBand: 3.9 },
  { month: "Sep", actual: 0, projected: 3.8, lowerBand: 3.3, upperBand: 4.3 },
  { month: "Oct", actual: 0, projected: 4.2, lowerBand: 3.6, upperBand: 4.8 },
  { month: "Nov", actual: 0, projected: 4.5, lowerBand: 3.9, upperBand: 5.1 },
  { month: "Dec", actual: 0, projected: 4.9, lowerBand: 4.2, upperBand: 5.6 }
];

export const marketingFunnel: MarketingFunnelStep[] = [
  { stage: "Impressions", users: 150000, conversion: 100 },
  { stage: "Clicks", users: 45000, conversion: 30 },
  { stage: "Sign-ups", users: 18000, conversion: 12 },
  { stage: "Activations", users: 7200, conversion: 4.8 },
  { stage: "Paid Conversions", users: 2160, conversion: 1.4 }
];

export const inventorySKUs: SKUStockItem[] = [
  { sku: "SKU-4001", name: "Core Compute Node", category: "Hardware", stock: 120, minStock: 20, turnover: 4.2, status: "In Stock" },
  { sku: "SKU-4002", name: "High-Bandwidth Fiber Kit", category: "Hardware", stock: 8, minStock: 15, turnover: 8.5, status: "Low Stock" },
  { sku: "SKU-4003", name: "SSO Enterprise Connector", category: "License", stock: 450, minStock: 50, turnover: 1.2, status: "In Stock" },
  { sku: "SKU-4004", name: "EMEA Regional Edge Router", category: "Hardware", stock: 0, minStock: 5, turnover: 12.0, status: "Out of Stock" },
  { sku: "SKU-4005", name: "Dedicated IP Block (/24)", category: "Network", stock: 15, minStock: 10, turnover: 3.5, status: "In Stock" }
];

export const generatedReports: GeneratedReport[] = [
  { id: "REP-9901", title: "Q2 Financial Compliance Report", date: "2026-07-15", size: "4.8 MB", format: "PDF", downloadUrl: "#" },
  { id: "REP-9902", title: "EMEA Operational Efficiency Dataset", date: "2026-07-14", size: "12.4 MB", format: "CSV", downloadUrl: "#" },
  { id: "REP-9903", title: "Global Customer Demographics", date: "2026-07-12", size: "8.2 MB", format: "XLSX", downloadUrl: "#" },
  { id: "REP-9904", title: "Infrastructure Outage Risk Forecast", date: "2026-07-10", size: "3.2 MB", format: "PDF", downloadUrl: "#" }
];

export const aiRecommendations: AIRecommendation[] = [
  {
    id: "REC-01",
    title: "Consolidate Logistics Hubs",
    summary: "Merge Berlin and Paris dispatch centres to capture redundancy synergies.",
    savings: "$120,000 / year",
    impact: "High",
    confidence: 94
  },
  {
    id: "REC-02",
    title: "Optimize API Request Routing",
    summary: "Route stale client metrics requests to edge replication nodes instead of core databases.",
    savings: "$85,000 / year",
    impact: "Medium",
    confidence: 89
  },
  {
    id: "REC-03",
    title: "AWS Dev Instance Policy",
    summary: "Autostop dev clusters on weekends and off-peak hours.",
    savings: "$45,000 / year",
    impact: "Low",
    confidence: 98
  }
];
