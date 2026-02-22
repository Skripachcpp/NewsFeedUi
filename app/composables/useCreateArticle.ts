import type { ArticleCreateRequest } from "~/api/generated";
import { useApi } from "~/api/useApi";
import { parseTags } from "~/utils/tags";
import { errorToStrings } from "~/utils/error";

export function useCreateArticle() {
  const api = useApi();

  const errors = ref<string[]>();
  const success = ref(false);
  const createdArticleId = ref<number>();

  let defaultArticle = (): ArticleCreateRequest => ({
    title: "",
    content: "",
    summary: null,
    tags: [],
  });

  const article = ref<ArticleCreateRequest>(defaultArticle());
  const tagsInput = ref<string>("");
  let createdProcessing = ref(false);

  let create = async () => {
    if (createdProcessing.value) return;

    success.value = false;
    errors.value = undefined;
    createdArticleId.value = undefined;

    let parsedTags = parseTags(tagsInput.value);

    await api
      .createArticle({
        title: article.value.title,
        content: article.value.content,
        summary: article.value.summary,
        tags: parsedTags.length > 0 ? parsedTags : undefined,
      })
      .then((articleNew) => {
        article.value = defaultArticle();
        tagsInput.value = "";
        success.value = true;
        createdArticleId.value = articleNew.id;
      })
      .catch((err) => {
        errors.value = errorToStrings(err);
        success.value = false;
      })
      .finally(() => {
        createdProcessing.value = false;
      });
  };

  return {
    errors,
    success,
    createdArticleId,
    article,
    tagsInput,
    createdProcessing,
    create,
  };
}
