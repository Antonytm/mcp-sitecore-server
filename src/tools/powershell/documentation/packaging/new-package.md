# New-Package

Creates a new Sitecore install package object.

## Syntax

New-Package \[-Name\] &lt;String&gt;

## Detailed Description

Creates a new Sitecore install package object that allows for further addition of items and files & further export to file.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

Package name

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

Following example creates a new package, adds content/home item to it and saves it in the Sitecore Package folder+ gives you an option to download the saved package.

```powershell
$package = New-Package "Packing in Powerful Ways";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Adam Najmanowicz, Michael West";
$package.Metadata.Publisher = "Powerful Ways";
$package.Metadata.Version = "1.0";
$package.Metadata.Readme = 'This text will be visible to people installing your package'

# Add contnet/home to the package
$source = Get-Item 'master:\content\home' | New-ItemSource -Name 'Home Page' -InstallMode Overwrite
$package.Sources.Add($source);

# Save package
Export-Package -Project $package -Path "$($package.Name)-$($package.Metadata.Version).zip" -Zip

# Offer the user to download the package
Download-File "$SitecorePackageFolder\$($package.Name)-$($package.Metadata.Version).zip"
```

## Related Topics

* [Export-Package](export-package.md)
* [Get-Package](get-package.md)
* Import-Package
* [New-ExplicitFileSource](new-explicitfilesource.md)
* [New-ExplicitItemSource](new-explicititemsource.md)
* [New-FileSource](new-filesource.md)
* [New-ItemSource](new-itemsource.md)
* [Install-UpdatePackage](install-updatepackage.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/](https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/) 
* [https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae](https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae) 
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 

