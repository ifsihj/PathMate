<template>
  <div class="article-detail">
    <!-- 返回按钮 -->
    <div class="back-section">
      <button class="back-btn" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>返回</span>
      </button>
    </div>

    <!-- 文章内容区 -->
    <div class="article-content">
      <!-- 文章封面 -->
      <div v-if="article.coverImage" class="article-cover">
        <img :src="article.coverImage" :alt="article.title" class="cover-img" />
      </div>

      <!-- 文章标题和作者 -->
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div class="author-info">
            <img
              v-if="article.authorAvatar"
              :src="article.authorAvatar"
              :alt="article.author"
              class="author-avatar"
            />
            <div v-else class="author-avatar-placeholder">
              {{ article.author?.charAt(0) || "U" }}
            </div>
            <span class="author-name">{{ article.author }}</span>
          </div>
          <div class="article-date">{{ formatDate(article.createdAt) }}</div>
        </div>
      </div>

      <!-- 文章正文 -->
      <div class="article-body">
        <p
          v-for="(line, index) in articleContentLines"
          :key="index"
          class="body-line"
        >
          {{ line }}
        </p>
      </div>

      <!-- 互动功能区 -->
      <div class="article-interaction">
        <button 
          class="interaction-btn" 
          :class="{ 'liked': article.isLiked }"
          @click="toggleLike"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            :fill="article.isLiked ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <span>{{ article.likeCount }}</span>
        </button>
        <button class="interaction-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            ></path>
          </svg>
          <span>{{ article.comments.length }}</span>
        </button>
      </div>

      <!-- 评论区 -->
      <div class="comments-section">
        <h3 class="comments-title">评论 ({{ article.comments.length }})</h3>

        <!-- 评论输入框 -->
        <div class="comment-input">
          <textarea
            v-model="newComment"
            placeholder="写下你的评论..."
            @keyup.enter="addComment"
          ></textarea>
          <button
            class="submit-comment"
            @click="addComment"
            :disabled="!newComment.trim()"
          >
            发送
          </button>
        </div>

        <!-- 评论列表 -->
        <div class="comments-list">
          <div
            v-for="(comment, index) in article.comments"
            :key="index"
            class="comment-item"
          >
            <div class="comment-avatar">
              {{ comment.user.charAt(0) }}
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{
                  formatDate(comment.createdAt)
                }}</span>
              </div>
              <div class="comment-text">{{ comment.content }}</div>
            </div>
          </div>

          <div v-if="article.comments.length === 0" class="no-comments">
            暂无评论，快来发表你的看法吧！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

// 文章数据
const article = ref({
  id: "",
  title: "",
  author: "",
  authorAvatar: null,
  coverImage: null,
  content: "",
  createdAt: Date.now(),
  likeCount: 0,
  isLiked: false,
  comments: [],
});

// 新评论内容
const newComment = ref("");

// 文章内容按行分割
const articleContentLines = computed(() => {
  if (!article.value.content) return [];
  return article.value.content.split("\n").filter((line) => line.trim());
});

// 获取文章数据
const getArticleData = () => {
  const articleId = route.params.id;
  const saved = localStorage.getItem("discovery-article-items");

  if (saved) {
    try {
      const articles = JSON.parse(saved);
      const foundArticle = articles.find(
        (item) => item.id === parseInt(articleId)
      );

      if (foundArticle) {
        // 如果文章没有点赞数和评论，初始化它们
        article.value = {
          ...foundArticle,
          likeCount: foundArticle.likeCount || 0,
          isLiked: foundArticle.isLiked || false,
          comments: foundArticle.comments || [],
          createdAt: foundArticle.createdAt || Date.now(),
        };
      } else {
        message.error("文章不存在");
        goBack();
      }
    } catch (e) {
      console.error("Failed to load article:", e);
      message.error("加载文章失败");
      goBack();
    }
  } else {
    message.error("没有找到文章");
    goBack();
  }
};

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// 切换点赞状态
const toggleLike = () => {
  article.value.isLiked = !article.value.isLiked;
  article.value.likeCount += article.value.isLiked ? 1 : -1;
  saveArticleData();
  message.success(article.value.isLiked ? "点赞成功" : "取消点赞");
};

// 添加评论
const addComment = () => {
  if (!newComment.value.trim()) return;

  const comment = {
    id: Date.now(),
    user: "当前用户",
    content: newComment.value.trim(),
    createdAt: Date.now(),
  };

  article.value.comments.push(comment);
  newComment.value = "";
  saveArticleData();
  message.success("评论成功");
};

// 保存文章数据到localStorage
const saveArticleData = () => {
  const saved = localStorage.getItem("discovery-article-items");

  if (saved) {
    try {
      const articles = JSON.parse(saved);
      const index = articles.findIndex((item) => item.id === article.value.id);

      if (index !== -1) {
        articles[index] = article.value;
        localStorage.setItem(
          "discovery-article-items",
          JSON.stringify(articles)
        );
      }
    } catch (e) {
      console.error("Failed to save article:", e);
    }
  }
};

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 页面加载时获取文章数据
onMounted(() => {
  getArticleData();
});
</script>

<style scoped>
.article-detail {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.back-section {
  margin-bottom: 24px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: #f0f0f0;
  border-color: #4a90e2;
  color: #4a90e2;
}

.article-content {
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.article-cover {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.article-header {
  margin-bottom: 32px;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  line-height: 1.4;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(74, 144, 226, 0.3);
}

.author-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #50c9c3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
}

.author-name {
  font-weight: 500;
  color: #555;
}

.article-date {
  font-size: 14px;
  color: #999;
}

.article-body {
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 2;
  color: #444;
}

.body-line {
  margin-bottom: 16px;
}

.article-interaction {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.interaction-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.interaction-btn:hover {
  border-color: #4a90e2;
  color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.05);
}

.interaction-btn.liked {
  border-color: #ff6b6b;
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
}

.interaction-btn.liked:hover {
  border-color: #ff5252;
  color: #ff5252;
  background-color: rgba(255, 107, 107, 0.15);
}

.interaction-btn .icon {
  width: 20px;
  height: 20px;
}

.comments-section {
  margin-top: 48px;
}

.comments-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
}

.comment-input {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.comment-input textarea {
  flex: 1;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.comment-input textarea:focus {
  outline: none;
  border-color: #4a90e2;
}

.submit-comment {
  padding: 16px 32px;
  background: linear-gradient(135deg, #4a90e2 0%, #50c9c3 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
}

.submit-comment:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.submit-comment:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.comments-list {
  margin-top: 32px;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #50c9c3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.comment-user {
  font-weight: 500;
  color: #555;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-text {
  color: #666;
  line-height: 1.6;
}

.no-comments {
  text-align: center;
  color: #999;
  padding: 48px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 16px;
  }

  .article-content {
    padding: 24px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .article-interaction {
    gap: 16px;
  }

  .comment-input {
    flex-direction: column;
  }

  .submit-comment {
    align-self: stretch;
  }
}
</style>
