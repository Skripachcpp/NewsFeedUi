/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleCreateRequest } from '../models/ArticleCreateRequest';
import type { ArticleUpdateRequest } from '../models/ArticleUpdateRequest';
import type { NewsArticleDto } from '../models/NewsArticleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsService {
    /**
     * @param id
     * @returns NewsArticleDto
     * @throws ApiError
     */
    public static newsGetArticle(
        id: number,
    ): CancelablePromise<NewsArticleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/news/article/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns binary
     * @throws ApiError
     */
    public static newsDeleteArticle(
        id: number,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/news/article/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns NewsArticleDto
     * @throws ApiError
     */
    public static newsGetArticles(): CancelablePromise<Array<NewsArticleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/news/articles',
        });
    }
    /**
     * @param requestBody
     * @returns NewsArticleDto
     * @throws ApiError
     */
    public static newsCreateArticle(
        requestBody: ArticleCreateRequest,
    ): CancelablePromise<NewsArticleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/news/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns NewsArticleDto
     * @throws ApiError
     */
    public static newsUpdateArticle(
        requestBody: ArticleUpdateRequest,
    ): CancelablePromise<NewsArticleDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/news/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
