# Show-Application

Executes Sitecore Sheer application.

## Syntax

Show-Application \[-Application\] &lt;String&gt; \[\[-Parameter\] &lt;Hashtable&gt;\] \[-Icon &lt;String&gt;\] \[-Modal\] \[-Title &lt;String&gt;\] \[-Width &lt;Int32&gt;\] \[-Height &lt;Int32&gt;\]

## Detailed Description

Executes Sitecore Sheer application, allows for passing additional parameters, launching it on desktop in cooperative or in Modal mode.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Application  &lt;String&gt;

Name of the Application to be executed. Application must be defined in the Core databse.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Parameter  &lt;Hashtable&gt;

Additional parameters passed to the application.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Icon  &lt;String&gt;

Icon of the executed application \(used for titlebar and in the Sitecore taskbar on the desktop\)

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Modal  &lt;SwitchParameter&gt;

Causes the application to show in new browser modal window or modal overlay if used in Sitecore 7.2 or later.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Title  &lt;String&gt;

Title of the window the app opens in.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Width  &lt;Int32&gt;

Width of the modal window.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Height  &lt;Int32&gt;

Height of the modal window.

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

Show Content Editor in new window \(or as an overlay in modal mode in Sitecore 7.2+\) with "/sitecore/templates" item selected.

```powershell
$item = gi master:\templates

Show-Application `
    -Application "Content Editor" `
    -Parameter @{id ="$($item.ID)"; fo="$($item.ID)";la="$($item.Language.Name)"; vs="$($item.Version.Number)";sc_content="$($item.Database.Name)"} `
    -Modal -Width 1600 -Height 800
```

### EXAMPLE 2

Show Content Editor as a new application on desktop with "/sitecore/content/home" item selected.

```powershell
$item = gi master:\content\home

Show-Application `
    -Application "Content Editor" `
    -Parameter @{id ="$($item.ID)"; fo="$($item.ID)";la="$($item.Language.Name)"; vs="$($item.Version.Number)";sc_content="$($item.Database.Name)"} `
```

## Related Topics

* [Read-Variable](read-variable.md)
* [Show-Alert](show-alert.md)
* [Show-Confirm](show-confirm.md)
* [Show-FieldEditor](show-fieldeditor.md)
* [Show-Input](show-input.md)
* [Show-ListView](show-listview.md)
* [Show-ModalDialog](show-modaldialog.md)
* [Show-Result](show-result.md)
* [Show-YesNoCancel](show-yesnocancel.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

