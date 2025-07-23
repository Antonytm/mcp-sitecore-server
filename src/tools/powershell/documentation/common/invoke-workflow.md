# Invoke-Workflow

Executes Workflow action for an item. This command used to be named Execute-Workflow - a matching alias added for compatibility with older scripts.

## Syntax

Invoke-Workflow \[-Item\] &lt;Item&gt; \[-CommandName &lt;String&gt;\] \[-Comments &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

Invoke-Workflow \[-Path\] &lt;String&gt; \[-CommandName &lt;String&gt;\] \[-Comments &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

Invoke-Workflow -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-CommandName &lt;String&gt;\] \[-Comments &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

Executes Workflow action for an item. If the workflow action could not be performed for any reason - an appropriate error will be raised.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Execute-Workflow 

## Parameters

### -CommandName  &lt;String&gt;

Namer of the workflow command.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Comments  &lt;String&gt;

Comment to be saved in the history table for the action.

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

The item to have the workflow action executed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to have the workflow action executed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the the item to have the workflow action executed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to have the workflow action executed - can work with Language parameter to narrow the publication scope.

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

### EXAMPLE 1

Submit item to approval, item gotten from path

```powershell
PS master:\> Invoke-Workflow -Path master:/content/home -CommandName "Submit" -Comments "Automated"
```

### EXAMPLE 2

Reject item, item gotten from pipeline

```powershell
PS master:\> Get-Item master:/content/home | Invoke-Workflow -CommandName "Reject" -Comments "Automated"
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

