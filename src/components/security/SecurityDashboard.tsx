'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface SecurityLog {
  id: string;
  timestamp: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  clientIP?: string;
  userAgent?: string;
  endpoint?: string;
  details?: Record<string, unknown>;
}

interface SecurityStats {
  totalLogs: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  uniqueIPs: number;
  topEndpoints: Array<{ endpoint: string; count: number }>;
  recentThreats: SecurityLog[];
}

export default function SecurityDashboard() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSecurityLogs();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSecurityLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityLogs = async () => {
    try {
      // Note: In production, this should be properly authenticated
      const response = await fetch('/api/security/logs?limit=100');
      
      if (!response.ok) {
        throw new Error('Failed to fetch security logs');
      }
      
      const data = await response.json();
      setLogs(data.data.logs);
      setStats(calculateStats(data.data.logs));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (logs: SecurityLog[]): SecurityStats => {
    const ips = new Set(logs.map(log => log.clientIP).filter(Boolean));
    const endpoints = logs.reduce((acc, log) => {
      if (log.endpoint) {
        acc[log.endpoint] = (acc[log.endpoint] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topEndpoints = Object.entries(endpoints)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([endpoint, count]) => ({ endpoint, count }));

    const recentThreats = logs
      .filter(log => ['HIGH', 'CRITICAL'].includes(log.severity))
      .slice(0, 10);

    return {
      totalLogs: logs.length,
      criticalCount: logs.filter(log => log.severity === 'CRITICAL').length,
      highCount: logs.filter(log => log.severity === 'HIGH').length,
      mediumCount: logs.filter(log => log.severity === 'MEDIUM').length,
      lowCount: logs.filter(log => log.severity === 'LOW').length,
      uniqueIPs: ips.size,
      topEndpoints,
      recentThreats,
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Security Dashboard</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Security Dashboard</h1>
          <Card className="p-6">
            <div className="text-red-600">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p>{error}</p>
              <button 
                onClick={fetchSecurityLogs}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <button
            onClick={fetchSecurityLogs}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Refresh
          </button>
        </div>

        {stats && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
                <p className="text-2xl font-bold">{stats.totalLogs}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Critical Alerts</h3>
                <p className="text-2xl font-bold text-red-600">{stats.criticalCount}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground">High Priority</h3>
                <p className="text-2xl font-bold text-orange-600">{stats.highCount}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground">Unique IPs</h3>
                <p className="text-2xl font-bold">{stats.uniqueIPs}</p>
              </Card>
            </div>

            {/* Recent Threats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Threats</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stats.recentThreats.length > 0 ? (
                    stats.recentThreats.map((log) => (
                      <div key={log.id} className={`p-3 rounded border ${getSeverityColor(log.severity)}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{log.type}</span>
                          <span className="text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm mb-1">{log.message}</p>
                        {log.clientIP && (
                          <p className="text-xs text-muted-foreground">IP: {log.clientIP}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No recent threats detected</p>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Top Endpoints</h2>
                <div className="space-y-3">
                  {stats.topEndpoints.map((endpoint, index) => (
                    <div key={endpoint.endpoint} className="flex items-center justify-between">
                      <span className="text-sm font-mono">{endpoint.endpoint}</span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        {endpoint.count}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Activity Log */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Time</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Severity</th>
                      <th className="text-left py-2">Message</th>
                      <th className="text-left py-2">IP</th>
                      <th className="text-left py-2">Endpoint</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.slice(0, 50).map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2 font-mono text-xs">{log.type}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(log.severity)}`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-2 text-xs max-w-xs truncate" title={log.message}>
                          {log.message}
                        </td>
                        <td className="py-2 font-mono text-xs">{log.clientIP || '-'}</td>
                        <td className="py-2 font-mono text-xs">{log.endpoint || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}