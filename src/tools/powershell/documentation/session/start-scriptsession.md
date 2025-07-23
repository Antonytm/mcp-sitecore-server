# Start-ScriptSession

Starts a new Script Session and executes a script provided in it.

## Syntax

Start-ScriptSession -Id &lt;String\[\]&gt; -Item &lt;Item&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Id &lt;String\[\]&gt; -ScriptBlock &lt;ScriptBlock&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Id &lt;String\[\]&gt; -Path &lt;String&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Session &lt;ScriptSession\[\]&gt; -Item &lt;Item&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Session &lt;ScriptSession\[\]&gt; -ScriptBlock &lt;ScriptBlock&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Session &lt;ScriptSession\[\]&gt; -Path &lt;String&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Item &lt;Item&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -Path &lt;String&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

Start-ScriptSession -ScriptBlock &lt;ScriptBlock&gt; \[-JobName &lt;String&gt;\] \[-ArgumentList &lt;Hashtable&gt;\] \[-Identity &lt;AccountIdentity&gt;\] \[-DisableSecurity\] \[-AutoDispose\] \[-Interactive\] \[-ContextItem &lt;Item&gt;\]

## Detailed Description

Starts a new Script Session and executes a script provided in it. The session can be a background session or if the caller session is interactive providint the -Interactive switch can open a Windowd for the new sessio

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Id  &lt;String\[\]&gt;

Id of the session to be created or retrieved. If the session with the same ID exists - it will be used, unless it's busy - in which case an error will be raised. If a session with the Id provided does not exist - it will be created. The Id is a string that uniquely identifies the script session within the server. You can type one or more IDs \(separated by commas\). To find the ID of a script session, type "Get-ScriptSession" without parameters.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Session  &lt;ScriptSession\[\]&gt;

Specifies the script session in context of which the script should be executed. Enter a variable that contains the script session or a command that gets the script session. You can also pipe a script session object to Start-ScriptSession. If the session is busy at the moment of the call - an error will be raised instead of running the script.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

Script item containing the code to be executed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the script item containing the code to be executed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ScriptBlock  &lt;ScriptBlock&gt;

Script to be executed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -JobName  &lt;String&gt;

Name of the Sitecore job that will run the script session. This can be used to monitor the session progress.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ArgumentList  &lt;Hashtable&gt;

Hashtable with the additional parameters required by the invoked script. The parameters will be instantiated in the session as variables.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Identity  &lt;AccountIdentity&gt;

User name including domain in context of which the script will be executed. If no domain is specified - 'sitecore' will be used as the default value. If user is not specified the current user will be the impersonation context.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -DisableSecurity  &lt;SwitchParameter&gt;

Add this parameter to disable security in the Job running the script session.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -AutoDispose  &lt;SwitchParameter&gt;

Providing this parameter will cause the session to be automatically destroyed after it has executed. Use this parameter if you're not in need of the results of the script execution.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Interactive  &lt;SwitchParameter&gt;

If the new session is run from an interactive session \(e.g. from desktop, menu item, console or ISE\) using this parameter will cause dialog to be shown to the user to monitor the script progress.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -ContextItem  &lt;Item&gt;

Context item for the script session. The script will start in the location of the item.

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

* Spe.Core.Host.ScriptSession

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
The following starts the progress demo script in interactive mode (showing dialogs for each script) in 3 different ways.

In the first case script path is used, second case shows the script item beign retrieved and provided to the cmdlet.
The last case shows the script to be provided as a script block (script content)
Script finishes before the sessions that were launched from it end. 
The sessions will be disposed when user presses the "Close" button in their dialogs as the -AutoDispose parameter was provided.

$scriptPath = "master:\system\Modules\PowerShell\Script Library\Getting Started\Script Testing\Long Running Script with Progress Demo"
$scriptItem = Get-Item $scriptPath
$script = [scriptblock]::Create($scriptItem.Script)
Start-ScriptSession -Path $scriptPath -Interactive -AutoDispose
Start-ScriptSession -Item $scriptItem -Interactive -AutoDispose
Start-ScriptSession -ScriptBlock $script -Interactive -AutoDispose
```

### EXAMPLE 2

```powershell
The following starts a script that changes its path to "master:\" and sleeps for 4 seconds. The session will persist in memory as no -AutoDispose parameter has been provided.

Start-ScriptSession -ScriptBlock { cd master:\; Start-Sleep -Seconds 4 } -Id "Background Task"
```

## Related Topics

* [Get-ScriptSession](get-scriptsession.md)
* [Receive-ScriptSession](receive-scriptsession.md)
* [Remove-ScriptSession](remove-scriptsession.md)
* [Stop-ScriptSession](stop-scriptsession.md)
* [Wait-ScriptSession](wait-scriptsession.md)
* [https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/](https://blog.najmanowicz.com/2014/10/26/sitecore-powershell-extensions-persistent-sessions/) 
* [https://git.io/spe](https://git.io/spe) 

