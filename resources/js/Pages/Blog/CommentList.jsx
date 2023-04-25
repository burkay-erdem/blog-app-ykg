import Moment from 'moment';



export default function CommentList({ children, comment }) {


    return (
        <div className="flex flex-col bg-white px-8 py-6 max-w-6xl mt-3 mx-auto rounded-lg shadow-md">
            <ul className="-mx-4">
                <li className="flex items-center">
                    <img className="w-10 h-10 object-cover rounded-full mx-4" src={comment.user.thumbnail} alt="avatar" />
                    <p>
                        <a className="text-gray-700 font-bold mx-1 hover:underline" href="#">{comment.user.name}</a>
                        <span className="text-gray-700 text-sm font-light">Created  {Moment(comment.created_at).format('DD MMM YYYY - dddd')}</span>
                    </p>
                </li>
                <li className="flex items-center p-3 ">
                    <p>{comment.comment}</p>
                </li>
            </ul>
        </div>




    );
};

