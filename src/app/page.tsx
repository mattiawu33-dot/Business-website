import { products, getPromotionPicks, getBestSellers } from "@/data/products";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const promotionPicks = getPromotionPicks();
  const bestSellers = getBestSellers();

  return <HomeContent products={products} promotionPicks={promotionPicks} bestSellers={bestSellers} />;
}
