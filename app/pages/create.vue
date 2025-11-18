<template>
  <div class="create">
    <h1>Создать новость</h1>

    <FieldForm v-model="article.title" type="text" label="Заголовок" placeholder="Введите заголовок новости" required />
    <FieldForm v-model="article.content" type="textarea" label="Содержание" placeholder="Введите содержание новости" required />
    <FieldForm v-model="article.summary" type="textarea" label="Краткое описание" placeholder="Введите краткое описание (опционально)" />
    <FieldForm v-model="tagsInput" type="text" label="Теги (опционально)" placeholder="Введите теги через запятую, например: новости, технологии, спорт" />

    <div v-if="errors" class="error-message">
       <div v-for="(error, i) of errors" :key="i">{{ error }}</div>
    </div>

    <div class="success-message" v-if="success">Новость успешно создана! ID: {{ createdArticleId }}</div>

    <div class="buttons">
      <button class="btn btn-blue" :disabled="isSubmitting" @click="handleCreate">
        <span v-if="isSubmitting">Создание...</span>
        <span v-else>Создать новость</span>
      </button>

      <NuxtLink to="/" class="btn btn-grey">
        <span>Вернуться к новостям</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleCreateRequest } from "~/api/generated";
import { useApi } from "~/api/useApi";

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
let isSubmitting = ref(false);

let handleCreate = async () => {
  if (isSubmitting.value) return;

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
      success.value = true;
      createdArticleId.value = articleNew.id;
    })
    .catch((err) => {
      errors.value = errorToStrings(err);
      success.value = false;
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>

<style scoped>
.create {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.success-message {
  background: #c6f6d5;
  border: 1px solid #68d391;
  color: #22543d;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

.error-message {
  background: #fed7d7;
  border: 1px solid #fc8181;
  color: #c53030;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

.buttons {
  display: flex;
  gap: 12px;
}
</style>
