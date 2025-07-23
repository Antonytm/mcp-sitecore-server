# Remove-Layout

Removes item layout for a device.

## Syntax

```powershell
Remove-Layout [-Item] <Item> -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]

Remove-Layout [-Path] <String> -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]

Remove-Layout -Id <String> [-Database <String>] -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]
```

## Detailed Description

Removes item layout for the specified device.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Device  &lt;DeviceItem&gt;

Device for which to set layout.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Layout  &lt;Item&gt;

Sitecore item defining the layout.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -FinalLayout  &lt;SwitchParameter&gt;

Targets the Final Layout. If not provided, the Shared Layout will be targeted. Applies to Sitecore 8.0 and higher only.

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

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
$itemId = "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$layoutDevice = Get-LayoutDevice -Name "Print"

Remove-Layout -Item $item -Device $layoutDevice -FinalLayout
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-Rendering](add-rendering.md)
* [New-Rendering](new-rendering.md)
* [Set-Rendering](set-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Get-LayoutDevice](get-layoutdevice.md)
* [Remove-Rendering](remove-rendering.md)
* [Get-Layout](get-layout.md)
* [Reset-Layout](reset-layout.md)
* [#579](https://github.com/SitecorePowerShell/Console/issues/579)
* [#1111](https://github.com/SitecorePowerShell/Console/issues/1111)
