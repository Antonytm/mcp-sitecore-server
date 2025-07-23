# Get-ScriptSession

Returns the list of PowerShell Extensions script sessions running in the system.

## Syntax

Get-ScriptSession -Current \[-SessionType &lt;String\[\]&gt;\] \[-State &lt;None \| Available \| AvailableForNestedCommand \| Busy \| RemoteDebug&gt;\]

Get-ScriptSession -Id &lt;String\[\]&gt; \[-SessionType &lt;String\[\]&gt;\] \[-State &lt;None \| Available \| AvailableForNestedCommand \| Busy \| RemoteDebug&gt;\]

Get-ScriptSession -Session &lt;ScriptSession\[\]&gt; \[-SessionType &lt;String\[\]&gt;\] \[-State &lt;None \| Available \| AvailableForNestedCommand \| Busy \| RemoteDebug&gt;\]

## Detailed Description

The Get-ScriptSession command returns the list of PowerShell Extensions script sessions running in the system. To find all script sessions, running in the system type "Get-ScriptSession" without parameters.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Current  &lt;SwitchParameter&gt;

Returns current script session if the session is run in a background job.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -SessionType  &lt;String\[\]&gt;

Type of the script session to be retrieved. The SessionType is a string that identifies where the session has been launched. You can type one or more session types \(separated by commas\) and use wildcards to filter. To find currently running types of a script session, type "Get-ScriptSession" without parameters.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -State  &lt;RunspaceAvailability&gt;

Type of the script session to be retrieved. The parameter limits script sessions to be returned to only those in a specific state, the values should be "Busy" or "Available". To find states of currently running script sessions, type "Get-ScriptSession" without parameters.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String\[\]&gt;

Gets the script session with the specified IDs. The ID is a string that uniquely identifies the script session within the server. You can type one or more IDs \(separated by commas\). To find the ID of a script session, type "Get-ScriptSession" without parameters.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Session  &lt;ScriptSession\[\]&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* None 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Spe.Core.Host.ScriptSession 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\>Get-ScriptSession

Type         Key                                                                              Location                                 Auto Disposed
----         ---                                                                              --------                                 -------------
Console      $scriptSession$|zwlyrcmmzwisv22djsv0ej2a|8d5c3e63-3fed-0532-e7c5-761760567b83                                             False
Context      $scriptSession$|zwlyrcmmzwisv22djsv0ej2a|renderingCopySession                    master:\content\Home                     False
Context      $scriptSession$|zwlyrcmmzwisv22djsv0ej2a|packageBuilder                          master:\content\Home                     False
```

### EXAMPLE 2

```powershell
PS master:\>Get-ScriptSession -Current

Type         Key                                                                              Location                                 Auto Disposed
----         ---                                                                              --------                                 -------------
Console      $scriptSession$|zwlyrcmmzwisv22djsv0ej2a|8d5c3e63-3fed-0532-e7c5-761760567b83                                             False
```

## Related Topics

* [Receive-ScriptSession](receive-scriptsession.md)
* [Remove-ScriptSession](remove-scriptsession.md)
* [Start-ScriptSession](start-scriptsession.md)
* [Stop-ScriptSession](stop-scriptsession.md)
* [Wait-ScriptSession](wait-scriptsession.md)
* [https://git.io/spe](https://git.io/spe) 
* [https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/](https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/) 

