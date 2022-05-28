import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SinglePost.module.css";

interface Children {
  id: number;
  created_at: string;
  author: string;
  text: string;
  points: number;
  parent_id: number | string | null;
  children: Children[];
}

interface SinglePostDetails {
  id: number;
  created_at: string;
  author: string;
  title: string;
  url: string;
  text: string;
  points: number | null;
  parent_id: number | string | null;
  children: Children[];
}

export default function SinglePost() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState<SinglePostDetails>();

  useEffect(() => {
    (async () => {
      const getSinglePostDetails = await axios.get(
        `http://hn.algolia.com/api/v1/items/${id}`
      );
      // console.log(
      //   "get signle post...................",
      //   getSinglePostDetails?.data
      // );
      setSinglePost(getSinglePostDetails?.data);
    })();
  }, []);

  return (
    <div className={styles.main}>
      <pre>{JSON.stringify(singlePost, null, 2)}</pre>
    </div>
  );
}
