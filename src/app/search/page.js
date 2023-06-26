import Link from "next/link";
import Card from "@/components/Card/Card";
import { imageurl } from "@/components/Util/getimage";
import { pb } from "@/app/pocketbase";


const Search = async ({ searchParams }) => {
     const response = await pb.collection('fashion_products').getList(1, 50, {
         filter: `name ~ "${searchParams.q}"`, '$autoCancel': false 
      });
      return (
          <main id="main-content">
                {/* ===== Breadcrumb Section ===== */}
                <div className="bg-lightgreen h-16 w-full flex items-center">
                    <div className="app-x-padding app-max-width w-full">
                        <div className="breadcrumb">
                          <Link href="/" className="text-gray400">
                                Home
                            </Link>{" "}
                            / <span>Search results</span>
                        </div>
                    </div>
                </div>

                {/* ===== Heading & Filter Section ===== */}
                <div className="app-x-padding app-max-width w-full mt-8">
                    <h1 className="text-3xl mb-2">
                        Search results: &quot;{searchParams.q}&quot;
                    </h1>
                    {response.items.length > 0 && (
                        <div className="flex justify-between mt-6">
                            <span>
                               Showing results {response.items.length}
                            </span>
                        </div>
                    )}
                </div>

                {/* ===== Main Content Section ===== */}
                <div className="app-x-padding app-max-width mt-3 mb-14">
                    {response.items.length < 1 ? (
                        <div className="flex justify-center items-center h-72">
                          No results
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
                            {response.items.map((product) => (
                                <Card 
                                    key={product.id}
                                    id={product.id}
                                    price={product.price}
                                    collectionId={product.collectionId}
                                    name={product.name}
                                    featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                                    otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                                    qty={product.qty}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
    );
};

export default Search;
