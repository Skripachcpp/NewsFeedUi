import { NewsService, TagsService, OpenAPI, type NewsArticleDto, type ArticleCreateRequest, type ArticleUpdateRequest, type TagDto } from "~/api/generated";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const config = useRuntimeConfig();
  if (config.public.apiBaseUrl) {
    OpenAPI.BASE = config.public.apiBaseUrl;
  }

  // токен авторизации
  const auth = useAuth();
  OpenAPI.TOKEN = async () => {
    return auth.token.value ?? "";
  };
  

  const getArticles = async (): Promise<NewsArticleDto[]> => {
    // еще и пагинацию на фронте реализовывать наверное лишнее
    return (await NewsService.newsGetArticles())?.items ?? [];
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
