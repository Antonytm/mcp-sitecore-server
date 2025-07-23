# Reset-ItemField

Resets item fields, specified as either names, fields or template fields.

## Syntax

```powershell
Reset-ItemField [-Item] <Item> [-IncludeStandardFields] [-Name <String[]>]
Reset-ItemField [-Path] <String> [-IncludeStandardFields] [-Name <String[]>]
Reset-ItemField -Id <String> [-Database <String>] [-IncludeStandardFields] [-Name <String[]>]
```

## Detailed Description

Resets item fields, specified as either names, fields or template fields.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -IncludeStandardFields  &lt;SwitchParameter&gt;

Includes fields that are defined on "Standard template"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Name  &lt;String\[\]&gt;

Array of field names to include - supports wildcards.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be analysed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be analysed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be analysed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be reset - can work with Language parameter to narrow the publication scope.

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

* None 

## Notes

Help Author: Adam Najmanowicz, Michael West, Alex Washtell

## Examples

### EXAMPLE 1

Reset all item fields, excluding standard fields.

```powershell
PS master:\> Reset-ItemField -Path master:\content\home
```

### EXAMPLE 2

Reset all item fields, including standard fields.

```powershell
PS master:\> Reset-ItemField -Path master:\content\home -IncludeStandardFields
```

### EXAMPLE 3

Reset all item fields with names beginning with "a", excluding standard fields.

```powershell
PS master:\> Get-Item master:\content\home | Reset-ItemField -Name "a*"
```

### EXAMPLE 4

The following resets one of the Standard Values fields for all versions and languages.

```powershell
Get-ChildItem -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}" -Version * -Language * -Recurse |
    Reset-ItemField -Name "__Workflow State" -IncludeStandardFields
```

## Related Topics

* [Get-ItemTemplate](get-itemtemplate.md)
* [Get-ItemField](get-itemfield.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

