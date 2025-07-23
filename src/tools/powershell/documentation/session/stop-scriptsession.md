# Stop-ScriptSession

Stops executing script session.

## Syntax

Stop-ScriptSession -Id &lt;String\[\]&gt;

Stop-ScriptSession -Session &lt;ScriptSession\[\]&gt;

## Detailed Description

Aborts the pipeline of a session that is executing. This will stop the session immediately in its next PowerShell command. Caution! If your script is running a long operation in the .net code rather than in PowerShell - the session will abort after the code has finished and the control was returned to the script.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Id  &lt;String\[\]&gt;

Stops the script session with the specified IDs. The ID is a string that uniquely identifies the script session within the server. You can type one or more IDs \(separated by commas\). To find the ID of a script session, type "Get-ScriptSession" without parameters.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Session  &lt;ScriptSession\[\]&gt;

Specifies the script session to be stopped. Enter a variable that contains the script session or a command that gets the script session. You can also pipe a script session object to Receive-ScriptSession.

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

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Spe.Core.Host.ScriptSession

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
The following stops the script session with the specified Id.

PS master:\> Stop-ScriptSession -Id "My Background Script Session"
```

## Related Topics

* [Get-ScriptSession](get-scriptsession.md)
* [Receive-ScriptSession](receive-scriptsession.md)
* [Remove-ScriptSession](remove-scriptsession.md)
* [Start-ScriptSession](start-scriptsession.md)
* [Wait-ScriptSession](wait-scriptsession.md)
* [https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/](https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/) 
* [https://git.io/spe](https://git.io/spe) 

