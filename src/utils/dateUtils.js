export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  export const sortByDate = (comments) => {
    return [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
  };