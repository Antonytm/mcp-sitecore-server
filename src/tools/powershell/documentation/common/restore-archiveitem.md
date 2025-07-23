# Remove-ArchiveItem

Restores items to the original database from the specified archive.

## Syntax

```powershell
Restore-ArchiveItem -Archive <Archive> [-WhatIf] [-Confirm]  [<CommonParameters>]
Restore-ArchiveItem -Archive <Archive> [-ItemId <ID>] [-WhatIf] [-Confirm]  [<CommonParameters>]
Restore-ArchiveItem -Archive <Archive> [-Identity <AccountIdentity>] [-WhatIf] [-Confirm]  [<CommonParameters>]
Restore-ArchiveItem -ArchiveItem <ArchiveEntry[]> [-WhatIf] [-Confirm]  [<CommonParameters>]
```

## Detailed Description

The Restore-ArchiveItem command restores entries from specified archive back to the original database.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Archive  &lt;Archive&gt;

Specifies the archive to use when determining which ArchiveEntry items to process. Use Get-Archive to find the appropriate archive.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false|
| Accept Wildcard Characters? | false |

### -ItemId  &lt;ID&gt;

Specifies the ID for the original item that should be processed. This is NOT the ArchivalId.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Identity  &lt;AccountIdentity&gt;

Specifies the user responsible for moving the item to the archive.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -ArchiveItem  &lt;ArchiveEntry\[\]&gt;

Specific items from the archive may be restored when using this parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

* AccountIdentity
* Sitecore.Data.Archiving.ArchiveEntry

## Outputs

The output type is the type of the objects that the cmdlet emits.

* None.

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

The following restores items matching the ItemId found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Restore-ArchiveItem -Archive $archive -ItemId "{1BB32980-66B4-4ADA-9170-10A9D3336613}"
```

### EXAMPLE 2

The following restores items from the recycle bin by the user found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Restore-ArchiveItem -Archive $archive -Identity "sitecore\admin"
```

### EXAMPLE 3

The following restores all items from the recycle bin found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive | Restore-ArchiveItem
```

## Related Topics

* Get-ArchiveItem
* Restore-ArchiveItem
* Remove-Item
* Remove-ItemVersion
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
