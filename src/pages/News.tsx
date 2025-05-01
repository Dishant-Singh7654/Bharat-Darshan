import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Calendar, AlertTriangle, Filter } from "lucide-react";
import { 
  fetchIndianCultureNews, 
  formatPublishedDate, 
  getFallbackImageUrl, 
  NewsArticle, 
  NewsCategory 
} from "@/data/newsApi";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    // Fetch news data
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchIndianCultureNews(selectedCategory);
        setNews(articles);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getNews();
  }, [selectedCategory]);
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as NewsCategory);
  };
  
  const handleImageLoad = (articleId: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [articleId]: true
    }));
  };
  
  const getArticleId = (article: NewsArticle): string => {
    return `${article.source.name}-${article.publishedAt}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-8">
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block">
            Stay Informed
          </span>
          <h1 className="text-4xl font-bold">Latest News & Updates</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news about Indian culture, heritage, and important information for tourists visiting cultural and historical sites.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-xs">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Filter by Category:</span>
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-primary/20">
                <SelectItem value="all">All News</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="heritage">Heritage</SelectItem>
                <SelectItem value="tourism">Tourism</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-6 rounded-lg max-w-3xl mx-auto text-center space-y-4">
            <AlertTriangle className="h-10 w-10 mx-auto" />
            <p className="font-medium">{error}</p>
            <p className="text-sm">
              Note: You need to add your NewsAPI.org API key in the newsApi.ts file to fetch real news data.
            </p>
          </div>
        )}
        
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No news articles found. Please check your API key and try again.
            </p>
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => {
            const articleId = getArticleId(article);
            return (
              <Card 
                key={articleId} 
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur flex flex-col h-full india-card india-card-hover"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* Gradient overlay that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Image loading placeholder */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 ${imagesLoaded[articleId] ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                  />
                  
                  <img 
                    src={article.urlToImage || getFallbackImageUrl()} 
                    alt={article.title}
                    onLoad={() => handleImageLoad(articleId)}
                    className={`object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ${imagesLoaded[articleId] ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardDescription className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatPublishedDate(article.publishedAt)}
                    </CardDescription>
                    <CardDescription>{article.source.name}</CardDescription>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ScrollArea className="h-[120px] pr-4">
                    <p className="text-sm text-muted-foreground">
                      {article.description || "No description available."}
                    </p>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    Read Full Article
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {!loading && !error && news.length > 0 && (
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>News provided by NewsAPI.org</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;