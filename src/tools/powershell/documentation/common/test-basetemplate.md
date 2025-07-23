# Test-BaseTemplate

## Syntax

```powershell
Test-BaseTemplate -Item <Item> -TemplateItem <TemplateItem[]>
Test-BaseTemplate -Item <Item> -Template <String[]>
Test-BaseTemplate -Path <String> -TemplateItem <TemplateItem[]>
Test-BaseTemplate -Path <String> -Template <String[]>
Test-BaseTemplate -Id <String> -TemplateItem <TemplateItem[]>
Test-BaseTemplate -Id <String> -Template <String[]>
Test-BaseTemplate [-Database <String>]
```

## Detailed Description

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -TemplateItem  &lt;TemplateItem\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Template  &lt;String\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

The following example determines if the item inherits from the specified template.

```powershell
$item = Get-Item -Path "master:\content\home"
Test-BaseTemplate -Item $item -Template "Sample/Sample Content"

# Alternatively you can use the Template Id
Test-BaseTemplate -Item $item -Template "{76036F5E-CBCE-46D1-AF0A-4143F9B557AA}"
```
