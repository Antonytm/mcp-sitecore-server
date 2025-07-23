# Unlock-User

Unlocks a Sitecore user using the specified criteria.

## Syntax

Unlock-User \[-Identity\] &lt;AccountIdentity&gt;

Unlock-User -Instance &lt;User&gt;

## Detailed Description

The Unlock-User command gets a user and unlocks the account in Sitecore.

The Identity parameter specifies the Sitecore user to get. You can specify a user by its local name or fully qualified name. You can also specify user object variable, such as $&lt;user&gt;.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Instance  &lt;User&gt;

Specifies the Sitecore user by providing an instance of a user.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.String

  Represents the identity of a user.

Sitecore.Security.Accounts.User One or more user instances.

## Outputs

The output type is the type of the objects that the cmdlet emits.

* None. 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Unlock-User -Identity michael
```

### EXAMPLE 2

```powershell
PS master:\> Get-User -Filter * | Unlock-User
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-User](get-user.md)
* [New-User](new-user.md)
* [Remove-User](remove-user.md)
* [Set-User](set-user.md)

