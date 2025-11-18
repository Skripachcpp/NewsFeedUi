<template>
  <div>
    <div v-if="loading" class="loading">
      <p>Загрузка новостей...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn btn-green" @click="loadNews">Попробовать снова</button>
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

        <div v-if="article.tags?.length" class="news-tags">
          <div v-for="tag in article.tags" :key="tag">#{{ tag }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticleDto } from "~/api/generated";
import { useApi } from "~/api/useApi";

const loading = ref(false);
const error = ref<string | null>(null);
const articles = ref<NewsArticleDto[]>([]);

const api = useApi();

const loadNews = async () => {
  loading.value = true;
  error.value = null;
  articles.value = await api
    .getArticles()
    .catch((err) => {
      error.value = err.message || "Ошибка при загрузке новостей";
      return [];
    })
    .finally(() => (loading.value = false));
};

onMounted(() => loadNews());
</script>

<style scoped>
.error {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  font-weight: 700;
  color: rgb(181, 20, 20);
}

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
