#!/usr/bin/env node

/**
 * Security Testing Script
 * 
 * Automated testing script for security features.
 * Run with: node scripts/security-test.js
 */

const https = require('https');
const http = require('http');

class SecurityTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async runAllTests() {
    console.log('🛡️  Starting Security Tests...\n');

    // Test categories
    await this.testRateLimiting();
    await this.testXSSProtection();
    await this.testSQLInjectionProtection();
    await this.testCSRFProtection();
    await this.testSecurityHeaders();

    this.printResults();
  }

  async testRateLimiting() {
    console.log('📊 Testing Rate Limiting...');

    // Test chat endpoint rate limiting (10 requests/minute)
    const promises = [];
    for (let i = 0; i < 12; i++) {
      promises.push(this.makeRequest('POST', '/api/chat', {
        messages: [{ role: 'user', content: `Test message ${i}` }]
      }));
    }

    const results = await Promise.all(promises);
    const rateLimitedCount = results.filter(r => r.status === 429).length;

    this.addTestResult(
      'Rate Limiting - Chat API',
      rateLimitedCount >= 2,
      `Expected 2+ rate limited responses, got ${rateLimitedCount}`
    );

    // Wait a bit before next test
    await this.sleep(1000);
  }

  async testXSSProtection() {
    console.log('🚫 Testing XSS Protection...');

    const xssPayloads = [
      '<script>alert("xss")</script>',
      'javascript:alert("xss")',
      '<img src=x onerror=alert("xss")>',
      '<svg onload=alert("xss")>',
      '"><script>alert("xss")</script>'
    ];

    for (const payload of xssPayloads) {
      const result = await this.makeRequest('POST', '/api/chat', {
        messages: [{ role: 'user', content: payload }]
      });

      this.addTestResult(
        `XSS Protection - ${payload.substring(0, 20)}...`,
        result.status === 400,
        `Expected 400 (blocked), got ${result.status}`
      );
    }
  }

  async testSQLInjectionProtection() {
    console.log('💉 Testing SQL Injection Protection...');

    const sqlPayloads = [
      "admin'; DROP TABLE users; --",
      "1 UNION SELECT * FROM users",
      "' OR 1=1 --",
      "'; DELETE FROM users WHERE 1=1; --"
    ];

    for (const payload of sqlPayloads) {
      const result = await this.makeRequest('POST', '/api/chat', {
        messages: [{ role: 'user', content: payload }]
      });

      this.addTestResult(
        `SQL Injection Protection - ${payload.substring(0, 20)}...`,
        result.status === 400,
        `Expected 400 (blocked), got ${result.status}`
      );
    }
  }

  async testCSRFProtection() {
    console.log('🔒 Testing CSRF Protection...');

    // Test POST without proper origin
    const result = await this.makeRequest('POST', '/api/chat', {
      messages: [{ role: 'user', content: 'test' }]
    }, {
      'Origin': 'https://evil.com',
      'Content-Type': 'application/json'
    });

    this.addTestResult(
      'CSRF Protection - Invalid Origin',
      result.status === 403,
      `Expected 403 (blocked), got ${result.status}`
    );
  }

  async testSecurityHeaders() {
    console.log('🛡️  Testing Security Headers...');

    const result = await this.makeRequest('GET', '/');
    const headers = result.headers;

    const expectedHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'referrer-policy',
      'content-security-policy'
    ];

    for (const header of expectedHeaders) {
      const hasHeader = headers[header] !== undefined;
      this.addTestResult(
        `Security Header - ${header}`,
        hasHeader,
        hasHeader ? 'Present' : 'Missing'
      );
    }
  }

  async makeRequest(method, path, body = null, customHeaders = {}) {
    return new Promise((resolve) => {
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const lib = isHttps ? https : http;
      
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname,
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'SecurityTester/1.0',
          ...customHeaders
        },
        // Ignore self-signed certificates in testing
        rejectUnauthorized: false
      };

      const req = lib.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          status: 0,
          headers: {},
          body: '',
          error: err.message
        });
      });

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  addTestResult(name, passed, details) {
    this.results.total++;
    if (passed) {
      this.results.passed++;
      console.log(`  ✅ ${name}`);
    } else {
      this.results.failed++;
      console.log(`  ❌ ${name} - ${details}`);
    }
    
    this.results.tests.push({ name, passed, details });
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('🛡️  SECURITY TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed} ✅`);
    console.log(`Failed: ${this.results.failed} ❌`);
    console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    
    if (this.results.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(t => !t.passed)
        .forEach(t => console.log(`  - ${t.name}: ${t.details}`));
    }

    console.log('\n📋 Recommendations:');
    if (this.results.failed === 0) {
      console.log('  🎉 All security tests passed! Your application is well protected.');
    } else {
      console.log('  🔧 Fix the failed tests to improve security.');
      console.log('  📖 Check SECURITY.md for implementation details.');
    }

    console.log('\n🚀 Next Steps:');
    console.log('  1. Run unit tests: npm test');
    console.log('  2. Check security headers: https://securityheaders.com');
    console.log('  3. Monitor logs: node scripts/check-logs.js');
    console.log('  4. Review SECURITY.md for additional hardening');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main execution
if (require.main === module) {
  const tester = new SecurityTester(process.argv[2] || 'http://localhost:3000');
  
  tester.runAllTests().catch(err => {
    console.error('❌ Security test failed:', err.message);
    process.exit(1);
  });
}

module.exports = SecurityTester;