"use client"
import Link from "next/link";
import FacebookLogo from "/public/icons/FacebookLogo";
import InstagramLogo from "/public/icons/InstagramLogo";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import styles from '@/components/Footer/Footer.module.css';


export default function Footer() {
 

  return <>
    <div className={styles.footerContainer}>
      <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
        <div>
          <h3 className={styles.footerHead}>Company</h3>
          <div className={styles.column}>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact us</Link>
            <Link href="/store-location">Store Location</Link>
            <Link href="/blogs">Blog</Link>
          </div>
        </div>
        <div>
          <h3 className={styles.footerHead}>Help</h3>
          <div className={styles.column}>
            <Link href="/order-tracking">Order tracking</Link>
            <Link href="/faqs">Faqs</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of service</Link>
          </div>
        </div>
        <div>
          <h3 className={styles.footerHead}>Store</h3>
          <div className={styles.column}>
            <Link href={`/product-category/women`}>
              Women
            </Link>
            <Link href={`/product-category/men`}>
              Men
            </Link>
            <Link href={`/product-category/kids`}>
             Kids
            </Link>
          </div>
        </div>
        <div>
          <h3 className={styles.footerHead}>Keep in touch</h3>
          <div className={styles.column}>
            <span>
               1001 Nakuru Kenya
              <br />
              Lanet street
              <br />
              Nakuru
            </span>
            <span>+254740455200</span>
            <span>
              Open all days <br />- 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center pb-16">
      <h4 className="text-3xl mb-4">Newsletter</h4>
      <span className="px-6 text-center">Be the first to know about new arrivals, sales & promos!</span>
      <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
        <Input
          label="Newsletter Input Box"
          name="email"
          type="email"
          extraClass=" w-full sm:w-auto"
        />{" "}
        <Button
          size="lg"
          value={"send"}
          extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
        />
      </div>
    </div>
    <div className={styles.bottomFooter}>
      <div className="app-max-width app-x-padding w-full flex justify-between">
        <span className="">@2023 Azura. All rights reserved</span>
        <span className="flex items-center">
          <span className="hidden sm:block">
           Follow us on social media:
          </span>{" "}
          <a
            href="www.facebook.com"
            aria-label="Facebook Page for Azura Fashion"
          >
            <FacebookLogo />
          </a>
          <a
            href="www.ig.com"
            aria-label="Instagram Account for Azura Fashion"
          >
            <InstagramLogo />
          </a>
        </span>
      </div>
    </div>
  </>;
}
