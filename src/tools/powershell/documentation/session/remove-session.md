# Remove-Session

Removes one or more Sitecore user sessions.

## Syntax

Remove-Session -InstanceId &lt;String\[\]&gt;

Remove-Session \[-Instance\] &lt;Session&gt;

## Detailed Description

The Remove-Session command removes user sessions in Sitecore.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -InstanceId  &lt;String\[\]&gt;

Specifies the Sitecore SessionID.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Instance  &lt;Session&gt;

Specifies the Sitecore user sessions.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Accepts a user session.\* Sitecore.Web.Authentication.DomainAccessGuard.Sessio 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* None. 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Remove-Session -InstanceId tekipna1lk0ccr2z1bdjsua2,wq4bfivfm2tbgkgdccpyzczp
```

### EXAMPLE 2

```powershell
PS master:\> Get-Session -Identity michael | Remove-Session
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-Session](get-session.md)

