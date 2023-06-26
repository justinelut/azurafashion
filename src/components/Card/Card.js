"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Heart from "/public/icons/Heart";
import HeartSolid from "/public/icons/HeartSolid";
import { useWishListStore } from "@/context/wishlist/wishlisttore";
import { useCart } from "@/context/cart/cart";
import styles from './Card.module.css'


const Card = (item) => {
  const setWishList = useWishListStore((state) => state.setWishList)
  const deleteWishlistItem = useWishListStore((state) => state.deleteWishlistItem)
  const wishlist = useWishListStore((state) => state.wishlist)
  const addToCart = useCart((state) => state.addToCart);
  const [isHovered, setIsHovered] = useState(false);
  const [isWLHovered, setIsWLHovered] = useState(false);
  const { id, name, price, featuredimage, otherimages } = item;

  const itemLink = `/products/${encodeURIComponent(id)}`;

  const alreadyWishlisted =
    wishlist.filter((wItem) => wItem.id === id).length > 0;

  const handleWishlist = () => {
    alreadyWishlisted ? deleteWishlistItem(item) : setWishList(item);
  };

  return <>
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          href={itemLink}
          tabIndex={-1}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <>
            {!isHovered && (
              <Image
                className="w-full"
                src={`${featuredimage}?thumb=230x300`}
                alt={name}
                width={230}
                height={300}
              />
            )}
            {isHovered && (
              <Image
                className="transition-transform transform hover:scale-110 duration-1000 w-full"
                src={`${otherimages}?thumb=230x300`}
                alt={name}
                width={230}
                height={300}
              />
            )}
          </>
        </Link>
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Wishlist"
          onClick={handleWishlist}
          onMouseOver={() => setIsWLHovered(true)}
          onMouseLeave={() => setIsWLHovered(false)}
        >
          {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />}
        </button>
        <button
          type="button"
          onClick={() => addToCart(item)}
          className={styles.addBtn}>   
          {"Add To Cart"}
        </button>
      </div>

      <div className="content">
        <Link
          href={itemLink}
          className={styles.itemName}
          legacyBehavior>
          {name}
        </Link>
        <div className="text-gray400">$ {price}</div>
        <button
          type="button"
          onClick={() => addToCart(item)}
          className="uppercase font-bold text-sm sm:hidden"
        >
          {"Add To Cart"}
        </button>
      </div>
    </div>

  </>;
};

export default Card;
