# Expand-Token

Expands tokens in fields for items.

## Syntax

Expand-Token \[-Item\] &lt;Item&gt; \[-Language &lt;String\[\]&gt;\]

Expand-Token \[-Path\] &lt;String&gt; \[-Language &lt;String\[\]&gt;\]

Expand-Token -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

The Expand-Token command expands the tokens in fields for items.

Some example of tokens include:

* $name
* $time 

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Language  &lt;String\[\]&gt;

Language that will be processed. If not specified the current user language will be used. Globbing/wildcard supported.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed - additionally specify Language parameter to fetch different item language than the current user language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
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

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

The following expands tokens in fields on the item.

```powershell
Get-Item -Path "master:\content\home" | Expand-Token
```

### EXAMPLE 2

The following expands tokens in fields on the item. If the standard value of the field contains a token we modify the field to the token so the expansion will work (Sitecore API does not expand if the field is the same as Standard Values and never modified).

```powershell
$tokens = @('$name', '$id', '$parentId', '$parentname', '$date', '$time', '$now')

$item = Get-Item -Path "master:\content\home"

$standardValueFields = Get-ItemField -Item $item -ReturnType Field -Name "*" `
    | Where-Object { $_.ContainsStandardValue }
    
$item.Editing.BeginEdit()

foreach ($field in $standardValueFields) {
    $value = $field.Value
    
    if ($tokens -contains $value) {
        $item[$field.Name] = $value
    }
}

$item.Editing.EndEdit()

Expand-Token -Item $item
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://sitecorejunkie.com/2014/05/27/launch-powershell-scripts-in-the-item-context-menu-using-sitecore-powershell-extensions/](https://sitecorejunkie.com/2014/05/27/launch-powershell-scripts-in-the-item-context-menu-using-sitecore-powershell-extensions/) 
* [https://sitecorejunkie.com/2014/06/02/make-bulk-item-updates-using-sitecore-powershell-extensions/](https://sitecorejunkie.com/2014/06/02/make-bulk-item-updates-using-sitecore-powershell-extensions/) 

