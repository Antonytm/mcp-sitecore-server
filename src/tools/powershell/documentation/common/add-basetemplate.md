# Add-BaseTemplate

Add one or more base templates to a template item.

## Syntax

Add-BaseTemplate -Item &lt;Item&gt; -TemplateItem &lt;TemplateItem\[\]&gt;

Add-BaseTemplate -Item &lt;Item&gt; -Template &lt;String\[\]&gt;

Add-BaseTemplate -Path &lt;String&gt; -TemplateItem &lt;TemplateItem\[\]&gt;

Add-BaseTemplate -Path &lt;String&gt; -Template &lt;String\[\]&gt;

Add-BaseTemplate -Id &lt;String&gt; -TemplateItem &lt;TemplateItem\[\]&gt;

Add-BaseTemplate -Id &lt;String&gt; -Template &lt;String\[\]&gt;

Add-BaseTemplate \[-Database &lt;String&gt;\]

## Detailed Description

The Add-BaseTemplate command adds one or more base templates to a template item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Item  &lt;Item&gt;

The item to add the base template to.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to add the base template to.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to add the base template to.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -TemplateItem  &lt;TemplateItem\[\]&gt;

Sitecore item or list of items of base templates to add.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Template  &lt;String\[\]&gt;

Path representing the template item to add as a base template. This must be of the same database as the item to be altered. Note that this parameter only supports a single template.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to add the base template to - required if item is specified with Id.

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

Help Author: Adam Najmanowicz, Michael West, Alex Washtell

## Examples

### EXAMPLE 1

Add base template of /sitecore/templates/User Defined/BaseTemplate to a template, using a path.

```powershell
PS master:\> Add-BaseTemplate -Path "master:/sitecore/content/User Defined/Page" -Template "/sitecore/templates/User Defined/BaseTemplate"
```

### EXAMPLE 2

Add multiple base templates to a template, using items.

```powershell
PS master:\> $baseA = Get-Item -Path master:/sitecore/content/User Defined/BaseTemplateA
       PS master:\> $baseB = Get-Item -Path master:/sitecore/content/User Defined/BaseTemplateB
       PS master:\> Add-BaseTemplate -Path "master:/sitecore/content/User Defined/Page" -TemplateItem @($baseA, $baseB)
```

## Related Topics

* [Remove-BaseTemplate](remove-basetemplate.md)
* [Get-ItemTemplate](get-itemtemplate.md)
* [Set-ItemTemplate](set-itemtemplate.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

