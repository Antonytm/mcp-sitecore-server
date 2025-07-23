# Get-RoleMember

Returns the Sitecore users in the specified role.

## Syntax

Get-RoleMember \[-Identity\] &lt;AccountIdentity&gt; \[-Recurse\]

Get-RoleMember \[-Identity\] &lt;AccountIdentity&gt; \[-UsersOnly\] \[-Recurse\]

Get-RoleMember \[-Identity\] &lt;AccountIdentity&gt; \[-RolesOnly\] \[-Recurse\]

## Detailed Description

The Get-RoleMember command returns the Sitecore users in the specified role.

The Identity parameter specifies the Sitecore role to get. You can specify a role by its local name or fully qualified name.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Specifies the Sitecore role by providing one of the following values.

```powershell
Local Name
    Example: developer
Fully Qualified Name
    Example: sitecore\developer
```

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Recurse  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -UsersOnly  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -RolesOnly  &lt;SwitchParameter&gt;

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

  Represents the identity of a role.

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Security.Accounts.User

  Returns one or more users.

Sitecore.Security.Accounts.Role Returns one or more roles.

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Get-RoleMember -Identity developer

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
sitecore\michael         sitecore     False           False
```

### EXAMPLE 2

```powershell
PS master:\> Get-RoleMember -Identity author

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
sitecore\michael         sitecore     False           False

Domain      : sitecore
IsEveryone  : False
IsGlobal    : False
AccountType : Role
Description : Role
DisplayName : sitecore\Developer
LocalName   : sitecore\Developer
Name        : sitecore\Developer
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-Role](get-role.md)
* [Remove-RoleMember](remove-rolemember.md)
* [Add-RoleMember](add-rolemember.md)

