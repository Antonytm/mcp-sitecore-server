# Set-RenderingParameter

Adds and updates the specified rendering parameter from the rendering.

## Syntax

```powershell
Set-RenderingParameter -Instance <RenderingDefinition> -Parameter <IDictionary> [-Overwrite]
```

## Detailed Description

Adds and updates the specified rendering parameter from the rendering.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Instance  &lt;RenderingDefinition&gt;

Rendering definition containing the rendering parameters.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Parameter  &lt;IDictionary&gt;

The hashtable or dictionary of key/value pairs used to add/update rendering parameters.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Overwrite  &lt;SwitchParameter&gt;

Specifying this parameter will remove all existing rendering parameters and use the new collection provided.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Layouts.RenderingDefinition

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Layouts.RenderingDefinition

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

The following updates the specified rendering parameter and updates the item.

```powershell
$item = Get-Item -Path "master" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"

# Accepts Hashtable, Ordered Dictionaries, etc.
$parameters = [ordered]@{"SampleKey2"="SampleValue2"}
Get-Rendering -Item $item -FinalLayout |
    Set-RenderingParameter -Parameter $parameters | 
    Set-Rendering -Item $item -FinalLayout
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

