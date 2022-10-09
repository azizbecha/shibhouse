import Head from "next/head"

interface SEOProps {
    title: string,
    description: string,
    image?: string,
}

const SEO: React.FC<SEOProps> = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://shibhouse.tv/" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image ? props.image : 'https://shibhouse.tv/images/cover.png'} />

            <meta property="twitter:card" content="summary" />
            <meta property="twitter:url" content="https://shibhouse.tv/" />
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image ? props.image : 'https://shibhouse.tv/images/cover.png'}></meta>

            <link rel="shortcut icon" href="../images/icon.ico" type="image/x-icon" />
            <meta name="theme-color" content="#fa2f2f" />
        </Head>
    )
}

export default SEO