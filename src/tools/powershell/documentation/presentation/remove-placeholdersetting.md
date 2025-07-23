# Remove-PlaceholderSetting 
 
Removes placeholder setting(s) from an item using the filtering parameters.
 
## Syntax 
 
```powershell
Remove-PlaceholderSetting -Item <Item> [-Key <string>] [-PlaceholderSetting <Item>] [-Index <int>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Item <Item> -Instance <PlaceholderDefinition> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Item <Item> -UniqueId <string> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Path <string> [-Key <string>] [-PlaceholderSetting <Item>] [-Index <int>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Path <string> -Instance <PlaceholderDefinition> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Path <string> -UniqueId <string> [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting [-Id <string>] [-Database <string>] [-Key <string>] [-PlaceholderSetting <Item>] [-Index <int>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -Instance <PlaceholderDefinition> [-Id <string>] [-Database <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]

Remove-PlaceholderSetting -UniqueId <string> [-Id <string>] [-Database <string>] [-Device <DeviceItem>] [-FinalLayout] [-Language <string[]>]
```
 
## Detailed Description 
 
Removes placeholder setting(s) from an item using the filtering parameters.
 
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
 
Device for which the placeholder settings will be removed. 
 
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
 
### -Index&nbsp; &lt;int&gt; 
 
 Index at which the placeholder setting exists in the layout. The placeholder setting at that index will be removed.  
 
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
 
### -Instance&nbsp; &lt;PlaceholderDefinition&gt; 
 
Specific instance of placeholder setting that should be removed. The instance could earlier be obtained through e.g. use of Get-PlaceholderSetting.  
 
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
            <td>Named</td>
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
 
Placeholder key filter - supports wildcards. 
 
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
            <td>true</td>
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
 
### -PlaceholderSetting&nbsp; &lt;Item&gt; 
 
Item representing the placeholder setting. If matching, the placeholder setting will be removed.  
 
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
 
### -UniqueId&nbsp; &lt;string&gt; 
 
UniqueID of the placeholder setting to be removed. 
 
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
            <td>false</td>
        </tr>
    </tbody>
</table> 
 
## Inputs 
 
The input type is the type of the objects that you can pipe to the cmdlet. 
 
* Sitecore.Data.Items.Item 
 

## Notes 
 
Help Author: Adam Najmanowicz, Michael West 
 
## Examples 
 
### EXAMPLE 1 
 
Remove all placeholder settings for "Default" device 
 
```powershell
Remove-PlaceholderSetting -Path master:\content\home -Device (Get-LayoutDevice "Default")  
``` 
 
### EXAMPLE 2 
 
Remove all placeholder settings with the "content" key. 
 
```powershell
Remove-PlaceholderSetting -Path master:\content\home -Key "content" 
``` 
 
## Related Topics 
 

* <a href='https://github.com/SitecorePowerShell/Console/' target='_blank'>https://github.com/SitecorePowerShell/Console/</a><br/>
* [Add-PlaceholderSetting](add-placeholdersetting.md)
* [Get-PlaceholderSetting](get-placeholdersetting.md)
* [New-PlaceholderSetting](new-placeholdersetting.md)