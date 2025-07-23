# Update-SearchIndexItem

## Syntax

```powershell
Update-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Update-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Update-SearchIndexItem -SearchResultItem <SearchResultItem> [-AsJob]
```

## Detailed Description

 Updates an item in the specified index. Supports wildcard filtering for the index name.

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

The following updates the index for a given item and index name.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_master_index"
Update-SearchIndexItem -Item $item -Name $indexName
```

### EXAMPLE 2

The following updates the indexed item for the indexes matching the wildcard pattern.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_*_index"
Update-SearchIndexItem -Item $item -Name $indexName
```