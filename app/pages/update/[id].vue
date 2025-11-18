<template>
  <div class="create">
    <h1>Обновить новость</h1>

    <template v-if="article">
      <FieldForm v-model="article.title" type="text" label="Заголовок" placeholder="Введите заголовок новости" required />
      <FieldForm v-model="article.content" type="textarea" label="Содержание" placeholder="Введите содержание новости" required />
      <FieldForm v-model="article.summary" type="textarea" label="Краткое описание" placeholder="Введите краткое описание (опционально)" />
      <FieldForm v-model="articleTagsInput" type="text" label="Теги (опционально)" placeholder="Введите теги через запятую, например: новости, технологии, спорт" />
    </template>

    <div v-if="errors" class="error-message">
      <div v-for="(error, i) of errors" :key="i">{{ error }}</div>
    </div>

    <div class="success-message" v-if="updatedArticleId != undefined">Новость успешно обновлена! ID: {{ updatedArticleId }}</div>

    <div class="buttons">
      <!-- <button class="btn btn-blue" :disabled="updateProcessed" @click="handleCreate">
          <span v-if="updateProcessed">Создание...</span>
          <span v-else>Создать новость</span>
        </button> -->

      <NuxtLink to="/" class="btn btn-grey">
        <span>Вернуться к новостям</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleUpdateRequest } from "~/api/generated";
import { useApi } from "~/api/useApi";

const route = useRoute();
const api = useApi();

const errors = ref<string[]>();
const updatedArticleId = ref<number>();

const article = ref<ArticleUpdateRequest>();
const articleTagsInput = ref<string>("");

onMounted(() => {
  loadArticle();
});

const loadArticle = async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) throw new Error("Неверный ID статьи");

  await api
    .getArticle(id)
    .then((data) => {
      article.value = {
        id: data.id ?? 0,
        content: data.content ?? "",
        title: data.title ?? "",
        summary: data.summary ?? "",
        tags: data.tags ?? [],
      };

      articleTagsInput.value = article.value.tags?.join(", ") ?? "";
    })
    .catch((err) => {
      errors.value = errorToStrings(err);
    });
};

// let handleCreate = async () => {
//   if (updateProcessed.value) return;

//   if (!article.value) return;

//   success.value = false;
//   errors.value = undefined;
//   updatedArticleId.value = undefined;

//   let parsedTags = parseTags(articleTagsInput.value);

//   await api
//     .updateArticle({
//       id: article.value.id,
//       title: article.value.title,
//       content: article.value.content,
//       summary: article.value.summary,
//       tags: parsedTags.length > 0 ? parsedTags : undefined,
//     })
//     .then((articleNew) => {
//       // article.value = defaultArticle();
//       success.value = true;
//       updatedArticleId.value = articleNew.id;
//     })
//     .catch((err) => {
//       errors.value = errorToStrings(err);
//       success.value = false;
//     })
//     .finally(() => {
//       updateProcessed.value = false;
//     });
// };
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

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}
</style>
