# UniHack [![Build Status](https://travis-ci.org/mib-unibe/unihack.svg?branch=master)](https://travis-ci.org/mib-unibe/unihack)

This repository contains the website for UNIHACK 2019.

## Prerequisites

* [Node 10 LTS](https://nodejs.org/en/download/)
* [Hugo v0.53/extended](https://gohugo.io)

## Development

You need to install npm dependencies at the root once with

````
$ npm install
````

then

````
$ hugo server -D
````

## CSS

> We use [Autoprefixer](https://github.com/postcss/autoprefixer) so you **do not** need to use vendor prefixes directly.

CSS is developed using the following methodolgy and naming scheme:

* [Methodology: BEM](http://getbem.com/introduction/)
* [Naming scheme: SUIT](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

All CSS can be found in */assets/sass*.

## Mobile Development

To access the page in a local network:

````
hugo server --bind=0.0.0.0 --baseURL=<http://your-ip> -D
````