import Head from "next/head"

interface SEOProps {
    title: string,
    description: string,
    image: string,
}

const SEO: React.FC<SEOProps> = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://shibhouse.web.app/" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />

            <meta property="twitter:card" content="summary" />
            <meta property="twitter:url" content="https://shibhouse.web.app/" />
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image}></meta>
        </Head>
    )
}

export default SEO