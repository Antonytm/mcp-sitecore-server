# Export-UpdatePackage

Exports a Sitecore update package containing a serialization diff list.

## Syntax

Export-UpdatePackage \[-CommandList\] &lt;List\`1&gt; \[\[-Name\] &lt;String&gt;\] \[\[-Path\] &lt;String&gt;\] \[-Readme &lt;String&gt;\] \[-LicenseFileName &lt;String&gt;\] \[-Tag &lt;String&gt;\]

## Detailed Description

The Export-UpdatePackage command generates a Sitecore update package containing a serialization diff list.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -CommandList  &lt;List\`1&gt;

List of changes to be included in the package.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

Name of the package.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path the update package should be saved under.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 3 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Readme  &lt;String&gt;

Contents of the "read me" instruction for the package

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -LicenseFileName  &lt;String&gt;

file name of the license to be included with the package.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Tag  &lt;String&gt;

Package tag.

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

Create an update package that transforms the serialized database state defined in C:\temp\SerializationSource into into set defined in C:\temp\SerializationTarget

```powershell
$diff = Get-UpdatePackageDiff -SourcePath C:\temp\SerializationSource -TargetPath C:\temp\SerializationTarget
Export-UpdatePackage -Path C:\temp\SerializationDiff.update -CommandList $diff -Name name
```

## Related Topics

* [Get-UpdatePackageDiff](get-updatepackagediff.md)
* [Install-UpdatePackage](install-updatepackage.md)
* [https://sitecoresnippets.blogspot.com/2012/10/sitecore-courier-effortless-packaging.html](https://sitecoresnippets.blogspot.com/2012/10/sitecore-courier-effortless-packaging.html) 
* [https://github.com/adoprog/Sitecore-Courier](https://github.com/adoprog/Sitecore-Courier) 
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

