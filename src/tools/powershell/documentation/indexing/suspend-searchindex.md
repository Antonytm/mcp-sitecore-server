# Suspend-SearchIndex

Suspends \(pauses\) the Sitecore index.

## Syntax

Suspend-SearchIndex -Index &lt;ISearchIndex&gt;

Suspend-SearchIndex \[-Name &lt;String&gt;\]

Suspend-SearchIndex \[-Name &lt;String&gt;\]

## Detailed Description

The Suspend-SearchIndex command suspends \(pauses\) the Sitecore index.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Index  &lt;ISearchIndex&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

The name of the index to suspend \(pause\).

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.ContentSearch.ISearchIndex or System.String 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* None 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
The following suspends (pauses) the indexing process from running.

PS master:\> Suspend-SearchIndex -Name sitecore_master_index
```

### EXAMPLE 2

```powershell
The following suspends (pauses) the indexing process from running.

PS master:\> Get-SearchIndex -Name sitecore_master_index | Suspend-SearchIndex
```

## Related Topics

* [Initialize-SearchIndex](initialize-searchindex.md)
* [Stop-SearchIndex](stop-searchindex.md)
* [Resume-SearchIndex](resume-searchindex.md)
* [Get-SearchIndex](get-searchindex.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

