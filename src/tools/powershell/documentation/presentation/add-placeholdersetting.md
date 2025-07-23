# Add-PlaceholderSetting 
 
Adds a placeholder setting to a chosen device for the presentation of an item.
 
## Syntax 
 
```powershell
Add-PlaceholderSetting [-Item] <Item> -Instance <PlaceholderDefinition> [-MetaDataItemId <string>] [-Key <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Add-PlaceholderSetting [-Path] <string> -Instance <PlaceholderDefinition> [-MetaDataItemId <string>] [-Key <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Add-PlaceholderSetting -Instance <PlaceholderDefinition> -Id <string> [-MetaDataItemId <string>] [-Key <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>] [-Database <string>]
```
 
## Detailed Description 
 
Adds a placeholder setting to a chosen device for the presentation of an item.
 
© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions 

## Parameters 
 
### -Database&nbsp; &lt;string&gt; 
 
Database containing the item to be processed - can work with Language parameter to narrow the publication scope.
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Device&nbsp; &lt;DeviceItem&gt; 
 
Device the placeholder setting is assigned to. If not specified - default device will be used. 
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -FinalLayout&nbsp; &lt;switch&gt; 
 
Targets the Final Layout. If not provided, the Shared Layout will be targeted. Applies to Sitecore 8.0 and higher only. 
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Id&nbsp; &lt;string&gt; 
 
Id of the item to be processed - can work with Language parameter to narrow the publication scope. 
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td></td>
        </tr>
    </tbody>
</table> 
 
### -Instance&nbsp; &lt;PlaceholderDefinition&gt; 
 
Placeholder setting definition to be added to the item
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>PlaceholderSetting</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Item&nbsp; &lt;Item&gt; 
 
The item to be processed.
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>true (ByValue, ByPropertyName)</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Key&nbsp; &lt;string&gt; 
 
The key for this placeholder setting - if not specified the value provided in the placeholder setting definition specified in the Instance parameter will be used.  
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Language&nbsp; &lt;string[]&gt; 
 
Language that will be used as source language. If not specified the current user language will be used. Globbing/wildcard supported.
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>Languages</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -MetaDataItemId&nbsp; &lt;string&gt; 
 
The metadata item Id for this placeholder setting - if not specified the value provided in the placeholder setting definition specified in the Instance parameter will be used. 
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>None</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>Named</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
### -Path&nbsp; &lt;string&gt; 
 
Path to the item to be processed - can work with Language parameter to narrow the publication scope.
 
<table>
    <thead></thead>
    <tbody>
        <tr>
            <td>Aliases</td>
            <td>FullName, FileName</td>
        </tr>
        <tr>
            <td>Required?</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Position?</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Default Value</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept Pipeline Input?</td>
            <td>false</td>
        </tr>
        <tr>
            <td>Accept Wildcard Characters?</td>
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
## Inputs 
 
The input type is the type of the objects that you can pipe to the cmdlet. 
 
* Sitecore.Data.Items.Item

## Outputs

The output type is the type of the objects that the cmdlet emits.

* System.Void 

## Notes 
 
Help Author: Adam Najmanowicz, Michael West, Alex Washtell
 
## Examples 
 
### EXAMPLE 1
 
Create item defining placeholder setting and add to an item
 
```powershell
$placeholderSetting = gi "master:\layout\Placeholder Settings\content" | New-PlaceholderSetting -Key "content"
$item = gi master:\content\Home
# Add the placeholder setting to the item
Add-PlaceholderSetting -Item $item -Instance $placeholderSetting
``` 

### EXAMPLE 2
 
Create item defining placeholder setting and add to an item, overriding the key
 
```powershell 
$placeholderSetting = gi "master:\layout\Placeholder Settings\content" | New-PlaceholderSetting -Key "content"
# find item you want the placeholder setting added to
$item = gi master:\content\Home
# Add the placeholder setting to the item
Add-PlaceholderSetting -Item $item -Instance $placeholderSetting -Key "content-override"
``` 

## Related Topics 


* <a href='https://github.com/SitecorePowerShell/Console/' target='_blank'>https://github.com/SitecorePowerShell/Console/</a><br/>
* [Get-PlaceholderSetting](get-placeholdersetting.md)
* [New-PlaceholderSetting](new-placeholdersetting.md) 
* [Remove-PlaceholderSetting](remove-placeholdersetting.md)