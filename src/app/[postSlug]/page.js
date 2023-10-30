import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";

export const generateMetadata = async ({ params }) => {
  const slug = params.postSlug;
  const post = await loadBlogPost(slug);
  const { title, abstract } = post.frontmatter;
  return {
    title: `${title} - ${BLOG_TITLE}`,
    description: abstract,
  };
};

async function BlogPost({ params }) {
  const slug = params.postSlug;
  const post = await loadBlogPost(slug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
