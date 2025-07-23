# Unlock-Item

Unlocks the specified Sitecore item.

## Syntax

Unlock-Item \[-Item\] &lt;Item&gt; \[-PassThru\]

Unlock-Item \[-Path\] &lt;String&gt; \[-PassThru\]

Unlock-Item -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-PassThru\]

## Detailed Description

The Unlock-Item command unlocks the item specified with parameters.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -PassThru  &lt;SwitchParameter&gt;

Passes the unlocked item back into the pipeline.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be unlocked.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be unlocked - can work with Language parameter to specify the language other than current session language.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be unlocked.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

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

Unlock the Home item providing its path

```powershell
PS master:\> Unlock-Item -Path master:\content\home
```

### EXAMPLE 2

Unlock the Home item providing it from the pipeline and passing it back to the pipeline

```powershell
PS master:\> Get-Item -Path master:\content\home | Unlock-Item -PassThru

Name   Children Languages                Id                                     TemplateName
----   -------- ---------                --                                     ------------
Home   False    {en, ja-JP, de-DE, da}   {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Lock-Item](https://github.com/sitecorepowershell/sitecore-powershell-extensions/tree/b6365f8ecf54966c2e1757f549f543976500aa52/appendix/commands/Lock-Item.md)
* Get-Item

