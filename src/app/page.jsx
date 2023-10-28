// import Navbar from "@/components/Navbar/Navbar";
// import styles from "./homepage.module.css";
// import Footer from "@/components/Footer/Footer";

import BlogVideos from "@/components/BlogVideos/BlogVideos";
import BlogsCards from "@/components/BlogsCards/BlogsCards";
import Featured from "@/components/Featured/Featured";
import LatestBlogs from "@/components/LatestBlogs/LatestBlogs";
import TopStories from "@/components/TopStories/TopStories";

export default function Home() {
  return <main>
    <Featured />
    <LatestBlogs/>
    <TopStories/>
    <BlogsCards/>
    <BlogVideos/>
  </main>;
}
