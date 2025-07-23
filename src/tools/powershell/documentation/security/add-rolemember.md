# Add-RoleMember

Adds one or more Sitecore users to the specified role.

## Syntax

Add-RoleMember \[-Identity\] &lt;AccountIdentity&gt; -Members &lt;AccountIdentity\[\]&gt;

## Detailed Description

The Add-RoleMember command assigns Sitecore users as members of the specified role.

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

### -Members  &lt;AccountIdentity\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
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

* None. 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 2

```powershell
PS master:\> Add-RoleMember -Identity developer -Members "michael","adam","mike"
```

### EXAMPLE 2

The following adds all users of a given domain to the Developer role.

```powershell
$users = Get-User -Filter * | Where-Object { @("ad1","ad2") -contains $_.Domain }
Add-RoleMember -Identity "sitecore\Developer" -Members $users
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Get-RoleMember](get-rolemember.md)
* [Remove-RoleMember](remove-rolemember.md)

