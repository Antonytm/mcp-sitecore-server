# Import-Function

Imports a function script from the script library's "Functions" folder.

## Syntax

Import-Function \[-Name\] &lt;String&gt; \[-Library &lt;String&gt;\] \[-Module &lt;String&gt;\]

## Detailed Description

The Import-Function command imports a function script from the script library's "Functions" folder.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

Name of the script in the "Functions" library or one of its sub-libraries.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Library  &lt;String&gt;

Name of the library withing the "Functions" library. Provide this name to disambiguate a script from other scripts of the same name that might exist in multiple sub-librarties of the Functions library.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Module  &lt;String&gt;

Name of the module "Functions" are going to be taken from. Provide this name to disambiguate a script from other scripts of the same name that might exist in multiple Modules.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.Object 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

The following imports a Resolve-Error function that you may later use to get a deeper understanding of a problem with script should one occur by xecuting the "Resolve-Error" command that was imported as a result of the execution of the following line

```powershell
PS master:\> Import-Function -Name Resolve-Error
```

## Related Topics

* [Invoke-Script](invoke-script.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

