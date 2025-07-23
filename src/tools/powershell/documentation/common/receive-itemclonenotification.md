# Receive-ItemCloneNotification

## Syntax

```powershell
Receive-ItemCloneNotification [-Notification <Notification>] -Notification <Notification> -Action <None | Accept | Reject | Dismiss> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
Receive-ItemCloneNotification [-Item] <Item> -Notification <Notification> -Action <None | Accept | Reject | Dismiss> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
Receive-ItemCloneNotification [-Path] <String> -Notification <Notification> -Action <None | Accept | Reject | Dismiss> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
Receive-ItemCloneNotification -Id <String> [-Database <String>] -Notification <Notification> -Action <None | Accept | Reject | Dismiss> [-NotificationType <Notification | ChildCreatedNotification | FieldChangedNotification | FirstVersionAddedNotification | ItemMovedChildCreatedNotification | ItemMovedChildRemovedNotification | ItemMovedNotification | ItemTreeMovedNotification | ItemVersionNotification | OriginalItemChangedTemplateNotification | VersionAddedNotification>] [-Language <String[]>]
```

## Detailed Description

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Notification  &lt;Notification&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Action  &lt;NotificationAction&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

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

The following gets the cloned `Item`, returns the available notifications, and finally accepts the notifications.

```powershell
$clonedItem = Get-Item -Path "master:" -ID "{9F158637-52C2-4005-8329-21527685CB71}"
$clonedItem  | Get-ItemCloneNotification | Receive-ItemCloneNotification -Action Accept
```

### EXAMPLE 2

The following gets the cloned `Item`, returns the available notifications, and finally rejects the notifications.

```powershell
$clonedItem = Get-Item -Path "master:" -ID "{9F158637-52C2-4005-8329-21527685CB71}"
$clonedItem  | Get-ItemCloneNotification | Receive-ItemCloneNotification -Action Reject
```
