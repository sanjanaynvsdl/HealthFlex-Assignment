import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, deleteComment, saveCommentsToStorage } from '../redux/commentsSlice';
import ReplyForm from './ReplyForm';
import { formatDate } from '../utils/dateUtils';

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);

  const handleEdit = () => {
    dispatch(editComment({ id: comment.id, text: editedText }));
    dispatch(saveCommentsToStorage(comments.map(c => c.id === comment.id ? { ...c, text: editedText } : c)));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
    dispatch(saveCommentsToStorage(comments.filter(c => c.id !== comment.id)));
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          value={editedText}
          onChangeText={setEditedText}
          style={styles.input}
          multiline
        />
      ) : (
        <Text>{comment.text}</Text>
      )}
      <Text style={styles.date}>{formatDate(comment.date)}</Text>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Save" onPress={handleEdit} />
        ) : (
          <Button title="Edit" onPress={() => setIsEditing(true)} />
        )}
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Reply" onPress={() => setShowReplyForm(!showReplyForm)} />
      </View>
      {showReplyForm && <ReplyForm commentId={comment.id} />}
      {comment.replies && comment.replies.map(reply => (
        <View key={reply.id} style={styles.reply}>
          <Text>{reply.text}</Text>
          <Text style={styles.date}>{formatDate(reply.date)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reply: {
    marginLeft: 20,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
});

export default Comment;