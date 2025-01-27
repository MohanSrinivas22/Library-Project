import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import StarsReveiew from "../utils/StarsReview";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import LatestReview from "./LatestReview";

const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
      const reviewResponse = await fetch(reviewUrl);
      if(!reviewResponse.ok){
        throw new Error("Something went wrong!");
      }

      const reviewResponseJson = await reviewResponse.json();
      const reviewResponseData = reviewResponseJson._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];
      let weightedStarReviews: number = 0;
      for(let key in reviewResponseData){
        loadedReviews.push({
          id: reviewResponseData[key].id,
          userEmail: reviewResponseData[key].userEmail,
          date: reviewResponseData[key].date,
          rating: reviewResponseData[key].rating,
          book_id: reviewResponseData[key].book_id,
          reviewDescription: reviewResponseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + reviewResponseData[key].rating;
      }

      if(loadedReviews){
        const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2 ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchReviews().catch((error:any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });

  }, []);

  if(isLoading || isLoadingReview){
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt={book?.title} />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-sm-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h4 className="text-primary">{book?.author}</h4>
              <p className="lead">{book?.description}</p>
              <StarsReveiew rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
        <LatestReview reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex align-items-center justify-content-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt={book?.title} />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h4 className="text-primary">{book?.author}</h4>
            <p className="lead">{book?.description}</p>
            <StarsReveiew rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
        <LatestReview reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
    </div>
  );
};

export default BookCheckoutPage;
