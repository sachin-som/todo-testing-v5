locals {
  common_tags = merge(
    {
      project     = var.project_name
      environment = var.environment
      managed_by  = var.managed_by
      owner       = var.owner
    },
    var.additional_tags
  )

  subnets = {
    public = {
      name = "public"
      cidr = var.subnet_prefixes.public
    }
    private = {
      name = "private"
      cidr = var.subnet_prefixes.private
    }
    data = {
      name = "data"
      cidr = var.subnet_prefixes.data
    }
  }
}

resource "azurerm_resource_group" "vnet" {
  name     = "${var.project_name}-${var.environment}-rg"
  location = var.location
  tags     = local.common_tags
}

resource "azurerm_virtual_network" "main" {
  name                = "${var.project_name}-${var.environment}-vnet"
  location            = azurerm_resource_group.vnet.location
  resource_group_name = azurerm_resource_group.vnet.name
  address_space       = var.vnet_address_space
  tags                = local.common_tags
}

resource "azurerm_subnet" "segments" {
  for_each             = local.subnets
  name                 = "${var.project_name}-${var.environment}-${each.value.name}-subnet"
  resource_group_name  = azurerm_resource_group.vnet.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [each.value.cidr]
}
