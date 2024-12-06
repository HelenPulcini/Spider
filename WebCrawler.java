import java.util.ArrayList;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.Connection;

private String first_link;
private ArrayList<String> visitedLinks = new ArrayList <String>();


public WebCrawler (String link, int num) {
        System.out.print("WebCrawler created");
        String url = "https://en.wikipedia.org/";
        crawl(1, url, new ArrayList<String>());
    }
    private static void crawl(int level, String url, ArrayList<String> visited) {
        if (level <= 5) {
            Document doc = request(url, visited);

            if (doc != null) {
                for (Element link : doc.select("a[href]")) {
                    String next_link =  link.absUrl("href");
                    if (visitedLinks.contains(next_link) == false) {
                        crawl(level++, next_link);
                    }
                }
            }
        }
    }
    private Document request(String url) {
        try {
            Connection con = Jsoup.connect(url);
            Document doc = con.get();

            if (con.response().statusCode() == 200) {
                System.out.println("Bot ID: " + ID + "Reading " + url);

                String title = doc.title();
                System.out.println(title);
                visitedLinks.add(url);

                return doc;
            }
            return null;

        } catch (IOException e) {
            return null;
        }
    }
}
