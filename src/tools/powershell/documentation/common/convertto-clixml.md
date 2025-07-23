# ConvertTo-CliXml

Exports Microsoft .NET objects froms PowerShell to a CliXml string.

## Syntax

ConvertTo-CliXml \[-InputObject\] &lt;PSObject&gt;

## Detailed Description

The ConvertTo-CliXml command exports Microsoft .NET Framework objects from PowerShell to a CliXml string.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -InputObject  &lt;PSObject&gt;

Specifies the object to be converted. Enter a variable that contains the objects, or type a command or expression that gets the objects. You can also pipe objects to ConvertTo-CliXml.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* object 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.String 

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
* [ConvertFrom-CliXml](convertfrom-clixml.md)
* ConvertFrom-Xml
* ConvertTo-Xml
* Export-CliXml
* Import-CliXml

