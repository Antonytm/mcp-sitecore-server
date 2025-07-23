# New-ItemSource

Creates new Item source that can be added to a Sitecore package.

## Syntax

New-ItemSource \[-Item &lt;Item&gt;\] \[-Name\] &lt;String&gt; \[\[-SkipVersions\]\] \[\[-Database\] &lt;String&gt;\] \[\[-Root\] &lt;String&gt;\] \[-InstallMode &lt;Undefined \| Overwrite \| Merge \| Skip \| SideBySide&gt;\] \[-MergeMode &lt;Undefined \| Clear \| Append \| Merge&gt;\]

## Detailed Description

Creates new Item source that can be added to a Sitecore package. Item provided to it is added as well as its subitems.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

The item to be added as the root of the source.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

Name of the item source.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -SkipVersions  &lt;SwitchParameter&gt;

Add this parameter if you want to skip versions of the item from being included in the source and only include the version provided.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be added - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 3 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Root  &lt;String&gt;

You can provide the Root as sitecore native path instead of specifying it through. Do not include Item in such case as Item will take priority over Root.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 4 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -InstallMode  &lt;InstallMode&gt;

Specifies what installer should do if the item already exists. Possible values:

* Undefined - User will have to choose one of the below. But they probably don't really know what should be done so not a preferable option.
* Overwrite - All versions of the old item are removed and replaced with all versions of the new item. This option basically replaces the old item with new one.
* Merge - merge with existing item. How the item will be merged is defined with MergeMode parameter
  * Skip - All versions remains unchanged. Other languages remains unchanged. All children remains unchanged.
* SideBySide - all new item will be created. 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -MergeMode  &lt;MergeMode&gt;

Specifies what installer should do if the item already exists and InstallMode is specified as Merge. Possible values:

* Undefined - User will have to choose one of the below. But they probably don't really know what should be done so not a preferable option.
* Clear - All versions of the old item are removed and replaced with all versions of the new item. This option basically replaces the old item with new one. Other language versions \(those which are not in the package\) are removed but only for items which are in the package. All child items which are not in the package keep other language versions. All child items which are in the package are changed.
* Append - All versions of the new item are added on top of versions of the previous item. This option allows for further manual merge because all history is preserved, so user can see what was changed. Other languages remains unchanged. All child items which are not in the package keep other language versions. All child items which are in the package are changed.
* Merge - All versions with the same number in both packages are replaced with versions from installed package. All versions which are in the package but not in the target are added. All versions which are not in the package but are in the target remains unchanged. This option also preserves history, however it might overwrite some of the changes. Other languages remains unchanged. All child items which are in the package are changed. 

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

* Sitecore.Install.Items.ItemSource 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

Following example creates a new package, adds content/home item to it and saves it in the Sitecore Package folder+ gives you an option to download the saved package.

```powershell
# Create package
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
* [Install-UpdatePackage](install-updatepackage.md)
* [New-ExplicitFileSource](new-explicitfilesource.md)
* [New-ExplicitItemSource](new-explicititemsource.md)
* [New-FileSource](new-filesource.md)
* [New-Package](new-package.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/](https://blog.najmanowicz.com/2011/12/19/continuous-deployment-in-sitecore-with-powershell/) 
* [https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae](https://gist.github.com/AdamNaj/f4251cb2645a1bfcddae) 
* [https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=7](https://www.youtube.com/watch?v=60BGRDNONo0&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=7) 

