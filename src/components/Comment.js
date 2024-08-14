import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, deleteComment, editReply, deleteReply, saveCommentsToStorage } from '../redux/commentsSlice';
import ReplyForm from './ReplyForm';
import { formatDate } from '../utils/dateUtils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedReplyText, setEditedReplyText] = useState('');
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

  const handleEditReply = (replyId) => {
    const reply = comment.replies.find(r => r.id === replyId);
    setEditingReplyId(replyId);
    setEditedReplyText(reply.text);
  };

  const handleSaveReply = (replyId) => {
    dispatch(editReply({ commentId: comment.id, replyId, text: editedReplyText }));
    dispatch(saveCommentsToStorage(comments.map(c => 
      c.id === comment.id 
        ? { ...c, replies: c.replies.map(r => r.id === replyId ? { ...r, text: editedReplyText } : r) }
        : c
    )));
    setEditingReplyId(null);
  };

  const handleDeleteReply = (replyId) => {
    dispatch(deleteReply({ commentId: comment.id, replyId }));
    dispatch(saveCommentsToStorage(comments.map(c => 
      c.id === comment.id 
        ? { ...c, replies: c.replies.filter(r => r.id !== replyId) }
        : c
    )));
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentHeader}>
        <Text style={styles.name}>{comment.name}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="delete" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
      {isEditing ? (
        <TextInput
          value={editedText}
          onChangeText={setEditedText}
          style={styles.input}
          multiline
        />
      ) : (
        <Text style={styles.commentText}>{comment.text}</Text>
      )}
      <Text style={styles.date}>{formatDate(comment.date)}</Text>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => setShowReplyForm(!showReplyForm)}>
          <Text style={styles.buttonText}>REPLY</Text>
        </TouchableOpacity>
      </View>
      {showReplyForm && <ReplyForm commentId={comment.id} />}
      {comment.replies && comment.replies.map(reply => (
        <View key={reply.id} style={styles.reply}>
          <View style={styles.replyHeader}>
            <Text style={styles.replyName}>{reply.name}</Text>
          </View>
          {editingReplyId === reply.id ? (
            <TextInput
              value={editedReplyText}
              onChangeText={setEditedReplyText}
              style={styles.input}
              multiline
            />
          ) : (
            <Text style={styles.replyText}>{reply.text}</Text>
          )}
          <Text style={styles.date}>{formatDate(reply.date)}</Text>
          <View style={styles.replyButtonContainer}>
            {editingReplyId === reply.id ? (
              <TouchableOpacity style={styles.replyButton} onPress={() => handleSaveReply(reply.id)}>
                <Text style={styles.replyButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.replyButton} onPress={() => handleEditReply(reply.id)}>
                <Text style={styles.replyButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.replyButton} onPress={() => handleDeleteReply(reply.id)}>
              <Text style={styles.replyButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
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
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  commentText: {
    marginBottom: 5,
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
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 3,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  },
  reply: {
    marginLeft: 20,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  replyName: {
    fontWeight: 'bold',
  },
  replyText: {
    marginTop: 2,
  },
  replyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  replyButton: {
    marginRight: 10,
  },
  replyButtonText: {
    color: '#2196F3',
    fontSize: 12,
  },
});

export default Comment;