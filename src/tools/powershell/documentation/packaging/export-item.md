# Export-Item

Exports \(serializes\) the Sitecore item to the filesystem.

## Syntax

Export-Item \[-Entry &lt;IncludeEntry&gt;\] \[-Recurse\] \[-ItemPathsAbsolute\] \[-Root &lt;String&gt;\]

Export-Item \[-Item\] &lt;Item&gt; \[-Recurse\] \[-ItemPathsAbsolute\] \[-Root &lt;String&gt;\]

Export-Item \[-Path\] &lt;String&gt; \[-Recurse\] \[-ItemPathsAbsolute\] \[-Root &lt;String&gt;\]

Export-Item -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Recurse\] \[-ItemPathsAbsolute\] \[-Root &lt;String&gt;\]

## Detailed Description

The Export-Item command serializes Sitecore items to the filesystem. The alias for the command is Serialize-Item. The simplest command syntax is: Export-Item -path "master:\content"

or

Get-Item "master:\content" \| Export-Item

Both of them will serialize the content item in the master database. In first case we pass the path to the item as a parameter, in second case we serialize the items which come from the pipeline. You can send more items from the pipeline to the Export-Item command, e.g. if you need to serialize all the descendants of the home item created by sitecore\admin, you can use:

Get-Childitem "master:\content\home" -recurse \| Where-Object { $\_."\_\_Created By" -eq "sitecore\admin" } \| Export-Item

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Serialize-Item 

## Parameters

### -Entry  &lt;IncludeEntry&gt;

Serialization preset to be serialized. Obtain the preset through the use of Get-Preset command.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Recurse  &lt;SwitchParameter&gt;

Process the item and all of its children - switch which decides if serialization concerns only the single item or the whole tree below the item, e.g.

Export-Item -path "master:\content\articles" -recurse

Root - directory where the serialized files should be saved, e.g. Export-Item -path "master:\content" -Root "c:\tmp"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ItemPathsAbsolute  &lt;SwitchParameter&gt;

Works only with Root parameter and decides if folder structure starting from "sitecore\content" should be created, e.g. if you want to serialize articles item in directory c:\tmp\sitecore\content you can use. For example: Export-Item -Path "master:\content\articles" -ItemPathsAbsolute -Root "c:\tmp"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Root  &lt;String&gt;

Directory where the serialized files should be saved, e.g.

Export-Item -Path "master:\content" -Root "c:\tmp"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be serialized.

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

You can pass the id of serialized item instead of path, e.g. Export-Item -id "{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}"

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

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

Help Author: Marek Musielak, Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Export-Item -Path master:\content\home
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-Preset](../common/get-preset.md)
* [Import-Item](export-item.md)
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 
* [https://gist.github.com/AdamNaj/6c86f61510dc3d2d8b2f](https://gist.github.com/AdamNaj/6c86f61510dc3d2d8b2f) 
* [https://stackoverflow.com/questions/20266841/sitecore-powershell-deserialization](https://stackoverflow.com/questions/20266841/sitecore-powershell-deserialization) 
* [https://stackoverflow.com/questions/20195718/sitecore-serialization-powershell](https://stackoverflow.com/questions/20195718/sitecore-serialization-powershell) 
* [https://stackoverflow.com/questions/20283438/sitecore-powershell-deserialization-core-db](https://stackoverflow.com/questions/20283438/sitecore-powershell-deserialization-core-db) 

