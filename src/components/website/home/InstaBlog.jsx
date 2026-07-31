"use client"
import React from 'react'
import { useEffect, useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const InstaBlog = ({ section = "frontend" }) => {
    const [instagramPosts, setInstagramPosts] = useState([]);
    const [isInstaLoading, setIsInstaLoading] = useState(true);
    const [facebookPosts, setFacebookPosts] = useState([]);
    const [isFbLoading, setIsFbLoading] = useState(true);

    const fetchFacebookPosts = async () => {
        try {
            const res = await fetch(`/api/facebook-posts?section=${section}`);
            const data = await res.json();
            // console.log(data);
            setFacebookPosts(data);
        } catch (error) {
            setFacebookPosts([]);
        } finally {
            setIsFbLoading(false);
        }
    };
    const fetchInstagramPosts = async () => {
        try {
            const res = await fetch(`/api/instagram-posts?section=${section}`);
            const data = await res.json();
            // console.log(data);
            setInstagramPosts(data);
        } catch (error) {
            setInstagramPosts([]);
        } finally {
            setIsInstaLoading(false);
        }
    };

    useEffect(() => {
        fetchFacebookPosts();
        fetchInstagramPosts();
    }, [])


    // Combine and sort posts by createdAt date
    const allPosts = [...instagramPosts, ...facebookPosts]
        .sort((a, b) => {
            // Sort by createdAt field (newest first)
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // Sort from newest to oldest
        });

    // Determine card width based on number of posts
    const cardBasis =
        allPosts.length <= 3 ? `basis-1/${allPosts.length}` : "md:basis-1/5";

    return (
        <div className='bg-[#fcf7f1] w-full overflow-hidden max-w-screen overflow-x-hidden'>
            {/* Instagram-like Image Carousel using Carousel classes */}
            {!isInstaLoading && !isFbLoading && allPosts.length > 0 && (
                <div className="w-full flex flex-col items-center py-10 px-4">
                    <h2 className="text-center font-bold text-xl md:text-3xl lg:text-4xl uppercase">
                        Don’t just watch the trends — live them!
                    </h2>
                    <p className="text-gray-600 py-4 text-center font-barlow w-full md:w-[90%] mx-auto">
                        Follow us on social media for your daily dose of Trending
                        Packages, exclusive offers, behind-the-scenes peeks, and
                        real-time updates. Join our community of trendsetters and be the
                        first to explore what’s new, what’s hot, and what everyone’s
                        talking about. Your next favorite find is just a follow away!
                    </p>
                    <div className="w-full px-3">
                        <Carousel className="w-full" plugins={[Autoplay({ delay: 4000 })]}>
                            <CarouselContent >
                                {allPosts.map((post, idx) => (
                                    <CarouselItem
                                        key={post._id || idx}
                                        className={`pl-5 ${allPosts.length <= 3 ? cardBasis : "md:basis-1/5"}`}
                                        style={
                                            allPosts.length <= 3
                                                ? { minWidth: `calc(100%/${allPosts.length})` }
                                                : {}
                                        }
                                    >
                                        <div className="relative group border-4 border-white overflow-hidden w-full h-60">
                                            <Image
                                                src={post.image}
                                                alt={`${post.type === "facebook" ? "Facebook" : "Instagram"} ${idx}`}
                                                width={400}
                                                height={400}
                                                className="object-cover md:object-cover w-full h-full"
                                            />
                                            <a
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                                            >
                                                {post.type === "facebook" ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>

                                                )}
                                            </a>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent >
                            <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 p-5" />
                            <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 p-5" />
                        </Carousel>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstaBlog