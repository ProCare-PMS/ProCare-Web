export const endpoints = {
  dashboard: "/inventories/dashboard/",
  analytics: "/analytics/",
  forgotPassword: "/forgot-password/",
  inventories: "/inventories/",
  managements: "/managements/",
  login: "/login/",
  logout: "/logout/",
  signup: "/user-signup/",
  pharmacy: "/pharmacy/",
  inventoryProduct: "/inventories/products/",
  inventorySupplier: "/inventories/suppliers/",
  inventoryPurchase: "/inventories/purchases/",
  inventoryExpiryReports: "/inventories/expiry-reports/",
  inventoryBranchSync: "/inventories/stock-transfers/",
  inventoryCategories: "/inventories/categories/",
  inventoryLowStock: "/inventories/products/low_stock/",
  resetPassword: "/reset-password/",
  sales: "/sales/",
  salesItems: "/sales/sale-items/",
  posCustomers: "/sales/customers/",
  posReturns: "/sales/returns",
  user: "/user/",
  verifyEmail: "/verify-email",
  otherPharmacies: "/inventories/stock-transfers/",
  logoutSummary: "/logout-summary/",
  changepasscode: "/change-passcode/",
  heldTransactions: "/sales/held-transactions/",
  
  analyticsTotalSales: "/analytics/total-sales/",
  analyticsExpenses: "/analytics/expenses/",
  analyticsPaymentMethods: "/analytics/payment-methods/",
  analyticsStockLevels: "/analytics/products/stock-levels/",
  analyticsProfit: "/analytics/profit/",
  analyticsStockAdjustments: "/analytics/stock-adjustments/",
};

// Helper functions for building analytics URLs with query parameters
export const analyticsUrls = {
  totalSales: (params: { month?: number; day?: number; year?: number }) => {
    const searchParams = new URLSearchParams();
    if (params.month) searchParams.append('month', params.month.toString());
    if (params.day) searchParams.append('day', params.day.toString());
    if (params.year) searchParams.append('year', params.year.toString());
    return `${endpoints.analyticsTotalSales}?${searchParams.toString()}`;
  },
  
  expenses: (params: { year?: string | number[] }) => {
    const searchParams = new URLSearchParams();
    if (params.year) {
      const yearParam = Array.isArray(params.year) ? params.year.join(',') : params.year.toString();
      searchParams.append('year', yearParam);
    }
    return `${endpoints.analyticsExpenses}?${searchParams.toString()}`;
  },
  
  paymentMethods: (params: { payment_methods?: string }) => {
    const searchParams = new URLSearchParams();
    if (params.payment_methods) searchParams.append('payment_methods', params.payment_methods);
    return `${endpoints.analyticsPaymentMethods}?${searchParams.toString()}`;
  },
  
  stockLevels: (params: { startdate: string; enddate?: string; product_id?: string }) => {
    const searchParams = new URLSearchParams();
    searchParams.append('startdate', params.startdate);
    if (params.enddate) {
      searchParams.append('enddate', params.enddate);
    } else {
      // Default to today if no end date provided
      const today = new Date().toISOString().split('T')[0];
      searchParams.append('enddate', today);
    }
    if (params.product_id) searchParams.append('product_id', params.product_id);
    return `${endpoints.analyticsStockLevels}?${searchParams.toString()}`;
  },
  
  profit: (params: { month?: number; year?: number }) => {
    const searchParams = new URLSearchParams();
    if (params.month) searchParams.append('month', params.month.toString());
    if (params.year) searchParams.append('year', params.year.toString());
    return `${endpoints.analyticsProfit}?${searchParams.toString()}`;
  },
  
  stockAdjustments: () => endpoints.analyticsStockAdjustments,
};