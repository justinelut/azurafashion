
const addWishlist = (wishlistItems, item) => {
  const duplicate = wishlistItems.some(
    (wishlistItem) => wishlistItem.id === item.id
  );

  if (!duplicate) {
    return [...wishlistItems, { ...item }];
  } else {
    return [...wishlistItems];
  }
};

export default addWishlist;
