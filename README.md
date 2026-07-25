# fooyin.org

The source for the **fooyin** project website, built with **Jekyll** and deployed on **Cloudflare Pages**.

## Requirements

- Ruby 3.2 or newer
- Bundler
- Git

### Arch Linux

Install the required packages:

```bash
sudo pacman -S --needed git ruby ruby-bundler ruby-erb base-devel
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/fooyin/fooyin.org.git
cd fooyin.org
```

Install the project's Ruby dependencies:

```bash
bundle config set --local path vendor/bundle
bundle install
```

## Local Development

Start the Jekyll development server with LiveReload:

```bash
bundle exec jekyll serve --livereload
```

Open:

```
http://localhost:4000
```

Changes are rebuilt automatically, and supported browsers will refresh when files are modified.


## Project Structure

```
.
├── _config.yml    # Jekyll configuration
├── _layouts/      # Page layouts
├── _includes/     # Shared template fragments
├── assets/        # CSS, JavaScript, images, fonts
├── pages/         # Static pages
└── _site/         # Generated site (not committed)
```

## Deployment

Changes pushed to the master branch are automatically built and deployed by **Cloudflare Pages**.