# New-Domain

Creates a new domain with the specified name.

## Syntax

New-Domain \[-Name\] &lt;String&gt; \[-LocallyManaged\]

## Detailed Description

The New-Domain command creates a domain if it does not exist.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

The name of the domain.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -LocallyManaged  &lt;SwitchParameter&gt;

TODO: Provide description for this parameter

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

* None. 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> New-Domain -Name "domainName"
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-Domain](get-domain.md)
* [Remove-Domain](remove-domain.md)

