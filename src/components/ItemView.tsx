import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getItem, getUrlMetadata } from '../helpers/hackerNewsApi';
import { getUrlHostname } from '../helpers/url';
import { Comment, Story } from '../types/HackerNews';
import CommentItem from './CommentItem';

const MetadataContainer = styled.div`
  padding: 16px;

  border-bottom: 2px solid #3d3d3d;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.4px;

  padding: 0;
  margin-bottom: 12px;
`;

const Url = styled.a`
  text-decoration: none;
  color: #5a9bfe;
  font-size: 16px;
  letter-spacing: 0.4px;
  font-weight: 500;
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  border-radius: 5px;
  margin-top: 12px;

  object-fit: cover;
`;

const ItemImage = ({ item }: { item: Story }) => {
  const { data, isLoading } = useQuery({
    queryKey: [item.url],
    queryFn: () => getUrlMetadata(item.url),
  });

  if (isLoading || !data || !data.image) return null;

  return <Image src={data.image} />;
};

export default function ItemView() {
  const { itemId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => getItem<Story>(parseInt(itemId!, 10)),
  });

  const commentsQuery = useQuery({
    queryKey: ['item-kids', data?.id],
    queryFn: () => Promise.all(data!.kids.map(getItem<Comment>)),
    enabled: !!data,
  });

  if (!data || isLoading) return <div>Loading Item data</div>;

  return (
    <>
      <MetadataContainer>
        <Title>{data.title}</Title>
        {data.url && <Url href={data.url}>{getUrlHostname(data.url)}</Url>}
        <ItemImage item={data} />
      </MetadataContainer>
      {commentsQuery.data?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
