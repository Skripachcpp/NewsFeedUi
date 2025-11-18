<template>
  <div>
    <div class="heder">
      <NuxtLink to="/create" class="btn btn-blue news-btn-create">Создать</NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      <p>Загрузка новостей...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn btn-link" @click="loadNews">Попробовать снова</button>
    </div>

    <div v-else class="news-list">
      <div class="news-item" v-for="article in articles" :key="article.id">
        <div class="news-item-left">
          <h2 class="news-title">{{ article.title }}</h2>

          <p v-if="article.summary" class="news-summary">
            {{ article.summary }}
          </p>

          <div class="news-info">
            <InfoItem label="Автор" :value="article.userName" />
            <InfoItem label="Дата" :value="dateFormat(article.publicationDate)" />
          </div>

          <TagItems :tags="article.tags?.filter((it) => it)" />

          <NuxtLink :to="`news/${article.id}`" class="btn btn-link">Читать далее →</NuxtLink>
        </div>
        <div class="news-item-right">
          <div class="news-buttons">
            <NuxtLink :to="'/update/' + article.id" class="btn btn-green">Изменить</NuxtLink>
            <button class="btn btn-red" @click="deleteArticleId = article.id">Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmDeleteModal
      :is-open="deleteArticleId != null"
      :loading="false"
      item-type="новость"
      @confirm="confirmDeleteArticle"
      @cancel="() => {deleteArticleId = undefined;}"
    />
  </div>
</template>

<script setup lang="ts">
import type { NewsArticleDto } from "~/api/generated";
import { useApi } from "~/api/useApi";

let deleteArticleId = ref<number>();

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

let confirmDeleteArticle = async () => {
  if (deleteArticleId.value == null) return;

  await api.deleteArticle(deleteArticleId.value);
  articles.value = articles.value.filter(it => it.id != deleteArticleId.value)
  deleteArticleId.value = undefined;
}

onMounted(() => loadNews());
</script>

<style scoped>
.heder {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.news-list {
  position: relative;
  display: grid;
  gap: 24px;
}

.news-item {
  border: 1px #666 solid;
  padding: 8px 16px;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
}

.news-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.news-btn-create {
  margin-right: 18px;
  width: 100px;
}
</style>
