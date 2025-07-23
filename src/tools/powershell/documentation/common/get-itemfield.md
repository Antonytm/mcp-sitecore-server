# Get-ItemField

Retrieves item fields as either names or fields or template fields.

## Syntax

Get-ItemField \[-Item\] &lt;Item&gt; \[-IncludeStandardFields\] \[-ReturnType &lt;Name \| Field \| TemplateField&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Language &lt;String\[\]&gt;\]

Get-ItemField \[-Path\] &lt;String&gt; \[-IncludeStandardFields\] \[-ReturnType &lt;Name \| Field \| TemplateField&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Language &lt;String\[\]&gt;\]

Get-ItemField -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-IncludeStandardFields\] \[-ReturnType &lt;Name \| Field \| TemplateField&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

Retrieves item fields as either names or fields or template fields.

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

### -ReturnType  &lt;ReturnValue&gt;

Determines type returned. The possible values include:

* Name - strings with field names.
* Field - fields on the item
* TemplateField - template fields. 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Name  &lt;String\[\]&gt;

Array of names to include - supports wildcards.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

Language that will be analysed. If not specified the current user language will be used. Globbing/wildcard supported.

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

Database containing the item to be analysed - can work with Language parameter to narrow the publication scope.

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

  Sitecore.Data.Templates.TemplateField

  Sitecore.Data.Fields.Field

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Get list of names of non standard fields from /sitecore/content/home item

```powershell
PS master:\> Get-ItemField -Path master:\content\home

Text
Title
Image
```

### EXAMPLE 2

Get list of fields including standard fields from /sitecore/content/home item and list their Name, DisplayName, SectionDisplayName and Description in a table.

```powershell
PS master:\> Get-Item master:\content\home | Get-ItemField -IncludeStandardFields -ReturnType Field -Name "*" | ft Name, DisplayName, SectionDisplayName, Description -auto

Name                                DisplayName                        SectionDisplayName Description
----                                -----------                        ------------------ -----------
__Revision                          Revision                           Statistics
__Standard values                   __Standard values                  Advanced
__Updated by                        Updated by                         Statistics
__Validate Button Validation Rules  Validation Button Validation Rules Validation Rules
__Created                           Created                            Statistics
__Thumbnail                         Thumbnail                          Appearance
__Insert Rules                      Insert Rules                       Insert Options
__Short description                 Short description                  Help
__Created by                        Created by                         Statistics
__Presets                           Presets                            Layout
Text                                Text                               Data               The text is the main content of the document.
```

## Related Topics

* [Get-ItemTemplate](get-itemtemplate.md)
* [Reset-ItemField](reset-itemfield.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

