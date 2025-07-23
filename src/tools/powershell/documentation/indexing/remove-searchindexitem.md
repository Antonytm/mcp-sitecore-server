# Remove-SearchIndexItem

## Syntax

```powershell
Remove-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Remove-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Remove-SearchIndexItem -SearchResultItem <SearchResultItem> [-AsJob]
```

## Detailed Description

Removes an indexed item from the specified index. Supports wildcard filtering for the index name.

© 2010-2020 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -SearchResultItem  &lt;SearchResultItem&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -AsJob  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Examples

### EXAMPLE 1

The following removes the indexed item from the specified search index.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_master_index"
Remove-SearchIndexItem -Item $item -Name $indexName
```

### EXAMPLE 2

The following removes the indexed item from the indexes matching the wildcard pattern.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_*_index"
Remove-SearchIndexItem -Item $item -Name $indexName
```