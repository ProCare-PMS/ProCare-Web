"use client";

import React, { useState, useEffect } from "react";
import { getCacheStats, clearTransactionCache } from "@/lib/transactionStorage";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, Info } from "lucide-react";

const CacheStatus: React.FC = () => {
  const [cacheStats, setCacheStats] = useState(getCacheStats());
  const [isVisible, setIsVisible] = useState(false);

  const refreshStats = () => {
    setCacheStats(getCacheStats());
  };

  const handleClearCache = () => {
    clearTransactionCache();
    refreshStats();
  };

  useEffect(() => {
    // Refresh stats every 30 seconds
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="ml-auto text-xs"
      >
        <Info className="w-3 h-3 mr-1" />
        Cache Status
      </Button>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-blue-800 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          Dual Storage Cache Status
        </h4>
        <div className="flex gap-2">
          <Button
            onClick={refreshStats}
            variant="outline"
            size="sm"
            className="h-6 px-2"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button
            onClick={handleClearCache}
            variant="outline"
            size="sm"
            className="h-6 px-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
          <Button
            onClick={() => setIsVisible(false)}
            variant="outline"
            size="sm"
            className="h-6 px-2"
          >
            ×
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-blue-700 space-y-1">
        {cacheStats.hasCache ? (
          <>
            <div><strong>Status:</strong> ✅ Cache Active</div>
            <div><strong>Source:</strong> {cacheStats.source}</div>
            <div><strong>Age:</strong> {cacheStats.cacheAge}</div>
            <div><strong>Items:</strong> {cacheStats.itemCount} products</div>
          </>
        ) : (
          <div><strong>Status:</strong> ❌ No Cache</div>
        )}
      </div>
      
      <div className="text-xs text-blue-600 mt-2">
        <strong>Strategy:</strong> Database First + localStorage Cache
      </div>
    </div>
  );
};

export default CacheStatus;
