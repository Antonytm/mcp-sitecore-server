# Show-YesNoCancel

Shows Yes/No/Cancel dialog to the user and returns user choice.

## Syntax

Show-YesNoCancel \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

## Detailed Description

Shows Yes/No/Cancel dialog to the user and returns user choice as a string value.

Depending on the user response one of the 2 strings is returned:

* yes
* no
* cancel 

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Title  &lt;String&gt;

Question to ask the user in the dialog

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Width  &lt;Int32&gt;

Width of the dialog.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Height  &lt;Int32&gt;

Height of the dialog.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.String 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Show-YesNoCancel "Should we delete those 2 items?"

cancel
```

## Related Topics

* [Read-Variable](read-variable.md)
* [Show-Alert](show-alert.md)
* [Show-Application](show-application.md)
* [Show-Confirm](show-confirm.md)
* [Show-FieldEditor](show-fieldeditor.md)
* [Show-Input](show-input.md)
* [Show-ListView](show-listview.md)
* [Show-ModalDialog](show-modaldialog.md)
* [Show-Result](show-result.md)
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

