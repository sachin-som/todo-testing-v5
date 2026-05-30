output "resource_group_name" {
  description = "Resource group name for the VNet."
  value       = azurerm_resource_group.vnet.name
}

output "vnet_name" {
  description = "Virtual network name."
  value       = azurerm_virtual_network.main.name
}

output "vnet_id" {
  description = "Virtual network resource ID."
  value       = azurerm_virtual_network.main.id
}

output "subnet_ids" {
  description = "Subnet IDs keyed by subnet type."
  value = {
    for key, subnet in azurerm_subnet.segments :
    key => subnet.id
  }
}
