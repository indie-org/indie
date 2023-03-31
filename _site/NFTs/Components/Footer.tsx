/** @jsx h */
/** @jsxFrag Fragment */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import {h} from "../../deps.ts";


export default function Footer(props: { author?: string }) {
    return (
        <footer class="mt-20 pb-16 lt-sm:pb-8 lt-sm:mt-16">
            <p class="flex items-center gap-2.5 text-gray-400/800 dark:text-gray-500/800 text-sm">
        <span>
          Powered by{" "}
            <a
                class="inline-flex items-center gap-1 underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                href="https://deno.land/x/blog"
            >
            Deno Blog
          </a>
        </span>
                {/*<a*/}
                {/*    href="/feed"*/}
                {/*    class="inline-flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"*/}
                {/*    title="Atom Feed"*/}
                {/*>*/}
                {/*    <IconRssFeed/> RSS*/}
                {/*</a>*/}
            </p>
        </footer>
    );
}