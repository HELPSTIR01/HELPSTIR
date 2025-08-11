/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: "sass-embedded",
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
