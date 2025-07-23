# Show-FieldEditor

Shows Field editor for a provided item.

## Syntax

Show-FieldEditor -Item &lt;Item&gt; -PreserveSections \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

Show-FieldEditor -Item &lt;Item&gt; \[-SectionTitle &lt;String&gt;\] \[-SectionIcon &lt;String&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

Show-FieldEditor -Path &lt;String&gt; \[-Language &lt;String\[\]&gt;\] -PreserveSections \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

Show-FieldEditor -Path &lt;String&gt; \[-Language &lt;String\[\]&gt;\] \[-SectionTitle &lt;String&gt;\] \[-SectionIcon &lt;String&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

Show-FieldEditor -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\] -PreserveSections \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

Show-FieldEditor -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\] \[-SectionTitle &lt;String&gt;\] \[-SectionIcon &lt;String&gt;\] \[-Name &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\] \[-IncludeStandardFields\]

## Detailed Description

Shows Field editor for a provided item allows for editing all or selected list of fields. If user closes the dialog by pressing the "OK" button "ok" string will be returned. Otherwise "cancel" will be returned.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String\[\]&gt;

Array of names of the fields to be edited.

This parameter supports globbing so you can simply use "_" to allow editing of all fields. If a field is prefixed with a dash - this field will be excluded from the list of fields. e.g. the following will display all fields except title from Show-FieldEditor -Path "master:\content\home" -Name "_", "-Title"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Title  &lt;String&gt;

Title of the dialog containing the field editor.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Width  &lt;Int32&gt;

Width of the dialog containing the field editor.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Height  &lt;Int32&gt;

Height of the dialog containing the field editor.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -IncludeStandardFields  &lt;SwitchParameter&gt;

Add this parameter to add standard fields to the list that is being considered to be displayed

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be edited.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be edited - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the the item to be edited - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be edited - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

Language that will be edited. If not specified the current user language will be used. Globbing/wildcard supported.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PreserveSections  &lt;SwitchParameter&gt;

If added this parameter tells editor to preserve the original item field sections, otherwise all fields are placed in a single section Named by SectionTitle parameter and having the SectionIcon icon.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -SectionTitle  &lt;String&gt;

If PreserveSections is not added to parameters - this parameter provides a title for the global section all fields are placed under.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -SectionIcon  &lt;String&gt;

If PreserveSections is not added to parameters - this parameter provides a iconfor the global section all fields are placed under.

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

Show field editor that shows all non-standard fields on sitecore/content/home item except for field "title" The dialog will be titled "My Home Item" all fields inside will be in single section.

```powershell
PS master:\> Show-FieldEditor -Path master:\content\home -Name "*" , "-Title" -Title "My Home Item"
```

### EXAMPLE 2

Show field editor that shows all fields including standard fields on sitecore/content/home The dialog will preserve the item sections.

```powershell
PS master:\> Get-Item "master:\content\home" | Show-FieldEditor -Name "*" -IncludeStandardFields -PreserveSections
```

## Related Topics

* [Read-Variable](read-variable.md)
* [Show-Alert](show-alert.md)
* [Show-Application](show-application.md)
* [Show-Confirm](show-confirm.md)
* [Show-Input](show-input.md)
* [Show-ListView](show-listview.md)
* [Show-ModalDialog](show-modaldialog.md)
* [Show-Result](show-result.md)
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

