# Remove-ScriptSession

Removes a persistent Script Session from memory.

## Syntax

Remove-ScriptSession -Id &lt;String\[\]&gt;

Remove-ScriptSession -Session &lt;ScriptSession\[\]&gt;

## Detailed Description

Removes a persistent Script Session from memory.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Id  &lt;String\[\]&gt;

Id of the PowerShell session to be removed from memory.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Session  &lt;ScriptSession\[\]&gt;

Session to be removed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.String or Spe.Core.Host.ScriptSession

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
The following removes the script session using the specified Id.

PS master:\> Remove-ScriptSession -Id "Long running script"
```

## Related Topics

* [Get-ScriptSession](get-scriptsession.md)
* [Receive-ScriptSession](receive-scriptsession.md)
* [Start-ScriptSession](start-scriptsession.md)
* [Stop-ScriptSession](stop-scriptsession.md)
* [Wait-ScriptSession](wait-scriptsession.md)
* [https://git.io/spe](https://git.io/spe) 
* [https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/](https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/) 

