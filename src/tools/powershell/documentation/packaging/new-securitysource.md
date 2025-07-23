# New-SecuritySource

Creates new User & Role source that can be added to a Sitecore package.

## Syntax

New-SecuritySource \[-Account\] &lt;Account&gt; \[-Name\] &lt;String&gt;

New-SecuritySource \[-Identity\] &lt;AccountIdentity&gt; \[\[-AccountType\] &lt;Unknown \| Role \| User&gt;\] \[-Name\] &lt;String&gt;

New-SecuritySource \[-Filter\] &lt;String\[\]&gt; \[\[-AccountType\] &lt;Unknown \| Role \| User&gt;\] \[-Name\] &lt;String&gt;

## Detailed Description

Creates new User & Role source that can be added to a Sitecore package.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -Account  &lt;Account&gt;

User or Role provided from e.g. Get-Role or Get-User Cmdlet.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Identity  &lt;AccountIdentity&gt;

User or role name including domain for which the access rule is being created. If no domain is specified - 'sitecore' will be used as the default domain.

Specifies the Sitecore user by providing one of the following values.

```powershell
Local Name
    Example: adam
Fully Qualified Name
    Example: sitecore\adam
```

if -AccountType parameter is specified as Role - only roles will be taken into consideration. if -AccountType parameter is specified as User - only users will be taken into consideration.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Filter  &lt;String\[\]&gt;

Specifies a simple pattern to match Sitecore roles & users.

Examples: The following examples show how to use the filter syntax.

To get security for all roles, use the asterisk wildcard: Get-ItemAcl -Filter \*

To security got all roles in a domain use the following command: Get-ItemAcl -Filter "sitecore\*"

if -AccountType parameter is specified as Role - only roles will be taken into consideration. if -AccountType parameter is specified as User - only users will be taken into consideration.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 2 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -AccountType  &lt;AccountType&gt;

* Unknown - Both Roles and users will be taken into consideration when looking for accounts through either -Identity or -Filter parameters
* Role - Only Roles will be taken into consideration when looking for accounts through either -Identity or -Filter parameters
* User - Only Users will be taken into consideration when looking for accounts through either -Identity or -Filter parameters 

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | 3 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Name  &lt;String&gt;

Name of the security source.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* Sitecore.Security.Accounts.Account 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Sitecore.Install.Security.SecuritySource 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Following example creates a new package, adds sitecore\admin user to it and saves it in the Sitecore Package folder+ gives you an option to download the saved package.

```powershell
# Create package
$package = New-Package "Packing in Powerful Ways";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Adam Najmanowicz, Michael West";
$package.Metadata.Publisher = "Powerful Ways";
$package.Metadata.Version = "1.0";
$package.Metadata.Readme = 'This text will be visible to people installing your package'

# Create security source with Sitecore Administrator only
$source = New-SecuritySource -Identity sitecore\admin -Name "Sitecore Admin" 
$package.Sources.Add($source);

# Save package
Export-Package -Project $package -Path "$($package.Name)-$($package.Metadata.Version).zip" -Zip

# Offer the user to download the package
Download-File "$SitecorePackageFolder\$($package.Name)-$($package.Metadata.Version).zip"
```

### EXAMPLE 2

Following example creates a new package, adds all roles within the "sitecore" domain to it and saves it in the Sitecore Package folder+ gives you an option to download the saved package.

```powershell
$package = New-Package "Packing in Powerful Ways";

# Set package metadata
$package.Sources.Clear();

$package.Metadata.Author = "Adam Najmanowicz, Michael West";
$package.Metadata.Publisher = "Powerful Ways";
$package.Metadata.Version = "1.0";
$package.Metadata.Readme = 'This text will be visible to people installing your package'

# Create security source with all roles within the sitecore domain
$source = New-SecuritySource -Filter sitecore\* -Name "Sitecore Roles" -AccountType Role
$package.Sources.Add($source);

# Save package
Export-Package -Project $package -Path "$($package.Name)-$($package.Metadata.Version).zip" -Zip

# Offer the user to download the package
Download-File "$SitecorePackageFolder\$($package.Name)-$($package.Metadata.Version).zip"
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 

