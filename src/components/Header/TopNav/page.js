"use client"
import { Menu } from "@headlessui/react";
import Link from "next/link";
import InstagramLogo from "/public/icons/InstagramLogo";
import FacebookLogo from "/public/icons/FacebookLogo";
import DownArrow from "/public/icons/DownArrow";
import styles from "@/components/Header/Header.module.css";


const MyLink = ({
    href,
    children,
    active,
    ...rest
}) => {
    return (
        <Link
            href={href}
            className={`py-2 px-4 text-center ${active ? "bg-gray200 text-gray500" : "bg-white text-gray500"
                }`}
            {...rest}
            >

                {children}

            </Link>
    );
};

const TopNav = () => {

    return (
        <div className="bg-gray500 text-gray100 hidden lg:block">
            <div className="flex justify-between app-max-width">
                <ul className={`flex ${styles.topLeftMenu}`}>
                    <li>
                        <a href="#" aria-label="Haru Fashion Facebook Page">
                            <FacebookLogo />
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Haru Fashion Instagram Account">
                            <InstagramLogo />
                        </a>
                    </li>
                    <li>
                        <a href="#">About us</a>
                    </li>
                    <li>
                        <a href="#">Our policy</a>
                    </li>
                </ul>
                <ul className={`flex ${styles.topRightMenu}`}>
                    <li>
                        <Menu as="div" className="relative">
                            <Menu.Button as="a" href="#" className="flex">
                               en
                            </Menu.Button>
                            <Menu.Items
                                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                                style={{ zIndex: 9999 }}
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <MyLink active={active}>
                                            {"eng"}
                                        </MyLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <MyLink active={active}>
                                            {"myn"}
                                        </MyLink>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </li>
                    <li>
                        <Menu as="div" className="relative">
                            <Menu.Button as="a" href="#" className="flex">
                                {"usd"} <DownArrow />
                            </Menu.Button>
                            <Menu.Items
                                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                                style={{ zIndex: 9999 }}
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`${active
                                                    ? "bg-gray100 text-gray500"
                                                    : "bg-white text-gray500"
                                                } py-2 px-4 text-center focus:outline-none`}
                                        >
                                            {"usd"}
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`${active
                                                    ? "bg-gray100 text-gray500"
                                                    : "bg-white text-gray500"
                                                } py-2 px-4 text-center focus:outline-none`}
                                        >
                                            {"mmk"}
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TopNav;
