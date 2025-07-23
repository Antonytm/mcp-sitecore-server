# Get-Domain

Gets all available domains or the specified domain.

## Syntax

Get-Domain \[-Name &lt;String&gt;\]

## Detailed Description

The Get-Domain command returns all the domains or the specified domain.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

The name of the domai

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.String

  Represents the name of a domain.

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Security.Domains.Domai 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Get-Domain -Name sitecore
Name            AccountPrefix   EnsureAnonymousUser    LocallyManaged
----            -------------   -------------------    --------------
sitecore        sitecore\       False                  False
```

### EXAMPLE 2

```powershell
PS master:\> Get-Domain

Name            AccountPrefix   EnsureAnonymousUser    LocallyManaged
----            -------------   -------------------    --------------
sitecore        sitecore\       False                  False
extranet        extranet\       True                   False
default         default\        True                   False
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Remove-Domain](remove-domain.md)
* [New-Domain](new-domain.md)

