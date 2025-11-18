<template>
  <div>
    <div>loading = {{ loading }}</div>
    <div>error = {{ error }}</div>
    <div>articles = {{ articles }}</div>

  </div>
</template>

<script setup lang="ts">
import type { NewsArticleDto } from '~/api/generated';
import { useApi } from '~/api/useApi';

const loading = ref(true);
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
</style>
