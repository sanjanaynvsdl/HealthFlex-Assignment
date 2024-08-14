import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, saveCommentsToStorage } from '../redux/commentsSlice';
import { validateComment } from '../utils/validation';

const CommentForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);

  const handleSubmit = () => {
    if (validateComment(text)) {
      const newComment = {
        id: Date.now().toString(),
        text,
        date: new Date().toISOString(),
        replies: [],
      };
      dispatch(addComment(newComment));
      dispatch(saveCommentsToStorage([...comments, newComment]));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a comment..."
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CommentForm;