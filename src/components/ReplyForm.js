import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addReply, saveCommentsToStorage } from '../redux/commentsSlice';
import { validateComment } from '../utils/validation';

const ReplyForm = ({ commentId }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);

  const handleSubmit = () => {
    if (validateComment(name) && validateComment(text)) {
      const newReply = {
        id: Date.now().toString(),
        name,
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
      setName('');
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a reply..."
        multiline
      />
      <TouchableOpacity style={styles.replyButton} onPress={handleSubmit}>
        <Text style={styles.replyButtonText}>Reply</Text>
      </TouchableOpacity>
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
  replyButton: {
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
  replyButtonText: {
    color: 'white',
  },
});

export default ReplyForm;