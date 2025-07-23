# Get-SitecoreJob

Returns list of the current sitecore jobs

## Syntax

Get-SitecoreJob

## Detailed Description

The Get-SitecoreJob command returns the list of the currently running jobs of Sitecore.

© 2010-2019 Implemented by Vangasewinkel Benjamin using the Adam Najmanowicz, Michael West Sitecore PowerShell Extensions. All rights reserved.

## Parameters

None

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Jobs.Job 

## Notes

Help Author: Vangansewinkel Benjamin

## Examples

### EXAMPLE 1

```powershell
PS master:\> Get-SitecoreJob

Category     : PowerShell
Handle       : b62d9129-298a-4630-bb37-d725e5ce3bbf;DCI5CG6011F3Y-sc81u3contact
IsDone       : True
Name         : PowerShell-ca2a0179-78c5-02a4-5970-17e4909752b0-{347EBAF8-6BE2-4ABC-91D0-36B36FCF414B}
Options      : Sitecore.Jobs.JobOptions
Status       : Sitecore.Jobs.JobStatus
WaitHandle   : System.Threading.ManualResetEvent
QueueTime    : 11/13/2017 1:03:18 PM
MessageQueue : Sitecore.Jobs.AsyncUI.MessageQueue

Category     : Indexing
Handle       : dca83fc7-def7-4564-ac44-987e79ffc3cd;DCI5CG6011F3Y-sc81u3contact
IsDone       : True
Name         : Index_Update_IndexName=sitecore_analytics_index
Options      : Sitecore.Jobs.JobOptions
Status       : Sitecore.Jobs.JobStatus
WaitHandle   : System.Threading.ManualResetEvent
QueueTime    : 11/13/2017 1:03:29 PM
MessageQueue : Sitecore.Jobs.AsyncUI.MessageQueue

Category     : PowerShell
Handle       : de0a1dce-45f7-44fb-81b5-02b402c1f614;DCI5CG6011F3Y-sc81u3contact
IsDone       : False
Name         : PowerShell-ca2a0179-78c5-02a4-5970-17e4909752b0-{47666A58-890B-4D13-8F15-3348643750E4}
Options      : Sitecore.Jobs.JobOptions
Status       : Sitecore.Jobs.JobStatus
WaitHandle   : System.Threading.ManualResetEvent
QueueTime    : 11/13/2017 1:03:29 PM
MessageQueue : Sitecore.Jobs.AsyncUI.MessageQueue
```

### EXAMPLE 2

```powershell
PS master:\> $jobs = Get-SitecoreJob
PS master:\> $jobs[0].Status

Category     : PowerShell
Handle       : c9215f66-ce60-49e5-9620-bf1ec51b6ef4;DCI5CG6011F3Y-sc81u3contact
IsDone       : False
Name         : PowerShell-ca2a0179-78c5-02a4-5970-17e4909752b0-{DF4895A6-3EBB-4A2A-9756-3A0EF4B96396}
Options      : Sitecore.Jobs.JobOptions
Status       : Sitecore.Jobs.JobStatus
WaitHandle   : System.Threading.ManualResetEvent
QueueTime    : 11/13/2017 1:05:54 PM
MessageQueue : Sitecore.Jobs.AsyncUI.MessageQueue
```

### EXAMPLE 3

```powershell
PS master:\> Get-SitecoreJob | Show-ListView -Property "Category", "IsDone", "Name", "QueueTime", `
    @{Label="Status Expiry"; Expression={$_.Status.Expiry} },
    @{Label="Status Failed"; Expression={$_.Status.Failed} },
    @{Label="Status State"; Expression={$_.Status.State} },
    @{Label="Status Processed"; Expression={$_.Status.Processed} },
    @{Label="Status Total"; Expression={$_.Status.Total} },
    @{Label="Status Message"; Expression={$_.Status.Messages} }
```

![Example 3](../../.gitbook/assets/get-sitecorejobs-listview.png)

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [https://www.youtube.com/watch?v=N3xgZcU9FqQ&list=PLph7ZchYd\_nCypVZSNkudGwPFRqf1na0b&index=9](https://www.youtube.com/watch?v=N3xgZcU9FqQ&list=PLph7ZchYd_nCypVZSNkudGwPFRqf1na0b&index=9) 

