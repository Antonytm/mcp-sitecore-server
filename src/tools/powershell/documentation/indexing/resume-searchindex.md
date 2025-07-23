# Resume-SearchIndex

Resumes the suspended \(paused\) Sitecore index.

## Syntax

Resume-SearchIndex -Index &lt;ISearchIndex&gt;

Resume-SearchIndex \[-Name &lt;String&gt;\]

Resume-SearchIndex \[-Name &lt;String&gt;\]

## Detailed Description

The Resume-SearchIndex command resumes the suspended \(paused\) Sitecore index.

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

The name of the index to resume.

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
The following stops the indexing process from running.

PS master:\> Resume-SearchIndex -Name sitecore_master_index
```

### EXAMPLE 2

```powershell
The following stops the indexing process from running.

PS master:\> Get-SearchIndex -Name sitecore_master_index | Resume-SearchIndex
```

## Related Topics

* [Initialize-SearchIndex](initialize-searchindex.md)
* [Suspend-SearchIndex](suspend-searchindex.md)
* [Stop-SearchIndex](stop-searchindex.md)
* [Get-SearchIndex](get-searchindex.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

