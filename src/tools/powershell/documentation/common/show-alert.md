# Show-Alert

Pauses the script and shows an alert to the user.

## Syntax

Show-Alert \[-Title\] &lt;String&gt;

## Detailed Description

Pauses the script and shows an alert specified in the -Title to the user. Once user clicks the OK button - script execution resumes.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Title  &lt;String&gt;

Text to show the user in the alert dialog.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Show-Alert "Hello world."
```

## Related Topics

* [Read-Variable](read-variable.md)
* [Show-Application](show-application.md)
* [Show-Confirm](show-confirm.md)
* [Show-FieldEditor](show-fieldeditor.md)
* [Show-Input](show-input.md)
* [Show-ListView](show-listview.md)
* [Show-ModalDialog](show-modaldialog.md)
* [Show-Result](show-result.md)
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

