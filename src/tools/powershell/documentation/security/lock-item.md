# Lock-Item

Locks the Sitecore item by the current or specified user.

## Syntax

Lock-Item \[-Item\] &lt;Item&gt; \[-Force\] \[-PassThru\] \[-Identity &lt;AccountIdentity&gt;\]

Lock-Item \[-Path\] &lt;String&gt; \[-Force\] \[-PassThru\] \[-Identity &lt;AccountIdentity&gt;\]

Lock-Item -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-Force\] \[-PassThru\] \[-Identity &lt;AccountIdentity&gt;\]

## Detailed Description

The Lock-Item command unlocks the item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Force  &lt;SwitchParameter&gt;

Forces the item to be locked by the specified user even if it's currently locked by another user.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PassThru  &lt;SwitchParameter&gt;

Passes the processed object back into the pipeline.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Identity  &lt;AccountIdentity&gt;

User name including domain for which the item is to be locked. If no domain is specified - 'sitecore' will be used as the default domain.

Specifies the Sitecore user by providing one of the following values.

```powershell
Local Name
    Example: adam
Fully Qualified Name
    Example: sitecore\adam 
```

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed - can work with Language parameter to specify the language other than current session language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be fetched with Id parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* can be piped from another cmdlet\* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Only if -PassThru is used\* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Lock the Home item providing its path

```powershell
PS master:\> Lock-Item -Path master:\content\home
```

### EXAMPLE 2

Lock the Home item by providing it from the pipeline and passing it back to the pipeline. The Item is locked by the "sitecore\adam" user.

```powershell
PS master:\> Get-Item -Path master:\content\home | Lock-Item -PassThru -Identity sitecore\adam

Name   Children Languages                Id                                     TemplateName
----   -------- ---------                --                                     ------------
Home   False    {en, ja-JP, de-DE, da}   {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Unlock-Item](https://github.com/SitecorePowerShell/Book/tree/bfef3ab0ca500162f7287e1fd4fa14bb4f6a760b/appendix/commands/Unlock-Item.md)
* Get-Item

