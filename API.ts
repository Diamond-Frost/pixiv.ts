import axios, {AxiosRequestConfig} from "axios"
import {ParsedUrlQueryInput, stringify} from "querystring"
import {URLSearchParams} from "url"
import {PixivAPIResponse} from "./types/ApiTypes"
import {PixivAuthData, PixivAuthHeaders, PixivParams} from "./types/index"

const oauthURL = "https://oauth.secure.pixiv.net/auth/token"
const appURL = "https://app-api.pixiv.net/"
const webURL = "https://www.pixiv.net/"
const publicURL = "https://public-api.secure.pixiv.net/"

export default class API {
    private readonly userAgent = {"user-agent": "PixivIOSApp/7.7.5 (iOS 13.2.0; iPhone XR)"}
    public constructor(private readonly data: PixivAuthData,
                       private readonly headers: PixivAuthHeaders,
                       private refreshToken: string,
                       private accessToken: string,
                       private readonly loginTime: number,
                       private readonly expirationTime: number) {}

    /**
     * Gets a new access token if the refresh token expires.
     */
    public refreshAccessToken = async (refreshToken?: string) => {
        if (refreshToken) this.refreshToken = refreshToken
        const expired = (Date.now() - this.loginTime) > (this.expirationTime * 900)
        if (expired) {
            this.data.grant_type = "refresh_token"
            const result = await axios.post(oauthURL, stringify(this.data as unknown as ParsedUrlQueryInput),
            {headers: this.headers} as AxiosRequestConfig).then((r) => r.data) as PixivAPIResponse
            this.accessToken = result.response.access_token
            this.refreshToken = result.response.refresh_token
            this.headers.authorization = `Bearer ${this.accessToken}`
        }
        return this.refreshToken
    }

    /**
     * Fetches an endpoint from the API and returns the response.
     */
    public get = async (endpoint: string, params?: PixivParams) => {
        await this.refreshAccessToken()
        if (!params) params = {}
        params.filter = "for_ios"
        params.access_token = this.accessToken
        if (endpoint.startsWith("/")) endpoint = endpoint.slice(1)
        endpoint = appURL + endpoint
        const response = await axios.get(endpoint, {json: true, form: true, headers: this.userAgent, params} as AxiosRequestConfig).then((r) => r.data)
        return response
    }

    /**
     * Fetches the url in the nextUrl() property of search responses.
     */
    public next = async (nextUrl: string) => {
        await this.refreshAccessToken()
        const {baseUrl, params} = this.destructureParams(nextUrl)
        params.access_token = this.accessToken
        const response = await axios.get(baseUrl, {params, headers: this.userAgent}).then((r) => r.data)
        return response
    }

    /**
     * Destructures a URL to get all of the search parameters and values.
     */
    public destructureParams = (nextUrl: string) => {
            const paramUrl = nextUrl.split("?")
            const baseUrl = paramUrl[0]
            paramUrl.shift()
            const searchParams = new URLSearchParams(paramUrl.join(""))
            const params: PixivParams = {}
            for (const [key, value] of searchParams) {
              params[key] = value
            }
            return {baseUrl, params}
    }

    /**
     * Fetches any url.
     */
    public request = async (url: string, params?: any) => {
        return axios.get(url, params).then((r) => r.data)
    }
}
