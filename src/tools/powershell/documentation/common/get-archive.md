# Get-Archive

Returns Sitecore database archives.

## Syntax

Get-Archive \[\[-Database\] &lt;Database&gt;\] \[\[-Name\] &lt;String&gt;\]

## Detailed Description

The Get-Archive command returns Sitecore archives in context of the specified database.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

Name of the archive to retrieve.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;Database&gt;

Database for which the archives should be retrieved.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Database 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Archiving.Archive 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Get-Archive -Database "master"

Name                                        Items
----                                        -----
archive                                         0
recyclebin                                   1950
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

