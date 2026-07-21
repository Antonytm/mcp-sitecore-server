import { fetchWithTimeout } from "@/utils.js";

class RestfulItemServiceClient {
    private serverUrl: string;
    private username: string;
    private password: string;
    private domain: string;
    private authCookie: string | null = null;
    private isInitialized: boolean = false;

    constructor(serverUrl: string, username: string, password: string, domain: string = 'sitecore') {
        this.serverUrl = serverUrl;
        this.username = username;
        this.password = password;
        this.domain = domain;
    }

    /**
     * Initializes the client by logging in and setting the authentication cookie.
     * @returns {Promise<void>} - Resolves if initialization is successful.
     */
    async initialize(): Promise<void> {
        if (!this.isInitialized) {
            try {
                await this.login();
                this.isInitialized = true;
            } catch (error) {
                console.error('Failed to initialize client:', error);
                throw error;
            }
        }
    }

    /**
     * Logs in to the Sitecore server and sets the authentication cookie.
     * @returns {Promise<void>} - Resolves if login is successful.
     */
    async login(): Promise<void> {
        const url = `${this.serverUrl}/sitecore/api/ssc/auth/login`;

        try {

            const response = await fetchWithTimeout(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                    domain: this.domain
                })
            });


            if (!response.ok) {
                throw new Error('Login failed');
            }

            const cookies = response.headers.get('set-cookie');
            if (cookies) {
                const match = cookies.match(/\.AspNet\.Cookies=([^;]+);/);
                if (match) {
                    this.authCookie = match[1];
                }
            }
            else {
                throw new Error('No cookies received in response headers');
            }

            if (!this.authCookie) {
                throw new Error('Failed to retrieve authentication cookie');
            }
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json() as unknown as Object;
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item created successfully",
            };
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item updated successfully",
            }
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                method: 'DELETE',
                headers: {
                    'Cookie': `.AspNet.Cookies=${this.authCookie}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                "Status": "Success",
                "Code": response.status,
                "Message": "Item deleted successfully",
            };
        } catch (error) {
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

        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json() as unknown as Object;
        } catch (error) {
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
        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json() as unknown as Object;
        } catch (error) {
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
        try {
            const response = await fetchWithTimeout(url, {
                headers: { 'Cookie': `.AspNet.Cookies=${this.authCookie}` }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json() as unknown as Object;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to run stored search: ${error.message}`);
            } else {
                throw new Error('Failed to run stored search: An unknown error occurred');
            }
        }
    }

}

export default RestfulItemServiceClient;