import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import { sortByDate } from '../utils/dateUtils';

const CommentList = () => {
  const comments = useSelector(state => state.comments.comments);
  const sortedComments = sortByDate(comments);

  return (
    <FlatList
      data={sortedComments}
      renderItem={({ item }) => <Comment comment={item} />}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default CommentList;