# Switch-Rendering

Switches an existing rendering with an alternate one to a chosen device for the presentation of an item.

## Syntax

```powershell
Switch-Rendering -NewRendering <RenderingDefinition> -Item <Item> [-DataSource <string>] [-Rendering <Item>] [-Index <int>] [-PlaceHolder <string>] [-Parameter <hashtable>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Item <Item> -Instance <RenderingDefinition> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm][<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Item <Item> -UniqueId <string> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm]  [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Path <string> [-DataSource <string>] [-Rendering <Item>] [-Index <int>] [-PlaceHolder <string>] [-Parameter <hashtable>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Path <string> -Instance <RenderingDefinition> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Path <string> -UniqueId <string> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm]  [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> [-Id <string>] [-Database <string>] [-DataSource <string>] [-Rendering <Item>] [-Index <int>] [-PlaceHolder <string>] [-Parameter <hashtable>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm]  [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -Instance <RenderingDefinition> [-Id <string>] [-Database <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm]  [<CommonParameters>]

Switch-Rendering -NewRendering <RenderingDefinition> -UniqueId <string> [-Id <string>] [-Database <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-WhatIf] [-Confirm] [<CommonParameters>]
```

## Detailed Description

Switches an existing rendering with an alternate one to a chosen device for the presentation of an item.

© 2010-2022 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Instance  &lt;RenderingDefinition&gt;

Existing rendering definition to be swapped on the item

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -NewRendering  &lt;RenderingDefinition&gt;

New rendering definition to be swapped on the item

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Parameter  &lt;Hashtable&gt;

Rendering Parameters to be overriden on the Rendering that is being updated - if not specified the value provided in rendering definition specified in the Instance parameter will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PlaceHolder  &lt;String&gt;

Placeholder path the Rendering should be added to - if not specified the value provided in rendering definition specified in the Instance parameter will be used.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -DataSource  &lt;String&gt;

Data source of the Rendering - if not specified the value provided in rendering definition specified in the Instance parameter will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Index  &lt;Int32&gt;

Index at which the Rendering should be inserted. If not provided the rendering will be appended at the end of the list.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Device  &lt;DeviceItem&gt;

Device the rendering is assigned to. If not specified - default device will be used.

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

### -PassThru  &lt;SwitchParameter&gt;

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

* System.Void 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Switch an old rendering for the new.

```powershell
$itemId = "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$item = Get-Item -Path "master:" -ID $itemId
$defaultLayout = Get-LayoutDevice "Default"

$sourceRenderingId = "{37F58448-7460-4AD2-B0FB-67C85C2A49CB}"
$targetRenderingId = "{90A9C167-5714-481F-82E4-29E394D12614}"

$sourceRenderings = Get-Rendering -Item $item -Device $defaultLayout -FinalLayout |
    Where-Object { $_.ItemID -eq $sourceRenderingId }
$targetRendering = Get-Item -Path "master:" -ID $targetRenderingId | New-Rendering

# Replace all instances of the old rendering with the new rendering
foreach($sourceRendering in $sourceRenderings) {
    $item | Switch-Rendering -Instance $sourceRendering -Device $defaultLayout -FinalLayout -NewRendering $targetRendering
}
```

## Related Topics

* [#1110](https://github.com/SitecorePowerShell/Console/issues/1110) Switch-Rendering added in 6.0
* [New-Rendering](new-rendering.md)
* [Set-Rendering](set-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Get-LayoutDevice](get-layoutdevice.md)
* [Remove-Rendering](remove-rendering.md)
* [Get-Layout](get-layout.md)
* [Set-Layout](set-layout.md)
