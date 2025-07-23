# Get-LayoutDevice

Returns the layout for the specified device.

## Syntax

```powershell
Get-LayoutDevice [-Name] <String>

Get-LayoutDevice [-Default]
```

## Detailed Description

The Get-LayoutDevice command returns the layout for the specified device.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

Name of the device to return.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Default  &lt;SwitchParameter&gt;

Determines that a default system layout device should be returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Items.DeviceItem 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Get Print device

```powershell
PS master:\> Get-LayoutDevice "Print"
```

### EXAMPLE 2

Get default device

```powershell
PS master:\> Get-LayoutDevice -Default
```

### EXAMPLE 3

Get all layout devices

```powershell
PS master:\> Get-LayoutDevice *
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-Rendering](add-rendering.md)
* [New-Rendering](new-rendering.md)
* [Set-Rendering](set-rendering.md)
* [Get-Rendering](get-rendering.md)
* [Remove-Rendering](remove-rendering.md)
* [Get-Layout](get-layout.md)
* [Set-Layout](set-layout.md)

