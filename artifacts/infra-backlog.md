# Infra Backlog — todo-app (Azure)

## Summary
- Source: `/workspace/artifacts/infra-blueprint.md`
- Environments: dev, prod
- IaC: Bicep (state backend: azurerm)
- Order: networking → security → data → compute → observability

## Epics & Stories

### Epic: Networking Foundation

#### INF-001: Provision VNet and Subnets
As a platform engineer,
I want a VNet with public/private/data subnets,
So that services can be deployed in isolated network segments.

**Acceptance Criteria (Given/When/Then):**
- Given the IaC module runs for dev/prod, When provisioning completes, Then a VNet (10.0.0.0/16) exists with subnets 10.0.1.0/24 (public), 10.0.2.0/24 (private), 10.0.3.0/24 (data).
- Given resource tags are required, When the VNet and subnets are created, Then each resource is tagged with project, environment, managed_by, and owner.

#### INF-002: Configure HTTPS Ingress for App Service
As a platform engineer,
I want HTTPS ingress configured for the Web App,
So that user traffic is encrypted in transit.

**Acceptance Criteria (Given/When/Then):**
- Given App Service is deployed, When TLS is configured, Then App Service Managed Certificates are enabled for HTTPS (443).
- Given deployment completes, When accessing the app endpoint, Then HTTP is redirected to HTTPS.

### Epic: Security Baseline

#### INF-003: Provision Key Vault and Access Policy
As a platform engineer,
I want a Key Vault and least-privilege access policy,
So that secrets are stored securely.

**Acceptance Criteria (Given/When/Then):**
- Given the security module runs, When provisioning completes, Then a Key Vault exists in dev/prod.
- Given the Web App identity is created, When access policy is applied, Then only required secret permissions are granted.

#### INF-004: Enforce Encryption In-Transit and At-Rest
As a platform engineer,
I want encryption enforced for platform resources,
So that data is protected by default.

**Acceptance Criteria (Given/When/Then):**
- Given platform resources are created, When security settings are applied, Then encryption in transit is enabled for the Web App endpoint.
- Given Key Vault is created, When the resource is reviewed, Then at-rest encryption is enabled by default.

### Epic: Compute and Hosting

#### INF-005: Provision App Service Plan and Web App (Node 20)
As a platform engineer,
I want an App Service Plan and Web App configured for Node 20,
So that the frontend can be hosted reliably.

**Acceptance Criteria (Given/When/Then):**
- Given the compute module runs, When provisioning completes, Then an App Service Plan (B1 Linux) exists in dev/prod.
- Given the Web App is created, When configuration is applied, Then runtime is Node 20 with 1 vCPU/1.75GB and min/max instances set to 1.

#### INF-006: Configure Autoscale Rules
As a platform engineer,
I want autoscale rules defined for CPU,
So that the app can scale under load if needed.

**Acceptance Criteria (Given/When/Then):**
- Given the App Service Plan exists, When autoscale is configured, Then CPU-based scale rules are defined per blueprint.
- Given autoscale is set, When verifying settings, Then scale-out and scale-in thresholds align with the CPU policy.

### Epic: Observability

#### INF-007: Provision Log Analytics and Application Insights
As a platform engineer,
I want log analytics and application insights configured,
So that logs and metrics are collected consistently.

**Acceptance Criteria (Given/When/Then):**
- Given observability module runs, When provisioning completes, Then Log Analytics Workspace exists with 30d (dev) / 90d (prod) retention.
- Given App Insights is created, When linked to the Web App, Then metrics and traces are captured.

#### INF-008: Configure Alerts (CPU, Error Rate, Latency)
As a platform engineer,
I want alert rules configured,
So that key service thresholds are monitored.

**Acceptance Criteria (Given/When/Then):**
- Given monitoring is enabled, When alert rules are applied, Then alerts exist for CPU > 80%, error rate > 1%, and p99 latency > 2s.
- Given alerts are configured, When test conditions are simulated, Then alert firing is verified.

### Epic: DNS

#### INF-009: Provision DNS Zone for App
As a platform engineer,
I want a DNS zone configured for the app,
So that production endpoints are addressable by domain.

**Acceptance Criteria (Given/When/Then):**
- Given DNS module runs, When provisioning completes, Then a DNS zone exists for the app domain.
- Given the Web App endpoint is available, When DNS records are created, Then the domain resolves to the Web App.

## Milestones
- **M1: Core Infra (Dev + Prod)** — INF-001, INF-003, INF-005
- **M2: Secure + Observable** — INF-002, INF-004, INF-007, INF-008
- **M3: Production Ready** — INF-006, INF-009
