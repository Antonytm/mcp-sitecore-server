# Clear-ItemAcl

Removes all security information from the item specified.

## Syntax

Clear-ItemAcl \[-Item\] &lt;Item&gt; \[-PassThru\]

Clear-ItemAcl \[-Path\] &lt;String&gt; \[-PassThru\]

Clear-ItemAcl -Id &lt;String&gt; \[-Database &lt;String&gt;\] \[-PassThru\]

## Detailed Description

Removes all security information from the item specified.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -PassThru  &lt;SwitchParameter&gt;

Passes the processed item back into the pipeline.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue, ByPropertyName\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | 1 |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be processed. Requires the Database parameter to be specified.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be fetched with Id parameter.

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

## Inputs

The input type is the type of the objects that you can pipe to the cmdlet.

* can be piped from another cmdlet\* Sitecore.Data.Items.Item 

## Outputs

The output type is the type of the objects that the cmdlet emits.

* Only if -PassThru is used\* Sitecore.Data.Items.Item 

## Notes

Help Author: Adam Najmanowicz, Michael West

## Examples

### EXAMPLE 1

Clears the security information from the Home item providing its path

```powershell
PS master:\> Clear-ItemAcl -Path master:\content\home
```

### EXAMPLE 2

Clears the security information from the Home item by providing it from the pipeline and passing it back to the pipeline.

```powershell
PS master:\> Get-Item -Path master:\content\home | Clear-ItemAcl -PassThru

Name   Children Languages                Id                                     TemplateName
----   -------- ---------                --                                     ------------
Home   False    {en, ja-JP, de-DE, da}   {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

## Related Topics

* [Add-ItemAcl](add-itemacl.md)
* [Get-ItemAcl](get-itemacl.md)
* [New-ItemAcl](new-itemacl.md)
* [Set-ItemAcl](set-itemacl.md)
* [Test-ItemAcl](test-itemacl.md)
* [https://sdn.sitecore.net/upload/sitecore6/security\_administrators\_cookbook\_a4.pdf](https://sdn.sitecore.net/upload/sitecore6/security_administrators_cookbook_a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/61/security\_reference-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/61/security_reference-a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/64/content\_api\_cookbook\_sc64\_and\_later-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/64/content_api_cookbook_sc64_and_later-a4.pdf) 
* [https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx](https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx) 
* [https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/](https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/) 

