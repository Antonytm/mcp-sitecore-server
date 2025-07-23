# Install-Package

Installs a Sitecore package from the specified path.

## Syntax

Install-Package \[\[-Path\] &lt;String&gt;\] \[-InstallMode &lt;Undefined \| Overwrite \| Merge \| Skip \| SideBySide&gt;\] \[-MergeMode &lt;Undefined \| Clear \| Append \| Merge&gt;\] \[-DisableIndexing\]

## Detailed Description

Installs Sitecore package with the ability to provide default responses for merge and overwrite actions. The alias for the command is Import-Package.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Import-Package 

## Parameters

### -Path  &lt;String&gt;

Path to the package file.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -InstallMode  &lt;InstallMode&gt;

Undefined, Overwrite, Merge, Skip, SideBySide

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -MergeMode  &lt;MergeMode&gt;

Undefined, Clear, Append, Merge

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -DisableIndexing  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Install-Package -Path SitecorePowerShellConsole.zip -InstallMode Merge -MergeMode Merge
```

## Related Topics

* [Export-Package](export-package.md)
* [Get-Package](get-package.md)
* [Install-UpdatePackage](install-updatepackage.md)
* [New-ExplicitFileSource](new-explicitfilesource.md)
* [New-ExplicitItemSource](new-explicititemsource.md)
* [New-FileSource](new-filesource.md)
* [New-ItemSource](new-itemsource.md)
* [New-Package](new-package.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/](https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/) 
* [https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae](https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae) 
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 

