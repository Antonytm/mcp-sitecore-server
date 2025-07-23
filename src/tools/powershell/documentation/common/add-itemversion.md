# Add-ItemVersion

Creates a version of the item in a new language based on an existing language version.

## Syntax

```powershell
Add-ItemVersion [-Item] <Item> [-Recurse] [-IfExist <Append | Skip | OverwriteLatest>] [-TargetLanguage <String[]>] [-DoNotCopyFields] [-IgnoredFields <String[]>] [-Language <String[]>]

Add-ItemVersion [-Path] <String> [-Recurse] [-IfExist <Append | Skip | OverwriteLatest>] [-TargetLanguage <String[]>] [-DoNotCopyFields] [-IgnoredFields <String[]>] [-Language <String[]>]

Add-ItemVersion -Id <String> [-Database <String>] [-Recurse] [-IfExist <Append | Skip | OverwriteLatest>] [-TargetLanguage <String[]>] [-DoNotCopyFields] [-IgnoredFields <String[]>] [-Language <String[]>]
```

## Detailed Description

Creates a new version of the item in a specified language based on an existing language/version. Based on parameters you can make the command bahave differently when a version in the target language already exists and define which fields if any should be copied over from the original language.

© 2010-2020 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Add-ItemLanguage 

## Parameters

### -Recurse &lt;SwitchParameter&gt;

Process the item and all of its children.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -IfExist &lt;ActionIfExists&gt;

Default value is Append. Accepts one of 3 values:

* Append - \[Default\] if language version exists create a new version with values copied from the original language
* Skip - if language version exists don't do anything
* OverwriteLatest - if language version exists overwrite the last version with values copied from the original language 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -IfNoSourceVersion &lt;ActionIfNoVersion&gt;

Default value is Skip. Accepts one of 2 values:

* Skip - \[Default\] if the source item has no versions don't do anything
* Add - if the source item has no versions create a version without any copied values

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -TargetLanguage &lt;String\[\]&gt;

Language or a list of languages that should be created

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -DoNotCopyFields &lt;SwitchParameter&gt;

Creates a new version in the target language but does not copy field values from the original language

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -IgnoredFields &lt;String\[\]&gt;

List of fields that should not be copied over from original item. As an example, use "\_\_Security" if you don't want the new version to have the same restrictions as the original version.

In addition to the fields in -IgnoredFields the following fields are ignored as configured in Spe.config file in the following location: configuration/sitecore/powershell/translation/ignoredFields.

Fields ignored out of the box include:

* \_\_Archive date
* \_\_Archive Version date
* \_\_Lock
* \_\_Owner
* \_\_Page Level Test Set Definition
* \_\_Reminder date
* \_\_Reminder recipients
* \_\_Reminder text 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language &lt;String\[\]&gt;

Language that will be used as source language. If not specified the current user language will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item &lt;Item&gt;

The item / version to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path &lt;String&gt;

Path to the item to be processed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id &lt;String&gt;

Id of the item to be processed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database &lt;String&gt;

Database containing the item to be processed - can work with Language parameter to narrow the publication scope.

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

* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Translate the Home Item from English to US and Polish leaving the "Title" field blank. If a version exists don't do anything

```powershell
PS master:\> Add-ItemVersion -Path "master:\content\home" -Language "en" -TargetLanguage "pl-pl", "en-us" -IfExist Skip -IgnoredFields "Title"
```

### EXAMPLE 2

```powershell
Add a Japanese version to /sitecore/content/home item in the master database based on itself
PS master:\> Add-ItemVersion -Path "master:\content\home" -Language ja-JP -IfExist Append
```

### EXAMPLE 3

Translate the children of Home item \(but only those of Template Name "Sample Item"\) from English to US and Polish. If a version exists create a new version for that language. Display results in a table listing item name, language and created version number.

```powershell
Get-ChildItem "master:\content\home" -Language "en" -Recurse | `
    Where-Object { $_.TemplateName -eq "Sample Item" } | `
    Add-ItemVersion -TargetLanguage "pl-pl" -IfExist Append | `
    Format-Table Name, Language, Version -auto
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Remove-ItemVersion](remove-itemversion.md)
* New-Item
* [https://gist.github.com/AdamNaj/b36ea095e3668c22c07e](https://gist.github.com/AdamNaj/b36ea095e3668c22c07e) 

