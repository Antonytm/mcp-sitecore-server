# Publish-Item

Publishes a Sitecore item.

## Syntax

Publish-Item \[-Item\] &lt;Item&gt; \[-Recurse\] \[-Target &lt;String\[\]&gt;\] \[-PublishMode &lt;Unknown \| Full \| Incremental \| SingleItem \| Smart&gt;\] \[-PublishRelatedItems\] \[-RepublishAll\] \[-CompareRevisions\] \[-FromDate &lt;DateTime&gt;\] \[-AsJob\] \[-Language &lt;String\[\]&gt;\]

Publish-Item \[-Path\] &lt;String&gt; \[-Recurse\] \[-Target &lt;String\[\]&gt;\] \[-PublishMode &lt;Unknown \| Full \| Incremental \| SingleItem \| Smart&gt;\] \[-PublishRelatedItems\] \[-RepublishAll\] \[-CompareRevisions\] \[-FromDate &lt;DateTime&gt;\] \[-AsJob\] \[-Language &lt;String\[\]&gt;\]

Publish-Item -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Recurse\] \[-Target &lt;String\[\]&gt;\] \[-PublishMode &lt;Unknown \| Full \| Incremental \| SingleItem \| Smart&gt;\] \[-PublishRelatedItems\] \[-RepublishAll\] \[-CompareRevisions\] \[-FromDate &lt;DateTime&gt;\] \[-AsJob\] \[-Language &lt;String\[\]&gt;\]

## Detailed Description

The Publish-Item command publishes the Sitecore item and optionally subitems. Allowing for granular control over languages and modes of publishing.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Recurse  &lt;SwitchParameter&gt;

Specifies that subitems should also get published with the root item.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Target  &lt;String\[\]&gt;

Specifies one or many publishing targets. The default target database is "web".

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PublishMode  &lt;PublishMode&gt;

Specified the Publish mode. Valid values are:

* Full
* Incremental
* SingleItem
* Smart 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PublishRelatedItems  &lt;SwitchParameter&gt;

Turns publishing of related items on. Works only on Sitecore 7.2 or newer

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -RepublishAll  &lt;SwitchParameter&gt;

Republishes all items provided to the publishing job.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -CompareRevisions  &lt;SwitchParameter&gt;

Turns revision comparison on.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -FromDate  &lt;DateTime&gt;

Publishes items newer than the date provided only.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -AsJob  &lt;SwitchParameter&gt;

The Sitecore API called to perform the publish is different with this switch. You may find that events fire as expected using this.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

Language of the item that should be published. Supports globbing/wildcards. Allows for more than one language to be provided at once. e.g. "en\*", "pl-pl"

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item that should be published - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item that should be published - can work with Language parameter to narrow the publication scope.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

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

* None. 

## Notes

Help Author: Michael West, Adam Najmanowicz

## Examples

### EXAMPLE 1

```powershell
PS master:\> Publish-Item -Path master:\content\home -Target Internet
```

### EXAMPLE 2

```powershell
PS master:\> Get-Item -Path master:\content\home | Publish-Item -Recurse -PublishMode Incremental
```

### EXAMPLE 3

```powershell
PS master:\> Get-Item -Path master:\content\home | Publish-Item -Recurse -Language "en*"
```

### EXAMPLE 4
Publish to many databases
```text
PS master:\> $targets = [string[]]@('web','internet')
PS master:\> Publish-Item -Path master:\content\home -Target $targets
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

