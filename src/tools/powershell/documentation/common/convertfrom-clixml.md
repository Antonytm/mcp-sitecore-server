# ConvertFrom-CliXml

Imports a CliXml string with data that represents Microsoft .NET objects and creates the objects within PowerShell.

## Syntax

ConvertFrom-CliXml \[-InputObject\] &lt;String&gt;

## Detailed Description

The ConvertFrom-CliXml command imports a CliXml string with data that represents Microsoft .NET Framework objects and creates the objects in PowerShell.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -InputObject  &lt;String&gt;

String containing the Xml with serialized objects.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* System.String 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* object 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE

```powershell
PS master:\> #Convert original item to xml
PS master:\> $myCliXmlItem = Get-Item -Path master:\content\home | ConvertTo-CliXml 
PS master:\> #print the CliXml
PS master:\> $myCliXmlItem
PS master:\> #print the Item converted back from CliXml
PS master:\> $myCliXmlItem | ConvertFrom-CliXml
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [ConvertTo-CliXml](convertto-clixml.md)
* ConvertTo-Xml
* ConvertFrom-Xml
* Export-CliXml
* Import-CliXml
* [https://github.com/SitecorePowerShell/Console/issues/218](https://github.com/SitecorePowerShell/Console/issues/218) 

