#!/usr/bin/env node

/**
 * Security Log Checker
 * 
 * Utility to check and analyze security logs from the command line.
 * Run with: node scripts/check-logs.js [options]
 */

const https = require('https');
const http = require('http');

class LogChecker {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.token = process.env.SECURITY_LOGS_TOKEN;
  }

  async checkLogs(options = {}) {
    if (!this.token) {
      console.error('❌ SECURITY_LOGS_TOKEN environment variable not set');
      console.log('   Set it in your .env.local file or run with:');
      console.log('   SECURITY_LOGS_TOKEN=your_token node scripts/check-logs.js');
      process.exit(1);
    }

    try {
      console.log('🔍 Fetching security logs...\n');
      
      const logs = await this.fetchLogs(options.limit);
      this.analyzeLogs(logs, options);
      
    } catch (error) {
      console.error('❌ Failed to fetch logs:', error.message);
      process.exit(1);
    }
  }

  async fetchLogs(limit = 100) {
    return new Promise((resolve, reject) => {
      const url = new URL(`/api/security/logs?limit=${limit}`, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const lib = isHttps ? https : http;
      
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
        rejectUnauthorized: false
      };

      const req = lib.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const response = JSON.parse(data);
              resolve(response.data.logs);
            } catch (err) {
              reject(new Error('Failed to parse response'));
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  analyzeLogs(logs, options = {}) {
    if (!logs || logs.length === 0) {
      console.log('📋 No security logs found');
      return;
    }

    console.log(`📊 Security Log Analysis (${logs.length} entries)\n`);

    // Summary statistics
    const stats = this.calculateStats(logs);
    this.printStats(stats);

    // Recent threats
    if (options.threats || options.all) {
      this.printThreats(logs);
    }

    // IP analysis
    if (options.ips || options.all) {
      this.printIPAnalysis(logs);
    }

    // Endpoint analysis
    if (options.endpoints || options.all) {
      this.printEndpointAnalysis(logs);
    }

    // Recent activity
    if (options.recent || options.all) {
      this.printRecentActivity(logs, options.recent || 10);
    }

    // Recommendations
    this.printRecommendations(stats);
  }

  calculateStats(logs) {
    const stats = {
      total: logs.length,
      bySeverity: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
      byType: {},
      uniqueIPs: new Set(),
      timeRange: {
        oldest: logs[logs.length - 1]?.timestamp,
        newest: logs[0]?.timestamp
      }
    };

    logs.forEach(log => {
      stats.bySeverity[log.severity]++;
      stats.byType[log.type] = (stats.byType[log.type] || 0) + 1;
      if (log.clientIP) stats.uniqueIPs.add(log.clientIP);
    });

    stats.uniqueIPs = stats.uniqueIPs.size;
    return stats;
  }

  printStats(stats) {
    console.log('📈 Summary Statistics');
    console.log('─'.repeat(40));
    console.log(`Total Events: ${stats.total}`);
    console.log(`Unique IPs: ${stats.uniqueIPs}`);
    console.log(`Time Range: ${this.formatDate(stats.timeRange.oldest)} to ${this.formatDate(stats.timeRange.newest)}`);
    
    console.log('\nSeverity Breakdown:');
    Object.entries(stats.bySeverity).forEach(([severity, count]) => {
      const percentage = ((count / stats.total) * 100).toFixed(1);
      const emoji = { LOW: '🟢', MEDIUM: '🟡', HIGH: '🟠', CRITICAL: '🔴' }[severity];
      console.log(`  ${emoji} ${severity}: ${count} (${percentage}%)`);
    });

    console.log('\nTop Event Types:');
    Object.entries(stats.byType)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([type, count]) => {
        const percentage = ((count / stats.total) * 100).toFixed(1);
        console.log(`  • ${type}: ${count} (${percentage}%)`);
      });

    console.log();
  }

  printThreats(logs) {
    const threats = logs.filter(log => ['HIGH', 'CRITICAL'].includes(log.severity));
    
    console.log(`🚨 Security Threats (${threats.length})`);
    console.log('─'.repeat(40));
    
    if (threats.length === 0) {
      console.log('✅ No high-priority threats detected\n');
      return;
    }

    threats.slice(0, 10).forEach(threat => {
      const emoji = threat.severity === 'CRITICAL' ? '🔴' : '🟠';
      console.log(`${emoji} [${threat.severity}] ${threat.type}`);
      console.log(`   Time: ${this.formatDate(threat.timestamp)}`);
      console.log(`   IP: ${threat.clientIP || 'Unknown'}`);
      console.log(`   Message: ${threat.message}`);
      if (threat.endpoint) console.log(`   Endpoint: ${threat.endpoint}`);
      console.log();
    });
  }

  printIPAnalysis(logs) {
    const ipStats = {};
    
    logs.forEach(log => {
      if (log.clientIP) {
        if (!ipStats[log.clientIP]) {
          ipStats[log.clientIP] = { total: 0, threats: 0, severities: [] };
        }
        ipStats[log.clientIP].total++;
        if (['HIGH', 'CRITICAL'].includes(log.severity)) {
          ipStats[log.clientIP].threats++;
        }
        ipStats[log.clientIP].severities.push(log.severity);
      }
    });

    console.log('🌐 IP Address Analysis');
    console.log('─'.repeat(40));

    const topIPs = Object.entries(ipStats)
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 10);

    if (topIPs.length === 0) {
      console.log('No IP data available\n');
      return;
    }

    topIPs.forEach(([ip, stats]) => {
      const threatRatio = stats.threats / stats.total;
      const emoji = threatRatio > 0.5 ? '🔴' : threatRatio > 0.2 ? '🟡' : '🟢';
      
      console.log(`${emoji} ${ip}`);
      console.log(`   Events: ${stats.total}, Threats: ${stats.threats}`);
      console.log(`   Risk Level: ${(threatRatio * 100).toFixed(1)}%`);
      console.log();
    });
  }

  printEndpointAnalysis(logs) {
    const endpointStats = {};
    
    logs.forEach(log => {
      if (log.endpoint) {
        if (!endpointStats[log.endpoint]) {
          endpointStats[log.endpoint] = { total: 0, errors: 0 };
        }
        endpointStats[log.endpoint].total++;
        if (log.type.includes('ERROR') || ['HIGH', 'CRITICAL'].includes(log.severity)) {
          endpointStats[log.endpoint].errors++;
        }
      }
    });

    console.log('🔗 Endpoint Analysis');
    console.log('─'.repeat(40));

    const topEndpoints = Object.entries(endpointStats)
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 10);

    if (topEndpoints.length === 0) {
      console.log('No endpoint data available\n');
      return;
    }

    topEndpoints.forEach(([endpoint, stats]) => {
      const errorRate = stats.errors / stats.total;
      const emoji = errorRate > 0.3 ? '🔴' : errorRate > 0.1 ? '🟡' : '🟢';
      
      console.log(`${emoji} ${endpoint}`);
      console.log(`   Requests: ${stats.total}, Errors: ${stats.errors}`);
      console.log(`   Error Rate: ${(errorRate * 100).toFixed(1)}%`);
      console.log();
    });
  }

  printRecentActivity(logs, limit = 10) {
    console.log(`⏰ Recent Activity (Last ${limit})`);
    console.log('─'.repeat(40));

    logs.slice(0, limit).forEach(log => {
      const severityEmoji = {
        LOW: '🟢',
        MEDIUM: '🟡', 
        HIGH: '🟠',
        CRITICAL: '🔴'
      }[log.severity] || '⚪';

      console.log(`${severityEmoji} [${this.formatDate(log.timestamp)}] ${log.type}`);
      console.log(`   ${log.message}`);
      if (log.clientIP) console.log(`   IP: ${log.clientIP}`);
      console.log();
    });
  }

  printRecommendations(stats) {
    console.log('💡 Recommendations');
    console.log('─'.repeat(40));

    if (stats.bySeverity.CRITICAL > 0) {
      console.log('🚨 URGENT: Critical security events detected!');
      console.log('   • Review critical events immediately');
      console.log('   • Consider blocking malicious IPs');
      console.log('   • Check for ongoing attacks');
    }

    if (stats.bySeverity.HIGH > 5) {
      console.log('⚠️  High number of high-severity events');
      console.log('   • Review security configuration');
      console.log('   • Consider stricter rate limiting');
    }

    if (stats.uniqueIPs > 100) {
      console.log('📈 High traffic volume detected');
      console.log('   • Monitor for DDoS patterns');
      console.log('   • Consider CDN/proxy protection');
    }

    const botActivity = Object.keys(stats.byType).filter(type => 
      type.includes('BOT') || type.includes('CRAWLER')
    ).length;

    if (botActivity > 0) {
      console.log('🤖 Bot activity detected');
      console.log('   • Review bot detection rules');
      console.log('   • Consider robots.txt optimization');
    }

    if (stats.total === 0) {
      console.log('✅ No security events - system appears healthy');
    }

    console.log();
  }

  formatDate(dateString) {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleString();
  }
}

// CLI interface
function printHelp() {
  console.log(`
🛡️  Security Log Checker

Usage: node scripts/check-logs.js [options]

Options:
  --limit <n>     Number of log entries to fetch (default: 100)
  --threats       Show security threats only  
  --ips          Show IP address analysis
  --endpoints    Show endpoint analysis
  --recent <n>   Show recent activity (default: 10)
  --all          Show all analysis sections
  --help         Show this help message

Environment:
  SECURITY_LOGS_TOKEN   Required token for accessing logs API

Examples:
  node scripts/check-logs.js --all
  node scripts/check-logs.js --threats --ips
  node scripts/check-logs.js --limit 50 --recent 5
  SECURITY_LOGS_TOKEN=abc123 node scripts/check-logs.js
  `);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const options = {
    limit: 100,
    recent: 10
  };

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--limit':
        options.limit = parseInt(args[i + 1]) || 100;
        i++;
        break;
      case '--recent':
        options.recent = parseInt(args[i + 1]) || 10;
        i++;
        break;
      case '--threats':
        options.threats = true;
        break;
      case '--ips':
        options.ips = true;
        break;
      case '--endpoints':
        options.endpoints = true;
        break;
      case '--all':
        options.all = true;
        break;
    }
  }

  const checker = new LogChecker(process.env.API_BASE_URL || 'http://localhost:3000');
  checker.checkLogs(options).catch(console.error);
}

module.exports = LogChecker;