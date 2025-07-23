# Add-Rendering

Adds a rendering to a chosen device for the presentation of an item.

## Syntax

```powershell
Add-Rendering [-Item] <Item> -Instance <RenderingDefinition> [-Parameter <Hashtable>] -PlaceHolder <String> [-DataSource <String>] [-Index <Int32>] [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>] [-PassThru]

Add-Rendering [-Path] <String> -Instance <RenderingDefinition> [-Parameter <Hashtable>] -PlaceHolder <String> [-DataSource <String>] [-Index <Int32>] [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>] [-PassThru]

Add-Rendering -Id <String> [-Database <String>] -Instance <RenderingDefinition> [-Parameter <Hashtable>] -PlaceHolder <String> [-DataSource <String>] [-Index <Int32>] [-Device <DeviceItem>] [-FinalLayout] [-Language <String[]>] [-PassThru]
```

## Detailed Description

Adds a rendering to a chosen device for the presentation of an item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Instance  &lt;RenderingDefinition&gt;

Rendering definition to be added to the item

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

Find item defining rendering and create rendering definition.

```powershell
# Find the rendering item and convert to a rendering
$renderingPath = "/sitecore/layout/Renderings/Feature/Experience Accelerator/Page Content/Page Content"
$renderingItem = Get-Item -Database "master" -Path $renderingPath | New-Rendering -Placeholder "main"
# Find the item to receive the new rendering
$item = Get-Item -Path "master:\content\Training\Playground\play1\Home"
# Add the rendering to the item
Add-Rendering -Item $item -PlaceHolder "main" -Instance $renderingItem -Parameter @{ "Reset Caching Options" = "1" } -FinalLayout
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [New-Rendering](new-rendering.md)
* [Set-Rendering](set-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Get-LayoutDevice](get-layoutdevice.md)
* [Remove-Rendering](remove-rendering.md)
* [Get-Layout](get-layout.md)
* [Set-Layout](set-layout.md)

