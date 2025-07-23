# Get-Preset

Returns a serialization preset for use with Export-Item.

## Syntax

Get-Preset \[\[-Name\] &lt;String\[\]&gt;\]

## Detailed Description

The Get-Preset command returns a serialization preset for use with Export-Item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String\[\]&gt;

Name of the serialization preset.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Serialization.Presets.IncludeEntry 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Get-Preset -Name "PowerShell", "AssetsOptimiser" | ft PresetName, Database, Path -AutoSize

PresetName      Database Path
----------      -------- ----
PowerShell      core     /sitecore/templates/Modules/PowerShell Console
PowerShell      core     /sitecore/system/Modules/PowerShell/Console Colors
PowerShell      core     /sitecore/system/Modules/PowerShell/Script Library
PowerShell      core     /sitecore/layout/Layouts/Applications/PowerShell Console
PowerShell      core     /sitecore/layout/Layouts/Applications/PowerShell ISE Sheer
PowerShell      core     /sitecore/layout/Layouts/Applications/PowerShell ISE
PowerShell      core     /sitecore/layout/Layouts/Applications/PowerShell ListView
PowerShell      core     /sitecore/content/Documents and Settings/All users/Start menu/Right/PowerShell Toolbox
PowerShell      core     /sitecore/content/Applications/PowerShell
PowerShell      core     /sitecore/content/Applications/Content Editor/Context Menues/Default/Context PowerShell Scripts
PowerShell      master   /sitecore/templates/Modules/PowerShell Console
PowerShell      master   /sitecore/system/Modules/PowerShell/Console Colors
PowerShell      master   /sitecore/system/Modules/PowerShell/Rules
PowerShell      master   /sitecore/system/Modules/PowerShell/Script Library
AssetsOptimiser master   /sitecore/system/Modules/Optimiser
```

## Related Topics

* Serialize-Item
* Deserialize-Item
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

