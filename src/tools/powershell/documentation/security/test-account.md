# Test-Account

Determines if the Sitecore role or user account exists.

## Syntax

Test-Account \[-Identity\] &lt;AccountIdentity&gt; \[-AccountType &lt;String&gt;\]

## Detailed Description

The Test-Account command determines if a Sitecore role or user account exists.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Role or User name including domain. If no domain is specified - 'sitecore' will be used as the default value

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -AccountType  &lt;String&gt;

Specifies which account to check existence.

* All
* Role
* User 

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

## Outputs

The output type is the type of the objects that the cmdlet emits.

* True or False 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Test-Account -Identity Michael

True
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

