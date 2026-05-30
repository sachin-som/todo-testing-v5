# Plan — INF-001: Provision VNet and Subnets

## Goal
Provision an Azure VNet with public/private/data subnets for dev and prod environments, with required tags on all resources.

## Scope
- Terraform-based networking module under `/workspace/infra`.
- Azure Resource Group, VNet, and three subnets.
- Environment-specific configuration (dev/prod) via tfvars.
- Required tags: project, environment, managed_by, owner.

## Out of Scope
- NSGs, route tables, NAT gateways, peering, or firewall.
- DNS zones, App Service, or monitoring resources.

## Implementation Steps
1. **Scaffold Terraform layout**
   - Create `/workspace/infra/terraform` with `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, `providers.tf`.
   - Add tags and naming conventions based on environment.
2. **Define networking resources**
   - Resource Group, VNet (10.0.0.0/16), subnets: public (10.0.1.0/24), private (10.0.2.0/24), data (10.0.3.0/24).
   - Apply required tags to all resources.
3. **Environment configs**
   - Add `dev.tfvars` and `prod.tfvars` with environment-specific naming, tags, and location.
4. **Validation**
   - Run `terraform fmt` and `terraform validate`.

## Deliverables
- Terraform IaC under `/workspace/infra/terraform`.
- Environment tfvars for dev/prod.
- Validation results recorded in summary.
