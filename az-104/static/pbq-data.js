"use strict";

/* AZ-104 PBQ bank - HOTSPOT & DRAG DROP questions rebuilt as interactive
   tasks. Curated + verified. domain = AZ-104 skills measured (1-5). */

window.PBQ_TEST = [
 {
  "id": "az104-T1Q20",
  "domain": 3,
  "explanation": "Storing the administrator password as a secret in Azure Key Vault keeps it out of the template in plain text, and an access policy grants the ARM deployment permission to retrieve the secret. Today, Azure role-based access control (RBAC) can be used in place of vault access policies to grant that access.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have downloaded an Azure Resource Manager (ARM) template to deploy numerous virtual machines (VMs). The ARM template is based on a current VM, but must be adapted to reference an administrative password. You need to make sure that the password cannot be stored in plain text. Which of the following should you create to achieve your goal? Drag the correct options from the list to the answer area.",
  "items": [
   "An Azure Key Vault",
   "Azure Active Directory (AD) Identity Protection",
   "An access policy",
   "An Azure policy",
   "A backup policy"
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "An Azure Key Vault",
     "An access policy"
    ]
   }
  ]
 },
 {
  "id": "az104-T1Q23",
  "domain": 3,
  "explanation": "Replicating an on-premises Hyper-V VM with Azure Site Recovery requires an Azure Recovery Services vault, a Hyper-V site to register the Hyper-V host, and a replication policy. Traffic Manager instances and endpoints are not part of Site Recovery setup.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "Your company has an Azure subscription that includes a number of Azure virtual machines (VMs), which are all part of the same virtual network. Your company also has an on-premises Hyper-V server that hosts a VM, named VM1, which must be replicated to Azure. Which of the following objects must be created to achieve this goal? Drag the correct options from the list to the answer area.",
  "items": [
   "Hyper-V site",
   "Storage account",
   "Azure Recovery Services vault",
   "Azure Traffic Manager instance",
   "Replication policy",
   "Endpoint"
  ],
  "zones": [
   {
    "prompt": "Objects to create",
    "answer": [
     "Hyper-V site",
     "Replication policy",
     "Azure Recovery Services vault"
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q1",
  "domain": 4,
  "explanation": "The Network Contributor role grants full management of networking resources, including load balancer backend pools and health probes, without the broader rights of Contributor or Owner. Scoping the role to each individual load balancer rather than to RG1 follows the principle of least privilege.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that contains a resource group named RG1. In RG1, you create an internal load balancer named LB1 and a public load balancer named LB2. You need to ensure that an administrator named Admin1 can manage LB1 and LB2. The solution must follow the principle of least privilege. Which role should you assign to Admin1 for each task? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "To add a backend pool to LB1:",
    "options": {
     "a": [
      "Contributor on LB1",
      "Network Contributor on LB1",
      "Network Contributor on RG1",
      "Owner on LB1"
     ]
    },
    "answer": {
     "a": "Network Contributor on LB1"
    }
   },
   {
    "prompt": "To add a health probe to LB2:",
    "options": {
     "a": [
      "Contributor on LB2",
      "Network Contributor on LB2",
      "Network Contributor on RG1",
      "Owner on LB2"
     ]
    },
    "answer": {
     "a": "Network Contributor on LB2"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q21",
  "domain": 1,
  "explanation": "Because each department uses resources spread across several resource groups, tags must be applied to the individual resources, not the resource groups. You can then filter Cost analysis by the department tag and download the usage report for the finance department.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that is used by four departments in your company. The subscription contains 10 resource groups. Each department uses resources in several resource groups. You need to send a report to the finance department. The report must detail the costs for each department. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Assign a tag to each resource group.",
   "Assign a tag to each resource.",
   "Download the usage report.",
   "From the Cost analysis blade, filter the view by tag.",
   "Open the Resource costs blade of each resource group."
  ],
  "zones": [
   {
    "prompt": "Answer area (actions in order)",
    "answer": [
     "Assign a tag to each resource.",
     "From the Cost analysis blade, filter the view by tag.",
     "Download the usage report."
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q25",
  "domain": 1,
  "explanation": "The resourceGroups wildcard in assignableScopes limits the role so it can be assigned only at resource group scopes within Subscription1. Adding Microsoft.Authorization/* to notActions removes the ability to manage access permissions while the actions list still allows managing (viewing, creating, modifying, and deleting) resources.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that has a subscription ID of c276fc76-9cd4-44c9-99a7-4fd71546436e. You need to create a custom RBAC role named CR1 that meets the following requirements: Can be assigned only to the resource groups in Subscription1; Prevents the management of the access permissions for the resource groups; Allows the viewing, creating, modifying, and deleting of resources within the resource groups. What should you specify in the assignable scopes and the permissions sections in the definition of CR1? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "In the assignableScopes section:",
    "options": {
     "a": [
      "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e",
      "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e/resourceGroups",
      "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e/resourceGroups/*"
     ]
    },
    "answer": {
     "a": "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e/resourceGroups/*"
    }
   },
   {
    "prompt": "In the notActions section of permissions:",
    "options": {
     "a": [
      "Microsoft.Authorization/*",
      "Microsoft.Resources/*",
      "Microsoft.Security/*"
     ]
    },
    "answer": {
     "a": "Microsoft.Authorization/*"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q28",
  "domain": 1,
  "explanation": "Under Assignments, select Users and groups to include all users and Cloud apps to target the Microsoft Azure Management (Azure portal) app. Under Access controls, use Grant to require multi-factor authentication; Conditions and Session are not needed for this requirement.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure Active Directory (Azure AD) tenant. You need to create a conditional access policy that requires all users to use multi-factor authentication when they access the Azure portal. Which three settings should you configure? To answer, select the appropriate settings in the answer area.",
  "items": [
   "Name",
   "Users and groups",
   "Cloud apps",
   "Conditions",
   "Grant",
   "Session"
  ],
  "zones": [
   {
    "prompt": "Settings to configure (select three)",
    "answer": [
     "Users and groups",
     "Cloud apps",
     "Grant"
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q32",
  "domain": 1,
  "explanation": "User2 is synced from Windows Server Active Directory, so directory attributes such as JobTitle must be edited on-premises and synced to Azure AD. UsageLocation is a cloud-only attribute that is always set in Azure AD, so it can be modified there for all three users.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have a hybrid deployment of Azure Active Directory (Azure AD) that contains the users shown in the following table. You need to modify the JobTitle and UsageLocation attributes for the users. For which users can you modify the attributes from Azure AD? To answer, select the appropriate options in the answer area. Table: User1 (Member, source: Azure Active Directory); User2 (Member, source: Windows Server Active Directory); User3 (Guest, source: Microsoft account).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "JobTitle:",
    "options": {
     "a": [
      "User1 only",
      "User1 and User2 only",
      "User1 and User3 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1 and User3 only"
    }
   },
   {
    "prompt": "UsageLocation:",
    "options": {
     "a": [
      "User1 only",
      "User1 and User2 only",
      "User1 and User3 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1, User2, and User3"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q41",
  "domain": 1,
  "explanation": "First add contoso.com as a custom domain name in the Azure AD tenant, then create the TXT (or MX) record that Azure AD provides in the public contoso.com DNS zone at the registrar, and finally verify the domain so it can be used as a UPN suffix.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure Active Directory (Azure AD) tenant that has the contoso.onmicrosoft.com domain name. You have a domain name of contoso.com registered at a third-party registrar. You need to ensure that you can create Azure AD users that have names containing a suffix of @contoso.com. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Add a custom domain name",
   "Add a record to the public contoso.com DNS zone",
   "Add an Azure AD tenant",
   "Configure company branding",
   "Create an Azure DNS zone",
   "Verify the domain"
  ],
  "zones": [
   {
    "prompt": "Answer area (actions in order)",
    "answer": [
     "Add a custom domain name",
     "Add a record to the public contoso.com DNS zone",
     "Verify the domain"
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q45",
  "domain": 1,
  "explanation": "Owner (User1) and Network Contributor (User3) can modify virtual networks, including adding subnets, while Security Admin cannot change network resources. Only Owner includes Microsoft.Authorization write permissions, so only User1 can create role assignments such as granting Reader on VNet1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that contains a virtual network named VNet1. You add the users in the following table. Which user can perform each configuration? To answer, select the appropriate options in the answer area. Table: User1 (role: Owner for Subscription1); User2 (role: Security Admin for Subscription1); User3 (role: Network Contributor for Subscription1).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Add a subnet to VNet1:",
    "options": {
     "a": [
      "User1 only",
      "User3 only",
      "User1 and User3 only",
      "User2 and User3 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1 and User3 only"
    }
   },
   {
    "prompt": "Assign a user the Reader role for VNet1:",
    "options": {
     "a": [
      "User1 only",
      "User2 only",
      "User1 and User2 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q46",
  "domain": 1,
  "explanation": "Both resource locks and tags can be applied at the subscription, resource group, and resource scopes. Neither locks nor tags can be applied to management groups, which excludes the Tenant Root Group and MG1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have the Azure resources shown in the following exhibit. You plan to track resource usage and prevent the deletion of resources. To which resources can you apply locks and tags? To answer, select the appropriate options in the answer area. Hierarchy: Tenant Root Group > MG1 (management group) > Sub1 (subscription) > RG1 (resource group) > VM1 (virtual machine).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "You can apply locks to:",
    "options": {
     "a": [
      "RG1 and VM1 only",
      "Sub1 and RG1 only",
      "Sub1, RG1, and VM1 only",
      "MG1, Sub1, RG1, and VM1 only",
      "Tenant Root Group, MG1, Sub1, RG1, and VM1"
     ]
    },
    "answer": {
     "a": "Sub1, RG1, and VM1 only"
    }
   },
   {
    "prompt": "You can apply tags to:",
    "options": {
     "a": [
      "RG1 and VM1 only",
      "Sub1 and RG1 only",
      "Sub1, RG1, and VM1 only",
      "MG1, Sub1, RG1, and VM1 only",
      "Tenant Root Group, MG1, Sub1, RG1, and VM1"
     ]
    },
    "answer": {
     "a": "Sub1, RG1, and VM1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q52",
  "domain": 1,
  "explanation": "User Access Administrator only allows managing user access to a resource, so on LB1 User1 can assign access to others but cannot delete it or configure NAT rules. Virtual Machine Contributor, inherited at the resource group scope, allows managing (including deleting) virtual machines but grants no rights to load balancing rules or AKS deployments.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Load Balancer named LB1. You assign a user named User1 the roles shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. Exhibit: User1's role assignments for LB1 - User Access Administrator (scope: this resource); Virtual Machine Contributor (scope: resource group, inherited).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "User1 can [answer choice] LB1.",
    "options": {
     "a": [
      "delete",
      "create a NAT rule for",
      "assign access to other users for"
     ]
    },
    "answer": {
     "a": "assign access to other users for"
    }
   },
   {
    "prompt": "User1 can [answer choice] the resource group.",
    "options": {
     "a": [
      "delete a virtual machine from",
      "modify the load balancing rules in",
      "deploy an Azure Kubernetes Service (AKS) cluster to"
     ]
    },
    "answer": {
     "a": "delete a virtual machine from"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q57",
  "domain": 1,
  "explanation": "Azure Policy assignments can be created at management group, subscription, resource group, and individual resource scopes, so Policy1 can be assigned at every level of the hierarchy. Exclusions must be at a scope below the assignment, so with an assignment at the Tenant Root Group everything beneath it (ManagementGroup1, Subscription1, RG1, and VM1) can be excluded.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the hierarchy shown in the following exhibit. You create an Azure Policy definition named Policy1. To which Azure resources can you assign Policy1 and which Azure resources can you specify as exclusions from Policy1? To answer, select the appropriate options in the answer area. Hierarchy: Tenant Root Group > ManagementGroup1 > Subscription1 > RG1 > VM1.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "You can assign Policy1 to:",
    "options": {
     "a": [
      "Subscription1 and RG1 only",
      "ManagementGroup1 and Subscription1 only",
      "Tenant Root Group, ManagementGroup1, and Subscription1 only",
      "Tenant Root Group, ManagementGroup1, Subscription1, and RG1 only",
      "Tenant Root Group, ManagementGroup1, Subscription1, RG1, and VM1"
     ]
    },
    "answer": {
     "a": "Tenant Root Group, ManagementGroup1, Subscription1, RG1, and VM1"
    }
   },
   {
    "prompt": "You can exclude Policy1 from:",
    "options": {
     "a": [
      "VM1 only",
      "RG1 and VM1 only",
      "Subscription1, RG1, and VM1 only",
      "ManagementGroup1, Subscription1, RG1, and VM1 only"
     ]
    },
    "answer": {
     "a": "ManagementGroup1, Subscription1, RG1, and VM1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q66",
  "domain": 1,
  "explanation": "Custom Azure (subscription) RBAC roles can be created by cloning either an existing custom role such as Role1 or any built-in Azure role. Azure AD custom roles can only be cloned from existing custom Azure AD roles; creating an Azure AD role by cloning a built-in Azure AD role is not possible, so Role4 can be cloned from Role2 only.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that is linked to an Azure AD tenant. The tenant contains the custom role-based access control (RBAC) roles shown in the following table. From the Azure portal, you need to create two custom roles named Role3 and Role4. Role3 will be an Azure subscription role. Role4 will be an Azure AD role. Which roles can you clone to create the new roles? To answer, select the appropriate options in the answer area. Table: Role1 (custom Azure subscription role); Role2 (custom Azure AD role).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Role3:",
    "options": {
     "a": [
      "Role1 only",
      "Built-in Azure subscription roles only",
      "Role1 and built-in Azure subscription roles only",
      "Built-in Azure subscription roles and built-in Azure AD roles only"
     ]
    },
    "answer": {
     "a": "Role1 and built-in Azure subscription roles only"
    }
   },
   {
    "prompt": "Role4:",
    "options": {
     "a": [
      "Role2 only",
      "Built-in Azure AD roles only",
      "Role2 and built-in Azure AD roles only",
      "Built-in Azure AD roles and built-in Azure subscription roles only"
     ]
    },
    "answer": {
     "a": "Role2 only"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q72",
  "domain": 1,
  "explanation": "Group1 is a role-assignable group, and role-assignable groups can contain only users and service principals, so neither Group2 nor Group3 can be added as a member of Group1. Azure RBAC roles can be assigned directly to Microsoft 365 groups, so granting Group3 the Owner role on RG1 gives User3 Owner access.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the users shown in the following table. The groups are configured as shown in the following table. You have a resource group named RG1. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Tables: Users - User1 (member of Group1); User2 (member of Group2); User3 (member of Group3). Groups - Group1 (Security, Azure AD roles can be assigned to the group: Yes); Group2 (Security, No); Group3 (Microsoft 365, No). RG1 Access control (IAM): Group1 has the Owner role for this resource.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "You can assign User2 the Owner role for RG1 by adding Group2 as a member of Group1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "You can assign User3 the Owner role for RG1 by adding Group3 as a member of Group1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "You can assign User3 the Owner role for RG1 by assigning the Owner role to Group3 for RG1.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q75",
  "domain": 4,
  "explanation": "Storage Account Contributor at the RG1 scope allows User1 to create storage accounts, but it grants no permissions on network interfaces, so the DNS settings of networkinterface1 cannot be changed. Contributor on NSG1 allows creating inbound security rules, and because NSG1 is associated to networkinterface1 those rules filter its inbound traffic.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains a user named User1 and the resources shown in the following table. NSG1 is associated to networkinterface1. User1 has role assignments for NSG1 as shown in the following table. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Tables: Resources in resource group RG1 - networkinterface1 (virtual network interface); NSG1 (network security group). User1's role assignments for NSG1 - Contributor (scope: this resource); Storage Account Contributor (scope: resource group RG1, inherited).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "User1 can create a storage account in RG1.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "User1 can modify the DNS settings of networkinterface1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "User1 can create an inbound security rule to filter inbound traffic to networkinterface1.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q77",
  "domain": 1,
  "explanation": "The Reader role assigned to Group1 at MG1 is inherited by Sub1 and RG1, so members can view the Azure functions. User Access Administrator at MG1 lets User1 manage role assignments at any inherited scope, including granting Owner on RG1. Virtual Machine Contributor does not include Microsoft.Resources/subscriptions/resourceGroups/write, so User1 cannot create a new resource group.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have three Azure subscriptions named Sub1, Sub2, and Sub3 that are linked to an Azure AD tenant. The tenant contains a user named User1, a security group named Group1, and a management group named MG1. User1 is a member of Group1. Sub1 and Sub2 are members of MG1. Sub1 contains a resource group named RG1. RG1 contains five Azure functions. You create the following role assignments for MG1: Group1: Reader; User1: User Access Administrator. You assign User1 the Virtual Machine Contributor role for Sub1. For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "The Group1 members can view the configurations of the Azure functions.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "User1 can assign the Owner role for RG1.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "User1 can create a new resource group and deploy a virtual machine to the new group.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q81",
  "domain": 1,
  "explanation": "User2 is synced from on-premises Active Directory, so JobTitle must be changed on-premises and synchronized; it can be edited in Azure AD only for the cloud-managed users User1 and User3. UsageLocation exists only in Azure AD and can be set there for all users, including synced ones.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have a hybrid deployment of Azure Active Directory (Azure AD) that contains the users shown in the following table. You need to modify the JobTitle and UsageLocation attributes for the users. For which users can you modify the attributes from Azure AD? To answer, select the appropriate options in the answer area. Table: User1 (Member, on-premises sync enabled: No); User2 (Member, on-premises sync enabled: Yes); User3 (Guest, on-premises sync enabled: No).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "JobTitle:",
    "options": {
     "a": [
      "User1 only",
      "User1 and User2 only",
      "User1 and User3 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1 and User3 only"
    }
   },
   {
    "prompt": "UsageLocation:",
    "options": {
     "a": [
      "User1 only",
      "User1 and User2 only",
      "User1 and User3 only",
      "User1, User2, and User3"
     ]
    },
    "answer": {
     "a": "User1, User2, and User3"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q86",
  "domain": 2,
  "explanation": "AzCopy can authorize Blob storage operations with either Azure AD (Microsoft Entra ID) credentials or SAS tokens. For Azure Files, AzCopy uses SAS tokens only. See the AzCopy authorization documentation (learn.microsoft.com/azure/storage/common/storage-use-azcopy-v10#authorize-azcopy).",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Storage account named storage1 that uses Azure Blob storage and Azure File storage. You need to use AzCopy to copy data to the blob storage and file storage in storage1. Which authentication method should you use for each type of storage? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Blob storage:",
    "options": {
     "a": [
      "Azure AD only",
      "Shared access signatures (SAS) only",
      "Azure AD and shared access signatures (SAS)"
     ]
    },
    "answer": {
     "a": "Azure AD and shared access signatures (SAS)"
    }
   },
   {
    "prompt": "File storage:",
    "options": {
     "a": [
      "Azure AD only",
      "Shared access signatures (SAS) only",
      "Azure AD and shared access signatures (SAS)"
     ]
    },
    "answer": {
     "a": "Shared access signatures (SAS) only"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q87",
  "domain": 1,
  "explanation": "The Identities property holds the external email address the guest signs in with, and the B2B collaboration section is used to reset the invitation redemption status so a new invitation can be redeemed. Updating both allows External User to authenticate with contractor@gmail.com.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure AD tenant that contains a user named External User. External User authenticates to the tenant by using external195@gmail.com. You need to ensure that External User authenticates to the tenant by using contractor@gmail.com. Which two settings should you configure from the Overview blade of the user? To answer, select the appropriate settings in the answer area.",
  "items": [
   "Identities",
   "B2B collaboration",
   "User principal name",
   "Object ID",
   "Group memberships",
   "Assigned roles"
  ],
  "zones": [
   {
    "prompt": "Settings to configure (select two)",
    "answer": [
     "Identities",
     "B2B collaboration"
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q91",
  "domain": 1,
  "explanation": "The completed rule is (user.department -eq \"Marketing\") and (user.country -eq \"France\"). The user.department property identifies marketing users, the two conditions are joined with the logical operator and so both must be true, and -eq performs the exact match against \"France\".",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure AD tenant. You need to create a Microsoft 365 group that contains only members of a marketing department in France. How should you complete the dynamic membership rule? To answer, select the appropriate options in the answer area. Rule: ([Box 1] -eq \"Marketing\") [Box 2] (user.country [Box 3] \"France\")",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Box 1 (property):",
    "options": {
     "a": [
      "device.managementType",
      "device.organizationalUnit",
      "user.department",
      "user.usageLocation"
     ]
    },
    "answer": {
     "a": "user.department"
    }
   },
   {
    "prompt": "Box 2 (join operator):",
    "options": {
     "a": [
      "and",
      "or",
      "typeof"
     ]
    },
    "answer": {
     "a": "and"
    }
   },
   {
    "prompt": "Box 3 (comparison operator):",
    "options": {
     "a": [
      "-and",
      "-eq",
      "-in",
      "-match"
     ]
    },
    "answer": {
     "a": "-eq"
    }
   }
  ]
 },
 {
  "id": "az104-T2Q92",
  "domain": 1,
  "explanation": "Setting 'Users can register applications' to No prevents standard users from registering applications and therefore from creating new service principals. Setting 'Restrict access to Azure AD administration portal' to Yes blocks the portal for non-administrators, leaving PowerShell and Microsoft Graph as their management options.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure AD tenant. You need to modify the Default user role permissions settings for the tenant. The solution must meet the following requirements: Standard users must be prevented from creating new service principals. Standard users must only be able to use PowerShell or Microsoft Graph to manage their own Azure AD resources. Which two settings should you modify? To answer, select the appropriate settings in the answer area.",
  "items": [
   "Users can register applications",
   "Restrict non-admin users from creating tenants",
   "Users can create security groups",
   "Guest user access restrictions",
   "Restrict access to Azure AD administration portal",
   "LinkedIn account connections",
   "Show keep user signed in"
  ],
  "zones": [
   {
    "prompt": "Settings to modify (select two)",
    "answer": [
     "Users can register applications",
     "Restrict access to Azure AD administration portal"
    ]
   }
  ]
 },
 {
  "id": "az104-T2Q93",
  "domain": 2,
  "explanation": "Condition1 permits User1's blob read operations only when the container name is cont1, so blob2 (in cont2) and blob3 (in cont3) cannot be read. Condition2 constrains only write operations, so User2's Storage Blob Data Owner role still allows reading blob1 without restriction.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription named Sub1 that contains the blob containers shown in the following table. Sub1 contains two users named User1 and User2. Both users are assigned the Reader role at the Sub1 scope. You assign roles with conditions to User1 and User2 as shown below. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: cont1 (in storage1, contains blob1); cont2 (in storage1, contains blob2); cont3 (in storage2, contains blob3). Role assignments at the Sub1 scope: User1 - Storage Blob Data Reader with Condition1; User2 - Storage Blob Data Owner with Condition2. Condition1: !(ActionMatches{'Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read'}) OR @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:name] StringEquals 'cont1'. Condition2: !(ActionMatches{'Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write'}) OR @Resource[Microsoft.Storage/storageAccounts/blobServices/containers/blobs:path] StringLike '*2*'.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "User1 can read blob2.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "User1 can read blob3.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "User2 can read blob1.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q2",
  "domain": 2,
  "explanation": "Table storage is available only in general-purpose accounts, so the GPv1 account (storageaccount1, kind Storage) and the GPv2 account (storageaccount2, kind StorageV2) qualify. Per the answer key, Blob storage is provided by the GPv2 account and the dedicated BlobStorage account, storageaccount2 and storageaccount3.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have Azure Storage accounts as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. Exhibit: storageaccount1 (kind: Storage, resource group ContosoRG1, East US, replication: Read-access geo-redundant); storageaccount2 (kind: StorageV2, ContosoRG1, Central US, access tier: Hot, replication: Geo-redundant); storageaccount3 (kind: BlobStorage, ContosoRG1, East US, access tier: Hot, replication: Locally-redundant).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "You can use [answer choice] for Azure Table storage.",
    "options": {
     "a": [
      "storageaccount1 only",
      "storageaccount2 only",
      "storageaccount3 only",
      "storageaccount1 and storageaccount2 only",
      "storageaccount2 and storageaccount3 only"
     ]
    },
    "answer": {
     "a": "storageaccount1 and storageaccount2 only"
    }
   },
   {
    "prompt": "You can use [answer choice] for Azure Blob storage.",
    "options": {
     "a": [
      "storageaccount3 only",
      "storageaccount2 and storageaccount3 only",
      "storageaccount1 and storageaccount3 only",
      "all the storage accounts"
     ]
    },
    "answer": {
     "a": "storageaccount2 and storageaccount3 only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q5",
  "domain": 2,
  "explanation": "General-purpose v2 (StorageV2) is the account kind that supports the hot, cool, and archive blob access tiers. Standard_GRS replicates data to a secondary region for disaster fault tolerance and costs less than Standard_RAGRS, while LRS options would not survive a regional outage.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You need to create an Azure Storage account that meets the following requirements: Minimizes costs; Supports hot, cool, and archive blob tiers; Provides fault tolerance if a disaster affects the Azure region where the account resides. How should you complete the command? To answer, select the appropriate options in the answer area. Command: az storage account create -g RG1 -n storageaccount1 --kind [Box 1] --sku [Box 2]",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "--kind",
    "options": {
     "a": [
      "BlobStorage",
      "FileStorage",
      "Storage",
      "StorageV2"
     ]
    },
    "answer": {
     "a": "StorageV2"
    }
   },
   {
    "prompt": "--sku",
    "options": {
     "a": [
      "Premium_LRS",
      "Standard_GRS",
      "Standard_LRS",
      "Standard_RAGRS"
     ]
    },
    "answer": {
     "a": "Standard_GRS"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q7",
  "domain": 4,
  "explanation": "The policy denies the listed resource types in RG2, so VNET1 cannot be moved into that resource group. Azure Policy never changes the state of existing resources, so VM1 keeps running and, like VNET2, is only flagged as non-compliant; the existing VNET2 can still be modified.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the resources shown in the following table. The status of VM1 is Running. You assign to RG2 an Azure policy that uses the 'Not allowed resource types' definition with the following not-allowed resource types as parameters: Microsoft.ClassicNetwork/virtualNetworks, Microsoft.Network/virtualNetworks, and Microsoft.Compute/virtualMachines. The assignment has no exclusions and enforcement is enabled. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: VNET1 (virtual network, in RG1); VNET2 (virtual network, in RG2); VM1 (virtual machine, in RG2).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "An administrator can move VNET1 to RG2.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "The state of VM1 changed to deallocated.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "An administrator can modify the address space of VNET2.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q8",
  "domain": 2,
  "explanation": "You first prepare the drives with the WAImportExport tool, then create the import job in the Azure portal, ship the disks to the Azure data center, and finally update the import job with the shipping tracking information.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains a storage account. You have an on-premises server named Server1 that runs Windows Server 2016. Server1 has 2 TB of data. You need to transfer the data to the storage account by using the Azure Import/Export service. In which order should you perform the actions? To answer, move all actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Attach an external disk to Server1 and then run waimportexport.exe",
   "From the Azure portal, create an import job",
   "Detach the external disks from Server1 and ship the disks to an Azure data center",
   "From the Azure portal, update the import job"
  ],
  "zones": [
   {
    "prompt": "Answer area (actions in order)",
    "answer": [
     "Attach an external disk to Server1 and then run waimportexport.exe",
     "From the Azure portal, create an import job",
     "Detach the external disks from Server1 and ship the disks to an Azure data center",
     "From the Azure portal, update the import job"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q9",
  "domain": 2,
  "explanation": "A sync group contains exactly one cloud endpoint, and Group1 already uses share1, so share2 cannot be added. Azure File Sync does not support more than one server endpoint from the same server in the same sync group, so Server1 cannot add E:\\Folder2, while Server2 has no endpoint yet and can add D:\\Data.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that includes the following Azure file shares and the following on-premises servers. You create a Storage Sync Service named Sync1 and an Azure File Sync group named Group1. Group1 uses share1 as a cloud endpoint. You register Server1 and Server2 in Sync1. You add D:\\Folder1 on Server1 as a server endpoint of Group1. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Tables: Azure file shares - share1 (East US); share2 (West US). On-premises servers - Server1 (folders: D:\\Folder1, E:\\Folder2); Server2 (folder: D:\\Data).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "share2 can be added as a cloud endpoint for Group1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "E:\\Folder2 on Server1 can be added as a server endpoint for Group1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "D:\\Data on Server2 can be added as a server endpoint for Group1.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q10",
  "domain": 2,
  "explanation": "Azure file shares are accessed over SMB by using the UNC format \\\\<storage-account-name>.file.core.windows.net\\<share-name>, which here is \\\\contosostorage.file.core.windows.net\\data. The blob endpoint and portal URLs are not used for SMB file share access.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription named Subscription1. You create an Azure Storage account named contosostorage, and then you create a file share named data. Which UNC path should you include in a script that references files from the data file share? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all.",
  "items": [
   "blob.core.windows.net",
   "contosostorage",
   "data",
   "file.core.windows.net",
   "portal.azure.com",
   "subscription1"
  ],
  "zones": [
   {
    "prompt": "UNC path: \\\\[Box 1].[Box 2]\\[Box 3]",
    "answer": [
     "contosostorage",
     "file.core.windows.net",
     "data"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q11",
  "domain": 2,
  "explanation": "The azcopy make command creates a container or file share. A virtual machine image is stored as a blob, so the container must be created on the Blob service endpoint (mystorageaccount.blob.core.windows.net/vmimages).",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains an Azure Storage account. You plan to copy an on-premises virtual machine image to a container named vmimages. You need to create the container for the planned image. Which command should you run? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "azcopy [command]:",
    "options": {
     "a": [
      "copy",
      "make",
      "sync"
     ]
    },
    "answer": {
     "a": "make"
    }
   },
   {
    "prompt": "'https://mystorageaccount.[service].core.windows.net/vmimages':",
    "options": {
     "a": [
      "blob",
      "dfs",
      "file",
      "queue",
      "table"
     ]
    },
    "answer": {
     "a": "blob"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q12",
  "domain": 2,
  "explanation": "Files added to a server endpoint (File2 on Endpoint2) are detected almost immediately and sync to the cloud endpoint and all other server endpoints. Files added directly to the Azure file share (File1 on the cloud endpoint) are discovered only by the cloud change detection job, which runs just once every 24 hours, so within 24 hours File1 is available only on Endpoint1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure File sync group that has the endpoints shown in the following table. Cloud tiering is enabled for Endpoint3. You add a file named File1 to Endpoint1 and a file named File2 to Endpoint2. On which endpoints will File1 and File2 be available within 24 hours of adding the files? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: Endpoint1 (Cloud endpoint); Endpoint2 (Server endpoint); Endpoint3 (Server endpoint).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "File1:",
    "options": {
     "a": [
      "Endpoint1 only",
      "Endpoint3 only",
      "Endpoint2 and Endpoint3 only",
      "Endpoint1, Endpoint2, and Endpoint3"
     ]
    },
    "answer": {
     "a": "Endpoint1 only"
    }
   },
   {
    "prompt": "File2:",
    "options": {
     "a": [
      "Endpoint2 only",
      "Endpoint3 only",
      "Endpoint2 and Endpoint3 only",
      "Endpoint1, Endpoint2, and Endpoint3"
     ]
    },
    "answer": {
     "a": "Endpoint1, Endpoint2, and Endpoint3"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q13",
  "domain": 4,
  "explanation": "Only the Prod subnet (10.2.0.0/24) of VNet1 is allowed through the storage account firewall, so virtual machines on the 10.2.9.0/24 subnet never have connectivity to the file shares. Azure Backup cannot back up unmanaged VM disks that reside in a storage account restricted by firewall or virtual network rules, so those backups never succeed.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have several Azure virtual machines on a virtual network named VNet1. You configure an Azure Storage account as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - contoso storage account, Firewalls and virtual networks: Allow access from: Selected networks. Virtual networks: VNet1 (10.2.0.0/16) with subnet Prod (10.2.0.0/24), service endpoint status Enabled. Firewall: no IP address ranges are configured. Exceptions: Allow trusted Microsoft services to access this storage account; Allow read access to storage logging from any network; Allow read access to storage metrics from any network.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The virtual machines on the 10.2.9.0/24 subnet will have network connectivity to the file shares in the storage account:",
    "options": {
     "a": [
      "always",
      "during a backup",
      "never"
     ]
    },
    "answer": {
     "a": "never"
    }
   },
   {
    "prompt": "Azure Backup will be able to back up the unmanaged hard disks of the virtual machines in the storage account:",
    "options": {
     "a": [
      "always",
      "during a backup",
      "never"
     ]
    },
    "answer": {
     "a": "never"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q14",
  "domain": 2,
  "explanation": "Azure File Sync does not overwrite files when a new server endpoint is added; if the copies differ, a conflict file (for example, File1-Server1.txt) is created and both versions are kept. Because all endpoints in Sync1 share the same namespace, File1.txt from Share1 replicates through the cloud endpoint to Share2.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have a sync group named Sync1 that has a cloud endpoint. The cloud endpoint includes a file named File1.txt. Your on-premises network contains servers that run Windows Server 2016. The servers are configured as shown in the following table. You add Share1 as an endpoint for Sync1. One hour later, you add Share2 as an endpoint for Sync1. NOTE: Each correct selection is worth one point. Table: Server1 - Share1 (contains File1.txt, File2.txt); Server2 - Share2 (contains File2.txt, File3.txt).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "In the cloud endpoint, File1.txt is overwritten by File1.txt from Share1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "On Server1, File1.txt is overwritten by File1.txt from the cloud endpoint.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "File1.txt from Share1 replicates to Share2.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q17",
  "domain": 2,
  "explanation": "The Azure File Sync agent must be installed on the server first, the server is then registered with the Storage Sync Service, and finally a path on the registered server is added as a server endpoint in the sync group. Recovery Services vaults, data gateways, and DFS Replication are not part of Azure File Sync.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an on-premises file server named Server1 that runs Windows Server 2016. You have an Azure subscription that contains an Azure file share. You deploy an Azure File Sync Storage Sync Service, and you create a sync group. You need to synchronize files from Server1 to Azure. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Install the Azure File Sync agent on Server1",
   "Create an Azure on-premises data gateway",
   "Create a Recovery Services vault",
   "Register Server1",
   "Add a server endpoint",
   "Install the DFS Replication server role on Server1"
  ],
  "zones": [
   {
    "prompt": "Answer area (actions in sequence)",
    "answer": [
     "Install the Azure File Sync agent on Server1",
     "Register Server1",
     "Add a server endpoint"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q18",
  "domain": 2,
  "explanation": "Zone-redundant storage is the only option that replicates synchronously across three availability zones, so the data stays available if a single data center fails; GRS and RA-GRS replicate to the secondary region asynchronously, and LRS keeps all copies in one data center. ZRS requires a general-purpose v2 account.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You plan to create an Azure Storage account in the Azure region of East US 2. You need to create a storage account that meets the following requirements: Replicates synchronously. Remains available if a single data center in the region fails. How should you configure the storage account? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Replication:",
    "options": {
     "a": [
      "Geo-redundant storage (GRS)",
      "Locally-redundant storage (LRS)",
      "Read-access geo-redundant storage (RA-GRS)",
      "Zone-redundant storage (ZRS)"
     ]
    },
    "answer": {
     "a": "Zone-redundant storage (ZRS)"
    }
   },
   {
    "prompt": "Account type:",
    "options": {
     "a": [
      "Blob storage",
      "Storage (general purpose v1)",
      "StorageV2 (general purpose v2)"
     ]
    },
    "answer": {
     "a": "StorageV2 (general purpose v2)"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q21",
  "domain": 2,
  "explanation": "A Recovery Services vault can protect only resources in its own region: VM1 (West Europe) can use Vault1, and the Azure file share share1 in storage1 (East US) can use Vault2. Azure SQL databases use built-in automated backups rather than Recovery Services vaults, and blob containers cannot be backed up to a Recovery Services vault.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that contains the resources shown in the following table. In storage1, you create a blob container named blob1 and a file share named share1. Which resources can be backed up to Vault1 and Vault2? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: Vault1 (Recovery Services vault, West Europe); Vault2 (Recovery Services vault, East US); storage1 (Storage account, East US); SQL1 (Azure SQL database, East US); VM1 (Virtual machine, West Europe).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Can use Vault1 for backups:",
    "options": {
     "a": [
      "VM1 only",
      "VM1 and share1 only",
      "VM1 and SQL1 only",
      "VM1, storage1, and SQL1 only",
      "VM1, blob1, share1, and SQL1"
     ]
    },
    "answer": {
     "a": "VM1 only"
    }
   },
   {
    "prompt": "Can use Vault2 for backups:",
    "options": {
     "a": [
      "storage1 only",
      "share1 only",
      "VM1 and share1 only",
      "blob1 and share1 only",
      "storage1 and SQL1 only"
     ]
    },
    "answer": {
     "a": "share1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q23",
  "domain": 2,
  "explanation": "Locally-redundant storage always maintains three synchronous copies of the data within a single data center. The per-GB cost of infrequently accessed data is controlled by the access tier, so changing the default access tier (for example, to Cool) reduces that cost.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You create the Azure Storage account shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - Create storage account (validation passed): Subscription1; resource group RG1; location (Europe) North Europe; storage account name storage16852; deployment model Resource Manager; account kind StorageV2 (general purpose v2); replication Locally-redundant storage (LRS); performance Standard; access tier (default) Hot; connectivity method Private endpoint - StorageEndpoint1 (blob, privatelink.blob.core.windows.net); secure transfer required Enabled; large file shares Disabled; blob soft delete Disabled; blob change feed Disabled; hierarchical namespace Disabled; NFS v3 Disabled.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The minimum number of copies of the storage account will be:",
    "options": {
     "a": [
      "1",
      "2",
      "3",
      "4"
     ]
    },
    "answer": {
     "a": "3"
    }
   },
   {
    "prompt": "To reduce the cost of infrequently accessed data in the storage account, you must modify the [answer choice] setting:",
    "options": {
     "a": [
      "Access tier (default)",
      "Account kind",
      "Performance",
      "Replication"
     ]
    },
    "answer": {
     "a": "Access tier (default)"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q25",
  "domain": 2,
  "explanation": "AzCopy can authorize Blob storage operations with either Azure AD credentials or SAS tokens. For Azure Files, AzCopy supports only SAS authorization.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Storage account named storage1 that uses Azure Blob storage and Azure File storage. You need to use AzCopy to copy data to the blob storage and file storage in storage1. Which authentication method should you use for each type of storage? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Blob storage:",
    "options": {
     "a": [
      "Azure Active Directory (Azure AD) only",
      "Shared access signatures (SAS) only",
      "Access keys and shared access signatures (SAS) only",
      "Azure Active Directory (Azure AD) and shared access signatures (SAS) only",
      "Azure Active Directory (Azure AD), access keys, and shared access signatures (SAS)"
     ]
    },
    "answer": {
     "a": "Azure Active Directory (Azure AD) and shared access signatures (SAS) only"
    }
   },
   {
    "prompt": "File storage:",
    "options": {
     "a": [
      "Azure Active Directory (Azure AD) only",
      "Shared access signatures (SAS) only",
      "Access keys and shared access signatures (SAS) only",
      "Azure Active Directory (Azure AD) and shared access signatures (SAS) only",
      "Azure Active Directory (Azure AD), access keys, and shared access signatures (SAS)"
     ]
    },
    "answer": {
     "a": "Shared access signatures (SAS) only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q29",
  "domain": 2,
  "explanation": "The subscription-side preparation is to create the Storage Sync Service resource first and then create a sync group in it. Installing the Azure File Sync agent and running Server Registration are performed on Server1, not in the Azure subscription.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains an Azure file share. You have an on-premises server named Server1 that runs Windows Server 2016. You plan to set up Azure File Sync between Server1 and the Azure file share. You need to prepare the subscription for the planned Azure File Sync. Which two actions should you perform in the Azure subscription? To answer, drag the appropriate actions to the correct targets. Each action may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
  "items": [
   "Create a Storage Sync Service",
   "Install the Azure File Sync agent",
   "Create a sync group",
   "Run Server Registration"
  ],
  "zones": [
   {
    "prompt": "First action",
    "answer": [
     "Create a Storage Sync Service"
    ]
   },
   {
    "prompt": "Second action",
    "answer": [
     "Create a sync group"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q30",
  "domain": 2,
  "explanation": "A sync group contains exactly one cloud endpoint, so share3 cannot be added. A registered server can contribute only one server endpoint per sync group: Server1 already hosts data1 in Sync1, so data3 (also on Server1) cannot be added, while data2 on Server2 can.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the file shares shown in the following table. You have the on-premises file shares shown in the following table. You create an Azure file sync group named Sync1 and perform the following actions: Add share1 as the cloud endpoint for Sync1. Add data1 as a server endpoint for Sync1. Register Server1 and Server2 to Sync1. NOTE: Each correct selection is worth one point. Azure file shares: share1, share2, share3. On-premises file shares: data1 (Server1, D:\\Folder1); data2 (Server2, E:\\Folder2); data3 (Server1, E:\\Folder2).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "You can add share3 as an additional cloud endpoint for Sync1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "You can add data2 as an additional server endpoint for Sync1.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "You can add data3 as an additional server endpoint for Sync1.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q31",
  "domain": 5,
  "explanation": "When you archive diagnostics data such as AzureBackupReports to a storage account, the account must be in the same region as the Recovery Services vault, and only storage3 is in West US with Vault1. A Log Analytics workspace can be in any Azure region, so any of the three workspaces can be used.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that contains the resources shown in the following table. You plan to configure Azure Backup reports for Vault1. You are configuring the Diagnostics settings for the AzureBackupReports log. Which storage accounts and which Log Analytics workspaces can you use for the Azure Backup reports of Vault1? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: Vault1 (Recovery Services vault, West US); storage1 (Storage account, East US); storage2 (Storage account, North Europe); storage3 (Storage account, West US); Analytics1 (Log Analytics workspace, East US); Analytics2 (Log Analytics workspace, West US); Analytics3 (Log Analytics workspace, North Europe).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Storage accounts:",
    "options": {
     "a": [
      "storage1 only",
      "storage2 only",
      "storage3 only",
      "storage1, storage2, and storage3"
     ]
    },
    "answer": {
     "a": "storage3 only"
    }
   },
   {
    "prompt": "Log Analytics workspaces:",
    "options": {
     "a": [
      "Analytics1 only",
      "Analytics2 only",
      "Analytics3 only",
      "Analytics1, Analytics2, and Analytics3"
     ]
    },
    "answer": {
     "a": "Analytics1, Analytics2, and Analytics3"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q32",
  "domain": 2,
  "explanation": "Premium file shares require a FileStorage account, so only contoso104 qualifies. The Archive access tier is available only for blob data in general-purpose v2 (contoso101) and BlobStorage (contoso103) accounts.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the storage accounts shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - Storage accounts: contoso101 (StorageV2, RG1, East US); contoso102 (Storage - general purpose v1, RG1, East US); contoso103 (BlobStorage, RG1, East US); contoso104 (FileStorage, RG1, East US).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "You can create a premium file share in:",
    "options": {
     "a": [
      "contoso101 only",
      "contoso104 only",
      "contoso101 or contoso104 only",
      "contoso101, contoso102, or contoso104 only",
      "contoso101, contoso102, contoso103, or contoso104"
     ]
    },
    "answer": {
     "a": "contoso104 only"
    }
   },
   {
    "prompt": "You can use the Archive access tier in:",
    "options": {
     "a": [
      "contoso101 only",
      "contoso101 or contoso103 only",
      "contoso101, contoso102, and contoso103 only",
      "contoso101, contoso102, and contoso104 only",
      "contoso101, contoso102, contoso103, and contoso104"
     ]
    },
    "answer": {
     "a": "contoso101 or contoso103 only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q33",
  "domain": 2,
  "explanation": "On September 2, the client IP address 193.77.134.1 is outside the allowed range 193.77.134.10-193.77.134.50, so the SAS grants no access. The net use command mounts the share over SMB, which authenticates with the storage account name and key; SAS tokens are not valid SMB credentials, so the connection fails with no access.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1. In Subscription1, you create an Azure file share named share1. You create a shared access signature (SAS) named SAS1 as shown in the following exhibit. To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Exhibit - SAS1: Allowed services: File; Allowed resource types: Service, Container, Object; Allowed permissions: Read, Write, List; Start: 2018-09-01 2:00:00 PM; Expiry: 2018-09-14 2:00:00 PM (UTC+02:00); Allowed IP addresses: 193.77.134.10-193.77.134.50; Allowed protocols: HTTPS only; Signing key: key1.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "If on September 2, 2018, you run Microsoft Azure Storage Explorer on a computer that has an IP address of 193.77.134.1, and you use SAS1 to connect to the storage account, you:",
    "options": {
     "a": [
      "will be prompted for credentials",
      "will have no access",
      "will have read, write, and list access",
      "will have read-only access"
     ]
    },
    "answer": {
     "a": "will have no access"
    }
   },
   {
    "prompt": "If on September 10, 2018, you run the net use command on a computer that has an IP address of 193.77.134.50, and you use SAS1 as the password to connect to share1, you:",
    "options": {
     "a": [
      "will be prompted for credentials",
      "will have no access",
      "will have read, write, and list access",
      "will have read-only access"
     ]
    },
    "answer": {
     "a": "will have no access"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q39",
  "domain": 2,
  "explanation": "The network ACLs have defaultAction set to Allow with no IP or virtual network restrictions, so any public IP address can reach the account. A standard StorageV2 account supports setting individual block blobs to the Archive tier. Azure Files does not accept Azure AD credentials by default - identity-based SMB authentication requires a separate AD DS or Azure AD DS configuration, and the Global Administrator directory role grants no data-plane access by itself.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains an Azure Storage account named storageaccount1. You export storageaccount1 as an Azure Resource Manager template. The template contains the following sections. NOTE: Each correct selection is worth one point. Template: type Microsoft.Storage/storageAccounts; apiVersion 2019-06-01; name storageaccount1; location eastus; sku { name Standard_LRS, tier Standard }; kind StorageV2; properties: networkAcls { bypass: AzureServices, virtualNetworkRules: [], ipRules: [], defaultAction: Allow }; supportsHttpsTrafficOnly: true; encryption { services { file: { keyType: Account, enabled: true }, blob: { keyType: Account, enabled: true } }, keySource: Microsoft.Storage }; accessTier: Hot.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "A server that has a public IP address of 131.107.103.10 can access storageaccount1.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "Individual blobs in storageaccount1 can be set to use the archive tier.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "Global administrators in Azure Active Directory (Azure AD) can access a file share hosted in storageaccount1 by using their Azure AD credentials.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q44",
  "domain": 2,
  "explanation": "Object replication works only with block blobs in general-purpose v2 (StorageV2) accounts, so of the listed kinds only StorageV2 is supported. Replication is configured between a source and a destination container, so a container must be created in the new account.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Storage account named storage1 that stores images. You need to create a new storage account and replicate the images in storage1 to the new account by using object replication. How should you configure the new account? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Account type:",
    "options": {
     "a": [
      "StorageV2 only",
      "StorageV2 or FileStorage only",
      "StorageV2 or BlobStorage only",
      "StorageV2, BlobStorage, or FileStorage"
     ]
    },
    "answer": {
     "a": "StorageV2 only"
    }
   },
   {
    "prompt": "Object type to create in the new account:",
    "options": {
     "a": [
      "Container",
      "File share",
      "Table",
      "Queue"
     ]
    },
    "answer": {
     "a": "Container"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q47",
  "domain": 2,
  "explanation": "Copying a blob directly to a file share is a service-to-service copy in AzCopy, which supports only SAS authorization; Azure AD tokens cannot be used for the Azure Files destination. Therefore both the source container URL and the destination share URL must include SAS tokens.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains the storage accounts shown in the following table. You plan to use AzCopy to copy a blob from container1 directly to share1. You need to identify which authentication method to use when you use AzCopy. What should you identify for each account? To answer, drag the appropriate authentication methods to the correct accounts. Each method may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content. Table: storage1 (Azure AD authentication for AzCopy: Enabled; contains a blob container named container1 that has a public access level of No public access); storage2 (Azure AD authentication for AzCopy: Disabled; contains an Azure file share named share1).",
  "items": [
   "Azure Active Directory (Azure AD)",
   "Anonymous",
   "A storage account access key",
   "A shared access signature (SAS) token"
  ],
  "zones": [
   {
    "prompt": "storage1",
    "answer": [
     "A shared access signature (SAS) token"
    ]
   },
   {
    "prompt": "storage2",
    "answer": [
     "A shared access signature (SAS) token"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q52",
  "domain": 2,
  "explanation": "Archive is the lowest-cost access tier, so the rule must use the tierToArchive action with daysAfterModificationGreaterThan set to 90. The prefixMatch filter scopes the rule to blobs in container1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a storage account named storage1. The storage1 account contains a container named container1. You need to create a lifecycle management rule for storage1 that will automatically move the blobs in container1 to the lowest-cost tier after 90 days. How should you complete the rule? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The action block under \"baseBlob\" that contains \"daysAfterModificationGreaterThan\": 90:",
    "options": {
     "a": [
      "enableAutoTierToHotFromCool",
      "tierToArchive",
      "tierToCool"
     ]
    },
    "answer": {
     "a": "tierToArchive"
    }
   },
   {
    "prompt": "The filter in the \"filters\" section whose value is [ \"container1\" ]:",
    "options": {
     "a": [
      "blobIndexMatch",
      "blobTypes",
      "prefixMatch"
     ]
    },
    "answer": {
     "a": "prefixMatch"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q53",
  "domain": 5,
  "explanation": "Azure VM backups go to a Recovery Services vault, so create the vault first. The vault's backup storage replication must be set to zone-redundant before any items are protected (it cannot be changed afterwards), which stores the backup data across three availability zones in the primary region. Finally, create the backup policy and configure the backup for VM1.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains a virtual machine named VM1. You need to back up VM1. The solution must ensure that backups are stored across three availability zones in the primary region. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Create a Recovery Services vault",
   "Create a Backup vault",
   "Set the backup storage replication to zone-redundant",
   "Set the backup storage replication to geo-redundant",
   "Create a backup policy and configure the backup for VM1"
  ],
  "zones": [
   {
    "prompt": "Answer area (actions in sequence)",
    "answer": [
     "Create a Recovery Services vault",
     "Set the backup storage replication to zone-redundant",
     "Create a backup policy and configure the backup for VM1"
    ]
   }
  ]
 },
 {
  "id": "az104-T3Q56",
  "domain": 2,
  "explanation": "Granting User1 the Storage Blob Data Contributor role is done from Access control (IAM). A customer-initiated account failover to the secondary endpoint is started from the Geo-replication (redundancy) settings of the storage account.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure AD user named User1 and a read-access geo-redundant storage (RA-GRS) account named contoso2023. You need to meet the following requirements: User1 must be able to write blob data to contoso2023. The contoso2023 account must fail over to its secondary endpoint. Which two settings should you configure? To answer, select the appropriate settings in the answer area. NOTE: Each correct selection is worth one point. Exhibit: the contoso2023 storage account menu in the Azure portal, including Access control (IAM) and the Data storage, Security + networking, and Data management sections.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "To ensure that User1 can write blob data to contoso2023, configure:",
    "options": {
     "a": [
      "Access control (IAM)",
      "Access keys",
      "Shared access signature",
      "Encryption",
      "Networking",
      "Geo-replication"
     ]
    },
    "answer": {
     "a": "Access control (IAM)"
    }
   },
   {
    "prompt": "To fail over contoso2023 to its secondary endpoint, configure:",
    "options": {
     "a": [
      "Access control (IAM)",
      "Access keys",
      "Shared access signature",
      "Encryption",
      "Networking",
      "Geo-replication"
     ]
    },
    "answer": {
     "a": "Geo-replication"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q58",
  "domain": 2,
  "explanation": "The storage account access key key1 grants full data-plane access to every service in the account regardless of User1's RBAC role assignments, so it allows writes to Table1, folder1, and container1. SAS1 is an account SAS that permits only the Table service, so despite its write permissions it can be used to write only to Table1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a user named User1 and a storage account named storage1. The storage1 account contains the resources shown in the following table. User1 is assigned the following roles for storage1: Storage Blob Data Reader, Storage Table Data Contributor, and Storage File Data SMB Share Contributor. For storage1, you create a shared access signature (SAS) named SAS1 that has the settings shown in the exhibit. To which resources can User1 write by using key1 and SAS1? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: container1 (Blob container); Table1 (Table); folder1 (File share). Exhibit - SAS1: Allowed services: Table; Allowed resource types: Service, Container, Object; Allowed permissions: Read, Write, Delete, List, Add, Create, Update, Process; Allowed protocols: HTTPS only; Signing key: key1.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "User1 can write by using key1 to:",
    "options": {
     "a": [
      "Table1 only",
      "Table1 and container1 only",
      "folder1 and Table1 only",
      "folder1 and container1 only",
      "Table1, folder1, and container1"
     ]
    },
    "answer": {
     "a": "Table1, folder1, and container1"
    }
   },
   {
    "prompt": "User1 can write by using SAS1 to:",
    "options": {
     "a": [
      "Table1 only",
      "Table1 and container1 only",
      "folder1 and Table1 only",
      "folder1 and container1 only",
      "Table1, folder1, and container1"
     ]
    },
    "answer": {
     "a": "Table1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q59",
  "domain": 1,
  "explanation": "A container supports a maximum of five stored access policies; two already exist, so three more can be created. A container supports at most two immutability policies - one time-based retention policy and one legal hold. The time-based policy already exists, so only one more (a legal hold) can be added.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the storage account shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - container1 Access policy: Stored access policies: Policy1, Policy2. Immutable blob storage policies: one time-based retention policy (scope Container, retention interval 14 days, state Unlocked).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The maximum number of additional stored access policies that you can create for container1 is:",
    "options": {
     "a": [
      "1",
      "2",
      "3",
      "4",
      "5"
     ]
    },
    "answer": {
     "a": "3"
    }
   },
   {
    "prompt": "The maximum number of additional immutable blob storage policies that you can create for container1 is:",
    "options": {
     "a": [
      "0",
      "1",
      "2",
      "3"
     ]
    },
    "answer": {
     "a": "1"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q62",
  "domain": 2,
  "explanation": "Lifecycle management policies are supported on general-purpose v2 and premium block blob accounts, so all three storage accounts qualify. The Archive tier is not available in premium block blob accounts (storage1) or in accounts that use zone-redundant storage (storage3), leaving storage2 only.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the storage accounts shown in the following table. You need to identify which storage accounts support lifecycle management, and which storage accounts support moving data to the Archive access tier. Which storage accounts should you use? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: storage1 (Premium block blobs, locally-redundant storage); storage2 (StorageV2 general purpose v2, locally-redundant storage); storage3 (StorageV2 general purpose v2, zone-redundant storage).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Lifecycle management:",
    "options": {
     "a": [
      "storage1 only",
      "storage2 only",
      "storage1 and storage3 only",
      "storage2 and storage3 only",
      "storage1, storage2, and storage3"
     ]
    },
    "answer": {
     "a": "storage1, storage2, and storage3"
    }
   },
   {
    "prompt": "The Archive access tier:",
    "options": {
     "a": [
      "storage1 only",
      "storage2 only",
      "storage3 only",
      "storage2 and storage3 only",
      "storage1, storage2, and storage3"
     ]
    },
    "answer": {
     "a": "storage2 only"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q64",
  "domain": 2,
  "explanation": "Blobs that were not updated for 45 days are matched with daysAfterModificationGreaterThan; the creation and last-access conditions track different events. Lifecycle tiering actions apply only to block blobs, so blobTypes must be blockBlob.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a storage account named storage1. The storage1 account contains a container named container1. You create a blob lifecycle rule named rule1. You need to configure rule1 to automatically move blobs that were NOT updated for 45 days from container1 to the Cool access tier. How should you complete the rule? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The condition inside \"tierToCool\" that is set to 45:",
    "options": {
     "a": [
      "daysAfterCreationGreaterThan",
      "daysAfterLastAccessTimeGreaterThan",
      "daysAfterModificationGreaterThan"
     ]
    },
    "answer": {
     "a": "daysAfterModificationGreaterThan"
    }
   },
   {
    "prompt": "The value inside \"blobTypes\":",
    "options": {
     "a": [
      "appendBlob",
      "blockBlob",
      "pageBlob"
     ]
    },
    "answer": {
     "a": "blockBlob"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q71",
  "domain": 2,
  "explanation": "The account is set to Microsoft network routing; changing the default routing tier to Internet routing hands traffic off closer to the client and lowers network costs. The encryption type (Microsoft-managed versus customer-managed keys) can be changed after the account exists, whereas infrastructure encryption, the customer-managed key support scope, and the premium account type can be set only at creation.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that has offices in the East US and West US Azure regions. You plan to create the storage account shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - Create a storage account (Review): name adatum22; resource group RG1; location eastus; performance Premium; premium account type File shares; replication Zone-redundant storage (ZRS); secure transfer Enabled; large file shares Disabled; network connectivity Public endpoint (all networks); default routing tier Microsoft network routing; endpoint type Standard; file share soft delete Enabled (7 days); encryption type Microsoft-managed keys (MMK); support for customer-managed keys Blobs and files only; infrastructure encryption Disabled.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "To minimize the network costs of accessing adatum22, modify the [answer choice] setting:",
    "options": {
     "a": [
      "Default routing tier",
      "Endpoint type",
      "Location",
      "Network connectivity",
      "Performance"
     ]
    },
    "answer": {
     "a": "Default routing tier"
    }
   },
   {
    "prompt": "After adatum22 is created, you can modify the [answer choice] setting:",
    "options": {
     "a": [
      "Enable infrastructure encryption",
      "Enable support for customer-managed keys",
      "Encryption type",
      "Premium account type"
     ]
    },
    "answer": {
     "a": "Encryption type"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q72",
  "domain": 2,
  "explanation": "Customer-managed keys for Azure Storage encryption must be RSA keys stored in Azure Key Vault. The supported sizes are 2048, 3072, and 4096 bits, so 4096 is the maximum.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You plan to deploy a new storage account. You need to configure encryption for the account. The solution must meet the following requirements: Use a customer-managed key stored in a key vault. Use the maximum supported bit length. Which type of key and which bit length should you use? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Key type:",
    "options": {
     "a": [
      "AES",
      "EC",
      "RSA"
     ]
    },
    "answer": {
     "a": "RSA"
    }
   },
   {
    "prompt": "Bit length:",
    "options": {
     "a": [
      "2048",
      "3072",
      "4096"
     ]
    },
    "answer": {
     "a": "4096"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q75",
  "domain": 2,
  "explanation": "The wildcard Microsoft.Network/virtualNetworks/* grants every action on virtual networks. Viewing a storage account's configuration requires only Microsoft.Storage/storageAccounts/read, which is the least-privileged option; the wildcard grants far more, and the blob read action applies to blob data rather than account configuration.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You plan to create a role definition to meet the following requirements: Users must be able to view the configuration data of a storage account. Users must be able to perform all actions on a virtual network. The solution must use the principle of least privilege. What should you include in the role definition for each requirement? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Perform all actions on a virtual network:",
    "options": {
     "a": [
      "Microsoft.Network/virtualNetworks/*",
      "Microsoft.Network/virtualNetworks/delete",
      "Microsoft.Network/virtualNetworks/write"
     ]
    },
    "answer": {
     "a": "Microsoft.Network/virtualNetworks/*"
    }
   },
   {
    "prompt": "View the configuration data of a storage account:",
    "options": {
     "a": [
      "Microsoft.Storage/storageAccounts/*",
      "Microsoft.Storage/storageAccounts/read",
      "Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read"
     ]
    },
    "answer": {
     "a": "Microsoft.Storage/storageAccounts/read"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q80",
  "domain": 2,
  "explanation": "Downloading a specific blob by name is an object-level operation, so the Object resource type must be allowed, and only the Read permission is required. List is unnecessary because the blob name is already known, and granting it would allow enumeration of the container.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a storage account named storage1. You need to configure a shared access signature (SAS) to ensure that users can only download blobs securely by name. Which two settings should you configure? To answer, select the appropriate settings in the answer area. NOTE: Each correct answer is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Allowed resource types:",
    "options": {
     "a": [
      "Service",
      "Container",
      "Object"
     ]
    },
    "answer": {
     "a": "Object"
    }
   },
   {
    "prompt": "Allowed permissions:",
    "options": {
     "a": [
      "Read",
      "Write",
      "Delete",
      "List",
      "Add",
      "Create"
     ]
    },
    "answer": {
     "a": "Read"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q86",
  "domain": 2,
  "explanation": "Locally-redundant storage always maintains three synchronous copies of the data within a single data center. The cost of storing infrequently accessed data is governed by the access tier, so changing the default access tier (for example, to Cool) reduces that cost.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You plan to create the Azure Storage account shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit - Create storage account (validation passed): Subscription1; resource group RG1; location (Europe) North Europe; storage account name storage6852; deployment model Resource Manager; account kind StorageV2 (general purpose v2); replication Locally-redundant storage (LRS); performance Standard; access tier (default) Hot; connectivity method Private endpoint - StorageEndpoint1 (blob, privatelink.blob.core.windows.net); secure transfer required Enabled; large file shares Disabled; blob soft delete Disabled; blob change feed Disabled; hierarchical namespace Disabled; NFS v3 Disabled.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The minimum number of copies of the storage account will be:",
    "options": {
     "a": [
      "1",
      "2",
      "3",
      "4"
     ]
    },
    "answer": {
     "a": "3"
    }
   },
   {
    "prompt": "To reduce the cost of infrequently accessed data in the storage account, you must modify the [answer choice] setting:",
    "options": {
     "a": [
      "Access tier (default)",
      "Account kind",
      "Performance",
      "Replication"
     ]
    },
    "answer": {
     "a": "Access tier (default)"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q87",
  "domain": 2,
  "explanation": "Image files uploaded to Blob storage are block blobs. A blob inventory prefixMatch must include the container name followed by the blob-name prefix, so container1/finance matches only blobs in container1 whose names start with finance; wildcards are not supported.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Storage account named storage1 that contains a container named container1. The container1 container stores thousands of image files. You plan to use an Azure Resource Manager (ARM) template to create a blob inventory rule named rule1. You need to ensure that only blobs whose names start with the word finance are stored daily as a CSV file in container1. How should you complete rule1? To answer, select the options in the answer area. NOTE: Each correct answer is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The value inside \"blobTypes\":",
    "options": {
     "a": [
      "appendBlob",
      "blockBlob",
      "pageBlob"
     ]
    },
    "answer": {
     "a": "blockBlob"
    }
   },
   {
    "prompt": "The value inside \"prefixMatch\":",
    "options": {
     "a": [
      "container1/*",
      "container1/finance",
      "finance"
     ]
    },
    "answer": {
     "a": "container1/finance"
    }
   }
  ]
 },
 {
  "id": "az104-T3Q88",
  "domain": 2,
  "explanation": "The Container resource type is required for container-level operations such as enumerating the blobs in container1, and the Object resource type is required to access the blobs themselves. Read is the minimum permission that allows the blobs to be downloaded, satisfying the principle of least privilege.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a storage account named storage1. The storage1 account contains blobs in a container named container1. You plan to share access to storage1. You need to generate a shared access signature (SAS). The solution must meet the following requirements: • Ensure that the SAS can only be used to enumerate and download blobs stored in container1. • Use the principle of least privilege. Which three settings should you enable? To answer, select the appropriate settings in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Allowed resource types - first setting to enable:",
    "options": {
     "a": [
      "Service",
      "Container",
      "Object"
     ]
    },
    "answer": {
     "a": "Container"
    }
   },
   {
    "prompt": "Allowed resource types - second setting to enable:",
    "options": {
     "a": [
      "Service",
      "Container",
      "Object"
     ]
    },
    "answer": {
     "a": "Object"
    }
   },
   {
    "prompt": "Allowed permissions - setting to enable:",
    "options": {
     "a": [
      "Read",
      "Write",
      "Delete",
      "List",
      "Add",
      "Create"
     ]
    },
    "answer": {
     "a": "Read"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q5",
  "domain": 4,
  "explanation": "An existing virtual machine cannot be moved to a different virtual network. Instead, delete VM1 while retaining Disk1, and then create a new virtual machine that is connected to VNet2 and uses Disk1. The custom application is preserved on the disk, which minimizes administrative effort.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1. Subscription1 contains the resources in the following table. VNet1 is in RG1. VNet2 is in RG2. There is no connectivity between VNet1 and VNet2. An administrator named Admin1 creates an Azure virtual machine named VM1 in RG1. VM1 uses a disk named Disk1 and connects to VNet1. Admin1 then installs a custom application in VM1. You need to move the custom application to VNet2. The solution must minimize administrative effort. Which two actions should you perform? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table: RG1 (resource group); RG2 (resource group); VNet1 (virtual network, in RG1); VNet2 (virtual network, in RG2).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "First action:",
    "options": {
     "a": [
      "Create a network interface in RG2",
      "Detach a network interface",
      "Delete VM1",
      "Move a network interface to RG2"
     ]
    },
    "answer": {
     "a": "Delete VM1"
    }
   },
   {
    "prompt": "Second action:",
    "options": {
     "a": [
      "Attach a network interface",
      "Create a network interface in RG2",
      "Create a new virtual machine",
      "Move VM1 to RG2"
     ]
    },
    "answer": {
     "a": "Create a new virtual machine"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q7",
  "domain": 3,
  "explanation": ".NET Core is cross-platform, so WebApp1 can run on the Windows plan ASP1 or the Linux plan ASP3. ASP.NET 4.7 requires Windows, so WebApp2 can use only ASP1. ASP2 is excluded for both apps because a web app must be created in the same region as its App Service plan, and ASP2 is in Central US.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have the App Service plans shown in the following table. You plan to create the Azure web apps shown in the following table. You need to identify which App Service plans can be used for the web apps. What should you identify? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Table (App Service plans): ASP1 (Windows, West US); ASP2 (Windows, Central US); ASP3 (Linux, West US). Table (planned web apps): WebApp1 (runtime stack .NET Core 3.0, region West US); WebApp2 (runtime stack ASP.NET 4.7, region West US).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "WebApp1:",
    "options": {
     "a": [
      "ASP1 only",
      "ASP3 only",
      "ASP1 and ASP2 only",
      "ASP1 and ASP3 only",
      "ASP1, ASP2, and ASP3"
     ]
    },
    "answer": {
     "a": "ASP1 and ASP3 only"
    }
   },
   {
    "prompt": "WebApp2:",
    "options": {
     "a": [
      "ASP1 only",
      "ASP3 only",
      "ASP1 and ASP3 only",
      "ASP1, ASP2, and ASP3"
     ]
    },
    "answer": {
     "a": "ASP1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q8",
  "domain": 3,
  "explanation": "The scale-out rule adds 2 VMs when CPU utilization is at or above the 80 percent threshold, so the initial 4 instances grow to 6. At 25 percent utilization the scale-in rule removes VMs, but the instance count cannot drop below the configured minimum of 2.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You create a virtual machine scale set named Scale1. Scale1 is configured as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (Scale1 scaling settings): Initial instance count: 4; Scaling policy: Custom; Minimum number of VMs: 2; Maximum number of VMs: 20; Scale out: CPU threshold 80%, number of VMs to increase by: 2; Scale in: CPU threshold 30%, number of VMs to decrease by: 4.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "If Scale1 is utilized at 85 percent for six minutes after it is deployed, Scale1 will be running [answer choice].",
    "options": {
     "a": [
      "2 virtual machines",
      "4 virtual machines",
      "6 virtual machines",
      "10 virtual machines",
      "20 virtual machines"
     ]
    },
    "answer": {
     "a": "6 virtual machines"
    }
   },
   {
    "prompt": "If Scale1 is utilized at 25 percent for six minutes after it is deployed, Scale1 will be running [answer choice].",
    "options": {
     "a": [
      "2 virtual machines",
      "4 virtual machines",
      "6 virtual machines",
      "10 virtual machines",
      "20 virtual machines"
     ]
    },
    "answer": {
     "a": "2 virtual machines"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q10",
  "domain": 3,
  "explanation": "Running az aks install-cli from the Azure CLI downloads and installs the kubectl client (and kubelogin) on the local computer.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure Kubernetes Service (AKS) cluster named AKS1 and a computer named Computer1 that runs Windows 10. Computer1 has the Azure CLI installed. You need to install the kubectl client on Computer1. Which command should you run? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "First part of the command:",
    "options": {
     "a": [
      "az aks",
      "docker",
      "msiexec.exe",
      "Install-Module"
     ]
    },
    "answer": {
     "a": "az aks"
    }
   },
   {
    "prompt": "Second part of the command:",
    "options": {
     "a": [
      "install-cli",
      "package",
      "-name",
      "pull"
     ]
    },
    "answer": {
     "a": "install-cli"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q11",
  "domain": 3,
  "explanation": "With Azure Automation State Configuration (DSC), you first upload the configuration to the Automation account, then compile it into a node configuration (MOF file) that can be assigned to the onboarded nodes, and finally check the compliance status of the nodes to manage ongoing configuration consistency.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You onboard 10 Azure virtual machines to Azure Automation State Configuration. You need to use Azure Automation State Configuration to manage the ongoing consistency of the virtual machine configurations. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Upload a configuration to Azure Automation State Configuration",
   "Compile a configuration into a node configuration",
   "Check the compliance status of the node"
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Upload a configuration to Azure Automation State Configuration",
     "Compile a configuration into a node configuration",
     "Check the compliance status of the node"
    ]
   }
  ]
 },
 {
  "id": "az104-T4Q24",
  "domain": 3,
  "explanation": "The 14 VMs are spread across 10 update domains, so four update domains contain 2 VMs each. Planned maintenance takes down only one update domain at a time, so at most 2 VMs are unavailable. With 2 fault domains, each rack hosts 7 VMs, so a rack power failure makes up to 7 VMs unavailable.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains an Azure Availability Set named WEBPROD-AS-USE2 as shown in the following exhibit. You add 14 virtual machines to WEBPROD-AS-USE2. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (az vm availability-set list output): name: WEBPROD-AS-USE2; location: eastus2; platformFaultDomainCount: 2; platformUpdateDomainCount: 10; sku name: Aligned.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be [answer choice].",
    "options": {
     "a": [
      "1",
      "2",
      "7",
      "10",
      "14"
     ]
    },
    "answer": {
     "a": "2"
    }
   },
   {
    "prompt": "If the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be [answer choice].",
    "options": {
     "a": [
      "1",
      "2",
      "7",
      "10",
      "14"
     ]
    },
    "answer": {
     "a": "7"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q27",
  "domain": 3,
  "explanation": "The container group is assigned a public IP address with TCP port 80 open, so any Internet-connected device can reach it. Because restartPolicy is set to OnFailure, Azure Container Instances automatically restarts the container if the IIS process fails.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You plan to deploy an Azure container instance by using the following Azure Resource Manager template. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the template. NOTE: Each correct selection is worth one point. Template summary: a Microsoft.ContainerInstance/containerGroups resource named webprod in westus with one container (image microsoft/iis:nanoserver) listening on TCP port 80, resource requests of 1.5 GB memory and 1 CPU, restartPolicy set to OnFailure, a public IP address with TCP port 80 open, and osType Windows.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Internet users [answer choice].",
    "options": {
     "a": [
      "can connect to the container from any device",
      "can connect to the container only from a Windows device",
      "can connect to the container only from hosts on the same virtual network",
      "cannot connect to the container"
     ]
    },
    "answer": {
     "a": "can connect to the container from any device"
    }
   },
   {
    "prompt": "If the IIS process in the container fails, [answer choice].",
    "options": {
     "a": [
      "the container will restart automatically",
      "the container must be restarted manually",
      "the container will stop and remain stopped",
      "the container group will be deleted"
     ]
    },
    "answer": {
     "a": "the container will restart automatically"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q38",
  "domain": 1,
  "explanation": "An Append policy adds the tag only to resources that are created or updated after the assignment; it does not modify existing resources, so RG1 keeps only tag1. The new storage account receives tag3 (specified at creation) plus tag2 (appended by Policy1). Tags on a resource group are not inherited by its resources, so tag1 is not applied to storage1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1 that contains the following resource group: Name: RG1; Region: West US; Tag: \"tag1\": \"value1\". You assign an Azure policy named Policy1 to Subscription1 by using the following configurations: Exclusions: None; Policy definition: Append a tag and its value to resources; Assignment name: Policy1; Parameters: Tag name: tag2, Tag value: value2. After Policy1 is assigned, you create a storage account that has the following configuration: Name: storage1; Location: West US; Resource group: RG1; Tags: \"tag3\": \"value3\". You need to identify which tags are assigned to RG1 and storage1. What should you identify? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Tags assigned to RG1:",
    "options": {
     "a": [
      "\"tag1\": \"value1\" only",
      "\"tag2\": \"value2\" only",
      "\"tag1\": \"value1\" and \"tag2\": \"value2\""
     ]
    },
    "answer": {
     "a": "\"tag1\": \"value1\" only"
    }
   },
   {
    "prompt": "Tags assigned to storage1:",
    "options": {
     "a": [
      "\"tag3\": \"value3\" only",
      "\"tag1\": \"value1\" and \"tag3\": \"value3\" only",
      "\"tag2\": \"value2\" and \"tag3\": \"value3\" only",
      "\"tag1\": \"value1\", \"tag2\": \"value2\", and \"tag3\": \"value3\""
     ]
    },
    "answer": {
     "a": "\"tag2\": \"value2\" and \"tag3\": \"value3\" only"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q39",
  "domain": 5,
  "explanation": "Email actions are rate-limited to no more than 100 messages per hour, so Alert1, which fires every minute, sends 60 emails in an hour. The second statement asks about Alert2, which does not exist (only Alert1 was created), so 0 SMS messages are sent.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1. In Subscription1, you create an alert rule named Alert1. The Alert1 action group is configured as shown in the following exhibit. Alert1 alert criteria are triggered every minute. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (action group): Name: ActionGroup1; GroupShortName: AGL; Enabled: True; EmailReceivers: Action1_-EmailAction; SmsReceivers: Action1_-SMSAction; WebhookReceivers: none; Location: Global.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The number of email messages that Alert1 will send in an hour is [answer choice].",
    "options": {
     "a": [
      "0",
      "6",
      "12",
      "60"
     ]
    },
    "answer": {
     "a": "60"
    }
   },
   {
    "prompt": "The number of SMS messages that Alert2 will send in an hour is [answer choice].",
    "options": {
     "a": [
      "0",
      "6",
      "12",
      "60"
     ]
    },
    "answer": {
     "a": "0"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q48",
  "domain": 4,
  "explanation": "The web server listens on TCP port 80, which is allowed by Rule1 (ports 50-500). DNS uses port 53, which falls in the 50-60 range denied by Rule2; priority 100 is processed before Rule1, so DNS traffic is blocked. Deleting Rule2 removes the deny, so port 53 then matches Rule1 and both services become reachable.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1. Subscription1 contains a virtual machine named VM1. You install and configure a web server and a DNS server on VM1. VM1 has the effective network security rules shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (inbound port rules on network security group VM1-nsg): Priority 100, Rule2, ports 50-60, protocol Any, source Any, destination Any, Deny; Priority 300, RDP, port 3389, protocol TCP, Allow; Priority 400, Rule1, ports 50-500, protocol Any, Allow; Priority 65001, AllowAzureLoadBalancerInBound, Allow; all other inbound traffic is denied by the default DenyAllInBound rule.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Internet users [answer choice].",
    "options": {
     "a": [
      "can connect to only the DNS server on VM1",
      "can connect to only the web server on VM1",
      "can connect to the web server and the DNS server on VM1",
      "cannot connect to the web server and the DNS server on VM1"
     ]
    },
    "answer": {
     "a": "can connect to only the web server on VM1"
    }
   },
   {
    "prompt": "If you delete Rule2, Internet users [answer choice].",
    "options": {
     "a": [
      "can connect to only the DNS server on VM1",
      "can connect to only the web server on VM1",
      "can connect to the web server and the DNS server on VM1",
      "cannot connect to the web server and the DNS server on VM1"
     ]
    },
    "answer": {
     "a": "can connect to the web server and the DNS server on VM1"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q53",
  "domain": 3,
  "explanation": "With the kubenet plugin, pods (containers) receive IP addresses from the pod CIDR, 10.244.0.0/16, while Kubernetes services receive cluster IP addresses from the service CIDR, 10.0.0.0/16.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You deploy an Azure Kubernetes Service (AKS) cluster that has the network profile shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (network profile): Type (plugin): Basic (kubenet); Pod CIDR: 10.244.0.0/16; Service CIDR: 10.0.0.0/16; DNS service IP: 10.0.0.10; Docker bridge CIDR: 172.17.0.1/16; HTTP application routing: Enabled.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Containers will be assigned an IP address in the [answer choice] subnet.",
    "options": {
     "a": [
      "10.244.0.0/16",
      "10.0.0.0/16",
      "172.17.0.1/16"
     ]
    },
    "answer": {
     "a": "10.244.0.0/16"
    }
   },
   {
    "prompt": "Services in the AKS cluster will be assigned an IP address in the [answer choice] subnet.",
    "options": {
     "a": [
      "10.244.0.0/16",
      "10.0.0.0/16",
      "172.17.0.1/16"
     ]
    },
    "answer": {
     "a": "10.0.0.0/16"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q54",
  "domain": 1,
  "explanation": "CPU at 70 percent never crosses the 85 percent scale-out threshold, so the first scale-out occurs only after CPU exceeds 85 percent for the five-minute duration, raising the count from 1 to 2. An hour at 90 percent scales the app out to the maximum of 5 instances; nine minutes below the 30 percent scale-in threshold then allows a single scale-in (the cool down prevents a second one), leaving 4 instances.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have the App Service plan shown in the following exhibit. The scale-in settings for the App Service plan are configured as shown in the following exhibit. The scale-out rule is configured with the same duration and cool down time as the scale-in rule. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (autoscale condition): Scale mode: Scale based on a metric. Scale out rule: When homepage (Maximum) CpuPercentage > 85, increase count by 1. Scale in rule: When homepage (Average) CpuPercentage < 30, decrease count by 1; Duration: 5 minutes; Cool down: 5 minutes. Instance limits: Minimum 1, Maximum 5, Default 1.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "If after deployment the CPU usage is 70 percent for one hour and then reaches 90 percent for five minutes, at that time the total number of instances will be [answer choice].",
    "options": {
     "a": [
      "1",
      "2",
      "3",
      "4",
      "5"
     ]
    },
    "answer": {
     "a": "2"
    }
   },
   {
    "prompt": "If after deployment the CPU maintains constant usage of 90 percent for one hour, and then the average CPU usage is below 25 percent for nine minutes, at that point the number of instances will be [answer choice].",
    "options": {
     "a": [
      "1",
      "2",
      "3",
      "4",
      "5"
     ]
    },
    "answer": {
     "a": "4"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q57",
  "domain": 3,
  "explanation": "Because the upgrade policy mode is Automatic, a profile change such as a new VM size is applied to all four instances at the same time. Automatic OS image upgrades roll out in batches of up to 20 percent of the scale set; with four instances, the batch size is one VM at a time.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a virtual machine scale set. The scale set contains four instances that have the following configurations: Operating system: Windows Server 2016; Size: Standard_D1_v2. You run the Get-AzVmss cmdlet as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit: (Get-AzVmss -Name WebProd -ResourceGroupName RG1).VirtualMachineProfile.OsProfile.WindowsConfiguration shows ProvisionVMAgent: True and EnableAutomaticUpdates: False. The UpgradePolicy shows Mode: Automatic with an AutomaticOSUpgradePolicy configured.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "When an administrator changes the virtual machine size, the size will be changed on up to [answer choice] virtual machines simultaneously.",
    "options": {
     "a": [
      "0",
      "1",
      "2",
      "3",
      "4"
     ]
    },
    "answer": {
     "a": "4"
    }
   },
   {
    "prompt": "When a new build of the Windows Server 2016 image is released, the new build will be deployed to up to [answer choice] virtual machines simultaneously.",
    "options": {
     "a": [
      "0",
      "1",
      "2",
      "3",
      "4"
     ]
    },
    "answer": {
     "a": "1"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q60",
  "domain": 5,
  "explanation": "VM1 is protected by Azure VM-level backup (no MARS agent is installed). Per the verified answer key, both the file recovery and the full restore of the latest recovery point can target the original VM1 or a new Azure virtual machine.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Subscription1. Subscription1 contains two Azure virtual machines, VM1 and VM2. VM1 and VM2 run Windows Server 2016. VM1 is backed up daily by Azure Backup without using the Azure Backup agent. VM1 is affected by ransomware that encrypts data. You need to restore the latest backup of VM1. To which location can you restore the backup? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "You can perform a file recovery of VM1 to:",
    "options": {
     "a": [
      "VM1 only",
      "VM1 or a new Azure virtual machine only",
      "VM1 and VM2 only",
      "A new Azure virtual machine only",
      "Any Windows computer that has Internet connectivity"
     ]
    },
    "answer": {
     "a": "VM1 or a new Azure virtual machine only"
    }
   },
   {
    "prompt": "You can restore VM1 to:",
    "options": {
     "a": [
      "VM1 only",
      "VM1 or a new Azure virtual machine only",
      "VM1 and VM2 only",
      "A new Azure virtual machine only"
     ]
    },
    "answer": {
     "a": "VM1 or a new Azure virtual machine only"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q63",
  "domain": 3,
  "explanation": "Three is the maximum fault domain count and 20 is the maximum update domain count for an availability set. Maximizing both spreads the 50 VMs as widely as possible, so the fewest VMs are lost to a fabric (hardware) failure or to planned servicing.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You plan to use Azure Resource Manager templates to deploy 50 Azure virtual machines that will be part of the same availability set. You need to ensure that as many virtual machines as possible are available if the fabric fails or during servicing. How should you configure the template? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "In the Microsoft.Compute/availabilitySets resource, set \"platformFaultDomainCount\" to:",
    "options": {
     "a": [
      "1",
      "2",
      "3"
     ]
    },
    "answer": {
     "a": "3"
    }
   },
   {
    "prompt": "Set \"platformUpdateDomainCount\" to:",
    "options": {
     "a": [
      "5",
      "10",
      "20",
      "50"
     ]
    },
    "answer": {
     "a": "20"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q68",
  "domain": 3,
  "explanation": "New-AzResourceGroupDeployment deploys an ARM template at resource group scope, and the deployment must target the existing resource group by using -ResourceGroupName RG1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a resource group named RG1. In Azure Cloud Shell, you need to create a virtual machine by using an Azure Resource Manager (ARM) template. How should you complete the command? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Command: $adminPassword = Read-Host -Prompt \"Enter the administrator password\" -AsSecureString; then: [cmdlet] [parameter] -TemplateUri \"https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-vm-simple-windows/azuredeploy.json\" -adminUsername LocalAdministrator -adminPassword $adminPassword -dnsLabelPrefix ContosoVM1",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Cmdlet:",
    "options": {
     "a": [
      "New-AzVm",
      "New-AzResource",
      "New-AzTemplateSpec",
      "New-AzResourceGroupDeployment"
     ]
    },
    "answer": {
     "a": "New-AzResourceGroupDeployment"
    }
   },
   {
    "prompt": "Parameter:",
    "options": {
     "a": [
      "-Tag Tag1",
      "-ResourceGroupName RG1",
      "-GroupName ManagementGroup1",
      "-Subscription 9c8bc1cd-7655-4c66-b3ea-a8ee101d8f75"
     ]
    },
    "answer": {
     "a": "-ResourceGroupName RG1"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q73",
  "domain": 3,
  "explanation": "The property iteration copy element, with a name and a count, creates multiple dataDisks entries in the template. The copyIndex('dataDisks') function returns the current iteration number of that loop, which is used as the LUN of each disk.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You need to use an Azure Resource Manager (ARM) template to create a virtual machine that will have multiple data disks. How should you complete the template? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Template excerpt (within the Microsoft.Compute/virtualMachines resource): \"storageProfile\": { \"[first answer choice]\": [ { \"name\": \"dataDisks\", \"count\": \"[parameters('numberOfDataDisks')]\", \"input\": { \"diskSizeGB\": 1023, \"lun\": \"[[second answer choice]('dataDisks')]\", \"createOption\": \"Empty\" } } ] }",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Element used to create multiple data disks:",
    "options": {
     "a": [
      "copy",
      "dependsOn",
      "resources",
      "variables"
     ]
    },
    "answer": {
     "a": "copy"
    }
   },
   {
    "prompt": "Function used to return the LUN for each data disk:",
    "options": {
     "a": [
      "copyIndex",
      "concat",
      "length",
      "reference"
     ]
    },
    "answer": {
     "a": "copyIndex"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q78",
  "domain": 5,
  "explanation": "App Service backups are stored in a container in an Azure Storage account, so the storage account must be created first. To perform a partial backup that excludes content, you create a _backup.filter file in the site's wwwroot folder that lists the files and folders to exclude, such as Folder2.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure App Service app named WebApp1 that contains two folders named Folder1 and Folder2. You need to configure a daily backup of WebApp1. The solution must ensure that Folder2 is excluded from the backup. What should you create first, and what should you use to exclude Folder2? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "First create:",
    "options": {
     "a": [
      "An Azure Storage account",
      "A Backup vault",
      "A Recovery Services vault",
      "A resource group"
     ]
    },
    "answer": {
     "a": "An Azure Storage account"
    }
   },
   {
    "prompt": "To exclude Folder2, use:",
    "options": {
     "a": [
      "A _backup.filter file",
      "A backup policy",
      "A lock",
      "A WebJob"
     ]
    },
    "answer": {
     "a": "A _backup.filter file"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q80",
  "domain": 3,
  "explanation": "Joining a domain is performed by the JsonADDomainExtension VM extension, whose resource type is Microsoft.Compute/virtualMachines/extensions. Secrets such as the domain password must be placed in ProtectedSettings, which is encrypted and decrypted only inside the virtual machine.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. The subscription contains a virtual machine that runs Windows 10. You need to join the virtual machine to an Active Directory domain. How should you complete the Azure Resource Manager (ARM) template? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Template excerpt: { \"apiVersion\": \"2017-03-30\", \"type\": \"[first answer choice]\", \"name\": \"[concat(parameters('VMName'), '/joindomain')]\", \"location\": \"[parameters('location')]\", \"properties\": { \"publisher\": \"Microsoft.Compute\", \"type\": \"JsonADDomainExtension\", \"typeHandlerVersion\": \"1.3\", \"autoUpgradeMinorVersion\": true, \"settings\": { \"Name\": \"[parameters('domainName')]\", \"User\": \"[parameters('domainUserName')]\", \"Restart\": \"true\", \"Options\": \"3\" }, \"[second answer choice]\": { \"Password\": \"[parameters('domainPassword')]\" } } }",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "\"type\":",
    "options": {
     "a": [
      "Extensions",
      "Microsoft.Compute/VirtualMachines",
      "Microsoft.Compute/virtualMachines/extensions"
     ]
    },
    "answer": {
     "a": "Microsoft.Compute/virtualMachines/extensions"
    }
   },
   {
    "prompt": "Element that contains the domain password:",
    "options": {
     "a": [
      "ProtectedSettings",
      "Settings",
      "Statuses"
     ]
    },
    "answer": {
     "a": "ProtectedSettings"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q82",
  "domain": 3,
  "explanation": "Windows Server node pools require the Azure CNI network plugin, so the Network configuration setting (currently Kubenet) must be changed. Per the verified answer key, integrating AKS1 with an Azure container registry requires modifying the AKS-managed Azure Active Directory (Microsoft Entra ID) setting, which is currently disabled.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You are creating an Azure Kubernetes Service (AKS) cluster as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. NOTE: Each correct selection is worth one point. Exhibit (Create Kubernetes cluster summary): Resource group: RG1; Region: West Europe; Kubernetes cluster name: AKS1; Kubernetes version: 1.20.9; Node pools: 1; Enable virtual nodes: Disabled; Enable virtual machine scale sets: Enabled; Authentication method: Service principal; Role-based access control (RBAC): Enabled; AKS-managed Azure Active Directory: Disabled; Encryption type: (Default) Encryption at-rest with a platform-managed key; Network configuration: Kubenet; Load balancer: Standard; Private cluster: Disabled; Authorized IP ranges: Disabled; Network policy: None; HTTP application routing: No.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "To ensure that you can create Windows containers in AKS1, you must [answer choice].",
    "options": {
     "a": [
      "enable virtual nodes",
      "increase the number of node pools",
      "modify the Kubernetes version setting",
      "modify the Network configuration setting"
     ]
    },
    "answer": {
     "a": "modify the Network configuration setting"
    }
   },
   {
    "prompt": "To ensure that you can integrate AKS1 with an Azure container registry, you must modify the [answer choice] setting.",
    "options": {
     "a": [
      "AKS-managed Azure Active Directory",
      "Authentication method",
      "Authorized IP ranges",
      "Kubernetes version",
      "Network configuration"
     ]
    },
    "answer": {
     "a": "AKS-managed Azure Active Directory"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q83",
  "domain": 3,
  "explanation": "Per the verified answer key, the command is completed as az aks nodepool add with --max-surge 2. The --max-surge 2 setting makes the node pool use exactly two additional surge nodes during an upgrade, so the upgrade is coordinated across the pool while the extra node cost is limited to two nodes.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains an Azure Kubernetes Service (AKS) cluster named Cluster1. Cluster1 hosts a node pool named Pool1 that has four nodes. You need to perform a coordinated upgrade of Cluster1. The solution must meet the following requirements: • Deploy two new nodes to perform the upgrade. • Minimize costs. How should you complete the command? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Command: az aks nodepool [first answer choice] -n pool1 -g RG1 --cluster-name cluster1 [second answer choice]",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Subcommand:",
    "options": {
     "a": [
      "add",
      "get-upgrades",
      "scale",
      "upgrade"
     ]
    },
    "answer": {
     "a": "add"
    }
   },
   {
    "prompt": "Argument:",
    "options": {
     "a": [
      "--max-count 2",
      "--max-pods 2",
      "--max-surge 2",
      "--node-count 2"
     ]
    },
    "answer": {
     "a": "--max-surge 2"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q84",
  "domain": 2,
  "explanation": "New-AzResourceGroup creates RG1 (a resource group is also a resource) and the copy loop creates three storage accounts, so four resources are created in total. The storage accounts use resourceGroup().location, which is Central US, not West US; the location parameter's default value is never referenced. copyIndex() is zero-based, so the first storage account name is prefixed with 0.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription. You create the following file named Deploy.json: parameters: location (string) with default value \"westus\"; resources: one Microsoft.Storage/storageAccounts resource named \"[concat(copyIndex(), 'storage', uniqueString(resourceGroup().id))]\" with location \"[resourceGroup().location]\", SKU Premium_LRS, kind StorageV2, and a copy block named \"storagecopy\" with count 3. You connect to the subscription and run the following commands: New-AzResourceGroup -Name RG1 -Location \"centralus\"; New-AzResourceGroupDeployment -ResourceGroupName RG1 -TemplateFile \"deploy.json\". For each of the following statements, select Yes if the statement is true. Otherwise, select No. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "The commands will create four new resources.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "The commands will create storage accounts in the West US Azure region.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "The first storage account that is created will have a prefix of 0.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q86",
  "domain": 3,
  "explanation": "-ResourceGroupName RG1 targets the deployment at the resource group. In Complete mode, Resource Manager deletes any resources that exist in the resource group but are not specified in the template, which removes the existing resources before the new ones are deployed.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a resource group named RG1. You plan to use an Azure Resource Manager (ARM) template named template1 to deploy resources. The solution must meet the following requirements: • Deploy new resources to RG1. • Remove all the existing resources from RG1 before deploying the new resources. How should you complete the command? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Command: New-AzResourceGroupDeployment -TemplateUri \"https://contoso.com/template1\" -TemplateParameterFile params.json [first answer choice] RG1 -Mode [second answer choice]",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Parameter that specifies RG1:",
    "options": {
     "a": [
      "-Name",
      "-QueryString",
      "-ResourceGroupName",
      "-Tag"
     ]
    },
    "answer": {
     "a": "-ResourceGroupName"
    }
   },
   {
    "prompt": "-Mode:",
    "options": {
     "a": [
      "All",
      "Complete",
      "Incremental"
     ]
    },
    "answer": {
     "a": "Complete"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q91",
  "domain": 3,
  "explanation": "Entries in dependsOn identify other resources by their resource ID, which is returned by the resourceId() function. The publisher, offer, sku, and version of a marketplace platform image are specified in the imageReference element of storageProfile.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You need to deploy a virtual machine by using an Azure Resource Manager (ARM) template. How should you complete the template? To answer, select the appropriate options in the answer area. NOTE: Each correct selection is worth one point. Template excerpt: \"type\": \"Microsoft.Compute/virtualMachines\", \"dependsOn\": [ \"[[first answer choice]('Microsoft.Network/networkInterfaces', ...)]\" ], \"properties\": { \"storageProfile\": { \"[second answer choice]\": { \"publisher\": \"MicrosoftWindowsServer\", \"offer\": \"WindowsServer\", \"sku\": \"2019-Datacenter\", \"version\": \"latest\" } } }",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Function used in the dependsOn element:",
    "options": {
     "a": [
      "reference",
      "resourceId",
      "union"
     ]
    },
    "answer": {
     "a": "resourceId"
    }
   },
   {
    "prompt": "storageProfile element that specifies the platform image:",
    "options": {
     "a": [
      "array",
      "image",
      "imageReference",
      "vhd"
     ]
    },
    "answer": {
     "a": "imageReference"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q92",
  "domain": 3,
  "explanation": "Standard is the least expensive App Service tier that supports autoscale (up to 10 instances); Basic supports only manual scaling to 3 instances, and Free and Shared do not support custom scaling. Ownership of a custom domain is verified by creating a TXT record (asuid) that App Service checks.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You need to configure a new Azure App Service app named WebApp1. The solution must meet the following requirements: • WebApp1 must be able to verify a custom domain name of app.contoso.com. • WebApp1 must be able to automatically scale up to eight instances. • Costs and administrative effort must be minimized. Which pricing plan should you choose, and which type of record should you use to verify the domain? To answer, select the appropriate options in the answer area. NOTE: Each correct answer is worth one point.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Pricing plan:",
    "options": {
     "a": [
      "Basic",
      "Free",
      "Shared",
      "Standard"
     ]
    },
    "answer": {
     "a": "Standard"
    }
   },
   {
    "prompt": "Record type:",
    "options": {
     "a": [
      "A",
      "AAAA",
      "PTR",
      "TXT"
     ]
    },
    "answer": {
     "a": "TXT"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q95",
  "domain": 3,
  "explanation": "copyIndex() is zero-based, so the copy loop with a count of 4 creates resource groups RG0 through RG3, all in East US because that is the location set in the resource definition. The -Location parameter of New-AzSubscriptionDeployment only specifies where the deployment metadata is stored, so RG3 is created in East US, not West US.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription. You create the following Azure Resource Manager (ARM) template named deploy.json: a subscription-level template whose only resource is of type Microsoft.Resources/resourceGroups (apiVersion 2018-05-01) with location \"eastus\", name \"[concat('RG', copyIndex())]\", and a copy block named \"copy\" with count 4. You deploy the template by running: New-AzSubscriptionDeployment -Location westus -TemplateFile deploy.json. For each of the following statements, select Yes if the statement is true. Otherwise, select No. NOTE: Each correct selection is worth one point.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "The template creates a resource group named RG0 in the East US Azure region.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "The template creates four new resource groups.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "The template creates a resource group named RG3 in the West US Azure region.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T4Q97",
  "domain": 3,
  "explanation": "Azure Container Apps supports only Linux containers, while Azure Container Instances and Azure App Service support both Windows and Linux containers. Therefore the Windows image (Image1) can run only on Container Instances and App Service, and the Linux image (Image2) can run on all three services.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the container images shown in the following table. You plan to use the following services: • Azure Container Instances • Azure Container Apps • Azure App Service In which services can you run the images? To answer, select the options in the answer area. NOTE: Each correct answer is worth one point. Table: Image1 (operating system: Windows); Image2 (operating system: Linux).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Image1:",
    "options": {
     "a": [
      "Azure Container Instances only",
      "Azure Container Apps only",
      "Azure Container Instances and Azure App Service only",
      "Azure Container Apps and Azure App Service only",
      "Azure Container Instances, Azure Container Apps, and Azure App Service"
     ]
    },
    "answer": {
     "a": "Azure Container Instances and Azure App Service only"
    }
   },
   {
    "prompt": "Image2:",
    "options": {
     "a": [
      "Azure Container Instances only",
      "Azure Container Apps only",
      "Azure Container Instances and Azure App Service only",
      "Azure Container Apps and Azure App Service only",
      "Azure Container Instances, Azure Container Apps, and Azure App Service"
     ]
    },
    "answer": {
     "a": "Azure Container Instances, Azure Container Apps, and Azure App Service"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q1",
  "domain": 4,
  "explanation": "An internal load balancer evenly distributes traffic from the web tier to the business logic VMs, which are not internet facing. The Application Gateway WAF tier includes a web application firewall that protects against OWASP threats such as SQL injection; the Standard tier and load balancers perform no such inspection.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription named Sub1. You plan to deploy a multi-tiered application that will contain the tiers shown in the following table. You need to recommend a networking solution to meet the following requirements: ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines, and protect the web servers from SQL injection attacks. Which Azure resource should you recommend for each requirement? To answer, select the appropriate options in the answer area. Table (tiers): Front-end web servers (accessible from the internet: Yes); Business logic (accessible from the internet: No); Microsoft SQL Server databases (accessible from the internet: No).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines:",
    "options": {
     "a": [
      "an application gateway that uses the Standard tier",
      "an application gateway that uses the WAF tier",
      "an internal load balancer",
      "a network security group (NSG)",
      "a public load balancer"
     ]
    },
    "answer": {
     "a": "an internal load balancer"
    }
   },
   {
    "prompt": "Protect the web servers from SQL injection attacks:",
    "options": {
     "a": [
      "an application gateway that uses the Standard tier",
      "an application gateway that uses the WAF tier",
      "an internal load balancer",
      "a network security group (NSG)",
      "a public load balancer"
     ]
    },
    "answer": {
     "a": "an application gateway that uses the WAF tier"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q3",
  "domain": 4,
  "explanation": "A single network interface can have both a public and a private IP address, so each of the five VMs needs only one NIC. Because all the VMs require identical rules, a single NSG associated to the subnet (or to all five NICs) is sufficient.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You plan to deploy five virtual machines to a virtual network subnet. Each virtual machine will have a public IP address and a private IP address. Each virtual machine requires the same inbound and outbound security rules. What is the minimum number of network interfaces and network security groups that you require? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Minimum number of network interfaces:",
    "options": {
     "a": [
      "5",
      "10",
      "15",
      "20"
     ]
    },
    "answer": {
     "a": "5"
    }
   },
   {
    "prompt": "Minimum number of network security groups:",
    "options": {
     "a": [
      "1",
      "2",
      "5",
      "10"
     ]
    },
    "answer": {
     "a": "1"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q5",
  "domain": 4,
  "explanation": "Auto registration in an Azure private DNS zone registers only the private IP addresses of VMs in the linked virtual network. Both VMs are connected to VNET1, and the DNS suffix configured inside Windows Server has no effect on registration.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have Azure virtual machines that run Windows Server 2019 and are configured as shown in the following table. You create a private Azure DNS zone named adatum.com. You configure the adatum.com zone to allow auto registration from VNET1. Which A records will be added to the adatum.com zone for each virtual machine? To answer, select the appropriate options in the answer area. Table: VM1 (private IP: 10.1.0.4; public IP: 52.186.85.63; virtual network: VNET1; DNS suffix configured in Windows Server: Adatum.com); VM2 (private IP: 10.1.0.5; public IP: 40.90.219.6; virtual network: VNET1; DNS suffix configured in Windows Server: Contoso.com).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "A records for VM1:",
    "options": {
     "a": [
      "None",
      "Private IP address only",
      "Public IP address only",
      "Private IP address and public IP address"
     ]
    },
    "answer": {
     "a": "Private IP address only"
    }
   },
   {
    "prompt": "A records for VM2:",
    "options": {
     "a": [
      "None",
      "Private IP address only",
      "Public IP address only",
      "Private IP address and public IP address"
     ]
    },
    "answer": {
     "a": "Private IP address only"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q6",
  "domain": 4,
  "explanation": "NSG flow logs, enabled through diagnostics on NSG1, record information about the IP traffic flowing through Subnet1, including connections to ILB1. Sending the data to a Log Analytics workspace lets you run interactive Kusto queries from the Azure portal.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure virtual network named VNet1 that connects to your on-premises network by using a site-to-site VPN. VNet1 contains one subnet named Subnet1. Subnet1 is associated to a network security group (NSG) named NSG1. Subnet1 contains a basic internal load balancer named ILB1. ILB1 has three Azure virtual machines in the backend pool. You need to collect data about the IP addresses that connects to ILB1. You must be able to run interactive queries from the Azure portal against the collected data. What should you do? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Resource to create:",
    "options": {
     "a": [
      "An Azure Event Grid",
      "An Azure Log Analytics workspace",
      "An Azure Storage account"
     ]
    },
    "answer": {
     "a": "An Azure Log Analytics workspace"
    }
   },
   {
    "prompt": "Resource on which to enable diagnostics:",
    "options": {
     "a": [
      "ILB1",
      "NSG1",
      "The Azure virtual machines"
     ]
    },
    "answer": {
     "a": "NSG1"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q10",
  "domain": 4,
  "explanation": "contoso.com is a private zone linked to VNET2 with auto registration enabled, so every VM in VNET2 is registered when it starts, regardless of the DNS suffix configured inside Windows. adatum.com is a public DNS zone, and public zones do not support auto registration.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription. The subscription contains virtual machines that run Windows Server 2016 and are configured as shown in the following table. You create a public Azure DNS zone named adatum.com and a private Azure DNS zone named contoso.com. You create a virtual network link for contoso.com as shown in the exhibit. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: VM1 (virtual network: VNET2; DNS suffix configured in Windows Server: contoso.com); VM2 (virtual network: VNET2; DNS suffix configured in Windows Server: fabrikam.com); VM3 (virtual network: VNET2; DNS suffix configured in Windows Server: adatum.com). Exhibit (link1 in contoso.com): Link name: link1; Link state: Completed; Provisioning state: Succeeded; Virtual network: VNET2; Enable auto registration: selected.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "When VM1 starts, a record for VM1 is added to the contoso.com DNS zone.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "When VM2 starts, a record for VM2 is added to the contoso.com DNS zone.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "When VM3 starts, a record for VM3 is added to the adatum.com DNS zone.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q12",
  "domain": 4,
  "explanation": "When this question was written, the address space of a peered virtual network could not be modified, so you had to remove the peering, add the 10.33.0.0/16 address space to VNet1, and then re-create the peering to restore communication between VNet1 and VNet2. Gateway transit is not involved because no VPN gateway is used between the peered networks.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains two virtual networks named VNet1 and VNet2. Virtual machines connect to the virtual networks. The virtual networks have the address spaces and the subnets configured as shown in the following table. You need to add the address space of 10.33.0.0/16 to VNet1. The solution must ensure that the hosts on VNet1 and VNet2 can communicate. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order. Table: VNet1 (address space: 10.1.0.0/16; subnet: 10.1.0.0/24; peered with VNet2); VNet2 (peered with VNet1).",
  "items": [
   "Remove VNet1.",
   "Add the 10.33.0.0/16 address space to VNet1.",
   "Create a new virtual network named VNet1.",
   "On the peering connection in VNet2, allow gateway transit.",
   "Recreate peering between VNet1 and VNet2.",
   "On the peering connection in VNet1, allow gateway transit.",
   "Remove peering between VNet1 and VNet2."
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Remove peering between VNet1 and VNet2.",
     "Add the 10.33.0.0/16 address space to VNet1.",
     "Recreate peering between VNet1 and VNet2."
    ]
   }
  ]
 },
 {
  "id": "az104-T5Q13",
  "domain": 3,
  "explanation": "Storage accounts and network interfaces support being moved between resource groups, and the destination resource group can be in a different location because a resource group's location is only metadata. Moving a resource never changes the region in which the resource itself is deployed, so IP2 remains in East US.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the resource groups shown in the following table. RG1 contains the resources shown in the second table. VM1 is running and connects to NIC1 and Disk1. NIC1 connects to VNET1. RG2 contains a public IP address named IP2 that is in the East US location. IP2 is not assigned to a virtual machine. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table 1 (resource groups): RG1 (location: West US); RG2 (location: East US). Table 2 (resources in RG1): VM1 (virtual machine); NIC1 (network interface); Disk1 (managed disk); VNET1 (virtual network); storage1 (storage account).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "You can move storage1 to RG2.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "You can move NIC1 to RG2.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "If you move IP2 to RG1, the location of IP2 will change.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q20",
  "domain": 4,
  "explanation": "VNet1 has only the 10.2.0.0/16 address space, so a subnet with the prefix 10.1.0.0/24 falls outside of it and a new address space must be added first. A virtual machine connects to a virtual network through a network interface (NIC) placed in one of the network's subnets.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have a virtual network named VNet1 that has the configuration shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. Exhibit (Get-AzVirtualNetwork output): Name: VNet1; ResourceGroupName: Production; Location: westus; ProvisioningState: Succeeded; AddressSpace AddressPrefixes: 10.2.0.0/16; Subnets: one subnet named default with addressPrefix 10.2.0.0/24; VirtualNetworkPeerings: none; EnableDDoSProtection: false; EnableVmProtection: false.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Before you can add a subnet that uses the 10.1.0.0/24 address prefix to VNet1, you must first [answer choice]:",
    "options": {
     "a": [
      "add an address space",
      "add a gateway subnet",
      "delete the default subnet",
      "enable virtual network peering"
     ]
    },
    "answer": {
     "a": "add an address space"
    }
   },
   {
    "prompt": "To connect a virtual machine to VNet1, you must [answer choice]:",
    "options": {
     "a": [
      "add an NIC",
      "add a service endpoint",
      "add an address space",
      "enable DDoS protection"
     ]
    },
    "answer": {
     "a": "add an NIC"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q25",
  "domain": 4,
  "explanation": "The backend pool of a Basic SKU load balancer can contain only VMs from a single availability set that are in the same virtual network as the load balancer. VM1 and VM2 are both in AS1 on VNET1, so they qualify; VM4, VM5, and VM6 connect to VNET2, so those pairs cannot be balanced by LB1, which is in VNET1.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription named Subscription1 that contains the virtual networks in the following table. Subscription1 contains the virtual machines in the second table. In Subscription1, you create a load balancer that has the following configurations: Name: LB1; SKU: Basic; Type: Internal; Subnet: Subnet12; Virtual network: VNET1. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table 1 (virtual networks): VNET1 (subnets: Subnet11, Subnet12); VNET2 (subnets: Subnet21, Subnet22). Table 2 (virtual machines): VM1 (connected to: Subnet11; availability set: AS1); VM2 (connected to: Subnet12; availability set: AS1); VM3 (connected to: Subnet11; availability set: AS2); VM4 (connected to: Subnet21; availability set: AS2); VM5 (connected to: Subnet21; availability set: AS3); VM6 (connected to: Subnet22; availability set: AS3).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "LB1 can balance the traffic between VM1 and VM2.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "LB1 can balance the traffic between VM3 and VM4.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "LB1 can balance the traffic between VM5 and VM6.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q26",
  "domain": 4,
  "explanation": "Virtual network links are supported only on Azure private DNS zones, and auto registration of VM records likewise works only in private zones through a link with auto registration enabled. Public DNS zones can be neither linked to a virtual network nor used for auto registration, and the Windows DNS suffix is irrelevant.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure virtual machine that runs Windows Server 2019 and has the following configurations: Name: VM1; Location: West US; Connected to: VNET1; Private IP address: 10.1.0.4; Public IP address: 52.186.85.63; DNS suffix in Windows Server: Adatum.com. You create the Azure DNS zones shown in the following table. You need to identify which DNS zones you can link to VNET1 and the DNS zones to which VM1 can automatically register. Which zones should you identify? To answer, select the appropriate options in the answer area. Table (DNS zones): Adatum.com (public); Adatum.pri (private); Contoso.com (public); Contoso.pri (private).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "DNS zones that you can link to VNET1:",
    "options": {
     "a": [
      "Adatum.com only",
      "Adatum.pri and adatum.com only",
      "The private zones only",
      "The public zones only"
     ]
    },
    "answer": {
     "a": "The private zones only"
    }
   },
   {
    "prompt": "DNS zones to which VM1 can automatically register:",
    "options": {
     "a": [
      "Adatum.com only",
      "Adatum.pri and adatum.com only",
      "The private zones only",
      "The public zones only"
     ]
    },
    "answer": {
     "a": "The private zones only"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q27",
  "domain": 4,
  "explanation": "A site-to-site VPN requires a gateway subnet in VNet1 first, then a VPN gateway deployed into that subnet, a local (network) gateway that represents the on-premises VPN device, and finally the VPN connection that ties the VPN gateway to the local gateway. DNS servers and CDN profiles are not part of the setup.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an on-premises network that you plan to connect to Azure by using a site-to-site VPN. In Azure, you have an Azure virtual network named VNet1 that uses an address space of 10.0.0.0/16. VNet1 contains a subnet named Subnet1 that uses an address space of 10.0.0.0/24. You need to create a site-to-site VPN to Azure. Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Create a local gateway.",
   "Create a VPN gateway.",
   "Create a gateway subnet.",
   "Create a custom DNS server.",
   "Create a VPN connection.",
   "Create an Azure Content Delivery Network (CDN) profile."
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Create a gateway subnet.",
     "Create a VPN gateway.",
     "Create a local gateway.",
     "Create a VPN connection."
    ]
   }
  ]
 },
 {
  "id": "az104-T5Q31",
  "domain": 3,
  "explanation": "A scale set that uses VM (Flexible) orchestration mode can have virtual machines from any resource group in the subscription attached to it, but the VM must be created in the same region as the scale set, which is West US.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the resources shown in the following table. VMSS1 is set to VM (virtual machines) orchestration mode. You need to deploy a new Azure virtual machine named VM1, and then add VM1 to VMSS1. Which resource group and location should you use to deploy VM1? To answer, select the appropriate options in the answer area. Table: RG1 (resource group, West US); RG2 (resource group, Central US); RG3 (resource group, East US); VMSS1 (virtual machine scale set, in RG1, West US).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Resource group:",
    "options": {
     "a": [
      "RG1 only",
      "RG2 only",
      "RG1 or RG2 only",
      "RG1, RG2, or RG3"
     ]
    },
    "answer": {
     "a": "RG1, RG2, or RG3"
    }
   },
   {
    "prompt": "Location:",
    "options": {
     "a": [
      "West US only",
      "Central US only",
      "Central US or West US only",
      "East US, Central US, or West US"
     ]
    },
    "answer": {
     "a": "West US only"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q32",
  "domain": 4,
  "explanation": "Virtual network peering is not transitive. VNET1 is peered directly with both VNET2 and VNET3, so it can reach both, but VNET2 is peered only with VNET1 and cannot reach VNET3 through VNET1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains three virtual networks named VNET1, VNET2, and VNET3. Peering for the virtual networks is configured as shown in the exhibits. How can packets be routed between the virtual networks? To answer, select the appropriate options in the answer area. Exhibits: VNET1 has peerings to VNET2 (status: Connected) and to VNET3 (status: Connected). VNET2 has one peering, to VNET1 (status: Connected). VNET3 has one peering, to VNET1 (status: Connected). Gateway transit is disabled on the VNET1 and VNET2 peerings.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Packets from VNET1 can be routed to:",
    "options": {
     "a": [
      "VNET2 only",
      "VNET3 only",
      "VNET2 and VNET3"
     ]
    },
    "answer": {
     "a": "VNET2 and VNET3"
    }
   },
   {
    "prompt": "Packets from VNET2 can be routed to:",
    "options": {
     "a": [
      "VNET1 only",
      "VNET3 only",
      "VNET1 and VNET3"
     ]
    },
    "answer": {
     "a": "VNET1 only"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q42",
  "domain": 4,
  "explanation": "A peering in the Disconnected state means the peering on the remote side was deleted, so no traffic flows and hosts on VNET6 can reach only VNET6 itself. A Disconnected peering cannot be re-synchronized; you must delete peering1 and re-create the peering from both virtual networks.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have peering configured as shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic. Exhibit (VNET6 peerings): peering1 (peering status: Disconnected; peer: VNET1; gateway transit: Enabled); peering2 (peering status: Disconnected; peer: VNET2; gateway transit: Disabled).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Hosts on VNET6 can communicate with hosts on [answer choice]:",
    "options": {
     "a": [
      "VNET6 only",
      "VNET6 and VNET1 only",
      "VNET6, VNET1, and VNET2 only",
      "all the virtual networks in the subscription"
     ]
    },
    "answer": {
     "a": "VNET6 only"
    }
   },
   {
    "prompt": "To change the status of the peering connection to VNET1 to Connected, you must first [answer choice]:",
    "options": {
     "a": [
      "add a service endpoint",
      "add a subnet",
      "delete peering1",
      "modify the address space"
     ]
    },
    "answer": {
     "a": "delete peering1"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q43",
  "domain": 3,
  "explanation": "LB1 is a Basic SKU load balancer, and a Basic backend pool requires its VMs to be in a single availability set or scale set, so VM1 and VM2 must share an availability set. When Probe1.htm responds, the health probe succeeds and Rule1 balances TCP port 80. Deleting Rule1 leaves no load balancing rule, so no traffic is distributed; balancing all ports would require an HA ports rule, which is available only on Standard internal load balancers.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the resources in the following table. You install the Web Server server role (IIS) on VM1 and VM2, and then add VM1 and VM2 to LB1. LB1 and Rule1 are configured as shown in the exhibits. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: VM1 (virtual machine); VM2 (virtual machine); LB1 (load balancer). Exhibit (LB1): SKU: Basic; Public IP address: 104.40.178.194; Backend pool: Backend1 (2 virtual machines); Health probe: Probe1 (HTTP:80/Probe1.htm); Load balancing rule: Rule1 (TCP/80). Exhibit (Rule1): IP version: IPv4; Frontend IP address: 104.40.178.194 (LoadBalanceFrontEnd); Protocol: TCP; Port: 80; Backend port: 80; Backend pool: Backend1 (2 virtual machines); Health probe: Probe1 (HTTP:80/Probe1.htm).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "VM1 is in the same availability set as VM2.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "If Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "If you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all the ports.",
    "answer": {
     "a": "No"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q44",
  "domain": 4,
  "explanation": "A Standard load balancer cannot have backend VMs that use a basic SKU public IP address, so VM1's dynamic basic public IP must be removed before the VM is added to the backend pool. Standard load balancers are secure by default: inbound traffic is blocked unless an NSG explicitly allows it, so an NSG must be created and configured for connectivity.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure virtual machine named VM1 that connects to a virtual network named VNet1. VM1 has the following configurations: Subnet: 10.0.0.0/24; Availability set: AVSet; Network security group (NSG): None; Private IP address: 10.0.0.4 (dynamic); Public IP address: 40.90.219.6 (dynamic). You deploy a standard, Internet-facing load balancer named slb1. You need to configure slb1 to allow connectivity to VM1. Which changes should you apply to VM1 as you configure slb1? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Before you create a backend pool on slb1, you must:",
    "options": {
     "a": [
      "Create and assign an NSG to VM1",
      "Remove the public IP address from VM1",
      "Change the private IP address of VM1 to static"
     ]
    },
    "answer": {
     "a": "Remove the public IP address from VM1"
    }
   },
   {
    "prompt": "Before you can connect to VM1 from slb1, you must:",
    "options": {
     "a": [
      "Create and configure an NSG",
      "Assign a standard SKU public IP address to VM1",
      "Change the private IP address of VM1 to static"
     ]
    },
    "answer": {
     "a": "Create and configure an NSG"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q47",
  "domain": 3,
  "explanation": "IP flow verify checks whether a packet to or from a VM is allowed or denied and reports the name of the security rule that blocked it. Connection troubleshoot tests connectivity from a VM to another VM, an FQDN, a URI, or an IP address, which validates outbound connectivity to an external host.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You plan to use Azure Network Watcher to perform the following tasks: Task1: Identify a security rule that prevents a network packet from reaching an Azure virtual machine. Task2: Validate outbound connectivity from an Azure virtual machine to an external host. Which feature should you use for each task? To answer, select the appropriate options in the answer area.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Task1: Identify a security rule that prevents a network packet from reaching an Azure virtual machine:",
    "options": {
     "a": [
      "IP flow verify",
      "Next hop",
      "Packet capture",
      "Security group view",
      "Traffic Analytics"
     ]
    },
    "answer": {
     "a": "IP flow verify"
    }
   },
   {
    "prompt": "Task2: Validate outbound connectivity from an Azure virtual machine to an external host:",
    "options": {
     "a": [
      "Connection troubleshoot",
      "IP flow verify",
      "Next hop",
      "NSG flow logs",
      "Packet capture"
     ]
    },
    "answer": {
     "a": "Connection troubleshoot"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q48",
  "domain": 4,
  "explanation": "DNS servers configured on a network interface override the virtual network's DNS settings, so VM1 uses 193.77.134.10 and VM2 uses 192.168.10.15. VM3 inherits the VNET1 list, and because the first listed server (192.168.10.15) is reachable, the operating system sends its queries to that server.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the Azure virtual machines VM1, VM2, and VM3, which are all connected to VNET1. You configure the network interfaces of the virtual machines to use the settings shown in the following table. From the settings of VNET1, you configure the DNS servers shown in the exhibit. The virtual machines can successfully connect to the DNS server that has an IP address of 192.168.10.15 and the DNS server that has an IP address of 193.77.134.10. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table (network interface DNS settings): VM1/NIC1 (DNS servers: 193.77.134.10); VM2/NIC2 (DNS servers: 192.168.10.15); VM3/NIC3 (DNS servers: inherit from virtual network). Exhibit (VNET1 DNS servers): Custom; 192.168.10.15; 193.77.134.10.",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "VM1 connects to 193.77.134.10 for DNS queries.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "VM2 connects to 193.77.134.10 for DNS queries.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "VM3 connects to 192.168.10.15 for DNS queries.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q49",
  "domain": 1,
  "explanation": "Public IP addresses, virtual networks, and storage accounts all support moves between resource groups. A Delete (CanNotDelete) lock blocks only delete operations, not move operations, so the locks do not prevent moving the resources in either direction.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the resource groups shown in the following table. RG1 and RG2 contain the resources shown in the second table. You need to identify which resources you can move from RG1 to RG2, and which resources you can move from RG2 to RG1. Which resources should you identify? To answer, select the appropriate options in the answer area. Table 1 (resource groups): RG1 (lock name: lock1; lock type: Delete); RG2 (lock name: lock2; lock type: Delete). Table 2 (resources): in RG1 - IP1 (public IP address), VNET1 (virtual network), storage1 (storage account); in RG2 - IP2 (public IP address), VNET2 (virtual network), storage2 (storage account).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Resources that you can move from RG1 to RG2:",
    "options": {
     "a": [
      "None",
      "IP1 only",
      "IP1 and storage1 only",
      "IP1 and VNET1 only",
      "IP1, VNET1, and storage1"
     ]
    },
    "answer": {
     "a": "IP1, VNET1, and storage1"
    }
   },
   {
    "prompt": "Resources that you can move from RG2 to RG1:",
    "options": {
     "a": [
      "None",
      "IP2 only",
      "IP2 and storage2 only",
      "IP2 and VNET2 only",
      "IP2, VNET2, and storage2"
     ]
    },
    "answer": {
     "a": "IP2, VNET2, and storage2"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q65",
  "domain": 3,
  "explanation": "The backend pool of a Basic SKU load balancer (LB1) must contain VMs from a single availability set or virtual machine scale set. A Standard SKU load balancer (LB2) only requires that all backend instances be in the same virtual network.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains the public load balancers shown in the following table. You plan to create six virtual machines and to load balance requests to the virtual machines. Each load balancer will load balance three virtual machines. You need to create the virtual machines for the planned solution. How should you create the virtual machines? To answer, select the appropriate options in the answer area. Table: LB1 (public load balancer, SKU: Basic); LB2 (public load balancer, SKU: Standard).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "The virtual machines that will be load balanced by using LB1 must:",
    "options": {
     "a": [
      "be connected to the same virtual network",
      "be created in the same resource group",
      "be created in the same availability set or virtual machine scale set",
      "run the same operating system"
     ]
    },
    "answer": {
     "a": "be created in the same availability set or virtual machine scale set"
    }
   },
   {
    "prompt": "The virtual machines that will be load balanced by using LB2 must:",
    "options": {
     "a": [
      "be connected to the same virtual network",
      "be created in the same resource group",
      "be created in the same availability set or virtual machine scale set",
      "run the same operating system"
     ]
    },
    "answer": {
     "a": "be connected to the same virtual network"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q70",
  "domain": 4,
  "explanation": "Only VNet2 is linked to the adatum.com private zone (as its registration network). VM5 is connected to VNet1, so its record is not auto-registered and it cannot resolve names from the zone because VNet1 has no link. VM6 is on VNet2, so it can resolve the auto-registered record for VM9.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the resources in the following table. In Azure, you create a private DNS zone named adatum.com. You set the registration virtual network to VNet2. The adatum.com zone is configured as shown in the exhibit. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: VNet1 (virtual network); VNet2 (virtual network); VM5 (virtual machine, connected to VNet1); VM6 (virtual machine, connected to VNet2); VM9 (virtual machine, connected to VNet2). Exhibit (adatum.com record sets): SOA (host: internal.cloudapp.net); A record vm6 (TTL 3600, value 10.1.0.4); A record vm9 (TTL 3600, value 10.1.0.12).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "The A record for VM5 will be registered automatically in the adatum.com zone.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "VM5 can resolve VM9.adatum.com.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "VM6 can resolve VM9.adatum.com.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q72",
  "domain": 4,
  "explanation": "Azure Bastion must be deployed to a subnet named exactly AzureBastionSubnet. The subnet must be /26 or larger and must not overlap the LAN02 subnet (10.10.10.128/25), so 10.10.10.0/26 is the only valid prefix inside the 10.10.10.0/24 address space.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription. You plan to use an Azure Resource Manager template to deploy a virtual network named VNET1 that will use Azure Bastion. How should you complete the template? To answer, select the appropriate options in the answer area. Template excerpt: VNET1 uses the address space 10.10.10.0/24 and defines two subnets - the first subnet's name and addressPrefix must be completed, and the second subnet is named LAN02 with addressPrefix 10.10.10.128/25.",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Name of the subnet for Azure Bastion:",
    "options": {
     "a": [
      "AzureBastion",
      "AzureBastionSubnet",
      "Bastion",
      "GatewaySubnet"
     ]
    },
    "answer": {
     "a": "AzureBastionSubnet"
    }
   },
   {
    "prompt": "Address prefix of the subnet for Azure Bastion:",
    "options": {
     "a": [
      "10.10.10.0/26",
      "10.10.10.128/26",
      "10.10.10.160/27",
      "10.10.10.192/26"
     ]
    },
    "answer": {
     "a": "10.10.10.0/26"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q76",
  "domain": 4,
  "explanation": "VMs with basic SKU public IP addresses cannot be placed in the backend pool of a Standard load balancer, so the basic public IPs must be removed first. Then you create the health probe and backend pool, and finally the load balancing rule for port 443. An availability set is not required for a Standard load balancer.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains the resources shown in the following table. You need to load balance HTTPS connections to vm1 and vm2 by using lb1. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order. Table: vm1 (virtual machine, uses a basic public IP address); vm2 (virtual machine, uses a basic public IP address); NSG1 (network security group, allows incoming traffic on port 443); lb1 (Azure Standard Load Balancer).",
  "items": [
   "Remove the public IP addresses from vm1 and vm2.",
   "Create a health probe and backend pool on lb1.",
   "Create an availability set.",
   "Create a load balancing rule on lb1."
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Remove the public IP addresses from vm1 and vm2.",
     "Create a health probe and backend pool on lb1.",
     "Create a load balancing rule on lb1."
    ]
   }
  ]
 },
 {
  "id": "az104-T5Q79",
  "domain": 4,
  "explanation": "The Azure Virtual WAN workflow is: create the Virtual WAN resource, create a virtual hub (which deploys the hub's gateways), create a VPN site for each on-premises location, and then connect the VPN sites to the hub so site1 and site2 can communicate through it. Standalone VPN and local network gateways belong to classic site-to-site configurations, not Virtual WAN.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have an Azure subscription that contains two on-premises locations named site1 and site2. You need to connect site1 and site2 by using an Azure Virtual WAN. Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
  "items": [
   "Create a Virtual WAN resource.",
   "Create a virtual hub.",
   "Create the VPN sites.",
   "Connect the VPN sites to the hub.",
   "Create a VPN gateway.",
   "Create a local network gateway."
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Create a Virtual WAN resource.",
     "Create a virtual hub.",
     "Create the VPN sites.",
     "Connect the VPN sites to the hub."
    ]
   }
  ]
 },
 {
  "id": "az104-T5Q83",
  "domain": 4,
  "explanation": "The DENY_PING rule denies outbound ICMP at priority 120, so the new allow rule must be an outbound ICMP rule with a lower priority number, such as 110, to be evaluated first. Scoping the source to VM1 (10.0.0.10) and the destination to VM2 (10.0.0.11) satisfies the principle of least privilege.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have a network security group (NSG) named NSG1 that has the rules defined in the exhibit. NSG1 is associated to a subnet named Subnet1. Subnet1 contains the virtual machines shown in the following table. You need to add a rule to NSG1 to ensure that VM1 can ping VM2. The solution must use the principle of least privilege. How should you configure the rule? To answer, select the appropriate options in the answer area. Exhibit (NSG1 security rules): ALLOW_HTTPS (protocol: TCP; destination port range: 443; access: Allow; priority: 100; direction: Inbound); DENY_PING (protocol: ICMP; access: Deny; priority: 120; direction: Outbound). Table: VM1 (IP address: 10.0.0.10); VM2 (IP address: 10.0.0.11).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Direction:",
    "options": {
     "a": [
      "Inbound",
      "Outbound"
     ]
    },
    "answer": {
     "a": "Outbound"
    }
   },
   {
    "prompt": "Source IP address prefix:",
    "options": {
     "a": [
      "Any",
      "10.0.0.10",
      "10.0.0.11",
      "VirtualNetwork"
     ]
    },
    "answer": {
     "a": "10.0.0.10"
    }
   },
   {
    "prompt": "Destination IP address prefix:",
    "options": {
     "a": [
      "Any",
      "10.0.0.10",
      "10.0.0.11",
      "Internet"
     ]
    },
    "answer": {
     "a": "10.0.0.11"
    }
   },
   {
    "prompt": "Priority:",
    "options": {
     "a": [
      "100",
      "110",
      "120",
      "130"
     ]
    },
    "answer": {
     "a": "110"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q88",
  "domain": 4,
  "explanation": "To force all traffic arriving from the VPN gateway toward VNet1 through the router VM, associate RT1 to the GatewaySubnet and add a route for the entire VNet1 address space (10.0.0.0/16) with a next hop type of Virtual appliance pointing at VM1.",
  "type": "grid",
  "category": "dropdown",
  "title": "Complete the configuration",
  "scenario": "You have an Azure subscription that contains a virtual network named VNet1. VNet1 uses an IP address space of 10.0.0.0/16 and contains the VPN Gateway and subnets in the following table. Subnet1 contains a virtual appliance named VM1 that operates as a router. You create a routing table named RT1. You need to route all inbound traffic from the VPN gateway to VNet1 through VM1. How should you configure RT1? To answer, select the appropriate options in the answer area. Table: GatewaySubnet (10.0.254.0/24); Subnet1 (10.0.1.0/24, contains VM1); Subnet2 (10.0.2.0/24).",
  "rowLabel": "Setting",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": []
   }
  ],
  "rows": [
   {
    "prompt": "Address prefix:",
    "options": {
     "a": [
      "10.0.0.0/16",
      "10.0.1.0/24",
      "10.0.254.0/24"
     ]
    },
    "answer": {
     "a": "10.0.0.0/16"
    }
   },
   {
    "prompt": "Next hop type:",
    "options": {
     "a": [
      "Virtual appliance",
      "Virtual network",
      "Virtual network gateway"
     ]
    },
    "answer": {
     "a": "Virtual appliance"
    }
   },
   {
    "prompt": "Assigned to:",
    "options": {
     "a": [
      "GatewaySubnet",
      "Subnet1",
      "Subnet1 and Subnet2"
     ]
    },
    "answer": {
     "a": "GatewaySubnet"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q90",
  "domain": 4,
  "explanation": "The default NSG rules deny inbound traffic from the internet, so RDP to VM1 through NSG1 fails even though VM1 has a public IP. Rule1 in NSG2 allows TCP 3389 from any source, so RDP to VM2 works from the internet, and traffic from VM1 inside VNET1 is also allowed.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription that contains the virtual machines shown in the following table. VM1 and VM2 use public IP addresses. From Windows Server 2019 on VM1 and VM2, you allow inbound Remote Desktop connections. Subnet1 and Subnet2 are in a virtual network named VNET1. The subscription contains two network security groups (NSGs) named NSG1 and NSG2. NSG1 uses only the default rules. NSG2 uses the default rules and the following custom incoming rule: Priority: 100; Name: Rule1; Port: 3389; Protocol: TCP; Source: Any; Destination: Any; Action: Allow. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table: VM1 (Windows Server 2019, connected to Subnet1; NSG1 is associated to Subnet1); VM2 (Windows Server 2019, connected to Subnet2; NSG2 is associated to Subnet2).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "From the Internet, you can connect to VM1 by using Remote Desktop.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "From the Internet, you can connect to VM2 by using Remote Desktop.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "From VM1, you can connect to VM2 by using Remote Desktop.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q94",
  "domain": 4,
  "explanation": "Auto registration occurs only in fabrikam.com, the zone linked to vnet1 with auto registration enabled, and it registers private IP addresses, so vm1 (10.0.1.4) and vm2 (10.0.1.5) are added there regardless of operating system. Assigning a role on contoso.com does not create any records, and public IP addresses are never auto-registered.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have two Azure virtual machines as shown in the following table. You create the Azure DNS zones shown in the second table. You perform the following actions: for fabrikam.com, you add a virtual network link to vnet1 and enable auto registration; for contoso.com, you assign vm1 and vm2 the Owner role. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table 1: vm1 (Windows Server 2019, connected to vnet1, private IP: 10.0.1.4, public IP: 131.107.50.20); vm2 (SUSE Linux Enterprise Server 15 SP2, connected to vnet1, private IP: 10.0.1.5). Table 2: contoso.com (private DNS zone); fabrikam.com (private DNS zone).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "The DNS A record for vm1 is added to contoso.com and has the IP address of 131.107.50.20.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "The DNS A record for vm1 is added to fabrikam.com and has the IP address of 10.0.1.4.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "The DNS A record for vm2 is added to fabrikam.com and has the IP address of 10.0.1.5.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q97",
  "domain": 4,
  "explanation": "RT1 is applied only to Subnet1 and Subnet2, so traffic between VM1 and VM2 is forced through the virtual appliance VM3 (10.0.3.4); that path works while VM3 is running but fails when VM3 is turned off. Traffic from VM3 in Subnet3 is not affected by RT1 and reaches VM1 directly.",
  "type": "grid",
  "category": "yesno",
  "title": "Judge each statement",
  "scenario": "You have an Azure subscription named Subscription1. Subscription1 contains the virtual machines VM1, VM2, and VM3, and a virtual network named VNet1 that has the subnets shown in the following table. VM3 has multiple network adapters, including a network adapter named NIC3. IP forwarding is enabled on NIC3. Routing is enabled on VM3. You create a route table named RT1 that contains the routes in the second table. You apply RT1 to Subnet1 and Subnet2. For each of the following statements, select Yes if the statement is true. Otherwise, select No. Table 1: VM1 (connected to Subnet1, 10.0.1.0/24); VM2 (connected to Subnet2, 10.0.2.0/24); VM3 (connected to Subnet3, 10.0.3.0/24; NIC3 IP address: 10.0.3.4). Table 2 (RT1 routes): 10.0.1.0/24 (next hop type: Virtual appliance; next hop address: 10.0.3.4); 10.0.2.0/24 (next hop type: Virtual appliance; next hop address: 10.0.3.4).",
  "rowLabel": "Statement",
  "columns": [
   {
    "key": "a",
    "label": "Answer",
    "kind": "select",
    "options": [
     "Yes",
     "No"
    ]
   }
  ],
  "rows": [
   {
    "prompt": "VM3 can establish a network connection to VM1.",
    "answer": {
     "a": "Yes"
    }
   },
   {
    "prompt": "If VM3 is turned off, VM2 can establish a network connection to VM1.",
    "answer": {
     "a": "No"
    }
   },
   {
    "prompt": "VM1 can establish a network connection to VM2.",
    "answer": {
     "a": "Yes"
    }
   }
  ]
 },
 {
  "id": "az104-T5Q120",
  "domain": 4,
  "explanation": "Connecting with the native Windows RDP client through Azure Bastion requires the Standard SKU and the Native Client Support feature, after which you connect from Azure CLI by running az network bastion rdp. Kerberos authentication is not required for this scenario.",
  "type": "dragdrop",
  "category": "dragdrop",
  "title": "Drag and drop",
  "scenario": "You have a Windows 11 device named Device1 and an Azure subscription that contains the resources shown in the following table. Device1 has Azure PowerShell and Azure Command-Line Interface (CLI) installed. From Device1, you need to establish a Remote Desktop connection to VM1. Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order. Table: VNET1 (virtual network); VM1 (virtual machine that runs Windows Server 2022, does not have a public IP address, connected to VNET1); Bastion1 (Azure Bastion host on VNET1, Basic SKU).",
  "items": [
   "Upgrade Bastion1 to the Standard SKU.",
   "From Bastion1, select Native Client Support.",
   "From Bastion1, enable Kerberos authentication.",
   "From Azure CLI on Device1, run az network bastion rdp.",
   "From Azure PowerShell on Device1, run the New-AzBastion cmdlet."
  ],
  "zones": [
   {
    "prompt": "Answer area",
    "answer": [
     "Upgrade Bastion1 to the Standard SKU.",
     "From Bastion1, select Native Client Support.",
     "From Azure CLI on Device1, run az network bastion rdp."
    ]
   }
  ]
 }
];
