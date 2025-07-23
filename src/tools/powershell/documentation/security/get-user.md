# Get-User

Returns one or more Sitecore users using the specified criteria.

## Syntax

```
Get-User [-Identity] <AccountIdentity> [-Authenticated]
Get-User -Filter <String> [-Authenticated] [-ResultPageSize <Int32>]
Get-User -Current
```

## Detailed Description

The Get-User command returns a user or performs a search to retrieve multiple users from Sitecore.

The Identity parameter specifies the Sitecore user to get. You can specify a user by its local name or fully qualified name. You can also specify user object variable, such as $&lt;user&gt;.

To search for and retrieve more than one user, use the Filter parameter.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Specifies the Sitecore user by providing one of the following values.

Local Name:

```powershell
admin
```

Fully Qualified Name:

```powershell
sitecore\admin
```

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Filter  &lt;String&gt;

Specifies a simple pattern to match Sitecore users.

Examples: The following examples show how to use the filter syntax.

To get all the users, use the asterisk wildcard:

```powershell
Get-User -Filter *
```

To get all the users in a domain use the following command:

```powershell
Get-User -Filter "sitecore\*"
```

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Current  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Authenticated  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ResultPageSize  &lt;Int32&gt;

Specifies the number of users to retrieve per request to the user provider. Each page of users is written to the pipeline before the next request is made. Without specifying this parameter all accounts are retrieved before passing down the pipeline.

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

  Represents the identity of a user.

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Security.Accounts.User

  Returns one or more users.

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Get-User -Identity admin

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
sitecore\admin           sitecore     True            False
```

### EXAMPLE 2

```powershell
PS master:\> "admin","michael" | Get-User

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
sitecore\Admin           sitecore     True            False
sitecore\michael         sitecore     False           False
```

### EXAMPLE 3

```powershell
PS master:\> Get-User -Filter *

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
default\Anonymous        default      False           False
extranet\Anonymous       extranet     False           False
sitecore\Admin           sitecore     True            False
sitecore\michael         sitecore     False           False
```

### EXAMPLE 4

```powershell
PS master:\> Get-User -Filter "michaellwest@*.com"

Name                     Domain       IsAdministrator IsAuthenticated
----                     ------       --------------- ---------------
sitecore\michael         sitecore     False           False
```

### EXAMPLE 5

Expand the MemberOf property to see a list of roles that the specified user is a member.

```powershell
PS master:\> Get-User -Identity sitecore\michael | Select-Object -ExpandProperty MemberOf

Name                                     Domain       IsEveryone
----                                     ------       ----------
sitecore\PowerShell Extensions Remoting  sitecore     False
sitecore\Developer                       sitecore     False
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Set-User](set-user.md)
* [New-User](new-user.md)
* [Remove-User](remove-user.md)
* [Unlock-User](unlock-user.md)

