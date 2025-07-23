# Remove-ItemVersion

Removes Language/Version from a single item or a branch of items

## Syntax

```powershell
Remove-ItemVersion -Language <String[]> [-Version <String[]>] [-ExcludeLanguage <String[]>] [-Path] <String> [-Recurse] [-MaxRecentVersions <Int32>]

Remove-ItemVersion -Language <String[]> [-Version <String[]>] [-ExcludeLanguage <String[]>] -Id <String> [-Database <String>] [-Recurse] [-MaxRecentVersions <Int32>]

Remove-ItemVersion [-Language <String[]>] [-Version <String[]>] [-ExcludeLanguage <String[]>] [-Item] <Item> [-Recurse] [-MaxRecentVersions <Int32>]
```

## Detailed Description

Removes Language/Version from a an Item either sent from pipeline or defined with Path or ID. A single language or a list of languages can be defined using the Language parameter. Language parameter supports globbing so you can delete whole language groups using wildcards.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Remove-ItemLanguage 

## Parameters

### -Recurse  &lt;SwitchParameter&gt;

Deleted language versions from the item and all of its children.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

Language\(s\) that should be deleted form the provided item\(s\). A single language or a list of languages can be defined using the parameter. Language parameter supports globbing so you can delete whole language groups using wildcards.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Version  &lt;String\[\]&gt;

Version\(s\) that should be deleted form the provided item\(s\). A single version or a list of versions can be defined using the parameter. Version parameter supports globbing so you can delete whole version groups using wildcards.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ExcludeLanguage  &lt;String\[\]&gt;

Language\(s\) that should NOT be deleted form the provided item\(s\). A single language or a list of languages can be defined using the parameter. Language parameter supports globbing so you can delete whole language groups using wildcards.

If Language parameter is not is not specified but ExcludeLanguage is provided, the default value of "\*" is assumed for Language parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -MaxRecentVersions  &lt;Int32&gt;

If provided - trims the selected language to value specified by this parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item/version to be processed. You can pipe a specific version of the item for it to be removed.

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

Id of the item to be processed - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be processed - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Archive  &lt;SwitchParameter&gt;

Specifying this switch will move the items to the archive rather than recycle bin.

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

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Remove Polish and Spanish language from /sitecore/content/home item in the master database

```powershell
Remove-ItemVersion -Path master:\content\home -Language "pl-pl", "es-es"
```

### EXAMPLE 2

Remove all english based languages defined in /sitecore/content/home item and all of its children in the master database

```powershell
Remove-ItemVersion -Path master:\content\home -Language "en-*" -Recurse
```

### EXAMPLE 3

Remove all languages except those that are "en" based defined in /sitecore/content/home item and all of its children in the master database

```powershell
Remove-ItemVersion -Path master:\content\home -ExcludeLanguage "en*" -Recurse
```

### EXAMPLE 4

Trim all languages to 3 latest versions for /sitecore/content/home item and all of its children in the master database

```powershell
Remove-ItemVersion -Path master:\content\home -Language * -MaxRecentVersions 3 -Recurse
```

### EXAMPLE 5

The following moves the specified item version to the archive.

```powershell
$itemId = "{72EB19F8-E62A-4B99-80A3-63E03F4FD036}"
Get-Item -Path "master:" -ID $itemId -Version 2 | Remove-ItemVersion -Archive
```

## Related Topics

* [Add-ItemVersion](add-itemversion.md)
* Remove-Item
* [https://gist.github.com/AdamNaj/b36ea095e3668c22c07e](https://gist.github.com/AdamNaj/b36ea095e3668c22c07e) 

