import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Link from "next/link";
import {useEffect, useState} from "react";
import {NextPageContext} from "next";
import {MyPost} from "../../interfaces/post";

interface PostPageProps {
    post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
    const router = useRouter();
    const [post, setPost] = useState(serverPost);

    useEffect(() => {
        async function load() {
            const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
            const data = await response.json();
            setPost(data);
        }

        if (!serverPost) {
            load();
        }
    }, [])

    if(!post) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <h1>Post {router.query.id}</h1>

            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Link href="/posts"><a>Back to all posts</a></Link>
        </MainLayout>
    )
}

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

// getInitialProps - для наобоходимости комбинировать frontend и backend
// getServerSideProps - для server side rendering (только на сервере, НЕ на фронте)
// getStaticProps - для рендера статического контента от пользователя

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
    if (!req) {
        return {post : null}
    }
    const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
    const post: MyPost = await response.json();

    return { post }
}


// export async function getServerSideProps({ query, req }) {
//     const response = await fetch(`http://localhost:4200/posts/${query.id}`);
//     const post = await response.json();
//
//     return { props: { post } }
// }

