# SEO-Redirect

## https://vlastapolach.github.io/SEO-Redirect/

SEO Redirect URL Pairing Tool - Automate the tasks you don't have to do

## 1) When you want to use this?
When you are migrating to the new version of your website and you will have another URLs, it is best practice to redirect (301) old URLs to new URLs to keep the search engines postitions.

## 2) What exactly it does?
You need list of URLs from your old and your new website. On Wordpress, you can use Yoast SEO plugin to generate sitemap. From sitemap, simply copy the URLS - paste Old URLs to the left pane, and New URLs to the right pane. If you are using same name of posts and pages, but different folder/URL structure, this tool will find the pairs and export it to CSV.

## 3) How to make it work?
Once you copy/pasted URLs, you need to select, which part of it will be used as string for searching and pairing with new URL. Type in, how many characters at the start of the URL will be taken off (ie. http://www.domain.com/ = 22) and how many from the end (ie. .html = 5)

## 4) Finished. Now what?
When completed, you can download CSV with Old - New URL pairs. Where empty, exact pair was not found. You will have to assign it manually. But most of them will be done automatically. When you complete the list, you can use some Redirect plugin to make those rules work.
