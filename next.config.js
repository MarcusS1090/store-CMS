/* This code is defining the configuration for the Next.js framework. It is specifying that the images
used in the application will be served from the "res.cloudinary.com" domain. This configuration is
then exported to be used in the application. */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },
    i18n: {
        locales: ["en-US", "es"],
        defaultLocale:"es",
        localeDetection:true,
    }
}

module.exports = nextConfig
