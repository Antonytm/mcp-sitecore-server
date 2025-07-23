# Wait-ScriptSession

Suppresses script execution command prompt until one or all of the script sessions provided are complete.

## Syntax

Wait-ScriptSession -Id &lt;String\[\]&gt; \[-Timeout &lt;Int32&gt;\] \[-Any\]

Wait-ScriptSession -Session &lt;ScriptSession\[\]&gt; \[-Timeout &lt;Int32&gt;\] \[-Any\]

## Detailed Description

The Wait-ScriptSession cmdlet waits for script session to complete before it displays the command prompt or allows the script to continue. You can wait until any script session is complete, or until all script sessions are complete, and you can set a maximum wait time for the script session. When the commands in the script session are complete, Wait-ScriptSession displays the command prompt and returns a script session object so that you can pipe it to another command. You can use Wait-ScriptSession cmdlet to wait for script sessions, such as those that were started by using the Start-ScriptSession cmdlet.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Timeout  &lt;Int32&gt;

The maximum time to wait for all the other running script sessions to complete.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Any  &lt;SwitchParameter&gt;

Returns control to the script or displays the command prompt \(and returns the ScriptSession object\) when any script session completes. By default, Wait-ScriptSession waits until all of the specified jobs are complete before displaying the prompt.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String\[\]&gt;

Id\(s\) of the session to be stopped.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Session  &lt;ScriptSession\[\]&gt;

Session\(s\) to be stopped.

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
PS master:\> Wait-ScriptSession -Id "My Background Script Session"
```

## Related Topics

* [Get-ScriptSession](get-scriptsession.md)
* [Receive-ScriptSession](receive-scriptsession.md)
* [Remove-ScriptSession](remove-scriptsession.md)
* [Start-ScriptSession](start-scriptsession.md)
* [Stop-ScriptSession](stop-scriptsession.md)
* [https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/](https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/) 
* [https://git.io/spe](https://git.io/spe) 

