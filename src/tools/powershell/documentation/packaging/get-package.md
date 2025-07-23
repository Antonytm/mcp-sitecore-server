# Get-Package

Loads the package definition \(xml\) from the specified path.

## Syntax

Get-Package \[-Path\] &lt;String&gt;

## Detailed Description

The Get-Package commands loads the package definition \(xml\) and returns the package project. Package definitions can be created by PowerShell scripts using the Export-Package command \(without the -Zip parameter\)

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Path  &lt;String&gt;

Path to the package file. If the path is not absolute the path needs to be relative to the Sitecore Package path defined in the "PackagePath" setting and later exposed in the Sitecore.Shell.Applications.Install.PackageProjectPath

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Install.PackageProject 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

The following assumes that the project file is located in the default package directory.

```powershell
PS master:\> Get-Package -Path myproject.xml
```

## Related Topics

* [Export-Package](export-package.md)
* Import-Package
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

