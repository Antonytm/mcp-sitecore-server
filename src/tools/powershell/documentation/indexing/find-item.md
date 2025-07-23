# Find-Item

Finds items using the Sitecore Content Search API.

## Syntax

```powershell
Find-Item [-Index] <String> [-Criteria <SearchCriteria[]>] [-QueryType <Type>] [-OrderBy <String>] [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [<CommonParameters>]
Find-Item [-Index] <String> [-Where <String>] [-WhereValues <Object[]>] [-Filter <String>] [-FilterValues <Object[]>] [-FacetOn <String[]>] [-FacetMinCount <Int32>] [-QueryType <Type>] [-OrderBy <String>] [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [<CommonParameters>]
Find-Item [-Index] <String> [-WherePredicate <Expression<Func<SearchResultItem, bool>>>] [-FilterPredicate <Expression<Func<SearchResultItem, bool>>>] [-QueryType <Type>] [-OrderBy <String>] [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [<CommonParameters>]
Find-Item [-Index] <String> [-ScopeQuery <String>] [-QueryType <Type>] [-OrderBy <String>] [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [<CommonParameters>]
```

## Detailed Description

The Find-Item command searches for items using the Sitecore Content Search API. The type `SearchResultItem` is used as the type when working with `IQueryable`.

© 2010-2020 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Index  &lt;String&gt;

Name of the Index that will be used for the search:

Find-Item -Index sitecore\_master\_index -First 10

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Criteria  &lt;SearchCriteria\[\]&gt;

Simple form of search in which logical "AND" operations are needed.

```powershell
@{ Filter = "Equals"; Field = "_templatename"; Value = "Sample Item"; }, 
@{ Filter = "DescendantOf"; Value = (Get-Item "master:/content/") }
```

Where "Filter" is one of the following values:

* Equals
* StartsWith
* Contains
* ContainsAny
* ContainsAll
* EndsWith
* DescendantOf - performs a _Contains_ with the field **\_path**
* Fuzzy
* InclusiveRange - performs a _Between_ using `int`, `double`, `datetime`, and `string`types
* ExclusiveRange - same as _InclusiveRange_
* MatchesRegex - use something like `^.*$`
* MatchesWildcard - use something like `H?li*m`
* LessThan
* GreaterThan

Where "Field" is the Index Field name found on the `SearchResultItem` such as the following:

* \_\_smallcreateddate - CreatedDate
* \_\_smallupdateddate - Updated
* \_group - ID
* \_template - TemplateId
* \_templatename - TemplateName
* \_fullpath - Path

Where "Value" is one of the following:

* string
* string\[\]
* Sitecore.Data.ID
* Sitecore.Data.Items.Item
* Sitecore.Data.Items.Item\[\]
* object\[\] - when using `@()` you'll get this type, which will be treated as an array of strings
* PSObject\[\]
* System.Collections.ArrayList
* System.Collections.Generics.List&lt;string&gt;

Where "Boost" is a positive number greater than 0

Fields by which you can filter can be discovered using the following script:

```powershell
$criteria = @(
    @{Filter = "StartsWith"; Field = "_fullpath"; Value = "/sitecore/content/" }
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props -First 1 | Select-Object -Expand "Fields"
```

Where "Invert" is a boolean to indicate the following:

* $false - This is the default value. Do exactly as the query is defined.
* $true - Reverse the logic. For example, "Contains" is treated like "NotContains", "Equals" is treated like "NotEquals".

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Where  &lt;String&gt;

Where the "Where" is the Dynamic Linq query and "WhereValues" includes the array of values to be replaced in the query.

```powershell
$props = @{
    Index = "sitecore_master_index"
    Where = 'TemplateName = @0 And Language=@1'
    WhereValues = "Sample Item", "en"
}

Find-Item @props
```

Filtering Criteria using Dynamic Linq syntax: [https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library](https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library)

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -WhereValues  &lt;Object\[\]&gt;

An Array of objects for Dynamic Linq "-Where" parameter as explained in: [https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library](https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library)

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Filter  &lt;String&gt;

Where the "Filter" is the Dynamic Linq query and "FilterValues" includes the array of values to be replaced in the query.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -FilterValues  &lt;Object\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -WherePredicate  &lt;Expression&lt;Func&lt;SearchResultItem,bool&gt;&gt;&gt;

Use the `New-SearchPredicate` command to build the appropriate predicates.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -FilterPredicate  &lt;Expression&lt;Func&lt;SearchResultItem,bool&gt;&gt;&gt;

Use the `New-SearchPredicate` command to build the appropriate predicates.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ScopeQuery  &lt;String&gt;

When combined with the Query Builder field, a simple query can be crafted to return search results.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -OrderBy  &lt;String&gt;

Field by which the search results sorting should be performed. This is the .Net Property name as see on the SearchResultItem class. Dynamic Linq ordering syntax used. [https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library](https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library)

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -First  &lt;Int32&gt;

Number of returned search results.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Last  &lt;Int32&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Skip  &lt;Int32&gt;

Number of search results to be skipped skip before returning the results commences.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Property  &lt;String\[\]&gt;

An array of property names which match with the `SearchResultItem` type. 

**Note:** The use of `Initialize-Item` is not supported because the object returned is no longer a `SearchResultItem` and therefore unable to guarantee that `Item` objects can be returned. [#1123](https://github.com/SitecorePowerShell/Console/issues/1123)

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.ContentSearch.SearchTypes.SearchResultItem 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Fields by which filtering can be performed using the -Criteria parameter.

```powershell
$criteria = @(
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Item"}, 
    @{Filter = "Contains"; Field = "Title"; Value = "Sitecore"},
    @{Filter = "Contains"; Field = "Title"; Value = "Powerful ways"; "Invert" = $true}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props
```

### EXAMPLE 2

Find items using a search built by the Query Builder field.

```powershell
$props = @{
    Index = "sitecore_master_index"
    ScopeQuery = "location:{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9};custom:title|Sitecore"
}

Find-Item @props
```

### EXAMPLE 3

Find all items of template "Sample Item" which are in "English" under the "Home" item using Dynamic LINQ syntax.

```powershell
$templateId = [ID]::Parse("{76036F5E-CBCE-46D1-AF0A-4143F9B557AA}")
$homeId = [ID]::Parse("{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}")
$language = "en"

$props = @{
    Index = "sitecore_master_index"
    Where = 'TemplateId = @0 And Language=@1 And Paths.Contains(@2)'
    WhereValues = $templateId, $language, $homeId
}

Find-Item @props
```

### EXAMPLE 4

Find items using a complex search predicate.

```powershell
$criteriaTemplate = @(
    @{Filter = "Equals"; Field = "_templatename"; Value = "Template Field"; }, 
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Item"; Boost=25; }, 
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Content"; }
)

$predicateTemplate = New-SearchPredicate -Operation Or -Criteria $criteriaTemplate

$criteriaContent = @{Filter = "Contains"; Field = "Title"; Value = 'Sitecore'}
$predicateTitle = New-SearchPredicate -Criteria $criteriaContent

$predicateTemplateAndTitle = New-SearchPredicate -First $predicateTemplate -Second $predicateTitle -Operation And

$root = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$criteriaRoot = @{Filter = "DescendantOf"; Value = $root }
$predicateRoot = New-SearchPredicate -Criteria $criteriaRoot

$predicate = New-SearchPredicate -First $predicateRoot -Second $predicateTemplateAndTitle -Operation And

$props = @{
    Index = "sitecore_master_index"
    WherePredicate = $predicate
}

Find-Item @props
```

### EXAMPLE 5

Find items using logical AND conditions with ContainsAny. Demonstrates that different array types are handled.

**Note:** When searching for `ID`s you can use the proper type like `[ID[]]@("{C852E80E-ED49-4354-A397-6F66487F0E26}")` so SPE will handle the conversion to `ShortID`.

```powershell
$criteria = @(
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Content"; Boost=25; },
    @{Filter = "ContainsAny"; Field = "Title"; Value = [string[]]@('$name','$date')},
    @{Filter = "ContainsAny"; Field = "Title"; Value = @('$name','$date')},
    @{Filter = "ContainsAny"; Field = "Title"; Value = [System.Collections.ArrayList]@('$name','$date')},
    @{Filter = "ContainsAny"; Field = "Title"; Value = [System.Collections.Generic.List[string]]@('$name','$date')}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props
```

### EXAMPLE 6

Find items using logical AND with ContainsAll. Demonstrates looking in multilist fields.

```powershell
$criteria = @(
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Content"; Boost=25; },
    @{Filter = "ContainsAll"; Field = "RelatedImages"; Value = @('{4D427A1D-312D-4EEE-A519-1F5700675BAF}','{4B603402-62AB-4ECB-9CAE-98790DDBC35A}')}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props
```

### EXAMPLE 7

Find an item by ID.

```powershell
$criteria = @(
    @{Filter = "Equals"; Field = "_group"; Value = "{C89D37FF-3919-4D69-9925-943B67BD22D6}"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}
Find-Item @props
```

### EXAMPLE 8

Find items within a data range. Possible filters are `InclusiveRange` and `ExclusiveRange` . When using dates, only **yyyyMMdd** is considered in the comparison so no need to get too precise.

```powershell
$props = @{
    Index = "sitecore_master_index"
    Criteria = @{
        Field = "__smallcreateddate"
        Filter = "InclusiveRange"
        Value = [datetime[]]@([datetime]"01/05/2015", [datetime]::Today)
    }, @{
        Field = "_name"
        Filter = "Fuzzy"
        Value = "sample"
    }
}

Find-Item @props
```

### EXAMPLE 9

Find and count all items beneath a root item using the item path.

```powershell
$criteria = @(
    @{Filter = "Contains"; Field = "_fullpath"; Value = "/sitecore/content/home"},
    @{Filter = "Equals"; Field = "_latestversion"; Value = "1"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props | Measure-Object
```

### EXAMPLE 10

Find and count all items beneath a root item using the item id.

```powershell
$criteria = @(
    @{Filter = "Contains"; Field = "_path"; Value = "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"},
    @{Filter = "Equals"; Field = "_latestversion"; Value = "1"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props | Measure-Object
```

### EXAMPLE 11

Find items and sort (boost) based on the date field. If this were used on a field containing future dates you should expect to see them mixed with past dates. This example demonstrates using Solr functions.

```powershell
$criteria = @(
    @{Filter = "Equals"; Field = "_val_"; Value = "recip(abs(ms(NOW/HOUR,__smallcreateddate_tdt)),3.16e-11,4,.4)"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props | Select-Object Name,CreatedDate
```

### EXAMPLE 12

Find items where the created date is older than the specified time in UTC.

```powershell
$date = New-Object DateTime 2019, 8, 1, 0, 0, 0, ([DateTimeKind]::Utc)

$criteria = @(
    @{Filter = "LessThan"; Field = "__smallupdateddate"; Value = $date} 
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

Find-Item @props
```

### EXAMPLE 13

Find items where the title contains the specified value. A custom implementation of `SearchResultItem` is used to enable the use of the property `Title` in the Dynamic Query.

```powershell
class TitleSearchResultItem : SearchResultItem
{
   [Sitecore.ContentSearch.IndexField("title")]
   [string]$Title
}

$props = @{
    Index = "sitecore_master_index"
    Where = "Title.Contains(@0)"
    WhereValues = "great"
    QueryType = [TitleSearchResultItem]
}

Find-Item @props
```

### EXAMPLE 14

Find items where the path contains the specified Id and base templates contain the specified Id using a Dynamic Query. A custom implementation of `SearchResultItem` is used to enable the use of the property `TemplateIds` in the Dynamic Query.

```powershell
class TemplatesSearchResultItem : SearchResultItem
{
   # For items contained within an SXA index try using the name "inheritance_sm".
   [Sitecore.ContentSearch.IndexField("_templates")]
   [System.Collections.Generic.List[ID]]$TemplateIds
}

$props = @{
    Index = "sitecore_master_index"
    Where = "Paths.Contains(@0) And TemplateIds.Contains(@1)"
    WhereValues = [ID]::Parse("{371EEE15-B6F3-423A-BB25-0B5CED860EEA}"), [ID]::Parse("{B0B6FB08-6BBE-43F2-8E36-FCE228325B63}")
    QueryType = [TemplatesSearchResultItem]
}

Find-Item @props
```

### EXAMPLE 15

Find items where the title contains "Sitecore" using a Scope Query. A custom implementation of `SearchResultItem` is used to enable the use of the property `Title` in the Scope Query.

```powershell
class TitleSearchResultItem : SearchResultItem
{
   [Sitecore.ContentSearch.IndexField("title")]
   [string]$Title
}

$props = @{
    Index = "sitecore_master_index"
    ScopeQuery = "location:{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9};custom:title|Sitecore"
    QueryType = [TitleSearchResultItem]
}

Find-Item @props | Select-Object -Property Title
```

### EXAMPLE 16

Find items where the template is "Sample Content" and the title contains "Sitecore" and created by "admin" using the Criteria Query. A custom implementation of `SearchResultItem` is used to enable the use of the property `Title` and `Creator` in the Dynamic Query.

```powershell
class TitleSearchResultItem : SearchResultItem
{
   [Sitecore.ContentSearch.IndexField("title")]
   [string]$Title
   [Sitecore.ContentSearch.IndexField("_creator")]
   [string]$Creator
}

$criteria = @(
    @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Content"}, 
    @{Filter = "Contains"; Field = "Title"; Value = "Sitecore"},
    @{Filter = "Contains"; Field = "_creator"; Value = "admin"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
    QueryType = [TitleSearchResultItem]
}

Find-Item @props
```

### EXAMPLE 17

Find items matching a complex query. A custom implementation of `SearchResultItem` is used to enable the use of the property `Title` in the Predicate Query.

```powershell
class TitleSearchResultItem : SearchResultItem
{
   [Sitecore.ContentSearch.IndexField("title")]
   [string]$Title
}

$criteriaTemplate = @{Filter = "Equals"; Field = "_templatename"; Value = "Template Field"; }, @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Item"; Boost=25; }, @{Filter = "Equals"; Field = "_templatename"; Value = "Sample Content"; }
$predicateTemplate = New-SearchPredicate -Operation Or -Criteria $criteriaTemplate -QueryType ([TitleSearchResultItem])

$criteriaContent = @{Filter = "Contains"; Field = "Title"; Value = 'Sitecore'}
$predicateTitle = New-SearchPredicate -Criteria $criteriaContent -QueryType ([TitleSearchResultItem])

$predicateTemplateAndTitle = New-SearchPredicate -First $predicateTemplate -Second $predicateTitle -Operation And -QueryType ([TitleSearchResultItem])

$root = Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
$criteriaRoot = @{Filter = "DescendantOf"; Value = $root }
$predicateRoot = New-SearchPredicate -Criteria $criteriaRoot -QueryType ([TitleSearchResultItem])

$predicate = New-SearchPredicate -First $predicateRoot -Second $predicateTemplateAndTitle -Operation And -QueryType ([TitleSearchResultItem])

$props = @{
    Index = "sitecore_master_index"
    WherePredicate = $predicate
    QueryType = [TitleSearchResultItem]
}

Find-Item @props
```

### EXAMPLE 18

Find items under the Content tree where the language is "en" and there are more than two occurrences. This could be used to find duplicate item names at the same path.

```powershell
$props = @{
    Index = "sitecore_master_index"
    Where = 'Paths.Contains(@0)'
    WhereValues = [ID]::Parse("{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}")
    Filter = 'Language = @0'
    FilterValues = "en"
    FacetOn = "Path"
    FacetMinCount = 2
}

Find-Item @props | Select-Object -Expand Categories | Select-Object -Expand Values
```

### EXAMPLE 19

Find the most recently updated item.

```powershell
$templateId = "{C382C7B8-7567-40CB-AE89-7F5680735D4E}"
$criteria = @(
    @{Filter = "Equals"; Field = "_template"; Value = $templateId}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
    OrderBy = "Updated"
    Last = 1
}

Find-Item @props | Select-Object -Property ItemId, Name, Path, Updated
```

### EXAMPLE 20

Find items where the expiration date has not passed (now to the future) or the expiration date is empty (never expires).

```powershell
$props = @{
    Index = "sitecore_master_index"
    ScopeQuery = "+location:{447D82A5-BDBD-4898-8598-D79B3EB9BE6D};+template:{51ED5851-1A61-4DAE-B803-6C7FAE6B43D8};custom:EventEndDate|[* TO NOW-100YEARS];custom:EventEndDate|[NOW TO *];"
}

Find-Item @props
```

### EXAMPLE 21

Use Skip and Take to page through results until all are returned.

```powershell
$criteria = @(
    @{Filter = "Contains"; Field = "_fullpath"; Value = "/sitecore/content/home"},
    @{Filter = "Equals"; Field = "_latestversion"; Value = "1"}
)
$props = @{
    Index = "sitecore_master_index"
    Criteria = $criteria
}

$searchItems = [System.Collections.ArrayList]@()
$pageSize = 250
$offset = 0
$keepGoing = $true
while($keepGoing) {
    $pagedItems = @(Find-Item @props -Skip $offset -First $pageSize)
    if($pagedItems) {
        $lastCount = $pagedItems.Count
        $offset += $lastCount
        $searchItems.AddRange($pagedItems) > $null
    } else {
        $keepGoing = $false
    }
}

$searchItems

```

## Related Topics

* [Initialize-Item](initialize-item.md)
* [https://gist.github.com/AdamNaj/273458beb3f2b179a0b6](https://gist.github.com/AdamNaj/273458beb3f2b179a0b6) 
* [https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library](https://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library) 
* [#1128](https://github.com/SitecorePowerShell/Console/issues/1128) Added support for GreaterThan and LessThan
* [#1120](https://github.com/SitecorePowerShell/Console/issues/1120) Added support for custom `SearchResultItem` type
* [#1174](https://github.com/SitecorePowerShell/Console/issues/1174) Added support for Facet
* [#1176](https://github.com/SitecorePowerShell/Console/issues/1176) Added support for Filter

