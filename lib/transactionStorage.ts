/**
 * 🎯 Dual Storage Strategy for Held Transactions
 * 
 * This utility provides functions to manage held transaction data in both:
 * 1. Database (primary storage for persistence)
 * 2. localStorage (cache for performance and offline access)
 */

export interface TransactionCacheData {
  orderList: Array<{
    id: string;
    name: string;
    quantity: number;
    selling_price: string;
  }>;
  heldTransactionId: string;
  isResumedTransaction: boolean;
  lastUpdated: string;
  source: 'database' | 'localStorage' | 'fallback';
  version: string;
}

export interface StorageResult {
  success: boolean;
  source: 'database' | 'localStorage' | 'fallback';
  data?: TransactionCacheData;
  error?: string;
  timestamp: string;
}

const CACHE_VERSION = '1.0.0';
const CACHE_EXPIRY_HOURS = 24; // Cache expires after 24 hours

/**
 * Store transaction data in localStorage as cache
 */
export const storeTransactionCache = (data: Omit<TransactionCacheData, 'lastUpdated' | 'version'>): StorageResult => {
  try {
    const cacheData: TransactionCacheData = {
      ...data,
      lastUpdated: new Date().toISOString(),
      version: CACHE_VERSION
    };

    localStorage.setItem('transactionCache', JSON.stringify(cacheData));
    localStorage.setItem('orderList', JSON.stringify(data.orderList));
    localStorage.setItem('heldTransactionId', data.heldTransactionId);
    localStorage.setItem('isResumedTransaction', data.isResumedTransaction.toString());

    return {
      success: true,
      source: data.source,
      data: cacheData,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to store transaction cache:', error);
    return {
      success: false,
      source: 'localStorage',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Retrieve transaction data from localStorage cache
 */
export const getTransactionCache = (): StorageResult => {
  try {
    const cacheData = localStorage.getItem('transactionCache');
    if (!cacheData) {
      return {
        success: false,
        source: 'localStorage',
        error: 'No cache data found',
        timestamp: new Date().toISOString()
      };
    }

    const parsed: TransactionCacheData = JSON.parse(cacheData);
    
    // Check if cache is expired
    const cacheAge = Date.now() - new Date(parsed.lastUpdated).getTime();
    const cacheAgeHours = cacheAge / (1000 * 60 * 60);
    
    if (cacheAgeHours > CACHE_EXPIRY_HOURS) {
      console.warn('Transaction cache expired, clearing old data');
      clearTransactionCache();
      return {
        success: false,
        source: 'localStorage',
        error: 'Cache expired',
        timestamp: new Date().toISOString()
      };
    }

    // Check if cache version is compatible
    if (parsed.version !== CACHE_VERSION) {
      console.warn('Transaction cache version mismatch, clearing old data');
      clearTransactionCache();
      return {
        success: false,
        source: 'localStorage',
        error: 'Cache version mismatch',
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: true,
      source: parsed.source,
      data: parsed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to retrieve transaction cache:', error);
    return {
      success: false,
      source: 'localStorage',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Clear all transaction cache data
 */
export const clearTransactionCache = (): void => {
  try {
    localStorage.removeItem('transactionCache');
    localStorage.removeItem('orderList');
    localStorage.removeItem('heldTransactionId');
    localStorage.removeItem('isResumedTransaction');
    console.log('Transaction cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear transaction cache:', error);
  }
};

/**
 * Check if transaction cache exists and is valid
 */
export const isTransactionCacheValid = (): boolean => {
  const result = getTransactionCache();
  return result.success;
};

/**
 * Get cache statistics for debugging
 */
export const getCacheStats = (): {
  hasCache: boolean;
  cacheAge?: string;
  source?: string;
  itemCount?: number;
} => {
  const result = getTransactionCache();
  
  if (!result.success || !result.data) {
    return { hasCache: false };
  }

  const age = Date.now() - new Date(result.data.lastUpdated).getTime();
  const ageMinutes = Math.floor(age / (1000 * 60));
  
  return {
    hasCache: true,
    cacheAge: `${ageMinutes} minutes ago`,
    source: result.data.source,
    itemCount: result.data.orderList.length
  };
};

/**
 * Validate transaction data integrity
 */
export const validateTransactionData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  const requiredFields = ['orderList', 'heldTransactionId', 'isResumedTransaction'];
  if (!requiredFields.every(field => field in data)) return false;
  
  if (!Array.isArray(data.orderList)) return false;
  
  // Check if order list items have required properties
  return data.orderList.every((item: any) => 
    item && 
    typeof item.name === 'string' && 
    typeof item.quantity === 'number' && 
    typeof item.selling_price === 'string'
  );
};
