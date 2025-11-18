<template>
  <div>
    <div v-if="loading" class="loading">
      <p>Загрузка новостей...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn btn-green" @click="loadNews">Попробовать снова</button>
    </div>

    <div>articles = {{ articles }}</div>
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
</style>
