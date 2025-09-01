# Security Policy

## Supported Versions

We actively support the following versions of the Recharge MCP Server:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in the Recharge MCP Server, please report it responsibly.

### How to Report

1. **Do NOT create a public GitHub issue** for security vulnerabilities
2. **Email us directly** at [security@example.com] with:
   - A clear description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (if available)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Initial Assessment**: We'll provide an initial assessment within 5 business days
- **Updates**: We'll keep you informed of our progress
- **Resolution**: We aim to resolve critical vulnerabilities within 30 days

### Security Best Practices

When using the Recharge MCP Server:

#### API Key Security
- **Never commit API keys** to version control
- **Use environment variables** for API key storage
- **Rotate API keys regularly** (recommended: every 90 days)
- **Use the principle of least privilege** - only grant necessary permissions
- **Monitor API key usage** and set up alerts for unusual activity

#### Network Security
- **Use HTTPS** for all API communications (enforced by default)
- **Secure local environment** where the MCP server runs
- **Monitor local network traffic** for unusual patterns

#### Access Control
- **Limit MCP client access** to authorized users only
- **Implement proper authentication** in your MCP client setup
- **Audit access logs** regularly

#### Data Protection
- **Encrypt sensitive data** at rest and in transit
- **Implement proper data retention policies**
- **Follow GDPR/CCPA requirements** if applicable

### Known Security Considerations

#### API Key Exposure
- The server supports both environment variable and per-request API keys
- Client-provided API keys are handled in memory only
- No API keys are logged or persisted by the server

#### Rate Limiting
- The server implements client-side retry logic
- Relies on Recharge API limits
- Consider implementing additional rate limiting for high-volume local use

#### Input Validation
- All inputs are validated before sending to Recharge API
- No database or web interface vulnerabilities

#### Network Communications
- All API communications use HTTPS
- Request/response data is handled securely

### Security Updates

Security updates will be:
- **Released immediately** for critical vulnerabilities
- **Documented in CHANGELOG.md** with security advisory references
- **Announced via GitHub releases** and security advisories
- **Backward compatible** when possible

### Compliance

This project aims to comply with:
- **OWASP Top 10** security practices
- **SOC 2 Type II** principles (where applicable)
- **ISO 27001** security standards
- **PCI DSS** requirements (for payment data handling)

### Security Checklist for Deployments

Before using in production:

- [ ] API keys are stored securely (environment variables, not code)
- [ ] All dependencies are up to date
- [ ] Local environment is secure
- [ ] Logging is configured but doesn't expose sensitive data
- [ ] Monitoring and alerting are set up
- [ ] Security incident response plan is in place

### Contact

For security-related questions or concerns:
- **Security Issues**: [security@example.com]
- **General Questions**: Create a GitHub issue (for non-security topics)

### Acknowledgments

We appreciate the security research community and will acknowledge researchers who responsibly disclose vulnerabilities (with their permission).

---

**Note**: This security policy is subject to updates. Please check back regularly for the latest version.