import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { loadCommentsFromStorage } from '../redux/commentsSlice';

const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsFromStorage());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <CommentForm />
      <CommentList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default MainScreen;