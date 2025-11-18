<template>
  <div>
    <div v-if="loading" class="loading">
      <p>Загрузка новостей...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn btn-link" @click="loadNews">Попробовать снова</button>
    </div>

    <div v-else class="news-list">
      <div class="news-item" v-for="article in articles" :key="article.id">
        <h2 class="news-title">{{ article.title }}</h2>

        <p v-if="article.summary" class="news-summary">
          {{ article.summary }}
        </p>

        <div class="news-info">
          <InfoItem label="Автор" :value="article.userName" />
          <InfoItem label="Дата" :value="dateFormat(article.publicationDate)" />
        </div>

        <Tags :tags="article.tags?.filter(it => it)" />

        <NuxtLink :to="`news/${article.id}`" class="btn btn-link">Читать далее →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticleDto } from "~/api/generated";
import { useApi } from "~/api/useApi";

const loading = ref(false);
const error = ref<string>();
const articles = ref<NewsArticleDto[]>([]);

const api = useApi();

const loadNews = async () => {
  loading.value = true;
  error.value = undefined;
  articles.value = await api
    .getArticles()
    .catch((err) => {
      error.value = err.title || "Ошибка при загрузке новостей";
      return [];
    })
    .finally(() => (loading.value = false));
};

onMounted(() => loadNews());
</script>

<style scoped>
.news-list {
  display: grid;
  gap: 24px;
}

.news-item {
  border: 1px #666 solid;
  padding: 8px 16px;
  border-radius: 5px;
}

.news-summary {
  margin-top: 8px;
}

.news-info {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.news-tags {
  display: flex;
  gap: 2px 8px;
  color: rgb(99, 99, 218);
}
</style>
