# Infra Blueprint — personal-todo-app

## 1. Summary
- cloud: Azure
- region: eastus
- environments: [dev, prod]
- iac_tool: terraform
- availability_target: 99.9%

## 2. Network
- VPC/VNet CIDR: 10.0.0.0/16
- Subnets: public 10.0.1.0/24 | private 10.0.2.0/24 | data 10.0.3.0/24
- Ingress: 443 → LB → private compute
- Egress: none (static hosting)
- TLS: App Service Mgd Cert

## 3. Compute
- name: frontend
  service: Azure Static Web Apps (Standard)
  runtime: node20
  cpu: n/a
  memory: n/a
  min: 1  max: 1
  scale_on: requests

## 4. Data
- name: none (local browser storage only)
  service: N/A
  engine: N/A
  tier: N/A
  storage_gb: 0
  multi_az: false
  backup_days: 0
  network: private-subnet

## 5. Security
- secrets: Key Vault
- identity: per-service role, least privilege
- encryption: at-rest + in-transit
- waf: no on public endpoints
- public DB/cache: no

## 6. Observability
- logs: Azure Monitor (Log Analytics + Alerts) (retention 30d dev / 90d prod)
- metrics: Azure Monitor
- alerts: cpu>80%, error_rate>1%, latency_p99>2s

## 7. Resource Inventory (for IaC Agent)
| name | type | exact service | spec | env |
|------|------|---------------|------|-----|
| vnet | network | Azure VNet | 10.0.0.0/16 | dev/prod |
| subnet-public | network | Azure Subnet | 10.0.1.0/24 | dev/prod |
| subnet-private | network | Azure Subnet | 10.0.2.0/24 | dev/prod |
| subnet-data | network | Azure Subnet | 10.0.3.0/24 | dev/prod |
| static-web | compute | Azure Static Web Apps (Standard) | managed | dev/prod |
| dns-zone | network | Azure DNS | custom domain | prod |
| keyvault | security | Azure Key Vault | standard | dev/prod |
| log-analytics | observability | Azure Monitor Log Analytics Workspace | retention 30d/90d | dev/prod |
| app-insights | observability | Azure Application Insights | basic | dev/prod |

## 8. Upgrade Path (one line each)
- traffic > 50 req/s → upgrade Azure Static Web Apps tier to higher plan
- data > 0 GB server-side → add Azure Storage/DB service as needed
- users > 50k MAU → add Azure Front Door + WAF in front of static app

## 9. IaC Handoff
- modules: [networking, security, data, compute, observability]
- order: networking → security → data → compute → observability
- state_backend: azurerm
- naming: "{project}-{env}-{type}-{id}"
- tags: project, environment, managed_by, owner
