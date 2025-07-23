# Get-SpeModuleFeatureRoot

Returns the library item or path to the library where scripts for a particular integration point should be located for a specific module.

## Syntax

Get-SpeModuleFeatureRoot \[-Module &lt;Module&gt;\] \[-ReturnPath\] \[-Feature\] &lt;String&gt;

## Detailed Description

The Get-SpeModuleFeatureRoot command returns library item or path to the library where scripts for a particular integration point should be located for a specific module.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Module  &lt;Module&gt;

Module for which the feature root library should be returned. If not provided the feature root will be returned for all modules.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -ReturnPath  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Feature  &lt;String&gt;

Feature for which the root library should be provided. If root item does not exist and -ReturnPath parameter is not specified - nothing will be returned, If -ReturnPath parameter is provided the path in which the feature root should be located will be returned

Valid features:

* contentEditorContextMenu 
* contentEditorGutters
* contentEditorRibbon
* controlPanel
* functions
* listViewExport
* listViewRibbon
* pipelineLoggedIn
* pipelineLoggingIn
* pipelineLogout
* toolbox
* startMenuReports
* eventHandlers
* webAPI
* pageEditorNotification
* isePlugi 

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Items.Item

  System.String

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Return the library item for "Content Editor Context Menu"

```powershell
$module = Get-SpeModule -Name "Copy Renderings"
Get-SpeModuleFeatureRoot -Feature contentEditorContextMenu -Module $module
```

### EXAMPLE 2

Return the Path to where "List View Export" scripts would be located if this feature was defined

```powershell
$module = Get-SpeModule -Name "Copy Renderings"
Get-SpeModuleFeatureRoot -Module $module -Feature listViewExport -ReturnPath
```

## Related Topics

* [Get-SpeModule](get-spemodule.md)
* [https://blog.najmanowicz.com/2014/11/01/sitecore-powershell-extensions-3-0-modules-proposal/](https://blog.najmanowicz.com/2014/11/01/sitecore-powershell-extensions-3-0-modules-proposal/) 
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

