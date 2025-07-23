# Get-Item

Gets Sitecore items from the specified drive.

## Syntax

```
Get-Item [-Path] <String[]> [-ID <ID>] [-Language <String[]>] [-Version <String>] [<CommonParameters>]

Get-Item [-Path] <String[]> [-Query <String>] [-Language <String[]>] [-Version <String>] [-AmbiguousPaths] [<CommonParameters>]

Get-Item [-Path] <String[]> [-Uri <String>] [-Language <String[]>] [-Version <String>] [<CommonParameters>]

Get-Item [-Path] <String[]> [-Database <String>] [-Language <String[]>] [-Version <String>]  [<CommonParameters>]
```

## Detailed Description

The Get-Item command unlocks the item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Path &lt;String&gt;

The path to the item. If the Database parameter is not provided, the path should include the database. For example, `"master:\content\home"`.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ID &lt;ID&gt;

The unique identifier for the item.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Query &lt;String&gt;

The Sitecore query or fast query to retrieve the item.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path &lt;String&gt;

Path to the item to be processed - can work with Language parameter to specify the language other than current session language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id &lt;String&gt;

Id of the item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database &lt;String&gt;

Database containing the item to be fetched with Id parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Language &lt;Language[]&gt;

Language(s) to use for filtering items.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Version &lt;String&gt;

Version number to use for filtering items.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet. Should be the path to an item.

* System.String 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

The following gets the item using the path.

```powershell
Get-Item -Path "master:\content\home"
```

### EXAMPLE 2

The following gets all items in the master database, located under Content, which are based on the template **Sample Item** using a Sitecore query.

```powershell
Get-Item -Path "master:" -Query "/sitecore/content//*[@@templatename='Sample Item']"
```

### EXAMPLE 3

The following gets the item in the master database with the specified `ID`.

```powershell
Get-Item -Path "master:" -ID "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
```

### EXAMPLE 4

The following gets the item in the master database using the Uri.

```powershell
Get-Item -Path "master:" -Uri "sitecore://master/{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}?lang=en&ver=1"
```

## Related Topics

* Get-ChildItem

