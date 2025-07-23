# Start-TaskSchedule

Executes a task schedule.

## Syntax

Start-TaskSchedule -Schedule &lt;ScheduleItem&gt;

Start-TaskSchedule \[-Item\] &lt;Item&gt;

Start-TaskSchedule \[-Path\] &lt;String&gt;

Start-TaskSchedule -Id &lt;String&gt; \[-Database &lt;String&gt;\]

## Detailed Description

Executes a task schedule either passed from Get-Schedule, based on Item or Schedule path.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Schedule  &lt;ScheduleItem&gt;

ScheduleItem most conveniently obtained from Get-Schedule command.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

Schedule item - if Item is of wrong template - an appropriate error will be written to teh host.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the schedule item - if item is of wrong template - an appropriate error will be written to teh host.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Tasks.ScheduleItem

  Sitecore.Data.Items.Item

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Tasks.ScheduleItem 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

```powershell
PS master:\> Start-TaskSchedule -Path "master:/system/Tasks/Schedules/Email Campaign/Clean Message History"

Name                             Database        Active   Auto Remove  Is Due   Expired  Completed    Last Run               Next Run
----                             --------        ------   -----------  ------   -------  ---------    --------               --------
Clean Message History            master          True     False        False    False    False        2014-07-29 16:22:49    2014-07-30 04:52:49
```

### EXAMPLE 2

```powershell
PS master:\> Get-TaskSchedule -Name "Check Bounced Messages" -Database "master" | Start-TaskSchedule

Name                             Database        Active   Auto Remove  Is Due   Expired  Completed    Last Run               Next Run
----                             --------        ------   -----------  ------   -------  ---------    --------               --------
Check Bounced Messages           master          True     False        False    False    False        2014-07-29 16:21:33    2014-07-30 04:51:33
```

## Related Topics

* [Get-TaskSchedule](get-taskschedule.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://www.youtube.com/watch?v=N3xgZcU9FqQ&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=9](https://www.youtube.com/watch?v=N3xgZcU9FqQ&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=9) 

