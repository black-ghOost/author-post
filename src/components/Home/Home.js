import { Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(0)
    const [totalItems, setTotalItems] = useState(1);
  
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
            );
            console.log("response.......................", response);
            setPost(response?.data?.hits);
            setTotalItems(response?.data?.nbPages * response?.data?.hitsPerPage)
        })();
    }, [page]);

    console.log('page..............................', page);

    return (
        <div>
            <h3>Posts Table</h3>
            {post?.map((item) => <div>
                <p>{item?.title}</p>
                <p>{item?.url}</p>
                <p>{item?.created_at}</p>
                <p>{item?.author}</p>
            </div>)}
            <div style={{textAlign: 'center', marginBottom: '30px', marginTop: '20px'}}>
                <Pagination hideOnSinglePage responsive current={page+1} total={totalItems} pageSize={20} onChange={(p) => setPage(p-1)} />
            </div>
        </div>
    )
}