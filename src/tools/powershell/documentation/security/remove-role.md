# Remove-Role

Removes a Sitecore role.

## Syntax

Remove-Role \[-Identity\] &lt;AccountIdentity&gt;

Remove-Role -Instance &lt;Role&gt;

## Detailed Description

The Remove-Role command removes a Sitecore role.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Role name including domain. If no domain is specified - 'sitecore' will be used as the default value

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Instance  &lt;Role&gt;

Role instance like that returned by the Get-Role command.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Security.Accounts.Role 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* None 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Remove-Role -Identity Michael
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

