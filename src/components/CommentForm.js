
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, saveCommentsToStorage } from '../redux/commentsSlice';
import { validateComment } from '../utils/validation';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);

  const handleSubmit = () => {
    if (validateComment(name) && validateComment(text)) {
      const newComment = { name, text };
      dispatch(addComment(newComment));
      dispatch(saveCommentsToStorage([...comments, newComment]));
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
        placeholder="Add a comment..."
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
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
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommentForm;