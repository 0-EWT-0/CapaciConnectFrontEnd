// comment.interface.ts
export interface Comment {
  id_comment: number;
  comment: string;
  id_workshop_id: number;
  created_at?: string;
  user_name?: string; // Agregué este campo opcional para mostrar quién hizo el comentario
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}
