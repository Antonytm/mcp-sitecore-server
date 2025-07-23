# Set-Layout

Sets item layout for a device.

## Syntax

```powershell
Set-Layout [-Item] <Item> -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]

Set-Layout [-Path] <String> -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]

Set-Layout -Id <String> [-Database <String>] -Device <DeviceItem> [-Layout <Item>] [-FinalLayout] [-Language <String[]>]
```

## Detailed Description

Sets item layout for a specific device provided

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
# where my test page will go
$path = 'master:\content\Sample'

# wipe and re-create it if exists
if(Test-Path $path){
    Remove-Item $path
}
$item = New-Item -Path $path -ItemType "Sample/Sample Item"

# select default layout
$device = Get-LayoutDevice -Default

# and a layout we will change to
$layout = Get-Item -Path 'master:\layout\Layouts\System\Simulated Device Layout'

# change the layout from what is in Standard values to the new one.
Set-Layout -Item $item -Device $device -Layout $layout | Out-Null

# verify
Get-Layout $item  
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

