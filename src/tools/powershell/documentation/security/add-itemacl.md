# Add-ItemAcl

Adds new access rule to an item allowing for the item to have the access granted or denied for a provided role or user.

## Syntax

```powershell
Add-ItemAcl -PropagationType <Unknown | Descendants | Entity | Any> -SecurityPermission <NotSet | AllowAccess | DenyAccess | AllowInheritance | DenyInheritance> -AccessRight <String> -Identity <AccountIdentity> -Path <String> [-PassThru]
Add-ItemAcl -PropagationType <Unknown | Descendants | Entity | Any> -SecurityPermission <NotSet | AllowAccess | DenyAccess | AllowInheritance | DenyInheritance> -AccessRight <String> -Identity <AccountIdentity> -Id <String> [-Database <String>] [-PassThru]
Add-ItemAcl -PropagationType <Unknown | Descendants | Entity | Any> -SecurityPermission <NotSet | AllowAccess | DenyAccess | AllowInheritance | DenyInheritance> -AccessRight <String> -Identity <AccountIdentity> -Item <Item> [-PassThru]
Add-ItemAcl -AccessRules <AccessRuleCollection> -Path <String> [-PassThru]
Add-ItemAcl -AccessRules <AccessRuleCollection> -Id <String> [-PassThru]
Add-ItemAcl -AccessRules <AccessRuleCollection> -Item <Item> [-PassThru]
```

## Detailed Description

Adds new access rule to an item allowing for the item to have the access granted or denied for a provided role or user. The new rules will be appended to the existing security descriptors on the item.

© 2010-2019 Adam Najmanowicz, Michael West. All rights reserved. Sitecore PowerShell Extensions

## Parameters

### -PropagationType  &lt;PropagationType&gt;

The PropagationType enumeration determines which items will be granted the access right.

* Any - the item and all items inheriting
* Descendants - applies rights to inheriting children only
* Entity - applies right to the item only 

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -SecurityPermission  &lt;SecurityPermission&gt;

The SecurityPermission determines whether to grant \(allow\) or deny the access right, and deny or allow inheritance of the right.

* AllowAccess - 
* DenyAccess - 
* AllowInheritance - 
* DenyInheritance - 

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -AccessRules  &lt;AccessRuleCollection&gt;

A single or multiple access rules created e.g. through the New-ItemAcl or obtained from other item using the Get-ItemAcl cmdlet. This information will be appended to the existing security descriptors on the item.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -PassThru  &lt;SwitchParameter&gt;

| Aliases |  |
| :--- | :--- |
| Required? | false |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -AccessRight  &lt;String&gt;

The access right to grand or deny. Well known rights are:

* field:read - "Field Read" - controls whether an account can read a specific field on an item..
* field:write - "Field Write" - controls whether an account can update a specific field on an item.
* item:read - "Read" - controls whether an account can see an item in the content tree and/or on the published Web site, including all of its properties and field values.
* item:write - "Write" - controls whether an account can update field values. The write access right requires the read access right and field read and field write access rights for individual fields \(field read and field write are allowed by default\).
* item:rename - "Rename" - controls whether an account can change the name of an item. The rename access right requires the read access right.
* item:create - "Create" - controls whether an account can create child items. The create access right requires the read access right.
* item:delete - "Delete" - Delete right for items. controls whether an account can delete an item. The delete access right requires the read access right

  Important!

  The Delete command also deletes all child items, even if the account has been denied Delete

  rights for one or more of the subitems.

* item:admin - "Administer" - controls whether an account can configure access rights on an item. The administer access right requires the read and write access rights.
* language:read - "Language Read" - controls whether a user can read a specific language version of items.
* language:write - "Language Write" - controls whether a user can update a specific language version of items.
* site:enter - controls whether a user can access a specific site.
* insert:show - "Show in Insert" - Determines if the user can see the insert option
* workflowState:delete - "Workflow State Delete" - controls whether a user can delete items which are currently associated with a specific workflow state.
* workflowState:write - "Workflow State Write" - controls whether a user can update items which are currently associated with a specific workflow state.
* workflowCommand:execute - "Workflow Command Execute" - — controls whether a user is shown specific workflow commands.
* profile:customize - "Customize Profile Key Values" - The right to input out of range values of profile keys, that belong to this profile.
* bucket:makebucket - "Create Bucket" - convert item to bucket.
* bucket:unmake - "Revert Bucket" - convert item back from bucket.
* remote:fieldread - "Field Remote Read" - Field Read right for remoted clients. 

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Identity  &lt;AccountIdentity&gt;

User name including domain for which the access rule is being created. If no domain is specified - 'sitecore' will be used as the default domain.

Specifies the Sitecore user by providing one of the following values.

```powershell
Local Name
    Example: adam
Fully Qualified Name
    Example: sitecore\adam
```

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Item  &lt;Item&gt;

The item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | true \(ByValue\) |
| Accept Wildcard Characters? | false |

### -Path  &lt;String&gt;

Path to the item to be processed.

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Id  &lt;String&gt;

Id of the item to be processed. Requires Database parameter to be specified

| Aliases |  |
| :--- | :--- |
| Required? | true |
| Position? | named |
| Default Value |  |
| Accept Pipeline Input? | false |
| Accept Wildcard Characters? | false |

### -Database  &lt;String&gt;

Database containing the item to be fetched using the Id Parameter.

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

allows the "sitecore\adam" user to rename the Home item and all of its childre

```powershell
PS master:\> Add-ItemAcl -Path master:\content\Home -AccessRight "item:rename" -PropagationType Any -SecurityPermission AllowAccess -Identity "sitecore\admin"
```

### EXAMPLE 2

Allows the "sitecore\adam" user to delete the Home item and all of its children. Denies the "sitecore\mikey" user reading the descendants of the Home item. ;P The security info is created prior to adding it to the item. The item is delivered to the Add-ItemAcl from the pipeline and returned to the pipeline after processing due to the -PassThru parameter.

```powershell
$acl1 = New-ItemAcl -AccessRight item:delete -PropagationType Any -SecurityPermission AllowAccess -Identity "sitecore\admin"
$acl2 = New-ItemAcl -AccessRight item:read -PropagationType Descendants -SecurityPermission DenyAccess -Identity "sitecore\mikey"
Get-Item -Path master:\content\home | Add-ItemAcl -AccessRules $acl1, $acl2 -PassThru

Name   Children Languages                Id                                     TemplateName
----   -------- ---------                --                                     ------------
Home   False    {en, ja-JP, de-DE, da}   {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9} Sample Item
```

### EXAMPLE 3

The following demonstrates how to add several AccessRule to an item when the PropogationType and SecurityPermission are the same.

```powershell
$item = Get-Item -Path master:\content\youritem
$role = "sitecore\role"
$rights = @("item:create", "item:write", "item:rename", "item:delete")

$item | Clear-ItemAcl
$rights  | ForEach-Object { Add-ItemAcl -Item $item -AccessRight $_ -PropagationType Any -SecurityPermission AllowAccess -Identity $role }
```

## Related Topics

* [https://github.com/SitecorePowerShell/Console/](https://github.com/SitecorePowerShell/Console/) 
* [Add-ItemAcl](add-itemacl.md)
* [Clear-ItemAcl](clear-itemacl.md)
* [Get-ItemAcl](get-itemacl.md)
* [New-ItemAcl](new-itemacl.md)
* [Set-ItemAcl](set-itemacl.md)
* [Test-ItemAcl](test-itemacl.md)
* [https://sdn.sitecore.net/upload/sitecore6/security\_administrators\_cookbook\_a4.pdf](https://sdn.sitecore.net/upload/sitecore6/security_administrators_cookbook_a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/61/security\_reference-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/61/security_reference-a4.pdf) 
* [https://sdn.sitecore.net/upload/sitecore6/64/content\_api\_cookbook\_sc64\_and\_later-a4.pdf](https://sdn.sitecore.net/upload/sitecore6/64/content_api_cookbook_sc64_and_later-a4.pdf) 
* [https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx](https://www.sitecore.net/learn/blogs/technical-blogs/john-west-sitecore-blog/posts/2013/01/sitecore-security-access-rights.aspx) 
* [https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/](https://briancaos.wordpress.com/2009/10/02/assigning-security-to-items-in-sitecore-6-programatically/) 

