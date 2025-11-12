import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-base-400 shadow-2xl shadow-white py-4 px-4 text-base-content w-full ">
      <div className="container mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 w-full">
          {/* Brand / Copyright */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center md:justify-baseline gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary font-bold">
                M
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-lg leading-tight truncate">
                  Movie <span className="text-primary">Master</span>
                </h3>
                <p className="text-xs opacity-80">
                  Your ultimate movie companion
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 ">
            <h4 className="font-medium text-lg mb-3 text-center md:text-start ">
              Quick <span className="text-primary">Links</span>
            </h4>
            <ul className="flex md:flex-col gap-2 justify-between">
              <li>
                <a
                  href="/"
                  className="link link-hover text-xs md:text-sm hover:text-primary"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="link link-hover text-xs md:text-sm hover:text-primary"
                >
                  All Movies
                </a>
              </li>
              <li>
                <a
                  href="/movies/my-collection"
                  className="link link-hover text-xs md:text-sm hover:text-primary"
                >
                  My Collection
                </a>
              </li>
              <li>
                <a
                  href="/watch-list"
                  className="link link-hover text-xs md:text-sm hover:text-primary"
                >
                  WatchList
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex-1 text-center md:text-start ">
            <h4 className="font-medium text-sm mb-3">
              Follow <span className="text-primary">Us</span>
            </h4>
            <div className="flex justify-between items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:text-primary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:text-primary"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:text-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:text-primary"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:text-primary"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white pt-4 text-center md:text-left w-full">
          <p className="text-xs opacity-70 text-center">
            Made with ❤️ by Movie Master • {year} || © {year} Movie Master. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
