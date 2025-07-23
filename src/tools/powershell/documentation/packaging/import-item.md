# Import-Item

Imports \(deserializes\) the specified path from the filesystem on the server as a Sitecore item.

## Syntax

Import-Item \[-Database &lt;Database&gt;\] \[-Root &lt;String&gt;\] \[-UseNewId\] \[-DisableEvents\] \[-ForceUpdate\]

Import-Item \[-Item\] &lt;Item&gt; \[-Recurse\] \[-Root &lt;String&gt;\] \[-UseNewId\] \[-DisableEvents\] \[-ForceUpdate\]

Import-Item \[-Preset\] &lt;IncludeEntry&gt; \[-Root &lt;String&gt;\] \[-UseNewId\] \[-DisableEvents\] \[-ForceUpdate\]

Import-Item \[-Path\] &lt;String&gt; \[-Recurse\] \[-Root &lt;String&gt;\] \[-UseNewId\] \[-DisableEvents\] \[-ForceUpdate\]

## Detailed Description

The Import-Item command deserializes the specified items.

The simplest syntax requires 2 parameters:

* -Path : which is a path to the item on the drive but without .item extension. If the item does not exist in the Sitecore tree yet, you need to pass the parent item path.
* -Root : the directory which is the root of serialization. Trailing slash  character is required, 

e.g.:

Import-Item -Path "c:\project\data\serialization\master\sitecore\content\articles" -Root "c:\project\data\serialization\"

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Deserialize-Item 

## Parameters

### -Database  &lt;Database&gt;

Database to contain the item to be deserialized.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
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

### -Preset  &lt;IncludeEntry&gt;

Name of the preset to be deserialized.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item on the drive but without .item extension. If the item does not exist in the Sitecore tree yet, you need to pass the parent item path.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Recurse  &lt;SwitchParameter&gt;

If included in the execution - dederializes both the item and all of its children.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Root  &lt;String&gt;

The directory which is the root of serialization. Trailing slash character is required. if not specified the default root will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -UseNewId  &lt;SwitchParameter&gt;

Tells Sitecore if each of the items should be created with a newly generated ID, e.g. Import-Item -path "c:\project\data\serialization\master\sitecore\content\articles" -root "c:\project\data\serialization\" -usenewid -recurse

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -DisableEvents  &lt;SwitchParameter&gt;

If set Sitecore will use EventDisabler during deserialization, e.g.: Import-Item -path "c:\project\data\serialization\master\sitecore\content\articles" -root "c:\project

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ForceUpdate  &lt;SwitchParameter&gt;

Forces item to be updated even if it has not changed.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.Void 

## Notes

Help Author: Marek Musielak, Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Import-Item -path "c:\project\data\serialization\master\sitecore\content\articles" -root "c:\project\data\serialization\"
```

### EXAMPLE 2

```powershell
PS master:\> Import-Item -path "c:\project\data\serialization\master\sitecore\content\articles" -root "c:\project\data\serialization\" -recurse
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Export-Item](export-item.md)
* [Get-Preset](../common/get-preset.md)
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 
* [https://gist.github.com/AdamNaj/6c86f61510dc3d2d8b2f](https://gist.github.com/AdamNaj/6c86f61510dc3d2d8b2f) 
* [https://stackoverflow.com/questions/20266841/sitecore-powershell-deserialization](https://stackoverflow.com/questions/20266841/sitecore-powershell-deserialization) 
* [https://stackoverflow.com/questions/20195718/sitecore-serialization-powershell](https://stackoverflow.com/questions/20195718/sitecore-serialization-powershell) 
* [https://stackoverflow.com/questions/20283438/sitecore-powershell-deserialization-core-db](https://stackoverflow.com/questions/20283438/sitecore-powershell-deserialization-core-db) 

