import { Link } from "react-router-dom";
import { BookModel } from "../../models/BookModel";

const CheckoutAndReviewBox: React.FC<{book: BookModel | undefined, mobile: boolean}> = (props) => {
    return ( 
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 mb-5 container d-flex'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5</b>
                        books checked out
                    </p>
                    <hr />
                    {
                        props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">
                            Available
                        </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies}</b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable}</b>
                            available
                        </p>
                    </div>
                </div>
                <Link to="/#" className='btn btn-lg btn-success'>Sign in</Link>
                <hr />
                <p className="mt-3">
                    This number can change until the order has been completed.
                </p>
                <p>
                    Sign in to be able to leave a review.
                </p>
            </div>
        </div>
    );
}
 
export default CheckoutAndReviewBox;