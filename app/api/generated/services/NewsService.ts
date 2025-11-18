/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArticleCreateRequest } from '../models/ArticleCreateRequest';
import type { NewsArticle } from '../models/NewsArticle';
import type { NewsArticleDto } from '../models/NewsArticleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsService {
    /**
     * @param id
     * @returns NewsArticle
     * @throws ApiError
     */
    public static newsGetArticle(
        id: number,
    ): CancelablePromise<Array<NewsArticle>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/article/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns NewsArticleDto
     * @throws ApiError
     */
    public static newsUpdateArticle(
        id: number,
        requestBody: ArticleCreateRequest,
    ): CancelablePromise<NewsArticleDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/article/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
            url: '/v1/article/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns NewsArticle
     * @throws ApiError
     */
    public static newsGetArticles(): CancelablePromise<Array<NewsArticle>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/article',
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
            url: '/v1/article',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
