# UniHack [![Build Status](https://travis-ci.org/mib-unibe/unihack.svg?branch=master)](https://travis-ci.org/mib-unibe/unihack)

This repository contains the website for UNIHACK 2019.

## Prerequisites

* [Hugo](https://gohugo.io)

## Development

````
$ hugo server -D
````

## CSS

CSS is developed using the following methodolgy and naming scheme:

* [Methodology: BEM](http://getbem.com/introduction/)
* [Naming scheme: SUIT](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

All CSS can be found in */assets/sass*.

## Mobile Development

To access the page in a local network:

````
hugo server --bind=0.0.0.0 --baseURL=<http://your-ip> -D
````