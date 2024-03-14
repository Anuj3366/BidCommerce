import Center from '@/components/Center';
import Header from '@/components/Appbar';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';
import Input from '@/components/Input';
import { toast } from 'sonner';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;
const Comment = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
export default function ProductPage({ product, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/isLogin', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
      });
  }, []);

  const addcomment = async () => {
    if (!newComment.trim()) {
      toast.warning("Please Enter a Comment")
      return;
    }
    const res = await fetch(`http://localhost:3000/product/${product._id}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: newComment }),
    });
    const data = await res.json();
    if (data.comment) {
      setComments(prevComments => [...prevComments, data.comment]);
      setNewComment("");
      toast.success("Comment Added")
    }
  }

  function addToCart(product) {
    if (!isLoggedIn) window.location.href = "/Login";
    else {
      fetch("http://localhost:3000/addToCart", {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.redirectToLogin) {
            window.location.href = "/Login";
          }
          else{ 
            toast.success("Added to cart")
          };
        });
    }
  }
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>₹{product.price}</Price>
              </div>
              <div>
                <Button $primary onClick={() => addToCart(product)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
      <Center>
        <WhiteBox>
          <Title>Comments</Title>
          <Center><p>Add a comment</p>

            <Input type="text" placeholder="Add a comment" />
            <Button $primary onClick={() => addcomment("Hello")}>
              Add
            </Button>
          </Center>
          <Center>
            <Comment>
              {comments}
            </Comment>
          </Center>
        </WhiteBox>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.params;
  try {
    const res = await fetch(`http://localhost:3000/get/${_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching product: ${res.status}`);
    }

    const product = await res.json();

    const commentsRes = await fetch(`http://localhost:3000/product/${_id}/comment`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!commentsRes.ok) {
      throw new Error(`Error fetching comments: ${commentsRes.status}`);
    }

    const comments = await commentsRes.json();

    return {
      props: {
        product,
        comments,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
}
