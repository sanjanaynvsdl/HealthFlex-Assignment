import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addReply, saveCommentsToStorage } from '../redux/commentsSlice';
import { validateComment } from '../utils/validation';

const ReplyForm = ({ commentId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);

  const handleSubmit = () => {
    if (validateComment(text)) {
      const newReply = {
        id: Date.now().toString(),
        text,
        date: new Date().toISOString(),
      };
      dispatch(addReply({ commentId, reply: newReply }));
      const updatedComments = comments.map(c => 
        c.id === commentId 
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      );
      dispatch(saveCommentsToStorage(updatedComments));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a reply..."
        multiline
      />
      <Button title="Reply" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
});

export default ReplyForm;