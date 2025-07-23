# Export-Package

Exports a Sitecore installation package and project.

## Syntax

Export-Package \[\[-Path\] &lt;String&gt;\] \[\[-Project\] &lt;PackageProject&gt;\] \[-Zip\] \[-NoClobber\] \[-IncludeProject\]

## Detailed Description

The Export-Package command creates a Sitecore installation package as either a .zip containing all items and files or .xml with project definition.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Path  &lt;String&gt;

Path the project should be saved under.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Project  &lt;PackageProject&gt;

Project object created ealier with the New-Package. or Loaded with Get-Package.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Zip  &lt;SwitchParameter&gt;

Specify this parameter to exposrt package with all its assets in a zip file. If this parameter is missing only Xml file with the package project definition will be saved.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -NoClobber  &lt;SwitchParameter&gt;

Do not overwrite \(replace the contents\) of an existing file. By default, if a file exists in the specified path, Export-Package overwrites the file without warning.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -IncludeProject  &lt;SwitchParameter&gt;

Specify this parameter if exporting the zip file and when you want it to contain the project definitnion xml file in it.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Install.PackageProject 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

Following example creates a new package, adds content/home item to it and saves it in the Sitecore Package folder+ gives you an option to download the saved package.

```powershell
# Create package
$package = new-package "Package for something special";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Michael West";
$package.Metadata.Publisher = "Scripting in Powerful Ways Team";
$package.Metadata.Version = "2.7";
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

* [Get-Package](get-package.md)
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

