# Install-UpdatePackage

Installs a Sitecore update package from the specified path.

## Syntax

Install-UpdatePackage \[-Path\] &lt;String&gt; \[\[-RollbackPackagePath\] &lt;String&gt;\] -UpgradeAction &lt;Preview \| Upgrade&gt; -InstallMode &lt;Install \| Update&gt;

## Detailed Description

The Install-UpdatePackage command installs update packages that are used created by Sitecore CMS updates, TDS, and Courier.

Install-UpdatePackage. Install-UpdatePackage -Path "C:\Projects\LaunchSitecore.TDSMaster.update" -UpgradeAction {Preview or Upgrade} -InstallMode {Install or Update}

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Path  &lt;String&gt;

Path to the .update package on the Sitecore server disk drive.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -RollbackPackagePath  &lt;String&gt;

Specify Rollback Package Path - for rolling back if the installation was not functioning as expected.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -UpgradeAction  &lt;UpgradeAction&gt;

Preview / Upgrade

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -InstallMode  &lt;InstallMode&gt;

Install / Update

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Update.Installer.ContingencyEntry 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> Install-UpdatePackage -Path "C:\Projects\LaunchSitecore.TDSMaster.update" -UpgradeAction Preview -InstallMode Install
```

## Related Topics

* [Export-UpdatePackage](export-updatepackage.md)
* [Get-UpdatePackageDiff](get-updatepackagediff.md)
* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

