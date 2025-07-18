import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { PowershellClient } from "@/tools/powershell/client.js";

// The results of usage of this tool are not quite good.
// Problems:
// 1. Huge amount of field names
// 2. Huge amount of data to return
// 3. Different filter values
// 4. Find-Item command, which is wrapper around Sitecore Content Search API doesn't not return total count of items found.
// 5. AI agents are bad at proceeding long lists. E.g. search returns 100 items, AI agent parses only the first 24 and ignores the rest.

// The "rails" with strictly defined fields and filters helps to impove the tool.
// But results are still not good enough.
// Leaving this tool as is for now, it require more research and improvements in the future.

const filterValues = [
    "Equals",
    "StartsWith",
    "Contains",
    "ContainsAny",
    "ContainsAll",
    "EndsWith",
    "DescendantOf",
    "Fuzzy",
    "InclusiveRange",
    "ExclusiveRange",
    "MatchesRegex",
    "MatchesWildcard",
    "LessThan",
    "GreaterThan"
];

// PowerShell command to get all fields from the Sitecore master index.
const allFieldsCommand =
    `
$id = Start-ScriptSession -ScriptBlock { 
                                $solrConnectionString = [Sitecore.Configuration.Settings]::GetConnectionString("solr.search").Split(";")[0];
                                $url = $solrConnectionString + "/sitecore_master_index/select?q=*:*&wt=csv&rows=0"
                                Invoke-WebRequest -Uri $url -UseBasicParsing
                            } -ArgumentList $params | Select-Object -ExpandProperty ID
Start-Sleep 1

$backgroundScriptSession = Get-ScriptSession -Id $id -ErrorAction SilentlyContinue
$backgroundScriptSession | Receive-ScriptSession | ForEach-Object { $_.Content }
`;

// PowerShell command to get all dynamic suffixes from the Sitecore master index.
// The one of ideas is do not use suffixes at all to decrease context for AI agents.
const allDynamicSuffixes =
    `
$factoryType = [Type]::GetType("Sitecore.ContentSearch.SolrProvider.SolrNetIntegration.BaseSolrOperationsFactory\`\`1[[System.Collections.Generic.Dictionary\`\`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib]]")
$factory = [CommonServiceLocator.ServiceLocator]::Current.GetInstance("Sitecore.ContentSearch.SolrProvider.SolrNetIntegration.BaseSolrOperationsFactory\`\`1[[System.Collections.Generic.Dictionary\`\`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib]]")
$solrSchemaProvider =$factory.GetSolrOperations("sitecore_master_index")
$managedSchema = $solrSchemaProvider.GetManagedSchema();
$managedSchema.SolrDynamicFields | ForEach-Object {$_.Name}
`;

const allFieldsDefault = [
    "dictionary_t", "name_t_en", "text1_t_fr", "author_t_en", "fallback_domain_sm", "currency2_t_fr", "link2_t_fr", "symbol1_t_en", "datasource_template_t_en", "stackatbreakpoint_t_en", "eyebrow_t_en", "name_t_fr", "data_source_t", "preview_publishing_target_b", "replacement_html_t_en", "datasource_template_t_de", "database_t_en", "currency2_t_en", "termname_t_ja", "site_collection_s", "command_t_de", "text1_t_en", "should_update_item_name_b", "culture_s", "size_t_da", "authority_url_t", "stackatbreakpoint_t_da", "stackatbreakpoint_t_de", "submitbutton_t", "quote_t_en", "default_language_t_en", "size_t_en", "command_name_t", "defaultfields_t_da", "method_t_en", "phrase_t", "socialicon3_t", "__display_name_t_zh", "command_t_en", "__base_template_sm", "max_result_t", "startlabel_t_da", "startlabel_t_de", "title1_t_en", "type_t", "subtitle1_t_ja", "text3_t", "_path", "keywords_t_en", "includestandardtemplatefields_b", "cmp_field_name_t", "serversiderenderingengineapplicationurl_t", "link2_t_en", "defaultfields_t_en", "amount1_t_ja", "method_t_da", "value1_tf", "title2_t_ja", "customize_page_t", "critical_error_t", "startlabel_t_en", "fatal_error_t", "comment_dialog_height_tl", "key_t", "control_type_sm", "description_t_en", "item_template_t_en", "cacheable_b", "field_t_zh", "value3_tf", "shared_b", "text1_t_ja", "cta1_t", "max_result_t_zh", "default_value_t_zh", "image2_t", "enabled_b", "workflow_sm", "datasource_template_t_fr", "socialicon1_t", "sociallink3_t_fr", "text2_t_ja", "content_hub_attribute_t", "name_t_da", "script_t_zh", "_templates", "text1_t", "usecontextitem_b", "value_t", "showinsitemap_b", "name_t_de", "quick_action_bar_sm", "amount1_t_fr", "item_template_t", "symbol1_t", "itemnameproperty_t_en", "_version_", "webmethod_t", "cors_origins_t_en", "sociallink3_t_en", "parameters_t_ja", "header_prefix_t_en", "async_b", "validation_t_zh", "startlabel_t_ja", "appearance_evaluator_type_t", "description_t", "cmp_field_name_t_en", "backgroundimage_t", "photo_t", "webmethod_t_zh", "sociallink2_t_en", "time_span_tl", "componentquery_t", "answer_t_fr", "ispointofinterest_b", "subtitle2_t_ja", "longitude_tf", "footer_template_t_en", "tagline_t", "error_t_ja", "icon_t_en", "__quick_actions_sm", "header_prefix_t", "path_t_en", "placeholder_key_t_ja", "site_type_s", "socialicon3_t_en", "answer_t_en", "default_simulator_sm", "componentname_t_zh", "stackatbreakpoint_t", "parsedlanguage_s", "eyebrow_t", "datasource_template_t_ja", "symbol3_t", "sociallink3_t_ja", "sociallink1_t", "agent_t", "path_t_de", "validationtext_t_zh", "client_side_hook_s", "_language", "termname_t_en", "link2_t_ja", "error_t_de", "subtitle2_t_en", "allowedcontrollers_t_en", "open_properties_after_add_t", "license_t_en", "authorimage_t", "content_t", "__shared_revision_t_ja", "buttonlabel_t", "isbucket_text_s", "termname_t_fr", "dimensions_t", "mime_type_t", "subtitle2_t_fr", "minterm_tl", "authorimage_t_en", "search_filter_t", "_displayname", "error_t_en", "answer_t_ja", "namespace_t", "script_t", "position_t_ja", "__solr_norm_field_name_s", "validator_bar_sm", "path_t_ja", "title2_t_en", "reference_sm", "error_t_fr", "sociallink3_t", "command_t_ja", "_uniqueid", "_isclone", "subjectlabel_t", "screen_offset_t", "text5_t", "title2_t_fr", "reset_blank_b", "default_comment_dialog_height_tl", "foregroundimage_t", "datasource_location_t_de", "open_properties_after_add_t_zh", "amount1_t", "minimum_number_of_items_tf", "title1_t", "engine_type_name_t_en", "caption1_t_en", "display_name_t_en", "image5_t_fr", "collapsed_by_default_b", "subtext1_t_ja", "parsedcreatedby_s", "regional_iso_code_t", "mime_type_t_hy", "field_t_en", "engine_type_name_t", "buttonstyle_s", "_version", "position_t_en", "module_version_t_en", "command_t", "field_t_da", "title_t_zh", "charset_t_en", "field_t_de", "rendering_contents_resolver_sm", "imagedescription_t_en", "title3_t_en", "link5_t", "position_t_fr", "target_database_t_en", "settingsfolder_sm", "text3_t_ja", "sociallink1_t_en", "exclude_templates_sm", "sitecore_field_name_sm", "type_t_zh", "parameters_t_da", "width_t_en", "currency_t_ja", "engine_type_name_t_de", "title3_t_fr", "title_t", "encoding_t", "sociallink1_t_fr", "comment_template_sm", "image5_t_en", "currency1_t_ja", "submitbutton_t_ja", "parameters_t_de", "webmethod_t_da", "webmethod_t_de", "subtext1_t_en", "preservelanguage_b", "engine_type_name_t_ja", "default_comment_template_sm", "submitbutton_t_fr", "opening_search_results_s", "initial_state_sm", "thumbnail_t_en", "image5_t_ja", "validation_t", "title3_t", "image1_t_fr", "parameters_t_en", "max_result_t_ja", "thumbnail_t_fr", "header_template_t_en", "subtext1_t", "abstract_t_en", "default_language_t", "footnote_t", "published_by_t_en", "parameters_t_fr", "subtext1_t_fr", "image1_t_en", "controller_t_de", "header_t", "placeholder_key_t", "field_t", "validationtext_t", "iso_t", "category_t_en", "title3_t_ja", "displayname_t_en", "lastscript_t_da", "text3_t_en", "_database", "istemplate_b", "support_t", "alt_t", "sociallink1_t_ja", "message_t_en", "add_to_s", "symbol3_t_en", "__boost", "currency1_t_fr", "page_design_s", "caption1_t", "fallback_device_sm", "module_version_t", "submitbutton_t_en", "text3_t_fr", "width_t_hy", "backgroundcolor_s", "dictionary_t_en", "heading_t", "lastscript_t_en", "final_b", "termname_t", "currency2_t", "footnote_t_en", "currency1_t_en", "startlabel_t_zh", "__semantics", "url_t_en", "promotext_t_de", "showfilters_b", "amount1_t_en", "value1_t_ja", "promotext_t_da", "question_t_ja", "branchesfolder_sm", "extension_t_en", "max_result_t_en", "authorposition_t_en", "lastscript_t_fr", "link1_t", "value1_t", "footnote_t_fr", "webmethod_t_ja", "link_t", "throttle_strategy_sm", "subtext3_t", "promotext_t_en", "placeholder_t", "login_rendering_sm", "image1_t_ja", "error_t_zh", "max_result_t_fr", "validation_t_ja", "controller_t_en", "copyright_t_fr", "_template", "content_hub_attribute_t_en", "phrase_t_ja", "itemselectorquery_t_zh", "endlabel_t_zh", "subtitle3_t", "authorname_t", "componentquery_t_de", "placeholder_key_t_zh", "__enable_item_fallback_b", "copyright_t_en", "savelastscript_b", "image_t", "field_t_ja", "fatal_error_t_ja", "componentname_t_ja", "link3_t_ja", "bio_t", "image5_t", "subtitle4_t_ja", "extension_t_da", "componentquery_t_en", "validationtext_t_ja", "max_result_t_de", "assembly_t", "buttonlabel_t_en", "validate_button_sm", "lastscript_t_ja", "controller_t_ja", "validation_t_en", "stackatbreakpoint_t_ja", "enable_datasource_query_b", "subtitle1_t_en", "default_b", "webmethod_t_en", "__shared_revision_t_zh", "_templatename", "question_t_en", "value1_t_fr", "name_t_ja", "componentname_t_fr", "tag_t", "size_t_hy", "fatal_error_t_de", "link3_t", "checkbox_b", "question_t_fr", "value_t_en", "datasource_template_t", "author_t", "layout_t_en", "value1_t_en", "__validate_button_validation_rules_sm", "data_source_t_en", "subtitle1_t", "editable_b", "path_t_zh", "_parent", "componentname_t_de", "command_t_zh", "fatal_error_t_fr", "datetime_t", "link3_t_en", "phrase_t_fr", "authorposition_t", "navigationtitle_t_zh", "validation_t_de", "componentquery_t_ja", "tag_parent_sm", "_indexname", "emaillabel_t_en", "subtitle1_t_fr", "ignore_dictionary_translations_b", "fatal_error_t_en", "extension_t_hy", "componentname_t_en", "phrase_t_en", "link3_t_fr", "heading_t_en", "controller_action_t", "height_t", "__enforce_version_presence_b", "text5_t_ja", "license_t", "message_t", "isrendering_b", "messagelabel_t", "image3_t_en", "display_text_t_de", "__smallcreateddate_tdt", "title_t_ja", "persistentsessionid_t", "error_t", "text2_t", "caption3_t_en", "subtext3_t_ja", "haschildren_b", "movielabel_t_en", "cta2_t_en", "placeholder_t_en", "unversioned_b", "bio_t_fr", "type_t_ja", "category_t", "heading_t_da", "display_text_t_en", "language_t", "heading_t_de", "background_image_t", "promotext_t_ja", "navigationtitle_t_en", "_latestversion", "header_t_en", "_fullpath", "bio_t_en", "include_templates_sm", "exclude_items_t", "agent_t_ja", "rootitem_sm", "__workflow_state", "navigationtitle_t_da", "image1_t", "subjectlabel_t_en", "navigationtitle_t_de", "__display_name_t", "subtext2_t_en", "command_name_t_en", "charset_t", "itemselectorquery_t_da", "subtitle_t", "itemselectorquery_t_de", "controller_action_t_ja", "socialicon2_t", "exported_function_name_t_en", "engine_type_name_t_zh", "validationtext_t_de", "position_t", "heading_t_ja", "query_t_en", "list_name_t", "__unversioned_revision_t", "event_name_t", "allowed_number_of_requests_tl", "maxamount_tl", "maxterm_tl", "datasource_location_t_zh", "screen_offset_t_en", "_indextimestamp", "agent_t_de", "__publishing_groups_sm", "type_t_fr", "script_sm", "role_name_t_fr", "footnote_t_ja", "symbol2_t", "default_value_t", "image4_t_ja", "question_t", "text4_t_en", "__unversioned_revision_t_ja", "currency1_t", "query_t_da", "bio_t_ja", "itemselectorquery_t", "search_filter_t_en", "agent_t_en", "type_t_en", "render_as_html_b", "extension_t", "currency_t", "socialstitle_t_fr", "value2_tf", "rating_tf", "promotext_t_fr", "subtitle4_t_en", "type_t_de", "validationtext_t_en", "serversiderenderingengineconfigurl_t_zh", "quote_t", "cta2_t", "control_type_parameters_t", "exclude_from_text_search_b", "itemselectorquery_t_en", "image3_t", "subtitle4_t_fr", "theme_t", "control_type_t", "type_t_da", "use_alternate_content_b", "socialstitle_t_en", "image4_t_en", "regional_iso_code_t_en", "method_t", "query_string_t_en", "datasource_location_t", "__unversioned_revision_t_de", "__should_not_organize_in_bucket_b", "__unversioned_revision_t_da", "critical_error_t_zh", "caption2_t_en", "title4_t_en", "enable_language_fallback_b", "thumbnail_t_ja", "messagelabel_t_en", "thumbnail_t", "cta1_t_fr", "blob_b", "image4_t_fr", "link_t_ja", "text4_t_ja", "foregroundimage_t_fr", "interestrate_tf", "support_t_en", "sitecore_attribute_t_en", "controller_action_t_en", "title4_t_fr", "cacheclearingbehavior_s", "screen_height_tf", "next_state_sm", "display_text_t", "template_sm", "encoding_t_en", "sizerange_s", "image2_t_fr", "bucket_sm", "foregroundimage_t_en", "header_template_t", "title4_t", "itemselectorquery_t_ja", "excerpt_t", "text4_t_fr", "fallback_language_s", "endlabel_t_ja", "caption3_t", "serversiderenderingengineconfigurl_t", "imagedescription_t", "backgroundimage_t_en", "image2_t_en", "global_b", "__unversioned_revision_t_en", "background_image_t_en", "role_name_t_en", "command_sm", "fatal_error_t_zh", "cta1_t_en", "overwrite_b", "content_t_ja", "backgroundimage_t_fr", "mime_type_t_da", "parameters_template_sm", "name_t_zh", "assembly_t_en", "subtext3_t_fr", "size_t", "server_script_path_t", "sociallink2_t", "tagprefix_t", "email_t_en", "non_leaf_node_option_sm", "hostwidth_tf", "stackatbreakpoint_t_zh", "code_t", "display_name_t", "text4_t", "socialicon1_t_en", "code_page_t", "display_text_t_ja", "includeserverurlinmediaurls_b", "exclude_items_t_en", "list_name_t_en", "mime_type_t_en", "controller_t_zh", "query_t", "theme_t_en", "navigationtitle_t_fr", "subtext3_t_en", "eventname_t", "replacement_html_t", "server_script_path_t_en", "authority_url_t_en", "content_t_en", "link4_t_en", "auto_remove_b", "navigationtitle_t_ja", "image2_t_ja", "controller_action_t_de", "currency_t_en", "sitetemplate_sm", "solution_t", "numberofitems_tl", "content_t_fr", "client_t_en", "placeholders_sm", "__insert_rules_sm", "componentquery_t_zh", "currency_t_fr", "alt_t_en", "backgroundimage_t_ja", "allowed_controls_sm", "_name", "use_thread_b", "placeholder_key_t_de", "_haslayout_b", "script_t_da", "answer_t", "control_type_t_en", "sitecore_attribute_t", "subtitle3_t_ja", "amount2_t_fr", "database_t", "height_t_en", "event_name_t_en", "navigationtitle_t", "appearance_evaluator_type_t_en", "__created_by_s", "displayname_t", "link4_t_fr", "__display_name_t_fr", "datasource_location_t_en", "default_value_t_en", "script_t_de", "group_sm", "__shared_revision_t_fr", "amount2_t_en", "endlabel_t", "excerpt_t_en", "__shared_revision_t_de", "__shared_revision_t_da", "subtitle_t_ja", "datasource_location_t_fr", "agent_t_zh", "link_t_en", "__display_name_t_ja", "persistentsessionid_t_da", "publish_to_experience_edge_b", "script_t_en", "control_t", "link4_t", "excerpt_t_fr", "suppress_comment_b", "eventtypes_sm", "__quick_action_bar_validation_rules_sm", "__shared_revision_t_en", "iso_t_en", "componentname_t", "persistentsessionid_t_en", "path_t", "defaultfields_t", "__solr_field_type_s", "cors_origins_t", "_group", "script_t_fr", "heading_t_zh", "subtitle3_t_fr", "open_properties_after_add_t_de", "critical_error_t_en", "__validator_bar_validation_rules_sm", "page_editor_buttons_sm", "dimensions_t_en", "published_by_t", "__display_name_t_da", "default_value_t_ja", "render_engine_type_sm", "height_t_hy", "endlabel_t_da", "caption2_t", "title4_t_ja", "logoimage_t_en", "critical_error_t_fr", "link4_t_ja", "controller_action_t_zh", "link_t_fr", "_datasource", "control_t_en", "sociallink2_t_ja", "datasource_location_t_ja", "image_t_en", "endlabel_t_de", "tagprefix_t_en", "promotext_t_zh", "exported_function_name_t", "role_name_t", "tagline_t_en", "liveautocompletion_b", "script_t_ja", "amount2_t", "title2_t", "sociallink2_t_fr", "__display_name_t_en", "copyright_t", "email_t", "link5_t_ja", "serversiderenderingengineconfigurl_t_ja", "datetime_t_en", "endlabel_t_en", "fontfamily_s", "image_t_fr", "subtitle_t_fr", "placeholder_key_t_en", "__display_name_t_de", "footer_template_t", "subtext2_t", "logoimage_t", "dimensions_t_hy", "excerpt_t_ja", "serialization_type_sm", "target_database_t", "__unversioned_revision_t_zh", "icon_s", "icon_t", "__autothumbnails_b", "critical_error_t_de", "subtitle_t_en", "name_t", "url_t", "parsedupdatedby_s", "socialstitle_t", "critical_error_t_ja", "serversiderenderingengineconfigurl_t_de", "link1_t_en", "code_page_t_en", "customize_page_t_en", "allowedcontrollers_t", "subtitle4_t", "parameters_t_zh", "abstract_t", "keywords_t", "key_t_ja", "solution_t_en", "minamount_tl", "enable_shared_language_fallback_b", "client_t", "addfieldeditorbutton_b", "link1_t_fr", "problem_t_en", "image4_t", "title1_t_ja", "authorname_t_en", "parameters_t", "_creator", "text2_t_fr", "symbol2_t_en", "eventname_t_en", "calculateddimension_sm", "open_properties_after_add_t_fr", "text2_t_en", "image_t_ja", "itemnameproperty_t", "link5_t_fr", "tag_name_option_sm", "foregroundcolor_s", "namespace_t_en", "emaillabel_t", "datasource_template_t_zh", "controller_t", "serversiderenderingengineconfigurl_t_en", "open_properties_after_add_t_en", "subtitle3_t_en", "promotext_t", "image3_t_ja", "photo_t_ja", "latitude_tf", "movielabel_t", "link5_t_en", "site_sm", "amount2_t_ja", "text5_t_en", "currency2_t_ja", "__smallupdateddate_tdt", "subtitle2_t", "key_t_fr", "query_string_t", "subtext2_t_fr", "title_t_en", "layout_t", "tag_t_en", "__shared_revision_t", "fontsize_tf", "text5_t_fr", "control_type_parameters_t_en", "display_text_t_zh", "title_t_fr", "problem_t", "code_t_en", "language_t_en", "scale_sm", "startlabel_t", "title1_t_fr", "screen_width_tf", "link1_t_ja", "socialicon2_t_en", "__standard_values_sm", "width_t", "bankfee_tf", "lastscript_t", "photo_t_fr", "link2_t", "authorization_sm", "title_t_da", "serversiderenderingengineapplicationurl_t_en", "key_t_en", "open_properties_after_add_t_ja", "default_value_t_de", "image3_t_fr", "tags_sm", "title_t_de", "photo_t_en", "subtext2_t_ja_x000A_"
];

const languages = ["En"];

const iso8601DateRegex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export async function findItemPowerShellTool(server: McpServer, config: Config) {
    const client = new PowershellClient(
        config.powershell.serverUrl,
        config.powershell.username,
        config.powershell.password,
        config.powershell.domain
    );
    let allFieldsCommandResult: string[] = [
        ...allFieldsDefault // Fallback to a predefined list of fields if the command fails
    ];
    let allDynamicSuffixesResult: string[] = [];

    try {
        allFieldsCommandResult = await JSON.parse(await client.executeScriptJson(allFieldsCommand, {})).Obj[0]
            .split(",")
            .map((field: string) => field.trim());
        allDynamicSuffixesResult = await JSON.parse(await client.executeScriptJson(allDynamicSuffixes, {})).Obj;
    } catch (error) {
        //console.error("Error fetching all fields or dynamic suffixes:", error);
        // Fallback to a predefined list of fields if the command fails
    }

    //https://doc.sitecorepowershell.com/appendix/indexing/find-item
    server.tool(
        "indexing-find-item",
        "Finds items using the Sitecore Content Search API. Date format should be in ISO 8601 format (e.g., '2023-10-01T00:00:00Z').",
        {
            index: z.string().optional()
                .default("sitecore_master_index").describe("The name of the Sitecore index to search in. e.g., 'sitecore_master_index', 'sitecore_web_index'."),
            //array of objects
            criteria: z.array(
                z.object({
                    filter: z.enum(filterValues as [string, ...string[]]).describe("The type of filter to apply to the search criteria."),
                    field: z.enum(
                        [...allFieldsCommandResult] as [string, ...string[]]
                    ).describe(`Index Field name found on the SearchResultItem such as the following: ${allFieldsCommandResult.join(", ")}.
                    _fullPath is the field to search by the item path.
                    _haslayout_b is the field to check if an item has presentation details or layout.`),
                    value: z.string().describe("The value to search for."),

                })
            ),
            first: z.number().optional().default(200).describe("The maximum number of results to return. Defaults to 200."),
            skip: z.number().optional().default(0).describe("The number of results to skip. Defaults to 0."),
        },
        async (params) => {

            const criteria = params?.criteria?.map(c => {
                // Depending on the field type and filter type, the criteria format may vary.
                // Implemented only for DateTime fields and some common filters.
                // Other fields should be implmented as needed.
                if (c.field.endsWith("_dt")
                    || c.field.endsWith("_tdt")) {
                    if (c.filter === "InclusiveRange"
                        || c.filter === "ExclusiveRange") {
                        let divider = "";
                        if (c.value.indexOf("|") > -1) {
                            divider = "|";
                        }
                        else {
                            throw new Error(`Invalid date range format for field ${c.field}. Expected format is 'start_date | end_date'.`);
                        }
                        const [startDate, endDate] = c.value.split(divider).map(date => date.trim());
                        if (!startDate || !endDate) {
                            throw new Error(`Invalid date range format for field ${c.field}. Expected format is 'start_date | end_date'.`);
                        }
                        if (!iso8601DateRegex.test(startDate) || !iso8601DateRegex.test(endDate)) {
                            throw new Error(`Invalid date format for field ${c.field}. Expected format is ISO 8601 (e.g., '2023-10-01T00:00:00Z'). 'start_date | end_date'`);
                        }
                        return `@{ Filter = "${c.filter}"; Field = "${c.field}"; Value = [datetime[]]@([datetime]"${startDate}", [datetime]"${endDate}"); }`;
                    }
                    if (!iso8601DateRegex.test(c.value)) {
                        throw new Error(`Invalid date format for field ${c.field}. Expected format is ISO 8601 (e.g., '2023-10-01T00:00:00Z').`);
                    }
                    return `@{ Filter = "${c.filter}"; Field = "${c.field}"; Value = [datetime]"${c.value}"; }`;
                }

                return `@{ Filter = "${c.filter}"; Field = "${c.field}"; Value = "${c.value}"; }`;
            }).join(", ");

            let extraFields = "";
            params.criteria.forEach((c: any) => {
                extraFields += `, @{n="${c.field}"; e={$_.Fields["${c.field}"]}}`;
            });

            const command = `Find-Item -Index "${params.index}" -Criteria @(${criteria}) -First ${params.first} -Skip ${params.skip} | Select-Object  @{n="Name"; e={$_.Name}}, @{n="Path"; e={$_.Path}},@{n="ItemId"; e={$_.ItemId.ToString()}}, @{n="TemplateId"; e={$_.TemplateId.ToString()}}, @{n="TemplateName"; e={$_.TemplateName}} ${extraFields}`;

            return safeMcpResponse(client.executeScriptJson(command, {}).then(
                (result: any) => {
                    const items = JSON.parse(result).Obj;
                   
                    return {
                        content: [{
                            type: "text",
                            text: result === "{}" ? "No items found." : JSON.stringify(items, null, 2)
                        }]
                    };
                },
                (error: any) => {
                    throw error; // Rethrow the error to be handled by safeMcpResponse
                }
            ));

        }
    );
}
