# Send-File

Allows users to download files from server and file items from media library.

## Syntax

Send-File \[-Path\] &lt;String&gt; \[-Message &lt;String&gt;\] \[-NoDialog\] \[-ShowFullPath\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

Send-File \[-Item\] &lt;Item&gt; \[-Message &lt;String&gt;\] \[-NoDialog\] \[-ShowFullPath\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

## Detailed Description

Executing this command with file path on the server provides script users with means to download a file to their computer. Executing it for an Item located in Sitecore Media library allows the user to download the blob stored in that item. If the file has been downloaded the dialog returns "downloaded" string, otherwise "cancelled" is returned.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Download-File 

## Parameters

### -Path  &lt;String&gt;

Path to the file to be downloaded. The file has to exist in the Data folder. Files from outside the Data folder are not downloadable.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Message  &lt;String&gt;

Message to show the user in the download dialog.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be downloaded.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -NoDialog  &lt;SwitchParameter&gt;

If this parameter is used the Dialog will not be shown but instead the file download will begin immediately.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ShowFullPath  &lt;SwitchParameter&gt;

If this parameter is used the Dialog will display full path to the file downloaded in the dialog, otherwise only the file name will be shown.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Title  &lt;String&gt;

Download dialog title.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Width  &lt;Int32&gt;

Download dialog width.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Height  &lt;Int32&gt;

Download dialog height.

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

* System.String 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Download File from server disk drive

```powershell
PS master:\> Send-File -Path "C:\Projects\ZenGarden\Data\packages\Sitecore PowerShell Extensions-6.0.zip"
```

### EXAMPLE 2

Download item from media library

```powershell
PS master:\> Get-Item "master:/media library/Showcase/awesome_logo" | Send-File -Message "Awesome Logo"
```

## Related Topics

* [Receive-File](receive-file.md)
* [Out-Download](out-download.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

