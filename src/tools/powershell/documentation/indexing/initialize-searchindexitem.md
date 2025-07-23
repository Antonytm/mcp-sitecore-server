# Initialize-SearchIndexItem

## Syntax

```powershell
Initialize-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Initialize-SearchIndexItem -Item <Item> [-Name <String>] [-AsJob]
Initialize-SearchIndexItem -SearchResultItem <SearchResultItem> [-AsJob]
```

## Detailed Description

Rebuilds the index for a given tree with the specified root item and index name. Supports wildcard filtering for the index name.

© 2010-2020 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Aliases

The following abbreviations are aliases for this cmdlet:

* Rebuild-SearchIndexItem 

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

The following rebuilds the index for a given tree with the specified root node and index name.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_master_index"
Initialize-SearchIndexItem -Item $item -Name $indexName
```

### EXAMPLE 2

The following rebuilds the indexes matching the wildcard pattern for a given tree with the specified root node and index name.

```powershell
$item = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$indexName = "sitecore_*_index"
Initialize-SearchIndexItem -Item $item -Name $indexName
```