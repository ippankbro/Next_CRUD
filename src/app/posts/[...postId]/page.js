export default function PostDetail({ params }) {
  console.log(params);
  return <div>Post {params.postId[2]}</div>;
}
