const { JSDOM } = require("jsdom")

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`);

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return  //stop crawling
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response: ${contentType} on page: ${currentURL}`);
            return
        }
        console.log(await resp.text());
    } catch (error) {
        console.log(`error in fetch: ${error.message} on page: ${currentURL}`);
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") { //if the first char of the url is / = relative path
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`${error.message}`);
            }
        }
        else {
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`${error.message}`);
            }
        }
    }
    return urls
}

function normaliseURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") { //if the last char of the url is /
        return hostPath.slice(0, -1)  //return the string without the last char
    }
    return hostPath
}

module.exports = {
    normaliseURL,
    getURLsFromHTML,
    crawlPage
}