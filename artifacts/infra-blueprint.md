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
- Ingress: 443 → Azure App Service (Web App)
- Egress: none
- TLS: App Service Managed Certs

## 3. Compute
- name: frontend
  service: Azure App Service (Web App)
  runtime: node20
  cpu: 1 vCPU
  memory: 1792
  min: 1  max: 1
  scale_on: cpu

## 4. Data
- name: none
  service: none
  engine: n/a
  tier: n/a
  storage_gb: 0
  multi_az: false
  backup_days: 0
  network: n/a

## 5. Security
- secrets: Key Vault
- identity: per-service role, least privilege
- encryption: at-rest + in-transit
- waf: no
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
| appservice-plan | compute | Azure App Service Plan | B1 (Linux) | dev/prod |
| appservice | compute | Azure App Service (Web App) | node20, 1 vCPU/1.75GB | dev/prod |
| dns | network | Azure DNS | zone for app | dev/prod |
| keyvault | security | Key Vault | standard | dev/prod |
| log-analytics | observability | Log Analytics Workspace | 30d/90d retention | dev/prod |
| app-insights | observability | Application Insights | basic | dev/prod |

## 8. Upgrade Path (one line each)
- traffic > 100 req/s → scale App Service plan to S1 and enable autoscale
- data > 0 GB → add Azure Blob Storage for static asset offload if needed
- users > 50k → add Azure Front Door for global CDN and WAF

## 9. IaC Handoff
- modules: [networking, security, data, compute, observability]
- order: networking → security → data → compute → observability
- state_backend: azurerm
- naming: "{project}-{env}-{type}-{id}"
- tags: project, environment, managed_by, owner
