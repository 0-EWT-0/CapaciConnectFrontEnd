// src/stores/CommentsStore.ts
import { defineStore } from 'pinia';
import type { Comment } from '@/interfaces/CommentInterface';
import CommentsService from '@/services/CommentsService';
import type { AxiosError } from 'axios';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export const useCommentStore = defineStore('comments', {
  state: (): CommentState => ({
    comments: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchComments(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        this.comments = await CommentsService.getAllComments();
      } catch (error) {
        this.handleError(error as AxiosError);
      } finally {
        this.loading = false;
      }
    },

    async removeComment(id: number): Promise<void> {
      this.loading = true;
      try {
        await CommentsService.deleteComment(id);
        this.comments = this.comments.filter(comment => comment.id_comment !== id);
      } catch (error) {
        this.handleError(error as AxiosError);
      } finally {
        this.loading = false;
      }
    },

    async removeAllWorkshopComments(workshopId: number): Promise<void> {
      this.loading = true;
      try {
        await CommentsService.deleteAllWorkshopComments(workshopId);
        this.comments = this.comments.filter(comment => comment.id_workshop_id !== workshopId);
      } catch (error) {
        this.handleError(error as AxiosError);
      } finally {
        this.loading = false;
      }
    },

    handleError(error: AxiosError): void {
      if (error.response?.status === 401) {
        this.error = 'No autorizado. Por favor inicie sesión nuevamente.';
        // Redirigir a login si es necesario
      } else {
        this.error = error.message || 'Error desconocido al procesar comentarios';
      }
    }
  },

  getters: {
    groupedComments(): Record<number, Comment[]> {
      return this.comments.reduce((grouped: Record<number, Comment[]>, comment) => {
        const workshopId = comment.id_workshop_id;
        if (!grouped[workshopId]) {
          grouped[workshopId] = [];
        }
        grouped[workshopId].push(comment);
        return grouped;
      }, {});
    },

    workshopIds(): number[] {
      return [...new Set(this.comments.map(comment => comment.id_workshop_id))];
    }
  }
});
