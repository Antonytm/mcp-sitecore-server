# New-Role

Creates a new Sitecore role.

## Syntax

New-Role \[-Identity\] &lt;AccountIdentity&gt;

## Detailed Description

The New-Role command creates a new Sitecore role.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Role name including domain. If no domain is specified - 'sitecore' will be used as the default value

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByPropertyName\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.String 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Security.Accounts.Role 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> New-Role -Identity Michael
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

