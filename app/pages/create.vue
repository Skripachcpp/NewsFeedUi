<template>
  <div>
    <h1>Создать новость</h1>

    <FieldForm v-model="article.title" type="text" label="Заголовок" placeholder="Введите заголовок новости" required />
    <FieldForm v-model="article.content" type="textarea" label="Содержание" placeholder="Введите содержание новости" required />
    <FieldForm v-model="article.summary" type="textarea" label="Краткое описание" placeholder="Введите краткое описание (опционально)" />
    <FieldForm v-model="tagsInput" type="text" label="Теги (опционально)" placeholder="Введите теги через запятую, например: новости, технологии, спорт" />

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="success">Новость успешно создана! ID: {{ createdArticleId }}</div>

    <button class="btn btn-blue" :disabled="isSubmitting" @click="handleCreate">
      <span v-if="isSubmitting">Создание...</span>
      <span v-else>Создать новость</span>
    </button>

    <NuxtLink to="/" class="btn btn-grey" :disabled="isSubmitting" @click="handleCreate">
      <span>Вернуться к новостям</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ArticleCreateRequest } from "~/api/generated";
import { useApi } from "~/api/useApi";

const api = useApi();

const error = ref<string>();
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
let isSubmitting = ref(false);

let handleCreate = async () => {
  if (isSubmitting.value) return;

  success.value = false;
  error.value = undefined;
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
      success.value = true;
      createdArticleId.value = articleNew.id;
    }).catch((err) => {
      error.value = err.title || "Ошибка при создании новости";
      success.value = false;
    })
    .finally(() => {
      isSubmitting.value = false;
      
    });
};
</script>

<style scoped></style>
