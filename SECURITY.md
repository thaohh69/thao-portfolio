# Security Implementation Guide

## Overview

This portfolio application now includes comprehensive security measures to protect against common web vulnerabilities including DDoS attacks, prompt injection, SQL injection, XSS, CSRF, and more.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Security Configuration
SECURITY_LOGS_TOKEN=your_secure_token_here_for_accessing_security_logs

# Existing Variables
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GITHUB_TOKEN=your_github_token_here
```

### Variable Descriptions

- `SECURITY_LOGS_TOKEN`: Secure token for accessing the security logs API endpoint (`/api/security/logs`). Generate a strong random token.
- `ANTHROPIC_API_KEY`: Your Anthropic API key for the chat functionality
- `GITHUB_TOKEN`: GitHub personal access token for fetching repository stars

## Security Features Implemented

### 1. **Next.js Middleware Security**
- **File**: `middleware.ts`
- **Features**:
  - Comprehensive security headers (CSP, XSS protection, clickjacking prevention)
  - Rate limiting per endpoint
  - CSRF protection with origin validation
  - IP-based request throttling

### 2. **Advanced Rate Limiting**
- **Implementation**: Multiple rate limiters for different endpoints
- **Rates**:
  - Chat API: 10 requests/minute
  - General API: 30 requests/minute  
  - Visits API: 5 requests/minute
- **Features**: Sliding window, automatic cleanup, memory management

### 3. **Input Security Analysis**
- **File**: `src/lib/security.ts`
- **Protection Against**:
  - XSS attacks (script injection, event handlers)
  - SQL injection attempts
  - Command injection
  - Oversized inputs (DoS prevention)
- **Risk Scoring**: Automatic threat severity assessment

### 4. **Attack Detection System**
- **Features**:
  - Suspicious activity tracking
  - Automatic IP blocking for repeat offenders
  - Configurable threat thresholds
  - Temporal IP banning (30 minutes default)

### 5. **CSRF Protection**
- **Token-based**: Secure token generation and validation
- **Session Management**: Cookie-based session tracking
- **Origin Validation**: Fallback origin header checking
- **Hooks**: React hooks for easy frontend integration

### 6. **Security Monitoring & Logging**
- **Comprehensive Logging**: All security events logged with severity levels
- **Real-time Monitoring**: Security dashboard for threat visualization
- **Alerting**: Console alerts for critical threats
- **Data Retention**: Automatic log rotation (1000 entries max)

### 7. **Bot Detection**
- **User Agent Analysis**: Identifies common bots and crawlers
- **Behavioral Analysis**: Tracks suspicious request patterns
- **SEO-Friendly**: Allows legitimate search engine bots

## Security Headers Implemented

```typescript
Content-Security-Policy: Strict policy preventing XSS
X-Frame-Options: DENY (prevents clickjacking)
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: HTTPS enforcement (production)
Permissions-Policy: Restricts dangerous browser features
```

## API Endpoint Security

### Protected Endpoints

1. **`/api/chat`**: 
   - Input analysis for malicious content
   - Rate limiting (10/min)
   - Bot detection
   - IP blocking for repeated threats

2. **`/api/visits`**: 
   - IP-based duplicate prevention
   - Bot filtering
   - Rate limiting (5/min)

3. **`/api/github-stars`**: 
   - Error handling and logging
   - External API failure protection

4. **`/api/security/logs`**: 
   - Token-based authentication required
   - Production access restrictions

## Security Dashboard

Access the security monitoring dashboard at `/security/dashboard` (you'll need to create the route):

- **Real-time Threat Monitoring**
- **Attack Pattern Analysis** 
- **IP Activity Tracking**
- **Endpoint Usage Statistics**
- **Security Alert History**

## Setup Instructions

### 1. Environment Configuration
```bash
# Copy example environment file
cp .env.example .env.local

# Add your security token
echo "SECURITY_LOGS_TOKEN=$(openssl rand -hex 32)" >> .env.local
```

### 2. Security Token Generation
```bash
# Generate a secure token for logs access
openssl rand -hex 32
```

### 3. Testing Security Features

```bash
# Run the application
npm run dev

# Test rate limiting
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}' \
  --repeat 15

# Test security logs (replace TOKEN)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/security/logs
```

## Production Considerations

### 1. **Reverse Proxy / CDN**
Consider using Cloudflare or similar for:
- Advanced DDoS protection
- Geoblocking capabilities
- Additional rate limiting
- SSL/TLS termination

### 2. **Database Integration**
For production, replace in-memory storage with:
- Redis for rate limiting and session storage
- PostgreSQL for security logs
- Proper session management system

### 3. **Monitoring & Alerting**
Integrate with monitoring services:
- DataDog, New Relic for application monitoring
- Sentry for error tracking
- Email/Slack alerts for critical security events

### 4. **Security Hardening**
- Regular dependency updates
- Security audit tooling (npm audit)
- Penetration testing
- Security header validation (securityheaders.com)

## Security Testing

### Manual Testing Scenarios

1. **XSS Attempts**:
   ```javascript
   // Try these in chat input
   "<script>alert('xss')</script>"
   "javascript:alert('xss')"
   "<img src=x onerror=alert('xss')>"
   ```

2. **SQL Injection Attempts**:
   ```sql
   -- Try these inputs
   "' OR 1=1 --"
   "'; DROP TABLE users; --"
   "UNION SELECT * FROM sensitive_data"
   ```

3. **Rate Limiting**:
   ```bash
   # Rapid requests to trigger rate limiting
   for i in {1..15}; do
     curl -X POST localhost:3000/api/chat \
       -H "Content-Type: application/json" \
       -d '{"messages":[{"role":"user","content":"test '$i'"}]}'
   done
   ```

### Automated Testing
```bash
# Install security testing tools
npm install --save-dev jest @types/jest

# Run security tests
npm run test:security
```

## Incident Response

### If Security Breach Detected:

1. **Check Security Logs**: `/api/security/logs`
2. **Identify Attack Pattern**: Review threat types and sources
3. **Block Malicious IPs**: Automatic blocking is active, manual blocks available
4. **Update Security Rules**: Adjust rate limits or detection patterns
5. **Monitor for Persistence**: Watch for continued attack attempts

### Log Analysis Queries

```bash
# Get critical events only
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:3000/api/security/logs?severity=CRITICAL"

# Get recent high-priority threats
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:3000/api/security/logs?limit=50" | \
  jq '.data.logs[] | select(.severity=="HIGH" or .severity=="CRITICAL")'
```

## Security Contact

For security issues or questions:
- Create a GitHub issue with the `security` label
- Email: [Your Security Contact]
- Review code: All security implementations are in `src/lib/security.ts` and `middleware.ts`

## Compliance Notes

This implementation provides baseline security for:
- **OWASP Top 10** protection
- **Common web vulnerabilities** (XSS, CSRF, injection attacks)
- **DDoS mitigation** (basic level)
- **Security logging** for audit trails

For enterprise or highly sensitive applications, additional measures may be required.