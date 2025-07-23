# Get-ItemWorkflowEvent

Returns entries from the history store notifying of workflow state change for the specified item.

## Syntax

Get-ItemWorkflowEvent \[-Item\] &lt;Item&gt; \[-Identity &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

Get-ItemWorkflowEvent \[-Path\] &lt;String&gt; \[-Identity &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

Get-ItemWorkflowEvent -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Identity &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

The Get-ItemWorkflowEvent command returns entries from the history store notifying of workflow state change for the specified item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Identity  &lt;String&gt;

User that has been associated with the enteries. Wildcards are supported.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

Language that will be used as source language. If not specified the current user language will be used. Globbing/wildcard supported.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to have its history items returned.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to have its history items returned - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the the item to have its history items returned - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to have its history items returned - can work with Language parameter to narrow the publication scope.

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

* Sitecore.Workflows.WorkflowEvent 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Get-ItemWorkflowEvent -Path master:\content\home
Date     : 2014-07-27 14:23:33
NewState : {190B1C84-F1BE-47ED-AA41-F42193D9C8FC}
OldState : {46DA5376-10DC-4B66-B464-AFDAA29DE84F}
Text     : Automated
User     : sitecore\admin

Date     : 2014-08-01 15:43:29
NewState : {190B1C84-F1BE-47ED-AA41-F42193D9C8FC}
OldState : {190B1C84-F1BE-47ED-AA41-F42193D9C8FC}
Text     : Just leaving a note
User     : sitecore\admin
```

## Related Topics

* [New-ItemWorkflowEvent](new-itemworkflowevent.md)
* Execute-Workflow
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

