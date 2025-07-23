# Get-ItemClone

Returns all the clones for the specified item.

## Syntax

Get-ItemClone \[-Item\] &lt;Item&gt;

Get-ItemClone \[-Path\] &lt;String&gt;

Get-ItemClone -Id &lt;String&gt; \[-Database &lt;String&gt;\]

## Detailed Description

The Get-ItemClone command returns all the clones for the specified item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

The item to be analysed for clones presence.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be analysed for clones presence.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be analysed for clones presence.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be processed - if item is being provided through Id.

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

* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Get-ItemClone -Path master:\content\home
```

## Related Topics

* [New-ItemClone](new-itemclone.md)
* [ConvertFrom-ItemClone](convertfrom-itemclone.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://github.com/SitecorePowerShell/Console/issues/218](https://github.com/SitecorePowerShell/Console/issues/218) 
* Get-Item

