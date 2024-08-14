import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.comments.find(c => c.id === id);
      if (comment) {
        comment.text = text;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
    addReply: (state, action) => {
      const { commentId, reply } = action.payload;
      const comment = state.comments.find(c => c.id === commentId);
      if (comment) {
        if (!comment.replies) comment.replies = [];
        comment.replies.push(reply);
      }
    },
  },
});

export const { setComments, addComment, editComment, deleteComment, addReply } = commentsSlice.actions;

export const saveCommentsToStorage = (comments) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
  } catch (e) {
    console.error('Failed to save comments', e);
  }
};

export const loadCommentsFromStorage = () => async (dispatch) => {
  try {
    const commentsJson = await AsyncStorage.getItem('comments');
    if (commentsJson) {
      dispatch(setComments(JSON.parse(commentsJson)));
    }
  } catch (e) {
    console.error('Failed to load comments', e);
  }
};

export default commentsSlice.reducer;