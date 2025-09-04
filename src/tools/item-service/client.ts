import { LogLevel } from "../../logLevel.js";

class RestfulItemServiceClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private authCookie: string | null = null;
    private isInitialized: boolean = false;
    private logLevel: string;

    constructor(serverUrl: string, username: string, password: string, domain: string = 'sitecore', logLevel: string = LogLevel.INFO) {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
        this.logLevel = logLevel;
    }

    /**
     * Initializes the client by logging in and setting the authentication cookie.
     * @returns {Promise<void>} - Resolves if initialization is successful.
     */
    async initialize(): Promise<void> {
        if (!this.isInitialized) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Initializing client...', JSON.stringify({
                    serverUrl: this.serverUrl,
                    username: this.username,
                    domain: this.domain
                }, null, '\t'));
            }
            try {
                await this.login();
                this.isInitialized = true;
                if (this.logLevel === LogLevel.DEBUG) {
                    console.log('Item Service Client: Successfully initialized');
                }
            } catch (error) {
                console.error('Failed to initialize client:', error);
                throw error;
            }
        } else if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Already initialized, skipping initialization');
        }
    }

    /**
     * Logs in to the Sitecore server and sets the authentication cookie.
     * @returns {Promise<void>} - Resolves if login is successful.
     */
    async login(): Promise<void> {
        const url = `${this.serverUrl}/sitecore/api/ssc/auth/login`;
        const loginData = {
            username: this.username,
            password: this.password,
            domain: this.domain
        };

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Attempting login...', JSON.stringify({
                url,
                username: this.username,
                domain: this.domain
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Login response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const cookies = response.headers.get('set-cookie');
            if (cookies) {
                const match = cookies.match(/\.AspNet\.Cookies=([^;]+);/);
                if (match) {
                    this.authCookie = match[1];
                    if (this.logLevel === LogLevel.DEBUG) {
                        console.log('Item Service Client: Authentication cookie retrieved successfully');
                    }
                }
            }
            else {
                throw new Error('No cookies received in response headers');
            }

            if (!this.authCookie) {
                throw new Error('Failed to retrieve authentication cookie');
            }
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Login failed', error);
            }
            if (error instanceof Error) {
                throw new Error(`Failed to log in: ${error.message}`);
            } else {
                throw new Error('Failed to log in: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves a Sitecore item by its ID using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item.
     */
    async getItemById(id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Getting item by ID...', JSON.stringify({
                id,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Get item by ID response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as unknown as Object;
            
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item retrieved successfully', JSON.stringify({
                    itemId: id,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to get item by ID', JSON.stringify({
                    id,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item by ID: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item by ID: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves the children of a Sitecore item by its ID using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item whose children to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item children.
     */
    async getItemChildren(id: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}/children?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Getting item children...', JSON.stringify({
                id,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Get item children response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as unknown as Object;
            
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item children retrieved successfully', JSON.stringify({
                    parentId: id,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to get item children', JSON.stringify({
                    id,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item children: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item children: An unknown error occurred');
            }
        }
    }

    /**
     * Retrieves a Sitecore item by its path using the ItemService RESTful API.
     * @param {string} path - The content path of the Sitecore item to retrieve.
     * @param {Object} [options] - Optional parameters for the request.
     * @returns {Promise<Object>} - The retrieved Sitecore item.
     */
    async getItemByPath(path: string, options: {
        database?: string;
        language?: string;
        version?: string;
        includeStandardTemplateFields?: boolean;
        includeMetadata?: boolean;
        fields?: string[];
    } = {}): Promise<Object> {

        if (!this.isInitialized) {
            await this.initialize();
        }

        // Encode the path parameter to make it URL-safe
        const encodedPath = encodeURIComponent(path);
        const params = new URLSearchParams(options as Record<string, string>);

        if (options.fields) {
            params.set('fields', options.fields.join(','));
        }

        const url = `${this.serverUrl}/sitecore/api/ssc/item?path=${encodedPath}&${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Getting item by path...', JSON.stringify({
                path,
                encodedPath,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Get item by path response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as unknown as Object;
            
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item retrieved by path successfully', JSON.stringify({
                    path,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to get item by path', JSON.stringify({
                    path,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve item by path: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve item by path: An unknown error occurred');
            }
        }
    }

    /**
     * Creates a new Sitecore item using the ItemService RESTful API.
     * @param {string} parentPath - The path where the new item will be created (e.g., 'sitecore/content/Home').
     * @param {object} data - The data for the new item (ItemName, TemplateID, fields, etc).
     * @param {object} [options] - Optional parameters for the request (database, language).
     * @returns {Promise<Object>} - The created Sitecore item response.
     */
    async createItem(parentPath: string, data: {
        ItemName: string;
        TemplateID: string;
        [key: string]: any;
    }, options: {
        database?: string;
        language?: string;
    } = {}): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        // Encode the parentPath for URL
        const encodedPath = encodeURIComponent(parentPath);
        const params = new URLSearchParams(options as Record<string, string>);
        const url = `${this.serverUrl}/sitecore/api/ssc/item/${encodedPath}?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Creating item...', JSON.stringify({
                parentPath,
                encodedPath,
                data,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                },
                body: JSON.stringify(data)
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Create item response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item created successfully",
            };

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item created successfully', JSON.stringify({
                    parentPath,
                    itemName: data.ItemName,
                    templateId: data.TemplateID,
                    result
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to create item', JSON.stringify({
                    parentPath,
                    data,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to create item: ${error.message}`);
            } else {
                throw new Error('Failed to create item: An unknown error occurred');
            }
        }
    }

    /**
     * Edits a Sitecore item using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item to edit.
     * @param {object} data - The data to update (fields, etc).
     * @param {object} [options] - Optional parameters for the request (database, language, version).
     * @returns {Promise<Object>} - The updated Sitecore item response.
     */
    async editItem(id: string, data: {
        [key: string]: any;
    }, options: {
        database?: string;
        language?: string;
        version?: string;
    } = {}): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);
        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Editing item...', JSON.stringify({
                id,
                data,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                },
                body: JSON.stringify(data)
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Edit item response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item updated successfully",
            };

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item edited successfully', JSON.stringify({
                    id,
                    result
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to edit item', JSON.stringify({
                    id,
                    data,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to edit item: ${error.message}`);
            } else {
                throw new Error('Failed to edit item: An unknown error occurred');
            }
        }
    }

    /**
     * Deletes a Sitecore item by its ID using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore item to delete.
     * @param {Object} [options] - Optional parameters for the request (database, language, version).
     * @returns {Promise<Object>} - The response from the delete operation.
     */
    async deleteItem(id: string, options: {
        database?: string;
        language?: string;
        version?: string;
    } = {}): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams(options as Record<string, string>);
        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Deleting item...', JSON.stringify({
                id,
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                }
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Delete item response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item deleted successfully",
            };

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Item deleted successfully', JSON.stringify({
                    id,
                    result
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to delete item', JSON.stringify({
                    id,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to delete item: ${error.message}`);
            } else {
                throw new Error('Failed to delete item: An unknown error occurred');
            }
        }
    }

    /**
     * Searches Sitecore items using the ItemService RESTful API.
     * @param {object} options - Search options (term, fields, facets, etc).
     * @returns {Promise<Object>} - The search results.
     */
    async searchItems(options: {
        term: string;
        fields?: string[];
        facet?: string;
        page?: number;
        pageSize?: number;
        database?: string;
        includeStandardTemplateFields?: boolean;
    }): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const params = new URLSearchParams();
        if (options.term) params.set('term', options.term);
        if (options.fields) params.set('fields', options.fields.join(','));
        if (options.facet) params.set('facet', options.facet);
        if (options.page !== undefined) params.set('page', String(options.page));
        if (options.pageSize !== undefined) params.set('pageSize', String(options.pageSize));
        if (options.database) params.set('database', options.database);
        if (options.includeStandardTemplateFields !== undefined) params.set('includeStandardTemplateFields', String(options.includeStandardTemplateFields));

        const url = `${this.serverUrl}/sitecore/api/ssc/item/search?${params.toString()}`;

        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Searching items...', JSON.stringify({
                options,
                url
            }, null, '\t'));
        }

        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Search items response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as unknown as Object;

            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Search completed successfully', JSON.stringify({
                    searchTerm: options.term,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }

            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to search items', JSON.stringify({
                    options,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to search items: ${error.message}`);
            } else {
                throw new Error('Failed to search items: An unknown error occurred');
            }
        }
    }

    /**
     * Runs a stored query using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore query definition item.
     * @param {object} [options] - Optional parameters for the request (database, language, page, pageSize, fields, includeStandardTemplateFields).
     * @returns {Promise<Object>} - The query results.
     * Query syntax reference:
     * https://doc.sitecore.com/xp/en/developers/latest/sitecore-experience-manager/general-query-syntax.html
     */
    async runStoredQuery(id: string, options: {
        database?: string;
        language?: string;
        page?: number;
        pageSize?: number;
        fields?: string[];
        includeStandardTemplateFields?: boolean;
    } = {}): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }
        const params = new URLSearchParams();
        if (options.database) params.set('database', options.database);
        if (options.language) params.set('language', options.language);
        if (options.page !== undefined) params.set('page', String(options.page));
        if (options.pageSize !== undefined) params.set('pageSize', String(options.pageSize));
        if (options.fields) params.set('fields', options.fields.join(','));
        if (options.includeStandardTemplateFields !== undefined) params.set('includeStandardTemplateFields', String(options.includeStandardTemplateFields));
        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}/query?${params.toString()}`;
        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Running stored query...', JSON.stringify({
                id,
                options,
                url
            }, null, '\t'));
        }
        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Stored query response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json() as unknown as Object;
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Stored query completed successfully', JSON.stringify({
                    queryId: id,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }
            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to run stored query', JSON.stringify({
                    id,
                    options,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to run stored query: ${error.message}`);
            } else {
                throw new Error('Failed to run stored query: An unknown error occurred');
            }
        }
    }

    /**
     * Runs a stored Sitecore search using the ItemService RESTful API.
     * @param {string} id - The GUID of the Sitecore search definition item.
     * @param {object} options - Search options (term, pageSize, page, database, language, includeStandardTemplateFields, fields, facet, sorting).
     * @returns {Promise<Object>} - The search results.
     */
    async runStoredSearch(id: string, term: string, options: {
        pageSize?: number;
        page?: number;
        database?: string;
        language?: string;
        includeStandardTemplateFields?: boolean;
        fields?: string[];
        facet?: string;
        sorting?: string;
    }): Promise<Object> {
        if (!this.isInitialized) {
            await this.initialize();
        }
        const params = new URLSearchParams();
        params.set('term', term);
        if (options.pageSize !== undefined) params.set('pageSize', String(options.pageSize));
        if (options.page !== undefined) params.set('page', String(options.page));
        if (options.database) params.set('database', options.database);
        if (options.language) params.set('language', options.language);
        if (options.includeStandardTemplateFields !== undefined) params.set('includeStandardTemplateFields', String(options.includeStandardTemplateFields));
        if (options.fields) params.set('fields', options.fields.join(','));
        if (options.facet) params.set('facet', options.facet);
        if (options.sorting) params.set('sorting', options.sorting);
        const url = `${this.serverUrl}/sitecore/api/ssc/item/${id}/search?${params.toString()}`;
        if (this.logLevel === LogLevel.DEBUG) {
            console.log('Item Service Client: Running stored search...', JSON.stringify({
                id,
                term,
                options,
                url
            }, null, '\t'));
        }
        try {
            const response = await fetch(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Stored search response received', JSON.stringify({
                    status: response.status,
                    statusText: response.statusText
                }, null, '\t'));
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json() as unknown as Object;
            if (this.logLevel === LogLevel.DEBUG) {
                console.log('Item Service Client: Stored search completed successfully', JSON.stringify({
                    searchId: id,
                    term,
                    resultKeys: Object.keys(result)
                }, null, '\t'));
            }
            return result;
        } catch (error) {
            if (this.logLevel === LogLevel.DEBUG) {
                console.error('Item Service Client: Failed to run stored search', JSON.stringify({
                    id,
                    term,
                    options,
                    error
                }, null, '\t'));
            }
            if (error instanceof Error) {
                throw new Error(`Failed to run stored search: ${error.message}`);
            } else {
                throw new Error('Failed to run stored search: An unknown error occurred');
            }
        }
    }

}

export default RestfulItemServiceClient;