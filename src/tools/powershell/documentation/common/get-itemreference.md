# Get-ItemReference

Returns all the items linked to the specified item..

## Syntax

Get-ItemReference -Item &lt;Item&gt;

Get-ItemReference -Item &lt;Item&gt; -ItemLink

Get-ItemReference -Path &lt;String&gt; \[-Language &lt;String\[\]&gt;\]

Get-ItemReference -Path &lt;String&gt; \[-Language &lt;String\[\]&gt;\] -ItemLink

Get-ItemReference -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

Get-ItemReference -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\] -ItemLink

## Detailed Description

The Get-ItemReference command returns all items linked to the specified item. If -ItemLink parameter is used the command will return links rather than items.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

The item to be analysed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the the item to be processed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be processed - can work with Language parameter to narrow the publication scope.

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

### -ItemLink  &lt;SwitchParameter&gt;

Return ItemLink that define both source and target of a link rather than items that are being linked to from the specified item.

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

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Items.Item

  Sitecore.Links.ItemLink

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\>Get-ItemReference -Path master:\content\home

Name                             Children Languages                Id                                     TemplateName
----                             -------- ---------                --                                     ------------
Home                             True     {en, de-DE, es-ES, pt... {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
Home                             True     {en, de-DE, es-ES, pt... {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

### EXAMPLE 2

```powershell
PS master:\>Get-Item master:\content\home | Get-ItemReference -ItemLink

SourceItemLanguage : en
SourceItemVersion  : 1
TargetItemLanguage :
TargetItemVersion  : 0
SourceDatabaseName : master
SourceFieldID      : {F685964D-02E1-4DB6-A0A2-BFA59F5F9806}
SourceItemID       : {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}
TargetDatabaseName : master
TargetItemID       : {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}
TargetPath         : /sitecore/content/Home
```

## Related Topics

* [Get-ItemReferrer](get-itemreferrer.md)
* [Update-ItemReferrer](update-itemreferrer.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

