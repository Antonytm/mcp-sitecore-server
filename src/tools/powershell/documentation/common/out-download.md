# Out-Download

Send an object content to the client

## Syntax

Out-Download -InputObject &lt;Object&gt; \[-ContentType &lt;String&gt;\] \[-Name &lt;String&gt;\]

## Detailed Description

The cmdlet allows to send content of an object \(FileInfo, Stream, String, String\[\] or Byte\[\]\) to the client. This is used for example by report scripts to send the report in HTML, Json or Excel without saving the content of the object to the disk drive. You can specify an object type and file name to make sure the downloaded file is interpreted properly by the browser.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -InputObject  &lt;Object&gt;

Object content to be sent to the client. Object must be of one of the following types:

* FileInfo, 
* Stream, 
* String, 
* String\[\], 
* Byte\[\] 

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -ContentType  &lt;String&gt;

The MIME content type of the object. In most cases you can skip this parameter and still have the content type be deduced by the browser from the

Common examples \(after Wikipedia\)

* application/json
* application/x-www-form-urlencoded
* application/pdf
* application/octet-stream
* multipart/form-data
* text/html
* image/png
* image/jpg 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

Name of the file you want the user browser to save the object as.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByPropertyName\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.Object 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.Boolea 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Send first log file to the user

```powershell
Get-Item "$SitecoreLogFolder\*.*" | select -first 1 | Out-Download
```

### EXAMPLE 2

Send Hello World text file to the user

```powershell
"Hello World!" | Out-Download -Name hello-world.txt
```

### EXAMPLE 3

Get a list of sitecore branches under root item in the master database and send the list to user as excel file

```powershell
Import-Function -Name ConvertTo-Xlsx

[byte[]]$outobject = Get-ChildItem master:\ | 
    Select-Object -Property Name, ProviderPath, Language, Varsion | 
    ConvertTo-Xlsx 

Out-Download -Name "report-$datetime.xlsx" -InputObject $outobject
```

## Related Topics

* [Send-File](send-file.md)
* [Receive-File](receive-file.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

