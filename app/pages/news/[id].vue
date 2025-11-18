<template>
  <div class="article-page">
    <NuxtLink to="/" class="btn btn-link">← Вернуться к списку</NuxtLink>

    <div v-if="loading" class="loading">
      <p>Загрузка новостей...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="article">
      <h2>{{ article.title }}</h2>
      <div>{{ article.content }}</div>

      <div class="news-info">
        <InfoItem label="Автор" :value="article.userName" />
        <InfoItem label="Дата" :value="dateFormat(article.publicationDate)" />
      </div>

      <Tags :tags="article.tags?.filter((it) => it)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticleDto } from "~/api/generated";
import { useApi } from "~/api/useApi";

const loading = ref(false);
const error = ref<string>();
const article = ref<NewsArticleDto>();

const route = useRoute();
const api = useApi();

const loadNew = async () => {
  loading.value = true;
  error.value = undefined;

  const id = Number(route.params.id);
  if (isNaN(id)) throw new Error("Неверный ID статьи");

  article.value = await api
    .getArticle(id)
    .catch((err) => {
      error.value = err.title || "Ошибка при загрузке новостей";
      return undefined;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => loadNew());
</script>

<style scoped>
.news-info {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
