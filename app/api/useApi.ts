import { NewsService, TagsService, OpenAPI, type NewsArticleDto, type ArticleCreateRequest, type ArticleUpdateRequest, type TagDto } from "~/api/generated";

export const useApi = () => {
  const config = useRuntimeConfig();
  if (config.public.apiBaseUrl) {
    OpenAPI.BASE = config.public.apiBaseUrl;
  }

  const getArticles = async (): Promise<NewsArticleDto[]> => {
    return await NewsService.newsGetArticles();
  };

  const getArticle = async (id: number): Promise<NewsArticleDto> => {
    return await NewsService.newsGetArticle(id);
  };

  const createArticle = async (requestBody: ArticleCreateRequest): Promise<NewsArticleDto> => {
    return await NewsService.newsCreateArticle(requestBody);
  };

  const updateArticle = async (requestBody: ArticleUpdateRequest): Promise<NewsArticleDto> => {
    return await NewsService.newsUpdateArticle(requestBody);
  };

  const deleteArticle = async (id: number): Promise<void> => {
    await NewsService.newsDeleteArticle(id);
  };

  const getTags = async (): Promise<TagDto[]> => {
    return await TagsService.tagsGetTags();
  };

  const deleteTag = async (id: number): Promise<void> => {
    await TagsService.tagsDeleteTag(id);
  };

  return {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getTags,
    deleteTag,
  };
};
