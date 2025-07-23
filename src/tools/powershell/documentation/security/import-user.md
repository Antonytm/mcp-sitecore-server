# Import-User

Imports \(deserializes\) Sitecore users from the Sitecore server filesystem.

## Syntax

Import-User \[-Identity\] &lt;AccountIdentity&gt; \[-Root &lt;String&gt;\]

Import-User -Filter &lt;String&gt; \[-Root &lt;String&gt;\]

Import-User \[-User\] &lt;User&gt; \[-Root &lt;String&gt;\]

Import-User -Path &lt;String&gt;

## Detailed Description

The Import-User command imports \(deserializes\) Sitecore users from the Sitecore server filesystem.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;AccountIdentity&gt;

Specifies the Sitecore user to be deserialized by providing one of the following values.

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

### -Filter  &lt;String&gt;

Specifies a simple pattern to match Sitecore users.

Examples: The following examples show how to use the filter syntax.

To get all the roles, use the asterisk wildcard: Import-User -Filter \*

To get all the roles in a domain use the following command: Import-User -Filter "sitecore\*"

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -User  &lt;User&gt;

User object retrieved from the Sitecore API or using the Get-User command identifying the user account to be deserialized.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the file the user should be loaded from.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Root  &lt;String&gt;

Specifies the serialization root directory. If this parameter is not specified - the default Sitecore serialization folder will be used \(unless you're reading from an explicit location with the -Path parameter\).

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

  Sitecore.Security.Accounts.User

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Import-User -Identity sitecore\Admin
```

### EXAMPLE 2

```powershell
PS master:\> Import-User -Filter sitecore\*
```

### EXAMPLE 3

```powershell
PS master:\> Import-User -Root C:\my\Serialization\Folder\ -Filter *\*
```

### EXAMPLE 4

```powershell
PS master:\> Import-User -Path C:\my\Serialization\Folder\Admin.user
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

