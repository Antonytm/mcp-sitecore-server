# Get-ItemAcl

Retrieves security access rules from an item.

## Syntax

Get-ItemAcl -Identity &lt;AccountIdentity&gt; -Path &lt;String&gt;

Get-ItemAcl -Identity &lt;AccountIdentity&gt; -Id &lt;String&gt; \[-Database &lt;String&gt;\]

Get-ItemAcl -Identity &lt;AccountIdentity&gt; -Item &lt;Item&gt;

Get-ItemAcl -Filter &lt;String&gt; -Path &lt;String&gt;

Get-ItemAcl -Filter &lt;String&gt; -Id &lt;String&gt; \[-Database &lt;String&gt;\]

Get-ItemAcl -Filter &lt;String&gt; -Item &lt;Item&gt;

Get-ItemAcl -Item &lt;Item&gt;

Get-ItemAcl -Path &lt;String&gt;

Get-ItemAcl -Id &lt;String&gt;

## Detailed Description

Retrieves security access rules from an item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

User name including domain for which the access rule is being created. If no domain is specified - 'sitecore' will be used as the default domain.

Specifies the Sitecore user by providing one of the following values.

```powershell
Local Name
    Example: adam
Fully Qualified Name
    Example: sitecore\adam
```

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Filter  &lt;String&gt;

Specifies a simple pattern to match Sitecore roles & users.

Examples: The following examples show how to use the filter syntax.

To get security for all roles, use the asterisk wildcard: Get-ItemAcl -Filter \*

To security got all roles in a domain use the following command: Get-ItemAcl -Filter "sitecore\*"

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item from which the security rules should be taken.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item from which the security rules should be taken.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item from which the security rules should be taken.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be fetched with Id parameter containing the security rules that should be returned.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Security.AccessControl.AccessRule 

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

Take the security information from the Home item and add it to the access rules on the Settings item

```powershell
$acl = Get-ItemAcl -Path master:\content\home
Add-ItemAcl -Path master:\content\Settings -AccessRules $acl -PassThru
```

## Related Topics

* [Add-ItemAcl](add-itemacl.md)
* [Clear-ItemAcl](clear-itemacl.md)
* [Set-ItemAcl](set-itemacl.md)
* [New-ItemAcl](new-itemacl.md)
* [Test-ItemAcl](test-itemacl.md)
* [https://sdn.sitecore.net/upload/sitecore6/security\_administrators\_cookbook\_a4.pdf](https://sdn.sitecore.net/upload/sitecore6/security_administrators_cookbook_a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/61/security\_reference-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/61/security_reference-a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/64/content\_api\_cookbook\_sc64\_and\_later-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/64/content_api_cookbook_sc64_and_later-a4.pdf) 
* [https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx](https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx) 
* [https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/](https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/) 

