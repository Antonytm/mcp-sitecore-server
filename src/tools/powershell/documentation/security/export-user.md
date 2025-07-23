# Export-User

Export \(serialize\) a Sitecore user to the filesystem on the server.

## Syntax

Export-User \[-Identity\] &lt;AccountIdentity&gt; \[-Root &lt;String&gt;\]

Export-User \[-Identity\] &lt;AccountIdentity&gt; -Path &lt;String&gt;

Export-User -Filter &lt;String&gt; \[-Root &lt;String&gt;\]

Export-User \[-User\] &lt;User&gt; \[-Root &lt;String&gt;\]

Export-User \[-User\] &lt;User&gt; -Path &lt;String&gt;

Export-User -Current \[-Root &lt;String&gt;\]

Export-User -Current -Path &lt;String&gt;

## Detailed Description

The Export-User command serializes a Sitecore user to the filesystem on the server.

The Identity parameter specifies the Sitecore user to get. You can specify a user by its local name or fully qualified name. You can also specify user object variable, such as $&lt;user&gt;.

To search for and retrieve more than one user, use the Filter parameter.

You can also pipe a user from the Get-user command.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Specifies the Sitecore user by providing one of the following values.

```powershell
Local Name
    Example: admin
Fully Qualified Name
    Example: sitecore\admi
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

To get all the users, use the asterisk wildcard: Export-User -Filter \*

To get all the users in a domain use the following command: Export-User -Filter "sitecore\*"

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -User  &lt;User&gt;

User object retrieved from the Sitecore API or using the Get-User command.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Current  &lt;SwitchParameter&gt;

Specifies that the current user should be serialized.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the file the user should be saved to.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Root  &lt;String&gt;

Overrides Sitecore Serialization root directory

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Security.Accounts.User 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Export-User -Identify sitecore\admin
```

## Related Topics

* [Export-Role](export-role.md)
* [Import-User](import-user.md)
* [Export-Item](../packaging/export-item.md)
* [Import-Role](import-role.md)
* [Import-Item](export-user.md)
* [Get-User](get-user.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

