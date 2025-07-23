# Show-Confirm

Shows a user a confirmation request message box.

## Syntax

Show-Confirm \[-Title\] &lt;String&gt;

## Detailed Description

Shows a user a confirmation request message box. Returns "yes" or "no" based on user's response. The buttons that are shown to the user are "OK" and "Cancel".

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Title  &lt;String&gt;

Text to show the user in the dialog.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.String 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Show-Confirm -Title "Do you like Sitecore PowerShell Extensions?"

yes
```

## Related Topics

* [Read-Variable](read-variable.md)
* [Show-Alert](show-alert.md)
* [Show-Application](show-application.md)
* [Show-FieldEditor](show-fieldeditor.md)
* [Show-Input](show-input.md)
* [Show-ListView](show-listview.md)
* [Show-ModalDialog](show-modaldialog.md)
* [Show-Result](show-result.md)
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

