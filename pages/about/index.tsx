import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";

export default function About({ title }) {

    const linkClickHandler = () => {
        Router.push('/')
    }

    return (
        <MainLayout title={"About Page"}>
            <h1>{JSON.stringify(title)}</h1>

            <button onClick={linkClickHandler}>Go back to home</button>
            <button onClick={() => Router.push('/posts')}>Go to posts [inline]</button>
        </MainLayout>
    )
}

About.getInitialProps = async () => {
    const response = await fetch(`${process.env.API_URL}/about`);
    const data = await response.json();

    return {
        title: data.title
    }
}