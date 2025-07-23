# Get-Layout

Returns the layout for the specified item.

## Syntax

```powershell
Get-Layout [-Item] <Item> [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>]

Get-Layout [-Path] <String> [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>]

Get-Layout -Id <String> [-Database <String>] [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>]
```

## Detailed Description

The Get-Layout command returns the layout for the specified item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Device  &lt;DeviceItem&gt;

Layout Device for which the item should be returned. If not specified All layouts used will be returned. If Device is specified but no layout is specified the command will return an error that can be silenced

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -FinalLayout  &lt;SwitchParameter&gt;

Returns the Final Layout. If not provided, the Shared Layout will be returned. Applies to Sitecore 8.0 and higher only.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

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

Path to the item to be processed - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be processed - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be processed - can work with Language parameter to narrow the publication scope.

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

### EXAMPLE 1

The following retrieves the layouts defined on the home item.

```powershell
Get-Layout -Path "master:{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-Rendering](add-rendering.md)
* [New-Rendering](new-rendering.md)
* [Set-Rendering](set-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Get-LayoutDevice](get-layoutdevice.md)
* [Remove-Rendering](remove-rendering.md)
* [Set-Layout](set-layout.md)
* [Reset-Layout](reset-layout.md)

