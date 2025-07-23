# Show-Result

Shows a Sheer dialog with text results showing the output of the script or another control selected by the user based on either control name or Url to the control.

## Syntax

Show-Result -Control &lt;String&gt; \[-Parameters &lt;String\[\]&gt;\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

Show-Result -Url &lt;String&gt; \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

Show-Result \[-Text\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

## Detailed Description

Shows a Sheer dialog with text results showing the output of the script or another control selected by the user based on either control name or Url to the control.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Control  &lt;String&gt;

Name of the Sheer control to execute.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Url  &lt;String&gt;

Url to the Sheer control to execute.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Parameters  &lt;String\[\]&gt;

Parameters to be passed to the executed control when executing with the -Control parameter specified.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Text  &lt;SwitchParameter&gt;

Shows the default text dialog.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Title  &lt;String&gt;

Title of the window containing the control.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Width  &lt;Int32&gt;

Width of the window containing the control.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Height  &lt;Int32&gt;

Height of the window containing the control.

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

Show results of script executio

```powershell
PS master:\> Show-Result -Text
```

### EXAMPLE 2

Show the Control Panel control in a Window of specified size.

```powershell
PS master:\> Show-Result -Control "ControlPanel" -Width 1024 -Height 640
```

### EXAMPLE 3

```powershell
Shows a new instance of ISE
Show-Result -Url "/sitecore/shell/Applications/PowerShell/PowerShellIse"
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
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

