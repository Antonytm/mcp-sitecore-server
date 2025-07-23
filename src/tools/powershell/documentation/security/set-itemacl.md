# Set-ItemAcl

Sets new security information on an item overwriting the previous settings.

## Syntax

```powershell
Set-ItemAcl -AccessRules <AccessRuleCollection> [-Path] <String> [-PassThru]
Set-ItemAcl -AccessRules <AccessRuleCollection> -Id <String> [-Database <String>] [-PassThru]
Set-ItemAcl -AccessRules <AccessRuleCollection> [-Item] <Item> [-PassThru]
```

## Detailed Description

Sets new security information on an item. The new rules will overwrite the existing security descriptors on the item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -AccessRules  &lt;AccessRuleCollection&gt;

A single or multiple access rules created e.g. through the New-ItemAcl or obtained from other item using the Get-ItemAcl cmdlet. This information will overwrite the existing security descriptors on the item.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PassThru  &lt;SwitchParameter&gt;

Passes the processed object back into the pipeline.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be processed. Requires the Database parameter to be specified.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be fetched with Id parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* can be piped from another cmdlet\* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Only if -PassThru is used\* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Take the security information from the Home item and apply it to the Settings item

```powershell
$acl = Get-ItemAcl -Path master:\content\home
Set-ItemAcl -Path master:\content\Settings -AccessRules $acl -PassThru
```

### EXAMPLE 2

Allows the "sitecore\adam" user to delete the Home item and all of its children. Denies the "sitecore\mikey" user reading the descendants of the Home item. ;P The security info is created prior to setting it to the item. The item is delivered to the Set-ItemAcl from the pipeline and returned to the pipeline after processing due to the -PassThru parameter. Any previuous security information on the item is removed.

```powershell
$acl1 = New-ItemAcl -AccessRight item:delete -PropagationType Any -SecurityPermission AllowAccess -Identity "sitecore\adam"
$acl2 = New-ItemAcl -AccessRight item:read -PropagationType Descendants -SecurityPermission DenyAccess -Identity "sitecore\mikey"
Get-Item -Path master:\content\home | Set-ItemAcl -AccessRules $acl1, $acl2 -PassThru

Name   Children Languages                Id                                     TemplateName
----   -------- ---------                --                                     ------------
Home   False    {en, ja-JP, de-DE, da}   {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

### EXAMPLE 3

The following applies a new set of AccessRule to an item using `Set-ItemAcl` and `New-ItemAcl` when the PropogationType and SecurityPermission are the same.

```powershell
$role = "sitecore\yourrole"
$rights = @("item:create", "item:write", "item:rename", "item:delete")

Get-Item -Path master:\content\youritem | Set-ItemAcl -AccessRules ($rights | ForEach-Object { New-ItemAcl -AccessRight $_ -PropagationType Any -SecurityPermission AllowAccess -Identity $role })
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-ItemAcl](add-itemacl.md)
* [Clear-ItemAcl](clear-itemacl.md)
* [Get-ItemAcl](get-itemacl.md)
* [New-ItemAcl](new-itemacl.md)
* [Test-ItemAcl](test-itemacl.md)
* [https://sdn.sitecore.net/upload/sitecore6/security\_administrators\_cookbook\_a4.pdf](https://sdn.sitecore.net/upload/sitecore6/security_administrators_cookbook_a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/61/security\_reference-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/61/security_reference-a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/64/content\_api\_cookbook\_sc64\_and\_later-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/64/content_api_cookbook_sc64_and_later-a4.pdf) 
* [https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx](https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx) 
* [https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/](https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/) 

