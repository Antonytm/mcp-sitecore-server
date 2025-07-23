# New-ItemWorkflowEvent

Creates new entry in the history store notifying of workflow state change.

## Syntax

New-ItemWorkflowEvent \[-Item\] &lt;Item&gt; \[-OldState &lt;String&gt;\] \[-NewState &lt;String&gt;\] \[-Text &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

New-ItemWorkflowEvent \[-Path\] &lt;String&gt; \[-OldState &lt;String&gt;\] \[-NewState &lt;String&gt;\] \[-Text &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

New-ItemWorkflowEvent -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-OldState &lt;String&gt;\] \[-NewState &lt;String&gt;\] \[-Text &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

Creates new entry in the history store notifying of workflow state change.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -OldState  &lt;String&gt;

Id of the old state. If not provided - current item workflow state will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -NewState  &lt;String&gt;

Id of the old state. If not provided - current item workflow state will be used.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Text  &lt;String&gt;

Action comment.

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

The item to have the history event attached.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to have the history event attached - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the the item to have the history event attached - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to have the history event attached - can work with Language parameter to narrow the publication scope.

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

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> New-ItemWorkflowEvent -Path master:\content\home -lanuage "en" -Text "Just leaving a note"
```

## Related Topics

* [Get-ItemWorkflowEvent](get-itemworkflowevent.md)
* Execute-Workflow
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

