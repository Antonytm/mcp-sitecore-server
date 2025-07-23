import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "./config.js";

import { registerGraphQL } from "./tools/graphql/register-graphql.js";
import { getItemTool } from "./tools/item-service/tools/simple/get-item.js";
import { getItemChildrenTool } from "./tools/item-service/tools/simple/get-item-children.js";
import { getItemByPathTool } from "./tools/item-service/tools/simple/get-item-by-path.js";
import { createItemTool } from "./tools/item-service/tools/simple/create-item.js";
import { editItemTool } from "./tools/item-service/tools/simple/edit-item.js";
import { deleteItemTool } from "./tools/item-service/tools/simple/delete-item.js";
import { searchItemsTool } from "./tools/item-service/tools/simple/search-items.js";
import { runStoredQueryTool } from "./tools/item-service/tools/simple/run-stored-query.js";
import { runStoredSearchTool } from "./tools/item-service/tools/simple/run-stored-search.js";
import { getItemDescendantsTool } from "./tools/item-service/tools/composite/get-item-descendants.js";
import { getLanguagesTool } from "./tools/item-service/tools/composite/get-languages.js";
import { getUserByIdentityPowerShellTool } from "./tools/powershell/simple/security/get-user-by-identity.js";
import { getCurrentUserPowerShellTool } from "./tools/powershell/simple/security/get-current-user.js";
import { getUserByFilterPowerShellTool } from "./tools/powershell/simple/security/get-user-by-filter.js";
import { newUserPowerShellTool } from "./tools/powershell/simple/security/new-user.js";
import { removeUserPowerShellTool } from "./tools/powershell/simple/security/remove-user.js";
import { disableUserPowerShellTool } from "./tools/powershell/simple/security/disable-user.js";
import { enableUserPowerShellTool } from "./tools/powershell/simple/security/enable-user.js";
import { unlockUserPowerShellTool } from "./tools/powershell/simple/security/unlock-user.js";
import { setUserPowerShellTool } from "./tools/powershell/simple/security/set-user.js";
import { setUserPasswordPowerShellTool } from "./tools/powershell/simple/security/set-user-password.js";
import { getRoleByIdentityPowerShellTool } from "./tools/powershell/simple/security/get-role-by-identity.js";
import { getRoleByFilterPowerShellTool } from "./tools/powershell/simple/security/get-role-by-filter.js";
import { getRoleMemberPowerShellTool } from "./tools/powershell/simple/security/get-role-member.js";
import { addRoleMemberPowerShellTool } from "./tools/powershell/simple/security/add-role-member.js";
import { removeRoleMemberPowerShellTool } from "./tools/powershell/simple/security/remove-role-member.js";
import { unlockItemPowerShellTool } from "./tools/powershell/simple/security/unlock-item.js";
import { protectItemByPathPowerShellTool } from "./tools/powershell/simple/security/protect-item-by-path.js";
import { protectItemByIdPowerShellTool } from "./tools/powershell/simple/security/protect-item-by-id.js";
import { newRolePowerShellTool } from "./tools/powershell/simple/security/new-role.js";
import { removeRolePowerShellTool } from "./tools/powershell/simple/security/remove-role.js";
import { newDomainPowerShellTool } from "./tools/powershell/simple/security/new-domain.js";
import { removeDomainPowerShellTool } from "./tools/powershell/simple/security/remove-domain.js";
import { testAccountPowerShellTool } from "./tools/powershell/simple/security/test-account.js";
import { getItemAclPowerShellTool } from "./tools/powershell/simple/security/get-item-acl.js";
import { testItemAclPowerShellTool } from "./tools/powershell/simple/security/test-item-acl.js";
import { addItemAclPowerShellTool } from "./tools/powershell/simple/security/add-item-acl.js";
import { clearItemAclPowerShellTool } from "./tools/powershell/simple/security/clear-item-acl.js";
import { getItemPowerShellTool } from "./tools/powershell/simple/provider/get-item.js";
import { initializeSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/initialize-search-index.js";
import { getSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/get-search-index.js";
import { findItemPowerShellTool } from "./tools/powershell/simple/indexing/find-item.js";
import { resumeSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/resume-search-index.js";
import { suspendSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/suspend-search-index.js";
import { stopSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/stop-search-index.js";
import { setItemAclByIdPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-id.js";
import { setItemAclByPathPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-path.js";
import { initializeSearchIndexingItemByIdPowerShellTool } from "./tools/powershell/composite/indexing/initialialize-search-indexing-item-by-id.js";
import { initializeSearchIndexingItemByPathPowerShellTool } from "./tools/powershell/composite/indexing/initialialize-search-indexing-item-by-path.js";
import { removeSearchIndexItemByIdPowerShellTool } from "./tools/powershell/composite/indexing/remove-search-index-item-by-id.js";
import { removeSearchIndexItemByPathPowerShellTool } from "./tools/powershell/composite/indexing/remove-search-index-item-by-path.js";
import { lockItemByIdPowerShellTool } from "./tools/powershell/simple/security/lock-item-by-id.js";
import { lockItemByPathPowerShellTool } from "./tools/powershell/simple/security/lock-item-by-path.js";
import { unprotectItemByIdPowerShellTool } from "./tools/powershell/simple/security/unprotect-item-by-id.js";
import { unprotectItemByPathPowerShellTool } from "./tools/powershell/simple/security/unprotect-item-by-path.js";
import { getDomainByNamePowerShellTool } from "./tools/powershell/simple/security/get-domain-by-name.js";
import { getAllDomainsPowerShellTool } from "./tools/powershell/simple/security/get-all-domains.js";
import { getArchivePowerShellTool } from "./tools/powershell/composite/common/get-archive.js";
import { getArchiveItemPowerShellTool } from "./tools/powershell/composite/common/get-archive-item.js";
import { getDatabasePowerShellTool } from "./tools/powershell/simple/common/get-database.js";
import { getCachePowerShellTool } from "./tools/powershell/simple/common/get-cache.js";
import { getItemTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-template-by-id.js";
import { getItemTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-template-by-path.js";
import { setItemTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/set-item-template-by-id.js";
import { setItemTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/set-item-template-by-path.js";
import { addBaseTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/add-base-template-by-id.js";
import { addBaseTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/add-base-template-by-path.js";
import { removeBaseTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/remove-base-template-by-id.js";
import { removeBaseTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/remove-base-template-by-path.js";
import { getItemFieldByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-field-by-id.js";
import { getItemFieldByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-field-by-path.js";
import { getItemReferenceByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-reference-by-id.js";
import { getItemReferenceByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-reference-by-path.js";
import { getItemReferrerByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-referrer-by-id.js";
import { getItemReferrerByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-referrer-by-path.js";
import { getItemWorkflowEventByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-workflow-event-by-id.js";
import { getItemWorkflowEventByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-workflow-event-by-path.js";
import { getPowershellDocumentationTool } from "./tools/powershell/get-powershell-documentation.js";
import { runPowershellScriptTool } from "./tools/powershell/run-powershell-script.js";
import { getSitecoreJobPowerShellTool } from "./tools/powershell/simple/common/get-sitecore-job.js";
import { addItemVersionByIdPowerShellTool } from "./tools/powershell/simple/common/add-item-version-by-id.js";
import { addItemVersionByPathPowerShellTool } from "./tools/powershell/simple/common/add-item-version-by-path.js";
import { invokeWorkflowByIdPowerShellTool } from "./tools/powershell/simple/common/invoke-workflow-by-id.js";
import { invokeWorkflowByPathPowerShellTool } from "./tools/powershell/simple/common/invoke-workflow-by-path.js";
import { newItemWorkflowEventByIdPowerShellTool } from "./tools/powershell/simple/common/new-item-workflow-event-by-id.js";
import { newItemWorkflowEventByPathPowerShellTool } from "./tools/powershell/simple/common/new-item-workflow-event-by-path.js";
import { publishItemByIdPowerShellTool } from "./tools/powershell/simple/common/publish-item-by-id.js";
import { publishItemByPathPowerShellTool } from "./tools/powershell/simple/common/publish-item-by-path.js";
import { removeArchiveItemPowerShellTool } from "./tools/powershell/composite/common/remove-archive-item.js";
import { removeItemVersionByIdPowerShellTool } from "./tools/powershell/simple/common/remove-item-version-by-id.js";
import { removeItemVersionByPathPowerShellTool } from "./tools/powershell/simple/common/remove-item-version-by-path.js";
import { resetItemFieldByIdPowerShellTool } from "./tools/powershell/simple/common/reset-item-field-by-id.js";
import { resetItemFieldByPathPowerShellTool } from "./tools/powershell/simple/common/reset-item-field-by-path.js";
import { restartApplicationPowerShellTool } from "./tools/powershell/simple/common/restart-application.js";
import { restoreArchiveItemPowerShellTool } from "./tools/powershell/composite/common/restore-archive-item.js";
import { testBaseTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/test-base-template-by-id.js";
import { testBaseTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/test-base-template-by-path.js";
import { updateItemReferrerByIdPowerShellTool } from "./tools/powershell/composite/common/update-item-referrer-by-id.js";
import { updateItemReferrerByPathPowerShellTool } from "./tools/powershell/composite/common/update-item-referrer-by-path.js";
import { getItemCloneByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-clone-by-id.js";
import { getItemCloneByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-clone-by-path.js";
import { convertFromItemCloneByIdPowerShellTool } from "./tools/powershell/simple/common/convert-from-item-clone-by-id.js";
import { convertFromItemCloneByPathPowerShellTool } from "./tools/powershell/simple/common/convert-from-item-clone-by-path.js";
import { newItemCloneByIdPowerShellTool } from "./tools/powershell/composite/common/new-item-clone-by-id.js";
import { newItemCloneByPathPowerShellTool } from "./tools/powershell/composite/common/new-item-clone-by-path.js";

import { getLayoutByIdPowershellTool } from "./tools/powershell/simple/presentation/get-layout-by-id.js";
import { getLayoutByPathPowershellTool } from "./tools/powershell/simple/presentation/get-layout-by-path.js";
import { setLayoutIdPowershellTool } from "./tools/powershell/composite/presentation/set-layout-by-id.js";
import { setLayoutByPathPowershellTool } from "./tools/powershell/composite/presentation/set-layout-by-path.js";
import { resetLayoutByIdPowershellTool } from "./tools/powershell/simple/presentation/reset-layout-by-id.js";
import { resetLayoutByPathPowershellTool } from "./tools/powershell/simple/presentation/reset-layout-by-path.js";
import { mergeLayoutByIdPowershellTool } from "./tools/powershell/simple/presentation/merge-layout-by-id.js";
import { mergeLayoutByPathPowershellTool } from "./tools/powershell/simple/presentation/merge-layout-by-path.js";
import { getLayoutDevicePowershellTool } from "./tools/powershell/simple/presentation/get-layout-device.js";
import { getDefaultLayoutDevicePowershellTool } from "./tools/powershell/simple/presentation/get-default-layout-device.js";
import { getRenderingByIdPowershellTool } from "./tools/powershell/simple/presentation/get-rendering-by-id.js";
import { getRenderingByPathPowershellTool } from "./tools/powershell/simple/presentation/get-rendering-by-path.js";
import { removeRenderingByPathPowershellTool } from "./tools/powershell/simple/presentation/remove-rendering-by-path.js";
import { removeRenderingByIdPowershellTool } from "./tools/powershell/simple/presentation/remove-rendering-by-id.js";
import { addRenderingByPathPowershellTool } from "./tools/powershell/composite/presentation/add-rendering-by-path.js";
import { addRenderingByIdPowershellTool } from "./tools/powershell/composite/presentation/add-rendering-by-id.js";
import { setRenderingByPathPowershellTool } from "./tools/powershell/composite/presentation/set-rendering-by-path.js";
import { setRenderingByIdPowershellTool } from "./tools/powershell/composite/presentation/set-rendering-by-id.js";
import { switchRenderingByIdPowershellTool } from "./tools/powershell/composite/presentation/switch-rendering-by-id.js";
import { switchRenderingByPathPowershellTool } from "./tools/powershell/composite/presentation/switch-rendering-by-path.js";
import { switchRenderingByUniqueIdPowershellTool } from "./tools/powershell/composite/presentation/switch-rendering-by-unique-id.js";
import { getPlaceholderSettingByIdPowershellTool } from "./tools/powershell/simple/presentation/get-placeholder-setting-by-id.js";
import { getPlaceholderSettingByPathPowershellTool } from "./tools/powershell/simple/presentation/get-placeholder-setting-by-path.js";
import { addPlaceholderSettingByIdPowershellTool } from "./tools/powershell/composite/presentation/add-placeholder-setting-by-id.js";
import { addPlaceholderSettingByPathPowershellTool } from "./tools/powershell/composite/presentation/add-placeholder-setting-by-path.js";
import { removePlaceholderSettingByIdPowershellTool } from "./tools/powershell/simple/presentation/remove-placeholder-setting-by-id.js";
import { removePlaceholderSettingByPathPowershellTool } from "./tools/powershell/simple/presentation/remove-placeholder-setting-by-path.js";
import { getRenderingParameterByIdPowershellTool } from "./tools/powershell/composite/presentation/get-rendering-parameter-by-id.js";
import { getRenderingParameterByPathPowershellTool } from "./tools/powershell/composite/presentation/get-rendering-parameter-by-path.js";
import { removeRenderingParameterByIdPowershellTool } from "./tools/powershell/composite/presentation/remove-rendering-parameter-by-id.js";
import { removeRenderingParameterByPathPowershellTool } from "./tools/powershell/composite/presentation/remove-rendering-parameter-by-path.js";
import { setRenderingParameterByIdPowershellTool } from "./tools/powershell/composite/presentation/set-rendering-parameter-by-id.js";
import { setRenderingParameterByPathPowershellTool } from "./tools/powershell/composite/presentation/set-rendering-parameter-by-path.js";
import { getLogsPowerShellTool } from "./tools/powershell/composite/logging/get-logs.js";

export async function register(array: Array<(server: McpServer, config: Config) => void>,
    server: McpServer,
    config: Config) {
    for (const register of array) {
        await register(server, config);
    }
}

export async function registerAll(server: McpServer, config: Config) {
    await register([
        registerGraphQL,        
        //Item Service
        //Simple Item Service Tools
        getItemTool,
        getItemChildrenTool,
        getItemByPathTool,
        createItemTool,
        editItemTool,
        deleteItemTool,
        searchItemsTool,
        runStoredQueryTool,
        runStoredSearchTool,

        //Composite Item Service Tools
        getItemDescendantsTool,
        getLanguagesTool,     

        //PowerShell tools
        getPowershellDocumentationTool,
        runPowershellScriptTool,

        //Security
        //Simple Security PowerShell Tools
        getUserByIdentityPowerShellTool,
        getCurrentUserPowerShellTool,
        getUserByFilterPowerShellTool,
        newUserPowerShellTool,
        removeUserPowerShellTool,
        disableUserPowerShellTool,
        enableUserPowerShellTool,        
        unlockUserPowerShellTool,
        setUserPowerShellTool,        
        setUserPasswordPowerShellTool,
        getDomainByNamePowerShellTool,
        getAllDomainsPowerShellTool,
        getRoleByIdentityPowerShellTool,
        getRoleByFilterPowerShellTool,
        getRoleMemberPowerShellTool,
        addRoleMemberPowerShellTool,
        removeRoleMemberPowerShellTool,
        lockItemByIdPowerShellTool,
        lockItemByPathPowerShellTool,
        unlockItemPowerShellTool,        
        protectItemByPathPowerShellTool,
        protectItemByIdPowerShellTool,
        unprotectItemByIdPowerShellTool,
        unprotectItemByPathPowerShellTool,
        newRolePowerShellTool,
        removeRolePowerShellTool,
        newDomainPowerShellTool,
        removeDomainPowerShellTool,
        testAccountPowerShellTool,
        getItemAclPowerShellTool,
        testItemAclPowerShellTool,
        addItemAclPowerShellTool,
        clearItemAclPowerShellTool,
        
        //Composite Security PowerShell Tools
        setItemAclByIdPowerShellTool,
        setItemAclByPathPowerShellTool,

        //Common PowerShell Tools
        //Simple Common PowerShell Tools
        addBaseTemplateByIdPowerShellTool,
        addBaseTemplateByPathPowerShellTool,
        addItemVersionByIdPowerShellTool,
        addItemVersionByPathPowerShellTool,
        convertFromItemCloneByIdPowerShellTool,
        convertFromItemCloneByPathPowerShellTool,
        getCachePowerShellTool,
        getDatabasePowerShellTool,
        getItemCloneByIdPowerShellTool,
        getItemCloneByPathPowerShellTool,
        getItemFieldByIdPowerShellTool,
        getItemFieldByPathPowerShellTool,
        getItemReferenceByIdPowerShellTool,
        getItemReferenceByPathPowerShellTool,
        getItemReferrerByIdPowerShellTool,
        getItemReferrerByPathPowerShellTool,
        getItemTemplateByIdPowerShellTool, 
        getItemTemplateByPathPowerShellTool,
        getItemWorkflowEventByIdPowerShellTool,
        getItemWorkflowEventByPathPowerShellTool,
        getSitecoreJobPowerShellTool,
        invokeWorkflowByIdPowerShellTool,
        invokeWorkflowByPathPowerShellTool,
        newItemWorkflowEventByIdPowerShellTool,
        newItemWorkflowEventByPathPowerShellTool,
        publishItemByIdPowerShellTool,
        publishItemByPathPowerShellTool,
        removeBaseTemplateByIdPowerShellTool,
        removeBaseTemplateByPathPowerShellTool,
        removeItemVersionByIdPowerShellTool,
        removeItemVersionByPathPowerShellTool,
        resetItemFieldByIdPowerShellTool,
        resetItemFieldByPathPowerShellTool,
        restartApplicationPowerShellTool,
        setItemTemplateByIdPowerShellTool,
        setItemTemplateByPathPowerShellTool,
        testBaseTemplateByIdPowerShellTool,
        testBaseTemplateByPathPowerShellTool,

        //Composite Common PowerShell Tools 
        getArchivePowerShellTool,
        getArchiveItemPowerShellTool,
        newItemCloneByIdPowerShellTool,
        newItemCloneByPathPowerShellTool,
        removeArchiveItemPowerShellTool,
        restoreArchiveItemPowerShellTool,
        updateItemReferrerByIdPowerShellTool,
        updateItemReferrerByPathPowerShellTool,

        //Presentation
        //Simple Presentation PowerShell Tools
        getLayoutByIdPowershellTool,
        getLayoutByPathPowershellTool,
        resetLayoutByIdPowershellTool,
        resetLayoutByPathPowershellTool,
        mergeLayoutByIdPowershellTool,
        mergeLayoutByPathPowershellTool,
        getLayoutDevicePowershellTool,
        getDefaultLayoutDevicePowershellTool,
        getRenderingByIdPowershellTool,
        getRenderingByPathPowershellTool,
        removeRenderingByPathPowershellTool,
        removeRenderingByIdPowershellTool,
        getPlaceholderSettingByIdPowershellTool,
        getPlaceholderSettingByPathPowershellTool,
        removePlaceholderSettingByIdPowershellTool,
        removePlaceholderSettingByPathPowershellTool,
        
        //Composite Presentation PowerShell Tools
        setLayoutIdPowershellTool,
        setLayoutByPathPowershellTool,
        addRenderingByPathPowershellTool,
        addRenderingByIdPowershellTool,
        setRenderingByPathPowershellTool,
        setRenderingByIdPowershellTool,
        switchRenderingByIdPowershellTool,
        switchRenderingByPathPowershellTool,
        switchRenderingByUniqueIdPowershellTool,
        addPlaceholderSettingByIdPowershellTool,
        addPlaceholderSettingByPathPowershellTool,
        getRenderingParameterByIdPowershellTool,
        getRenderingParameterByPathPowershellTool,
        removeRenderingParameterByIdPowershellTool,
        removeRenderingParameterByPathPowershellTool,
        setRenderingParameterByIdPowershellTool,
        setRenderingParameterByPathPowershellTool,

        //Logging
        getLogsPowerShellTool,

        //Provider
        getItemPowerShellTool,        
        //Indexing PowerShell Tools
        initializeSearchIndexPowerShellTool,
        getSearchIndexPowerShellTool,
        findItemPowerShellTool,
        resumeSearchIndexPowerShellTool,
        suspendSearchIndexPowerShellTool,
        stopSearchIndexPowerShellTool,
        //Composite Indexing PowerShell Tools
        initializeSearchIndexingItemByIdPowerShellTool,
        initializeSearchIndexingItemByPathPowerShellTool,
        removeSearchIndexItemByIdPowerShellTool,
        removeSearchIndexItemByPathPowerShellTool,

    ], server, config);
}