/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { useCopyToClipboard } from 'react-use'
import { toast } from 'react-toastify'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Divider from '../components/Divider'

import SEO from '../utils/SEO'
import ProtectedRoute from '../auth/ProtectedRoute'

import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid'

import { FaBitcoin, FaDog, FaEthereum, FaGithub, FaReact, FaTag } from 'react-icons/fa'
import { MdDevices } from 'react-icons/md'
import { SiBlockchaindotcom } from 'react-icons/si'
import { IoIosPeople } from 'react-icons/io'

const IndexPage: React.FC<{props: any}> = ({props}) => {
    
    const [state, copyToClipboard] = useCopyToClipboard();
    
    return (
        <>
            <SEO 
                title={"Shibhouse"}
                description={"Re-taking voice conversations to the moon"}
            />
            <ProtectedRoute>
                <Navbar />
                <div className="bg-dark">
                    <section className="py-9 bg-dark text-white md:px-0">
                        <div className="container items-center px-8 mx-auto xl:px-5">
                            <div className="flex flex-wrap items-center sm:-mx-3">
                                <div className="w-full md:w-8/12">
                                    <div className="w-full pb-6 space-y-6 md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                            <span className="block xl:inline" style={{lineHeight: '1.2'}}>Re-taking voice conversations to the moon 🚀</span>
                                        </h1>
                                        <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"></p>
                                        <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                            <Link href='/register'>
                                                <span className="flex items-center px-6 py-3 mb-3 text-lg text-white font-semibold bg-primary rounded-md sm:mb-0 cursor-pointer">
                                                    Join Now
                                                </span>
                                            </Link>
                                            <Link href='/login'>
                                                <span className="flex items-center px-6 py-3 mb-3 text-lg text-white font-semibold bg-primary rounded-md sm:mb-0 cursor-pointer">
                                                    Log in
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-4/12 z-50">
                                    <div className="w-full h-auto overflow-hidden flex">
                                        <img src="images/shibhouse-logo-transparent.png" style={{width: '38%'}} className="flex mx-auto bounce" alt='Logo of ShibHouse' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <div className='container text-white text-justify'>
                        <span className="text-4xl font-bold">
                            About
                        </span><br /><br />
                        <span className="text-lg font-normal font-inter">
                            ShibHouse is an Opensource project created as a Joke where people can create rooms or join existing ones, listen to the speakers and participate in Chat. 
                            The main goal of this project is to make podcasts easier for everyone so we can share the culture of cryptocurrencies between our users and provide them a better place for sharing knowledge.
                        </span>
                    </div>
                    <div className="container my-5">
                        <Divider />
                    </div>
                    <div className='text-white'>
                        <div className="container">
                            <span className="text-4xl font-bold">
                                Features
                            </span>
                        </div>
                        <section className="bg-dark">
                            <div className="focus:outline-none mt-10 flex flex-wrap w-full gap-10 px-4">

                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2">
                                            <FaGithub size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Opensource</h2>
                                        <p className="focus:outline-none text-base leading-normal pt-2">The first thing that made this project unique is that it&apos;s Opensource! Means everyone on the globe can see the source code, download, edit, suggest features and report issues anytime by visiting the <a href="http://github.com/azizbecha/shibhouse" className='text-primary' target="_blank" rel="noopener noreferrer">GitHub repository.</a></p>
                                    </div>
                                </div>

                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2">
                                            <MdDevices size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Responsive</h2>
                                        <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">Since the design is one of the most important standars of rating the user experience of a website or an app, ShibHouse&apos;s website is fully Responsive ! Means it look organised and elegant in any device such as Mobile, Tablet or Desktop due to using Tailwind CSS.</p>
                                    </div>
                                </div>
                                
                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2 spin">
                                            <FaReact size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Fast & Flexible</h2>
                                        <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">The first indicator of website optimization is loading time. And around 60% of the users will leave if the loading takes more than 3 seconds. That&apos;s why we used NextJS to provide the best experience for our users.</p>
                                    </div>
                                </div>

                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2">
                                            <SiBlockchaindotcom size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Crypto-related</h2>
                                        <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">One of our most important topics in ShibHouse is the Cryptocurrencies world and everything related to finance, investing, coding, startups & projects and sharing knowledge between its users. And especially our name is inspired from the Shiba Inu Token.</p>
                                    </div>
                                </div>

                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2">
                                            <IoIosPeople size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Open for everyone</h2>
                                        <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">ShibHouse is a community before beeing a Billion Dollar Unicorn Company (together we will achieve this goal &#60;3) so we are working on making this platform such a good audio-based social media app to share knowledge between all the users with no exception.</p>
                                    </div>
                                </div>

                                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10" data-aos="zoom-in">
                                    <div className="w-20 h-20 relative mr-1">
                                        <div className="absolute top-0 right-0 rounded w-16 h-16 mt-2" />
                                        <div className="absolute text-white bottom-0 left-0 rounded w-16 h-16 flex items-center justify-center mt-2">
                                            <FaTag size={50} />
                                        </div>
                                    </div>
                                    <div className="w-10/12 text-justify">
                                        <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">Different plans</h2>
                                        <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">ShibHouse usage is free for everyone. But users can buy ShibNitro which is simply the paid subscription of ShibHouse that offers you special features. the first purpose of adding ShibNitro is to keep supporting the project and push the community forward to do more.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="container py-5">
                        <Divider />
                    </div>
                    <div className="container pt-3 pb-10 text-white">
                        <p className="text-4xl font-bold mb-2"> Donate</p>
                        <p className="text-lg font-semibold mb-4">If you want to support the project, you can donate to encourage us to do better and better</p>

                        <Row>
                            <Col lg={4}>
                                <h3 className='font-semibold text-2xl flex space-x-1 mt-3'><FaBitcoin className='my-auto text-primary' /> <span>Bitcoin <span className="text-sm">(bitcoin network)</span></span></h3>
                                <p className='font-semibold my-3 cursor-pointer' onClick={() => {
                                    copyToClipboard('3McRNVx1Neuw45LE22T2rKmgB9kcuoJkkU');
                                    toast.success('BTC address copied to clipboard', {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}>
                                    3McRNVx1Neuw45LE22T2rKmgB9kcuoJkkU
                                </p>
                                <img src="images/btc-address.png" alt="Bitcoin address" className='w-52' />
                            </Col>

                            <Col lg={4}>
                                <h3 className='font-semibold text-2xl flex space-x-1 mt-3'><FaEthereum className='my-auto text-primary' /> <span>Ethereum <span className="text-sm">(ethereum network)</span></span></h3>
                                <p className='font-semibold my-3 cursor-pointer' onClick={() => {
                                    copyToClipboard('0x06a6974126a6fccc25c6fe9abf9140d81b537419');
                                    toast.success('ETH address copied to clipboard', {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}>
                                    0x06a6974126a6fccc25c6fe9abf9140d81b537419
                                </p>
                                <img src="images/eth-address.png" alt="Bitcoin address" className='w-52' />
                            </Col>

                            <Col lg={4}>
                                <h3 className='font-semibold text-2xl flex space-x-1 mt-3'><FaDog className='my-auto text-primary' /> <span>Shib <span className="text-sm">(ethereum network)</span></span></h3>
                                <p className='font-semibold my-3 cursor-pointer' onClick={() => {
                                    copyToClipboard('0x06a6974126a6fccc25c6fe9abf9140d81b537419');
                                    toast.success('SHIB address copied to clipboard', {
                                        position: "top-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}>
                                    0x06a6974126a6fccc25c6fe9abf9140d81b537419
                                </p>
                                <img src="images/shib-address.png" alt="Bitcoin address" className='w-52' />
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </ProtectedRoute>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    
    const props = {
        title: "Shibhouse - Re-taking voice conversations to the moon",
        description: "Re-taking voice conversations to the moon",
        image: "https://shibhouse.tv/images/cover.png"
    }

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            props,
        },
    }
}

export default IndexPage