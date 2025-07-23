# Get-SpeModule

Returns the object that describes a Sitecore PowerShell Extensions Module

## Syntax

Get-SpeModule -Item &lt;Item&gt;

Get-SpeModule -Path &lt;String&gt;

Get-SpeModule -Id &lt;String&gt; -Database &lt;String&gt;

Get-SpeModule -Database &lt;String&gt;

Get-SpeModule \[-Database &lt;String&gt;\] -Name &lt;String&gt;

## Detailed Description

The Get-SpeModule command returns the object that describes a Sitecore PowerShell Extensions Module.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

A script or library item that is defined within the module to be returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to a script or library item that is defined within the module to be returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of a script or library item that is defined within the module to be returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the module to be returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

Name fo the module to return. Supports wildcards.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item

  System.String

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Spe.Core.Modules.Module 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Return all modules defined in the provided database

```powershell
PS master:\> Get-SpeModule -Database (Get-Database "master")
```

### EXAMPLE 2

Return all modules defined in the master database Matching the "Content\*" wildcard

```powershell
PS master:\> Get-SpeModule -Database (Get-Database "master")
```

### EXAMPLE 3

Return the module the piped script belongs to

```powershell
PS master:\> Get-item "master:\system\Modules\PowerShell\Script Library\Copy Renderings\Content Editor\Context Menu\Layout\Copy Renderings" |  Get-SpeModule
```

## Related Topics

* [Get-SpeModuleFeatureRoot](get-spemodulefeatureroot.md)
* [https://blog.najmanowicz.com/2014/11/01/sitecore-powershell-extensions-3-0-modules-proposal/](https://blog.najmanowicz.com/2014/11/01/sitecore-powershell-extensions-3-0-modules-proposal/) 
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

