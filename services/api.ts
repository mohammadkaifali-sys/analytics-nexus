import * as mockData from '@/lib/mock-data/data';

const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const DashboardService = {
  async getOverviewMetrics(): Promise<mockData.MetricItem[]> {
    await simulateDelay(300); // Simulate database response delay
    return [...mockData.overviewMetrics];
  },

  async getEMEAOpportunities(): Promise<mockData.EMEAOpportunity[]> {
    await simulateDelay(350);
    return [...mockData.emeaOpportunities];
  },

  async getRecentOrders(): Promise<mockData.SaleOrder[]> {
    await simulateDelay(400);
    return [...mockData.recentOrders];
  },

  async getCustomerDistribution(): Promise<mockData.CustomerDistribution[]> {
    await simulateDelay(250);
    return [...mockData.customerDistribution];
  },

  async getFinanceExpenses(): Promise<mockData.FinanceExpense[]> {
    await simulateDelay(350);
    return [...mockData.financeExpenses];
  },

  async getForecastData(): Promise<mockData.ForecastPoint[]> {
    await simulateDelay(450);
    return [...mockData.forecastChartData];
  },

  async getMarketingFunnel(): Promise<mockData.MarketingFunnelStep[]> {
    await simulateDelay(300);
    return [...mockData.marketingFunnel];
  },

  async getInventorySKUs(): Promise<mockData.SKUStockItem[]> {
    await simulateDelay(400);
    return [...mockData.inventorySKUs];
  },

  async getGeneratedReports(): Promise<mockData.GeneratedReport[]> {
    await simulateDelay(300);
    return [...mockData.generatedReports];
  },

  async getAIRecommendations(): Promise<mockData.AIRecommendation[]> {
    await simulateDelay(350);
    return [...mockData.aiRecommendations];
  }
};
