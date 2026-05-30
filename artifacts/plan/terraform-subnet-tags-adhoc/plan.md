# Plan: Terraform subnet tags fix (adhoc)

## Goal
Remove or replace unsupported `tags` argument on `azurerm_subnet` resources to satisfy Terraform validate for azurerm v4.74.0.

## Steps
1. Update `infra/terraform/main.tf` to remove `tags` from `azurerm_subnet.segments` (and document rationale via comment if needed).
2. Verify formatting/consistency in the Terraform file.
3. Run Terraform validate (if available) or at minimum re-check file for correctness.
