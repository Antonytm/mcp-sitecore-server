# Remove-ArchiveItem

Removes items permanently from the specified archive.

## Syntax

```powershell
Remove-ArchiveItem -Archive <Archive> [-ItemId <ID>]
Remove-ArchiveItem -Archive <Archive> [-Identity <AccountIdentity>]
Remove-ArchiveItem -Archive <Archive> [-ArchiveItem <ArchiveEntry[]>]
```

## Detailed Description

The Remove-ArchiveItem command permanently removes entries from specified archive.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Archive  &lt;Archive&gt;

Specifies the archive to use when determining which ArchiveEntry items to remove. Use Get-Archive to find the appropriate archive.

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

Specific items from the archive may be deleted when using this parameter.

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

The following removes items matching the ItemId found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Remove-ArchiveItem -Archive $archive -ItemId "{1BB32980-66B4-4ADA-9170-10A9D3336613}"
```

### EXAMPLE 2

The following removes items from the recycle bin by the user found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Remove-ArchiveItem -Archive $archive -Identity "sitecore\admin"
```

### EXAMPLE 3

The following removes all items from the recycle bin found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive | Remove-ArchiveItem
```

## Related Topics

* Get-ArchiveItem
* Restore-ArchiveItem
* Remove-Item
* Remove-ItemVersion
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 