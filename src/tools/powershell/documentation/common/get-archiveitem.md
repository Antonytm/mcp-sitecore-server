# Get-ArchiveItem

Retrieves a list of items found in the specified archive.

## Syntax

```powershell
Get-ArchiveItem -Archive <Archive>
Get-ArchiveItem -Archive <Archive> [-ItemId <ID>]
Get-ArchiveItem -Archive <Archive> [-Identity <AccountIdentity>]
```

## Detailed Description

The Get-ArchiveItem command returns items found in the "archive" and "recyclebin" archives.

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
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

None.

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Archiving.ArchiveEntry 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

The following returns all items found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive
```

### EXAMPLE 2

The following returns items matching the ItemId found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive -ItemId "{1BB32980-66B4-4ADA-9170-10A9D3336613}"
```

### EXAMPLE 3

The following returns items moved to the recycle bin by the user found in the specified archive.

```powershell
$database = Get-Database -Name "master"
$archiveName = "recyclebin"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive -Identity "sitecore\admin"
```

### EXAMPLE 4

The following demonstrates changing the archive date on an item followed by retrieving the archived item.

```powershell
$item = Get-Item -Path "master:" -ID "{1BB32980-66B4-4ADA-9170-10A9D3336613}"
$date = $item[[Sitecore.FieldIDs]::ArchiveDate]
$serverTime = [Sitecore.DateUtil]::IsoDateToServerTimeIsoDate($date)
$serverTimeDateTime = [Sitecore.DateUtil]::IsoDateToDateTime($serverTime, [datetime]::MinValue)

# Here you could add more time to the $serverTimeDateTime

$utcTimeDateTime = [Sitecore.DateUtil]::ToUniversalTime($serverTimeDateTime)
$isoTime = [Sitecore.DateUtil]::ToIsoDate($utcTimeDateTime)

$item.Editing.BeginEdit()
$item[[Sitecore.FieldIDs]::ArchiveDate] = $isoTime
$item.Editing.EndEdit()

# Some time after the date has passed
$database = Get-Database -Name "master"
$archiveName = "archive"
$archive = Get-Archive -Database $database -Name $archiveName
Get-ArchiveItem -Archive $archive -ItemId "{1BB32980-66B4-4ADA-9170-10A9D3336613}"
```

## Related Topics

* Remove-ArchiveItem
* Restore-ArchiveItem
* Remove-Item
* Remove-ItemVersion
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 