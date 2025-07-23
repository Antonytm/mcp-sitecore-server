# Set-Rendering

Updates rendering with new values.

## Syntax

```powershell
Set-Rendering [-Item] <Item> -Instance <RenderingDefinition> [-Parameter <Hashtable>] [-PlaceHolder <String>] [-DataSource <String>] [-Index <Int32>] [-FinalLayout] [-Device <DeviceItem>] [-Language <String[]>]

Set-Rendering [-Path] <String> -Instance <RenderingDefinition> [-Parameter <Hashtable>] [-PlaceHolder <String>] [-DataSource <String>] [-Index <Int32>] [-FinalLayout] [-Device <DeviceItem>] [-Language <String[]>]

Set-Rendering -Id <String> [-Database <String>] -Instance <RenderingDefinition> [-Parameter <Hashtable>] [-PlaceHolder <String>] [-DataSource <String>] [-Index <Int32>] [-FinalLayout] [-Device <DeviceItem>] [-Language <String[]>]
```

## Detailed Description

Updates rendering instance with new values. The instance should be earlier obtained using Get-Rendering.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Instance  &lt;RenderingDefinition&gt;

Instance of the Rendering to be updated.

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
| Required? | false |
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

If provided the rendering will be moved to the specified index.

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

### -Device  &lt;DeviceItem&gt;

Specifies the target device when applying the rendering changes.

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

Change all rendering's placeholder from main to footer.

```powershell
$item = Get-Item -Path master:\content\home
Get-Rendering -Item $item -PlaceHolder "main" | 
    Foreach-Object { 
        $_.Placeholder = "footer"; 
        Set-Rendering -Item $item -Instance $_
    }
```

### EXAMPLE 2

Clear the datasource value for a rendering.

```powershell
$item = Get-Item -Path master:\content\home
Get-Rendering -Item $item -PlaceHolder "main" | 
    Foreach-Object { 
        $_.DataSource = $null 
        Set-Rendering -Item $item -Instance $_
    }
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-Rendering](add-rendering.md)
* [New-Rendering](new-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Get-LayoutDevice](get-layoutdevice.md)
* [Remove-Rendering](remove-rendering.md)
* [Get-Layout](get-layout.md)
* [Set-Layout](set-layout.md)

