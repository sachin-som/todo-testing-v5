# Infra Blueprint — todo-app

## 1. Summary
- cloud: Azure
- region: eastus
- environments: [dev, prod]
- iac_tool: bicep
- availability_target: 99.9%

## 2. Network
- VPC/VNet CIDR: 10.0.0.0/16
- Subnets: public 10.0.1.0/24 | private 10.0.2.0/24 | data 10.0.3.0/24
- Ingress: 443 → Azure Front Door → Blob Storage (static site origin)
- Egress: none (no private compute)
- TLS: App Service Managed Certs

## 3. Compute
- name: frontend
  service: Azure Front Door + Azure Blob Storage (Static Website)
  runtime: static
  cpu: managed
  memory: managed
  min: 1  max: 1
  scale_on: requests

## 4. Data
- name: static-assets
  service: Azure Blob Storage
  engine: blob
  tier: Standard_LRS
  storage_gb: 10
  multi_az: false
  backup_days: 7
  network: private-subnet

## 5. Security
- secrets: Key Vault
- identity: per-service role, least privilege
- encryption: at-rest + in-transit
- waf: yes on public endpoints
- public DB/cache: no

## 6. Observability
- logs: Azure Monitor (Log Analytics + Alerts) (retention 30d dev / 90d prod)
- metrics: Azure Monitor
- alerts: cpu>80%, error_rate>1%, latency_p99>2s

## 7. Resource Inventory (for IaC Agent)
| name | type | exact service | spec | env |
|------|------|---------------|------|-----|
| vnet | network | Azure VNet | 10.0.0.0/16 | dev/prod |
| subnet-public | network | Azure VNet Subnet | 10.0.1.0/24 | dev/prod |
| subnet-private | network | Azure VNet Subnet | 10.0.2.0/24 | dev/prod |
| subnet-data | network | Azure VNet Subnet | 10.0.3.0/24 | dev/prod |
| frontdoor | edge | Azure Front Door | Standard | dev/prod |
| waf | security | Azure WAF (Front Door) | default OWASP | dev/prod |
| storage | data | Azure Blob Storage | Standard_LRS, static website | dev/prod |
| storage-pe | network | Private Endpoint | blob | dev/prod |
| dns | network | Azure DNS | zone for app | dev/prod |
| keyvault | security | Key Vault | standard | dev/prod |
| log-analytics | observability | Log Analytics Workspace | 30d/90d retention | dev/prod |
| app-insights | observability | Application Insights | basic | dev/prod |

## 8. Upgrade Path (one line each)
- traffic > 100 req/s → move to Front Door Premium and enable advanced caching/WAF rules
- data > 50 GB → increase Blob Storage capacity tier or add lifecycle policies
- users > 50k → add global CDN rules and optimize cache headers for static assets

## 9. IaC Handoff
- modules: [networking, security, data, compute, observability]
- order: networking → security → data → compute → observability
- state_backend: azurerm
- naming: "{project}-{env}-{type}-{id}"
- tags: project, environment, managed_by, owner
