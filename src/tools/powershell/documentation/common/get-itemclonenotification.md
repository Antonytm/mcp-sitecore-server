# Get-ItemCloneNotification

## Syntax

```powershell
Get-ItemCloneNotification [-Item] <Item> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
Get-ItemCloneNotification [-Path] <String> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
Get-ItemCloneNotification -Id <String> [-Database <String>] [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
```

## Detailed Description

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -NotificationType  &lt;NotificationType&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language  &lt;String\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
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

### -Database  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Examples

### EXAMPLE 1

The following gets the cloned `Item` and returns the available notifications.

```powershell
$clonedItem = Get-Item -Path "master:" -ID "{9F158637-52C2-4005-8329-21527685CB71}"
Get-ItemCloneNotification -Item $clonedItem
```

### EXAMPLE 2

The following gets the cloned `Item` based on the specified type of notification.

```powershell
$clonedItem = Get-Item -Path "master:" -ID "{9F158637-52C2-4005-8329-21527685CB71}"
$clonedItem | Get-ItemCloneNotification -NotificationType ItemMovedChildRemovedNotification
```
