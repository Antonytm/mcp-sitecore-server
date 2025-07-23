# New-FileSource

Creates new File source that can be added to a Sitecore package.

## Syntax

New-FileSource \[-Name\] &lt;String&gt; \[-Root\] &lt;DirectoryInfo&gt; \[\[-IncludeFilter\] &lt;String&gt;\] \[\[-ExcludeFilter\] &lt;String&gt;\] \[-InstallMode &lt;String&gt;\]

## Detailed Description

Creates new File source that can be added to a Sitecore package. Folder provided as Root will be added as well as all of its content provided it matches the filters.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Name  &lt;String&gt;

Name of the file source.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Root  &lt;DirectoryInfo&gt;

Root folder to include in the package

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -IncludeFilter  &lt;String&gt;

Filter that defines which files will be included.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 3 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ExcludeFilter  &lt;String&gt;

Filter that defines which files will NOT be included.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 4 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -InstallMode  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Install.Files.FileSource 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

Following example creates a new package, adds content of the Console folder under the site folder saves it in the Sitecore Package folder + gives you an option to download the saved package.

```powershell
# Create package
$package = New-Package "Packing in Powerful Ways";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Adam Najmanowicz, Michael West";
$package.Metadata.Publisher = "Powerful Ways";
$package.Metadata.Version = "1.0";
$package.Metadata.Readme = 'This text will be visible to people installing your package'

# Add content of the Console folder in the site folder to the package
$source = New-FileSource -Name "Console Assets" -Root "$AppPath\Console"
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
* [Install-UpdatePackage](install-updatepackage.md)
* [New-ExplicitFileSource](new-explicitfilesource.md)
* [New-ExplicitItemSource](new-explicititemsource.md)
* [New-ItemSource](new-itemsource.md)
* [New-Package](new-package.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/](https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/) 
* [https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae](https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae) 
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 

