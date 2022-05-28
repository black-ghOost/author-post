import { Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

interface Post {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
}

export default function Home() {
  const [post, setPost] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [periodicPage, setPeriodicPage] = useState<number>(page);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      console.log("response.......................", response);
      setPost(response?.data?.hits);
      setTotalItems(response?.data?.nbPages * response?.data?.hitsPerPage);
    })();
  }, [page]);

  const getPost = async () => {
    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    );
    setPost(res?.data?.hits);
    setTotalItems(res?.data?.nbPages * res?.data?.hitsPerPage);
  };

  useEffect(() => {
    const timer = setInterval(getPost, 10000);
    return () => clearInterval(timer);
  }, [page]);

  console.log("post after 10 sec............", post);

  return (
    <div className={styles.main}>
      <h3>Posts Table</h3>
      <div style={{ margin: "20px" }}>
        <table>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created at</th>
            <th>Author</th>
          </tr>
          {post?.map((item, index) => (
            <tr onClick={() => console.log("clicked......", index)}>
              <td>{item?.title}</td>
              <td>{item?.url}</td>
              <td>{item?.created_at}</td>
              <td>{item?.author}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          hideOnSinglePage
          responsive
          current={page + 1}
          total={totalItems}
          pageSize={20}
          onChange={(p) => setPage(p - 1)}
        />
      </div>
    </div>
  );
}
